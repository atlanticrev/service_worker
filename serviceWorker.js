const cacheName = 'cache-v1';
    const resourcesToPrecache = [
      './index.html',
      './style.css',
      './script.js'
    ];

    self.addEventListener('install', e => {
      console.log('Service worker installing...');
      e.waitUntil(
        caches.open(cacheName)
          .then(cache => {
            return cache.addAll(resourcesToPrecache);
          })
      );
    });

    self.addEventListener('fetch', e => {
      console.log('Trying fetch from a cache...');
      e.respondWith(caches.match(e.request)
        .then(cachedResponse => {
          return cachedResponse || fetch(e.request);
        })  
      );
    });