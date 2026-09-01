package com.mexabot.app.engine

import android.content.Context
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

data class GoldenQuestionsConfig(
    val bizName: String = "",
    val faqs: String = "",
    val catalogType: String = "",
    val hoursLocation: String = "",
    val closingGoal: String = "quote_payment", // quote_payment, appointment, order_delivery, b2b_advisor
    val activeRole: String = "sales", // sales, calendar, support, executive
    val isEnabled: Boolean = false,
    val isAudioBlocked: Boolean = true
)

data class AssistantStats(
    val messagesAnsweredToday: Int = 0,
    val leadsQualified: Int = 0,
    val avgLatencyMs: Long = 115L,
    val lastMessageSender: String = "Ninguno",
    val lastMessagePreview: String = "Esperando primer mensaje..."
)

object LocalAiEngine {

    private val _config = MutableStateFlow(GoldenQuestionsConfig())
    val config: StateFlow<GoldenQuestionsConfig> = _config.asStateFlow()

    private val _stats = MutableStateFlow(AssistantStats())
    val stats: StateFlow<AssistantStats> = _stats.asStateFlow()

    // Lista de contactos pausados individualmente (no afecta al resto de clientes)
    private val pausedSenders = mutableSetOf<String>()

    fun updateConfig(newConfig: GoldenQuestionsConfig) {
        _config.value = newConfig
    }

    fun toggleAssistant(enabled: Boolean) {
        _config.value = _config.value.copy(isEnabled = enabled)
    }

    fun resumeSender(sender: String) {
        pausedSenders.remove(sender.lowercase())
    }

    fun isSenderPaused(sender: String): Boolean {
        return pausedSenders.contains(sender.lowercase())
    }

    /**
     * Procesa un mensaje entrante de WhatsApp/Telegram de forma determinista y On-Device
     */
    fun processIncomingMessage(
        senderName: String,
        messageText: String?,
        isAudioOrMedia: Boolean
    ): String {
        val current = _config.value
        if (!current.isEnabled) return ""

        val text = messageText?.trim() ?: ""
        val lower = text.lowercase()
        val senderKey = senderName.trim().lowercase()

        // Si este contacto específico reactiva el menú
        if (lower == "9" || lower == "menu" || lower == "menú" || lower == "activar") {
            pausedSenders.remove(senderKey)
            recordReply(senderName, "👋 [Menú Principal / Reactivado]")
            return generateWelcomeMenu(current)
        }

        // Si este contacto específico está en pausa con un asesor humano, MexaBot NO interviene
        if (pausedSenders.contains(senderKey)) {
            return ""
        }

        // 1. REGLA 2.5: Procesamiento de Audio / Notas de Voz Inteligente
        // Si llega un audio genérico (ej. "hola", audio sin transcripción o primera interacción por voz), se despliega el menú de MexaBot
        if (isAudioOrMedia || lower.contains("[nota de voz]") || lower.contains("ptt-")) {
            recordReply(senderName, "🎙️ [Audio recibido ➔ Menú MexaBot enviado]")
            return generateWelcomeMenu(current)
        }

        // 2. REGLA 2.6: Manejo de Mensajes Vacíos o Stickers
        if (text.isEmpty()) {
            recordReply(senderName, "🖼️ [Sticker / Vacío ➔ Menú enviado]")
            return generateWelcomeMenu(current)
        }

        // 3. Comando 0: Pausa o Transferencia a Asesor Humano (EXCLUSIVO PARA ESTE CHAT)
        if (text == "0" || lower.contains("humano") || lower.contains("asesor") || lower.contains("pausar")) {
            pausedSenders.add(senderKey)
            recordReply(senderName, "🛑 [Pausado solo para este contacto]")
            return "🛑 *MexaBot Pausado para esta conversación.*\n\nUn asesor humano de *${current.bizName}* te atenderá en breve. Mientras tanto, el bot no enviará más mensajes automáticos en este chat.\n\n*(Escribe '9' o 'menu' si deseas volver a consultar el menú automatizado)*."
        }

        // 4. Menú de Bienvenida / Regreso al Menú Principal
        if (text == "9" || lower == "menu" || lower == "menú" || lower == "hola" || lower == "buenos dias" || lower == "buenas tardes") {
            recordReply(senderName, "👋 [Menú Principal]")
            return generateWelcomeMenu(current)
        }

        // 5. Opciones Numéricas del Menú Comercial
        val reply = when (text) {
            "1" -> "💼 *Catálogo de ${current.bizName}:*\n\n${current.catalogType}\n\n1️⃣ Ver Precios y Promociones\n2️⃣ Horarios y Ubicación\n9️⃣ Volver al Menú Principal\n0️⃣ Hablar con un asesor humano"
            "2" -> "📍 *Horarios y Ubicación de ${current.bizName}:*\n\n${current.hoursLocation}\n\n1️⃣ Cotizar productos/servicios\n9️⃣ Volver al Menú Principal\n0️⃣ Hablar con un asesor"
            "3" -> "📋 *Cotizaciones y Pedidos en ${current.bizName}:*\n\nEscribe la lista de materiales o productos que necesitas y te generamos tu presupuesto al momento.\n\n0️⃣ Hablar con un asesor humano"
            "4" -> "🚚 *Preguntas Frecuentes & Envíos:*\n\n${current.faqs}\n\n9️⃣ Volver al Menú Principal\n0️⃣ Hablar con un asesor"
            "5" -> "🧠 *Modo Asistente Activo:*\n\n¡Hola! Puedes hacerme cualquier consulta técnica o comercial sobre ${current.bizName} y te responderé de inmediato.\n\n*(Escribe 9 para volver al menú)*"
            else -> {
                // Inferencia contextual basada en las 5 preguntas de oro
                when {
                    lower.contains("domicilio") || lower.contains("envio") || lower.contains("envío") || lower.contains("entrega") -> {
                        "🚚 *Envíos y Entregas en ${current.bizName}:*\n\nSí, contamos con cobertura y servicio directo. ${current.faqs.substringBefore('?')}.\n\n📍 *Ubicación:* ${current.hoursLocation}\n\n1️⃣ Cotizar Pedido\n0️⃣ Hablar con un asesor"
                    }
                    lower.contains("horario") || lower.contains("ubicacion") || lower.contains("ubicación") || lower.contains("donde") -> {
                        "📍 *Horario y Sucursal:*\n\n${current.hoursLocation}\n\n¿En qué podemos apoyarte hoy? Responde *1* para catálogo o *0* para un asesor."
                    }
                    lower.contains("precio") || lower.contains("costo") || lower.contains("cotiz") || lower.contains("cuanto") -> {
                        "📋 *Precios y Presupuestos:*\n\n${current.catalogType}\n\nPor favor envíanos los detalles de lo que buscas y te cotizamos al momento."
                    }
                    else -> {
                        "¡Hola! 👋 En *${current.bizName}* estamos para servirte. Por favor responde con el número de tu consulta:\n\n1️⃣ Conocer Catálogo / Servicios\n2️⃣ Horarios y Ubicación\n3️⃣ Solicitar Cotización\n4️⃣ Preguntas Frecuentes\n5️⃣ Modo IA Libre\n0️⃣ Hablar con un asesor humano"
                    }
                }
            }
        }

        recordReply(senderName, reply.take(60) + "...")
        return reply
    }

    private fun generateWelcomeMenu(cfg: GoldenQuestionsConfig): String {
        return "¡Hola! 👋 Bienvenido a *${cfg.bizName}*.\n\n¿En qué podemos ayudarte hoy? Responde con el número de tu interés:\n\n1️⃣ *Conocer Catálogo y Servicios*\n2️⃣ *Horarios de Atención y Ubicación*\n3️⃣ *Cotización Rápida y Pedidos*\n4️⃣ *Preguntas Frecuentes y Envíos*\n5️⃣ *Consultar a la IA en vivo*\n0️⃣ *Hablar con un asesor humano*"
    }

    private fun recordReply(sender: String, preview: String) {
        val s = _stats.value
        _stats.value = s.copy(
            messagesAnsweredToday = s.messagesAnsweredToday + 1,
            leadsQualified = if (s.messagesAnsweredToday % 3 == 0) s.leadsQualified + 1 else s.leadsQualified,
            lastMessageSender = sender,
            lastMessagePreview = preview
        )
    }
}
