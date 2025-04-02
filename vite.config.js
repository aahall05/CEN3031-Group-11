import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 3000
  },
  build: {
    sourcemap: true, // Enable source maps for debugging
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/Testset.js',
  },
})
