import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { load } from 'cheerio';
const specs = [{"slug":"laptop-cleaning-thermal-paste-kuwait","id":"srv-laptop-thermal-service","photo":"/images/laptop-cpu-thermal-paste-reapplication.webp"},{"slug":"laptop-fan-replacement-kuwait","id":"srv-laptop-fan","photo":"/images/laptop-cooling-fan-replacement-part-new.webp"},{"slug":"macbook-charging-port-repair-kuwait","id":"srv-macbook-charging-port","photo":"/images/gallery/macbook-pro-thunderbolt-usb-c-port-replacement-board-repair.webp"},{"slug":"bios-repair-kuwait","id":"srv-bios-repair","photo":"/images/guides/bios-recovery/micro-soldering-bios-ic.webp"},{"slug":"pc-power-supply-replacement-kuwait","id":"srv-desktop-psu","photo":"/images/breadboarding-motherboard-with-corsair-power-supply.webp"},{"slug":"macbook-liquid-damage-repair-kuwait","id":"srv-macbook-liquid","photo":"/images/gallery/macbook-pro-16-m1-logic-board-motherboard-repair.webp"}];
const root = process.cwd();
const read = (url) => {
  const rel = url.slice(1);
  const options = [path.join(root, 'dist', rel + '.html'),path.join(root, 'dist', rel, 'index.html')];
  const filename = options.find(existsSync);
  assert.ok(filename, 'Missing SSG HTML for ' + url);
  return load(readFileSync(filename, 'utf8'));
};
for (const spec of specs) {
  const en = '/' + spec.slug, ar = '/ar/' + spec.slug;
  for (const [url, lang] of [[en,'en'],[ar,'ar']]) {
    const $ = read(url);
    const main = $('main[data-repair-expansion="' + spec.slug + '"]');
    assert.equal(main.length,1,url + ' main template');
    assert.equal(main.find('h1').length,1,url + ' single H1');
    assert.equal(main.attr('dir'),lang === 'ar'?'rtl':'ltr');
    assert.equal(main.find('[data-service-conversion="' + lang + '"]').length,1,url + ' conversion');
    assert.equal(main.find('[data-service-action="booking"]').attr('href'),lang==='ar'?'/ar/book':'/book');
    assert.equal(main.find('[data-service-action="pricing"]').attr('href'),lang==='ar'?'/ar/pricing':'/pricing');
    assert.equal(main.find('img[src="' + spec.photo + '"]').length,1,url + ' unique relevant image');
    assert.equal($('link[rel="canonical"]').attr('href'),'https://www.computerrepairkuwait.com'+url,url+' canonical');
    const alts=$('link[rel="alternate"][hreflang]');
    assert.ok(alts.toArray().some(e=>$(e).attr('hreflang')==='ar-KW'&&$(e).attr('href')==='https://www.computerrepairkuwait.com'+ar),url+' Arabic hreflang');
    assert.ok(alts.toArray().some(e=>$(e).attr('hreflang')==='en-KW'&&$(e).attr('href')==='https://www.computerrepairkuwait.com'+en),url+' English hreflang');
    assert.ok(main.find('details[data-kcroc-faq-item]').length >= 3,url+' questions');
    if(lang==='ar') assert.ok(/[\u0600-\u06ff]/.test(main.find('img').attr('alt')||''),url+' Arabic alt');
  }
}
const enDirectory=read('/services'), arDirectory=read('/ar/services');
for(const spec of specs){
  assert.equal(enDirectory('[data-service-id="'+spec.id+'"] a').length,0,'Card is itself a link');
  assert.equal(enDirectory('[data-service-id="'+spec.id+'"]').attr('href'),'/'+spec.slug);
  assert.equal(arDirectory('[data-service-id="'+spec.id+'"]').attr('href'),'/ar/'+spec.slug);
}
console.log('Repair expansion: all six bilingual service pairs, canonicals, hreflang, single-use images, CTAs and FAQs verified.');
