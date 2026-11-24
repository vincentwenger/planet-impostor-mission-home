'use strict';
const $=id=>document.getElementById(id);
// Every difficulty starts on Earth and completes the same three-flight loop:
// Earth → Moon → Mars → Earth. Landing back on Earth advances Easy → Medium → Hard
// → endless Insane. Insane repeats that route indefinitely until a wrong answer
// or depleted fuel ends the survival run.
const LEGS=[
  // Easy: Earth → Moon → Mars → Earth.
  {from:'Earth',to:'Moon',options:['Earth','Moon'],name:'LUNAR APPROACH',subtitle:'Find the Moon among real NASA observations. Each correct decision brings you closer to the lunar base.',reward:'🌙 Lunar Navigator badge',message:'Moon Base Alpha: fuel tanks refilled. Next destination: Mars.'},
  {from:'Moon',to:'Mars',options:['Moon','Mars'],name:'THE RED PLANET',subtitle:'Identify Moon or Mars terrain to steer toward the red planet through deep space.',reward:'🔴 Mars Pathfinder badge',message:'Mars reached! Refuel and begin the journey home to Earth.'},
  {from:'Mars',to:'Earth',options:['Mars','Earth'],name:'MISSION HOME',subtitle:'Identify Mars or Earth landscapes on your journey back home.',reward:'🌍 Easy Earth Return badge',message:'Earth reached! Easy mission cleared. The Medium expedition begins on Earth.'},
  // Medium: the same complete round trip, with higher difficulty and points.
  {from:'Earth',to:'Moon',options:['Earth','Moon'],name:'MEDIUM: LUNAR APPROACH',subtitle:'Start a new expedition from Earth and identify Earth or Moon imagery.',reward:'✨ Medium Lunar Navigator badge',message:'Moon reached! Fuel refilled for the flight to Mars.'},
  {from:'Moon',to:'Mars',options:['Moon','Mars'],name:'MEDIUM: RED PLANET',subtitle:'Tell Moon and Mars terrain apart to continue your Medium expedition.',reward:'🚀 Medium Mars Pathfinder badge',message:'Mars reached! Head straight back to Earth.'},
  {from:'Mars',to:'Earth',options:['Mars','Earth'],name:'MEDIUM: RETURN HOME',subtitle:'Identify Mars or Earth landscapes to complete the Medium expedition.',reward:'🌍 Medium Earth Return badge',message:'Earth reached! Medium mission cleared. Hard begins from home.'},
  // Hard: one more complete Earth → Moon → Mars → Earth loop.
  {from:'Earth',to:'Moon',options:['Earth','Moon'],name:'HARD: LUNAR APPROACH',subtitle:'Launch from Earth for a challenging lunar approach.',reward:'⚡ Elite Lunar Navigator badge',message:'Moon reached! Refueled for the challenging voyage to Mars.'},
  {from:'Moon',to:'Mars',options:['Moon','Mars'],name:'HARD: RED PLANET',subtitle:'Use NASA Moon and Mars observations to navigate this demanding flight.',reward:'🔴 Elite Mars Pathfinder badge',message:'Mars reached! Return to Earth to unlock Insane survival mode.'},
  {from:'Mars',to:'Earth',options:['Mars','Earth'],name:'HARD: MISSION HOME',subtitle:'Recognize Mars or Earth to finish Hard and unlock the ultimate survival challenge.',reward:'🏆 Hard Mode Champion trophy',message:'Earth reached! Hard complete. Endless Insane begins on Earth.'},
  // Insane repeats these three flights forever until the player loses.
  {from:'Earth',to:'Moon',options:['Earth','Moon'],name:'INSANE: LUNAR APPROACH',subtitle:'Survive the flight from Earth to the Moon. One wrong answer ends your run.',reward:'🌕 Insane Lunar Landing',message:'Refuel and head for Mars. Your streak carries over.'},
  {from:'Moon',to:'Mars',options:['Moon','Mars'],name:'INSANE: RED PLANET',subtitle:'Identify Moon or Mars to survive another flight.',reward:'🔴 Insane Mars Landing',message:'Mars reached! Return directly to Earth without making a mistake.'},
  {from:'Mars',to:'Earth',options:['Mars','Earth'],name:'INSANE: EARTH RETURN',subtitle:'Distinguish Mars from Earth terrain. One mistake ends the run.',reward:'🌍 Insane Earth Return',message:'You are home! Start another endless three-flight cycle.'}
];
const INSANE_START_LEG=9;
const INSANE_LEG_COUNT=3;
function legAt(index){return index<LEGS.length?LEGS[index]:LEGS[INSANE_START_LEG+(index-INSANE_START_LEG)%INSANE_LEG_COUNT]}
function currentLeg(){return legAt(state.leg)}
const START_LEG_FOR_DIFFICULTY={easy:0,medium:3,hard:6,insane:9};
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
const GEARS={eco:{label:"ECO",speed:.5,burn:.4,miss:.6,setback:.5,points:.75},cruise:{label:"CRUISE",speed:1,burn:1,miss:1,setback:1,points:1},warp:{label:"WARP",speed:2,burn:2.5,miss:2,setback:2,points:2}};
const GEAR_ORDER=["eco","cruise","warp"];
const state={gear:"cruise",difficulty:'easy',leg:-1,progress:0,fuel:150,score:0,correct:0,wrong:0,seen:new Set(),visited:[],question:null,answered:false,photoLoaded:false,questionIndex:0,sound:true,usedPhotoIDs:loadUsedPhotoIDs(),lastIDs:loadRecentPhotoIDs(),status:'setup',insaneStreak:0,insaneLegsCompleted:0};
const shuffled=a=>{const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b};
function gearProfile(){const d=DIFFICULTY[state.difficulty],g=GEARS[state.gear];return {speed:Math.max(1,Math.round(d.speed*g.speed)),burn:Math.max(1,Math.ceil(d.burn*g.burn)),miss:Math.ceil(d.miss*g.miss),setback:Math.ceil(d.setback*g.setback),points:Math.round((state.difficulty==='insane'?insaneAward(state.insaneStreak+1):d.points)*g.points)}}
function renderGear(){const p=gearProfile();for(const key of GEAR_ORDER){const b=$('gear'+key[0].toUpperCase()+key.slice(1));b.setAttribute('aria-pressed',String(key===state.gear));b.disabled=state.status!=='quiz'||state.answered;} $('gearInfo').textContent=`${GEARS[state.gear].label} · Correct: +${p.speed}% / −${p.burn} fuel / +${formatScore(p.points)} pts · Wrong: −${p.setback}% / −${p.miss} fuel${state.difficulty==='insane'?' / RUN ENDS':''}`;$('spaceScene').classList.toggle('warp-drive',state.gear==='warp');$('spaceScene').classList.toggle('eco-drive',state.gear==='eco');$('scoreHint').textContent='SHIFT DRIVE · NEXT CORRECT +'+formatScore(p.points)+' POINTS';}
function setGear(key){if(state.status!=='quiz'||state.answered||!GEARS[key])return;state.gear=key;renderGear();beep(key==='warp'?880:key==='eco'?330:550,.09,'triangle',.045);}
function makeOptionCards(container,choices,selected,onSelect){
  const root=$(container);root.innerHTML='';
  Object.entries(choices).forEach(([key,v])=>{
    const locked=!isUnlocked(key);
    const b=document.createElement('button');
    b.className='pick-card'+(selected===key?' active':'')+(locked?' locked':'');
    b.type='button';b.disabled=locked;
    b.setAttribute('aria-pressed',String(selected===key&&!locked));
    if(locked)b.setAttribute('title',key==='medium'?'Return to Earth on Easy to unlock Medium':key==='hard'?'Return to Earth on Medium to unlock Hard':'Return to Earth on Hard to unlock Insane');
    const caption=locked?(key==='medium'?'Beat Easy to unlock':key==='hard'?'Beat Medium to unlock':'Beat Hard to unlock'):v.tag;
    b.innerHTML=`<span class="pick-symbol">${locked?'🔒':v.icon}</span><strong>${v.name}</strong><small>${caption}</small>`;
    if(!locked)b.addEventListener('click',()=>onSelect(key));
    root.append(b);
  });
}
function drawSetup(){
  setVisualMode();
  if(!isUnlocked(state.difficulty))state.difficulty='easy';
  makeOptionCards('difficultyOptions',DIFFICULTY,state.difficulty,key=>{state.difficulty=key;drawSetup()});
  const d=DIFFICULTY[state.difficulty];
  $('difficultyHint').textContent=unlockedRank===0?'Finish Earth → Moon → Mars → Earth on Easy to unlock Medium.':unlockedRank===1?'Medium unlocked! Return to Earth on Medium to unlock Hard.':unlockedRank===2?'Hard unlocked! Return to Earth on Hard to unlock Insane.':'Insane unlocked! Survive endless Earth → Moon → Mars → Earth cycles with no wrong answers.';
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
// v1.14 visual-only cues. The mission state, score, NASA photo selection and fuel are unchanged.
function setVisualMode(){
  const mode=state.difficulty;
  if(!document.body || !document.body.classList)return;
  DIFFICULTY_ORDER.forEach(name=>document.body.classList.remove('mode-'+name));
  document.body.classList.add('mode-'+mode);
}
function playSceneEffect(effect,amount){
  const scene=$('spaceScene'),pop=$('scorePop');
  ['correct','wrong','launch','landing'].forEach(name=>scene.classList.remove('fx-'+name));
  if(pop)pop.classList.remove('visible');
  // Restart the CSS animation even when the same answer effect occurs consecutively.
  void scene.offsetWidth;
  scene.classList.add('fx-'+effect);
  if(effect==='correct'&&pop){pop.textContent='+'+formatScore(amount)+' PTS';pop.classList.add('visible')}
  if(typeof setTimeout==='function')setTimeout(()=>{scene.classList.remove('fx-'+effect);if(pop)pop.classList.remove('visible')},1250);
}
function updateHUD(){const max=DIFFICULTY[state.difficulty].capacity;const fuelPct=Math.max(0,Math.min(100,100*state.fuel/max));$('progressValue').textContent=Math.round(state.progress)+'%';$('progressBar').style.width=state.progress+'%';$('fuelValue').textContent=`${state.fuel} / ${max}`;$('fuelBar').style.width=fuelPct+'%';$('fuelBar').classList.toggle('low',fuelPct<=25);$('score').textContent=formatScore(state.score);$('correctCount').textContent=state.correct;$('wrongCount').textContent=state.wrong;$('discoveryCount').textContent=state.seen.size;updateShipPosition()}
function updateShipPosition(){const p=state.progress/100;const x=18+64*p;const y=55-37.3*4*p*(1-p);$('ship').style.left=x+'%';$('ship').style.top=y+'%';$('scorePop').style.left=x+'%';$('scorePop').style.top=(y-11)+'%'}
function setPlanet(el,world){el.className='planet planet-'+world.toLowerCase();el.querySelector('.planet-name').textContent=world.toUpperCase()}
function updateLegUI(){setVisualMode();const leg=currentLeg();$('stageTitle').innerHTML=leg.name.replace(' ', '<br><span>')+'</span>';$('stageSubtitle').textContent=leg.subtitle;$('stageCounter').innerHTML=state.difficulty==='insane'?String(state.insaneLegsCompleted+1)+'<span>/ ∞</span>':(state.leg+1)+'<span>/ 9</span>';$('flightStatus').textContent=state.difficulty.toUpperCase()+' · FLIGHT '+String(state.difficulty==='insane'?state.insaneLegsCompleted+1:state.leg+1).padStart(2,'0')+' ACTIVE';setPlanet($('planetStart'),leg.from);setPlanet($('planetEnd'),leg.to);$('sceneFrom').textContent=leg.from.toUpperCase();$('sceneTo').textContent=leg.to.toUpperCase();$('questionPhase').textContent=leg.options.join(' OR ').toUpperCase()+'?';$('questionPhase').classList.toggle('three-worlds',leg.options.length===3);$('flightMessage').textContent=leg.from+' → '+leg.to+' · Navigate by identifying the worlds in NASA imagery.';updateHUD()}
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
  const photo=$('nasaPhoto');photo.style.display='block';photo.alt='NASA terrain observation. Identify its origin from '+currentLeg().options.join(', ')+'.';photo.onload=()=>{if(state.question!==q)return;state.photoLoaded=true;$('imageStatus').textContent='NASA IMAGE · '+q.id};photo.onerror=()=>{if(state.question!==q)return;state.photoLoaded=false;photo.style.display='none';$('imageStatus').textContent='IMAGE OFFLINE';$('photoFallback').classList.remove('hidden');$('fallbackClue').textContent='NASA image unavailable. Check your connection or reload the game.';$('fallbackClue').classList.remove('hidden')};photo.src=q.image;currentLeg().options.forEach((world,i)=>{const b=document.createElement('button');b.type='button';b.className='answer-option';b.textContent=(i+1)+'  ·  '+world.toUpperCase();b.addEventListener('click',()=>answer(world,b));$('answerButtons').append(b)});renderGear()}
function answer(world,button){
  if(state.status!=='quiz'||state.answered)return;
  state.answered=true;state.status='answer';
  const q=state.question,correct=world===q.world,d=DIFFICULTY[state.difficulty];
  const profile=gearProfile();
  const consumption=correct?profile.burn:profile.miss;
  let earned=0;
  if(correct){
    state.progress=Math.min(100,state.progress+profile.speed);
    state.correct++;
    if(state.difficulty==='insane'){
      state.insaneStreak++;
      earned=profile.points;
    }else earned=profile.points;
    state.score=Math.min(Number.MAX_VALUE,state.score+earned);
    state.seen.add(q.id);
    playSceneEffect('correct',earned);
    chime();
    $('flightMessage').textContent='Correct! +'+formatScore(earned)+' points. Thrusters firing toward '+currentLeg().to+'.';
  }else{
    state.wrong++;
    if(state.difficulty!=='insane'){
      state.progress=Math.max(0,state.progress-profile.setback);
      state.score=Math.max(0,state.score-25);
    }
    playSceneEffect('wrong');
    beep(190,.25,'sawtooth',.06);
    $('flightMessage').textContent=state.difficulty==='insane'?'One wrong answer! Insane run over.':'Navigation correction! The ship drifted backward.';
  }
  state.fuel=Math.max(0,state.fuel-consumption);
  $('resultBox').classList.remove('hidden');
  $('resultHeadline').textContent=(correct?'✓ CORRECT · ':'✕ NOT QUITE · ')+q.world.toUpperCase()+' · '+(correct?'+'+profile.speed:'−'+profile.setback)+'% · −'+consumption+' FUEL'+(correct?' · +'+formatScore(earned)+' PTS':'');
  $('resultHeadline').style.color=correct?'#b8fc65':'#ffc08a';
  $('resultFact').textContent=q.name+' — '+q.region+'. '+q.fact+' Source: '+q.mission+(q.enhanced?' (enhanced-color image).':'.');
  $('resultSource').href=q.source;
  $('resultSource').textContent=(q.id.startsWith('PIA')?'NASA Photojournal ':'NASA image source · ')+q.id+' ↗';
  [...$('answerButtons').children].forEach(b=>{b.disabled=true;const val=b.textContent.split('·')[1]?.trim().toLowerCase();if(val===q.world.toLowerCase())b.classList.add('success');if(b===button&&!correct)b.classList.add('failure')});
  $('questionFooter').classList.add('hidden');
  renderGear();updateHUD();saveTelemetry();
  if(!correct&&state.difficulty==='insane'){
    missionFailed('wrong',q);return; // No extra chance or retrying the failed leg.
  }
  $('nextQuestion').textContent=state.progress>=100?'LAND AT '+currentLeg().to.toUpperCase()+' →':state.fuel<=0?'VIEW MISSION RESULT →':'CONTINUE FLIGHT →';
}
function nextStep(){if(state.progress>=100){stageCompleted();return}if(state.fuel<=0){missionFailed('fuel');return}showQuestion()}
function showDialog(icon,overline,title,description,reward,buttonText,onClick){const overlay=$('dialogOverlay');overlay.classList.toggle('is-failure',overline.includes('FAILED')||overline.includes('ENDED'));overlay.classList.toggle('is-celebration',overline.includes('COMPLETE')||overline.includes('CONFIRMED')||overline.startsWith('INSANE SURVIVAL ·'));$('dialogIcon').textContent=icon;$('dialogOverline').textContent=overline;$('dialogTitle').textContent=title;$('dialogDescription').textContent=description;$('dialogReward').innerHTML=reward;$('dialogButton').innerHTML=buttonText+' <span>→</span>';$('dialogOverlay').classList.remove('hidden');$('dialogSecondary').classList.add('hidden');$('dialogButton').onclick=()=>{$('dialogOverlay').classList.add('hidden');onClick()}}
function stageCompleted(){
  const leg=currentLeg(),completed=state.difficulty;
  state.status='landing';
  state.score=Math.min(Number.MAX_VALUE,state.score+DIFFICULTY[completed].landing);
  state.visited.push(leg.to);
  updateHUD();chime();playSceneEffect('landing');
  if(state.leg===2||state.leg===5||state.leg===8){
    const nextDifficulty=completed==='easy'?'medium':completed==='medium'?'hard':'insane';
    const newlyUnlocked=!isUnlocked(nextDifficulty);
    unlockNextDifficulty(completed);
    state.difficulty=nextDifficulty;
    if(nextDifficulty==='insane'){state.insaneStreak=0;state.insaneLegsCompleted=0}
    state.fuel=DIFFICULTY[nextDifficulty].capacity;
    updateHUD();
    const milestone='Earth reached!';
    const intro=nextDifficulty==='insane'?' Insane mode is endless: one wrong answer ends the run. Each correct answer earns 10% more than the previous one.':'';
    showDialog(completed==='hard'?'🏆':'🌍',completed.toUpperCase()+' COMPLETE',milestone,
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
  state.leg=index;state.progress=0;state.gear="cruise";
  state.fuel=DIFFICULTY[state.difficulty].capacity;
  state.questionIndex=0;
  updateLegUI();showQuestion();playSceneEffect('launch');
}
function resetGame(){state.gear="cruise";state.leg=-1;state.progress=0;state.correct=0;state.wrong=0;state.score=0;state.seen=new Set();state.visited=[];state.question=null;state.status='setup';state.insaneStreak=0;state.insaneLegsCompleted=0;$('setupScreen').classList.remove('hidden');$('questionScreen').classList.add('hidden');$('stageTitle').innerHTML='THE JOURNEY<br><span>STARTS HERE.</span>';$('stageSubtitle').textContent='Choose a difficulty, then use NASA landscape clues to navigate across the Solar System.';$('stageCounter').innerHTML='0<span>/ 9</span>';$('flightStatus').textContent='STANDBY';setPlanet($('planetStart'),'Earth');setPlanet($('planetEnd'),'Moon');$('sceneFrom').textContent='EARTH';$('sceneTo').textContent='MOON';$('flightMessage').textContent='Spacecraft awaiting launch. Choose your difficulty.';drawSetup();saveTelemetry()}
function saveTelemetry(){try{sessionStorage.setItem('planet-impostor-latest',JSON.stringify({leg:state.leg,progress:state.progress,fuel:state.fuel,score:state.score,correct:state.correct,wrong:state.wrong}))}catch{}}
function drawStars(){const c=$('stars'),ctx=c.getContext('2d');if(!ctx)return;const w=window.innerWidth,h=window.innerHeight;const dpr=Math.min(devicePixelRatio||1,2);c.width=w*dpr;c.height=h*dpr;c.style.width=w+'px';c.style.height=h+'px';ctx.scale(dpr,dpr);let seed=93;const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};ctx.clearRect(0,0,w,h);for(let i=0;i<Math.floor(w*h/4800);i++){const x=rand()*w,y=rand()*h,r=rand()*1.3+.2;ctx.fillStyle=`rgba(198,228,255,${rand()*.5+.12})`;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill()}}
$('launchButton').addEventListener('click',()=>{if(!isUnlocked(state.difficulty))return;beep(430,.25,'triangle');startLeg(START_LEG_FOR_DIFFICULTY[state.difficulty])});
$('nextQuestion').addEventListener('click',nextStep);
$('soundToggle').addEventListener('click',()=>{state.sound=!state.sound;$('soundToggle').textContent=state.sound?'♪':'♩';$('soundToggle').setAttribute('aria-label',state.sound?'Mute sounds':'Unmute sounds')});
$('helpToggle').addEventListener('click',()=>$('helpOverlay').classList.remove('hidden'));
$('closeHelp').addEventListener('click',()=>$('helpOverlay').classList.add('hidden'));
for(const key of GEAR_ORDER){$('gear'+key[0].toUpperCase()+key.slice(1)).addEventListener('click',()=>setGear(key))}
document.addEventListener('keydown',e=>{if(e.key==='Shift'){if(!e.repeat&&!e.ctrlKey&&!e.altKey&&!e.metaKey&&$('helpOverlay').classList.contains('hidden')&&$('dialogOverlay').classList.contains('hidden'))setGear(GEAR_ORDER[(GEAR_ORDER.indexOf(state.gear)+1)%GEAR_ORDER.length]);return}if(e.key==='Escape'){$('helpOverlay').classList.add('hidden');return}if(state.status==='quiz'&&['1','2'].includes(e.key)){const i=Number(e.key)-1;const choice=currentLeg()?.options[i];const b=$('answerButtons').children[i];if(choice&&b)answer(choice,b)}else if(state.status==='answer'&&e.key==='Enter')nextStep()});
window.addEventListener('resize',drawStars);
resetGame();drawStars();
if(typeof expandNasaQuestionLibrary==='function'&&typeof fetch==='function') {
  expandNasaQuestionLibrary().then(counts=>{
    console.info('Planet Impostor NASA image catalog:',counts,'total',NASA_QUESTIONS.length);
    const note=$('nasaLibraryStatus');
    if(note)note.textContent=`NASA image library: ${NASA_QUESTIONS.length} / 170 available` ;
  }).catch(()=>{});
}
