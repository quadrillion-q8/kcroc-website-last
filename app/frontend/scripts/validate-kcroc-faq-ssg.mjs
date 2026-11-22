// Post-SSG FAQ regression: real prerendered EN/AR pages must contain
// opted-in legible FAQ cards and full static answers (no client-only FAQ).
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { load } from 'cheerio';

const paths = [
  ['/', 1],
  ['/ar', 1],
  ['/faq', 1],
  ['/ar/faq', 1],
  ['/location/kuwait-city', 9],
  ['/location/hawalli', 12],
  ['/ar/computer-repair-hawalli', 12],
  ['/ar/computer-repair-kuwait-city', 1],
  ['/pricing', 1],
  ['/ar/pricing', 1],
];
const pathnameToFile = (url) => url === '/' ? 'index.html' : url.slice(1)+'.html';
for (const [url, count] of paths) {
  const file = path.resolve('dist', pathnameToFile(url));
  const html = await readFile(file,'utf8');
  const $ = load(html);
  const main = $('main#main-content');
  assert.equal(main.length, 1, url + ': main landmark missing');
  const items=main.find('[data-kcroc-faq-item="true"]');
  assert.ok(items.length>=count, url + ': FAQ visual opt-in missing: '+items.length+' < '+count);
  items.each((_,element)=>{
    const item=$(element);
    const question=item.is('details') ? item.children('summary').text() :
      item.find('button[aria-expanded],h3').first().text();
    assert.ok(question.trim().length>6,url+': FAQ question missing');
    const answer=item.is('details') ? item.children().not('summary').text() :
      item.find('p,[role="region"]').first().text();
    assert.ok(answer.trim().length>10,url+': FAQ answer missing from static HTML');
  });
  assert.equal(items.filter('[open]').length,0,url+': FAQs must start collapsed (static answer content stays in HTML)');
  console.log(url+' — '+items.length+' FAQ items, readable styles opted in, answers prerendered');
}
console.log('✅ Global EN/AR FAQ SSG smoke test passed across '+paths.length+' routes.');
