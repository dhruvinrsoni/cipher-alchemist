# 🧑‍💻 Copilot Instructions for Cipher Alchemist

# Copilot Instructions (Minimalist Edition)

## Project Overview
Cipher Alchemist is a modular, mobile-first PWA for secure phrase-to-password generation. Built with vanilla HTML, CSS, and JS (ES6+). No external dependencies.

## Coding Guidelines for AI Agents
- Keep code minimal, clean, and comment-free
- Use modular JS: one feature per file in `js/`
- Do not cross-import modules unless strictly necessary
- All UI features must be keyboard accessible
- No frameworks, build tools, or npm packages
- Do not add comments anywhere (JS, HTML, CSS)
- Only share phrases (never passwords) via UI/social features
- Keep documentation concise and easy to navigate

## Developer Workflow
- Open `index.html` for instant preview
- For network/PWA: `python -m http.server 8000` or `npx live-server --port=8000`
- Manual testing for accessibility and PWA features
- Deploy via GitHub Pages from `main` branch

## Integration Points
- Service Worker (`sw.js`): caching, offline, updates
- Manifest (`manifest.json`): PWA config
- PDF Cheat Sheet: `assets/docs/cheat_sheet.pdf`
- Icons: `assets/icons/`

## Example Patterns
- Keyboard shortcuts: `js/keyboard-shortcuts.js`
- Phrase suggestions: `js/phrase-suggestions.js`
- Notifications: `js/notifications.js`

## References
- See `docs/README.md` for full feature list and developer quickstart.
- See `docs/DEVELOPMENT.md` for technical documentation and contribution guidelines.

---

**If unclear about a pattern, check the corresponding JS module or ask for clarification.**
