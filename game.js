'use strict';
const $=id=>document.getElementById(id);
// Continuous adventure: Easy Earth → Moon → Mars, Medium Mars → Moon → Earth,
// Hard Earth → Moon → Mars, then endless Insane Mars ↔ Moon ↔ Earth ↔ Moon ↔ Mars.
// Insane begins on Mars and ends only after a wrong answer or running out of fuel.
const LEGS=[
  {from:'Earth',to:'Moon',options:['Earth','Moon'],name:'LUNAR APPROACH',subtitle:'Find the Moon among real NASA observations. Each correct decision brings you closer to the lunar base.',reward:'🌙 Lunar Navigator badge',message:'Moon Base Alpha: fuel tanks refilled. Next destination: Mars.'},
  {from:'Moon',to:'Mars',options:['Earth','Moon','Mars'],name:'THE RED PLANET',subtitle:'Identify Earth, Moon or Mars terrain to steer toward the red planet through deep space.',reward:'🔴 Mars Pathfinder badge',message:'Mars reached! Easy mission cleared. Your next flight begins from Mars on Medium.'},
  {from:'Mars',to:'Moon',options:['Earth','Moon','Mars'],name:'RETURN TO LUNAR ORBIT',subtitle:'The return journey tests whether you can distinguish Earth, Moon and Mars landscapes.',reward:'✨ Deep Space Voyager badge',message:'Lunar Base Alpha: fuel tanks refilled. Earth is waiting.'},
  {from:'Moon',to:'Earth',options:['Moon','Earth'],name:'MISSION HOME',subtitle:'Recognize Earth or Moon terrain and guide your spacecraft safely home.',reward:'🌍 Earth Return badge',message:'Earth reached! Medium mission cleared. The final expedition launches toward Mars on Hard.'},
  {from:'Earth',to:'Moon',options:['Earth','Moon'],name:'FINAL LUNAR APPROACH',subtitle:'The Hard expedition starts on Earth. Identify Earth and Moon landscapes to reach the lunar base.',reward:'🚀 Elite Lunar Navigator badge',message:'Lunar Base Alpha: refueled for the final push to Mars.'},
  {from:'Moon',to:'Mars',options:['Earth','Moon','Mars'],name:'FINAL MARS MISSION',subtitle:'Prove yourself on Hard! Reach Mars to unlock the endless Insane survival mode.',reward:'🏆 Hard Mode Champion trophy',message:'Hard complete! Endless Insane mode begins on Mars.'},
  {from:'Mars',to:'Moon',options:['Earth','Moon','Mars'],name:'INSANE: LUNAR RETURN',subtitle:'One mistake ends the run. Identify each landscape to survive the journey from Mars to the Moon.',reward:'☄️ Insane Lunar Landing',message:'Insane run continues: next flight goes to Earth.'},
  {from:'Moon',to:'Earth',options:['Earth','Moon'],name:'INSANE: EARTH LANDING',subtitle:'Trust your instincts. One wrong world means mission failure.',reward:'🌍 Insane Earth Landing',message:'You survived the return to Earth. Now launch again toward the Moon.'},
  {from:'Earth',to:'Moon',options:['Earth','Moon'],name:'INSANE: LUNAR APPROACH',subtitle:'The survival loop continues. No mistakes allowed!',reward:'🌕 Insane Lunar Landing',message:'Refuel and head toward Mars.'},
  {from:'Moon',to:'Mars',options:['Earth','Moon','Mars'],name:'INSANE: MARS LANDING',subtitle:'Identify Earth, Moon or Mars to survive the trip to the red planet.',reward:'🔴 Insane Mars Landing',message:'Welcome back to Mars. Next leg begins the loop again.'}
];
const INSANE_START_LEG=6;
const INSANE_LEG_COUNT=4;
function legAt(index){return index<LEGS.length?LEGS[index]:LEGS[INSANE_START_LEG+(index-INSANE_START_LEG)%INSANE_LEG_COUNT]}
function currentLeg(){return legAt(state.leg)}
const START_LEG_FOR_DIFFICULTY={easy:0,medium:2,hard:4,insane:6};
// Each difficulty is an automatic spacecraft/fuel profile; players choose only difficulty.
// Values are illustrative arcade mechanics, NOT physical mission-engineering calculations.
const DIFFICULTY={
  easy:{name:'Easy',tag:'Relaxed flight · +100 pts',icon:'✦',speed:18,burn:5,miss:8,setback:4,capacity:150,points:100,landing:250},
  medium:{name:'Medium',tag:'Balanced flight · +200 pts',icon:'◇',speed:13,burn:8,miss:12,setback:7,capacity:110,points:200,landing:500},
  hard:{name:'Hard',tag:'Tough flight · +350 pts',icon:'⚡',speed:12,burn:9,miss:16,setback:10,capacity:110,points:350,landing:900},
  insane:{name:'Insane',tag:'One mistake ends run · rising points',icon:'☄️',speed:12,burn:9,miss:110,setback:100,capacity:110,points:500,landing:1500}
};
const INSANE_POINT_GROWTH=1.10; // Every correct Insane answer awards 10% more than the last.
const DIFFICULTY_ORDER=['easy','medium','hard','insane'];
const UNLOCK_STORAGE_KEY='planet-impostor-unlocked-difficulty-v1';
const PHOTO_HISTORY_STORAGE_KEY='planet-impostor-recent-photo-ids-v1';
const PHOTO_CYCLE_STORAGE_KEY='planet-impostor-used-photo-ids-v1';
// Keep the complete used-image history until a leg has exhausted every eligible NASA image.
// Migrate Version 1.5's recent-image history when the new storage key is first introduced.
function readStoredPhotoIDs(key){try{const ids=JSON.parse(localStorage.getItem(key)||'[]');return Array.isArray(ids)?ids.filter(id=>typeof id==='string'):[]}catch{return []}}
function loadUsedPhotoIDs(){
  try {
    const known=new Set(NASA_QUESTIONS.map(q=>q.id));
    const current=localStorage.getItem(PHOTO_CYCLE_STORAGE_KEY);
    const ids=current===null?readStoredPhotoIDs(PHOTO_HISTORY_STORAGE_KEY):readStoredPhotoIDs(PHOTO_CYCLE_STORAGE_KEY);
    return new Set(ids.filter(id=>known.has(id)));
  } catch {return new Set()}
}
function saveUsedPhotoIDs(ids){try{localStorage.setItem(PHOTO_CYCLE_STORAGE_KEY,JSON.stringify([...ids]))}catch{}}
function loadRecentPhotoIDs(){return readStoredPhotoIDs(PHOTO_HISTORY_STORAGE_KEY).slice(-45)}
function saveRecentPhotoIDs(ids){try{localStorage.setItem(PHOTO_HISTORY_STORAGE_KEY,JSON.stringify(ids.slice(-45)))}catch{}}
function loadUnlockedRank(){
  try {const stored=Number(localStorage.getItem(UNLOCK_STORAGE_KEY));return Number.isInteger(stored)?Math.max(0,Math.min(DIFFICULTY_ORDER.length-1,stored)):0}
  catch {return 0} // Storage may be blocked; unlocks still work during this visit.
}
let unlockedRank=loadUnlockedRank();
function isUnlocked(key){return DIFFICULTY_ORDER.indexOf(key)<=unlockedRank}
function unlockNextDifficulty(key){
  const rank=DIFFICULTY_ORDER.indexOf(key);
  if(rank<0||rank>=DIFFICULTY_ORDER.length-1||unlockedRank>rank)return null;
  unlockedRank=rank+1;
  try{localStorage.setItem(UNLOCK_STORAGE_KEY,String(unlockedRank))}catch{}
  return DIFFICULTY_ORDER[unlockedRank];
}
const state={difficulty:'easy',leg:-1,progress:0,fuel:150,score:0,correct:0,wrong:0,seen:new Set(),visited:[],question:null,answered:false,photoLoaded:false,questionIndex:0,sound:true,usedPhotoIDs:loadUsedPhotoIDs(),lastIDs:loadRecentPhotoIDs(),status:'setup',insaneStreak:0,insaneLegsCompleted:0};
const shuffled=a=>{const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b};
function makeOptionCards(container,choices,selected,onSelect){
  const root=$(container);root.innerHTML='';
  Object.entries(choices).forEach(([key,v])=>{
    const locked=!isUnlocked(key);
    const b=document.createElement('button');
    b.className='pick-card'+(selected===key?' active':'')+(locked?' locked':'');
    b.type='button';b.disabled=locked;
    b.setAttribute('aria-pressed',String(selected===key&&!locked));
    if(locked)b.setAttribute('title',key==='medium'?'Reach Mars on Easy to unlock Medium':key==='hard'?'Return to Earth on Medium to unlock Hard':'Reach Mars on Hard to unlock Insane');
    const caption=locked?(key==='medium'?'Beat Easy to unlock':key==='hard'?'Beat Medium to unlock':'Beat Hard to unlock'):v.tag;
    b.innerHTML=`<span class="pick-symbol">${locked?'🔒':v.icon}</span><strong>${v.name}</strong><small>${caption}</small>`;
    if(!locked)b.addEventListener('click',()=>onSelect(key));
    root.append(b);
  });
}
function drawSetup(){
  if(!isUnlocked(state.difficulty))state.difficulty='easy';
  makeOptionCards('difficultyOptions',DIFFICULTY,state.difficulty,key=>{state.difficulty=key;drawSetup()});
  const d=DIFFICULTY[state.difficulty];
  $('difficultyHint').textContent=unlockedRank===0?'Reach Mars on Easy to unlock Medium.':unlockedRank===1?'Medium unlocked! Return to Earth on Medium to unlock Hard.':unlockedRank===2?'Hard unlocked! Reach Mars on Hard to unlock Insane.':'Insane unlocked! Survive as long as you can with no wrong answers.';
  $('designReport').innerHTML=`<b>${d.name.toUpperCase()} FLIGHT RULES</b><br>+${d.speed}% per correct answer · ${state.difficulty==='insane'?'One wrong answer ends your run':'−'+d.setback+'% per wrong answer'}<br>${d.burn} fuel per correct · ${d.capacity} fuel at takeoff.<br>${state.difficulty==='insane'?'First correct: +500 points; each next correct earns 10% more. Endless journey.':'Correct answer: +'+d.points+' points.'}<br><small>Flight and fuel values are simplified for gameplay, not real NASA trajectory calculations.</small>`;
  const openingLeg=legAt(START_LEG_FOR_DIFFICULTY[state.difficulty]);
  setPlanet($('planetStart'),openingLeg.from);setPlanet($('planetEnd'),openingLeg.to);
  $('sceneFrom').textContent=openingLeg.from.toUpperCase();$('sceneTo').textContent=openingLeg.to.toUpperCase();
  $('flightMessage').textContent='Spacecraft ready for '+d.name+' · '+openingLeg.from+' → '+openingLeg.to+'.';
  state.fuel=d.capacity;updateHUD();
}
function formatScore(num){
  if(!Number.isFinite(num))return 'MAX';
  if(num<1e10)return Math.round(num).toLocaleString('en-US');
  if(num<1e15)return new Intl.NumberFormat('en-US',{notation:'compact',maximumFractionDigits:2}).format(num);
  return num.toExponential(2);
}
function insaneAward(streak){return Math.min(Number.MAX_VALUE,Math.round(DIFFICULTY.insane.points*Math.pow(INSANE_POINT_GROWTH,streak-1)))}
function updateHUD(){const max=DIFFICULTY[state.difficulty].capacity;const fuelPct=Math.max(0,Math.min(100,100*state.fuel/max));$('progressValue').textContent=Math.round(state.progress)+'%';$('progressBar').style.width=state.progress+'%';$('fuelValue').textContent=`${state.fuel} / ${max}`;$('fuelBar').style.width=fuelPct+'%';$('fuelBar').classList.toggle('low',fuelPct<=25);$('score').textContent=formatScore(state.score);$('correctCount').textContent=state.correct;$('wrongCount').textContent=state.wrong;$('discoveryCount').textContent=state.seen.size;updateShipPosition()}
function updateShipPosition(){const p=state.progress/100;const x=18+64*p;const y=55-37.3*4*p*(1-p);$('ship').style.left=x+'%';$('ship').style.top=y+'%'}
function setPlanet(el,world){el.className='planet planet-'+world.toLowerCase();el.querySelector('.planet-name').textContent=world.toUpperCase()}
function updateLegUI(){const leg=currentLeg();$('stageTitle').innerHTML=leg.name.replace(' ', '<br><span>')+'</span>';$('stageSubtitle').textContent=leg.subtitle;$('stageCounter').innerHTML=state.difficulty==='insane'?String(state.insaneLegsCompleted+1)+'<span>/ ∞</span>':(state.leg+1)+'<span>/ 6</span>';$('flightStatus').textContent=state.difficulty.toUpperCase()+' · FLIGHT '+String(state.difficulty==='insane'?state.insaneLegsCompleted+1:state.leg+1).padStart(2,'0')+' ACTIVE';setPlanet($('planetStart'),leg.from);setPlanet($('planetEnd'),leg.to);$('sceneFrom').textContent=leg.from.toUpperCase();$('sceneTo').textContent=leg.to.toUpperCase();$('questionPhase').textContent=leg.options.join(' OR ').toUpperCase()+'?';$('questionPhase').classList.toggle('three-worlds',leg.options.length===3);$('flightMessage').textContent=leg.from+' → '+leg.to+' · Navigate by identifying the worlds in NASA imagery.';updateHUD()}
let audioCtx;
function beep(frequency=500,duration=.13,type='sine',volume=.09){if(!state.sound)return;try{audioCtx=audioCtx||new(window.AudioContext||window.webkitAudioContext)();const oscillator=audioCtx.createOscillator(),gain=audioCtx.createGain();oscillator.type=type;oscillator.frequency.value=frequency;gain.gain.setValueAtTime(volume,audioCtx.currentTime);gain.gain.exponentialRampToValueAtTime(.001,audioCtx.currentTime+duration);oscillator.connect(gain).connect(audioCtx.destination);oscillator.start();oscillator.stop(audioCtx.currentTime+duration)}catch{}}
function chime(){beep(680,.17,'triangle');setTimeout(()=>beep(920,.28,'triangle'),95)}
function choosePhoto(){
  const options=currentLeg().options;
  const candidates=NASA_QUESTIONS.filter(q=>options.includes(q.world));
  let unused=candidates.filter(q=>!state.usedPhotoIDs.has(q.id));
  if(!unused.length){
    // Only start a new cycle after all images available for this leg have been shown.
    // Keep the use records for worlds that cannot appear on this leg.
    candidates.forEach(q=>state.usedPhotoIDs.delete(q.id));
    unused=candidates;
  }
  // Prefer variety among the still-unused candidates; never relax the no-repeat rule.
  const recent=new Set(state.lastIDs.slice(-22));
  let pool=unused.filter(q=>!recent.has(q.id));
  if(!pool.length)pool=unused;
  // Mix the eligible worlds, too: avoid long streaks of the same world.
  const lastWorlds=state.lastIDs.slice(-6).map(id=>NASA_QUESTIONS.find(q=>q.id===id)?.world);
  const frequency=Object.fromEntries(options.map(world=>[world,lastWorlds.filter(w=>w===world).length]));
  const least=Math.min(...pool.map(q=>frequency[q.world]));
  const balanced=pool.filter(q=>frequency[q.world]===least);
  if(balanced.length)pool=balanced;
  const q=pool[Math.floor(Math.random()*pool.length)];
  state.usedPhotoIDs.add(q.id);
  saveUsedPhotoIDs(state.usedPhotoIDs);
  state.lastIDs.push(q.id);
  if(state.lastIDs.length>45)state.lastIDs=state.lastIDs.slice(-45);
  saveRecentPhotoIDs(state.lastIDs);
  return q;
}
function showQuestion(){state.status='quiz';state.answered=false;state.questionIndex++;const q=state.question=choosePhoto();$('questionScreen').classList.remove('hidden');$('setupScreen').classList.add('hidden');$('questionCode').textContent='NASA OBSERVATION // '+q.id;$('questionNumber').textContent=String(state.questionIndex).padStart(2,'0');$('imageStatus').textContent='CONNECTING…';$('photoFallback').classList.add('hidden');$('fallbackClue').classList.add('hidden');$('resultBox').classList.add('hidden');$('questionFooter').classList.remove('hidden');$('scoreHint').textContent=state.difficulty==='insane'?'☄️ INSANE · NEXT CORRECT +'+formatScore(insaneAward(state.insaneStreak+1))+' POINTS · +10% PER CORRECT ANSWER':'✓ CORRECT ANSWER = +'+formatScore(DIFFICULTY[state.difficulty].points)+' POINTS';$('answerButtons').innerHTML='';$('answerButtons').classList.toggle('three-choices',currentLeg().options.length===3);
  const photo=$('nasaPhoto');photo.style.display='block';photo.alt='NASA terrain observation. Identify its origin from '+currentLeg().options.join(', ')+'.';photo.onload=()=>{if(state.question!==q)return;state.photoLoaded=true;$('imageStatus').textContent='NASA IMAGE · '+q.id};photo.onerror=()=>{if(state.question!==q)return;state.photoLoaded=false;photo.style.display='none';$('imageStatus').textContent='IMAGE OFFLINE';$('photoFallback').classList.remove('hidden');$('fallbackClue').textContent='NASA image unavailable. Check your connection or reload the game.';$('fallbackClue').classList.remove('hidden')};photo.src=q.image;currentLeg().options.forEach((world,i)=>{const b=document.createElement('button');b.type='button';b.className='answer-option';b.textContent=(i+1)+'  ·  '+world.toUpperCase();b.addEventListener('click',()=>answer(world,b));$('answerButtons').append(b)})}
function answer(world,button){
  if(state.status!=='quiz'||state.answered)return;
  state.answered=true;state.status='answer';
  const q=state.question,correct=world===q.world,d=DIFFICULTY[state.difficulty];
  const consumption=correct?d.burn:d.miss;
  let earned=0;
  if(correct){
    state.progress=Math.min(100,state.progress+d.speed);
    state.correct++;
    if(state.difficulty==='insane'){
      state.insaneStreak++;
      earned=insaneAward(state.insaneStreak);
    }else earned=d.points;
    state.score=Math.min(Number.MAX_VALUE,state.score+earned);
    state.seen.add(q.id);
    chime();
    $('flightMessage').textContent='Correct! +'+formatScore(earned)+' points. Thrusters firing toward '+currentLeg().to+'.';
  }else{
    state.wrong++;
    if(state.difficulty!=='insane'){
      state.progress=Math.max(0,state.progress-d.setback);
      state.score=Math.max(0,state.score-25);
    }
    beep(190,.25,'sawtooth',.06);
    $('flightMessage').textContent=state.difficulty==='insane'?'One wrong answer! Insane run over.':'Navigation correction! The ship drifted backward.';
  }
  state.fuel=Math.max(0,state.fuel-consumption);
  $('resultBox').classList.remove('hidden');
  $('resultHeadline').textContent=(correct?'✓ CORRECT · ':'✕ NOT QUITE · ')+q.world.toUpperCase()+' · '+(correct?'+'+d.speed:'−'+d.setback)+'% · −'+consumption+' FUEL'+(correct?' · +'+formatScore(earned)+' PTS':'');
  $('resultHeadline').style.color=correct?'#b8fc65':'#ffc08a';
  $('resultFact').textContent=q.name+' — '+q.region+'. '+q.fact+' Source: '+q.mission+(q.enhanced?' (enhanced-color image).':'.');
  $('resultSource').href=q.source;
  $('resultSource').textContent=(q.id.startsWith('PIA')?'NASA Photojournal ':'NASA image source · ')+q.id+' ↗';
  [...$('answerButtons').children].forEach(b=>{b.disabled=true;const val=b.textContent.split('·')[1]?.trim().toLowerCase();if(val===q.world.toLowerCase())b.classList.add('success');if(b===button&&!correct)b.classList.add('failure')});
  $('questionFooter').classList.add('hidden');
  updateHUD();saveTelemetry();
  if(!correct&&state.difficulty==='insane'){
    missionFailed('wrong',q);return; // No extra chance or retrying the failed leg.
  }
  $('nextQuestion').textContent=state.progress>=100?'LAND AT '+currentLeg().to.toUpperCase()+' →':state.fuel<=0?'VIEW MISSION RESULT →':'CONTINUE FLIGHT →';
}
function nextStep(){if(state.progress>=100){stageCompleted();return}if(state.fuel<=0){missionFailed('fuel');return}showQuestion()}
function showDialog(icon,overline,title,description,reward,buttonText,onClick){$('dialogIcon').textContent=icon;$('dialogOverline').textContent=overline;$('dialogTitle').textContent=title;$('dialogDescription').textContent=description;$('dialogReward').innerHTML=reward;$('dialogButton').innerHTML=buttonText+' <span>→</span>';$('dialogOverlay').classList.remove('hidden');$('dialogSecondary').classList.add('hidden');$('dialogButton').onclick=()=>{$('dialogOverlay').classList.add('hidden');onClick()}}
function stageCompleted(){
  const leg=currentLeg(),completed=state.difficulty;
  state.status='landing';
  state.score=Math.min(Number.MAX_VALUE,state.score+DIFFICULTY[completed].landing);
  state.visited.push(leg.to);
  updateHUD();chime();
  if(state.leg===1||state.leg===3||state.leg===5){
    const nextDifficulty=completed==='easy'?'medium':completed==='medium'?'hard':'insane';
    const newlyUnlocked=!isUnlocked(nextDifficulty);
    unlockNextDifficulty(completed);
    state.difficulty=nextDifficulty;
    if(nextDifficulty==='insane'){state.insaneStreak=0;state.insaneLegsCompleted=0}
    state.fuel=DIFFICULTY[nextDifficulty].capacity;
    updateHUD();
    const milestone=completed==='medium'?'Earth reached!':'Mars reached!';
    const intro=nextDifficulty==='insane'?' Insane mode is endless: one wrong answer ends the run. Each correct answer earns 10% more than the previous one.':'';
    showDialog(completed==='medium'?'🌍':completed==='hard'?'🏆':'🔴',completed.toUpperCase()+' COMPLETE',milestone,
      'You completed '+completed.toUpperCase()+'! Your ship refuels and continues automatically on '+nextDifficulty.toUpperCase()+' from '+leg.to+'.'+intro,
      `<strong>${leg.reward}</strong><br>${newlyUnlocked?'🔓 '+nextDifficulty.toUpperCase()+' MODE UNLOCKED!':nextDifficulty.toUpperCase()+' MODE READY'}<br>Fuel refilled to ${state.fuel}.`,
      'CONTINUE ON '+nextDifficulty.toUpperCase(),()=>startLeg(state.leg+1));
    return;
  }
  if(completed==='insane'){
    state.insaneLegsCompleted++;
    showDialog(leg.to==='Moon'?'🌕':leg.to==='Mars'?'🔴':'🌍','INSANE SURVIVAL · '+state.insaneLegsCompleted+' LEGS',leg.to+' reached!',
      'You survived another Insane flight! Your '+state.insaneStreak+'-answer streak keeps growing. One incorrect answer ends the run.',
      `<strong>${leg.reward}</strong><br>Score: ${formatScore(state.score)} · Next correct answer: +${formatScore(insaneAward(state.insaneStreak+1))} points<br>Fuel refilled at landing.`,
      'CONTINUE INSANE RUN',()=>startLeg(state.leg+1));
    return;
  }
  showDialog(leg.to==='Moon'?'🌕':leg.to==='Mars'?'🔴':'🌍','LANDING CONFIRMED',leg.to+' reached!',
    'Your crew has safely arrived at '+leg.to+'. '+leg.message,
    `<strong>${leg.reward}</strong><br>Landing bonus: +${formatScore(DIFFICULTY[completed].landing)} points<br>Fuel refilled at landing.`,
    'LAUNCH NEXT LEG',()=>startLeg(state.leg+1));
}
function missionFailed(reason='fuel',question=null){
  state.status='failed';beep(150,.45,'sawtooth');
  if(state.difficulty==='insane'){
    const isWrong=reason==='wrong';
    const explanation=isWrong?'The correct answer was '+question.world+'. '+question.name+' — '+question.region+'.':'Your spacecraft ran out of fuel.';
    showDialog('💥','INSANE SURVIVAL ENDED',isWrong?'One wrong answer — game over!':'Out of fuel — game over!',
      explanation+' You survived '+state.insaneLegsCompleted+' complete Insane flights and earned '+state.insaneStreak+' consecutive correct answers. The run is over.',
      `<strong>FINAL SURVIVAL SCORE</strong><br>${formatScore(state.score)} points · ${state.insaneStreak} Insane correct answers`,
      'NEW INSANE RUN',()=>{state.difficulty='insane';resetGame();startLeg(INSANE_START_LEG)});
    $('dialogSecondary').textContent='BACK TO DIFFICULTY SELECTION';
    $('dialogSecondary').classList.remove('hidden');
    $('dialogSecondary').onclick=()=>{$('dialogOverlay').classList.add('hidden');resetGame()};
    return;
  }
  showDialog('🚨','MISSION FAILED','Out of fuel','Your ship ran out of fuel on the way from '+currentLeg().from+' to '+currentLeg().to+'. You can retry this leg with a full tank, or choose another difficulty.',`<strong>FLIGHT REPORT</strong><br>Progress: ${state.progress}% · Score: ${formatScore(state.score)}<br>Tip: Easy mode gives you more fuel and smaller penalties.`, 'RETRY THIS LEG',()=>startLeg(state.leg));
  $('dialogSecondary').textContent='CHOOSE DIFFICULTY';
  $('dialogSecondary').classList.remove('hidden');
  $('dialogSecondary').onclick=()=>{$('dialogOverlay').classList.add('hidden');resetGame()};
}
function startLeg(index){
  if(!isUnlocked(state.difficulty))return;
  state.leg=index;state.progress=0;
  state.fuel=DIFFICULTY[state.difficulty].capacity;
  state.questionIndex=0;
  updateLegUI();showQuestion();
}
function resetGame(){state.leg=-1;state.progress=0;state.correct=0;state.wrong=0;state.score=0;state.seen=new Set();state.visited=[];state.question=null;state.status='setup';state.insaneStreak=0;state.insaneLegsCompleted=0;$('setupScreen').classList.remove('hidden');$('questionScreen').classList.add('hidden');$('stageTitle').innerHTML='THE JOURNEY<br><span>STARTS HERE.</span>';$('stageSubtitle').textContent='Choose a difficulty, then use NASA landscape clues to navigate across the Solar System.';$('stageCounter').innerHTML='0<span>/ 6</span>';$('flightStatus').textContent='STANDBY';setPlanet($('planetStart'),'Earth');setPlanet($('planetEnd'),'Moon');$('sceneFrom').textContent='EARTH';$('sceneTo').textContent='MOON';$('flightMessage').textContent='Spacecraft awaiting launch. Choose your difficulty.';drawSetup();saveTelemetry()}
function saveTelemetry(){try{sessionStorage.setItem('planet-impostor-latest',JSON.stringify({leg:state.leg,progress:state.progress,fuel:state.fuel,score:state.score,correct:state.correct,wrong:state.wrong}))}catch{}}
function drawStars(){const c=$('stars'),ctx=c.getContext('2d');if(!ctx)return;const w=window.innerWidth,h=window.innerHeight;const dpr=Math.min(devicePixelRatio||1,2);c.width=w*dpr;c.height=h*dpr;c.style.width=w+'px';c.style.height=h+'px';ctx.scale(dpr,dpr);let seed=93;const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};ctx.clearRect(0,0,w,h);for(let i=0;i<Math.floor(w*h/4800);i++){const x=rand()*w,y=rand()*h,r=rand()*1.3+.2;ctx.fillStyle=`rgba(198,228,255,${rand()*.5+.12})`;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill()}}
$('launchButton').addEventListener('click',()=>{if(!isUnlocked(state.difficulty))return;beep(430,.25,'triangle');startLeg(START_LEG_FOR_DIFFICULTY[state.difficulty])});
$('nextQuestion').addEventListener('click',nextStep);
$('soundToggle').addEventListener('click',()=>{state.sound=!state.sound;$('soundToggle').textContent=state.sound?'♪':'♩';$('soundToggle').setAttribute('aria-label',state.sound?'Mute sounds':'Unmute sounds')});
$('helpToggle').addEventListener('click',()=>$('helpOverlay').classList.remove('hidden'));
$('closeHelp').addEventListener('click',()=>$('helpOverlay').classList.add('hidden'));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){$('helpOverlay').classList.add('hidden');return}if(state.status==='quiz'&&['1','2','3'].includes(e.key)){const i=Number(e.key)-1;const choice=currentLeg()?.options[i];const b=$('answerButtons').children[i];if(choice&&b)answer(choice,b)}else if(state.status==='answer'&&e.key==='Enter')nextStep()});
window.addEventListener('resize',drawStars);
resetGame();drawStars();
if(typeof expandNasaQuestionLibrary==='function'&&typeof fetch==='function') {
  expandNasaQuestionLibrary().then(counts=>{
    console.info('Planet Impostor NASA image catalog:',counts,'total',NASA_QUESTIONS.length);
    const note=$('nasaLibraryStatus');
    if(note)note.textContent=`NASA image library: ${NASA_QUESTIONS.length} / 170 available` ;
  }).catch(()=>{});
}
