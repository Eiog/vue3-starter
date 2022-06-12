import { defineConfig } from 'vite'
import autoprefixer from 'autoprefixer'
import { resolve } from 'path'
import { createVitePlugins,configManualChunk } from './build'
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isBuild = command === 'build'
  return {
    plugins: createVitePlugins(isBuild),
    server: {
      port: 3000,
      host: true, // host设置为true才可以使用network的形式，以ip访问项目
      open: false, // 自动打开浏览器
      cors: true, // 跨域设置允许
      strictPort: true, // 如果端口已占用直接退出
      proxy: {
        '/api': {
          target: 'http://localhost:3000/api/',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
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
          manualChunks: configManualChunk
        },
      },
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, './src'), // 路径别名
      }
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer()
        ]
      },
      // css预处理器
      preprocessorOptions: {
        less: {
          charset: false,
          // additionalData: '@import "./src/assets/style/index.less";',
        },
      },
    },
  }
})
