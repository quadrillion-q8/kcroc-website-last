import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const candidates = [
  path.join(process.cwd(), 'dist', 'location', 'hawalli.html'),
  path.join(process.cwd(), 'dist', 'location', 'hawalli', 'index.html'),
];
const file = candidates.find(existsSync);
assert.ok(file, 'Hawalli SSG validation failed: prerendered /location/hawalli was not found');

const html = readFileSync(file, 'utf8');
const canonicalUrl = 'https://www.computerrepairkuwait.com/location/hawalli';

assert.ok(html.includes(canonicalUrl), 'Existing Hawalli canonical URL is missing');
assert.ok(html.includes('Computer Repair in') && html.includes('Hawalli, Kuwait'), 'Hawalli page heading is missing');
assert.equal((html.match(/<h1\b/g) ?? []).length, 1, 'Hawalli page must retain exactly one H1');
assert.ok(html.includes('Open daily 10:00 AM'), 'Graph-driven daily opening hours are missing');
assert.ok(html.includes('"Friday"') && /"opens"\s*:\s*"10:00"/.test(html) && /"closes"\s*:\s*"22:00"/.test(html), 'Friday 10:00–22:00 opening-hours schema is missing');

const faqListStart = html.indexOf('data-hawalli-faq-list="true"');
assert.ok(faqListStart >= 0, 'Hawalli visible FAQ list marker is missing');
const faqDetails = html.match(/<details\b[^>]*data-hawalli-faq-item="true"[^>]*>/g) ?? [];
assert.equal(faqDetails.length, 12, 'Expected exactly twelve Hawalli FAQ details elements');
const openFaqDetails = faqDetails.filter((tag) => /\bopen(?:=""|="true")?(?=\s|>)/.test(tag));
assert.equal(openFaqDetails.length, 12, 'All twelve Hawalli FAQ answers must be open and visible in the prerendered HTML');

const faqAnswers = [...html.matchAll(/<p\b[^>]*data-hawalli-faq-answer="true"[^>]*>([\s\S]*?)<\/p>/g)];
assert.equal(faqAnswers.length, 12, 'Each Hawalli FAQ must prerender one answer paragraph');
for (const [, answerHtml] of faqAnswers) {
  const answerText = answerHtml.replace(/<[^>]+>/g, '').trim();
  assert.ok(answerText.length > 40, 'A prerendered Hawalli FAQ answer is empty or incomplete');
}
assert.equal((html.match(/"@type"\s*:\s*"Question"/g) ?? []).length, 12, 'FAQPage JSON-LD must contain the same twelve questions');

const priceCards = html.match(/data-hawalli-pricing-card="true"/g) ?? [];
assert.equal(priceCards.length, 6, 'Expected six visible Hawalli lab pricing cards');
for (const marker of [
  'data-hawalli-price="diagnostic"',
  'data-hawalli-price="motherboard"',
  'data-hawalli-price="macbook"',
  'data-hawalli-price="battery"',
  'data-hawalli-price="keyboard"',
  'data-hawalli-price="screen"',
  'Motherboard repair',
  'From 25 KWD',
  '25–60 KWD',
  'Selected MacBook work',
  '45–100+ KWD',
  '8 KWD',
  '10 KWD',
  '30 KWD',
]) assert.ok(html.includes(marker), 'Missing Hawalli pricing marker: ' + marker);

assert.ok(html.includes('data-hawalli-curbside-handover="true"'), 'Conditional curbside handover instructions are missing');
assert.ok(html.includes('subject to team confirmation'), 'Curbside handover must remain conditional, not a guaranteed service');
assert.ok(html.includes('Ask about curbside handover'), 'Curbside WhatsApp handover CTA is missing');
assert.ok(!/GPU repair/i.test(html), 'Unsupported GPU repair service wording must not appear on the Hawalli page');

console.log('Hawalli SSG validation passed: canonical + one H1, Friday hours schema, 12 visible FAQ answers matching FAQPage, six accurate pricing cards, and conditional walk-in handover guidance.');
