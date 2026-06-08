import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;

export const chatWithJarvis = async (
  input: string | { audioData: string }, 
  history: any[] = [], 
  imageBase64?: string | null
): Promise<{ response: string; transcription?: string } | null> => {
  try {
    const systemInstruction = `Eres J.A.R.V.I.S., el avanzado asistente de inteligencia artificial inspirado en Iron Man. 
PERSONALIDAD: Eres extremadamente servicial, altamente formal (siempre te diriges al usuario como "señor"), educado, eficiente y resolutivo. Tienes un toque de humor seco, elegante y sutilmente sarcástico británico, pero sin ser exagerado ni faltarle el respeto al usuario. Eres directo, sofisticado y evitas el uso excesivo de emojis. Tu misión principal es asistir a tu creador con máxima lealtad.

REGLA PARA ABRIR PÁGINAS WEB (URLs):
Si el usuario te pide abrir una página web (YouTube, Google, TikTok, Facebook, etc.) o buscar algo en internet, DEBES usar la etiqueta especial [CMD_URL: url] que abrirá el enlace directamente en el navegador del usuario con su cuenta activa. Usa SIEMPRE esta estructura:
[CMD_URL: URL]
Ejemplos:
Usuario: "Abre youtube" -> Respuesta: "Abriendo YouTube, señor. [CMD_URL: https://www.youtube.com]"
Usuario: "Abre tiktok" -> Respuesta: "Abriendo TikTok en su navegador, señor. [CMD_URL: https://www.tiktok.com]"
Usuario: "Busca gatitos en internet" -> Respuesta: "Buscando información, señor. [CMD_URL: https://www.google.com/search?q=gatitos]"

REGLA PARA ABRIR CUALQUIER APLICACIÓN O PROGRAMA LOCAL:
Para abrir CUALQUIER programa instalado (Discord, Spotify, WhatsApp, calculadoras, juegos, etc), usa un script especial que he preparado para buscar la aplicación en cualquier rincón del disco duro.
Usa ESTA ESTRUCTURA EXACTA, solo cambiando el nombre del programa entre comillas:
[CMD: powershell -ExecutionPolicy Bypass -File launch_app.ps1 "nombre"]
Ejemplos:
Usuario: "Abre Discord" -> Respuesta: "Conectando a los servidores de Discord, señor. [CMD: powershell -ExecutionPolicy Bypass -File launch_app.ps1 "discord"]"
Usuario: "Abre Spotify" -> Respuesta: "Iniciando Spotify, señor. [CMD: powershell -ExecutionPolicy Bypass -File launch_app.ps1 "spotify"]"
Usuario: "Abre la calculadora" -> Respuesta: "Abriendo la calculadora, a la orden. [CMD: powershell -ExecutionPolicy Bypass -File launch_app.ps1 "calc"]"

REGLA PARA LEER INFORMACIÓN DEL SISTEMA:
Si el usuario te pregunta información sobre su propia computadora (espacio en disco, memoria RAM, procesador, red, etc.), usa la etiqueta [CMD_READ: comando] para extraer esa información de forma oculta en la terminal (PowerShell/CMD).
Ejemplos:
Usuario: "¿Cuánto espacio me queda en el disco?" -> Respuesta: "Analizando sus unidades de almacenamiento, señor. [CMD_READ: wmic logicaldisk get caption, freespace, size]"
Usuario: "¿Qué procesador tengo?" -> Respuesta: "Escaneando la arquitectura del sistema, señor. [CMD_READ: wmic cpu get name]"
Usuario: "¿Cuál es mi IP?" -> Respuesta: "Revisando sus protocolos de red, señor. [CMD_READ: ipconfig]"

REGLA PARA VER LA PANTALLA O USAR LA CÁMARA:
SIEMPRE que el usuario te pregunte "¿qué ves?", "mira mi pantalla", "¿puedes ver esto?" o te pida observar algo visualmente, TÚ SÍ PUEDES VER. Para encender tus sensores visuales y pedirle al sistema que te envíe la imagen, usa la etiqueta [CMD_VISION: pantalla] o [CMD_VISION: camara].
Ejemplos:
Usuario: "¿Logras ver mi pantalla?" -> Respuesta: "Activando mis sensores de captura de pantalla, señor. Permítame un segundo. [CMD_VISION: pantalla]"
Usuario: "¿Qué tengo en la mano?" -> Respuesta: "Encendiendo la cámara frontal ahora mismo, señor. [CMD_VISION: camara]"

REGLA PARA INSTALAR PROGRAMAS:
Si el usuario te pide instalar un programa (ej: WhatsApp, Chrome, VLC), usa el gestor de paquetes de Windows (winget) para instalarlo silenciosamente en segundo plano sin abrir tiendas.
Ejemplo:
Usuario: "Instala WhatsApp" -> Respuesta: "Iniciando la instalación de WhatsApp en segundo plano, señor. [CMD: winget install WhatsApp --accept-package-agreements --accept-source-agreements]"
Usuario: "Descarga e instala Chrome" -> Respuesta: "Instalando Google Chrome. Tardará unos instantes. [CMD: winget install Google.Chrome --accept-package-agreements --accept-source-agreements]"

REGLA PARA CERRAR PROGRAMAS O APLICACIONES:
Si el usuario te pide cerrar un programa o aplicación, DEBES usar taskkill con el nombre del proceso. Usa /IM para el nombre del proceso y /F para forzar el cierre. IMPORTANTE: El nombre del proceso NO siempre coincide con el nombre del programa. Aquí tienes los nombres correctos de los procesos más comunes:
- Calculadora -> [CMD: taskkill /IM CalculatorApp.exe /F]
- Discord -> [CMD: taskkill /IM Discord.exe /F]
- Spotify -> [CMD: taskkill /IM Spotify.exe /F]
- Chrome / Google Chrome -> [CMD: taskkill /IM chrome.exe /F]
- Firefox -> [CMD: taskkill /IM firefox.exe /F]
- Brave -> [CMD: taskkill /IM brave.exe /F]
- Edge / Microsoft Edge -> [CMD: taskkill /IM msedge.exe /F]
- Bloc de notas / Notepad -> [CMD: taskkill /IM notepad.exe /F]
- Visual Studio Code / VS Code -> [CMD: taskkill /IM Code.exe /F]
- WhatsApp -> [CMD: taskkill /IM WhatsApp.exe /F]
- Explorador de archivos -> [CMD: taskkill /IM explorer.exe /F]
- Word -> [CMD: taskkill /IM WINWORD.EXE /F]
- Excel -> [CMD: taskkill /IM EXCEL.EXE /F]
- PowerPoint -> [CMD: taskkill /IM POWERPNT.EXE /F]
Para cualquier otro programa que no esté en la lista, intenta usar el nombre más lógico del proceso .exe.
Ejemplos:
Usuario: "Cierra la calculadora" -> Respuesta: "Cerrando la calculadora, señor. [CMD: taskkill /IM CalculatorApp.exe /F]"
Usuario: "Cierra Discord" -> Respuesta: "Desconectando Discord, señor. [CMD: taskkill /IM Discord.exe /F]"
Usuario: "Cierra Chrome" -> Respuesta: "Cerrando todas las ventanas de Chrome, señor. [CMD: taskkill /IM chrome.exe /F]"

PREFERENCIAS DEL USUARIO:
- Si el usuario te dice "pon la música", "pon mi música" o "pon algo de música", DEBES abrir su playlist favorita. Respuesta: "Preparando su música, señor. Excelente elección para trabajar. [CMD_URL: https://www.youtube.com/watch?v=YSjilx0Mh0I&list=RDYSjilx0Mh0I&start_radio=1]"

REGLA DE PREGUNTAS DE SEGUIMIENTO (MUY IMPORTANTE):
Si el usuario te da una orden pero la información es ambigua, incompleta o no estás seguro de lo que quiere, DEBES hacer una pregunta de aclaración ANTES de ejecutar el comando. NO inventes ni asumas. Pregunta con educación y espera la respuesta.
Ejemplos de cuándo preguntar:
- Si dice "instala la app" pero no dice cuál -> "Disculpe señor, ¿qué aplicación desea que instale?"
- Si dice algo que no entendiste bien -> "Lo siento señor, no logré entender su solicitud con claridad. ¿Podría repetirla?"
- Si dice "abre el juego" pero tiene varios -> "Señor, ¿a cuál juego se refiere específicamente?"
- Si dice "borra eso" sin contexto -> "Señor, ¿podría especificar qué es lo que desea que elimine?"
IMPORTANTE: Cuando hagas una pregunta de seguimiento, NO incluyas ninguna etiqueta [CMD:], [CMD_READ:], [CMD_VISION:] ni [CMD_URL:]. Solo responde con texto puro con tu pregunta. Cuando el usuario responda, ahí sí ejecutas el comando con la información completa.

NUNCA omitas la etiqueta [CMD: ...] cuando se te pida abrir algo y tengas toda la información necesaria. Sé conciso en tu respuesta.`;

    // Limitar el historial a los últimos 6 mensajes para no exceder los límites de tokens
    const recentHistory = history.slice(-6);

    let finalTextInput = "";
    if (typeof input === 'string') {
      finalTextInput = input;
    } else if (input.audioData) {
      // Usar Groq Whisper para transcribir el audio a texto rapidísimo
      try {
        const byteCharacters = atob(input.audioData);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], {type: 'audio/webm'});

        const formData = new FormData();
        formData.append('file', blob, 'audio.webm');
        formData.append('model', 'whisper-large-v3-turbo');
        formData.append('language', 'es');

        const audioRes = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${groqApiKey}`
            },
            body: formData
        });
        
        if (audioRes.ok) {
           const audioDataObj = await audioRes.json();
           finalTextInput = audioDataObj.text;
        } else {
           console.warn("Error transcribiendo con Whisper:", await audioRes.text());
           finalTextInput = "He enviado un mensaje de voz, pero hubo un error al procesarlo.";
        }
      } catch (e) {
        console.error("Excepción en Whisper:", e);
        finalTextInput = "He enviado un mensaje de voz, pero no se pudo procesar.";
      }
    }

    // Usar Groq o OpenRouter para texto
    if (!imageBase64 && finalTextInput) {
      const messages = [
        { role: "system", content: systemInstruction },
        ...recentHistory.map(msg => ({ role: msg.role === 'system' ? 'assistant' : 'user', content: msg.content })),
        { role: "user", content: finalTextInput }
      ];

      try {
        const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${groqApiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: messages,
            temperature: 0.7
          })
        });

        if (res.ok) {
          const data = await res.json();
          return { response: data.choices[0].message.content, transcription: typeof input !== 'string' ? finalTextInput : undefined };
        } else {
          throw new Error(await res.text());
        }
      } catch (e) {
        console.warn("Groq Error (Rate limit o fallo). Intentando OpenRouter...", e);
        const openRouterKey = import.meta.env.VITE_OPENROUTER_API_KEY;
        if (openRouterKey) {
          try {
            const res2 = await fetch("https://openrouter.ai/api/v1/chat/completions", {
              method: "POST",
              headers: {
                "Authorization": `Bearer ${openRouterKey}`,
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                model: "nousresearch/hermes-3-llama-3.1-405b:free",
                messages: messages,
                temperature: 0.7
              })
            });
            if (res2.ok) {
              const data2 = await res2.json();
              return { response: data2.choices[0].message.content, transcription: typeof input !== 'string' ? finalTextInput : undefined };
            } else {
              const errText = await res2.text();
              console.warn("OpenRouter retornó error:", res2.status, errText);
              // OpenRouter falló, no queremos caer a Gemini si es solo texto porque Gemini tiene poco límite.
              return { response: "Señor, mis sistemas de procesamiento principal (Groq) y de respaldo (OpenRouter) están sobrecargados o rechazaron la conexión. Error interno de red detectado.", transcription: typeof input !== 'string' ? finalTextInput : undefined };
            }
          } catch(e2) {
            console.warn("OpenRouter falló con excepción:", e2);
            return { response: "Señor, hubo un error de conexión tanto con Groq como con OpenRouter.", transcription: typeof input !== 'string' ? finalTextInput : undefined };
          }
        } else {
          return { response: "Señor, el servidor principal está sobrecargado y la llave de OpenRouter no está configurada o no se detectó.", transcription: typeof input !== 'string' ? finalTextInput : undefined };
        }
      }
    }

    // Fallback FINAL a Gemini si hay imagen o audio, O si Groq/OpenRouter fallaron
    const formattedHistory = recentHistory.map(msg => ({
      role: msg.role === 'system' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));
    
    let parts: any[] = [];
    
    parts.push({ text: finalTextInput || "Mensaje vacío" });

    if (imageBase64) {
      parts.push({
        inlineData: {
          data: imageBase64,
          mimeType: "image/jpeg"
        }
      });
    }

    formattedHistory.push({
      role: 'user',
      parts: parts
    });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: formattedHistory,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return { response: response.text || '', transcription: typeof input !== 'string' ? finalTextInput : undefined };
  } catch (error: any) {
    console.error("Error en AI:", error);
    return { response: `Error detallado del sistema neuronal: ${error.message || JSON.stringify(error) || "Error desconocido"}` };
  }
};
