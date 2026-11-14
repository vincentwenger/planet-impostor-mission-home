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
const nodes={};const get=id=>nodes[id]||(nodes[id]=new Node(id));const doc={getElementById:get,createElement:()=>new Node(),addEventListener() {}};
const ctx={document:doc,window:{innerWidth:1366,innerHeight:900,addEventListener(){},AudioContext:class{constructor(){this.currentTime=0;this.destination={}}createOscillator(){return{frequency:{value:0},connect(){return{connect(){}}},start(){},stop(){}}}createGain(){return{gain:{setValueAtTime(){},exponentialRampToValueAtTime(){}},connect(){}}}}},devicePixelRatio:1,sessionStorage:{setItem(){}},Math,setTimeout:(fn)=>fn(),console};ctx.global=ctx;vm.createContext(ctx);
vm.runInContext(fs.readFileSync(__dirname+'/data.js','utf8'),ctx);
vm.runInContext(fs.readFileSync(__dirname+'/game.js','utf8'),ctx);
const state=vm.runInContext('state',ctx);
const qbank=vm.runInContext('NASA_QUESTIONS',ctx);
assert.equal(qbank.length,23);assert.deepEqual([...new Set(qbank.map(q=>q.world))].sort(),['Earth','Mars','Moon']);
assert(qbank.every(q=>q.source.startsWith('https://science.nasa.gov/photojournal/')&&q.image.includes(q.id+'.jpg')));
assert.equal(get('engineOptions').children.length,3);assert.equal(get('tankOptions').children.length,3);
get('launchButton').click();assert.equal(state.leg,0);assert.equal(state.status,'quiz');
for(let leg=0;leg<4;leg++){
 assert.equal(state.leg,leg);assert.equal(state.status,'quiz');
 const opts=vm.runInContext('LEGS[state.leg].options',ctx);assert(opts.includes(state.question.world));
 state.progress=92;state.fuel=80;
 const q=state.question;const selected=get('answerButtons').children[opts.indexOf(q.world)];
 vm.runInContext(`answer(${JSON.stringify(q.world)},document.getElementById('answerButtons').children[${opts.indexOf(q.world)}])`,ctx);
 assert.equal(state.status,'answer');assert(state.progress>=100);
 get('nextQuestion').click();
 if(leg<3){assert.equal(state.status,'landing');get('dialogButton').click();assert.equal(state.leg,leg+1);assert.equal(state.status,'quiz')}
 else{assert.equal(state.status,'landing');assert(get('dialogTitle').textContent.includes('Welcome home'));get('dialogButton').click();assert.equal(state.status,'setup')}
}
get('launchButton').click();state.fuel=1;state.progress=0;const wrong=state.question.world==='Earth'?'Moon':'Earth';
vm.runInContext(`answer(${JSON.stringify(wrong)},document.getElementById('answerButtons').children[0])`,ctx);
get('nextQuestion').click();assert.equal(state.status,'failed');
console.log('PASS — 23 source records; setup; 4 legs; landing and refuel; victory; fuel-failure path.');
