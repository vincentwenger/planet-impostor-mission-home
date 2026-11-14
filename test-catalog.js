// Deterministic regression tests for the v1.7 NASA Image and Video Library expansion.
// These mock NASA's API; they cannot prove NASA's live service returns enough images.
const fs=require('fs'), vm=require('vm'), assert=require('assert');
const text=fs.readFileSync(__dirname+'/data.js','utf8');
function bootstrap(store=new Map()){
 const storage={getItem:k=>store.get(k)??null,setItem:(k,v)=>store.set(k,String(v))};
 const ctx={localStorage:storage,Math,console,setTimeout,clearTimeout,AbortController,encodeURIComponent};
 vm.createContext(ctx);vm.runInContext(text,ctx);
 return {store,ctx,bank:vm.runInContext('NASA_QUESTIONS',ctx)};
}
const setup=bootstrap();
assert.equal(setup.bank.length,66);
const baseCounts={Earth:22,Moon:20,Mars:24};
function fakeFetch(url){
 const query=decodeURIComponent(new URL(url).searchParams.get('q'));
 const world=/Mars|Martian|Curiosity|Perseverance|HiRISE/i.test(query)?'Mars':/Moon|Lunar|LRO|Apollo|lunar/i.test(query)?'Moon':'Earth';
 const label={Earth:'Terra ASTER desert satellite landscape',Moon:'Lunar crater surface panorama',Mars:'Martian crater surface panorama'}[world];
 const items=Array.from({length:120},(_,i)=>({
  data:[{nasa_id:`MOCK_${world}_${String(i).padStart(3,'0')}`,title:`${label} ${i}`,
    description:`${world} landscape terrain featuring crater and volcanic rock formations in NASA imaging`,
    center:'JPL',secondary_creator:'NASA/JPL-Caltech'}],
  links:[{rel:'preview',href:`https://images-assets.nasa.gov/image/mock_${world}_${i}/mock_${world}_${i}~thumb.jpg`}]}
  ));
 return Promise.resolve({ok:true,json:async()=>({collection:{items}})});
}
(async()=>{
 // Enrichment should add exactly 104 unique NASA items to the 66 baseline items.
 let counts=await vm.runInContext('expandNasaQuestionLibrary',setup.ctx)({fetcher:fakeFetch});
 for(const [world,target] of Object.entries({Earth:60,Moon:50,Mars:60}))assert.equal(counts[world],target,world+' count');
 assert.equal(setup.bank.length,170);
 assert.equal(new Set(setup.bank.map(q=>q.id)).size,170,'duplicate NASA ID');
 assert(setup.bank.every(q=>q.image.startsWith('https://')&&q.source.startsWith('https://')));
 assert.equal(setup.bank.filter(q=>q.catalog).length,104,'104 records acquired from NASA API');
 // Reloading a page must restore acquired records without requiring a network call.
 const restored=bootstrap(setup.store);
 assert.equal(restored.bank.length,170,'cached NASA items survive refresh');
 counts=await vm.runInContext('expandNasaQuestionLibrary',restored.ctx)({fetcher:fakeFetch});
 assert.equal(restored.bank.length,170,'repeating the fetch cannot introduce duplicate records');
 // Exclusion of artistic renderings, diagrams, and non-terrain subjects.
 const classify=vm.runInContext('nasaAssetToQuestion',setup.ctx);
 const artist={data:[{nasa_id:'ARTIST',title:'NASA artist concept of Mars surface',description:'Mars terrain sketch'}],links:[{rel:'preview',href:'https://images-assets.nasa.gov/image/foo/foo~thumb.jpg'}]};
 assert.equal(classify(artist,'Mars'),null,'non-photographic concept should be rejected');
 // Failure to contact NASA must leave the original 66 images working as before.
 const offline=bootstrap();
 counts=await vm.runInContext('expandNasaQuestionLibrary',offline.ctx)({fetcher:async()=>{throw new Error('network unavailable')}});
 assert.equal(offline.bank.length,66,'network failure must not affect curated images');
 console.log('PASS — v1.7: 170 distinct NASA catalog records (60/50/60), 104 acquired, cache, deduplication, filtering, offline fallback.');
})().catch(e=>{console.error(e);process.exitCode=1});
