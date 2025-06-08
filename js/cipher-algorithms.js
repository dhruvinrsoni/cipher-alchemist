// Cipher Algorithms Module - Character Substitution & Password Generation
// [Copy lines 1-4: substitutions object]
const substitutions = {
    'a': '@', 'b': '6', 'c': '(', 'd': 'cl', 'e': 'e', 'f': 'ph', 'g': '9', 'h': '#', 'i': '!', 'j': ']', 'k': '|<', 'l': '1', 'm': '/\\/\\', 'n': '|\\|', 'o': '0', 'p': '|>', 'q': 'q', 'r': 'r', 's': '5', 't': '+', 'u': 'v', 'v': '\\/', 'w': '\\/\\/', 'x': '><', 'y': 'y', 'z': '2',
    'A': '4', 'B': '8', 'C': '(', 'D': '|)', 'E': '3', 'F': 'PH', 'G': 'G', 'H': '#', 'I': '1', 'J': ')', 'K': '|<', 'L': '1', 'M': '/\\/\\', 'N': '|\\|', 'O': '0', 'P': '|>', 'Q': '0_', 'R': 'R', 'S': '5', 'T': '7', 'U': '(_)', 'V': '\\/', 'W': '\\/\\/', 'X': '><', 'Y': 'Y', 'Z': '2',
    '0': 'o', '1': 'i', '2': '2', '3': 'E', '4': 'A', '5': 's', '6': 'b', '7': 't', '8': 'B', '9': 'g'
};

// [Copy lines 6-73: generatePassword function]
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

// [Copy lines 75-83: copyPassword function]  
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

// [Copy lines 664-693: tryExample function]
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

// [Copy lines 733-757: toggleTransformation function]
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

// Export functions for modular use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        substitutions,
        generatePassword, 
        copyPassword, 
        tryExample, 
        toggleTransformation 
    };
} else {
    window.CipherAlgorithms = { 
        substitutions,
        generatePassword, 
        copyPassword, 
        tryExample, 
        toggleTransformation 
    };
}