const { app, BrowserWindow, ipcMain, ipcRenderer } = require('electron')
const path = require('path')
const ffmpeg = require('fluent-ffmpeg');

let win;
function createWindow() {
    win = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js')
        },
    });
    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()
})

ipcMain.on('video:submit', (event, videoPath) => {
    ffmpeg.ffprobe(videoPath, (err, metadata) => {
        win.webContents.send('video:receive', metadata)
    })
})



app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})