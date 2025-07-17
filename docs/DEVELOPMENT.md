# 🛠️ Cipher Alchemist - Complete Development Guide
Developer Quickstart

Local dev:
- Open `index.html` directly
- For PWA/network: `python -m http.server 8000` or `npx live-server --port=8000`

Modules:
- JS: Modular, no cross-imports unless needed
- CSS: Modular, theme support
}
```

**Supported Parameters:**
- **`?phrase=YourPhrase`** - Pre-fills input and auto-generates password
- **URL Encoding** - Handles special characters automatically
- **Visual Feedback** - Subtle animation shows parameter was loaded

**Use Cases:**
- **Documentation Links** - Direct examples in README and case studies
- **Training Materials** - Instant demos for security education
- **Team Sharing** - Share specific password patterns
- **Live Demonstrations** - No manual typing needed for presentations

**Example URLs:**
```
https://dhruvinrsoni.github.io/cipher-alchemist/?phrase=Q4Target2025Sales
https://dhruvinrsoni.github.io/cipher-alchemist/?phrase=MyUni2025Spring

# Cipher Alchemist - Minimal Development Guide

## Quickstart
- Open `index.html` for instant preview
- For PWA: `python -m http.server 8000` or `npx live-server --port=8000`

## Structure
- Modular JS: one feature per file in `js/`
- Modular CSS: one feature per file in `css/`
- Service worker: `sw.js` for offline
- Manifest: `manifest.json` for PWA

## Main Features
- Password logic: `cipher-algorithms.js`
- Phrase suggestions: `phrase-suggestions.js`
- Keyboard shortcuts: `keyboard-shortcuts.js`
- Notifications: `notifications.js`
- Sharing: `sharing.js`
- Theme: `theme.js`
- PWA: `pwa.js`

## Configuration
- All features toggled in `js/config.js`
- Use `window.Config.isFeatureEnabled('feature')` for checks

## Add a Feature
1. Create `js/my-feature.js`
2. Add to config in `js/config.js`
3. Initialize in `js/app.js`
4. Reference in `index.html`

## Testing
- Loads without errors
- Features toggle and work offline
- Keyboard accessible

## Best Practices
- Centralize config
- Load features only if enabled
- Always support keyboard navigation

## Roadmap
- Lazy loading
- Plugin system
- Config UI
- Analytics
**🕵️ Secret Developer Access Testing:**

The application includes a secure secret access system for developers to access the comprehensive test dashboard (`dev.html`). This system is designed to prevent accidental activation while providing secure access for development and testing purposes.

**Access Methods:**
1. **Keyboard Sequence** (Primary Method):
   - Hold `Ctrl + Shift` simultaneously
   - Type `d`, `e`, `v` in sequence
   - Release all keys
   - Developer dashboard will open in a new tab/window

2. **Title Click Method** (Alternative):
   - Click the app title "Cipher Alchemist" 5 times rapidly
   - All clicks must occur within 2 seconds
   - Developer dashboard will open after the 5th click

**Security Features:**
- **Non-Accidental Activation**: Much more secure than simple "dev" typing
- **Time-based Validation**: Click sequence has a 2-second window
- **Key Combination Required**: Ctrl+Shift modifier prevents accidental activation
- **Production Safe**: Works in both local and production environments
- **Clean Timeout**: Sequences reset automatically after timeout

**Testing the Secret Access:**
```javascript
// Test keyboard sequence
// 1. Hold Ctrl+Shift
// 2. Press 'd' (while holding modifiers)
// 3. Press 'e' (while holding modifiers) 
// 4. Press 'v' (while holding modifiers)
// 5. Release all keys → Developer dashboard opens

// Test title clicks
// 1. Click app title 5 times rapidly (within 2 seconds)
// 2. After 5th click → Developer dashboard opens
```

**Implementation Details:**
- Located in `js/main.js` - Secret access system
- Accessible dashboard: `dev.html` - Comprehensive test suite
- Fallback test file: `test-suite-comprehensive.html` - Alternative testing interface
- Zero performance impact when not activated
- No console output to prevent discovery in production

**Browser Testing:**
- Chrome/Edge (Chromium-based)
- Firefox
- Safari (WebKit-based)
- Mobile browsers (iOS Safari, Chrome Mobile)

**Key Test Scenarios:**
1. **Basic Functionality** - Enter phrase → Generate password → Check strength
2. **Suggestion System** - Click suggestion → Auto-populate → Generate
3. **PWA Install** - Click install button → Follow prompts → Verify installation
4. **Keyboard Help** - Press Ctrl+? → Modal opens → Navigate with keyboard
5. **Theme Switching** - Toggle theme → Verify all components update
6. **Responsive Design** - Resize window → Check layout adaptation

### **📝 Development Guidelines**

**Code Style:**
- Use modern JavaScript (ES6+)
- Follow consistent naming conventions
- Add comments for complex logic
- Maintain modular architecture

**File Organization:**
- Keep related functionality in focused modules
- Use descriptive file and function names
- Maintain clear separation of concerns
- Update documentation with changes

---

## 📚 **Documentation & Resources**

### **📖 Complete Documentation**

- **[Main README](README.md)** - Project overview and quick start
- **[Git Workflow Guide](GIT_WORKFLOW_GUIDE.md)** - CI/CD and `[skip ci]` usage
- **[Keyboard Testing Guide](KEYBOARD_TESTING_GUIDE.md)** - Accessibility testing procedures
- **[Documentation Index](INDEX.md)** - Central navigation hub
- **[Changelog](CHANGELOG.md)** - Version history and updates

### **🔗 External Resources**

- **[GitHub Repository](https://github.com/dhruvinrsoni/cipher-alchemist)** - Source code and issues
- **[Live Application](https://dhruvinrsoni.github.io/cipher-alchemist/)** - Deployed version
- **[PWA Documentation](https://web.dev/progressive-web-apps/)** - Progressive Web App guides
- **[Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)** - WCAG 2.1 reference

---

## 🎯 **Next Steps & Roadmap**

### **Completed Features ✅**
- Character substitution password generation
- Real-time password strength analysis  
- 48 inspirational phrase suggestions across 12 themes
- Comprehensive keyboard accessibility with help modal
- PWA installation with cross-browser support
- Professional documentation structure
- Automated CI/CD pipeline with monitoring

### **Potential Enhancements 🔮**
- Additional character substitution patterns
- Password history and favorites
- Custom phrase categories
- Export/import functionality
- Advanced strength analysis algorithms
- Multi-language support
- Offline phrase suggestion caching

### **Contributing 🤝**
Cipher Alchemist welcomes contributions! Please see our [Git Workflow Guide](GIT_WORKFLOW_GUIDE.md) for detailed contribution procedures, including proper use of `[skip ci]` for documentation updates.

---

**Built with ❤️ by [@dhruvinrsoni](https://github.com/dhruvinrsoni) - Transforming memorable phrases into unbreakable passwords**
