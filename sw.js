self.addEventListener('install', (event) => {
    self.skipWaiting(); // Activate worker immediately
    event.waitUntil(
        caches.open('cipher-alchemist-v4').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/dev.html',
                '/testlab.html',
                '/css/themes.css',
                '/css/main.css',
                '/css/modal.css',
                '/css/keyboard-shortcuts.css',
                '/css/password-strength.css',
                '/css/phrase-suggestions.css',
                '/css/sharing.css',
                '/css/notifications.css',
                '/js/config.js',
                '/js/cipher-algorithms.js',
                '/js/notifications.js',
                '/js/main.js',
                '/js/password-strength.js',
                '/js/phrase-suggestions.js',
                '/js/keyboard-shortcuts.js',
                '/js/sharing.js',
                '/js/pwa.js',
                '/js/ui-controls.js',
                '/js/theme-manager.js',
                '/js/version-manager.js',
                '/js/url-handler.js',
                '/manifest.json',
                '/assets/docs/cheat_sheet.pdf',
                '/assets/docs/Password_Substitution_Cheat_Sheet_V2.xlsx',
                '/assets/icons/favicon-192.png',
                '/assets/icons/favicon-512.png',
                '/assets/icons/favicon.ico'
            ]).catch((error) => {
                console.error('Service Worker: Failed to cache resources:', error);
                // Cache individual resources that succeed
                const resources = [
                    '/',
                    '/index.html',
                    '/dev.html',
                    '/testlab.html',
                    '/css/themes.css',
                    '/css/main.css',
                    '/css/modal.css',
                    '/css/keyboard-shortcuts.css',
                    '/css/password-strength.css',
                    '/css/phrase-suggestions.css',
                    '/css/sharing.css',
                    '/css/notifications.css',
                    '/js/config.js',
                    '/js/cipher-algorithms.js',
                    '/js/notifications.js',
                    '/js/main.js',
                    '/js/password-strength.js',
                    '/js/phrase-suggestions.js',
                    '/js/keyboard-shortcuts.js',
                    '/js/sharing.js',
                    '/js/pwa.js',
                    '/js/ui-controls.js',
                    '/js/theme-manager.js',
                    '/js/version-manager.js',
                    '/js/url-handler.js',
                    '/manifest.json'
                ];
                
                return Promise.allSettled(
                    resources.map(resource => 
                        cache.add(resource).catch(err => 
                            console.warn(`Failed to cache ${resource}:`, err)
                        )
                    )
                );
            });
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    // Only delete old cache versions, keep current one
                    if (cacheName !== 'cipher-alchemist-v4') {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('Service Worker: Activated and claiming clients');
            return self.clients.claim();
        })
    );
});


self.addEventListener('fetch', (event) => {
    event.respondWith((async () => {
        const url = new URL(event.request.url);

        // Navigation: always serve correct HTML from cache, ignore query params
        if (event.request.mode === 'navigate') {
            if (url.pathname === '/' || url.pathname === '/index.html') {
                const cached = await caches.match('/index.html');
                if (cached) return cached;
                return new Response('<h1>Offline</h1>', { status: 200, headers: { 'Content-Type': 'text/html' } });
            }
            if (url.pathname === '/dev.html') {
                const cached = await caches.match('/dev.html');
                if (cached) return cached;
                return new Response('<h1>Offline</h1>', { status: 200, headers: { 'Content-Type': 'text/html' } });
            }
            if (url.pathname === '/testlab.html') {
                const cached = await caches.match('/testlab.html');
                if (cached) return cached;
                return new Response('<h1>Offline</h1>', { status: 200, headers: { 'Content-Type': 'text/html' } });
            }
        }

        // For all other requests: always serve from cache if available
        const cachedResponse = await caches.match(event.request, { ignoreSearch: true });
        if (cachedResponse) return cachedResponse;
        return new Response('', { status: 200 });
    })());
});

