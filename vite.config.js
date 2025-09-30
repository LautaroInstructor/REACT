// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        // Agregar todas las dependencias que causan problemas
        /^firebase/,
        /^@firebase/,
        'react-helmet',
        /^react-helmet/
      ]
    }
  },
  optimizeDeps: {
    exclude: [
      'firebase', 
      'firebase/app', 
      'firebase/auth', 
      'firebase/firestore',
      'react-helmet'
    ]
  }
})