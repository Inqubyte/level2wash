import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

const sheetsProxy = {
  '/sheets-api': {
    target: 'https://docs.google.com',
    changeOrigin: true,
    secure: true,
    rewrite: (p: string) => p.replace(/^\/sheets-api/, ''),
  },
}

export default defineConfig({
  // Must match the GitHub repo name for project Pages:
  // https://inqubyte.github.io/level2wash/
  base: '/level2wash/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    proxy: sheetsProxy,
  },
  preview: {
    port: 4173,
    proxy: sheetsProxy,
  },
})
