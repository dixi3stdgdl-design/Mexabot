const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('mexabotNative', {
    isDesktop: true,
    platform: process.platform,
    
    // Window Controls
    minimize: () => ipcRenderer.send('window:minimize'),
    maximize: () => ipcRenderer.send('window:maximize'),
    close: () => ipcRenderer.send('window:close'),
    
    // Engine Invocation
    checkPrerequisites: () => ipcRenderer.invoke('engine:checkPrerequisites'),
    startRealDeployment: (config) => ipcRenderer.invoke('engine:startDeployment', config),
    stopDeployment: () => ipcRenderer.invoke('engine:stopDeployment'),
    
    // Telemetry Listeners
    onLog: (callback) => {
        ipcRenderer.on('engine:log', (event, data) => callback(data));
    },
    onStepUpdate: (callback) => {
        ipcRenderer.on('engine:stepUpdate', (event, data) => callback(data));
    },
    onFinished: (callback) => {
        ipcRenderer.on('engine:finished', (event, data) => callback(data));
    },
    onError: (callback) => {
        ipcRenderer.on('engine:error', (event, data) => callback(data));
    }
});
