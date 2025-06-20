import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Don't externalize any dependencies - let Vite handle bundling
      external: [],
    },
  },
  // Add this for SPA routing support
  server: {
    historyApiFallback: true
  }
})