// AutomaPulse AI - Orchestrator & Sandbox Controller

const agentPresets = {
    sales: {
        name: "Aura — Cerrador de Ventas",
        roleTitle: "Cerrador de Ventas WhatsApp",
        welcomeMsg: "¡Hola! 👋 Soy <strong>Aura</strong> de <em>{bizName}</em>. Me especializo en asesorarte con nuestros servicios, enviarte cotizaciones personalizadas y ayudarte a elegir la mejor opción para tu negocio. ¿En qué área buscas mejorar hoy?",
        responses: {
            "precios": "Nuestros planes comienzan con una prueba sin costo y paquetes desde $49 USD/mes adaptados al volumen de mensajes de tu empresa. ¿Te gustaría que te envíe un desglose detallado?",
            "demo": "¡Con gusto! Puedes agendar una sesión en vivo de 15 minutos con nuestro equipo en este enlace: https://cal.com/automa-pulse o dime qué día te acomoda mejor.",
            "integracion": "Nos integramos en menos de 60 segundos conectando tu número de WhatsApp directamente con IA de Google Gemini 3.5. ¡Cero código ni configuraciones complejas!",
            "default": "Comprendo perfectamente lo que necesitas para tu negocio. Con nuestra IA podemos automatizar ese proceso en WhatsApp las 24 horas del día. ¿Te gustaría activarlo ahora mismo?"
        }
    },
    calendar: {
        name: "Cronos — Agendador & Citas",
        roleTitle: "Recepcionista & Agendamiento",
        welcomeMsg: "¡Hola! 📅 Soy <strong>Cronos</strong>, recepcionista digital de <em>{bizName}</em>. Estoy aquí para coordinar tus citas y resolver tus dudas sin esperas. ¿Para qué fecha u horario buscas disponibilidad?",
        responses: {
            "precios": "El servicio de agendamiento y recordatorios anti-inasistencia está incluido en todos nuestros planes de recepción inteligente.",
            "demo": "Tenemos disponibilidad hoy a las 4:00 PM o mañana a las 11:00 AM. ¿Cuál te queda mejor para confirmar tu espacio?",
            "integracion": "Sincronizamos directamente con Google Calendar, Outlook y Cal.com para evitar dobles reservas automáticamente.",
            "default": "Excelente. He verificado los horarios y puedo bloquear ese espacio para ti de inmediato. ¿Me confirmas tu nombre completo?"
        }
    },
    support: {
        name: "Atlas — Helpdesk Corporativo",
        roleTitle: "Soporte Corporativo 24/7",
        welcomeMsg: "¡Buen día! 🛡️ Soy <strong>Atlas</strong>, del equipo de soporte de <em>{bizName}</em>. Cuéntame con qué módulo o requerimiento necesitas asistencia técnica hoy.",
        responses: {
            "precios": "Nuestros SLA de soporte empresarial incluyen atención 24/7, base de conocimiento privada y escalamiento prioritario.",
            "demo": "Podemos coordinar una demostración con tu equipo de sistemas para mostrarte las políticas de seguridad y cifrado.",
            "integracion": "Soportamos conectores directos a Zendesk, Jira, Slack y WhatsApp Business API con certificados de nivel empresarial.",
            "default": "He registrado tu solicitud en el sistema. Según nuestros manuales, el paso recomendado es verificar la sincronización del token. ¿Deseas que te guíe paso a paso?"
        }
    },
    executive: {
        name: "Nova — Asistente Ejecutivo",
        roleTitle: "Copiloto de Productividad",
        welcomeMsg: "¡Hola! 🚀 Soy <strong>Nova</strong>, tu copiloto ejecutivo para <em>{bizName}</em>. Envíame audios, notas o listas de pendientes y los convertiré en acciones concretas.",
        responses: {
            "precios": "Nova cuenta con planes individuales para directivos y licencias corporativas por volumen para comités ejecutivos.",
            "demo": "Envíame un mensaje de audio o una lista desordenada y verás cómo genero un resumen ejecutivo estructurado en 3 segundos.",
            "integracion": "Funciona de manera nativa en WhatsApp, Telegram y Notion para que no cambies tu flujo de trabajo.",
            "default": "Anotado en tus prioridades del día. He generado un recordatorio para dar seguimiento hoy a las 5:00 PM."
        }
    }
};

let currentPreset = 'sales';

// Scroll to section helper
function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
    }
}

// Select Agent from Marketplace
function selectAgent(presetKey) {
    currentPreset = presetKey;
    const roleSelect = document.getElementById('agent-role-select');
    if (roleSelect) {
        roleSelect.value = presetKey;
    }
    updateSelectedRolePreview();
    scrollToSection('live-orchestrator');
    
    appendTerminalLog(`[Marketplace] Plantilla seleccionada: "${agentPresets[presetKey].roleTitle}". Parámetros cargados en el orquestador.`, 'text-cyan');
}

// Update Role Preview
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
            <div class="wa-message-bubble incoming">
                <p>${preset.welcomeMsg.replace('{bizName}', bizName)}</p>
                <span class="msg-time">Ahora</span>
            </div>
        `;
    }
}

// Terminal Log Helper
function appendTerminalLog(msg, cssClass = 'text-muted') {
    const term = document.getElementById('terminal-output');
    if (!term) return;
    
    const now = new Date().toLocaleTimeString();
    const line = document.createElement('div');
    line.className = `log-line ${cssClass}`;
    line.innerText = `[${now}] ${msg}`;
    term.appendChild(line);
    term.scrollTop = term.scrollHeight;
}

// Start Live Visual Orchestration
async function startLiveOrchestration(e) {
    e.preventDefault();
    
    const btn = document.getElementById('btn-deploy');
    const bizName = document.getElementById('biz-name').value;
    const phone = document.getElementById('biz-phone').value;
    const statusText = document.getElementById('orchestrator-status-text');
    
    btn.disabled = true;
    btn.innerHTML = `<i data-lucide="loader" class="animate-spin"></i> Orquestando en vivo...`;
    if (window.lucide) lucide.createIcons();
    
    statusText.innerText = 'Orquestación activa...';
    
    // Reset steps
    for (let i = 1; i <= 4; i++) {
        const step = document.getElementById(`step-${i}`);
        step.className = 'step-item';
        step.querySelector('.step-status').innerHTML = `<i data-lucide="clock"></i>`;
    }
    if (window.lucide) lucide.createIcons();
    
    // Step 1: Identity Generation
    await runStep(1, `Generando archivo SOUL.md e IDENTITY.md para "${bizName}"...`, 'text-cyan');
    await wait(1200);
    completeStep(1, `Identidad comercial y reglas de comportamiento generadas con éxito.`);
    
    // Step 2: Key Injection
    await runStep(2, `Inyectando variables seguras (env.GEMINI_API_KEY y socket local)...`, 'text-purple');
    await wait(1400);
    completeStep(2, `Credenciales enlazadas sin bloqueos de base de datos.`);
    
    // Step 3: Channel Linking
    await runStep(3, `Configurando canal WhatsApp para ${phone} (Política de acceso público: ON)...`, 'text-cyan');
    await wait(1500);
    completeStep(3, `Socket de WhatsApp vinculado correctamente.`);
    
    // Step 4: Live Mobile Sandbox Test
    await runStep(4, `Iniciando sesión en sandbox móvil para pruebas interactivas...`, 'text-green');
    await wait(1000);
    completeStep(4, `¡Asistente activo y listo para interactuar!`);
    
    statusText.innerText = '¡Asistente 100% Desplegado!';
    btn.disabled = false;
    btn.innerHTML = `<i data-lucide="check-circle"></i> ¡Asistente Desplegado con Éxito!`;
    if (window.lucide) lucide.createIcons();
    
    updateSelectedRolePreview();
    scrollToSection('mobile-sandbox');
}

function runStep(stepNum, logMsg, logClass) {
    return new Promise(resolve => {
        const step = document.getElementById(`step-${stepNum}`);
        step.className = 'step-item active';
        step.querySelector('.step-status').innerHTML = `<i data-lucide="loader" class="animate-spin"></i>`;
        appendTerminalLog(logMsg, logClass);
        if (window.lucide) lucide.createIcons();
        resolve();
    });
}

function completeStep(stepNum, logMsg) {
    const step = document.getElementById(`step-${stepNum}`);
    step.className = 'step-item completed';
    step.querySelector('.step-status').innerHTML = `<i data-lucide="check"></i>`;
    appendTerminalLog(`✓ ${logMsg}`, 'text-green');
    if (window.lucide) lucide.createIcons();
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Mobile Sandbox Chat Simulator
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
    
    // User bubble
    const userBubble = document.createElement('div');
    userBubble.className = 'wa-message-bubble outgoing';
    userBubble.innerHTML = `<p>${escapeHtml(msg)}</p><span class="msg-time">${now}</span>`;
    chatBody.appendChild(userBubble);
    
    input.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;
    
    // Typing indicator
    const typingBubble = document.createElement('div');
    typingBubble.className = 'wa-message-bubble incoming typing-bubble';
    typingBubble.innerHTML = `<p><em>Escribiendo...</em></p>`;
    chatBody.appendChild(typingBubble);
    chatBody.scrollTop = chatBody.scrollHeight;
    
    // Bot Response Logic
    await wait(1200);
    chatBody.removeChild(typingBubble);
    
    const lower = msg.toLowerCase();
    const preset = agentPresets[currentPreset];
    let replyText = preset.responses.default;
    
    if (lower.includes('precio') || lower.includes('costo') || lower.includes('plan')) {
        replyText = preset.responses.precios;
    } else if (lower.includes('demo') || lower.includes('cita') || lower.includes('agendar') || lower.includes('reunion')) {
        replyText = preset.responses.demo;
    } else if (lower.includes('integracion') || lower.includes('como funciona') || lower.includes('instalar')) {
        replyText = preset.responses.integracion;
    }
    
    const botBubble = document.createElement('div');
    botBubble.className = 'wa-message-bubble incoming';
    botBubble.innerHTML = `<p>${replyText}</p><span class="msg-time">${now}</span>`;
    chatBody.appendChild(botBubble);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
}

// Toggle FAQ / Troubleshooting accordion
function toggleFaq(el) {
    const card = el.parentElement;
    card.classList.toggle('open');
}

// Initial preview setup
document.addEventListener('DOMContentLoaded', () => {
    updateSelectedRolePreview();
});
