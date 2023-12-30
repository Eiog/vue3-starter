import { resolve } from 'node:path'
import type { PluginOption } from 'vite'

import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

export function VitePluginI18n(): PluginOption[] {
  return [
    VueI18nPlugin({
      runtimeOnly: true,
      compositionOnly: true,
      fullInstall: true,
      include: resolve(__dirname, './src/locales/**'),
    }), // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n

  ]
}
