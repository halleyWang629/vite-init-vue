import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import autoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    autoImport({
      imports: ['vue', 'vue-router', 'pinia']
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    host:'0.0.0.0',
    port: 80,
    proxy: {
      '/dev-api/': {
        target: 'http://vue.ruoyi.vip',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/dev-api/, '/prod-api')
      },
    }
  }
})
