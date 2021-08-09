const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronApi', {
    ipcRenderer
})

console.log(ipcRenderer)