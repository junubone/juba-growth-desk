param(
    [string]$OutputFile = "c:\Users\Lual.Kuch\Desktop\Antigravity Apps\Juba Sun\juba-growth-desk.zip"
)

$sourceDir = "c:\Users\Lual.Kuch\Desktop\Antigravity Apps\Juba Sun"
$tempFolder = Join-Path $env:TEMP ("juba_pkg_" + [System.Guid]::NewGuid().ToString("N"))
New-Item -ItemType Directory -Path $tempFolder -Force | Out-Null

$items = @(
    ".github",
    ".gitignore",
    "README.md",
    "TODO.md",
    "app.config.ts",
    "package.json",
    "plan.md",
    "public",
    "scripts",
    "server.mjs",
    "vercel.json"
)

foreach ($name in $items) {
    $srcPath = Join-Path $sourceDir $name
    if (Test-Path $srcPath) {
        Copy-Item -Path $srcPath -Destination $tempFolder -Recurse -Force
    }
}

if (Test-Path $OutputFile) {
    Remove-Item -Path $OutputFile -Force
}

Compress-Archive -Path "$tempFolder\*" -DestinationPath $OutputFile -Force
Remove-Item -Path $tempFolder -Recurse -Force

Write-Host "Created archive at: $OutputFile" -ForegroundColor Green
Get-Item $OutputFile | Select-Object FullName, Length, LastWriteTime
