// Enforce reciprocal language coverage for every active indexable non-editorial graph route.
import { KCROC_GRAPH } from '../src/data/graph';
import { ENGLISH_TO_ARABIC, ARABIC_TO_ENGLISH, isArabicPath } from '../src/utils/locale';
const host=KCROC_GRAPH.business!.websiteUrl;
const normalize=(url:string)=>new URL(url,host).pathname.replace(/\/+$/,'')||'/';
const excluded=(path:string)=>/^\/(?:ar\/)?(?:blog|guides|news)(?:\/|$)/.test(path)||path==='/404';
const routes=new Map(KCROC_GRAPH.routableEntities.filter(e=>e.isActive && e.seo?.canonicalUrl && !e.seo.canonicalUrl.includes('#') && !(e.seo.robots||'').toLowerCase().includes('noindex')).map(e=>[normalize(e.seo.canonicalUrl),e]));
const eligible=[...routes.keys()].filter(p=>!excluded(p)&&!isArabicPath(p)).sort();
const arabic=[...routes.keys()].filter(p=>!excluded(p)&&isArabicPath(p)).sort();
const errors:string[]=[];
const missing:string[]=[];
for(const en of eligible){
 const ar=ENGLISH_TO_ARABIC[en];
 if(!ar||!routes.has(ar)||ARABIC_TO_ENGLISH[ar]!==en){missing.push(en);continue;}
 const e=routes.get(en)!,a=routes.get(ar)!;
 for(const x of [e,a]){
  const alt=x.seo.alternates;
  if(!alt?.['en-KW']||normalize(alt['en-KW'])!==en||!alt['ar-KW']||normalize(alt['ar-KW'])!==ar)errors.push(x.id+' reciprocal hreflang mismatch');
 }
}
for(const ar of arabic){
 const en=ARABIC_TO_ENGLISH[ar];
 if(!en||!routes.has(en)||ENGLISH_TO_ARABIC[en]!==ar)errors.push(ar+' has no reciprocal English counterpart');
}
console.log(JSON.stringify({eligible:eligible.length,paired:eligible.length-missing.length,arabic:arabic.length,missingRoutes:missing,errors},null,2));
if(process.argv.includes('--strict')&&(missing.length||errors.length))process.exitCode=1;
