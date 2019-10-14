/*
 Program: registersw.js
 Author: Perry Brandiezs
 Date: October 4, 2019


 This program registers the Service Worker sw.js.

*/
/* register */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('sw.js').then(function () {
            // Registration was successful
            /* console.log('ServiceWorker registration successful with scope: ', registration.scope); */
        }, function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
