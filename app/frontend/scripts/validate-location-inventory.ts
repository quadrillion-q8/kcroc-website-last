// Validate that every location surface is generated from the same active graph inventory.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { KCROC_GRAPH } from '../src/data/graph';
import { NAV_GRAPH } from '../src/data/navGraph.generated';

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

const priorityCardSlugs = ['mangaf', 'ahmadi', 'fahaheel', 'jahra', 'mubarak-al-kabeer'];
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
