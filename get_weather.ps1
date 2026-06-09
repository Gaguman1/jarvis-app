try {
    # Usar lang=es para obtener descripción en español y wttr.in intentará geolocalizar la IP pública
    $url = "https://wttr.in/?format=%l:+%C+%t,+Sensacion:+%f,+Humedad:+%h,+Viento:+%w&lang=es"
    
    # Reducimos el timeout a 5 segundos para que Jarvis no se quede esperando demasiado si falla el internet
    $response = Invoke-RestMethod -Uri $url -TimeoutSec 5 -ErrorAction Stop
    
    Write-Host "CLIMA ACTUAL:"
    Write-Host $response
} catch {
    Write-Host "Error al obtener el clima: No se pudo establecer conexión con los servidores meteorológicos."
}
