// Build-time guard for the high-intent laptop liquid-spill emergency page.
import { KCROC_GRAPH } from '../src/data/graph';
import { SEO_GRAPH } from '../src/data/seoGraph.generated';

const problem = KCROC_GRAPH.problems.find((item) => item.id === 'problem-liquid-spill');
const errors: string[] = [];
const check = (condition: unknown, message: string) => {
  if (!condition) errors.push(message);
};

if (!problem) {
  console.error('❌ Missing problem-liquid-spill in KCROC_GRAPH.');
  process.exit(1);
}

const projectedProblem = SEO_GRAPH.routableEntities.find((item) => item.id === 'problem-liquid-spill') as {
  id: string;
  emergencySteps?: Array<{ title: string; description: string }>;
  liquidRiskMatrix?: Array<{ liquid: string; residue: string; risk: string; action: string }>;
  faqs?: Array<{ title: string; answer: string }>;
} | undefined;

const referenceHosts = (problem.technicalReferences ?? []).map((reference) => {
  try {
    return new URL(reference.url).hostname.toLowerCase();
  } catch {
    return '';
  }
});
const knownPaths = new Set((KCROC_GRAPH.routableEntities ?? []).map((entity) => `/${entity.slug}`));
const missingResources = (problem.relatedResourcePaths ?? []).filter((resource) => !knownPaths.has(resource.path));
const unsafeClaims = [
  /(?:within|in)[ ]+[0-9]+[ ]*(?:minutes?|hours?)/i,
  /(?:guarantee|guaranteed)[ ]+(?:100%|all)[ ]+(?:of )?(?:your )?(?:files|data)/i,
  /100%[ ]+(?:data|files)[ ]+(?:preserved|safe|intact)/i,
  /(?:save|preserve)[ ]+all[ ]+(?:your )?(?:data|files)/i,
  /(?:60|70|80)%[ ]+(?:of )?(?:the )?laptop(?:'s)?[ ]+value/i,
];

check(problem.seo.title.length <= 65, 'SEO title should remain concise (65 characters or fewer).');
check(problem.seo.description.length >= 100 && problem.seo.description.length <= 180, 'Meta description should remain useful and snippet-friendly.');
check(Boolean(problem.seo.lastModified && !Number.isNaN(Date.parse(problem.seo.lastModified))), 'The page must have a valid last-modified date.');
check((problem.emergencySteps?.length ?? 0) >= 4, 'The page must contain at least four practical emergency steps.');
check(Boolean(problem.emergencyCaution?.trim()), 'The emergency alert must include a clear battery/fire safety caution.');
check((problem.diagnosticSteps?.length ?? 0) >= 5, 'The external safe-check list must contain at least five useful steps.');
check((problem.liquidRiskMatrix?.length ?? 0) >= 5, 'The comparison must cover at least five common liquid categories.');
check((problem.technicianMethod?.length ?? 0) >= 4, 'The page must explain the technician-led inspection and repair stages.');
check((problem.expertNotes?.length ?? 0) >= 5, 'The page must retain model-dependent technical context.');
check((problem.faqs?.length ?? 0) >= 8, 'The page must answer at least eight common liquid-spill questions.');
check((problem.technicalReferences?.length ?? 0) >= 2, 'The page must link to authoritative liquid-damage safety references.');
check(referenceHosts.some((host) => host === 'dell.com' || host.endsWith('.dell.com')), 'Missing Dell laptop electrical-safety guidance.');
check(referenceHosts.some((host) => host === 'ifixit.com' || host.endsWith('.ifixit.com')), 'Missing iFixit liquid-damage repair guidance.');
check((problem.contentImages ?? []).length >= 2, 'The page should retain relevant first-party repair imagery.');
check((problem.contentImages ?? []).every((image) => Boolean(image.alt.trim()) && Boolean(image.caption?.trim())), 'Every liquid-spill image must have descriptive alt text and a caption.');
check(!missingResources.length, `Related page paths must resolve in the knowledge graph: ${missingResources.map((item) => item.path).join(', ')}`);
check((problem.relatedServiceIds ?? []).every((id) => KCROC_GRAPH.services.some((service) => service.id === id)), 'Every related service ID must resolve.');
check((problem.relatedBrandIds ?? []).every((id) => KCROC_GRAPH.brands.some((brand) => brand.id === id)), 'Every related brand ID must resolve.');
check((projectedProblem?.emergencySteps?.length ?? 0) >= 4, 'The generated SEO projection must preserve emergency steps.');
check((projectedProblem?.liquidRiskMatrix?.length ?? 0) >= 5, 'The generated SEO projection must preserve the liquid matrix.');
check((projectedProblem?.faqs?.length ?? 0) >= 8, 'The generated SEO projection must preserve the visible FAQ content.');
check((problem.seo.schemaTypes ?? []).includes('FAQPage'), 'Keep the existing FAQPage schema aligned with the visible FAQ section.');
check(!unsafeClaims.some((pattern) => pattern.test(JSON.stringify(problem))), 'Remove fixed corrosion timelines, universal data guarantees and unsupported board-swap savings claims.');

if (errors.length > 0) {
  console.error('❌ Laptop liquid-spill page validation failed:');
  errors.forEach((error) => console.error('  - ' + error));
  process.exit(1);
}

console.log('✅ Laptop liquid-spill page validation passed: emergency actions, safe advice, technical accuracy and SEO projection.');
