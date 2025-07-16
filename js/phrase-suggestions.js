// ...existing code...

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

/**
 * Get random suggestions from a single thematic category
 * @param {number} count - Number of suggestions to return (default 4)
 * @returns {Array} Array of suggestion objects with emoji, text, and category
 */
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

/**
 * Get total count of all available suggestions
 * @returns {number} Total number of suggestions across all categories
 */
function getTotalSuggestionsCount() {
    return Object.values(phraseSuggestions).reduce((total, category) => total + category.length, 0);
}

/**
 * Populate suggestions in the UI grid
 */
function populateSuggestions() {
    console.log('🎯 Populating phrase suggestions...');
    
    const suggestionsGrid = document.getElementById('suggestionsGrid');
    if (!suggestionsGrid) {
        console.error('❌ No element with id="suggestionsGrid" found');
        return;
    }
    
    // Ensure the suggestions section is visible
    const suggestionsContent = document.getElementById('suggestionsContent');
    if (suggestionsContent && suggestionsContent.classList.contains('collapsed')) {
        console.log('📖 Expanding collapsed suggestions section...');
        suggestionsContent.classList.remove('collapsed');
        
        // Update icon and aria-expanded
        const suggestionsIcon = document.getElementById('suggestionsIcon');
        const suggestionsHeader = document.querySelector('.phrase-suggestions-header');
        if (suggestionsIcon) suggestionsIcon.textContent = '▼';
        if (suggestionsHeader) suggestionsHeader.setAttribute('aria-expanded', 'true');
    }
    
    currentSuggestionSet = getRandomSuggestions(4);
    console.log('📝 Generated suggestion set:', currentSuggestionSet);
    
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
    
    console.log('✅ Suggestions populated in grid:', suggestionsGrid.children.length, 'chips');
        // Add keyboard navigation for suggestion chips
    const chips = suggestionsGrid.querySelectorAll('.suggestion-chip');
    chips.forEach((chip, index) => {
        chip.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const phrase = this.getAttribute('data-phrase');
                insertSuggestion(phrase);
            }
            // Arrow key navigation
            else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevIndex = index > 0 ? index - 1 : chips.length - 1;
                chips[prevIndex].focus();
            }
            else if (e.key === 'ArrowRight') {
                e.preventDefault();
                const nextIndex = index < chips.length - 1 ? index + 1 : 0;
                chips[nextIndex].focus();
            }
            // Home key - jump to first chip
            else if (e.key === 'Home') {
                e.preventDefault();
                chips[0].focus();
            }
            // End key - jump to last chip
            else if (e.key === 'End') {
                e.preventDefault();
                chips[chips.length - 1].focus();
            }
        });
    });
}

/**
 * Insert a suggestion into the phrase input field
 * @param {string} phrase - The phrase to insert
 */
function insertSuggestion(phrase) {
    if (window.uiControls && window.uiControls.applyPhraseWithEffect) {
        window.uiControls.applyPhraseWithEffect(phrase);
    } else {
        // Fallback if UI controls not available
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
        
        // Generate password
        if (typeof generatePassword === 'function') {
            generatePassword();
        }
    }
}

/**
 * Refresh suggestions with new random phrases from a different category
 */
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

/**
 * Toggle the visibility of the suggestions section
 */
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

/**
 * Initialize phrase suggestions
 */
function initializePhraseSuggestions() {
    console.log('🔮 Initializing phrase suggestions...');
    
    // Ensure suggestions section is expanded
    const suggestionsContent = document.getElementById('suggestionsContent');
    if (suggestionsContent && suggestionsContent.classList.contains('collapsed')) {
        console.log('📖 Expanding collapsed suggestions section...');
        const suggestionsHeader = document.querySelector('.phrase-suggestions-header');
        if (suggestionsHeader && typeof toggleSuggestions === 'function') {
            toggleSuggestions();
        }
    }
    
    // Populate initial suggestions
    populateSuggestions();
    
    console.log('✅ Phrase suggestions initialized with initial set');
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        phraseSuggestions,
        getRandomSuggestions, 
        getTotalSuggestionsCount,
        populateSuggestions, 
        insertSuggestion, 
        refreshSuggestions, 
        toggleSuggestions,
        initializePhraseSuggestions
    };
} else {
    // Browser environment - attach to window
    window.PhraseSuggestions = { 
        phraseSuggestions,
        getRandomSuggestions, 
        getTotalSuggestionsCount,
        populateSuggestions, 
        insertSuggestion, 
        refreshSuggestions, 
        toggleSuggestions,
        initializePhraseSuggestions
    };
    
    // Also export key functions globally for HTML access
    window.refreshSuggestions = refreshSuggestions;
    window.toggleSuggestions = toggleSuggestions;
    window.insertSuggestion = insertSuggestion;
    window.initializePhraseSuggestions = initializePhraseSuggestions;
}