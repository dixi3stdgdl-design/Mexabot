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

// Base de Datos Exhaustiva de Escalas, Precios Oficiales y Procesos en Segundo Plano
const scaleDeepDiveData = {
    starter: {
        title: "ESCALA 01: STARTER NEURAL (1 A 10 USUARIOS)",
        subtitle: "DESPLIEGUE LOCAL PC · WSL2 / WINDOWS · OPENCLAW GATEWAY :18789",
        geminiPricing: {
            model: "Google Gemini 3.5 Flash Lite",
            officialCost: "$0.075 USD por 1 Millón de Tokens de Entrada / $0.30 USD por 1M Tokens de Salida",
            mexabotFee: "$29.00 USD / mes (Licencia de Software, Orquestador Visual y Actualizaciones)",
            monthlyEstimate: "Aproximadamente $29 a $32 USD / mes para 3,000 conversaciones mensuales."
        },
        foregroundSteps: [
            "Descarga desatendida del paquete binario de OpenClaw y Node.js en WSL2.",
            "Apertura del gestor de sistema para vincular puerto local 18789 con loopback seguro.",
            "Generación determinista de SOUL.md e IDENTITY.md según el arquetipo elegido.",
            "Despliegue del simulador interactivo en pantalla dividida para validación visual."
        ],
        backgroundProcesses: [
            { pid: "PID: openclaw-gateway", desc: "Daemon residente que mantiene el WebSocket abierto en ws://127.0.0.1:18789 con reconexión automática en caso de caída." },
            { pid: "PID: whatsapp-baileys-bridge", desc: "Proceso que escucha los eventos de red de WhatsApp Web. Mantiene viva la sesión de credenciales sin pedir QR en cada arranque." },
            { pid: "PID: env-secret-resolver", desc: "Inyector de memoria que alimenta env.GEMINI_API_KEY en tiempo de ejecución sin tocar la base de datos SQLite (Lock-Free)." },
            { pid: "PID: health-monitor-cron", desc: "Hilo de monitoreo cada 30 segundos que revisa que el socket no esté colgado y reinicia subprocesos en < 200ms si hay timeout." }
        ]
    },
    pro: {
        title: "ESCALA 02: PRO DEDICATED VPS (10 A 100 COLABORADORES)",
        subtitle: "SERVIDOR VPS LINUX / DOCKER 24/7 · BASE RAG DOCUMENTAL · SLAS COMERCIALES",
        geminiPricing: {
            model: "Google Gemini 3.5 Flash (Con Embeddings Vectoriales)",
            officialCost: "$0.15 USD por 1 Millón de Tokens de Entrada / $0.60 USD por 1M Tokens de Salida",
            mexabotFee: "$89.00 USD / mes (Servidor VPS Dedicado 24/7, Pipeline RAG y Mantenimiento)",
            monthlyEstimate: "Aproximadamente $89 a $98 USD / mes para 25,000 conversaciones y documentos adjuntos."
        },
        foregroundSteps: [
            "Aprovisionamiento automático de servidor VPS en la nube (8 vCPU / 16 GB RAM).",
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
        title: "ESCALA 03: ENTERPRISE CLUSTER (1,000+ USUARIOS)",
        subtitle: "CLÚSTER KUBERNETES · WHATSAPP CLOUD API OFICIAL (META) · BASE DISTRIBUIDA",
        geminiPricing: {
            model: "Google Gemini 3.5 Pro (Razonamiento Complejo & Multi-Agente)",
            officialCost: "$1.25 USD por 1 Millón de Tokens de Entrada / $5.00 USD por 1M Tokens de Salida",
            mexabotFee: "$299.00 USD / mes (Clúster Cloud K8s, WhatsApp Cloud API Meta, SLA 99.99% y Soporte Dedicado)",
            monthlyEstimate: "Aproximadamente $299 a $380 USD / mes para 100,000+ conversaciones con alta concurrencia."
        },
        foregroundSteps: [
            "Despliegue de clúster Kubernetes con pods autoescalables basados en el tráfico de red.",
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
        <!-- Sección 1: Costos Oficiales y Margen de Software -->
        <div class="deep-dive-section-block">
            <div class="block-title"><i data-lucide="calculator"></i> ESTRUCTURA DE PRECIOS TRANSPARENTE</div>
            <div class="financial-math-box">
                <div class="math-card">
                    <h5>COSTO OFICIAL MODELO IA (GOOGLE GEMINI)</h5>
                    <p><strong>Modelo:</strong> ${data.geminiPricing.model}</p>
                    <p><strong>Tarifa Oficial Google:</strong> ${data.geminiPricing.officialCost}</p>
                    <p style="margin-top:6px; color:#94a3b8; font-size:0.75rem;">* Facturado directamente al consumo real de tokens sin sobreprecios.</p>
                </div>
                <div class="math-card">
                    <h5>SUITE DE SOFTWARE & INGENIERÍA MEXABOT</h5>
                    <p><strong>Tarifa Mensual:</strong> ${data.geminiPricing.mexabotFee}</p>
                    <p><strong>Inversión Total Estimada:</strong> ${data.geminiPricing.monthlyEstimate}</p>
                    <p style="margin-top:6px; color:#10b981; font-size:0.75rem;">✓ Incluye orquestación, soporte técnico, pasarela y actualizaciones.</p>
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
    `;
    
    document.getElementById('scale-deep-dive-modal').classList.add('open');
    if (window.lucide) lucide.createIcons();
}

// Cerrar Modal
function closeScaleDeepDive(e) {
    if (e && e.target && e.target.id !== 'scale-deep-dive-modal' && !e.target.classList.contains('modal-close-btn')) {
        return;
    }
    document.getElementById('scale-deep-dive-modal').classList.remove('open');
}
