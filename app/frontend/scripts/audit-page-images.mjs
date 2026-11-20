// Audit content-image placements in every prerendered KCROC page.
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { load } from 'cheerio';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = path.join(root, 'dist');
const host = 'https://www.computerrepairkuwait.com';
const hashes = new Map();

function imageKeys(value, base) {
  if (!value || /^(data:|blob:|#)/i.test(value.trim())) return [];
  let url;
  try { url = new URL(value.trim(), base); } catch { return []; }
  if (!['http:', 'https:'].includes(url.protocol)) return [];
  url.hash = '';
  // KCROC's committed responsive derivatives use .w480.webp, etc.
  const local = url.hostname === 'www.computerrepairkuwait.com' || url.hostname === 'computerrepairkuwait.com';
  if (!local) return [url.href];
  const normalized = url.pathname.replace(/\.w\d+(?=\.[^/.]+$)/i, '');
  const keys = ['asset:' + normalized];
  // Byte-identical local files with different filenames count as duplicates.
  let file;
  try { file = path.resolve(dist, '.' + decodeURIComponent(url.pathname)); } catch { return keys; }
  if (!file.startsWith(dist + path.sep)) return keys;
  if (!hashes.has(file)) {
    const hash = fs.existsSync(file) && fs.statSync(file).isFile()
      ? createHash('sha256').update(fs.readFileSync(file)).digest('hex') : null;
    hashes.set(file, hash);
  }
  if (hashes.get(file)) keys.push('sha256:' + hashes.get(file));
  return keys;
}

const srcsetUrls = value => (value || '').split(',').map(x => x.trim().split(/\s+/)[0]).filter(Boolean);
const cssUrls = style => [...(style || '').matchAll(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^)\s]+))\s*\)/gi)].map(x => x[1] || x[2] || x[3]);
function scan(html, route) {
  const $ = load(html);
  const base = new URL(route, host);
  const seen = new Map();
  const findings = [];
  let placements = 0;
  function register(el, urls, kind) {
    const keys = new Set(urls.flatMap(url => imageKeys(url, base)));
    if (!keys.size) return;
    const node = $(el);
    const section = node.closest('section, article, figure').first();
    const location = section.attr('id') || section.find('h2,h3').first().text().trim() || node.attr('alt') || kind;
    const current = { placement: ++placements, kind, source: urls[0], location };
    const previous = new Map();
    for (const key of keys) {
      for (const first of seen.get(key) || []) previous.set(first.placement, first);
    }
    for (const first of previous.values()) findings.push({ route, first, duplicate: current });
    for (const key of keys) {
      if (!seen.has(key)) seen.set(key, []);
      seen.get(key).push(current);
    }
  }
  // A picture/srcset defines alternatives for ONE image, not multiple placements.
  $('main img').each((_, el) => {
    const image = $(el);
    const sources = image.closest('picture').find('source').toArray().flatMap(s => srcsetUrls($(s).attr('srcset')));
    register(el, [image.attr('src'), ...srcsetUrls(image.attr('srcset')), ...sources].filter(Boolean), 'img');
  });
  $('main[style], main [style]').each((_, el) => {
    const urls = [...new Set(cssUrls($(el).attr('style')))];
    for (const url of urls) register(el, [url], 'inline-css-image');
  });
  return { placements, findings };
}

// Regression fixtures run on each invocation.
const fixture = (body) => scan('<main>' + body + '</main>', '/test');
assert.equal(fixture('<picture><source srcset="/images/a.w480.webp 480w"><img src="/images/a.webp" srcset="/images/a.w768.webp 768w"></picture>').findings.length, 0);
assert.equal(fixture('<img src="/images/a.webp"><img src="/images/a.w480.webp?v=2">').findings.length, 1);
assert.equal(fixture('<img src="/images/a.webp"><div style="background-image:url(/images/a.webp)"></div>').findings.length, 1);
assert.equal(fixture('<img src="/images/a.webp"><img src="/images/b.webp">').findings.length, 0);
assert.equal(scan('<header><img src="/logo.webp"></header><main><img src="/images/a.webp"></main><footer><img src="/logo.webp"></footer>', '/test').findings.length, 0);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : entry.name.endsWith('.html') ? [full] : [];
  });
}
assert.ok(fs.existsSync(dist), 'Run the production build before auditing images.');
const pages = walk(dist).sort();
assert.ok(pages.length, 'No prerendered HTML files found.');
const findings = [];
let placements = 0;
for (const file of pages) {
  const route = '/' + path.relative(dist, file).split(path.sep).join('/').replace(/(?:^|\/)index\.html$/, '').replace(/\.html$/, '');
  const result = scan(fs.readFileSync(file, 'utf8'), route);
  placements += result.placements;
  findings.push(...result.findings);
}
const report = { pages: pages.length, placements, duplicatePairs: findings.length, affectedRoutes: [...new Set(findings.map(f => f.route))], findings };
fs.writeFileSync(path.join(root, 'page-image-audit.json'), JSON.stringify(report, null, 2) + '\n');
for (const f of findings) console.warn('[Duplicate image] ' + f.route + ' | ' + f.first.source + ' (' + f.first.location + ') -> ' + f.duplicate.source + ' (' + f.duplicate.location + ')');
console.log('KCROC image audit: ' + pages.length + ' pages, ' + placements + ' placements, ' + findings.length + ' duplicate pairs on ' + report.affectedRoutes.length + ' routes.');
if (process.argv.includes('--strict') && findings.length) process.exitCode = 1;
