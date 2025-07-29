# 🔒 LTS PROTECTION - CRITICAL PWA FUNCTIONALITY

## ⚠️ **DO NOT MODIFY THESE FILES WITHOUT TESTING OFFLINE FUNCTIONALITY**

This implementation achieves **perfect PWA offline functionality** after extensive debugging.
Any changes to these files could break the core offline capabilities.

### 🚨 **PROTECTED FILES - HANDLE WITH EXTREME CARE:**

#### **Service Worker (CRITICAL)**
- `sw.js` - **Version 8** - Complete PWA implementation
- `js/pwa.js` - Service worker registration and PWA installation

#### **Core HTML Pages (PROTECTED)**
- `index.html` - Main application
- `dev.html` - Developer tools dashboard  
- `testlab.html` - Testing environment

#### **Essential JavaScript Modules (STABLE)**
- `js/main.js` - Core application logic
- `js/config.js` - Configuration management
- `js/cipher-algorithms.js` - Password generation algorithms
- `js/notifications.js` - User notifications
- `js/ui-controls.js` - UI interaction handlers
- `js/theme-manager.js` - Theme switching
- `js/version-manager.js` - Version tracking
- `js/url-handler.js` - URL routing
- `js/password-strength.js` - Password strength analysis
- `js/phrase-suggestions.js` - Phrase suggestion engine
- `js/keyboard-shortcuts.js` - Keyboard accessibility
- `js/sharing.js` - Social sharing features

#### **Critical Styling (STABLE)**
- `css/main.css` - Core application styles
- `css/themes.css` - Theme definitions
- `css/modal.css` - Modal dialogs
- `css/notifications.css` - Notification styling
- All other CSS files in `/css/`

#### **PWA Configuration (LOCKED)**
- `manifest.json` - PWA manifest
- `assets/icons/` - PWA icons

## 🧪 **TESTING REQUIREMENTS BEFORE ANY CHANGES:**

### **Mandatory Offline Test Protocol:**
1. **Start Local Server:** `python -m http.server 8000`
2. **Load App:** Visit http://localhost:8000
3. **Cache Resources:** Let service worker install completely
4. **Go Offline:** Disable network in DevTools
5. **Test Reload:** Refresh page - MUST work offline
6. **Test Navigation:** Visit `/dev.html` and `/testlab.html` - MUST work offline
7. **Test All Features:** Ensure all functionality works without network

### **Service Worker Validation:**
- Check DevTools → Application → Service Workers
- Verify "cipher-alchemist-v8" cache exists
- Confirm all resources are cached
- Test cache-first navigation strategy

## 📊 **LTS VERSION INFO:**
- **Version:** 1.0.0-LTS
- **Service Worker:** v8
- **Status:** PRODUCTION READY
- **Last Verified:** July 29, 2025
- **Offline Capability:** ✅ FULLY FUNCTIONAL

## 🔧 **SAFE MODIFICATION GUIDELINES:**

### **LOW RISK (Safe to modify):**
- Documentation files in `/docs/`
- Content within existing HTML pages (but not script references)
- CSS styling (but test thoroughly)
- Adding new features as separate modules

### **HIGH RISK (Requires full testing):**
- Any JavaScript file modifications
- Service worker changes
- PWA manifest modifications
- HTML script tag modifications

### **FORBIDDEN (Will break PWA):**
- Changing service worker registration paths
- Modifying cache resource lists without updating precache
- Removing essential JavaScript files
- Breaking module dependencies

## 🆘 **EMERGENCY RECOVERY:**

If PWA functionality breaks:
1. Check this file for protected file list
2. Restore from git history to last working commit
3. Verify service worker registration in browser DevTools
4. Run full offline test protocol
5. Contact maintainer if issues persist

---

**⚠️ REMEMBER: This is a SIDE PROJECT with LTS requirements. Stability over features!**
