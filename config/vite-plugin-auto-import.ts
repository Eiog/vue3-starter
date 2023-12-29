import type { PluginOption } from 'vite'
import {
  ElementPlusResolver,
} from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'

export function VitePluginAutoImport(): PluginOption[] {
  return [
    AutoImport({
      /* options */
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
      ],
      imports: [
        'vue',
        '@vueuse/core',
        '@vueuse/head',
        'pinia',
        'vue-router',
        'vue-i18n',
        {
          '@tauri-apps/api/app': ['getName', 'getVersion', 'getTauriVersion'],
          '@tauri-apps/api/shell': ['Command'],
          '@tauri-apps/api/os': ['platform'],
          '@tauri-apps/api/notification': ['sendNotification', 'requestPermission', 'isPermissionGranted'],
        },
      ],
      dirs: ['src/hooks', 'src/composables', 'src/stores', 'src/utils'],
      vueTemplate: true,
      resolvers: [ElementPlusResolver()],
    }), // https://github.com/antfu/unplugin-auto-import
  ]
}
