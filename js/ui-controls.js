// ...existing code...

class UIControls {
    constructor() {
        this.initialized = false;
        this.sectionStates = {
            description: true,
            suggestions: true,
            transformation: true
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.initializeSectionStates();
        this.initialized = true;
        
        console.log('🎛️ UI Controls initialized');
    }
    
    /**
     * Setup event listeners for all UI controls
     */
    setupEventListeners() {
        // Description section toggle
        const descHeader = document.querySelector('.app-description-header');
        if (descHeader) {
            descHeader.addEventListener('click', () => this.toggleDescription());
            descHeader.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleDescription();
                }
            });
        }
        
        // Suggestions section toggle
        const suggestionsHeader = document.querySelector('.phrase-suggestions-header');
        if (suggestionsHeader) {
            suggestionsHeader.addEventListener('click', () => this.toggleSuggestions());
            suggestionsHeader.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleSuggestions();
                }
            });
        }
        
        // Transformation section toggle
        const transformationHeader = document.querySelector('.transformation-header');
        if (transformationHeader) {
            transformationHeader.addEventListener('click', () => this.toggleTransformation());
            transformationHeader.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleTransformation();
                }
            });
        }
        
        // Copy button
        const copyBtn = document.getElementById('copyBtn');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => this.copyPassword());
        }
        
        // Clear button
        const clearBtn = document.getElementById('clearBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearInput());
        }
        
        // Input monitoring for button visibility
        const phraseInput = document.getElementById('phraseInput');
        if (phraseInput) {
            phraseInput.addEventListener('input', () => this.updateButtonVisibility());
        }
    }
    
    /**
     * Initialize section states from localStorage or defaults
     */
    initializeSectionStates() {
        try {
            const saved = localStorage.getItem('uiSectionStates');
            if (saved) {
                this.sectionStates = { ...this.sectionStates, ...JSON.parse(saved) };
            }
        } catch (error) {
            console.warn('Failed to load UI section states:', error);
        }
        
        // Apply saved states
        this.applySectionState('description');
        this.applySectionState('suggestions');
    }
    
    /**
     * Apply section state to DOM
     */
    applySectionState(sectionName) {
        const isExpanded = this.sectionStates[sectionName];
        
        switch (sectionName) {
            case 'description':
                const descContent = document.getElementById('descriptionContent');
                const descIcon = document.getElementById('descriptionIcon');
                const descHeader = document.querySelector('.app-description-header');
                
                if (descContent && descIcon && descHeader) {
                    descContent.style.display = isExpanded ? 'block' : 'none';
                    descIcon.textContent = isExpanded ? '▼' : '▶';
                    descHeader.setAttribute('aria-expanded', isExpanded);
                }
                break;
                
            case 'suggestions':
                const suggestionsContent = document.getElementById('suggestionsContent');
                const suggestionsIcon = document.getElementById('suggestionsIcon');
                const suggestionsHeader = document.querySelector('.phrase-suggestions-header');
                
                if (suggestionsContent && suggestionsIcon && suggestionsHeader) {
                    if (isExpanded) {
                        suggestionsContent.classList.remove('collapsed');
                        suggestionsIcon.classList.remove('collapsed');
                        suggestionsIcon.textContent = '▼';
                        suggestionsHeader.setAttribute('aria-expanded', 'true');
                    } else {
                        suggestionsContent.classList.add('collapsed');
                        suggestionsIcon.classList.add('collapsed');
                        suggestionsIcon.textContent = '▶';
                        suggestionsHeader.setAttribute('aria-expanded', 'false');
                    }
                }
                break;
                
            case 'transformation':
                const transformationContent = document.getElementById('transformationContent');
                const transformationIcon = document.getElementById('transformationIcon');
                const transformationHeader = document.querySelector('.transformation-header');
                
                if (transformationContent && transformationIcon && transformationHeader) {
                    if (isExpanded) {
                        transformationContent.classList.remove('collapsed');
                        transformationIcon.classList.remove('collapsed');
                        transformationIcon.textContent = '▼';
                        transformationHeader.setAttribute('aria-expanded', 'true');
                    } else {
                        transformationContent.classList.add('collapsed');
                        transformationIcon.classList.add('collapsed');
                        transformationIcon.textContent = '▶';
                        transformationHeader.setAttribute('aria-expanded', 'false');
                    }
                }
                break;
        }
    }
    
    /**
     * Toggle description section
     */
    toggleDescription() {
        this.sectionStates.description = !this.sectionStates.description;
        this.applySectionState('description');
        this.saveSectionStates();
    }
    
    /**
     * Toggle suggestions section
     */
    toggleSuggestions() {
        this.sectionStates.suggestions = !this.sectionStates.suggestions;
        this.applySectionState('suggestions');
        this.saveSectionStates();
    }
    
    /**
     * Toggle transformation section
     */
    toggleTransformation() {
        this.sectionStates.transformation = !this.sectionStates.transformation;
        this.applySectionState('transformation');
        this.saveSectionStates();
    }
    
    /**
     * Save section states to localStorage
     */
    saveSectionStates() {
        try {
            localStorage.setItem('uiSectionStates', JSON.stringify(this.sectionStates));
        } catch (error) {
            console.warn('Failed to save UI section states:', error);
        }
    }
    
    /**
     * Copy password to clipboard
     */
    copyPassword() {
        const passwordOutput = document.getElementById('passwordOutput');
        if (!passwordOutput || !passwordOutput.value.trim()) {
            if (typeof notify !== 'undefined') {
                notify.warning('⚠️ No password to copy! Please enter a phrase first.');
            }
            return;
        }
        
        const text = passwordOutput.value;
        
        // Modern clipboard API with fallback
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(() => {
                this.showCopyFeedback('Password copied to clipboard! 🔐');
            }).catch(() => {
                this.fallbackCopy(text);
            });
        } else {
            this.fallbackCopy(text);
        }
    }
    
    /**
     * Fallback copy method for older browsers
     */
    fallbackCopy(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showCopyFeedback('Password copied to clipboard! 🔐');
        } catch (err) {
            console.error('Fallback copy failed:', err);
            this.showCopyFeedback('❌ Copy failed. Please select and copy manually.', 'error');
        }
        
        document.body.removeChild(textArea);
    }
    
    /**
     * Show copy feedback to user
     */
    showCopyFeedback(message, type = 'success') {
        const copyBtn = document.getElementById('copyBtn');
        if (!copyBtn) return;
        
        const originalText = copyBtn.textContent;
        
        copyBtn.textContent = type === 'error' ? '❌ Failed' : '✅ Copied!';
        copyBtn.disabled = true;
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.disabled = false;
        }, 2000);
    }
    
    /**
     * Clear input and reset UI
     */
    clearInput() {
        const phraseInput = document.getElementById('phraseInput');
        const passwordOutput = document.getElementById('passwordOutput');
        const transformationSteps = document.getElementById('transformationSteps');
        
        if (phraseInput) phraseInput.value = '';
        if (passwordOutput) passwordOutput.value = '';
        if (transformationSteps) transformationSteps.innerHTML = '';
        
        this.updateButtonVisibility();
        
        // Clear password strength meter
        if (typeof checkStrength === 'function') {
            checkStrength('', '');
        }
    }
    
    /**
     * Update button visibility based on content
     */
    updateButtonVisibility() {
        const phraseInput = document.getElementById('phraseInput');
        const passwordOutput = document.getElementById('passwordOutput');
        const hasPhrase = phraseInput && phraseInput.value.trim();
        const hasPassword = passwordOutput && passwordOutput.value.trim();
        
        // Update copy button
        this.updateCopyButtonVisibility(hasPassword);
        
        // Update clear button
        this.updateClearButtonVisibility(hasPhrase);
        
        // Update share button
        this.updateShareButtonVisibility(hasPassword);
    }
    
    /**
     * Show or hide the copy button
     */
    updateCopyButtonVisibility(show) {
        const copyBtn = document.getElementById('copyBtn');
        if (copyBtn) {
            copyBtn.style.display = show ? 'inline-block' : 'none';
        }
    }
    
    /**
     * Show or hide the clear button
     */
    updateClearButtonVisibility(show) {
        const clearBtn = document.getElementById('clearBtn');
        if (clearBtn) {
            clearBtn.style.display = show ? 'inline-block' : 'none';
        }
    }
    
    /**
     * Show or hide the share button
     */
    updateShareButtonVisibility(show) {
        const shareBtn = document.getElementById('shareBtn');
        if (shareBtn) {
            if (show) {
                shareBtn.classList.remove('share-button-hidden');
                shareBtn.classList.add('share-button-visible');
            } else {
                shareBtn.classList.add('share-button-hidden');
                shareBtn.classList.remove('share-button-visible');
            }
        }
    }
    
    /**
     * Apply phrase with animation effect
     */
    applyPhraseWithEffect(phrase) {
        const phraseInput = document.getElementById('phraseInput');
        if (!phraseInput) return;

        phraseInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        phraseInput.focus();
        phraseInput.value = '';

        setTimeout(() => {
            // Clean phrase: remove emoji(s), extra whitespace, and quotes
            let cleanPhrase = phrase;
            if (typeof cleanPhrase === 'string') {
                // Remove leading emoji(s) and whitespace
                cleanPhrase = cleanPhrase.replace(/^[^\p{L}\p{N}]+/u, '');
                // Remove any extra quotes
                cleanPhrase = cleanPhrase.replace(/^"|"$/g, '');
                // Remove trailing whitespace
                cleanPhrase = cleanPhrase.trim();
            }

            phraseInput.value = cleanPhrase;
            phraseInput.classList.add('auto-applied');

            setTimeout(() => {
                phraseInput.classList.remove('auto-applied');

                // Trigger password generation
                if (typeof generatePassword === 'function') {
                    generatePassword();
                }
            }, 350);
        }, 200);
    }
    
    /**
     * Get current UI state
     */
    getState() {
        return {
            sectionStates: this.sectionStates,
            initialized: this.initialized
        };
    }
}

// Initialize UI controls when DOM is ready
let uiControls = null;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        uiControls = new UIControls();
        window.uiControls = uiControls;
    });
} else {
    uiControls = new UIControls();
    window.uiControls = uiControls;
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UIControls;
}

// Export key functions globally for backward compatibility
window.toggleDescription = () => uiControls?.toggleDescription();
window.toggleSuggestions = () => uiControls?.toggleSuggestions();
window.toggleTransformation = () => uiControls?.toggleTransformation();
window.copyPassword = () => uiControls?.copyPassword();
window.clearInput = () => uiControls?.clearInput();
window.clearTextarea = () => uiControls?.clearInput(); // Alias for backward compatibility
window.applyPhraseWithEffect = (phrase) => uiControls?.applyPhraseWithEffect(phrase);
