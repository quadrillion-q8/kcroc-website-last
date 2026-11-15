import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const dist = path.join(process.cwd(), 'dist');
const candidates = [
  path.join(dist, 'guides', 'gaming-pc-not-turning-on-kuwait.html'),
  path.join(dist, 'guides', 'gaming-pc-not-turning-on-kuwait', 'index.html'),
];
const articlePath = candidates.find((candidate) => existsSync(candidate));
assert.ok(articlePath, 'Gaming PC no-power guide SSG validation failed: expected prerendered output.');
const html = readFileSync(articlePath, 'utf8');

assert.ok(
  html.includes('https://www.computerrepairkuwait.com/guides/gaming-pc-not-turning-on-kuwait'),
  'The canonical guide URL is missing or the original slug changed.',
);
assert.ok(
  html.includes('Gaming PC Won’t Turn On? PSU, Power Rails and Motherboard Troubleshooting'),
  'The global article title is missing from initial HTML.',
);
assert.ok(
  html.includes('Learn how to separate PSU, ATX power-rail, motherboard, short-circuit and display-path faults'),
  'The global article description is missing from initial HTML.',
);
assert.ok(html.includes('15–18 min read'), 'The expanded guide reading-time label is missing.');
assert.ok(html.includes('November 9, 2026'), 'The visible technical-review date is missing.');
assert.ok(html.includes('Hardware Engineer and technical reviewer'), 'The neutral technical reviewer byline is missing.');

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
  'Can a graphics card alone prevent a gaming PC from starting?',
  'Will a motherboard or PSU repair erase games and files on my SSD?',
  'What should I do if the PSU shuts down during a startup attempt?',
];
for (const question of faqQuestions) {
  assert.ok(faqHtml.includes(question), 'FAQ question missing from prerendered HTML: ' + question);
}
const visibleFaqItems = faqHtml.match(
  /<section\\b[^>]*>\\s*<h3\\b[^>]*>[\\s\\S]*?<\\/h3>\\s*<p\\b[^>]*>[\\s\\S]*?<\\/p>\\s*<\\/section>/g,
) ?? [];
assert.equal(visibleFaqItems.length, 11, 'Expected eleven complete static FAQ pairs; found ' + visibleFaqItems.length);
assert.ok(!/<details\\b/i.test(faqHtml), 'The FAQ section is using collapsed disclosures instead of static answers.');
for (const faqItem of visibleFaqItems) {
  assert.ok(faqItem.replace(/<[^>]+>/g, '').trim().length > 80, 'A static FAQ card is empty or incomplete.');
}

for (const type of ['TechArticle', 'FAQPage', 'BreadcrumbList']) {
  assert.ok(html.includes('"@type":"' + type + '"') || html.includes('"@type": "' + type + '"'), 'Missing ' + type + ' structured data.');
}
assert.ok(html.includes('"reviewedBy"'), 'Technical reviewer metadata is missing.');
assert.ok(html.includes('Hardware Engineer and Technical Reviewer'), 'Neutral reviewer schema metadata is missing.');
assert.ok(html.includes('2026-10-01'), 'The original article publication date is missing from structured data.');
assert.ok(html.includes('2026-11-09'), 'The technical review date is missing from structured data.');
const schemaQuestionCount = (html.match(/"@type"\\s*:\\s*"Question"/g) ?? []).length;
assert.equal(schemaQuestionCount, 11, 'FAQPage JSON-LD must contain the same eleven questions as the static HTML.');

for (const marker of [
  '+5VSB', 'PS_ON#', 'PWR_OK', 'DrMOS', 'SPS', 'Super I/O',
  'RSMRST#', 'SLP_S3#', 'SCP', 'OCP', 'OPP', 'modular PSU cables',
]) {
  assert.ok(html.includes(marker), 'Missing technical diagnostic detail: ' + marker);
}

const articleStart = html.indexOf('<article');
const articleEndTag = html.indexOf('</article>', articleStart);
assert.ok(articleStart >= 0 && articleEndTag > articleStart, 'Article content wrapper is missing.');
const articleHtml = html.slice(articleStart, articleEndTag + '</article>'.length);
for (const forbidden of [
  /Hawalli/i,
  /Kuwait/i,
  /pickup|pick-up|delivery/i,
  /KWD|\\bKD\\b/i,
  /No Fix, No Fee/i,
  /30-day (?:parts-and-labour )?warranty/i,
  /\\+965|wa\\.me|tel:/i,
  /KCROC/i,
  /href="\\/(?:gaming-pc-repair-kuwait|motherboard-repair-kuwait|contact|book)/i,
]) {
  assert.ok(!forbidden.test(articleHtml), 'Global editorial article contains a local business or sales trace: ' + forbidden);
}
assert.ok(!/<li\\b[^>]*>\\s*<\\/li>/i.test(articleHtml), 'An empty list item remains in the prerendered page.');

console.log('Gaming PC no-power SSG validation passed: canonical URL, 11 visible FAQ answers and schema, board-level troubleshooting, safety guidance and global editorial scope.');
