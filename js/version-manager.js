/**
 * Version Management Module
 * Handles application version display and management
 */

class VersionManager {
    constructor() {
        this.version = null;
        this.initialized = false;
        
        this.init();
    }
    
    init() {
        this.displayVersion();
        this.initialized = true;
        
        console.log('📋 Version Manager initialized');
    }
    
    /**
     * Display application version
     */
    displayVersion() {
        const versionElement = document.getElementById('footer-version');
        if (!versionElement) return;
        
        // Check if running locally (file:// protocol)
        if (window.location.protocol === 'file:') {
            this.version = 'DEV';
            versionElement.textContent = 'DEV';
            versionElement.style.color = '#28a745'; // Green color for dev
            return;
        }
        
        // For web deployment, try to fetch version file
        fetch('version.txt')
            .then(response => response.text())
            .then(version => {
                // Remove any extra whitespace and don't add extra "v" since version.txt already has it
                this.version = version.trim();
                versionElement.textContent = this.version;
            })
            .catch(error => {
                console.log('Version file not found, using fallback');
                this.version = 'v1.0.0';
                versionElement.textContent = this.version;
            });
    }
    
    /**
     * Get current version
     */
    getCurrentVersion() {
        return this.version;
    }
    
    /**
     * Check if running in development mode
     */
    isDevelopmentMode() {
        return this.version === 'DEV';
    }
}

// Initialize version manager when DOM is ready
let versionManager = null;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        versionManager = new VersionManager();
        window.versionManager = versionManager;
    });
} else {
    versionManager = new VersionManager();
    window.versionManager = versionManager;
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VersionManager;
}

// Export key functions globally for backward compatibility
window.displayVersion = () => versionManager?.displayVersion();
