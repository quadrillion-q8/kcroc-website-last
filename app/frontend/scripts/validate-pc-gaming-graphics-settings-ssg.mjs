import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const dist = path.join(process.cwd(), 'dist');
const candidates = [
  path.join(dist, 'blog', 'pc-gaming-graphics-settings-better-visuals-fps.html'),
  path.join(dist, 'blog', 'pc-gaming-graphics-settings-better-visuals-fps', 'index.html'),
];
const articlePath = candidates.find((candidate) => existsSync(candidate));

assert.ok(
  articlePath,
  'PC gaming graphics-settings article is missing from the static build.',
);

const html = readFileSync(articlePath, 'utf8');
const articleStart = html.indexOf('<article');
const articleEnd = html.indexOf('</article>', articleStart);
assert.ok(articleStart >= 0 && articleEnd > articleStart, 'The article wrapper is missing from initial HTML.');
const articleHtml = html.slice(articleStart, articleEnd + '</article>'.length);

// Preserve the existing indexed URL and verify global document metadata.
assert.ok(
  html.includes('https://www.computerrepairkuwait.com/blog/pc-gaming-graphics-settings-better-visuals-fps'),
  'The existing canonical URL is missing or has changed.',
);
assert.ok(
  /<html\b[^>]*\blang="en"/i.test(html),
  'Global article document language must be English, not the Kuwait locale.',
);
assert.ok(
  html.includes('You Don’t Need Max Graphics Settings for Great PC Gaming Visuals'),
  'The global article title is missing from initial HTML.',
);
assert.ok(
  html.includes('You Don’t Need Max Graphics Settings for Great PC Gaming Visuals (2026 FPS & 1% Lows Guide) | KCROC'),
  'The global SEO title is missing from initial HTML.',
);
assert.ok(
  !html.includes('property="og:locale"'),
  'The global article must not emit Kuwait-specific Open Graph locale metadata.',
);

// The shared author link points to a Kuwait-oriented author landing page.
// Global editorial pages should retain author credit without sending visitors there.
assert.ok(
  !articleHtml.includes('href="/author/imran"'),
  'Global article author credit still links to the local author profile.',
);

// These checks apply to the article itself, not the site's shared business footer.
for (const localMarker of [
  'Kuwait',
  'Hawalli',
  'KWD',
  '+965',
  'Al Mullah Complex',
  'Free pickup',
  'pickup and delivery',
  'No Fix, No Fee',
  '30-Day Warranty',
  'Free Pick & Drop',
  'Book Repair',
  'WhatsApp KCROC',
]) {
  assert.ok(
    !articleHtml.toLowerCase().includes(localMarker.toLowerCase()),
    'Kuwait-local promotion or location copy remains inside the global article: ' + localMarker,
  );
}

// Core practical advice and source references must remain in static HTML.
for (const marker of [
  'Anisotropic Filtering',
  'Texture Quality',
  'Screen-Space Ambient Occlusion',
  'Radeon Image Sharpening',
  'NVIDIA App',
  'VRAM',
  'FPS',
  'GPU pipeline',
  'Frame time',
  '1% low',
  'Volumetric fog',
  'Shadow map',
  'Ray tracing',
  'Screen-Space Reflections',
  'Practical VRAM texture starting points',
  'Settings vs. hardware bottlenecks',
  'Frequently asked questions about PC gaming graphics settings',
]) {
  assert.ok(articleHtml.includes(marker), 'Expected graphics-settings guidance is missing: ' + marker);
}

assert.ok(!articleHtml.includes('External source'), 'A generic external-source anchor remains in the article.');
assert.ok(html.includes('"BlogPosting"'), 'BlogPosting structured data is missing from initial HTML.');
assert.ok(html.includes('"FAQPage"'), 'FAQPage structured data is missing from initial HTML.');
assert.ok(html.includes('Windows 11 Gaming Stutter &amp; FPS Drops') || html.includes('Windows 11 Gaming Stutter & FPS Drops'), 'The related gaming-stutter guide card is missing.');
assert.ok(html.includes('10 Gaming PC Mistakes That Are Quietly Killing Your Performance (2026)'), 'The related gaming-PC mistakes guide is missing.');

console.log(
  'PC gaming graphics-settings SSG validation passed: canonical URL retained, global article body kept free of local promotion, upgraded tuning sections and related guides are present, and BlogPosting/FAQPage structured data is emitted.',
);
