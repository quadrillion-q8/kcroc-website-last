// KCROC Arabic typography contract: self-hosted fonts, bilingual isolation and SSG delivery.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (name) => fs.readFileSync(path.join(root, name), 'utf8');
const stylesheet = read('src/index.css');
const layout = read('src/core/components/layout/RootLayout.tsx');
const tailwind = read('tailwind.config.js');
const entrypoint = read('src/main.tsx');
const fontRoot = path.join(root, 'public', 'fonts');
const weights = [400, 500, 600, 700];
const subsets = ['arabic', 'latin'];
const faceCount = (stylesheet.match(/@font-face\s*\{/g) ?? []).length;

assert.equal(faceCount, 8, 'Each Arabic/Latin subset requires four genuine font weights');
assert.match(entrypoint, /import ['"]\.\/index\.css['"]/, 'Global typography stylesheet must load');
assert.match(layout, /lang=\{isArabicRoute \? 'ar-KW' : 'en-KW'\}/, 'Shared header, footer, CTA and main need route-correct language');
assert.match(tailwind, /sans:\s*\["Plus Jakarta Sans"/, 'Preserve English font family');
assert.match(tailwind, /arabic:\s*\["IBM Plex Sans Arabic"/, 'Expose the Arabic font token');
assert.match(stylesheet, /:lang\(ar\)\s*\{/, 'Arabic font must apply to nested components');
assert.match(stylesheet, /:lang\(ar\):is\(h1, h2, h3, h4\)/, 'Arabic heading line heights and weights required');
assert.match(stylesheet, /:lang\(ar\)\.font-black/, 'Arabic black-weight normalization required');
assert.match(stylesheet, /font-display:\s*swap/, 'Use non-blocking webfont loading');
assert.doesNotMatch(stylesheet, /fonts\.googleapis\.com|fonts\.gstatic\.com/, 'No third-party font dependency');
assert.match(read('src/index.css'), /font-family: 'Plus Jakarta Sans'/, 'Existing English typography must remain unchanged');

const license = read('public/fonts/IBM-Plex-Sans-Arabic-OFL.txt');
assert.match(license, /SIL OPEN FONT LICENSE Version 1\.1/, 'Keep the upstream redistribution license');

for (const subset of subsets) {
  for (const weight of weights) {
    const filename = `ibm-plex-sans-arabic-${subset}-${weight}-normal.woff2`;
    const file = path.join(fontRoot, filename);
    const bytes = fs.readFileSync(file);
    assert.ok(bytes.length > 10_000, `WOFF2 asset is suspiciously small: ${filename}`);
    assert.equal(bytes.toString('ascii', 0, 4), 'wOF2', `Invalid WOFF2 font: ${filename}`);
    const style = stylesheet.match(new RegExp(`@font-face\\s*\\{[^}]*${filename.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}[^}]*\\}`))?.[0];
    assert.ok(style, `Missing @font-face for ${filename}`);
    assert.ok(style.includes(`font-weight: ${weight};`), `Wrong font weight for ${filename}`);
    assert.ok(style.includes('unicode-range:'), `Missing Unicode subset guard for ${filename}`);
  }
}

if (process.argv.includes('--dist')) {
  const dist = path.join(root, 'dist');
  const expected = ['ar.html', 'ar/computer-repair-hawalli.html', 'ar/laptop-repair-kuwait.html'];
  for (const file of expected) {
    const html = fs.readFileSync(path.join(dist, file), 'utf8');
    assert.ok(html.includes('data-site-locale="ar"'), `Arabic SSG route missing locale marker: ${file}`);
    assert.ok(html.includes('lang="ar-KW"'), `Arabic SSG route missing language: ${file}`);
  }
  const english = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
  assert.ok(english.includes('data-site-locale="en"'), 'English home must retain locale isolation');

  for (const subset of subsets) for (const weight of weights) {
    const filename = `ibm-plex-sans-arabic-${subset}-${weight}-normal.woff2`;
    assert.ok(fs.statSync(path.join(dist, 'fonts', filename)).size > 10_000, `Font missing from SSG output: ${filename}`);
  }
  const generatedCss = fs.readdirSync(path.join(dist, 'assets'))
    .filter((name) => name.endsWith('.css'))
    .some((name) => fs.readFileSync(path.join(dist, 'assets', name), 'utf8').includes('ibm-plex-sans-arabic-arabic-700-normal.woff2'));
  assert.ok(generatedCss, 'Built CSS must reference the self-hosted Arabic family');
}

console.log(`Arabic typography: ${faceCount} WOFF2 faces (4 weights × 2 subsets), OFL license, language isolation${process.argv.includes('--dist') ? ', and SSG delivery' : ''} verified.`);
