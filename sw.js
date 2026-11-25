var V='hudud-v3';
var SHELL=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png',
'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css',
'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js'];
self.addEventListener('install',function(e){
 e.waitUntil(caches.open(V).then(function(c){return Promise.all(SHELL.map(function(u){return c.add(u).catch(function(){})}))}).then(function(){return self.skipWaiting()}));
});
self.addEventListener('activate',function(e){
 e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==V}).map(function(n){return caches.delete(n)}))}).then(function(){return self.clients.claim()}));
});
self.addEventListener('fetch',function(e){
 var r=e.request;if(r.method!=='GET')return;
 var u=new URL(r.url);
 if(u.origin===location.origin){
  e.respondWith(fetch(r).then(function(res){var cp=res.clone();caches.open(V).then(function(c){c.put(r,cp)});return res}).catch(function(){return caches.match(r).then(function(m){return m||caches.match('index.html')})}));
 }else if(u.hostname==='cdnjs.cloudflare.com'){
  e.respondWith(caches.match(r).then(function(m){return m||fetch(r)}));
 }
});
