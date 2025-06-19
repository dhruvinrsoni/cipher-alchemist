// Password Strength Meter Module

/**
 * Calculate password strength score and criteria
 * @param {string} password - The password to analyze
 * @param {string} originalPhrase - The original phrase before transformation
 * @returns {Object} Score and criteria object
 */
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

/**
 * Display password strength meter with visual feedback
 * @param {string} password - The password to analyze
 * @param {string} originalPhrase - The original phrase before transformation
 */
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
                <div class="strength-description">${description}</div>
                <div class="strength-criteria">
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

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calculatePasswordScore, checkStrength };
} else {
    // Browser environment - attach to window
    window.PasswordStrength = { calculatePasswordScore, checkStrength };
    
    // Also export key functions globally
    window.calculatePasswordScore = calculatePasswordScore;
    window.checkStrength = checkStrength;
}