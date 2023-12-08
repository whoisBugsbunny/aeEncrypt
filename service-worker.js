// service-worker.js

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('ae-encrypt').then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/main.css',
                '/style.js',
                '/app.js',
                '/images/iconae.png'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
