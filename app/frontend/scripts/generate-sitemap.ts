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
  // Map canonical URLs strictly from active entities
  const urlNodes = KCROC_GRAPH.activeEntities.map(entity => `
  <url>
    <loc>${DOMAIN}${entity.seo.canonicalUrl}</loc>
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
  
  console.log(`✅ Sitemap successfully mapped ${KCROC_GRAPH.activeEntities.length} active routes to public/sitemap.xml`);
};

generateSitemap();
