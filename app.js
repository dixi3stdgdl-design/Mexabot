// MEXABOT — Neural Command OS Engine & Holographic Algorithms Controller

const agentPresets = {
    sales: {
        name: "Aura — Cierre Comercial",
        roleTitle: "Cerrador de Ventas WhatsApp",
        welcomeMsg: "¡Hola! 👋 Soy <strong>Aura</strong>, consultora comercial de <em>{bizName}</em>. Me especializo en analizar las necesidades de tu empresa, presentarte soluciones de automatización y formular cotizaciones a medida. ¿Qué proceso comercial buscas optimizar hoy?",
        responses: {
            "precios": "Nuestras soluciones cuentan con opciones escalables: paquetes iniciales para negocios locales y cotizaciones personalizadas según el volumen de mensajes de tu empresa. ¿Te gustaría que formulemos una propuesta para tu equipo?",
            "demo": "¡Excelente iniciativa! Podemos coordinar una sesión técnica de 15 minutos en vivo para mostrarte la arquitectura en funcionamiento. ¿Qué día y horario te acomoda mejor?",
            "integracion": "El despliegue opera mediante OpenClaw Gateway con socket local seguro en el puerto 18789 y enlace directo a WhatsApp Business. ¡Cero dependencias manuales ni errores de compilación!",
            "default": "Comprendo el objetivo de tu negocio. Con nuestra arquitectura neural podemos automatizar esa interacción 24/7 con respuestas inmediatas y traspaso asistido a tu equipo humano. ¿Deseas que activemos una prueba piloto?"
        }
    },
    calendar: {
        name: "Cronos — Recepción & Citas",
        roleTitle: "Recepción & Agendamiento 24/7",
        welcomeMsg: "¡Hola! 📅 Soy <strong>Cronos</strong>, recepcionista digital de <em>{bizName}</em>. Gestiono agendas y citas en tiempo real sin esperas. ¿Para qué fecha u horario buscas disponibilidad?",
        responses: {
            "precios": "El módulo de agendamiento y confirmación anti-inasistencia está integrado en todas nuestras configuraciones de recepción inteligente.",
            "demo": "Podemos agendar una llamada de 15 minutos para sincronizar tu Google Calendar o Cal.com. ¿Prefieres hoy por la tarde o mañana?",
            "integracion": "Nos sincronizamos mediante Webhooks bidireccionales con Google Calendar, Outlook y Cal.com para evitar duplicidad de turnos.",
            "default": "Perfecto. He consultado los bloques libres en la agenda y puedo apartar ese espacio para ti de inmediato. ¿Me confirmas tu nombre completo y correo de contacto?"
        }
    },
    support: {
        name: "Atlas — Helpdesk RAG",
        roleTitle: "Soporte Técnico & Base Documental",
        welcomeMsg: "¡Buen día! 🛡️ Soy <strong>Atlas</strong>, especialista de soporte técnico de <em>{bizName}</em>. Cuéntame con qué módulo o proceso requieres asistencia hoy.",
        responses: {
            "precios": "Los acuerdos de nivel de servicio (SLA) incluyen soporte continuo 24/7, base documental privada y escalamiento prioritario.",
            "demo": "Podemos coordinar una demostración con tu departamento de sistemas para revisar las políticas de aislamiento y cifrado.",
            "integracion": "Soportamos integración con repositorios documentales PDF/Docs, Zendesk, Jira y WhatsApp Business API.",
            "default": "He registrado tu consulta técnica. Según los protocolos de nuestra base documental, el procedimiento recomendado es validar las variables de entorno. ¿Deseas que te guíe paso a paso?"
        }
    },
    executive: {
        name: "Nova — Asistente Ejecutivo",
        roleTitle: "Copiloto de Productividad",
        welcomeMsg: "¡Hola! 🚀 Soy <strong>Nova</strong>, tu copiloto ejecutivo para <em>{bizName}</em>. Envíame notas de voz, listas de tareas o minutas y las convertiré en acciones concretas.",
        responses: {
            "precios": "Nova cuenta con planes individuales para directivos y licencias por volumen para equipos ejecutivos.",
            "demo": "Envíame cualquier nota de voz extensa o lista desordenada y verás cómo estructuro un resumen ejecutivo en segundos.",
            "integracion": "Opera nativamente en WhatsApp, Telegram y Notion para que mantengas tu flujo de trabajo habitual.",
            "default": "Registrado en tu matriz de prioridades del día. He configurado una alerta de seguimiento para las 5:00 PM."
        }
    }
};

let currentPreset = 'sales';

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
    
    const bizName = document.getElementById('biz-name').value || 'Tu Negocio';
    const preset = agentPresets[currentPreset];
    
    const nameEl = document.getElementById('preview-bot-name');
    if (nameEl) nameEl.innerText = preset.name;
    
    const chatBody = document.getElementById('chat-messages');
    if (chatBody) {
        chatBody.innerHTML = `
            <div class="wa-bubble-msg incoming-msg">
                <p>${preset.welcomeMsg.replace('{bizName}', bizName)}</p>
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
    "SHA256(entropy) => 0x9f82ab44e1 · Cipher handshake initialized",
    "AST.compile('SOUL.md') => { temperature: 0.35, max_tokens: 300, format: 'mobile_concise' }",
    "OpenClaw.Kernel.bindPort(18789) · Socket listening on loopback",
    "Meta.Policy.verify('dm_policy', 'open') · Whitelist bypassed for customer acquisition",
    "Gemini.GenerativeAI.ping('gemini-3.5-flash-lite') · 200 OK (Latency: 84ms)",
    "ADB.Bridge.checkDeviceState('USB_DEBUG_MODE') · Device verified (Active Link)",
    "VectorIndex.embedKnowledge() · Cosine similarity cache warm"
];

// Orquestación en Vivo con Algoritmos y Transiciones con Delay Cinemático
async function startLiveOrchestration(e) {
    e.preventDefault();
    
    const btn = document.getElementById('btn-deploy');
    const bizName = document.getElementById('biz-name').value;
    const phone = document.getElementById('biz-phone').value;
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
    
    // Step 1: Compilación de Identidad & Reglas
    await runStep(1, `[Fase 1] Inicializando compilador semántico para "${bizName}"...`, 'cyan');
    await streamAlgorithms(2);
    await wait(1400);
    completeStep(1, `SOUL.md compilado con formato móvil de 2-4 líneas y árboles de decisión.`);
    
    // Step 2: Inyección de Credenciales & Aislamiento
    await runStep(2, `[Fase 2] Inyectando variable segura env.GEMINI_API_KEY en espacio de kernel...`, 'purple');
    await streamAlgorithms(2);
    await wait(1500);
    completeStep(2, `Credenciales inyectadas sin bloqueos de SQLite (Lock-Free State).`);
    
    // Step 3: Enlace de Socket & Política Abierta
    await runStep(3, `[Fase 3] Vinculando socket de mensajería para ${phone} (dm_policy: open)...`, 'cyan');
    await streamAlgorithms(2);
    await wait(1600);
    completeStep(3, `Canal de WhatsApp enlazado y listo para recibir llamadas entrantes.`);
    
    // Step 4: Sincronización en Tiempo Real con Sandbox
    await runStep(4, `[Fase 4] Estableciendo puente de telemetría con el emulador móvil...`, 'green');
    await streamAlgorithms(1);
    await wait(1000);
    completeStep(4, `¡Asistente 100% activo en producción y simulador sincronizado!`);
    
    statusText.innerText = 'SISTEMA 100% OPERATIVO EN VIVO';
    btn.disabled = false;
    btn.innerHTML = `<i data-lucide="check-circle-2"></i> ¡DESPLIEGUE COMPLETADO CON ÉXITO!`;
    if (window.lucide) lucide.createIcons();
    
    updateSelectedRolePreview();
    
    // Scroll focalizado al smartphone con leve delay
    setTimeout(() => {
        const phoneElem = document.querySelector('.cyber-device-frame');
        if (phoneElem) phoneElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 600);
}

async function streamAlgorithms(count = 2) {
    for (let i = 0; i < count; i++) {
        const snippet = algorithmSnippets[Math.floor(Math.random() * algorithmSnippets.length)];
        appendTerminalLog(`> ${snippet}`, 'dim');
        await wait(350);
    }
}

function runStep(stepNum, logMsg, logType) {
    return new Promise(resolve => {
        const step = document.getElementById(`step-${stepNum}`);
        step.className = 'matrix-step active';
        step.querySelector('.matrix-step-status').innerHTML = `<i data-lucide="loader" class="animate-spin"></i>`;
        appendTerminalLog(logMsg, logType);
        if (window.lucide) lucide.createIcons();
        resolve();
    });
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
    
    // Indicador "Escribiendo..." con animación
    const typingBubble = document.createElement('div');
    typingBubble.className = 'wa-bubble-msg incoming-msg';
    typingBubble.innerHTML = `<p><em style="opacity:0.7;">Analizando intención semántica...</em></p>`;
    chatBody.appendChild(typingBubble);
    chatBody.scrollTop = chatBody.scrollHeight;
    
    // Inferencia contextual con delay de tipeo humano
    await wait(1100);
    chatBody.removeChild(typingBubble);
    
    const lower = msg.toLowerCase();
    const preset = agentPresets[currentPreset];
    let replyText = preset.responses.default;
    
    if (lower.includes('precio') || lower.includes('costo') || lower.includes('plan')) {
        replyText = preset.responses.precios;
    } else if (lower.includes('demo') || lower.includes('cita') || lower.includes('agendar') || lower.includes('reunion') || lower.includes('llamada')) {
        replyText = preset.responses.demo;
    } else if (lower.includes('integracion') || lower.includes('como funciona') || lower.includes('instalar') || lower.includes('opera')) {
        replyText = preset.responses.integracion;
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
});
