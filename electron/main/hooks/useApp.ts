import { release } from 'node:os'
import { BrowserWindow, app } from 'electron'
import { optimizer } from '@electron-toolkit/utils'
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

  let mainWindow: BrowserWindow | null = null
  mainWindow = useWindow()

  app.on('window-all-closed', () => {
    mainWindow = null
    if (process.platform !== 'darwin')
      app.quit()
  })
  app.on('second-instance', () => {
    if (mainWindow) {
      // Focus on the main window if the user tried to open another
      if (mainWindow.isMinimized())
        mainWindow.restore()
      mainWindow.focus()
    }
  })
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0)
      useWindow()
  })
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  return { app, mainWindow }
}
export default useApp
