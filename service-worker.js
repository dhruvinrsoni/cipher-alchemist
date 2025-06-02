self.addEventListener('install', (event) => {
    self.skipWaiting(); // Activate worker immediately
    event.waitUntil(
        caches.open('cipher-alchemist-v1').then((cache) => {
            return cache.addAll([
                './',
                './index.html',
                './styles.css',
                './scripts.js',
                './manifest.json',
                './cheat_sheet.pdf',
                './icon-192.png',
                './icon-512.png',
                './favicon.ico'
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
