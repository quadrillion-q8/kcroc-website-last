// File: app/frontend/scripts/generate-sitemap.ts
import fs from 'fs';
import path from 'path';
import { BUSINESS_INFO } from '../src/constants/data';
// ✅ CORRECTED: Pulling the actual data object from the data folder, not the types folder
import { KCROC_GRAPH } from '../src/data/graph'; 

const generateSitemap = () => {
  const baseUrl = BUSINESS_INFO.url;
  
  // 1. Define core application static pages
  const staticPages = ['/', '/services', '/about', '/contact', '/faq'];

  // 2. Map dynamic entities directly from your Knowledge Graph configuration
  const serviceUrls = KCROC_GRAPH.services.map(s => `/services/${s.slug}`);
  const locationUrls = KCROC_GRAPH.locations.map(l => `/locations/${l.slug}`);

  // Combine static routing tables with dynamic resource collections
  const allUrls = [...staticPages, ...serviceUrls, ...locationUrls];

  // 3. Construct structurally compliant sitemap XML markup
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

  // 4. Resolve absolute runtime directory and commit the file output
  const publicDir = path.join(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log(`✅ Sitemap successfully generated with ${allUrls.length} URLs at public/sitemap.xml`);
};

generateSitemap();
