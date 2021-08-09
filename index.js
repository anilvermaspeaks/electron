const { app, BrowserWindow, ipcMain, Menu } = require('electron')
const path = require('path')
const ffmpeg = require('fluent-ffmpeg');
const isMac = process.platform === 'darwin'
let win;
let addWindow;
function createWindow() {
    win = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js')
        },
    });
    win.loadFile('index.html');
    const mainMenu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(mainMenu)
}

app.whenReady().then(() => {
    createWindow()
    win.on('closed', () => {
        app.quit()
    })
})

ipcMain.on('video:submit', (event, videoPath) => {
    ffmpeg.ffprobe(videoPath, (err, metadata) => {
        win.webContents.send('video:receive', metadata);
    })
})



app.on('window-all-closed', function () {
    if (!isMac) app.quit()
})

function openNewWindow() {
    addWindow = new BrowserWindow({
        width: 400,
        height: 200,
        title: 'Say Hello'
    })
    addWindow.loadFile('hello.html');
    addWindow.on('closed', () => {
        addWindow = null
    })
}

const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Say Hello',
                accelerator: isMac ? 'Command+H' : 'Ctrl+H',
                click() {
                    openNewWindow()
                }
            },
            {
                label: 'Quit',
                accelerator: isMac ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit()
                }
            }
        ]
    }
]

if (isMac) {
    menuTemplate.unshift({})
}

if (process.env.NODE_ENV !== 'production') {
    menuTemplate.push({
        label: 'Dev Tool',
        submenu: [{
            label: 'Toggle Developer Tool',
            accelerator: isMac ? 'Command+I' : 'Ctrl+I',
            click(item, focusedWindow) {
                focusedWindow.toggleDevTools();

            }
        }]
    })

}