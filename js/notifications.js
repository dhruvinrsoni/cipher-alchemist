// ...existing code...

// Notification container (will be created dynamically)
let notificationContainer = null;

/**
 * Initialize the notification system
 */
function initNotificationSystem() {
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.id = 'notification-container';
        notificationContainer.className = 'notification-container';
        document.body.appendChild(notificationContainer);
    }
}

/**
 * Show a modern notification instead of alert()
 * @param {string} message - The message to display
 * @param {object} options - Configuration options
 */
function showNotification(message, options = {}) {
    // Initialize if not already done
    initNotificationSystem();
    
    // Default options
    const config = {
        type: options.type || 'info',        // 'success', 'error', 'warning', 'info'
        timeout: options.timeout || 5000,    // Auto-close after 5 seconds
        closable: options.closable !== false, // Show close button (default: true)
        selectable: options.selectable !== false, // Make text selectable (default: true)
        icon: options.icon || getDefaultIcon(options.type || 'info'),
        position: options.position || 'top-right' // 'top-right', 'top-left', 'bottom-right', 'bottom-left'
    };
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${config.type}`;
    
    // Make content selectable if requested
    if (config.selectable) {
        notification.style.userSelect = 'text';
        notification.style.cursor = 'text';
    }
    
    // Notification HTML
    notification.innerHTML = `
        <div class="notification-content">
            ${config.icon ? `<span class="notification-icon">${config.icon}</span>` : ''}
            <span class="notification-message">${message}</span>
        </div>
        ${config.closable ? '<button class="notification-close" aria-label="Close notification">&times;</button>' : ''}
    `;
    
    // Add to container
    notificationContainer.appendChild(notification);
    
    // Handle close button
    if (config.closable) {
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => closeNotification(notification));
    }
    
    // Auto-timeout functionality
    let timeoutId = null;
    
    function startTimeout() {
        if (config.timeout > 0) {
            timeoutId = setTimeout(() => {
                closeNotification(notification);
            }, config.timeout);
        }
    }
    
    function stopTimeout() {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
    }
    
    // Hover to pause timeout
    notification.addEventListener('mouseenter', stopTimeout);
    notification.addEventListener('mouseleave', startTimeout);
    
    // Start initial timeout
    startTimeout();
    
    // Animate in
    requestAnimationFrame(() => {
        notification.classList.add('notification-show');
    });
    
    // Return notification element for potential external control
    return notification;
}

/**
 * Close a specific notification
 * @param {HTMLElement} notification - The notification element to close
 */
function closeNotification(notification) {
    notification.classList.add('notification-hide');
    
    // Remove from DOM after animation
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

/**
 * Get default icon for notification type
 * @param {string} type - The notification type
 * @returns {string} The emoji icon
 */
function getDefaultIcon(type) {
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    return icons[type] || icons.info;
}

/**
 * Convenience methods for different notification types
 */
const notify = {
    success: (message, options = {}) => showNotification(message, { ...options, type: 'success' }),
    error: (message, options = {}) => showNotification(message, { ...options, type: 'error' }),
    warning: (message, options = {}) => showNotification(message, { ...options, type: 'warning' }),
    info: (message, options = {}) => showNotification(message, { ...options, type: 'info' })
};

/**
 * Replace alert() function with modern notification
 * @param {string} message - The message to display
 */
function modernAlert(message) {
    // Detect type based on message content
    let type = 'info';
    if (message.includes('✅') || message.toLowerCase().includes('success') || message.toLowerCase().includes('copied')) {
        type = 'success';
    } else if (message.includes('❌') || message.toLowerCase().includes('error') || message.toLowerCase().includes('failed')) {
        type = 'error';
    } else if (message.includes('⚠️') || message.toLowerCase().includes('warning') || message.toLowerCase().includes('please')) {
        type = 'warning';
    }
    
    return showNotification(message, { type });
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNotificationSystem);
} else {
    initNotificationSystem();
}

// Make functions globally available
if (typeof window !== 'undefined') {
    window.showNotification = showNotification;
    window.notify = notify;
    window.modernAlert = modernAlert;
    window.closeNotification = closeNotification;
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showNotification,
        notify,
        modernAlert,
        closeNotification
    };
}
