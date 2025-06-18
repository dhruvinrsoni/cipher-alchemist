/**
 * Feature Configuration for Cipher Alchemist
 * 
 * This file allows easy enabling/disabling of application features.
 * Set any feature to false to disable it completely.
 * 
 * Note: When disabling a feature, you should also comment out
 * its corresponding script and CSS includes in index.html
 */

window.CipherAlchemistConfig = {
    features: {
        // Core features
        sharing: true,          // Social media sharing, URL sharing, Web Share API
        theme: true,            // Light/dark theme toggle
        pwa: true,              // Progressive Web App install prompts and service worker
        version: true,          // Version display and management
        urlHandler: true,       // URL parameter handling for deep linking
        sections: true,         // Collapsible UI sections (description, transformation)
        uiUtilities: true,      // UI helpers (copy, clear, example buttons)
        
        // Advanced features  
        keyboardShortcuts: true,    // Keyboard navigation and shortcuts
        passwordStrength: true,     // Real-time password strength analysis
        phraseSuggestions: true,    // Inspirational phrase suggestions
        
        // Experimental/optional features
        analytics: false,       // Usage analytics (not implemented yet)
        darkModeAuto: false,    // Automatic dark mode based on system preference
        offlineMode: true,      // Offline functionality via service worker
        shareHistory: false,    // Remember shared phrases (not implemented yet)
    },
    
    // Feature-specific settings
    settings: {
        theme: {
            defaultTheme: 'light',      // 'light' or 'dark'
            persistTheme: true,         // Remember user's theme choice
            autoDetectSystem: false     // Use system preference on first visit
        },
        
        sharing: {
            enableNativeShare: true,    // Use Web Share API when available
            enableSocialMedia: true,    // Show Twitter, LinkedIn, Reddit buttons
            enableUrlCopy: true,        // Show copy URL functionality
            defaultHashtags: ['CipherAlchemist', 'PasswordSecurity', 'WebSecurity']
        },
        
        pwa: {
            enableInstallPrompt: true,  // Show PWA install button
            enableServiceWorker: true,  // Register service worker for offline
            enablePushNotifications: false  // Push notifications (not implemented)
        },
        
        suggestions: {
            enableInspirational: true,  // Show inspirational phrases
            enableVedic: true,          // Include Vedic/Sanskrit phrases
            enableTechnical: true,      // Include tech-related phrases
            maxSuggestions: 10          // Maximum suggestions to show
        },
        
        accessibility: {
            enableKeyboardNav: true,    // Full keyboard navigation
            enableScreenReader: true,   // Screen reader optimizations
            enableHighContrast: false,  // High contrast mode option
            enableFocusIndicators: true // Visible focus indicators
        }
    },
    
    // Debug and development settings
    debug: {
        enableConsoleLogging: true,     // Detailed console logs
        enablePerformanceMetrics: false, // Performance measurement
        enableFeatureUsageStats: false, // Track which features are used
        verboseErrorReporting: true     // Detailed error messages
    }
};

// Config utility functions - prefix prevents naming collisions
window.Config = {
    // Check if a feature is enabled
    isFeatureEnabled: function(featureName) {
        return window.CipherAlchemistConfig?.features?.[featureName] === true;
    },
    
    // Get a specific feature setting
    getFeatureSetting: function(featureName, settingName) {
        return window.CipherAlchemistConfig?.settings?.[featureName]?.[settingName];
    },
    
    // Check if a debug setting is enabled
    isDebugEnabled: function(debugSetting) {
        return window.CipherAlchemistConfig?.debug?.[debugSetting] === true;
    }
};

// Legacy support (with deprecation warning) - will be removed in future versions
window.isFeatureEnabled = function(featureName) {
    console.warn('DEPRECATED: window.isFeatureEnabled() is deprecated. Use window.Config.isFeatureEnabled() instead.');
    return window.Config.isFeatureEnabled(featureName);
};

window.getFeatureSetting = function(featureName, settingName) {
    console.warn('DEPRECATED: window.getFeatureSetting() is deprecated. Use window.Config.getFeatureSetting() instead.');
    return window.Config.getFeatureSetting(featureName, settingName);
};

window.isDebugEnabled = function(debugSetting) {
    console.warn('DEPRECATED: window.isDebugEnabled() is deprecated. Use window.Config.isDebugEnabled() instead.');
    return window.Config.isDebugEnabled(debugSetting);
};

console.log('🔧 Cipher Alchemist configuration loaded');
console.log('📊 Enabled features:', Object.entries(window.CipherAlchemistConfig.features)
    .filter(([name, enabled]) => enabled)
    .map(([name]) => name)
    .join(', '));
