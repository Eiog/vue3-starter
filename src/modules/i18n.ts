import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
import messages from '@intlify/unplugin-vue-i18n/messages'

export function setupI18n(app: App) {
  const i18n = createI18n({
    locale: 'en_us',
    legacy: false,
    fallbackLocale: 'en_us',
    messages,
  })
  app.use(i18n)
}
