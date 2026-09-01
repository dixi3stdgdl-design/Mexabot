# MexaBot ProGuard Rules

# Keep app classes
-keep class com.mexabot.app.** { *; }
-keepclassmembers class * extends androidx.lifecycle.ViewModel { <init>(...); }

# Kotlin
-keep class kotlin.Metadata { *; }
-keep class kotlin.reflect.** { *; }
-dontwarn kotlin.**

# Kotlinx Coroutines
-keep class kotlinx.coroutines.** { *; }
-dontwarn kotlinx.coroutines.**

# Kotlinx Serialization
-keep class kotlinx.serialization.** { *; }
-keepclassmembers class * {
    @kotlinx.serialization.Serializable <fields>;
}

# AndroidX
-keep class androidx.** { *; }
-dontwarn androidx.**

# Compose
-keep class androidx.compose.** { *; }
-dontwarn androidx.compose.**

# Material3
-keep class com.google.android.material.** { *; }
-dontwarn com.google.android.material.**

# DataStore
-keep class androidx.datastore.** { *; }
-dontwarn androidx.datastore.**

# Navigation
-keep class androidx.navigation.** { *; }
-dontwarn androidx.navigation.**

# JSON (org.json)
-keep class org.json.** { *; }
-dontwarn org.json.**

# OkHttp (transitive dependency)
-keep class okhttp3.** { *; }
-dontwarn okhttp3.**
-keep class okio.** { *; }
-dontwarn okio.**

# Retrofit (if used)
-keep class retrofit2.** { *; }
-dontwarn retrofit2.**

# Keep data classes used in serialization
-keep class com.mexabot.app.network.WsMessage { *; }
-keep class com.mexabot.app.network.AdbDevice { *; }
-keep class com.mexabot.app.network.AdbResult { *; }
-keep class com.mexabot.app.viewmodel.AppState { *; }
-keep class com.mexabot.app.viewmodel.ChatInstance { *; }
-keep class com.mexabot.app.viewmodel.ChatMsg { *; }
-keep class com.mexabot.app.network.ApiProvider { *; }
-keep class com.mexabot.app.network.ApiConfig { *; }
-keep class com.mexabot.app.engine.** { *; }

# Remove logging in release
-assumenosideeffects class android.util.Log {
    public static int v(...);
    public static int d(...);
    public static int i(...);
}

# Optimize
-optimizationpasses 5
-allowaccessmodification
-repackageclasses ''
