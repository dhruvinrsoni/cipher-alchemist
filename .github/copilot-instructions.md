# 🧑‍💻 Copilot Instructions for Cipher Alchemist

## Project Overview
Cipher Alchemist is a modular, mobile-first Progressive Web App (PWA) for secure phrase-to-password generation. It uses vanilla HTML, CSS, and JavaScript (ES6+), with no external dependencies. The architecture is component-based, with each feature in its own JS module under `js/` and styles in `css/`.

## Key Architectural Patterns
- **Feature Modules:** Each major feature (cipher algorithms, keyboard shortcuts, notifications, sharing, etc.) is implemented in a separate JS file in `js/`. Example: `js/cipher-algorithms.js`, `js/keyboard-shortcuts.js`.
- **Service Worker:** Offline support and auto-updates are handled by `sw.js` at the project root.
- **Manifest:** PWA configuration is in `manifest.json`.
- **UI/UX:** Accessibility and keyboard navigation are first-class; modals and shortcuts are managed in dedicated modules.
- **No Frameworks:** All logic is vanilla JS; avoid introducing frameworks or build tools.

## Developer Workflows
- **Local Development:**
  - Open `index.html` directly in your browser for instant preview.
  - For network testing, serve with Python (`python -m http.server 8000 --bind 0.0.0.0`) or Node (`npx live-server --port=8000 --host=0.0.0.0`).
- **Testing:**
  - Manual testing is standard; keyboard accessibility and PWA features should be verified in-browser.
  - Developer dashboard is accessible via `Ctrl+Shift+D+E+V` or 5 rapid clicks on the app title (local/dev mode only).
- **Deployment:**
  - Deploy via GitHub Pages from the `main` branch root.
  - Custom domains use a `CNAME` file.

## Project-Specific Conventions
- **No Comments:** Codebase is kept comment-free for clarity and minimalism.
- **Modular Structure:** JS modules should not cross-import unless strictly necessary; keep logic isolated per feature.
- **Accessibility:** All UI features must be keyboard accessible; test with `Ctrl+?` for shortcuts.
- **Sharing:** Only phrases (never passwords) are shared via UI or social features.
- **No External Dependencies:** Do not add npm packages, libraries, or build steps.

## Integration Points
- **Service Worker (`sw.js`):** Handles caching, offline, and update logic. Must be registered in main JS entry.
- **Manifest (`manifest.json`):** Controls installability and PWA metadata.
- **PDF Cheat Sheet:** Downloadable from `assets/docs/cheat_sheet.pdf`.
- **Icons:** Located in `assets/icons/` for PWA and UI use.

## Example Patterns
- **Keyboard Shortcuts:** Managed in `js/keyboard-shortcuts.js`, with modal logic and focus trap for accessibility.
- **Phrase Suggestions:** Provided in `js/phrase-suggestions.js` and surfaced in the UI.
- **Notifications:** Use `js/notifications.js` for all user feedback.

## References
- See `docs/README.md` for full feature list and developer quickstart.
- See `docs/DEVELOPMENT.md` for technical documentation and contribution guidelines.

---

**If unclear about a pattern, check the corresponding JS module or ask for clarification.**
