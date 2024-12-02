import { app, BrowserWindow, desktopCapturer, ipcMain, Menu } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, "..");

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let win: BrowserWindow | null;
let studio: BrowserWindow | null;
let floatingWebCam: BrowserWindow | null;

// Extract common window configuration
const defaultWindowConfig = {
  frame: false,
  transparent: true,
  alwaysOnTop: true,
  hasShadow: false,
  resizable: false,
  skipTaskbar: true,
  icon: path.join(process.env.VITE_PUBLIC, "SnippetVid Logo.svg"),
  webPreferences: {
    preload: path.join(__dirname, "preload.mjs"),
  },
};

function loadWindowContent(window: BrowserWindow, pageName: string) {
  if (VITE_DEV_SERVER_URL) {
    const devUrl =
      pageName === "index"
        ? VITE_DEV_SERVER_URL
        : `${import.meta.env.VITE_APP_URL}/${pageName}.html`;
    window.loadURL(devUrl);
  } else {
    window.loadFile(path.join(RENDERER_DIST, `${pageName}.html`));
  }
}

function createWindow() {
  win = new BrowserWindow({
    ...defaultWindowConfig,
    width: 450,
    height: 450,
  });

  studio = new BrowserWindow({
    ...defaultWindowConfig,
    width: 200,
    height: 75,
  });

  floatingWebCam = new BrowserWindow({
    ...defaultWindowConfig,
    width: 150,
    height: 150,
  });

  loadWindowContent(win, "index");
  loadWindowContent(studio, "studio");
  loadWindowContent(floatingWebCam, "webcam");

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  studio.webContents.on("did-finish-load", () => {
    studio?.webContents.send(
      "main-process-message",
      new Date().toLocaleString()
    );
  });

  // floatingWebCam?.webContents.openDevTools();
  // win?.webContents.openDevTools();
  // studio.webContents.openDevTools();
}

Menu.setApplicationMenu(null);

ipcMain.on("closeApp", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle("getSources", async () => {
  const data = await desktopCapturer.getSources({
    thumbnailSize: { height: 100, width: 150 },
    fetchWindowIcons: true,
    types: ["window", "screen"],
  });

  return data;
});

ipcMain.on("media-sources", (_event, payload) => {
  studio?.webContents.send("profile-received", payload);
});

ipcMain.on("cam-selected", (_event, camera) => {
  floatingWebCam?.webContents.send("cam-selected", camera);
});

// ipcMain.on("resize-studio", (_event, payload) => {
//   if (payload.shrink) {
//     studio?.setSize(400, 400);
//   }

//   if (!payload.shrink) {
//     studio?.setSize(400, 250);
//   }
// });

ipcMain.on("hide-plugin", (_event, payload) => {
  win?.webContents.send("hide-plugin", payload);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

function ensureWindowsOnTop() {
  [win, studio, floatingWebCam].forEach((window) => {
    if (window && !window.isDestroyed()) {
      window.setAlwaysOnTop(true, "floating");
    }
  });
}

app.whenReady().then(() => {
  createWindow();
  setInterval(ensureWindowsOnTop, 1000);

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
