const substitutions = {
    'a': '@', 'b': '6', 'c': '(', 'd': 'cl', 'e': 'e', 'f': 'ph', 'g': '9', 'h': '#', 'i': '!', 'j': ']', 'k': '|<', 'l': '1', 'm': '/\\/\\', 'n': '|\\|', 'o': '0', 'p': '|>', 'q': 'q', 'r': 'r', 's': '5', 't': '+', 'u': 'v', 'v': '\\/', 'w': '\\/\\/', 'x': '><', 'y': 'y', 'z': '2',
    'A': '4', 'B': '8', 'C': '(', 'D': '|)', 'E': '3', 'F': 'PH', 'G': 'G', 'H': '#', 'I': '1', 'J': ')', 'K': '|<', 'L': '1', 'M': '/\\/\\', 'N': '|\\|', 'O': '0', 'P': '|>', 'Q': '0_', 'R': 'R', 'S': '5', 'T': '7', 'U': '(_)', 'V': '\\/', 'W': '\\/\\/', 'X': '><', 'Y': 'Y', 'Z': '2',
    '0': 'o', '1': 'i', '2': '2', '3': 'E', '4': 'A', '5': 's', '6': 'b', '7': 't', '8': 'B', '9': 'g'
};

function generatePassword() {
    console.log('generatePassword called');
    const phraseInput = document.getElementById('phraseInput');
    if (!phraseInput) {
        console.error('No input with id="phraseInput" found');
        return;
    }
    const phrase = phraseInput.value;
    let password = '';
    let explanation = '';
    let step = 1;
    for (let char of phrase) {
        const sub = substitutions[char] || char;
        password += sub;
        if (sub !== char) {
            explanation += `<li><b>${char}</b> → <b>${sub}</b></li>`;
        } else {
            explanation += `<li><b>${char}</b> (no change)</li>`;
        }
        step++;
    }
    const passwordElem = document.getElementById('passwordOutput');
    if (!passwordElem) {
        console.error('No element with id="passwordOutput" found');
        return;
    }
    passwordElem.innerHTML = `<span style="font-weight:bold;font-size:1.3em;word-break:break-all;">${password}</span>`;
    checkStrength(password);
    // Show transformation explanation
    let explanationElem = document.getElementById('transformationExplanation');
    if (!explanationElem) {
        explanationElem = document.createElement('div');
        explanationElem.id = 'transformationExplanation';
        passwordElem.insertAdjacentElement('afterend', explanationElem);
    }
    
    // Create collapsible transformation explanation
    explanationElem.innerHTML = `
        <div class="transformation-container">
            <div class="transformation-header" onclick="toggleTransformation()" aria-expanded="true" role="button" tabindex="0">
                <span class="transformation-title">Transformation Steps</span>
                <span class="transformation-icon" id="transformationIcon">▼</span>
            </div>
            <div class="transformation-content" id="transformationContent">
                <ol>
                    ${explanation}
                </ol>
            </div>
        </div>
    `;
    
    // Auto-expand the transformation section with animation
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
    // Smooth scroll to password output if on mobile/small screens
    if (window.innerWidth < 600) {
        passwordElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

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

function checkStrength(password) {
    console.log('checkStrength called with password:', password);
    const strength = document.getElementById('strengthMeter');
    if (!strength) {
        console.error('No element with id="strengthMeter" found');
        return;
    }
    let text = '', color = '', emoji = '';
    if (password.length >= 14) {
        text = 'Strong'; color = 'green'; emoji = '💪';
    } else if (password.length >= 8) {
        text = 'Medium'; color = 'orange'; emoji = '👌';
    } else {
        text = 'Weak'; color = 'red'; emoji = '⚠️';
    }
    strength.innerHTML = `<span style="font-weight:bold;color:${color};font-size:1.1em;">${emoji} Password Strength: ${text}</span>`;
}

function downloadPDF() {
    console.log('downloadPDF called');
    window.open('cheat_sheet.pdf', '_blank');
}

document.addEventListener('DOMContentLoaded', function() {
    const genBtn = document.getElementById('generateBtn');
    if (genBtn) {
        genBtn.addEventListener('click', function() {
            console.log('Generate Password button clicked');
            generatePassword();
        });
    } else {
        console.error('No button with id="generateBtn" found');
    }
    const copyBtn = document.getElementById('copyBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            console.log('Copy Password button clicked');
            copyPassword();
        });
    } else {
        console.error('No button with id="copyBtn" found');
    }
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            console.log('Download PDF button clicked');
            downloadPDF();
        });
    } else {
        console.error('No button with id="downloadBtn" found');
    }

    // Theme toggle functionality
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
});

// Function to try the example phrase
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
    
    // Generate the password immediately
    setTimeout(() => {
        generatePassword();
        
        // Reset the animation after a short delay
        setTimeout(() => {
            phraseInput.style.transform = 'scale(1)';
            phraseInput.style.boxShadow = '';
        }, 300);
    }, 150);
}

// Function to toggle the description section
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

// Handle keyboard navigation for the description header
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.app-description-header');
    if (header) {
        header.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleDescription();
            }
        });
    }
});

// Function to toggle the transformation section
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

// Handle keyboard navigation for the transformation header
document.addEventListener('DOMContentLoaded', function() {
    // This will be set up dynamically when transformation section is created
    document.addEventListener('keydown', function(e) {
        if (e.target.classList.contains('transformation-header')) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTransformation();
            }
        }
    });
});
