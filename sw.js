const CACHE_NAME = 'cipher-alchemist-v7';
const CORE_RESOURCES = [
    '/',
    '/index.html',
    '/dev.html',
    '/testlab.html',
    '/pwa-test.html',
    '/manifest.json'
];

const CSS_RESOURCES = [
    '/css/themes.css',
    '/css/main.css',
    '/css/modal.css',
    '/css/notifications.css',
    '/css/keyboard-shortcuts.css',
    '/css/password-strength.css',
    '/css/phrase-suggestions.css',
    '/css/sharing.css'
];

const JS_RESOURCES = [
    '/js/config.js',
    '/js/cipher-algorithms.js',
    '/js/notifications.js',
    '/js/main.js',
    '/js/ui-controls.js',
    '/js/theme-manager.js',
    '/js/version-manager.js',
    '/js/url-handler.js',
    '/js/password-strength.js',
    '/js/phrase-suggestions.js',
    '/js/keyboard-shortcuts.js',
    '/js/sharing.js',
    '/js/pwa.js'
];

const ASSET_RESOURCES = [
    '/assets/docs/cheat_sheet.pdf',
    '/assets/docs/Password_Substitution_Cheat_Sheet_V2.xlsx',
    '/assets/icons/favicon-192.png',
    '/assets/icons/favicon-512.png',
    '/assets/icons/favicon.ico'
];

const ALL_RESOURCES = [
    ...CORE_RESOURCES,
    ...CSS_RESOURCES,
    ...JS_RESOURCES,
    ...ASSET_RESOURCES
];

self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    self.skipWaiting(); // Activate worker immediately
    
    event.waitUntil(
        caches.open(CACHE_NAME).then(async (cache) => {
            console.log('Service Worker: Caching resources...');
            
            // Cache core resources first (critical for app functionality)
            try {
                await cache.addAll(CORE_RESOURCES);
                console.log('Service Worker: Core resources cached successfully');
            } catch (error) {
                console.error('Service Worker: Failed to cache core resources:', error);
                throw error;
            }
            
            // Cache other resources with error handling
            const cachePromises = [
                ...CSS_RESOURCES,
                ...JS_RESOURCES,
                ...ASSET_RESOURCES
            ].map(async (resource) => {
                try {
                    const response = await fetch(resource);
                    if (response.ok) {
                        await cache.put(resource, response);
                        console.log('Service Worker: Cached:', resource);
                    } else {
                        console.warn('Service Worker: Failed to fetch:', resource, response.status);
                    }
                } catch (error) {
                    console.warn('Service Worker: Error caching:', resource, error.message);
                }
            });
            
            await Promise.allSettled(cachePromises);
            console.log('Service Worker: All available resources cached');
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    // Only delete old cache versions, keep current one
                    if (cacheName !== CACHE_NAME) {
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
        (async () => {
            const request = event.request;
            const url = new URL(request.url);
            
            // Skip cross-origin requests
            if (!url.origin.includes(self.location.origin)) {
                return fetch(request);
            }
            
            console.log('Service Worker: Handling request for:', url.pathname);
            
            // Handle navigation requests (page loads/reloads)
            if (request.mode === 'navigate') {
                console.log('Service Worker: Navigation request for:', url.pathname);
                
                // Cache-first strategy for navigation requests
                const cachedResponse = await caches.match(request);
                if (cachedResponse) {
                    console.log('Service Worker: Serving cached navigation page:', url.pathname);
                    return cachedResponse;
                }
                
                // Try to find exact page matches
                const pathname = url.pathname;
                let pageResponse = null;
                
                if (pathname === '/' || pathname === '/index.html') {
                    pageResponse = await caches.match('/index.html');
                } else if (pathname === '/dev.html') {
                    pageResponse = await caches.match('/dev.html');
                } else if (pathname === '/testlab.html') {
                    pageResponse = await caches.match('/testlab.html');
                }
                
                if (pageResponse) {
                    console.log('Service Worker: Serving specific cached page:', pathname);
                    return pageResponse;
                }
                
                // Fallback to index.html for unknown navigation requests
                const fallbackResponse = await caches.match('/index.html');
                if (fallbackResponse) {
                    console.log('Service Worker: Serving index.html as fallback for:', pathname);
                    return fallbackResponse;
                }
                
                // If no cache available, try network
                try {
                    const networkResponse = await fetch(request);
                    if (networkResponse && networkResponse.ok) {
                        console.log('Service Worker: Serving from network for navigation:', pathname);
                        // Cache the successful response
                        const cache = await caches.open(CACHE_NAME);
                        cache.put(request, networkResponse.clone());
                        return networkResponse;
                    }
                } catch (error) {
                    console.log('Service Worker: Network failed for navigation:', pathname);
                }
                
                // Return offline page as last resort
                return new Response(`
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <title>Offline - Cipher Alchemist</title>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <style>
                            body { 
                                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                                text-align: center; 
                                padding: 50px 20px; 
                                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                                color: white;
                                min-height: 100vh;
                                margin: 0;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            }
                            .offline-container { 
                                background: rgba(255,255,255,0.1); 
                                padding: 40px; 
                                border-radius: 20px; 
                                box-shadow: 0 8px 32px rgba(0,0,0,0.2);
                                backdrop-filter: blur(10px);
                                border: 1px solid rgba(255,255,255,0.2);
                                max-width: 500px; 
                                width: 100%;
                            }
                            h1 { 
                                font-size: 2.5em; 
                                margin-bottom: 10px; 
                                text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
                            }
                            h2 { 
                                font-size: 1.5em; 
                                margin-bottom: 20px; 
                                opacity: 0.9;
                            }
                            p { 
                                font-size: 1.1em; 
                                line-height: 1.6; 
                                margin-bottom: 30px; 
                                opacity: 0.8;
                            }
                            .retry-btn { 
                                background: linear-gradient(135deg, #ff6b6b, #ee5a52); 
                                color: white; 
                                padding: 15px 30px; 
                                border: none; 
                                border-radius: 50px; 
                                cursor: pointer; 
                                font-size: 16px; 
                                font-weight: 600;
                                transition: all 0.3s ease;
                                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                            }
                            .retry-btn:hover { 
                                transform: translateY(-2px);
                                box-shadow: 0 6px 20px rgba(0,0,0,0.3);
                            }
                            .status { 
                                margin-top: 20px; 
                                font-size: 0.9em; 
                                opacity: 0.7;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="offline-container">
                            <h1>🔮 Cipher Alchemist</h1>
                            <h2>📱 You're Offline</h2>
                            <p>The page you're looking for isn't cached yet. Please check your connection and try again, or return to the main app.</p>
                            <button class="retry-btn" onclick="window.location.reload()">🔄 Try Again</button>
                            <div class="status">
                                Service Worker Active • Cache Version: ${CACHE_NAME}
                            </div>
                        </div>
                    </body>
                    </html>
                `, {
                    status: 200,
                    statusText: 'Offline',
                    headers: { 'Content-Type': 'text/html; charset=utf-8' }
                });
            }

            // For non-navigation requests (CSS, JS, images, etc.)
            // Cache-first strategy: check cache first, then network
            try {
                const cachedResponse = await caches.match(request);
                if (cachedResponse) {
                    console.log('Service Worker: Serving from cache:', url.pathname);
                    return cachedResponse;
                }
                
                // Not in cache, try network
                console.log('Service Worker: Fetching from network:', url.pathname);
                const networkResponse = await fetch(request);
                
                // Cache successful responses for future use
                if (networkResponse && networkResponse.status === 200) {
                    const responseToCache = networkResponse.clone();
                    const cache = await caches.open(CACHE_NAME);
                    await cache.put(request, responseToCache);
                    console.log('Service Worker: Cached new resource:', url.pathname);
                }
                
                return networkResponse;
                
            } catch (error) {
                console.log('Service Worker: Network failed for:', url.pathname, error);
                
                // Network failed, try cache again with different matching strategies
                const cachedFallback = await caches.match(request);
                if (cachedFallback) {
                    console.log('Service Worker: Serving cached fallback for:', url.pathname);
                    return cachedFallback;
                }
                
                // For critical resources, return appropriate error responses
                if (url.pathname.endsWith('.js')) {
                    return new Response('// Resource not available offline', {
                        status: 200,
                        statusText: 'Offline',
                        headers: { 'Content-Type': 'application/javascript' }
                    });
                }
                
                if (url.pathname.endsWith('.css')) {
                    return new Response('/* Resource not available offline */', {
                        status: 200,
                        statusText: 'Offline',
                        headers: { 'Content-Type': 'text/css' }
                    });
                }
                
                // Generic offline response
                return new Response('Resource not available offline', {
                    status: 404,
                    statusText: 'Offline - Resource Not Available'
                });
            }
        })()
    );
});

