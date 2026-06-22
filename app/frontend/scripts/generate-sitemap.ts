// File: scripts/generate-sitemap.ts
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup for ES Modules directory resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🧠 Import your Single Source of Truth
import { ROUTES } from '../src/constants/routes';
import { SERVICES } from '../src/constants/services';
import { SEO } from '../src/constants/seo';

console.log('🔄 Generating SEO infrastructure from Central Registry...');

// 1. Auto-extract all static routes (strings) directly from the ROUTES object
const staticRoutes = Object.values(ROUTES).filter(
  (value) => typeof value === 'string'
) as string[];

// 2. Auto-extract dynamic routes from the SERVICES array
const dynamicRoutes = SERVICES.map(service => service.route);

// Combine and deduplicate (just in case)
const allRoutes = [...new Set([...staticRoutes, ...dynamicRoutes])];

// 3. Generate sitemap.xml dynamically
const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${SEO.siteUrl}${route}</loc>
    <changefreq>${route === ROUTES.home || route.includes('/blog') ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === ROUTES.home ? '1.0' : route.includes('/blog') ? '0.7' : '0.9'}</priority>
  </url>`).join('\n')}
</urlset>`;

// Ensure the public directory exists
const publicDir = path.resolve(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Write the sitemap
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXML.trim());
console.log(`✅ Automated sitemap.xml generated with ${allRoutes.length} routes!`);

// 4. TASK 10: Generate robots.txt dynamically using the SEO base URL
const robotsTXT = `User-agent: *
Allow: /

# Exclude sensitive paths
Disallow: /api/
Disallow: /private/
Disallow: /cdn-cgi/

# Dynamic Sitemap Link
Sitemap: ${SEO.siteUrl}/sitemap.xml`;

// Write the robots.txt
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTXT.trim());
console.log(`✅ Automated robots.txt generated successfully!`);
