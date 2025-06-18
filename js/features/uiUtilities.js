/**
 * UI Utilities Feature Module
 * Handles general UI utilities like button states, clearing, and example functionality
 * This module can be easily enabled/disabled by including/excluding this file
 */

// UI Utilities Feature State
let clearButtonVisible = false;
let examplePhraseInUse = false;

/**
 * Copy generated password to clipboard
 */
function copyPassword() {
    console.log('copyPassword called');
    const passwordElem = document.getElementById('passwordOutput');
    if (!passwordElem) {
        console.error('No element with id="passwordOutput" found');
        return false;
    }
    
    const password = passwordElem.innerText;
    if (!password) {
        console.warn('No password to copy');
        return false;
    }
    
    return navigator.clipboard.writeText(password).then(() => {
        alert('Password copied to clipboard');
        console.log('Password copied successfully');
        
        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('passwordCopied', {
            detail: { password: password }
        }));
        
        return true;
    }).catch((error) => {
        console.error('Failed to copy password:', error);
        // Fallback for older browsers
        try {
            const textArea = document.createElement('textarea');
            textArea.value = password;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('Password copied to clipboard');
            return true;
        } catch (fallbackError) {
            console.error('Clipboard fallback failed:', fallbackError);
            alert('Failed to copy password. Please select and copy manually.');
            return false;
        }
    });
}

/**
 * Placeholder function for PDF download functionality
 * TODO: Implement PDF generation feature
 */
function downloadPDF() {
    console.log('downloadPDF called - Feature not yet implemented');
    alert('PDF download feature coming soon!');
    
    // Dispatch custom event for tracking
    window.dispatchEvent(new CustomEvent('pdfDownloadRequested'));
    
    return false;
}

/**
 * Try the example phrase and generate password
 */
function tryExample() {
    const phraseInput = document.getElementById('phraseInput');
    if (!phraseInput) {
        console.error('Phrase input element not found');
        return false;
    }
    
    const examplePhrase = 'AhamBrahmasmi@108';
    
    // Set the example phrase in the input
    phraseInput.value = examplePhrase;
    examplePhraseInUse = true;
    
    // Focus on the input to show the change
    phraseInput.focus();
    
    // Add a subtle animation to draw attention
    phraseInput.style.transition = 'all 0.3s ease';
    phraseInput.style.transform = 'scale(1.02)';
    phraseInput.style.boxShadow = '0 4px 16px rgba(0, 120, 215, 0.3)';
    
    // Trigger the input event to show strength meter
    const inputEvent = new Event('input', { bubbles: true });
    phraseInput.dispatchEvent(inputEvent);
    
    // Generate the password immediately
    setTimeout(() => {
        if (typeof generatePassword === 'function') {
            generatePassword();
            
            // Manually trigger strength check for the example (backup)
            if (typeof checkStrength === 'function') {
                let previewPassword = '';
                for (let char of examplePhrase) {
                    const sub = (typeof substitutions !== 'undefined' && substitutions[char]) || char;
                    previewPassword += sub;
                }
                checkStrength(previewPassword, examplePhrase);
            }
        }
        
        // Reset the animation after a short delay
        setTimeout(() => {
            phraseInput.style.transform = 'scale(1)';
            phraseInput.style.boxShadow = '';
        }, 300);
    }, 150);
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('exampleTried', {
        detail: { phrase: examplePhrase }
    }));
    
    console.log('Example phrase applied and password generated');
    return true;
}

/**
 * Clear textarea and reset UI state
 */
function clearTextarea() {
    const phraseInput = document.getElementById('phraseInput');
    const passwordOutput = document.getElementById('passwordOutput');
    const strengthMeter = document.getElementById('strengthMeter');
    const transformationSteps = document.getElementById('transformationExplanation');

    if (phraseInput) {
        phraseInput.value = '';
        phraseInput.focus();
        
        // Trigger input event to update strength meter and hide clear button
        const inputEvent = new Event('input', { bubbles: true });
        phraseInput.dispatchEvent(inputEvent);
    }
    
    // Clear password output
    if (passwordOutput) {
        passwordOutput.innerHTML = '';
    }

    // Clear strength meter
    if (strengthMeter) {
        strengthMeter.innerHTML = '';
    }

    // Clear transformation steps if they exist
    if (transformationSteps) {
        transformationSteps.innerHTML = '';
    }
    
    // Reset state
    examplePhraseInUse = false;
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('textareaCleared'));
    
    console.log('Textarea and related UI elements cleared');
    return true;
}

/**
 * Toggle visibility of clear button
 * @param {boolean} show - Whether to show the clear button
 */
function toggleClearButton(show) {
    const clearBtn = document.getElementById('clearBtn');
    if (clearBtn) {
        clearBtn.style.display = show ? 'flex' : 'none';
        clearButtonVisible = show;
        
        // Update accessibility attributes
        clearBtn.setAttribute('aria-hidden', show ? 'false' : 'true');
        
        console.log(`Clear button ${show ? 'shown' : 'hidden'}`);
    } else {
        console.warn('Clear button element not found');
    }
}

/**
 * Set up input field real-time monitoring
 */
function setupInputMonitoring() {
    const phraseInput = document.getElementById('phraseInput');
    if (!phraseInput) {
        console.warn('Phrase input not found for monitoring');
        return false;
    }
    
    let typingTimer;
    const typingDelay = 300; // milliseconds
    
    phraseInput.addEventListener('input', function() {
        clearTimeout(typingTimer);
        const phrase = this.value.trim();
        
        // Show/hide clear button based on content
        toggleClearButton(this.value.length > 0);
        
        // Show/hide share button based on content
        if (typeof toggleShareButton === 'function') {
            toggleShareButton(this.value.length > 0);
        }
        
        if (phrase.length === 0) {
            if (typeof checkStrength === 'function') {
                checkStrength('');
            }
            return;
        }
        
        // Debounce the strength checking
        typingTimer = setTimeout(() => {
            if (typeof checkStrength === 'function' && typeof substitutions !== 'undefined') {
                // Generate password preview for strength checking
                let previewPassword = '';
                for (let char of phrase) {
                    const sub = substitutions[char] || char;
                    previewPassword += sub;
                }
                checkStrength(previewPassword, phrase);
            }
        }, typingDelay);
    });
    
    // Clear strength meter on focus if empty
    phraseInput.addEventListener('focus', function() {
        if (this.value.trim().length === 0 && typeof checkStrength === 'function') {
            checkStrength('', '');
        }
    });
    
    console.log('Input monitoring set up');
    return true;
}

/**
 * Set up button event listeners
 */
function setupButtonEventListeners() {
    // Generate button
    const genBtn = document.getElementById('generateBtn');
    if (genBtn) {
        genBtn.addEventListener('click', function() {
            console.log('Generate Password button clicked');
            if (typeof generatePassword === 'function') {
                generatePassword();
            }
        });
    }
    
    // Copy button
    const copyBtn = document.getElementById('copyBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            console.log('Copy Password button clicked');
            copyPassword();
        });
    }
    
    // Clear button
    const clearBtn = document.getElementById('clearBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            clearTextarea();
        });
    }
    
    // Download button
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            console.log('Download PDF button clicked');
            downloadPDF();
        });
    }
    
    // Example phrase element
    const examplePhrase = document.querySelector('.example-phrase');
    if (examplePhrase) {
        examplePhrase.addEventListener('click', tryExample);
        examplePhrase.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                tryExample();
            }
        });
    }
    
    console.log('Button event listeners set up');
}

/**
 * Set up global keyboard shortcuts
 */
function setupGlobalKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl+Enter to generate password
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            const generateBtn = document.getElementById('generateBtn');
            if (generateBtn && typeof generatePassword === 'function') {
                generatePassword();
            }
        }
        
        // Ctrl+C to copy password when password output is focused
        if (e.ctrlKey && e.key === 'c' && e.target.id === 'passwordOutput') {
            e.preventDefault();
            copyPassword();
        }
        
        // Ctrl+Backspace to clear textarea
        if (e.ctrlKey && e.key === 'Backspace') {
            e.preventDefault();
            clearTextarea();
        }
        
        // Alt+1 to toggle description section
        if (e.altKey && e.key === '1') {
            e.preventDefault();
            if (typeof toggleDescription === 'function') {
                toggleDescription();
            }
        }
        
        // Alt+2 to toggle suggestions section
        if (e.altKey && e.key === '2') {
            e.preventDefault();
            if (typeof toggleSuggestions === 'function') {
                toggleSuggestions();
            }
        }
        
        // Escape key to close any expanded sections or modal
        if (e.key === 'Escape') {
            // First check if modal is open and close it
            if (typeof isModalOpen !== 'undefined' && isModalOpen && typeof hideKeyboardHelp === 'function') {
                hideKeyboardHelp();
                return;
            }
            
            // Then close any expanded sections
            if (typeof collapseAllSections === 'function') {
                collapseAllSections();
            }
        }
    });
    
    console.log('Global keyboard shortcuts set up');
}

/**
 * Initialize UI utilities on page load
 */
function initializeUIUtilities() {
    console.log('UI Utilities feature initializing...');
    
    // Set up input monitoring
    setupInputMonitoring();
    
    // Set up button event listeners
    setupButtonEventListeners();
    
    // Set up global keyboard shortcuts
    setupGlobalKeyboardShortcuts();
    
    // Initialize button visibility on page load
    const phraseInputElement = document.getElementById('phraseInput');
    if (phraseInputElement) {
        toggleClearButton(phraseInputElement.value.length > 0);
        
        // Also initialize share button visibility if function exists
        if (typeof toggleShareButton === 'function') {
            toggleShareButton(phraseInputElement.value.length > 0);
        }
    }
    
    console.log('UI Utilities feature initialized');
    
    return {
        clearButtonVisible: clearButtonVisible,
        examplePhraseInUse: examplePhraseInUse,
        isEnabled: true
    };
}

/**
 * Get UI state for debugging
 */
function getUIState() {
    const phraseInput = document.getElementById('phraseInput');
    const passwordOutput = document.getElementById('passwordOutput');
    const strengthMeter = document.getElementById('strengthMeter');
    
    return {
        clearButtonVisible: clearButtonVisible,
        examplePhraseInUse: examplePhraseInUse,
        inputValue: phraseInput?.value || '',
        inputLength: phraseInput?.value?.length || 0,
        hasPassword: !!passwordOutput?.innerText,
        hasStrengthMeter: !!strengthMeter?.innerHTML
    };
}

/**
 * Disable UI utilities feature
 */
function disableUIUtilities() {
    // Could remove event listeners here if needed
    console.log('UI Utilities feature disabled');
}

/**
 * Enable UI utilities feature
 */
function enableUIUtilities() {
    return initializeUIUtilities();
}

// Export functions for global use
if (typeof window !== 'undefined') {
    window.UIUtilities = {
        initializeUIUtilities,
        copyPassword,
        downloadPDF,
        tryExample,
        clearTextarea,
        toggleClearButton,
        setupInputMonitoring,
        setupButtonEventListeners,
        setupGlobalKeyboardShortcuts,
        getUIState,
        disableUIUtilities,
        enableUIUtilities
    };
}
