import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue(), vueJsx()],
  root: './example',
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  },
  server: {
    open: true
  },
  resolve: {
    alias: {
      '@example': resolve(__dirname, 'example'),
      '@': resolve(__dirname, 'src')
    }
  }
}) 