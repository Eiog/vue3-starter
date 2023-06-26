import Store from 'electron-store'
import { ipcMain } from 'electron'

function useStore() {
  const store = new Store()
  ipcMain.on('store-get', async (event, value) => {
    event.returnValue = store.get(value) || []
  })
  ipcMain.on('store-set', async (event, key, value) => {
    store.set(key, value)
  })
  ipcMain.on('store-has', async (event, key) => {
    event.returnValue = store.has(key)
  })
  ipcMain.on('store-delete', async (event, key) => {
    store.delete(key)
  })
  ipcMain.on('store-clear', async (event) => {
    store.clear()
  })
  return store
}
export default useStore
