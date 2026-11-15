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

// Keep the indexed URL stable while validating the new global editorial metadata.
assert.ok(
  html.includes('https://www.computerrepairkuwait.com/guides/gaming-pc-not-turning-on-kuwait'),
  'The canonical guide URL is missing or the original slug changed.',
);
assert.ok(
  html.includes('Gaming PC Won’t Turn On? PSU, Power Rails and Motherboard Troubleshooting'),
  'The current global page title is missing from initial HTML.',
);
assert.ok(
  html.includes('Gaming PC dead, clicking off after 1 second, or fans spinning with no POST? Learn how to separate PSU, ATX power-rail, motherboard, short-circuit and display-path faults before replacing components.'),
  'The current global page description is missing from initial HTML.',
);
assert.ok(html.includes('15–18 min read'), 'The expanded guide reading-time label is missing.');
assert.ok(html.includes('November 12, 2026'), 'The visible technical-review date is missing.');
assert.ok(
  html.includes('Hardware Engineer and Technical Reviewer'),
  'The global technical-author description is missing.',
);
assert.ok(
  !html.includes('Lead Hardware Repair Engineer at Kuwait Computer Repair On Call'),
  'The retired Kuwait-specific author biography is still present.',
);
assert.ok(
  !html.includes('property="og:locale"'),
  'The global guide still declares the Kuwait-specific Open Graph locale.',
);

// All core troubleshooting sections must remain visible in the prerendered HTML.
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
const articleStart = html.lastIndexOf('<article', faqHeading);
const articleEnd = html.indexOf('</article>', faqHeading);
assert.ok(articleStart >= 0 && articleEnd > faqHeading, 'The guide article wrapper is missing or malformed.');
const articleHtml = html.slice(articleStart, articleEnd + '</article>'.length);
const faqHtml = html.slice(faqHeading, articleEnd);
const faqQuestions = [
  'Can a gaming PC be repaired if it has no power at all?',
  'Should I replace the PSU first?',
  'Should I keep repeatedly pressing the power button?',
  'What should I send when asking for a diagnosis?',
  'Should I buy a new PSU first if my gaming PC will not turn on?',
  'Why does my gaming PC click once, flash its RGB or fans, and turn right back off?',
  'Can I test the PC by unplugging the graphics card or its power cable?',
  'Could a dead CMOS battery stop a gaming PC from turning on?',
  'Can a graphics card alone prevent a gaming PC from starting?',
  'Will a motherboard or PSU repair erase games and files on my SSD?',
  'What should I do if the PSU shuts down during a startup attempt?',
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
  'Expected eleven complete static FAQ pairs; found ' + visibleFaqItems.length,
);
assert.ok(!/<details\b/i.test(faqHtml), 'The FAQ section is using collapsed disclosures instead of static answers.');
for (const faqItem of visibleFaqItems) {
  assert.ok(faqItem.replace(/<[^>]+>/g, '').trim().length > 80, 'A static FAQ card is empty or incomplete.');
}

// The editorial article itself must not reintroduce Kuwait-local sales or workshop claims.
// The legacy canonical hostname and URL remain intentionally preserved outside the article body.
for (const localOnlyMarker of [
  'Kuwait',
  'Hawalli',
  'KWD',
  '+965',
  'Free pickup and delivery',
  'pickup and delivery',
  'No Fix, No Fee',
  'Al Mullah Complex',
  'repair from 25 KWD',
]) {
  assert.ok(
    !articleHtml.toLowerCase().includes(localOnlyMarker.toLowerCase()),
    'Kuwait-local promotional content remains in the global guide: ' + localOnlyMarker,
  );
}

// Article and FAQ structured data must describe the same eleven visible FAQs.
for (const type of ['TechArticle', 'FAQPage', 'BreadcrumbList']) {
  assert.ok(
    html.includes('"@type":"' + type + '"') || html.includes('"@type": "' + type + '"'),
    'Missing ' + type + ' structured data.',
  );
}
assert.ok(
  html.includes('Hardware Engineer and Technical Reviewer'),
  'Global technical author metadata is missing from the page/schema.',
);
assert.ok(html.includes('KCROC Hardware Engineering Lab'), 'Editorial site attribution is missing.');
assert.ok(html.includes('2026-10-01'), 'The original article publication date is missing from structured data.');
assert.ok(html.includes('2026-11-12'), 'The updated technical review date is missing from structured data.');
const schemaQuestionCount = (html.match(/"@type"\s*:\s*"Question"/g) ?? []).length;
assert.equal(schemaQuestionCount, 11, 'FAQPage JSON-LD must contain the same eleven questions as the static HTML.');

// Verify the article's actual electrical and motherboard diagnostic content.
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
  'Type G',
  'modular PSU cables',
  'The four-stage ATX startup handshake',
]) {
  assert.ok(articleHtml.includes(marker), 'Missing technical diagnostic detail: ' + marker);
}

assert.ok(!/<li\b[^>]*>\s*<\/li>/i.test(html), 'An empty list item remains in the prerendered page.');

console.log(
  'Gaming PC no-power guide SSG validation passed: ' +
    path.relative(process.cwd(), articlePath) +
    ' — global editorial metadata, stable URL, eleven static FAQs, matching FAQPage schema and technical diagnostics.',
);
