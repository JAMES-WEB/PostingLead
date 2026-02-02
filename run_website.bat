@echo off
echo ===================================================
echo   Starting BernamaBiz Clone (Development Mode)
echo ===================================================
echo.
echo 1. Initializing internal tools...
set "NPM_CLI=C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js"

echo 2. Starting the server...
node "%NPM_CLI%" run dev

echo.
echo If the server stops, press any key to exit.
pause
