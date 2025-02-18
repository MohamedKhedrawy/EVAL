import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/dssd
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
},
  server: {
    host: true,
    port: 5173
  },
  hmr: {
    // protocol: 'ws',
    host: '192.168.1.107',
    port: 5173
  }
})
