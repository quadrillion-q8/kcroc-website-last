// File: scripts/prerender.mjs
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { XMLParser } from 'fast-xml-parser';
import puppeteer from 'puppeteer';

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
  // 🚨 FIXED: this used to branch on process.env.VERCEL and use
  // @sparticuz/chromium + puppeteer-core in CI. That combo is built for
  // AWS Lambda-style *serverless function* runtimes, not Vercel's *build*
  // container — the two environments have different system libraries
  // available, and the mismatch caused a hard failure:
  //   "/tmp/chromium: error while loading shared libraries: libnss3.so:
  //    cannot open shared object file: No such file or directory"
  // Full `puppeteer` downloads its own self-contained Chromium binary
  // (bundled with the OS libraries it needs) at install time, so it isn't
  // exposed to this class of "missing system library" failure the way the
  // minimal Lambda-oriented binary was. Same browser launch path everywhere
  // now — local dev and Vercel's build container alike.
  return await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
}

async function prerender() {
  console.log('🚀 Starting KCROC Vercel Prerender Engine...');
  const server = await startServer();

  const sitemapPath = path.join(DIST_DIR, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    // 🚨 FIXED: this used to log a warning and exit(0) — Vercel would treat
    // that as a SUCCESSFUL build even though zero routes got pre-rendered,
    // shipping a broken deployment with no per-route static HTML. A missing
    // sitemap at this point means an earlier build step failed silently, so
    // we now fail the build loudly instead of shipping it.
    server.close();
    throw new Error(
      'dist/sitemap.xml not found — the generate:sitemap step must have failed or not run. ' +
      'Refusing to ship a deployment with zero pre-rendered routes.'
    );
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
    console.log('✅ Chromium launched successfully.');
  } catch (err) {
    // 🚨 FIXED: this used to log a warning and exit(0), silently shipping a
    // deployment with zero pre-rendered routes whenever Chromium failed to
    // launch. Now the build fails instead, so Vercel keeps serving the last
    // known-good deployment rather than a broken one with no static HTML.
    server.close();
    throw new Error(`Could not launch Chromium for pre-rendering: ${err.message}`);
  }

  const page = await browser.newPage();
  let successCount = 0;
  const failedRoutes = [];

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
      successCount++;
    } catch (err) {
      // Per-route failures stay non-fatal — one bad route (e.g. a slow page
      // that times out) shouldn't take down the whole deployment when the
      // SPA fallback (vercel.json rewrite to /index.html) can still serve
      // that specific route client-side. This is different from the
      // Chromium-launch/sitemap cases above, which indicate nothing at all
      // could be pre-rendered.
      console.warn(`  ⚠️ Skipped ${route}: ${err.message}`);
      failedRoutes.push(route);
    }
  }

  await browser.close();
  server.close();

  console.log(`✅ Pre-rendering complete: ${successCount}/${routes.length} routes succeeded.`);
  if (failedRoutes.length > 0) {
    console.warn(`⚠️ ${failedRoutes.length} route(s) fell back to client-side rendering: ${failedRoutes.join(', ')}`);
  }

  // 🚨 FIXED: if EVERY route failed (as opposed to a handful of stragglers),
  // that's the same "nothing was actually pre-rendered" failure mode as a
  // missing sitemap or a Chromium launch failure — fail the build instead
  // of shipping it.
  if (routes.length > 0 && successCount === 0) {
    throw new Error('All routes failed to pre-render. Refusing to ship this deployment.');
  }
}

prerender().catch((err) => {
  // 🚨 FIXED: this used to exit(0) even on a hard crash, meaning Vercel
  // would mark the build "successful" no matter what went wrong here. Any
  // failure now propagates as a real, non-zero exit code so a broken
  // prerender step blocks the deployment instead of going live silently.
  console.error('❌ Prerender script error:', err);
  process.exitCode = 1;
});
