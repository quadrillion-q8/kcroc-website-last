import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const candidates = [
  path.join(process.cwd(), 'dist', 'laptop-liquid-damage-repair-kuwait.html'),
  path.join(process.cwd(), 'dist', 'laptop-liquid-damage-repair-kuwait', 'index.html'),
];
const pagePath = candidates.find(existsSync);
assert.ok(pagePath, 'Liquid-damage service SSG validation failed: prerendered money page was not found.');
const html = readFileSync(pagePath, 'utf8');

assert.ok(html.includes('https://www.computerrepairkuwait.com/laptop-liquid-damage-repair-kuwait'), 'Existing canonical URL is missing.');
assert.ok(html.includes('Laptop Liquid Damage Repair in Kuwait'), 'Commercial H1 is missing from static HTML.');
assert.ok(html.includes('From 35 KWD'), 'Published starting price is missing.');
assert.ok(html.includes('45–65 KWD'), 'Tier 2 pricing range is missing.');
assert.ok(html.includes('60–90+ KWD'), 'Tier 3 pricing range is missing.');
assert.ok(html.includes('Initial diagnosis is 0 KWD'), 'Free initial diagnostic rule is missing.');
assert.ok(html.includes('No Fix, No Fee'), 'No Fix, No Fee policy is missing.');
assert.ok(html.includes('id="service-faqs-heading"'), 'Visible FAQ section is missing.');
assert.equal((html.match(/<details\b/gi) ?? []).length >= 6, true, 'Expected six native visible FAQ disclosures.');
for (const question of [
  'Can a laptop be repaired after a coffee or karak spill?',
  'Do you repair liquid-damaged MacBooks?',
  'What happens if the motherboard cannot be repaired?',
  'Do you offer free pickup for liquid-damaged laptops?',
  'What do you test before returning the laptop?',
  'Why can a laptop fail days after a spill?',
]) assert.ok(html.includes(question), 'Visible FAQ question missing: ' + question);
for (const answerMarker of [
  'sticky residue that does not disappear when the outside dries',
  'Initial diagnosis is free',
  'neither repair nor data access is guaranteed',
]) assert.ok(html.toLowerCase().includes(answerMarker.toLowerCase()), 'FAQ / commercial answer marker missing: ' + answerMarker);

assert.ok(html.includes('"@type":"Service"') || html.includes('"@type": "Service"'), 'Service JSON-LD is missing.');
assert.ok(html.includes('"serviceType":"Laptop and MacBook liquid-damage inspection') || html.includes('"serviceType": "Laptop and MacBook liquid-damage inspection'), 'Liquid-damage serviceType is missing.');
assert.ok(html.includes('"lowPrice":35') || html.includes('"lowPrice": 35'), 'AggregateOffer lowPrice is not 35 KWD.');
assert.ok(html.includes('"priceCurrency":"KWD"') || html.includes('"priceCurrency": "KWD"'), 'KWD currency is missing from the offer schema.');
assert.ok(html.includes('https://www.computerrepairkuwait.com/#business'), 'Service provider must reference the single KCROC LocalBusiness entity.');
assert.ok(html.includes('Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19'), 'Hawalli workshop address is missing from service schema.');
assert.ok(html.includes('Hawalli Governorate'), 'Hawalli region is missing from service schema.');
assert.ok(html.includes('"name":"Kuwait"') || html.includes('"name": "Kuwait"'), 'Kuwait country coverage is missing from service schema.');
assert.equal((html.match(/"@type"\s*:\s*"Question"/g) ?? []).length, 10, 'FAQPage JSON-LD must contain all four commercial answers plus six FAQs.');

for (const circuit of [
  'Main input and standby power-rail fault tracing',
  'USB-C Power Delivery and DC-in charging-path inspection',
  'Display backlight circuit and eDP connector diagnosis',
  'Keyboard matrix, trackpad and flex-cable path inspection',
]) assert.ok(html.includes(circuit), 'Technical circuit capability missing: ' + circuit);

assert.ok(html.includes('/spilled-water-on-laptop'), 'Commercial page must link to the separate emergency spill guide.');
assert.ok(html.includes('Keep it switched off') || html.includes('Keep the laptop switched off'), 'Emergency instruction is missing.');
console.log('Liquid-damage service SSG validation passed: canonical, pricing tiers, free diagnosis, 10 visible/schema Q&As, Kuwait/Hawalli service schema and technical circuit content.');
