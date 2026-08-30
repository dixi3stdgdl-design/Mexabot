// MEXABOT — Neural Command OS Engine & Holographic Algorithms Controller

const mexabotMasterIdentity = {
    name: "MexaBot — IA Comercial",
    roleTitle: "Especialista Comercial en IA Autónoma",
    welcomeMsg: `¡Hola! 👋 Soy <strong>MexaBot</strong>, un asistente virtual potenciado por la ingeniería y creación de <em>Octavio García</em>. Me especializo en la implementación comercial de Asistentes Digitales e Inteligencia Artificial Autónoma para transformar la operación de empresas y profesionistas.<br><br>¿En qué podemos potenciar tu negocio hoy? Responde con el número de tu interés:<br><br>1️⃣ <em>Conocer los Asistentes Digitales disponibles</em><br>2️⃣ <em>Modelos comerciales y métodos de instalación</em><br>3️⃣ <em>Precios, paquetes y asesoría personalizada</em><br>4️⃣ <em>Proceso de activación rápida y requisitos</em><br>5️⃣ <em>Probar la IA en vivo (Hazme cualquier pregunta)</em><br>0️⃣ <em>Hablar con un asesor humano (Pausar MexaBot)</em>`,
    options: {
        "1": `💼 <strong>Catálogo de Asistentes Autónomos en MexaBot:</strong><br><br>1️⃣ <strong>Aura (Cerrador Comercial 24/7):</strong> Calificación de leads, cotizaciones y ventas directas.<br>2️⃣ <strong>Cronos (Recepción & Citas):</strong> Agendamiento en tiempo real sincronizado con Google Calendar.<br>3️⃣ <strong>Atlas (Helpdesk RAG):</strong> Soporte técnico con tus propios PDFs, catálogos y manuales.<br>4️⃣ <strong>Nova (Copiloto Ejecutivo):</strong> Procesador de notas de voz, minutas y listas de tareas.<br>9️⃣ <strong>Volver al Menú Principal</strong><br>0️⃣ <strong>Hablar con un asesor humano</strong><br><br>💡 <em>Envía 1, 2, 3 o 4 para ver ideas de negocio y comandos base de cada asistente.</em>`,
        "1_1": `💼 <strong>Aura — Cerrador Comercial 24/7:</strong><br>Convierte conversaciones frías en ventas cerradas respondiendo en menos de 3 segundos en WhatsApp.<br><br>💡 <strong>¿Para qué te sirve en tu negocio?</strong><br>• <em>Inmobiliarias & Concesionarias:</em> Filtra compradores por presupuesto y zona antes de pasarlos a tu equipo.<br>• <em>Servicios & Agencias:</em> Cotiza servicios personalizados según las necesidades del cliente.<br>• <em>Comercio & Retail:</em> Muestra productos destacados y envía enlaces de pago directo.<br><br>⌨️ <strong>Comandos base:</strong> <em>'cotizar [servicio]'</em>, <em>'promociones'</em>, <em>'0' (asesor humano)</em>.<br><br>1️⃣ <em>Ver precios y paquetes</em><br>2️⃣ <em>Ver métodos de instalación</em><br>9️⃣ <em>Volver al Menú Principal</em><br>0️⃣ <em>Hablar con un asesor</em>`,
        "1_2": `📅 <strong>Cronos — Recepción & Agendamiento Inteligente:</strong><br>Elimina tiempos muertos y citas canceladas coordinando disponibilidad en tiempo real con Google Calendar o Cal.com.<br><br>💡 <strong>¿Para qué te sirve en tu negocio?</strong><br>• <em>Clínicas & Spas:</em> Permite a pacientes reservar, reagendar o cancelar sin esperas.<br>• <em>Abogados & Asesores:</em> Reserva sesiones y cobra consultas previas solo en tus bloques libres.<br>• <em>Talleres & Servicios:</em> Asigna turnos según la ruta y tiempo estimado de trabajo.<br><br>⌨️ <strong>Comandos base:</strong> <em>'agendar cita'</em>, <em>'cambiar horario'</em>, <em>'recordatorios'</em>.<br><br>1️⃣ <em>Ver precios y paquetes</em><br>2️⃣ <em>Ver métodos de instalación</em><br>9️⃣ <em>Volver al Menú Principal</em><br>0️⃣ <em>Hablar con un asesor</em>`,
        "1_3": `🛡️ <strong>Atlas — Soporte Técnico & Base Documental RAG:</strong><br>Indexa tus manuales, políticas y catálogos en PDF para responder preguntas complejas sin alucinaciones.<br><br>💡 <strong>¿Para qué te sirve en tu negocio?</strong><br>• <em>Software & SaaS:</em> Resuelve dudas de configuración paso a paso con capturas y guías.<br>• <em>Distribuidores Industriales:</em> Consulta existencias, códigos de refacción y fichas técnicas al instante.<br>• <em>Escuelas & Universidades:</em> Responde sobre costos, fechas de inscripción y reglamentos escolares.<br><br>⌨️ <strong>Comandos base:</strong> <em>'buscar manual [tema]'</em>, <em>'garantía [producto]'</em>, <em>'0' (soporte humano)</em>.<br><br>1️⃣ <em>Ver precios y paquetes</em><br>2️⃣ <em>Ver métodos de instalación</em><br>9️⃣ <em>Volver al Menú Principal</em><br>0️⃣ <em>Hablar con un asesor</em>`,
        "1_4": `🚀 <strong>Nova — Copiloto Ejecutivo & Productividad:</strong><br>Diseñado para dueños de empresa y profesionistas que reciben cientos de mensajes y audios al día.<br><br>💡 <strong>¿Para qué te sirve en tu negocio?</strong><br>• <em>Directores & Founders:</em> Envías un audio de 5 minutos y Nova extrae los acuerdos y compromisos.<br>• <em>Gestión de Equipos:</em> Convierte notas de voz en tareas accionables para tu CRM o gestor de proyectos.<br>• <em>Seguimiento Diario:</em> Te envía un resumen matutino con las prioridades de tu día.<br><br>⌨️ <strong>Comandos base:</strong> <em>'resumen del día'</em>, <em>'nueva tarea [texto/audio]'</em>, <em>'borrador [tema]'</em>.<br><br>1️⃣ <em>Ver precios y paquetes</em><br>2️⃣ <em>Ver métodos de instalación</em><br>9️⃣ <em>Volver al Menú Principal</em><br>0️⃣ <em>Hablar con un asesor</em>`,
        "2": `⚙️ <strong>Equipos & Métodos de Despliegue:</strong><br><br>1️⃣ <strong>Equipo Docker VPS (Recomendado 24/7):</strong> Contenedor aislado con reinicio automático y base PostgreSQL. Ideal para operar día y noche.<br>2️⃣ <strong>Equipo Node.js / Baileys (Ágil):</strong> Instalación ultraligera para servidores locales o microservicios con enlace QR directo.<br>3️⃣ <strong>Equipo Python Cloud API (Corporativo):</strong> Conexión oficial con WhatsApp Cloud API de Meta para alto volumen.<br>4️⃣ <strong>Script 1-Clic Windows (Autónomo):</strong> Instalador nativo en PowerShell que autoconfigura tu PC sin requerir conocimientos técnicos.<br>9️⃣ <strong>Volver al Menú Principal</strong><br>0️⃣ <strong>Hablar con un asesor humano</strong><br><br>🔒 <em>Privacidad: El backend es 100% tuyo; tus datos y clientes nunca pasan por servidores de terceros.</em>`,
        "3": `💰 <strong>Estructura de Precios & Planes Todo Incluido:</strong><br><br>1️⃣ <strong>Plan Inicial / Profesionista:</strong><br>• Setup & Instalación Base: <strong>$2,490 MXN</strong> (Pago único).<br>• Mensualidad Todo Incluido: <strong>$790 MXN / mes</strong> (IA hasta 2,500 chats + Soporte y Monitoreo).<br><br>2️⃣ <strong>Plan Empresa / Multi-Agente:</strong><br>• Setup & Instalación Base: <strong>$4,990 MXN</strong> (Pago único).<br>• Mensualidad Todo Incluido: <strong>$1,490 MXN / mes</strong> (VPS Dedicado 24/7 + IA hasta 10,000 chats + RAG/Calendario).<br><br>3️⃣ <strong>Plan Corporativo Llave en Mano:</strong><br>• Setup & Despliegue Clúster: <strong>$9,990 MXN</strong> (Pago único).<br>• Mensualidad Todo Incluido: <strong>$2,990 MXN / mes</strong> (IA Ilimitada + WhatsApp Cloud API Meta + Asesor 24/7).<br><br>💳 <strong>Pago Seguro con PayPal:</strong> <a href="https://paypal.me/DixLqb" target="_blank" style="color:#38bdf8; text-decoration:underline;">paypal.me/DixLqb</a><br><br>9️⃣ <strong>Volver al Menú Principal</strong><br>0️⃣ <strong>Hablar con un asesor humano</strong><br><br>🔒 <em>Cero facturas sorpresa: El consumo de IA y la atención técnica están cubiertos en tu mensualidad fija.</em>`,
        "4": `⏱️ <strong>Proceso de Activación Oficial & Dashboard:</strong><br><br>1. <strong>Puente Oficial:</strong> Activamos el módulo oficial <em>Clawboard</em> en <em>Microsoft PC Manager</em> (despliegue del sandbox seguro).<br>2. <strong>Dashboard Automático:</strong> PC Manager genera tu panel local de control en <a href="http://127.0.0.1:18789/" target="_blank" style="color:#38bdf8;">http://127.0.0.1:18789/</a>.<br>3. <strong>Enlace en 10s:</strong> Vinculamos tu número escaneando el QR oficial en pantalla.<br>4. <strong>App Móvil (Opcional):</strong> Puedes monitorear desde el dashboard web, la app oficial de OpenClaw, cualquier cliente Gateway o nuestra app MexaBot Mobile.<br><br>1️⃣ <em>Ver Requisitos Técnicos & Aviso de Responsabilidad</em><br>2️⃣ <em>Iniciar Activación con un Asesor</em><br>9️⃣ <em>Volver al Menú Principal</em><br>0️⃣ <em>Hablar con un asesor humano</em>`,
        "4_1": `📌 <strong>Requisitos Técnicos & Cláusula de Operación Local:</strong><br><br>• <strong>Requisitos:</strong> Windows 10/11 (con Microsoft PC Manager) o Servidor VPS/Linux.<br>• <strong>Privacidad Total:</strong> Los datos, base de clientes e inteligencia residen 100% en tu propio equipo.<br>• <strong>⚖️ Descargo de Responsabilidad:</strong> MexaBot provee la arquitectura y configuración para el sandbox oficial de Microsoft. La administración y mantenimiento del sistema operativo es responsabilidad del usuario. Cualquier modificación manual no autorizada de puertos o archivos de configuración corre bajo su propio riesgo.<br><br>9️⃣ <em>Volver al Menú Principal</em><br>0️⃣ <em>Hablar con un asesor</em>`,
        "5": `🧠 <strong>Modo IA Libre Activado:</strong><br><br>¡Excelente! A partir de este momento puedes preguntarme cualquier duda sobre automatización, procesos de negocio, integraciones técnicas o pedirme ejemplos de respuestas comerciales.<br><br><em>(Envía 9 en cualquier momento para regresar al menú numerado)</em>`,
        "0_user": `🛑 <strong>MexaBot Pausado.</strong><br><br>Los envíos automáticos de la IA han sido desactivados para esta conversación. He notificado a nuestro equipo comercial y un asesor humano te atenderá en breve.<br><br><em>(Envía '9' o 'menu' en cualquier momento para reactivar a MexaBot).</em>`,
        "0_admin": `⚡ <strong>MODO AGENTE NATIVO ACTIVADO</strong> ⚡<br><br>MexaBot comercial pausado en este canal.<br><strong>Hola Administrador</strong>, soy tu copiloto de sistema local. Estoy listo para recibir instrucciones directas, diagnosticar procesos, consultar memoria, ejecutar tareas o asistir en programación.<br><br><em>¿En qué proceso técnico o personal trabajamos ahora? (Envía 'comercial' o '9' para volver al bot público).</em>`
    }
};

const agentPresets = {
    sales: {
        name: "MexaBot — Especialista Comercial",
        roleTitle: "Especialista Comercial en IA Autónoma",
        welcomeMsg: mexabotMasterIdentity.welcomeMsg
    },
    calendar: {
        name: "Cronos — Recepción & Citas",
        roleTitle: "Recepción & Agendamiento 24/7",
        welcomeMsg: "¡Hola! 📅 Soy <strong>Cronos</strong>, recepcionista digital de <em>{bizName}</em>. Gestiono agendas y citas en tiempo real sin esperas. ¿Para qué fecha u horario buscas disponibilidad?"
    },
    support: {
        name: "Atlas — Helpdesk RAG",
        roleTitle: "Soporte Técnico & Base Documental",
        welcomeMsg: "¡Buen día! 🛡️ Soy <strong>Atlas</strong>, especialista de soporte técnico de <em>{bizName}</em>. Cuéntame con qué módulo o proceso requieres asistencia hoy."
    },
    executive: {
        name: "Nova — Asistente Ejecutivo",
        roleTitle: "Copiloto de Productividad",
        welcomeMsg: "¡Hola! 🚀 Soy <strong>Nova</strong>, tu copiloto ejecutivo para <em>{bizName}</em>. Envíame notas de voz, listas de tareas o minutas y las convertiré en acciones concretas."
    }
};

let currentPreset = 'sales';
let isBotPaused = false;
let isFreeAiMode = false;
let isNativeAdminMode = false;
let currentMenuLevel = 'main';

// Helper: Scroll suave con foco
function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Selección de agente desde el catálogo HUD
function selectAgent(presetKey) {
    currentPreset = presetKey;
    const roleSelect = document.getElementById('agent-role-select');
    if (roleSelect) {
        roleSelect.value = presetKey;
    }
    updateSelectedRolePreview();
    scrollToSection('command-center');
    
    appendTerminalLog(`[Arquetipo] Modelo cargado: "${agentPresets[presetKey].roleTitle}". Parámetros sincronizados en el kernel.`, 'cyan');
}

// Actualizar preview de rol en el chat simulado
function updateSelectedRolePreview() {
    const roleSelect = document.getElementById('agent-role-select');
    const selectedKey = roleSelect ? roleSelect.value : 'sales';
    currentPreset = selectedKey;
    isBotPaused = false;
    isFreeAiMode = false;
    isNativeAdminMode = false;
    currentMenuLevel = 'main';
    
    const bizName = document.getElementById('biz-name').value || 'Tu Negocio';
    const preset = agentPresets[currentPreset];
    
    const nameEl = document.getElementById('preview-bot-name');
    if (nameEl) nameEl.innerText = preset.name;
    
    const chatBody = document.getElementById('chat-messages');
    if (chatBody) {
        chatBody.innerHTML = `
            <div class="wa-bubble-msg incoming-msg">
                <p>${preset.welcomeMsg.replace(/{bizName}/g, bizName)}</p>
                <span class="wa-time-stamp">Ahora</span>
            </div>
        `;
    }
}

// Log Terminal Stream Helper
function appendTerminalLog(msg, type = 'dim') {
    const term = document.getElementById('terminal-output');
    if (!term) return;
    
    const now = new Date().toLocaleTimeString([], { hour12: false });
    const line = document.createElement('div');
    line.className = `log-entry ${type}`;
    line.innerHTML = `<span style="opacity:0.5;">[${now}]</span> ${msg}`;
    term.appendChild(line);
    term.scrollTop = term.scrollHeight;
}

// Dynamic Algorithmic Code Generators for HUD Stream
const algorithmSnippets = [
    "ANTI_SPAM.enforce('INBOUND_ONLY') => Outbound blocked. Listening for user-initiated interactions only",
    "AST.compile('SOUL.md') => { agent: 'MexaBot', role: 'Commercial_AI_Specialist', format: 'menu_5_options' }",
    "OpenClaw.Kernel.bindPort(18789) · Socket listening on loopback",
    "DeploymentTeam.select('Docker | Node.js | Python | NativeScript') · Multi-stack ready",
    "Gemini.GenerativeAI.ping('gemini-3.5-flash-lite') · 200 OK (Latency: 84ms)",
    "ADB.Bridge.checkDeviceState('USB_DEBUG_MODE') · Device verified (Active Link)",
    "VectorIndex.embedKnowledge() · Cosine similarity cache warm"
];

// Desktop Window Controls (Nativo Electron)
function desktopMinimize() {
    if (window.mexabotNative) window.mexabotNative.minimize();
}

function desktopMaximize() {
    if (window.mexabotNative) window.mexabotNative.maximize();
}

function desktopClose() {
    if (window.mexabotNative) window.mexabotNative.close();
}

// Orquestación en Vivo con Algoritmos y Transiciones con Delay Cinemático
async function startLiveOrchestration(e) {
    e.preventDefault();
    
    const btn = document.getElementById('btn-deploy');
    const bizName = document.getElementById('biz-name').value;
    const channel = document.getElementById('agent-channel') ? document.getElementById('agent-channel').value : 'whatsapp';
    const phone = document.getElementById('biz-phone').value;
    const stack = document.getElementById('deployment-stack') ? document.getElementById('deployment-stack').value : 'docker';
    const statusText = document.getElementById('orchestrator-status-text');
    
    btn.disabled = true;
    btn.innerHTML = `<i data-lucide="loader" class="animate-spin"></i> EJECUTANDO PIPELINE NEURAL...`;
    if (window.lucide) lucide.createIcons();
    
    statusText.innerText = 'ORQUESTANDO PIPELINE...';
    
    // Reset visual stepper
    for (let i = 1; i <= 4; i++) {
        const step = document.getElementById(`step-${i}`);
        step.className = 'matrix-step';
        step.querySelector('.matrix-step-status').innerHTML = `<i data-lucide="circle-dot"></i>`;
    }
    if (window.lucide) lucide.createIcons();
    
    // Si corre en Desktop OS (.exe nativo), ejecuta el motor real con procesos en paralelo
    if (window.mexabotNative) {
        appendTerminalLog(`[Desktop Kernel] Modo nativo detectado. Lanzando ejecutor de subprocesos...`, 'cyan');
        await window.mexabotNative.startRealDeployment({
            bizName,
            channel,
            phone,
            stack,
            agentType: currentPreset
        });
        btn.disabled = false;
        btn.innerHTML = `<i data-lucide="check-circle"></i> INSTALACIÓN Y ENLACE NATIVO COMPLETADO`;
        statusText.innerText = 'SISTEMA NATIVO EN PRODUCCIÓN';
        if (window.lucide) lucide.createIcons();
        return;
    }
    
    // Modo Web / Demostración en el navegador
    // Step 1: Compilación de Identidad & Reglas
    await runStep(1, `[Fase 1] Inicializando compilador semántico para "${bizName}" en canal ${channel.toUpperCase()}...`, 'cyan');
    await streamAlgorithms(2);
    await wait(1100);
    completeStep(1, `SOUL.md compilado con menú de 5 opciones y política estricta anti-spam Inbound-Only.`);
    
    // Step 2: Inyección de Credenciales & Aislamiento
    await runStep(2, `[Fase 2] Configurando stack [${stack.toUpperCase()}] y variables de entorno...`, 'purple');
    await streamAlgorithms(2);
    await wait(1100);
    completeStep(2, `Aislamiento de credenciales y base de datos completado.`);
    
    // Step 3: Enlace Socket & Política Pública
    await runStep(3, `[Fase 3] Vinculando socket en puerto 18789 y autorizando canal ${channel.toUpperCase()}...`, 'blue');
    await streamAlgorithms(2);
    await wait(1100);
    completeStep(3, `Socket 18789 activo y conectado.`);
    
    // Step 4: Vinculación Móvil & Sandbox
    await runStep(4, `[Fase 4] Sincronizando con dispositivo en ${phone || '+52 33 0000 0000'}...`, 'green');
    await streamAlgorithms(2);
    await wait(1100);
    completeStep(4, `Asistente MexaBot operativo en tiempo real.`);
    
    btn.disabled = false;
    btn.innerHTML = `<i data-lucide="check-circle"></i> DESPLIEGUE DETERMINISTA COMPLETADO`;
    statusText.innerText = 'SISTEMA OPERATIVO Y VINCULADO';
    if (window.lucide) lucide.createIcons();
    
    updateSelectedRolePreview();
    appendTerminalLog(`[Éxito] Asistente MexaBot desplegado exitosamente con regla Inbound-Only activa.`, 'green');
}

async function runStep(stepNum, logMsg, logType) {
    const step = document.getElementById(`step-${stepNum}`);
    step.className = 'matrix-step active';
    step.querySelector('.matrix-step-status').innerHTML = `<i data-lucide="loader" class="animate-spin"></i>`;
    appendTerminalLog(logMsg, logType);
    if (window.lucide) lucide.createIcons();
}

async function streamAlgorithms(count = 2) {
    for (let i = 0; i < count; i++) {
        const randIndex = Math.floor(Math.random() * algorithmSnippets.length);
        appendTerminalLog(`> ${algorithmSnippets[randIndex]}`, 'dim');
        await wait(250);
    }
}

function completeStep(stepNum, logMsg) {
    const step = document.getElementById(`step-${stepNum}`);
    step.className = 'matrix-step completed';
    step.querySelector('.matrix-step-status').innerHTML = `<i data-lucide="check"></i>`;
    appendTerminalLog(`✓ ${logMsg}`, 'green');
    if (window.lucide) lucide.createIcons();
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Simulador Móvil de Chat
function sendQuickMessage(text) {
    const input = document.getElementById('chat-input');
    input.value = text;
    sendChatMessage();
}

function handleChatKeyPress(e) {
    if (e.key === 'Enter') {
        sendChatMessage();
    }
}

async function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const msg = input.value.trim();
    if (!msg) return;
    
    const chatBody = document.getElementById('chat-messages');
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Burbuja usuario
    const userBubble = document.createElement('div');
    userBubble.className = 'wa-bubble-msg outgoing-msg';
    userBubble.innerHTML = `<p>${escapeHtml(msg)}</p><span class="wa-time-stamp">${now}</span>`;
    chatBody.appendChild(userBubble);
    
    input.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;
    
    const lower = msg.toLowerCase();
    
    // Manejo de regreso al Menú o cambio de modo
    if (msg === "9" || lower === 'menu' || lower === 'menú' || lower === 'inicio' || lower === 'hola' || lower === 'comercial' || lower === 'mexabot') {
        isBotPaused = false;
        isFreeAiMode = false;
        isNativeAdminMode = false;
        currentMenuLevel = 'main';
        
        const nameEl = document.getElementById('preview-bot-name');
        if (nameEl) nameEl.innerText = "MexaBot — IA Comercial";

        const replyBubble = document.createElement('div');
        replyBubble.className = 'wa-bubble-msg incoming-msg';
        replyBubble.innerHTML = `<p>${mexabotMasterIdentity.welcomeMsg}</p><span class="wa-time-stamp">${now}</span>`;
        chatBody.appendChild(replyBubble);
        chatBody.scrollTop = chatBody.scrollHeight;
        return;
    }
    
    // Si está en Modo Agente Nativo (Administrador)
    if (isNativeAdminMode) {
        const typingBubble = document.createElement('div');
        typingBubble.className = 'wa-bubble-msg incoming-msg';
        typingBubble.innerHTML = `<p><em style="opacity:0.7;">Copiloto Nativo procesando instrucción...</em></p>`;
        chatBody.appendChild(typingBubble);
        chatBody.scrollTop = chatBody.scrollHeight;
        
        await wait(900);
        if (typingBubble.parentNode) chatBody.removeChild(typingBubble);
        
        const adminReply = `⚡ <strong>[Copiloto Nativo]:</strong><br>Instrucción recibida: <em>"${escapeHtml(msg)}"</em>.<br><br>He verificado el estado del kernel local. Todos los sockets y servicios se encuentran operando con latencia de 18ms. Puedes enviarme cualquier instrucción de desarrollo, script o diagnóstico del sistema.<br><br><em>(Envía '9' para volver al modo comercial público).</em>`;
        
        const botBubble = document.createElement('div');
        botBubble.className = 'wa-bubble-msg incoming-msg';
        botBubble.innerHTML = `<p>${adminReply}</p><span class="wa-time-stamp">${now}</span>`;
        chatBody.appendChild(botBubble);
        chatBody.scrollTop = chatBody.scrollHeight;
        return;
    }
    
    // Si está pausado (Modo Asesor Humano para clientes)
    if (isBotPaused) {
        // En silencio esperando traspaso humano
        return;
    }
    
    // Indicador "Escribiendo..." con animación
    const typingBubble = document.createElement('div');
    typingBubble.className = 'wa-bubble-msg incoming-msg';
    typingBubble.innerHTML = `<p><em style="opacity:0.7;">MexaBot está escribiendo...</em></p>`;
    chatBody.appendChild(typingBubble);
    chatBody.scrollTop = chatBody.scrollHeight;
    
    // Inferencia contextual con delay humano
    await wait(800);
    if (typingBubble.parentNode) {
        chatBody.removeChild(typingBubble);
    }
    
    let replyText = "";
    
    // Ruteo de opciones numeradas
    if (msg === "0" || lower.includes("humano") || lower.includes("asesor") || lower.includes("pausar")) {
        // En el sandbox permitimos probar el Modo Admin Nativo
        isNativeAdminMode = true;
        const nameEl = document.getElementById('preview-bot-name');
        if (nameEl) nameEl.innerText = "⚡ Copiloto Nativo (Admin)";
        replyText = mexabotMasterIdentity.options["0_admin"];
    } else if (msg === "1") {
        currentMenuLevel = 'asistentes';
        replyText = mexabotMasterIdentity.options["1"];
    } else if (msg === "2") {
        currentMenuLevel = 'instalacion';
        replyText = mexabotMasterIdentity.options["2"];
    } else if (msg === "3") {
        currentMenuLevel = 'precios';
        replyText = mexabotMasterIdentity.options["3"];
    } else if (msg === "4") {
        currentMenuLevel = 'activacion';
        replyText = mexabotMasterIdentity.options["4"];
    } else if (msg === "5") {
        isFreeAiMode = true;
        replyText = mexabotMasterIdentity.options["5"];
    } else if (currentMenuLevel === 'asistentes' && (msg === "1" || msg === "11")) {
        replyText = mexabotMasterIdentity.options["1_1"];
    } else if (currentMenuLevel === 'asistentes' && (msg === "2" || msg === "12")) {
        replyText = mexabotMasterIdentity.options["1_2"];
    } else if (currentMenuLevel === 'asistentes' && (msg === "3" || msg === "13")) {
        replyText = mexabotMasterIdentity.options["1_3"];
    } else if (currentMenuLevel === 'asistentes' && (msg === "4" || msg === "14")) {
        replyText = mexabotMasterIdentity.options["1_4"];
    } else if (currentMenuLevel === 'activacion' && msg === "1") {
        replyText = mexabotMasterIdentity.options["4_1"];
    } else if (isFreeAiMode) {
        replyText = `🧠 <strong>Respuesta IA (MexaBot Live Core):</strong><br><br>Respecto a <em>"${escapeHtml(msg)}"</em>: Nuestra arquitectura permite automatizar completamente este proceso sin fricción técnica. El asistente responderá de forma determinista y en tiempo real.<br><br>1️⃣ Ver Asistentes Disponibles<br>2️⃣ Ver Métodos de Instalación<br>3️⃣ Ver Precios y Paquetes<br>9️⃣ Volver al Menú Principal`;
    } else {
        replyText = `He recibido tu mensaje. Por favor responde con el número de la opción:<br><br>1️⃣ Conocer Asistentes Disponibles<br>2️⃣ Métodos de Instalación<br>3️⃣ Precios y Paquetes<br>4️⃣ Proceso de Activación<br>5️⃣ Probar la IA en vivo<br>9️⃣ Volver al Menú<br>0️⃣ Pausar / Asesor Humano`;
    }
    
    const botBubble = document.createElement('div');
    botBubble.className = 'wa-bubble-msg incoming-msg';
    botBubble.innerHTML = `<p>${replyText}</p><span class="wa-time-stamp">${now}</span>`;
    chatBody.appendChild(botBubble);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
}

// Iniciar estado
document.addEventListener('DOMContentLoaded', () => {
    updateSelectedRolePreview();

    // Detección de entorno nativo Desktop OS (.exe)
    if (window.mexabotNative) {
        document.body.classList.add('is-desktop');
        appendTerminalLog(`[MexaBot OS] Inicializado en entorno nativo de escritorio (Windows).`, 'cyan');
        
        // Escuchar logs en tiempo real emitidos por el subproceso
        window.mexabotNative.onLog((logData) => {
            appendTerminalLog(logData.text, logData.type || 'dim');
        });

        window.mexabotNative.onStepUpdate((stepData) => {
            if (stepData.status === 'active') {
                runStep(stepData.step, `[Paso ${stepData.step}] ${stepData.message}`, 'cyan');
            } else if (stepData.status === 'completed') {
                completeStep(stepData.step, stepData.message);
            }
        });

        window.mexabotNative.onFinished((result) => {
            appendTerminalLog(`✓ [Finalizado] Asistente configurado y listo en ${result.path}`, 'green');
        });

        window.mexabotNative.onError((errMsg) => {
            appendTerminalLog(`✗ [Fallo] ${errMsg}`, 'red');
        });

        // Verificar prerequisitos del sistema
        window.mexabotNative.checkPrerequisites().then(prereqs => {
            appendTerminalLog(`[Prerrequisitos] OS: ${prereqs.os} | Node: ${prereqs.node} | Docker: ${prereqs.docker}`, 'dim');
        });
    }
});

// Base de Datos Exhaustiva de Escalas, Precios Transparentes y Procesos en Segundo Plano
const scaleDeepDiveData = {
    starter: {
        title: "PLAN 01: INICIAL / PROFESIONISTA (1 ASISTENTE)",
        subtitle: "DESPLIEGUE LOCAL PC / MINI PC · OPENCLAW GATEWAY :18789 · IA GESTIONADA",
        paypalUrl: "https://paypal.me/DixLqb/2490MXN",
        geminiPricing: {
            setupPrice: "$2,490 MXN",
            setupFee: "$2,490 MXN (Pago Único de Instalación y Parametrización)",
            monthlyFee: "$790 MXN / mes (Todo Incluido: IA, Soporte y Monitoreo)",
            includedCapacity: "Hasta 2,500 conversaciones mensuales incluidas (Cero cobros sorpresa de tokens).",
            coverageNote: "Incluye enlace a WhatsApp, reglas comerciales personalizadas y soporte a fallas."
        },
        foregroundSteps: [
            "Descarga desatendida del paquete binario de OpenClaw y Node.js en WSL2/Windows.",
            "Apertura del gestor de sistema para vincular puerto local 18789 con loopback seguro.",
            "Generación determinista de SOUL.md e IDENTITY.md según el arquetipo elegido.",
            "Despliegue del simulador interactivo en pantalla dividida para validación visual."
        ],
        backgroundProcesses: [
            { pid: "PID: openclaw-gateway", desc: "Daemon residente que mantiene el WebSocket abierto en ws://127.0.0.1:18789 con reconexión automática en caso de caída." },
            { pid: "PID: whatsapp-baileys-bridge", desc: "Proceso que escucha los eventos de red de WhatsApp Web. Mantiene viva la sesión de credenciales sin pedir QR en cada arranque." },
            { pid: "PID: env-secret-resolver", desc: "Inyector de memoria que alimenta las llaves de IA en tiempo de ejecución sin tocar la base de datos SQLite (Lock-Free)." },
            { pid: "PID: health-monitor-cron", desc: "Hilo de monitoreo cada 30 segundos que revisa que el socket no esté colgado y reinicia subprocesos en < 200ms si hay timeout." }
        ]
    },
    pro: {
        title: "PLAN 02: EMPRESA / MULTI-AGENTE (HASTA 3 ASISTENTES)",
        subtitle: "SERVIDOR VPS LINUX DEDICADO 24/7 · BASE RAG DOCUMENTAL · SLAS COMERCIALES",
        paypalUrl: "https://paypal.me/DixLqb/4990MXN",
        geminiPricing: {
            setupPrice: "$4,990 MXN",
            setupFee: "$4,990 MXN (Pago Único de Instalación Multi-Agente y RAG)",
            monthlyFee: "$1,490 MXN / mes (Todo Incluido: Servidor VPS 24/7 + IA + Soporte Prioritario)",
            includedCapacity: "Hasta 10,000 conversaciones mensuales y lectura de PDFs/Catálogos.",
            coverageNote: "Incluye servidor VPS en la nube, integración a Google Calendar y mantenimiento continuo."
        },
        foregroundSteps: [
            "Aprovisionamiento automático de servidor VPS en la nube con respaldo diario.",
            "Indexación de catálogos y manuales PDF mediante embeddings vectoriales para RAG.",
            "Configuración de Webhooks seguros con Google Calendar y sistemas CRM (HubSpot/Zoho).",
            "Monitoreo en tiempo real del tráfico comercial con dashboard de conversión."
        ],
        backgroundProcesses: [
            { pid: "PID: openclaw-cluster-node", desc: "Instancia multihilo con balanceador de carga local para atender hasta 50 chats simultáneos sin degradación." },
            { pid: "PID: vector-knowledge-indexer", desc: "Demostrador RAG que realiza búsquedas de similitud coseno en memoria caché para responder preguntas sobre PDFs en < 300ms." },
            { pid: "PID: webhook-dispatcher", desc: "Hilo asíncrono que envía prospectos calificados, citas y resúmenes a Google Calendar y correo corporativo." },
            { pid: "PID: phone-link-keepalive", desc: "Servicio de pulso TCP que envía 'no-op packets' cada 15s para evitar que WhatsApp suspenda la sesión por inactividad." }
        ]
    },
    enterprise: {
        title: "PLAN 03: CORPORATIVO LLAVE EN MANO (ALTO VOLUMEN)",
        subtitle: "CLÚSTER AISLADO · WHATSAPP CLOUD API OFICIAL (META) · BASE DISTRIBUIDA",
        paypalUrl: "https://paypal.me/DixLqb/9990MXN",
        geminiPricing: {
            setupPrice: "$9,990 MXN",
            setupFee: "$9,990 MXN (Pago Único de Arquitectura e Integración Completa)",
            monthlyFee: "$2,990 MXN / mes (Todo Incluido: IA Ilimitada + Asesor Dedicado 24/7 + SLA 99.9%)",
            includedCapacity: "Capacidad de IA Ilimitada para alto volumen empresarial sin cortes.",
            coverageNote: "Incluye WhatsApp Cloud API oficial de Meta, integración a ERP/Bases de datos y SLA garantizado."
        },
        foregroundSteps: [
            "Despliegue de clúster aislado en Docker/Kubernetes con balanceo de carga.",
            "Enlace oficial con Meta Graph API (WhatsApp Cloud API) sin depender de teléfonos físicos.",
            "Integración de bases de datos PostgreSQL distribuidas y almacenamiento encriptado.",
            "Consola de auditoría para comités de seguridad y cumplimiento normativo."
        ],
        backgroundProcesses: [
            { pid: "PID: k8s-auto-scaler", desc: "Orquestador de pods que levanta réplicas en caliente cuando la concurrencia supera los 500 mensajes por segundo." },
            { pid: "PID: meta-cloud-api-gateway", desc: "Manejador de Webhooks HTTP/2 con certificación TLS y entrega garantizada mediante colas Redis/RabbitMQ." },
            { pid: "PID: postgres-distributed-pool", desc: "Gestor de conexiones con pool optimizado para registrar historial de clientes, etiquetas y estados de compra." },
            { pid: "PID: audit-compliance-watcher", desc: "Filtro de seguridad que anonimiza datos sensibles y almacena registros criptográficos inmutables." }
        ]
    }
};

// Abrir Modal de Diagnóstico y Procesos en Segundo Plano
function openScaleDeepDive(scaleKey) {
    const data = scaleDeepDiveData[scaleKey];
    if (!data) return;
    
    document.getElementById('modal-scale-title').innerText = data.title;
    document.getElementById('modal-scale-subtitle').innerText = data.subtitle;
    
    const body = document.getElementById('modal-scale-body');
    body.innerHTML = `
        <!-- Sección 1: Costos Transparentes y Modelo de Implementación -->
        <div class="deep-dive-section-block">
            <div class="block-title"><i data-lucide="calculator"></i> MODELO COMERCIAL: INSTALACIÓN + MENSUALIDAD TODO INCLUIDO</div>
            <div class="financial-math-box">
                <div class="math-card">
                    <h5>SETUP & INSTALACIÓN TÉCNICA (PAGO ÚNICO)</h5>
                    <p><strong>Tarifa de Instalación:</strong> ${data.geminiPricing.setupFee}</p>
                    <p style="margin-top:6px; color:#94a3b8; font-size:0.75rem;">${data.geminiPricing.coverageNote}</p>
                    <p style="margin-top:6px; color:#10b981; font-size:0.75rem;">✓ Entorno 100% probado, configurado y operando en tu propio número.</p>
                </div>
                <div class="math-card">
                    <h5>MENSUALIDAD TODO INCLUIDO (IA + SOPORTE)</h5>
                    <p><strong>Cuota Mensual Fija:</strong> ${data.geminiPricing.monthlyFee}</p>
                    <p><strong>Capacidad de IA:</strong> ${data.geminiPricing.includedCapacity}</p>
                    <p style="margin-top:6px; color:#38bdf8; font-size:0.75rem;">🔒 Cero cobros sorpresa: consumo de tokens y atención cubiertos.</p>
                </div>
            </div>
        </div>

        <!-- Sección 2: Lo que hace el código en Primer Plano -->
        <div class="deep-dive-section-block">
            <div class="block-title"><i data-lucide="terminal"></i> PROCESOS EN PRIMER PLANO (LO QUE VES EN PANTALLA)</div>
            <div class="thread-step-list">
                ${data.foregroundSteps.map((step, idx) => `
                    <div class="thread-node">
                        <span class="thread-pid">PASO 0${idx+1}</span>
                        <span class="thread-detail">${step}</span>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Sección 3: Hilos de Ejecución en Segundo Plano (El Kernel) -->
        <div class="deep-dive-section-block">
            <div class="block-title"><i data-lucide="cpu"></i> HILOS Y DAEMONS EN SEGUNDO PLANO (CÓMO OPERA EL KERNEL)</div>
            <div class="thread-step-list">
                ${data.backgroundProcesses.map(proc => `
                    <div class="thread-node">
                        <span class="thread-pid">${proc.pid}</span>
                        <span class="thread-detail">${proc.desc}</span>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Sección 4: Checkout Seguro PayPal -->
        <div class="deep-dive-section-block" style="border-top:1px solid rgba(0,240,255,0.25); padding-top:16px; margin-top:16px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
            <div style="font-size:0.85rem; color:#94a3b8;">
                <span style="color:#10b981;">● Garantía de Despliegue</span> · Setup inicial en menos de 24 horas.
            </div>
            <a href="${data.paypalUrl}" target="_blank" class="hud-btn hud-btn-primary" style="background: linear-gradient(135deg, #0070ba, #003087); border-color:#0070ba; color:#fff; text-decoration:none; padding:10px 20px; font-weight:700; border-radius:6px; box-shadow:0 0 15px rgba(0,112,186,0.5);">
                💳 PAGAR SETUP CON PAYPAL (${data.geminiPricing.setupPrice})
            </a>
        </div>
    `;
    
    document.getElementById('scale-deep-dive-modal').classList.add('open');
    if (window.lucide) {
        try { lucide.createIcons(); } catch(e){}
    }
}

// Cerrar Modal
function closeScaleDeepDive(e) {
    if (e && e.target && e.target.id !== 'scale-deep-dive-modal' && !e.target.classList.contains('modal-close-btn')) {
        return;
    }
    document.getElementById('scale-deep-dive-modal').classList.remove('open');
}
