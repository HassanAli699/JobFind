import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, '../shared'),
      '@assets': path.resolve(__dirname, './src/assets')
    }
  },
  server: {
    port: 5000,
    host: '0.0.0.0',
    allowedHosts: ['6ad8adbd-a6d7-4974-bf65-d821ea7114f7-00-17xoc5w0is2rg.kirk.replit.dev', 'localhost']
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['lucide-react']
        }
      }
    }
  }
})