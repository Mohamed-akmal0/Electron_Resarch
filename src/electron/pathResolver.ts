//! this is used for IPC bus which is a communicator that act as a moderator betweeu UI & electron App

import { app } from "electron";
import path from "path";
import { isDev } from "./utils.js";

export function getPreloadPath() {
  return path.join(
    app.getAppPath(),
    isDev() ? "." : "..",
    `/dist-electron/preload.cjs`
  );
}

export function getUiPath() {
  return path.join(app.getAppPath() + `/dist-react/index.html`);
}
