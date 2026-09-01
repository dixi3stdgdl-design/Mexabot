package com.mexabot.app.service

import android.app.Notification
import android.app.PendingIntent
import android.app.RemoteInput
import android.content.Intent
import android.os.Bundle
import android.service.notification.NotificationListenerService
import android.service.notification.StatusBarNotification
import android.util.Log
import androidx.core.app.NotificationCompat
import com.mexabot.app.engine.LocalAiEngine

class MexaNotificationListenerService : NotificationListenerService() {

    companion object {
        private const val TAG = "MexaNotificationSvc"
        
        // Paquetes soportados para atención automática
        val SUPPORTED_PACKAGES = setOf(
            "com.whatsapp",
            "com.whatsapp.w4b", // WhatsApp Business
            "org.telegram.messenger",
            "org.telegram.plus"
        )
    }

    override fun onNotificationPosted(sbn: StatusBarNotification?) {
        super.onNotificationPosted(sbn)
        if (sbn == null) return

        val pkg = sbn.packageName
        if (pkg !in SUPPORTED_PACKAGES) return

        val notification = sbn.notification ?: return
        val extras = notification.extras ?: return

        // 1. Evitar responder a notificaciones creadas por el propio sistema/bot
        val isGroupConversation = extras.getBoolean(NotificationCompat.EXTRA_IS_GROUP_CONVERSATION, false)
        val title = extras.getString(Notification.EXTRA_TITLE) ?: ""
        val text = extras.getCharSequence(Notification.EXTRA_TEXT)?.toString() ?: ""
        
        // Si el remitente es un grupo silenciado o está vacío
        if (title.isEmpty() && text.isEmpty()) return

        Log.d(TAG, "Notificación entrante de $pkg [$title]: $text")

        // 2. Verificar si es nota de voz o archivo multimedia
        val isAudio = text.contains("nota de voz", ignoreCase = true) || 
                      text.contains("audio", ignoreCase = true) ||
                      text.contains("ptt-", ignoreCase = true)

        // 3. Generar respuesta con el motor On-Device (Gemma / Gemini Nano)
        val replyText = LocalAiEngine.processIncomingMessage(
            senderName = title,
            messageText = text,
            isAudioOrMedia = isAudio
        )

        if (replyText.isEmpty()) return

        // 4. Inyectar respuesta mediante RemoteInput en la acción de la notificación
        val action = extractQuickReplyAction(notification)
        if (action != null) {
            sendReply(action, replyText)
            Log.i(TAG, "✓ Respuesta automática enviada a $title vía RemoteInput.")
        } else {
            Log.w(TAG, "No se encontró acción RemoteInput compatible en la notificación de $pkg.")
        }
    }

    private fun extractQuickReplyAction(notification: Notification): NotificationCompat.Action? {
        val wearExtender = NotificationCompat.WearableExtender(notification)
        for (action in wearExtender.actions) {
            if (action.remoteInputs != null && action.remoteInputs!!.isNotEmpty()) {
                return action
            }
        }

        val actionsCount = NotificationCompat.getActionCount(notification)
        for (i in 0 until actionsCount) {
            val action = NotificationCompat.getAction(notification, i)
            if (action?.remoteInputs != null && action.remoteInputs!!.isNotEmpty()) {
                return action
            }
        }
        return null
    }

    private fun sendReply(action: NotificationCompat.Action, replyText: String) {
        val intent = Intent()
        val bundle = Bundle()

        for (remoteInput in action.remoteInputs!!) {
            bundle.putCharSequence(remoteInput.resultKey, replyText)
        }

        RemoteInput.addResultsToIntent(
            action.remoteInputs!!.map {
                android.app.RemoteInput.Builder(it.resultKey)
                    .setLabel(it.label)
                    .setChoices(it.choices)
                    .setAllowFreeFormInput(it.allowFreeFormInput)
                    .addExtras(it.extras)
                    .build()
            }.toTypedArray(),
            intent,
            bundle
        )

        try {
            action.actionIntent?.send(this, 0, intent)
        } catch (e: PendingIntent.CanceledException) {
            Log.e(TAG, "Error al enviar RemoteInput a la notificación: ${e.message}", e)
        }
    }
}
