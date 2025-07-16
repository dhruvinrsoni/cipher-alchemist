/**
 * Theme Management Module
 * Unified theme handling with support for basic and advanced themes
 */

class ThemeManager {
    constructor() {
        this.currentTheme = 'light-theme';
        // Removed dark mode plugin integration
        this.initialized = false;
        
        this.init();
    }
    
    init() {
        this.loadTheme();
        this.setupEventListeners();
        this.initialized = true;
        console.log('🎨 Theme Manager initialized');
    }
    
    /**
     * Load theme from localStorage
     */
    loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light-theme';
        this.currentTheme = savedTheme;
        this.applyTheme(savedTheme);
    }
    
    /**
     * Apply theme to document
     */
    applyTheme(theme) {
        document.body.classList.remove('dark-theme', 'light-theme');
        document.body.classList.add(theme);
        
        const themeBtn = document.getElementById('themeToggleBtn');
        if (themeBtn) {
            themeBtn.textContent = theme === 'dark-theme' ? '☀️' : '🌙';
            themeBtn.setAttribute('title', theme === 'dark-theme' ? 'Switch to light theme' : 'Switch to dark theme');
        }
        
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
        // Trigger theme change event for other modules
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    }
    
    /**
     * Toggle between light and dark themes
     */
    toggleTheme() {
        const isDark = this.currentTheme === 'dark-theme';
        const newTheme = isDark ? 'light-theme' : 'dark-theme';
        this.applyTheme(newTheme);
        console.log(`Theme changed to: ${newTheme}`);
    }
    
    /**
     * Setup event listeners
     */
    setupEventListeners() {
        const themeBtn = document.getElementById('themeToggleBtn');
        if (themeBtn) {
            themeBtn.addEventListener('click', () => this.toggleTheme());
        }
    }
    
    /**
     * Check if dark mode plugin is available and active
     */
    checkForDarkModePlugin() {
        // Removed dark mode plugin check
    }
    
    /**
     * Update theme button state based on plugin status
     */
    updateThemeButtonState() {
        // Removed dark mode plugin button state logic
    }
    
    /**
     * Get current theme
     */
    getCurrentTheme() {
        return this.currentTheme;
    }
    
    /**
     * Check if dark theme is active
     */
    isDarkTheme() {
        return this.currentTheme === 'dark-theme';
    }
    
    /**
     * Force set theme (used by plugins)
     */
    setTheme(theme) {
        this.applyTheme(theme);
    }
    
    /**
     * Disable basic theme toggle (used by plugins)
     */
    disableBasicToggle() {
        // Removed dark mode plugin disable logic
    }
    
    /**
     * Enable basic theme toggle (used by plugins)
     */
    enableBasicToggle() {
        // Removed dark mode plugin enable logic
    }
}

// Initialize theme manager when DOM is ready
let themeManager = null;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        themeManager = new ThemeManager();
        window.themeManager = themeManager;
    });
} else {
    themeManager = new ThemeManager();
    window.themeManager = themeManager;
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeManager;
}

// Export key functions globally for backward compatibility
window.toggleTheme = () => themeManager?.toggleTheme();
window.initializeTheme = () => themeManager?.loadTheme();
