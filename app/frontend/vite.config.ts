// File: app/frontend/vite.config.ts
import path from "path";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import fs from 'fs';
import { XMLParser } from 'fast-xml-parser';

// Read the canonical sitemap plus deliberately non-indexable routes that need static noindex fallbacks.
// 🩹 FIX: this used to silently fall back to `['/']` whenever the sitemap
// was missing, unparseable, or empty. That meant a failed/skipped
// `generate:sitemap` step wouldn't fail the build — it would silently
// prerender ONLY the homepage, shipping a mostly client-rendered site with
// no visible build error. Every failure path below now throws instead, so
// `pnpm build` (prebuild && generate:sitemap && vite-react-ssg build) fails
// loudly and the SSG step never runs against an incomplete route list.
function getSitemapRoutes() {
  const sitemapPath = path.resolve(__dirname, 'public/sitemap.xml');

  if (!fs.existsSync(sitemapPath)) {
    throw new Error(
      `[vite.config.ts] public/sitemap.xml not found at ${sitemapPath}. ` +
      `Run "pnpm run generate:sitemap" before building — SSG must not ` +
      `silently prerender only "/".`
    );
  }

  const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
  const parser = new XMLParser();

  let parsed: any;
  try {
    parsed = parser.parse(sitemap);
  } catch (e) {
    throw new Error(
      `[vite.config.ts] Failed to parse public/sitemap.xml: ${(e as Error).message}`
    );
  }

  if (!parsed.urlset || !parsed.urlset.url) {
    throw new Error(
      '[vite.config.ts] public/sitemap.xml contains no <url> entries. ' +
      'Refusing to fall back to prerendering only "/" — check ' +
      'scripts/generate-sitemap.ts and the knowledge graph it reads from.'
    );
  }

  const urls = Array.isArray(parsed.urlset.url) ? parsed.urlset.url : [parsed.urlset.url];
  const routes = urls.map((u: any) => new URL(u.loc).pathname);

  if (routes.length === 0) {
    throw new Error(
      '[vite.config.ts] Sitemap parsed to zero routes. Refusing to build ' +
      'with only "/" prerendered.'
    );
  }

  const prerenderRoutesPath = path.resolve(__dirname, 'prerender-routes.generated.json');
  if (!fs.existsSync(prerenderRoutesPath)) {
    throw new Error(
      `[vite.config.ts] Generated prerender route manifest missing at ${prerenderRoutesPath}. `
      + 'Run "pnpm run generate:sitemap" before building.'
    );
  }

  let extraRoutes: unknown;
  try {
    extraRoutes = JSON.parse(fs.readFileSync(prerenderRoutesPath, 'utf-8'));
  } catch (e) {
    throw new Error(
      `[vite.config.ts] Failed to parse prerender route manifest: ${(e as Error).message}`
    );
  }
  if (!Array.isArray(extraRoutes) || extraRoutes.some((route) => typeof route !== 'string' || !route.startsWith('/'))) {
    throw new Error('[vite.config.ts] Prerender route manifest must be a JSON array of absolute paths.');
  }

  // Sitemap URLs remain indexable-only; this manifest adds static output for hidden/noindex routes.
  return [...new Set([...routes, ...extraRoutes])];
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
        // Belt-and-suspenders: force vite-react-ssg + react-helmet-async into
        // a single shared chunk rather than letting Rollup duplicate them
        // across lazy-loaded route chunks (every route here is
        // React.lazy()-loaded, including Home). This does NOT by itself fix
        // anything — it was tried as a hypothesis for the site-wide broken-
        // canonical bug and empirically did not change the outcome; the
        // actual root cause and fix are documented in index.html and
        // SEOEngine.tsx. Left in place anyway since guaranteeing one module
        // instance for this pair is cheap and removes a class of bug this
        // codebase doesn't need to worry about, but if you're hunting for
        // "the fix," it isn't here.
        manualChunks(id) {
          if (id.includes('node_modules/vite-react-ssg') || id.includes('node_modules/react-helmet-async')) {
            return 'ssg-head-vendor';
          }
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
