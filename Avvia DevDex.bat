@echo off
setlocal
cd /d "%~dp0"

where npm >nul 2>nul
if errorlevel 1 (
  echo Node.js non trovato. Installalo e riapri DevDex.
  pause
  exit /b 1
)

if not exist node_modules call npm install --no-audit --no-fund
if errorlevel 1 exit /b 1
call npm run dev
