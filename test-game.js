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
const makeStorage=store=>({getItem(k){return store.get(k)??null},setItem(k,v){store.set(k,String(v))}});
function createGame(store=saved){
 const nodes={};const get=id=>nodes[id]||(nodes[id]=new Node(id));
 const doc={listeners:{},getElementById:get,createElement:()=>new Node(),addEventListener(event,fn){this.listeners[event]=fn}};
 const ctx={document:doc,window:{innerWidth:1366,innerHeight:900,addEventListener(){},AudioContext:class{constructor(){this.currentTime=0;this.destination={}}createOscillator(){return{frequency:{value:0},connect(){return{connect(){}}},start(){},stop(){}}}createGain(){return{gain:{setValueAtTime(){},exponentialRampToValueAtTime(){}},connect(){}}}}},devicePixelRatio:1,sessionStorage:{setItem(){}},localStorage:makeStorage(store),Math,setTimeout:(fn)=>fn(),console};ctx.global=ctx;vm.createContext(ctx);
 vm.runInContext(fs.readFileSync(__dirname+'/data.js','utf8'),ctx);
 vm.runInContext(fs.readFileSync(__dirname+'/game.js','utf8'),ctx);
 return {get,doc,ctx,state:vm.runInContext('state',ctx),qbank:vm.runInContext('NASA_QUESTIONS',ctx)};
}
let {get,doc,ctx,state,qbank}=createGame();
assert.equal(qbank.length,66);
assert.equal(qbank.filter(q=>q.world==='Earth').length,22);
assert.equal(qbank.filter(q=>q.world==='Moon').length,20);
assert.equal(qbank.filter(q=>q.world==='Mars').length,24);
assert.equal(new Set(qbank.map(q=>q.id)).size,66,'every NASA source has a distinct ID');assert.deepEqual([...new Set(qbank.map(q=>q.world))].sort(),['Earth','Mars','Moon']);
assert(qbank.every(q=>q.source.startsWith('https://science.nasa.gov/')&&q.image.startsWith('https://assets.science.nasa.gov/')));
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
assert.equal(new Set(state.lastIDs).size,state.lastIDs.length,'no recently repeated images within the first mission');
assert(saved.has('planet-impostor-recent-photo-ids-v1'),'recent image history saved across sessions');
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

// Regression: NEVER repeat an eligible image until every eligible image has appeared.
const CYCLE_KEY='planet-impostor-used-photo-ids-v1';
const LEGACY_KEY='planet-impostor-recent-photo-ids-v1';
function choose(test,leg){test.state.leg=leg;return vm.runInContext('choosePhoto()',test.ctx)}
{
 const store=new Map(), test=createGame(store), earthMoonSeen=new Set();
 // Phase 1 (Earth/Moon) has exactly 42 eligible images: 22 Earth + 20 Moon.
 for(let i=0;i<17;i++){
   const q=choose(test,0);
   assert(['Earth','Moon'].includes(q.world));
   assert(!earthMoonSeen.has(q.id),'repeated an Earth/Moon image before the pool was exhausted');
   earthMoonSeen.add(q.id);
 }
 assert.equal(JSON.parse(store.get(CYCLE_KEY)).length,17,'complete cycle persisted');
 // Simulate browser refresh with localStorage retained. No old image may reappear.
 const reloaded=createGame(store);
 for(let i=17;i<42;i++){
   const q=choose(reloaded,3);
   assert(!earthMoonSeen.has(q.id),'replayed an image after a browser refresh');
   earthMoonSeen.add(q.id);
 }
 assert.equal(earthMoonSeen.size,42);
 const recycled=choose(reloaded,0);
 assert(earthMoonSeen.has(recycled.id),'after exhaustion the eligible images should be reused');
 assert.equal(JSON.parse(store.get(CYCLE_KEY)).length,1,'new Earth/Moon cycle begins with one image');
 // Mars must still appear only in three-choice journeys.
 assert(['Earth','Moon'].includes(recycled.world));
}
{
 const store=new Map(), game=createGame(store), seen=new Set();
 // All 66 images are eligible for each Mars-related leg.
 for(let i=0;i<35;i++){
   const q=choose(game,i%2===0?1:2);
   assert(!seen.has(q.id),'repeated an image during the 66-image all-world cycle');
   seen.add(q.id);
 }
 // A full game restart must NOT wipe image history.
 vm.runInContext('resetGame()',game.ctx);
 const refreshed=createGame(store);
 for(let i=35;i<66;i++){
   const q=choose(refreshed,i%2===0?1:2);
   assert(!seen.has(q.id),'repeated an image after restart or page reload');
   seen.add(q.id);
 }
 assert.equal(seen.size,66,'every NASA observation should appear once per cycle');
 assert.equal(JSON.parse(store.get(CYCLE_KEY)).length,66);
 const recycled=choose(refreshed,1);
 assert(seen.has(recycled.id),'repeats may begin only after all 66 images have been used');
 assert.equal(JSON.parse(store.get(CYCLE_KEY)).length,1,'new cycle should contain only the next image');
}
{
 const store=new Map([[LEGACY_KEY,JSON.stringify(['PIA17632','PIA04452'])]]);
 const game=createGame(store);
 assert(game.state.usedPhotoIDs.has('PIA17632'),'previous-version history was migrated');
 assert(game.state.usedPhotoIDs.has('PIA04452'),'previous Mars history was migrated');
 for(let i=0;i<12;i++){
   const q=choose(game,1);
   assert(!['PIA17632','PIA04452'].includes(q.id),'replayed one of the legacy recently seen images');
 }
}
{
 // When a 2-choice leg is exhausted, keep the use history of Mars images.
 const store=new Map(), game=createGame(store);
 const firstMars=choose(game,1);
 if(firstMars.world!=='Mars'){
   // Explicitly record a Mars image as already shown, independent of random draws.
   game.state.usedPhotoIDs.add(game.qbank.find(q=>q.world==='Mars').id);
   vm.runInContext('saveUsedPhotoIDs(state.usedPhotoIDs)',game.ctx);
 }
 const marsBefore=game.qbank.filter(q=>q.world==='Mars'&&game.state.usedPhotoIDs.has(q.id)).map(q=>q.id);
 for(let i=0;i<43;i++)choose(game,0);
 for(const id of marsBefore)assert(game.state.usedPhotoIDs.has(id),'Earth/Moon recycling erased Mars history');
}
console.log('PASS — v1.6 strict persistent no-repeat cycles, 66-image and 42-image exhaustion, migration, difficulty unlocks, NASA questions, 4 legs and fuel gameplay.');
