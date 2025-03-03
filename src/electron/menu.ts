import { app, BrowserWindow, Menu } from "electron";
import { ipcWebContentsSend, isDev } from "./utils.js";

//! creating menu list in mac that we see on the left top of the window
export function createMenu(mainWindow: BrowserWindow) {
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      {
        //! in mac, it will automatically show the the app name as the first menu option
        //! for handling that in a best way, adding condtion like this
        label: process.platform === "darwin" ? undefined : "App",
        type: "submenu",
        submenu: [
          {
            label: "Quit",
            click: app.quit,
          },
          {
            label: "DevTools",
            click: () => mainWindow.webContents.openDevTools(),
            //! this is for showing the dev tools only for the dev build not for production
            visible: isDev(),
          },
        ],
      },
      {
        label: "View",
        type: "submenu",
        submenu: [
          {
            label: "Cpu",
            click: () =>
              ipcWebContentsSend("changeView", mainWindow.webContents, "Cpu"),
          },
          {
            label: "Ram",
            click: () =>
              ipcWebContentsSend("changeView", mainWindow.webContents, "Ram"),
          },
          {
            label: "Storage",
            click: () =>
              ipcWebContentsSend(
                "changeView",
                mainWindow.webContents,
                "Storage"
              ),
          },
        ],
      },
    ])
  );
}
