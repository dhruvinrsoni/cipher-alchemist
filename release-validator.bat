@echo off
setlocal enabledelayedexpansion

REM Unified Release Validation Script for Cipher Alchemist
REM Combines functionality from quick-release.bat, validate-release.bat, and release-v1.0.0.bat
REM Provides comprehensive validation for any version
REM VALIDATION ONLY - EXECUTION HANDLED BY GITHUB ACTIONS

echo.
echo [*] Cipher Alchemist - Unified Release Validator
echo ===============================================
echo.
echo [INFO] This script provides comprehensive GO/NO-GO release readiness validation
echo [INFO] EXECUTION IS HANDLED BY GITHUB ACTIONS - THIS IS VALIDATION ONLY
echo.

set "validation_passed=true"
set "warning_count=0"
set "error_count=0"
set "current_version=UNKNOWN"

REM Parse command line arguments for version override
if "%~1" neq "" (
    set "target_version=%~1"
    echo [TARGET] Target Version Override: v!target_version!
    echo.
) else (
    set "target_version="
)

REM ============================================================================
REM VERSION DETECTION AND CONSISTENCY
REM ============================================================================

echo [VERSION] Version Detection:
echo =============================

if exist version.txt (
    echo [OK] version.txt: File exists
    REM Simple version extraction - get first line and extract version
    set "version_line="
    for /f "usebackq tokens=*" %%a in ("version.txt") do (
        if not defined version_line set "version_line=%%a"
    )
    
    if defined version_line (
        echo [INFO] Version line: !version_line!
        REM Try to extract version after 'v' character - handle various formats
        echo !version_line! | findstr "v" >nul
        if !errorlevel! equ 0 (
            REM Extract version - handle vSHA, vVERSION, vDEV formats
            for /f "tokens=2 delims=v " %%b in ("!version_line!") do (
                set "current_version=%%b"
            )
            if defined current_version (
                REM Clean up the version string (remove extra characters)
                set "current_version=!current_version: =!"
                set "current_version=!current_version:·=!"
                for /f "tokens=1" %%c in ("!current_version!") do (
                    set "current_version=%%c"
                )
                echo [OK] Detected version: v!current_version!
            ) else (
                echo [WARN] Could not extract version from version.txt
                set /a "warning_count+=1"
            )
        ) else (
            echo [WARN] No version marker found in version.txt
            set /a "warning_count+=1"
        )
    ) else (
        echo [ERROR] Could not read version.txt content
        set "validation_passed=false"
        set /a "error_count+=1"
    )
) else (
    echo [ERROR] version.txt file missing
    set "validation_passed=false"
    set /a "error_count+=1"
)

REM Use target version if specified
if defined target_version (
    set "current_version=!target_version!"
    echo [INFO] Using target version: v!current_version!
)

echo.
echo [VERSION] Version Consistency Check:
echo ====================================

REM Check manifest.json version (only if manifest.json exists)
if exist manifest.json (
    echo [OK] manifest.json: File exists
    if defined current_version (
        if "!current_version!" neq "UNKNOWN" (
            findstr /C:"\"version\"" manifest.json >nul 2>&1
            if !errorlevel! equ 0 (
                findstr /C:"\"version\": \"!current_version!\"" manifest.json >nul 2>&1
                if !errorlevel! equ 0 (
                    echo [OK] manifest.json: v!current_version! (matches)
                ) else (
                    echo [WARN] manifest.json: Version mismatch
                    echo       Expected: "version": "!current_version!"
                    set /a "warning_count+=1"
                )
            ) else (
                echo [WARN] manifest.json: No version field found
                set /a "warning_count+=1"
            )
        ) else (
            echo [WARN] manifest.json: Cannot validate due to unknown version
            set /a "warning_count+=1"
        )
    ) else (
        echo [WARN] manifest.json: Cannot validate due to undefined version
        set /a "warning_count+=1"
    )
) else (
    echo [INFO] manifest.json: File not found - version consistency check skipped
)

REM ============================================================================
REM CORE FILE VALIDATION
REM ============================================================================

echo.
echo [FILES] Core File Validation:
echo =============================

set "required_files=index.html styles.css scripts.js manifest.json service-worker.js"
for %%f in (%required_files%) do (
    if exist "%%f" (
        echo [OK] %%f: Present
    ) else (
        echo [ERROR] %%f: Missing
        set "validation_passed=false"
        set /a "error_count+=1"
    )
)

REM ============================================================================
REM PWA ASSET VALIDATION
REM ============================================================================

echo.
echo [PWA] PWA Asset Validation:
echo ===========================

set "pwa_files=favicon.ico favicon-192.png favicon-512.png"
for %%f in (%pwa_files%) do (
    if exist "%%f" (
        echo [OK] %%f: Present
    ) else (
        echo [WARN] %%f: Missing (affects PWA functionality)
        set /a "warning_count+=1"
    )
)

REM ============================================================================
REM DOCUMENTATION VALIDATION
REM ============================================================================

echo.
echo [DOCS] Documentation Validation:
echo ================================

set "doc_files=README.md CHANGELOG.md LICENSE"
for %%f in (%doc_files%) do (
    if exist "%%f" (
        echo [OK] %%f: Present
    ) else (
        echo [WARN] %%f: Missing (recommended for releases)
        set /a "warning_count+=1"
    )
)

REM ============================================================================
REM GITHUB ACTIONS VALIDATION
REM ============================================================================

echo.
echo [GITHUB] GitHub Actions Validation:
echo ===================================

if exist ".github\workflows" (
    echo [OK] .github/workflows: Directory exists
    
    set "workflow_count=0"
    for %%f in (.github\workflows\*.yml .github\workflows\*.yaml) do (
        if exist "%%f" (
            set /a "workflow_count+=1"
        )
    )
    
    if !workflow_count! gtr 0 (
        echo [OK] Found !workflow_count! workflow file(s)
    ) else (
        echo [WARN] No workflow files found in .github/workflows
        set /a "warning_count+=1"
    )
) else (
    echo [WARN] .github/workflows: Directory missing
    set /a "warning_count+=1"
)

REM ============================================================================
REM GIT REPOSITORY STATUS
REM ============================================================================

echo.
echo [GIT] Git Repository Status:
echo ============================

git status >nul 2>&1
if !errorlevel! equ 0 (
    echo [OK] Git repository detected
    
    REM Check for uncommitted changes
    git diff --quiet 2>nul
    if !errorlevel! equ 0 (
        git diff --cached --quiet 2>nul
        if !errorlevel! equ 0 (
            echo [OK] Working directory clean
        ) else (
            echo [WARN] Staged changes detected
            set /a "warning_count+=1"
        )
    ) else (
        echo [WARN] Uncommitted changes detected
        set /a "warning_count+=1"
    )
    
    REM Check current branch
    for /f "tokens=*" %%b in ('git branch --show-current 2^>nul') do (
        set "current_branch=%%b"
    )
    if defined current_branch (
        if "!current_branch!" equ "main" (
            echo [OK] On main branch
        ) else (
            echo [INFO] On branch: !current_branch!
        )
    )
) else (
    echo [WARN] Not a Git repository or Git not available
    set /a "warning_count+=1"
)

REM ============================================================================
REM FEATURE IMPLEMENTATION VALIDATION
REM ============================================================================

echo.
echo [FEATURES] Feature Implementation Check:
echo =======================================

REM Check for cipher functionality in scripts.js
if exist scripts.js (
    findstr /C:"transform" scripts.js >nul 2>&1
    if !errorlevel! equ 0 (
        echo [OK] Cipher transformation logic detected
    ) else (
        echo [WARN] Cipher transformation logic may be missing
        set /a "warning_count+=1"
    )
    
    findstr /C:"theme" scripts.js >nul 2>&1
    if !errorlevel! equ 0 (
        echo [OK] Theme functionality detected
    ) else (
        echo [WARN] Theme functionality may be missing
        set /a "warning_count+=1"
    )
) else (
    echo [ERROR] scripts.js missing - cannot validate features
    set /a "error_count+=1"
)

REM Check for responsive design in styles.css
if exist styles.css (
    findstr /C:"@media" styles.css >nul 2>&1
    if !errorlevel! equ 0 (
        echo [OK] Responsive design detected
    ) else (
        echo [WARN] Responsive design may be missing
        set /a "warning_count+=1"
    )
    
    findstr /C:"dark" styles.css >nul 2>&1
    if !errorlevel! equ 0 (
        echo [OK] Dark theme support detected
    ) else (
        echo [WARN] Dark theme support may be missing
        set /a "warning_count+=1"
    )
) else (
    echo [ERROR] styles.css missing - cannot validate styling
    set /a "error_count+=1"
)

REM ============================================================================
REM FINAL VALIDATION SUMMARY
REM ============================================================================

echo.
echo [SUMMARY] Validation Complete
echo =============================
echo.
echo Target Version: v!current_version!
echo Errors: !error_count!
echo Warnings: !warning_count!
echo.

if "!validation_passed!" equ "true" (
    if !warning_count! equ 0 (
        echo [SUCCESS] ALL CHECKS PASSED - READY FOR RELEASE
        echo.
        echo [NEXT] Run GitHub Actions workflow for release:
        echo       1. Go to GitHub repository
        echo       2. Click Actions tab
        echo       3. Select "Manual Release & Tag Creation"
        echo       4. Run workflow with version: !current_version!
    ) else (
        echo [SUCCESS] VALIDATION PASSED WITH WARNINGS
        echo.
        echo [INFO] Warning(s) count: !warning_count! - release can proceed
        echo [NEXT] Consider addressing warnings, then run GitHub Actions workflow
    )
) else (
    echo [FAILED] VALIDATION FAILED - RELEASE NOT RECOMMENDED
    echo.
    echo [ACTION] Please fix !error_count! error(s) before attempting release
    echo [INFO] Run this script again after fixes: release-validator.bat
    if defined target_version (
        echo [INFO] Or with specific version: release-validator.bat !target_version!
    )
)

echo.
echo [USAGE] Script Usage:
echo ====================
echo Run command: release-validator.bat [version]
echo Example: release-validator.bat 1.1.0
echo.

if "!validation_passed!" neq "true" (
    echo [STATUS] Please fix errors before attempting release
) else (
    echo [STATUS] Validation complete - see summary above
)

pause
