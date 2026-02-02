@echo off
echo ===================================================
echo   Deploying to GitHub (Automatic)
echo ===================================================
echo.

echo 1. Adding all files...
git add .

echo 2. Committing changes...
set /p commit_msg="Enter description of changes (e.g., 'Updated homepage'): "
git commit -m "%commit_msg%"

echo 3. Pushing to GitHub...
git push

echo.
echo ===================================================
echo   Done! Go to Vercel to see your update.
echo ===================================================
pause
