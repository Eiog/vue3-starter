import { homedir } from 'node:os'
import { join } from 'node:path'
import type { App, BrowserWindow } from 'electron'
import { session } from 'electron'

async function useVueDevTools(app: App, mainWindow: BrowserWindow) {
  if (app.isPackaged)
    return
  const vueDevToolsPath = join(homedir(), 'AppData/Local/Google/Chrome/User Data/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/6.5.0_0')
  session.defaultSession.loadExtension(vueDevToolsPath)
  mainWindow.webContents.openDevTools()
}
export default useVueDevTools
