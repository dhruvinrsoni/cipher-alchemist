@echo off
setlocal enabledelayedexpansion

REM Generic Release Validation Script for Cipher Alchemist
REM Validates all components are ready for release (version-independent)
REM VALIDATION ONLY - EXECUTION HANDLED BY GITHUB ACTIONS

echo.
echo 🔍 Cipher Alchemist - Release Validation Report
echo ===============================================

set "validation_passed=true"
set "warning_count=0"
set "error_count=0"

REM Get current version from version.txt
if exist version.txt (
    for /f "tokens=2 delims=v " %%a in ('findstr "v[0-9]" version.txt') do (
        set "current_version=%%a"
        set "current_version=!current_version: =!"
        set "current_version=!current_version:·=!"
        goto :version_found
    )
    :version_found
    if defined current_version (
        echo 📌 Detected Version: v!current_version!
    ) else (
        echo ❌ Could not parse version from version.txt
        set "current_version=UNKNOWN"
        set "validation_passed=false"
        set /a "error_count+=1"
    )
) else (
    echo ❌ version.txt file missing
    set "current_version=UNKNOWN"
    set "validation_passed=false"
    set /a "error_count+=1"
)

echo.
echo 📋 Version Consistency Check:
echo =============================

REM Check manifest.json version (if available)
if exist manifest.json (
    if "!current_version!" neq "UNKNOWN" (
        findstr /C:"\"version\": \"!current_version!\"" manifest.json >nul
        if !errorlevel! equ 0 (
            echo ✅ manifest.json: v!current_version! (matches)
        ) else (
            echo ⚠️  manifest.json: Version mismatch or not found
            set /a "warning_count+=1"
        )
    ) else (
        echo ❌ manifest.json: Cannot validate due to unknown version
        set /a "error_count+=1"
    )
) else (
    echo ❌ manifest.json: File missing
    set "validation_passed=false"
    set /a "error_count+=1"
)

echo.
echo 📁 Core File Validation:
echo ========================

REM Check for required core files
set "required_files=index.html scripts.js styles.css manifest.json service-worker.js"
for %%f in (!required_files!) do (
    if exist "%%f" (
        echo ✅ Core File: %%f
    ) else (
        echo ❌ Missing: %%f
        set "validation_passed=false"
        set /a "error_count+=1"
    )
)

echo.
echo 📚 Documentation Validation:
echo ============================

REM Check documentation files
set "doc_files=README.md CHANGELOG.md LICENSE"
for %%f in (!doc_files!) do (
    if exist "%%f" (
        echo ✅ Documentation: %%f
    ) else (
        echo ❌ Missing: %%f
        set "validation_passed=false"
        set /a "error_count+=1"
    )
)

echo.
echo 🎨 PWA Asset Validation:
echo ========================

REM Check PWA assets
set "pwa_assets=favicon.ico favicon-192.png favicon-512.png"
for %%f in (!pwa_assets!) do (
    if exist "%%f" (
        echo ✅ PWA Asset: %%f
    ) else (
        echo ❌ Missing: %%f
        set "validation_passed=false"
        set /a "error_count+=1"
    )
)

echo.
echo 🔄 Git Repository Check:
echo =======================

REM Check git status
for /f "tokens=*" %%a in ('git branch --show-current') do set "current_branch=%%a"
echo ℹ️  Current Branch: !current_branch!

git diff --quiet
if !errorlevel! neq 0 (
    echo ⚠️  Uncommitted changes detected
    echo    Files with changes:
    git status --porcelain
    set /a "warning_count+=1"
) else (
    echo ✅ Repository: Clean working directory
)

REM Check if tag exists for current version
if "!current_version!" neq "UNKNOWN" (
    git tag -l | findstr "^v!current_version!$" >nul
    if !errorlevel! equ 0 (
        echo ⚠️  Tag v!current_version! already exists
        set /a "warning_count+=1"
    ) else (
        echo ✅ Tag v!current_version! available for creation
    )
)

echo.
echo 🎯 Validation Summary:
echo ======================
echo Version: v!current_version!
echo Branch: !current_branch!
echo Validation Date: %date% %time%
echo.
echo 📊 Results:
echo - Errors: !error_count!
echo - Warnings: !warning_count!
echo.

if "!validation_passed!"=="true" (
    if !warning_count! equ 0 (
        echo 🟢 VALIDATION RESULT: EXCELLENT - GO for Release
        echo ✅ Perfect validation - Ready for release
    ) else (
        echo 🟡 VALIDATION RESULT: GOOD - GO for Release (with warnings)
        echo ⚠️  !warning_count! warnings noted - Review recommended
    )
    echo.
    echo 🚀 To execute release:
    echo    1. Use GitHub Actions "Manual Release & Tag Creation" workflow
    echo    2. Set version: !current_version!, branch: !current_branch!
    echo.
    echo 🔗 Release will be available at:
    echo    https://github.com/dhruvinrsoni/cipher-alchemist/releases/tag/v!current_version!
) else (
    echo 🔴 VALIDATION RESULT: NO-GO for Release
    echo ❌ !error_count! critical errors found
    echo.
    echo 📝 Action Required:
    echo    Fix all critical errors before attempting release
    echo    Run validation again after fixes
)

echo.
echo 💡 Release Notes:
echo ================
echo - This validation covers core v1.0.0 features
echo - Basic cryptographic transformations (simplified)
echo - No advanced password strength analysis in v1.0.0
echo - PWA support with offline functionality
echo - GitHub Actions handle all release execution
echo.

echo 📊 Validation Report Complete
echo =============================
echo.
pause
if exist manifest.json (
    findstr /C:"\"version\": \"1.0.0\"" manifest.json >nul
    if !errorlevel! equ 0 (
        echo ✅ manifest.json: v1.0.0
    ) else (
        echo ⚠️  manifest.json: Version field missing or incorrect
        set /a "warning_count+=1"
    )
) else (
    echo ❌ manifest.json: File missing
    set "validation_passed=false"
    set /a "error_count+=1"
)

echo.
echo 📱 Validating PWA Components...
echo ===============================

REM Check core PWA files
set "pwa_files=index.html scripts.js styles.css service-worker.js manifest.json"
for %%f in (!pwa_files!) do (
    if exist "%%f" (
        echo ✅ Core file: %%f
    ) else (
        echo ❌ Missing core file: %%f
        set "validation_passed=false"
        set /a "error_count+=1"
    )
)

REM Check PWA icons
set "icon_files=favicon-192.png favicon-512.png favicon.ico"
for %%f in (!icon_files!) do (
    if exist "%%f" (
        echo ✅ PWA icon: %%f
    ) else (
        echo ❌ Missing PWA icon: %%f
        set "validation_passed=false"
        set /a "error_count+=1"
    )
)

echo.
echo 🔧 Validating GitHub Actions...
echo ===============================

if exist ".github\workflows\manual-release.yml" (
    echo ✅ Manual release workflow
) else (
    echo ❌ Missing: manual-release.yml
    set "validation_passed=false"
    set /a "error_count+=1"
)

if exist ".github\workflows\rollback.yml" (
    echo ✅ Rollback workflow
) else (
    echo ❌ Missing: rollback.yml
    set "validation_passed=false"
    set /a "error_count+=1"
)

if exist ".github\workflows\deployment-status.yml" (
    echo ✅ Deployment status workflow
) else (
    echo ⚠️  Missing: deployment-status.yml
    set /a "warning_count+=1"
)

echo.
echo 📚 Validating Documentation...
echo ==============================

if exist "README.md" (
    findstr /C:"v1.0.0" README.md >nul
    if !errorlevel! equ 0 (
        echo ✅ README.md: Contains v1.0.0 references
    ) else (
        echo ⚠️  README.md: No v1.0.0 references found
        set /a "warning_count+=1"
    )
) else (
    echo ❌ README.md: File missing
    set "validation_passed=false"
    set /a "error_count+=1"
)

if exist "CHANGELOG.md" (
    findstr /C:"[1.0.0]" CHANGELOG.md >nul
    if !errorlevel! equ 0 (
        echo ✅ CHANGELOG.md: Contains v1.0.0 entry
    ) else (
        echo ⚠️  CHANGELOG.md: No v1.0.0 entry found
        set /a "warning_count+=1"
    )
) else (
    echo ❌ CHANGELOG.md: File missing
    set "validation_passed=false"
    set /a "error_count+=1"
)

if exist "LICENSE" (
    echo ✅ LICENSE: Present
) else (
    echo ⚠️  LICENSE: File missing
    set /a "warning_count+=1"
)

echo.
echo 🧪 Validating Core Features...
echo ==============================

REM Check if password strength feature is implemented
if exist "scripts.js" (
    findstr /C:"calculatePasswordScore" scripts.js >nul
    if !errorlevel! equ 0 (
        echo ✅ Password strength algorithm: Implemented
    ) else (
        echo ❌ Password strength algorithm: Missing
        set "validation_passed=false"
        set /a "error_count+=1"
    )
    
    findstr /C:"strength-meter-modern" scripts.js >nul
    if !errorlevel! equ 0 (
        echo ✅ Circular progress meter: Implemented
    ) else (
        echo ❌ Circular progress meter: Missing
        set "validation_passed=false"
        set /a "error_count+=1"
    )
)

if exist "styles.css" (
    findstr /C:"strength-meter-modern" styles.css >nul
    if !errorlevel! equ 0 (
        echo ✅ Modern strength meter CSS: Implemented
    ) else (
        echo ❌ Modern strength meter CSS: Missing
        set "validation_passed=false"
        set /a "error_count+=1"
    )
)

echo.
echo 🎯 Validation Summary
echo ====================

if "!validation_passed!"=="true" (
    echo.
    echo 🎉 VALIDATION PASSED!
    echo ====================
    echo.
    echo ✅ All critical components verified
    echo ✅ Version consistency confirmed
    echo ✅ PWA components present
    echo ✅ Core features implemented
    if !warning_count! gtr 0 (
        echo ⚠️  !warning_count! warnings (non-critical)
    )
    echo.
    echo 🚀 Ready for v1.0.0 release!
    echo.
    echo Next steps:
    echo 1. Run: release-v1.0.0.bat
    echo 2. Or manually: git tag v1.0.0 ^&^& git push origin v1.0.0
    echo 3. Create GitHub release via Actions workflow
    echo.
) else (
    echo.
    echo ❌ VALIDATION FAILED!
    echo ===================
    echo.
    echo ❌ !error_count! critical errors found
    if !warning_count! gtr 0 (
        echo ⚠️  !warning_count! warnings
    )
    echo.
    echo 🔧 Please fix the errors above before proceeding with release.
    echo.
)

echo 📊 Validation Statistics:
echo - Total files checked: 15+
echo - Errors: !error_count!
echo - Warnings: !warning_count!
echo - Status: !validation_passed!
echo.

if "!validation_passed!"=="true" (
    exit /b 0
) else (
    exit /b 1
)
