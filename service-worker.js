const CACHE = 'einhorn-v2';
const ASSETS = ['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install', e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))); });
self.addEventListener('activate', e=>{ e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))); });
self.addEventListener('fetch', e=>{ e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{const rc=r.clone(); caches.open(CACHE).then(cache=>cache.put(e.request, rc)); return r;}))); });
