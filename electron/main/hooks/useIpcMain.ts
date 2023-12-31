import { join } from 'node:path'
import type { App, Tray } from 'electron'
import { BrowserWindow, Notification, dialog, ipcMain } from 'electron'

function windowIpc(mainWindow: BrowserWindow) {
  ipcMain.on('window-hide', () => {
    mainWindow.hide()
  })
  ipcMain.on('window-screen-min', () => {
    mainWindow.minimize()
  })
  ipcMain.on('window-screen-full', () => {
    mainWindow.setFullScreen(true)
  })
  ipcMain.on('window-screen-exitfull', () => {
    mainWindow.setFullScreen(true)
  })
  ipcMain.on('window-screen-toggle', () => {
    mainWindow.setFullScreen(!mainWindow.fullScreen)
  })
  // New window example arg: new windows url
}
function appIpc(app: App) {
  ipcMain.on('app-quit', () => {
    app.quit()
  })
}
function trayIpc(tray: Tray) {}

function useIpcMain(app: App, mainWindow: BrowserWindow, tray: Tray) {
  windowIpc(mainWindow)
  appIpc(app)
  trayIpc(tray)
  ipcMain.handle('show-open-dialog', async (_, arg) => {
    const result = await dialog.showOpenDialog(mainWindow, arg)
    return result
  })
  ipcMain.handle('show-save-dialog', async (_, arg) => {
    const result = await dialog.showSaveDialog(mainWindow, arg)
    return result
  })
  ipcMain.handle('show-message-dialog', async (_, arg) => {
    const result = await dialog.showMessageBox(mainWindow, arg)
    return result
  })
  ipcMain.handle('open-new-window', (_, arg?: { path?: string;width?: number;height?: number }) => {
    return new Promise((resolve, reject) => {
      const preload = join(process.env.DIST_ELECTRON, './preload/index.js')
      const url = process.env.VITE_DEV_SERVER_URL
      const indexHtml = join(process.env.DIST, 'index.html')

      const childWindow = new BrowserWindow({
        width: arg?.width ?? 800,
        height: arg?.height ?? 600,
        webPreferences: {
          preload,
          webSecurity: true,
          devTools: !app.isPackaged,
          nodeIntegration: true,
          contextIsolation: true,
        },
      })
      if (process.env.VITE_DEV_SERVER_URL)
        childWindow.loadURL(`${url}${arg?.path ?? ''}`).then(() => resolve(arg)).catch(reject)
      else
        childWindow.loadFile(indexHtml, { hash: arg?.path ?? '' }).then(() => resolve(arg)).catch(reject)
    })
  })
  ipcMain.handle('show-notification', (_, arg) => {
    const notification = new Notification(arg)
    notification.show()
  })
}
export default useIpcMain
