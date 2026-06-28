// File: scripts/generate-sitemap.ts
import fs from 'fs';
import path from 'path';
import { BUSINESS_INFO } from '../src/constants/data';
// Update these imports to match where your data actually lives
import { KCROC_GRAPH } from '../src/constants/graph'; 

const generateSitemap = () => {
  const baseUrl = BUSINESS_INFO.url;
  
  // 1. Static pages
  const staticPages = ['/', '/services', '/about', '/contact', '/faq'];

  // 2. Dynamic pages derived from your Knowledge Graph
  const serviceUrls = KCROC_GRAPH.services.map(s => `/services/${s.slug}`);
  const locationUrls = KCROC_GRAPH.locations.map(l => `/locations/${l.slug}`);

  const allUrls = [...staticPages, ...serviceUrls, ...locationUrls];

  // 3. Generate XML string
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls
    .map((path) => `
  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`)
    .join('')}
</urlset>`;

  // 4. Ensure public directory exists and write file
  const publicDir = path.join(__dirname, '../public');
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);
  
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log(`✅ Sitemap generated with ${allUrls.length} URLs at public/sitemap.xml`);
};

generateSitemap();
