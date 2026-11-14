// Caches only the game shell. NASA images remain remotely sourced and need internet access.
const CACHE_NAME='planet-impostor-mobile-v1.12';
const APP_FILES=['./','./index.html','./style.css','./data.js','./game.js','./manifest.webmanifest','./assets/icon-192.png','./assets/icon-512.png','./NASA_SOURCES.md'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(APP_FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(names=>Promise.all(names.filter(n=>n!==CACHE_NAME).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const req=e.request, url=new URL(req.url);
  if(req.method!=='GET'||url.origin!==self.location.origin)return;
  e.respondWith(caches.match(req).then(cached=>cached||fetch(req).then(res=>{if(res.ok){const copy=res.clone();caches.open(CACHE_NAME).then(c=>c.put(req,copy))}return res})));
});
