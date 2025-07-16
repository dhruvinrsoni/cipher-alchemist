/**
 * Cipher Algorithms Module - Character Substitution & Password Generation
 * Contains only the core transformation logic
 */

// Character substitution mappings for the cipher
const substitutions = {
    'a': '@', 'b': '6', 'c': '(', 'd': 'cl', 'e': 'e', 'f': 'ph', 'g': '9', 'h': '#', 'i': '!', 'j': ']', 'k': '|<', 'l': '1', 'm': '/\\/\\', 'n': '|\\|', 'o': '0', 'p': '|>', 'q': 'q', 'r': 'r', 's': '5', 't': '+', 'u': 'v', 'v': '\\/', 'w': '\\/\\/', 'x': '><', 'y': 'y', 'z': '2',
    'A': '4', 'B': '8', 'C': '(', 'D': '|)', 'E': '3', 'F': 'PH', 'G': 'G', 'H': '#', 'I': '1', 'J': ')', 'K': '|<', 'L': '1', 'M': '/\\/\\', 'N': '|\\|', 'O': '0', 'P': '|>', 'Q': '0_', 'R': 'R', 'S': '5', 'T': '7', 'U': '(_)', 'V': '\\/', 'W': '\\/\\/', 'X': '><', 'Y': 'Y', 'Z': '2',
    '0': 'o', '1': 'i', '2': '2', '3': 'E', '4': 'A', '5': 's', '6': 'b', '7': 't', '8': 'B', '9': 'g'
};

/**
 * Transform a phrase using cipher substitutions
 * @param {string} phrase - The input phrase to transform
 * @returns {object} - Object containing password and explanation
 */
function applyCipherTransform(phrase) {
    let password = '';
    let explanation = '';
    
    for (let char of phrase) {
        const sub = substitutions[char] || char;
        password += sub;
        if (sub !== char) {
            explanation += `<li><b>${char}</b> → <b>${sub}</b></li>`;
        } else {
            explanation += `<li><b>${char}</b> (no change)</li>`;
        }
    }
    
    return { password, explanation };
}

// Export functions for modular use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        substitutions,
        applyCipherTransform
    };
} else {
    // Make functions globally available
    window.substitutions = substitutions;
    window.applyCipherTransform = applyCipherTransform;
}
