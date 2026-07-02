@echo off
chcp 65001 >nul
cd /d "%~dp0"
title ParkTracker - serveur local
echo Demarrage du serveur ParkTracker...
echo.
py serve.py
if errorlevel 1 python serve.py
echo.
echo Le serveur s'est arrete.
pause
