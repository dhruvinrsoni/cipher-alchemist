/**
 * Theme Feature Module
 * Handles all theme management functionality including light/dark mode switching
 * This module can be easily enabled/disabled by including/excluding this file
 */

// Theme Feature State
let currentTheme = 'light-theme';
let themeToggleBtn = null;

/**
 * Set the application theme
 * @param {string} theme - The theme to apply ('light-theme' or 'dark-theme')
 */
function setTheme(theme) {
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(theme);
    
    if (themeToggleBtn) {
        themeToggleBtn.textContent = theme === 'dark-theme' ? '☀️' : '🌙';
        themeToggleBtn.setAttribute('aria-label', 
            theme === 'dark-theme' ? 'Switch to light theme' : 'Switch to dark theme'
        );
        themeToggleBtn.setAttribute('title', 
            theme === 'dark-theme' ? 'Switch to light theme' : 'Switch to dark theme'
        );
    }
    
    localStorage.setItem('theme', theme);
    currentTheme = theme;
    
    // Dispatch custom event for other modules to listen to theme changes
    window.dispatchEvent(new CustomEvent('themeChanged', { 
        detail: { theme: theme } 
    }));
    
    console.log(`Theme changed to: ${theme}`);
}

/**
 * Toggle between light and dark themes
 */
function toggleTheme() {
    const isDark = document.body.classList.contains('dark-theme');
    setTheme(isDark ? 'light-theme' : 'dark-theme');
}

/**
 * Get the current theme
 * @returns {string} Current theme name
 */
function getCurrentTheme() {
    return currentTheme;
}

/**
 * Check if dark theme is active
 * @returns {boolean} True if dark theme is active
 */
function isDarkTheme() {
    return currentTheme === 'dark-theme';
}

/**
 * Apply theme based on system preference if no saved preference exists
 */
function applySystemTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (!savedTheme) {
        // Check system preference
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark-theme' : 'light-theme');
    } else {
        setTheme(savedTheme);
    }
}

/**
 * Listen for system theme changes
 */
function watchSystemTheme() {
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Listen for changes in system theme preference
        mediaQuery.addEventListener('change', (e) => {
            // Only auto-switch if user hasn't manually set a preference
            const savedTheme = localStorage.getItem('theme');
            if (!savedTheme) {
                setTheme(e.matches ? 'dark-theme' : 'light-theme');
            }
        });
    }
}

/**
 * Initialize theme management functionality
 */
function initializeTheme() {
    console.log('Theme feature initializing...');
    
    themeToggleBtn = document.getElementById('themeToggleBtn');
    
    if (!themeToggleBtn) {
        console.warn('Theme toggle button not found - theme feature partially disabled');
        return;
    }
    
    // Load saved theme or apply system preference
    applySystemTheme();
    
    // Add click event listener to theme toggle button
    themeToggleBtn.addEventListener('click', function() {
        toggleTheme();
    });
    
    // Add keyboard support for theme toggle
    themeToggleBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleTheme();
        }
    });
    
    // Watch for system theme changes
    watchSystemTheme();
    
    // Add theme transition class to body for smooth transitions
    document.body.classList.add('theme-transition');
    
    console.log('Theme feature initialized successfully');
    
    return {
        setTheme,
        toggleTheme,
        getCurrentTheme,
        isDarkTheme,
        isEnabled: true
    };
}

/**
 * Disable theme feature (for debugging or feature toggling)
 */
function disableTheme() {
    if (themeToggleBtn) {
        themeToggleBtn.style.display = 'none';
    }
    console.log('Theme feature disabled');
}

/**
 * Enable theme feature
 */
function enableTheme() {
    if (themeToggleBtn) {
        themeToggleBtn.style.display = '';
    }
    console.log('Theme feature enabled');
}

/**
 * Reset theme to default (light theme)
 */
function resetTheme() {
    localStorage.removeItem('theme');
    setTheme('light-theme');
    console.log('Theme reset to default');
}

/**
 * Get theme statistics for debugging
 */
function getThemeStats() {
    return {
        currentTheme: currentTheme,
        savedTheme: localStorage.getItem('theme'),
        systemPrefersDark: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
        buttonElement: !!themeToggleBtn,
        hasTransitionClass: document.body.classList.contains('theme-transition')
    };
}

// Export functions for global use
if (typeof window !== 'undefined') {
    window.ThemeFeature = {
        setTheme,
        toggleTheme,
        getCurrentTheme,
        isDarkTheme,
        initializeTheme,
        applySystemTheme,
        watchSystemTheme,
        disableTheme,
        enableTheme,
        resetTheme,
        getThemeStats
    };
}
