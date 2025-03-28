import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/04-WebApp-Prehistoria/', // esto es para GitHub Pages
  plugins: [react()],
})

