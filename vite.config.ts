import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import Unocss from 'unocss/vite';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import Icons from 'unplugin-icons/vite';
import vueI18n from '@intlify/vite-plugin-vue-i18n';
import compressPlugin from 'vite-plugin-compression';
// https://vitejs.dev/config/
const vendorLibs: { match: string[]; output: string }[] = [
  {
    match: ['naive-ui'],
    output: 'naive-ui',
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
          'vue-i18n',
          {
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar',
            ],
          },
        ],
        dirs: ['src/hooks', 'src/stores', 'src/utils'],
        dts: 'src/typings/auto-import.d.ts',
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true,
        },
      }),
      Components({
        dirs: ['src/components', 'src/layouts'],
        extensions: ['vue'],
        deep: true,
        dts: 'src/typings/components.d.ts',
        resolvers: [NaiveUiResolver()],
      }),
      Icons({ compiler: 'vue3', autoInstall: true }),
      Unocss(),
      compressPlugin({
        ext: '.gz',
        deleteOriginFile: false,
      }),
      vueI18n({
        include: resolve(__dirname, './src/i18n/**'),
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
          target: 'https://mock.apifox.cn/m1/476417-0-default',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      minify: 'esbuild',
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
  };
});
