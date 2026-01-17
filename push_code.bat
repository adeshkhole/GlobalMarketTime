@echo off
echo ==========================================
echo Global Market Time - GitHub Uploader
echo ==========================================

cd /d "%~dp0"

echo [INFO] Checking for changes...
git status --short

echo.
set /p commitMsg="Enter commit message (Press Enter for 'Update'): "
if "%commitMsg%"=="" set commitMsg=Update

echo [1/3] Cleaning and Adding files...
:: Nuclear cleanup of nested .git
if exist "app\.git" (
    attrib -h -s -r "app\.git" /s /d
    rmdir /s /q "app\.git"
)
git rm -r --cached . >nul 2>&1
git add .

echo [2/3] Committing changes...
git commit -m "%commitMsg%"

echo [3/3] Pushing to GitHub...
git push

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Push failed. Please check your internet connection or git credentials.
) else (
    echo.
    echo [SUCCESS] Code pushed successfully!
)

pause
