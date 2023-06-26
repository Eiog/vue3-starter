import { join } from 'node:path'
import type { App, BrowserWindow } from 'electron'
import { Menu, Tray, ipcMain } from 'electron'

function useTray(app: App, mainWindow: BrowserWindow) {
  const trayMenu = [
    {
      label: '显示',
      click: () => {
        mainWindow.show()
      },
    },
    {
      label: '退出',
      click: () => {
        app.quit()
      },
    },
  ]
  const iconPath = join(process.env.PUBLIC, 'favicon.ico')
  const appTray = new Tray(iconPath)
  const contextMenu = Menu.buildFromTemplate(trayMenu)
  appTray.setToolTip('u-music')
  ipcMain.on('tray-tooltip-update', (event, val) => {
    appTray.setToolTip(val)
  })
  appTray.setContextMenu(contextMenu)
  appTray.on('click', () => {
    mainWindow.show()
  })
  return appTray
}
export default useTray
