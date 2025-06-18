/**
 * UI Sections Feature Module
 * Handles collapsible sections like app description, transformation steps, and suggestions
 * This module can be easily enabled/disabled by including/excluding this file
 */

// Sections Feature State
let sectionsInitialized = false;

/**
 * Toggle the app description section
 */
function toggleDescription() {
    const content = document.getElementById('descriptionContent');
    const icon = document.getElementById('descriptionIcon');
    const header = document.querySelector('.app-description-header');
    
    if (!content || !icon || !header) {
        console.warn('Description section elements not found');
        return false;
    }
    
    const isCollapsed = content.classList.contains('collapsed');
    
    if (isCollapsed) {
        // Expand
        content.classList.remove('collapsed');
        icon.classList.remove('collapsed');
        icon.textContent = '▼';
        header.setAttribute('aria-expanded', 'true');
        console.log('Description section expanded');
    } else {
        // Collapse
        content.classList.add('collapsed');
        icon.classList.add('collapsed');
        icon.textContent = '▶';
        header.setAttribute('aria-expanded', 'false');
        console.log('Description section collapsed');
    }
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('sectionToggled', {
        detail: { section: 'description', expanded: !isCollapsed }
    }));
    
    return true;
}

/**
 * Toggle the transformation section
 */
function toggleTransformation() {
    const content = document.getElementById('transformationContent');
    const icon = document.getElementById('transformationIcon');
    const header = document.querySelector('.transformation-header');
    
    if (!content || !icon || !header) {
        console.warn('Transformation section elements not found');
        return false;
    }
    
    const isCollapsed = content.classList.contains('collapsed');
    
    if (isCollapsed) {
        // Expand
        content.classList.remove('collapsed');
        icon.classList.remove('collapsed');
        icon.textContent = '▼';
        header.setAttribute('aria-expanded', 'true');
        console.log('Transformation section expanded');
    } else {
        // Collapse
        content.classList.add('collapsed');
        icon.classList.add('collapsed');
        icon.textContent = '▶';
        header.setAttribute('aria-expanded', 'false');
        console.log('Transformation section collapsed');
    }
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('sectionToggled', {
        detail: { section: 'transformation', expanded: !isCollapsed }
    }));
    
    return true;
}

/**
 * Toggle the suggestions section
 */
function toggleSuggestions() {
    const content = document.getElementById('suggestionsContent');
    const icon = document.getElementById('suggestionsIcon');
    const header = document.querySelector('.phrase-suggestions-header');
    
    if (!content || !icon || !header) {
        console.warn('Suggestions section elements not found');
        return false;
    }
    
    const isCollapsed = content.classList.contains('collapsed');
    
    if (isCollapsed) {
        // Expand
        content.classList.remove('collapsed');
        icon.classList.remove('collapsed');
        icon.textContent = '▼';
        header.setAttribute('aria-expanded', 'true');
        console.log('Suggestions section expanded');
    } else {
        // Collapse
        content.classList.add('collapsed');
        icon.classList.add('collapsed');
        icon.textContent = '▶';
        header.setAttribute('aria-expanded', 'false');
        console.log('Suggestions section collapsed');
    }
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('sectionToggled', {
        detail: { section: 'suggestions', expanded: !isCollapsed }
    }));
    
    return true;
}

/**
 * Expand a specific section
 * @param {string} sectionName - Name of the section ('description', 'transformation', 'suggestions')
 */
function expandSection(sectionName) {
    switch (sectionName) {
        case 'description':
            const descContent = document.getElementById('descriptionContent');
            if (descContent && descContent.classList.contains('collapsed')) {
                toggleDescription();
            }
            break;
        case 'transformation':
            const transContent = document.getElementById('transformationContent');
            if (transContent && transContent.classList.contains('collapsed')) {
                toggleTransformation();
            }
            break;
        case 'suggestions':
            const suggContent = document.getElementById('suggestionsContent');
            if (suggContent && suggContent.classList.contains('collapsed')) {
                toggleSuggestions();
            }
            break;
        default:
            console.warn(`Unknown section: ${sectionName}`);
    }
}

/**
 * Collapse a specific section
 * @param {string} sectionName - Name of the section ('description', 'transformation', 'suggestions')
 */
function collapseSection(sectionName) {
    switch (sectionName) {
        case 'description':
            const descContent = document.getElementById('descriptionContent');
            if (descContent && !descContent.classList.contains('collapsed')) {
                toggleDescription();
            }
            break;
        case 'transformation':
            const transContent = document.getElementById('transformationContent');
            if (transContent && !transContent.classList.contains('collapsed')) {
                toggleTransformation();
            }
            break;
        case 'suggestions':
            const suggContent = document.getElementById('suggestionsContent');
            if (suggContent && !suggContent.classList.contains('collapsed')) {
                toggleSuggestions();
            }
            break;
        default:
            console.warn(`Unknown section: ${sectionName}`);
    }
}

/**
 * Collapse all expanded sections
 */
function collapseAllSections() {
    const sections = ['description', 'transformation', 'suggestions'];
    let collapsedCount = 0;
    
    sections.forEach(section => {
        const content = document.getElementById(`${section}Content`) || 
                       document.getElementById(`${section === 'transformation' ? 'transformationContent' : section + 'Content'}`);
        
        if (content && !content.classList.contains('collapsed')) {
            collapseSection(section);
            collapsedCount++;
        }
    });
    
    console.log(`Collapsed ${collapsedCount} sections`);
    return collapsedCount;
}

/**
 * Get the state of all sections
 * @returns {Object} Object containing the expanded/collapsed state of all sections
 */
function getSectionsState() {
    const descContent = document.getElementById('descriptionContent');
    const transContent = document.getElementById('transformationContent');
    const suggContent = document.getElementById('suggestionsContent');
    
    return {
        description: {
            exists: !!descContent,
            expanded: descContent ? !descContent.classList.contains('collapsed') : false
        },
        transformation: {
            exists: !!transContent,
            expanded: transContent ? !transContent.classList.contains('collapsed') : false
        },
        suggestions: {
            exists: !!suggContent,
            expanded: suggContent ? !suggContent.classList.contains('collapsed') : false
        }
    };
}

/**
 * Auto-expand transformation section when password is generated
 */
function autoExpandTransformation() {
    setTimeout(() => {
        expandSection('transformation');
    }, 100);
}

/**
 * Set up keyboard navigation for section headers
 */
function setupSectionKeyboardNavigation() {
    // Description header
    const descriptionHeader = document.querySelector('.app-description-header');
    if (descriptionHeader) {
        descriptionHeader.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleDescription();
            }
        });
    }
    
    // Suggestions header
    const suggestionsHeader = document.querySelector('.phrase-suggestions-header');
    if (suggestionsHeader) {
        suggestionsHeader.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleSuggestions();
            }
        });
    }
    
    // Transformation header (dynamic, so use event delegation)
    document.addEventListener('keydown', function(e) {
        if (e.target.classList.contains('transformation-header')) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTransformation();
            }
        }
    });
    
    console.log('Section keyboard navigation set up');
}

/**
 * Set up click handlers for section headers
 */
function setupSectionClickHandlers() {
    // Description header
    const descriptionHeader = document.querySelector('.app-description-header');
    if (descriptionHeader) {
        descriptionHeader.addEventListener('click', toggleDescription);
    }
    
    // Suggestions header
    const suggestionsHeader = document.querySelector('.phrase-suggestions-header');
    if (suggestionsHeader) {
        suggestionsHeader.addEventListener('click', function() {
            if (typeof toggleSuggestions === 'function') {
                toggleSuggestions();
            }
        });
    }
    
    // Transformation header (dynamic, handled by cipher-algorithms.js)
    console.log('Section click handlers set up');
}

/**
 * Initialize sections management
 */
function initializeSections() {
    console.log('Sections feature initializing...');
    
    if (sectionsInitialized) {
        console.log('Sections already initialized');
        return { isEnabled: true, alreadyInitialized: true };
    }
    
    // Set up event handlers
    setupSectionKeyboardNavigation();
    setupSectionClickHandlers();
    
    // Listen for password generation to auto-expand transformation
    window.addEventListener('passwordGenerated', autoExpandTransformation);
    
    sectionsInitialized = true;
    console.log('Sections feature initialized');
    
    return {
        state: getSectionsState(),
        isEnabled: true
    };
}

/**
 * Disable sections feature
 */
function disableSections() {
    // Could remove event listeners here if needed
    console.log('Sections feature disabled');
}

/**
 * Enable sections feature
 */
function enableSections() {
    return initializeSections();
}

// Export functions for global use
if (typeof window !== 'undefined') {
    window.SectionsFeature = {
        initializeSections,
        toggleDescription,
        toggleTransformation,
        toggleSuggestions,
        expandSection,
        collapseSection,
        collapseAllSections,
        getSectionsState,
        autoExpandTransformation,
        disableSections,
        enableSections
    };
}
