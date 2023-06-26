import { release } from 'node:os'
import { BrowserWindow, app } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import useWindow from './useWindow'

async function useApp() {
  // Disable GPU Acceleration for Windows 7
  if (release().startsWith('6.1'))
    app.disableHardwareAcceleration()

  // Set application name for Windows 10+ notifications
  if (process.platform === 'win32')
    app.setAppUserModelId(app.getName())

  if (!app.requestSingleInstanceLock()) {
    app.quit()
    process.exit(0)
  }
  await app.whenReady()
  electronApp.setAppUserModelId(app.getName())
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  let mainWindow: BrowserWindow | null = null
  mainWindow = useWindow(app.isPackaged)
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0)
      useWindow(app.isPackaged)
  })
  app.on('window-all-closed', () => {
    mainWindow = null
    if (process.platform !== 'darwin')
      app.quit()
  })
  return { app, mainWindow }
}
export default useApp
