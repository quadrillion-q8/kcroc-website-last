import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const dist = path.join(process.cwd(), 'dist');
const htmlPath = path.join(dist, 'guides', 'windows-gaming-performance-stutter-fix.html');
const html = readFileSync(htmlPath, 'utf8');

function sectionBetween(startNeedle, endNeedle) {
  const start = html.indexOf(startNeedle);
  const end = html.indexOf(endNeedle, start + startNeedle.length);
  assert.ok(start >= 0 && end > start, 'Could not locate rendered section: ' + startNeedle);
  return html.slice(start, end);
}

// The FAQ heading must be followed by ten complete, crawlable question/answer pairs.
const faqHtml = sectionBetween('id="faq"', 'id="bottom-line"');
const faqQuestions = [
  'Why does my game stutter when FPS is high?',
  'Does GameBarPresenceWriter.exe cause gaming stutter?',
  'Should I disable Memory Integrity, VBS or Windows services to improve gaming?',
  'Why does stutter get worse after the laptop heats up?',
  'Can DPC latency or a high-polling-rate mouse cause gaming problems?',
  'Can shader compilation cause a hitch?',
  'Should I delete the shader cache?',
  'Can HAGS, V-Sync or VRR fix gaming stutter?',
  'Should I reinstall Windows to fix gaming stutter?',
  'When should I bring a gaming PC or laptop for diagnosis?',
];
for (const question of faqQuestions) {
  assert.ok(faqHtml.includes(question), 'Visible FAQ question missing: ' + question);
}
const visibleFaqItems = faqHtml.match(/<section\b[^>]*>\s*<h3\b[^>]*>[\s\S]*?<\/h3>\s*<p\b[^>]*>[\s\S]*?<\/p>\s*<\/section>/g) ?? [];
assert.equal(visibleFaqItems.length, 10, 'Expected ten complete FAQ pairs in the initial prerendered HTML.');
for (const item of visibleFaqItems) {
  assert.ok(item.replace(/<[^>]+>/g, '').trim().length > 40, 'A prerendered FAQ item is empty or incomplete.');
}
assert.ok(html.includes('"@type":"FAQPage"') || html.includes('"@type": "FAQPage"'), 'FAQPage structured data is missing.');
const schemaQuestionCount = (html.match(/"@type"\s*:\s*"Question"/g) ?? []).length;
assert.equal(schemaQuestionCount, 10, 'FAQPage schema must contain the same ten visible questions.');

// Section 9 must be five real ordered-list items, not separate title/description rows.
const abTestHtml = sectionBetween('id="ab-testing"', 'id="not-game-bar"');
assert.ok(abTestHtml.includes('A controlled gaming-stutter test'), 'The Section 9 subsection heading is missing.');
const abOrderedList = abTestHtml.match(/<ol\b[^>]*>[\s\S]*?<\/ol>/);
assert.ok(abOrderedList, 'Controlled A/B test ordered list is missing.');
const abItems = abOrderedList[0].match(/<li\b[^>]*>[\s\S]*?<\/li>/g) ?? [];
assert.equal(abItems.length, 5, 'A/B testing workflow must have exactly five list items.');
for (const label of ['Baseline', 'One change', 'Repeat', 'Compare', 'Rollback']) {
  assert.ok(abOrderedList[0].includes(label), 'A/B test list step is missing: ' + label);
}
assert.ok(!/<li\b[^>]*>\s*<\/li>/.test(abOrderedList[0]), 'A/B test contains an empty list item.');

// Comparison-table headers must have exactly the same number of columns as the body rows.
const expectedTables = [
  ['FPS versus ideal frame-time', 3],
  ['What the gaming symptom can tell you', 3],
  ['Pattern-based diagnosis', 2],
];
for (const [caption, expectedColumns] of expectedTables) {
  const captionIndex = html.indexOf(caption);
  assert.ok(captionIndex >= 0, 'Comparison table missing: ' + caption);
  const tableStart = html.lastIndexOf('<table', captionIndex);
  const tableEnd = html.indexOf('</table>', captionIndex);
  assert.ok(tableStart >= 0 && tableEnd > captionIndex, 'Could not isolate table: ' + caption);
  const tableHtml = html.slice(tableStart, tableEnd + '</table>'.length);
  const thead = tableHtml.match(/<thead\b[^>]*>([\s\S]*?)<\/thead>/)?.[1] ?? '';
  const firstBodyRow = tableHtml.match(/<tbody\b[^>]*>[\s\S]*?<tr\b[^>]*>([\s\S]*?)<\/tr>/)?.[1] ?? '';
  const headerColumns = (thead.match(/<th\b[^>]*scope="col"/g) ?? []).length;
  const bodyColumns = (firstBodyRow.match(/<(?:th|td)\b/g) ?? []).length;
  assert.equal(headerColumns, expectedColumns, caption + ': wrong number of column headers.');
  assert.equal(bodyColumns, expectedColumns, caption + ': first body row has a different column count.');
  assert.ok(!thead.includes('Feature'), caption + ': phantom Feature header remains.');
}

const dpcHtml = sectionBetween('id="dpc-isr"', 'id="shader-stutter"');
assert.ok(dpcHtml.includes('Microsoft Learn — Introduction to DPCs'), 'DPC introduction source label is missing or generic.');
assert.ok(!dpcHtml.includes('External source'), 'DPC section still contains the generic External source label.');

// The ToC supplies numbering; body headings must not start again at 1–9.
for (const headingId of [
  'measure-frame-time',
  'game-bar-overlays',
  'gpu-bottleneck',
  'cpu-memory',
  'dpc-isr',
  'shader-stutter',
  'windows-graphics',
  'thermal-power',
  'ab-testing',
]) {
  const at = html.indexOf('id="' + headingId + '"');
  assert.ok(at >= 0, 'Missing body heading: ' + headingId);
  const headingStart = html.lastIndexOf('<h2', at);
  const headingEnd = html.indexOf('</h2>', at);
  const headingHtml = html.slice(headingStart, headingEnd + 5);
  assert.ok(!/<h2\b[^>]*>\s*\d+[.)]\s*/.test(headingHtml), 'Body H2 still has manual numbering: ' + headingId);
}

// Related guide list must resolve all four articles, including the standalone GameBar page.
const relatedHeading = html.indexOf('Related Guides');
assert.ok(relatedHeading >= 0, 'Sidebar Related Guides block is missing.');
const sidebarEnd = html.indexOf('</ul>', relatedHeading);
assert.ok(sidebarEnd > relatedHeading, 'Sidebar Related Guides list is missing.');
const sidebarHtml = html.slice(relatedHeading, sidebarEnd + 5);
for (const route of [
  '/guides/windows-gaming-frame-time-stutter',
  '/guides/gamebar-presence-writer-fix',
  '/guides/shader-compilation-stutter-windows',
  '/guides/dpc-latency-gaming-stutter',
]) {
  assert.ok(sidebarHtml.includes('href="' + route + '"'), 'Sidebar guide link missing: ' + route);
}
assert.equal((sidebarHtml.match(/<li\b/g) ?? []).length, 4, 'Sidebar should contain four complete related-guide list items.');
assert.ok(!/<li\b[^>]*>\s*<\/li>/.test(sidebarHtml), 'Sidebar contains a blank list item.');

const relatedArticlesStart = html.indexOf('Related Articles');
assert.ok(relatedArticlesStart >= 0, 'Bottom Related Articles section is missing.');
const relatedArticlesEnd = html.indexOf('</section>', relatedArticlesStart);
const relatedCardsHtml = html.slice(relatedArticlesStart, relatedArticlesEnd);
assert.ok(relatedCardsHtml.includes('href="/guides/gamebar-presence-writer-fix"'), 'GameBar guide is missing from the bottom Related Articles cards.');
assert.ok(relatedCardsHtml.includes('GameBarPresenceWriter.exe: Test Gaming Stutter Safely'), 'Bottom GameBar card has empty or missing anchor text.');

// 2026 Windows 11 technical depth and named tools must remain in the initial HTML.
for (const term of [
  'PresentMon',
  'CapFrameX',
  'MSI Afterburner',
  'RivaTuner Statistics Server',
  '1% low',
  '0.1% low',
  'MsBetweenPresents',
  'MsBetweenDisplayChange',
  '4,000 Hz',
  '1,000 Hz',
  'Hardware-Accelerated GPU Scheduling',
  'HAGS',
  'Auto HDR',
  'flip model',
  'variable refresh rate',
  'Multi-Plane Overlay',
  'MPO',
  'Virtualization-Based Security',
  'HVCI',
  'Virtual Machine Platform',
  'CurrentUsage',
  'Budget',
  'HWiNFO64',
  'PROCHOT',
  'Measurement Tools and Windows 11 Technical References',
]) {
  assert.ok(html.includes(term), 'Missing prerendered technical topic: ' + term);
}
assert.ok(!faqHtml.includes('External source'), 'Generic External source label remains in the FAQ block.');
assert.ok(!abTestHtml.includes('External source'), 'Generic External source label remains in the A/B test block.');
assert.ok(!html.includes('Microsoft Learn — Introduction to DPC objects'), 'Old generic DPC source label remains.');

console.log('Windows gaming stutter pillar SSG validation passed: ten visible FAQs and matching schema, five A/B list items, three aligned tables, consistent heading numbering, four complete related guides, and 2026 Windows 11 technical coverage.');
