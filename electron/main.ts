import { app, BrowserWindow, ipcMain, desktopCapturer, shell } from 'electron'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { exec, spawn } from 'node:child_process'
import { session } from 'electron'
import fs from 'node:fs/promises'
import { readFileSync } from 'node:fs'
import { autoUpdater } from 'electron-updater'
import puppeteer from 'puppeteer'

const _dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url))

// Prevent Chromium from freezing background window scripts and animations
app.commandLine.appendSwitch('disable-renderer-backgrounding');
app.commandLine.appendSwitch('disable-background-timer-throttling');

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
let widgetWin: BrowserWindow | null = null
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
ipcMain.on('enable-widget-mode', () => {
  if (win) {
    win.minimize();
  }
  if (!widgetWin) {
    const { screen } = require('electron');
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;
    
    widgetWin = new BrowserWindow({
      width: 250,
      height: 250,
      x: width - 270,
      y: height - 270,
      frame: false,
      transparent: true,
      alwaysOnTop: true,
      skipTaskbar: true,
      resizable: false, // We no longer need resize/maximize hacks
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      }
    });

    if (VITE_DEV_SERVER_URL) {
      widgetWin.loadURL(VITE_DEV_SERVER_URL + '?widget=true');
    } else {
      widgetWin.loadURL(`file://${path.join(RENDERER_DIST, 'index.html')}?widget=true`);
    }

    widgetWin.on('closed', () => {
      widgetWin = null;
      if (win) {
        win.restore();
        win.focus();
      }
    });
  }
});

ipcMain.on('disable-widget-mode', () => {
  if (widgetWin) {
    widgetWin.close(); // closing it restores main window via 'closed' event
  }
});

ipcMain.on('sync-widget-state', (event, state) => {
  if (widgetWin && !widgetWin.isDestroyed()) {
    widgetWin.webContents.send('sync-widget-state', state);
  }
});

ipcMain.on('window-move', (event, { x, y }) => {
  if (widgetWin && !widgetWin.isDestroyed()) {
    widgetWin.setPosition(x, y);
  }
});

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

// === Open URL in default browser (Clean Environment to Red Profile) ===
// Due to 14 profiles confusing Windows, we force launch Chrome executable directly.
// Electron passes Chromium environment variables (like CHROME_CRASHPAD_PIPE_NAME) to child processes.
// When Chrome inherits these, it thinks it's an Electron sub-process, ignores the profile, and opens a Gray profile.
// We clean the environment variables to make Chrome launch perfectly pure.
ipcMain.handle('open-url', async (event, url: string) => {
  try {
    const chromePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
    const safeUrl = url.replace(/"/g, ''); // Prevents command injection
    const commandLine = `start "" "${chromePath}" --profile-directory="Profile 4" "${safeUrl}"`;

    // Strip Electron/Chrome-specific environment variables that confuse native Chrome
    const cleanEnv = { ...process.env };
    for (const key in cleanEnv) {
      if (key.toUpperCase().startsWith('ELECTRON_') || 
          key.toUpperCase().startsWith('CHROME_') || 
          key.toUpperCase().startsWith('GOOGLE_') ||
          key.toUpperCase().startsWith('NODE_')) {
        delete cleanEnv[key];
      }
    }

    exec(commandLine, { env: cleanEnv }, (error) => {
      if (error) console.error('Error opening URL via exec with clean env:', error);
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

// === Screen Overlay ===
let overlayWindow: BrowserWindow | null = null;

ipcMain.handle('start-screen-overlay', () => {
  if (overlayWindow) return { success: true };
  
  const { screen } = require('electron');
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  overlayWindow = new BrowserWindow({
    width,
    height,
    x: 0,
    y: 0,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    hasShadow: false,
    focusable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  overlayWindow.setIgnoreMouseEvents(true);
  
  // Load the overlay HTML
  if (VITE_DEV_SERVER_URL) {
    overlayWindow.loadURL(`${VITE_DEV_SERVER_URL}overlay.html`);
  } else {
    overlayWindow.loadFile(path.join(RENDERER_DIST, 'overlay.html'));
  }

  // Maximize the window to cover everything including taskbar in some OSs if needed,
  // but workArea is safer. Alternatively set bounds manually.
  overlayWindow.setBounds({ x: 0, y: 0, width: screen.getPrimaryDisplay().bounds.width, height: screen.getPrimaryDisplay().bounds.height });

  overlayWindow.on('closed', () => {
    overlayWindow = null;
  });
  
  return { success: true };
});

ipcMain.handle('stop-screen-overlay', () => {
  if (overlayWindow) {
    overlayWindow.close();
    overlayWindow = null;
  }
  return { success: true };
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

// === Puppeteer Web Browsing ===
ipcMain.handle('search-web', async (event, query: string) => {
  let browser = null;
  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(`https://duckduckgo.com/html/?q=${encodeURIComponent(query)}`);
    
    const results = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('.result__snippet'));
      return links.slice(0, 5).map(el => {
        const titleEl = el.parentElement?.querySelector('.result__title .result__a') as HTMLAnchorElement;
        const linkEl = el.parentElement?.querySelector('.result__url') as HTMLAnchorElement;
        return {
          title: titleEl?.innerText || '',
          url: linkEl?.href || titleEl?.href || '',
          snippet: (el as HTMLElement).innerText || ''
        };
      });
    });
    
    await browser.close();
    return { success: true, results };
  } catch (error: any) {
    if (browser) await browser.close();
    return { success: false, error: error.message };
  }
});

ipcMain.handle('fetch-url', async (event, url: string) => {
  let browser = null;
  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Extraer texto limpio de toda la página
    const text = await page.evaluate(() => {
      // Remove scripts, styles, navs, headers, footers to get clean text
      const elementsToRemove = document.querySelectorAll('script, style, nav, header, footer, iframe, img, svg');
      elementsToRemove.forEach(el => el.remove());
      return document.body.innerText;
    });
    
    await browser.close();
    return { success: true, text: text.substring(0, 50000) }; // Limit size
  } catch (error: any) {
    if (browser) await browser.close();
    return { success: false, error: error.message };
  }
});

