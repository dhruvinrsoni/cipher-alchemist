# 🔄 Git Workflow & CI/CD Guide

## 🎯 **Daily Workflow**
```bash
# 1. Sync before starting
git pull origin main

# 2. Make changes and commit
git add .
git commit -m "feat: your changes here"
git push origin main
```

## 🚨 **Emergency Scenarios & `[skip ci]`**

### **What is `[skip ci]`?**
The `[skip ci]` tag tells GitHub Actions to **skip running workflows** for that specific commit. It's like telling GitHub "this commit doesn't need automated checks."

### **🚨 Emergency Use Cases**

#### **1. Broken Workflow Loop**
```bash
git commit -m "fix: broken deployment workflow [skip ci]"
```
*Use when your workflow file itself is broken and would fail*

#### **2. Infinite Loop Prevention**
```bash
git commit -m "🔄 Auto-update version to abc123 [skip ci]"
```
*Prevent automated commits from triggering more automation*

#### **3. Production Hotfix**
```bash
git commit -m "hotfix: critical security fix [skip ci]"
git push origin main
# Deploy manually after push
```
*Skip time-consuming workflows during critical outages*

### **📝 Regular Use Cases**

#### **Documentation Changes**
```bash
git commit -m "docs: update README with new features [skip ci]"
git commit -m "docs: fix typos in comments [skip ci]"
```

#### **Version Bumps**
```bash
git commit -m "🔄 Auto-update version to v1.2.3 [skip ci]"
git commit -m "chore: update dependencies [skip ci]"
```

#### **Style/Config Changes**
```bash
git commit -m "style: fix code formatting [skip ci]"
git commit -m "chore: update .gitignore [skip ci]"
```

## 🔄 **Conflict Resolution**

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

## 🏷️ **Release Management**

### **Creating a New Release**
```bash
# 1. Use GitHub Actions workflow
# Go to Actions → "🏷️ Create Tag & Release"
# Or create manually:

git tag -a v1.0.0 -m "Release v1.0.0: Major feature update"
git push origin v1.0.0
```

### **Hotfix Release**
```bash
# Quick patch without full CI
git commit -m "hotfix: critical issue [skip ci]"
git tag -a v1.0.1 -m "Hotfix v1.0.1: Emergency patch"
git push origin main v1.0.1
```

## 🤖 **CI/CD Workflow Features**

### **Automated Processes**
- ✅ **Version Updates** - Auto-generates version with IST timestamps
- ✅ **Changelog Generation** - Creates commit history documentation
- ✅ **Deployment Status** - Monitors application health
- ✅ **Release Creation** - Semantic versioning and GitHub releases
- ✅ **PWA Functionality** - Service worker and manifest updates

### **Workflow Triggers**
- **Push to main** - Triggers version update and deployment
- **Tag creation** - Triggers release creation
- **Schedule** - Health checks every 6 hours
- **Manual** - Can be triggered manually via Actions tab

## 💡 **Best Practices**

### **✅ DO**
- Use `[skip ci]` for documentation-only changes
- Use descriptive commit messages
- Test locally before pushing
- Use `[skip ci]` for automated version updates
- Create meaningful release notes

### **❌ DON'T**
- Use `[skip ci]` for code changes that need testing
- Skip CI for security-related changes (unless emergency)
- Force push to main branch
- Create releases without testing

## 🔧 **Troubleshooting**

### **Workflow Failed**
```bash
# Check workflow logs in GitHub Actions
# Fix the issue and commit with [skip ci] if needed
git commit -m "fix: workflow configuration [skip ci]"
```

### **Version Conflicts**
```bash
# If automated version updates conflict
git pull --rebase origin main
# Resolve conflicts in version.txt
git add version.txt
git rebase --continue
git push origin main
```

### **Emergency Deployment**
```bash
# When you need to deploy immediately
git commit -m "emergency: critical fix [skip ci]"
git push origin main
# Then manually trigger deployment via Actions
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