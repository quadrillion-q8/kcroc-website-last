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

for (const [route, count] of [['/ar/locations',26],['/ar/problems',14]]) {
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
assert.equal(problemDirectory('main [data-directory-item][data-translated="true"]').length,14,'All problem entries have Arabic destinations');
for(const el of problemDirectory('main [data-directory-item]').toArray()){
 const route=problemDirectory(el).attr('href');
 assert.ok(route?.startsWith('/ar/'),route);
 const $=read(route);
 assert.equal($('main h1').length,1,route+' H1');
 if(route==='/ar/laptop-plugged-in-not-charging') {
  assert.ok($('main a[href^="https://wa.me/"]').length,route+' existing WhatsApp pickup');
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
assert.equal(upgradedProblems.length,13);
for(const route of upgradedProblems){
 const $=read(route);
 assert.ok($('main [data-diagnostic-row]').length>=4,route+' static diagnostic cases');
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
assert.equal(spill('[data-problem-editorial-panel="liquid-triage"] button[aria-pressed]').length,7);
assert.equal(spill('[data-diagnostic-row]').length,5);
const slow=read('/ar/laptop-running-very-slow');
assert.equal(slow('[data-diagnostic-row]').length,6);
assert.ok(slow('[data-problem-editorial-panel="price-estimates"]').text().includes('15–20'));
assert.ok(read('/ar/laptop-keyboard-not-working')('[data-problem-editorial-panel="quick-answer"]').length);
console.log('Phase 7A: thirteen Arabic problem pages, static diagnostic cases, interactive control inventory and visible FAQ schema verified.');
