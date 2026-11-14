const fs=require('fs'),vm=require('vm'),assert=require('assert');
class Node{
 constructor(id=''){this.id=id;this.children=[];this.style={};this.listeners={};this.className='';this.textContent='';this._innerHTML='';this.attributes={};this.disabled=false;this.classList={_set:new Set(),add:(c)=>this.classList._set.add(c),remove:(c)=>this.classList._set.delete(c),toggle:(c,v)=>{if(v===undefined)v=!this.classList._set.has(c);if(v)this.classList._set.add(c);else this.classList._set.delete(c);return v},contains:(c)=>this.classList._set.has(c)};}
 set innerHTML(v){this._innerHTML=v;this.children=[];} get innerHTML(){return this._innerHTML}
 append(x){this.children.push(x)}
 querySelector(){return this.label||(this.label=new Node('label'))}
 addEventListener(name,fn){this.listeners[name]=fn}
 click(){if(this.disabled)return;if(this.listeners.click)this.listeners.click();if(this.onclick)this.onclick()}
 setAttribute(k,v){this.attributes[k]=v}
 getContext(){return{scale(){},clearRect(){},beginPath(){},arc(){},fill(){},set fillStyle(x){}}}
}
const saved=new Map();
const storage={getItem(k){return saved.get(k)??null},setItem(k,v){saved.set(k,String(v))}};
function createGame(){
 const nodes={};const get=id=>nodes[id]||(nodes[id]=new Node(id));
 const doc={listeners:{},getElementById:get,createElement:()=>new Node(),addEventListener(event,fn){this.listeners[event]=fn}};
 const ctx={document:doc,window:{innerWidth:1366,innerHeight:900,addEventListener(){},AudioContext:class{constructor(){this.currentTime=0;this.destination={}}createOscillator(){return{frequency:{value:0},connect(){return{connect(){}}},start(){},stop(){}}}createGain(){return{gain:{setValueAtTime(){},exponentialRampToValueAtTime(){}},connect(){}}}}},devicePixelRatio:1,sessionStorage:{setItem(){}},localStorage:storage,Math,setTimeout:(fn)=>fn(),console};ctx.global=ctx;vm.createContext(ctx);
 vm.runInContext(fs.readFileSync(__dirname+'/data.js','utf8'),ctx);
 vm.runInContext(fs.readFileSync(__dirname+'/game.js','utf8'),ctx);
 return {get,doc,ctx,state:vm.runInContext('state',ctx),qbank:vm.runInContext('NASA_QUESTIONS',ctx)};
}
let {get,doc,ctx,state,qbank}=createGame();
assert.equal(qbank.length,23);assert.deepEqual([...new Set(qbank.map(q=>q.world))].sort(),['Earth','Mars','Moon']);
assert(qbank.every(q=>q.source.startsWith('https://science.nasa.gov/photojournal/')&&q.image.includes(q.id+'.jpg')));
assert.equal(get('difficultyOptions').children.length,3);
assert.equal(state.difficulty,'easy');
assert.equal(state.fuel,150);
assert.equal(get('difficultyOptions').children[0].disabled,false);
assert.equal(get('difficultyOptions').children[1].disabled,true);
assert.equal(get('difficultyOptions').children[2].disabled,true);
get('difficultyOptions').children[1].click();assert.equal(state.difficulty,'easy');
get('difficultyOptions').children[2].click();assert.equal(state.difficulty,'easy');
function completeFourLegs(){
 get('launchButton').click();assert.equal(state.leg,0);assert.equal(state.status,'quiz');
 for(let leg=0;leg<4;leg++){
  assert.equal(state.leg,leg);assert.equal(state.status,'quiz');
  const opts=vm.runInContext('LEGS[state.leg].options',ctx);assert(opts.includes(state.question.world));
  const expected=leg===0?['Earth','Moon']:leg===3?['Moon','Earth']:['Earth','Moon','Mars'];
  assert.deepEqual([...opts],expected,`leg ${leg+1} option set`);
  assert.equal(get('answerButtons').children.length,expected.length,`leg ${leg+1} answer button count`);
  assert.equal(get('answerButtons').classList.contains('three-choices'),expected.length===3);
  state.progress=92;state.fuel=80;
  const q=state.question;const ix=opts.indexOf(q.world);
  vm.runInContext(`answer(${JSON.stringify(q.world)},document.getElementById('answerButtons').children[${ix}])`,ctx);
  assert.equal(state.status,'answer');assert(state.progress>=100);
  get('nextQuestion').click();
  if(leg<3){assert.equal(state.status,'landing');get('dialogButton').click();assert.equal(state.leg,leg+1);assert.equal(state.status,'quiz')}
  else {assert.equal(state.status,'landing');assert(get('dialogTitle').textContent.includes('Welcome home'))}
 }
}
completeFourLegs();
assert.equal(saved.get('planet-impostor-unlocked-difficulty-v1'),'1','Easy round trip unlocks Medium');
assert(get('dialogReward').innerHTML.includes('MEDIUM MODE UNLOCKED'));
get('dialogButton').click();assert.equal(state.status,'setup');assert.equal(state.difficulty,'medium');
assert.equal(get('difficultyOptions').children[1].disabled,false);
assert.equal(get('difficultyOptions').children[2].disabled,true);
completeFourLegs();
assert.equal(saved.get('planet-impostor-unlocked-difficulty-v1'),'2','Medium round trip unlocks Hard');
assert(get('dialogReward').innerHTML.includes('HARD MODE UNLOCKED'));
get('dialogButton').click();assert.equal(state.status,'setup');assert.equal(state.difficulty,'hard');
assert.equal(get('difficultyOptions').children[2].disabled,false);
completeFourLegs();
assert.equal(saved.get('planet-impostor-unlocked-difficulty-v1'),'2','Hard victory does not alter rank');
assert(!get('dialogReward').innerHTML.includes('UNLOCKED'));
get('dialogButton').click();assert.equal(state.status,'setup');
// Reloading the page should retain unlock state using localStorage.
({get,doc,ctx,state,qbank}=createGame());
assert.equal(state.difficulty,'easy','Easy remains default for new sessions');
assert.equal(get('difficultyOptions').children[1].disabled,false,'Medium persisted');
assert.equal(get('difficultyOptions').children[2].disabled,false,'Hard persisted');
get('difficultyOptions').children[1].click();assert.equal(state.difficulty,'medium');
// Keys 1/2/3 work only for three-choice legs, including after unlocking.
for(const legIndex of [1,2]){
 vm.runInContext(`startLeg(${legIndex})`,ctx);
 state.question=qbank.find(q=>q.world==='Mars');
 assert.equal(get('answerButtons').children.length,3);
 doc.listeners.keydown({key:'3'});
 assert.equal(state.status,'answer');
}
vm.runInContext('startLeg(0)',ctx);
doc.listeners.keydown({key:'3'});assert.equal(state.status,'quiz');
// Failure never changes unlock progression.
vm.runInContext('resetGame()',ctx);
get('launchButton').click();state.fuel=1;state.progress=0;
const wrong=state.question.world==='Earth'?'Moon':'Earth';
vm.runInContext(`answer(${JSON.stringify(wrong)},document.getElementById('answerButtons').children[0])`,ctx);
get('nextQuestion').click();assert.equal(state.status,'failed');
assert.equal(saved.get('planet-impostor-unlocked-difficulty-v1'),'2');
console.log('PASS — Easy → Medium → Hard full-tour unlocks, persistence across reload, locked selections, 2/3/3/2 answers, keyboard, NASA records, 4 legs, victory and fuel failure.');
