// Main Application Legacy Functions
// Note: Most functionality has been moved to feature modules
// This file now serves as a fallback for any remaining legacy function calls

/**
 * Legacy function redirects - these now call the modular versions
 */

// Redirect to UIUtilities module
function copyPassword() {
    if (typeof window.UIUtilities?.copyPassword === 'function') {
        return window.UIUtilities.copyPassword();
    }
    console.warn('UIUtilities module not loaded, copyPassword unavailable');
}

function downloadPDF() {
    if (typeof window.UIUtilities?.downloadPDF === 'function') {
        return window.UIUtilities.downloadPDF();
    }
    console.warn('UIUtilities module not loaded, downloadPDF unavailable');
}

function tryExample() {
    if (typeof window.UIUtilities?.tryExample === 'function') {
        return window.UIUtilities.tryExample();
    }
    console.warn('UIUtilities module not loaded, tryExample unavailable');
}

// Redirect to SectionsFeature module
function toggleDescription() {
    if (typeof window.SectionsFeature?.toggleDescription === 'function') {
        return window.SectionsFeature.toggleDescription();
    }
    console.warn('SectionsFeature module not loaded, toggleDescription unavailable');
}

function toggleTransformation() {
    if (typeof window.SectionsFeature?.toggleTransformation === 'function') {
        return window.SectionsFeature.toggleTransformation();
    }
    console.warn('SectionsFeature module not loaded, toggleTransformation unavailable');
}

function clearTextarea() {
    if (typeof window.UIUtilities?.clearTextarea === 'function') {
        return window.UIUtilities.clearTextarea();
    }
    console.warn('UIUtilities module not loaded, clearTextarea unavailable');
}

function toggleClearButton(show) {
    if (typeof window.UIUtilities?.toggleClearButton === 'function') {
        return window.UIUtilities.toggleClearButton(show);
    }
    console.warn('UIUtilities module not loaded, toggleClearButton unavailable');
}

// Legacy redirects for other modules

// Theme management - redirect to ThemeFeature module
function initializeTheme() {
    if (typeof window.ThemeFeature?.initializeTheme === 'function') {
        return window.ThemeFeature.initializeTheme();
    }
    console.warn('ThemeFeature module not loaded, using fallback theme initialization');
}

// Version management - redirect to VersionFeature module  
function initializeVersion() {
    if (typeof window.VersionFeature?.initializeVersion === 'function') {
        return window.VersionFeature.initializeVersion();
    }
    console.warn('VersionFeature module not loaded, version display unavailable');
}

// PWA functionality - redirect to PWAFeature module
function initializePWAInstall() {
    if (typeof window.PWAFeature?.initializePWAInstall === 'function') {
        return window.PWAFeature.initializePWAInstall();
    }
    console.warn('PWAFeature module not loaded, PWA install unavailable');
}

function registerServiceWorker() {
    if (typeof window.PWAFeature?.registerServiceWorker === 'function') {
        return window.PWAFeature.registerServiceWorker();
    }
    console.warn('PWAFeature module not loaded, service worker registration unavailable');
}

// URL handling - redirect to URLHandler module
function handleURLParameters() {
    if (typeof window.URLHandler?.handleURLParameters === 'function') {
        return window.URLHandler.handleURLParameters();
    }
    console.warn('URLHandler module not loaded, URL parameter handling unavailable');
}

// Sharing functionality - redirect to SharingFeature module
function shareExample() {
    if (typeof window.SharingFeature?.shareExample === 'function') {
        return window.SharingFeature.shareExample();
    }
    console.warn('SharingFeature module not loaded, sharing unavailable');
}

function toggleShareButton(show) {
    if (typeof window.SharingFeature?.toggleShareButton === 'function') {
        return window.SharingFeature.toggleShareButton(show);
    }
    console.warn('SharingFeature module not loaded, share button toggle unavailable');
}

function showSharingModal(content) {
    if (typeof window.SharingFeature?.showSharingModal === 'function') {
        return window.SharingFeature.showSharingModal(content);
    }
    console.warn('SharingFeature module not loaded, sharing modal unavailable');
}

function closeSharingModal() {
    if (typeof window.SharingFeature?.closeSharingModal === 'function') {
        return window.SharingFeature.closeSharingModal();
    }
    console.warn('SharingFeature module not loaded, close sharing modal unavailable');
}

function shareToTwitter(url, text, hashtags) {
    if (typeof window.SharingFeature?.shareToTwitter === 'function') {
        return window.SharingFeature.shareToTwitter(url, text, hashtags);
    }
    console.warn('SharingFeature module not loaded, Twitter sharing unavailable');
}

function shareToLinkedIn(url, title, summary) {
    if (typeof window.SharingFeature?.shareToLinkedIn === 'function') {
        return window.SharingFeature.shareToLinkedIn(url, title, summary);
    }
    console.warn('SharingFeature module not loaded, LinkedIn sharing unavailable');
}

function shareToReddit(url, title) {
    if (typeof window.SharingFeature?.shareToReddit === 'function') {
        return window.SharingFeature.shareToReddit(url, title);
    }
    console.warn('SharingFeature module not loaded, Reddit sharing unavailable');
}

function copyShareUrl(url) {
    if (typeof window.SharingFeature?.copyShareUrl === 'function') {
        return window.SharingFeature.copyShareUrl(url);
    }
    console.warn('SharingFeature module not loaded, copy share URL unavailable');
}

function useNativeShare(url, title, text) {
    if (typeof window.SharingFeature?.useNativeShare === 'function') {
        return window.SharingFeature.useNativeShare(url, title, text);
    }
    console.warn('SharingFeature module not loaded, native sharing unavailable');
}

/**
 * Legacy initialization function - Now handled by app.js
 * This remains for any direct calls to initializeApp()
 */
function initializeApp() {
    console.log('Legacy initializeApp() called - delegating to modern App.init()');
    
    if (typeof window.App?.init === 'function') {
        return window.App.init();
    }
    
    console.warn('App module not loaded, falling back to basic initialization');
    
    // Basic fallback initialization
    console.log('Cipher Alchemist app initialized (legacy mode)!');
}

// Initialize the app when DOM is loaded (legacy support)
document.addEventListener('DOMContentLoaded', initializeApp);
