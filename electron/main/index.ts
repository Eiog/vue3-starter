import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { useApp, useAutoUpdater, useIpcMain, useStore, useTray, useVueDevTools } from './hooks'

process.env.DIST_ELECTRON = join(dirname(fileURLToPath(import.meta.url)), '..')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, '../public')
  : process.env.DIST
process.env.PRELOAD_JS = join(process.env.DIST_ELECTRON, './preload/index.mjs')
async function init() {
  const { app, mainWindow } = await useApp()
  const tray = useTray(app, mainWindow)
  useVueDevTools(app, mainWindow)
  useIpcMain(app, mainWindow, tray)
  useStore()
  useAutoUpdater(app)
}
init()
