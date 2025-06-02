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
    // Responsive and dynamic transformation explanation
    explanationElem.innerHTML = `
        <div style="margin-top:10px; max-height:30vh; min-height:40px; overflow-y:auto; border:1px solid #ccc; border-radius:6px; background:#f9f9f9; padding:10px; box-sizing:border-box; transition:max-height 0.3s;">
            <b>Transformation Steps:</b>
            <ol style="margin:0 0 0 20px; padding-right:10px; word-break:break-all; font-size:1em;">
                ${explanation}
            </ol>
        </div>
    `;
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
            document.getElementById('footer-built').textContent = versionString.slice(splitIdx + 2).trim();
        } else {
            document.getElementById('footer-version').textContent = versionString;
            document.getElementById('footer-built').textContent = '';
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
                document.getElementById('footer-built').textContent = version.slice(splitIdx + 2).trim();
            } else {
                document.getElementById('footer-version').textContent = version.trim();
                document.getElementById('footer-built').textContent = '';
            }
            window.APP_VERSION = version.trim();
          })
          .catch(() => {
            document.getElementById('footer-version').textContent = '🔖 vDEV · Local Build';
            document.getElementById('footer-built').textContent = 'Built with ❤️ by Dhruvin Soni';
            window.APP_VERSION = 'vDEV · Local Build';
          });
    }
});
