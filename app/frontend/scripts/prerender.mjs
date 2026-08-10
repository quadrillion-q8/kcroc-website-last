// File: scripts/prerender.mjs
import puppeteer from 'puppeteer';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { XMLParser } from 'fast-xml-parser';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, '../dist');
const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.static(DIST_DIR));
  app.get('*', (req, res) => res.sendFile(path.join(DIST_DIR, 'index.html')));
  return new Promise((resolve) => {
    const server = app.listen(PORT, () => resolve(server));
  });
}

async function prerender() {
  console.log('🚀 Starting Vercel Prerender Engine...');
  const server = await startServer();

  // Read the sitemap to know exactly which pages to render
  const sitemapXml = fs.readFileSync(path.join(DIST_DIR, 'sitemap.xml'), 'utf8');
  const sitemapData = new XMLParser().parse(sitemapXml);
  const routes = sitemapData.urlset.url.map(u => new URL(u.loc).pathname);

  // Safety flags required for Vercel's Linux build containers
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  
  const page = await browser.newPage();

  // Loop through and snapshot every page
  for (const route of routes) {
    try {
      console.log(`Rendering: ${route}`);
      // networkidle2 ensures we don't hang on background tracking scripts
      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: 'networkidle2',
        timeout: 15000 // 15 second max per page to prevent build timeouts
      });
      const html = await page.content();
      
      const routePath = route === '/' ? '' : route;
      const targetDir = path.join(DIST_DIR, routePath);
      
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      
      fs.writeFileSync(path.join(targetDir, 'index.html'), html);
    } catch (err) {
      console.warn(`⚠️ Skipped ${route} due to timeout/error.`);
    }
  }

  console.log('✅ Prerendering complete! Shutting down.');
  await browser.close();
  server.close();
  process.exit(0);
}

prerender();
