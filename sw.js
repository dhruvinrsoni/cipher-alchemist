self.addEventListener('install', (event) => {
    self.skipWaiting(); // Activate worker immediately
    event.waitUntil(
        caches.open('cipher-alchemist-v4').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/css/themes.css',
                '/css/main.css',
                '/css/modal.css',
                '/css/keyboard-shortcuts.css',
                '/css/password-strength.css',
                '/css/phrase-suggestions.css',
                '/css/sharing.css',
                '/js/config.js',
                '/js/cipher-algorithms.js',
                '/js/notifications.js',
                '/js/main.js',
                '/js/password-strength.js',
                '/js/phrase-suggestions.js',
                '/js/keyboard-shortcuts.js',
                '/js/sharing.js',
                '/js/pwa.js',
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
                    '/css/themes.css',
                    '/css/main.css',
                    '/css/modal.css',
                    '/css/keyboard-shortcuts.css',
                    '/css/password-strength.css',
                    '/css/phrase-suggestions.css',
                    '/css/sharing.css',
                    '/js/config.js',
                    '/js/cipher-algorithms.js',
                    '/js/main.js',
                    '/js/password-strength.js',
                    '/js/phrase-suggestions.js',
                    '/js/keyboard-shortcuts.js',
                    '/js/sharing.js',
                    '/js/pwa.js',
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
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Return cached version if available
            if (response) {
                return response;
            }
            
            // For network requests, try to fetch and cache
            return fetch(event.request).then((response) => {
                // Don't cache non-successful responses
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }
                
                // Clone the response for caching
                const responseToCache = response.clone();
                
                caches.open('cipher-alchemist-v4').then((cache) => {
                    cache.put(event.request, responseToCache);
                });
                
                return response;
            }).catch(() => {
                // If both cache and network fail, return the cached index.html for navigation
                if (event.request.mode === 'navigate') {
                    return caches.match('/index.html');
                }
                // For other requests, return a fallback response
                return new Response('Resource not available offline', {
                    status: 503,
                    statusText: 'Service Unavailable'
                });
            });
        })
    );
});

