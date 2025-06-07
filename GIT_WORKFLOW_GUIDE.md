# 🔄 Git Workflow Guide - Cipher Alchemist

## 🎯 **Quick Reference Card**

### **Daily Workflow (Recommended)**
```bash
# 1. Start your work session
git pull origin main

# 2. Make your changes
# Edit files, test, etc.

# 3. Commit and push
git add .
git commit -m "feat: your changes here"
git push origin main
```

### **Emergency Commands**
```bash
# Skip CI/CD workflows
git commit -m "emergency fix [skip ci]"

# Resolve conflicts quickly
git pull --rebase origin main
```

---

## 🚨 **Conflict Resolution Guide**

### **Scenario 1: Branches Have Diverged**

**When you see:**
```
! [rejected] main -> main (non-fast-forward)
error: failed to push some refs to 'origin'
hint: Updates were rejected because the tip of your current branch is behind
```

**Solution:**
```bash
# Step 1: Fetch latest changes and rebase
git pull --rebase origin main

# Step 2: If conflicts appear, resolve them
# Edit conflicted files (marked with <<<<<<< ======= >>>>>>>)

# Step 3: Continue rebase
git add .
git rebase --continue

# Step 4: Push your changes
git push origin main
```

### **Scenario 2: Merge Conflicts During Rebase**

**What you'll see:**
```
Auto-merging version.txt
CONFLICT (content): Merge conflict in version.txt
Automatic merge failed; fix conflicts and then commit the result.
```

**Resolution Steps:**

#### **Option A: Auto-Resolve (Recommended for version.txt)**
```bash
# For version.txt conflicts, take the remote version
git checkout --theirs version.txt
git add version.txt
git rebase --continue
```

#### **Option B: Manual Resolution**
```bash
# 1. Open conflicted file in your editor
# Look for conflict markers:
# <<<<<<< HEAD (your changes)
# Your content here
# =======
# Remote content here  
# >>>>>>> commit-hash (remote changes)

# 2. Choose which version to keep or merge both
# Remove conflict markers (<<<<<<< ======= >>>>>>>)

# 3. Stage resolved file
git add filename.txt

# 4. Continue rebase
git rebase --continue
```

### **Scenario 3: Abort and Try Different Approach**

```bash
# If rebase gets too complicated, abort and try merge
git rebase --abort

# Try regular merge instead
git pull origin main

# Resolve conflicts and commit
git add .
git commit -m "resolve merge conflicts"
git push origin main
```

---

## 🚀 **Emergency Procedures**

### **Emergency Fix (Skip All Automation)**

**When to use:** Critical bugs, security fixes, urgent documentation updates

```bash
# Method 1: Skip CI flag in commit message
git add .
git commit -m "emergency: fix critical security issue [skip ci]"
git push origin main

# Method 2: Skip CI flag variations
git commit -m "hotfix: urgent patch [ci skip]"
git commit -m "docs: critical update [skip ci]"
```

**What happens:**
- ✅ Your changes are pushed immediately
- ⏭️ Auto version update is skipped
- 🚫 No workflow triggers
- 🌐 GitHub Pages may need manual deployment

### **Force Push (Nuclear Option)**

**⚠️ DANGER: Only use when absolutely necessary**

```bash
# Save your work first
git stash

# Reset to remote state
git reset --hard origin/main

# Re-apply your changes
git stash pop

# Make your emergency commit
git add .
git commit -m "emergency: restore critical changes [skip ci]"
git push origin main
```

---

## 🛠️ **Advanced Conflict Resolution**

### **Visual Conflict Resolution Tools**

#### **VS Code (Recommended)**
```bash
# Open VS Code with conflict resolution UI
code .

# VS Code will show:
# - "Accept Current Change" (your version)
# - "Accept Incoming Change" (remote version)
# - "Accept Both Changes" (merge both)
# - "Compare Changes" (side-by-side view)
```

#### **Git Built-in Merge Tool**
```bash
# Configure merge tool (one-time setup)
git config --global merge.tool vimdiff

# Use merge tool for conflicts
git mergetool
```

### **Understanding Conflict Markers**

```
<<<<<<< HEAD
Your local changes here
This is what you committed locally
=======
Remote changes here  
This is what was changed on remote (GitHub Actions)
>>>>>>> commit-hash
```

**Resolution strategy:**
- **For application code:** Usually keep your changes
- **For version.txt:** Usually take remote changes (GitHub Actions)
- **For documentation:** Merge both if possible

---

## 📊 **Workflow Integration**

### **How Our Enhanced Workflow Helps**

#### **Automatic Conflict Prevention**
```yaml
# Workflow detects conflicts and skips updates
if [[ "$conflict_risk" == "true" ]]; then
  echo "⚠️ Skipping to prevent merge conflicts"
  exit 0
fi
```

#### **Smart Retry Logic**
```yaml
# Workflow tries multiple approaches
for attempt in {1..3}; do
  if git push origin main; then
    break
  else
    git fetch origin main
    git rebase origin/main  # Auto-sync
  fi
done
```

### **Workflow Status Messages**

**When workflow detects conflicts:**
```
⏭️ Version update skipped
📋 Reason: Conflict risk detected - remote ahead by 2 commits

🔧 For developers:
   • Run 'git pull origin main' before your next commit
   • This ensures your local branch is synchronized
   • Prevents merge conflicts on future pushes
```

---

## 🔍 **Troubleshooting Common Issues**

### **Issue 1: "Nothing to commit, working tree clean"**

**Cause:** You forgot to stage your changes

**Solution:**
```bash
git add .
git commit -m "your commit message"
```

### **Issue 2: "Your branch is ahead of origin/main by X commits"**

**Cause:** You have local commits not pushed yet

**Solution:**
```bash
git push origin main
```

### **Issue 3: "Your branch is behind origin/main by X commits"**

**Cause:** Remote has changes you don't have locally

**Solution:**
```bash
git pull origin main
```

### **Issue 4: Continuous Rebase Conflicts**

**Cause:** Complex overlapping changes

**Solution:**
```bash
# Abort rebase and use merge strategy
git rebase --abort
git pull origin main  # This will create a merge commit
```

---

## 🎯 **Best Practices**

### **Daily Development**
1. **Start with sync:** `git pull origin main`
2. **Commit frequently:** Small, focused commits
3. **Use descriptive messages:** Clear what you changed
4. **Push regularly:** Don't accumulate too many local commits

### **Commit Message Conventions**
```bash
# Good commit messages
git commit -m "feat: add new cipher algorithm"
git commit -m "fix: resolve input validation bug"
git commit -m "docs: update installation guide"
git commit -m "style: improve button spacing"

# Emergency flags
git commit -m "hotfix: critical security patch [skip ci]"
git commit -m "emergency: fix broken deployment [ci skip]"
```

### **Conflict Prevention**
1. **Pull before coding:** Always sync before starting work
2. **Small commits:** Easier to resolve conflicts
3. **Coordinate with team:** Communicate major changes
4. **Use feature branches:** For experimental work

---

## 🚀 **Automated Helpers**

### **Git Aliases (Optional Setup)**

Add to your `~/.gitconfig`:
```ini
[alias]
    sync = "!f() { git fetch origin main && git rebase origin/main; }; f"
    emergency = "!f() { git add . && git commit -m \"emergency: $1 [skip ci]\" && git push origin main; }; f"
    quick = "!f() { git add . && git commit -m \"$1\" && git push origin main; }; f"
    conflicted = "!git diff --name-only --diff-filter=U"
```

**Usage:**
```bash
git sync                    # Quick sync with remote
git emergency "fix login"   # Emergency push with skip CI
git quick "update docs"     # Quick commit and push
git conflicted              # Show conflicted files
```

### **VS Code Extensions (Recommended)**
- **GitLens** - Enhanced Git visualization
- **Git Graph** - Visual branch and merge history
- **Merge Conflict** - Better conflict resolution UI

---

## 📞 **Quick Help**

### **Emergency Contact Card**
```bash
# 🚨 EMERGENCY COMMANDS (copy-paste ready)

# Resolve conflicts quickly:
git pull --rebase origin main
# (resolve conflicts in editor)
git add .
git rebase --continue

# Emergency push (skip automation):
git commit -m "emergency fix [skip ci]"
git push origin main

# Nuclear option (start over):
git stash
git reset --hard origin/main
git stash pop

# Get help:
git status          # See current state
git log --oneline   # See recent commits
git diff            # See current changes
```

---

**🔮 Remember:** When in doubt, the enhanced workflow will guide you with clear messages about what to do next!