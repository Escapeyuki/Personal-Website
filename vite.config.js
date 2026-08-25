import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages user site (escapeyuki.github.io) serves from the domain root,
// so the base path is '/'. See grill.md (Q5).
export default defineConfig({
  base: '/',
  plugins: [react()],
})
