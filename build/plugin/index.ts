import path from 'path'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
/**
 * * 扩展setup插件，支持在script标签中使用name属性
 * usage: <script setup name="MyComp"></script>
 */
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

/**
 * * 组件库按需引入插件
 * usage: 直接使用组件,无需在任何地方导入组件
 */
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from "unplugin-auto-import/vite";
/**
 * * unplugin-icons插件，自动引入iconify图标
 * usage: https://github.com/antfu/unplugin-icons
 * 图标库: https://icones.js.org/
 */
import Icons from 'unplugin-icons/vite'

// rollup打包分析插件
import visualizer from 'rollup-plugin-visualizer'
//代码压缩
import compressPlugin from 'vite-plugin-compression';

import { createMockServe } from './mock'
//i18n
import vueI18n from '@intlify/vite-plugin-vue-i18n'
export function createVitePlugins(isBuild) {
    const plugin = [
        vue(),
        VueSetupExtend(),
        AutoImport({
            /* options */
            include: [
                /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                /\.vue$/,
                /\.vue\?vue/, // .vue
            ],
            imports: [
                "vue",
                "@vueuse/core",
                "pinia",
                "vue-router",
                {
                    'naive-ui': [
                        'useDialog',
                        'useMessage',
                        'useNotification',
                        'useLoadingBar'
                    ]
                }
            ],
            dirs: ["src/hooks", "src/store", "src/utils", "src/api"],
            dts: "src/typings/auto-import.d.ts",
        }),
        Components({
            dirs: ["src/components"],
            extensions: ["vue"],
            deep: true,
            dts: "src/typings/components.d.ts",
            resolvers: [NaiveUiResolver()]
        }),
        Icons({ compiler: 'vue3', autoInstall: true }),
        Unocss(),
        createMockServe(isBuild),
        visualizer({
            filename: './node_modules/.cache/visualizer/stats.html',
            open: true,
            gzipSize: true,
            brotliSize: true,
        }),
        compressPlugin({
            ext: '.gz',
            deleteOriginFile: false,
        }),
        vueI18n({
            include: path.resolve(__dirname, './src/locales/**')
        })
    ]
    return plugin
}