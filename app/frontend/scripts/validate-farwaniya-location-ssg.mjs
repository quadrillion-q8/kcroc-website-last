import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const candidates = [
  path.join(process.cwd(), 'dist', 'location', 'farwaniya.html'),
  path.join(process.cwd(), 'dist', 'location', 'farwaniya', 'index.html'),
];
const file = candidates.find(existsSync);
assert.ok(file, 'Farwaniya SSG validation failed: prerendered /location/farwaniya was not found');
const html = readFileSync(file, 'utf8');

assert.ok(html.includes('https://www.computerrepairkuwait.com/location/farwaniya'), 'Existing Farwaniya canonical URL is missing');
assert.ok(html.includes('https://www.computerrepairkuwait.com/ar/computer-repair-farwaniya'), 'Existing Arabic Farwaniya alternate is missing');
assert.ok(!html.includes('/ar/location/farwaniya'), 'Unregistered Arabic location route must not be introduced');
assert.ok(html.includes('Computer &amp; Laptop Repair Farwaniya | Free Pickup | KCROC'), 'Farwaniya SEO title is missing');
assert.ok(html.includes('Computer Repair in Farwaniya, Kuwait'), 'Preserved Farwaniya H1 is missing');
assert.ok(html.includes('Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19') || html.includes('Ibn Khaldoun Street, Al Mullah Complex, Basement Shop 19'), 'Hawalli workshop relationship is missing');

const pricingTable = html.indexOf('data-farwaniya-pricing-table="true"');
assert.ok(pricingTable >= 0, 'Transparent Farwaniya pricing table is missing');
const pricingEnd = html.indexOf('</table>', pricingTable);
assert.ok(pricingEnd > pricingTable, 'Pricing table closing tag is missing');
const pricingHtml = html.slice(pricingTable, pricingEnd);
assert.equal((pricingHtml.match(/data-farwaniya-pricing-row="true"/g) ?? []).length, 10, 'Expected ten published Farwaniya guide-price rows');
for (const marker of [
  'FREE',
  'From 15 KWD',
  '8–15 KWD labour + battery',
  '10–20 KWD labour',
  '15–20 KWD',
  '20–35 KWD',
  '25–60 KWD',
  'From 30 KWD labour',
  '35–90+ KWD',
  '45–100+ KWD',
]) {
  assert.ok(pricingHtml.includes(marker), 'Missing published price anchor: ' + marker);
}

const serviceTitles = [
  'Laptop Repair',
  'Motherboard Repair',
  'Laptop Screen Repair',
  'Laptop Battery Replacement',
  'Laptop Charging Port Repair',
  'Gaming PC Repair',
  'MacBook Repair &amp; Logic-Board Diagnostics',
  'Laptop Liquid-Damage &amp; Corrosion Repair',
];
for (const title of serviceTitles) assert.ok(html.includes(title), 'Missing Farwaniya service card: ' + title);
assert.equal((html.match(/data-farwaniya-triage-row="true"/g) ?? []).length, 5, 'Expected five symptom-to-cause triage rows');

const triageStart = html.indexOf('data-farwaniya-triage-table="true"');
const triageEnd = html.indexOf('</table>', triageStart);
assert.ok(triageStart >= 0 && triageEnd > triageStart, 'Symptom triage table is missing or incomplete');
const triageHtml = html.slice(triageStart, triageEnd);
assert.equal((triageHtml.match(/https:\/\/wa\.me\/96555301913\?text=/g) ?? []).length, 5, 'Each triage symptom must have one pre-filled WhatsApp dispatch link');
assert.ok(triageHtml.includes('I%20am%20in%20Farwaniya'), 'Symptom WhatsApp message must carry the Farwaniya area intent in its URL-encoded text');

for (const marker of [
  'What KCROC Repairs',
  'smartphones',
  'tablets',
  'standalone graphics cards',
  'data-recovery',
  'dead-drive file-rescue services',
]) assert.ok(html.toLowerCase().includes(marker.toLowerCase()), 'Missing service boundary notice: ' + marker);

const faqQuestions = [
  'Do you have a repair shop in Farwaniya?',
  'Do you offer laptop pickup from Farwaniya?',
  'How much does laptop repair cost for Farwaniya customers?',
  'How long does a repair take for Farwaniya customers?',
  'Do you collect from Khaitan, Riggae, Ardiya and Jleeb Al-Shuyoukh?',
  'My charger is plugged in but the laptop is not charging. Is it the charger, the port or the board?',
  'My laptop turns on but the screen stays black. What does that mean?',
  'Should I send the charger with the laptop?',
  'My battery drops from 30 percent to zero. Is it the battery or something else?',
  'Is there a branch in Farwaniya, and where is the repair done?',
];
for (const question of faqQuestions) assert.ok(html.includes(question), 'Missing prerendered Farwaniya FAQ: ' + question);
for (const answerMarker of [
  'The initial hardware diagnostic and pickup',
  'component-level motherboard repair is 25–60 KWD',
  'data recovery is not offered',
  'We test the adapter, inspect the port and check the board',
  'returned to Farwaniya free of charge',
]) assert.ok(html.toLowerCase().includes(answerMarker.toLowerCase()), 'Missing prerendered FAQ answer content: ' + answerMarker);

assert.equal((html.match(/"@type"\s*:\s*"Question"/g) ?? []).length, 10, 'FAQPage schema must contain exactly ten Farwaniya questions');
assert.ok(html.includes('"@type":"WebPage"') || html.includes('"@type": "WebPage"'), 'Farwaniya WebPage JSON-LD is missing');
assert.ok(html.includes('"@type":"BreadcrumbList"') || html.includes('"@type": "BreadcrumbList"'), 'Farwaniya BreadcrumbList JSON-LD is missing');
assert.ok(html.includes('https://www.computerrepairkuwait.com/#business'), 'Farwaniya service schema must point to the one KCROC business entity');
assert.ok(html.includes('"@type":"Service"') || html.includes('"@type": "Service"'), 'Pickup-only Service JSON-LD is missing');
assert.ok(!html.includes('https://www.computerrepairkuwait.com/location/farwaniya#location'), 'A Farwaniya LocalBusiness / storefront node must not be emitted');

console.log('Farwaniya SSG validation passed: canonical + Arabic alternate, 10 pricing rows, 8 service cards, 5 pre-filled symptom CTAs, 10 FAQ answers/schema questions, Hawalli-only business entity and service scope.');
