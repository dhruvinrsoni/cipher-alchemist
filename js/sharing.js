// ...existing code...

// Sharing Feature State
let sharingModal = null;

/**
 * Social sharing functionality for educational examples
 * Creates shareable URLs with phrases (but never actual passwords)
 */
function shareExample() {
    try {
        console.log('🔗 Share example button clicked');
        const phraseInput = document.getElementById('phraseInput');
        const phrase = phraseInput?.value?.trim();
        
        console.log('Current phrase:', phrase);
          if (!phrase) {
            console.warn('⚠️ No phrase found for sharing');
            modernAlert('⚠️ Please enter a phrase first to create a shareable example!');
            return;
        }
        
        console.log('📝 Creating shareable URL...');
        
        // Create the shareable URL with phrase parameter
        let baseUrl;
        if (window.location.protocol === 'file:') {
            baseUrl = window.location.href.split('?')[0];
        } else {
            baseUrl = window.location.origin + window.location.pathname;
        }
        const shareUrl = `${baseUrl}?phrase=${encodeURIComponent(phrase)}`;
        
        console.log('🌐 Share URL:', shareUrl);
        
        // Prepare social media content
        const socialContent = {
            title: '🔮 Try This Password Security Example!',
            text: `Check out this password generation example using Cipher Alchemist! 🔐\n\n` +
                  `Phrase: "${phrase}"\n` +
                  `See how it transforms into a secure password: `,
            url: shareUrl,
            hashtags: ['PasswordSecurity', 'CyberSecurity', 'TechEducation', 'OpenSource']
        };
        
        console.log('📤 Prepared social content:', socialContent);
        
        // Show sharing options modal
        console.log('🎭 Calling showSharingModal...');
        showSharingModal(socialContent);
        
    } catch (error) {
        console.error('❌ Error in shareExample:', error);
        modernAlert('Sorry, sharing feature encountered an error. Please try again.');
    }
}

/**
 * Display sharing options modal with various platforms
 */
function showSharingModal(content) {
    console.log('🎭 showSharingModal called with content:', content);
    
    // Create modal HTML using template
    console.log('📝 Creating modal HTML...');
    const modalHtml = getSharingModalTemplate(content);
    
    // Remove existing modal if any
    const existingModal = document.getElementById('shareModal');
    if (existingModal) {
        console.log('🗑️ Removing existing modal...');
        existingModal.remove();
    }
    
    // Add modal to document
    console.log('➕ Adding modal to document...');
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Get the modal element
    const modal = document.getElementById('shareModal');
    sharingModal = modal;
    
    if (!modal) {
        console.error('❌ Failed to create modal element!');
        modernAlert('❌ Sorry, sharing modal failed to load. Please try again.');
        return;
    }
    
    console.log('✅ Modal element created successfully:', modal);
    
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
    }
    
    // Check if native sharing is available and show/hide the button
    const nativeShareBtn = document.getElementById('nativeShareBtn');
      // Comprehensive native share capability detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                     window.innerWidth <= 768;
    
    // Simply check if navigator.share exists without calling it
    let canActuallyShare = typeof navigator.share === 'function';
    
    if (nativeShareBtn) {
        if (canActuallyShare) {
            nativeShareBtn.style.display = 'inline-block';
            nativeShareBtn.textContent = '📤 Share';
        } else if (isMobile) {
            // Show button anyway on mobile with different text for manual instructions
            nativeShareBtn.style.display = 'inline-block';
            nativeShareBtn.textContent = '📤 Share (Manual)';
            nativeShareBtn.setAttribute('title', 'Get sharing instructions for your device');
        }
    }
    
    // Focus management and URL input enhancements
    modal.classList.add('show');
    
    const urlInput = document.getElementById('shareUrlInput');
    if (urlInput) {
        // Add enhanced URL input behavior
        urlInput.addEventListener('click', function() {
            this.select();
            setTimeout(() => {
                if (window.innerWidth <= 768) {
                    this.scrollLeft = this.scrollWidth;
                }
            }, 100);
        });
        
        urlInput.addEventListener('focus', function() {
            setTimeout(() => {
                if (window.innerWidth <= 768) {
                    this.scrollLeft = this.scrollWidth;
                }
            }, 50);
        });
        
        urlInput.addEventListener('dblclick', function() {
            this.scrollLeft = 0;
        });
        
        // For mobile: scroll to show domain part initially
        if (window.innerWidth <= 768) {
            setTimeout(() => {
                const url = urlInput.value;
                const protocolEnd = url.indexOf('://') + 3;
                if (protocolEnd > 2) {
                    const charWidth = 8;
                    urlInput.scrollLeft = Math.max(0, protocolEnd * charWidth - 50);
                }
            }, 200);
        }
    }
    
    // Focus the close button after animation
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
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 300);
    }
    sharingModal = null;
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
        notify.success('📋 Link copied to clipboard!');
        closeSharingModal();
    }).catch(() => {
        // Fallback for older browsers
        const input = document.getElementById('shareUrlInput');
        input.select();
        document.execCommand('copy');
        notify.success('📋 Link copied to clipboard!');
        closeSharingModal();
    });
}

/**
 * Use native share API (available on mobile and some desktop browsers)
 */
function useNativeShare(url, title, text) {
    console.log('=== NATIVE SHARE ATTEMPT ===');
    console.log('Called with:', { url, title, text });
    
    if (!navigator.share) {
        // Manual sharing instructions for mobile devices
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            let instructions = '';
            const userAgent = navigator.userAgent;
            
            if (/Android/i.test(userAgent)) {
                instructions = /Chrome/i.test(userAgent) 
                    ? `📱 To Share on Android Chrome:\n\n1. Tap the three dots menu (⋮) in browser\n2. Tap "Share..."\n3. Choose your app to share with\n\n🔗 URL copied to clipboard for easy sharing!`
                    : `📱 To Share on Android:\n\n1. Copy the URL (done automatically)\n2. Open your favorite app\n3. Paste and share!\n\n🔗 URL copied to clipboard!`;
            } else if (/iPhone|iPad/i.test(userAgent)) {
                instructions = `📱 To Share on iOS:\n\n1. Tap the Share button (⬆️) in Safari\n2. Choose your app to share with\n3. Or copy the URL below and paste in your app\n\n🔗 URL copied to clipboard!`;
            } else {
                instructions = `📱 To Share:\n\n1. Copy the URL (done automatically)\n2. Open your favorite app\n3. Paste and share!\n\n🔗 URL copied to clipboard!`;
            }
              copyShareUrl(url);
            modernAlert(instructions);
            return;
        }
          // Desktop fallback
        modernAlert(`❌ Native sharing not supported\n\nThis could be because:\n• Not using HTTPS (current: ${window.location.protocol})\n• Browser doesn't support it\n• Feature is disabled\n\nTry accessing via HTTPS or copy the URL below.`);
        copyShareUrl(url);
        return;
    }
      if (!window.isSecureContext) {
        modernAlert(`❌ Sharing requires secure connection\n\nCurrent: ${window.location.protocol}//${window.location.host}\n\nSolutions:\n• Access via HTTPS\n• Use localhost for testing\n\nCopying URL instead.`);
        copyShareUrl(url);
        return;
    }
      console.log('Actually calling navigator.share now...');
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
          modernAlert(`${userFriendlyMessage}\n\n${suggestion}`);
        copyShareUrl(url);
    });
}

/**
 * Toggle visibility of share button based on content
 */
function toggleShareButton(show) {
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
        if (show) {
            shareBtn.classList.remove('share-button-hidden');
            shareBtn.classList.add('share-button-visible');
        } else {
            shareBtn.classList.remove('share-button-visible');
            shareBtn.classList.add('share-button-hidden');
        }
    }
}

/**
 * Get sharing modal HTML template
 */
function getSharingModalTemplate(content) {
    return `
        <div id="shareModal" class="modal-overlay" role="dialog" aria-labelledby="share-title" aria-modal="true">
            <div class="modal-content" role="document">
                <div class="modal-header">
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
                        <h3>Choose Platform:</h3>
                        <div class="share-buttons-grid">
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
}

/**
 * Initialize sharing feature
 */
function initializeSharing() {
    console.log('🔗 Initializing sharing feature...');
    
    // Initialize share button event listener
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
        console.log('✅ Share button found, adding event listener...');
        shareBtn.addEventListener('click', function() {
            console.log('🖱️ Share Example button clicked via event listener');
            shareExample();
        });
        console.log('✅ Share button event listener added successfully');
    } else {
        console.warn('⚠️ Share button element not found during initialization');
    }
    
    console.log('✅ Sharing feature initialization complete');
    
    return {
        shareExample,
        showSharingModal,
        closeSharingModal,
        toggleShareButton,
        isEnabled: true
    };
}

// Export functions for global use
if (typeof window !== 'undefined') {
    window.SharingFeature = {
        shareExample,
        showSharingModal,
        closeSharingModal,
        shareToTwitter,
        shareToLinkedIn,
        shareToReddit,
        copyShareUrl,
        useNativeShare,
        toggleShareButton,
        getSharingModalTemplate,
        initializeSharing
    };
      // Also export key functions globally
    window.shareExample = shareExample;
    window.showSharingModal = showSharingModal;
    window.closeSharingModal = closeSharingModal;
    window.initializeSharing = initializeSharing;
}
