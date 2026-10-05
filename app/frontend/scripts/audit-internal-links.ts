// Internal-link topology audit for KCROC's compiled Knowledge Graph.
// This is intentionally a report-only audit: it does not mutate content or
// create URLs. It measures effective Problem -> Service and Location -> Service
// connectivity, Arabic service equivalents, and article -> service edges.

import { KCROC_GRAPH } from '../src/data/graph';

const unique = (values: string[]) => [...new Set(values)];

const priorityLocations = ['hawalli', 'salmiya', 'kuwait-city', 'farwaniya', 'jahra', 'ahmadi', 'fahaheel', 'mangaf'];

const services = KCROC_GRAPH.services;
const problems = KCROC_GRAPH.problems;
const locations = KCROC_GRAPH.locations;
const pages = KCROC_GRAPH.pages;

console.log('\nKCROC Internal-Link Topology Audit');
console.log('===================================');
console.log(`Services: ${services.length}`);
console.log(`Problems: ${problems.length}`);
console.log(`Locations: ${locations.length}`);
console.log(`Indexed WebPage entities: ${pages.length}`);

console.log('\nService coverage');
for (const service of services) {
  const directProblems = service.relatedProblemIds ?? [];
  const reverseProblems = problems
    .filter((problem) => (problem.relatedServiceIds ?? []).includes(service.id))
    .map((problem) => problem.id);
  const effectiveProblems = unique([...directProblems, ...reverseProblems]);

  const directLocations = service.relatedLocationIds ?? [];
  const reverseLocations = locations
    .filter((location) => (location.relatedServiceIds ?? []).includes(service.id))
    .map((location) => location.id);
  const effectiveLocations = unique([...directLocations, ...reverseLocations])
    .sort((a, b) => {
      const aSlug = locations.find((location) => location.id === a)?.slug ?? '';
      const bSlug = locations.find((location) => location.id === b)?.slug ?? '';
      const ai = priorityLocations.indexOf(aSlug);
      const bi = priorityLocations.indexOf(bSlug);
      return (ai < 0 ? 999 : ai) - (bi < 0 ? 999 : bi);
    });

  const arabicEquivalent = pages.find((page) =>
    page.isActive &&
    page.seo.locale === 'ar_KW' &&
    page.seo.alternates?.['en-KW'] === service.seo.canonicalUrl
  );

  const flags: string[] = [];
  if (effectiveProblems.length === 0) flags.push('NO-PROBLEM-LINK');
  if (effectiveLocations.length === 0) flags.push('NO-LOCATION-LINK');
  if (!arabicEquivalent) flags.push('NO-AR-EQUIVALENT');

  console.log(
    `- ${service.id}: problems=${effectiveProblems.length} locations=${effectiveLocations.length} ar=${arabicEquivalent ? 'yes' : 'no'}${flags.length ? ` [${flags.join(', ')}]` : ''}`
  );
}

console.log('\nGuide / article service edges');
for (const page of pages.filter((item) => (item.relatedServiceIds ?? []).length > 0)) {
  const linkedServices = unique(page.relatedServiceIds ?? [])
    .map((id) => services.find((service) => service.id === id)?.slug ?? id);
  console.log(`- ${page.slug}: ${linkedServices.join(', ')}`);
}

console.log('\nProblem coverage');
for (const problem of problems) {
  const serviceCount = unique(problem.relatedServiceIds ?? []).length;
  if (serviceCount === 0) {
    console.log(`- ${problem.slug}: NO-SERVICE-LINK`);
  }
}

console.log('\nDone. This report is read-only and does not change the graph.');
