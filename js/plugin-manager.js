/**
 * Plugin Manager for Cipher Alchemist
 * Provides extensible architecture with better error handling
 */

class CipherPluginManager {
    constructor() {
        this.plugins = new Map();
        this.hooks = new Map();
        this.errors = [];
        this.initialized = false;
        
        // Initialize core hooks
        this.initializeCoreHooks();
        
        console.log('🔌 Plugin Manager initialized');
    }
    
    /**
     * Initialize core plugin hooks
     */
    initializeCoreHooks() {
        const coreHooks = [
            'beforePasswordGeneration',
            'afterPasswordGeneration',
            'beforeCipherTransform',
            'afterCipherTransform',
            'onNotificationShow',
            'onThemeChange',
            'onPhraseInput',
            'onShareAction'
        ];
        
        coreHooks.forEach(hook => {
            this.hooks.set(hook, []);
        });
    }
    
    /**
     * Register a plugin with error handling
     * @param {string} name - Plugin name
     * @param {object} plugin - Plugin object
     */
    registerPlugin(name, plugin) {
        try {
            // Validate plugin structure
            if (!this.validatePlugin(plugin)) {
                throw new Error(`Invalid plugin structure for ${name}`);
            }
            
            // Check for conflicts
            if (this.plugins.has(name)) {
                throw new Error(`Plugin ${name} is already registered`);
            }
            
            // Register plugin
            this.plugins.set(name, {
                ...plugin,
                name,
                enabled: true,
                registeredAt: new Date().toISOString()
            });
            
            // Register plugin hooks
            if (plugin.hooks) {
                Object.entries(plugin.hooks).forEach(([hookName, callback]) => {
                    this.addHook(hookName, callback, name);
                });
            }
            
            // Initialize plugin if it has init method
            if (typeof plugin.init === 'function') {
                plugin.init();
            }
            
            console.log(`✅ Plugin '${name}' registered successfully`);
            this.triggerHook('onPluginRegistered', { name, plugin });
            
            return true;
            
        } catch (error) {
            this.handleError(`Plugin registration failed for '${name}'`, error);
            return false;
        }
    }
    
    /**
     * Validate plugin structure
     * @param {object} plugin - Plugin to validate
     * @returns {boolean} Is valid
     */
    validatePlugin(plugin) {
        if (!plugin || typeof plugin !== 'object') {
            return false;
        }
        
        // Required fields
        const required = ['name', 'version', 'description'];
        for (const field of required) {
            if (!plugin[field]) {
                console.warn(`⚠️ Plugin missing required field: ${field}`);
                return false;
            }
        }
        
        return true;
    }
    
    /**
     * Add a hook callback
     * @param {string} hookName - Hook name
     * @param {function} callback - Callback function
     * @param {string} pluginName - Plugin name
     */
    addHook(hookName, callback, pluginName = 'core') {
        try {
            if (!this.hooks.has(hookName)) {
                this.hooks.set(hookName, []);
            }
            
            this.hooks.get(hookName).push({
                callback,
                pluginName,
                addedAt: new Date().toISOString()
            });
            
            console.log(`🔗 Hook '${hookName}' added by ${pluginName}`);
            
        } catch (error) {
            this.handleError(`Failed to add hook '${hookName}'`, error);
        }
    }
    
    /**
     * Trigger a hook with error handling
     * @param {string} hookName - Hook name
     * @param {any} data - Data to pass to callbacks
     * @returns {any} Modified data
     */
    triggerHook(hookName, data = null) {
        try {
            if (!this.hooks.has(hookName)) {
                return data;
            }
            
            let result = data;
            const callbacks = this.hooks.get(hookName);
            
            for (const hookData of callbacks) {
                try {
                    const pluginResult = hookData.callback(result);
                    if (pluginResult !== undefined) {
                        result = pluginResult;
                    }
                } catch (error) {
                    this.handleError(`Hook '${hookName}' failed in plugin '${hookData.pluginName}'`, error);
                }
            }
            
            return result;
            
        } catch (error) {
            this.handleError(`Failed to trigger hook '${hookName}'`, error);
            return data;
        }
    }
    
    /**
     * Enable/disable a plugin
     * @param {string} name - Plugin name
     * @param {boolean} enabled - Enable state
     */
    setPluginEnabled(name, enabled) {
        try {
            if (!this.plugins.has(name)) {
                throw new Error(`Plugin '${name}' not found`);
            }
            
            const plugin = this.plugins.get(name);
            plugin.enabled = enabled;
            
            if (enabled && typeof plugin.enable === 'function') {
                plugin.enable();
            } else if (!enabled && typeof plugin.disable === 'function') {
                plugin.disable();
            }
            
            console.log(`🔌 Plugin '${name}' ${enabled ? 'enabled' : 'disabled'}`);
            this.triggerHook('onPluginToggle', { name, enabled });
            
        } catch (error) {
            this.handleError(`Failed to toggle plugin '${name}'`, error);
        }
    }
    
    /**
     * Get plugin information
     * @param {string} name - Plugin name
     * @returns {object|null} Plugin info
     */
    getPlugin(name) {
        return this.plugins.get(name) || null;
    }
    
    /**
     * Get all plugins
     * @returns {array} Plugin list
     */
    getAllPlugins() {
        return Array.from(this.plugins.values());
    }
    
    /**
     * Handle errors with better logging
     * @param {string} message - Error message
     * @param {Error} error - Error object
     */
    handleError(message, error) {
        const errorData = {
            message,
            error: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString()
        };
        
        this.errors.push(errorData);
        console.error(`❌ ${message}:`, error);
        
        // Show user-friendly notification
        if (typeof showNotification === 'function') {
            showNotification(`Plugin Error: ${message}`, {
                type: 'error',
                timeout: 5000
            });
        }
        
        // Keep only last 50 errors
        if (this.errors.length > 50) {
            this.errors = this.errors.slice(-50);
        }
    }
    
    /**
     * Get recent errors
     * @returns {array} Error list
     */
    getErrors() {
        return [...this.errors];
    }
    
    /**
     * Clear error log
     */
    clearErrors() {
        this.errors = [];
        console.log('🧹 Plugin errors cleared');
    }
}

// Create global plugin manager instance
window.CipherPluginManager = window.CipherPluginManager || new CipherPluginManager();

// Initialize function for backward compatibility
function initializePluginManager() {
    console.log('🔌 Plugin Manager ready');
    
    // Try to initialize dark mode plugin if available
    if (typeof DarkModePlugin !== 'undefined') {
        const darkModePlugin = new DarkModePlugin();
        window.CipherPluginManager.registerPlugin('darkMode', darkModePlugin);
        window.darkModePlugin = darkModePlugin;
    }
    
    return { enabled: true, plugins: window.CipherPluginManager.plugins.size };
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePluginManager);
} else {
    initializePluginManager();
}

// Export global functions
window.initializePluginManager = initializePluginManager;
window.openPluginManager = () => window.CipherPluginManager.openManager();

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CipherPluginManager;
}
