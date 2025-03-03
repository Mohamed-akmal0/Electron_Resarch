import { app, BrowserWindow, Menu, Tray } from "electron";
import path from "path";
import { getAssetPath } from "./pathResolver.js";

export function createTray(mainWindow: BrowserWindow){
  //! implementing tab bar or tray bar in mac button
  const tray = new Tray(
    path.join(
      getAssetPath(),
      process.platform === "darwin" ? "trayIconTemplate.png" : "trayIcon.png"
    )
  );

  //! this is for listing the menu when we click tray icon
  tray.setContextMenu(Menu.buildFromTemplate([
    {
        label: "Show",
        click: () => {
            mainWindow.show();
            if(app.dock){
                app.dock.show
            }
        },
        type:"normal"
    },
    {
        label: "Quit",
        click: () => app.quit()
    }
  ]))
}