import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { load } from 'cheerio';
const root = process.cwd();
const locale = fs.readFileSync(path.join(root,'src/utils/locale.ts'),'utf8');
const section = locale.slice(locale.indexOf('export const ENGLISH_TO_ARABIC:'),locale.indexOf('export const ARABIC_TO_ENGLISH:'));
const pairs = [...section.matchAll(/'([^']+)':\s*'([^']+)'/g)].map(m=>[m[1],m[2]]);
const reverse = locale.slice(locale.indexOf('export const ARABIC_TO_ENGLISH:'),locale.indexOf('export type SiteLocale'));
const host = 'https://www.computerrepairkuwait.com';
const read = pathname => {
  const slug = pathname.replace(/^\//,'');
  const candidates = slug ? [slug+'.html',slug+'/index.html'] : ['index.html'];
  const file = candidates.map(x=>path.join(root,'dist',x)).find(x=>fs.existsSync(x));
  assert.ok(file,'Missing prerendered route '+pathname);
  return load(fs.readFileSync(file,'utf8'));
};
assert.ok(pairs.length >= 35);
for (const [en,ar] of pairs) {
  assert.ok(reverse.includes("'"+ar+"': '"+en+"'"),'Nonreciprocal switch '+ar);
  const e = read(en), a = read(ar);
  assert.equal(a('main#main-content').length,1,ar);
  assert.equal(a('main').attr('dir'),'rtl',ar);
  assert.equal(a('main').attr('data-site-locale'),'ar',ar);
  assert.equal(e('main').attr('data-site-locale'),'en',en);
  assert.ok(a('main h1').length>=1,ar);
  assert.ok(a('header a[href="/ar"]').length>0,ar+' home link');
  assert.equal(a('header a[href="/book"]:not([lang="en"])').length,0,ar+' English booking');
  assert.ok(a('header a[href="/ar/book"]').length>0,ar+' Arabic booking');
  assert.ok(a('header a[href="'+en+'"]').length>0,ar+' language switch');
  assert.ok(e('header a[href="'+ar+'"]').length>0,en+' language switch');
  assert.equal(a('link[rel="canonical"]').attr('href'),host+ar,ar);
  assert.equal(e('link[rel="canonical"]').attr('href'),host+en,en);
  // Existing reciprocal hreflang is checked without inventing variants for English-only content.
  assert.ok(a('link[hreflang="en-KW"], link[hreflang="en"]').toArray().some(x => a(x).attr('href') === host+en),ar+' hreflang');
  assert.ok(e('link[hreflang="ar-KW"], link[hreflang="ar"]').toArray().some(x => e(x).attr('href') === host+ar),en+' hreflang');
}
const e=read('/services'),a=read('/ar/services');
const cards = $ => $('[data-service-id]').map((_,x)=>$(x).attr('data-service-id')).get();
assert.deepEqual(cards(a),cards(e),'Service directory inventory diverged');
assert.equal(a('[data-service-id][data-translated="true"]').length,cards(e).length,'Missing Arabic service copy');
assert.equal(a('[data-service-id][href="/ar/laptop-battery-replacement-kuwait"]').length,1);
assert.equal(a('[data-service-id][href="/ar/macbook-battery-replacement-kuwait"]').length,1);
assert.equal(a('[data-directory-locale="ar"]').length,1);
console.log('Phase 6 bilingual site: '+pairs.length+' reciprocal route pairs; '+cards(e).length+' shared service directory cards; canonical, hreflang, RTL, home and booking links verified.');

 // Conversion parity: check actual prerendered form inventory, not only route links.
const bookingEn = read('/book'), bookingAr = read('/ar/book');
for (const $ of [bookingEn, bookingAr]) {
  assert.equal($('main form button[aria-pressed]').length, 6, 'Booking categories');
  assert.equal($('main form button[aria-pressed="true"]').length, 1, 'Default device');
  for (const name of ['deviceModel','issue','location','preferredPickup']) {
    assert.equal($('main form [name="'+name+'"]').length, 1, name);
  }
  assert.equal($('main form select[name="preferredPickup"] option').length,4);
}
for (const route of ['/contact','/ar/contact']) {
  const $ = read(route);
  assert.equal($('main form [required]').length,4,route+' required fields');
  assert.equal($('main form select option').length,10,route+' area inventory');
}
for (const name of ['BookingPage','ArabicBookingPage','Contact','ArabicContactPage']) {
  const source = fs.readFileSync(path.join(root,'src/pages',name+'.tsx'),'utf8');
  assert.ok(source.includes('handoffWhatsApp('),name+' shared handoff');
  assert.ok(source.includes("trackConversion('whatsapp_click'"),name+' tracking');
  assert.ok(!source.includes('window.open('),name+' popup regression');
  assert.ok(!source.includes('location_context: location.trim()'),name+' raw location analytics');
}
console.log('Phase 6.4 conversion parity checks passed.');

for (const [route, count] of [['/ar/locations',26],['/ar/problems',12]]) {
 const $ = read(route);
 const cards = $('main [data-directory-item]');
 assert.equal(cards.length,count,route+' directory inventory');
 assert.equal(new Set(cards.map((_,x)=>$(x).attr('data-directory-item')).get()).size,count,route+' distinct cards');
 assert.ok($('main a[href="/ar/book"]').length,route+' booking CTA');
 for (const x of cards.toArray()) {
  const card=$(x);
  if(card.attr('data-translated')==='false') assert.ok(card.text().includes('بالإنجليزي'),route+' explicit untranslated destination');
 }
}
console.log('Phase 6.5 directory inventory checks passed.');

const problemDirectory=read('/ar/problems');
assert.equal(problemDirectory('main [data-directory-item][data-translated="true"]').length,12,'All active problem entries have Arabic destinations');
for(const el of problemDirectory('main [data-directory-item]').toArray()){
 const route=problemDirectory(el).attr('href');
 assert.ok(route?.startsWith('/ar/'),route);
 const $=read(route);
 assert.equal($('main h1').length,1,route+' H1');
 if(route==='/ar/laptop-plugged-in-not-charging') {
  assert.equal($('main [data-charging-action="booking-hero"]').attr('href'),'/ar/book',route+' localized booking');
  assert.equal($('main [data-charging-safety-gate]').length,1,route+' safety gate');
  for(const position of ['hero','body']){
   const wa=$('main [data-charging-action="whatsapp-'+position+'"]').attr('href')||'';
   assert.ok(wa.startsWith('https://wa.me/'),route+' '+position+' WhatsApp');
   assert.ok((new URL(wa).searchParams.get('text')||'').includes('مفاتيح استرداد'),route+' privacy guidance');
  }
  assert.equal($('main [data-charging-safety-gate] a').length,2,route+' related emergency destinations');
  continue;
 }
 assert.ok($('main a[href="/ar/book"]').length,route+' booking');
 assert.equal($('main [data-arabic-problem]').length,1,route+' localized template');
 assert.ok($('main [data-problem-editorial-panel]').length>=5,route+' content sections');
 assert.ok($('main img').toArray().some(x=>/[\u0600-\u06ff]/.test($(x).attr('alt')||'')),route+' localized photo');
 assert.ok($('main details').length>=3,route+' FAQ');
 assert.ok($('main a[href^="https://wa.me/"]').toArray().some(x=>/[\u0600-\u06ff]/.test(decodeURIComponent($(x).attr('href')||''))),route+' WhatsApp');
}
console.log('Phase 6.5B Arabic problem inventory checked.');

const locationDirectory=read('/ar/locations');
assert.equal(locationDirectory('main [data-directory-item][data-translated="true"]').length,26,'Every active location directory entry has an Arabic destination');
for(const el of locationDirectory('main [data-directory-item]').toArray()){
 const route=locationDirectory(el).attr('href');
 assert.ok(route?.startsWith('/ar/computer-repair-'),route);
 read(route);
}
console.log('Phase 6.5C: all 26 Arabic location destinations verified.');

const businessPages=['about','gallery','faq','privacy-policy','terms-of-service','privacy-security-kuwait'];
for(const slug of businessPages){
 const $=read('/ar/'+slug);
 assert.equal($('main h1').length,1,slug+' H1');
 assert.ok(/[\u0600-\u06ff]/.test($('main h1').text()),slug+' Arabic H1');
 assert.equal($('link[rel="canonical"]').attr('href'),'https://www.computerrepairkuwait.com/ar/'+slug,slug+' canonical');
 assert.ok($('footer a[href="/ar/privacy-policy"]').length,slug+' Arabic privacy footer');
 assert.ok($('footer a[href="/ar/terms-of-service"]').length,slug+' Arabic terms footer');
}
const arFaq=read('/ar/faq'), enFaq=read('/faq');
assert.equal(arFaq('main details').length,enFaq('main details').length,'Matching FAQ inventory');
assert.deepEqual(arFaq('main details').map((_,x)=>arFaq(x).attr('id')).get().sort(),enFaq('main details').map((_,x)=>enFaq(x).attr('id')).get().sort(),'Stable FAQ IDs');
assert.equal(arFaq('main input[type="search"]').length,1,'Arabic FAQ search');
const arGallery=read('/ar/gallery'), enGallery=read('/gallery');
assert.deepEqual(arGallery('main img').map((_,x)=>arGallery(x).attr('src')).get(),enGallery('main img').map((_,x)=>enGallery(x).attr('src')).get(),'Identical gallery image inventory');
assert.equal(arGallery('main button[aria-pressed]').length,6,'Arabic gallery filters');
for(const [slug,count] of [['privacy-policy',8],['terms-of-service',9],['privacy-security-kuwait',4]]){
 const $=read('/ar/'+slug);
 assert.equal($('main [data-legal-section]').length,count,slug+' full legal section inventory');
}
console.log('Phase 6.5D: Arabic business and legal routes, FAQ IDs, gallery inventory and localized legal navigation verified.');

const sitemapXml=fs.readFileSync(path.join(root,'public/sitemap.xml'),'utf8');
const sitemapPaths=[...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>new URL(m[1]).pathname.replace(/\/+$/,'')||'/');
const editorial=p=>/^\/(?:ar\/)?(?:blog|guides|news)(?:\/|$)/.test(p);
const pairedEnglish=new Map(pairs);
const pairedArabic=new Map(pairs.map(([en,ar])=>[ar,en]));
const eligible=sitemapPaths.filter(p=>!editorial(p)&&p!=='/404');
for(const route of eligible){
 const ar=route==='/ar'||route.startsWith('/ar/');
 const twin=(ar?pairedArabic:pairedEnglish).get(route);
 assert.ok(twin&&sitemapPaths.includes(twin),route+' requires indexed language counterpart');
}
const authorEN=read('/author/imran'),authorAR=read('/ar/author/imran');
for(const $ of [authorEN,authorAR]){
 assert.ok($('script[type="application/ld+json"]').toArray().some(x=>$(x).text().includes('https://www.computerrepairkuwait.com/author/imran#person')),'Shared author identity');
 assert.equal($('main h1').length,1);
}
assert.ok(read('/ar/about')('main a[href="/ar/author/imran"]').length,'Arabic author discovery');
console.log('Phase 6.5E: '+eligible.length+' non-editorial sitemap URLs have reciprocal language twins.');

const upgradedProblems=problemDirectory('main [data-directory-item]').toArray().map(el=>problemDirectory(el).attr('href')).filter(route=>route!=='/ar/laptop-plugged-in-not-charging');
assert.equal(upgradedProblems.length,11);
for(const route of upgradedProblems){
 const $=read(route);
 assert.ok($('main [data-diagnostic-row]').length>=4,route+' static diagnostic cases');
 for(const position of ['hero','body']){
  const cta=$('main [data-problem-cta="'+position+'"]');
  assert.equal(cta.length,1,route+' '+position+' CTA');
  assert.equal(cta.find('[data-problem-action="booking"]').attr('href'),'/ar/book',route+' localized booking');
  const wa=cta.find('[data-problem-action="whatsapp"]').attr('href')||'';
  assert.ok(wa.startsWith('https://wa.me/'),route+' WhatsApp link');
  const message=new URL(wa).searchParams.get('text')||'';
  for(const term of ['الموديل','المنطقة','السعر','كلمات مرور','مفاتيح استرداد'])assert.ok(message.includes(term),route+' intake '+term);
 }

 assert.ok($('main [data-problem-editorial-panel="faq"] details').length>=5,route+' expanded FAQ inventory');
 const faq=$('script[type="application/ld+json"]').toArray().flatMap(el=>{try{const x=JSON.parse($(el).text());return Array.isArray(x)?x:x['@graph']??[x]}catch{return []}}).find(x=>x['@type']==='FAQPage'&&String(x['@id']).endsWith('#faq'));
 assert.ok(faq,route+' FAQ schema');
 const questions=$('main [data-problem-editorial-panel="faq"] summary').toArray().map(el=>$(el).text().trim());
 assert.deepEqual(faq.mainEntity.map(x=>x.name),questions,route+' visible FAQ schema parity');
 assert.ok($('main a[href="/ar/gallery"]').length,route+' localized gallery');
}
const thermal=read('/ar/laptop-overheating-kuwait');
assert.equal(thermal('[data-problem-editorial-panel="thermal-triage"] button[aria-pressed]').length,6);
assert.equal(thermal('[data-diagnostic-row]').length,6);
const spill=read('/ar/spilled-water-on-laptop');
assert.equal(spill('[data-problem-editorial-panel="liquid-triage"] button[aria-pressed]').length,8);
assert.equal(spill('[data-diagnostic-row]').length,5);
const slow=read('/ar/laptop-running-very-slow');
assert.equal(slow('[data-diagnostic-row]').length,6);
assert.ok(slow('[data-problem-editorial-panel="price-estimates"]').text().includes('15–20'));
assert.ok(read('/ar/laptop-keyboard-not-working')('[data-problem-editorial-panel="quick-answer"]').length);
console.log('Phase 7A: eleven Arabic problem pages, static diagnostic cases, interactive control inventory and visible FAQ schema verified.');

const locationRoutes=locationDirectory('main [data-directory-item]').toArray().map(el=>locationDirectory(el).attr('href'));
assert.equal(locationRoutes.length,26);
for(const route of locationRoutes){
 const $=read(route);
 if(route==='/ar/computer-repair-hawalli') continue;
 assert.equal($('main [data-ar-location-quality]').length,1,route+' technical location quality module');
 assert.ok($('main [data-location-service-card-ar]').length>0,route+' service cards');
 if($('main [data-location-price-row-ar]').length) assert.ok($('main [data-location-pricing-ar] a[href="/ar/pricing"]').length,route+' pricing link');
}
for(const [slug,count] of [['abu-halifa',5],['surra',5],['riggae',7],['mahboula',9],['qortuba',6],['mishref',6],['salmiya',4],['farwaniya',10]]){
 const $=read('/ar/computer-repair-'+slug);
 assert.equal($('main [data-location-price-row-ar]').length,count,slug+' published price row parity');
}
for(const slug of ['riggae','salmiya'])assert.equal(read('/ar/computer-repair-'+slug)('[data-location-emergency-ar]').length,1);
const tower=read('/ar/computer-repair-kuwait-city');
assert.equal(tower('[data-tower-handover-generator] input').length,5);
assert.equal(tower('[data-tower-handover-generator] select option').length,7);
assert.ok(tower('[data-tower-handover-generator] a[href^="https://wa.me/"]').length);
for(const route of locationRoutes){
 const $=read(route);
 if(!$('main [data-location-scope="pickup-only"] [data-ar-location-quality]').length)continue;
 const faqs=$('main [data-location-scope="pickup-only"] details').toArray().map(x=>$(x).find('summary').text().trim());
 if(faqs.length===0)continue;
 const schema=$('script[type="application/ld+json"]').toArray().flatMap(x=>{try{const v=JSON.parse($(x).text());return Array.isArray(v)?v:v['@graph']??[v]}catch{return []}}).find(x=>x['@type']==='FAQPage'&&String(x['@id']).endsWith('#faq'));
 assert.ok(schema,route+' FAQ schema');
 assert.ok(faqs.every(q=>schema.mainEntity.some(x=>x.name===q)),route+' visible FAQ schema');
}
console.log('Phase 7B: Arabic location quality modules, price rows, emergency protocols and office handover inventory verified.');

const arContact=read('/ar/contact'), enContact=read('/contact');
assert.equal(arContact('main [data-kcroc-editorial-panel="contact-faq"] details').length,enContact('main [data-kcroc-editorial-panel="contact-faq"] details').length,'Contact visit FAQs');
assert.equal(arContact('main form button[type="submit"][aria-busy="false"]').length,1,'Contact busy state');
assert.ok(arContact('main form [role="status"]').length,'Arabic contact accessible feedback');
assert.ok(arContact('main a[href="/ar/laptop-repair-kuwait"]').length);
assert.ok(arContact('main a[href="/ar/computer-repair-kuwait"]').length);
const faqLinks=arFaq('main details').toArray();
for(const x of faqLinks){
 const id=arFaq(x).attr('id');
 assert.equal(arFaq(x).find('a[href="/ar/faq#'+id+'"]').length,1,id+' direct FAQ link');
 assert.equal(arFaq(x).find('summary').length,1);
}
assert.ok(arFaq('main [role="status"]').length,'FAQ result count');
const galleryButtons=arGallery('main button[data-gallery-photo]');
assert.equal(galleryButtons.length,arGallery('main img').length,'Arabic keyboard operable photo tiles');
assert.equal(galleryButtons.length,enGallery('main button[data-gallery-photo]').length,'Shared gallery tiles');
const alts=galleryButtons.map((_,x)=>arGallery(x).find('img').attr('alt')).get();
assert.ok(alts.every(alt=>/[\u0600-\u06ff]/.test(alt)),'Arabic photo descriptions');
assert.ok(new Set(alts).size>=Math.ceil(alts.length*.8),'Photo-specific descriptions, not generic categories');
for(const $ of [authorEN,authorAR])assert.equal($('main [data-author-article-language]').length,3,'Author editorial link inventory');
assert.ok(authorAR('main a[href="/ar/book"]').length,'Localized author booking');
assert.ok(authorAR('meta[property="og:locale"][content="ar_KW"]').length,'Arabic author social locale');
console.log('Phase 7C: Arabic contact, FAQ links, accessible gallery thumbnails and author metadata verified.');


// Phase 7F: full rendered commercial-route audit. Keep discovery findings
// report-only until reviewed against intentional redirects and editorial links.
const auditFindings = [];
const recordFinding = (route, kind, detail) => auditFindings.push({route,kind,detail});
const normalizedPath = p => p.replace(/\/+$/,'') || '/';
const indexedSet = new Set(sitemapPaths);
const commercialPairs = pairs.filter(([en])=>!editorial(en));
const routeSet = new Set(commercialPairs.flat());
assert.equal(routeSet.size,commercialPairs.length*2,'Duplicate commercial language mapping');
for(const route of routeSet){
 const $=read(route);
 const ar=pairedArabic.has(route);
 const opposite=ar?pairedArabic:pairedEnglish;
 const expectedLocale=ar?'ar':'en';
 if(!indexedSet.has(route))recordFinding(route,'missing-sitemap-entry',route);
 if($('head link[rel="canonical"]').length!==1)recordFinding(route,'canonical-count',String($('head link[rel="canonical"]').length));
 if($('main h1').length!==1)recordFinding(route,'h1-count',String($('main h1').length));
 if($('main').attr('dir')!==(ar?'rtl':'ltr'))recordFinding(route,'direction',String($('main').attr('dir')));
 const ids=new Set();
 for(const el of $('[id]').toArray()){
  const id=$(el).attr('id');
  if(ids.has(id))recordFinding(route,'duplicate-id',id);
  ids.add(id);
 }
 for(const el of $('main a[href]').toArray()){
  const a=$(el),href=a.attr('href');
  if(!href||!href.trim()){recordFinding(route,'empty-href','main link');continue;}
  if(href.startsWith('#')){
   let fragment;
   try{fragment=decodeURIComponent(href.slice(1));}catch{fragment=href.slice(1);}
   if(fragment&&!ids.has(fragment))recordFinding(route,'missing-fragment',href);
   continue;
  }
  if(!href.startsWith('/')&&!href.startsWith(host+'/'))continue;
  let url;
  try{url=new URL(href,host);}catch{recordFinding(route,'invalid-url',href);continue;}
  if(url.origin!==host)continue;
  const target=normalizedPath(url.pathname);
  const slug=target.slice(1);
  const files=slug?[slug+'.html',slug+'/index.html']:['index.html'];
  if(!files.some(f=>fs.existsSync(path.join(root,'dist',f))))recordFinding(route,'non-prerendered-target',target);
  const twin=(ar?pairedEnglish:pairedArabic).get(target);
  if(twin&&!editorial(target)&&target!==opposite.get(route)&&a.attr('lang')!==(ar?'en':'ar')&&a.attr('hreflang')!==(ar?'en':'ar'))recordFinding(route,'opposite-language-link',target+' -> '+twin);
 }
 for(const el of $('main img').toArray()){
  if($(el).attr('alt')===undefined)recordFinding(route,'missing-alt',$(el).attr('src')||'image');
 }
 for(const el of $('script[type="application/ld+json"]').toArray()){
  try{JSON.parse($(el).text());}catch{recordFinding(route,'invalid-json-ld','JSON-LD parse failed');}
 }
}
const uniqueFindings=[...new Map(auditFindings.map(f=>[JSON.stringify(f),f])).values()];
const counts={};
for(const finding of uniqueFindings)counts[finding.kind]=(counts[finding.kind]||0)+1;
const auditReport={commercialPairs:commercialPairs.length,commercialRoutes:routeSet.size,findings:uniqueFindings,counts};
fs.writeFileSync(path.join(root,'bilingual-quality-report.json'),JSON.stringify(auditReport,null,2)+'\n');
console.log('Phase 7F rendered commercial quality audit: '+routeSet.size+' routes; '+uniqueFindings.length+' review findings (report-only).');
console.log(JSON.stringify(counts));
for(const f of uniqueFindings)console.warn('[Phase 7F review] '+f.kind+' '+f.route+' '+f.detail);


// Phase 7G: premium design opt-in must never affect the two pricing pages.
for (const [en,ar] of commercialPairs) {
 for (const route of [en,ar]) {
  const $=read(route);
  const protectedPricing=route==='/pricing'||route==='/ar/pricing';
  assert.equal($('main#main-content').attr('data-kcroc-premium'),protectedPricing?undefined:'true',route+' premium design scope');
 }
}
const premiumCss=fs.readFileSync(path.join(root,'src/styles/kcroc-premium.css'),'utf8');
for(const token of ['--premium-graphite','--premium-paper','--premium-white','--premium-copper','[data-service-conversion]','[data-location-hero-actions]','[data-problem-cta]','[aria-pressed="true"]','prefers-reduced-motion']){
 assert.ok(premiumCss.includes(token),'Premium visual contract: '+token);
}
console.log('Phase 7G: premium opt-in, pricing exclusions and three visual treatments verified in static markup/source.');


// Phase 7G.1B: ensure the exact formerly low-contrast elements retain their
// semantic styling hooks, including Arabic brand final conversion controls.
for(const id of ['dell','hp','lenovo','asus','acer','msi']){
 for(const route of ['/'+id+'-laptop-repair-kuwait','/ar/brands/'+id+'-laptop-repair-kuwait']){
  const $=read(route);
  assert.equal($('main [data-premium-conversion]').length,1,route+' final conversion treatment');
  assert.equal($('main [data-premium-conversion] [data-premium-action="booking"]').attr('href'),route.startsWith('/ar/')?'/ar/book':'/book',route+' booking target');
  assert.ok($('main [data-premium-conversion] [data-premium-action="whatsapp"]').attr('href')?.includes('wa.me/'),route+' WhatsApp target');
 }
}
const msiVisual=read('/msi-laptop-repair-kuwait');
assert.ok(msiVisual('main [data-premium-model-chip]').length>=3,'MSI model chip visual contract');
assert.ok(msiVisual('main [data-premium-repair-focus]').length>=1,'MSI divider visual contract');
const cityVisual=read('/location/kuwait-city');
assert.ok(cityVisual('main [data-location-problem-link]').length>0,'Kuwait City problem card visual contract');
assert.ok(cityVisual('main [data-location-brand-link]').length>0,'Kuwait City brand card visual contract');
assert.equal(cityVisual('main [data-premium-light-card][href="/macbook-repair-kuwait"]').length,1,'Kuwait City Apple card visual contract');
console.log('Phase 7G.1B: brand and location visual hooks, conversion targets and pricing exclusion verified.');


// The Arabic Kuwait City route uses ArabicCommercialPage, rather than
// ArabicLocationPage. Require its actual rendered service-card hooks.
const arCityVisual=read('/ar/computer-repair-kuwait-city');
assert.ok(arCityVisual('main [aria-labelledby="arabic-services"] [data-premium-light-card="true"] > h3').length>=2,'Arabic Kuwait City actual service card headings');
assert.ok(arCityVisual('main [aria-labelledby="arabic-services"] [data-premium-light-card="true"] > p').length>=2,'Arabic Kuwait City actual service card descriptions');


// Phase 7G.2: keep the premium chrome present in both rendered home languages
// without introducing additional menus or changing published link targets.
for (const route of ['/', '/ar']) {
 const $=read(route);
 assert.equal($('header[data-premium-chrome="header"]').length,1,route+' one shared premium header');
 assert.equal($('footer[data-premium-chrome="footer"]').length,1,route+' one shared premium footer');
 assert.equal($('header [data-premium-header-booking]').attr('href'),route==='/ar'?'/ar/book':'/book',route+' localized header pickup');
}
