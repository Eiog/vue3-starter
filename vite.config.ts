import { resolve } from 'node:path'
import { rmSync } from 'node:fs'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver, VantResolver, VueUseComponentsResolver, VueUseDirectiveResolver, Vuetify3Resolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { VitePWA } from 'vite-plugin-pwa'
import Markdown from 'vite-plugin-vue-markdown'
import LinkAttributes from 'markdown-it-link-attributes'
import Shiki from 'markdown-it-shiki'
import Icons from 'unplugin-icons/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import Layouts from 'vite-plugin-vue-layouts'
import WebfontDownload from 'vite-plugin-webfont-dl'
import { webUpdateNotice } from '@plugin-web-update-notification/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueDevTools from 'vite-plugin-vue-devtools'

// eslint-disable-next-line import/default
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron-renderer'

import { vercelMock } from './plugin/vitePluginMockVercel'

// https://vitejs.dev/config/

export default defineConfig(({ command, mode }) => {
  const { VITE_APP_NAME, VITE_APP_DESCRIPTION, VITE_DEV_PORT } = loadEnv(mode, process.cwd(), '')
  const isElectron = mode === 'electron'
  const isTauri = mode === 'tauri'
  const isServe = command === 'serve'
  const isBuild = command === 'build'
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG
  const debug = !!process.env.VSCODE_DEBUG || !!process.env.TAURI_DEBUG
  if (isElectron)
    rmSync('dist-electron', { recursive: true, force: true })
  // eslint-disable-next-line multiline-ternary
  const electronPlugin = isElectron ? [
    electron([
      {
      // Main-Process entry file of the Electron App.
        entry: 'electron/main/index.ts',
        onstart(options) {
          if (process.env.VSCODE_DEBUG) {
            // eslint-disable-next-line no-console
            console.log(
            /* For `.vscode/.debug.script.mjs` */ '[startup] Electron App',
            )
          }
          else {
            options.startup()
          }
        },
        vite: {
          build: {
            sourcemap,
            minify: isBuild,
            outDir: 'dist-electron/main',
            rollupOptions: {
              external: [],
            // external: Object.keys(
            //   'dependencies' in pkg ? pkg.dependencies : {},
            // ),
            },
          },
        },
      },
      {
        entry: 'electron/preload/index.ts',
        onstart(options) {
        // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete,
        // instead of restarting the entire Electron App.
          options.reload()
        },
        vite: {
          build: {
            sourcemap: sourcemap ? 'inline' : undefined, // #332
            minify: isBuild,
            outDir: 'dist-electron/preload',
            rollupOptions: {
              external: ['@electron-toolkit/preload'],
            // external: Object.keys(
            //   'dependencies' in pkg ? pkg.dependencies : {},
            // ),
            },
          },
        },
      },
    ]),
    renderer({
      resolve: {
        serialport: { type: 'cjs' },
        got: { type: 'esm' },
      },
    }),
  ] : []
  return {
    plugins: [
      VueDevTools(), // https://github.com/JohnCampionJr/vite-plugin-vue-layouts

      vercelMock(),

      VueRouter({
        extensions: ['.vue', '.md'],
        dts: 'src/typings/typed-router.d.ts',
        importMode: 'async',
      }), // https://github.com/posva/unplugin-vue-router

      Layouts(), // https://github.com/JohnCampionJr/vite-plugin-vue-layouts

      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }), // https://github.com/vbenjs/vite-plugin-svg-icons

      webUpdateNotice({
        logVersion: true,
      }), // https://github.com/GreatAuk/plugin-web-update-notification

      vue({
        script: {
          defineModel: true,
        },
        include: [/\.vue$/, /\.md$/],
      }), // https://github.com/vitejs/vite-plugin-vue

      vueJsx(), // https://github.com/vitejs/vite-plugin-vue

      WebfontDownload(), // https://github.com/feat-agency/vite-plugin-webfont-dl

      Icons({ compiler: 'vue3' }), // https://github.com/antfu/unplugin-icons

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
          VueRouterAutoImports,
          'vue-i18n',
          {
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar',
            ],
          },
          {
            alova: [
              'useRequest',
            ],
          },
          {
            '@tauri-apps/api/app': ['getName', 'getVersion', 'getTauriVersion'],
            '@tauri-apps/api/shell': ['Command'],
            '@tauri-apps/api/os': ['platform'],
            '@tauri-apps/api/notification': ['sendNotification', 'requestPermission', 'isPermissionGranted'],
          },
        ],
        dirs: ['src/hooks', 'src/composables', 'src/stores', 'src/utils'],
        dts: 'src/typings/auto-import.d.ts',
        vueTemplate: true,
      }), // https://github.com/antfu/unplugin-auto-import

      Components({
        dirs: ['src/components', 'src/layouts'],
        extensions: ['vue', 'md'],
        deep: true,
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: 'src/typings/components.d.ts',
        resolvers: [
          NaiveUiResolver(),
          VantResolver(),
          Vuetify3Resolver(),
          VueUseComponentsResolver(),
          VueUseDirectiveResolver(),
        ],
      }), // https://github.com/antfu/unplugin-vue-components

      Unocss(), // https://github.com/antfu/unocss

      // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
      VueI18nPlugin({
        runtimeOnly: true,
        compositionOnly: true,
        fullInstall: true,
        include: resolve(__dirname, './src/locales/**'),
      }), // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n

      Markdown({
        wrapperClasses: 'prose prose-sm m-auto text-left',
        headEnabled: true,
        markdownItSetup(md) {
          // https://prismjs.com/
          md.use(Shiki, {
            theme: {
              light: 'vitesse-light',
              dark: 'vitesse-dark',
            },
          })
          md.use(LinkAttributes, {
            matcher: (link: string) => /^https?:\/\//.test(link),
            attrs: {
              target: '_blank',
              rel: 'noopener',
            },
          })
        },
      }), // https://github.com/antfu/vite-plugin-vue-markdown

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
      ...electronPlugin,
    ],
    clearScreen: true,
    server: {
      port: Number(VITE_DEV_PORT),
      host: true, // host设置为true才可以使用network的形式，以ip访问项目
      open: false, // 自动打开浏览器
      cors: true, // 跨域设置允许
      strictPort: true, // 如果端口已占用直接退出
      // proxy: {
      //   '/api': {
      //     target: 'https://mock.apifox.cn/m1/476417-0-default',
      //     changeOrigin: true,
      //     rewrite: path => path.replace(/^\/api/, ''),
      //   },
      // },
    },
    envPrefix: ['VITE_', 'TAURI_'],
    build: {
      minify: debug ? false : 'esbuild',
      sourcemap: debug,
      brotliSize: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 2000,
      // 在生产环境移除console.log
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      assetsDir: 'static/assets',
      // 静态资源打包到dist下的不同目录
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          // manualChunks: configManualChunk,
        },
      },
    },
    resolve: {
      alias: {
        '~': resolve(__dirname, './src'), // 路径别名
        'vue-i18n': 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js',
      },
    },
    css: {
      modules: {
        localsConvention: 'camelCase',
        scopeBehaviour: 'local',
      },
    },
  }
})
