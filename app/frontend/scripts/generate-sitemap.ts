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

// 🚀 FIX: Flat priority/changefreq (0.8/weekly on every URL) told crawlers
// nothing about which pages matter most. Tier by entity type + URL shape:
// homepage highest, core money-pages next, then supporting content, then
// legal/utility pages lowest. Google mostly ignores <priority> today, but
// it's a free, low-effort signal and correctly documents page importance
// for any crawler that still reads it.
const getPriorityAndFreq = (
  finalUrl: string,
  entityType?: string
): { priority: string; changefreq: string } => {
  const path = finalUrl.replace(DOMAIN, '') || '/';

  if (path === '/') return { priority: '1.0', changefreq: 'daily' };

  // Core conversion pages: services, pricing, main services hub, contact/booking
  if (
    entityType === 'Service' ||
    /^\/(services|pricing|contact|booking)\/?$/.test(path)
  ) {
    return { priority: '0.9', changefreq: 'weekly' };
  }

  // High-intent supporting content: brand pages, problem/symptom pages,
  // case studies, the physical Hawalli location page, and the blog/FAQ hubs
  if (
    entityType === 'Brand' ||
    entityType === 'Problem' ||
    entityType === 'CaseStudy' ||
    path === '/location/hawalli' ||
    /^\/(blog|faq)\/?$/.test(path)
  ) {
    return { priority: '0.7', changefreq: 'weekly' };
  }

  // Individual blog/guide posts and other location-area pages
  if (path.startsWith('/blog/') || entityType === 'Location') {
    return { priority: '0.6', changefreq: 'monthly' };
  }

  // Legal/utility/company pages
  if (/^\/(privacy-policy|terms-of-service|privacy-security|about)\/?$/.test(path)) {
    return { priority: '0.3', changefreq: 'yearly' };
  }

  // Default for anything not explicitly tiered above
  return { priority: '0.5', changefreq: 'monthly' };
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
    url: `${DOMAIN}${getBlogRoute(post.slug)}`,
    entityType: 'BlogPost' as const,
    lastModified: post.date || KCROC_GRAPH.metadata.lastUpdated,
  }));

  const extraUrlEntries = EXTRA_STANDALONE_PAGES.map(route => ({
    url: `${DOMAIN}${route}`,
    entityType: undefined,
    lastModified: KCROC_GRAPH.metadata.lastUpdated,
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
    const { priority, changefreq } = getPriorityAndFreq(finalUrl, entityType);
    return `
  <url>
    <loc>${finalUrl}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
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
