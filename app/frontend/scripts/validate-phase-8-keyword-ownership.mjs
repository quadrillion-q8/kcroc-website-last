import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { load } from 'cheerio';
const expectations = {
  "/ar": "فني كمبيوتر في الكويت | فحص واستلام مجاني | KCROC",
  "/ar/computer-repair-kuwait": "تصليح وصيانة كمبيوتر ولابتوب في الكويت | KCROC",
  "/laptop-repair-kuwait": "Laptop Repair Kuwait | Board-Level Lab & Free Pickup | KCROC",
  "/ar/computer-repair-hawalli": "تصليح كمبيوتر حولي | فني كمبيوتر ولابتوب | KCROC"
};
const domain='https://www.computerrepairkuwait.com';
for(const [route,title] of Object.entries(expectations)){
  const slug=route.slice(1);
  const html=[slug+'.html',slug+'/index.html'].map(f=>path.join('dist',f)).find(f=>fs.existsSync(f));
  assert.ok(html,'Missing prerendered route '+route);
  const $=load(fs.readFileSync(html,'utf8'));
  assert.equal($('head title').text(),title,route+' search title');
  assert.equal($('link[rel="canonical"]').attr('href'),domain+route,route+' canonical');
  assert.equal($('main h1').length,1,route+' main H1');
  assert.ok($('head meta[name="description"]').attr('content')?.length,route+' description');
  assert.ok($('head link[hreflang="ar-KW"]').length && $('head link[hreflang="en-KW"]').length,route+' reciprocal alternate entries');
  if(route==='/ar')assert.ok($('main h1').text().includes('فني كمبيوتر في الكويت'));
}
const config=JSON.parse(fs.readFileSync('vercel.json','utf8'));
assert.ok(config.redirects.some(r=>r.source==='/&'&&r.destination==='/'&&r.permanent===true),'Missing exact malformed homepage redirect');
const sitemap=fs.readFileSync('dist/sitemap.xml','utf8');
assert.ok(!sitemap.includes(domain+'/&amp;</loc>'),'Malformed route present in sitemap');
console.log('Phase 8.2 keyword ownership, canonical, locale and redirect checks passed.');
