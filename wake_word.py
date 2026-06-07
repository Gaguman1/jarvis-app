import sys
import json
import queue
import threading
import sounddevice as sd
from vosk import Model, KaldiRecognizer
import wave
import tempfile
import os

q = queue.Queue()
follow_up_mode = False
follow_up_lock = threading.Lock()

def callback(indata, frames, time, status):
    if status:
        pass
    q.put(bytes(indata))

def listen_for_stdin():
    """Thread that listens for commands from Electron via stdin."""
    global follow_up_mode
    for line in sys.stdin:
        cmd = line.strip()
        if cmd == "FOLLOW_UP":
            with follow_up_lock:
                follow_up_mode = True
            print("DEBUG: Escuchando su respuesta...", flush=True)
            print("FOLLOW_UP_ACTIVE:", flush=True)

try:
    model_path = sys.argv[1] if len(sys.argv) > 1 else "vosk-model-small-es-0.42"
    model = Model(model_path)
    recognizer = KaldiRecognizer(model, 16000)
    print("READY", flush=True)

    # Start stdin listener thread
    stdin_thread = threading.Thread(target=listen_for_stdin, daemon=True)
    stdin_thread.start()

    active_mode = False
    audio_buffer = []

    with sd.RawInputStream(samplerate=16000, blocksize=8000, dtype='int16',
                           channels=1, callback=callback):
        while True:
            data = q.get()
            audio_buffer.append(data)
            
            # Check if we're in follow-up mode (Jarvis asked a question)
            in_follow_up = False
            with follow_up_lock:
                in_follow_up = follow_up_mode
            
            if recognizer.AcceptWaveform(data):
                result = json.loads(recognizer.Result())
                text = result.get("text", "")
                
                # Show debug
                if text.strip():
                    if in_follow_up:
                        print("DEBUG: Respuesta: " + text, flush=True)
                    else:
                        print("DEBUG: " + text, flush=True)
                
                # FOLLOW-UP MODE: Capture any speech without wake word
                if in_follow_up and text.strip():
                    temp_wav = os.path.join(tempfile.gettempdir(), 'jarvis_command.wav')
                    with wave.open(temp_wav, 'wb') as wf:
                        wf.setnchannels(1)
                        wf.setsampwidth(2)
                        wf.setframerate(16000)
                        wf.writeframes(b''.join(audio_buffer))
                    
                    print(f"WAKE_WORD_AUDIO:{temp_wav}", flush=True)
                    with follow_up_lock:
                        follow_up_mode = False
                    audio_buffer = []
                    continue
                
                variations = ["jarvis", "yarvis", "harvis", "charvis", "llarvis", "arvis", "jarbis", "yarbis", "charbis", "avis"]
                has_wake_word = any(v in text.lower() for v in variations)
                
                if has_wake_word or active_mode:
                    word_count = len(text.split())
                    
                    if has_wake_word and word_count <= 2 and not active_mode:
                        # They only said the wake word and paused. Go into wait mode.
                        active_mode = True
                        print("WAKE_WORD_READY_FOR_COMMAND:", flush=True)
                        print("DEBUG: Escuchando tu orden...", flush=True)
                        audio_buffer = [] # Start fresh for the actual command
                        continue
                    
                    if text.strip():
                        # We got the command!
                        temp_wav = os.path.join(tempfile.gettempdir(), 'jarvis_command.wav')
                        with wave.open(temp_wav, 'wb') as wf:
                            wf.setnchannels(1)
                            wf.setsampwidth(2)
                            wf.setframerate(16000)
                            wf.writeframes(b''.join(audio_buffer))
                        
                        print(f"WAKE_WORD_AUDIO:{temp_wav}", flush=True)
                        active_mode = False
                        
                audio_buffer = [] # Reset for next phrase
            else:
                partial = json.loads(recognizer.PartialResult())
                partial_text = partial.get("partial", "")
                if partial_text:
                    if in_follow_up:
                        print("DEBUG: Respuesta: " + partial_text + "...", flush=True)
                    elif active_mode:
                        print("DEBUG: Escuchando tu orden... " + partial_text + "...", flush=True)
                    else:
                        print("DEBUG: " + partial_text + "...", flush=True)

except KeyboardInterrupt:
    pass
except Exception as e:
    print(f"Error: {e}", file=sys.stderr)
