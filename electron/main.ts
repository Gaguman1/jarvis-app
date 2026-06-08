import { app, BrowserWindow, ipcMain, desktopCapturer, shell } from 'electron'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFile } from 'node:child_process'
import { session } from 'electron'
import fs from 'node:fs/promises'
import { readFileSync } from 'node:fs'
import { autoUpdater } from 'electron-updater'

const _dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(_dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - System environment variable
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

// === Resolve paths for dev vs production ===
const isDev = !!VITE_DEV_SERVER_URL
const RESOURCES_PATH = isDev ? process.env.APP_ROOT : process.resourcesPath

function getResourcePath(filename: string): string {
  return path.join(RESOURCES_PATH, filename)
}

// === Load .env in production ===
if (!isDev) {
  try {
    const envPath = getResourcePath('.env')
    const envContent = readFileSync(envPath, 'utf-8')
    for (const line of envContent.split('\n')) {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith('#')) {
        const eqIndex = trimmed.indexOf('=')
        if (eqIndex > 0) {
          const key = trimmed.substring(0, eqIndex).trim()
          const value = trimmed.substring(eqIndex + 1).trim()
          process.env[key] = value
        }
      }
    }
  } catch (e) {
    console.warn('Could not load .env:', e)
  }
}

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    width: 900,
    height: 700,
    autoHideMenuBar: true,
    icon: path.join(_dirname, '..', 'build', 'icon.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      defaultEncoding: 'utf-8',
    },
  })

  // Start with dev tools in development
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
    // win.webContents.openDevTools()
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }

  // Setup auto updater
  setupAutoUpdater()
}

let isManualCheck = false

function setupAutoUpdater() {
  if (isDev) return

  autoUpdater.on('checking-for-update', () => {
    win?.webContents.send('update-message', { status: 'checking', text: 'Buscando actualizaciones...', isManual: isManualCheck })
  })

  autoUpdater.on('update-available', (info) => {
    win?.webContents.send('update-message', { status: 'available', text: `Nueva versión disponible (${info.version}). Descargando...`, info, isManual: isManualCheck })
  })

  autoUpdater.on('update-not-available', () => {
    win?.webContents.send('update-message', { status: 'not-available', text: 'Sistemas actualizados.', isManual: isManualCheck })
    isManualCheck = false
  })

  autoUpdater.on('error', (err) => {
    win?.webContents.send('update-message', { status: 'error', text: `Error de actualización: ${err.message}`, isManual: isManualCheck })
    isManualCheck = false
  })

  autoUpdater.on('download-progress', (progressObj) => {
    win?.webContents.send('update-message', { 
      status: 'downloading', 
      text: `Descargando: ${Math.round(progressObj.percent)}%`,
      percent: progressObj.percent,
      isManual: isManualCheck
    })
  })

  autoUpdater.on('update-downloaded', (info) => {
    win?.webContents.send('update-message', { 
      status: 'ready', 
      text: 'Actualización descargada. Reinicie para aplicar.', 
      info,
      isManual: isManualCheck
    })
    isManualCheck = false
  })

  // Start checking for updates after 5 seconds
  setTimeout(() => {
    isManualCheck = false
    autoUpdater.checkForUpdatesAndNotify().catch(err => {
      console.error('Error starting auto-updater:', err)
    })
  }, 5000)
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(() => {
  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    callback(true)
  })
  session.defaultSession.setPermissionCheckHandler((webContents, permission) => {
    return true
  })
  createWindow()
})

// === Auto-updater manually triggered ===
ipcMain.handle('check-for-updates', async () => {
  if (isDev) return { success: false, message: 'No disponible en modo desarrollo' }
  try {
    isManualCheck = true
    const result = await autoUpdater.checkForUpdatesAndNotify()
    return { success: true, result }
  } catch (err: any) {
    isManualCheck = false
    return { success: false, error: err.message }
  }
})

ipcMain.handle('quit-and-install', () => {
  autoUpdater.quitAndInstall()
  return { success: true }
})

// === Python check ===
ipcMain.handle('check-python', async () => {
  return new Promise((resolve) => {
    exec('python --version', (error, stdout) => {
      if (error) {
        resolve({ available: false, version: null })
      } else {
        resolve({ available: true, version: stdout.trim() })
      }
    })
  })
})

// === Auto-launch settings ===
ipcMain.handle('get-auto-launch', () => {
  const settings = app.getLoginItemSettings()
  return { enabled: settings.openAtLogin }
})

ipcMain.handle('set-auto-launch', (event, enabled: boolean) => {
  app.setLoginItemSettings({ openAtLogin: enabled })
  return { success: true, enabled }
})

// === Execute command ===
ipcMain.handle('execute-command', async (event, command: string) => {
  console.log('Executing command:', command);
  // Set cwd to resources path so launch_app.ps1 can be found
  const cwd = getResourcePath('')
  return new Promise((resolve) => {
    exec(command, { cwd }, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        resolve({ success: false, error: error.message });
        return;
      }
      resolve({ success: true, output: stdout });
    });
  });
});

// === Open URL in default browser (De-elevated to Red Profile) ===
// Due to 14 profiles confusing Windows, we force launch Chrome executable directly.
// Because J.A.R.V.I.S runs elevated, UIPI blocks Chrome from reusing the non-elevated "Profile 4".
// We use a PowerShell script to invoke Shell.Application COM object which communicates with the desktop explorer shell.
// This de-elevates the call back to Medium Integrity (normal user) so Chrome accepts the profile.
ipcMain.handle('open-url', async (event, url: string) => {
  try {
    const chromePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
    
    // We escape single quotes in the URL because the URL will be wrapped in single quotes in PowerShell
    const safeUrl = url.replace(/'/g, "''");
    
    // The PowerShell script to de-elevate the process creation
    const psScript = `
$shell = New-Object -ComObject Shell.Application
$chromeArgs = '--profile-directory="Profile 4" "{0}"' -f '${safeUrl}'
$shell.ShellExecute('${chromePath}', $chromeArgs, '', 'open', 1)
`;

    // We use execFile to safely pass the script block to PowerShell without cmd.exe interfering with special characters
    execFile('powershell.exe', ['-NoProfile', '-WindowStyle', 'Hidden', '-Command', psScript], (error) => {
      if (error) console.error('Error opening URL via PowerShell COM:', error);
    });
    
    return { success: true };
  } catch (error: any) {
    console.error('Error opening URL:', error);
    return { success: false, error: error.message };
  }
});

// === Screen capture ===
ipcMain.handle('capture-screen', async () => {
  const sources = await desktopCapturer.getSources({ types: ['screen'], thumbnailSize: { width: 1920, height: 1080 } });
  if (sources.length > 0) {
    return sources[0].thumbnail.toDataURL().replace(/^data:image\/png;base64,/, '');
  }
  throw new Error("No screen found");
});

// === Edge TTS ===
ipcMain.handle('speak-text', async (event, text: string) => {
  try {
    const tempDir = app.getPath('temp')
    const textPath = path.join(tempDir, 'jarvis_speech.txt');
    const audioPath = path.join(tempDir, 'jarvis_speech.mp3');
    await fs.writeFile(textPath, text, 'utf-8');
    
    return new Promise((resolve, reject) => {
      exec(`python -m edge_tts --file "${textPath}" --voice es-ES-AlvaroNeural --write-media "${audioPath}"`, async (error) => {
        if (error) {
          console.error('Edge TTS error:', error);
          resolve({ success: false, error: error.message });
          return;
        }
        try {
          const audioBuffer = await fs.readFile(audioPath);
          const base64Audio = audioBuffer.toString('base64');
          resolve({ success: true, audioBase64: base64Audio });
        } catch (e: any) {
          resolve({ success: false, error: e.message });
        }
      });
    });
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});

// === Wake Word Process ===
let wakeWordProcess: any = null;

ipcMain.handle('start-wake-word', () => {
  if (wakeWordProcess) return { success: true };
  const scriptPath = getResourcePath('wake_word.py');
  const modelPath = getResourcePath('vosk-model-small-es-0.42');
  
  // Pass model path as argument so Python can find it in production
  wakeWordProcess = spawn('python', ['-u', scriptPath, modelPath]);
  
  wakeWordProcess.stdout.on('data', (data: any) => {
    const lines = data.toString().split('\n');
    for (const line of lines) {
      const output = line.trim();
      if (output.startsWith('WAKE_WORD_AUDIO:')) {
        const filePath = output.replace('WAKE_WORD_AUDIO:', '').trim();
        fs.readFile(filePath).then((buffer: any) => {
          const base64Audio = buffer.toString('base64');
          if (win) win.webContents.send('wake-word-audio', base64Audio);
        }).catch((err: any) => console.error("Error reading audio file:", err));
      } else if (output.startsWith('WAKE_WORD_READY_FOR_COMMAND:')) {
        if (win) win.webContents.send('wake-word-awaiting-command');
      } else if (output.startsWith('FOLLOW_UP_ACTIVE:')) {
        if (win) win.webContents.send('wake-word-follow-up-active');
      } else if (output.startsWith('WAKE_WORD:') || output.startsWith('WAKE_WORD_PARTIAL:')) {
        const command = output.replace(/WAKE_WORD_PARTIAL:|WAKE_WORD:/, '').trim();
        if (win) win.webContents.send('wake-word-detected', command);
      } else if (output.startsWith('DEBUG:')) {
        if (win) win.webContents.send('wake-word-debug', output.replace('DEBUG:', '').trim());
      } else if (output === 'READY') {
        if (win) win.webContents.send('wake-word-ready');
      }
    }
  });

  wakeWordProcess.stderr.on('data', (data: any) => {
    console.error('Wake Word Error:', data.toString());
  });

  return { success: true };
});

ipcMain.handle('stop-wake-word', () => {
  if (wakeWordProcess) {
    wakeWordProcess.kill();
    wakeWordProcess = null;
  }
  return { success: true };
});

ipcMain.handle('wake-word-follow-up', () => {
  if (wakeWordProcess && wakeWordProcess.stdin) {
    wakeWordProcess.stdin.write('FOLLOW_UP\n');
    return { success: true };
  }
  return { success: false };
});
