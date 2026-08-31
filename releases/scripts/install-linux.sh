#!/bin/bash
# MEXABOT — Script de Despliegue 1-Clic para Servidores Linux & VPS (Ubuntu/Debian)
# Ingeniería y Creación de Octavio García

echo -e "\033[1;36m=====================================================\033[0m"
echo -e "\033[1;32m  MEXABOT AI — INSTALADOR SERVIDOR LINUX / DOCKER\033[0m"
echo -e "\033[1;33m  Ingeniería y Creación de Octavio García\033[0m"
echo -e "\033[1;36m=====================================================\033[0m"

# Actualizar paquetes
sudo apt-get update -y && sudo apt-get install -y curl nodejs npm git

# Instalar dependencias del proyecto
echo -e "\033[1;34m[*] Instalando dependencias de MexaBot...\033[0m"
npm install --no-audit

# Levantar gateway en segundo plano con PM2
sudo npm install -g pm2
pm2 start desktop-main.js --name "mexabot-gateway"
pm2 save
pm2 startup

echo -e "\033[1;32m[✓] MexaBot Gateway activo en el puerto 18789.\033[0m"
