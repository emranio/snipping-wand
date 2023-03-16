import { app, BrowserWindow, screen, desktopCapturer } from 'electron'
import path from 'path'
var win;

app.commandLine.appendSwitch('disable-features', 'IOSurfaceCapturer,DesktopCaptureMacV2')

function createWindow() {
  let primaryDisplay = screen.getPrimaryDisplay();
  console.log(screen.getAllDisplays());

  win = new BrowserWindow({
    width: primaryDisplay.size.width,
    height: primaryDisplay.size.width,
    // width: 200,
    // height:200,
    skipTaskbar: true,
    // transparent: true,
    // fullscreen: true,
    // show: false,
    // contentProtection: true,
    alwaysOnTop: true,
    frame: false,
    // opacity: 0.5,
    focusable: false,
    acceptFirstMouse: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile(path.join(__dirname, 'index.html'))
  // Tricky way to bring cam bubble to top over fullscreen windows on mac
  win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  win.setAlwaysOnTop(true, "floating");
  win.setFullScreenable(false);
  // Below statement completes the flow
  win.moveTop();

  // win.setBackgroundColor('#aaa');
  // win.setFullScreen(true);
  // win.setKiosk(true);
  win.setIgnoreMouseEvents(true, { forward: false });
  win.setContentProtection(true);

  // var monitorWidth = screen.width;
  // var monitorHeight = screen.height;


  // win.openDevTools();

  desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {
    for (const source of sources) {
      console.log(source)
      if (source.name === 'Entire screen') {
        win.webContents.send('SET_SOURCE', source.id)
        return
      }
    }
  })

  win.show(true);
}

app.whenReady().then(() => {
  createWindow()

  // setTimeout(() => {
  //   desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {
  //     for (const source of sources) {
  //       console.log(source)
  //       if (source.name === 'Entire screen') {
  //         win.webContents.send('SET_SOURCE', source.id)
  //         return
  //       }
  //     }
  //   })  
  // }, 2000)

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
