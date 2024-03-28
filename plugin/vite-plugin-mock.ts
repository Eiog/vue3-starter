import { readdirSync, statSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { Plugin } from 'vite'
import express from 'express'
import { hyphenToCamelCase } from '../src/utils/useString'
import routes from '../api/_routes'

export function VitePluginMock(options?: { prefix?: string; dirPath?: string }): Plugin {
  const { prefix = '/api', dirPath = 'api' } = options || {}
  const app = express()
  app.use(express.json())
  const routesPath = readdirSync(resolve(process.cwd(), dirPath))
    .filter(f => f.endsWith('.ts') && !f.startsWith('_') && statSync(`${resolve(process.cwd(), dirPath)}/${f}`).isFile())

  const routesImports = routesPath.map(m => `import ${hyphenToCamelCase(m).replace('.ts', '')} from './${m}'`).join('\n')
  const routesFunc = routesPath.map(m => `router.all('/${m.replace('.ts', '')}', ${hyphenToCamelCase(m).replace('.ts', '')})`).join('\n')

  const routesFile = `/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Router } from 'express'
${routesImports}

const router = Router()
${routesFunc}
export default router
`
  writeFileSync(resolve(process.cwd(), dirPath, '_routes.ts'), routesFile)
  app.use(routes)
  return {
    name: 'vite-plugin-vercel-mock',
    apply: 'serve',
    configureServer: async (server) => {
    // mount mock server, `/api` is the base url
      server.middlewares.use(prefix, app)
      server.middlewares.use(prefix, (req, res) => {
        res.statusCode = 404
        res.end('Moke Path Not Found ! like api/[path]')
      })
    },
  }
}

export default VitePluginMock
