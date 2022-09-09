import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';
import { resolve } from 'path';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import Unocss from 'unocss/vite';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import Icons from 'unplugin-icons/vite';
import vueI18n from '@intlify/vite-plugin-vue-i18n';
import visualizer from 'rollup-plugin-visualizer';
import compressPlugin from 'vite-plugin-compression';
// https://vitejs.dev/config/
const vendorLibs: { match: string[]; output: string }[] = [
  {
    match: ['naive-ui'],
    output: 'naiveui',
  },
  {
    match: ['xgplayer'],
    output: 'xgplayer',
  },
  {
    match: ['@wangeditor'],
    output: 'wangeditor',
  },
  {
    match: ['echarts'],
    output: 'echarts',
  },
];
//分包
const configManualChunk = (id: string) => {
  if (/[\\/]node_modules[\\/]/.test(id)) {
    const matchItem = vendorLibs.find((item) => {
      const reg = new RegExp(
        `[\\/]node_modules[\\/]_?(${item.match.join('|')})(.*)`,
        'ig',
      );
      return reg.test(id);
    });
    return matchItem ? matchItem.output : null;
  }
};
export default defineConfig(() => {
  return {
    plugins: [
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
          'vue',
          '@vueuse/core',
          'pinia',
          'vue-router',
          {
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar',
            ],
          },
        ],
        dirs: ['src/hooks', 'src/store', 'src/utils', 'src/api'],
        dts: 'src/typings/auto-import.d.ts',
      }),
      Components({
        dirs: ['src/components'],
        extensions: ['vue'],
        deep: true,
        dts: 'src/typings/components.d.ts',
        resolvers: [NaiveUiResolver()],
      }),
      Icons({ compiler: 'vue3', autoInstall: true }),
      Unocss(),
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
        include: path.resolve(__dirname, './src/locales/**'),
      }),
    ],
    server: {
      port: 3301,
      host: true, // host设置为true才可以使用network的形式，以ip访问项目
      open: false, // 自动打开浏览器
      cors: true, // 跨域设置允许
      strictPort: true, // 如果端口已占用直接退出
      proxy: {
        '/api': {
          target: 'http://localhost:3000/api/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    build: {
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
          manualChunks: configManualChunk,
        },
      },
    },
    resolve: {
      alias: {
        '~': resolve(__dirname, './src'), // 路径别名
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
      },
    },
    css: {
      postcss: {
        plugins: [autoprefixer()],
      },
      // css预处理器
      preprocessorOptions: {
        less: {
          charset: false,
          // additionalData: '@import "./src/assets/style/index.less";',
        },
      },
    },
  };
});
