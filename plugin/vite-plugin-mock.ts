import type { Plugin } from 'vite'
import express from 'express'
import routes from '../api/_routes'

export function VitePluginMock(options?: { prefix?: string }): Plugin {
  const app = express()
  app.use(express.json())
  app.use(routes)
  return {
    name: 'vite-plugin-vercel-mock',
    apply: 'serve',
    configureServer: async (server) => {
    // mount mock server, `/api` is the base url
      server.middlewares.use(options?.prefix ?? '/api', app)
    },
  }
}

export default VitePluginMock
