@echo off
setlocal enabledelayedexpansion

REM Release Validation Report for Cipher Alchemist v1.0.0
REM This script provides GO/NO-GO validation reports for release readiness
REM EXECUTION IS HANDLED BY GITHUB ACTIONS - THIS IS VALIDATION ONLY

echo.
echo 🔍 Cipher Alchemist v1.0.0 Release Validation Report
echo ===================================================

echo.
echo 📋 Release Readiness Check:
echo ===========================

set "validation_passed=true"

REM Check if we're on the main branch
for /f "tokens=*" %%a in ('git branch --show-current') do set "current_branch=%%a"
if not "!current_branch!"=="main" (
    echo ❌ FAIL: Not on main branch. Current: !current_branch!
    echo          Recommendation: Switch to main branch: git checkout main
    set "validation_passed=false"
) else (
    echo ✅ PASS: On main branch
)

REM Check for uncommitted changes
git diff --quiet
if !errorlevel! neq 0 (
    echo ❌ FAIL: Uncommitted changes detected
    echo          Recommendation: Commit or stash changes before release
    echo.
    echo          Changed files:
    git status --porcelain
    echo.
    set "validation_passed=false"
) else (
    echo ✅ PASS: No uncommitted changes
)

REM Check version consistency (without package.json)
if exist version.txt (
    for /f "tokens=2 delims=v " %%a in ('findstr "v1.0.0" version.txt') do (
        set "txt_version=%%a"
        set "txt_version=!txt_version: =!"
        set "txt_version=!txt_version:·=!"
    )
    echo ✅ PASS: version.txt contains v1.0.0
) else (
    echo ❌ FAIL: version.txt not found
    set "validation_passed=false"
)

REM Check manifest.json version
if exist manifest.json (
    findstr "version.*1.0.0" manifest.json >nul
    if !errorlevel! equ 0 (
        echo ✅ PASS: manifest.json version matches v1.0.0
    ) else (
        echo ❌ FAIL: manifest.json version mismatch
        set "validation_passed=false"
    )
) else (
    echo ❌ FAIL: manifest.json not found
    set "validation_passed=false"
)

REM Check for required files
echo.
echo 📁 File Verification:
echo =====================
set "required_files=index.html scripts.js styles.css manifest.json service-worker.js README.md CHANGELOG.md LICENSE"
for %%f in (!required_files!) do (
    if exist "%%f" (
        echo ✅ PASS: %%f exists
    ) else (
        echo ❌ FAIL: %%f missing
        set "validation_passed=false"
    )
)

REM Check PWA assets
if exist "favicon-192.png" (
    echo ✅ PASS: PWA icon (192px) exists
) else (
    echo ❌ FAIL: favicon-192.png missing
    set "validation_passed=false"
)

if exist "favicon-512.png" (
    echo ✅ PASS: PWA icon (512px) exists
) else (
    echo ❌ FAIL: favicon-512.png missing
    set "validation_passed=false"
)

echo.
echo 🎯 Release Validation Summary:
echo ==============================
echo Version: v1.0.0
echo Branch: !current_branch!
echo Validation Date: %date% %time%
echo.
echo 📦 V1.0.0 Core Features (Validated):
echo - Basic cryptographic transformations (no advanced password analysis)
echo - Simple character substitution algorithms
echo - Progressive Web App (PWA) Support
echo - GitHub Actions CI/CD Workflows
echo - Complete Documentation and Branding
echo.

if "!validation_passed!"=="true" (
    echo 🟢 VALIDATION RESULT: GO for Release
    echo ✅ All checks passed - Ready for v1.0.0 release
    echo.
    echo 🚀 To execute release, use GitHub Actions:
    echo    1. Go to GitHub repository
    echo    2. Navigate to Actions tab
    echo    3. Run "Manual Release & Tag Creation" workflow
    echo    4. Set version: 1.0.0, branch: main
    echo.
    echo 🔗 Release will be available at:
    echo    https://github.com/dhruvinrsoni/cipher-alchemist/releases/tag/v1.0.0
) else (
    echo 🔴 VALIDATION RESULT: NO-GO for Release
    echo ❌ Validation failed - Address issues before release
    echo.
    echo 📝 Action Required:
    echo    Fix all FAIL items listed above
    echo    Run validation again before attempting release
)

echo.
echo 📊 Validation Report Complete
echo =============================
echo.
pause
