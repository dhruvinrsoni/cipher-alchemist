# 🔧 Git Conflict Resolution - Quick Reference

## 🚨 **Emergency Commands**

```bash
# Quick conflict resolution
git pull --rebase origin main
git add .
git rebase --continue

# Skip all automation  
git commit -m "emergency fix [skip ci]"
git push origin main
```

---

## 🎯 **Common Scenarios**

### **Scenario A: Simple Divergence**
```
Your branch and 'origin/main' have diverged,
and have 1 and 1 different commits each
```

**Solution:**
```bash
git pull --rebase origin main
git push origin main
```

### **Scenario B: Merge Conflicts**
```
CONFLICT (content): Merge conflict in version.txt
```

**For version.txt (recommended):**
```bash
git checkout --theirs version.txt
git add version.txt
git rebase --continue
```

**For your code files:**
```bash
# Edit file to resolve conflicts
# Remove <<<<<<< ======= >>>>>>> markers
git add filename.js
git rebase --continue
```

### **Scenario C: Too Many Conflicts**
```bash
# Abort and use merge instead
git rebase --abort
git pull origin main
# Resolve conflicts and commit
git add .
git commit -m "resolve merge conflicts"
git push origin main
```

---

## 🛡️ **Prevention Tips**

1. **Always start with:** `git pull origin main`
2. **Commit frequently:** Don't let changes pile up
3. **Use skip flags:** `[skip ci]` for urgent fixes
4. **Monitor workflow:** Check GitHub Actions status

---

## 📱 **VS Code Quick Actions**

When conflicts appear in VS Code:
- **Accept Current Change** → Keep your version
- **Accept Incoming Change** → Keep remote version  
- **Accept Both Changes** → Merge both versions
- **Compare Changes** → Side-by-side comparison

---

## 🔄 **Workflow Integration**

Our enhanced workflow will show:
```
⚠️ Skipping to prevent merge conflicts

🔧 For developers:
   • Run 'git pull origin main' before your next commit
   • This ensures your local branch is synchronized
```

**Follow this guidance to stay conflict-free!**