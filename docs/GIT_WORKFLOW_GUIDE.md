
# Git & CI/CD Quick Guide

## Daily
git pull origin main
git add .
git commit -m "your change"
git push origin main

## Emergency
git commit -m "hotfix: urgent fix [skip ci]"
git push origin main

## Release
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0

## Conflict
git pull --rebase origin main
# resolve conflicts
git add .
git rebase --continue
git push origin main

## Best Practices
- Use `[skip ci]` for docs/auto commits
- Test before push
- Use feature branches for big changes

## Troubleshooting
- Check GitHub Actions logs
- Fix, commit with `[skip ci]` if needed

## Main branch auto-deploys to GitHub Pages
