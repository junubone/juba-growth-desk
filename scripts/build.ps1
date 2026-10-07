# PowerShell static build script for Windows environments without Node.js
$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Split-Path -Parent $scriptDir
$source = Join-Path $projectRoot "public"
$output = Join-Path $projectRoot "dist"

Write-Host "Building static site..."
if (Test-Path $output) {
    Remove-Item -Recurse -Force $output
}
New-Item -ItemType Directory -Path $output -Force | Out-Null
Copy-Item -Path "$source\*" -Destination $output -Recurse -Force

Write-Host "Static site built successfully at $output" -ForegroundColor Green
