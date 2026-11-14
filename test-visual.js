const fs=require('fs'),assert=require('assert'),path=require('path');
const root=__dirname;
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const html=read('index.html'),css=read('style.css'),js=read('game.js'),sw=read('service-worker.js');
for(const nodeId of ['spaceScene','ship','planetStart','planetEnd','scorePop','sceneFlash','nasaPhoto','dialogOverlay']){
  assert(html.includes(`id="${nodeId}"`),`HTML missing visual hook ${nodeId}`);
}
for(const hook of ['scene-nebula','scene-stars-far','scene-stars-near','flight-route','photo-reticle','dialog-sparks'])
  assert(html.includes(hook),`HTML missing ${hook}`);
for(const cls of ['fx-correct','fx-wrong','fx-landing','mode-insane','prefers-reduced-motion','scene-score-pop'])
  assert(css.includes(cls),`CSS missing ${cls}`);
assert(js.includes("playSceneEffect('correct',earned)"));
assert(js.includes("playSceneEffect('wrong')"));
assert(js.includes("playSceneEffect('landing')"));
assert(js.includes("setVisualMode()"));
assert(js.includes("const INSANE_POINT_GROWTH=1.10"));
for(const world of ['earth','moon','mars']){
 const f=`assets/planet-${world}.webp`;
 assert(html.includes('class="planet planet-'+world+'"')||css.includes(`.planet-${world}`));
 assert(css.includes(f),`CSS missing art reference ${f}`);
 assert(sw.includes('./'+f),`SW missing art cache entry ${f}`);
 const bytes=fs.readFileSync(path.join(root,f));
 assert(bytes.length>5000&&bytes.length<70000,`Unexpected artwork size for ${world}`);
 assert.equal(bytes.subarray(0,4).toString('ascii'),'RIFF');
 assert.equal(bytes.subarray(8,12).toString('ascii'),'WEBP');
}
assert(sw.includes('planet-impostor-mobile-v1.14'));
assert(js.includes("const UNLOCK_STORAGE_KEY='planet-impostor-unlocked-difficulty-v1'"));
assert(js.includes("const PHOTO_CYCLE_STORAGE_KEY='planet-impostor-used-photo-ids-v1'"));
console.log('PASS — v1.14 visual assets, scene markup, animated feedback hooks, reduced motion, and updated PWA cache.');
