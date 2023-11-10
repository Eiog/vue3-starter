import { useApp, useAutoUpdater, useIpcMain, useStore, useTray, useVueDevTools } from './hooks'

async function init() {
  const { app, mainWindow } = await useApp()
  const tray = useTray(app, mainWindow)
  useVueDevTools(app, mainWindow)
  useIpcMain(app, mainWindow, tray)
  useStore()
  useAutoUpdater(app)
}
init()
