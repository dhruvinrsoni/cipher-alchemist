self.addEventListener('install', (event) => {
    self.skipWaiting(); // Activate worker immediately
    event.waitUntil(
        caches.open('cipher-alchemist-v2').then((cache) => {
            return cache.addAll([
                '../',
                '../index.html',
                '../css/themes.css',
                '../css/main.css',
                '../css/password-strength.css',
                '../css/phrase-suggestions.css',
                '../js/cipher-algorithms.js',
                '../js/password-strength.js',
                '../js/phrase-suggestions.js',
                '../js/main.js',
                './manifest.json',
                '../assets/docs/cheat_sheet.pdf',
                '../assets/icons/favicon-192.png',
                '../assets/icons/favicon-512.png',
                '../assets/icons/favicon.ico'
            ]);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    return caches.delete(cacheName);
                })
            );
        }).then(() => {
            return self.clients.claim();
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

// Optionally, you can add a version to your cache and update it on each deploy for more control.
