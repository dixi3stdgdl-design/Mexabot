const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const engine = require('./desktop-engine');

let mainWindow = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 1024,
        minHeight: 700,
        frame: false, // Frameless Cyber HUD Window
        backgroundColor: '#030712',
        title: 'MEXABOT Desktop OS — Command Deck',
        webPreferences: {
            preload: path.join(__dirname, 'desktop-preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: false
        }
    });

    mainWindow.loadFile('index.html');

    // Manejo de eventos de ventana
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// Inicialización de la aplicación
app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// IPC Handlers de Control de Ventana
ipcMain.on('window:minimize', () => {
    if (mainWindow) mainWindow.minimize();
});

ipcMain.on('window:maximize', () => {
    if (mainWindow) {
        if (mainWindow.isMaximized()) {
            mainWindow.unmaximize();
        } else {
            mainWindow.maximize();
        }
    }
});

ipcMain.on('window:close', () => {
    if (mainWindow) mainWindow.close();
});

// IPC Handlers del Motor Nativo
ipcMain.handle('engine:checkPrerequisites', async () => {
    return await engine.checkPrerequisites();
});

ipcMain.handle('engine:startDeployment', async (event, config) => {
    const onLog = (logData) => {
        if (mainWindow && !mainWindow.isDestroyed()) {
            mainWindow.webContents.send('engine:log', logData);
        }
    };

    const onStep = (stepData) => {
        if (mainWindow && !mainWindow.isDestroyed()) {
            mainWindow.webContents.send('engine:stepUpdate', stepData);
        }
    };

    const onFinished = (result) => {
        if (mainWindow && !mainWindow.isDestroyed()) {
            mainWindow.webContents.send('engine:finished', result);
        }
    };

    const onError = (errMsg) => {
        if (mainWindow && !mainWindow.isDestroyed()) {
            mainWindow.webContents.send('engine:error', errMsg);
        }
    };

    return await engine.startDeployment(config, onLog, onStep, onFinished, onError);
});

ipcMain.handle('engine:stopDeployment', () => {
    engine.stopDeployment();
    return true;
});
