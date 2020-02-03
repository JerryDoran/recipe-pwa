// Install service worker - self refers to the service worker itself
self.addEventListener('install', event => {
  console.log('service worker has been installed');
});

// listen for the activate event of the service worker
self.addEventListener('activate', event => {
  console.log('service worker has been activated');
});

// Fetch event
self.addEventListener('fetch', event => {
  console.log('fetch event', event);
});
