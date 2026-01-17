@echo off
echo ==========================================
echo Global Market Time - Project Runner
echo ==========================================

cd /d "%~dp0app"

if not exist node_modules (
    echo [INFO] node_modules not found. Installing dependencies...
    echo [INFO] This might take a few minutes depending on your internet speed.
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install dependencies.
        echo [ERROR] Please check your internet connection and try again.
        pause
        exit /b %errorlevel%
    )
    echo [SUCCESS] Dependencies installed successfully.
) else (
    echo [INFO] Dependencies already installed.
)

echo.
echo [INFO] Starting Development Server...
echo [INFO] Once started, open http://localhost:5173 in your browser.
echo.

call npm run dev

pause
