import { useState, useEffect, useRef } from 'react'
import { saveMessage, getMessagesQuery, saveMemory, getMemoriesQuery } from './services/firebase'
import { onSnapshot } from 'firebase/firestore'
import { chatWithJarvis } from './services/gemini'
import { useWakeWord } from './useWakeWord'
import './App.css'

declare const faceapi: any;

interface Message {
  id: string;
  role: 'user' | 'system';
  content: string;
}

let currentAudio: HTMLAudioElement | null = null;
let sharedAudioCtx: AudioContext | null = null;
let sharedAnalyser: AnalyserNode | null = null;

// Ensure TypeScript knows about window.ipcRenderer
declare global {
  interface Window {
    ipcRenderer?: any;
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
  }
}

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const isListening = false;
  const [isHandsFree, setIsHandsFree] = useState(true);
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [debugText, setDebugText] = useState('');
  const [installingApp, setInstallingApp] = useState<string | null>(null);
  const [pythonAvailable, setPythonAvailable] = useState<boolean | null>(null); // null = checking
  const [autoLaunch, setAutoLaunch] = useState(true);
  const [isCameraLive, setIsCameraLive] = useState(false);
  const [isScreenLive, setIsScreenLive] = useState(false);
  const [memories, setMemories] = useState<string[]>([]);
  const [isJarvisSpeaking, setIsJarvisSpeaking] = useState(false);
  const [protocol, setProtocol] = useState('standard');
  const [isFaceModelsLoaded, setIsFaceModelsLoaded] = useState(false);
  const [isFaceRegistered, setIsFaceRegistered] = useState(false);
  const lastGreetingTimeRef = useRef<number>(0);
  
  const liveVideoRef = useRef<HTMLVideoElement>(null);
  const visualizerRef = useRef<HTMLDivElement>(null);

  const toggleScreenLive = async () => {
    let ipc = window.ipcRenderer;
    if (!ipc && window.require) ipc = window.require('electron').ipcRenderer;
    if (!ipc) return;
    
    if (isScreenLive) {
      await ipc.invoke('stop-screen-overlay');
      setIsScreenLive(false);
    } else {
      await ipc.invoke('start-screen-overlay');
      setIsScreenLive(true);
    }
  };
  
  // Auto-updater states
  const [updateStatus, setUpdateStatus] = useState<'idle' | 'checking' | 'available' | 'downloading' | 'ready' | 'error' | 'not-available'>('idle');
  const [updateText, setUpdateText] = useState('');
  const [updateProgress, setUpdateProgress] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleLiveCamera = async () => {
    if (isCameraLive) {
      if (liveVideoRef.current && liveVideoRef.current.srcObject) {
        const stream = liveVideoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        liveVideoRef.current.srcObject = null;
      }
      setIsCameraLive(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (liveVideoRef.current) {
          liveVideoRef.current.srcObject = stream;
          try {
            await liveVideoRef.current.play();
          } catch(e) {
            console.warn("Video auto-play suppressed", e);
          }
        }
        setIsCameraLive(true);
      } catch (err) {
        console.error("Error accessing camera:", err);
        alert("No se pudo acceder a la cámara frontal. Por favor, revisa los permisos.");
      }
    }
  };

  // Check Python availability & Auto-updater listener on mount
  useEffect(() => {
    const checkPython = async () => {
      let ipc = window.ipcRenderer;
      if (!ipc && window.require) ipc = window.require('electron').ipcRenderer;
      if (ipc) {
        const result = await ipc.invoke('check-python');
        setPythonAvailable(result.available);
        const launchResult = await ipc.invoke('get-auto-launch');
        setAutoLaunch(launchResult.enabled);
      } else {
        setPythonAvailable(true);
      }
    };
    checkPython();

    const loadFaceModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
          faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
          faceapi.nets.faceRecognitionNet.loadFromUri('./models')
        ]);
        setIsFaceModelsLoaded(true);
        const savedDescriptor = localStorage.getItem('jarvis_face_descriptor');
        if (savedDescriptor) setIsFaceRegistered(true);
      } catch (e) {
        console.error("Error loading face models", e);
      }
    };
    loadFaceModels();

    let ipc = window.ipcRenderer;
    if (!ipc && window.require) ipc = window.require('electron').ipcRenderer;
    if (ipc) {
      const handleUpdateMessage = (_event: any, message: any) => {
        console.log("Update message:", message);
        
        // Si no es manual, ignoramos los mensajes de error, checking y not-available para no mostrar banners innecesarios al inicio
        if (!message.isManual) {
          if (message.status === 'checking' || message.status === 'error' || message.status === 'not-available') {
            setUpdateStatus('idle');
            return;
          }
        }

        // Si no hay actualizaciones, avisamos si fue manual y salimos
        if (message.status === 'not-available') {
          if (message.isManual) {
            alert("Los sistemas de J.A.R.V.I.S. están actualizados, señor.");
          }
          setUpdateStatus('idle');
          return;
        }

        setUpdateStatus(message.status);
        setUpdateText(message.text);
        if (message.percent !== undefined) {
          setUpdateProgress(message.percent);
        }
      };
      ipc.on('update-message', handleUpdateMessage);
      return () => {
        ipc.removeListener('update-message', handleUpdateMessage);
      };
    }
  }, []);

  const handleQuitAndInstall = async () => {
    let ipc = window.ipcRenderer;
    if (!ipc && window.require) ipc = window.require('electron').ipcRenderer;
    if (ipc) {
      await ipc.invoke('quit-and-install');
    }
  };

  const registerFace = async () => {
    if (!liveVideoRef.current || !isCameraLive) {
      alert("Por favor, active la cámara frontal primero.");
      return;
    }
    if (!isFaceModelsLoaded) {
      alert("Los modelos biométricos aún están cargando. Espere unos segundos.");
      return;
    }
    if (liveVideoRef.current.readyState < 2) {
      alert("La cámara no ha inicializado su transmisión. Intente de nuevo.");
      return;
    }
    setDebugText('Analizando rostro... Por favor, mire a la cámara (10s máximo).');
    try {
      const timeout = new Promise<any>((resolve) => setTimeout(() => resolve(null), 10000));
      const detectorOptions = new faceapi.TinyFaceDetectorOptions({ inputSize: 512, scoreThreshold: 0.15 });
      
      // Workaround for WebGL video texture bug in modern Electron:
      const canvas = document.createElement('canvas');
      canvas.width = liveVideoRef.current.videoWidth;
      canvas.height = liveVideoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.filter = 'brightness(1.5) contrast(1.2)';
        ctx.drawImage(liveVideoRef.current, 0, 0, canvas.width, canvas.height);
      }

      const detectionPromise = faceapi.detectSingleFace(canvas, detectorOptions).withFaceLandmarks().withFaceDescriptor();
      const detection = await Promise.race([detectionPromise, timeout]);
      if (detection) {
        const descriptorArray = Array.from(detection.descriptor);
        localStorage.setItem('jarvis_face_descriptor', JSON.stringify(descriptorArray));
        setIsFaceRegistered(true);
        setDebugText('Rostro registrado exitosamente.');
        speak("Perfil biométrico almacenado, señor. Ahora podré reconocerlo.");
      } else {
        setDebugText('No se detectó ningún rostro. Acerque su cara a la cámara, mejore la iluminación e inténtelo de nuevo.');
      }
    } catch (e) {
      console.error(e);
      setDebugText('Error al registrar rostro.');
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isFaceModelsLoaded && isFaceRegistered && isCameraLive && liveVideoRef.current) {
      interval = setInterval(async () => {
        try {
          if (liveVideoRef.current!.readyState < 2) return;
          const detectorOptions = new faceapi.TinyFaceDetectorOptions({ inputSize: 512, scoreThreshold: 0.15 });
          
          const canvas = document.createElement('canvas');
          canvas.width = liveVideoRef.current!.videoWidth;
          canvas.height = liveVideoRef.current!.videoHeight;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.filter = 'brightness(1.5) contrast(1.2)';
            ctx.drawImage(liveVideoRef.current!, 0, 0, canvas.width, canvas.height);
          }

          const detection = await faceapi.detectSingleFace(canvas, detectorOptions).withFaceLandmarks().withFaceDescriptor();
          if (detection) {
            const savedStr = localStorage.getItem('jarvis_face_descriptor');
            if (savedStr) {
              const savedArray = JSON.parse(savedStr);
              const savedDescriptor = new Float32Array(savedArray);
              const distance = faceapi.euclideanDistance(detection.descriptor, savedDescriptor);
              if (distance < 0.6) {
                const now = Date.now();
                // Saludar máximo una vez cada 10 minutos
                if (now - lastGreetingTimeRef.current > 600000) {
                  lastGreetingTimeRef.current = now;
                  const greetings = [
                    "Bienvenido de vuelta, señor.",
                    "Sistemas en línea y a su disposición.",
                    "Me alegra verlo de nuevo, señor.",
                    "Autenticación biométrica exitosa. Bienvenido."
                  ];
                  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
                  speak(randomGreeting);
                  saveMessage('system', `(🤖 Autenticación Facial): ${randomGreeting}`);
                }
              }
            }
          }
        } catch (e) {
          console.error("Face scan error", e);
        }
      }, 5000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isFaceModelsLoaded, isFaceRegistered, isCameraLive]);

  const toggleAutoLaunch = async () => {
    let ipc = window.ipcRenderer;
    if (!ipc && window.require) ipc = window.require('electron').ipcRenderer;
    if (ipc) {
      const result = await ipc.invoke('set-auto-launch', !autoLaunch);
      setAutoLaunch(result.enabled);
    }
  };

  const checkForUpdatesManual = async () => {
    let ipc = window.ipcRenderer;
    if (!ipc && window.require) ipc = window.require('electron').ipcRenderer;
    if (ipc) {
      setUpdateStatus('checking');
      setUpdateText('Buscando actualizaciones...');
      const result = await ipc.invoke('check-for-updates');
      if (!result.success) {
        setUpdateStatus('error');
        setUpdateText(`Error de actualización: ${result.error || result.message}`);
      }
    } else {
      alert("La búsqueda de actualizaciones solo está disponible en la aplicación instalada.");
    }
  };

  // Función centralizada para procesar respuestas con comandos
  const processResponse = async (responseText: string) => {
    let finalResponse = responseText;
    const visionMatch = responseText.match(/\[CMD_VISION:\s*(.*?)\]/i);
    const readMatch = responseText.match(/\[CMD_READ:\s*(.*?)\]/i);
    const urlMatch = responseText.match(/\[CMD_URL:\s*(.*?)\]/i);
    const cmdMatch = responseText.match(/\[CMD:\s*(.*?)\]/i);
    const protocolMatch = responseText.match(/\[CMD_PROTOCOL:\s*(.*?)\]/i);
    
    if (protocolMatch && protocolMatch[1]) {
      setProtocol(protocolMatch[1].trim().toLowerCase());
      finalResponse = responseText.replace(/\[CMD_PROTOCOL:\s*(.*?)\]/ig, '').trim();
    }
    
    if (visionMatch && visionMatch[1]) {
      const type = visionMatch[1].trim().toLowerCase();
      let capturedImage = null;
      try {
        let ipc = window.ipcRenderer;
        if (!ipc && window.require) ipc = window.require('electron').ipcRenderer;
        
        if (type.includes('pantalla') && ipc) {
          capturedImage = await ipc.invoke('capture-screen');
        } else if (type.includes('camara') || type.includes('cámara')) {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          const video = document.createElement('video');
          video.srcObject = stream;
          await video.play();
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          canvas.getContext('2d')?.drawImage(video, 0, 0);
          capturedImage = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
          stream.getTracks().forEach(t => t.stop());
        }
      } catch(e) { console.error("Vision error:", e); }
      
      if (capturedImage) {
        const followUp = await chatWithJarvis("Aquí tienes la imagen que solicitaste. Analízala y responde a mi pregunta anterior con base en lo que ves. No uses comandos ahora.", messages, capturedImage);
        if (followUp) finalResponse = followUp.response;
      } else {
        finalResponse = "Lo siento señor, mis sensores visuales experimentaron un error.";
      }
    } else if (readMatch && readMatch[1]) {
      const readCommand = readMatch[1];
      let ipc = window.ipcRenderer;
      if (!ipc && window.require) ipc = window.require('electron').ipcRenderer;
      if (ipc) {
        const result = await ipc.invoke('execute-command', readCommand);
        if (result.success) {
          const followUp = await chatWithJarvis(`RESULTADO DEL SISTEMA PARA TU COMANDO OCULTO:\n${result.output}\n\nCon base en esto, responde a mi pregunta anterior de forma muy breve y natural (como Jarvis). NO uses comandos ahora.`, messages, null);
          if (followUp) finalResponse = followUp.response;
        } else {
          finalResponse = "Lo siento señor, mis sensores no pudieron acceder a esa información del sistema.";
        }
      }
    } else if (urlMatch && urlMatch[1]) {
      const url = urlMatch[1].trim();
      let ipc = window.ipcRenderer;
      if (!ipc && window.require) ipc = window.require('electron').ipcRenderer;
      if (ipc) {
        ipc.invoke('open-url', url);
      }
      finalResponse = responseText.replace(/\[CMD_URL:\s*(.*?)\]/ig, '').trim();
    } else if (cmdMatch && cmdMatch[1]) {
      const systemCommand = cmdMatch[1];
      let ipc = window.ipcRenderer;
      if (!ipc && window.require) ipc = window.require('electron').ipcRenderer;
      if (ipc) {
        if (systemCommand.toLowerCase().includes('winget install')) {
          // Extraer nombre de la app para el indicador visual
          const appName = systemCommand.replace(/winget install/i, '').replace(/--accept.*$/i, '').trim();
          setInstallingApp(appName);
          ipc.invoke('execute-command', systemCommand).then((res: any) => {
            const statusText = res.success 
              ? `La instalación de ${appName} se ha completado con éxito, señor.` 
              : `Señor, hubo un error al intentar instalar ${appName}.`;
            setInstallingApp(null);
            speak(statusText);
            saveMessage('system', `(🤖 Reporte de Sistema): ${statusText}`);
          });
        } else {
          ipc.invoke('execute-command', systemCommand);
        }
      }
      finalResponse = responseText.replace(/\[CMD:\s*(.*?)\]/ig, '').trim();
    }
    await saveMessage('system', finalResponse);
    speak(finalResponse);

    // If Jarvis asked a question (no CMD tags and contains ?), activate follow-up listening
    const hasCmd = /\[CMD:|CMD_READ:|CMD_VISION:|CMD_URL:/i.test(responseText);
    if (!hasCmd && finalResponse.includes('?') && isHandsFree) {
      // Wait a moment for the speech to start, then tell Python to listen for the response
      setTimeout(async () => {
        let ipc = (window as any).ipcRenderer;
        if (!ipc && (window as any).require) ipc = (window as any).require('electron').ipcRenderer;
        if (ipc) {
          await ipc.invoke('wake-word-follow-up');
          setDebugText('🎤 Jarvis espera tu respuesta...');
        }
      }, 1500);
    }
  };

  const handleWakeWordCommand = async (command: string) => {
    if (command === "¿En qué le puedo ayudar, señor?") {
      speak(command);
      return;
    }
    
    setIsTyping(true);
    try {
      await saveMessage('user', `(🗣️ Voz: ${command})`);
      const result = await chatWithJarvis(command, messages, null);
      if (result) {
        let finalResponse = result.response;
        await processResponse(finalResponse);
      }
    } catch (e) { console.error(e); }
    setIsTyping(false);
  };

  const vad = useWakeWord({
    onCommandDetected: handleWakeWordCommand,
    onAudioDetected: (base64) => handleAudioSend(base64),
    onAwaitingCommand: () => {
      setDebugText('🎤 Escuchando tu orden...');
    },
    onDebug: (text) => {
      setDebugText(text);
      setTimeout(() => setDebugText(''), 3000);
    }
  });

  const toggleHandsFree = () => {
    if (isHandsFree) {
      vad.pause();
      setIsHandsFree(false);
    } else {
      vad.start();
      setIsHandsFree(true);
    }
  };

  useEffect(() => {
    // Iniciar motor de voz automáticamente al cargar
    vad.start();
  }, []);

  useEffect(() => {
    const q = getMessagesQuery();
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[];
      setMessages(msgs);
    });

    const mq = getMemoriesQuery();
    const unsubscribeMemories = onSnapshot(mq, (snapshot) => {
      const mems = snapshot.docs.map(doc => doc.data().content as string);
      setMemories(mems);
    });

    return () => {
      unsubscribe();
      unsubscribeMemories();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const setupAudioVisualizer = (audioElement: HTMLAudioElement) => {
    try {
      if (!sharedAudioCtx) {
        sharedAudioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        sharedAnalyser = sharedAudioCtx.createAnalyser();
        sharedAnalyser.fftSize = 256;
        sharedAnalyser.connect(sharedAudioCtx.destination);
      }
      
      const source = sharedAudioCtx.createMediaElementSource(audioElement);
      source.connect(sharedAnalyser!);
      
      const dataArray = new Uint8Array(sharedAnalyser!.frequencyBinCount);
      let animationId: number;

      const updateVolume = () => {
        sharedAnalyser!.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
        const average = sum / dataArray.length;
        // Normalizar volumen
        const volume = Math.min(average / 100, 1.5);
        
        if (visualizerRef.current) {
          visualizerRef.current.style.setProperty('--audio-volume', volume.toString());
        }
        animationId = requestAnimationFrame(updateVolume);
      };

      audioElement.onplay = () => {
        setIsJarvisSpeaking(true);
        if (sharedAudioCtx?.state === 'suspended') sharedAudioCtx.resume();
        updateVolume();
      };

      audioElement.onpause = () => {
        setIsJarvisSpeaking(false);
        cancelAnimationFrame(animationId);
        if (visualizerRef.current) visualizerRef.current.style.setProperty('--audio-volume', '0');
      };

      audioElement.onended = () => {
        setIsJarvisSpeaking(false);
        cancelAnimationFrame(animationId);
        if (visualizerRef.current) visualizerRef.current.style.setProperty('--audio-volume', '0');
        source.disconnect();
      };
    } catch (e) {
      console.error("Audio visualizer error", e);
      audioElement.onplay = () => setIsJarvisSpeaking(true);
      audioElement.onended = () => setIsJarvisSpeaking(false);
      audioElement.onpause = () => setIsJarvisSpeaking(false);
    }
  };

  const speak = async (text: string) => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
    }
    window.speechSynthesis.cancel();

    // 1. Intentar usar ElevenLabs API directamente para ultra velocidad
    try {
      const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
      if (apiKey) {
        // Voz "George" (Británico, maduro, serio) - perfecto para Jarvis
        const response = await fetch("https://api.elevenlabs.io/v1/text-to-speech/JBFqnCBsd6RMkjVDRZzb", {
          method: "POST",
          headers: {
            "Accept": "audio/mpeg",
            "Content-Type": "application/json",
            "xi-api-key": apiKey
          },
          body: JSON.stringify({
            text: text,
            model_id: "eleven_multilingual_v2",
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75
            }
          })
        });

        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          const audio = new Audio(url);
          audio.crossOrigin = "anonymous";
          setupAudioVisualizer(audio);
          currentAudio = audio;
          audio.play();
          return;
        }
      }
    } catch (e) {
      console.error("Error con ElevenLabs, cayendo a Edge-TTS", e);
    }

    // 2. Fallback a Edge-TTS (Azure) mediante IPC si ElevenLabs falla o se queda sin créditos
    let ipc = window.ipcRenderer;
    if (!ipc && window.require) ipc = window.require('electron').ipcRenderer;
    
    if (ipc) {
      try {
        const result = await ipc.invoke('speak-text', text);
        if (result.success && result.audioBase64) {
          const audio = new Audio('data:audio/mp3;base64,' + result.audioBase64);
          setupAudioVisualizer(audio);
          currentAudio = audio;
          audio.play();
          return;
        }
      } catch (e) {
        console.error("Error with Edge TTS", e);
      }
    }

    // 3. Fallback final a window.speechSynthesis
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();
    const voice = voices.find(v => v.lang.includes('es') && (v.name.includes('Pablo') || v.name.includes('Raul'))) 
                  || voices.find(v => v.lang.includes('es') && v.name.toLowerCase().includes('male')) 
                  || voices.find(v => v.lang.includes('es'));
    if (voice) utterance.voice = voice;
    utterance.rate = 1.0;
    utterance.pitch = 0.7;
    
    utterance.onstart = () => {
      setIsJarvisSpeaking(true);
      if (visualizerRef.current) visualizerRef.current.classList.add('jarvis-speaking-fallback');
    };
    utterance.onend = () => {
      setIsJarvisSpeaking(false);
      if (visualizerRef.current) visualizerRef.current.classList.remove('jarvis-speaking-fallback');
    };
    
    synth.speak(utterance);
  };

  // const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  // const toggleListening = async () => {
  //   if (isListening && mediaRecorder) {
  //     mediaRecorder.stop();
  //     setIsListening(false);
  //     return;
  //   }
  //   
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  //     const recorder = new MediaRecorder(stream);
  //     const chunks: Blob[] = [];
  // 
  //     recorder.ondataavailable = (e) => {
  //       if (e.data.size > 0) chunks.push(e.data);
  //     };
  // 
  //     recorder.onstop = async () => {
  //       const audioBlob = new Blob(chunks, { type: 'audio/webm' });
  //       
  //       const reader = new FileReader();
  //       reader.readAsDataURL(audioBlob);
  //       reader.onloadend = async () => {
  //         const base64Audio = (reader.result as string).split(',')[1];
  //         stream.getTracks().forEach(track => track.stop());
  //         await handleAudioSend(base64Audio);
  //       };
  //     };
  // 
  //     setMediaRecorder(recorder);
  //     recorder.start();
  //     setIsListening(true);
  //   } catch (err) {
  //     console.error("Error accessing microphone:", err);
  //     alert("No se pudo acceder al micrófono.");
  //   }
  // };

  const handleAudioSend = async (audioBase64: string) => {
    setIsTyping(true);
    try {
      let finalImage = attachedImage;
      if (isCameraLive && liveVideoRef.current) {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = liveVideoRef.current.videoWidth;
          canvas.height = liveVideoRef.current.videoHeight;
          canvas.getContext('2d')?.drawImage(liveVideoRef.current, 0, 0);
          finalImage = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
        } catch(e) { console.error("Error capturing live frame:", e); }
      } else if (isScreenLive) {
        try {
          let ipc = window.ipcRenderer;
          if (!ipc && window.require) ipc = window.require('electron').ipcRenderer;
          if (ipc) {
            finalImage = await ipc.invoke('capture-screen');
          }
        } catch(e) { console.error("Error capturing live screen:", e); }
      }

      const result = await chatWithJarvis({ audioData: audioBase64 }, messages, finalImage, memories);
      if (!isCameraLive && !isScreenLive) {
        setAttachedImage(null);
      }
      if (result) {
        // Guardar el mensaje del usuario con la transcripción de Whisper
        if (result.transcription) {
          await saveMessage('user', `(🗣️ Voz: ${result.transcription})`);
        }

        // Interceptar comandos de memoria
        let finalResponse = result.response;
        const memRegex = /\[CMD_MEM:\s*(.+?)\]/g;
        let match;
        while ((match = memRegex.exec(finalResponse)) !== null) {
          const memoryContent = match[1];
          await saveMemory(memoryContent);
          finalResponse = finalResponse.replace(match[0], '');
        }

        await processResponse(finalResponse);
      }
    } catch (e) {
      console.error(e);
    }
    setIsTyping(false);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && !attachedImage) return;

    let finalImage = attachedImage;
    const textLower = input.toLowerCase();
    
    if (!finalImage) {
      if (textLower.includes("pantalla")) {
        try {
          if (window.ipcRenderer) finalImage = await window.ipcRenderer.invoke('capture-screen');
        } catch(e) {}
      } else if (textLower.includes("cámara") || textLower.includes("mírame") || textLower.includes("camara")) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          const video = document.createElement('video');
          video.srcObject = stream;
          await video.play();
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          canvas.getContext('2d')?.drawImage(video, 0, 0);
          finalImage = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
          stream.getTracks().forEach(t => t.stop());
        } catch(e) {}
      }
    }

    const newMessage = input;
    setInput('');
    setAttachedImage(null);
    setIsTyping(true);

    try {
      await saveMessage('user', newMessage || "(📸 Imagen adjuntada)");
      const result = await chatWithJarvis(newMessage || "¿Qué ves en esta imagen?", messages, finalImage, memories);
      if (result) {
        // Interceptar comandos de memoria
        let finalResponse = result.response;
        const memRegex = /\[CMD_MEM:\s*(.+?)\]/g;
        let match;
        while ((match = memRegex.exec(finalResponse)) !== null) {
          const memoryContent = match[1];
          await saveMemory(memoryContent);
          finalResponse = finalResponse.replace(match[0], '');
        }
        
        await processResponse(finalResponse);
      }
    } catch (e) { console.error(e); }
    setIsTyping(false);
  };

  // Show loading screen while checking Python
  if (pythonAvailable === null) {
    return (
      <div className="jarvis-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '40px', height: '40px', border: '3px solid rgba(14,165,233,0.3)', borderTop: '3px solid #0ea5e9', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }}></div>
          <div style={{ color: '#94a3b8', fontSize: '14px' }}>Iniciando sistemas...</div>
        </div>
      </div>
    );
  }

  // Show Python not found screen
  if (pythonAvailable === false) {
    return (
      <div className="jarvis-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', maxWidth: '450px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '20px', padding: '40px', backdropFilter: 'blur(12px)' }}>
          <div style={{ fontSize: '60px', marginBottom: '20px' }}>⚠️</div>
          <h2 style={{ color: '#f59e0b', marginBottom: '12px', fontSize: '22px' }}>Python no detectado</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.6, marginBottom: '24px', fontSize: '14px' }}>
            J.A.R.V.I.S. necesita <strong style={{ color: '#f8fafc' }}>Python</strong> instalado en su sistema para activar los módulos de reconocimiento de voz y síntesis de audio.
          </p>
          <a 
            href="https://www.python.org/downloads/" 
            target="_blank" 
            rel="noreferrer"
            style={{ display: 'inline-block', background: '#0ea5e9', color: '#fff', padding: '12px 28px', borderRadius: '10px', textDecoration: 'none', fontWeight: 600, marginBottom: '16px', transition: 'all 0.3s' }}
          >
            Descargar Python
          </a>
          <br />
          <button 
            onClick={() => setPythonAvailable(null)}
            style={{ background: 'transparent', border: '1px solid rgba(14,165,233,0.5)', color: '#0ea5e9', padding: '10px 24px', borderRadius: '10px', cursor: 'pointer', marginTop: '8px', fontSize: '14px' }}
          >
            🔄 Reintentar
          </button>
          <p style={{ color: '#64748b', fontSize: '12px', marginTop: '20px' }}>
            Después de instalar Python, asegúrese de marcar "Add Python to PATH" durante la instalación y reinicie J.A.R.V.I.S.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`jarvis-container ${isCameraLive ? 'camera-live' : ''}`} data-protocol={protocol}>
      <video 
        ref={liveVideoRef} 
        className="live-background-video" 
        autoPlay 
        playsInline 
        muted 
        style={{ display: isCameraLive ? 'block' : 'none' }}
      />
      <header className="header" style={{ alignItems: 'flex-start' }}>
        <div>
          <div className="logo">J.A.R.V.I.S.</div>
          <div className="protocol-panel">
            <button className={`protocol-btn ${protocol === 'standard' ? 'active' : ''}`} onClick={() => setProtocol('standard')}>🔵 Estándar</button>
            <button className={`protocol-btn ${protocol === 'deep-work' ? 'active' : ''}`} onClick={() => setProtocol('deep-work')}>🟣 Deep Work</button>
            <button className={`protocol-btn ${protocol === 'red-alert' ? 'active' : ''}`} onClick={() => setProtocol('red-alert')}>🔴 Alerta</button>
            <button className={`protocol-btn ${protocol === 'night' ? 'active' : ''}`} onClick={() => setProtocol('night')}>🟠 Nocturno</button>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
          <div className="status-indicator">
            <div className="dot" style={{ backgroundColor: isTyping ? '#0ea5e9' : (isListening || vad.userSpeaking) ? '#ef4444' : isHandsFree ? '#f59e0b' : '#10b981' }}></div>
            {isTyping ? 'Procesando...' : vad.userSpeaking ? 'Escuchando voz...' : isHandsFree ? 'Modo Manos Libres Activo' : isListening ? 'Grabando manual...' : 'Sistemas en línea'}
          </div>
        </div>
      </header>

      {installingApp && (
        <div style={{
          background: 'linear-gradient(90deg, rgba(14,165,233,0.15) 0%, rgba(59,130,246,0.15) 100%)',
          border: '1px solid rgba(14,165,233,0.3)',
          borderRadius: '12px',
          padding: '12px 20px',
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          animation: 'fadeIn 0.3s ease-in-out'
        }}>
          <div style={{
            width: '20px', height: '20px', border: '3px solid rgba(14,165,233,0.3)',
            borderTop: '3px solid #0ea5e9', borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#0ea5e9' }}>
              ⬇️ Instalando {installingApp}...
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
              Descargando e instalando en segundo plano. Jarvis le avisará cuando termine.
            </div>
          </div>
        </div>
      )}

      {updateStatus !== 'idle' && updateStatus !== 'not-available' && (
        <div style={{
          background: 'linear-gradient(90deg, rgba(16,185,129,0.15) 0%, rgba(14,165,233,0.15) 100%)',
          border: '1px solid rgba(16,185,129,0.3)',
          borderRadius: '12px',
          padding: '12px 20px',
          marginBottom: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          animation: 'fadeIn 0.3s ease-in-out'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
            {updateStatus === 'checking' || updateStatus === 'downloading' ? (
              <div style={{
                width: '18px', height: '18px', border: '3px solid rgba(14,165,233,0.3)',
                borderTop: '3px solid #0ea5e9', borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
            ) : updateStatus === 'ready' ? (
              <div style={{ fontSize: '20px' }}>📥</div>
            ) : (
              <div style={{ fontSize: '20px' }}>⚠️</div>
            )}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: updateStatus === 'ready' ? '#10b981' : '#0ea5e9' }}>
                {updateText}
              </div>
              {updateStatus === 'downloading' && (
                <div style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.1)', height: '4px', borderRadius: '2px', marginTop: '6px', overflow: 'hidden' }}>
                  <div style={{ width: `${updateProgress}%`, backgroundColor: '#0ea5e9', height: '100%', transition: 'width 0.2s' }}></div>
                </div>
              )}
            </div>
          </div>
          {updateStatus === 'ready' && (
            <button
              onClick={handleQuitAndInstall}
              style={{
                background: '#10b981',
                color: '#fff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 4px 12px rgba(16,185,129,0.3)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.filter = 'none'}
            >
              Reiniciar e Instalar
            </button>
          )}
          {updateStatus === 'error' && (
            <button
              onClick={() => setUpdateStatus('idle')}
              style={{
                background: 'transparent',
                color: '#94a3b8',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '11px',
                cursor: 'pointer'
              }}
            >
              Cerrar
            </button>
          )}
        </div>
      )}

      <main className="main-content">
        <div ref={visualizerRef} className={`ai-core-visualizer ${isTyping ? 'thinking' : ''} ${vad.userSpeaking ? 'hearing' : ''} ${isJarvisSpeaking ? 'jarvis-speaking' : ''}`}>
          <div className="atom">
            <div className="ring ring-1"></div>
            <div className="ring ring-2"></div>
            <div className="ring ring-3"></div>
            <img src="./cyber_brain.png" alt="Brain Core" className="brain-core" />
          </div>
          {isHandsFree && !vad.userSpeaking && (
            <div className="vad-status" style={{ bottom: '-30px', textAlign: 'center' }}>
              {!vad.supported ? "Error: Tu sistema no soporta el motor de voz nativo." : 
               "Modo 'Oye Jarvis' Activado"}
               {debugText && <div style={{color: '#94a3b8', fontSize: '12px', marginTop: '4px'}}>Escuchando: "{debugText}"</div>}
            </div>
          )}
        </div>

        <div className="chat-container">
          <div className="messages-area">
            {messages.length === 0 && (
              <div className="message system">
                Saludos, señor. Soy Jarvis, su asistente virtual. He iniciado los protocolos principales y conectado con la base de datos. ¿En qué le puedo ayudar hoy?
              </div>
            )}
            
            {messages.map(msg => (
              <div key={msg.id} className={`message ${msg.role}`}>
                {msg.content}
              </div>
            ))}
            
            {isTyping && (
              <div className="message system typing-indicator">
                Analizando...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="input-area" style={{ position: 'relative' }}>
            <button 
              className={`vision-button ${isScreenLive ? 'live-active' : ''}`}
              onClick={toggleScreenLive}
              title={isScreenLive ? "Apagar Visión de Pantalla Continua" : "Activar Visión de Pantalla Continua"}
              style={{ 
                backgroundColor: isScreenLive ? 'rgba(14, 165, 233, 0.3)' : 'rgba(255, 255, 255, 0.05)', 
                borderColor: isScreenLive ? '#0ea5e9' : 'rgba(255,255,255,0.1)' 
              }}
            >
              💻
            </button>
            <button 
              className={`vision-button ${isFaceRegistered ? 'live-active' : ''}`}
              onClick={registerFace}
              title={isFaceRegistered ? "Rostro ya registrado. Clic para volver a registrar." : "Registrar Rostro (Requiere cámara encendida)"}
              style={{ 
                backgroundColor: isFaceRegistered ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255, 255, 255, 0.05)', 
                borderColor: isFaceRegistered ? '#10b981' : 'rgba(255,255,255,0.1)' 
              }}
            >
              👤
            </button>
            <button 
              className={`vision-button ${isCameraLive ? 'live-active' : ''}`}
              onClick={toggleLiveCamera}
              title={isCameraLive ? "Apagar Cámara Frontal" : "Encender Cámara Frontal"}
              style={{ 
                backgroundColor: isCameraLive ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255, 255, 255, 0.05)', 
                borderColor: isCameraLive ? '#10b981' : 'rgba(255,255,255,0.1)' 
              }}
            >
              📷
            </button>
            <button 
              className="vision-button"
              onClick={() => {
                if (currentAudio) {
                  currentAudio.pause();
                  currentAudio.currentTime = 0;
                  currentAudio = null;
                }
                window.speechSynthesis.cancel();
              }}
              title="Silenciar la voz de Jarvis"
            >
              🛑
            </button>
            <button 
              className={`action-button ${isHandsFree ? 'hands-free-active' : ''}`}
              onClick={toggleHandsFree}
              title="Activar Manos Libres Inteligente"
              style={{ backgroundColor: isHandsFree ? '#f59e0b' : '#334155' }}
            >
              🎙️ Auto
            </button>
            <button 
              className="vision-button"
              onClick={toggleAutoLaunch}
              title={autoLaunch ? 'Jarvis se abre con Windows (clic para desactivar)' : 'Jarvis NO se abre con Windows (clic para activar)'}
              style={{ backgroundColor: autoLaunch ? 'rgba(16, 185, 129, 0.2)' : 'transparent', borderColor: autoLaunch ? 'rgba(16, 185, 129, 0.5)' : 'rgba(14,165,233,0.5)' }}
            >
              {autoLaunch ? '🟢' : '⚫'} Inicio
            </button>
            <button 
              className="vision-button"
              onClick={checkForUpdatesManual}
              title="Buscar actualizaciones de J.A.R.V.I.S. manualmente"
              style={{ borderColor: 'rgba(14,165,233,0.5)' }}
            >
              🔄 Act.
            </button>
            <div style={{ position: 'relative', flex: 1, display: 'flex' }}>
              {attachedImage && (
                <div className="image-preview-container" style={{ position: 'absolute', bottom: '100%', left: 0, marginBottom: '10px' }}>
                  <img src={`data:image/jpeg;base64,${attachedImage}`} alt="Preview" className="image-preview" />
                  <button className="remove-image" onClick={() => setAttachedImage(null)}>✕</button>
                </div>
              )}
              <input 
                type="text" 
                className="input-field" 
                placeholder="Escribe, habla o pega una imagen (Ctrl+V)..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSend(e as any);
                  }
                }}
                onPaste={(e) => {
                  const items = e.clipboardData.items;
                  for (let i = 0; i < items.length; i++) {
                    if (items[i].type.indexOf('image') !== -1) {
                      const file = items[i].getAsFile();
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (evt) => {
                          const base64 = (evt.target?.result as string).split(',')[1];
                          setAttachedImage(base64);
                        };
                        reader.readAsDataURL(file);
                      }
                    }
                  }
                }}
                disabled={isTyping || isListening}
              />
            </div>
            <button className="action-button" onClick={(e) => handleSend(e as any)} disabled={isTyping || isListening}>
              Enviar
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
