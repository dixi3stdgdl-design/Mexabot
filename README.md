# 🌐 MEXABOT.AI — Ecosistema Autónomo Multiplataforma On-Premise

[![License: MIT](https://img.shields.io/badge/License-MIT-cyan.svg)](https://opensource.org/licenses/MIT)
[![Platform: Windows 10/11](https://img.shields.io/badge/Platform-Windows%2011%20%7C%20Android%20%7C%20Linux-00f0ff.svg)](https://microsoft.com)
[![Engine: Gemini 3.5 Flash](https://img.shields.io/badge/AI%20Engine-Gemini%20Flash%20Lite-10b981.svg)](https://ai.google.dev)
[![Gateway: OpenClaw :18789](https://img.shields.io/badge/Gateway-OpenClaw%20%3A18789-8b5cf6.svg)](http://127.0.0.1:18789)

**MexaBot** es una suite de automatización comercial e inteligencia artificial autónoma diseñada para operar de forma **100% On-Premise** (en la computadora o servidor del negocio). Transforma WhatsApp, Telegram y la web en un centro automatizado de ventas, agendamiento de citas y soporte técnico sin programar una sola línea de código y garantizando total privacidad de datos.

---

## 📸 Capturas de Pantalla & Arquitectura Visual

| Interfaz de Escritorio (Windows 11 Fluent) | Aplicación Móvil Nativa (Android Jetpack Compose) |
| :---: | :---: |
| ![MexaBot Desktop UI](mexabot-windows-app.jpg) | ![MexaBot Mobile Native UI](mexabot-android-app.png) |

---

## 🏗️ Arquitectura del Sistema

El proyecto opera bajo un modelo desacoplado y resiliente de 4 capas:

```
                               ┌────────────────────────────────────────┐
                               │       MEXABOT ECOSYSTEM ARCHITECTURE   │
                               └──────────────────┬─────────────────────┘
                                                  │
          ┌───────────────────────────────────────┼───────────────────────────────────────┐
          │                                       │                                       │
          ▼                                       ▼                                       ▼
┌──────────────────┐                    ┌──────────────────┐                    ┌──────────────────┐
│  FRONTEND & WEB  │                    │  KERNEL & DAEMON │                    │ MEXABOT MOBILE   │
│  GitHub Pages    │                    │  OpenClaw :18789 │                    │ Jetpack Compose  │
│  Consola & HUD   │                    │  Directiva SOUL  │                    │ Nodo Central &   │
│  Auto-Discovery  │                    │  WhatsApp Engine │                    │ Monitor Gateway  │
└──────────────────┘                    └──────────────────┘                    └──────────────────┘
```

### Componentes Principales:
1. **Frontend Web & Command Deck (`index.html`, `styles.css`, `app.js`):**
   - Interfaz Cyberpunk OLED responsive con auto-margen para pantallas móviles y escritorio.
   - Motor **Smart Auto-Discovery**: detecta automáticamente si el Gateway local ya está activo y sincroniza la telemetría en vivo a 60 FPS.
   - Simulador interactivo del menú comercial de 5 opciones con pasarela directa a PayPal.

2. **Núcleo de Inferencia & Directiva Maestra (`SOUL.md`):**
   - 4 Arquetipos de negocio: **Aura** (Ventas 24/7), **Cronos** (Citas & Calendario), **Atlas** (Helpdesk RAG) y **Nova** (Copiloto Ejecutivo).
   - **Enrutamiento Determinista Dual**: Canal personal del propietario con Copiloto privado de Gemini vs. canales comerciales para clientes externos.
   - **Regla Estricta Inbound & Silencio en Chats Manuales**: Si el dueño inicia una conversación, el bot permanece silenciado.

3. **Aplicación Nativa de Escritorio (`windows-store-package/`, `releases/windows/`):**
   - Empaquetado oficial **`.msix`** para Microsoft Store con manifiesto `Package.appxmanifest` y set de 21 assets visuales.
   - Binario standalone y ejecutable nativo de Windows.

4. **Aplicación Móvil Android (`android/`):**
   - App nativa moderna construida en **Kotlin + Jetpack Compose**.
   - Clawboard Hub con terminal interactiva, monitor de sockets y gestión de emparejamiento.

---

## 📁 Estructura del Repositorio

```text
d:\Mexabot/
├── android/                         # Aplicación nativa Android (Kotlin + Jetpack Compose)
│   ├── app/src/main/java/           # UI Cyberpunk, Perspective Grid, Clawboard Hub y Terminal
│   └── app/build/outputs/apk/       # APKs ensamblados oficiales
├── windows-store-package/           # Paquete oficial MSIX para Windows Store
│   ├── Assets/                      # Set completo de 21 íconos y splash screens oficiales
│   ├── Package.appxmanifest         # Manifiesto XML con capacidades y políticas de tienda
│   └── build-msix.ps1               # Pipeline automatizado de firma y empaquetado
├── releases/                        # Distribución de ejecutables y paquetes
│   ├── android/                     # MexaBot APK instalable
│   ├── windows/                     # Paquetes MSIX y scripts de instalación
│   └── scripts/                     # Scripts de despliegue automatizado 1-clic
├── index.html                       # Consola Web & Command Deck Cyberpunk
├── styles.css                       # Sistema de diseño con tokens OLED y auto-margen responsive
├── app.js                           # Motor de Auto-Discovery y simulador interactivo
├── SOUL.md                          # Directiva Maestra sanitizada para despliegue distribuido
├── analisis_mexabot_mercado_valuacion.md # Reporte ejecutivo y valuación técnica ($162,000 MXN)
└── README.md                        # Documentación técnica maestra
```

---

## 🚀 Despliegue & Ejecución Rápida

### Opción 1: Ejecución Web Local
```bash
# Iniciar servidor local
npm start
# O con Python:
python -m http.server 8000
```
Abre en tu navegador: [http://127.0.0.1:8000](http://127.0.0.1:8000)

### Opción 2: Compilación de Paquete Windows Store (MSIX)
```powershell
# Ejecutar script de empaquetado y firma digital
powershell -ExecutionPolicy Bypass -File .\windows-store-package\build-msix.ps1
```

### Opción 3: Compilación de App Móvil Android
```powershell
cd android
.\gradlew.bat assembleFreeDebug
```

---

## 🛡️ Seguridad, Privacidad & Modelo de Negocio

- **Cero Telemetría a Servidores Centrales:** Toda la inferencia y almacenamiento residen en el host local.
- **Sin Hardcoding de Datos Privados:** El repositorio utiliza variables dinámicas de entorno (`[NUMERO_PROPIETARIO_LOCAL]`) para que cualquier usuario que clone o instale MexaBot configure su propio número de forma aislada.
- **Pasarela Comercial Oficial:** Integración con planes de $2,490 / $4,990 / $9,990 MXN vía PayPal (`paypal.me/DixLqb`).

---

## 🌐 Ver en Vivo

- **Portal Web Oficial:** [https://dixi3stdgdl-design.github.io/Mexabot/](https://dixi3stdgdl-design.github.io/Mexabot/)
- **Control UI Local:** [http://127.0.0.1:18789/](http://127.0.0.1:18789/)

---

© 2026 MEXABOT. Creado y mantenido por **Octavio García**. Todos los derechos reservados.
