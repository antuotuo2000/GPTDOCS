import { defineConfig } from 'vite'

// Serve the original page tree directly. Identical styles/scripts are shared in _shared/.
export default defineConfig({
  base: './',
  publicDir: 'public/original',
})
