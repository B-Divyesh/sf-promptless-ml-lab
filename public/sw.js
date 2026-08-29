const CACHE = 'seeded-ml-drills-v7';
const SHELL = ['/', '/demo', '/lab', '/privacy', '/terms'];
self.addEventListener('install', (event) => event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting())));
self.addEventListener('activate', (event) => event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== location.origin) return;
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).then((response) => {
      // Keep the navigation alive until the replacement reaches Cache Storage.
      // Without waitUntil, a reload can be terminated before cache.put finishes.
      const replacement = caches.open(CACHE).then((cache) => cache.put(event.request, response.clone()));
      event.waitUntil(replacement);
      return replacement.then(() => response);
    }).catch(() => caches.match(event.request).then((cached) => cached || caches.match('/'))));
    return;
  }
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
    const copy = response.clone(); const replacement = caches.open(CACHE).then((cache) => cache.put(event.request, copy)); event.waitUntil(replacement); return replacement.then(() => response);
  })));
});
