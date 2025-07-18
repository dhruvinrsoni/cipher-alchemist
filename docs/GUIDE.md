
# Cipher Alchemist - Unified Guide

## Quickstart
- Open `index.html`, enter a phrase, get a password
- Works offline, install as PWA
- Modular JS/CSS: one feature per file
- All features: keyboard accessible, screen reader support

## Main Features
- Password logic: `cipher-algorithms.js`
- Phrase suggestions: `phrase-suggestions.js`
- Keyboard shortcuts: `keyboard-shortcuts.js`
- Notifications: `notifications.js`
- Sharing: `sharing.js`
- Theme: `theme.js`
- PWA: `pwa.js`

## Configuration
- Toggle features in `js/config.js`
- Use `window.Config.isFeatureEnabled('feature')`

## Adding Features
1. Create `js/my-feature.js`
2. Add to config in `js/config.js`
3. Initialize in `js/app.js`
4. Reference in `index.html`

## FAQ
- Passwords generated locally, never sent anywhere
- Share examples: `/?phrase=YourPhrase`
- Customize: edit `css/themes.css`, `js/phrase-suggestions.js`, `index.html`
- Report bugs: GitHub issues/discussions
- No dependencies, fast, easy to maintain

## Keyboard Shortcuts
| Shortcut            | Action                        |
|---------------------|-------------------------------|
| Ctrl+Enter          | Generate password             |
| Ctrl+C              | Copy password                 |
| Ctrl+D              | Download PDF cheat sheet      |
| Ctrl+T              | Toggle theme                  |
| Ctrl+? / F1         | Open keyboard help            |
| Tab / Shift+Tab     | Navigate elements             |
| Alt+1 / Alt+2       | Toggle sections               |
| Escape              | Close modal/sections          |
| Delete              | Clear input                   |
| Ctrl+Shift+d,e,v    | Developer dashboard           |
| 5x Title Clicks     | Alt developer access          |

## Git & CI/CD
- Daily: pull, commit, push
- Emergency: commit with `[skip ci]`
- Release: tag and push
- Conflict: rebase, resolve, push
- Use feature branches for big changes
- Main branch auto-deploys to GitHub Pages

## Development & Architecture
- Modular, maintainable, robust
- Lazy loading, minimal global state
- Error handling, scalable
- Accessibility: ARIA labels, keyboard navigation

## Testing & Validation
- Loads without errors
- Features toggle and work offline
- Keyboard accessible
- Focus indicators, ARIA labels, logical tab order
- No keyboard traps, shortcuts work
- Test in multiple browsers
- Screen reader: NVDA, JAWS

## Best Practices
- Centralize config
- Use error boundaries
- Load features only if enabled
- Always support keyboard navigation

## Roadmap
- Lazy loading
- Plugin system
- Config UI
- Analytics

## For More
- [Live Demo](https://dhruvinrsoni.github.io/cipher-alchemist/)
- [Case Studies](CASE_STUDIES.md)
- [Cheat Sheet PDF](../assets/docs/cheat_sheet.pdf)
