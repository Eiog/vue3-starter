import type { Plugin } from 'vite'
import express from 'express'
import routes from '../api/_routes'

export function vercelMock(): Plugin {
  const app = express()
  app.use(express.json())
  app.use(routes)
  return {
    name: 'vite-plugin-vercel-mock',
    apply: 'serve',
    configureServer: async (server) => {
    // mount mock server, `/api` is the base url
      server.middlewares.use('/api', app)
    },
  }
}
