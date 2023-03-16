import { app, BrowserWindow } from 'electron'
import path from 'path'

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    skipTaskbar: true,
    transparent: true,
    // fullscreen: true,
    // show: false,
    alwaysOnTop: true,
    frame: false,
    // opacity: 0.5,
    focusable: true,
    acceptFirstMouse: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile(path.join(__dirname, 'index.html'))

  // win.setBackgroundColor('#aaa');
  // win.setFullScreen(true);
  win.setKiosk(true);
  // win.setAlwaysOnTop(true, 'screen');
  win.setIgnoreMouseEvents(true, { forward: true });

  // win.openDevTools();
}

app.whenReady().then(() => {
  createWindow()


  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
