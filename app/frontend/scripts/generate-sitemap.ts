// File: app/frontend/scripts/generate-sitemap.ts
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { KCROC_GRAPH } from '../src/data/graph'; 

// ESM-safe path resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');

// Standardized production domain
const DOMAIN = 'https://www.computerrepairkuwait.com';

const generateSitemap = () => {
  // 🚀 FIX: Filter out entities that are just UI fragments/anchors (#) 
  // and map only valid, distinct canonical routes.
  const filteredEntities = KCROC_GRAPH.routableEntities.filter(
    entity => !entity.seo.canonicalUrl.includes('#')
  );

  const urlNodes = filteredEntities.map(entity => {
    
    // ✅ FIX: Prevent Double-URLs. 
    // If the graph already provided the full 'https://...' string, use it. 
    // Otherwise, attach the DOMAIN prefix.
    const finalUrl = entity.seo.canonicalUrl.startsWith('http') 
      ? entity.seo.canonicalUrl 
      : `${DOMAIN}${entity.seo.canonicalUrl.startsWith('/') ? '' : '/'}${entity.seo.canonicalUrl}`;

    return `
  <url>
    <loc>${finalUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
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
  
  // ✅ FIX: Log the actual count of filtered routes for build accuracy
  console.log(`✅ Sitemap successfully mapped ${filteredEntities.length} active routes to public/sitemap.xml`);
};

generateSitemap();
