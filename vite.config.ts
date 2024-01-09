import { resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'

import Icons from 'unplugin-icons/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import Layouts from 'vite-plugin-vue-layouts'
import WebfontDownload from 'vite-plugin-webfont-dl'
import { webUpdateNotice } from '@plugin-web-update-notification/vite'
import { vitePluginVersionMark } from 'vite-plugin-version-mark'
import VueDevTools from 'vite-plugin-vue-devtools'
import { viteVueCSSVars } from 'unplugin-vue-cssvars'
import Pages from 'vite-plugin-pages'
import postcssPresetEnv from 'postcss-preset-env'
import VitePluginDebug from 'vite-plugin-debug'
import { VitePluginMock } from './plugin'

import { VitePluginAutoImport, VitePluginComponents, VitePluginElectron, VitePluginI18n, VitePluginMarkdown, VitePluginPWA } from './config'

// https://vitejs.dev/config/

export default defineConfig(({ command, mode }) => {
  const { VITE_DEV_PORT, VITE_API_BASE_PREFIX, VITE_API_BASE_URL, VITE_BASE } = loadEnv(mode, process.cwd(), '')
  const isElectron = mode === 'electron'
  const debug = !!process.env.VSCODE_DEBUG || !!process.env.TAURI_DEBUG

  return {
    plugins: [
      VueDevTools(), // https://devtools-next.vuejs.org/
      VitePluginDebug(), // https://github.com/hu3dao/vite-plugin-debug/blob/master/README.zh-CN.md
      // virtual({
      //   'virtual:module': 'export default { mode: \'web\' }',
      // }), // https://github.com/patak-dev/vite-plugin-virtual Vite5 type=module 报错

      VitePluginMock({ prefix: VITE_API_BASE_PREFIX }),

      Pages({
        extensions: ['vue', 'md'],
      }), // https://github.com/hannoeru/vite-plugin-pages

      Layouts(), // https://github.com/JohnCampionJr/vite-plugin-vue-layouts

      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }), // https://github.com/vbenjs/vite-plugin-svg-icons

      webUpdateNotice({
        logVersion: true,
      }), // https://github.com/GreatAuk/plugin-web-update-notification

      vitePluginVersionMark({
        // name: 'test-app',
        // version: '0.0.1',
        // command: 'git describe --tags',
        ifGitSHA: true,
        ifShortSHA: true,
        ifMeta: true,
        ifLog: true,
        ifGlobal: true,
      }), // https://github.com/ZhongxuYang/vite-plugin-version-mark

      vue({
        script: {
          defineModel: true,
          propsDestructure: true,
        },
        include: [/\.vue$/, /\.md$/],
      }), // https://github.com/vitejs/vite-plugin-vue

      vueJsx(), // https://github.com/vitejs/vite-plugin-vue

      viteVueCSSVars({
        include: [/.vue/],
        includeCompile: ['**/**.scss'],
        server: false,
      }), // https://github.com/baiwusanyu-c/unplugin-vue-cssvars

      WebfontDownload(), // https://github.com/feat-agency/vite-plugin-webfont-dl

      Icons({ compiler: 'vue3' }), // https://github.com/antfu/unplugin-icons
      Unocss(), // https://github.com/antfu/unocss
      ...VitePluginAutoImport(),
      ...VitePluginComponents(),
      ...VitePluginI18n(),
      ...VitePluginMarkdown(),
      ...VitePluginPWA({ command, mode }),
      ...isElectron ? VitePluginElectron({ command, mode }) : [],
    ],
    clearScreen: true,
    base: VITE_BASE ?? '/',
    server: {
      port: Number(VITE_DEV_PORT),
      host: true, // host设置为true才可以使用network的形式，以ip访问项目
      open: false, // 自动打开浏览器
      cors: true, // 跨域设置允许
      strictPort: true, // 如果端口已占用直接退出
      proxy: VITE_API_BASE_URL === ''
        ? undefined
        : {
            [VITE_API_BASE_PREFIX]: {
              target: VITE_API_BASE_URL,
              changeOrigin: true,
              rewrite: path => path.replace(/^\`${VITE_API_BASE_PREFIX}`/, ''),
            },
          },
    },
    envPrefix: ['VITE_', 'TAURI_'],
    build: {
      minify: debug ? false : 'esbuild',
      sourcemap: debug,
      brotliSize: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 2000,
      // 在生产环境移除console.log
      // terserOptions: {
      //   compress: {
      //     drop_console: true,
      //     drop_debugger: true,
      //   },
      // },
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
      postcss: {
        plugins: [
          postcssPresetEnv(),
        ],
      },
    },
  }
})
