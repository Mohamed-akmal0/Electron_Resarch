import { app, BrowserWindow, Tray } from "electron";
import path from "path";
import { ipcMainHandle, ipcMainOn, isDev } from "./utils.js";
import { getStaticData, pollResources } from "./resourceManager.js";
import { getAssetPath, getPreloadPath, getUiPath } from "./pathResolver.js";
import { createTray } from "./tray.js";
import { createMenu } from "./menu.js";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
    //? removing default app frame
    frame: false
  });
  if (isDev()) {
    mainWindow.loadURL("http://localhost:5555");
  } else {
    //! getPath: to get the actual path where our project is located in user systme
    //! path.join: in mac os we use (/) but in windows its use (\).. to avoid the mismatch we use this path.join
    mainWindow.loadFile(getUiPath());
  }

  pollResources(mainWindow);

  ipcMainHandle("getStaticData", () => {
    return getStaticData();
  });

  ipcMainOn("sendFrameAction", (payload) => {
    switch (payload) {
      case "CLOSE":
        mainWindow.close();
        break;
      case "MAXIMIZE":
        mainWindow.maximize();
        break;

      case "MINIMIZE":
        mainWindow.minimize();
        break;
    }
  });

  createTray(mainWindow);
  createMenu(mainWindow);
  handleCloseWindow(mainWindow);
});

function handleCloseWindow(mainWindow: BrowserWindow) {
  let willClose = false;
  mainWindow.on("close", (e) => {
    if (willClose) {
      return;
    }

    e.preventDefault();
    //! this will do the job completely in windows and linux but in mac it will not hide dock icon
    mainWindow.hide();
    //! for hiding dock icon, adding condition to prevent the null pointer
    if (app.dock) {
      app.dock.hide();
    }
  });

  app.on("before-quit", () => {
    willClose = true;
  });

  mainWindow.on("show", () => {
    willClose = false;
  });
}
