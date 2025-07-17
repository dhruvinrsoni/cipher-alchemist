# 🔮 Cipher Alchemist

>### **Progressive Web App**
- **📱 Mobile-First Design** - Responsive across all devices
- **⚡ Offline Support** - Works without internet connection
- **🏠 One-Click Install** - Smart install button appears when available
- **🔄 Auto-Updates** - Background service worker updates
- **📲 Cross-Platform** - Install on mobile, desktop, and tabletsmodern, secure phrase-to-password generator that transforms memorable text into strong passwords using symbolic cipher techniques.**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Available-success)](https://dhruvinrsoni.github.io/cipher-alchemist/)
[![PWA Ready](https://img.shields.io/badge/📱_PWA-Ready-blue)](https://dhruvinrsoni.github.io/cipher-alchemist/)
[![Offline Support](https://img.shields.io/badge/⚡_Offline-Supported-orange)](https://dhruvinrsoni.github.io/cipher-alchemist/)
[![Keyboard Accessible](https://img.shields.io/badge/⌨️_Keyboard-Accessible-green)](https://dhruvinrsoni.github.io/cipher-alchemist/)

---

## ✨ Key Features

### 🔐 **Password Generation**
- **Phrase-to-Password Conversion** - Transform memorable phrases into secure passwords
- **Advanced Cipher Algorithms** - Multiple symbolic substitution methods
- **Real-time Strength Analysis** - Comprehensive security scoring with visual feedback
- **Customizable Rules** - Flexible transformation options

### 🎨 **User Experience**
- **⌨️ Full Keyboard Accessibility** - Navigate everything via keyboard (press `Ctrl+?` for shortcuts)
- **🌙 Dark/Light Theme Toggle** - Automatic system preference detection
- **💡 Smart Phrase Suggestions** - 48+ inspirational phrases across 12 themed categories
- ** Mobile-First Design** - Responsive across all devices
- **⚡ Offline Support** - Works without internet connection
- **🏠 Installable** - Add to home screen on mobile/desktop
- **🔄 Auto-Updates** - Background service worker updates

---
## 🚀 Quick Start

### **Option 1: Use Online (Recommended)**
Visit **[https://dhruvinrsoni.github.io/cipher-alchemist/](https://dhruvinrsoni.github.io/cipher-alchemist/)** - No installation required!
3. Click the install button and confirm
4. The app will be added to your device as a standalone application

#### **Quick Start**
```
#### **🌐 Serve on Local Network (WiFi Access)**

**Option A: Python HTTP Server** *(Recommended - Built into most systems)*
```bash
# Python 3 (most common)
python -m http.server 8000 --bind 0.0.0.0

# Python 2 (if needed)
python -m SimpleHTTPServer 8000

# Then access from any device on your network:
# http://YOUR_LOCAL_IP:8000
# Example: http://192.168.1.100:8000
**Option B: Node.js/npm Servers** *(Shows network info automatically)*
```bash
# Using npx (no installation needed)
npx http-server -p 8000 -a 0.0.0.0

# Using live-server (auto-reload + network info)
npx live-server --port=8000 --host=0.0.0.0

# Using serve (simple and fast)
npx serve -l 8000 -n
```

**🔍 Find Your Local IP Address:**
```bash
# Windows
ipconfig | findstr "IPv4"

# macOS/Linux
ifconfig | grep "inet " | grep -v 127.0.0.1

# Or use Node.js to auto-detect and display
npx live-server --port=8000 --host=0.0.0.0 --open=false
```

**📱 Access from Mobile/Tablet:**
1. Make sure both devices are on the same WiFi network
2. Start the server using any command above
3. Note the IP address shown (e.g., `192.168.1.100:8000`)
4. Open that URL on your mobile device's browser
5. **Bonus**: Add to home screen for PWA experience!

**🚀 Pro Tips:**
- Use `live-server` for **auto-reload** during development
- Use `http-server` for **simple serving** without reload
- Use Python server if you don't have Node.js installed
- **Port 8000** is recommended (easy to remember)

---

## 👨‍💻 Developer TL;DR

**Want to test on your phone/tablet? Quick network setup:**

```bash
# Clone and serve on WiFi network
git clone https://github.com/dhruvinrsoni/cipher-alchemist.git
cd cipher-alchemist

# One-liner for network access:
python -m http.server 8000 --bind 0.0.0.0
# or
npx live-server --port=8000 --host=0.0.0.0

# Find your IP: 
ipconfig | findstr "IPv4"  # Windows
ifconfig | grep "inet "    # macOS/Linux



## 📖 How It Works

1. **Enter a Phrase** - Type a memorable phrase (e.g., "I love coffee in the morning")
2. **Choose Algorithm** - Select from multiple cipher transformation methods
3. **Generate Password** - Watch as your phrase becomes a secure password
4. **Copy & Use** - One-click copy to use anywhere

### 🔑 **Example Transformation**
```
Input:  "I love coffee in the morning"
Output: "1 10\/e (0phphee !|\| +#e /\/\0r|\|!|\|9"
```

### 🔗 **Direct Link Examples**
Try these examples instantly with URL parameters:

*Format: `https://dhruvinrsoni.github.io/cipher-alchemist/?phrase=YourPhrase`*


## 🎯 Use Cases



## 📺 Tutorial Videos

**Video tutorials are currently in production!** 

👉 **[View Complete Tutorial Guide](TUTORIALS.md)** - Comprehensive video series covering everything from basic usage to advanced development.

**Coming Soon:**

> ⭐ **Star this repository** to get notified when videos are released!


## 🛠️ For Developers

### **Technology Stack**

### **Key Documentation**

### **Project Structure**
```
cipher-alchemist/
├── index.html              # Main application
├── css/                    # Modular stylesheets
├── js/                     # Feature-based JavaScript modules
├── assets/                 # Icons, PDFs, static resources
├── docs/                   # Comprehensive documentation
└── .github/workflows/      # CI/CD automation
```


## 🚀 Deployment

### **GitHub Pages (Recommended)**

1. **Fork this repository**
2. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Source: Deploy from branch `main`
   - Folder: `/ (root)`
3. **Your app will be live at**: `https://yourusername.github.io/cipher-alchemist/`

### **Custom Domain Setup**
1. Create `CNAME` file in repository root
2. Add your domain: `www.yourdomain.com`
3. Configure DNS: CNAME record pointing to `yourusername.github.io`


## 🤝 Contributing

We welcome contributions! Please see our [Development Guide](DEVELOPMENT.md) for:

### **Quick Contribution Steps**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes following our coding standards
4. Test thoroughly (especially keyboard accessibility)
5. Submit a pull request


## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](../LICENSE) file for details.


## 🌟 Support



<div align="center">

**Made with ❤️ for secure, accessible password generation**

[Live Demo](https://dhruvinrsoni.github.io/cipher-alchemist/) • [Documentation](DEVELOPMENT.md) • [Contributing](DEVELOPMENT.md#contributing)

</div>


## 🧪 Secret Developer Access

Cipher Alchemist includes a hidden developer dashboard for advanced testing and diagnostics.

**How to access:**

**What you get:**

_This feature is only available in local/development mode or via a special overlay in production._
