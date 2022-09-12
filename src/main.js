// This is main process of Electron, started as first thing when your
// app starts. It runs through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import { promises as fs } from "fs";
import path from "path";
import url from "url";
import { systemPreferences, app, Menu, ipcRenderer, ipcMain, shell, globalShortcut, desktopCapturer, screen } from "electron";

import appMenuTemplate from "./main_app/common_menu/app_menu_template";
import editMenuTemplate from "./main_app/common_menu/edit_menu_template";
import devMenuTemplate from "./main_app/common_menu/dev_menu_template";
import createWindow from "./main_app/helpers/window";

import initMainWindow from "./main_app/main_window";

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

const setCommonApplicationMenu = () => {
  const menus = [appMenuTemplate, editMenuTemplate];
  if (env.name !== "production") {
    menus.push(devMenuTemplate);
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

app.on("ready", async () => {
  setCommonApplicationMenu();
  initMainWindow();
});

app.on("window-all-closed", () => {
  app.quit();
});

app.on('will-quit', function () {
  globalShortcut.unregisterAll();
});
