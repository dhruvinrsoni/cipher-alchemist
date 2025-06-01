
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('password-generator-v1').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/styles.css',
                '/scripts.js',
                '/manifest.json',
                '/cheat_sheet.pdf'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
