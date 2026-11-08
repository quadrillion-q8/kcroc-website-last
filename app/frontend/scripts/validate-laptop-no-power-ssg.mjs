import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const articlePath = path.join(process.cwd(), 'dist', 'guides', 'laptop-wont-turn-on.html');

let html;
try {
  html = readFileSync(articlePath, 'utf8');
} catch {
  throw new Error('Laptop no-power guide SSG validation failed: expected prerendered page at ' + articlePath);
}

assert.ok(
  html.includes('https://www.computerrepairkuwait.com/guides/laptop-wont-turn-on'),
  'The existing canonical guide URL is missing from the prerendered page',
);

const faqStart = html.indexOf('id="faq"');
const bottomLineStart = html.indexOf('id="bottom-line"', faqStart);
assert.ok(faqStart >= 0, 'Visible FAQ heading is missing from prerendered HTML');
assert.ok(bottomLineStart > faqStart, 'Bottom Line should follow the FAQ section');

const visibleFaq = html.slice(faqStart, bottomLineStart);
const expectedQuestions = [
  'Why is my laptop completely dead even when plugged in?',
  'Can a dead battery stop a laptop from turning on?',
  'Why does my charger light turn off when I plug it into the laptop?',
  'My laptop has lights and fan noise but no picture. Is that a no-power fault?',
  'Can I use a phone USB-C charger to test my laptop?',
  'Will holding the power button for 30 seconds fix a dead laptop?',
  'Could BIOS corruption make a laptop look dead?',
  "Is a laptop that won't turn on automatically a motherboard replacement?",
  'Are laptop reset steps and blink codes the same across every model from one brand?',
  'What details should I send KCROC before arranging a no-power pickup?',
];

for (const question of expectedQuestions) {
  assert.ok(visibleFaq.includes(question), 'FAQ question missing from static HTML: ' + question);
}

const faqDetailsCount = (visibleFaq.match(/<details\b/gi) ?? []).length;
assert.equal(faqDetailsCount, 10, 'Expected 10 native FAQ disclosures in static HTML, found ' + faqDetailsCount);
assert.ok(
  visibleFaq.includes('The fault may be in the charging port, battery, input protection/charging circuit or motherboard power rails'),
  'The first FAQ answer is missing from the static HTML',
);
assert.ok(
  visibleFaq.includes('Use the exact laptop model or product number and its current support page or service manual'),
  'The model-specific reset and blink-code FAQ answer is missing',
);

assert.ok(html.includes('"@type":"TechArticle"') || html.includes('"@type": "TechArticle"'), 'TechArticle JSON-LD is missing');
assert.ok(html.includes('"@type":"FAQPage"') || html.includes('"@type": "FAQPage"'), 'FAQPage JSON-LD is missing');
assert.ok(html.includes('"reviewedBy"') || html.includes('reviewedBy'), 'Technical reviewer metadata is missing');
assert.ok(html.includes('2026-11-09'), 'Technical review date is missing from rendered metadata/schema');
const faqSchemaQuestionCount = (html.match(/"@type":"Question"/g) ?? []).length;
assert.equal(faqSchemaQuestionCount, 10, 'FAQPage JSON-LD should contain the same 10 questions as the visible FAQ');

for (const marker of [
  'id="charger-power-delivery"',
  'id="oem-reset-procedures"',
  'id="black-screen-checks"',
  'id="oem-blink-codes"',
  'id="board-power-on-path"',
  'id="bench-current-signatures"',
  'PPBUS_G3H',
  'RSMRST#',
  'SLP_S5#',
]) {
  assert.ok(html.includes(marker), 'Technical section or platform-specific power term missing: ' + marker);
}

for (const sourceUrl of [
  'https://www.dell.com/support/kbdoc/en-ie/000125880/how-to-reset-real-time-clock-rtc-to-recover-your-dell-portable-system',
  'https://support.hp.com/nz-en/document/ish_3932413-2337994-16',
  'https://support.hp.com/mx-es/document/ish_1997719-1528356-16',
  'https://www.asus.com/support/faq/1050239/',
  'https://download.lenovo.com/manual/thinkpad_p1_gen8_t1g_gen8/user_guide/en/Overview.html',
  'https://support.apple.com/en-gb/102623',
]) {
  assert.ok(html.includes(sourceUrl), 'Official OEM reference is missing: ' + sourceUrl);
}

const triageHeading = html.indexOf('Still dead? Book a free component-level no-power diagnosis');
const legacyCta = html.indexOf('Is Your Laptop Running Slow?');
assert.ok(triageHeading >= 0, 'Contextual no-power triage is missing from static HTML');
assert.ok(legacyCta > triageHeading, 'The existing general CTA should remain after the new no-power triage block');
assert.ok(/https:\/\/wa\.me\/\d+/i.test(html), 'The prerendered no-power triage WhatsApp link is missing');
assert.ok(html.includes('Book free pickup'), 'Free-pickup booking link is missing from triage');
assert.ok(html.includes('Stop applying power'), 'The safety warning should be visible in the initial static HTML');

const numberedToCCount = (html.match(/class="m-0 list-decimal/g) ?? []).length;
assert.equal(numberedToCCount, 2, 'Both mobile and desktop tables of contents should use ordered lists');

console.log('Laptop no-power SSG validation passed: canonical URL, 10 visible FAQ answers, TechArticle/FAQPage schema, OEM source links, board-level guidance, ordered ToC and contextual triage are present in prerendered HTML.');
