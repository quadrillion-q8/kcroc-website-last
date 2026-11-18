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
