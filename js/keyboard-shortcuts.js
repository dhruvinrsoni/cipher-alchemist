/**
 * Keyboard Shortcuts Help Modal
 * Provides a comprehensive modal showing all available keyboard shortcuts
 * Similar to YouTube's Ctrl+? functionality
 */

let isModalOpen = false;

/**
 * Show the keyboard shortcuts help modal
 */
function showKeyboardHelp() {
    const modal = document.getElementById('keyboardHelpModal');
    if (!modal) {
        console.error('Keyboard help modal not found');
        return;
    }
    
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    isModalOpen = true;
    
    // Focus the close button for accessibility
    const closeButton = modal.querySelector('.modal-close');
    if (closeButton) {
        closeButton.focus();
    }
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    console.log('Keyboard shortcuts help modal opened');
}

/**
 * Hide the keyboard shortcuts help modal
 */
function hideKeyboardHelp() {
    const modal = document.getElementById('keyboardHelpModal');
    if (!modal) return;
    
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    isModalOpen = false;
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    console.log('Keyboard shortcuts help modal closed');
}

/**
 * Toggle the keyboard shortcuts help modal
 */
function toggleKeyboardHelp() {
    if (isModalOpen) {
        hideKeyboardHelp();
    } else {
        showKeyboardHelp();
    }
}

/**
 * Initialize keyboard shortcuts modal functionality
 */
function initializeKeyboardHelp() {
    const modal = document.getElementById('keyboardHelpModal');
    if (!modal) {
        console.warn('Keyboard help modal not found - skipping initialization');
        return;
    }
    
    // Initialize help button click handler
    const helpButton = document.getElementById('keyboardHelpBtn');
    if (helpButton) {
        helpButton.addEventListener('click', showKeyboardHelp);
    }
    
    // Close button functionality
    const closeButton = modal.querySelector('.modal-close');
    if (closeButton) {
        closeButton.addEventListener('click', hideKeyboardHelp);
    }
    
    // Close on overlay click (but not on modal content click)
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideKeyboardHelp();
        }
    });
    
    // Keyboard navigation within modal
    modal.addEventListener('keydown', function(e) {
        // Escape key closes modal
        if (e.key === 'Escape') {
            e.preventDefault();
            hideKeyboardHelp();
            return;
        }
        
        // Tab key handling for focus trap
        if (e.key === 'Tab') {
            const focusableElements = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            
            if (focusableElements.length === 0) return;
            
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            // If shift+tab on first element, go to last
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
            // If tab on last element, go to first
            else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });
    
    console.log('Keyboard shortcuts modal initialized successfully');
}

/**
 * Add global keyboard shortcut to show help modal
 * This should be called from the main initialization
 */
function addKeyboardHelpShortcut() {
    document.addEventListener('keydown', function(e) {
        // Ctrl+? or Ctrl+/ to show keyboard help (like YouTube)
        if (e.ctrlKey && (e.key === '?' || e.key === '/' || e.key === '.')) {
            e.preventDefault();
            showKeyboardHelp();
        }
        
        // Also support F1 as help key (common convention)
        if (e.key === 'F1') {
            e.preventDefault();
            showKeyboardHelp();
        }
    });
      console.log('Global keyboard help shortcuts registered (Ctrl+?, Ctrl+/, Ctrl+., F1)');
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        showKeyboardHelp, 
        hideKeyboardHelp, 
        initializeKeyboardHelp, 
        addKeyboardHelpShortcut 
    };
} else {
    // Browser environment - attach to window
    window.KeyboardShortcuts = { 
        showKeyboardHelp, 
        hideKeyboardHelp, 
        initializeKeyboardHelp, 
        addKeyboardHelpShortcut 
    };
    
    // Also export key functions globally
    window.showKeyboardHelp = showKeyboardHelp;
    window.hideKeyboardHelp = hideKeyboardHelp;
    window.initializeKeyboardHelp = initializeKeyboardHelp;
}
