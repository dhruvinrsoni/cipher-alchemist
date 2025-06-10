# cipher## Features
- Convert phrases into strong, memorable passwords
- Symbolic substitutions for enhanced security
- **💡 Phrase Suggestions** - Inspirational examples to get you started
- **🛡️ Real-time Password Strength Analysis** - Advanced security scoring
- **⌨️ Full Keyboard Accessibility** - Navigate and control everything via keyboard (press `Ctrl+?` for help)
- **Dark/Light Theme Toggle**
- **Copy to Clipboard Button**
- **PDF Download Button** for cheat sheet
- **Offline Support** via Service Worker
- **Installable as a PWA**
- **Custom Branding** with a "Made by You" footer
A creative and secure phrase-to-password generator that transforms text using symbolic cipher techniques. Built as a Progressive Web App (PWA) with offline support, dark/light themes, and a password strength meter.


# Cipher Alchemist

This is a Progressive Web App (PWA) for generating secure passwords from phrases. It includes features like dark/light theme toggle, copy-to-clipboard button, password strength meter, and offline support.

## Features
- Convert phrases into strong, memorable passwords
- Symbolic substitutions for enhanced security
- **Dark/Light Theme Toggle**
- **Copy to Clipboard Button**
- **Password Strength Meter**
- **Offline Support** via Service Worker
- **Installable as a PWA**
- **PDF Download Button** for cheat sheet
- **Custom Branding** with a “Made by You” footer

## Deployment
1. Create a new GitHub repository named `cipher-alchemist`.
2. Upload the contents of this project to the repository.
3. Go to **Settings > Pages**.
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/root`
5. Your app will be live at: `https://dhruvinrsoni.github.io/cipher-alchemist/`

## How to Deploy on GitHub Pages

1. **Extract the ZIP** file.
2. Push the contents to a GitHub repository (e.g., `cipher-alchemist`).
3. Go to **Repository Settings > Pages**.
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/root`
5. Your app will be live at:  
   `https://dhruvinrsoni.github.io/cipher-alchemist/`

## How to Use a Custom Domain

1. Create a file named `CNAME` in the root of your repo.
2. Add your domain name inside it (e.g., `www.yourdomain.com`).
3. Update your domain’s DNS settings:
   - Add a **CNAME record** pointing to `dhruvinrsoni.github.io`.

## 📋 CURRENT PROJECT STATUS:

Your Cipher Alchemist PWA is now fully optimized with:

- 📦 **Modular Architecture** - Clean, maintainable codebase split into feature-based modules
- 🎨 **Theme System** - Working dark/light toggle in top-right corner with responsive positioning
- 💡 **Phrase Suggestions** - 48 inspirational phrases across 12 balanced groups (4 phrases each)
- 🛡️ **Advanced Password Strength Meter** - Real-time analysis with circular progress and detailed criteria
- 📱 **Mobile Responsive** - Fixed textarea overflow and button positioning issues
- 🔍 **SEO Optimized** - Comprehensive meta tags for social sharing and search engines
- ⚡ **PWA Ready** - Fixed manifest.json for proper Progressive Web App installation
- 📝 **Professional Changelog** - Clean, properly formatted changelog with commit history
- 🛠️ **Service Worker** - Offline support with proper caching for GitHub Pages
- 🔗 **Footer** - Static attribution with dynamic version display and GitHub links

## GitHub Workflow

### 📋 What the Workflow Now Does:

- Triggers on every push to the main branch
- Generates Version with commit hash and IST timezone timestamp
- Creates Simple CHANGELOG with last 50 commits as bullet points
- Auto-commits both version.txt and CHANGELOG.md files back to the repository

### ✨ Workflow Features:

- ✅ IST Timezone - Uses Asia/Kolkata timezone for timestamps
- ✅ Skip CI Logic - Excludes commits with [skip ci] tag to prevent loops
- ✅ Clean Changelog - Simple bullet-point format for easy reading
- ✅ Error Handling - Won't fail if there are no changes to commit
- ✅ Valid YAML - No syntax errors, properly formatted

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
