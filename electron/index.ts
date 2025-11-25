// Native
import { join } from 'path';

// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent, nativeTheme, nativeImage } from 'electron';

// 개발 모드 체크 (electron-is-dev 대신 내장 기능 사용)
const isDev = !app.isPackaged;

// 전역 window 변수
let mainWindow: BrowserWindow | null = null;
let zoomLevel = 0;

// 줌 레벨 제한 (zoomFactor = 1 + zoomLevel, 범위: 0.1 ~ 4.0)
const MIN_ZOOM_LEVEL = -0.9;
const MAX_ZOOM_LEVEL = 3.0;

function clampZoomLevel(level: number): number {
  return Math.max(MIN_ZOOM_LEVEL, Math.min(MAX_ZOOM_LEVEL, level));
}

function createWindow() {
  // 아이콘 경로 설정 (개발 모드에서만)
  let icon;
  if (isDev) {
    const appPath = app.getAppPath();
    const iconPath = join(appPath, 'src/assets/icons/Icon.png');
    icon = nativeImage.createFromPath(iconPath);
  }

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    //  change to false to use AppBar
    frame: false,
    show: true,
    resizable: true,
    fullscreenable: true,
    ...(icon && { icon }),
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      webviewTag: true,
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  const port = process.env.PORT || 3000;
  const url = isDev ? `http://localhost:${port}` : join(__dirname, '../dist-vite/index.html');

  // and load the index.html of the app.
  if (isDev) {
    mainWindow?.loadURL(url);
  } else {
    mainWindow?.loadFile(url);
  }
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // 앱 내부에서만 작동하는 줌 단축키 (다른 앱에 영향 없음)
  mainWindow.webContents.on('before-input-event', (event, input) => {
    // Cmd/Ctrl + Plus/= (확대)
    if ((input.control || input.meta) && (input.key === '+' || input.key === '=') && !input.shift) {
      event.preventDefault();
      zoomLevel = clampZoomLevel(zoomLevel + 0.1);
      if (mainWindow) {
        mainWindow.webContents.setZoomFactor(1 + zoomLevel);
        mainWindow.webContents.send('zoom-level-changed', zoomLevel);
      }
    }
    // Cmd/Ctrl + Minus (축소)
    else if ((input.control || input.meta) && input.key === '-' && !input.shift) {
      event.preventDefault();
      zoomLevel = clampZoomLevel(zoomLevel - 0.1);
      if (mainWindow) {
        mainWindow.webContents.setZoomFactor(1 + zoomLevel);
        mainWindow.webContents.send('zoom-level-changed', zoomLevel);
      }
    }
    // Cmd/Ctrl + 0 (리셋)
    else if ((input.control || input.meta) && input.key === '0') {
      event.preventDefault();
      zoomLevel = 0;
      if (mainWindow) {
        mainWindow.webContents.setZoomFactor(1);
        mainWindow.webContents.send('zoom-level-changed', zoomLevel);
      }
    }
  });

  // For AppBar
  ipcMain.on('minimize', () => {
    // eslint-disable-next-line no-unused-expressions
    mainWindow && (mainWindow.isMinimized() ? mainWindow.restore() : mainWindow.minimize());
    // or alternatively: win.isVisible() ? win.hide() : win.show()
  });
  ipcMain.on('maximize', () => {
    // eslint-disable-next-line no-unused-expressions
    mainWindow && (mainWindow.isMaximized() ? mainWindow.restore() : mainWindow.maximize());
  });

  ipcMain.on('close', () => {
    mainWindow?.close();
  });

  // Zoom 컨트롤
  ipcMain.on('zoom-in', () => {
    if (mainWindow) {
      zoomLevel = clampZoomLevel(zoomLevel + 0.1);
      mainWindow.webContents.setZoomFactor(1 + zoomLevel);
      mainWindow.webContents.send('zoom-level-changed', zoomLevel);
    }
  });

  ipcMain.on('zoom-out', () => {
    if (mainWindow) {
      zoomLevel = clampZoomLevel(zoomLevel - 0.1);
      mainWindow.webContents.setZoomFactor(1 + zoomLevel);
      mainWindow.webContents.send('zoom-level-changed', zoomLevel);
    }
  });

  ipcMain.on('zoom-reset', () => {
    if (mainWindow) {
      zoomLevel = 0;
      mainWindow.webContents.setZoomFactor(1);
      mainWindow.webContents.send('zoom-level-changed', zoomLevel);
    }
  });

  // 저장된 zoom 레벨 복원
  ipcMain.on('restore-zoom-level', (_event, savedZoomLevel: number) => {
    if (mainWindow && typeof savedZoomLevel === 'number') {
      zoomLevel = clampZoomLevel(savedZoomLevel);
      mainWindow.webContents.setZoomFactor(1 + zoomLevel);
    }
  });

  nativeTheme.themeSource = 'dark';
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // macOS Dock 아이콘 설정 (개발 모드에서만)
  if (isDev && process.platform === 'darwin') {
    const appPath = app.getAppPath();
    const iconPath = join(appPath, 'src/assets/icons/Icon.png');
    const icon = nativeImage.createFromPath(iconPath);
    if (!icon.isEmpty()) {
      app.dock.setIcon(icon);
    }
  }

  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on('message', (event: IpcMainEvent) => {
  setTimeout(() => event.sender.send('message', 'common.hiElectron'), 500);
});
