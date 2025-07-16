class URLHandler {
    constructor() {
        this.initialized = false;
        this.init();
    }
    init() {
        this.initialized = true;
        console.log('🌐 URL Handler initialized');
    }
    handleURLParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        const phrase = urlParams.get('phrase');
        if (phrase) {
            const phraseInput = document.getElementById('phraseInput');
            if (phraseInput) {
                try {
                    const decodedPhrase = decodeURIComponent(phrase);
                    phraseInput.value = decodedPhrase;
                    if (typeof generatePassword === 'function') {
                        generatePassword();
                    }
                    if (window.notify) {
                        window.notify.success('🔗 Phrase loaded from URL!');
                    }
                    phraseInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
    updateURLWithPhrase(phrase) {
        if (!phrase) return;
        try {
            const encodedPhrase = encodeURIComponent(phrase);
            const newUrl = `${window.location.origin}${window.location.pathname}?phrase=${encodedPhrase}`;
            window.history.pushState({ phrase }, '', newUrl);
            return newUrl;
        } catch (error) {
            console.error('Failed to update URL:', error);
            return null;
        }
    }
    getURLParameters() {
        const params = new URLSearchParams(window.location.search);
        const result = {};
        for (const [key, value] of params.entries()) {
            result[key] = value;
        }
        return result;
    }
    clearURLParameters() {
        const url = `${window.location.origin}${window.location.pathname}`;
        window.history.pushState({}, '', url);
    }
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
if (typeof module !== 'undefined' && module.exports) {
    module.exports = URLHandler;
}
window.handleURLParameters = () => urlHandler?.handleURLParameters();
window.updateURLWithPhrase = (phrase) => urlHandler?.updateURLWithPhrase(phrase);
window.generateShareableURL = (phrase) => urlHandler?.generateShareableURL(phrase);
