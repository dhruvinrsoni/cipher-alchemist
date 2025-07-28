// Cipher Alchemist Service Worker
// Version 8 - Completely rewritten with proper PWA fundamentals

const CACHE_NAME = 'cipher-alchemist-v8';
const RUNTIME_CACHE = 'cipher-alchemist-runtime';

// Define resources to precache
const PRECACHE_RESOURCES = [
    // Core HTML pages
    './',
    './index.html',
    './dev.html', 
    './testlab.html',
    
    // Essential CSS files
    './css/main.css',
    './css/themes.css',
    './css/modal.css',
    './css/notifications.css',
    './css/keyboard-shortcuts.css',
    './css/password-strength.css',
    './css/phrase-suggestions.css',
    './css/sharing.css',
    
    // Essential JavaScript files
    './js/config.js',
    './js/cipher-algorithms.js',
    './js/notifications.js',
    './js/main.js',
    './js/ui-controls.js',
    './js/theme-manager.js',
    './js/version-manager.js',
    './js/url-handler.js',
    './js/password-strength.js',
    './js/phrase-suggestions.js',
    './js/keyboard-shortcuts.js',
    './js/sharing.js',
    './js/pwa.js',
    
    // PWA essentials
    './manifest.json',
    
    // Icons
    './assets/icons/favicon-192.png',
    './assets/icons/favicon-512.png',
    './assets/icons/favicon.ico'
];

// Install event - precache essential resources
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        (async () => {
            try {
                const cache = await caches.open(CACHE_NAME);
                console.log('Service Worker: Precaching resources...');
                
                // Use addAll for atomic caching - either all succeed or all fail
                await cache.addAll(PRECACHE_RESOURCES);
                console.log('Service Worker: All resources precached successfully');
                
                // Force activation
                await self.skipWaiting();
            } catch (error) {
                console.error('Service Worker: Failed to precache resources:', error);
                // Don't throw error - allow SW to install even if some resources fail
            }
        })()
    );
});

// Activate event - clean up old caches and claim clients
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        (async () => {
            // Clean up old caches
            const cacheNames = await caches.keys();
            const deletePromises = cacheNames
                .filter(name => name !== CACHE_NAME && name !== RUNTIME_CACHE)
                .map(name => {
                    console.log('Service Worker: Deleting old cache:', name);
                    return caches.delete(name);
                });
            
            await Promise.all(deletePromises);
            
            // Take control of all pages immediately
            await self.clients.claim();
            console.log('Service Worker: Activated and claimed all clients');
        })()
    );
});

// Fetch event - implement proper caching strategies
self.addEventListener('fetch', (event) => {
    // Skip non-HTTP requests (like chrome-extension://)
    if (!event.request.url.startsWith('http')) {
        return;
    }
    
    // Skip cross-origin requests
    if (new URL(event.request.url).origin !== location.origin) {
        return;
    }
    
    event.respondWith(handleFetch(event.request));
});

async function handleFetch(request) {
    const url = new URL(request.url);
    
    // Strategy 1: Navigation requests (HTML pages)
    if (request.mode === 'navigate') {
        return handleNavigationRequest(request);
    }
    
    // Strategy 2: Static assets (CSS, JS, images)
    if (isStaticAsset(url.pathname)) {
        return handleStaticAsset(request);
    }
    
    // Strategy 3: Everything else - network first
    return handleNetworkFirst(request);
}

async function handleNavigationRequest(request) {
    const url = new URL(request.url);
    
    try {
        // Try cache first for navigation
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            console.log('Service Worker: Serving cached page:', url.pathname);
            return cachedResponse;
        }
        
        // Try specific page mapping
        const pageMapping = {
            '/': './index.html',
            '/index.html': './index.html',
            '/dev.html': './dev.html',
            '/testlab.html': './testlab.html'
        };
        
        const mappedPage = pageMapping[url.pathname];
        if (mappedPage) {
            const mappedResponse = await caches.match(mappedPage);
            if (mappedResponse) {
                console.log('Service Worker: Serving mapped cached page:', mappedPage);
                return mappedResponse;
            }
        }
        
        // Try network
        const networkResponse = await fetch(request);
        if (networkResponse && networkResponse.ok) {
            console.log('Service Worker: Serving from network:', url.pathname);
            // Cache successful response
            const cache = await caches.open(RUNTIME_CACHE);
            cache.put(request, networkResponse.clone());
            return networkResponse;
        }
        
    } catch (error) {
        console.log('Service Worker: Network failed for navigation:', error);
    }
    
    // Fallback to offline page
    return createOfflinePage(url.pathname);
}

async function handleStaticAsset(request) {
    try {
        // Cache first for static assets
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            console.log('Service Worker: Serving cached asset:', request.url);
            return cachedResponse;
        }
        
        // Try network and cache response
        const networkResponse = await fetch(request);
        if (networkResponse && networkResponse.ok) {
            console.log('Service Worker: Caching new asset:', request.url);
            const cache = await caches.open(RUNTIME_CACHE);
            cache.put(request, networkResponse.clone());
            return networkResponse;
        }
        
        return networkResponse;
        
    } catch (error) {
        console.log('Service Worker: Asset fetch failed:', request.url);
        
        // Return appropriate offline response for different asset types
        const url = new URL(request.url);
        
        if (url.pathname.endsWith('.js')) {
            return new Response('// Offline', {
                headers: { 'Content-Type': 'application/javascript' }
            });
        }
        
        if (url.pathname.endsWith('.css')) {
            return new Response('/* Offline */', {
                headers: { 'Content-Type': 'text/css' }
            });
        }
        
        return new Response('Offline', { status: 503 });
    }
}

async function handleNetworkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        
        // Cache successful responses
        if (networkResponse && networkResponse.ok) {
            const cache = await caches.open(RUNTIME_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
        
    } catch (error) {
        // Fallback to cache
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        return new Response('Network error', { status: 503 });
    }
}

function isStaticAsset(pathname) {
    const staticExtensions = ['.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.pdf'];
    return staticExtensions.some(ext => pathname.endsWith(ext));
}

function createOfflinePage(requestedPath) {
    return new Response(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Offline - Cipher Alchemist</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .offline-container {
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            padding: 40px;
            text-align: center;
            max-width: 500px;
            border: 1px solid rgba(255,255,255,0.2);
        }
        h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        h2 {
            font-size: 1.5rem;
            margin-bottom: 20px;
            opacity: 0.9;
        }
        p {
            font-size: 1.1rem;
            line-height: 1.6;
            margin-bottom: 30px;
            opacity: 0.8;
        }
        .btn {
            background: linear-gradient(135deg, #28a745, #20c997);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 50px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.3s ease;
            margin: 10px;
            text-decoration: none;
            display: inline-block;
        }
        .btn:hover {
            transform: translateY(-2px);
        }
        .btn.secondary {
            background: linear-gradient(135deg, #6c757d, #495057);
        }
        .status {
            margin-top: 20px;
            font-size: 0.9rem;
            opacity: 0.7;
        }
    </style>
</head>
<body>
    <div class="offline-container">
        <h1>🔮 Cipher Alchemist</h1>
        <h2>📱 You're Offline</h2>
        <p>The page "${requestedPath}" isn't available offline yet. Try one of the cached pages below or check your connection.</p>
        
        <a href="./" class="btn">🏠 Home</a>
        <a href="./dev.html" class="btn secondary">🔧 Dev Tools</a>
        <a href="./testlab.html" class="btn secondary">🧪 Test Lab</a>
        
        <button class="btn secondary" onclick="window.location.reload()">🔄 Retry</button>
        
        <div class="status">
            Service Worker Active • Cache: ${CACHE_NAME}
        </div>
    </div>
    <script>
        // Auto-retry when connection is restored
        window.addEventListener('online', () => {
            window.location.reload();
        });
    </script>
</body>
</html>`, {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
}

