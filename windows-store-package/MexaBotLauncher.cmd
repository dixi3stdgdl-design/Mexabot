@echo off
title MexaBot AI Suite — Command Deck
cd /d "%~dp0"
echo =====================================================
echo   MEXABOT AI SUITE - INICIALIZANDO ENTORNO WINDOWS
echo =====================================================
start "" "http://127.0.0.1:18789/"
if exist "npm.cmd" (
    npm start
) else (
    node server.js
)
