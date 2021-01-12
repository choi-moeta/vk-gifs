import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

const srcPath = path.resolve(__dirname, 'src')

export default defineConfig({
  root: './src',
  alias: {
    '/@': srcPath,
  },
  plugins: [
    vue()
  ],
})
