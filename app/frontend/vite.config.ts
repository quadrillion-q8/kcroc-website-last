// File: app/frontend/vite.config.ts
import path from "path";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import prerender from '@prerenderer/vite-plugin';
import puppeteerRenderer from '@prerenderer/renderer-puppeteer';

export default defineConfig({
  plugins: [
    react(),
    prerender({
      // List the exact routes you want fully pre-rendered for SEO
      routes: [
        '/', 
        '/about', 
        '/pricing', 
        '/faq', 
        '/case-studies',
        '/blog/why-8gb-ram-is-no-longer-enough-for-windows-11',
        '/laptop-repair-kuwait-2026'
      ],
      renderer: puppeteerRenderer,
      server: {
        host: 'localhost',
        port: 3000,
      },
      // Wait for React Helmet to finish injecting meta tags before capturing the HTML
      postProcess(renderedRoute) {
        renderedRoute.html = renderedRoute.html.replace(
          '<div id="root"></div>',
          `<div id="root">${renderedRoute.html}</div>`
        );
      }
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
