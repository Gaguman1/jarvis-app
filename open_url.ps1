param (
    [Parameter(Mandatory=$true)]
    [string]$Url
)

# Buscar la ruta de Chrome en el registro
$chromePath = (Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\chrome.exe" -ErrorAction SilentlyContinue).'(default)'

if ($chromePath) {
    # Ejecutar Chrome directamente con el perfil 4 ("1 Axel NORMAL") y la URL entre comillas
    Start-Process -FilePath $chromePath -ArgumentList "--profile-directory=`"Profile 4`"", "`"$Url`""
} else {
    # Fallback genérico si no se encuentra Chrome
    Start-Process -FilePath $Url
}
