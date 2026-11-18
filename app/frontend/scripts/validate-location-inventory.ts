// Validate that every location surface is generated from the same active graph inventory.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { KCROC_GRAPH } from '../src/data/graph';
import { NAV_GRAPH } from '../src/data/navGraph.generated';
import { arabicLocationInventory, arabicLocationPath } from '../src/utils/arabicLocationRoutes';

const here = path.dirname(fileURLToPath(import.meta.url));
const activeLocations = (KCROC_GRAPH.locations ?? []).filter((location) => location.isActive !== false);
const pickupLocations = activeLocations.filter((location) => !location.isPhysicalLocation);
const physicalLocations = activeLocations.filter((location) => location.isPhysicalLocation);
const footerAreas = KCROC_GRAPH.footer?.links?.areas ?? [];
const navLocations = NAV_GRAPH.locations ?? [];

const unique = (values: string[], label: string) => {
  assert.equal(new Set(values).size, values.length, `Duplicate ${label} detected.`);
};

const expectedPaths = activeLocations.map((location) => `/location/${location.slug}`).sort();
const footerPaths = footerAreas.map((area) => area.path).sort();
const navIds = navLocations.map((location) => location.id).sort();
const expectedIds = activeLocations.map((location) => location.id).sort();

assert.ok(activeLocations.length > 0, 'The active location inventory is empty.');
assert.equal(physicalLocations.length, 1, 'KCROC must have exactly one active physical repair laboratory.');
assert.equal(footerAreas.length, activeLocations.length, 'Footer area links must match active location entries.');
assert.deepEqual(footerPaths, expectedPaths, 'Footer area links must cover every active location exactly once.');
assert.equal(navLocations.length, activeLocations.length, 'Generated header navigation must match the active location count.');
assert.deepEqual(navIds, expectedIds, 'Generated header navigation must contain exactly the active graph locations.');
unique(activeLocations.map((location) => location.slug), 'active location slug');
unique(footerPaths, 'footer location path');

const activeServiceIds = new Set((KCROC_GRAPH.services ?? [])
  .filter((service) => service.isActive)
  .map((service) => service.id));

for (const location of pickupLocations) {
  assert.ok((location.localIntro ?? '').trim().length >= 120, `Location intro is too thin for ${location.slug}.`);
  assert.ok((location.localHighlights ?? []).length >= 3, `Location needs at least three useful local highlights: ${location.slug}.`);
  assert.ok((location.localFaqs ?? []).length >= 4, `Location needs at least four local FAQs: ${location.slug}.`);
  for (const card of location.localServiceCards ?? []) {
    assert.ok(card.serviceIds.length > 0, `Local service card has no service relationship: ${location.slug} / ${card.title}.`);
    for (const serviceId of card.serviceIds) {
      assert.ok(activeServiceIds.has(serviceId), `Unknown or inactive service relationship: ${location.slug} / ${serviceId}.`);
    }
  }
}

const priorityCardSlugs = ['mangaf', 'ahmadi', 'fahaheel', 'jahra', 'mubarak-al-kabeer', 'rumaithiya', 'khaitan', 'messila', 'yarmouk'];
for (const slug of priorityCardSlugs) {
  const location = pickupLocations.find((item) => item.slug === slug);
  assert.ok(location, `Expected priority pickup-area page is missing: ${slug}.`);
  assert.ok((location.localServiceCards ?? []).length >= 3, `Expected three local service cards for ${slug}.`);
}

const redirects = JSON.parse(
  fs.readFileSync(path.resolve(here, '../vercel.json'), 'utf8'),
).redirects as Array<{ source: string; destination: string }>;

const requiredLegacyRedirects: Record<string, string> = {
  '/location/shaab': '/location/surra',
  '/location/qurain': '/location/mubarak-al-kabeer',
  '/location/abu-ftaira': '/location/fahaheel',
  '/location/fintas': '/location/fahaheel',
};

for (const [source, destination] of Object.entries(requiredLegacyRedirects)) {
  assert.equal(
    redirects.find((redirect) => redirect.source === source)?.destination,
    destination,
    `The legacy location redirect ${source} must remain pointed at ${destination}.`,
  );
}

console.log(
  `Location inventory validation passed: ${pickupLocations.length} pickup areas + ${physicalLocations.length} physical lab = ${activeLocations.length} active locations; header, footer and hub inventories agree; four legacy redirects preserved.`,
);

const arInventory = arabicLocationInventory();
assert.deepEqual(arInventory.map((entry) => entry.slug).sort(), activeLocations.map((entry) => entry.slug).sort());
assert.equal(arInventory.filter((entry) => entry.hasArabic).length, 8, 'Existing Arabic location parity changed unexpectedly.');
for (const entry of arInventory) {
  assert.equal(entry.path, entry.hasArabic ? '/ar/computer-repair-' + entry.slug : '/location/' + entry.slug);
}
for (const slug of ['ahmadi', 'fahaheel', 'mangaf']) {
  assert.equal(arabicLocationPath(slug), '/ar/computer-repair-' + slug);
}
for (const retired of ['jabriya', 'fintas']) assert.ok(!arInventory.some((entry) => entry.slug === retired));
const activeIds = new Set(activeLocations.map((entry) => entry.id));
for (const location of activeLocations) {
  for (const id of location.relatedLocationIds ?? []) {
    assert.ok(id !== location.id && activeIds.has(id), 'Invalid geographic edge: ' + location.id + ' -> ' + id);
  }
}
for (const [source, target] of [['farwaniya', 'riggae'], ['riggae', 'farwaniya'], ['mangaf', 'mahboula'], ['mahboula', 'mangaf'], ['rumaithiya', 'mishref'], ['messila', 'sabah-al-salem'], ['jahra', 'hawalli']]) {
  assert.ok(activeLocations.find((location) => location.slug === source)?.relatedLocationIds?.includes('loc-' + target), 'Missing Phase 4 geographic edge: ' + source + ' -> ' + target);
}
const hawalliArSource = fs.readFileSync(path.resolve(here, '../src/pages/ArabicHawalliLocationPage.tsx'), 'utf8');
assert.equal((hawalliArSource.match(/to="\/ar\/book"/g) ?? []).length, 2);
assert.ok(hawalliArSource.includes('<LocationHeroActions locale="ar" locationSlug="hawalli"'), 'Shared hero must provide the third Arabic booking link');
const locationHeroSource = fs.readFileSync(path.resolve(here, '../src/components/content/LocationHeroActions.tsx'), 'utf8');
assert.ok(locationHeroSource.includes("localizedSitePath('/book', locale)"));
assert.ok(!hawalliArSource.includes('to="/book"'));
const nearMeSource = fs.readFileSync(path.resolve(here, '../src/pages/NearMeAR.tsx'), 'utf8');
assert.ok(nearMeSource.includes('const AREAS_AR = arabicLocationInventory()'));
const commercialSource = fs.readFileSync(path.resolve(here, '../src/pages/ArabicCommercialPage.tsx'), 'utf8');
assert.ok(!commercialSource.includes("path: '/location/ahmadi'"));
assert.ok(commercialSource.includes('trackLocationCta'));
console.log('Phase 4 Arabic location routing, geographic relationships and priority service cards passed.');
