@echo off
echo.
echo 🎬 Cipher Alchemist - Video Recording Setup
echo ==========================================
echo.

echo 📋 Pre-Recording Checklist:
echo.
echo 1. Close unnecessary applications...
taskkill /f /im "discord.exe" 2>nul
taskkill /f /im "slack.exe" 2>nul
taskkill /f /im "teams.exe" 2>nul
echo    ✓ Closed common distracting apps

echo.
echo 2. Setting up Focus Assist (Do Not Disturb)...
powershell -Command "& {Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.SendKeys]::SendWait('^{ESC}')}"
echo    ✓ Focus Assist can be enabled manually in Action Center

echo.
echo 3. Opening required applications...
start "" "https://dhruvinrsoni.github.io/cipher-alchemist/"
timeout /t 3 /nobreak >nul
start "" "chrome.exe" --new-window --disable-extensions --disable-plugins
echo    ✓ Opened Cipher Alchemist and clean Chrome window

echo.
echo 4. Recording reminders:
echo    • Set browser zoom to 100%%
echo    • Clear browser data if needed
echo    • Test microphone levels
echo    • Check screen recording area
echo    • Have water nearby for voice care
echo.

echo 🎥 Ready to record! Press any key to continue...
pause >nul

echo.
echo 📊 Recommended Recording Settings:
echo    Resolution: 1920x1080 (1080p)
echo    Frame Rate: 30 FPS
echo    Audio: 44.1kHz, 16-bit
echo    Format: MP4 (H.264)
echo    Bitrate: 8-12 Mbps
echo.

echo 🔧 Quick OBS Studio setup commands:
echo    1. Set Base Resolution: 1920x1080
echo    2. Set Output Resolution: 1920x1080
echo    3. Set FPS: 30
echo    4. Add Display Capture source
echo    5. Add Audio Input Capture (Microphone)
echo.

echo Happy recording! 🎬
echo.
pause
