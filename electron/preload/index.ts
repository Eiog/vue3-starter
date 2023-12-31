import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { api } from './api'
import { useLoading } from './useLoading'

// Custom APIs for renderer

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('$electron', electronAPI)
    contextBridge.exposeInMainWorld('$nodeApi', api)
  }
  catch (error) {
    console.error(error)
  }
}
else {
  window.$electron = electronAPI
  window.$nodeApi = api
}

useLoading()
