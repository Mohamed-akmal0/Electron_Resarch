const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  //! inovke is an asyn function and it will expect a response from the backend
  getStaticData: () => ipcInvoke("getStaticData"),
  subscirbeStatistics: (callback) => 
    //here we are actually sending the data to the IPC bus 
    ipcOn("statistics", (stats) => {
      callback(stats);
    }),
    subscribeChangeView: (callback) => {
      //here we are actually sending the data to the IPC bus 
      return ipcOn("changeView", (stats) => {
        callback(stats);
      });
  },
  sendFrameAction: (payload) => ipcSend("sendFrameAction", payload)
  //! basically satisfies keyword is used for typescript proper functionality
  //! here this keyword says we are expecting these types by giving the type like "electron" in Winodw interface
  //! if we are not getting this please throw an error
} satisfies Window["electron"]);

//! reason for defining this in this preload file because we can't import things from utils file because of the .cts and ts
//! likewise we can't import things from preload file to utils files because of th extension
function ipcInvoke<Key extends keyof EventPayloadMapping>(
  key: Key
): Promise<EventPayloadMapping[Key]> {
  return electron.ipcRenderer.invoke(key);
}
  
  function ipcOn<Key extends keyof EventPayloadMapping>(
    key: Key,
    callback: (payload: EventPayloadMapping[Key]) => void
  ) {
    const cb = (_: Electron.IpcRendererEvent, payload: any) => callback(payload);
    electron.ipcRenderer.on(key, cb);
    return () => electron.ipcRenderer.off(key, cb);
  }
  
  function ipcSend<Key extends keyof EventPayloadMapping>(
    key: Key,
    payload: EventPayloadMapping[Key]
  ) {
    electron.ipcRenderer.send(key, payload);
  }
