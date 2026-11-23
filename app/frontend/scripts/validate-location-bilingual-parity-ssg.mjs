import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { load } from 'cheerio';
const root = process.cwd();
const registry=fs.readFileSync(path.join(root,'src/utils/locale.ts'),'utf8');
const map=registry.slice(registry.indexOf('export const ENGLISH_TO_ARABIC:'),registry.indexOf('export const ARABIC_TO_ENGLISH:'));
const pairs=[...map.matchAll(/'([^']+)':\s*'([^']+)'/g)].map(m=>[m[1],m[2]]).filter(([en])=>en.startsWith('/location/'));
assert.equal(pairs.length,26,'All 26 active locations must have Arabic twins');
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

  if (physical) {
    // The paired Hawalli pages must offer the same repair decisions, not merely the same hero buttons.
    const enPage = read(en), arPage = read(ar);
    const enMain = enPage('main'), arMain = arPage('main');
    const enSource = fs.readFileSync(path.join(root, 'src/pages/HawalliLocationPage.tsx'), 'utf8');
    const arSource = fs.readFileSync(path.join(root, 'src/pages/ArabicHawalliLocationPage.tsx'), 'utf8');
    const groupMatches = [...enSource.matchAll(/serviceIds:\s*\[([^\]]+)\]/g)];
    const englishServiceIds = [...new Set(groupMatches.flatMap(match => [...match[1].matchAll(/'([^']+)'/g)].map(m => m[1])))];
    const arabicServiceIds = [...new Set([...arSource.matchAll(/'(srv-[^']+)'\s*:\s*\{/g)].map(m => m[1]))];
    assert.equal(englishServiceIds.length, 15, 'Hawalli EN service groups must remain explicit');
    assert.deepEqual(arabicServiceIds.slice().sort(), englishServiceIds.slice().sort(), 'Hawalli service IDs must match across languages');
    const arServices = arMain.find('[data-hawalli-ar-service]');
    assert.equal(arServices.length, englishServiceIds.length, 'All Hawalli services need Arabic cards');
    for (const item of arServices.toArray()) {
      const href = arPage(item).attr('href') || '';
      assert.ok(href.startsWith('/ar/'), 'Arabic service must link to Arabic destination: ' + href);
    }

    const englishPricing = enMain.find('[data-hawalli-pricing-card]');
    const arabicPricing = arMain.find('[data-hawalli-pricing-card]');
    assert.equal(englishPricing.length, 6, 'English Hawalli baseline price-card count');
    assert.equal(arabicPricing.length, englishPricing.length, 'Arabic Hawalli must show all six price anchors');
    for (const item of englishPricing.toArray()) {
      const id = enPage(item).attr('data-hawalli-price');
      const englishPrice = enPage(item).find('p').eq(1).text().match(/\d+/g)?.join('/') || '';
      const arCard = arMain.find('[data-hawalli-price="' + id + '"]');
      const arabicPrice = arCard.find('p').eq(1).text().match(/\d+/g)?.join('/') || '';
      assert.equal(arCard.length, 1, 'Missing Arabic price card: ' + id);
      assert.equal(arabicPrice, englishPrice, 'Arabic price mismatch for ' + id);
    }

    assert.equal(arMain.find('[data-hawalli-ar-problem]').length, 12, 'Hawalli requires all 12 active localized problem links');
    assert.equal(arMain.find('[data-hawalli-ar-brand]').length, 7, 'Hawalli requires six laptop brands and MacBook');
    assert.equal(arMain.find('[data-hawalli-ar-area]').length, pairs.length - 1, 'Hawalli must link every other active Arabic area');
    assert.equal(arMain.find('[data-hawalli-ar-trust]').length, 6, 'Hawalli requires all six repair assurances');
    assert.equal(arMain.find('[data-hawalli-ar-faq]').length, 12, 'Hawalli needs full Arabic FAQ depth');
    assert.equal(arMain.find('[data-hawalli-ar-review]').length, enMain.find('blockquote').length, 'Hawalli review counts should match English');
    assert.equal(arMain.find('a[href="/ar/gallery"]').length, 1, 'Hawalli Arabic gallery must keep Arabic visitors localized');
    const images = arMain.find('img').toArray().map(el => arPage(el).attr('src')).filter(Boolean);
    assert.equal(new Set(images).size, images.length, 'Hawalli must not display the same photo twice on one page');
    for (const item of arMain.find('[data-hawalli-ar-problem], [data-hawalli-ar-brand], [data-hawalli-ar-area]').toArray()) {
      const href = arPage(item).attr('href') || '';
      assert.ok(href.startsWith('/ar/'), 'Arabic discovery link must stay Arabic: ' + href);
    }
  }
}
console.log('Location bilingual parity: '+pairs.length+' EN/AR pairs, shared location CTAs, one H1 per page, Arabic hero photos, canonical, local pricing, Hawalli physical-lab identity, service catalog, price values, reviews, trust, Arabic discovery and unique photos verified.');
