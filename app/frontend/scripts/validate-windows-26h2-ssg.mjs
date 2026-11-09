import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const articlePath = path.join(
  process.cwd(),
  'dist',
  'news',
  'windows-11-26h2-iso-released.html',
);

let html;
try {
  html = readFileSync(articlePath, 'utf8');
} catch {
  throw new Error(
    'Windows 11 26H2 SSG validation failed: expected prerendered page at ' +
      articlePath,
  );
}

const faqStart = html.indexOf('id="faq"');
const officialSourcesStart = html.indexOf('id="official-sources"', faqStart);
assert.ok(faqStart >= 0, 'Windows 11 26H2 FAQ heading is missing from prerendered HTML');
assert.ok(
  officialSourcesStart > faqStart,
  'Official Microsoft Sources should follow the FAQ block',
);

const visibleFaq = html.slice(faqStart, officialSourcesStart);
const addedQuestions = [
  'What is the difference between the Windows 11 26H2 enablement package and the full ISO?',
  'Will installing the Windows 11 26H2 ISO delete my files?',
  'Why does my NVMe SSD disappear during Windows 11 26H2 clean-install setup?',
  'Why does Windows 11 26H2 ask for a BitLocker recovery key after a BIOS update?',
  'Can I use the standard Windows 11 26H2 x64 ISO on a Snapdragon X Elite or other Arm laptop?',
  'How much free disk space should I have before installing Windows 11 26H2?',
  'What does error 0xC1900101 mean during a Windows 11 26H2 upgrade?',
  'Should I bring my laptop for diagnosis if Windows 11 26H2 setup keeps freezing?',
];

for (const question of addedQuestions) {
  assert.ok(
    visibleFaq.includes(question),
    'Added FAQ question is missing from the initial static HTML: ' + question,
  );
}

const visibleQuestionCount = (visibleFaq.match(/<h3\b/gi) ?? []).length;
assert.equal(
  visibleQuestionCount,
  20,
  'Expected 20 visible FAQ question headings in static HTML; found ' + visibleQuestionCount,
);
assert.ok(
  !/<details\b/i.test(visibleFaq),
  'The 26H2 FAQ should be statically visible, not hidden in disclosure elements',
);

const faqSchemaQuestionCount = (html.match(/"@type"\s*:\s*"Question"/g) ?? []).length;
assert.equal(
  faqSchemaQuestionCount,
  20,
  'FAQPage JSON-LD should contain the same 20 FAQ questions',
);
assert.ok(html.includes('"@type":"FAQPage"') || html.includes('"@type": "FAQPage"'), 'FAQPage JSON-LD is missing');
assert.ok(html.includes('"TechArticle"') && html.includes('"NewsArticle"'), 'NewsArticle/TechArticle JSON-LD types are missing');
assert.ok(html.includes('reviewedBy'), 'Technical reviewer reference is missing from JSON-LD');
assert.ok(
  html.includes('https://www.computerrepairkuwait.com/#business'),
  'Canonical KCROC business entity reference is missing',
);

const decisionStart = html.indexOf('id="decision-tree"');
assert.ok(decisionStart >= 0, 'Seven-step installation decision tree is missing');
const decisionTree = html.slice(decisionStart, faqStart);
const stepCount = (decisionTree.match(/<li\b/gi) ?? []).length;
assert.equal(stepCount, 7, 'Expected exactly seven semantic decision-tree steps; found ' + stepCount);
assert.ok(
  /<ol[^>]*list-none/i.test(decisionTree),
  'Decision tree should suppress default markers so custom step badges do not duplicate numbering',
);

assert.ok((html.match(/<table[\s>]/gi) ?? []).length >= 5, 'Expected the four existing comparison tables plus the setup error-code matrix');
assert.ok(html.includes('Common Windows 11 26H2 Setup and Update Error Codes'), 'Setup error-code matrix caption is missing');
for (const code of [
  '0xC1900101',
  '0x80070070',
  '0xC1900200 / 0xC1900202',
  '0x80070002 / 0x80070003',
  '0x8007025D / 0x80070570',
]) {
  assert.ok(html.includes(code), 'Setup error code missing from prerendered HTML: ' + code);
}

for (const command of [
  'Get-FileHash -Path $iso -Algorithm SHA256',
  'DISM.exe /Online /Cleanup-Image /RestoreHealth',
  'sfc /scannow',
]) {
  assert.ok(html.includes(command), 'PowerShell verification command missing from prerendered HTML: ' + command);
}
assert.ok(html.includes('Intel Rapid Storage Technology (IRST/VMD)'), 'Intel VMD/IRST installation note is missing');
assert.ok(
  html.includes('canonical') &&
    html.includes('https://www.computerrepairkuwait.com/news/windows-11-26h2-iso-released'),
  'The existing canonical article URL is missing',
);

for (const route of [
  '/guides/ssd-not-detected-windows-11',
  '/gaming-pc-repair-kuwait',
  '/guides/why-is-my-laptop-so-hot',
  '/guides/windows-11-update-problems',
  '/blog/windows-11-100-disk-usage-causes-solutions',
  '/guides/bios-uefi-recovery-kuwait',
]) {
  assert.ok(html.includes(route), 'Existing contextual internal route is missing: ' + route);
}

const relatedServicesStart = html.indexOf('id="graph-related-services"');
assert.ok(relatedServicesStart >= 0, 'Graph-connected KCROC service-card section is missing');
const relatedServicesEnd = html.indexOf('</section>', relatedServicesStart);
assert.ok(relatedServicesEnd > relatedServicesStart, 'KCROC service-card section is not closed');
const relatedServicesHtml = html.slice(relatedServicesStart, relatedServicesEnd);
for (const serviceRoute of [
  '/laptop-repair-kuwait',
  '/ssd-ram-upgrade-kuwait',
  '/motherboard-repair-kuwait',
  '/gaming-pc-repair-kuwait',
]) {
  assert.ok(
    relatedServicesHtml.includes(`href="${serviceRoute}"`),
    'Graph-connected KCROC service card is missing: ' + serviceRoute,
  );
}

assert.ok(
  html.includes('Windows 11 26H2 ISO Download, Clean Install &amp; Hardware Guide') ||
    html.includes('Windows 11 26H2 ISO Download, Clean Install & Hardware Guide'),
  'Updated SEO title is missing from the rendered page',
);
assert.ok(html.includes('max-image-preview:large'), 'Discover preview robots directive is missing');

console.log(
  'Windows 11 26H2 SSG validation passed: 20 visible FAQ answers and matching FAQPage JSON-LD, seven semantic decision-tree steps, five comparison tables, setup error codes, PowerShell checks, Intel VMD guidance, canonical URL and internal links are present in prerendered HTML.',
);
