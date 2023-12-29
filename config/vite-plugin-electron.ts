import { rmSync } from 'node:fs'
import type { ConfigEnv, PluginOption } from 'vite'

// eslint-disable-next-line import/default
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron-renderer'
import { notBundle } from 'vite-plugin-electron/plugin'
import { writeJsonFile } from 'write-json-file'
import pkg from '../package.json'

export function VitePluginElectron({ command }: ConfigEnv): PluginOption[] {
  const isServe = command === 'serve'
  const isBuild = command === 'build'
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG
  rmSync('dist-electron', { recursive: true, force: true })
  writeJsonFile('dist-electron/package.json', { type: 'commonjs' })
  return [
    electron([
      {
        // Main process entry file of the Electron App.
        entry: 'electron/main/index.ts',
        onstart({ startup }) {
          if (process.env.VSCODE_DEBUG)
            // eslint-disable-next-line no-console
            console.log(/* For `.vscode/.debug.script.mjs` */'[startup] Electron App')

          else
            startup()
        },
        vite: {
          build: {
            sourcemap,
            minify: isBuild,
            outDir: 'dist-electron/main',
            rollupOptions: {
              // Some third-party Node.js libraries may not be built correctly by Vite, especially `C/C++` addons,
              // we can use `external` to exclude them to ensure they work correctly.
              // Others need to put them in `dependencies` to ensure they are collected into `app.asar` after the app is built.
              // Of course, this is not absolute, just this way is relatively simple. :)
              external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
            },
          },
          plugins: [
            // This is just an option to improve build performance, it's non-deterministic!
            // e.g. `import log from 'electron-log'` -> `const log = require('electron-log')`
            isServe && notBundle(),
          ],
        },
      },
      {
        entry: 'electron/preload/index.ts',
        onstart({ reload }) {
          // Notify the Renderer process to reload the page when the Preload scripts build is complete,
          // instead of restarting the entire Electron App.
          reload()
        },
        vite: {
          build: {
            sourcemap: sourcemap ? 'inline' : undefined, // #332
            minify: isBuild,
            outDir: 'dist-electron/preload',
            rollupOptions: {
              external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
            },
          },
          plugins: [
            isServe && notBundle(),
          ],
        },
      },
    ]), // https://github.com/electron-vite/vite-plugin-electron
    // Use Node.js API in the Renderer process
    renderer(), // https://github.com/electron-vite/vite-plugin-electron-renderer
  ]
}
