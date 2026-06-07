import { useState, useRef } from 'react';

export function useSimpleVAD({ onSpeechStart, onSpeechEnd }: { onSpeechStart: () => void, onSpeechEnd: (audioBase64: string) => void }) {
  const [listening, setListening] = useState(false);
  const [userSpeaking, setUserSpeaking] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const frameIdRef = useRef<number>(0);
  
  const isSpeakingRef = useRef(false);
  const silenceStartRef = useRef<number>(0);
  const SILENCE_THRESHOLD = 1500; // 1.5 segundos de silencio para cortar
  const VOLUME_THRESHOLD = 15; // Ajustar sensibilidad

  const stop = () => {
    setListening(false);
    setUserSpeaking(false);
    isSpeakingRef.current = false;
    cancelAnimationFrame(frameIdRef.current);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
  };

  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const audioCtx = new window.AudioContext();
      audioContextRef.current = audioCtx;
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;
      
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);
      
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
      setListening(true);
      
      const checkVolume = () => {
        if (!analyserRef.current || !dataArrayRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArrayRef.current as any);
        
        let sum = 0;
        for (let i = 0; i < dataArrayRef.current.length; i++) {
          sum += dataArrayRef.current[i];
        }
        const averageVolume = sum / dataArrayRef.current.length;

        if (averageVolume > VOLUME_THRESHOLD) {
          if (!isSpeakingRef.current) {
            isSpeakingRef.current = true;
            setUserSpeaking(true);
            onSpeechStart();
            
            // Iniciar grabación
            audioChunksRef.current = [];
            const mr = new MediaRecorder(streamRef.current!);
            mediaRecorderRef.current = mr;
            mr.ondataavailable = (e) => {
              if (e.data.size > 0) audioChunksRef.current.push(e.data);
            };
            mr.onstop = () => {
              const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
              const reader = new FileReader();
              reader.readAsDataURL(audioBlob);
              reader.onloadend = () => {
                const base64data = (reader.result as string).split(',')[1];
                onSpeechEnd(base64data);
              };
            };
            mr.start();
          }
          silenceStartRef.current = 0;
        } else {
          if (isSpeakingRef.current) {
            if (silenceStartRef.current === 0) {
              silenceStartRef.current = Date.now();
            } else if (Date.now() - silenceStartRef.current > SILENCE_THRESHOLD) {
              isSpeakingRef.current = false;
              setUserSpeaking(false);
              silenceStartRef.current = 0;
              if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
                mediaRecorderRef.current.stop();
              }
            }
          }
        }
        
        frameIdRef.current = requestAnimationFrame(checkVolume);
      };
      
      checkVolume();
    } catch (e) {
      console.error("Error iniciando micrófono:", e);
    }
  };

  const pause = () => {
    stop();
  };

  return { start, pause, userSpeaking, listening, loading: false, errored: null };
}
