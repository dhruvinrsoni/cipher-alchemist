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
    const passwordElem = document.getElementById('passwordOutput');    if (!passwordElem) {
        console.error('No element with id="passwordOutput" found');
        return;
    }
    
    passwordElem.innerHTML = `<span style="font-weight:bold;font-size:1.3em;word-break:break-all;">${password}</span>`;
    
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

function calculatePasswordScore(password, originalPhrase = '') {
    let score = 0;
    let criteria = {
        length: false,
        uppercase: false,
        lowercase: false,
        numbers: false,
        symbols: false,
        special: false
    };
    
    // Length scoring (0-40 points)
    if (password.length >= 8) {
        score += 10;
        criteria.length = true;
    }
    if (password.length >= 12) score += 10;
    if (password.length >= 16) score += 10;
    if (password.length >= 20) score += 10;
    
    // If we have the original phrase, analyze it for better criteria detection
    if (originalPhrase) {
        // Check original phrase for character types
        if (/[a-z]/.test(originalPhrase)) {
            criteria.lowercase = true;
            score += 10;
        }
        if (/[A-Z]/.test(originalPhrase)) {
            criteria.uppercase = true;
            score += 10;
        }
        if (/[0-9]/.test(originalPhrase)) {
            criteria.numbers = true;
            score += 10;
        }
        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]/.test(originalPhrase)) {
            criteria.symbols = true;
            score += 10;
        }
        
        // Check if cipher transformation created advanced symbols
        if (/\/\\\/\\|\|\\|\||<|\|>|cl|ph|><|\(\)|0_|\(_\)/.test(password)) {
            criteria.special = true;
            score += 10;
        }
    } else {
        // Fallback: analyze the transformed password directly
        // This includes both original and cipher-transformed characters
        
        // Lowercase letters (original + cipher equivalents that stay lowercase)
        if (/[a-z]/.test(password) || /[eqryv]/.test(password)) {
            score += 10;
            criteria.lowercase = true;
        }
        
        // Uppercase letters (original + cipher equivalents)  
        if (/[A-Z]/.test(password) || /PH|G|R|Y/.test(password)) {
            score += 10;
            criteria.uppercase = true;
        }
        
        // Numbers (both original and transformed)
        if (/[0-9]/.test(password)) {
            score += 10;
            criteria.numbers = true;
        }
        
        // Standard symbols
        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]/.test(password)) {
            score += 10;
            criteria.symbols = true;
        }
        
        // Advanced cipher symbols
        if (/\/\\\/\\|\|\\|\||<|\|>|cl|ph|><|\(\)|0_|\(_\)|\/\\/.test(password)) {
            score += 10;
            criteria.special = true;
        }
    }
    
    // Bonus points (0-10 points)
    if (password.length > 24) score += 5;
    if (Object.values(criteria).filter(Boolean).length >= 4) score += 5;
    
    return { score: Math.min(score, 100), criteria };
}

function checkStrength(password, originalPhrase = '') {
    console.log('checkStrength called with password:', password);
    const strengthContainer = document.getElementById('strengthMeter');
    if (!strengthContainer) {
        console.error('No element with id="strengthMeter" found');
        return;
    }
    
    if (!password) {
        strengthContainer.innerHTML = '';
        return;
    }
    
    const { score, criteria } = calculatePasswordScore(password, originalPhrase);
    const percentage = score;
    
    let level = 'weak';
    let color = '#ff4757';
    let emoji = '⚠️';
    let text = 'Weak';
    let description = 'Password needs improvement';
    
    if (percentage >= 80) {
        level = 'excellent';
        color = '#2ed573';
        emoji = '🚀';
        text = 'Excellent';
        description = 'Exceptionally strong password';
    } else if (percentage >= 60) {
        level = 'strong';
        color = '#5fba7d';
        emoji = '💪';
        text = 'Strong';
        description = 'Very secure password';
    } else if (percentage >= 40) {
        level = 'medium';
        color = '#ffa502';
        emoji = '👌';
        text = 'Medium';
        description = 'Moderately secure password';
    } else if (percentage >= 20) {
        level = 'fair';
        color = '#ff7675';
        emoji = '⚡';
        text = 'Fair';
        description = 'Could be stronger';
    }
    
    // Create modern strength meter with circular progress
    strengthContainer.innerHTML = `
        <div class="strength-meter-modern">
            <div class="strength-circle-container">
                <svg class="strength-circle" viewBox="0 0 120 120">
                    <circle class="strength-circle-bg" cx="60" cy="60" r="54" />
                    <circle class="strength-circle-progress" cx="60" cy="60" r="54" 
                            style="--progress: ${percentage}; --color: ${color};" />
                </svg>
                <div class="strength-score">
                    <span class="strength-emoji">${emoji}</span>
                    <span class="strength-percentage">${percentage}%</span>
                </div>
            </div>
            <div class="strength-info">
                <div class="strength-label" style="color: ${color};">
                    <strong>${text}</strong>
                </div>
                <div class="strength-description">${description}</div>                <div class="strength-criteria">
                    <div class="criteria-item ${criteria.length ? 'met' : ''}" data-tooltip="Passwords with 8+ characters are harder to crack. Longer passwords provide exponentially better security.">
                        <span class="criteria-icon">${criteria.length ? '✓' : '○'}</span>
                        <span>8+ characters</span>
                        <span class="tooltip-trigger">ℹ️</span>
                    </div>
                    <div class="criteria-item ${criteria.uppercase ? 'met' : ''}" data-tooltip="Including uppercase letters (A-Z) increases the character space and password complexity.">
                        <span class="criteria-icon">${criteria.uppercase ? '✓' : '○'}</span>
                        <span>Uppercase letters</span>
                        <span class="tooltip-trigger">ℹ️</span>
                    </div>
                    <div class="criteria-item ${criteria.lowercase ? 'met' : ''}" data-tooltip="Including lowercase letters (a-z) is essential for password diversity and security.">
                        <span class="criteria-icon">${criteria.lowercase ? '✓' : '○'}</span>
                        <span>Lowercase letters</span>
                        <span class="tooltip-trigger">ℹ️</span>
                    </div>
                    <div class="criteria-item ${criteria.numbers ? 'met' : ''}" data-tooltip="Numbers (0-9) add complexity and are commonly required by security policies.">
                        <span class="criteria-icon">${criteria.numbers ? '✓' : '○'}</span>
                        <span>Numbers</span>
                        <span class="tooltip-trigger">ℹ️</span>
                    </div>
                    <div class="criteria-item ${criteria.symbols ? 'met' : ''}" data-tooltip="Special symbols (!@#$%^&*) dramatically increase password strength by expanding the character set.">
                        <span class="criteria-icon">${criteria.symbols ? '✓' : '○'}</span>
                        <span>Special symbols</span>
                        <span class="tooltip-trigger">ℹ️</span>
                    </div>
                    <div class="criteria-item ${criteria.special ? 'met' : ''}" data-tooltip="Advanced multi-character cipher symbols like /\\/\\ (M), |\\| (N), |< (K) that dramatically increase password complexity beyond standard characters">
                        <span class="criteria-icon">${criteria.special ? '✓' : '○'}</span>
                        <span>Cipher complexity</span>
                        <span class="tooltip-trigger">ℹ️</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Animate the progress circle
    setTimeout(() => {
        const progressCircle = strengthContainer.querySelector('.strength-circle-progress');
        if (progressCircle) {
            progressCircle.style.animation = 'strengthProgress 1.5s ease-out forwards';
        }
    }, 100);
}

// Phrase Suggestions Feature - 12 Balanced Groups of 4 Suggestions Each
const phraseSuggestions = {
    // Group 1: Power & Motivation
    powerMotivation: [
        { emoji: '💪', text: 'BeStrong@2025' },
        { emoji: '🚀', text: 'DreamBig!Launch' },
        { emoji: '🔥', text: 'IgniteYourPath' },
        { emoji: '⚡', text: 'LightningSuccess' }
    ],
    
    // Group 2: Achievement & Victory
    achievementVictory: [
        { emoji: '🏆', text: 'ChampionMindset' },
        { emoji: '👑', text: 'OwnYourCrown' },
        { emoji: '🥇', text: 'FirstPlace!Always' },
        { emoji: '🎖️', text: 'EarnYourMedal' }
    ],
    
    // Group 3: Learning & Growth
    learningGrowth: [
        { emoji: '🧠', text: 'LearnGrowWin' },
        { emoji: '📚', text: 'KnowledgeIsPower' },
        { emoji: '🎓', text: 'NeverStopLearning' },
        { emoji: '🌱', text: 'GrowthMindset' }
    ],
    
    // Group 4: Technology & Innovation
    techInnovation: [
        { emoji: '💻', text: 'CodeYourDreams' },
        { emoji: '🤖', text: 'FutureIsNow@AI' },
        { emoji: '🌐', text: 'ConnectTheWorld' },
        { emoji: '⚙️', text: 'BuildInnovate' }
    ],
    
    // Group 5: Health & Vitality
    healthVitality: [
        { emoji: '🧘', text: 'MindBodySoul' },
        { emoji: '💚', text: 'HealthyChoices' },
        { emoji: '🏃', text: 'RunYourRace' },
        { emoji: '☀️', text: 'SunshineVibes' }
    ],
    
    // Group 6: Spiritual & Wisdom
    spiritualWisdom: [
        { emoji: '🕉️', text: 'AhamBrahmasmi@108' },
        { emoji: '☯️', text: 'BalanceWithin' },
        { emoji: '🔮', text: 'TrustTheUniverse' },
        { emoji: '🙏', text: 'Gratitude@Heart' }
    ],
      // Group 7: Creative & Artistic
    creativeArtistic: [
        { emoji: '🎨', text: 'CreateMasterpiece' },
        { emoji: '🌈', text: 'CreateYourPath' },
        { emoji: '✨', text: 'CosmicEnergy' },
        { emoji: '🦋', text: 'Transform2025' }
    ],
    
    // Group 8: Focus & Excellence
    focusExcellence: [
        { emoji: '🎯', text: 'Focus&Achieve' },
        { emoji: '💯', text: 'Perfect@Every' },
        { emoji: '🌟', text: 'ExcellenceDaily' },
        { emoji: '💎', text: 'DiamondMindset' }
    ],
    
    // Group 9: Nature & Renewal
    natureRenewal: [
        { emoji: '🌿', text: 'NaturalHealing' },
        { emoji: '🍃', text: 'FreshStart2025' },
        { emoji: '💧', text: 'FlowLikeWater' },
        { emoji: '🌸', text: 'BloomWhere@You' }
    ],
      // Group 10: Problem Solving & Innovation
    problemSolving: [
        { emoji: '🔧', text: 'FixItBetter' },
        { emoji: '🛠️', text: 'CreateSolutions' },
        { emoji: '🔑', text: 'UnlockPotential' },
        { emoji: '💡', text: 'BrightIdeas@Work' }
    ],
    
    // Group 11: Digital & Future
    digitalFuture: [
        { emoji: '📱', text: 'DigitalNomad2025' },
        { emoji: '🎮', text: 'GameChanger!Pro' },
        { emoji: '🌙', text: 'MoonlightWisdom' },
        { emoji: '🌅', text: 'NewDawnRising' }
    ],
    
    // Group 12: Celebration & Joy
    celebrationJoy: [
        { emoji: '🎊', text: 'CelebrateWins' },
        { emoji: '⭐', text: 'ShineEveryDay' },
        { emoji: '💫', text: 'SoulPurpose' },
        { emoji: '🌟', text: 'StartsToday!Now' }
    ]
};

let currentSuggestionSet = [];
let currentCategoryIndex = 0;

// Function to get random suggestions from different categories
function getRandomSuggestions(count = 4) {
    const categories = Object.keys(phraseSuggestions);
    
    // Randomly select one category to ensure variety
    const randomCategoryIndex = Math.floor(Math.random() * categories.length);
    const selectedCategory = categories[randomCategoryIndex];
    
    // Return all 4 suggestions from the selected category
    return phraseSuggestions[selectedCategory].map(suggestion => ({
        ...suggestion,
        category: selectedCategory
    }));
}

function getTotalSuggestionsCount() {
    return Object.values(phraseSuggestions).reduce((total, category) => total + category.length, 0);
}

// Function to populate suggestions in the UI
function populateSuggestions() {
    const suggestionsGrid = document.getElementById('suggestionsGrid');
    if (!suggestionsGrid) {
        console.error('No element with id="suggestionsGrid" found');
        return;
    }
    
    currentSuggestionSet = getRandomSuggestions(4);
    
    suggestionsGrid.innerHTML = currentSuggestionSet
        .map(suggestion => `
            <div class="suggestion-chip" 
                 onclick="insertSuggestion('${suggestion.text}')" 
                 data-phrase="${suggestion.text}"
                 tabindex="0"
                 role="button"
                 aria-label="Insert phrase: ${suggestion.text}">
                <span class="chip-emoji">${suggestion.emoji}</span>
                <span class="chip-text">${suggestion.text}</span>
            </div>
        `).join('');
    
    // Add keyboard navigation for suggestion chips
    const chips = suggestionsGrid.querySelectorAll('.suggestion-chip');
    chips.forEach(chip => {
        chip.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const phrase = this.getAttribute('data-phrase');
                insertSuggestion(phrase);
            }
        });
    });
}

// Function to insert a suggestion into the input field
function insertSuggestion(phrase) {
    const phraseInput = document.getElementById('phraseInput');
    if (!phraseInput) {
        console.error('No input with id="phraseInput" found');
        return;
    }
    
    // Find the clicked chip and add insertion animation
    const chips = document.querySelectorAll('.suggestion-chip');
    chips.forEach(chip => {
        if (chip.getAttribute('data-phrase') === phrase) {
            chip.classList.add('inserting');
            setTimeout(() => chip.classList.remove('inserting'), 400);
        }
    });
    
    // Insert the phrase
    phraseInput.value = phrase;
    phraseInput.focus();
    
    // Add visual feedback animation
    phraseInput.style.transition = 'all 0.3s ease';
    phraseInput.style.transform = 'scale(1.02)';
    phraseInput.style.boxShadow = '0 4px 16px rgba(40, 167, 69, 0.3)';
    
    // Trigger input event for real-time strength checking
    const inputEvent = new Event('input', { bubbles: true });
    phraseInput.dispatchEvent(inputEvent);
    
    // Reset animation
    setTimeout(() => {
        phraseInput.style.transform = 'scale(1)';
        phraseInput.style.boxShadow = '';
    }, 300);
    
    // Scroll to the input field for better UX
    phraseInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Function to refresh suggestions with new random phrases
function refreshSuggestions() {
    const suggestionsGrid = document.getElementById('suggestionsGrid');
    const refreshBtn = document.querySelector('.refresh-suggestions-btn');
    
    if (!suggestionsGrid || !refreshBtn) return;
    
    // Add loading animation
    refreshBtn.style.transform = 'rotate(360deg)';
    refreshBtn.style.transition = 'transform 0.5s ease';
    
    // Fade out current suggestions
    suggestionsGrid.style.opacity = '0.5';
    suggestionsGrid.style.transform = 'scale(0.98)';
    suggestionsGrid.style.transition = 'all 0.3s ease';
    
    setTimeout(() => {
        // Populate new suggestions
        populateSuggestions();
        
        // Fade in new suggestions
        suggestionsGrid.style.opacity = '1';
        suggestionsGrid.style.transform = 'scale(1)';
        
        // Reset refresh button
        setTimeout(() => {
            refreshBtn.style.transform = 'rotate(0deg)';
        }, 100);
    }, 300);
}

// Function to toggle suggestions section
function toggleSuggestions() {
    const content = document.getElementById('suggestionsContent');
    const icon = document.getElementById('suggestionsIcon');
    const header = document.querySelector('.phrase-suggestions-header');
    
    if (!content || !icon || !header) return;
    
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

// Initialize phrase suggestions on page load
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
