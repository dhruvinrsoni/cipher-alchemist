# 🔄 Git Workflow - Quick Guide

## 🎯 **Daily Workflow**
```bash
# 1. Sync before starting
git pull origin main

# 2. Make changes and commit
git add .
git commit -m "feat: your changes here"
git push origin main
```

## 🚨 **Conflict Resolution**

### **When Push is Rejected**
```bash
# Step 1: Pull with rebase
git pull --rebase origin main

# Step 2: If conflicts, resolve them in your editor
# Look for <<<<<<< ======= >>>>>>> markers

# Step 3: Continue
git add .
git rebase --continue

# Step 4: Push
git push origin main
```

### **Emergency Commands**
```bash
# Skip all automation
git commit -m "emergency fix [skip ci]"

# Quick conflict resolution
git pull --rebase origin main
git add .
git rebase --continue

# Nuclear option (start over)
git stash
git reset --hard origin/main
git stash pop
```

## 🚀 **Release Process**

### **Create New Release**
1. Go to GitHub Actions → "🏷️ Create Tag & Release"
2. Fill in version (e.g., 1.2.0) 
3. Select release type
4. Workflow automatically updates all files

### **What Gets Updated Automatically**
- ✅ `version.txt` with timestamp
- ✅ `RELEASES.md` with release notes
- ✅ `manifest.json` version
- ✅ Creates Git tag and GitHub release

## 📋 **Quick Commands**
```bash
git status              # Check current state
git log --oneline -5    # Recent commits
git diff                # Current changes
```