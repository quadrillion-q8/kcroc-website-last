// File: app/frontend/scripts/generate-sitemap.ts
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { KCROC_GRAPH } from '../src/data/graph';
import { BLOG_POSTS } from '../src/constants/blogPosts';
import { getContentRoute } from '../src/constants/routes';

// ESM-safe path resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');

// Standardized production domain — read from the graph so it can never
// drift from the canonical/OG URLs the rest of the site emits.
const DOMAIN = KCROC_GRAPH.business!.websiteUrl;

// 🚀 FIX: Some pages have a route in App.tsx and a nav-menu entry in
// NavigationCompiler.ts but were never registered as an entity in
// KCROC_GRAPH or BLOG_POSTS — the two sources this generator reads from.
// Those pages are invisible to the sitemap no matter how often this script
// runs. Rather than let that keep happening silently, list them here
// explicitly so they're always included until they get a proper graph
// entity. Add future orphan pages to this list as they're discovered.
// Formerly standalone routes are now first-class WebPage entities in graph.ts.
// Keep sitemap membership derived from the graph + BLOG_POSTS so generated
// routes, navigation and discovery cannot drift apart.
const EXTRA_STANDALONE_PAGES: string[] = [
  '/guides/ar/bios-uefi-recovery-kuwait',
];

// Google ignores <priority> and <changefreq>. Keep the sitemap focused on
// canonical URLs and accurate <lastmod> values instead.
const normalizeLastModified = (value: string): string => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Invalid sitemap lastModified value: ${value}`);
  }
  const now = Date.now();
  if (parsed.getTime() > now + 5 * 60 * 1000) {
    throw new Error(`Future sitemap lastModified value: ${value}`);
  }
  return value;
};

const generateSitemap = () => {
  // 🚀 FIX: Filter out entities that are just UI fragments/anchors (#) 
  // and map only valid, distinct canonical routes.
  const filteredEntities = KCROC_GRAPH.routableEntities.filter(
    entity => !entity.seo.canonicalUrl.includes('#')
  );

  const graphUrlEntries = filteredEntities
    .filter(entity => !(entity.seo.robots || '').toLowerCase().includes('noindex'))
    .map(entity => {
      // If the graph already provided the full URL, keep it; otherwise prefix DOMAIN.
      const url = entity.seo.canonicalUrl.startsWith('http')
        ? entity.seo.canonicalUrl
        : `${DOMAIN}${entity.seo.canonicalUrl.startsWith('/') ? '' : '/'}${entity.seo.canonicalUrl}`;
      return {
        url,
        entityType: (entity as { entityType?: string }).entityType,
        lastModified: entity.seo.lastModified || KCROC_GRAPH.metadata.lastUpdated,
      };
    });

  // 🚀 FIX: BLOG_POSTS live outside the knowledge graph (in
  // src/constants/blogPosts.ts), so they were previously invisible to the
  // sitemap generator — which meant vite-react-ssg never pre-rendered a
  // static page for them, and production served the homepage fallback for
  // every /blog/:slug URL. Explicitly add each post's canonical URL here so
  // it's included in sitemap.xml and therefore in SSG's includedRoutes.
  const blogUrlEntries = BLOG_POSTS.map(post => ({
    url: `${DOMAIN}${getContentRoute(post.slug, post.contentType ?? 'blog')}`,
    entityType: 'BlogPost' as const,
    // Keep sitemap freshness aligned with the page's visible technical review
    // date and Article.dateModified when a post has received a substantive review.
    lastModified: (post.technicalReviewDate
      ? new Date(post.technicalReviewDate).toISOString()
      : post.date) || KCROC_GRAPH.metadata.lastUpdated,
  }));

  const extraUrlEntries = EXTRA_STANDALONE_PAGES.map(route => ({
    url: `${DOMAIN}${route}`,
    entityType: undefined,
    lastModified: route === '/guides/ar/bios-uefi-recovery-kuwait'
      ? '2026-10-05'
      : KCROC_GRAPH.metadata.lastUpdated,
  }));

  // De-duplicate in case a slug is ever represented in both the graph and
  // BLOG_POSTS (e.g. a post that also has a dedicated graph entity).
  const seen = new Set<string>();
  const allEntries = [...graphUrlEntries, ...blogUrlEntries, ...extraUrlEntries].filter(({ url }) => {
    if (seen.has(url)) return false;
    seen.add(url);
    return true;
  });

  const urlNodes = allEntries.map(({ url: finalUrl, entityType, lastModified }) => {
    if (finalUrl.includes('#')) {
      throw new Error(`Sitemap cannot contain fragment URLs: ${finalUrl}`);
    }
    return `
  <url>
    <loc>${finalUrl}</loc>
    <lastmod>${normalizeLastModified(lastModified)}</lastmod>
  </url>`;
  }).join('');

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
  console.log(`✅ Sitemap successfully mapped ${allEntries.length} active routes to public/sitemap.xml (${filteredEntities.length} from the knowledge graph, ${blogUrlEntries.length} from BLOG_POSTS)`);
};

generateSitemap();
