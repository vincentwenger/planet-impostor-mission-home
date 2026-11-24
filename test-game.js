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
assert.equal(get('difficultyOptions').children.length,4);
assert.equal(state.difficulty,'easy');
assert.equal(state.fuel,150);
assert.equal(get('difficultyOptions').children[0].disabled,false);
for(const index of [1,2,3])assert.equal(get('difficultyOptions').children[index].disabled,true);
const threeFlightRoute=[['Earth','Moon'],['Moon','Mars'],['Mars','Earth']];
const allLegRoutes=[...threeFlightRoute,...threeFlightRoute,...threeFlightRoute,...threeFlightRoute];
const allLegChoices=allLegRoutes;
assert.equal(vm.runInContext('LEGS.length',ctx),12); // Nine chapter flights + three Insane loop templates
assert.equal(vm.runInContext('INSANE_START_LEG',ctx),9);
assert.equal(vm.runInContext('INSANE_LEG_COUNT',ctx),3);
assert.equal(get('stageCounter').innerHTML,'0<span>/ 9</span>');
assert(get('difficultyHint').textContent.includes('Return to Earth')||get('difficultyHint').textContent.includes('→ Earth'));
function answerCorrect(test){
 const {state,ctx,get}=test;
 const i=vm.runInContext('currentLeg().options.indexOf(state.question.world)',ctx);
 vm.runInContext(`answer(${JSON.stringify(state.question.world)},document.getElementById('answerButtons').children[${i}])`,ctx);
}
function answerWrong(test){
 const {state,ctx,get}=test;
 const wrong=vm.runInContext('currentLeg().options.find(w=>w!==state.question.world)',ctx);
 vm.runInContext(`answer(${JSON.stringify(wrong)},document.getElementById('answerButtons').children[0])`,ctx);
}
get('launchButton').click();assert.equal(state.leg,0);assert.equal(state.status,'quiz');
let scoreBefore=0;
const points=[100,100,100,200,200,200,350,350,350];
for(let leg=0;leg<9;leg++){
 const expectedMode=leg<3?'easy':leg<6?'medium':'hard';
 assert.equal(state.leg,leg);assert.equal(state.status,'quiz');assert.equal(state.difficulty,expectedMode);
 const opts=vm.runInContext('currentLeg().options',ctx);
 assert.deepEqual([...opts],allLegChoices[leg]);
 assert.deepEqual([...vm.runInContext('([currentLeg().from,currentLeg().to])',ctx)],allLegRoutes[leg]);
 assert.equal(get('answerButtons').children.length,2);
 assert.equal(get('answerButtons').classList.contains('three-choices'),false);
 assert.equal(get('questionPhase').textContent,allLegChoices[leg].join(' OR ').toUpperCase()+'?');
 assert(allLegChoices[leg].includes(state.question.world),'photo must match the 2 choices');
 state.progress=92;state.fuel=80;
 scoreBefore=state.score;
 answerCorrect({get,ctx,state});
 assert.equal(state.score,scoreBefore+points[leg]);
 assert.equal(state.status,'answer');assert(state.progress>=100);
 get('nextQuestion').click();assert.equal(state.status,'landing');
 // Only the Mars → Earth leg unlocks the next difficulty.
 if(leg===0||leg===1)assert.equal(saved.get('planet-impostor-unlocked-difficulty-v1')??null,null);
 if(leg===2){assert.equal(saved.get('planet-impostor-unlocked-difficulty-v1'),'1');assert.equal(state.difficulty,'medium');assert(get('dialogReward').innerHTML.includes('MEDIUM MODE UNLOCKED'));assert.equal(get('dialogTitle').textContent,'Earth reached!')}
 if(leg===3||leg===4)assert.equal(saved.get('planet-impostor-unlocked-difficulty-v1'),'1');
 if(leg===5){assert.equal(saved.get('planet-impostor-unlocked-difficulty-v1'),'2');assert.equal(state.difficulty,'hard');assert(get('dialogReward').innerHTML.includes('HARD MODE UNLOCKED'));assert.equal(get('dialogTitle').textContent,'Earth reached!')}
 if(leg===6||leg===7)assert.equal(saved.get('planet-impostor-unlocked-difficulty-v1'),'2');
 if(leg===8){assert.equal(saved.get('planet-impostor-unlocked-difficulty-v1'),'3');assert.equal(state.difficulty,'insane');assert(get('dialogReward').innerHTML.includes('INSANE MODE UNLOCKED'));assert.equal(get('dialogTitle').textContent,'Earth reached!')}
 get('dialogButton').click();assert.equal(state.status,'quiz');assert.equal(state.leg,leg+1);
 if([2,5,8].includes(leg))assert.equal(get('sceneFrom').textContent,'EARTH','each new difficulty starts on Earth');
}
assert.equal(state.difficulty,'insane');
assert.equal(get('difficultyOptions').children.length,4);
const endlessRoute=threeFlightRoute;
// Test 12 additional endless legs: route repeats after three, no final win.
for(let i=0;i<12;i++){
 assert.equal(state.leg,9+i);assert.equal(state.status,'quiz');
 assert.equal(state.difficulty,'insane');
 assert.deepEqual([...vm.runInContext('([currentLeg().from,currentLeg().to])',ctx)],endlessRoute[i%3]);
 state.progress=94;state.fuel=90;
 const previousStreak=state.insaneStreak, previousScore=state.score;
 answerCorrect({get,ctx,state});
 const expectedAward=Math.round(500*Math.pow(1.10,previousStreak));
 assert.equal(state.score,previousScore+expectedAward);
 assert.equal(state.insaneStreak,previousStreak+1);
 get('nextQuestion').click();assert.equal(state.status,'landing');
 assert(get('dialogOverline').textContent.includes('INSANE SURVIVAL'));
 get('dialogButton').click();assert.equal(state.status,'quiz');
}
assert.equal(state.insaneLegsCompleted,12);
assert(get('stageCounter').innerHTML.includes('∞'),'HUD shows the endless stage counter');
// One wrong answer must end Insane immediately, without a chance to retry the leg.
const finalScore=state.score;
answerWrong({get,ctx,state});
assert.equal(state.status,'failed');assert.equal(state.score,finalScore);
assert.equal(get('dialogTitle').textContent,'One wrong answer — game over!');
assert(get('dialogReward').innerHTML.includes('FINAL SURVIVAL SCORE'));
assert.equal(saved.get('planet-impostor-unlocked-difficulty-v1'),'3');
get('dialogButton').click();assert.equal(state.status,'quiz');assert.equal(state.leg,9);assert.equal(state.difficulty,'insane');assert.equal(state.insaneStreak,0);assert.equal(state.score,0);
// A separately selected unlocked Insane run begins from Earth, with the rank still saved.
({get,doc,ctx,state,qbank}=createGame());
assert.equal(get('difficultyOptions').children[3].disabled,false);
get('difficultyOptions').children[3].click();assert.equal(state.difficulty,'insane');assert.equal(get('sceneFrom').textContent,'EARTH');
get('launchButton').click();assert.equal(state.leg,9);
answerCorrect({get,ctx,state});assert.equal(state.score,500);
// Replay can start from any previously unlocked difficulty, always from Earth.
for(const [mode,start] of [['easy',0],['medium',3],['hard',6],['insane',9]]){
 const replay=createGame(saved);
 const modeIndex=['easy','medium','hard','insane'].indexOf(mode);
 assert.equal(replay.get('difficultyOptions').children[modeIndex].disabled,false);
 replay.get('difficultyOptions').children[modeIndex].click();
 assert.equal(replay.get('sceneFrom').textContent,'EARTH');
 assert.equal(replay.get('sceneTo').textContent,'MOON');
 replay.get('launchButton').click();
 assert.equal(replay.state.leg,start);
 assert.equal(replay.state.difficulty,mode);
}
// Failure on earlier difficulties still follows the original retry mechanic.
vm.runInContext('resetGame()',ctx);
get('difficultyOptions').children[0].click();get('launchButton').click();state.fuel=1;
answerWrong({get,ctx,state});assert.equal(state.status,'answer');
get('nextQuestion').click();assert.equal(state.status,'failed');
assert.equal(saved.get('planet-impostor-unlocked-difficulty-v1'),'3');
// Every flight now has exactly two choices; number 3 must never answer.
for(const legIndex of [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]){
 vm.runInContext(`state.difficulty='${legIndex>=9?'insane':legIndex>=6?'hard':legIndex>=3?'medium':'easy'}';startLeg(${legIndex})`,ctx);
 assert.equal(get('answerButtons').children.length,2);
 const allowed=vm.runInContext('currentLeg().options',ctx);
 assert.equal(allowed.length,2);
 const route=vm.runInContext('currentLeg()',ctx);
 assert.equal(allowed[0],route.from);assert.equal(allowed[1],route.to);
 assert(qbank.some(q=>q.world===allowed[0])&&qbank.some(q=>q.world===allowed[1]));
 assert(allowed.includes(state.question.world),'a question must match its current journey worlds');
 doc.listeners.keydown({key:'3'});assert.equal(state.status,'quiz','key 3 cannot answer a 2-choice question');
}
// The two number keys remain functional.
vm.runInContext("state.difficulty='insane';startLeg(9)",ctx);
const key=vm.runInContext('currentLeg().options.indexOf(state.question.world)+1',ctx);
doc.listeners.keydown({key:String(key)});assert.equal(state.status,'answer');
assert(saved.has('planet-impostor-recent-photo-ids-v1'));

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
 // Mars is never eligible in Earth/Moon journeys.
 assert(['Earth','Moon'].includes(recycled.world));
}
{
 const store=new Map(), game=createGame(store), seen=new Set();
 // The Moon/Mars photo pool has 44 curated images (20 Moon + 24 Mars).
 for(let i=0;i<20;i++){
   const q=choose(game,i%2===0?1:10);
   assert(['Moon','Mars'].includes(q.world),'Earth photos must not appear on Moon/Mars journeys');
   assert(!seen.has(q.id),'repeated an image during the 44-image Moon/Mars cycle');
   seen.add(q.id);
 }
 // A full game restart must NOT wipe image history.
 vm.runInContext('resetGame()',game.ctx);
 const refreshed=createGame(store);
 for(let i=20;i<44;i++){
   const q=choose(refreshed,i%2===0?1:10);
   assert(['Moon','Mars'].includes(q.world),'Earth photos must not appear on Moon/Mars journeys');
   assert(!seen.has(q.id),'repeated an image after restart or page reload');
   seen.add(q.id);
 }
 assert.equal(seen.size,44,'all eligible Moon/Mars observations should appear once per cycle');
 assert.equal(JSON.parse(store.get(CYCLE_KEY)).length,44);
 const recycled=choose(refreshed,1);
 assert(seen.has(recycled.id),'repeats may begin only after all 44 Moon/Mars images have been used');
 assert.equal(JSON.parse(store.get(CYCLE_KEY)).length,1,'new cycle should contain only the next image');
}
{
 // The new direct Mars → Earth route has 46 eligible curated images (24 Mars + 22 Earth).
 const store=new Map(), game=createGame(store), seen=new Set();
 for(let i=0;i<23;i++){
   const q=choose(game,2);
   assert(['Mars','Earth'].includes(q.world),'Moon photos must not appear on Mars/Earth journeys');
   assert(!seen.has(q.id),'Mars/Earth image repeated before the pool was exhausted');
   seen.add(q.id);
 }
 const reloaded=createGame(store);
 for(let i=23;i<46;i++){
   const q=choose(reloaded,5);
   assert(['Mars','Earth'].includes(q.world),'Moon photos must not appear on Mars/Earth journeys');
   assert(!seen.has(q.id),'Mars/Earth image repeated after refresh');
   seen.add(q.id);
 }
 assert.equal(seen.size,46);
 const recycled=choose(reloaded,8);
 assert(seen.has(recycled.id),'Mars/Earth pool may recycle after every eligible image was shown');
 assert.equal(JSON.parse(store.get(CYCLE_KEY)).length,1);
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
console.log('PASS — v1.13 three-leg Earth → Moon → Mars → Earth cycles per difficulty; Earth-only unlocks; Mars/Earth NASA choices; exponential and endless Insane; immediate loss; persistent no-repeat images and fuel.');

{const g=createGame(new Map());g.get('launchButton').click();assert.equal(g.state.gear,'cruise');g.get('gearEco').click();assert.equal(g.state.gear,'eco');let p=vm.runInContext('gearProfile()',g.ctx);assert.equal(p.speed,9);assert.equal(p.burn,2);answerCorrect(g);assert.equal(g.state.progress,9);assert.equal(g.state.fuel,148);assert.equal(g.state.score,75);g.get('gearWarp').click();assert.equal(g.state.gear,'eco');g.get('nextQuestion').click();g.get('gearWarp').click();answerCorrect(g);assert.equal(g.state.progress,45);assert.equal(g.state.fuel,135);assert.equal(g.state.score,275);g.get('nextQuestion').click();let wrong=vm.runInContext('currentLeg().options.find(x=>x!==state.question.world)',g.ctx);vm.runInContext('answer('+JSON.stringify(wrong)+',null)',g.ctx);assert.equal(g.state.progress,37);assert.equal(g.state.fuel,119);console.log('PASS — SHIFT gear trade-offs, score, lock after answer, and wrong-answer penalty.');}
