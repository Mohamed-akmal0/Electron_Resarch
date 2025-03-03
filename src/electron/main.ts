import { app, BrowserWindow, Tray } from "electron";
import path from "path";
import { ipcMainHandle, isDev } from "./utils.js";
import { getStaticData, pollResources } from "./resourceManager.js";
import { getAssetPath, getPreloadPath, getUiPath } from "./pathResolver.js";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
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

  //! implementing tab bar or tray bar in mac button 
  new Tray(
    path.join(
      getAssetPath(),
      process.platform === "darwin" ? "trayIconTemplate.png" : "trayIcon.png"
    )
  );
});
