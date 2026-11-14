const fs=require('fs'),vm=require('vm'),assert=require('assert');
class Node{
 constructor(id=''){this.id=id;this.children=[];this.style={};this.listeners={};this.className='';this.textContent='';this._innerHTML='';this.attributes={};this.classList={_set:new Set(),add:(c)=>this.classList._set.add(c),remove:(c)=>this.classList._set.delete(c),toggle:(c,v)=>{if(v===undefined)v=!this.classList._set.has(c);if(v)this.classList._set.add(c);else this.classList._set.delete(c);return v},contains:(c)=>this.classList._set.has(c)};}
 set innerHTML(v){this._innerHTML=v;this.children=[];} get innerHTML(){return this._innerHTML}
 append(x){this.children.push(x)}
 querySelector(){return this.label||(this.label=new Node('label'))}
 addEventListener(name,fn){this.listeners[name]=fn}
 click(){if(this.listeners.click)this.listeners.click();if(this.onclick)this.onclick()}
 setAttribute(k,v){this.attributes[k]=v}
 getContext(){return{scale(){},clearRect(){},beginPath(){},arc(){},fill(){},set fillStyle(x) {}}}
}
const nodes={};const get=id=>nodes[id]||(nodes[id]=new Node(id));const doc={listeners:{},getElementById:get,createElement:()=>new Node(),addEventListener(event,fn){this.listeners[event]=fn}};
const ctx={document:doc,window:{innerWidth:1366,innerHeight:900,addEventListener(){},AudioContext:class{constructor(){this.currentTime=0;this.destination={}}createOscillator(){return{frequency:{value:0},connect(){return{connect(){}}},start(){},stop(){}}}createGain(){return{gain:{setValueAtTime(){},exponentialRampToValueAtTime(){}},connect(){}}}}},devicePixelRatio:1,sessionStorage:{setItem(){}},Math,setTimeout:(fn)=>fn(),console};ctx.global=ctx;vm.createContext(ctx);
vm.runInContext(fs.readFileSync(__dirname+'/data.js','utf8'),ctx);
vm.runInContext(fs.readFileSync(__dirname+'/game.js','utf8'),ctx);
const state=vm.runInContext('state',ctx);
const qbank=vm.runInContext('NASA_QUESTIONS',ctx);
assert.equal(qbank.length,23);assert.deepEqual([...new Set(qbank.map(q=>q.world))].sort(),['Earth','Mars','Moon']);
assert(qbank.every(q=>q.source.startsWith('https://science.nasa.gov/photojournal/')&&q.image.includes(q.id+'.jpg')));
assert.equal(get('difficultyOptions').children.length,3);
assert.equal(state.difficulty,'medium');
get('difficultyOptions').children[0].click();assert.equal(state.difficulty,'easy');assert.equal(state.fuel,150);
get('difficultyOptions').children[2].click();assert.equal(state.difficulty,'hard');assert.equal(state.fuel,110);
get('difficultyOptions').children[1].click();assert.equal(state.difficulty,'medium');assert.equal(state.fuel,110);
get('launchButton').click();assert.equal(state.leg,0);assert.equal(state.status,'quiz');
for(let leg=0;leg<4;leg++){
 assert.equal(state.leg,leg);assert.equal(state.status,'quiz');
 const opts=vm.runInContext('LEGS[state.leg].options',ctx);assert(opts.includes(state.question.world));
 const expected=leg===0?['Earth','Moon']:leg===3?['Moon','Earth']:['Earth','Moon','Mars'];
 assert.deepEqual([...opts],expected,`leg ${leg+1} option set`);
 assert.equal(get('answerButtons').children.length,expected.length,`leg ${leg+1} answer button count`);
 assert.equal(get('answerButtons').classList.contains('three-choices'),expected.length===3);
 assert(expected.every((world,i)=>get('answerButtons').children[i].textContent.includes(world.toUpperCase())));
 state.progress=92;state.fuel=80;
 const q=state.question;const selected=get('answerButtons').children[opts.indexOf(q.world)];
 vm.runInContext(`answer(${JSON.stringify(q.world)},document.getElementById('answerButtons').children[${opts.indexOf(q.world)}])`,ctx);
 assert.equal(state.status,'answer');assert(state.progress>=100);
 get('nextQuestion').click();
 if(leg<3){assert.equal(state.status,'landing');get('dialogButton').click();assert.equal(state.leg,leg+1);assert.equal(state.status,'quiz')}
 else{assert.equal(state.status,'landing');assert(get('dialogTitle').textContent.includes('Welcome home'));get('dialogButton').click();assert.equal(state.status,'setup')}
}
// Keyboard shortcut 3 must select Mars on the two three-world legs.
for (const legIndex of [1,2]) {
 vm.runInContext(`startLeg(${legIndex})`,ctx);
 state.question=qbank.find(q=>q.world==='Mars');
 assert.equal(state.status,'quiz');
 assert.equal(get('answerButtons').children.length,3);
 doc.listeners.keydown({key:'3'});
 assert.equal(state.status,'answer');
 assert.equal(state.correct>0,true);
}
// Keyboard shortcut 3 must not trigger an answer on the two-choice Earth–Moon leg.
vm.runInContext('startLeg(0)',ctx);
doc.listeners.keydown({key:'3'});
assert.equal(state.status,'quiz');
vm.runInContext('resetGame()',ctx);
get('launchButton').click();state.fuel=1;state.progress=0;const wrong=state.question.world==='Earth'?'Moon':'Earth';
vm.runInContext(`answer(${JSON.stringify(wrong)},document.getElementById('answerButtons').children[0])`,ctx);
get('nextQuestion').click();assert.equal(state.status,'failed');
console.log('PASS — 2/3/3/2 answer options; keyboard key 3; difficulty presets; 23 NASA records; 4 legs; landing/refuel; victory; fuel failure.');
