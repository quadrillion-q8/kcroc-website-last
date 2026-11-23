import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { load } from 'cheerio';
const domain='https://www.computerrepairkuwait.com';
const targets={
  "/laptop-screen-repair-kuwait": {
    "title": "Laptop Screen Repair Cost Kuwait | Labor from 30 KWD | KCROC",
    "description": "Windows laptop screen repair in Kuwait. Labor from 30 KWD + compatible panel, not the total price. Free diagnosis and pickup; quote before repair."
  },
  "/battery-replacement-kuwait": {
    "title": "Laptop Battery Replacement Kuwait | Free Pickup | KCROC",
    "description": "Windows laptop battery replacement in Kuwait. Labour from 8 KWD + compatible battery. Free charging-path diagnosis and pickup; quote before paid work."
  },
  "/hp-laptop-repair-kuwait": {
    "title": "HP Laptop Repair Kuwait | Independent Lab | KCROC",
    "description": "Independent HP laptop repair in Kuwait, not HP-authorized. Pavilion, EliteBook, ProBook, Envy, OMEN & Victus. Selected repairs from 15 KWD where applicable; free pickup."
  },
  "/location/hawalli": {
    "title": "Computer & Laptop Repair Hawalli | Walk-In Lab | KCROC",
    "description": "Visit KCROC at Al Mullah Complex, Basement Shop 19, Ibn Khaldoun St, Hawalli. Open daily 10 AM–10 PM. Free initial diagnosis and pickup."
  },
  "/location/salmiya": {
    "title": "Laptop & Computer Repair Salmiya | Free Pickup | KCROC",
    "description": "Laptop, MacBook and gaming PC repair for Salmiya, Bidaa and Salwa. Free pickup and delivery to our Hawalli lab; diagnosis and quote before repair."
  },
  "/ar/computer-repair-jahra": {
    "title": "تصليح كمبيوتر ولابتوب الجهراء | استلام مجاني | KCROC",
    "description": "تحتاج تصليح كمبيوتر أو لابتوب بالجهراء؟ استلام وتوصيل مجاني من الجهراء والمناطق المجاورة، وفحص أولي مجاني في مختبر KCROC بحولي."
  },
  "/ar/computer-repair-salmiya": {
    "title": "تصليح لابتوب وكمبيوتر السالمية | استلام مجاني | KCROC",
    "description": "تصليح لابتوب وكمبيوتر بالسالمية والرميثية وسلوى والبدع. استلام وتوصيل مجاني، وفحص أولي وعرض سعر قبل التصليح في مختبر KCROC بحولي."
  }
};
for (const [route, expected] of Object.entries(targets)) {
  const slug=route.slice(1);
  const file=[slug+'.html',slug+'/index.html'].map(p=>path.join('dist',p)).find(p=>fs.existsSync(p));
  assert.ok(file, 'Missing SSG '+route);
  const $=load(fs.readFileSync(file,'utf8'));
  assert.equal($('head title').text(),expected.title,route+' title');
  assert.equal($('head meta[name="description"]').attr('content'),expected.description,route+' description');
  assert.equal($('head link[rel="canonical"]').attr('href'),domain+route,route+' canonical');
  assert.equal($('main h1').length,1,route+' single H1');
  assert.ok($('head link[hreflang="en-KW"]').length && $('head link[hreflang="ar-KW"]').length,route+' bilingual alternates');
  assert.ok(!/noindex/i.test($('head meta[name="robots"]').attr('content')||''), route+' remains indexable');
}
assert.match(targets['/laptop-screen-repair-kuwait'].description,/30 KWD \+ compatible panel, not the total price/);
assert.match(targets['/battery-replacement-kuwait'].description,/8 KWD \+ compatible battery/);
assert.match(targets['/hp-laptop-repair-kuwait'].description,/not HP-authorized/);
assert.match(targets['/location/hawalli'].description,/Basement Shop 19.*10 AM–10 PM/);
for(const route of ['/ar/computer-repair-jahra','/ar/computer-repair-salmiya'])assert.ok(targets[route].description.includes('مختبر KCROC بحولي'));
assert.match(targets['/location/salmiya'].description,/our Hawalli lab/);
const findSSG=(route)=>{
  const slug=route.slice(1);
  const file=[slug+'.html',slug+'/index.html'].map(p=>path.join('dist',p)).find(p=>fs.existsSync(p));
  assert.ok(file, 'Missing SSG '+route);
  return load(fs.readFileSync(file,'utf8'));
};
const $screen=findSSG('/laptop-screen-repair-kuwait');
const $screenAR=findSSG('/ar/laptop-screen-repair-kuwait');
assert.equal($screen('[data-screen-cost-guide]').length,1,'English page has one visible pricing explainer');
assert.equal($screenAR('[data-screen-cost-guide-ar]').length,1,'Arabic page has one visible pricing explainer');
assert.match($screen('[data-screen-cost-guide]').text(),/How much does laptop screen repair cost in Kuwait/i);
assert.match($screen('[data-screen-cost-guide]').text(),/30 KWD/);
assert.match($screen('[data-screen-cost-guide]').text(),/priced separately/i);
assert.match($screen('[data-screen-cost-guide]').text(),/HP laptop screen replacement cost/i);
assert.match($screenAR('[data-screen-cost-guide-ar]').text(),/كم سعر تصليح شاشة اللابتوب في الكويت/);
assert.match($screenAR('[data-screen-cost-guide-ar]').text(),/30 د\.ك/);
assert.ok($screen('[data-screen-cost-guide] a[href^="https://wa.me/"]').length,'English quote CTA is functional');
assert.ok($screenAR('[data-screen-cost-guide-ar] a[href^="https://wa.me/"]').length,'Arabic quote CTA is functional');
assert.ok($screen('[data-screen-cost-guide] a[href="/macbook-screen-replacement-kuwait"]').length,'MacBook screen intent is routed separately');
assert.equal($screen('head link[rel="canonical"]').attr('href'),domain+'/laptop-screen-repair-kuwait');
assert.equal($screenAR('head link[rel="canonical"]').attr('href'),domain+'/ar/laptop-screen-repair-kuwait');
assert.ok($screen('details[data-kcroc-faq-item]').length >= 14,'Expanded English screen FAQs are rendered');
const faqText=$screen('details[data-kcroc-faq-item]').text();
assert.match(faqText,/HP laptop screen replacement cost/i);
assert.match(faqText,/Acer laptop cracked screen/i);
assert.match(faqText,/OLED, Full HD and laptop touch screens/i);
assert.match(faqText,/screen repair near me/i);
console.log('Laptop screen query intent: bilingual visible pricing, WhatsApp quotes, brand/panel FAQs and canonical URLs passed.');

console.log('Phase 8.3: seven CTR target snippets, canonical URLs, hreflang, single H1 and truthful business qualifiers passed.');
