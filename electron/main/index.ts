import { join } from 'node:path'
import { useApp, useAutoUpdater, useIpcMain, useStore, useTray, useVueDevTools } from './hooks'

process.env.DIST_ELECTRON = join(__dirname, '..')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, '../public')
  : process.env.DIST

async function init() {
  const { app, mainWindow } = await useApp()
  const tray = useTray(app, mainWindow)
  useVueDevTools(app, mainWindow)
  useIpcMain(app, mainWindow, tray)
  useStore()
  useAutoUpdater(app)
}
init()
