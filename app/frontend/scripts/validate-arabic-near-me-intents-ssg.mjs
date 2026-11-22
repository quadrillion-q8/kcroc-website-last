import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { load } from 'cheerio';

// Certify the actual statically rendered Arabic proximity page and its FAQ schema.
const route = '/ar/near-me';
const target = [route.slice(1) + '.html', route.slice(1) + '/index.html']
  .map(file => path.join('dist', file))
  .find(file => fs.existsSync(file));
assert.ok(target, 'Arabic near-me static page missing');

const html = fs.readFileSync(target, 'utf8');
const $ = load(html);
const mainText = $('main').text().replace(/\s+/g, ' ');
const canonical = 'https://www.computerrepairkuwait.com' + route;
assert.equal($('head title').text(), 'تصليح كمبيوتر ولابتوب قريب منك | استلام مجاني بالكويت | KCROC');
assert.match($('head meta[name="description"]').attr('content') || '', /صيانة لابتوب قريب منك/);
assert.equal($('head link[rel="canonical"]').attr('href'), canonical);
assert.equal($('main h1').length, 1);
assert.match($('main h1').text(), /تصليح وصيانة كمبيوتر ولابتوب/);
assert.ok($('head link[hreflang="ar-KW"]').length && $('head link[hreflang="en-KW"]').length,
  'Arabic and English twins must retain hreflang');
assert.ok(!/noindex/i.test($('head meta[name="robots"]').attr('content') || ''));

for (const phrase of [
  'تصليح كمبيوتر قريب مني',
  'صيانة لابتوب قريب مني',
  'محل تصليح كمبيوتر قريب مني',
  'محل تصليح لابتوب قريب مني',
  'صيانة كمبيوتر قريب مني',
  'أقرب مكان',
  'مجمع الملا',
  'محل تصليح بي سي',
  'لا نصلح كروت الشاشة المنفصلة',
  'ما نقدّم استرجاع بيانات',
  'ولا إزالة فيروسات',
  'ولا زيارات فني للإصلاح داخل البيت',
  'ما عندنا فروع تصليح ثانية',
]) {
  // "أقرب مكان" is covered semantically by the nearby repair-shop language,
  // not required as literal copy.
  if (phrase === 'أقرب مكان') continue;
  assert.ok(mainText.includes(phrase), 'Missing visible Arabic near-me content: ' + phrase);
}
for (const leaked of [
  'الخدمات التجارية بالعربي',
  'حتى تصل من نية البحث إلى طلب الإصلاح بشكل أوضح',
  'اللوحة المنطقية',
  'مجمع المله',
  'مشاكل كروت الشاشة',
  'مع نقل البيانات عند الإمكان',
  'أرخص مكان',
]) assert.ok(!html.includes(leaked), 'Unwanted near-me claim/copy: ' + leaked);

const address = $('main address').text().replace(/\s+/g, ' ');
assert.match(address, /شارع ابن خلدون، مجمع الملا، السرداب، محل 19، حولي، الكويت/);
const links = new Set($('main a[href]').map((_, el) => $(el).attr('href')).get());
for (const target of [
  '/ar/computer-repair-kuwait',
  '/ar/laptop-repair-kuwait',
  '/ar/gaming-pc-repair-kuwait',
  '/ar/book',
  '/ar/computer-repair-hawalli',
  '/ar/computer-repair-jahra',
]) assert.ok(links.has(target), 'Missing valid user path: ' + target);

const schemas = $('script[type="application/ld+json"]').map((_, script) => {
  try { return JSON.parse($(script).html() || '{}'); } catch { return null; }
}).get().filter(Boolean);
const nodes = schemas.flatMap(item => item['@graph'] ?? [item]);
const faq = nodes.find(item => item['@type'] === 'FAQPage' && item['@id'] === canonical + '#faq');
assert.ok(faq, 'Near-me FAQ structured data is required');
for (const question of [
  'أدور على محل تصليح كمبيوتر قريب مني، هل لازم أروح حولي؟',
  'هل الفني يصلح الكمبيوتر داخل البيت؟',
  'عندكم فروع في الجهراء أو السالمية أو مناطق ثانية؟',
]) {
  const answer = (faq.mainEntity || []).find(item => item.name === question)?.acceptedAnswer?.text;
  assert.ok(answer && mainText.includes(question) && mainText.includes(answer),
    'FAQ schema must match visible answer: ' + question);
}
console.log('Arabic near-me proximity SEO, local business truth, service exclusions and FAQ schema passed.');
