// File: app/frontend/vite.config.ts
import path from "path";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import fs from 'fs';
import { XMLParser } from 'fast-xml-parser';

// Helper to read the generated sitemap
function getSitemapRoutes() {
  try {
    const sitemapPath = path.resolve(__dirname, 'public/sitemap.xml');
    if (!fs.existsSync(sitemapPath)) return ['/'];
    
    const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
    const parser = new XMLParser();
    const parsed = parser.parse(sitemap);
    
    // Extract paths from the sitemap
    if (parsed.urlset && parsed.urlset.url) {
      const urls = Array.isArray(parsed.urlset.url) ? parsed.urlset.url : [parsed.urlset.url];
      return urls.map((u: any) => new URL(u.loc).pathname);
    }
    return ['/'];
  } catch (e) {
    console.warn('⚠️ Could not parse sitemap for SSG routes, falling back to root', e);
    return ['/'];
  }
}

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
    target: 'esnext',
    outDir: 'dist',
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
  },
  // 🚀 NATIVE SSG CONFIGURATION
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    includedRoutes(paths, routes) {
      return getSitemapRoutes();
    }
  }
});
