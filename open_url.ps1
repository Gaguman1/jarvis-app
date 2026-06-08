param (
    [Parameter(Mandatory=$true)]
    [string]$Url
)

# Usar el explorador de archivos para "bajar" los privilegios y abrir en la sesión normal del usuario
Start-Process "explorer.exe" -ArgumentList $Url
