# =====================================================================
# SCRIPT DE INSTALACION Y PRUEBA EN DISPOSITIVO / EMULADOR
# =====================================================================
$adb = "C:\Users\drbea\AppData\Local\Android\Sdk\platform-tools\adb.exe"
$apkPath = "d:\Mexabot\android\app\build\outputs\apk\pro\debug\app-pro-debug.apk"

Write-Host "Verificando dispositivos conectados..." -ForegroundColor Cyan
$deviceList = (& $adb devices) | Where-Object { $_ -match "\tdevice" }

if (-not $deviceList) {
    Write-Host "No hay ningun dispositivo/emulador con estado 'device'. Esperando..." -ForegroundColor Yellow
} else {
    $firstDevice = ($deviceList[0] -split "\t")[0].Trim()
    Write-Host "Dispositivo detectado: $firstDevice" -ForegroundColor Green
    
    Write-Host "Instalando MexaBot APK en $firstDevice..." -ForegroundColor Cyan
    & $adb -s $firstDevice install -r $apkPath
    
    Write-Host "Otorgando permisos de notificaciones..." -ForegroundColor Cyan
    & $adb -s $firstDevice shell cmd notification allow_listener com.mexabot.app/com.mexabot.app.service.MexaNotificationListenerService
    & $adb -s $firstDevice shell pm grant com.mexabot.app android.permission.POST_NOTIFICATIONS
    
    Write-Host "Abriendo MexaBot..." -ForegroundColor Green
    & $adb -s $firstDevice shell am start -n com.mexabot.app/com.mexabot.app.MainActivity
    
    Write-Host "✓ MexaBot instalado y ejecutandose exitosamente en $firstDevice." -ForegroundColor Green
}
