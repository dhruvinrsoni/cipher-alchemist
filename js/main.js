/**
 * Cipher Alchemist - Main Application
 * 
 * This file contains ALL the core functionality in one place:
 * - Password generation and UI interactions
 * - Theme management
 * - URL parameter handling
 * - Version display
 * - Collapsible sections
 * - Feature initialization
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
        updateShareButtonVisibility(false);
        updateCopyButtonVisibility(false);
        
        // Clear password strength meter
        if (typeof checkStrength === 'function') {
            checkStrength('', '');
        }
        return;
    }
    
    // Use applyCipherTransform if available, otherwise fallback
    let password = '';
    let explanation = '';
    
    if (typeof applyCipherTransform === 'function') {
        const result = applyCipherTransform(phrase);
        password = result.password;
        explanation = result.explanation;
    } else {
        // Simple fallback transformation
        password = phrase.split('').map(char => {
            if (char.toLowerCase() === 'a') return '@';
            if (char.toLowerCase() === 'e') return '3';
            if (char.toLowerCase() === 'i') return '!';
            if (char.toLowerCase() === 'o') return '0';
            if (char.toLowerCase() === 's') return '$';
            return char;
        }).join('');
    }
    
    // Display the password in textarea
    passwordOutput.value = password;
    
    // Display transformation steps
    if (transformationSteps && explanation) {
        transformationSteps.innerHTML = `
            <div class="transformation-section">
                <div class="transformation-header" onclick="toggleTransformation()" aria-expanded="true" role="button" tabindex="0" aria-controls="transformationContent">
                    <span class="transformation-title">🔄 Transformation Steps</span>
                    <span class="transformation-icon" id="transformationIcon">▼</span>
                </div>
                <div class="transformation-content" id="transformationContent">
                    <ol class="transformation-steps">
                        ${explanation}
                    </ol>
                    <p class="transformation-note">💡 <strong>Security Tip:</strong> Character substitution makes passwords harder to guess while keeping them memorable.</p>
                </div>
            </div>
        `;
        
        // Auto-expand the transformation section
        setTimeout(() => {
            const transformationContent = document.getElementById('transformationContent');
            const transformationIcon = document.getElementById('transformationIcon');
            const transformationHeader = document.querySelector('.transformation-header');
            
            if (transformationContent && transformationContent.classList.contains('collapsed')) {
                transformationContent.classList.remove('collapsed');
                transformationIcon.classList.remove('collapsed');
                transformationIcon.textContent = '▼';
                transformationHeader.setAttribute('aria-expanded', 'true');
            }
        }, 100);
    }
    
    // Update UI
    updateShareButtonVisibility(true);
    updateCopyButtonVisibility(true);
    updateClearButtonVisibility();
    
    // Trigger password strength analysis
    if (typeof checkStrength === 'function') {
        checkStrength(password, phrase);
    }
}

/**
 * Copy generated password to clipboard
 */
function copyPassword() {
    const passwordOutput = document.getElementById('passwordOutput');
      if (!passwordOutput || !passwordOutput.value.trim()) {
        modernAlert('⚠️ No password to copy! Please enter a phrase first.');
        return;
    }
    
    const text = passwordOutput.value;
    
    // Modern clipboard API with fallback
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showCopyFeedback('Password copied to clipboard! 🔐');
        }).catch(() => {
            fallbackCopyText(text);
        });
    } else {
        fallbackCopyText(text);
    }
}

/**
 * Fallback copy method for older browsers
 */
function fallbackCopyText(text) {
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
        showCopyFeedback('Password copied to clipboard! 🔐');
    } catch (err) {
        console.error('Fallback copy failed:', err);
        showCopyFeedback('❌ Copy failed. Please select and copy manually.', 'error');
    }
    
    document.body.removeChild(textArea);
}

/**
 * Show copy feedback to user
 */
function showCopyFeedback(message, type = 'success') {
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
 * Clear input and output
 */
function clearTextarea() {
    const phraseInput = document.getElementById('phraseInput');
    const passwordOutput = document.getElementById('passwordOutput');
    const transformationSteps = document.getElementById('transformationSteps');
    
    if (phraseInput) phraseInput.value = '';
    if (passwordOutput) passwordOutput.value = '';
    if (transformationSteps) transformationSteps.innerHTML = '';
    
    // Update UI
    updateShareButtonVisibility(false);
    updateCopyButtonVisibility(false);
    updateClearButtonVisibility();
    
    // Clear password strength meter
    if (typeof checkStrength === 'function') {
        checkStrength('', '');
    }
    
    // Focus back to input
    if (phraseInput) phraseInput.focus();
}

/**
 * Insert example phrase
 */
function tryExample() {
    const phraseInput = document.getElementById('phraseInput');
    if (!phraseInput) return;
    
    // Use the specific example from the HTML
    phraseInput.value = 'AhamBrahmasmi@108';
    generatePassword();
}

/**
 * Update share button visibility
 */
function updateShareButtonVisibility(show) {
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
 * Update copy button visibility
 */
function updateCopyButtonVisibility(show) {
    const copyBtn = document.getElementById('copyBtn');
    if (copyBtn) {
        copyBtn.style.display = show ? 'inline-block' : 'none';
    }
}

/**
 * Update clear button visibility
 */
function updateClearButtonVisibility() {
    const phraseInput = document.getElementById('phraseInput');
    const clearBtn = document.getElementById('clearBtn');
    
    if (clearBtn && phraseInput) {
        clearBtn.style.display = phraseInput.value.trim() ? 'inline-block' : 'none';
    }
}

// ==============================================
// THEME MANAGEMENT
// ==============================================

/**
 * Toggle between light and dark themes
 */
function toggleTheme() {
    const isDark = document.body.classList.contains('dark-theme');
    const newTheme = isDark ? 'light-theme' : 'dark-theme';
    
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(newTheme);
    
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
        themeBtn.textContent = newTheme === 'dark-theme' ? '☀️' : '🌙';
        themeBtn.setAttribute('title', 
            newTheme === 'dark-theme' ? 'Switch to light theme' : 'Switch to dark theme'
        );
    }
    
    localStorage.setItem('theme', newTheme);
    console.log(`Theme changed to: ${newTheme}`);
}

/**
 * Initialize theme from localStorage
 */
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light-theme';
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(savedTheme);
    
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
        themeBtn.textContent = savedTheme === 'dark-theme' ? '☀️' : '🌙';
        themeBtn.addEventListener('click', toggleTheme);
    }
}

// ==============================================
// COLLAPSIBLE SECTIONS
// ==============================================

/**
 * Toggle description section
 */
function toggleDescription() {
    const content = document.getElementById('descriptionContent');
    const icon = document.getElementById('descriptionIcon');
    const header = document.querySelector('.app-description-header');
    
    if (content && icon && header) {
        if (content.style.display === 'none') {
            content.style.display = 'block';
            icon.textContent = '▼';
            header.setAttribute('aria-expanded', 'true');
        } else {
            content.style.display = 'none';
            icon.textContent = '▶';
            header.setAttribute('aria-expanded', 'false');
        }
    }
}

/**
 * Toggle transformation details section
 */
function toggleTransformation() {
    const content = document.getElementById('transformationContent');
    const icon = document.getElementById('transformationIcon');
    const header = document.querySelector('.transformation-header');
    
    if (content && icon && header) {
        if (content.style.display === 'none') {
            content.style.display = 'block';
            icon.textContent = '▼';
            header.setAttribute('aria-expanded', 'true');
        } else {
            content.style.display = 'none';
            icon.textContent = '▶';
            header.setAttribute('aria-expanded', 'false');
        }
    }
}

// ==============================================
// URL PARAMETER HANDLING
// ==============================================

/**
 * Handle URL parameters for direct phrase sharing
 */
function handleURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const phrase = urlParams.get('phrase');
    
    if (phrase) {
        console.log('🌐 Processing URL parameter phrase:', phrase);
        
        const phraseInput = document.getElementById('phraseInput');
        if (phraseInput) {
            phraseInput.value = decodeURIComponent(phrase);
            
            // Generate password and trigger all related features
            generatePassword();
            updateClearButtonVisibility();
            
            // Force update all UI components with multiple attempts
            const passwordOutput = document.getElementById('passwordOutput');
            const password = passwordOutput ? passwordOutput.value : '';
            
            // Multiple attempts to ensure password strength is triggered
            [100, 300, 500].forEach(delay => {
                setTimeout(() => {
                    if (typeof checkStrength === 'function' && password) {
                        console.log(`💪 Attempting password strength analysis (delay: ${delay}ms)...`);
                        checkStrength(password, phrase);
                    }
                }, delay);
            });
            
            // Force phrase suggestions to be visible and populated
            [50, 150, 250].forEach(delay => {
                setTimeout(() => {
                    console.log(`� Ensuring phrase suggestions visibility (delay: ${delay}ms)...`);
                    
                    // Check if suggestions content is collapsed
                    const suggestionsContent = document.getElementById('suggestionsContent');
                    if (suggestionsContent && suggestionsContent.classList.contains('collapsed')) {
                        console.log('📖 Expanding collapsed suggestions section...');
                        if (typeof toggleSuggestions === 'function') {
                            toggleSuggestions();
                        }
                    }
                    
                    // Re-populate suggestions to ensure they're visible
                    if (typeof populateSuggestions === 'function') {
                        populateSuggestions();
                    } else if (typeof initializePhraseSuggestions === 'function') {
                        initializePhraseSuggestions();
                    }
                }, delay);
            });
            
            console.log('✅ URL parameter processing initiated with multiple fallbacks');
        }
    }
}

// ==============================================
// VERSION DISPLAY
// ==============================================

/**
 * Display application version
 */
function displayVersion() {
    const versionElement = document.getElementById('footer-version');
    if (!versionElement) return;
    
    // Check if running locally (file:// protocol)
    if (window.location.protocol === 'file:') {
        versionElement.textContent = 'DEV';
        versionElement.style.color = '#28a745'; // Green color for dev
        return;
    }
    
    // For web deployment, try to fetch version file
    fetch('version.txt')
        .then(response => response.text())
        .then(version => {
            // Remove any extra whitespace and don't add extra "v" since version.txt already has it
            versionElement.textContent = version.trim();
        })
        .catch(error => {
            console.log('Version file not found, using fallback');
            versionElement.textContent = 'v1.0.0';
        });
}

// ==============================================
// INITIALIZATION
// ==============================================

/**
 * Initialize the application
 */
function initializeApp() {
    console.log('🔮 Cipher Alchemist - Initializing...');
      // Initialize theme
    initializeTheme();
    
    // Display version
    displayVersion();
    
    // Setup event listenersconst phraseInput = document.getElementById('phraseInput');
    if (phraseInput) {
        phraseInput.addEventListener('input', () => {
            generatePassword();
            updateClearButtonVisibility();
        });
        phraseInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                generatePassword();
            }
        });
    }
    
    // No generate button needed - we do real-time generation
    
    const copyBtn = document.getElementById('copyBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', copyPassword);
    }
      const clearBtn = document.getElementById('clearBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearTextarea);
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
      // Setup share button if sharing is available (will be handled by sharing.js)
    // Event listener will be attached by sharing.js when it loads
    
    // Setup example phrase listeners
    const exampleElements = document.querySelectorAll('.example-phrase');
    exampleElements.forEach(element => {
        element.addEventListener('click', tryExample);
        element.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                tryExample();
            }
        });
    });
    
    // Setup section toggles
    const descHeader = document.querySelector('.app-description-header');
    if (descHeader) {
        descHeader.addEventListener('click', toggleDescription);
        descHeader.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleDescription();
            }
        });
    }      // Initialize other features if available
    if (typeof initializePWAInstall === 'function') {
        initializePWAInstall();
    }
    
    if (typeof initializeKeyboardHelp === 'function') {
        initializeKeyboardHelp();
    }
    
    if (typeof initializePhraseSuggestions === 'function') {
        initializePhraseSuggestions();    }
    
    // Setup advanced feature buttons
    const advancedSearchBtn = document.getElementById('advancedSearchBtn');
    if (advancedSearchBtn) {
        advancedSearchBtn.addEventListener('click', () => {
            if (typeof openAdvancedSearch === 'function') {
                openAdvancedSearch();
            }
        });
    }
    
    const pluginManagerBtn = document.getElementById('pluginManagerBtn');
    if (pluginManagerBtn) {
        pluginManagerBtn.addEventListener('click', () => {
            if (typeof openPluginManager === 'function') {
                openPluginManager();
            }
        });
    }
    
    const fileOperationsBtn = document.getElementById('fileOperationsBtn');
    if (fileOperationsBtn) {
        fileOperationsBtn.addEventListener('click', () => {
            if (typeof openFileOperations === 'function') {
                openFileOperations();
            }
        });
    }
      // Initialize advanced features
    if (typeof initializePluginManager === 'function') {
        console.log('🧩 Initializing plugin manager...');
        initializePluginManager();
    }
    
    if (typeof initializeAdvancedSearch === 'function') {
        console.log('🔍 Initializing advanced search...');
        initializeAdvancedSearch();
    }
    
    if (typeof initializeFileOperations === 'function') {
        console.log('📁 Initializing file operations...');
        initializeFileOperations();
    }console.log('🔗 Checking sharing feature integration...');
    if (typeof initializeSharing === 'function') {
        const sharingResult = initializeSharing();
        console.log('✅ Sharing feature initialized:', sharingResult);
        
        // Ensure share button is visible if there's content
        const phraseInput = document.getElementById('phraseInput');
        if (phraseInput && phraseInput.value.trim()) {
            console.log('📝 Content detected, showing share button...');
            updateShareButtonVisibility(true);
        }
    } else {
        console.warn('⚠️ Sharing feature not available');
    }    // Initialize secret developer access
    document.addEventListener('keydown', handleDevSequence);
    
    // Add alternative secret access via title clicks
    const appTitle = document.querySelector('h1');
    if (appTitle) {
        appTitle.addEventListener('click', handleSecretClick);
        appTitle.style.cursor = 'default'; // Don't show pointer cursor
    }
      // Handle URL parameters AFTER all modules are initialized
    setTimeout(() => {
        console.log('🌐 Starting URL parameter processing...');
        handleURLParameters();
        console.log('🌐 URL parameters processed after module initialization');
    }, 200);      console.log('✅ Cipher Alchemist initialized successfully!');
    console.log('💡 Tip: Hold Ctrl+Shift and type "dev" to access developer mode');
    
    // Verify advanced features integration
    verifyAdvancedFeaturesIntegration();
}

/**
 * Verify that advanced features are properly integrated
 */
function verifyAdvancedFeaturesIntegration() {
    console.log('🔍 Verifying advanced features integration...');
    
    const features = [
        { name: 'Plugin Manager', check: () => typeof PluginManager !== 'undefined' && typeof openPluginManager === 'function' },
        { name: 'Advanced Search', check: () => typeof AdvancedSearch !== 'undefined' && typeof openAdvancedSearch === 'function' },
        { name: 'File Operations', check: () => typeof FileOperations !== 'undefined' && typeof openFileOperations === 'function' },
        { name: 'Dark Mode Plugin', check: () => typeof DarkModePlugin !== 'undefined' }
    ];
    
    features.forEach(feature => {
        try {
            if (feature.check()) {
                console.log(`✅ ${feature.name}: Ready`);
            } else {
                console.log(`⚠️ ${feature.name}: Not ready (will load async)`);
            }
        } catch (error) {
            console.log(`❌ ${feature.name}: Error - ${error.message}`);
        }
    });
}

// ==============================================
// SECRET DEVELOPER ACCESS
// ==============================================

let konami = [];
const konamiCode = ['Control', 'Shift', 'd', 'e', 'v']; // Secret sequence: Ctrl+Shift+d+e+v
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
            // Local development - open directly
            window.open('dev.html', '_blank');
        } else {
            // Production - create dev mode overlay
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
        
        // Open developer dashboard
        if (window.location.protocol === 'file:' || window.location.hostname === 'localhost') {
            window.open('dev.html', '_blank');
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
    overlay.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; 
                    background: rgba(0,0,0,0.9); z-index: 10000; display: flex; 
                    align-items: center; justify-content: center; color: white;">
            <div style="background: #1a1a1a; padding: 2rem; border-radius: 12px; 
                        max-width: 400px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">                <h2 style="margin: 0 0 1rem 0; color: #00ff00;">🧪 Developer Mode</h2>
                <p style="margin: 0 0 1.5rem 0; line-height: 1.5;">
                    Developer dashboard is available in local/development mode only.
                    <br><br>
                    <strong>Access:</strong> Ctrl+Shift+D+E+V<br>
                    <strong>Available Tests:</strong><br>
                    • Password Generation<br>
                    • URL Parameters<br>
                    • Sharing Feature<br>
                    • Theme System<br>
                    • PWA Features<br>
                    • Keyboard Shortcuts<br>
                </p>
                <button onclick="document.getElementById('devModeOverlay').remove()" 
                        style="background: #007bff; color: white; border: none; 
                               padding: 0.8rem 1.5rem; border-radius: 6px; 
                               cursor: pointer; font-size: 1rem;">
                    Close
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Auto-close after 10 seconds
    setTimeout(() => {
        if (overlay.parentNode) {
            overlay.remove();
        }
    }, 10000);
}

// ==============================================
// GLOBAL EXPORTS FOR HTML ACCESS
// ==============================================

// Export functions globally so they can be called from HTML onclick handlers
window.generatePassword = generatePassword;
window.copyPassword = copyPassword;
window.clearInput = clearTextarea;
window.tryExample = tryExample;
window.toggleDescription = toggleDescription;
window.toggleTheme = toggleTheme;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
