# 🔒 LTS Branch Protection

## WARNING: Long Term Support Release

This branch contains the **STABLE LTS VERSION** of Cipher Alchemist.

### ⚠️ CRITICAL RULES:

1. **NO DIRECT COMMITS** to this branch without LTS testing
2. **MANDATORY OFFLINE TESTING** before any merge
3. **SERVICE WORKER CHANGES** require extensive validation
4. **BREAKING CHANGES** are forbidden in LTS

### 🧪 Required Testing Before Any Changes:

```bash
# 1. Start local server
python -m http.server 8000

# 2. Test online functionality
# Visit http://localhost:8000
# Test all pages: index.html, dev.html, testlab.html

# 3. Test offline functionality
# Go offline in DevTools
# Reload all pages - MUST work
# Test all features offline

# 4. Test PWA installation
# Install as PWA
# Test offline in installed mode
```

### 📋 LTS Checklist:

- [ ] Service worker registration working
- [ ] All pages cache and load offline
- [ ] PWA installation working
- [ ] No console errors
- [ ] All features functional offline
- [ ] Performance maintained

### 🆘 Emergency Contacts:

If LTS functionality breaks:
1. Immediately revert to last working commit
2. Check `LTS_PROTECTION.md` for recovery steps
3. Run full testing protocol
4. Document issue and resolution

---

**This is a PRODUCTION RELEASE - Handle with extreme care** 🛡️
