// File: scripts/prerender.mjs
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

async function launchBrowser() {
  const isVercel = !!(process.env.VERCEL || process.env.CI);

  if (isVercel) {
    // Vercel serverless build environment: use @sparticuz/chromium + puppeteer-core
    const chromium = (await import('@sparticuz/chromium')).default;
    const puppeteerCore = (await import('puppeteer-core')).default;

    return await puppeteerCore.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });
  } else {
    // Local development fallback
    try {
      const puppeteer = (await import('puppeteer')).default;
      return await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      });
    } catch {
      const chromium = (await import('@sparticuz/chromium')).default;
      const puppeteerCore = (await import('puppeteer-core')).default;
      return await puppeteerCore.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
      });
    }
  }
}

async function prerender() {
  console.log('🚀 Starting KCROC Vercel Prerender Engine...');
  const server = await startServer();

  const sitemapPath = path.join(DIST_DIR, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    console.error('⚠️ Sitemap not found at dist/sitemap.xml. Skipping prerender.');
    server.close();
    process.exit(0);
  }

  const sitemapXml = fs.readFileSync(sitemapPath, 'utf8');
  const parser = new XMLParser();
  const sitemapData = parser.parse(sitemapXml);

  const urls = sitemapData?.urlset?.url || [];
  const routes = (Array.isArray(urls) ? urls : [urls]).map((u) => {
    try {
      return new URL(u.loc).pathname;
    } catch {
      return u.loc;
    }
  });

  console.log(`📋 Found ${routes.length} routes in sitemap to pre-render.`);

  let browser;
  try {
    browser = await launchBrowser();
  } catch (err) {
    console.error('⚠️ Could not launch Chromium for pre-rendering:', err.message);
    server.close();
    process.exit(0);
  }

  const page = await browser.newPage();

  for (const route of routes) {
    try {
      console.log(`  └─ Pre-rendering: ${route}`);
      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: 'networkidle2',
        timeout: 15000,
      });

      const html = await page.content();
      const routePath = route === '/' ? '' : route;
      const targetDir = path.join(DIST_DIR, routePath);

      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      fs.writeFileSync(path.join(targetDir, 'index.html'), html);
    } catch (err) {
      console.warn(`  ⚠️ Skipped ${route}: ${err.message}`);
    }
  }

  console.log('✅ Pre-rendering complete!');
  await browser.close();
  server.close();
  process.exit(0);
}

prerender().catch((err) => {
  console.error('❌ Prerender script error:', err);
  process.exit(0);
});
