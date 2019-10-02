var CACHE_NAME = 'restaurant-reviews-v1';
var urlsToCache = [
  '/',
  'restaurant.html',
  'css/styles.css',
  'js/dbhelper.js',
  'js/main.js',
  'js/restaurant_info.js',
  'data/restaurants.json'
];

/* install */
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
    );
  });

/* activate */
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.delete(CACHE_NAME)
  );
});

/* fetch */
self.addEventListener('fetch', function(event) {
  console.log('Handling fetch event for', event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          console.log('Found response in cache:', response);
          return response;
        }
        return fetch(event.request).then(
          function(response) {
            // Check if a valid response
            console.log('Found resonse from network:', response);
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            console.log('Fetching request from the network');
            var responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });
            return response;
          }
        );
      })
    );
});


