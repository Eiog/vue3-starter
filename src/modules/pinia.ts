import type { App } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

export function setupPinia(app: App) {
  const pinia = createPinia().use(createPersistedState())
  app.use(pinia)
}
