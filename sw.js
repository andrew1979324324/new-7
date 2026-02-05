const CACHE_NAME = 'lavoro-pro-v2050';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  'https://i.ibb.co/0yCxc7hJ/logo.png'
];

// Installazione: crea la cache e forza l'attivazione
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Attivazione: pulisce le vecchie versioni della cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Strategia Network-First: prova il web per avere dati aggiornati, 
// se fallisce (offline) usa la cache.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
