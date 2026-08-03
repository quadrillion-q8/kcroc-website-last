// File: app/frontend/vite.config.ts
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import vitePrerender from 'vite-plugin-prerender';

// Required to use __dirname inside an ES Module config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    vitePrerender({
      // The path to the vite-outputted app to prerender
      staticDir: path.join(__dirname, 'dist'),
      // The exact routes to capture as static HTML for Google/AI bots
      routes: [
        '/', 
        '/about', 
        '/pricing', 
        '/faq', 
        '/case-studies',
        '/blog/why-8gb-ram-is-no-longer-enough-for-windows-11',
        '/laptop-repair-kuwait-2026'
      ]
    })
  ],
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
          'vendor-react': ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
          'vendor-icons': ['lucide-react']
        }
      }
    }
  }
});
