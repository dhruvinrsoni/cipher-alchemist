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
    const strengthMeter = document.getElementById('strengthMeter');
    const transformationSteps = document.getElementById('transformationExplanation');

    if (phraseInput) {
        phraseInput.value = '';
        phraseInput.focus();
        
        // Trigger input event to update strength meter and hide clear button
        const inputEvent = new Event('input', { bubbles: true });
        phraseInput.dispatchEvent(inputEvent);
    }
    
    // Clear password output
    if (passwordOutput) {
        passwordOutput.innerHTML = '';
    }

    // Clear strength meter
    if (strengthMeter) {
        strengthMeter.innerHTML = '';
    }

    // Clear transformation steps if they exist
    if (transformationSteps) {
        transformationSteps.innerHTML = '';
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
    console.log('PWA: Installation successful');
    
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
 * Handle URL parameters for direct phrase input and generation
 * Supports: ?phrase=YourPhraseHere for instant password generation
 */
function handleURLParameters() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const phraseParam = urlParams.get('phrase');
        
        if (phraseParam) {
            const phraseInput = document.getElementById('phraseInput');
            if (phraseInput) {
                // Decode URL encoding and set the phrase
                const decodedPhrase = decodeURIComponent(phraseParam);
                phraseInput.value = decodedPhrase;
                
                // Focus on the input
                phraseInput.focus();
                  // Show the clear button since there's content
                toggleClearButton(true);
                
                // Show the share button since there's content
                toggleShareButton(true);
                
                // Add subtle animation to show the phrase was loaded
                phraseInput.style.transition = 'all 0.3s ease';
                phraseInput.style.backgroundColor = 'rgba(0, 120, 215, 0.1)';
                phraseInput.style.borderColor = 'rgba(0, 120, 215, 0.5)';
                
                // Trigger input event for real-time strength checking
                const inputEvent = new Event('input', { bubbles: true });
                phraseInput.dispatchEvent(inputEvent);
                
                // Generate password automatically after a short delay
                setTimeout(() => {
                    generatePassword();
                    
                    // Reset the visual feedback
                    setTimeout(() => {
                        phraseInput.style.backgroundColor = '';
                        phraseInput.style.borderColor = '';
                    }, 1000);
                }, 500);
                
                console.log('URL phrase parameter loaded:', decodedPhrase);
            }
        }
    } catch (error) {
        console.warn('Error handling URL parameters:', error);
        // Don't break the app if URL parameter handling fails
    }
}

/**
 * Social sharing functionality for educational examples
 * Creates shareable URLs with phrases (but never actual passwords)
 */
function shareExample() {
    try {
        console.log('Share example button clicked');
        const phraseInput = document.getElementById('phraseInput');
        const phrase = phraseInput?.value?.trim();
        
        console.log('Current phrase:', phrase);
        
        if (!phrase) {
            alert('⚠️ Please enter a phrase first to create a shareable example!');
            return;
        }
        
        // Create the shareable URL with phrase parameter
        // Handle both server URLs and local file:// URLs
        let baseUrl;
        if (window.location.protocol === 'file:') {
            // For local file:// URLs, use the full file path
            baseUrl = window.location.href.split('?')[0];
        } else {
            // For http/https URLs, use origin + pathname
            baseUrl = window.location.origin + window.location.pathname;
        }
        const shareUrl = `${baseUrl}?phrase=${encodeURIComponent(phrase)}`;
        
        // Prepare social media content
        const socialContent = {
            title: '🔮 Try This Password Security Example!',
            text: `Check out this password generation example using Cipher Alchemist! 🔐\n\n` +
                  `Phrase: "${phrase}"\n` +
                  `See how it transforms into a secure password: `,
            url: shareUrl,
            hashtags: ['PasswordSecurity', 'CyberSecurity', 'TechEducation', 'OpenSource']
        };
        
        // Show sharing options modal
        showSharingModal(socialContent);
        
    } catch (error) {
        console.error('Error in shareExample:', error);
        alert('Sorry, sharing feature encountered an error. Please try again.');
    }
}

/**
 * Display sharing options modal with various platforms
 */
function showSharingModal(content) {
    // Create modal HTML
    const modalHtml = `
        <div id="shareModal" class="modal-overlay" role="dialog" aria-labelledby="share-title" aria-modal="true">
            <div class="modal-content" role="document">                <div class="modal-header">
                    <h2 id="share-title">🔗 Share This Example</h2>
                    <button class="modal-close" aria-label="Close modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="share-preview">
                        <p><strong>📝 What gets shared:</strong></p>
                        <div class="share-content-preview">
                            <p>• Your phrase (for educational purposes)</p>
                            <p>• Direct link to try the example</p>
                            <p>• <strong>❌ NO actual password is shared</strong></p>
                        </div>
                    </div>
                      <div class="share-options">
                        <h3>Choose Platform:</h3>                        <div class="share-buttons-grid">
                            <button class="share-btn twitter" data-action="twitter">
                                🐦 Twitter
                            </button>
                            <button class="share-btn linkedin" data-action="linkedin">
                                💼 LinkedIn
                            </button>
                            <button class="share-btn reddit" data-action="reddit">
                                🤖 Reddit
                            </button>
                            <button class="share-btn native" id="nativeShareBtn" data-action="native" style="display: none;">
                                📤 Share
                            </button>
                        </div>
                    </div>
                      <div class="share-url-container">
                        <label for="shareUrlInput">Direct Link</label>                        
                        <div class="share-url-input-wrapper">
                            <input type="text" id="shareUrlInput" class="share-url-input" value="${content.url}" readonly title="Click to select URL, scroll to see full link">
                            <button class="url-copy-btn" data-action="copy" title="Copy to clipboard" aria-label="Copy URL to clipboard">
                                📋 Copy Link
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('shareModal');
    if (existingModal) {
        existingModal.remove();
    }    // Add modal to document
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Get the modal element
    const modal = document.getElementById('shareModal');
      // Add event listeners for share buttons
    const shareButtons = modal.querySelectorAll('[data-action]');
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            
            switch(action) {
                case 'twitter':
                    shareToTwitter(content.url, content.text, content.hashtags.join(','));
                    break;
                case 'linkedin':
                    shareToLinkedIn(content.url, content.title, content.text);
                    break;
                case 'reddit':
                    shareToReddit(content.url, content.title);
                    break;
                case 'native':
                    useNativeShare(content.url, content.title, content.text);
                    break;
                case 'copy':
                    copyShareUrl(content.url);
                    break;
            }
        });
    });
    
    // Add event listener for close button
    const closeButton = modal.querySelector('.modal-close');
    if (closeButton) {
        closeButton.addEventListener('click', closeSharingModal);
    }    // Check if native sharing is available and show/hide the button
    const nativeShareBtn = document.getElementById('nativeShareBtn');
      // Comprehensive native share debugging
    console.log('=== NATIVE SHARE DEBUGGING ===');
    console.log('User Agent:', navigator.userAgent);
    console.log('Protocol:', window.location.protocol);
    console.log('Host:', window.location.host);
    console.log('Full URL:', window.location.href);
    console.log('Is HTTPS:', window.location.protocol === 'https:');
    console.log('Is localhost:', window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    console.log('Is secure context:', window.isSecureContext);
    console.log('Navigator.share exists:', 'share' in navigator);
    console.log('Navigator.share type:', typeof navigator.share);
    
    // Additional browser-specific checks
    console.log('Browser info:');
    console.log('  - Chrome:', /Chrome/.test(navigator.userAgent));
    console.log('  - Safari:', /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent));
    console.log('  - Edge:', /Edg/.test(navigator.userAgent));
    console.log('  - Mobile:', /Mobi|Android/i.test(navigator.userAgent));
    
    // Check if this is a PWA or installed app
    console.log('Display mode:', window.matchMedia('(display-mode: standalone)').matches ? 'standalone' : 'browser');
    
    // Try to detect why navigator.share might not be available
    if (!('share' in navigator)) {
        console.log('🔍 DIAGNOSING WHY NAVIGATOR.SHARE IS NOT AVAILABLE:');
        
        // Check secure context
        if (!window.isSecureContext) {
            console.log('❌ REASON: Not a secure context (requires HTTPS or localhost)');
            console.log('💡 SOLUTION: Access via HTTPS or localhost instead of HTTP');
        }
        
        // Check if it's an older browser version
        const userAgent = navigator.userAgent;
        if (/Chrome\/(\d+)/.test(userAgent)) {
            const chromeVersion = parseInt(userAgent.match(/Chrome\/(\d+)/)[1]);
            console.log('Chrome version:', chromeVersion);
            if (chromeVersion < 89) {
                console.log('❌ REASON: Chrome version too old (need 89+)');
            }
        }
        
        if (/Edg\/(\d+)/.test(userAgent)) {
            const edgeVersion = parseInt(userAgent.match(/Edg\/(\d+)/)[1]);
            console.log('Edge version:', edgeVersion);
            if (edgeVersion < 93) {
                console.log('❌ REASON: Edge version too old (need 93+)');
            }
        }
        
        // Check if it's in an iframe or embedded context
        if (window !== window.top) {
            console.log('❌ REASON: Running in iframe/embedded context');
        }
        
        // Check if it's a webview
        if (/(wv|WebView)/.test(userAgent)) {
            console.log('❌ REASON: Running in WebView (not regular browser)');
        }
    }
    
    // Check for mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                     window.innerWidth <= 768;
    console.log('Mobile detected:', isMobile);
    
    // Test if we can actually call navigator.share (some browsers lie about support)
    let canActuallyShare = false;
    if (navigator.share) {
        try {
            // Test with minimal data to see if it throws immediately
            navigator.share({ title: 'test' }).catch(() => {
                // Expected to fail, we're just testing if the method exists and can be called
            });
            canActuallyShare = true;
            console.log('Navigator.share appears to be callable');
        } catch (e) {
            console.log('Navigator.share exists but cannot be called:', e.message);
        }
    }
      if (nativeShareBtn) {
        // Show native share button if:
        // 1. Native share is actually available and callable, OR
        // 2. We're on mobile (even if detection is uncertain) - we'll provide manual instructions
        if (canActuallyShare) {
            nativeShareBtn.style.display = 'inline-block';
            nativeShareBtn.style.visibility = 'visible';
            nativeShareBtn.textContent = '📤 Share';
            console.log('✅ Native Share button shown - API available');
        } else if (isMobile) {
            // Show button anyway on mobile with different text to provide manual instructions
            nativeShareBtn.style.display = 'inline-block';
            nativeShareBtn.style.visibility = 'visible';
            nativeShareBtn.textContent = '📤 Share (Manual)';
            nativeShareBtn.setAttribute('title', 'Get sharing instructions for your device');
            console.log('✅ Native Share button shown - Manual mode for mobile');
        } else {
            console.log('❌ Native Share button hidden - not mobile and no API');
            console.log('Reasons:');
            console.log('  - navigator.share available:', !!navigator.share);
            console.log('  - Can actually call share:', canActuallyShare);
            console.log('  - Is mobile device:', isMobile);
            console.log('  - Is secure context:', window.isSecureContext);
        }
    } else {
        console.log('❌ Native share button element not found in DOM');
    }
    console.log('=== END DEBUGGING ===');
      // Focus management
    modal.classList.add('show');
    
    // Enhance URL input behavior
    const urlInput = document.getElementById('shareUrlInput');
    if (urlInput) {
        // Add click handler for better URL interaction
        urlInput.addEventListener('click', function() {
            // Select all text when clicked
            this.select();
            
            // On mobile, also scroll to show the end of the URL after a brief moment
            setTimeout(() => {
                if (window.innerWidth <= 768) {
                    this.scrollLeft = this.scrollWidth;
                }
            }, 100);
        });
        
        // Add focus handler to scroll to end on mobile
        urlInput.addEventListener('focus', function() {
            setTimeout(() => {
                if (window.innerWidth <= 768) {
                    this.scrollLeft = this.scrollWidth;
                }
            }, 50);
        });
        
        // Add double-click to scroll to beginning
        urlInput.addEventListener('dblclick', function() {
            this.scrollLeft = 0;
        });
        
        // For better mobile experience, set initial scroll to show the domain
        if (window.innerWidth <= 768) {
            setTimeout(() => {
                // Try to scroll to show domain part (after protocol)
                const url = urlInput.value;
                const protocolEnd = url.indexOf('://') + 3;
                if (protocolEnd > 2) {
                    // Estimate character width and scroll to show domain
                    const charWidth = 8; // Approximate pixel width per character
                    urlInput.scrollLeft = Math.max(0, protocolEnd * charWidth - 50);
                }
            }, 200);
        }
    }
    
    // Focus the close button after a short delay to allow animation
    setTimeout(() => {
        modal.querySelector('.modal-close').focus();
    }, 100);
    
    // Add escape key handler
    function handleEscape(e) {
        if (e.key === 'Escape') {
            closeSharingModal();
            document.removeEventListener('keydown', handleEscape);
        }
    }
    document.addEventListener('keydown', handleEscape);
}

/**
 * Close the sharing modal
 */
function closeSharingModal() {
    const modal = document.getElementById('shareModal');
    if (modal) {
        modal.classList.remove('show');
        // Remove the modal after the animation completes
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 300);
    }
}

/**
 * Share to Twitter with educational content
 */
function shareToTwitter(url, text, hashtags) {
    const twitterText = `${text}\n\n${hashtags.split(',').map(tag => `#${tag}`).join(' ')}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
    closeSharingModal();
}

/**
 * Share to LinkedIn
 */
function shareToLinkedIn(url, title, summary) {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedInUrl, '_blank', 'width=600,height=400');
    closeSharingModal();
}

/**
 * Share to Reddit
 */
function shareToReddit(url, title) {
    const redditUrl = `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
    window.open(redditUrl, '_blank', 'width=600,height=400');
    closeSharingModal();
}

/**
 * Copy share URL to clipboard
 */
function copyShareUrl(url) {
    navigator.clipboard.writeText(url).then(() => {
        alert('📋 Link copied to clipboard!');
        closeSharingModal();
    }).catch(() => {
        // Fallback for older browsers
        const input = document.getElementById('shareUrlInput');
        input.select();
        document.execCommand('copy');
        alert('📋 Link copied to clipboard!');
        closeSharingModal();
    });
}

/**
 * Use native share API (available on mobile and some desktop browsers)
 */
function useNativeShare(url, title, text) {
    console.log('=== NATIVE SHARE ATTEMPT ===');
    console.log('Called with:', { url, title, text });
    console.log('navigator.share available:', !!navigator.share);
    console.log('Current protocol:', window.location.protocol);
    console.log('Secure context:', window.isSecureContext);
    
    if (!navigator.share) {
        // Manual sharing instructions for mobile devices
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            let instructions = '';
            const userAgent = navigator.userAgent;
            
            if (/Android/i.test(userAgent)) {
                if (/Chrome/i.test(userAgent)) {
                    instructions = `📱 To Share on Android Chrome:\n\n` +
                                 `1. Tap the three dots menu (⋮) in browser\n` +
                                 `2. Tap "Share..."\n` +
                                 `3. Choose your app to share with\n\n` +
                                 `🔗 URL copied to clipboard for easy sharing!`;
                } else {
                    instructions = `📱 To Share on Android:\n\n` +
                                 `1. Copy the URL (done automatically)\n` +
                                 `2. Open your favorite app\n` +
                                 `3. Paste and share!\n\n` +
                                 `🔗 URL copied to clipboard!`;
                }
            } else if (/iPhone|iPad/i.test(userAgent)) {
                instructions = `📱 To Share on iOS:\n\n` +
                             `1. Tap the Share button (⬆️) in Safari\n` +
                             `2. Choose your app to share with\n` +
                             `3. Or copy the URL below and paste in your app\n\n` +
                             `🔗 URL copied to clipboard!`;
            } else {
                instructions = `📱 To Share:\n\n` +
                             `1. Copy the URL (done automatically)\n` +
                             `2. Open your favorite app\n` +
                             `3. Paste and share!\n\n` +
                             `🔗 URL copied to clipboard!`;
            }
            
            // Copy URL and show instructions
            copyShareUrl(url);
            alert(instructions);
            
            console.log('✅ Manual sharing instructions provided');
            return;
        }
        
        // Desktop fallback
        const reason = `Web Share API not available.\n\n` +
                      `This could be because:\n` +
                      `• Not using HTTPS (current: ${window.location.protocol})\n` +
                      `• Browser doesn't support it\n` +
                      `• Feature is disabled\n\n` +
                      `Try accessing via HTTPS or copy the URL below.`;
        
        console.log('❌ FAILED:', reason);
        alert(`❌ Native sharing not supported\n\n${reason}`);
        copyShareUrl(url);
        return;
    }
    
    if (!window.isSecureContext) {
        const reason = 'Web Share API requires HTTPS or localhost';
        console.log('❌ FAILED:', reason);
        alert(`❌ Sharing requires secure connection\n\n` +
              `Current: ${window.location.protocol}//${window.location.host}\n\n` +
              `Solutions:\n` +
              `• Access via HTTPS\n` +
              `• Use localhost for testing\n\n` +
              `Copying URL instead.`);
        copyShareUrl(url);
        return;
    }
    
    console.log('✅ All requirements met, attempting native share...');
    
    navigator.share({
        title: title,
        text: text,
        url: url
    }).then(() => {
        console.log('✅ Native sharing successful!');
        closeSharingModal();
    }).catch((error) => {
        console.log('❌ Native sharing failed:', error);
        
        let userFriendlyMessage = 'Sharing was cancelled or failed';
        let suggestion = 'Try copying the URL instead.';
        
        if (error.name === 'AbortError') {
            userFriendlyMessage = 'Sharing was cancelled';
            suggestion = 'No worries! You can copy the URL below if needed.';
        } else if (error.name === 'NotAllowedError') {
            userFriendlyMessage = 'Sharing not allowed by browser';
            suggestion = 'Your browser blocked sharing. Copy the URL instead.';
        }
        
        alert(`${userFriendlyMessage}\n\n${suggestion}`);
        copyShareUrl(url);
    });
    
    console.log('=== END SHARE ATTEMPT ===');
}

/**
 * Toggle visibility of share button based on content
 */
/**
 * Toggle visibility of share button based on content
 */
function toggleShareButton(show) {
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
        if (show) {
            shareBtn.classList.remove('share-button-hidden');
            shareBtn.classList.add('share-button-visible');
            console.log('Share button shown');
        } else {
            shareBtn.classList.remove('share-button-visible');
            shareBtn.classList.add('share-button-hidden');
            console.log('Share button hidden');
        }
    } else {
        console.error('Share button element not found');
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
            
            // Show/hide share button based on content with debugging
            console.log('DEBUG: Input event - text length:', this.value.length, 'should show share button:', this.value.length > 0);
            toggleShareButton(this.value.length > 0);
            
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
    }    // Initialize download button
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            console.log('Download PDF button clicked');
            downloadPDF();
        });
    } else {
        console.error('No button with id="downloadBtn" found');
    }

    // Initialize share button
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            console.log('Share Example button clicked');
            shareExample();
        });
    } else {
        console.error('No button with id="shareBtn" found');
    }

    // Initialize theme functionality
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
            });        }
    });
    
    // Initialize keyboard shortcuts help modal
    if (typeof initializeKeyboardHelp === 'function') {
        initializeKeyboardHelp();
        addKeyboardHelpShortcut();
    }    // Initialize clear button visibility on page load
    const phraseInputElement = document.getElementById('phraseInput');
    if (phraseInputElement) {
        toggleClearButton(phraseInputElement.value.length > 0);
        // Also initialize share button visibility
        toggleShareButton(phraseInputElement.value.length > 0);
    }

    // Handle URL parameters for direct phrase input
    handleURLParameters();

    console.log('Cipher Alchemist app initialized successfully!');
    
    // Register service worker after app initialization
    registerServiceWorker();
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);
