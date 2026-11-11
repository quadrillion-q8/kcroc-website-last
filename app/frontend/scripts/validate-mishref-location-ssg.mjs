import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const candidates = [
  path.join(process.cwd(), 'dist', 'location', 'mishref.html'),
  path.join(process.cwd(), 'dist', 'location', 'mishref', 'index.html'),
];
const file = candidates.find(existsSync);
assert.ok(file, 'Mishref SSG validation failed: prerendered /location/mishref was not found');

const html = readFileSync(file, 'utf8');
const canonical = 'https://www.computerrepairkuwait.com/location/mishref';

assert.ok(html.includes(canonical), 'Mishref canonical URL is missing');
assert.equal((html.match(/<h1\b/g) ?? []).length, 1, 'Mishref page must have exactly one H1');
assert.ok(html.includes('Computer Repair in Mishref, Kuwait'), 'Mishref H1 is missing');
assert.ok(!html.includes('hreflang="ar-KW"'), 'Do not add an Arabic alternate until a real Mishref Arabic page exists');
assert.ok(html.includes('We fix the board.'), 'Mishref hero must retain KCROC component-level positioning');
assert.ok(html.includes('Prefer to hand over your device in person?'), 'Mishref hero should link to the real Hawalli walk-in lab');

assert.equal((html.match(/data-location-service-card="true"/g) ?? []).length, 15, 'Expected fifteen Mishref service cards');
for (const groupMarker of [
  'data-location-service-group="Board-Level &amp; Micro-Soldering"',
  'data-location-service-group="MacBook &amp; Gaming Systems"',
  'data-location-service-group="Screens, Batteries &amp; Upgrades"',
]) assert.ok(html.includes(groupMarker), 'A named Mishref service group did not prerender: ' + groupMarker);

for (const marker of [
  'Laptop Liquid-Damage &amp; Corrosion Repair',
  'MacBook Screen Replacement',
  'Laptop Battery Testing &amp; Replacement',
  'Laptop Charging Port Repair',
  'Laptop Hinge &amp; Chassis Repair',
  'SSD &amp; RAM Upgrade',
]) assert.ok(html.includes(marker), 'Missing Mishref service card: ' + marker);

assert.equal((html.match(/data-local-pricing-anchor="true"/g) ?? []).length, 6, 'Expected six visible Mishref pricing cards');
const serviceGridPosition = html.indexOf('data-location-service-group="Board-Level &amp; Micro-Soldering"');
const pricingPosition = html.indexOf('Transparent Repair Pricing for Mishref Customers');
assert.ok(serviceGridPosition >= 0 && pricingPosition > serviceGridPosition, 'Mishref pricing section must follow the service grid');
for (const price of ['FREE', 'From 8 KWD', 'From 10 KWD', 'From 15 KWD', 'From 25 KWD', 'From 30 KWD', '45–100+ KWD']) {
  assert.ok(html.includes(price), 'Missing visible Mishref price anchor: ' + price);
}

const mishrefProblemLinkCount = (html.match(/data-location-problem-link="true"/g) ?? []).length;
console.log('Mishref prerendered problem-link count:', mishrefProblemLinkCount);
assert.ok(mishrefProblemLinkCount >= 12, `Mishref should expose at least twelve symptom/problem links; found ${mishrefProblemLinkCount}`);
assert.ok((html.match(/data-location-brand-link="true"/g) ?? []).length >= 6, 'Mishref should expose six linked laptop brands including Acer');
for (const href of [
  '/location/hawalli',
  '/location/salmiya',
  '/location/sabah-al-salem',
  '/location/rumaithiya',
  '/location/surra',
  '/acer-laptop-repair-kuwait',
]) assert.ok(html.includes('href="' + href + '"'), 'Missing Mishref internal link: ' + href);

assert.ok(html.includes('Google Reviews for Our Central Hawalli Repair Lab'), 'Review attribution heading is missing');
assert.equal((html.match(/data-central-lab-review="true"/g) ?? []).length, 3, 'Expected three verified central-lab review cards');
assert.ok(html.includes('not presented as testimonials from Mishref customers'), 'Review attribution disclaimer is missing');

assert.equal((html.match(/"@type"\s*:\s*"Question"/g) ?? []).length, 9, 'Mishref FAQPage schema must contain nine questions');
for (const question of [
  'Do you provide pickup from Mishref, West Mishref and Mubarak Al-Abdullah?',
  'How much does laptop repair cost for Mishref customers?',
  'How long does a repair take for Mishref customers?',
]) assert.ok(html.includes(question), 'Missing Mishref FAQ: ' + question);
assert.ok(html.includes('initial diagnostic and pickup/return delivery are free'), 'Mishref FAQ must expose free pickup and diagnostic details');
assert.ok(html.includes('MacBook logic-board repair is separately listed at 45–100+ KWD'), 'Mishref FAQ must preserve the separate MacBook logic-board range');

assert.ok(html.includes('Free collection across Mishref, West Mishref and Mubarak Al-Abdullah'), 'Pricing block must state pickup coverage');
assert.ok(html.includes('Mishref is a free pickup and delivery area, not a walk-in branch'), 'Mishref service-area scope notice is missing');
assert.ok(html.includes('Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19'), 'Central Hawalli workshop details are missing');
assert.ok(!html.includes('Mobile Dispatch Area ('), 'Malformed internal dispatch label must not appear');
assert.ok(!/streetAddress[^}]{0,120}Mishref/i.test(html), 'A Mishref street address must not be emitted in structured data');
for (const area of ['Mishref', 'West Mishref', 'Mubarak Al-Abdullah']) {
  assert.ok(html.includes(area), 'Service-area coverage is missing: ' + area);
}
assert.ok(html.includes('tel:+96555301913'), 'Telephone link should use clean international digits');

console.log('Mishref SSG validation passed: pickup-only location, canonical/H1, 15 grouped service cards, six visible price anchors after services, 12 problem links, six brands, five nearby locations, three attributed central-lab reviews and nine FAQ schema entries.');
