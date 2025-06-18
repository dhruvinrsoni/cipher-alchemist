/**
 * Version Management Feature Module
 * Handles application version display and management
 * This module can be easily enabled/disabled by including/excluding this file
 */

// Version Feature State
let currentVersion = null;
let versionElement = null;
let versionSource = 'unknown';

/**
 * Get version from meta tag
 * @returns {string|null} Version string from meta tag or null if not found
 */
function getVersionFromMeta() {
    const versionMeta = document.querySelector('meta[name="app-version"]');
    if (versionMeta && versionMeta.content && !versionMeta.content.includes('__APP_VERSION__')) {
        return versionMeta.content;
    }
    return null;
}

/**
 * Fetch version from version.txt file
 * @returns {Promise<string>} Version string from file
 */
function fetchVersionFromFile() {
    return fetch('version.txt')
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}: ${res.statusText}`);
            }
            return res.text();
        })
        .then(version => version.trim())
        .catch(error => {
            console.warn('Could not fetch version from version.txt:', error.message);
            return 'vDEV · Local Build';
        });
}

/**
 * Parse version string for mobile display
 * Splits long version strings for better mobile layout
 * @param {string} versionString - Full version string
 * @returns {string} Formatted version string
 */
function formatVersionForDisplay(versionString) {
    if (!versionString) return '';
    
    // Split for mobile: everything before '· 🚀' on one line, rest below
    const splitIdx = versionString.indexOf('· 🚀');
    if (splitIdx !== -1) {
        return versionString.slice(0, splitIdx).trim();
    }
    
    return versionString;
}

/**
 * Set the version display
 * @param {string} version - Version string to display
 * @param {string} source - Source of the version ('meta', 'file', 'fallback')
 */
function setVersionDisplay(version, source = 'unknown') {
    const formattedVersion = formatVersionForDisplay(version);
    
    if (versionElement) {
        versionElement.textContent = formattedVersion;
        versionElement.setAttribute('title', `Full version: ${version}\nSource: ${source}`);
    }
    
    // Store in window for global access
    window.APP_VERSION = version;
    currentVersion = version;
    versionSource = source;
    
    console.log(`Version set: ${version} (source: ${source})`);
    
    // Dispatch custom event for other modules
    window.dispatchEvent(new CustomEvent('versionLoaded', {
        detail: { version, formattedVersion, source }
    }));
}

/**
 * Initialize version display with fallback chain
 */
async function initializeVersion() {
    console.log('Version feature initializing...');
    
    versionElement = document.getElementById('footer-version');
    
    if (!versionElement) {
        console.warn('Version display element not found - version feature disabled');
        return { isEnabled: false };
    }
    
    try {
        // Try meta tag first (for static and automated injection)
        const metaVersion = getVersionFromMeta();
        if (metaVersion) {
            setVersionDisplay(metaVersion, 'meta');
            console.log('Version loaded from meta tag');
            return { version: metaVersion, source: 'meta', isEnabled: true };
        }
        
        // Fallback to version.txt file (for local/dev)
        console.log('Meta version not found, trying version.txt...');
        const fileVersion = await fetchVersionFromFile();
        setVersionDisplay(fileVersion, 'file');
        console.log('Version loaded from file');
        return { version: fileVersion, source: 'file', isEnabled: true };
        
    } catch (error) {
        console.error('Error initializing version:', error);
        
        // Ultimate fallback
        const fallbackVersion = '🔖 vDEV · Local Build';
        setVersionDisplay(fallbackVersion, 'fallback');
        console.log('Using fallback version');
        return { version: fallbackVersion, source: 'fallback', isEnabled: true };
    }
}

/**
 * Get current version information
 * @returns {Object} Version information object
 */
function getVersionInfo() {
    return {
        version: currentVersion,
        formattedVersion: versionElement?.textContent || '',
        source: versionSource,
        element: !!versionElement,
        windowVersion: window.APP_VERSION
    };
}

/**
 * Update version display manually
 * @param {string} newVersion - New version string
 * @param {string} source - Source of the new version
 */
function updateVersion(newVersion, source = 'manual') {
    setVersionDisplay(newVersion, source);
}

/**
 * Refresh version from original sources
 */
async function refreshVersion() {
    console.log('Refreshing version information...');
    return await initializeVersion();
}

/**
 * Hide version display
 */
function hideVersion() {
    if (versionElement) {
        versionElement.style.display = 'none';
    }
    console.log('Version display hidden');
}

/**
 * Show version display
 */
function showVersion() {
    if (versionElement) {
        versionElement.style.display = '';
    }
    console.log('Version display shown');
}

/**
 * Check if version is development/local build
 * @returns {boolean} True if this appears to be a development build
 */
function isDevelopmentBuild() {
    if (!currentVersion) return true;
    
    const devIndicators = ['dev', 'local', 'vDEV', 'localhost', 'development'];
    const versionLower = currentVersion.toLowerCase();
    
    return devIndicators.some(indicator => versionLower.includes(indicator));
}

/**
 * Get version comparison
 * @param {string} otherVersion - Version to compare against
 * @returns {number} -1 if current < other, 0 if equal, 1 if current > other
 */
function compareVersion(otherVersion) {
    if (!currentVersion || !otherVersion) return 0;
    
    // Simple string comparison for now
    // Could be enhanced with semantic versioning comparison
    if (currentVersion === otherVersion) return 0;
    return currentVersion > otherVersion ? 1 : -1;
}

/**
 * Add click handler to version element for debugging info
 */
function addVersionClickHandler() {
    if (versionElement) {
        versionElement.addEventListener('click', function() {
            const info = getVersionInfo();
            const debugInfo = `Version Debug Info:
Version: ${info.version}
Formatted: ${info.formattedVersion}
Source: ${info.source}
Element: ${info.element ? 'Found' : 'Not found'}
Window Version: ${info.windowVersion}
Is Development: ${isDevelopmentBuild()}
User Agent: ${navigator.userAgent}`;
            
            console.log(debugInfo);
            alert(debugInfo);
        });
        
        versionElement.style.cursor = 'pointer';
        versionElement.setAttribute('title', 
            versionElement.getAttribute('title') + '\n\nClick for debug info'
        );
    }
}

/**
 * Disable version feature
 */
function disableVersion() {
    hideVersion();
    console.log('Version feature disabled');
}

/**
 * Enable version feature
 */
function enableVersion() {
    showVersion();
    console.log('Version feature enabled');
}

// Export functions for global use
if (typeof window !== 'undefined') {
    window.VersionFeature = {
        initializeVersion,
        getVersionInfo,
        updateVersion,
        refreshVersion,
        hideVersion,
        showVersion,
        isDevelopmentBuild,
        compareVersion,
        addVersionClickHandler,
        disableVersion,
        enableVersion,
        formatVersionForDisplay
    };
}
