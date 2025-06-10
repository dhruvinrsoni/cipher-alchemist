# ⌨️ Complete Keyboard Accessibility Guide

> **Cipher Alchemist is fully keyboard accessible. This guide covers all keyboard shortcuts, testing procedures, and accessibility features.**

---

## 🚀 **Quick Start - Keyboard Shortcuts**

### **Help Modal Access**
Press any of these to see all shortcuts in the application:
- **`Ctrl + ?`** - Primary shortcut (like YouTube)
- **`Ctrl + /`** - Alternative shortcut 
- **`Ctrl + .`** - Another alternative
- **`F1`** - Standard help key
- **Click ⌨️ button** - Top-right keyboard icon

---

## 🎯 **Complete Keyboard Shortcut Reference**

### **🔥 Quick Actions**
| Shortcut | Action | Context |
|----------|--------|---------|
| `Ctrl + Enter` | Generate password | Anywhere in app |
| `Ctrl + C` | Copy password | When password field focused |
| `Ctrl + D` | Download PDF cheat sheet | Anywhere in app |
| `Space` | Activate focused button | Any button |
| `Enter` | Activate focused button | Any button |

### **🧭 Navigation**
| Shortcut | Action | Context |
|----------|--------|---------|
| `Tab` | Next focusable element | Global navigation |
| `Shift + Tab` | Previous focusable element | Global navigation |
| `Alt + 1` | Toggle description section | Section navigation |
| `Alt + 2` | Toggle suggestions section | Section navigation |
| `Escape` | Close modal/sections | Context-sensitive |

### **🎨 Interface Controls**
| Shortcut | Action | Context |
|----------|--------|---------|
| `Ctrl + T` | Toggle theme (dark/light) | Global |
| `📱 Button` | Install as PWA app | Top-right install button |
| `Ctrl + ?` | Open keyboard shortcuts help | Global |
| `F1` | Open keyboard shortcuts help | Global |

### **📋 Content Management**
| Shortcut | Action | Context |
|----------|--------|---------|
| `Ctrl + A` | Select all text | Text areas |
| `Ctrl + Z` | Undo | Text areas |
| `Ctrl + Y` | Redo | Text areas |
| `Delete` | Clear focused input | Input fields |

---

## ✅ **Testing Procedures**

### **🔍 Basic Functionality Testing**

#### **1. Modal Operation**
```
✅ Press Ctrl+? → Modal opens
✅ Press Escape → Modal closes
✅ Click outside modal → Modal closes
✅ Press Tab → Focus moves within modal
✅ Press Shift+Tab → Focus moves backward
✅ Click X button → Modal closes
```

#### **2. Core Functions**
```
✅ Type in phrase input → Text appears
✅ Press Ctrl+Enter → Password generates
✅ Tab to password field → Field gets focus
✅ Press Ctrl+C → Password copies to clipboard
✅ Press Ctrl+D → PDF downloads
```

#### **3. Navigation**
```
✅ Press Tab repeatedly → Focus moves through all elements
✅ Press Shift+Tab → Focus moves backward
✅ Press Alt+1 → Description section toggles
✅ Press Alt+2 → Suggestions section toggles
✅ Press Escape → Sections close
```

#### **4. Theme System**
```
✅ Press Ctrl+T → Theme toggles
✅ Click 📱 button → PWA install prompt appears (if available)
✅ System preference detection works
✅ Theme persists after page reload
✅ High contrast mode support
```

### **🎯 Advanced Testing**

#### **Focus Management**
- [ ] **Focus Trapping**: Tab navigation stays within modal when open
- [ ] **Focus Restoration**: Focus returns to trigger element after modal closes
- [ ] **Skip Links**: Hidden skip navigation links work
- [ ] **Focus Indicators**: Clear visual focus indicators on all interactive elements

#### **Screen Reader Testing**
- [ ] **ARIA Labels**: All interactive elements have proper labels
- [ ] **Live Regions**: Dynamic content updates announced
- [ ] **Landmarks**: Page structure properly identified
- [ ] **Headings**: Logical heading hierarchy maintained

#### **Keyboard-Only Navigation**
- [ ] **Complete Access**: All functionality available via keyboard
- [ ] **Logical Order**: Tab order follows visual layout
- [ ] **No Keyboard Traps**: User can always navigate away
- [ ] **Shortcuts Work**: All documented shortcuts function correctly

---

## 🛠️ **Testing Tools & Techniques**

### **Browser Testing**
```bash
# Test in multiple browsers
Chrome/Edge: Standard keyboard handling
Firefox: Alternative keyboard behavior
Safari: Mac-specific shortcuts
```

### **Screen Reader Testing**
```bash
# Windows
NVDA (Free): Most common screen reader
JAWS: Professional screen reader

# Mac
VoiceOver: Built-in screen reader

# Testing Commands
Tab: Navigate elements
Enter/Space: Activate buttons
Arrow keys: Navigate within components
```

### **Automated Testing Tools**
```bash
# Accessibility scanners
axe-core: Browser extension for automated checks
WAVE: Web accessibility evaluation tool
Lighthouse: Built-in Chrome accessibility audit

# Keyboard testing
Tab order visualization tools
Focus management debugging
```

---

## 🚨 **Common Issues & Solutions**

### **Focus Problems**
```javascript
// Issue: Focus lost after modal opens
// Solution: Implement focus trapping
modal.addEventListener('keydown', trapFocus);

// Issue: Focus not visible
// Solution: Ensure focus indicators in CSS
:focus { outline: 2px solid #007bff; }
```

### **Screen Reader Issues**
```html
<!-- Issue: Button purpose unclear -->
<!-- Solution: Proper ARIA labels -->
<button aria-label="Generate secure password">Generate</button>

<!-- Issue: Dynamic content not announced -->
<!-- Solution: Live regions -->
<div aria-live="polite" id="status-updates"></div>
```

### **Keyboard Trap Issues**
```javascript
// Issue: User stuck in modal
// Solution: Escape key handling
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOpen) {
        closeModal();
    }
});
```

---

## 📋 **Compliance Checklist**

### **WCAG 2.1 AA Standards**
- [ ] **2.1.1**: All functionality available from keyboard
- [ ] **2.1.2**: No keyboard trap exists
- [ ] **2.4.3**: Focus order is logical
- [ ] **2.4.7**: Focus indicators are visible
- [ ] **3.2.1**: Focus doesn't trigger unexpected changes
- [ ] **4.1.2**: All UI components properly identified

### **Additional Accessibility Features**
- [ ] **High Contrast Support**: Works with high contrast mode
- [ ] **Reduced Motion**: Respects user motion preferences
- [ ] **Text Scaling**: Works up to 200% zoom
- [ ] **Color Independence**: Doesn't rely solely on color for information

---

## 🎓 **Best Practices for Developers**

### **Implementation Guidelines**
1. **Always provide keyboard alternatives** for mouse interactions
2. **Test with actual screen readers**, not just automated tools
3. **Implement proper focus management** in dynamic content
4. **Use semantic HTML** as the foundation
5. **Test with keyboard only** regularly during development

### **Code Examples**
```javascript
// Good: Keyboard event handling
element.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleActivation();
    }
});

// Good: Focus management
function openModal() {
    modal.style.display = 'block';
    firstFocusableElement.focus();
    document.addEventListener('keydown', trapFocus);
}
```

---

## 🌟 **Additional Resources**

### **Documentation**
- **[WebAIM Keyboard Testing](https://webaim.org/articles/keyboard/)** - Comprehensive keyboard testing guide
- **[ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)** - Official ARIA patterns
- **[WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)** - Web accessibility standards

### **Tools**
- **[axe DevTools](https://www.deque.com/axe/devtools/)** - Browser accessibility testing
- **[NVDA Screen Reader](https://www.nvaccess.org/)** - Free screen reader for testing
- **[Keyboard Navigation Bookmarklet](https://accessibility-bookmarklets.org/)** - Visual focus testing

---

<div align="center">

**⌨️ Making the web accessible, one keyboard shortcut at a time**

[Main README](README.md) • [Development Guide](DEVELOPMENT.md) • [Try Live Demo](https://dhruvinrsoni.github.io/cipher-alchemist/)

</div>

#### **Suggestion Chips Navigation:**
1. Click on any suggestion chip to focus it
2. Use **`← →`** arrows to navigate between chips
3. **`Home`** - Jump to first chip
4. **`End`** - Jump to last chip
5. **`Enter`** or **`Space`** - Select the focused suggestion

### **🎨 Visual Testing**

#### **Light Theme:**
1. Default appearance with blue primary colors
2. Clean white backgrounds with subtle shadows

#### **Dark Theme:**
1. Click the moon/sun button in top-right
2. Modal should adapt with dark backgrounds
3. Text should remain readable

#### **Mobile Responsive:**
1. Resize browser window to mobile size
2. Modal should stack sections vertically
3. Shortcuts should display in column layout

### **♿ Accessibility Testing**

#### **Keyboard Navigation:**
- Modal should trap focus (Tab doesn't leave modal)
- All interactive elements should be reachable
- Focus indicators should be visible

#### **Screen Reader:**
- Modal has proper ARIA labels
- Sections are properly structured with headings
- Button purposes are clearly described

### **🐛 Expected Behaviors**

#### **Modal Priority:**
- If modal is open, `Escape` closes modal first
- Then subsequent `Escape` presses close sections
- Modal prevents body scrolling when open

#### **Focus Management:**
- Opening modal focuses the close button
- Closing modal restores focus appropriately
- Tab navigation stays within modal bounds

### **📱 Cross-Platform Testing**

#### **Windows:**
- All `Ctrl` shortcuts should work
- `F1` should open help

#### **Mac (if testing):**
- `Cmd` key might work instead of `Ctrl`
- Function keys behavior may vary

### **🎉 Success Criteria**

✅ **Modal opens smoothly with animation**  
✅ **All shortcuts listed work as expected**  
✅ **Focus management works properly**  
✅ **Responsive design adapts to screen size**  
✅ **Dark/light theme compatibility**  
✅ **No console errors**  
✅ **Smooth close animations**  
✅ **Proper ARIA attributes for accessibility**  

---

💡 **Pro Tip:** Use browser developer tools (F12) to check for any JavaScript errors in the console while testing!
