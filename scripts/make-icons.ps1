Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile((Resolve-Path "public/images/logo-icon.jpg"))
$w = $src.Width
$h = $src.Height

# 1. Flood fill from corners to find outside background
$isBg = New-Object 'bool[,]' $w, $h
$visited = New-Object 'bool[,]' $w, $h
$queue = New-Object System.Collections.Generic.Queue[System.Drawing.Point]

# Enqueue border pixels that are near-white
for ($x = 0; $x -lt $w; $x++) {
    $queue.Enqueue((New-Object System.Drawing.Point($x, 0)))
    $queue.Enqueue((New-Object System.Drawing.Point($x, $h - 1)))
}
for ($y = 0; $y -lt $h; $y++) {
    $queue.Enqueue((New-Object System.Drawing.Point(0, $y)))
    $queue.Enqueue((New-Object System.Drawing.Point($w - 1, $y)))
}

while ($queue.Count -gt 0) {
    $pt = $queue.Dequeue()
    $x = $pt.X
    $y = $pt.Y

    if ($x -lt 0 -or $x -ge $w -or $y -lt 0 -or $y -ge $h) { continue }
    if ($visited[$x, $y]) { continue }
    $visited[$x, $y] = $true

    $p = $src.GetPixel($x, $y)
    # Brightness threshold for white background
    if ($p.R -gt 230 -and $p.G -gt 230 -and $p.B -gt 230) {
        $isBg[$x, $y] = $true
        $queue.Enqueue((New-Object System.Drawing.Point($x + 1, $y)))
        $queue.Enqueue((New-Object System.Drawing.Point($x - 1, $y)))
        $queue.Enqueue((New-Object System.Drawing.Point($x, $y + 1)))
        $queue.Enqueue((New-Object System.Drawing.Point($x, $y - 1)))
    }
}

# Also flood fill the inner triangle of letter 'A' (around x=450, y=500)
$aPt = New-Object System.Drawing.Point(450, 500)
$queue.Enqueue($aPt)
while ($queue.Count -gt 0) {
    $pt = $queue.Dequeue()
    $x = $pt.X
    $y = $pt.Y

    if ($x -lt 0 -or $x -ge $w -or $y -lt 0 -or $y -ge $h) { continue }
    if ($visited[$x, $y]) { continue }
    $visited[$x, $y] = $true

    $p = $src.GetPixel($x, $y)
    if ($p.R -gt 230 -and $p.G -gt 230 -and $p.B -gt 230) {
        $isBg[$x, $y] = $true
        $queue.Enqueue((New-Object System.Drawing.Point($x + 1, $y)))
        $queue.Enqueue((New-Object System.Drawing.Point($x - 1, $y)))
        $queue.Enqueue((New-Object System.Drawing.Point($x, $y + 1)))
        $queue.Enqueue((New-Object System.Drawing.Point($x, $y - 1)))
    }
}

# Also flood fill between A and circuit if connected to white
$midPt = New-Object System.Drawing.Point(300, 400)
$queue.Enqueue($midPt)
while ($queue.Count -gt 0) {
    $pt = $queue.Dequeue()
    $x = $pt.X
    $y = $pt.Y

    if ($x -lt 0 -or $x -ge $w -or $y -lt 0 -or $y -ge $h) { continue }
    if ($visited[$x, $y]) { continue }
    $visited[$x, $y] = $true

    $p = $src.GetPixel($x, $y)
    if ($p.R -gt 230 -and $p.G -gt 230 -and $p.B -gt 230) {
        $isBg[$x, $y] = $true
        $queue.Enqueue((New-Object System.Drawing.Point($x + 1, $y)))
        $queue.Enqueue((New-Object System.Drawing.Point($x - 1, $y)))
        $queue.Enqueue((New-Object System.Drawing.Point($x, $y + 1)))
        $queue.Enqueue((New-Object System.Drawing.Point($x, $y - 1)))
    }
}

# Create Output 1: Light Mode Icon (Transparent background, blue A, dark circuit with white lines)
$outLight = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
# Create Output 2: Dark Mode Icon (Transparent background, blue A, white circuit with dark lines)
$outDark = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        $p = $src.GetPixel($x, $y)
        if ($isBg[$x, $y]) {
            $outLight.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
            $outDark.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } else {
            # Foreground pixel
            $isBlue = ($p.B - $p.R -gt 70) -and ($p.B - $p.G -gt 40)
            if ($isBlue) {
                $outLight.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, 13, 110, 253)) # vibrant blue
                $outDark.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, 59, 130, 246)) # bright blue
            } else {
                # Dark arc or circuit line inside
                $isCircuitLine = ($p.R -gt 200 -and $p.G -gt 200 -and $p.B -gt 200)
                if ($isCircuitLine) {
                    # In light mode: circuit line is white
                    $outLight.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, 255, 255, 255))
                    # In dark mode: circuit line is dark slate
                    $outDark.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, 15, 23, 42))
                } else {
                    # The right arc body:
                    # In light mode: dark black/navy
                    $outLight.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, 10, 15, 29))
                    # In dark mode: clean bright white
                    $outDark.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, 255, 255, 255))
                }
            }
        }
    }
}

# Crop bounds
$minX = $w; $maxX = 0; $minY = $h; $maxY = 0
for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        if ($outLight.GetPixel($x, $y).A -gt 10) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

$cropW = $maxX - $minX + 1
$cropH = $maxY - $minY + 1

function CropAndSave($sourceBmp, $destPath, $minX, $minY, $cropW, $cropH) {
    $cropped = New-Object System.Drawing.Bitmap($cropW, $cropH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($cropped)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    $sRect = New-Object System.Drawing.Rectangle($minX, $minY, $cropW, $cropH)
    $dRect = New-Object System.Drawing.Rectangle(0, 0, $cropW, $cropH)
    $g.DrawImage($sourceBmp, $dRect, $sRect, [System.Drawing.GraphicsUnit]::Pixel)

    $ms = New-Object System.IO.MemoryStream
    $cropped.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
    [System.IO.File]::WriteAllBytes((Resolve-Path $destPath), $ms.ToArray())

    $g.Dispose()
    $cropped.Dispose()
    $ms.Dispose()
    Write-Host "Saved $destPath ($cropW x $cropH)"
}

CropAndSave $outLight "public/images/logo-icon-light.png" $minX $minY $cropW $cropH
CropAndSave $outDark "public/images/logo-icon-dark.png" $minX $minY $cropW $cropH

$src.Dispose()
$outLight.Dispose()
$outDark.Dispose()
