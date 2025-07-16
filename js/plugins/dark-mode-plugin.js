/**
 * Dark Mode Plugin for Cipher Alchemist
 * Provides advanced dark mode functionality beyond the basic theme toggle
 */

class DarkModePlugin {
    constructor() {
        this.name = 'Dark Mode';
        this.version = '1.0.0';
        this.description = 'Advanced dark mode with custom themes and scheduling';
        this.author = 'Cipher Alchemist';
        
        this.isEnabled = false;
        this.themes = {
            dark: {
                name: 'Dark',
                colors: {
                    background: '#1a1a1a',
                    surface: '#2d2d2d',
                    primary: '#4CAF50',
                    secondary: '#81C784',
                    text: '#ffffff',
                    textSecondary: '#cccccc'
                }
            },
            midnight: {
                name: 'Midnight Blue',
                colors: {
                    background: '#0d1117',
                    surface: '#161b22',
                    primary: '#58a6ff',
                    secondary: '#79c0ff',
                    text: '#f0f6fc',
                    textSecondary: '#8b949e'
                }
            },
            cyberpunk: {
                name: 'Cyberpunk',
                colors: {
                    background: '#0a0a0a',
                    surface: '#1a0033',
                    primary: '#ff00ff',
                    secondary: '#00ffff',
                    text: '#ffffff',
                    textSecondary: '#cccccc'
                }
            }
        };
        
        this.currentTheme = 'dark';
        this.autoMode = false;
        this.schedule = {
            enabled: false,
            darkStart: '20:00',
            lightStart: '06:00'
        };
    }

    async initialize() {
        try {
            // Load saved preferences
            this.loadSettings();
            
            // Create UI controls
            this.createUI();
            
            // Set up auto mode if enabled
            if (this.autoMode) {
                this.setupAutoMode();
            }
            
            // Apply current theme
            if (this.isEnabled) {
                this.applyTheme(this.currentTheme);
                this.notifyThemeManager(true);
            }
            
            console.log('Dark Mode Plugin initialized');
            return true;
        } catch (error) {
            console.error('Dark Mode Plugin initialization failed:', error);
            return false;
        }
    }

    createUI() {
        // Add dark mode controls to the top controls
        const topControls = document.querySelector('.top-controls');
        if (topControls) {
            const darkModeBtn = document.createElement('button');
            darkModeBtn.id = 'darkModeAdvancedBtn';
            darkModeBtn.innerHTML = '🌚';
            darkModeBtn.title = 'Advanced Dark Mode';
            darkModeBtn.setAttribute('aria-label', 'Advanced dark mode settings');
            darkModeBtn.onclick = () => this.showSettings();
            
            // Insert before theme toggle
            const themeToggle = document.getElementById('themeToggleBtn');
            if (themeToggle) {
                topControls.insertBefore(darkModeBtn, themeToggle);
            } else {
                topControls.appendChild(darkModeBtn);
            }
        }
    }

    showSettings() {
        const modal = this.createSettingsModal();
        document.body.appendChild(modal);
        modal.style.display = 'flex';
        
        // Focus trap
        const firstInput = modal.querySelector('input, select, button');
        if (firstInput) firstInput.focus();
    }

    createSettingsModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 500px;">
                <div class="modal-header">
                    <h2>🌚 Advanced Dark Mode</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <div style="margin-bottom: 20px;">
                        <label>
                            <input type="checkbox" ${this.isEnabled ? 'checked' : ''} 
                                   onchange="window.darkModePlugin.toggleEnabled(this.checked)">
                            Enable Advanced Dark Mode
                        </label>
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <label for="themeSelect">Theme:</label>
                        <select id="themeSelect" onchange="window.darkModePlugin.changeTheme(this.value)">
                            ${Object.entries(this.themes).map(([key, theme]) => 
                                `<option value="${key}" ${key === this.currentTheme ? 'selected' : ''}>${theme.name}</option>`
                            ).join('')}
                        </select>
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <label>
                            <input type="checkbox" ${this.autoMode ? 'checked' : ''} 
                                   onchange="window.darkModePlugin.toggleAutoMode(this.checked)">
                            Auto Mode (based on time)
                        </label>
                    </div>
                    
                    <div style="margin-bottom: 20px; ${this.autoMode ? '' : 'opacity: 0.5;'}">
                        <label>
                            <input type="checkbox" ${this.schedule.enabled ? 'checked' : ''} 
                                   ${this.autoMode ? '' : 'disabled'}
                                   onchange="window.darkModePlugin.toggleSchedule(this.checked)">
                            Use Schedule
                        </label>
                        <div style="margin-top: 10px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                            <div>
                                <label>Dark starts at:</label>
                                <input type="time" value="${this.schedule.darkStart}" 
                                       ${this.schedule.enabled ? '' : 'disabled'}
                                       onchange="window.darkModePlugin.updateSchedule('darkStart', this.value)">
                            </div>
                            <div>
                                <label>Light starts at:</label>
                                <input type="time" value="${this.schedule.lightStart}" 
                                       ${this.schedule.enabled ? '' : 'disabled'}
                                       onchange="window.darkModePlugin.updateSchedule('lightStart', this.value)">
                            </div>
                        </div>
                    </div>
                    
                    <div class="theme-preview" style="border: 1px solid #ccc; padding: 15px; border-radius: 8px; margin-top: 20px;">
                        <h4>Preview:</h4>
                        <div class="preview-content" style="padding: 10px; border-radius: 4px;">
                            <p>Sample text with <strong>emphasis</strong></p>
                            <button style="margin-top: 5px;">Sample Button</button>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button onclick="this.closest('.modal-overlay').remove()" class="btn-primary">Done</button>
                </div>
            </div>
        `;
        
        // Update preview
        this.updatePreview(modal);
        
        return modal;
    }

    updatePreview(modal) {
        const preview = modal.querySelector('.preview-content');
        const theme = this.themes[this.currentTheme];
        
        if (preview && theme) {
            preview.style.backgroundColor = theme.colors.surface;
            preview.style.color = theme.colors.text;
            preview.style.border = `1px solid ${theme.colors.primary}`;
            
            const button = preview.querySelector('button');
            if (button) {
                button.style.backgroundColor = theme.colors.primary;
                button.style.color = theme.colors.background;
                button.style.border = 'none';
                button.style.padding = '5px 10px';
                button.style.borderRadius = '4px';
            }
        }
    }

    toggleEnabled(enabled) {
        this.isEnabled = enabled;
        if (enabled) {
            this.applyTheme(this.currentTheme);
            this.notifyThemeManager(true);
        } else {
            this.removeTheme();
            this.notifyThemeManager(false);
        }
        this.saveSettings();
        
        if (window.notify) {
            window.notify.info(`Advanced Dark Mode ${enabled ? 'enabled' : 'disabled'}`);
        }
    }

    changeTheme(themeName) {
        this.currentTheme = themeName;
        if (this.isEnabled) {
            this.applyTheme(themeName);
        }
        this.saveSettings();
        
        // Update preview if modal is open
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            this.updatePreview(modal);
        }
    }

    toggleAutoMode(enabled) {
        this.autoMode = enabled;
        if (enabled) {
            this.setupAutoMode();
        } else {
            this.teardownAutoMode();
        }
        this.saveSettings();
    }

    toggleSchedule(enabled) {
        this.schedule.enabled = enabled;
        this.saveSettings();
        
        if (this.autoMode) {
            this.setupAutoMode();
        }
    }

    updateSchedule(key, value) {
        this.schedule[key] = value;
        this.saveSettings();
        
        if (this.autoMode && this.schedule.enabled) {
            this.setupAutoMode();
        }
    }

    applyTheme(themeName) {
        const theme = this.themes[themeName];
        if (!theme) return;

        // Create or update custom CSS
        let styleEl = document.getElementById('dark-mode-plugin-styles');
        if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = 'dark-mode-plugin-styles';
            document.head.appendChild(styleEl);
        }

        styleEl.textContent = `
            :root {
                --dm-bg: ${theme.colors.background};
                --dm-surface: ${theme.colors.surface};
                --dm-primary: ${theme.colors.primary};
                --dm-secondary: ${theme.colors.secondary};
                --dm-text: ${theme.colors.text};
                --dm-text-secondary: ${theme.colors.textSecondary};
            }
            
            body {
                background-color: var(--dm-bg) !important;
                color: var(--dm-text) !important;
                transition: background-color 0.3s ease, color 0.3s ease;
            }
            
            .container, .modal-content, .textarea-container textarea, 
            .phrase-suggestions-content, .app-description-content {
                background-color: var(--dm-surface) !important;
                color: var(--dm-text) !important;
            }
            
            .top-controls button, .button-group button, .modal-close {
                background-color: var(--dm-surface) !important;
                color: var(--dm-text) !important;
                border: 1px solid var(--dm-primary) !important;
            }
            
            .top-controls button:hover, .button-group button:hover {
                background-color: var(--dm-primary) !important;
                color: var(--dm-bg) !important;
            }
            
            .suggestions-grid .suggestion-item {
                background-color: var(--dm-surface) !important;
                border: 1px solid var(--dm-secondary) !important;
                color: var(--dm-text) !important;
            }
            
            .suggestions-grid .suggestion-item:hover {
                background-color: var(--dm-secondary) !important;
                color: var(--dm-bg) !important;
            }
            
            hr {
                border-color: var(--dm-secondary) !important;
            }
            
            a {
                color: var(--dm-primary) !important;
            }
            
            a:hover {
                color: var(--dm-secondary) !important;
            }
        `;
    }

    removeTheme() {
        const styleEl = document.getElementById('dark-mode-plugin-styles');
        if (styleEl) {
            styleEl.remove();
        }
    }

    setupAutoMode() {
        if (this.schedule.enabled) {
            this.scheduleInterval = setInterval(() => {
                this.checkSchedule();
            }, 60000); // Check every minute
            
            // Check immediately
            this.checkSchedule();
        } else {
            // Simple time-based mode
            const hour = new Date().getHours();
            const shouldBeDark = hour >= 20 || hour <= 6;
            
            if (shouldBeDark && !this.isEnabled) {
                this.toggleEnabled(true);
            } else if (!shouldBeDark && this.isEnabled) {
                this.toggleEnabled(false);
            }
        }
    }

    checkSchedule() {
        const now = new Date();
        const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        const darkStart = this.schedule.darkStart;
        const lightStart = this.schedule.lightStart;
        
        let shouldBeDark = false;
        
        if (darkStart > lightStart) {
            // Schedule crosses midnight
            shouldBeDark = currentTime >= darkStart || currentTime < lightStart;
        } else {
            // Normal schedule within same day
            shouldBeDark = currentTime >= darkStart && currentTime < lightStart;
        }
        
        if (shouldBeDark && !this.isEnabled) {
            this.toggleEnabled(true);
        } else if (!shouldBeDark && this.isEnabled) {
            this.toggleEnabled(false);
        }
    }

    teardownAutoMode() {
        if (this.scheduleInterval) {
            clearInterval(this.scheduleInterval);
            this.scheduleInterval = null;
        }
    }

    saveSettings() {
        const settings = {
            isEnabled: this.isEnabled,
            currentTheme: this.currentTheme,
            autoMode: this.autoMode,
            schedule: this.schedule
        };
        
        localStorage.setItem('darkModePlugin', JSON.stringify(settings));
    }

    loadSettings() {
        try {
            const saved = localStorage.getItem('darkModePlugin');
            if (saved) {
                const settings = JSON.parse(saved);
                this.isEnabled = settings.isEnabled || false;
                this.currentTheme = settings.currentTheme || 'dark';
                this.autoMode = settings.autoMode || false;
                this.schedule = { ...this.schedule, ...settings.schedule };
            }
        } catch (error) {
            console.warn('Failed to load dark mode settings:', error);
        }
    }

    destroy() {
        this.teardownAutoMode();
        this.removeTheme();
        this.notifyThemeManager(false);
        
        const button = document.getElementById('darkModeAdvancedBtn');
        if (button) {
            button.remove();
        }
        
        // Remove from global scope
        if (window.darkModePlugin === this) {
            delete window.darkModePlugin;
        }
    }

    /**
     * Notify theme manager about plugin status
     */
    notifyThemeManager(isActive) {
        if (window.themeManager) {
            if (isActive) {
                window.themeManager.disableBasicToggle();
            } else {
                window.themeManager.enableBasicToggle();
            }
        }
        
        // Dispatch event for other modules
        window.dispatchEvent(new CustomEvent('darkModePluginStatusChanged', {
            detail: { isActive, plugin: this }
        }));
    }
}

// Export for plugin manager
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DarkModePlugin;
} else {
    window.DarkModePlugin = DarkModePlugin;
}
