/**
 * PWA (Progressive Web App) Feature Module
 * Handles all PWA functionality including installation prompts and service worker registration
 * This module can be easily enabled/disabled by including/excluding this file
 */

// PWA Feature State
let deferredPrompt;
let installBtn;
let isInstalled = false;
let serviceWorkerRegistration = null;

/**
 * Check if the app is running in standalone mode (installed as PWA)
 * @returns {boolean} True if running as installed PWA
 */
function isRunningStandalone() {
    // For iOS Safari
    if (window.navigator.standalone === true) {
        return true;
    }
    
    // For other browsers, check display mode
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
        return true;
    }
    
    return false;
}

/**
 * Show install message with platform-specific instructions
 */
function showInstallMessage() {
    // Check if already installed
    if (isRunningStandalone()) {
        alert('✅ Cipher Alchemist is already installed as an app!');
        return;
    }
    
    // Provide manual installation instructions
    const userAgent = navigator.userAgent.toLowerCase();
    let instructions = '';
    
    if (userAgent.includes('chrome') && !userAgent.includes('edg')) {
        instructions = '📱 To install:\n1. Click the three dots menu (⋮)\n2. Select "Install Cipher Alchemist"\n3. Confirm the installation';
    } else if (userAgent.includes('firefox')) {
        instructions = '📱 To install:\n1. Click the address bar\n2. Look for the install icon\n3. Click "Install" or add to home screen';
    } else if (userAgent.includes('safari')) {
        instructions = '📱 To install on iOS:\n1. Tap the Share button (⬆️)\n2. Scroll and tap "Add to Home Screen"\n3. Tap "Add"';
    } else if (userAgent.includes('edg')) {
        instructions = '📱 To install:\n1. Click the three dots menu (⋯)\n2. Select "Apps" > "Install this site as an app"\n3. Click "Install"';
    } else {
        instructions = '📱 Look for an "Install" or "Add to Home Screen" option in your browser menu to install Cipher Alchemist as an app.';
    }
    
    alert(instructions);
}

/**
 * Show install success message
 */
function showInstallSuccessMessage() {
    console.log('PWA: Installation successful');
    // Could implement a toast notification here in the future
}

/**
 * Handle the install button click
 */
async function handleInstallClick() {
    console.log('PWA: Install button clicked');
    
    if (!deferredPrompt) {
        // Already installed or not installable
        showInstallMessage();
        return;
    }
    
    // Hide the install button
    if (installBtn) {
        installBtn.style.display = 'none';
    }
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`PWA: User choice: ${outcome}`);
    
    if (outcome === 'accepted') {
        console.log('PWA: User accepted the install prompt');
        isInstalled = true;
    } else {
        console.log('PWA: User dismissed the install prompt');
        // Show the button again if user dismissed
        if (installBtn) {
            installBtn.style.display = 'inline-block';
        }
    }
    
    // Clear the deferredPrompt variable
    deferredPrompt = null;
}

/**
 * Register service worker for PWA functionality
 */
function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) {
        console.log('Service Worker not supported');
        return Promise.resolve(null);
    }
    
    return navigator.serviceWorker.register('config/sw.js')
        .then((registration) => {
            console.log('Service Worker registered successfully:', registration);
            serviceWorkerRegistration = registration;
            
            // Check for updates
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                if (newWorker) {
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // New content available, show update notification
                            handleServiceWorkerUpdate();
                        }
                    });
                }
            });
            
            return registration;
        })
        .catch((error) => {
            console.log('Service Worker registration failed:', error);
            return null;
        });
}

/**
 * Handle service worker updates
 */
function handleServiceWorkerUpdate() {
    const shouldUpdate = confirm('New version available! Click OK to update.');
    if (shouldUpdate) {
        window.location.reload();
    }
}

/**
 * Check for service worker updates manually
 */
function checkForUpdates() {
    if (serviceWorkerRegistration) {
        serviceWorkerRegistration.update()
            .then(() => {
                console.log('Checked for service worker updates');
            })
            .catch((error) => {
                console.error('Error checking for updates:', error);
            });
    }
}

/**
 * Initialize PWA install functionality
 */
function initializePWAInstall() {
    console.log('PWA feature initializing...');
    
    installBtn = document.getElementById('installBtn');
    
    // Check if already running in standalone mode
    if (isRunningStandalone()) {
        console.log('PWA: App is running in standalone mode');
        isInstalled = true;
        if (installBtn) {
            installBtn.style.display = 'none';
        }
    }
    
    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
        console.log('PWA: beforeinstallprompt event fired');
        
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        
        // Stash the event so it can be triggered later
        deferredPrompt = e;
        
        // Show the install button if not already installed
        if (installBtn && !isInstalled) {
            installBtn.style.display = 'inline-block';
            installBtn.setAttribute('title', 'Install Cipher Alchemist as an app');
        }
    });
    
    // Handle install button click
    if (installBtn) {
        installBtn.addEventListener('click', handleInstallClick);
    }
    
    // Listen for app installed event
    window.addEventListener('appinstalled', (e) => {
        console.log('PWA: App was installed successfully');
        isInstalled = true;
        
        // Hide the install button since app is now installed
        if (installBtn) {
            installBtn.style.display = 'none';
        }
        
        // Show success message
        showInstallSuccessMessage();
        
        // Clear the deferredPrompt
        deferredPrompt = null;
        
        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('pwaInstalled'));
    });
    
    console.log('PWA install functionality initialized');
    
    return {
        isRunningStandalone,
        showInstallMessage,
        checkForUpdates,
        isInstalled: () => isInstalled,
        isEnabled: true
    };
}

/**
 * Initialize the complete PWA feature (install + service worker)
 */
function initializePWA() {
    console.log('Initializing complete PWA feature...');
    
    // Initialize install functionality
    const installFeature = initializePWAInstall();
    
    // Register service worker
    const serviceWorkerPromise = registerServiceWorker();
    
    console.log('PWA feature initialization complete');
    
    return {
        ...installFeature,
        serviceWorkerPromise,
        registerServiceWorker,
        checkForUpdates
    };
}

/**
 * Disable PWA feature (for debugging or feature toggling)
 */
function disablePWA() {
    if (installBtn) {
        installBtn.style.display = 'none';
    }
    console.log('PWA feature disabled');
}

/**
 * Enable PWA feature
 */
function enablePWA() {
    if (installBtn && !isInstalled && deferredPrompt) {
        installBtn.style.display = 'inline-block';
    }
    console.log('PWA feature enabled');
}

/**
 * Get PWA status for debugging
 */
function getPWAStatus() {
    return {
        isInstalled: isInstalled,
        isRunningStandalone: isRunningStandalone(),
        hasDeferredPrompt: !!deferredPrompt,
        hasInstallButton: !!installBtn,
        hasServiceWorker: !!serviceWorkerRegistration,
        serviceWorkerState: serviceWorkerRegistration?.active?.state || 'none'
    };
}

/**
 * Force show install prompt (for testing)
 */
function forceShowInstallPrompt() {
    if (deferredPrompt) {
        handleInstallClick();
    } else {
        showInstallMessage();
    }
}

// Export functions for global use
if (typeof window !== 'undefined') {
    window.PWAFeature = {
        initializePWA,
        initializePWAInstall,
        registerServiceWorker,
        isRunningStandalone,
        showInstallMessage,
        showInstallSuccessMessage,
        handleInstallClick,
        checkForUpdates,
        disablePWA,
        enablePWA,
        getPWAStatus,
        forceShowInstallPrompt
    };
}
