import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup for ES Modules directory resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://www.computerrepairkuwait.com';

// Your canonical route architecture
const routes = [
  '/',
  '/services',
  '/pricing',
  '/about',
  '/contact',
  '/gallery',
  '/book',
  '/laptop-repair-kuwait',
  '/macbook-repair-kuwait',
  '/gaming-pc-repair-kuwait',
  '/chip-level-motherboard-repair-hawalli',
  '/screen-replacement-kuwait',
  '/data-recovery-kuwait',
  '/blog',
  '/blog/laptop-repair-kuwait-2026',
  '/blog/how-to-protect-laptop-screen',
  '/gaming-pc-cooling',
  '/battery-replacement'
];

// Generate XML content
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${SITE_URL}${route}</loc>
    <changefreq>${route === '/' || route === '/blog' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === '/' ? '1.0' : route.includes('/blog/') ? '0.7' : '0.9'}</priority>
  </url>`).join('\n')}
</urlset>`;

// Ensure the public directory exists and write the file
const publicDir = path.resolve(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap.trim());
console.log('✅ Automated sitemap.xml generated successfully for Vercel!');
