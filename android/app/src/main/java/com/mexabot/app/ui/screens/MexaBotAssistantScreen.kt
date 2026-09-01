package com.mexabot.app.ui.screens

import android.content.Intent
import android.provider.Settings
import androidx.compose.animation.*
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.mexabot.app.engine.GoldenQuestionsConfig
import com.mexabot.app.engine.LocalAiEngine
import com.mexabot.app.viewmodel.MiMoViewModel

@Composable
fun MexaBotAssistantScreen(vm: MiMoViewModel) {
    val config by LocalAiEngine.config.collectAsState()
    val stats by LocalAiEngine.stats.collectAsState()
    val context = LocalContext.current

    var activeTab by remember { mutableStateOf(0) } // 0: Sugerido por IA, 1: Manual 5 Preguntas
    var quickPrompt by remember { mutableStateOf("") }
    
    var bizName by remember(config) { mutableStateOf(config.bizName) }
    var faqs by remember(config) { mutableStateOf(config.faqs) }
    var catalog by remember(config) { mutableStateOf(config.catalogType) }
    var hours by remember(config) { mutableStateOf(config.hoursLocation) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // 1. MASTER SWITCH & ENGINE STATUS BANNER
        Surface(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(12.dp),
            color = Color(0xFF070D1A),
            border = BorderStroke(1.dp, if (config.isEnabled) Color(0xFF10B981).copy(alpha = 0.5f) else Color.White.copy(alpha = 0.1f))
        ) {
            Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                        Box(
                            modifier = Modifier
                                .size(10.dp)
                                .background(if (config.isEnabled) Color(0xFF10B981) else Color(0xFF64748B), CircleShape)
                        )
                        Column {
                            Text(
                                "ASISTENTE 24/7 ON-DEVICE",
                                style = MaterialTheme.typography.titleMedium,
                                fontWeight = FontWeight.Bold,
                                color = Color.White
                            )
                            Text(
                                if (config.isEnabled) "🟢 Activo en segundo plano (Gemma / Nano)" else "⚪ En pausa",
                                style = MaterialTheme.typography.labelSmall,
                                color = if (config.isEnabled) Color(0xFF10B981) else Color(0xFF94A3B8)
                            )
                        }
                    }
                    Switch(
                        checked = config.isEnabled,
                        onCheckedChange = { LocalAiEngine.toggleAssistant(it) },
                        colors = SwitchDefaults.colors(
                            checkedThumbColor = Color(0xFF10B981),
                            checkedTrackColor = Color(0xFF10B981).copy(alpha = 0.3f)
                        )
                    )
                }

                // Permiso de notificaciones botón
                OutlinedButton(
                    onClick = {
                        val intent = Intent(Settings.ACTION_NOTIFICATION_LISTENER_SETTINGS)
                        context.startActivity(intent)
                    },
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(8.dp),
                    border = BorderStroke(1.dp, Color(0xFF00F0FF).copy(alpha = 0.4f))
                ) {
                    Icon(Icons.Filled.NotificationsActive, contentDescription = null, tint = Color(0xFF00F0FF), modifier = Modifier.size(16.dp))
                    Spacer(Modifier.width(8.dp))
                    Text("Verificar Permiso de Lectura de Notificaciones", fontSize = 12.sp, color = Color(0xFF00F0FF))
                }
            }
        }

        // 2. LIVE METRICS HUD
        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(10.dp)) {
            Surface(
                modifier = Modifier.weight(1f),
                shape = RoundedCornerShape(10.dp),
                color = Color(0xFF0C1427),
                border = BorderStroke(1.dp, Color.White.copy(alpha = 0.08f))
            ) {
                Column(modifier = Modifier.padding(12.dp)) {
                    Text("CHATS ATENDIDOS", fontSize = 10.sp, color = Color(0xFF94A3B8), fontWeight = FontWeight.SemiBold)
                    Text("${stats.messagesAnsweredToday}", fontSize = 22.sp, fontWeight = FontWeight.Bold, color = Color(0xFF00F0FF))
                    Text("Hoy sin intervención", fontSize = 9.sp, color = Color(0xFF64748B))
                }
            }
            Surface(
                modifier = Modifier.weight(1f),
                shape = RoundedCornerShape(10.dp),
                color = Color(0xFF0C1427),
                border = BorderStroke(1.dp, Color.White.copy(alpha = 0.08f))
            ) {
                Column(modifier = Modifier.padding(12.dp)) {
                    Text("PROSPECTOS / LEADS", fontSize = 10.sp, color = Color(0xFF94A3B8), fontWeight = FontWeight.SemiBold)
                    Text("${stats.leadsQualified}", fontSize = 22.sp, fontWeight = FontWeight.Bold, color = Color(0xFF10B981))
                    Text("Calificados con éxito", fontSize = 9.sp, color = Color(0xFF64748B))
                }
            }
            Surface(
                modifier = Modifier.weight(1f),
                shape = RoundedCornerShape(10.dp),
                color = Color(0xFF0C1427),
                border = BorderStroke(1.dp, Color.White.copy(alpha = 0.08f))
            ) {
                Column(modifier = Modifier.padding(12.dp)) {
                    Text("LATENCIA LOCAL", fontSize = 10.sp, color = Color(0xFF94A3B8), fontWeight = FontWeight.SemiBold)
                    Text("${stats.avgLatencyMs}ms", fontSize = 22.sp, fontWeight = FontWeight.Bold, color = Color(0xFFA855F7))
                    Text("0ms consumo en nube", fontSize = 9.sp, color = Color(0xFF64748B))
                }
            }
        }

        // 3. DUAL ONBOARDING TABS
        TabRow(
            selectedTabIndex = activeTab,
            containerColor = Color(0xFF070D1A),
            contentColor = Color(0xFF00F0FF),
            divider = {}
        ) {
            Tab(
                selected = activeTab == 0,
                onClick = { activeTab = 0 },
                text = { Text("✨ SUGERIDO POR IA", fontSize = 11.sp, fontWeight = FontWeight.Bold) }
            )
            Tab(
                selected = activeTab == 1,
                onClick = { activeTab = 1 },
                text = { Text("⚙️ MANUAL (5 PREGUNTAS)", fontSize = 11.sp, fontWeight = FontWeight.Bold) }
            )
        }

        // TAB 1: Sugerido por IA
        if (activeTab == 0) {
            Surface(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(12.dp),
                color = Color(0xFF070D1A),
                border = BorderStroke(1.dp, Color(0xFF00F0FF).copy(alpha = 0.2f))
            ) {
                Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    Text(
                        "Describe tu negocio en 1 frase:",
                        style = MaterialTheme.typography.labelMedium,
                        color = Color(0xFF00F0FF),
                        fontWeight = FontWeight.Bold
                    )
                    OutlinedTextField(
                        value = quickPrompt,
                        onValueChange = { quickPrompt = it },
                        modifier = Modifier.fillMaxWidth(),
                        placeholder = { Text("Ej. Ferretería en Guadalajara con entrega local...", fontSize = 12.sp) },
                        colors = OutlinedTextFieldDefaults.colors(
                            focusedBorderColor = Color(0xFF00F0FF),
                            unfocusedBorderColor = Color.White.copy(alpha = 0.15f)
                        )
                    )

                    Button(
                        onClick = {
                            val lower = quickPrompt.lowercase()
                            val newCfg = when {
                                lower.contains("abarrot") || lower.contains("tiend") -> GoldenQuestionsConfig(
                                    bizName = "Abarrotes La Central",
                                    faqs = "¿Cuál es el mínimo para envío?, ¿Manejan lácteos y bultos de azúcar?",
                                    catalogType = "Lista de precios del día con ofertas por mayoreo",
                                    hoursLocation = "Lun a Dom 7:00 AM - 9:00 PM (Mercado Local)"
                                )
                                lower.contains("plastic") || lower.contains("fabric") -> GoldenQuestionsConfig(
                                    bizName = "Plásticos Industriales MX",
                                    faqs = "¿Cuál es el millaje mínimo?, ¿Tienen ficha grado alimenticio?",
                                    catalogType = "Cotización personalizada bajo plano y gramaje",
                                    hoursLocation = "Lun a Vie 8:30 AM - 6:00 PM (Parque Industrial)"
                                )
                                lower.contains("clinic") || lower.contains("dent") -> GoldenQuestionsConfig(
                                    bizName = "Clínica Dental & Médica",
                                    faqs = "¿Qué costo tiene la valoración?, ¿Aceptan seguros?",
                                    catalogType = "Paquetes de valoración y tratamientos",
                                    hoursLocation = "Lun a Sáb 9:00 AM - 8:00 PM (Torre Médica)"
                                )
                                else -> GoldenQuestionsConfig(
                                    bizName = "Ferretería El Tornillo MX",
                                    faqs = "¿Tienen envíos a domicilio?, ¿Manejan factura inmediata?",
                                    catalogType = "Cotización al instante según lista de materiales",
                                    hoursLocation = "Lun a Sáb 8:00 AM - 7:00 PM (Av. Hidalgo 120)"
                                )
                            }
                            LocalAiEngine.updateConfig(newCfg)
                            bizName = newCfg.bizName
                            faqs = newCfg.faqs
                            catalog = newCfg.catalogType
                            hours = newCfg.hoursLocation
                        },
                        modifier = Modifier.fillMaxWidth(),
                        colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF00F0FF)),
                        shape = RoundedCornerShape(8.dp)
                    ) {
                        Text("🪄 AUTO-COMPILAR MENÚ Y REGLAS CON IA", color = Color(0xFF030407), fontWeight = FontWeight.Bold, fontSize = 12.sp)
                    }
                }
            }
        } else {
            // TAB 2: Manual 5 Preguntas de Oro
            Surface(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(12.dp),
                color = Color(0xFF070D1A),
                border = BorderStroke(1.dp, Color.White.copy(alpha = 0.15f))
            ) {
                Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    Text("1. Nombre comercial y giro exacto:", fontSize = 12.sp, color = Color(0xFF00F0FF), fontWeight = FontWeight.Bold)
                    OutlinedTextField(value = bizName, onValueChange = { bizName = it }, modifier = Modifier.fillMaxWidth())

                    Text("2. ¿Qué es lo que más te preguntan tus clientes? (FAQs):", fontSize = 12.sp, color = Color(0xFF00F0FF), fontWeight = FontWeight.Bold)
                    OutlinedTextField(value = faqs, onValueChange = { faqs = it }, modifier = Modifier.fillMaxWidth(), minLines = 2)

                    Text("3. Precios, catálogo o cotizaciones:", fontSize = 12.sp, color = Color(0xFF00F0FF), fontWeight = FontWeight.Bold)
                    OutlinedTextField(value = catalog, onValueChange = { catalog = it }, modifier = Modifier.fillMaxWidth())

                    Text("4. Horarios y ubicación física:", fontSize = 12.sp, color = Color(0xFF00F0FF), fontWeight = FontWeight.Bold)
                    OutlinedTextField(value = hours, onValueChange = { hours = it }, modifier = Modifier.fillMaxWidth())

                    Button(
                        onClick = {
                            LocalAiEngine.updateConfig(
                                config.copy(
                                    bizName = bizName,
                                    faqs = faqs,
                                    catalogType = catalog,
                                    hoursLocation = hours
                                )
                            )
                        },
                        modifier = Modifier.fillMaxWidth(),
                        colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF10B981)),
                        shape = RoundedCornerShape(8.dp)
                    ) {
                        Text("GUARDAR REGLAS DE NEGOCIO", color = Color(0xFF030407), fontWeight = FontWeight.Bold, fontSize = 12.sp)
                    }
                }
            }
        }

        // 4. POLÍTICAS ANTI-SPAM & AUDIO
        Surface(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(12.dp),
            color = Color(0xFF050B14),
            border = BorderStroke(1.dp, Color(0xFFA855F7).copy(alpha = 0.3f))
        ) {
            Column(modifier = Modifier.padding(14.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                Text("🛡️ POLÍTICAS DE PRIVACIDAD & BLINDAJE", fontSize = 11.sp, color = Color(0xFFA855F7), fontWeight = FontWeight.Bold)
                Text("• Inbound-Only: Silencio total en chats abiertos manualmente por ti.", fontSize = 11.sp, color = Color(0xFFCBD5E1))
                Text("• Regla 2.5: Bloqueo de audios (redirección a texto sin alucinaciones).", fontSize = 11.sp, color = Color(0xFFCBD5E1))
                Text("• Cero Servidores: La IA corre 100% en el chip de este teléfono.", fontSize = 11.sp, color = Color(0xFF10B981), fontWeight = FontWeight.SemiBold)
            }
        }
    }
}
