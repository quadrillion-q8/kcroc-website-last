import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const dist = path.join(process.cwd(), 'dist');
const candidates = [
  path.join(dist, 'guides', 'bios-uefi-recovery-kuwait.html'),
  path.join(dist, 'guides', 'bios-uefi-recovery-kuwait', 'index.html'),
];
const articlePath = candidates.find((candidate) => existsSync(candidate));
assert.ok(articlePath, 'BIOS/UEFI SSG validation failed: prerendered route HTML was not found.');
const html = readFileSync(articlePath, 'utf8');

assert.ok(html.includes('https://www.computerrepairkuwait.com/guides/bios-uefi-recovery-kuwait'), 'Original canonical guide URL is missing or changed.');
assert.ok(html.includes('November 13, 2026'), 'Visible technical-review date is missing.');
assert.ok(html.includes('"reviewedBy"'), 'TechArticle reviewer metadata is missing.');
assert.ok(html.includes('SPI NOR Flash Memory'), 'TechArticle about entities are missing.');
assert.ok(html.includes('1.8V vs 3.3V SPI flash'), 'TechArticle keyword metadata is missing.');

for (const heading of [
  'Post-Update False Bricks: When a Successful BIOS Update Looks Like a Dead Board',
  'Inside the SPI Flash Image: Regions, Capsule Data and Exact Binary Sizes',
  'The UEFI Capsule Header Trap',
  '8-Pin SPI NOR Flash Reference',
  '1.8V vs 3.3V: verify the exact chip before connecting a programmer',
]) assert.ok(html.includes(heading), 'Missing static BIOS/UEFI content: ' + heading);

for (const marker of [
  'DDR5', 'INACCESSIBLE_BOOT_DEVICE', 'Intel VMD', 'UEFI Graphics Output Protocol',
  'BitLocker', 'Intel Flash Descriptor', 'Intel CSME', 'AMD PSP', 'NVRAM EFI variables',
  'DMI/SMBIOS', '8,388,608', '16,777,216', '33,554,432', '67,108,864',
  'W25Q128JV', 'W25Q128JW', '1.7–1.95 V', '2.7–3.6 V', 'CapsuleImageSize',
  'HeaderSize', 'SOIC-8', 'WSON-8',
]) assert.ok(html.includes(marker), 'Missing technical reference marker: ' + marker);

const faqStart = html.indexOf('<section id="faq"');
assert.ok(faqStart >= 0, 'FAQ section is missing from initial HTML.');
const faqEnd = html.indexOf('</section>', faqStart);
assert.ok(faqEnd > faqStart, 'FAQ section did not close in initial HTML.');
const faqHtml = html.slice(faqStart, faqEnd + '</section>'.length);
const details = [...faqHtml.matchAll(/<details\b[^>]*>([\s\S]*?)<\/details>/gi)];
assert.equal(details.length, 18, 'Expected all eighteen native FAQ items in initial HTML.');
const strip = (value) => value.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
for (const [index, match] of details.entries()) {
  const question = match[1].match(/<summary\b[^>]*>([\s\S]*?)<\/summary>/i)?.[1] ?? '';
  const answer = match[1].match(/<p\b[^>]*>([\s\S]*?)<\/p>/i)?.[1] ?? '';
  assert.ok(strip(question).length > 15, 'FAQ ' + (index + 1) + ' has no complete question.');
  assert.ok(strip(answer).length > 70, 'FAQ ' + (index + 1) + ' has no complete answer.');
}
const schemaQuestionCount = (html.match(/"@type"\s*:\s*"Question"/g) ?? []).length;
assert.equal(schemaQuestionCount, 18, 'FAQPage JSON-LD must contain all eighteen questions.');

assert.equal((html.match(/aria-label="Table of contents"/g) ?? []).length, 1, 'Expected one labelled Table of Contents landmark.');
assert.ok(html.includes('list-none'), 'Custom visual counters/checklists must suppress native list markers.');
assert.ok(!/<li\b[^>]*>\s*<\/li>/i.test(html), 'An empty list item remains in the prerendered page.');

for (const sourceUrl of [
  'https://www.kingston.com/en/support/technical/products/gaming-memory',
  'https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/bug-check-0x7b--inaccessible-boot-device',
  'https://uefi.org/specs/UEFI/2.11/08_Services_Runtime_Services.html',
  'https://www.winbond.com/hq/product/code-storage-flash/qspi-nor/w25q-jv/',
  'https://www.winbond.com/hq/product/code-storage-flash/qspi-nor/w25q-jw/',
]) assert.ok(html.includes(sourceUrl), 'Missing official technical reference: ' + sourceUrl);

console.log('BIOS/UEFI guide SSG validation passed: single TOC, false-brick matrix, SPI image/capsule/sizing/pinout/voltage detail, eighteen complete static FAQs and matching FAQPage schema.');
