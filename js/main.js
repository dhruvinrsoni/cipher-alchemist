/**
 * Cipher Alchemist - Main Application Coordinator
 * 
 * This file coordinates the initialization and interaction between different modules.
 * Individual functionality is handled by specialized modules.
 */

// ==============================================
// CORE PASSWORD FUNCTIONALITY
// ==============================================

/**
 * Generate password from input phrase
 */
function generatePassword() {
    console.log('generatePassword called');
    const phraseInput = document.getElementById('phraseInput');
    const passwordOutput = document.getElementById('passwordOutput');
    const transformationSteps = document.getElementById('transformationSteps');
    
    if (!phraseInput || !passwordOutput) {
        console.error('Required elements not found');
        return;
    }
    
    const phrase = phraseInput.value.trim();
    
    // Clear everything if input is empty
    if (!phrase) {
        passwordOutput.value = '';
        if (transformationSteps) transformationSteps.innerHTML = '';
        
        // Clear password strength meter
        if (typeof checkStrength === 'function') {
            checkStrength('', '');
        }
        
        // Update UI buttons via UI controls
        if (window.uiControls) {
            window.uiControls.updateButtonVisibility();
        }
        return;
    }
    
    try {
        // Use cipher algorithms to transform the phrase
        const result = applyCipherTransform(phrase);
        
        passwordOutput.value = result.password;
        
        // Display transformation steps (fix: use explanation if steps missing)
        if (transformationSteps) {
            let stepsHtml = '';
            if (result.steps && Array.isArray(result.steps)) {
                stepsHtml = result.steps.map(step => `<li><strong>${step.operation}:</strong> ${step.result}</li>`).join('');
            } else if (result.explanation) {
                stepsHtml = result.explanation;
            }
            transformationSteps.innerHTML = `
                <div class="transformation-section">
                    <div class="transformation-header" onclick="toggleTransformation()" aria-expanded="true" role="button" tabindex="0" aria-controls="transformationContent">
                        <span class="transformation-title">🔄 Transformation Steps</span>
                        <span class="transformation-icon" id="transformationIcon">▼</span>
                    </div>
                    <div class="transformation-content" id="transformationContent">
                        <ol class="transformation-steps">
                            ${stepsHtml}
                        </ol>
                        <p class="transformation-note">💡 <strong>Security Tip:</strong> Character substitution makes passwords harder to guess while keeping them memorable.</p>
                    </div>
                </div>
            `;
        }
        
        // Update password strength
        if (typeof checkStrength === 'function') {
            checkStrength(result.password, phrase);
        }
        
        // Update UI buttons via UI controls
        if (window.uiControls) {
            window.uiControls.updateButtonVisibility();
        }
        
        console.log('Password generated successfully');
        
    } catch (error) {
        console.error('Password generation failed:', error);
        passwordOutput.value = '';
        if (transformationSteps) transformationSteps.innerHTML = '';
        
        if (window.notify) {
            window.notify.error('Password generation failed. Please try again.');
        }
    }
}

/**
 * Try example phrase
 */
function tryExample() {
    const phraseInput = document.getElementById('phraseInput');
    if (!phraseInput) return;
    
    if (window.uiControls) {
        window.uiControls.applyPhraseWithEffect('AhamBrahmasmi@108');
    } else {
        // Fallback if UI controls not available
        phraseInput.value = 'AhamBrahmasmi@108';
        generatePassword();
    }
}

// ==============================================
// SECRET DEVELOPER ACCESS
// ==============================================

let konami = [];
const konamiCode = ['Control', 'Shift', 'd', 'e', 'v'];
let devSequenceTimeout;
let clickSequence = [];
let clickTimeout;

/**
 * Handle secret developer access sequence
 */
function handleDevSequence(e) {
    // Handle the special key combination: Ctrl+Shift+D+E+V
    if (e.ctrlKey && e.shiftKey && ['d', 'e', 'v'].includes(e.key.toLowerCase())) {
        konami.push(e.key.toLowerCase());
    } else if (!e.ctrlKey || !e.shiftKey) {
        // Reset if Ctrl+Shift is not held
        konami = [];
        return;
    } else {
        // Wrong key while holding Ctrl+Shift
        konami = [];
        return;
    }
    
    // Keep only the last 3 keystrokes (d, e, v)
    if (konami.length > 3) {
        konami = konami.slice(-3);
    }
    
    // Check if sequence matches (d, e, v in order)
    if (konami.length === 3 && konami.join('') === 'dev') {
        console.log('🧪 Developer mode activated! (Ctrl+Shift+D+E+V)');
        
        // Reset the sequence
        konami = [];
        
        // Open developer dashboard
        if (window.location.protocol === 'file:' || window.location.hostname === 'localhost') {
            window.open('testlab.html', '_blank');
        } else {
            showDevModeOverlay();
        }
    }
    
    // Clear sequence after 3 seconds of inactivity
    clearTimeout(devSequenceTimeout);
    devSequenceTimeout = setTimeout(() => {
        konami = [];
    }, 3000);
}

/**
 * Handle alternative secret access via clicking app title
 */
function handleSecretClick() {
    clickSequence.push(Date.now());
    
    // Keep only clicks from last 2 seconds
    const now = Date.now();
    clickSequence = clickSequence.filter(time => now - time <= 2000);
    
    // Check for 5 rapid clicks (within 2 seconds)
    if (clickSequence.length >= 5) {
        console.log('🧪 Developer mode activated! (5 rapid clicks)');
        clickSequence = [];
        
        if (window.location.protocol === 'file:' || window.location.hostname === 'localhost') {
            window.open('testlab.html', '_blank');
        } else {
            showDevModeOverlay();
        }
    }
    
    // Clear sequence after 3 seconds
    clearTimeout(clickTimeout);
    clickTimeout = setTimeout(() => {
        clickSequence = [];
    }, 3000);
}

/**
 * Show developer mode overlay for production/installed app
 */
function showDevModeOverlay() {
    // Remove existing overlay if any
    const existingOverlay = document.getElementById('devModeOverlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }
    
    // Create developer mode overlay
    const overlay = document.createElement('div');
    overlay.id = 'devModeOverlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        backdrop-filter: blur(5px);
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 10px;
        max-width: 500px;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    
    content.innerHTML = `
        <h2 style="margin: 0 0 20px 0; color: #333;">🧪 Developer Mode</h2>
        <p style="margin: 0 0 20px 0; color: #666;">You've accessed the secret developer mode!</p>
        <div style="margin: 20px 0;">
            <button onclick="window.open('testlab.html', '_blank')" style="background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin: 5px;">
                🧪 Open Test Lab
            </button>
            <button onclick="window.open('dev.html', '_blank')" style="background: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin: 5px;">
                🔧 Developer Dashboard
            </button>
        </div>
        <p style="margin: 20px 0 0 0; font-size: 0.9em; color: #888;">
            <strong>Secret access methods:</strong><br>
            • Ctrl+Shift+D+E+V<br>
            • Click app title 5 times rapidly
        </p>
        <button onclick="this.closest('#devModeOverlay').remove()" style="background: #dc3545; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 20px;">
            Close
        </button>
    `;
    
    overlay.appendChild(content);
    document.body.appendChild(overlay);
    
    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.remove();
        }
    });
    
    // Close on escape key
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            overlay.remove();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

// ==============================================
// INITIALIZATION
// ==============================================

/**
 * Initialize the application
 */
function initializeApp() {
    console.log('🔮 Cipher Alchemist - Initializing...');
    
    // Setup basic event listeners
    const phraseInput = document.getElementById('phraseInput');
    if (phraseInput) {
        phraseInput.addEventListener('input', generatePassword);
        phraseInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                generatePassword();
            }
        });
    }
    
    // Setup download buttons
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            window.open('assets/docs/cheat_sheet.pdf', '_blank');
        });
    }
    
    const downloadExcelBtn = document.getElementById('downloadExcelBtn');
    if (downloadExcelBtn) {
        downloadExcelBtn.addEventListener('click', () => {
            window.open('assets/docs/Password_Substitution_Cheat_Sheet_V2.xlsx', '_blank');
        });
    }
    
    // Setup example phrase listeners
    const exampleElements = document.querySelectorAll('.example-phrase');
    exampleElements.forEach(element => {
        element.addEventListener('click', () => {
            if (window.uiControls) {
                window.uiControls.applyPhraseWithEffect(element.textContent);
            } else {
                // Fallback
                const phraseInput = document.getElementById('phraseInput');
                if (phraseInput) {
                    phraseInput.value = element.textContent;
                    generatePassword();
                }
            }
        });
        element.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
    });

    // Setup phrase suggestion listeners (auto-applied on click)
    setTimeout(() => {
        const suggestionChips = document.querySelectorAll('.suggestion-chip');
        suggestionChips.forEach(chip => {
            chip.addEventListener('click', () => {
                if (window.uiControls) {
                    window.uiControls.applyPhraseWithEffect(chip.textContent);
                } else {
                    // Fallback
                    const phraseInput = document.getElementById('phraseInput');
                    if (phraseInput) {
                        phraseInput.value = chip.textContent;
                        generatePassword();
                    }
                }
            });
            chip.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    chip.click();
                }
            });
        });
    }, 400);
    
    // Initialize other features if available
    if (typeof initializePWAInstall === 'function') {
        console.log('📱 Initializing PWA features...');
        initializePWAInstall();
    }
    
    if (typeof initializeKeyboardHelp === 'function') {
        console.log('⌨️ Initializing keyboard shortcuts...');
        initializeKeyboardHelp();
    }
    
    if (typeof initializePhraseSuggestions === 'function') {
        console.log('💡 Initializing phrase suggestions...');
        initializePhraseSuggestions();
        if (typeof refreshSuggestions === 'function') {
            refreshSuggestions();
        }
    }
    
    // Initialize sharing feature
    if (typeof initializeSharing === 'function') {
        console.log('🔗 Initializing sharing features...');
        const sharingResult = initializeSharing();
        console.log('✅ Sharing feature initialized:', sharingResult);
    } else {
        console.warn('⚠️ Sharing feature not available');
    }
    
    // Removed initialization and button listeners for plugin manager, advanced search, file operations
    
    // Initialize secret developer access
    document.addEventListener('keydown', handleDevSequence);
    
    // Add alternative secret access via title clicks
    const appTitle = document.querySelector('h1');
    if (appTitle) {
        appTitle.addEventListener('click', handleSecretClick);
        appTitle.style.cursor = 'default'; // Don't show pointer cursor
    }
    
    // Handle URL parameters AFTER all modules are initialized
    setTimeout(() => {
        console.log('🌐 Processing URL parameters...');
        if (window.urlHandler) {
            window.urlHandler.handleURLParameters();
        }
    }, 300);
    
    console.log('✅ Cipher Alchemist initialized successfully!');
    console.log('💡 Tip: Hold Ctrl+Shift and type "dev" to access developer mode');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Backward compatibility - Export key functions to global scope
window.generatePassword = generatePassword;
window.tryExample = tryExample;
