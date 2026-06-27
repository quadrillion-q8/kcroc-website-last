// File: app/frontend/scripts/generate-sitemap.ts
import fs from 'fs';
import path from 'path';

// ✅ Pointing exactly to your flat files in the constants folder!
import { ROUTES } from '../src/constants/routes.ts';
import { LOCATION_AREAS } from '../src/constants/locationAreas.ts';
import { BLOG_POSTS } from '../src/constants/blogPosts.ts';
import { AI_PAGES_DATA } from '../src/constants/aiPagesData.ts';

const DOMAIN = 'https://www.computerrepairkuwait.com'; 
const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

// Ensure public directory exists
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

// ─── HELPER: GENERATE XML ───
const generateXML = (urls: { url: string; changefreq: string; priority: number }[]) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${DOMAIN}${u.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority.toFixed(1)}</priority>
  </url>`).join('\n')}
</urlset>`;
};

// ─── 1. CORE SERVICES SITEMAP ───
const coreRoutes = [
  { url: ROUTES.home, changefreq: 'weekly', priority: 1.0 },
  { url: ROUTES.services, changefreq: 'weekly', priority: 0.9 },
  { url: ROUTES.contact, changefreq: 'monthly', priority: 0.8 },
  { url: ROUTES.pricing, changefreq: 'monthly', priority: 0.8 },
  { url: ROUTES.faq, changefreq: 'weekly', priority: 0.8 },
  { url: ROUTES.laptopRepairHawalli, changefreq: 'weekly', priority: 0.9 },
  { url: ROUTES.macbookRepair, changefreq: 'weekly', priority: 0.9 },
  { url: ROUTES.gamingPC, changefreq: 'weekly', priority: 0.9 },
  { url: ROUTES.screenReplacement, changefreq: 'weekly', priority: 0.8 },
];
fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-core.xml'), generateXML(coreRoutes));

// ─── 2. LOCATIONS SITEMAP ───
const locationRoutes = Object.values(LOCATION_AREAS).map(area => ({
  url: `/laptop-repair-in-${area.slug}`,
  changefreq: 'monthly',
  priority: 0.7
}));
fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-locations.xml'), generateXML(locationRoutes));

// ─── 3. BLOG SITEMAP ───
const blogRoutes = BLOG_POSTS.map(post => ({
  url: `/blog/${post.slug}`,
  changefreq: 'monthly',
  priority: post.isPillar ? 0.8 : 0.6
}));
// Add the main blog hub
blogRoutes.unshift({ url: ROUTES.blog, changefreq: 'weekly', priority: 0.9 });
fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-blogs.xml'), generateXML(blogRoutes));

// ─── 4. AI LANDING PAGES SITEMAP ───
const aiRoutes = Object.values(AI_PAGES_DATA).map(page => ({
  url: `/ai/${page.slug}`,
  changefreq: 'monthly',
  priority: 0.8
}));
fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-ai.xml'), generateXML(aiRoutes));

// ─── 5. SITEMAP INDEX (The Master File) ───
const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${DOMAIN}/sitemap-core.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${DOMAIN}/sitemap-locations.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${DOMAIN}/sitemap-blogs.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${DOMAIN}/sitemap-ai.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
</sitemapindex>`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapIndex);

// ─── 6. ROBOTS.TXT ───
const robotsTxt = `User-agent: *
Allow: /

# Sitemap Index
Sitemap: ${DOMAIN}/sitemap.xml
`;
fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), robotsTxt);

console.log('✅ Advanced Split-Sitemaps & Robots.txt generated successfully!');
