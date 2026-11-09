import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const outputDir = path.join(process.cwd(), 'dist');
const articlePath = path.join(outputDir, 'guides', 'ssd-not-detected-windows-11.html');
const sitemapPath = path.join(outputDir, 'sitemap.xml');

let html;
try {
  html = readFileSync(articlePath, 'utf8');
} catch {
  throw new Error('SSD guide SSG validation failed: expected prerendered page at ' + articlePath);
}

for (const heading of [
  '60-Second Quick Answer: Where Does the SSD Disappear?',
  'How We Diagnose an SSD Detection Problem',
  'Step 1: Identify Exactly Where the SSD Is Missing',
  'Step 2: Check BIOS/UEFI Before Troubleshooting Windows',
  'Step 3: Verify Physical Installation and M.2 Compatibility',
  'Step 4: Inspect Windows 11 Disk Management',
  'Step 5: Understand Unallocated, Offline, RAW and Not Initialized States',
  'Step 6: Check Device Manager, Storage Controllers and Storage Spaces',
  'Step 7: Check OEM Drivers, BIOS and SSD Firmware Carefully',
  'Step 8: Treat a Previously Working SSD That Suddenly Disappears Differently',
  'Step 9: Isolate the SSD from the Computer\'s Slot or Controller',
  'Frequently Asked Questions',
  'Official Technical References',
]) {
  assert.ok(html.includes(heading), 'Expected heading missing from prerendered SSD guide: ' + heading);
}

for (const technicalTerm of [
  'diskmgmt.msc',
  'Intel Volume Management Device (VMD)',
  'iaStorVD',
  'stornvme',
  'Event ID 129',
  'Event ID 153',
  'Event ID 157',
  'M.2 SATA',
  'NVM Express',
]) {
  assert.ok(html.includes(technicalTerm), 'Technical detail missing from prerendered SSD guide: ' + technicalTerm);
}

const faqQuestions = [
  'Why does my new SSD appear in BIOS but not in File Explorer?',
  'Why is my SSD visible in BIOS but missing from Disk Management?',
  'Why can Windows Setup not see my NVMe SSD?',
  'Can I initialize an SSD that already contains files?',
  'Will assigning a drive letter erase the files on my SSD?',
  'Does an M.2 SSD that physically fits the slot have to be compatible?',
  'Do Event ID 129 or 153 mean that my SSD is failing?',
  'Does detecting my SSD in a USB enclosure prove that it is healthy?',
];

for (const question of faqQuestions) {
  assert.ok(html.includes(question), 'FAQ answer is missing from the initial prerendered HTML: ' + question);
}

const faqSchemaCount = (html.match(/"@type"\s*:\s*"Question"/g) ?? []).length;
assert.equal(faqSchemaCount, faqQuestions.length, 'FAQPage schema should match the eight visible FAQ items.');
assert.ok(html.includes('"@type":"TechArticle"') || html.includes('"@type": "TechArticle"'), 'TechArticle JSON-LD is missing.');
assert.ok(html.includes('"@type":"BreadcrumbList"') || html.includes('"@type": "BreadcrumbList"'), 'BreadcrumbList JSON-LD is missing.');
assert.ok(html.includes('"@type":"FAQPage"') || html.includes('"@type": "FAQPage"'), 'FAQPage JSON-LD is missing.');
assert.ok(html.includes('Solid-state drive') && html.includes('Intel Volume Management Device (VMD)'), 'SSD-specific TechArticle entities are missing.');

assert.ok((html.match(/<table[\s>]/gi) ?? []).length >= 6, 'Expected the SSD guide triage and diagnostic comparison tables.');
assert.ok(html.includes('role="region"') && html.includes('tabindex="0"'), 'Comparison tables should be wrapped in a keyboard-focusable scroll region.');

const articleMatch = html.match(/<article\b[\s\S]*?<\/article>/i);
assert.ok(articleMatch, 'The prerendered SSD guide article element is missing.');
const articleHtml = articleMatch[0];
for (const localPromo of ['Hawalli, Kuwait', 'Free Pick &amp; Drop', 'No Fix, No Fee', 'Book Repair']) {
  assert.ok(!articleHtml.includes(localPromo), 'Global editorial SSD guide unexpectedly contains local promotion: ' + localPromo);
}
assert.ok(!articleHtml.includes('Data Recovery</'), 'The global SSD guide should not imply that KCROC offers data recovery.');

if (existsSync(sitemapPath)) {
  const sitemap = readFileSync(sitemapPath, 'utf8');
  const routeEntry = sitemap.match(/<url>[\s\S]*?<loc>https:\/\/www\.computerrepairkuwait\.com\/guides\/ssd-not-detected-windows-11<\/loc>[\s\S]*?<\/url>/);
  assert.ok(routeEntry, 'The generated sitemap must retain the existing SSD guide URL.');
  assert.ok(routeEntry[0].includes('<lastmod>2026-11-09T23:00:00.000Z'), 'Generated sitemap lastmod should represent the November 10 Kuwait review date without a future UTC timestamp.');
} else {
  throw new Error('SSD guide SSG validation failed: generated dist/sitemap.xml is missing.');
}

console.log('SSD guide SSG validation passed: nine-step content, visible FAQs, TechArticle/FAQ/Breadcrumb schema, accessible tables, global editorial scope and sitemap freshness.');
