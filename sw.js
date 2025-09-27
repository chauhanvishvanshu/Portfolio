// Simple offline-first cache for static assets
const CACHE_NAME = 'vishufolio-cache-v1';
const ASSETS = [
  '/', '/index.html', '/style.css', '/script.js',
  '/assets/Vishvanshu.png'
];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
  );
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return; // only cache GET
  e.respondWith(
    caches.match(req).then((cached) => cached || fetch(req).then((res) => {
      const resClone = res.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
      return res;
    }).catch(() => caches.match('/index.html')))
  );
});
