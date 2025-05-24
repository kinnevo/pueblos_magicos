import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/pueblos_magicos/', // <-- REPLACE WITH YOUR ACTUAL REPO NAME AND KEEP THE SLASHES
  plugins: [react()],
  // Remove any lines like:
  // tailwindcss(),
  // import tailwindcss from 'tailwindcss'
  // Or any css: { postcss: { plugins: [tailwindcss()] } } if you have postcss.config.js
});
