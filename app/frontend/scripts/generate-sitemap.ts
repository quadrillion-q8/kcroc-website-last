// File: app/frontend/scripts/generate-sitemap.ts
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { KCROC_GRAPH } from '../src/data/graph';
import { BLOG_POSTS } from '../src/constants/blogPosts';
import { getBlogRoute } from '../src/constants/routes';

// ESM-safe path resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');

// Standardized production domain
const DOMAIN = 'https://www.computerrepairkuwait.com';

// 🚀 FIX: Some pages have a route in App.tsx and a nav-menu entry in
// NavigationCompiler.ts but were never registered as an entity in
// KCROC_GRAPH or BLOG_POSTS — the two sources this generator reads from.
// Those pages are invisible to the sitemap no matter how often this script
// runs. Rather than let that keep happening silently, list them here
// explicitly so they're always included until they get a proper graph
// entity. Add future orphan pages to this list as they're discovered.
const EXTRA_STANDALONE_PAGES: string[] = [
  '/laptop-screen-protection-tips',
];

const generateSitemap = () => {
  // 🚀 FIX: Filter out entities that are just UI fragments/anchors (#) 
  // and map only valid, distinct canonical routes.
  const filteredEntities = KCROC_GRAPH.routableEntities.filter(
    entity => !entity.seo.canonicalUrl.includes('#')
  );

  const graphUrls = filteredEntities.map(entity => {
    // ✅ FIX: Prevent Double-URLs. 
    // If the graph already provided the full 'https://...' string, use it. 
    // Otherwise, attach the DOMAIN prefix.
    return entity.seo.canonicalUrl.startsWith('http') 
      ? entity.seo.canonicalUrl 
      : `${DOMAIN}${entity.seo.canonicalUrl.startsWith('/') ? '' : '/'}${entity.seo.canonicalUrl}`;
  });

  // 🚀 FIX: BLOG_POSTS live outside the knowledge graph (in
  // src/constants/blogPosts.ts), so they were previously invisible to the
  // sitemap generator — which meant vite-react-ssg never pre-rendered a
  // static page for them, and production served the homepage fallback for
  // every /blog/:slug URL. Explicitly add each post's canonical URL here so
  // it's included in sitemap.xml and therefore in SSG's includedRoutes.
  const blogUrls = BLOG_POSTS.map(post => `${DOMAIN}${getBlogRoute(post.slug)}`);

  const extraUrls = EXTRA_STANDALONE_PAGES.map(route => `${DOMAIN}${route}`);

  // De-duplicate in case a slug is ever represented in both the graph and
  // BLOG_POSTS (e.g. a post that also has a dedicated graph entity).
  const allUrls = Array.from(new Set([...graphUrls, ...blogUrls, ...extraUrls]));

  const urlNodes = allUrls.map(finalUrl => `
  <url>
    <loc>${finalUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urlNodes}
</urlset>`;

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemapXml);
  
  // ✅ FIX: Log the actual count of routes for build accuracy
  console.log(`✅ Sitemap successfully mapped ${allUrls.length} active routes to public/sitemap.xml (${filteredEntities.length} from the knowledge graph, ${blogUrls.length} from BLOG_POSTS)`);
};

generateSitemap();
