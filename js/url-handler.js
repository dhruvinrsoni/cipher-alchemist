/**
 * URL Handler Module
 * Handles URL parameters and deep linking functionality
 */

class URLHandler {
    constructor() {
        this.initialized = false;
        
        this.init();
    }
    
    init() {
        this.initialized = true;
        
        console.log('🌐 URL Handler initialized');
    }
    
    /**
     * Handle URL parameters for direct phrase sharing
     */
    handleURLParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        const phrase = urlParams.get('phrase');
        
        if (phrase) {
            const phraseInput = document.getElementById('phraseInput');
            if (phraseInput) {
                try {
                    // Decode the phrase
                    const decodedPhrase = decodeURIComponent(phrase);
                    phraseInput.value = decodedPhrase;
                    
                    // Generate password automatically
                    if (typeof generatePassword === 'function') {
                        generatePassword();
                    }
                    
                    // Show notification
                    if (window.notify) {
                        window.notify.success('🔗 Phrase loaded from URL!');
                    }
                    
                    // Scroll to phrase input
                    phraseInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Focus on input
                    setTimeout(() => {
                        phraseInput.focus();
                    }, 500);
                    
                    console.log('URL parameter processed:', decodedPhrase);
                } catch (error) {
                    console.error('Failed to process URL parameter:', error);
                    if (window.notify) {
                        window.notify.error('Failed to load phrase from URL');
                    }
                }
            }
        }
    }
    
    /**
     * Update URL with phrase for sharing
     */
    updateURLWithPhrase(phrase) {
        if (!phrase) return;
        
        try {
            const encodedPhrase = encodeURIComponent(phrase);
            const newUrl = `${window.location.origin}${window.location.pathname}?phrase=${encodedPhrase}`;
            
            // Update browser history without reloading
            window.history.pushState({ phrase }, '', newUrl);
            
            return newUrl;
        } catch (error) {
            console.error('Failed to update URL:', error);
            return null;
        }
    }
    
    /**
     * Get current URL parameters
     */
    getURLParameters() {
        const params = new URLSearchParams(window.location.search);
        const result = {};
        
        for (const [key, value] of params.entries()) {
            result[key] = value;
        }
        
        return result;
    }
    
    /**
     * Clear URL parameters
     */
    clearURLParameters() {
        const url = `${window.location.origin}${window.location.pathname}`;
        window.history.pushState({}, '', url);
    }
    
    /**
     * Generate shareable URL for phrase
     */
    generateShareableURL(phrase) {
        if (!phrase) return null;
        
        try {
            const encodedPhrase = encodeURIComponent(phrase);
            return `${window.location.origin}${window.location.pathname}?phrase=${encodedPhrase}`;
        } catch (error) {
            console.error('Failed to generate shareable URL:', error);
            return null;
        }
    }
}

// Initialize URL handler when DOM is ready
let urlHandler = null;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        urlHandler = new URLHandler();
        window.urlHandler = urlHandler;
    });
} else {
    urlHandler = new URLHandler();
    window.urlHandler = urlHandler;
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = URLHandler;
}

// Export key functions globally for backward compatibility
window.handleURLParameters = () => urlHandler?.handleURLParameters();
window.updateURLWithPhrase = (phrase) => urlHandler?.updateURLWithPhrase(phrase);
window.generateShareableURL = (phrase) => urlHandler?.generateShareableURL(phrase);
