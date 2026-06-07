param (
    [string]$appName
)

$appName = $appName.Trim()

# 1. Intentar Get-StartApps (para aplicaciones modernas UWP y algunas de escritorio)
$app = Get-StartApps "*$appName*" | Where-Object { $_.AppID } | Select-Object -First 1
if ($app) {
    Write-Host "Lanzando via AppID: $($app.AppID)"
    Start-Process explorer.exe "shell:AppsFolder\$($app.AppID)"
    exit 0
}

# 2. Buscar accesos directos (.lnk) en el menú de inicio del usuario y de todos los usuarios
$searchPaths = @(
    "$env:APPDATA\Microsoft\Windows\Start Menu\Programs",
    "$env:ALLUSERSPROFILE\Microsoft\Windows\Start Menu\Programs"
)

$lnk = Get-ChildItem -Path $searchPaths -Filter "*$appName*.lnk" -Recurse -ErrorAction SilentlyContinue | Select-Object -First 1
if ($lnk) {
    Write-Host "Lanzando via acceso directo LNK: $($lnk.FullName)"
    Start-Process $lnk.FullName
    exit 0
}

# 3. Intentar buscar ejecutables comunes en el PATH (ej: calc.exe, notepad.exe)
if (Get-Command "$appName.exe" -ErrorAction SilentlyContinue) {
    Write-Host "Lanzando via PATH: $appName.exe"
    Start-Process "$appName.exe"
    exit 0
}

# 4. Fallback final: intentar protocolo URL de Windows (ej: spotify:, discord:)
Write-Host "Lanzando via protocolo URL: $appName`:"
try {
    Start-Process "$appName`:" -ErrorAction Stop
} catch {
    Write-Host "No se pudo encontrar ni ejecutar la aplicación '$appName'."
    exit 1
}
