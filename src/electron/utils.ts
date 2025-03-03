import { ipcMain, WebContents, WebFrameMain } from "electron";
import { getUiPath } from "./pathResolver.js";
import { pathToFileURL } from "url";

export function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}

//? created wrapper for ipc.hanlde function , so that we can call this wrapper function
//? whenever we need to create an ipc handle function
export function ipcMainHandle<Key extends keyof EventPayloadMapping>(
  key: Key,
  handler: () => EventPayloadMapping[Key]
) {
  ipcMain.handle(key, (event) => {
    validateEventFrame(event.senderFrame);
    return handler();
  });
}

//? created wrapper for send function , so that we can call this wrapper function
//? whenever we need to create an webcontent send function
export function ipcWebContentsSend<Key extends keyof EventPayloadMapping>(
  key: Key,
  webContents: WebContents,
  payload: EventPayloadMapping[Key]
) {
  webContents.send(key, payload);
}

//! in electron dev we are accessing things from out react vite server
//! but in production we are accessing things from the file that located in the user system in specific path
//! so while developing the app or accessing things we have to check the path in different scenerios like dev and produciton
//! so we are validating the frame before sending an event
export function validateEventFrame(frame: WebFrameMain) {
  if (isDev() && new URL(frame.url).host === "localhost:5555") {
    return;
  }
  if (frame.url !== pathToFileURL(getUiPath()).toString()) {
    throw new Error("Malicious event");
  }
}
