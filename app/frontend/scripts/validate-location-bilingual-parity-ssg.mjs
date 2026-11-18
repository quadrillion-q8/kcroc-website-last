import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { load } from 'cheerio';
const root = process.cwd();
const registry=fs.readFileSync(path.join(root,'src/utils/locale.ts'),'utf8');
const map=registry.slice(registry.indexOf('export const ENGLISH_TO_ARABIC:'),registry.indexOf('export const ARABIC_TO_ENGLISH:'));
const pairs=[...map.matchAll(/'([^']+)':\s*'([^']+)'/g)].map(m=>[m[1],m[2]]).filter(([en])=>en.startsWith('/location/'));
assert.equal(pairs.length,8,'Expected eight existing location counterparts');
const read = p => {
  const slug=p.slice(1);const file=[slug+'.html',slug+'/index.html'].map(x=>path.join(root,'dist',x)).find(x=>fs.existsSync(x));
  assert.ok(file,p);return load(fs.readFileSync(file,'utf8'));
};
const host='https://www.computerrepairkuwait.com';
for (const [en,ar] of pairs) {
  const slug=en.split('/').at(-1),physical=slug==='hawalli';
  for (const [route,language] of [[en,'en'],[ar,'ar']]) {
    const $=read(route), main=$('main');
    const controls=main.find('[data-location-hero-actions="'+language+'"]');
    assert.equal(controls.length,1,route+' common hero conversion row');
    assert.equal(controls.attr('data-location-slug'),slug,route+' location attribution');
    assert.equal(controls.find('[data-location-action="booking"]').attr('href'),language==='ar'?'/ar/book':'/book',route+' booking destination');
    const wa=controls.find('[data-location-action="whatsapp"]').attr('href')||'';
    assert.ok(/^https:\/\/wa\.me\//.test(wa),route+' WhatsApp');
    if(language==='ar') {
      assert.ok(/[\u0600-\u06ff]/.test(decodeURIComponent(wa)),route+' Arabic message');
      assert.equal(controls.find('[data-location-action="pricing"]').attr('href'),'/ar/pricing',route+' Arabic pricing');
      assert.equal(main.attr('dir'),'rtl',route+' RTL');
      assert.ok(main.find('img').toArray().some(x=>/[\u0600-\u06ff]/.test($(x).attr('alt')||'')),route+' Arabic photo');
      if (physical) assert.ok(main.find('a[href="/ar/book"]').length >= 3,route+' all three Hawalli booking CTAs');
      if (!physical) {
        const hero=main.find('[data-location-hero="true"]');
        assert.equal(hero.find('[data-location-scope-note="true"] a[href="/ar/computer-repair-hawalli"]').length,1,route+' central lab');
        assert.ok(hero.find('img').length>=1,route+' hero evidence');
        assert.ok(hero.find('[data-location-action="call"]').attr('href')?.startsWith('tel:+965'),route+' phone');
        assert.ok(main.find('[data-kcroc-rollout="location-area-ar"] [data-kcroc-editorial-panel="location-content"]').length>=5,route+' editorial design');
        assert.ok(main.find('a[href="/ar/book"]').length>=2,route+' hero and final booking');
      }
    }
    assert.equal(main.find('[data-location-scope="'+(physical?'physical-lab':'pickup-only')+'"]').length,1,route+' business scope');
    assert.equal(main.find('h1').length,1,route+' one H1');
    assert.equal($('link[rel="canonical"]').attr('href'),host+route,route+' preserved canonical');
    assert.ok(main.find('[data-kcroc-editorial-panel]').length>0,route+' editorial surface');
  }
}
console.log('Location bilingual parity: '+pairs.length+' EN/AR pairs, shared location CTAs, one H1 per page, Arabic hero photos, canonical, local pricing, and Hawalli-only physical lab verified.');
