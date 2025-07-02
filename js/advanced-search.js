/**
 * Advanced Search Features for Cipher Alchemist
 * Provides intelligent search across phrases, passwords, and app content
 */

class AdvancedSearch {
    constructor() {
        this.searchHistory = [];
        this.searchIndex = new Map();
        this.filters = {
            phraseLength: { min: 0, max: Infinity },
            passwordStrength: { min: 0, max: 100 },
            hasNumbers: null,
            hasSymbols: null,
            hasUppercase: null,
            hasLowercase: null
        };
        
        this.initializeSearch();
        console.log('🔍 Advanced Search initialized');
    }
    
    /**
     * Initialize search functionality
     */
    initializeSearch() {
        this.createSearchInterface();
        this.bindEvents();
        this.loadSearchHistory();
    }
    
    /**
     * Create search interface
     */
    createSearchInterface() {
        const searchContainer = document.createElement('div');
        searchContainer.id = 'advanced-search-container';
        searchContainer.className = 'advanced-search-container';
        searchContainer.style.display = 'none';
        
        searchContainer.innerHTML = `
            <div class="search-overlay">
                <div class="search-modal">
                    <div class="search-header">
                        <h3>🔍 Advanced Search</h3>
                        <button class="search-close" onclick="AdvancedSearch.close()">×</button>
                    </div>
                    
                    <div class="search-content">
                        <div class="search-input-container">
                            <input type="text" id="search-input" placeholder="Search phrases, patterns, or transformations..." autocomplete="off">
                            <button class="search-btn" onclick="AdvancedSearch.performSearch()">Search</button>
                        </div>
                        
                        <div class="search-filters">
                            <h4>Filters</h4>
                            <div class="filter-grid">
                                <div class="filter-item">
                                    <label>Phrase Length:</label>
                                    <input type="range" id="length-min" min="0" max="50" value="0">
                                    <input type="range" id="length-max" min="0" max="50" value="50">
                                    <span id="length-display">0 - 50</span>
                                </div>
                                
                                <div class="filter-item">
                                    <label>Password Strength:</label>
                                    <input type="range" id="strength-min" min="0" max="100" value="0">
                                    <input type="range" id="strength-max" min="0" max="100" value="100">
                                    <span id="strength-display">0% - 100%</span>
                                </div>
                                
                                <div class="filter-checkboxes">
                                    <label><input type="checkbox" id="has-numbers"> Contains Numbers</label>
                                    <label><input type="checkbox" id="has-symbols"> Contains Symbols</label>
                                    <label><input type="checkbox" id="has-uppercase"> Has Uppercase</label>
                                    <label><input type="checkbox" id="has-lowercase"> Has Lowercase</label>
                                </div>
                            </div>
                        </div>
                        
                        <div class="search-results" id="search-results">
                            <div class="search-placeholder">
                                Enter a search term to find phrases, patterns, or cipher transformations
                            </div>
                        </div>
                        
                        <div class="search-history">
                            <h4>Recent Searches</h4>
                            <div id="search-history-list"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(searchContainer);
    }
    
    /**
     * Bind search events
     */
    bindEvents() {
        // Search input events
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', this.debounce(this.handleSearchInput.bind(this), 300));
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch();
                }
            });
        }
        
        // Filter events
        this.bindFilterEvents();
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'f') {
                e.preventDefault();
                this.open();
            }
            if (e.key === 'Escape' && this.isOpen()) {
                this.close();
            }
        });
    }
    
    /**
     * Bind filter events
     */
    bindFilterEvents() {
        // Length filters
        const lengthMin = document.getElementById('length-min');
        const lengthMax = document.getElementById('length-max');
        const lengthDisplay = document.getElementById('length-display');
        
        if (lengthMin && lengthMax && lengthDisplay) {
            const updateLengthDisplay = () => {
                const min = lengthMin.value;
                const max = lengthMax.value;
                lengthDisplay.textContent = `${min} - ${max}`;
                this.filters.phraseLength = { min: parseInt(min), max: parseInt(max) };
                this.performSearch();
            };
            
            lengthMin.addEventListener('input', updateLengthDisplay);
            lengthMax.addEventListener('input', updateLengthDisplay);
        }
        
        // Strength filters
        const strengthMin = document.getElementById('strength-min');
        const strengthMax = document.getElementById('strength-max');
        const strengthDisplay = document.getElementById('strength-display');
        
        if (strengthMin && strengthMax && strengthDisplay) {
            const updateStrengthDisplay = () => {
                const min = strengthMin.value;
                const max = strengthMax.value;
                strengthDisplay.textContent = `${min}% - ${max}%`;
                this.filters.passwordStrength = { min: parseInt(min), max: parseInt(max) };
                this.performSearch();
            };
            
            strengthMin.addEventListener('input', updateStrengthDisplay);
            strengthMax.addEventListener('input', updateStrengthDisplay);
        }
        
        // Checkbox filters
        const checkboxes = ['has-numbers', 'has-symbols', 'has-uppercase', 'has-lowercase'];
        checkboxes.forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox) {
                checkbox.addEventListener('change', () => {
                    const filterKey = id.replace('has-', 'has') + id.slice(-1).toUpperCase() + id.slice(4, -1);
                    this.filters[filterKey] = checkbox.checked ? true : null;
                    this.performSearch();
                });
            }
        });
    }
    
    /**
     * Handle search input
     * @param {Event} e - Input event
     */
    handleSearchInput(e) {
        const query = e.target.value.trim();
        if (query.length >= 2) {
            this.performSearch(query);
        } else if (query.length === 0) {
            this.clearResults();
        }
    }
    
    /**
     * Perform advanced search
     * @param {string} query - Search query
     */
    performSearch(query = null) {
        try {
            const searchInput = document.getElementById('search-input');
            const searchQuery = query || (searchInput ? searchInput.value.trim() : '');
            
            if (!searchQuery && !this.hasActiveFilters()) {
                this.clearResults();
                return;
            }
            
            // Add to search history
            if (searchQuery) {
                this.addToHistory(searchQuery);
            }
            
            // Perform search
            const results = this.searchContent(searchQuery);
            const filteredResults = this.applyFilters(results);
            
            // Display results
            this.displayResults(filteredResults, searchQuery);
            
            console.log(`🔍 Search performed: "${searchQuery}" - ${filteredResults.length} results`);
            
        } catch (error) {
            console.error('❌ Search error:', error);
            this.displayError('Search failed. Please try again.');
        }
    }
    
    /**
     * Search content across app
     * @param {string} query - Search query
     * @returns {array} Search results
     */
    searchContent(query) {
        const results = [];
        const lowercaseQuery = query.toLowerCase();
        
        // Search phrase suggestions
        if (typeof window.phraseSuggestions === 'object') {
            Object.entries(window.phraseSuggestions).forEach(([category, phrases]) => {
                phrases.forEach(phrase => {
                    if (phrase.text.toLowerCase().includes(lowercaseQuery)) {
                        results.push({
                            type: 'phrase-suggestion',
                            content: phrase.text,
                            category: category,
                            emoji: phrase.emoji,
                            score: this.calculateRelevanceScore(phrase.text, query)
                        });
                    }
                });
            });
        }
        
        // Search cipher transformations
        if (typeof window.substitutions === 'object') {
            Object.entries(window.substitutions).forEach(([char, replacement]) => {
                if (char.toLowerCase().includes(lowercaseQuery) || 
                    replacement.toLowerCase().includes(lowercaseQuery)) {
                    results.push({
                        type: 'cipher-mapping',
                        content: `${char} → ${replacement}`,
                        original: char,
                        transformed: replacement,
                        score: this.calculateRelevanceScore(`${char} ${replacement}`, query)
                    });
                }
            });
        }
        
        // Search current phrase/password
        const phraseInput = document.getElementById('phraseInput');
        const passwordOutput = document.getElementById('passwordOutput');
        
        if (phraseInput && phraseInput.value.toLowerCase().includes(lowercaseQuery)) {
            results.push({
                type: 'current-phrase',
                content: phraseInput.value,
                password: passwordOutput ? passwordOutput.value : '',
                score: 100 // Highest relevance for current content
            });
        }
        
        return results.sort((a, b) => b.score - a.score);
    }
    
    /**
     * Calculate relevance score
     * @param {string} text - Text to score
     * @param {string} query - Search query
     * @returns {number} Relevance score
     */
    calculateRelevanceScore(text, query) {
        const lowercaseText = text.toLowerCase();
        const lowercaseQuery = query.toLowerCase();
        
        let score = 0;
        
        // Exact match
        if (lowercaseText === lowercaseQuery) score += 100;
        
        // Starts with query
        if (lowercaseText.startsWith(lowercaseQuery)) score += 50;
        
        // Contains query
        if (lowercaseText.includes(lowercaseQuery)) score += 25;
        
        // Word boundary matches
        const words = lowercaseText.split(/\s+/);
        words.forEach(word => {
            if (word.startsWith(lowercaseQuery)) score += 20;
            if (word.includes(lowercaseQuery)) score += 10;
        });
        
        return score;
    }
    
    /**
     * Apply filters to results
     * @param {array} results - Search results
     * @returns {array} Filtered results
     */
    applyFilters(results) {
        return results.filter(result => {
            // Length filter
            const content = result.content || '';
            if (content.length < this.filters.phraseLength.min || 
                content.length > this.filters.phraseLength.max) {
                return false;
            }
            
            // Character type filters
            if (this.filters.hasNumbers === true && !/\d/.test(content)) return false;
            if (this.filters.hasNumbers === false && /\d/.test(content)) return false;
            
            if (this.filters.hasSymbols === true && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]/.test(content)) return false;
            if (this.filters.hasSymbols === false && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]/.test(content)) return false;
            
            if (this.filters.hasUppercase === true && !/[A-Z]/.test(content)) return false;
            if (this.filters.hasUppercase === false && /[A-Z]/.test(content)) return false;
            
            if (this.filters.hasLowercase === true && !/[a-z]/.test(content)) return false;
            if (this.filters.hasLowercase === false && /[a-z]/.test(content)) return false;
            
            return true;
        });
    }
    
    /**
     * Check if any filters are active
     * @returns {boolean} Has active filters
     */
    hasActiveFilters() {
        return this.filters.phraseLength.min > 0 ||
               this.filters.phraseLength.max < 50 ||
               this.filters.passwordStrength.min > 0 ||
               this.filters.passwordStrength.max < 100 ||
               Object.values(this.filters).some(f => f === true || f === false);
    }
    
    /**
     * Display search results
     * @param {array} results - Search results
     * @param {string} query - Search query
     */
    displayResults(results, query) {
        const resultsContainer = document.getElementById('search-results');
        if (!resultsContainer) return;
        
        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <div class="no-results-icon">🔍</div>
                    <h4>No results found</h4>
                    <p>Try adjusting your search terms or filters</p>
                </div>
            `;
            return;
        }
        
        const resultsHTML = results.map(result => {
            const highlightedContent = this.highlightSearchTerm(result.content, query);
            
            switch (result.type) {
                case 'phrase-suggestion':
                    return `
                        <div class="search-result-item phrase-suggestion" onclick="AdvancedSearch.usePhrase('${result.content}')">
                            <div class="result-icon">${result.emoji}</div>
                            <div class="result-content">
                                <div class="result-title">${highlightedContent}</div>
                                <div class="result-meta">Phrase Suggestion • ${result.category}</div>
                            </div>
                            <div class="result-action">Use</div>
                        </div>
                    `;
                
                case 'cipher-mapping':
                    return `
                        <div class="search-result-item cipher-mapping">
                            <div class="result-icon">🔄</div>
                            <div class="result-content">
                                <div class="result-title">${highlightedContent}</div>
                                <div class="result-meta">Cipher Transformation</div>
                            </div>
                        </div>
                    `;
                
                case 'current-phrase':
                    return `
                        <div class="search-result-item current-phrase">
                            <div class="result-icon">📝</div>
                            <div class="result-content">
                                <div class="result-title">${highlightedContent}</div>
                                <div class="result-meta">Current Input</div>
                            </div>
                        </div>
                    `;
                
                default:
                    return `
                        <div class="search-result-item">
                            <div class="result-content">
                                <div class="result-title">${highlightedContent}</div>
                            </div>
                        </div>
                    `;
            }
        }).join('');
        
        resultsContainer.innerHTML = `
            <div class="results-header">
                <h4>${results.length} result${results.length !== 1 ? 's' : ''} found</h4>
            </div>
            <div class="results-list">
                ${resultsHTML}
            </div>
        `;
    }
    
    /**
     * Highlight search terms in text
     * @param {string} text - Text to highlight
     * @param {string} query - Search query
     * @returns {string} Highlighted text
     */
    highlightSearchTerm(text, query) {
        if (!query) return text;
        
        const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
    
    /**
     * Use a phrase from search results
     * @param {string} phrase - Phrase to use
     */
    static usePhrase(phrase) {
        const phraseInput = document.getElementById('phraseInput');
        if (phraseInput) {
            phraseInput.value = phrase;
            
            // Trigger password generation
            if (typeof generatePassword === 'function') {
                generatePassword();
            }
            
            // Close search
            AdvancedSearch.close();
            
            // Show success notification
            if (typeof notify !== 'undefined') {
                notify.success(`Phrase "${phrase}" applied successfully!`);
            }
        }
    }
    
    /**
     * Add query to search history
     * @param {string} query - Search query
     */
    addToHistory(query) {
        // Remove duplicates and add to beginning
        this.searchHistory = this.searchHistory.filter(item => item !== query);
        this.searchHistory.unshift(query);
        
        // Keep only last 10 searches
        this.searchHistory = this.searchHistory.slice(0, 10);
        
        // Save to localStorage
        localStorage.setItem('cipher_search_history', JSON.stringify(this.searchHistory));
        
        // Update display
        this.displaySearchHistory();
    }
    
    /**
     * Load search history from localStorage
     */
    loadSearchHistory() {
        try {
            const stored = localStorage.getItem('cipher_search_history');
            if (stored) {
                this.searchHistory = JSON.parse(stored);
                this.displaySearchHistory();
            }
        } catch (error) {
            console.warn('Failed to load search history:', error);
        }
    }
    
    /**
     * Display search history
     */
    displaySearchHistory() {
        const historyContainer = document.getElementById('search-history-list');
        if (!historyContainer) return;
        
        if (this.searchHistory.length === 0) {
            historyContainer.innerHTML = '<div class="history-empty">No recent searches</div>';
            return;
        }
        
        const historyHTML = this.searchHistory.map(query => `
            <div class="history-item" onclick="AdvancedSearch.searchHistoryItem('${query}')">
                <span class="history-query">${query}</span>
                <button class="history-remove" onclick="event.stopPropagation(); AdvancedSearch.removeFromHistory('${query}')">×</button>
            </div>
        `).join('');
        
        historyContainer.innerHTML = historyHTML;
    }
    
    /**
     * Search from history item
     * @param {string} query - Query to search
     */
    static searchHistoryItem(query) {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.value = query;
            window.advancedSearch.performSearch(query);
        }
    }
    
    /**
     * Remove item from search history
     * @param {string} query - Query to remove
     */
    static removeFromHistory(query) {
        window.advancedSearch.searchHistory = window.advancedSearch.searchHistory.filter(item => item !== query);
        localStorage.setItem('cipher_search_history', JSON.stringify(window.advancedSearch.searchHistory));
        window.advancedSearch.displaySearchHistory();
    }
    
    /**
     * Clear search results
     */
    clearResults() {
        const resultsContainer = document.getElementById('search-results');
        if (resultsContainer) {
            resultsContainer.innerHTML = `
                <div class="search-placeholder">
                    Enter a search term to find phrases, patterns, or cipher transformations
                </div>
            `;
        }
    }
    
    /**
     * Display error message
     * @param {string} message - Error message
     */
    displayError(message) {
        const resultsContainer = document.getElementById('search-results');
        if (resultsContainer) {
            resultsContainer.innerHTML = `
                <div class="search-error">
                    <div class="error-icon">⚠️</div>
                    <h4>Search Error</h4>
                    <p>${message}</p>
                </div>
            `;
        }
    }
    
    /**
     * Open search modal
     */
    static open() {
        const container = document.getElementById('advanced-search-container');
        if (container) {
            container.style.display = 'block';
            setTimeout(() => {
                const searchInput = document.getElementById('search-input');
                if (searchInput) {
                    searchInput.focus();
                }
            }, 100);
        }
    }
    
    /**
     * Close search modal
     */
    static close() {
        const container = document.getElementById('advanced-search-container');
        if (container) {
            container.style.display = 'none';
        }
    }
    
    /**
     * Check if search is open
     * @returns {boolean} Is open
     */
    isOpen() {
        const container = document.getElementById('advanced-search-container');
        return container && container.style.display !== 'none';
    }
    
    /**
     * Debounce function
     * @param {function} func - Function to debounce
     * @param {number} wait - Wait time in ms
     * @returns {function} Debounced function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize advanced search when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.advancedSearch = new AdvancedSearch();
    });
} else {
    window.advancedSearch = new AdvancedSearch();
}

// Make static methods globally available
window.AdvancedSearch = AdvancedSearch;

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdvancedSearch;
}
