import { Menu, ipcMain, app, desktopCapturer, BrowserWindow } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
let studio;
let floatingWebCam;
const defaultWindowConfig = {
  frame: false,
  transparent: true,
  alwaysOnTop: true,
  hasShadow: false,
  resizable: false,
  skipTaskbar: true,
  icon: path.join(process.env.VITE_PUBLIC, "SnippetVid Logo.svg"),
  webPreferences: {
    preload: path.join(__dirname, "preload.mjs")
  }
};
function loadWindowContent(window, pageName) {
  if (VITE_DEV_SERVER_URL) {
    const devUrl = pageName === "index" ? VITE_DEV_SERVER_URL : `${"http://localhost:5173"}/${pageName}.html`;
    window.loadURL(devUrl);
  } else {
    window.loadFile(path.join(RENDERER_DIST, `${pageName}.html`));
  }
}
function createWindow() {
  win = new BrowserWindow({
    ...defaultWindowConfig,
    width: 450,
    height: 450
  });
  studio = new BrowserWindow({
    ...defaultWindowConfig,
    width: 200,
    height: 75
  });
  floatingWebCam = new BrowserWindow({
    ...defaultWindowConfig,
    width: 150,
    height: 150
  });
  loadWindowContent(win, "index");
  loadWindowContent(studio, "studio");
  loadWindowContent(floatingWebCam, "webcam");
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  studio.webContents.on("did-finish-load", () => {
    studio == null ? void 0 : studio.webContents.send(
      "main-process-message",
      (/* @__PURE__ */ new Date()).toLocaleString()
    );
  });
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
    types: ["window", "screen"]
  });
  console.log("🔴 DISPLAYS", data);
  return data;
});
ipcMain.on("media-sources", (_event, payload) => {
  console.log("MEDIA SOURCES RECEIVED BY MAIN");
  studio == null ? void 0 : studio.webContents.send("profile-received", payload);
});
ipcMain.on("cam-selected", (_event, camera) => {
  floatingWebCam == null ? void 0 : floatingWebCam.webContents.send("cam-selected", camera);
});
ipcMain.on("hide-plugin", (_event, payload) => {
  win == null ? void 0 : win.webContents.send("hide-plugin", payload);
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
  setInterval(ensureWindowsOnTop, 1e3);
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
