param (
    [Parameter(Mandatory=$true)]
    [string]$Url
)

# Dejamos que Windows decida cómo abrir el enlace usando el navegador predeterminado
# Esto abrirá el enlace en la ventana de Chrome que esté activa, con la sesión ya iniciada.
Start-Process -FilePath $Url
