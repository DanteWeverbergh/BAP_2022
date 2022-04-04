const CACHE_NAME = 'version-1';
const urlsToCache = ['index.html', 'offline.html'];

const self = this;

// install serviceWorker

self.addEventListener('install', (event) => {
  //
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('open cach');

      return cache.addAll(urlsToCache);
    })
  );
});

//listen for requests

self.addEventListener('fetch', (event) => {
  //
});

//active serviceWorkers

self.addEventListener('activate', (event) => {
  //
});
