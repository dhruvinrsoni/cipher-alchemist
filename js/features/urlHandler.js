/**
 * URL Handler Feature Module
 * Handles URL parameters for direct phrase input and deep linking
 * This module can be easily enabled/disabled by including/excluding this file
 */

// URL Handler Feature State
let urlParams = null;
let lastProcessedPhrase = null;

/**
 * Parse URL parameters
 * @returns {URLSearchParams} Parsed URL parameters
 */
function parseURLParameters() {
    try {
        urlParams = new URLSearchParams(window.location.search);
        return urlParams;
    } catch (error) {
        console.warn('Error parsing URL parameters:', error);
        return new URLSearchParams();
    }
}

/**
 * Get phrase parameter from URL
 * @returns {string|null} Decoded phrase from URL or null if not found
 */
function getPhraseFromURL() {
    if (!urlParams) {
        parseURLParameters();
    }
    
    const phraseParam = urlParams.get('phrase');
    if (phraseParam) {
        try {
            return decodeURIComponent(phraseParam);
        } catch (error) {
            console.warn('Error decoding phrase parameter:', error);
            return phraseParam; // Return raw parameter if decoding fails
        }
    }
    
    return null;
}

/**
 * Create a shareable URL with phrase parameter
 * @param {string} phrase - The phrase to include in the URL
 * @returns {string} Complete URL with phrase parameter
 */
function createShareableURL(phrase) {
    if (!phrase) {
        console.warn('No phrase provided for shareable URL');
        return window.location.href.split('?')[0];
    }
    
    try {
        // Handle both server URLs and local file:// URLs
        let baseUrl;
        if (window.location.protocol === 'file:') {
            baseUrl = window.location.href.split('?')[0];
        } else {
            baseUrl = window.location.origin + window.location.pathname;
        }
        
        const encodedPhrase = encodeURIComponent(phrase);
        return `${baseUrl}?phrase=${encodedPhrase}`;
    } catch (error) {
        console.error('Error creating shareable URL:', error);
        return window.location.href.split('?')[0];
    }
}

/**
 * Apply phrase from URL to the input field with visual feedback
 * @param {string} phrase - The phrase to apply
 */
function applyPhraseToInput(phrase) {
    const phraseInput = document.getElementById('phraseInput');
    if (!phraseInput) {
        console.error('Phrase input element not found');
        return false;
    }
    
    try {
        // Set the phrase value
        phraseInput.value = phrase;
        lastProcessedPhrase = phrase;
        
        // Focus on the input
        phraseInput.focus();
        
        // Show relevant buttons since there's content
        if (typeof toggleClearButton === 'function') {
            toggleClearButton(true);
        }
        
        if (typeof toggleShareButton === 'function') {
            toggleShareButton(true);
        }
        
        // Add visual feedback animation
        phraseInput.style.transition = 'all 0.3s ease';
        phraseInput.style.backgroundColor = 'rgba(0, 120, 215, 0.1)';
        phraseInput.style.borderColor = 'rgba(0, 120, 215, 0.5)';
        
        // Trigger input event for real-time features (strength checking, etc.)
        const inputEvent = new Event('input', { bubbles: true });
        phraseInput.dispatchEvent(inputEvent);
        
        console.log('Phrase applied to input from URL:', phrase);
        return true;
    } catch (error) {
        console.error('Error applying phrase to input:', error);
        return false;
    }
}

/**
 * Generate password automatically after URL phrase is loaded
 */
function autoGenerateFromURL() {
    // Add a small delay to ensure all modules are loaded
    setTimeout(() => {
        if (typeof generatePassword === 'function') {
            generatePassword();
        } else {
            console.warn('generatePassword function not available for auto-generation');
        }
        
        // Reset visual feedback after generation
        setTimeout(() => {
            const phraseInput = document.getElementById('phraseInput');
            if (phraseInput) {
                phraseInput.style.backgroundColor = '';
                phraseInput.style.borderColor = '';
            }
        }, 1000);
    }, 500);
}

/**
 * Handle URL parameters for direct phrase input and generation
 * Main function that processes URL parameters and applies them
 */
function handleURLParameters() {
    try {
        console.log('Processing URL parameters...');
        
        const phrase = getPhraseFromURL();
        
        if (!phrase) {
            console.log('No phrase parameter found in URL');
            return { success: false, reason: 'no_phrase' };
        }
        
        console.log('Found phrase parameter in URL:', phrase);
        
        // Avoid reprocessing the same phrase
        if (phrase === lastProcessedPhrase) {
            console.log('Phrase already processed, skipping');
            return { success: false, reason: 'already_processed' };
        }
        
        // Apply phrase to input
        const applied = applyPhraseToInput(phrase);
        if (!applied) {
            return { success: false, reason: 'input_error' };
        }
        
        // Auto-generate password
        autoGenerateFromURL();
        
        // Dispatch custom event for other modules
        window.dispatchEvent(new CustomEvent('urlPhraseLoaded', {
            detail: { phrase: phrase }
        }));
        
        console.log('URL phrase processing completed successfully');
        return { success: true, phrase: phrase };
        
    } catch (error) {
        console.error('Error handling URL parameters:', error);
        return { success: false, reason: 'error', error: error.message };
    }
}

/**
 * Update URL without reloading the page
 * @param {string} phrase - New phrase for URL (optional)
 * @param {boolean} replace - Whether to replace current history entry
 */
function updateURL(phrase = null, replace = false) {
    try {
        const baseUrl = window.location.origin + window.location.pathname;
        const newUrl = phrase ? `${baseUrl}?phrase=${encodeURIComponent(phrase)}` : baseUrl;
        
        if (replace) {
            history.replaceState(null, '', newUrl);
        } else {
            history.pushState(null, '', newUrl);
        }
        
        console.log('URL updated:', newUrl);
    } catch (error) {
        console.warn('Could not update URL:', error);
    }
}

/**
 * Clear URL parameters
 */
function clearURLParameters() {
    updateURL(null, true);
    lastProcessedPhrase = null;
    console.log('URL parameters cleared');
}

/**
 * Get all supported URL parameters
 * @returns {Object} Object containing all recognized parameters
 */
function getAllURLParameters() {
    if (!urlParams) {
        parseURLParameters();
    }
    
    return {
        phrase: getPhraseFromURL(),
        // Add more parameters here as needed
        // theme: urlParams.get('theme'),
        // mode: urlParams.get('mode'),
    };
}

/**
 * Check if URL has any parameters
 * @returns {boolean} True if URL has parameters
 */
function hasURLParameters() {
    return window.location.search.length > 0;
}

/**
 * Initialize URL handler feature
 */
function initializeURLHandler() {
    console.log('URL Handler feature initializing...');
    
    // Parse initial URL parameters
    parseURLParameters();
    
    // Handle initial URL parameters on page load
    const result = handleURLParameters();
    
    // Listen for browser back/forward navigation
    window.addEventListener('popstate', function(event) {
        console.log('Browser navigation detected, reprocessing URL');
        parseURLParameters();
        handleURLParameters();
    });
    
    console.log('URL Handler feature initialized');
    
    return {
        hasParameters: hasURLParameters(),
        result: result,
        isEnabled: true
    };
}

/**
 * Disable URL handler feature
 */
function disableURLHandler() {
    console.log('URL Handler feature disabled');
    // Could remove event listeners here if needed
}

/**
 * Enable URL handler feature
 */
function enableURLHandler() {
    return initializeURLHandler();
}

/**
 * Get URL handler status for debugging
 */
function getURLHandlerStatus() {
    return {
        hasParameters: hasURLParameters(),
        currentPhrase: getPhraseFromURL(),
        lastProcessedPhrase: lastProcessedPhrase,
        allParameters: getAllURLParameters(),
        currentURL: window.location.href
    };
}

// Export functions for global use
if (typeof window !== 'undefined') {
    window.URLHandler = {
        initializeURLHandler,
        handleURLParameters,
        parseURLParameters,
        getPhraseFromURL,
        createShareableURL,
        applyPhraseToInput,
        updateURL,
        clearURLParameters,
        getAllURLParameters,
        hasURLParameters,
        disableURLHandler,
        enableURLHandler,
        getURLHandlerStatus
    };
}
