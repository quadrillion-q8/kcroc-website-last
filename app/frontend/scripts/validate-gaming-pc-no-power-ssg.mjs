import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const dist = path.join(process.cwd(), 'dist');
const candidates = [
  path.join(dist, 'guides', 'gaming-pc-not-turning-on-kuwait.html'),
  path.join(dist, 'guides', 'gaming-pc-not-turning-on-kuwait', 'index.html'),
];
const articlePath = candidates.find((candidate) => existsSync(candidate));
assert.ok(
  articlePath,
  'Gaming PC no-power guide SSG validation failed: expected prerendered .html or /index.html output.',
);
const html = readFileSync(articlePath, 'utf8');

assert.ok(
  html.includes('https://www.computerrepairkuwait.com/guides/gaming-pc-not-turning-on-kuwait'),
  'The canonical guide URL is missing or the original slug changed.',
);
assert.ok(
  html.includes('Gaming PC Won’t Turn On? Power, PSU') &&
    html.includes('Motherboard Troubleshooting in Kuwait | KCROC'),
  'The updated page title is missing from initial HTML.',
);
assert.ok(
  html.includes('Gaming PC dead, clicking off after 1 second, or fans spinning with no POST? Follow Imran Natiq'),
  'The updated page description is missing from initial HTML.',
);
assert.ok(html.includes('15–18 min read'), 'The expanded guide reading-time label is missing.');
assert.ok(html.includes('November 12, 2026'), 'The visible technical-review date is missing.');
assert.ok(
  html.includes('KCROC Hardware Engineering Lab, Hawalli, Kuwait'),
  'The Hawalli technical-review location is missing.',
);

// All original section headings must remain visible.
for (const heading of [
  'First: Which “won’t turn on” problem do you actually have?',
  'Safe checks you can do before repair',
  'What can cause a gaming PC to be completely dead?',
  'When a PSU is the problem',
  'When the motherboard is the problem',
  'When it is actually a no-display problem',
  'Avoid repeated part swapping',
  'When controlled hardware diagnosis is needed',
  'Frequently asked questions',
]) {
  assert.ok(html.includes(heading), 'An existing guide heading is missing: ' + heading);
}

// The FAQ block must be visible as complete question/answer pairs in static HTML.
const faqHeading = html.indexOf('id="faq"');
assert.ok(faqHeading >= 0, 'Visible FAQ heading is missing.');
const articleEnd = html.indexOf('</article>', faqHeading);
const faqHtml = html.slice(faqHeading, articleEnd > faqHeading ? articleEnd : undefined);
const faqQuestions = [
  'Can a gaming PC be repaired if it has no power at all?',
  'Should I replace the PSU first?',
  'Should I keep repeatedly pressing the power button?',
  'What should I send when asking for a diagnosis?',
  'Should I buy a new PSU first if my gaming PC will not turn on?',
  'Why does my gaming PC click once, flash its RGB or fans, and turn right back off?',
  'Can I test the PC by unplugging the graphics card or its power cable?',
  'Could a dead CMOS battery stop a gaming PC from turning on?',
  'Do you repair a standalone graphics card if it is causing the short circuit?',
  'Will a motherboard or PSU repair erase games and files on my SSD?',
  'How does free pickup and delivery work for a heavy gaming PC in Kuwait?',
];
for (const question of faqQuestions) {
  assert.ok(faqHtml.includes(question), 'FAQ question missing from prerendered HTML: ' + question);
}
const visibleFaqItems = faqHtml.match(
  /<section\b[^>]*>\s*<h3\b[^>]*>[\s\S]*?<\/h3>\s*<p\b[^>]*>[\s\S]*?<\/p>\s*<\/section>/g,
) ?? [];
assert.equal(
  visibleFaqItems.length,
  11,
  'Expected eleven complete static FAQ pairs (four original plus eight added); found ' + visibleFaqItems.length,
);
assert.ok(!/<details\b/i.test(faqHtml), 'The FAQ section is using collapsed disclosures instead of static answers.');
for (const faqItem of visibleFaqItems) {
  assert.ok(faqItem.replace(/<[^>]+>/g, '').trim().length > 80, 'A static FAQ card is empty or incomplete.');
}

// Article and FAQ structured data must describe the same eleven visible FAQs.
for (const type of ['TechArticle', 'FAQPage', 'BreadcrumbList']) {
  assert.ok(
    html.includes('"@type":"' + type + '"') || html.includes('"@type": "' + type + '"'),
    'Missing ' + type + ' structured data.',
  );
}
assert.ok(html.includes('"reviewedBy"'), 'Technical reviewer metadata is missing.');
assert.ok(html.includes('Lead Hardware Repair Engineer'), 'Lead Hardware Repair Engineer is missing from the schema/byline.');
assert.ok(html.includes('KCROC Hardware Engineering Lab'), 'KCROC lab attribution is missing from the page/schema.');
assert.ok(html.includes('2026-10-01'), 'The original article publication date is missing from structured data.');
assert.ok(html.includes('2026-11-12'), 'The updated technical review date is missing from structured data.');
const schemaQuestionCount = (html.match(/"@type"\s*:\s*"Question"/g) ?? []).length;
assert.equal(schemaQuestionCount, 11, 'FAQPage JSON-LD must contain the same eleven questions as the static HTML.');

// Engineering and Kuwait-specific checks must survive prerendering.
for (const marker of [
  '+5VSB',
  'PS_ON#',
  'PWR_OK',
  'DrMOS',
  'SPS',
  'Super I/O',
  'RSMRST#',
  'SLP_S3#',
  'SCP',
  'OCP',
  'OPP',
  '12VHPWR',
  '12V-2x6',
  'Type G',
  'BS 1363',
  '240V / 50Hz',
  'Kuwait dust and humidity',
  'modular PSU cables',
  'Do not assume every PC cord must use a 13A fuse',
]) {
  assert.ok(html.includes(marker), 'Missing technical / local diagnostic detail: ' + marker);
}

// Conversion and scope guardrails.
for (const phrase of [
  'FREE initial diagnostic',
  'repair from 25 KWD',
  'No Fix, No Fee',
  '30-day parts-and-labour warranty',
  'Free pickup and delivery',
  'Al Mullah Complex, Basement Shop 19',
  '+965 55301913',
  'does not accept loose standalone graphics cards',
  'does not offer custom PC building',
  'does not sell standalone data-recovery services',
]) {
  assert.ok(html.includes(phrase), 'Missing KCROC service term or scope guardrail: ' + phrase);
}

// Required contextual internal links and verified related-guide route.
for (const expected of [
  'href="/gaming-pc-repair-kuwait"',
  'href="/motherboard-repair-kuwait"',
  'href="https://www.computerrepairkuwait.com/guides/gaming-pc-black-screen-no-display-kuwait"',
  'href="/guides/bios-uefi-recovery-kuwait"',
]) {
  assert.ok(html.includes(expected), 'Required internal or related-guide destination is missing: ' + expected);
}
assert.ok(
  html.includes('Gaming PC Won’t Boot After a BIOS Update: Kuwait Recovery Guide'),
  'The second related-guide sidebar entry is missing its verified BIOS recovery title.',
);
assert.ok(!/<li\b[^>]*>\s*<\/li>/i.test(html), 'An empty list item remains in the prerendered page.');

console.log(
  'Gaming PC no-power guide SSG validation passed: ' +
    path.relative(process.cwd(), articlePath) +
    ' — 12 static FAQs, matching FAQPage schema, technical sections, internal links and KCROC scope terms.',
);
