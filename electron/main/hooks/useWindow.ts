import { join } from 'node:path'
import { BrowserWindow, shell } from 'electron'

function useWindow(): BrowserWindow {
  const preload = process.env.PRELOAD_JS
  const url = process.env.VITE_DEV_SERVER_URL
  const indexHtml = join(process.env.DIST, 'index.html')
  const mainWindow = new BrowserWindow({
    width: 1600,
    minWidth: 1200,
    height: 900,
    minHeight: 670,
    show: true,
    autoHideMenuBar: true,
    frame: true,
    ...(process.platform === 'linux'
      ? {
          icon: join(process.env.PUBLIC, 'favicon.ico'),
        }
      : {}),
    webPreferences: {
      preload,
      webSecurity: true,
      devTools: true,
      nodeIntegration: true,
      contextIsolation: true,
    },
  })
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (process.env.VITE_DEV_SERVER_URL) { // electron-vite-vue#298
    mainWindow.loadURL(url)
    // Open devTool if the app is not packaged
    mainWindow.webContents.openDevTools()
  }
  else {
    mainWindow.loadFile(indexHtml)
  }

  // Test actively push message to the Electron-Renderer
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:'))
      shell.openExternal(url)
    return { action: 'deny' }
  })
  return mainWindow
}
export default useWindow
