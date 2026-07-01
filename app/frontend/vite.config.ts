// File: app/frontend/vite.config.ts
import path from "path";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    postcss: './postcss.config.js',
  },
  build: {
    // ⚡ PERFORMANCE: We turn chunking ON and tell Vite exactly how to split the files
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Group 1: Core React code (This rarely changes, so browsers keep it cached)
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Group 2: Icon Library (Separating this keeps the initial load incredibly small)
          'vendor-icons': ['lucide-react']
        }
      }
    }
  }
});
