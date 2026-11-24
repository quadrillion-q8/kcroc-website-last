import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { load } from 'cheerio';
const specs = [{"slug":"laptop-cleaning-thermal-paste-kuwait","id":"srv-laptop-thermal-service","photo":"/images/gallery/laptop-fan-and-heatsink-deep-cleaning-kuwait.webp"},{"slug":"laptop-fan-replacement-kuwait","id":"srv-laptop-fan","photo":"/images/gallery/lenovo-laptop-replacement-cooling-fan-part-number-label-kuwait.webp"},{"slug":"macbook-charging-port-repair-kuwait","id":"srv-macbook-charging-port","photo":"/images/gallery/macbook-pro-thunderbolt-usb-c-port-replacement-board-repair.webp"},{"slug":"bios-repair-kuwait","id":"srv-bios-repair","photo":"/images/gallery/asus-prime-z590-p-bios-ez-mode-core-i7-10700k.webp"},{"slug":"pc-power-supply-replacement-kuwait","id":"srv-desktop-psu","photo":"/images/gallery/hp-desktop-pc-opened-motherboard-psu-ssd-and-hard-drive-kuwait.webp"},{"slug":"macbook-liquid-damage-repair-kuwait","id":"srv-macbook-liquid","photo":"/images/gallery/macbook-pro-16-m1-logic-board-motherboard-repair.webp"}];
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
    const main = $('main [data-repair-expansion="' + spec.slug + '"]');
    assert.equal(main.length,1,url + ' main template');
    assert.equal(main.find('h1').length,1,url + ' single H1');
    assert.equal(main.attr('dir'),lang === 'ar'?'rtl':'ltr');
    assert.equal(main.find('[data-service-conversion="' + lang + '"]').length,1,url + ' conversion');
    assert.equal(main.find('[data-service-action="booking"]').attr('href'),lang==='ar'?'/ar/book':'/book');
    assert.equal(main.find('[data-service-action="pricing"]').attr('href'),lang==='ar'?'/ar/pricing':'/pricing');
    assert.equal(main.find('img[src="' + spec.photo + '"]').length,1,url + ' unique relevant image');
    assert.equal(main.find('[data-kcroc-service-photo="hero"]').length,1,url + ' contextual hero photo');
    assert.equal(main.find('[data-kcroc-service-photo="detail"]').length,1,url + ' diagnostic detail photo');
    assert.notEqual(main.find('[data-kcroc-service-photo="hero"]').attr('src'), main.find('[data-kcroc-service-photo="detail"]').attr('src'),url + ' no repeated photograph');
    assert.ok(main.find('.kcroc-repair-hero-figure figcaption').text().trim().length>15,url + ' meaningful hero photo caption');
    assert.ok(main.find('.kcroc-repair-detail-figure figcaption').text().trim().length>15,url + ' meaningful diagnostic photo caption');
    assert.equal(main.find('.kcroc-repair-confidence > .kcroc-repair-confidence-inner > div').length,3,url + ' readable three-point trust panel');
    assert.equal(main.find('.kcroc-repair-next-actions a').length,2,url + ' final bilingual booking and WhatsApp actions');
    assert.ok(main.find('.kcroc-repair-related-links a').length>=1,url + ' related services are available');
    if(lang==='ar') {
      const relatedLabels=main.find('.kcroc-repair-related-links a').toArray().map(el=>$(el).text().trim());
      assert.ok(relatedLabels.every(label=>/[\u0600-\u06ff]/.test(label)),url + ' all related service names must be localised, not raw English slugs');
      assert.ok(!relatedLabels.some(label=>label.includes('شوف الخدمة المرتبطة: ')),url + ' remove generic slug headings');
    }
    assert.equal($('link[rel="canonical"]').attr('href'),'https://www.computerrepairkuwait.com'+url,url+' canonical');
    const alts=$('link[rel="alternate"][hreflang]');
    assert.ok(alts.toArray().some(e=>$(e).attr('hreflang')==='ar-KW'&&$(e).attr('href')==='https://www.computerrepairkuwait.com'+ar),url+' Arabic hreflang');
    assert.ok(alts.toArray().some(e=>$(e).attr('hreflang')==='en-KW'&&$(e).attr('href')==='https://www.computerrepairkuwait.com'+en),url+' English hreflang');
    assert.ok(main.find('details[data-kcroc-faq-item]').length >= 3,url+' questions');
    if(spec.slug==='laptop-cleaning-thermal-paste-kuwait') {
      assert.equal(main.find('[data-thermal-guide-price="true"]').length,1,url+' price fact');
      assert.equal(main.find('a[data-thermal-book-cta="true"]').attr('href'),lang==='ar'?'/ar/book':'/book',url+' booking CTA destination');
      assert.equal(main.find('[data-thermal-section="environment"]').length,1,url+' climate context');
      assert.equal(main.find('[data-thermal-section="comparison"] table tbody tr').length,4,url+' comparison rows');
      assert.equal(main.find('[data-thermal-section="practical"]').length,1,url+' models, pricing and pickup');
      assert.equal(main.find('details[data-kcroc-faq-item]').length,12,url+' twelve FAQs');
       for(const module of ['precision','handover','scope','preparation','whatsapp-helper']){
         assert.equal(main.find('[data-thermal-module="'+module+'"]').length,1,url+' additive module '+module);
       }
       assert.equal(main.find('[data-thermal-module="precision"] table tbody tr').length,3,url+' thin-laptop engineering comparison');
       assert.equal(main.find('[data-thermal-module="handover"] article').length,3,url+' handover checks');
       assert.equal(main.find('[data-thermal-module="scope"] article').length,2,url+' included vs separately quoted scope');
       assert.equal(main.find('[data-thermal-module="preparation"] ol li').length,3,url+' pickup prep');
       const safetyLinks=main.find('[data-thermal-module="preparation"] a').toArray().map(e=>$(e).attr('href'));
       assert.ok(safetyLinks.includes(lang==='ar'?'/ar/laptop-overheating-kuwait':'/laptop-overheating-kuwait'),url+' localized overheating diagnosis link');
       assert.ok(safetyLinks.includes('/guides/why-is-my-laptop-so-hot'),url+' general overheating guide');
       assert.equal(main.find('[data-thermal-module="whatsapp-helper"] .kcroc-thermal-fast-example').length,1,url+' model/symptom/pickup brief');
       assert.equal(main.find('.kcroc-thermal-faq-bridge a').attr('href'),lang==='ar'?'/ar/laptop-repair-kuwait':'/laptop-repair-kuwait',url+' link to broader laptop repair');
      const schema=$('script[type="application/ld+json"]').toArray().flatMap(node=>{
        try {return JSON.parse($(node).html()||'{}')['@graph']||[];} catch {return [];}
      });
      const faqPage=schema.find(node=>node['@type']==='FAQPage');
      assert.ok(faqPage,url+' FAQPage JSON-LD');
      assert.equal(faqPage.mainEntity.length,12,url+' twelve schema QAs');
      const visible=main.find('details[data-kcroc-faq-item]').toArray().map(el=>[$(el).find('summary .kcroc-repair-faq-question').text().trim(),$(el).find('.kcroc-repair-faq-answer p').text().trim()]);
      for(let i=0;i<12;i++){
        assert.equal(faqPage.mainEntity[i].name,visible[i][0],url+' visible question matches schema');
        assert.equal(faqPage.mainEntity[i].acceptedAnswer.text,visible[i][1],url+' visible answer matches schema');
      }
      const services=schema.filter(node=>node['@type']==='Service');
      assert.equal(services.length,1,url+' exactly one localized Service JSON-LD node');
      const service=services[0];
      assert.equal(service['@id'],'https://www.computerrepairkuwait.com'+url+'#service',url+' localized service identity');
      assert.equal(service.name,main.find('h1').text().trim(),url+' service name matches visible H1');
      assert.equal(service.inLanguage,lang==='ar'?'ar-KW':'en-KW',url+' service language');
      assert.equal(service.offers?.priceSpecification?.minPrice,15,url+' published price min');
      assert.equal(service.offers?.priceSpecification?.maxPrice,20,url+' published price max');
      assert.equal(service.offers?.priceSpecification?.priceCurrency,'KWD',url+' published currency');
      assert.equal(service.offers?.availability,undefined,url+' no unverifiable InStock claim');
      assert.equal(service.provider?.['@id'],'https://www.computerrepairkuwait.com/#business',url+' existing single Hawalli business entity');
      assert.equal(service.availableChannel?.serviceLocation?.address?.addressCountry,'KW',url+' Kuwait lab');
      assert.ok(service.areaServed?.some(area=>area['@type']==='Country'&&area.name===(lang==='ar'?'الكويت':'Kuwait')),url+' country-wide service');
      if(lang==='ar') {
        assert.ok(/[\u0600-\u06ff]/.test(service.description)&&/[\u0600-\u06ff]/.test(service.serviceType)&&/[\u0600-\u06ff]/.test(service.offers.description),url+' localized service and offer text');
        assert.equal(service.availableChannel?.serviceUrl,'https://www.computerrepairkuwait.com/ar/book',url+' localized service booking channel');
        assert.equal(service.availableChannel?.servicePhone?.telephone,'+96555301913',url+' shared service phone');
      }
    }
    if(lang==='ar') assert.ok(/[\u0600-\u06ff]/.test(main.find('img').attr('alt')||''),url+' Arabic alt');
  }
}
const enDirectory=read('/services'), arDirectory=read('/ar/services');
for(const spec of specs){
  assert.equal(enDirectory('[data-service-id="'+spec.id+'"] a').length,0,'Card is itself a link');
  assert.equal(enDirectory('[data-service-id="'+spec.id+'"]').attr('href'),'/'+spec.slug);
  assert.equal(arDirectory('[data-service-id="'+spec.id+'"]').attr('href'),'/ar/'+spec.slug);
}
// Inbound discovery: new thermal service must be linked by graph-derived navigation
// and from genuinely relevant diagnostic and commercial routes.
const expectedInbound=[
  ['/', '[data-thermal-inbound="homepage"] a','/laptop-cleaning-thermal-paste-kuwait'],
  ['/ar', '[data-thermal-inbound="homepage"] a','/ar/laptop-cleaning-thermal-paste-kuwait'],
  ['/services','[data-thermal-inbound="services-directory"] a','/laptop-cleaning-thermal-paste-kuwait'],
  ['/ar/services','[data-thermal-inbound="services-directory"] a','/ar/laptop-cleaning-thermal-paste-kuwait'],
  ['/laptop-overheating-kuwait','[data-thermal-inbound="overheating"] a','/laptop-cleaning-thermal-paste-kuwait'],
  ['/ar/laptop-overheating-kuwait','[data-thermal-inbound="arabic-overheating"] a','/ar/laptop-cleaning-thermal-paste-kuwait'],
  ['/laptop-repair-kuwait','a[data-thermal-inbound="laptop-pricing"]','/laptop-cleaning-thermal-paste-kuwait'],
  ['/gaming-laptop-cleaning-kuwait','[data-thermal-inbound="gaming-routing"] a','/laptop-cleaning-thermal-paste-kuwait']
];
for(const [route,selector,expected] of expectedInbound){
  const $=read(route);
  assert.equal($(selector).attr('href'),expected,route+' thermal route intent ownership');
}
for(const route of ['/','/ar']){
  const $=read(route);
  assert.equal($('footer a[href="'+(route==='/ar'?'/ar/laptop-cleaning-thermal-paste-kuwait':'/laptop-cleaning-thermal-paste-kuwait')+'"]').length,1,route+' discoverable footer link');
}

const thermal='/laptop-cleaning-thermal-paste-kuwait';
const contextualRoutes=[
  ['/guides/why-is-my-laptop-so-hot','guide',thermal],
  ...['dell','hp','lenovo','asus','acer'].flatMap(brand=>[
    ['/'+brand+'-laptop-repair-kuwait','brand',thermal],
    ['/ar/brands/'+brand+'-laptop-repair-kuwait','brand','/ar'+thermal]
  ]),
  ...['hawalli','salmiya','kuwait-city','farwaniya','jahra','ahmadi'].flatMap(area=>[
    ['/location/'+area,'location',thermal],
    ['/ar/computer-repair-'+area,'location','/ar'+thermal]
  ])
];
for(const [route,kind,target] of contextualRoutes){
  const $=read(route);
  const link=$('main [data-thermal-inbound="'+kind+'"] a[href="'+target+'"]');
  assert.equal(link.length,1,route+' localized contextual thermal route');
  assert.ok(link.text().trim().length>10,route+' descriptive thermal anchor');
}

console.log('Repair expansion: six bilingual service pairs, twelve thermal FAQs/schema entries, six additive modules, SEO, photos and inbound navigation verified.');
