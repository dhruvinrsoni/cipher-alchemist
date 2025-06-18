/**
 * Main Application Coordinator
 * Manages initialization of all feature modules and provides central coordination
 * This is the main entry point that loads and coordinates all features
 */

// Application state
let appInitialized = false;
let loadedFeatures = {};
let initializationOrder = [];

/**
 * Log feature status
 * @param {string} featureName - Name of the feature
 * @param {string} status - Status ('loading', 'success', 'error', 'disabled')
 * @param {string} message - Additional message
 */
function logFeatureStatus(featureName, status, message = '') {
    const statusEmoji = {
        loading: '⏳',
        success: '✅',
        error: '❌',
        disabled: '⏸️'
    };
    
    console.log(`${statusEmoji[status]} ${featureName}: ${message || status}`);
}

/**
 * Initialize a specific feature
 * @param {string} featureName - Name of the feature to initialize
 * @returns {Promise<Object>} Feature initialization result
 */
async function initializeFeature(featureName) {
    if (!window.Config.isFeatureEnabled(featureName)) {
        logFeatureStatus(featureName, 'disabled');
        return { enabled: false, reason: 'disabled_in_config' };
    }
    
    logFeatureStatus(featureName, 'loading');
    
    try {
        let result = null;
        
        switch (featureName) {
            case 'sharing':
                if (typeof window.SharingFeature !== 'undefined') {
                    result = window.SharingFeature.initializeSharing();
                }
                break;
                
            case 'theme':
                if (typeof window.ThemeFeature !== 'undefined') {
                    result = window.ThemeFeature.initializeTheme();
                }
                break;
                
            case 'pwa':
                if (typeof window.PWAFeature !== 'undefined') {
                    result = window.PWAFeature.initializePWA();
                }
                break;
                
            case 'version':
                if (typeof window.VersionFeature !== 'undefined') {
                    result = await window.VersionFeature.initializeVersion();
                }
                break;
                
            case 'urlHandler':
                if (typeof window.URLHandler !== 'undefined') {
                    result = window.URLHandler.initializeURLHandler();
                }
                break;
                
            case 'sections':
                if (typeof window.SectionsFeature !== 'undefined') {
                    result = window.SectionsFeature.initializeSections();
                }
                break;
                
            case 'uiUtilities':
                if (typeof window.UIUtilities !== 'undefined') {
                    result = window.UIUtilities.initializeUIUtilities();
                }
                break;
                
            case 'passwordStrength':
                // This feature is self-contained, just check if it's loaded
                result = typeof checkStrength !== 'undefined' ? { isEnabled: true } : null;
                break;
                
            case 'phraseSuggestions':
                // This feature auto-initializes, just check if it's loaded
                result = typeof populateSuggestions !== 'undefined' ? { isEnabled: true } : null;
                if (result && typeof populateSuggestions === 'function') {
                    populateSuggestions(); // Initialize suggestions
                }
                break;
                
            case 'cipherAlgorithms':
                // This feature is self-contained, just check if it's loaded
                result = typeof generatePassword !== 'undefined' ? { isEnabled: true } : null;
                break;
                
            case 'keyboardShortcuts':
                if (typeof initializeKeyboardHelp !== 'undefined') {
                    initializeKeyboardHelp();
                    if (typeof addKeyboardHelpShortcut !== 'undefined') {
                        addKeyboardHelpShortcut();
                    }
                    result = { isEnabled: true };
                }
                break;
                
            default:
                throw new Error(`Unknown feature: ${featureName}`);
        }
        
        if (result) {
            loadedFeatures[featureName] = result;
            initializationOrder.push(featureName);
            logFeatureStatus(featureName, 'success', 
                result.version ? `v${result.version}` : 'initialized');
            return result;
        } else {
            throw new Error('Feature not available or failed to initialize');
        }
        
    } catch (error) {
        logFeatureStatus(featureName, 'error', error.message);
        loadedFeatures[featureName] = { enabled: false, error: error.message };
        return { enabled: false, error: error.message };
    }
}

/**
 * Initialize all enabled features in optimal order
 */
async function initializeAllFeatures() {
    console.log('🚀 Cipher Alchemist - Starting feature initialization...');
    
    // Define initialization order (dependencies first)
    const initOrder = [
        'theme',           // Theme should load early for UI consistency
        'version',         // Version info
        'cipherAlgorithms', // Core password generation
        'passwordStrength', // Password analysis
        'phraseSuggestions', // Phrase suggestions
        'sections',        // UI sections management
        'uiUtilities',     // General UI utilities
        'keyboardShortcuts', // Keyboard shortcuts
        'sharing',         // Sharing functionality
        'urlHandler',      // URL parameter handling
        'pwa'             // PWA features (last, as they may depend on other features)
    ];
    
    const results = {};
    
    // Initialize features in order
    for (const featureName of initOrder) {
        results[featureName] = await initializeFeature(featureName);
        
        // Small delay to avoid overwhelming the browser
        await new Promise(resolve => setTimeout(resolve, 10));
    }
    
    return results;
}

/**
 * Get application status for debugging
 */
function getAppStatus() {
    const featureConfig = window.CipherAlchemistConfig?.features || {};
    return {
        initialized: appInitialized,
        config: featureConfig,
        loadedFeatures: loadedFeatures,
        initializationOrder: initializationOrder,
        enabledFeatures: Object.keys(loadedFeatures).filter(
            name => loadedFeatures[name]?.enabled !== false
        ),
        disabledFeatures: Object.keys(featureConfig).filter(
            name => !featureConfig[name]
        ),
        failedFeatures: Object.keys(loadedFeatures).filter(
            name => loadedFeatures[name]?.enabled === false
        )
    };
}

/**
 * Enable a feature dynamically
 * @param {string} featureName - Name of the feature to enable
 */
async function enableFeature(featureName) {
    if (window.Config.isFeatureEnabled(featureName)) {
        console.log(`Feature ${featureName} is already enabled in config`);
        return loadedFeatures[featureName];
    }
    
    // Update configuration
    if (window.CipherAlchemistConfig?.features) {
        window.CipherAlchemistConfig.features[featureName] = true;
    }
    console.log(`Enabling feature: ${featureName}`);
    
    const result = await initializeFeature(featureName);
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('featureEnabled', {
        detail: { featureName, result }
    }));
    
    return result;
}

/**
 * Disable a feature dynamically
 * @param {string} featureName - Name of the feature to disable
 */
function disableFeature(featureName) {
    // Update configuration
    if (window.CipherAlchemistConfig?.features) {
        window.CipherAlchemistConfig.features[featureName] = false;
    }
    
    // Call feature-specific disable function if available
    try {
        switch (featureName) {
            case 'sharing':
                // Sharing doesn't have a disable function, just hide button
                const shareBtn = document.getElementById('shareBtn');
                if (shareBtn) shareBtn.style.display = 'none';
                break;
            case 'theme':
                if (typeof window.ThemeFeature?.disableTheme === 'function') {
                    window.ThemeFeature.disableTheme();
                }
                break;
            case 'pwa':
                if (typeof window.PWAFeature?.disablePWA === 'function') {
                    window.PWAFeature.disablePWA();
                }
                break;
            case 'version':
                if (typeof window.VersionFeature?.disableVersion === 'function') {
                    window.VersionFeature.disableVersion();
                }
                break;
            // Add more disable handlers as needed
        }
    } catch (error) {
        console.warn(`Error disabling feature ${featureName}:`, error);
    }
    
    if (loadedFeatures[featureName]) {
        loadedFeatures[featureName].enabled = false;
    }
    
    console.log(`Feature disabled: ${featureName}`);
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('featureDisabled', {
        detail: { featureName }
    }));
}

/**
 * Main application initialization function
 */
async function initializeApp() {
    if (appInitialized) {
        console.log('App already initialized');
        return getAppStatus();
    }
    
    console.log('🔮 Cipher Alchemist - Application initializing...');
    
    try {
        // Initialize all features
        const results = await initializeAllFeatures();
        
        appInitialized = true;
        
        // Log summary
        const status = getAppStatus();
        console.log(`✅ Cipher Alchemist initialized successfully!`);
        console.log(`📊 Features: ${status.enabledFeatures.length} enabled, ${status.disabledFeatures.length} disabled, ${status.failedFeatures.length} failed`);
        
        if (status.failedFeatures.length > 0) {
            console.warn(`⚠️ Failed features: ${status.failedFeatures.join(', ')}`);
        }
        
        // Dispatch application ready event
        window.dispatchEvent(new CustomEvent('appInitialized', {
            detail: status
        }));
        
        return status;
        
    } catch (error) {
        console.error('❌ Application initialization failed:', error);
        
        // Dispatch error event
        window.dispatchEvent(new CustomEvent('appInitializationFailed', {
            detail: { error: error.message }
        }));
        
        throw error;
    }
}

/**
 * Feature-specific utility functions
 */
const FeatureUtils = {
    // Check if a feature is available and enabled
    isFeatureEnabled: (featureName) => {
        return window.Config.isFeatureEnabled(featureName) && 
               loadedFeatures[featureName]?.enabled !== false;
    },
    
    // Get feature instance
    getFeature: (featureName) => {
        return loadedFeatures[featureName];
    },
    
    // Call feature function safely
    callFeatureFunction: (featureName, functionName, ...args) => {
        try {
            const featureObject = window[`${featureName.charAt(0).toUpperCase() + featureName.slice(1)}Feature`];
            if (featureObject && typeof featureObject[functionName] === 'function') {
                return featureObject[functionName](...args);
            }
        } catch (error) {
            console.error(`Error calling ${featureName}.${functionName}:`, error);
        }
        return null;
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    // DOM is already ready
    initializeApp();
}

// Export for global use
if (typeof window !== 'undefined') {
    window.CipherAlchemistApp = {
        initializeApp,
        getAppStatus,
        enableFeature,
        disableFeature,
        FeatureUtils,
        getFeatureConfig: () => window.CipherAlchemistConfig?.features || {}
    };
}
