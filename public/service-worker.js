var CACHE_NAME = 'stockholm-map-cache-v1';

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll([
        '/'
      ]);
    })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(cacheList) {
      return Promise.all(
        cacheList.filter(cache => cache.indexOf(CACHE_NAME) === -1)
        .map(cache => caches.delete(cache))
      });
    );
  });
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
