# MEXABOT — Script de Auto-Instalación Rápida 1-Clic para Windows
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host "  MEXABOT AI — INSTALADOR AUTOMÁTICO PARA WINDOWS" -ForegroundColor Green
Write-Host "  Ingeniería y Creación de Octavio García" -ForegroundColor Yellow
Write-Host "=====================================================" -ForegroundColor Cyan

# 1. Verificar Node.js
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "[!] Node.js no detectado. Descargando instalador..." -ForegroundColor Yellow
    winget install OpenJS.NodeJS.LTS --silent --accept-package-agreements --accept-source-agreements
} else {
    Write-Host "[✓] Node.js detectado: $(node -v)" -ForegroundColor Green
}

# 2. Iniciar Gateway OpenClaw & MexaBot Command Deck
Write-Host "[*] Inicializando entorno de ejecución..." -ForegroundColor Cyan
npm install --no-audit
npm start
