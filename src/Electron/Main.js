import { app, BrowserWindow, screen, desktopCapturer } from 'electron'
import path from 'path'
var win;
function createWindow() {
  let primaryDisplay = screen.getPrimaryDisplay();
  console.log(screen.getAllDisplays());

  win = new BrowserWindow({
    width: primaryDisplay.size.width,
    height: primaryDisplay.size.width,
    // width: 800,
    // height: 400,
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
  // win.setKiosk(true);
  // win.setTitle('mask')
  // win.setAlwaysOnTop(true, 'screen');
  win.setIgnoreMouseEvents(true, { forward: true });

  //   var monitorWidth = screen.width;
  // var monitorHeight = screen.height;


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
