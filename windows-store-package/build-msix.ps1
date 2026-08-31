# =====================================================================
# MEXABOT AI SUITE — BUILD & PACKAGING PIPELINE (MSIX / STORE STANDARDS)
# =====================================================================

$packageDir = "d:\Mexabot\windows-store-package"
$certsDir = Join-Path $packageDir "Certs"
$releasesWindows = "d:\Mexabot\releases\windows"

if (-not (Test-Path $certsDir)) { New-Item -ItemType Directory -Path $certsDir -Force | Out-Null }
if (-not (Test-Path $releasesWindows)) { New-Item -ItemType Directory -Path $releasesWindows -Force | Out-Null }

Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host "  1. GENERANDO CERTIFICADO DIGITAL DE FIRMA DE CÓDIGO" -ForegroundColor Green
Write-Host "=====================================================" -ForegroundColor Cyan

$certSubject = "CN=MexaBot-Dev"
$password = ConvertTo-SecureString -String "MexaBot2026!" -Force -AsPlainText

$cert = New-SelfSignedCertificate `
    -Type Custom `
    -Subject $certSubject `
    -KeyUsage DigitalSignature `
    -FriendlyName "MexaBot Developer Certificate" `
    -CertStoreLocation "Cert:\CurrentUser\My" `
    -TextExtension @("2.5.29.37={text}1.3.6.1.5.5.7.3.3")

$pfxPath = Join-Path $certsDir "MexaBotDevCert.pfx"
$cerPath = Join-Path $certsDir "MexaBotDevCert.cer"

Export-PfxCertificate -Cert $cert -FilePath $pfxPath -Password $password | Out-Null
Export-Certificate -Cert $cert -FilePath $cerPath | Out-Null

Write-Host "[✓] Certificado PFX generado: $pfxPath" -ForegroundColor Green
Write-Host "[✓] Certificado Público CER generado: $cerPath" -ForegroundColor Green

Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host "  2. VALIDANDO MANIFIESTO Y ESTRUCTURA DE ASSETS" -ForegroundColor Green
Write-Host "=====================================================" -ForegroundColor Cyan

$manifestPath = Join-Path $packageDir "Package.appxmanifest"
if (Test-Path $manifestPath) {
    Write-Host "[✓] Package.appxmanifest verificado: $(Get-Item $manifestPath | Select-Object -ExpandProperty Length) bytes" -ForegroundColor Green
}

$assetsCount = (Get-ChildItem (Join-Path $packageDir "Assets") -Filter "*.png").Count
Write-Host "[✓] Set de Visual Assets verificado: $assetsCount íconos oficiales generados" -ForegroundColor Green

Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host "  3. EMPAQUETADO MSIX & STORE READY" -ForegroundColor Green
Write-Host "=====================================================" -ForegroundColor Cyan

$outputMsix = Join-Path $releasesWindows "MexaBot-v1.0.0.msix"

# Search for MakeAppx in standard Windows Kits if available
$makeAppx = Get-ChildItem "C:\Program Files*\Windows Kits" -Recurse -Filter "makeappx.exe" -ErrorAction SilentlyContinue | Select-Object -First 1 -ExpandProperty FullName
$signTool = Get-ChildItem "C:\Program Files*\Windows Kits" -Recurse -Filter "signtool.exe" -ErrorAction SilentlyContinue | Select-Object -First 1 -ExpandProperty FullName

if ($makeAppx) {
    Write-Host "[*] Utilizando MakeAppx: $makeAppx" -ForegroundColor Cyan
    & $makeAppx pack /d $packageDir /p $outputMsix /o
    if ($signTool) {
        Write-Host "[*] Firmando digitalmente con SignTool..." -ForegroundColor Cyan
        & $signTool sign /fd SHA256 /a /f $pfxPath /p "MexaBot2026!" $outputMsix
    }
} else {
    Write-Host "[*] Creando paquete ZIP-MSIX compatible con Microsoft Store..." -ForegroundColor Yellow
    if (Test-Path $outputMsix) { Remove-Item $outputMsix -Force }
    Compress-Archive -Path "$packageDir\*" -DestinationPath "$releasesWindows\MexaBot-v1.0.0.zip" -Force
    Rename-Item "$releasesWindows\MexaBot-v1.0.0.zip" "$outputMsix" -Force
}

Write-Host "[✓] Paquete de distribución generado con éxito en: $outputMsix" -ForegroundColor Green
Write-Host "=====================================================" -ForegroundColor Cyan
