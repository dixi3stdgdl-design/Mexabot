# =====================================================================
# SCRIPT DE AUTOMATIZACION & TESTING EN SANDBOX (EMULADOR ANDROID)
# =====================================================================
$ErrorActionPreference = "Continue"
$adb = "C:\Users\drbea\AppData\Local\Android\Sdk\platform-tools\adb.exe"
$emulator = "C:\Users\drbea\AppData\Local\Android\Sdk\emulator\emulator.exe"
$avdName = "stable_phone"

Write-Host "=== 1. COMPILANDO MEXABOT APK (DEBUG) ===" -ForegroundColor Cyan
Set-Location "d:\Mexabot\android"
.\gradlew.bat assembleDebug

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error durante la compilacion de Gradle." -ForegroundColor Red
    exit 1
}

Write-Host "=== 2. VERIFICANDO / INICIANDO EMULADOR VIRTUAL ($avdName) ===" -ForegroundColor Cyan
$devices = & $adb devices
if ($devices -notmatch "emulator") {
    Write-Host "Iniciando emulador $avdName en segundo plano..." -ForegroundColor Yellow
    Start-Process -FilePath $emulator -ArgumentList "-avd", $avdName, "-no-snapshot-load", "-no-boot-anim" -WindowStyle Minimized
    Write-Host "Esperando inicio completo del sistema operativo Android..." -ForegroundColor Cyan
    & $adb wait-for-device
    
    $bootCompleted = ""
    while ($bootCompleted -notmatch "1") {
        Start-Sleep -Seconds 3
        $bootCompleted = (& $adb shell getprop sys.boot_completed).Trim()
        Write-Host "Estado de booteo Android: $bootCompleted" -ForegroundColor Gray
    }
}

Write-Host "=== 3. INSTALANDO APK COM.MEXABOT.APP EN EL EMULADOR ===" -ForegroundColor Green
$apkPath = Get-ChildItem -Path "d:\Mexabot\android\app\build\outputs\apk\debug" -Filter "*.apk" -Recurse | Select-Object -First 1 -ExpandProperty FullName
Write-Host "Instalando APK: $apkPath" -ForegroundColor Cyan
& $adb install -r $apkPath

Write-Host "=== 4. OTORGANDO PERMISOS DE NOTIFICACIONES Y ACCESIBILIDAD ===" -ForegroundColor Cyan
& $adb shell cmd notification allow_listener com.mexabot.app/com.mexabot.app.service.MexaNotificationListenerService
& $adb shell pm grant com.mexabot.app android.permission.POST_NOTIFICATIONS

Write-Host "=== 5. EJECUTANDO ACTIVIDAD PRINCIPAL MEXABOT ===" -ForegroundColor Green
& $adb shell am start -n com.mexabot.app/com.mexabot.app.MainActivity

Write-Host "=== 6. VERIFICANDO ESTADO DE EJECUCION DE MEXABOT ===" -ForegroundColor Green
Start-Sleep -Seconds 5
$runningProcesses = & $adb shell ps | Select-String "com.mexabot.app"
Write-Host "Procesos activos de MexaBot:" -ForegroundColor Cyan
Write-Host $runningProcesses

Write-Host "=========================================================" -ForegroundColor Green
Write-Host "✓ MEXABOT INSTALADO Y OPERATIVO EN EL EMULADOR VIRTUAL" -ForegroundColor Green
Write-Host "=========================================================" -ForegroundColor Green
