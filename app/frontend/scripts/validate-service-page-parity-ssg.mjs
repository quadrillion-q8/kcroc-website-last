import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { load } from 'cheerio';
const root = process.cwd();
const locale = fs.readFileSync(path.join(root,'src/utils/locale.ts'),'utf8');
const mapping = locale.slice(locale.indexOf('export const ENGLISH_TO_ARABIC:'),locale.indexOf('export const ARABIC_TO_ENGLISH:'));
const mappings = new Map([...mapping.matchAll(/'([^']+)':\s*'([^']+)'/g)].map(m => [m[1],m[2]]));
const read = p=> { const slug=p.replace(/^\//,''); const filename=[slug+'.html',slug+'/index.html'].map(x=>path.join(root,'dist',x)).find(x=>fs.existsSync(x)); assert.ok(filename,p);return load(fs.readFileSync(filename,'utf8')); };
// Service URLs are identified by actual graph-backed service cards, not by
// "-kuwait" suffixes shared with problem pages.
const englishDirectory=read('/services');
const arabicDirectory=read('/ar/services');
const cards=($)=>new Map($('main [data-service-id]').toArray().map(el=>[$(el).attr('data-service-id'),$(el).attr('href')]));
const enCards=cards(englishDirectory), arCards=cards(arabicDirectory);
assert.equal(enCards.size,22,'Expected 22 distinct repair service cards');
assert.deepEqual([...arCards.keys()].sort(),[...enCards.keys()].sort(),'Matching service inventory');
const pairs=[...enCards].map(([id,en])=>{
  const ar=arCards.get(id);
  assert.ok(en && ar && ar.startsWith('/ar/'),id+' localized service destination');
  assert.equal(mappings.get(en),ar,id+' reciprocal service mapping');
  return [en,ar];
});
assert.equal(mappings.get('/computer-repair-kuwait'),'/ar/computer-repair-kuwait');
pairs.push(['/computer-repair-kuwait','/ar/computer-repair-kuwait']);
assert.equal(new Set(pairs.map(([,ar])=>ar)).size,23,'Expected 23 distinct commercial repair pairs including the computer hub');
for (const [en,ar] of pairs) {
  const e=read(en),a=read(ar);
  const main=a('main');
  assert.equal(main.find('h1').length,1,ar+' one H1');
  assert.equal(main.attr('dir'),'rtl',ar+' RTL');
  assert.equal(main.find('[data-service-conversion="ar"]').length,1,ar+' shared conversion');
  assert.equal(main.find('[data-service-action="booking"][href="/ar/book"]').length,1,ar+' local booking');
  assert.equal(main.find('[data-service-action="pricing"][href="/ar/pricing"]').length,1,ar+' local pricing');
  const wa=main.find('[data-service-action="whatsapp"]').attr('href') || '';
  assert.ok(/^https:\/\/wa\.me\//.test(wa),ar+' WhatsApp URL');
  assert.ok(/[\u0600-\u06ff]/.test(decodeURIComponent(wa)),ar+' Arabic WhatsApp intent');
  // Commercial intake must request useful model and pickup details, not merely a generic greeting.
  const technicalParityRoutes = ['/ar/motherboard-repair-kuwait','/ar/ssd-ram-upgrade-kuwait','/ar/laptop-hinge-repair-kuwait'];
  if (technicalParityRoutes.includes(ar)) {
    const section = main.find('[data-ar-technical-parity="'+ar.slice(4)+'"]');
    assert.equal(section.length,1,ar+' technical diagnostic section');
    assert.equal(section.find('[data-ar-technical-check]').length,4,ar+' four static diagnostic checks');
    assert.equal(section.find('h2').length,1,ar+' technical heading');
    assert.equal(section.find('a[href="/ar/pricing"]').length,1,ar+' localized pricing');
  }
  const intakeRoutes = ['/ar/computer-repair-kuwait','/ar/laptop-repair-kuwait','/ar/motherboard-repair-kuwait','/ar/gaming-pc-repair-kuwait','/ar/ssd-ram-upgrade-kuwait'];
  if (intakeRoutes.includes(ar)) {
    const message = new URL(wa).searchParams.get('text') || '';
    assert.ok(message.includes('الموديل') || message.includes('مواصفات'),ar+' model or specifications intake');
    assert.ok(message.includes('المنطقة'),ar+' pickup area intake');
    assert.ok(message.includes('السعر'),ar+' quote intake');
  }
  if (['/ar/computer-repair-kuwait','/ar/gaming-pc-repair-kuwait'].includes(ar)) {
    assert.ok(main.find('a[href="/ar/gallery"]').length>0,ar+' localized repair proof');
    assert.equal(main.find('a[href="/gallery"]').length,0,ar+' no English gallery links');
  }
  assert.ok(main.find('img').toArray().some(img=> /[\u0600-\u06ff]/.test(a(img).attr('alt')||'')),ar+' Arabic photo alt');
  assert.equal(a('link[rel="canonical"]').attr('href'),'https://www.computerrepairkuwait.com'+ar,ar);
  if (e('main [data-service-layout="service"], main [data-service-layout="laptop-repair"]').length) {
    assert.equal(e('main [data-service-conversion="en"]').length,1,en+' shared template CTA');
    assert.equal(e('main [data-service-action="booking"][href="/book"]').length,1,en+' original booking');
  }
}
console.log('Service page parity: '+pairs.length+' Arabic commercial routes with shared conversion, quote intent, pricing, one H1, RTL, canonical and repair images verified.');
