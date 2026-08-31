Add-Type -AssemblyName System.Drawing

$assetsDir = "d:\Mexabot\windows-store-package\Assets"
if (-not (Test-Path $assetsDir)) {
    New-Item -ItemType Directory -Path $assetsDir -Force | Out-Null
}

$size = 1024
$bmp = New-Object System.Drawing.Bitmap($size, $size)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.Clear([System.Drawing.Color]::FromArgb(255, 10, 15, 30))

# Outer neon ring
$penCyan = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 0, 240, 255), 24)
$penGreen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(180, 0, 255, 136), 12)
$brushDark = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 15, 25, 45))
$brushCyan = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 0, 240, 255))
$brushGreen = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 0, 255, 136))
$brushWhite = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)

$g.DrawEllipse($penCyan, 92, 92, 840, 840)
$g.DrawEllipse($penGreen, 132, 132, 760, 760)

# Robot Head
$g.FillRectangle($brushDark, 262, 312, 500, 420)
$g.DrawRectangle($penCyan, 262, 312, 500, 420)

# Eyes
$g.FillEllipse($brushGreen, 352, 432, 120, 80)
$g.FillEllipse($brushGreen, 552, 432, 120, 80)
$g.FillEllipse($brushWhite, 392, 452, 40, 40)
$g.FillEllipse($brushWhite, 592, 452, 40, 40)

# Antenna
$g.DrawLine($penGreen, 512, 312, 512, 192)
$g.FillEllipse($brushCyan, 477, 122, 70, 70)

# Mouth
$penMouth = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 0, 240, 255), 14)
$g.DrawLine($penMouth, 392, 642, 452, 662)
$g.DrawLine($penMouth, 452, 662, 572, 662)
$g.DrawLine($penMouth, 572, 662, 632, 642)

# Save Master
$masterPath = Join-Path $assetsDir "MasterLogo.png"
$bmp.Save($masterPath, [System.Drawing.Imaging.ImageFormat]::Png)

# Resizing function
function Resize-AssetImage {
    param(
        [System.Drawing.Bitmap]$source,
        [int]$width,
        [int]$height,
        [string]$outputPath
    )
    $target = New-Object System.Drawing.Bitmap($width, $height)
    $tg = [System.Drawing.Graphics]::FromImage($target)
    $tg.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $tg.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $tg.DrawImage($source, 0, 0, $width, $height)
    $target.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $tg.Dispose()
    $target.Dispose()
}

Resize-AssetImage -source $bmp -width 50 -height 50 -outputPath (Join-Path $assetsDir "StoreLogo.png")
Resize-AssetImage -source $bmp -width 50 -height 50 -outputPath (Join-Path $assetsDir "StoreLogo.scale-100.png")
Resize-AssetImage -source $bmp -width 100 -height 100 -outputPath (Join-Path $assetsDir "StoreLogo.scale-200.png")
Resize-AssetImage -source $bmp -width 200 -height 200 -outputPath (Join-Path $assetsDir "StoreLogo.scale-400.png")

Resize-AssetImage -source $bmp -width 44 -height 44 -outputPath (Join-Path $assetsDir "Square44x44Logo.png")
Resize-AssetImage -source $bmp -width 44 -height 44 -outputPath (Join-Path $assetsDir "Square44x44Logo.scale-100.png")
Resize-AssetImage -source $bmp -width 88 -height 88 -outputPath (Join-Path $assetsDir "Square44x44Logo.scale-200.png")
Resize-AssetImage -source $bmp -width 48 -height 48 -outputPath (Join-Path $assetsDir "Square44x44Logo.targetsize-48.png")
Resize-AssetImage -source $bmp -width 256 -height 256 -outputPath (Join-Path $assetsDir "Square44x44Logo.targetsize-256.png")

Resize-AssetImage -source $bmp -width 150 -height 150 -outputPath (Join-Path $assetsDir "Square150x150Logo.png")
Resize-AssetImage -source $bmp -width 150 -height 150 -outputPath (Join-Path $assetsDir "Square150x150Logo.scale-100.png")
Resize-AssetImage -source $bmp -width 300 -height 300 -outputPath (Join-Path $assetsDir "Square150x150Logo.scale-200.png")

Resize-AssetImage -source $bmp -width 310 -height 310 -outputPath (Join-Path $assetsDir "Square310x310Logo.png")
Resize-AssetImage -source $bmp -width 310 -height 310 -outputPath (Join-Path $assetsDir "Square310x310Logo.scale-100.png")
Resize-AssetImage -source $bmp -width 71 -height 71 -outputPath (Join-Path $assetsDir "Square71x71Logo.png")
Resize-AssetImage -source $bmp -width 24 -height 24 -outputPath (Join-Path $assetsDir "BadgeLogo.png")

# Wide Logo (310x150)
$wideBmp = New-Object System.Drawing.Bitmap(310, 150)
$wg = [System.Drawing.Graphics]::FromImage($wideBmp)
$wg.Clear([System.Drawing.Color]::FromArgb(255, 10, 15, 30))
$wg.DrawImage($bmp, 15, 15, 120, 120)
$font = New-Object System.Drawing.Font("Segoe UI", 16, [System.Drawing.FontStyle]::Bold)
$wg.DrawString("MEXABOT", $font, $brushCyan, 145, 45)
$fontSub = New-Object System.Drawing.Font("Segoe UI", 11, [System.Drawing.FontStyle]::Regular)
$wg.DrawString("AI SUITE", $fontSub, $brushGreen, 145, 80)
$wideBmp.Save((Join-Path $assetsDir "Wide310x150Logo.png"), [System.Drawing.Imaging.ImageFormat]::Png)
Resize-AssetImage -source $wideBmp -width 620 -height 300 -outputPath (Join-Path $assetsDir "Wide310x150Logo.scale-200.png")

# Splash Screen (620x300 and 1240x600)
$splashBmp = New-Object System.Drawing.Bitmap(620, 300)
$sg = [System.Drawing.Graphics]::FromImage($splashBmp)
$sg.Clear([System.Drawing.Color]::FromArgb(255, 10, 15, 30))
$sg.DrawImage($bmp, 240, 60, 140, 140)
$sg.DrawString("MEXABOT.AI", $font, $brushCyan, 245, 215)
$splashBmp.Save((Join-Path $assetsDir "SplashScreen.png"), [System.Drawing.Imaging.ImageFormat]::Png)
Resize-AssetImage -source $splashBmp -width 1240 -height 600 -outputPath (Join-Path $assetsDir "SplashScreen.scale-200.png")

Write-Host "Generated official visual assets successfully in: $assetsDir" -ForegroundColor Green
