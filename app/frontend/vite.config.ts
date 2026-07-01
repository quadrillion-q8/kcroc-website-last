// File: app/frontend/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    // This forces Vite to process your Tailwind classes
    postcss: './postcss.config.js',
  },
  build: {
    // This forces all CSS into one single, reliable file so nothing gets lost
    cssCodeSplit: false,
  }
});
