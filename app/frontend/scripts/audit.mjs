// File: app/frontend/scripts/audit.mjs
//
// Post-build SEO certification check. Runs against the prerendered `dist/`
// output (so run `pnpm run build` first, or chain this after it) and verifies
// the things `validate-build.ts` can't: that robots.txt/sitemap.xml actually
// exist in the shipped output, that every sitemap URL resolved to a real
// prerendered HTML file, and that every prerendered page actually contains a
// canonical tag, a title, and at least one JSON-LD block.
//
// Usage: node scripts/audit.mjs   (referenced by `pnpm run audit:seo`)

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(__dirname, '..', 'dist');

const errors = [];
const warnings = [];

function fail(msg) {
  errors.push(msg);
}
function warn(msg) {
  warnings.push(msg);
}

if (!existsSync(DIST_DIR)) {
  console.error('❌ No dist/ directory found. Run `pnpm run build` before `pnpm run audit:seo`.');
  process.exit(1);
}

// 1. robots.txt + sitemap.xml must exist in the shipped output
const robotsPath = join(DIST_DIR, 'robots.txt');
const sitemapPath = join(DIST_DIR, 'sitemap.xml');

if (!existsSync(robotsPath)) fail('dist/robots.txt is missing from the build output.');
if (!existsSync(sitemapPath)) fail('dist/sitemap.xml is missing from the build output.');

// 2. Every <loc> in the sitemap should resolve to a real prerendered HTML file
let sitemapUrls = [];
if (existsSync(sitemapPath)) {
  const sitemapXml = readFileSync(sitemapPath, 'utf-8');
  sitemapUrls = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim());

  if (sitemapUrls.length === 0) {
    fail('dist/sitemap.xml contains no <loc> entries.');
  }

  for (const url of sitemapUrls) {
    let pathname;
    try {
      pathname = new URL(url).pathname;
    } catch {
      fail(`Sitemap contains an unparsable URL: "${url}"`);
      continue;
    }
    const htmlPath =
      pathname === '/' ? join(DIST_DIR, 'index.html') : join(DIST_DIR, `${pathname.replace(/^\//, '')}.html`);

    if (!existsSync(htmlPath)) {
      fail(`Sitemap URL "${pathname}" has no matching prerendered file (expected ${htmlPath.replace(DIST_DIR, 'dist')}).`);
    }
  }
}

// 4. Walk every prerendered *.html file (vite-react-ssg emits flat "<route>.html"
//    files, e.g. dist/about.html or dist/blog/some-post.html — not "<route>/index.html" —
//    except the site root, which is dist/index.html) and check for the basics.
function walkHtmlFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      out.push(...walkHtmlFiles(full));
    } else if (entry.endsWith('.html')) {
      out.push(full);
    }
  }
  return out;
}

const htmlFiles = walkHtmlFiles(DIST_DIR);

if (htmlFiles.length === 0) {
  fail('No prerendered index.html files found under dist/.');
}

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf-8');
  const relPath = file.replace(DIST_DIR, 'dist');

  const hasCanonical = /<link[^>]+rel=["']canonical["']/i.test(html);
  const hasTitle = /<title[^>]*>[^<]{5,}<\/title>/i.test(html);
  const hasJsonLd = /<script[^>]+type=["']application\/ld\+json["']/i.test(html);
  const hasMetaDescription = /<meta[^>]+name=["']description["'][^>]+content="[^"]{20,}"/i.test(html);

  if (!hasCanonical) fail(`${relPath}: missing <link rel="canonical">.`);
  if (!hasTitle) fail(`${relPath}: missing or too-short <title>.`);
  if (!hasJsonLd) fail(`${relPath}: no JSON-LD (<script type="application/ld+json">) found.`);
  if (!hasMetaDescription) warn(`${relPath}: missing or too-short meta description.`);
}

// ── Report ──────────────────────────────────────────────────────────────
console.log(`🔍 KCROC SEO Certification Audit`);
console.log(`   Checked ${htmlFiles.length} prerendered page(s) against ${sitemapUrls.length} sitemap URL(s).\n`);

if (warnings.length) {
  console.log(`⚠️  ${warnings.length} warning(s):`);
  warnings.forEach((w) => console.log(`   - ${w}`));
  console.log('');
}

if (errors.length) {
  console.error(`❌ ${errors.length} error(s):`);
  errors.forEach((e) => console.error(`   - ${e}`));
  process.exit(1);
}

console.log('✅ SEO audit passed: robots.txt, sitemap.xml, canonical tags, titles, and JSON-LD are all present in the shipped build.');
