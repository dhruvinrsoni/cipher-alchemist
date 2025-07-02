/**
 * File Operations for Cipher Alchemist
 * Handles import/export of phrases, passwords, and configurations
 */

class FileOperations {
    constructor() {
        this.supportedFormats = ['json', 'csv', 'txt'];
        this.initialized = false;
        
        this.init();
    }
    
    init() {
        this.createUI();
        this.bindEvents();
        this.initialized = true;
        
        console.log('📁 File Operations initialized');
    }
    
    createUI() {
        // Add file operations button to top controls
        const topControls = document.querySelector('.top-controls');
        if (topControls) {
            const fileBtn = document.createElement('button');
            fileBtn.id = 'fileOperationsBtn';
            fileBtn.innerHTML = '📁';
            fileBtn.title = 'File Operations';
            fileBtn.setAttribute('aria-label', 'Import/Export files');
            fileBtn.onclick = () => this.showFileMenu();
            
            topControls.appendChild(fileBtn);
        }
    }
    
    showFileMenu() {
        const menu = this.createFileMenu();
        document.body.appendChild(menu);
        menu.style.display = 'flex';
    }
    
    createFileMenu() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2>📁 File Operations</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="file-operations-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div class="import-section">
                            <h3>📥 Import</h3>
                            <div class="file-operation-item">
                                <button onclick="window.fileOps.importPhrases()" class="btn-primary">
                                    Import Phrases
                                </button>
                                <p>Import phrases from JSON/CSV file</p>
                            </div>
                            <div class="file-operation-item">
                                <button onclick="window.fileOps.importConfig()" class="btn-primary">
                                    Import Config
                                </button>
                                <p>Import app configuration</p>
                            </div>
                            <div class="file-operation-item">
                                <button onclick="window.fileOps.importBackup()" class="btn-primary">
                                    Import Backup
                                </button>
                                <p>Restore from backup file</p>
                            </div>
                        </div>
                        
                        <div class="export-section">
                            <h3>📤 Export</h3>
                            <div class="file-operation-item">
                                <button onclick="window.fileOps.exportPhrases()" class="btn-success">
                                    Export Phrases
                                </button>
                                <p>Export phrase history as JSON</p>
                            </div>
                            <div class="file-operation-item">
                                <button onclick="window.fileOps.exportConfig()" class="btn-success">
                                    Export Config
                                </button>
                                <p>Export current configuration</p>
                            </div>
                            <div class="file-operation-item">
                                <button onclick="window.fileOps.exportBackup()" class="btn-success">
                                    Export Backup
                                </button>
                                <p>Create complete backup</p>
                            </div>
                        </div>
                    </div>
                    
                    <hr style="margin: 20px 0;">
                    
                    <div class="batch-operations">
                        <h3>⚡ Batch Operations</h3>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
                            <button onclick="window.fileOps.batchGenerate()" class="btn-info">
                                📊 Batch Generate
                            </button>
                            <button onclick="window.fileOps.analyzeFile()" class="btn-info">
                                🔍 Analyze File
                            </button>
                        </div>
                    </div>
                    
                    <div class="recent-files" style="margin-top: 20px;">
                        <h4>📋 Recent Operations</h4>
                        <div id="recentFilesList" style="max-height: 100px; overflow-y: auto;">
                            <!-- Recent files will be populated here -->
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button onclick="this.closest('.modal-overlay').remove()" class="btn-primary">Close</button>
                </div>
            </div>
        `;
        
        // Populate recent files
        this.populateRecentFiles(modal);
        
        return modal;
    }
    
    bindEvents() {
        // File input for drag and drop
        document.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
        
        document.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const files = Array.from(e.dataTransfer.files);
            this.handleDroppedFiles(files);
        });
    }
    
    handleDroppedFiles(files) {
        files.forEach(file => {
            const extension = file.name.split('.').pop().toLowerCase();
            
            if (this.supportedFormats.includes(extension)) {
                this.processFile(file);
            } else {
                if (window.notify) {
                    window.notify.warning(`Unsupported file type: ${extension}`);
                }
            }
        });
    }
    
    async processFile(file) {
        try {
            const content = await this.readFile(file);
            const extension = file.name.split('.').pop().toLowerCase();
            
            switch (extension) {
                case 'json':
                    this.processJSONFile(content, file.name);
                    break;
                case 'csv':
                    this.processCSVFile(content, file.name);
                    break;
                case 'txt':
                    this.processTXTFile(content, file.name);
                    break;
            }
            
            this.addToRecentFiles(file.name, 'import');
            
        } catch (error) {
            console.error('File processing error:', error);
            if (window.notify) {
                window.notify.error(`Failed to process file: ${error.message}`);
            }
        }
    }
    
    readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(new Error('Failed to read file'));
            reader.readAsText(file);
        });
    }
    
    processJSONFile(content, filename) {
        try {
            const data = JSON.parse(content);
            
            if (data.type === 'cipher-phrases') {
                this.importPhrasesData(data.phrases);
            } else if (data.type === 'cipher-config') {
                this.importConfigData(data.config);
            } else if (data.type === 'cipher-backup') {
                this.importBackupData(data);
            } else {
                throw new Error('Unknown JSON file format');
            }
            
            if (window.notify) {
                window.notify.success(`Successfully imported ${filename}`);
            }
            
        } catch (error) {
            throw new Error(`Invalid JSON format: ${error.message}`);
        }
    }
    
    processCSVFile(content, filename) {
        const lines = content.split('\n').filter(line => line.trim());
        const phrases = [];
        
        // Skip header if present
        const startIndex = lines[0].includes('phrase') ? 1 : 0;
        
        for (let i = startIndex; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line) {
                const [phrase, category = 'imported'] = line.split(',').map(s => s.trim().replace(/"/g, ''));
                if (phrase) {
                    phrases.push({ phrase, category, imported: true });
                }
            }
        }
        
        this.importPhrasesData(phrases);
        
        if (window.notify) {
            window.notify.success(`Imported ${phrases.length} phrases from ${filename}`);
        }
    }
    
    processTXTFile(content, filename) {
        const lines = content.split('\n').filter(line => line.trim());
        const phrases = lines.map(line => ({
            phrase: line.trim(),
            category: 'imported',
            imported: true
        }));
        
        this.importPhrasesData(phrases);
        
        if (window.notify) {
            window.notify.success(`Imported ${phrases.length} phrases from ${filename}`);
        }
    }
    
    importPhrasesData(phrases) {
        // Add phrases to local storage or suggestion system
        const existingPhrases = this.getPhraseHistory();
        const newPhrases = [...existingPhrases, ...phrases];
        
        localStorage.setItem('cipher_phrase_history', JSON.stringify(newPhrases));
        
        // Refresh suggestions if available
        if (typeof refreshSuggestions === 'function') {
            refreshSuggestions();
        }
    }
    
    importConfigData(config) {
        // Import configuration settings
        Object.entries(config).forEach(([key, value]) => {
            localStorage.setItem(`cipher_${key}`, JSON.stringify(value));
        });
        
        // Apply settings
        if (config.theme && typeof applyTheme === 'function') {
            applyTheme(config.theme);
        }
    }
    
    importBackupData(backup) {
        // Import complete backup
        if (backup.phrases) {
            this.importPhrasesData(backup.phrases);
        }
        
        if (backup.config) {
            this.importConfigData(backup.config);
        }
        
        if (backup.searchHistory) {
            localStorage.setItem('cipher_search_history', JSON.stringify(backup.searchHistory));
        }
    }
    
    // Export methods
    exportPhrases() {
        const phrases = this.getPhraseHistory();
        const exportData = {
            type: 'cipher-phrases',
            version: '1.0',
            exported: new Date().toISOString(),
            phrases: phrases
        };
        
        this.downloadJSON(exportData, 'cipher-phrases.json');
        this.addToRecentFiles('cipher-phrases.json', 'export');
    }
    
    exportConfig() {
        const config = this.getCurrentConfig();
        const exportData = {
            type: 'cipher-config',
            version: '1.0',
            exported: new Date().toISOString(),
            config: config
        };
        
        this.downloadJSON(exportData, 'cipher-config.json');
        this.addToRecentFiles('cipher-config.json', 'export');
    }
    
    exportBackup() {
        const backup = {
            type: 'cipher-backup',
            version: '1.0',
            exported: new Date().toISOString(),
            phrases: this.getPhraseHistory(),
            config: this.getCurrentConfig(),
            searchHistory: this.getSearchHistory(),
            metadata: {
                userAgent: navigator.userAgent,
                url: window.location.href
            }
        };
        
        this.downloadJSON(backup, `cipher-backup-${new Date().toISOString().split('T')[0]}.json`);
        this.addToRecentFiles('cipher-backup.json', 'export');
    }
    
    // Import methods
    importPhrases() {
        this.createFileInput(['json', 'csv', 'txt'], (file) => {
            this.processFile(file);
        });
    }
    
    importConfig() {
        this.createFileInput(['json'], (file) => {
            this.processFile(file);
        });
    }
    
    importBackup() {
        this.createFileInput(['json'], (file) => {
            this.processFile(file);
        });
    }
    
    createFileInput(extensions, callback) {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = extensions.map(ext => `.${ext}`).join(',');
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                callback(file);
            }
        };
        input.click();
    }
    
    // Batch operations
    batchGenerate() {
        this.createFileInput(['txt', 'csv'], async (file) => {
            try {
                const content = await this.readFile(file);
                const phrases = content.split('\n').filter(line => line.trim());
                
                const results = [];
                
                for (const phrase of phrases) {
                    if (phrase.trim() && typeof applyCipherTransform === 'function') {
                        const result = applyCipherTransform(phrase.trim());
                        results.push({
                            phrase: phrase.trim(),
                            password: result.password,
                            timestamp: new Date().toISOString()
                        });
                    }
                }
                
                // Export results
                const exportData = {
                    type: 'cipher-batch-results',
                    version: '1.0',
                    generated: new Date().toISOString(),
                    results: results
                };
                
                this.downloadJSON(exportData, 'batch-passwords.json');
                
                if (window.notify) {
                    window.notify.success(`Generated ${results.length} passwords`);
                }
                
            } catch (error) {
                if (window.notify) {
                    window.notify.error(`Batch generation failed: ${error.message}`);
                }
            }
        });
    }
    
    analyzeFile() {
        this.createFileInput(['txt', 'csv'], async (file) => {
            try {
                const content = await this.readFile(file);
                const lines = content.split('\n').filter(line => line.trim());
                
                const analysis = {
                    totalLines: lines.length,
                    averageLength: lines.reduce((sum, line) => sum + line.length, 0) / lines.length,
                    hasNumbers: lines.filter(line => /\d/.test(line)).length,
                    hasSymbols: lines.filter(line => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]/.test(line)).length,
                    hasUppercase: lines.filter(line => /[A-Z]/.test(line)).length,
                    lengthDistribution: this.getLengthDistribution(lines)
                };
                
                this.showAnalysisResults(analysis, file.name);
                
            } catch (error) {
                if (window.notify) {
                    window.notify.error(`Analysis failed: ${error.message}`);
                }
            }
        });
    }
    
    getLengthDistribution(lines) {
        const distribution = {};
        lines.forEach(line => {
            const length = Math.floor(line.length / 5) * 5; // Group by 5s
            distribution[length] = (distribution[length] || 0) + 1;
        });
        return distribution;
    }
    
    showAnalysisResults(analysis, filename) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 500px;">
                <div class="modal-header">
                    <h2>📊 File Analysis: ${filename}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="analysis-results">
                        <div class="stat-item">
                            <strong>Total Lines:</strong> ${analysis.totalLines}
                        </div>
                        <div class="stat-item">
                            <strong>Average Length:</strong> ${Math.round(analysis.averageLength)} characters
                        </div>
                        <div class="stat-item">
                            <strong>Contains Numbers:</strong> ${analysis.hasNumbers} (${Math.round(analysis.hasNumbers/analysis.totalLines*100)}%)
                        </div>
                        <div class="stat-item">
                            <strong>Contains Symbols:</strong> ${analysis.hasSymbols} (${Math.round(analysis.hasSymbols/analysis.totalLines*100)}%)
                        </div>
                        <div class="stat-item">
                            <strong>Has Uppercase:</strong> ${analysis.hasUppercase} (${Math.round(analysis.hasUppercase/analysis.totalLines*100)}%)
                        </div>
                        
                        <h4>Length Distribution:</h4>
                        <div class="length-distribution">
                            ${Object.entries(analysis.lengthDistribution)
                                .sort(([a], [b]) => parseInt(a) - parseInt(b))
                                .map(([length, count]) => 
                                    `<div>${length}+ chars: ${count} lines</div>`
                                ).join('')}
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button onclick="this.closest('.modal-overlay').remove()">Close</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.style.display = 'flex';
    }
    
    // Utility methods
    downloadJSON(data, filename) {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        URL.revokeObjectURL(url);
    }
    
    getPhraseHistory() {
        try {
            return JSON.parse(localStorage.getItem('cipher_phrase_history') || '[]');
        } catch {
            return [];
        }
    }
    
    getCurrentConfig() {
        const config = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('cipher_')) {
                try {
                    config[key.replace('cipher_', '')] = JSON.parse(localStorage.getItem(key));
                } catch {
                    config[key.replace('cipher_', '')] = localStorage.getItem(key);
                }
            }
        }
        return config;
    }
    
    getSearchHistory() {
        try {
            return JSON.parse(localStorage.getItem('cipher_search_history') || '[]');
        } catch {
            return [];
        }
    }
    
    addToRecentFiles(filename, operation) {
        const recent = this.getRecentFiles();
        recent.unshift({
            filename,
            operation,
            timestamp: new Date().toISOString()
        });
        
        // Keep only last 10
        const trimmed = recent.slice(0, 10);
        localStorage.setItem('cipher_recent_files', JSON.stringify(trimmed));
    }
    
    getRecentFiles() {
        try {
            return JSON.parse(localStorage.getItem('cipher_recent_files') || '[]');
        } catch {
            return [];
        }
    }
    
    populateRecentFiles(modal) {
        const container = modal.querySelector('#recentFilesList');
        const recent = this.getRecentFiles();
        
        if (recent.length === 0) {
            container.innerHTML = '<p style="color: #666; font-style: italic;">No recent operations</p>';
            return;
        }
        
        container.innerHTML = recent.map(item => `
            <div style="display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid #eee;">
                <span>${item.filename}</span>
                <span style="color: #666; font-size: 0.9em;">${item.operation}</span>
            </div>
        `).join('');
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.fileOps = new FileOperations();
    });
} else {
    window.fileOps = new FileOperations();
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FileOperations;
}
