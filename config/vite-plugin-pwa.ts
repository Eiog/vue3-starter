import type { ConfigEnv, PluginOption } from 'vite'
import { loadEnv } from 'vite'

import { VitePWA } from 'vite-plugin-pwa'

export function VitePluginPWA({ mode }: ConfigEnv): PluginOption[] {
  const { VITE_APP_NAME, VITE_APP_DESCRIPTION } = loadEnv(mode, process.cwd(), '')

  return [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'safari-pinned-tab.svg'],
      manifest: {
        name: VITE_APP_NAME,
        short_name: VITE_APP_NAME,
        description: VITE_APP_DESCRIPTION,
        theme_color: '#ffffff',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      devOptions: {
        enabled: process.env.SW_DEV === 'true',
        /* when using generateSW the PWA plugin will switch to classic */
        type: 'module',
        navigateFallback: 'index.html',
      },
    }), // https://github.com/antfu/vite-plugin-pwa
  ]
}
