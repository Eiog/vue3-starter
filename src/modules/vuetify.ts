import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import { en, zhHans } from 'vuetify/locale'
import type { App } from 'vue'

export function setupVuetify(app: App) {
  app.use(createVuetify({
    locale: {
      locale: 'cn',
      fallback: 'en',
      messages: {
        en,
        zhHans,
      },
    },
  }))
}
