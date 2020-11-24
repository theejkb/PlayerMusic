const cacheName = "lol-songs-cache";

const STATIC_DATAS = [...self.__precacheManifest.map((e) => e.url), "/"];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(STATIC_DATAS);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
