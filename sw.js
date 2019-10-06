/*
 Program: sw.js
 Author: Perry Brandiezs
 Date: October 4, 2019


 This program is the Service Worker for the restaurant reviews application.  This worker caches
 web pages, allowing the site, for pages previously visited, to be better used offline
 or with limited connectivity.

 Reference site used:
 https://developers.google.com/web/fundamentals/primers/service-workers/

*/
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
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

/* activate */
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.delete(CACHE_NAME)
    );
});

/* fetch */
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request, {ignoreSearch: true})
            .then(function (response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request).then(
                    function (response) {
                        // Check if a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        var responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then(function (cache) {
                                cache.put(event.request, responseToCache);
                            });
                        return response;
                    }
                );
            })
    );
});
