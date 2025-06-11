// Main Application Logic & Initialization

/**
 * Copy generated password to clipboard
 */
function copyPassword() {
    console.log('copyPassword called');
    const passwordElem = document.getElementById('passwordOutput');
    if (!passwordElem) {
        console.error('No element with id="passwordOutput" found');
        return;
    }
    const password = passwordElem.innerText;
    navigator.clipboard.writeText(password).then(() => {
        alert('Password copied to clipboard');
    });
}

/**
 * Placeholder function for PDF download functionality
 * TODO: Implement PDF generation feature
 */
function downloadPDF() {
    console.log('downloadPDF called - Feature not yet implemented');
    alert('PDF download feature coming soon!');
}

/**
 * Try the example phrase and generate password
 */
function tryExample() {
    const phraseInput = document.getElementById('phraseInput');
    const examplePhrase = 'AhamBrahmasmi@108';
    
    // Set the example phrase in the input
    phraseInput.value = examplePhrase;
    
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
        generatePassword();
        
        // Manually trigger strength check for the example (backup)
        let previewPassword = '';
        for (let char of examplePhrase) {
            const sub = substitutions[char] || char;
            previewPassword += sub;
        }
        checkStrength(previewPassword, examplePhrase);
        
        // Reset the animation after a short delay
        setTimeout(() => {
            phraseInput.style.transform = 'scale(1)';
            phraseInput.style.boxShadow = '';
        }, 300);
    }, 150);
}

/**
 * Toggle the app description section
 */
function toggleDescription() {
    const content = document.getElementById('descriptionContent');
    const icon = document.getElementById('descriptionIcon');
    const header = document.querySelector('.app-description-header');
    
    if (content.classList.contains('collapsed')) {
        // Expand
        content.classList.remove('collapsed');
        icon.classList.remove('collapsed');
        icon.textContent = '▼';
        header.setAttribute('aria-expanded', 'true');
    } else {
        // Collapse
        content.classList.add('collapsed');
        icon.classList.add('collapsed');
        icon.textContent = '▶';
        header.setAttribute('aria-expanded', 'false');
    }
}

/**
 * Toggle the transformation section
 */
function toggleTransformation() {
    const content = document.getElementById('transformationContent');
    const icon = document.getElementById('transformationIcon');
    const header = document.querySelector('.transformation-header');
    
    if (content && icon && header) {
        if (content.classList.contains('collapsed')) {
            // Expand
            content.classList.remove('collapsed');
            icon.classList.remove('collapsed');
            icon.textContent = '▼';
            header.setAttribute('aria-expanded', 'true');
        } else {
            // Collapse
            content.classList.add('collapsed');
            icon.classList.add('collapsed');
            icon.textContent = '▶';
            header.setAttribute('aria-expanded', 'false');
        }
    }
}

/**
 * Clear textarea and hide clear button
 */
function clearTextarea() {
    const phraseInput = document.getElementById('phraseInput');
    const passwordOutput = document.getElementById('passwordOutput');
    
    if (phraseInput) {
        phraseInput.value = '';
        phraseInput.focus();
        
        // Trigger input event to update strength meter and hide clear button
        const inputEvent = new Event('input', { bubbles: true });
        phraseInput.dispatchEvent(inputEvent);
    }
    
    // Clear password output as well
    if (passwordOutput) {
        passwordOutput.innerHTML = '';
    }
}

/**
 * Toggle visibility of clear button
 * @param {boolean} show - Whether to show the clear button
 */
function toggleClearButton(show) {
    const clearBtn = document.getElementById('clearBtn');
    if (clearBtn) {
        clearBtn.style.display = show ? 'flex' : 'none';
    }
}

/**
 * Theme management functionality
 */
function initializeTheme() {
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    
    function setTheme(theme) {
        document.body.classList.remove('dark-theme', 'light-theme');
        document.body.classList.add(theme);
        themeToggleBtn.textContent = theme === 'dark-theme' ? '☀️' : '🌙';
        localStorage.setItem('theme', theme);
    }
    
    if (themeToggleBtn) {
        // Load theme preference
        const savedTheme = localStorage.getItem('theme') || 'light-theme';
        setTheme(savedTheme);
        
        themeToggleBtn.addEventListener('click', function() {
            const isDark = document.body.classList.contains('dark-theme');
            setTheme(isDark ? 'light-theme' : 'dark-theme');
        });
    }
}

/**
 * Initialize version display
 */
function initializeVersion() {
    // Version display from meta tag (for static and automated injection)
    const versionMeta = document.querySelector('meta[name="app-version"]');
    let versionString = versionMeta ? versionMeta.content : '';
    
    if (versionString && !versionString.includes('__APP_VERSION__')) {
        // Split for mobile: everything before '· 🚀' on one line, rest below
        const splitIdx = versionString.indexOf('· 🚀');
        if (splitIdx !== -1) {
            document.getElementById('footer-version').textContent = versionString.slice(0, splitIdx).trim();
        } else {
            document.getElementById('footer-version').textContent = versionString;
        }
        window.APP_VERSION = versionString;
    } else {
        // fallback to version.txt (for local/dev)
        fetch('version.txt')
          .then(res => res.text())
          .then(version => {
            const splitIdx = version.indexOf('· 🚀');
            if (splitIdx !== -1) {
                document.getElementById('footer-version').textContent = version.slice(0, splitIdx).trim();
            } else {
                document.getElementById('footer-version').textContent = version.trim();
            }
            window.APP_VERSION = version.trim();
          })
          .catch(() => {
            document.getElementById('footer-version').textContent = '🔖 vDEV · Local Build';
            window.APP_VERSION = 'vDEV · Local Build';
          });
    }
}

/**
 * PWA Install functionality
 */
let deferredPrompt;
let installBtn;

function initializePWAInstall() {
    installBtn = document.getElementById('installBtn');
    
    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
        console.log('PWA: beforeinstallprompt event fired');
        
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        
        // Stash the event so it can be triggered later
        deferredPrompt = e;
        
        // Show the install button
        if (installBtn) {
            installBtn.style.display = 'inline-block';
            installBtn.setAttribute('title', 'Install Cipher Alchemist as an app');
        }
    });
    
    // Handle install button click
    if (installBtn) {
        installBtn.addEventListener('click', async () => {
            console.log('PWA: Install button clicked');
            
            if (!deferredPrompt) {
                // Already installed or not installable
                showInstallMessage();
                return;
            }
            
            // Hide the install button
            installBtn.style.display = 'none';
            
            // Show the install prompt
            deferredPrompt.prompt();
            
            // Wait for the user to respond to the prompt
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`PWA: User choice: ${outcome}`);
            
            if (outcome === 'accepted') {
                console.log('PWA: User accepted the install prompt');
            } else {
                console.log('PWA: User dismissed the install prompt');
                // Show the button again if user dismissed
                installBtn.style.display = 'inline-block';
            }
            
            // Clear the deferredPrompt variable
            deferredPrompt = null;
        });
    }
    
    // Listen for app installed event
    window.addEventListener('appinstalled', (e) => {
        console.log('PWA: App was installed successfully');
        
        // Hide the install button since app is now installed
        if (installBtn) {
            installBtn.style.display = 'none';
        }
        
        // Optional: Show a success message
        showInstallSuccessMessage();
        
        // Clear the deferredPrompt
        deferredPrompt = null;
    });
    
    // Check if app is already installed
    window.addEventListener('load', () => {
        // For iOS Safari
        if (window.navigator.standalone === true) {
            console.log('PWA: App is running in standalone mode (iOS)');
            if (installBtn) {
                installBtn.style.display = 'none';
            }
        }
        
        // For other browsers, check display mode
        if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
            console.log('PWA: App is running in standalone mode');
            if (installBtn) {
                installBtn.style.display = 'none';
            }
        }
    });
}

function showInstallMessage() {
    // Check if already installed
    if (window.navigator.standalone === true || 
        (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches)) {
        alert('✅ Cipher Alchemist is already installed as an app!');
        return;
    }
    
    // Provide manual installation instructions
    const userAgent = navigator.userAgent.toLowerCase();
    let instructions = '';
    
    if (userAgent.includes('chrome') && !userAgent.includes('edg')) {
        instructions = '📱 To install:\n1. Click the three dots menu (⋮)\n2. Select "Install Cipher Alchemist"\n3. Confirm the installation';
    } else if (userAgent.includes('firefox')) {
        instructions = '📱 To install:\n1. Click the address bar\n2. Look for the install icon\n3. Click "Install" or add to home screen';
    } else if (userAgent.includes('safari')) {
        instructions = '📱 To install on iOS:\n1. Tap the Share button (⬆️)\n2. Scroll and tap "Add to Home Screen"\n3. Tap "Add"';
    } else if (userAgent.includes('edg')) {
        instructions = '📱 To install:\n1. Click the three dots menu (⋯)\n2. Select "Apps" > "Install this site as an app"\n3. Click "Install"';
    } else {
        instructions = '📱 Look for an "Install" or "Add to Home Screen" option in your browser menu to install Cipher Alchemist as an app.';
    }
    
    alert(instructions);
}

function showInstallSuccessMessage() {
    // Optional: Show a toast or notification
    console.log('PWA: Installation successful!');
    
    // You could implement a toast notification here
    // For now, we'll just log it
}

/**
 * Register service worker for PWA functionality
 */
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('config/sw.js')
            .then((registration) => {
                console.log('Service Worker registered successfully:', registration);
                
                // Check for updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // New content available, show update notification
                            if (confirm('New version available! Click OK to update.')) {
                                window.location.reload();
                            }
                        }
                    });
                });
            })
            .catch((error) => {
                console.log('Service Worker registration failed:', error);
            });
    }
}

/**
 * Initialize all event listeners and functionality
 */
function initializeApp() {
    console.log('Cipher Alchemist app initializing...');

    // Initialize core password generation
    const genBtn = document.getElementById('generateBtn');
    if (genBtn) {
        genBtn.addEventListener('click', function() {
            console.log('Generate Password button clicked');
            generatePassword();
        });
    } else {
        console.error('No button with id="generateBtn" found');
    }
    
    // Add real-time password strength checking
    const phraseInput = document.getElementById('phraseInput');
    if (phraseInput) {
        let typingTimer;
        const typingDelay = 300; // milliseconds
          phraseInput.addEventListener('input', function() {
            clearTimeout(typingTimer);
            const phrase = this.value.trim();
            
            // Show/hide clear button based on content
            toggleClearButton(this.value.length > 0);
            
            if (phrase.length === 0) {
                checkStrength('');
                return;
            }
            
            // Debounce the strength checking
            typingTimer = setTimeout(() => {
                // Generate password preview for strength checking
                let previewPassword = '';
                for (let char of phrase) {
                    const sub = substitutions[char] || char;
                    previewPassword += sub;
                }
                checkStrength(previewPassword, phrase);
            }, typingDelay);
        });
        
        // Clear strength meter on focus if empty
        phraseInput.addEventListener('focus', function() {
            if (this.value.trim().length === 0) {
                checkStrength('', '');
            }
        });
    }

    // Initialize clear button
    const clearBtn = document.getElementById('clearBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            clearTextarea();
        });
    }

    // Initialize copy button
    const copyBtn = document.getElementById('copyBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            console.log('Copy Password button clicked');
            copyPassword();
        });
    } else {
        console.error('No button with id="copyBtn" found');
    }

    // Initialize download button
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            console.log('Download PDF button clicked');
            downloadPDF();
        });
    } else {
        console.error('No button with id="downloadBtn" found');
    }    // Initialize theme functionality
    initializeTheme();
    
    // Initialize PWA install functionality
    initializePWAInstall();

    // Initialize version display
    initializeVersion();
    
    // Initialize phrase suggestions
    populateSuggestions();
    
    // Add keyboard navigation for suggestions header
    const suggestionsHeader = document.querySelector('.phrase-suggestions-header');
    if (suggestionsHeader) {
        suggestionsHeader.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleSuggestions();
            }
        });
    }

    // Setup keyboard navigation for description header
    const descriptionHeader = document.querySelector('.app-description-header');
    if (descriptionHeader) {
        descriptionHeader.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleDescription();
            }
        });
    }

    // Setup dynamic keyboard navigation for transformation header
    document.addEventListener('keydown', function(e) {
        if (e.target.classList.contains('transformation-header')) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTransformation();
            }
        }
    });

    // Add keyboard navigation for example phrase element
    const examplePhrase = document.querySelector('.example-phrase');
    if (examplePhrase) {
        examplePhrase.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                tryExample();
            }
        });
    }

    // Add global keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl+Enter to generate password
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            const generateBtn = document.getElementById('generateBtn');
            if (generateBtn) {
                generateBtn.click();
            }
        }
        
        // Ctrl+C to copy password when password output is focused
        if (e.ctrlKey && e.key === 'c' && e.target.id === 'passwordOutput') {
            e.preventDefault();
            copyPassword();
        }
        
        // Alt+1 to toggle description section
        if (e.altKey && e.key === '1') {
            e.preventDefault();
            toggleDescription();
        }
          // Alt+2 to toggle suggestions section
        if (e.altKey && e.key === '2') {
            e.preventDefault();
            toggleSuggestions();
        }
        
        // Ctrl+Backspace to clear textarea
        if (e.ctrlKey && e.key === 'Backspace') {
            e.preventDefault();
            clearTextarea();
        }
        
        // Escape key to close any expanded sections or modal
        if (e.key === 'Escape') {
            // First check if modal is open and close it
            if (typeof isModalOpen !== 'undefined' && isModalOpen) {
                hideKeyboardHelp();
                return;
            }
            
            // Then close any expanded sections
            const sections = [
                { content: document.getElementById('descriptionContent'), toggle: toggleDescription },
                { content: document.getElementById('suggestionsContent'), toggle: toggleSuggestions }
            ];
            
            sections.forEach(section => {
                if (section.content && !section.content.classList.contains('collapsed')) {
                    section.toggle();
                }
            });
        }    });    // Initialize keyboard shortcuts help modal
    if (typeof initializeKeyboardHelp === 'function') {
        initializeKeyboardHelp();
        addKeyboardHelpShortcut();
    }

    // Initialize clear button visibility on page load
    const phraseInputElement = document.getElementById('phraseInput');
    if (phraseInputElement) {
        toggleClearButton(phraseInputElement.value.length > 0);
    }

    console.log('Cipher Alchemist app initialized successfully!');
    
    // Register service worker after app initialization
    registerServiceWorker();
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);
