import { readFileSync, existsSync } from 'node:fs';
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
check((problem.seo.schemaTypes ?? []).includes('HowTo'), 'Declare HowTo schema for the emergency checklist.');
check(!unsafeClaims.some((pattern) => pattern.test(JSON.stringify(problem))), 'Remove fixed corrosion timelines, universal data guarantees and unsupported board-swap savings claims.');


const arabicLiquidPageSource = readFileSync(new URL('../src/pages/ArabicLiquidDamageRepairPage.tsx', import.meta.url), 'utf8');
const appSource = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
const arabicLiquidPage = KCROC_GRAPH.routableEntities.find((item) => item.id === 'page-ar-liquid-damage-repair') as {
  id: string;
  slug: string;
  seo?: {
    title?: string;
    description?: string;
    canonicalUrl?: string;
    lastModified?: string;
    alternates?: Record<string, string>;
  };
} | undefined;
const projectedArabicLiquidPage = SEO_GRAPH.routableEntities.find((item) => item.id === 'page-ar-liquid-damage-repair') as {
  id: string;
  slug: string;
  seo?: { canonicalUrl?: string; alternates?: Record<string, string> };
} | undefined;
const arabicLiquidFaqCount = (arabicLiquidPageSource.match(/\n\s*q:\s*'/g) ?? []).length;
const requiredArabicLiquidLinks = [
  '/ar/motherboard-repair-kuwait',
  '/ar/laptop-keyboard-replacement-kuwait',
  '/ar/laptop-plugged-in-not-charging',
  '/ar/macbook-repair-kuwait',
  '/ar/laptop-battery-replacement-kuwait'
];
const missingArabicLiquidLinks = requiredArabicLiquidLinks.filter((path) => !knownPaths.has(path) || !arabicLiquidPageSource.includes(path));
const arabicLiquidImages = [
  'laptop-motherboard-diagnostic-bench-repair.webp',
  'laptop-battery-motherboard-open-repair.webp',
  'laptop-open-repair-bench.webp'
];
const missingArabicLiquidImages = arabicLiquidImages.filter((name) =>
  !existsSync(new URL(`../public/images/${name}`, import.meta.url))
);
const emergencyBlock = arabicLiquidPageSource.split('const EMERGENCY_STEPS = [')[1]?.split('const DONT_STEPS = [')[0] ?? '';
const labBlock = arabicLiquidPageSource.split('const LAB_STEPS = [')[1]?.split('const FAQ = [')[0] ?? '';
const ArabicLiquidPageRoute = "path: 'ar/laptop-liquid-damage-repair-kuwait'";
const genericArabicRoute = "path: 'ar/:slug'";
check(Boolean(arabicLiquidPage && arabicLiquidPage.slug === 'ar/laptop-liquid-damage-repair-kuwait'), 'Arabic liquid-damage service page must remain registered in KCROC_GRAPH.');
check(Boolean(arabicLiquidPage?.seo?.canonicalUrl === 'https://www.computerrepairkuwait.com/ar/laptop-liquid-damage-repair-kuwait'), 'Arabic liquid-damage canonical URL must stay self-referencing.');
check(Boolean(arabicLiquidPage?.seo?.alternates?.['ar-KW'] && arabicLiquidPage.seo.alternates['en-KW'] === 'https://www.computerrepairkuwait.com/laptop-liquid-damage-repair-kuwait'), 'Arabic and English liquid-damage hreflang alternates must remain reciprocal.');
check(Boolean(projectedArabicLiquidPage?.seo?.canonicalUrl === arabicLiquidPage?.seo?.canonicalUrl), 'Generated SEO projection must preserve Arabic liquid-damage canonical metadata.');
check(appSource.includes(ArabicLiquidPageRoute) && appSource.indexOf(ArabicLiquidPageRoute) < appSource.indexOf(genericArabicRoute), 'Arabic liquid-damage page must use its dedicated route before the generic Arabic slug route.');
check(arabicLiquidFaqCount >= 8 && arabicLiquidPageSource.includes('FAQ.map((item, index)') && arabicLiquidPageSource.includes('<details key={item.q}'), 'Arabic liquid-damage page must render at least eight answered FAQs in the prerendered DOM.');
check(arabicLiquidPageSource.includes("'@type': 'FAQPage'") && arabicLiquidPageSource.includes("'@type': 'Service'") && arabicLiquidPageSource.includes('FAQ.map((item) => ({'), 'Arabic liquid-damage structured data must include the matching Service and visible FAQPage.');
check(['انكب', 'ماي', 'شنو', 'خلّه مطفي'].every((term) => arabicLiquidPageSource.includes(term)), 'Arabic liquid-damage copy must retain natural Kuwaiti vocabulary and emergency phrasing.');
check((emergencyBlock.match(/title: '/g) ?? []).length >= 5, 'Arabic liquid-damage page must keep at least five immediate safety steps.');
check((labBlock.match(/title: '/g) ?? []).length >= 6, 'Arabic liquid-damage page must explain the six-stage technician process.');
check((arabicLiquidPageSource.match(/<PhotoFigure/g) ?? []).length >= 3 && (arabicLiquidPageSource.match(/alt="/g) ?? []).length >= 2, 'Arabic liquid-damage page must display first-party repair photos with descriptive alternative text.');
check(missingArabicLiquidImages.length === 0, `Arabic liquid-damage photos must exist in public assets: ${missingArabicLiquidImages.join(', ')}`);
check(missingArabicLiquidLinks.length === 0, `Arabic liquid-damage related links must resolve in KCROC_GRAPH: ${missingArabicLiquidLinks.join(', ')}`);
check(arabicLiquidPageSource.includes('من 20 د.ك') && arabicLiquidPageSource.includes('من 35 د.ك') && arabicLiquidPageSource.includes('من 10 د.ك + القطعة'), 'Arabic liquid-damage pricing must distinguish limited cleaning, keyboard labour plus part, and board-level starting price.');
check(arabicLiquidPageSource.includes('ما نقدر نضمن الوصول للبيانات') && arabicLiquidPageSource.includes('مو كل لوحة أو جهاز يدخل الجهاز كامل في حوض التنظيف'), 'Arabic liquid-damage page must avoid universal data-preservation and blanket ultrasonic-cleaning promises.');

if (errors.length > 0) {
  console.error('❌ Laptop liquid-spill page validation failed:');
  errors.forEach((error) => console.error('  - ' + error));
  process.exit(1);
}

console.log('✅ Laptop liquid-spill page validation passed: emergency actions, safe advice, technical accuracy and SEO projection.');
