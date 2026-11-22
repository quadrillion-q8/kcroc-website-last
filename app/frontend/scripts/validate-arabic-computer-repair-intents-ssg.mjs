import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { load } from 'cheerio';

// Verify real, crawlable Arabic text after static prerender, not just TSX source.
const route = '/ar/computer-repair-kuwait';
const html = [route.slice(1) + '.html', route.slice(1) + '/index.html']
  .map((file) => path.join('dist', file))
  .find((file) => fs.existsSync(file));
assert.ok(html, 'Missing prerendered Arabic national computer repair hub');

const $ = load(fs.readFileSync(html, 'utf8'));
const mainText = $('main').text().replace(/\s+/g, ' ');
const canonical = 'https://www.computerrepairkuwait.com' + route;
assert.equal($('head link[rel="canonical"]').attr('href'), canonical);
assert.equal($('head title').text(), 'تصليح كمبيوتر ولابتوب في الكويت | KCROC');
assert.equal($('main h1').length, 1, 'Preserve a single national repair H1');
assert.match($('main h1').text(), /تصليح كمبيوتر ولابتوب في الكويت/);
assert.ok($('head link[hreflang="en-KW"]').length && $('head link[hreflang="ar-KW"]').length,
  'Keep reciprocal bilingual alternates');

// These phrases must be useful content on the page rather than a hidden keyword bank.
for (const phrase of [
  'محل تصليح كمبيوتر',
  'صيانة أجهزة الكمبيوتر',
  'تصليح بي سي',
  'صيانة لابتوب',
  'تصليح لاب توب',
  'تصليح لابتوبات',
  'تصليح لاب توب HP',
  'تصليح شاشات لابتوب',
  'فني كمبيوتر خدمة منازل',
  'تصليح كمبيوتر حولي',
  'تصليح كمبيوتر الجهراء',
  'محل صيانة كمبيوتر قريب مني',
]) assert.ok(mainText.includes(phrase), 'Missing user-intent phrase in SSG: ' + phrase);

const links = new Set($('main a[href]').map((_, el) => $(el).attr('href')).get());
for (const link of [
  '/ar/laptop-repair-kuwait',
  '/ar/brands/hp-laptop-repair-kuwait',
  '/ar/computer-repair-hawalli',
  '/ar/computer-repair-jahra',
  '/ar/laptop-screen-repair-kuwait',
  '/ar/near-me',
]) assert.ok(links.has(link), 'Missing destination link: ' + link);

assert.ok(mainText.includes('مو ضمن خدماتنا'), 'Must distinguish external monitors from laptop-screen repairs');
assert.ok(mainText.includes('شاشة اللابتوب سوداء أو مكسورة'), 'Screen problem card must specify laptop screens');
assert.ok(mainText.includes('لا نصلح شاشات الكمبيوتر المكتبي المنفصلة'), 'Main content must explicitly exclude standalone monitors');
assert.ok(!mainText.includes('title: الشاشة سوداء أو مكسورة'), 'Screen repair heading must not be ambiguous');
assert.ok(mainText.includes('لا نقدم زيارة فني أو إصلاحًا داخل المنزل'),
  'Must not misrepresent pickup as a home repair visit');

const structured = $('script[type="application/ld+json"]').map((_, node) => {
  try { return JSON.parse($(node).html() || '{}'); } catch { return null; }
}).get().filter(Boolean);
const nodes = structured.flatMap((item) => item['@graph'] ?? [item]);
const faq = nodes.find((item) => item['@type'] === 'FAQPage' && item['@id'] === canonical + '#faq');
assert.ok(faq, 'FAQ structured data missing for hub');
const questions = faq.mainEntity || [];
for (const phrase of ['شاشات الكمبيوتر المنفصلة', 'فني كمبيوتر خدمة منازل', 'محل صيانة كمبيوتر قريب مني']) {
  assert.ok(questions.some((item) => item.name.includes(phrase) && item.acceptedAnswer?.text),
    'Question and answer mismatch in FAQ schema: ' + phrase);
}
console.log('Arabic national computer repair intents: content, truthful offers, links, FAQ schema and SEO passed.');
