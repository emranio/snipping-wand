// This is main process of Electron, started as first thing when your
// app starts. It runs through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import { promises as fs } from "fs";
import path from "path";
import url from "url";
import { systemPreferences, app, Menu, ipcRenderer, ipcMain, shell, globalShortcut, desktopCapturer, screen } from "electron";

import appMenuTemplate from "./menu/app_menu_template";
import editMenuTemplate from "./menu/edit_menu_template";
import devMenuTemplate from "./menu/dev_menu_template";
import createWindow from "./helpers/window";

// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from "env";

// Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.
if (env.name !== "production") {
  const userDataPath = app.getPath("userData");
  app.setPath("userData", `${userDataPath} (${env.name})`);
}

const takeshot = async (display_id) => {
  var content = null;
  const sources = await desktopCapturer.getSources({
    types: ['screen'], thumbnailSize: {
      height: 768,
      width: 1366
    }
  });

  for await (let source of sources) {
    if (+source.display_id !== display_id) {
      continue;
    }
    content = source.thumbnail.toDataURL();
    break;
    // console.log(source);

    // await fs.writeFile(`app/screenshot.png`, content, 'binary');
  }
  return content;
}

const setApplicationMenu = () => {
  const menus = [appMenuTemplate, editMenuTemplate];
  if (env.name !== "production") {
    menus.push(devMenuTemplate);
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

// We can communicate with our window (the renderer process) via messages.
const initIpc = () => {
  ipcMain.on("need-app-path", (event, arg) => {
    event.reply("app-path", app.getAppPath());
  });
  ipcMain.on("open-external-link", (event, href) => {
    shell.openExternal(href);
  });


  ipcMain.handle('test-action', async (event, arg) => {
    let getScreenShotUrl = await triggerScreenshot();
    event.sender.send(getScreenShotUrl);
  });

};

const triggerScreenshot = async () => {
  fullscreenShortcuts();

  let point = screen.getCursorScreenPoint();
  let display = screen.getDisplayNearestPoint(point);

  const content = await takeshot(display.id);
  // console.log({event, arg});
  // mainWindow.setBackgroundColor('#aaa');
  console.log(editorWindow.isFullScreen());
  editorWindow.show();
  editorWindow.setFullScreen(true);
  editorWindow.setKiosk(true);

  return content;
}

const fullscreenShortcuts = () => {
  globalShortcut.register('Escape', function () {
    console.log('Escape is pressed');
    // editorWindow.setFullScreen(false);
    // editorWindow.setKiosk(false);
    editorWindow.close();
    globalShortcut.unregister('Escape');
  });
}

const backgroundShortcuts = () => {
  globalShortcut.register('Alt+Control+Space', async () => {
    console.log('Alt+CommandOrControl+I is pressed');
    if(global.editorWindow ){
      global.editorWindow.close();
    }


    const editorWindow = createWindow("main", {
      width: 1000,
      height: 600,
      webPreferences: {
        // Two properties below are here for demo purposes, and are
        // security hazard. Make sure you know what you're doing
        // in your production app.
        nodeIntegration: true,
        contextIsolation: false,
        transparent: true,
        // Spectron needs access to remote module
        enableRemoteModule: env.name === "test"
      }
    });

    editorWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, "editor.html"),
        protocol: "file:",
        slashes: true
      })
    );




    global.editorWindow = editorWindow;

    let getScreenShotUrl = await triggerScreenshot();
    // event.reply('communicate-test', getScreenShotUrl);


    if (env.name === "development") {
      editorWindow.openDevTools();
    }  
    editorWindow.webContents.send('sync', getScreenShotUrl);

  });
}

app.on("ready", async () => {
  setApplicationMenu();
  initIpc();

  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
    webPreferences: {
      // Two properties below are here for demo purposes, and are
      // security hazard. Make sure you know what you're doing
      // in your production app.
      nodeIntegration: true,
      contextIsolation: false,
      // Spectron needs access to remote module
      enableRemoteModule: env.name === "test"
    }
  });

  mainWindow.hide();

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "app.html"),
      protocol: "file:",
      slashes: true
    })
  );

  if (env.name === "development") {
    mainWindow.openDevTools();
  }

  backgroundShortcuts();
  global.mainWindow = mainWindow;

  // true
});

app.on("window-all-closed", () => {
  app.quit();
});

app.on('will-quit', function () {
  globalShortcut.unregisterAll();
});
