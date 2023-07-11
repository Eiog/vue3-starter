import { join } from 'node:path'
import { BrowserWindow, shell } from 'electron'
import { is } from '@electron-toolkit/utils'

process.env.DIST_ELECTRON = join(__dirname, '..')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, '../public')
  : process.env.DIST

function useWindow(isPackaged = true): BrowserWindow {
  const preload = join(__dirname, '../preload/index.js')
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
      webSecurity: false,
      devTools: !isPackaged,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && url)
    mainWindow.loadURL(url)

  else
    mainWindow.loadFile(indexHtml)

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
