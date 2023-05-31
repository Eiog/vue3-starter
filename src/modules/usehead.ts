import { createHead } from '@vueuse/head'
import type { App } from 'vue'

export function setupHead(app: App) {
  const head = createHead()
  app.use(head)
}
