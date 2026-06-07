import { useState, useEffect } from 'react';

// Generate a short beep using the Web Audio API
function playBeep() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, ctx.currentTime); // A5 note
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.15);
    
    // Second beep (higher pitch, like a confirmation)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1320, ctx.currentTime + 0.12); // E6 note
    gain2.gain.setValueAtTime(0.3, ctx.currentTime + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    osc2.start(ctx.currentTime + 0.12);
    osc2.stop(ctx.currentTime + 0.3);
  } catch (e) {
    console.warn("Could not play beep:", e);
  }
}

export function useWakeWord({ onCommandDetected, onAudioDetected, onAwaitingCommand, onDebug }: { 
  onCommandDetected: (text: string) => void, 
  onAudioDetected?: (base64Audio: string) => void,
  onAwaitingCommand?: () => void,
  onDebug?: (text: string) => void 
}) {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);
  const userSpeaking = false;

  useEffect(() => {
    let ipc = (window as any).ipcRenderer;
    if (!ipc && (window as any).require) ipc = (window as any).require('electron').ipcRenderer;
    
    if (!ipc) {
      setSupported(false);
      return;
    }

    const handleDetected = (_event: any, command: string) => {
      console.log("Python Vosk detectó:", command);
      
      const parts = command.split("jarvis");
      const cmd = parts[parts.length - 1]?.trim() || "";
      
      if (cmd.length > 0) {
        onCommandDetected(cmd);
      } else {
        onCommandDetected("¿En qué le puedo ayudar, señor?");
      }
    };

    const handleReady = () => {
      console.log("Python Vosk READY");
    };
    
    const handleDebug = (_event: any, text: string) => {
      if (onDebug) onDebug(text);
    };
    
    const handleAudio = (_event: any, base64Audio: string) => {
      if (onAudioDetected) onAudioDetected(base64Audio);
    };

    const handleAwaitingCommand = () => {
      playBeep();
      if (onAwaitingCommand) onAwaitingCommand();
    };

    ipc.on('wake-word-detected', handleDetected);
    ipc.on('wake-word-ready', handleReady);
    ipc.on('wake-word-debug', handleDebug);
    ipc.on('wake-word-audio', handleAudio);
    ipc.on('wake-word-awaiting-command', handleAwaitingCommand);

    return () => {
      ipc.removeListener('wake-word-detected', handleDetected);
      ipc.removeListener('wake-word-ready', handleReady);
      ipc.removeListener('wake-word-debug', handleDebug);
      ipc.removeListener('wake-word-audio', handleAudio);
      ipc.removeListener('wake-word-awaiting-command', handleAwaitingCommand);
    };
  }, [onCommandDetected, onDebug]);

  const start = async () => {
    let ipc = (window as any).ipcRenderer;
    if (!ipc && (window as any).require) ipc = (window as any).require('electron').ipcRenderer;
    if (ipc) {
      await ipc.invoke('start-wake-word');
      setListening(true);
    }
  };

  const pause = async () => {
    let ipc = (window as any).ipcRenderer;
    if (!ipc && (window as any).require) ipc = (window as any).require('electron').ipcRenderer;
    if (ipc) {
      await ipc.invoke('stop-wake-word');
      setListening(false);
    }
  };

  return { start, pause, listening, userSpeaking, supported };
}
