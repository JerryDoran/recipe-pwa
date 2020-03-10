// Get a reference to the shell resources of the app
const staticCacheName = 'site-static-v2';
const dynamicCacheName = 'site-dynamic-v2';

// Create array of assets that are to be cached.
const assets = [
  '/',
  '/index.html',
  '/about.html',
  '/css/styles.css',
  '/js/app.js',
  '/js/ui.js',
  '/img/dish.jpeg',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js',
  'https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
  'https://fonts.googleapis.com/css?family=Merienda+One&display=swap'
];

// Cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

// Install service worker - self refers to the service worker itself
self.addEventListener('install', event => {
  console.log('service worker has been installed');
  event.waitUntil(
    caches.open(staticCacheName).then(cache => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

// listen for the activate event of the service worker
self.addEventListener('activate', event => {
  console.log('service worker has been activated');

  // Delete old cache
  event.waitUntil(
    caches.keys().then(keys => {
      // console.log(keys);
      return Promise.all(
        keys
          .filter(key => key !== staticCacheName && key !== dynamicCacheName)
          .map(key => caches.delete(key))
      );
    })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  // console.log('fetch event', event);
  if (event.request.url.indexOf('firestore.googleapis.com') === -1) {
    event.respondWith(
      caches
        .match(event.request)
        .then(cacheRes => {
          return (
            cacheRes ||
            fetch(event.request).then(fetchRes => {
              return caches.open(dynamicCacheName).then(cache => {
                cache.put(event.request.url, fetchRes.clone());
                // Check to see if cache is over a certain size
                limitCacheSize(dynamicCacheName, 25);
                return fetchRes;
              });
            })
          );
        })
        .catch(() => {
          if (event.request.url.indexOf('.html') > -1) {
            return caches.match('/pages/fallback.html');
          }
        })
    );
  }
});
