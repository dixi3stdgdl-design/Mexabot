package com.mimo.mobile

import android.animation.ObjectAnimator
import android.os.Bundle
import android.view.View
import android.view.animation.DecelerateInterpolator
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.animation.*
import androidx.compose.animation.core.*
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import androidx.lifecycle.viewmodel.compose.viewModel
import com.mimo.mobile.network.ConnectionState
import com.mimo.mobile.ui.theme.*
import com.mimo.mobile.ui.screens.*
import com.mimo.mobile.ui.components.PerspectiveGridBackground
import com.mimo.mobile.viewmodel.MiMoViewModel
import kotlinx.coroutines.delay

sealed class Screen(val label: String, val icon: ImageVector, val selectedIcon: ImageVector) {
    data object Setup : Screen("Setup", Icons.Filled.Hub, Icons.Filled.Hub)
    data object Chat : Screen("Chat", Icons.Filled.ChatBubbleOutline, Icons.Filled.Chat)
    data object Terminal : Screen("Terminal", Icons.Filled.Terminal, Icons.Filled.Terminal)
    data object Remote : Screen("Remote", Icons.Filled.DesktopWindows, Icons.Filled.DesktopWindows)
    data object Settings : Screen("Ajustes", Icons.Filled.Settings, Icons.Filled.Settings)
}

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        val splashScreen = installSplashScreen()
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        var keepSplash = true
        splashScreen.setKeepOnScreenCondition { keepSplash }

        ObjectAnimator.ofFloat(window.decorView, View.ALPHA, 1f).apply {
            duration = 500L
            interpolator = DecelerateInterpolator()
            start()
        }

        setContent {
            val vm: MiMoViewModel = viewModel()
            val state by vm.state.collectAsState()

            MiMoTheme(userDarkMode = state.darkMode) {
                LaunchedEffect(Unit) {
                    delay(1500L)
                    keepSplash = false
                    vm.dismissSplash()
                }

                if (state.isSplashDone) {
                    MiMoApp(vm, state)
                } else {
                    SplashContent()
                }
            }
        }
    }
}

@Composable
fun SplashContent() {
    val infiniteTransition = rememberInfiniteTransition(label = "splash")
    val scale by infiniteTransition.animateFloat(
        initialValue = 0.8f,
        targetValue = 1.1f,
        animationSpec = infiniteRepeatable(
            animation = tween(1000, easing = FastOutSlowInEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "scale"
    )

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF030407)),
        contentAlignment = Alignment.Center
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Box(
                modifier = Modifier
                    .size(80.dp)
                    .scale(scale)
                    .clip(CircleShape)
                    .background(
                        Brush.radialGradient(
                            colors = listOf(
                                Color(0xFF00F0FF),
                                Color(0xFF0078D4)
                            )
                        )
                    ),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    Icons.Filled.Hub,
                    contentDescription = null,
                    tint = Color.White,
                    modifier = Modifier.size(40.dp)
                )
            }
            Spacer(Modifier.height(16.dp))
            Text(
                "MEXABOT",
                style = MaterialTheme.typography.titleLarge,
                fontWeight = FontWeight.Black,
                color = Color.White,
                letterSpacing = 3.sp
            )
            Text(
                "Neural Command OS",
                style = MaterialTheme.typography.bodySmall,
                color = Color(0xFF00F0FF),
                letterSpacing = 1.sp
            )
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MiMoApp(vm: MiMoViewModel, state: com.mimo.mobile.viewmodel.AppState) {
    var currentScreen by remember { mutableStateOf<Screen>(Screen.Setup) }

    val navScreens = listOf(Screen.Setup, Screen.Chat, Screen.Terminal, Screen.Remote, Screen.Settings)

    Box(modifier = Modifier.fillMaxSize()) {
        PerspectiveGridBackground()

        Scaffold(
            modifier = Modifier.fillMaxSize(),
            containerColor = Color.Transparent,
            topBar = {
                TopAppBar(
                    title = {
                        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            Surface(shape = RoundedCornerShape(4.dp), color = Color(0xFF00F0FF).copy(alpha = 0.2f), border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFF00F0FF))) {
                                Text("MEXABOT", modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp), style = MaterialTheme.typography.labelSmall, fontWeight = FontWeight.Bold, color = Color(0xFF00F0FF))
                            }
                            Text("Clawboard Hub", style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.Medium)
                        }
                    },
                    actions = {
                        Surface(shape = RoundedCornerShape(4.dp), color = Color(0xFF10B981).copy(alpha = 0.2f)) {
                            Text("SANDBOX :18789", modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp), style = MaterialTheme.typography.labelSmall, fontSize = 9.sp, color = Color(0xFF10B981))
                        }
                    },
                    colors = TopAppBarDefaults.topAppBarColors(
                        containerColor = Color(0xFF030407).copy(alpha = 0.9f)
                    )
                )
            },
            bottomBar = {
                NavigationBar(containerColor = MaterialTheme.colorScheme.surface.copy(alpha = 0.92f)) {
                    navScreens.forEach { screen ->
                        NavigationBarItem(
                            selected = currentScreen == screen,
                            onClick = { currentScreen = screen },
                            icon = {
                                Icon(
                                    if (currentScreen == screen) screen.selectedIcon else screen.icon,
                                    contentDescription = screen.label,
                                    modifier = Modifier.size(20.dp)
                                )
                            },
                            label = { Text(screen.label, style = MaterialTheme.typography.labelSmall, fontSize = 10.sp) }
                        )
                    }
                }
            }
        ) { paddingValues ->
            AnimatedContent(
                targetState = currentScreen,
                transitionSpec = {
                    fadeIn(animationSpec = tween(300)) + slideInHorizontally(
                        animationSpec = tween(300),
                        initialOffsetX = {
                            val targetIndex = navScreens.indexOf(targetState)
                            val sourceIndex = navScreens.indexOf(initialState)
                            if (targetIndex > sourceIndex) it / 3 else -it / 3
                        }
                    ) togetherWith fadeOut(animationSpec = tween(200))
                },
                modifier = Modifier.padding(paddingValues),
                label = "screen"
            ) { screen ->
                when (screen) {
                    Screen.Setup -> ClawboardSetupScreen(vm)
                    Screen.Chat -> ChatScreen(vm)
                    Screen.Terminal -> TerminalScreen(vm)
                    Screen.Remote -> RemoteScreen(vm)
                    Screen.Settings -> SettingsScreen(
                        host = state.serverHost,
                        port = state.serverPort,
                        onHostChange = vm::updateHost,
                        onPortChange = vm::updatePort,
                        onReconnect = vm::reconnect,
                        connectionState = state.connectionState,
                        vm = vm
                    )
                }
            }
        }
    }
}
