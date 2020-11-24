var CACHE_STATIC_NAME = "static-v3";
var STATIC_FILES = [];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME).then((cache) => {
      return cache.addAll(STATIC_FILES);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activating Service Worker ....", event);
  return self.clients.claim();
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});

// Catch cache and network
// self.addEventListener('fetch', function(event) {
// event.respondWith(
// caches.match(event.request) // soit le cache
// .then(function(response) {
// if (response) {
// return response;
// } else {
// return fetch(event.request); // soit le réseau
// }
// })
// );
// });

// replace NETWORK Only and Cache only
// self.addEventListener('fetch', function (event) {
// event.respondWith(
// caches.match(event.request)
// );
// });
