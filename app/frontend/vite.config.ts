// File: app/frontend/vite.config.ts
import path from "path";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  base: '/', 
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    postcss: './postcss.config.js',
  },
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // 🚀 PERF FIX: previously 'vendor-icons': ['lucide-react'] forced
          // the ENTIRE lucide-react package (every icon in the library) into
          // one chunk. Because Header (which imports a handful of icons)
          // loads on every route, that whole chunk was pulled into the
          // critical path on first visit — regardless of how many icons the
          // current page actually uses. Removing the manual chunk lets
          // Rollup tree-shake unused icons per-chunk and let route-specific
          // icons load lazily with their own route chunk instead.
        }
      }
    }
  }
});
