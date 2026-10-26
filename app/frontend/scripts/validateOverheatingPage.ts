// Build-time guard for the highest-intent Kuwait laptop overheating problem page.
import { KCROC_GRAPH } from '../src/data/graph';
import { SEO_GRAPH } from '../src/data/seoGraph.generated';

const problem = KCROC_GRAPH.problems.find((item) => item.id === 'problem-overheating');
const errors: string[] = [];
const check = (condition: unknown, message: string) => {
  if (!condition) errors.push(message);
};

if (!problem) {
  console.error('❌ Missing problem-overheating in KCROC_GRAPH.');
  process.exit(1);
}

const projectedProblem = SEO_GRAPH.routableEntities.find((item) => item.id === 'problem-overheating') as { solution?: string; technicalReferences?: Array<{ url: string }> } | undefined;
check(Boolean(problem.solution.trim()), 'The source problem must include a non-empty technician solution narrative.');
check(Boolean(projectedProblem?.solution?.trim()), 'The generated SEO projection must preserve the solution narrative; do not let TechArticle schema emit "Solution: undefined".');
check((projectedProblem?.technicalReferences?.length ?? 0) >= 5, 'The generated SEO projection must retain the manufacturer references.');
const references = problem.technicalReferences ?? [];
const referenceHosts = references.map((reference) => {
  try {
    return new URL(reference.url).hostname.toLowerCase();
  } catch {
    return '';
  }
});
const contentText = JSON.stringify(problem);
const legacyOverclaims = [
  /destroys thermal paste/i,
  /45°C\+ summer temperatures/i,
  /every 8[-–]12 months/i,
  /same-day service/i
];

check(problem.seo.title.length <= 65, 'SEO title should remain concise (65 characters or fewer).');
check(problem.seo.description.length >= 100 && problem.seo.description.length <= 180, 'Meta description should remain useful and search-snippet friendly.');
check(Boolean(problem.seo.lastModified && !Number.isNaN(Date.parse(problem.seo.lastModified))), 'The page must have a valid last-modified date.');
check((problem.decisionTree?.length ?? 0) >= 6, 'The symptom decision tree must retain at least six differentiated paths.');
check((problem.diagnosticSteps?.length ?? 0) >= 8, 'The safe diagnostic checklist must retain at least eight steps.');
check((problem.technicianMethod?.length ?? 0) >= 8, 'The technician diagnostic method must retain at least eight steps.');
check((problem.expertNotes?.length ?? 0) >= 8, 'The technical context must retain model-specific expert notes.');
check((problem.faqs?.length ?? 0) >= 12, 'The local FAQ should retain at least twelve substantive questions.');
check(references.length >= 5, 'The page should retain at least five authoritative technical references.');
check(referenceHosts.some((host) => host === 'dell.com' || host.endsWith('.dell.com')), 'Missing official Dell thermal troubleshooting reference.');
check(referenceHosts.some((host) => host === 'support.apple.com'), 'Missing official Apple operating-temperature reference.');
check(referenceHosts.some((host) => host === 'support.microsoft.com'), 'Missing official Microsoft fan or battery safety reference.');
check(referenceHosts.some((host) => host === 'asus.com' || host.endsWith('.asus.com')), 'Missing official ASUS cooling guidance.');
check(referenceHosts.some((host) => host === 'amd.com' || host.endsWith('.amd.com')), 'Missing official AMD temperature guidance.');
check((problem.contentImages ?? []).some((image) => image.placement === 'causes'), 'The cause section must include a relevant repair image.');
check((problem.contentImages ?? []).some((image) => image.placement === 'solution'), 'The repair-process section must include a relevant repair image.');
check((problem.relatedResourcePaths ?? []).length >= 8, 'The page should provide a useful cluster of contextual internal links.');
check(!legacyOverclaims.some((pattern) => pattern.test(contentText)), 'Remove unsupported claims about paste being destroyed, fixed cleaning intervals or guaranteed same-day service.');

if (errors.length > 0) {
  console.error('❌ Laptop overheating page validation failed:');
  errors.forEach((error) => console.error('  - ' + error));
  process.exit(1);
}

console.log('✅ Laptop overheating page validation passed: content depth, safety, local SEO and source coverage.');
