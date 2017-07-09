self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        'index.html',
        'js/Grid.js',
        'js/play.js',
        'js/GamePiece.js',
        'js/GamePieces/Sawtooth.js',
        'js/GamePieces/Sine.js',
        'js/GamePieces/SpeedReset.js',
        'js/GamePieces/Square.js',
        'js/GamePieces/Triangle.js'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
