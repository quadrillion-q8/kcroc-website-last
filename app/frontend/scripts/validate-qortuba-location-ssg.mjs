import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const candidates = [
  path.join(process.cwd(), 'dist', 'location', 'qortuba.html'),
  path.join(process.cwd(), 'dist', 'location', 'qortuba', 'index.html'),
];
const file = candidates.find(existsSync);
assert.ok(file, 'Qortuba SSG validation failed: prerendered /location/qortuba was not found');

const html = readFileSync(file, 'utf8');
const canonical = 'https://www.computerrepairkuwait.com/location/qortuba';
assert.ok(html.includes(canonical), 'Qortuba canonical URL is missing');
assert.equal((html.match(/<h1\b/g) ?? []).length, 1, 'Qortuba page must have exactly one H1');
assert.ok(html.includes('Computer Repair in Qortuba, Kuwait'), 'Qortuba H1 is missing');
assert.ok(html.includes('Computer Repair Qortuba (Qurtuba) | Free Pickup | KCROC'), 'Qortuba title metadata is missing');
assert.ok(!html.includes('Mobile Dispatch Area ('), 'Malformed mobile-dispatch label must not appear');
assert.ok(html.includes('Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19'), 'Central Hawalli workshop address is missing');
assert.ok(html.includes('tel:+96555301913'), 'Telephone link must use clean international digits');
assert.ok(html.includes('Prefer to hand over your device in person?'), 'Qortuba hero should expose the Hawalli walk-in option');

assert.equal((html.match(/data-location-service-card="true"/g) ?? []).length, 15, 'Expected fifteen Qortuba service cards');
for (const marker of [
  'data-location-service-group="Board-Level &amp; Micro-Soldering"',
  'data-location-service-group="MacBook &amp; Gaming Systems"',
  'data-location-service-group="Screens, Batteries &amp; Upgrades"',
]) assert.ok(html.includes(marker), 'A Qortuba service pillar did not prerender: ' + marker);

assert.equal((html.match(/data-local-pricing-anchor="true"/g) ?? []).length, 6, 'Expected six visible Qortuba pricing cards');
const servicePosition = html.indexOf('data-location-service-card="true"');
const pricingPosition = html.indexOf('Transparent Repair Pricing for Qortuba Customers');
assert.ok(servicePosition >= 0 && pricingPosition > servicePosition, 'Qortuba pricing must follow the service grid');
for (const price of ['FREE', 'From 8 KWD', 'From 10 KWD', 'From 15 KWD', 'From 25 KWD', 'From 30 KWD']) {
  assert.ok(html.includes(price), 'Missing visible Qortuba price anchor: ' + price);
}
assert.ok(html.includes('SSD/RAM installation labour from 5 KWD'), 'FAQ must disclose SSD/RAM installation labour');
assert.ok(html.includes('charging-port repair at 20–35 KWD'), 'FAQ must disclose charging-port pricing');

assert.ok((html.match(/data-location-problem-link="true"/g) ?? []).length >= 12, 'Qortuba should expose twelve or more problem links');
assert.ok((html.match(/data-location-brand-link="true"/g) ?? []).length >= 6, 'Qortuba should expose six manufacturer links');
for (const href of [
  '/location/hawalli', '/location/kaifan', '/location/adailiya', '/location/yarmouk', '/location/surra',
  '/acer-laptop-repair-kuwait', '/msi-laptop-repair-kuwait', '/macbook-repair-kuwait',
]) assert.ok(html.includes('href="' + href + '"'), 'Missing Qortuba internal link: ' + href);

assert.equal((html.match(/"@type"\s*:\s*"Question"/g) ?? []).length, 8, 'Qortuba FAQPage schema must contain exactly eight questions');
for (const question of [
  'Do you have a walk-in repair shop in Qortuba, or how does pickup work?',
  'How do I arrange free laptop or PC pickup from Qortuba?',
  'How much does laptop, MacBook or computer repair cost for Qortuba customers?',
  'How long does a repair take after collection from Qortuba?',
  'Can you repair MacBooks with liquid spills, USB-C charging faults or board problems?',
  'Can you fix a gaming PC or gaming laptop that overheats, restarts or shows a black screen?',
  'Will technicians browse my personal files, and can I keep my SSD?',
  'What happens if my device cannot be repaired, and what warranty applies?',
]) assert.ok(html.includes(question), 'Missing Qortuba FAQ question: ' + question);

assert.ok(html.includes('Qortuba (Qurtuba)'), 'Qurtuba spelling variant is missing');
assert.ok(html.includes('Qortuba Blocks 1–5'), 'Blocks 1–5 pickup coverage is missing');
assert.ok(html.includes('No Fix, No Fee'), 'No Fix, No Fee policy is missing');
assert.ok(html.includes('30-day parts and labour warranty'), 'Warranty detail is missing');

console.log('Qortuba SSG validation passed: canonical/H1, pickup-only scope, Hawalli address, 15 grouped services, six post-service price cards, 12+ problem links, six brand links, active nearby links and eight FAQ schema entries.');
