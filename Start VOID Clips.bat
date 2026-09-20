@echo off
setlocal
title VOID Clips (local)
cd /d "%~dp0"
set "NODE=C:\Users\12tekyu1\AppData\Local\void-clips-node\node-v20.18.0-win-x64\node.exe"
set "APPDIR=C:\Users\12tekyu1\AppData\Local\void-clips"
if exist "%APPDIR%\server\index.js" cd /d "%APPDIR%"
if not exist "%NODE%" (
  echo Portable Node not found:
  echo   %NODE%
  pause
  exit /b 1
)
echo Starting VOID Clips on http://127.0.0.1:8787 ...
echo DO NOT LAUNCH publicly. Local only.
echo.
rem Free port 8787 if a previous instance is stuck
for /f "tokens=5" %%p in ('netstat -ano ^| findstr :8787 ^| findstr LISTENING') do (
  echo Stopping old process PID %%p on 8787...
  taskkill /F /PID %%p >nul 2>&1
)
cd /d "%CD%\server" 2>nul || cd /d "%APPDIR%\server"
start "" "http://127.0.0.1:8787/app.html"
"%NODE%" index.js
pause
