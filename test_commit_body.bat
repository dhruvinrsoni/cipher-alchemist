@echo off
cd /d "c:\root\github\dhruvinrsoni\cipher-alchemist"

echo Testing the new git log approach for full commit bodies...
echo.

REM Get the latest commit hash
for /f %%i in ('git log --no-merges -n 1 --grep="[skip ci]" --invert-grep --pretty=format:"%%H"') do set hash=%%i

if not "%hash%"=="" (
    echo Commit Hash: %hash%
    echo.
    
    echo Subject:
    git show -s --format="%%s" "%hash%"
    echo.
    
    echo Full Body:
    git show -s --format="%%b" "%hash%"
    echo.
    
    echo This should show the FULL multi-line commit body, not just the first line.
) else (
    echo No commits found.
)

pause
