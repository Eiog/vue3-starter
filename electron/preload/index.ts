import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { api } from './api'
import { useLoading } from './useLoading'

// `exposeInMainWorld` can't detect attributes and methods of `prototype`, manually patching it.
function withPrototype(obj: Record<string, any>) {
  const protos = Object.getPrototypeOf(obj)

  for (const [key, value] of Object.entries(protos)) {
    if (Object.prototype.hasOwnProperty.call(obj, key))
      continue

    if (typeof value === 'function') {
      // Some native APIs, like `NodeJS.EventEmitter['on']`, don't work in the Renderer process. Wrapping them into a function.
      obj[key] = function (...args: any) {
        return value.call(obj, ...args)
      }
    }
    else {
      obj[key] = value
    }
  }
  return obj
}
// Custom APIs for renderer

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('$electron', withPrototype(electronAPI))
    contextBridge.exposeInMainWorld('$nodeApi', api)
  }
  catch (error) {
    console.error(error)
  }
}
else {
  window.$electron = withPrototype(electronAPI) as typeof electronAPI
  window.$nodeApi = api
}

useLoading()
