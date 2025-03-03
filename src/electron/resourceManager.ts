//! in this file  we are getting the system ram and cpu usuage information
//! every time we make changes in electron we have to kill the terminal and re run the app

import osUtils from "os-utils";
import fs from "fs";
import os from "os";
import { BrowserWindow } from "electron";
import { ipcWebContentsSend } from "./utils.js";

const POLLING_INTERNVAL = 500;

//? here were are fetching the ram and cpu usage in every single second
//! why we do this?
export function pollResources(mainWindow: BrowserWindow) {
  setInterval(async () => {
    const usuage = await getCpuUsage();
    const ramUsage = getRamUsage();
    const storageData = getStorageData();
    //* sending event to the frontend... we have to catch this event in preload.cts
    //* becuase it is the moderator between electron app and UI
    ipcWebContentsSend("statistics", mainWindow.webContents, {
      usuage,
      ramUsage,
      storageData: storageData.usage,
    });
  }, POLLING_INTERNVAL);
}

export function getStaticData() {
  const totalStorageData = getStorageData().total;
  const cpuModal = os.cpus()[0].model;
  const totalMemoryGB = Math.floor(osUtils.totalmem() / 1024);
  return {
    totalStorageData,
    cpuModal,
    totalMemoryGB,
  };
}

function getCpuUsage(): Promise<number> {
  return new Promise((resolve) => {
    osUtils.cpuUsage(resolve);
  });
}

function getRamUsage() {
  //! here were are getting the used ram value eg 1 - 3 = 2 [2 is the used ram  value]
  return 1 - osUtils.freememPercentage();
}

function getStorageData() {
  const stats = fs.statfsSync(process.platform === "win32" ? `C://` : `/`);
  const total = stats.bsize * stats.blocks;
  const free = stats.bsize * stats.bfree;

  return {
    //! deviding by 1000 gets kilobytes
    //! deviding by 100000 gets megabyts
    //! deviding by 1000000000 gets gigabytes
    total: Math.floor(total / 1_000_000_000),
    usage: 1 - free / total,
  };
}
