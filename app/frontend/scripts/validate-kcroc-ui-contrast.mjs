// KCROC global UI contrast/surface policy. Lightweight, dependency-free prebuild gate.
// This checks shared token pairs + regression-prone markup/CSS; it complements
// actual rendered browser/keyboard/viewport audits rather than replacing them.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(path, import.meta.url), 'utf8');
const [globalCss, rollout, location, policy] = await Promise.all([
  read('../src/index.css'),
  read('../src/pages/KCROCEditorialRollout.css'),
  read('../src/pages/LocationDeepTemplate.tsx'),
  read('../../../docs/KCROC_GLOBAL_UI_CONTRAST_POLICY.md'),
]);

function token(name) {
  const match = globalCss.match(new RegExp('--' + name + ':\\s*(#[0-9a-f]{6})\\s*;', 'i'));
  assert.ok(match, 'Missing global design token --' + name);
  return match[1];
}
function luminance(hex) {
  const values = [1, 3, 5].map((start) => parseInt(hex.slice(start, start + 2), 16) / 255);
  const linear = values.map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}
function contrast(a, b) {
  const light = Math.max(luminance(a), luminance(b));
  const dark = Math.min(luminance(a), luminance(b));
  return (light + 0.05) / (dark + 0.05);
}
const checks = [
  ['dark main text', 'kcroc-ui-text-dark', 'kcroc-ui-surface-dark', 4.5],
  ['dark explanatory text', 'kcroc-ui-muted-dark', 'kcroc-ui-surface-dark', 4.5],
  ['light main text', 'kcroc-ui-text-light', 'kcroc-ui-surface-light', 4.5],
  ['light explanatory text', 'kcroc-ui-muted-light', 'kcroc-ui-surface-light', 4.5],
  ['light form placeholders', 'kcroc-ui-placeholder', 'kcroc-ui-field-light', 4.5],
  ['primary CTA label', 'kcroc-ui-action-ink', 'kcroc-ui-action', 4.5],
  ['light input border', 'kcroc-ui-border-light', 'kcroc-ui-field-light', 3],
  ['dark input border', 'kcroc-ui-border-dark', 'kcroc-ui-field-dark', 3],
];
for (const [description, text, background, minimum] of checks) {
  const ratio = contrast(token(text), token(background));
  assert.ok(ratio >= minimum, description + ': ' + ratio.toFixed(2) + ':1 is below ' + minimum + ':1');
}
for (const marker of [
  '[data-kcroc-surface="dark"]',
  '[data-kcroc-surface="light"]',
  '[data-kcroc-form] label',
  '[data-kcroc-form] :is(input,select,textarea)',
  '[data-kcroc-action="primary"]',
  '[data-kcroc-action="secondary"]',
  ':focus-visible',
]) assert.ok(globalCss.includes(marker), 'Missing global contrast/control guard: ' + marker);

for (const selector of [
  ':is(h1,h2,h3,h4,h5,strong)',
  ':is(p,li,td,th,dd,figcaption)',
  ':is(.text-white,.text-slate-100,.text-slate-200,.text-slate-300,.text-slate-400,.text-slate-500)',
  ':is(.text-cyan-200,.text-cyan-300,.text-cyan-400,.text-cyan-500)',
  ':is(a[class*="text-cyan-"],a[class*="hover:text-cyan-"])',
  ':is(a,button)[class*="border-slate-"]',
]) {
  assert.ok(
    rollout.includes(selector + ':not([data-kcroc-surface="dark"] *)'),
    'Light editorial styling can bleed into opted-in dark module: ' + selector,
  );
}
assert.ok(
  rollout.includes(':not([data-kcroc-surface="dark"]):not([data-kcroc-surface="dark"] *)'),
  'Light cards must exclude dark sections and dark descendants',
);
assert.ok(!rollout.includes('[data-tower-handover-generator] *,'), 'Blanket tower child color override reintroduced');
assert.ok(!rollout.includes('[aria-labelledby="local-emergency-protocol"] * {'), 'Blanket emergency child color override reintroduced');

const start = location.indexOf('data-tower-handover-generator="true"');
const end = location.indexOf('</section>', start);
assert.ok(start > 0 && end > start, 'Kuwait City office pickup module missing');
const form = location.slice(start, end);
for (const marker of [
  'data-kcroc-surface="light"',
  'data-kcroc-form="true"',
  'sm:grid-cols-2',
  'data-kcroc-action="primary"',
  'data-kcroc-action="secondary"',
  'href={towerHandoverWaLink}',
  "handleWhatsAppClick('tower_handover_generator')",
  "handleCallClick('tower_handover_generator')",
]) assert.ok(form.includes(marker), 'Kuwait City pickup regression: ' + marker);
assert.equal((form.match(/<label className=/g) ?? []).length, 6, 'The six labeled pickup fields must remain present');
assert.ok(!form.includes('lg:grid-cols-3'), 'Pickup form must avoid dense three-column layout');
assert.ok(!form.includes('bg-slate-950/90'), 'Pickup form must align with adjacent light editorial cards');
assert.ok(
  location.includes('aria-labelledby="local-emergency-protocol"\n              data-kcroc-surface="dark"'),
  'Emergency technical panel must opt into the dark surface policy',
);
assert.ok(policy.includes('every current and new KCROC page'), 'Global bilingual policy documentation missing');
console.log('✅ KCROC global UI contrast/surface guard passed (' + checks.length + ' measured color pairs).');
console.log('   Browser/computed-style and EN/AR viewport audits remain required for full accessibility verification.');
