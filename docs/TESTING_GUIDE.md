# 🧪 Cipher Alchemist - Testing & Troubleshooting Guide

## 📋 Manual Testing Checklist
- Password Generation: Various phrases and lengths
- Theme Switching: Dark/light mode transitions
- Offline Mode: Disable network, test functionality
- PWA Installation: Install/uninstall process
- Keyboard Navigation: All shortcuts and accessibility
- Mobile Responsive: Touch interactions and layouts

## 🌐 Browser Compatibility
- Chrome 80+: Full PWA support
- Firefox 75+: Core functionality
- Safari 13+: iOS PWA support
- Edge 80+: Full compatibility

## 🛠️ Testing Tools
- Dev Dashboard (`dev.html`): Service worker status, cache inspection
- Test Lab (`testlab.html`): Comprehensive test suite
- Browser DevTools: PWA debugging, performance analysis

## 📝 Development Troubleshooting

### Common Issues & Solutions

#### Focus Problems
```javascript
modal.addEventListener('keydown', trapFocus);
:focus { outline: 2px solid #007bff; }
```

#### Screen Reader Issues
```html
<button aria-label="Generate secure password">Generate</button>
<div aria-live="polite" id="status-updates"></div>
```

#### Keyboard Trap Issues
```javascript
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOpen) {
        closeModal();
    }
});
```

#### PWA Issues
```bash
# Service worker not registering
- Check absolute path: /sw.js not ./sw.js
- Verify HTTPS in production
- Clear browser cache and storage

# Offline functionality not working
- Check cache contents in DevTools
- Verify service worker is active
- Test with Network tab "Offline" checkbox
```

## 🧪 Testing & Validation

### WCAG 2.1 AA Standards Checklist
- [ ] 2.1.1: All functionality available from keyboard
- [ ] 2.1.2: No keyboard trap exists
- [ ] 2.4.3: Focus order is logical
- [ ] 2.4.7: Focus indicators are visible
- [ ] 3.2.1: Focus doesn't trigger unexpected changes
- [ ] 4.1.2: All UI components properly identified

### Cross-Browser Testing
```bash
Chrome/Edge: Standard keyboard handling
Firefox: Alternative keyboard behavior
Safari: Mac-specific shortcuts
```

### Screen Reader Testing
```bash
NVDA (Free): Most common screen reader
JAWS: Professional screen reader
VoiceOver: Built-in screen reader
Tab: Navigate elements
Enter/Space: Activate buttons
Arrow keys: Navigate within components
```

### Automated Testing Tools
```bash
axe-core: Browser extension for automated checks
WAVE: Web accessibility evaluation tool
Lighthouse: Built-in Chrome accessibility audit
Tab order visualization tools
Focus management debugging
```

## 🚀 Git Workflow & CI/CD

### Daily Development
```bash
git pull origin main
git add .
git commit -m "feat: your change description"
git push origin main
```

### Emergency Fixes
```bash
git commit -m "hotfix: urgent fix [skip ci]"
git push origin main
```

### Release Management
```bash
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

### Conflict Resolution
```bash
git pull --rebase origin main
git add .
git rebase --continue
git push origin main
```

### Best Practices
- Use `[skip ci]` for docs/auto commits
- Test locally before pushing
- Use feature branches for major changes
- Check GitHub Actions logs for deployment status

### Deployment
- Main branch auto-deploys to GitHub Pages
- Production URL: https://dhruvinrsoni.github.io/cipher-alchemist/
- For local testing: Use `python -m http.server 8000` or `npx live-server --port=8000`

### Troubleshooting CI/CD
- Check GitHub Actions logs for errors
- Fix issues and commit with `[skip ci]` if needed
- Ensure all file paths are correct for deployment

## 🌟 Best Practices & Guidelines

### Implementation Guidelines
1. Always provide keyboard alternatives for mouse interactions
2. Test with actual screen readers, not just automated tools
3. Implement proper focus management in dynamic content
4. Use semantic HTML as the foundation
5. Test with keyboard only regularly during development

### Code Examples
```javascript
element.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleActivation();
    }
});
function openModal() {
    modal.style.display = 'block';
    firstFocusableElement.focus();
    document.addEventListener('keydown', trapFocus);
}
```

### Configuration Access Pattern
```javascript
if (window.Config.isFeatureEnabled('sharing')) {
    // Feature logic here
}
```

## 🔗 External Resources
- [WebAIM Keyboard Testing](https://webaim.org/articles/keyboard/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [NVDA Screen Reader](https://www.nvaccess.org/)
- [Keyboard Navigation Bookmarklet](https://accessibility-bookmarklets.org/)
