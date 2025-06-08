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
    }

    // Initialize theme functionality
    initializeTheme();

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

    console.log('Cipher Alchemist app initialized successfully!');
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);
