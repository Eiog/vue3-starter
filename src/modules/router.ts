import type { Router } from 'vue-router'
import type { App } from 'vue'

import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto/routes'

export function setupRouter(app: App) {
  const router: Router = createRouter({
    // 新的vue-router4 使用 history路由模式 和 base前缀
    history: createWebHistory(import.meta.env.VITE_BASE as string),
    routes,
  })
  useRouteGuard(router)
  app.use(router)
}
