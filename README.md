# cipher-alchemist
A creative and secure phrase-to-password generator that transforms text using symbolic cipher techniques. Built as a Progressive Web App (PWA) with offline support, dark/light themes, and a password strength meter.

# Password Generator

This is a Progressive Web App (PWA) for generating secure passwords from phrases. It includes features like dark/light theme toggle, copy-to-clipboard button, password strength meter, and offline support.

## Features
- **Dark/Light Theme Toggle**
- **Copy to Clipboard Button**
- **Password Strength Meter**
- **Offline Support** via Service Worker
- **Installable as a PWA**
- **PDF Download Button** for cheat sheet
- **Custom Branding** with a “Made by You” footer

## How to Deploy on GitHub Pages

1. **Extract the ZIP** file.
2. Push the contents to a GitHub repository (e.g., `password-tool`).
3. Go to **Repository Settings > Pages**.
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/root`
5. Your app will be live at:  
   `https://yourusername.github.io/password-tool/`

## How to Use a Custom Domain

1. Create a file named `CNAME` in the root of your repo.
2. Add your domain name inside it (e.g., `www.yourdomain.com`).
3. Update your domain’s DNS settings:
   - Add a **CNAME record** pointing to `yourusername.github.io`.

## License
This project is licensed under the MIT License.
