import { createVuetify } from 'vuetify'

import type { App } from 'vue'

export function setupVuetify(app: App) {
  app.use(createVuetify())
}
