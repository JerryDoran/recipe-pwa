// Check to see if the browser supports service workers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/public/sw.js')
    .then(reg => console.log('Service Worker registered', reg))
    .catch(err => console.log('Service Worker not registered', err));
}
