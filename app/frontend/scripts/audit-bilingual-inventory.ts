// Read-only inventory: canonical active graph pages, excluding editorial posts and system routes.
import { KCROC_GRAPH } from '../src/data/graph';
import { ENGLISH_TO_ARABIC, ARABIC_TO_ENGLISH, isArabicPath } from '../src/utils/locale';
const routes = new Set<string>();
for (const entity of KCROC_GRAPH.routableEntities) {
 const seo = entity.seo;
 if (!seo?.canonicalUrl || seo.canonicalUrl.includes('#') || (seo.robots || '').toLowerCase().includes('noindex')) continue;
 const path = new URL(seo.canonicalUrl, KCROC_GRAPH.business!.websiteUrl).pathname.replace(/\/$/, '') || '/';
 if (/^\/(blog|guides|news)(\/|$)/.test(path) || path === '/404' || entity.entityType === 'CaseStudy') continue;
 routes.add(path);
}
const eligible = [...routes].filter(p=>!isArabicPath(p)).sort();
const paired = eligible.filter(p=> {
 const ar=ENGLISH_TO_ARABIC[p];
 return !!ar && routes.has(ar) && ARABIC_TO_ENGLISH[ar]===p;
});
const missing=eligible.filter(p=>!paired.includes(p));
console.log(JSON.stringify({eligible:eligible.length,paired:paired.length,missing:missing.length,missingRoutes:missing},null,2));
if (process.argv.includes('--strict') && missing.length) process.exitCode=1;
