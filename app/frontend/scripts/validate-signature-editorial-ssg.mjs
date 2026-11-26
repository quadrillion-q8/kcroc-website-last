import assert from 'node:assert/strict';
import { readFileSync,existsSync } from 'node:fs';
import { load } from 'cheerio';
const routes={'blog/laptop-buying-guide-kuwait-2026':5,'blog/ar/laptop-buying-guide-kuwait-2026':5,'guides/bios-uefi-recovery-kuwait':2,'guides/ar/bios-uefi-recovery-kuwait':1};
for(const [route,count] of Object.entries(routes)){
 const $=load(readFileSync('dist/'+route+'.html','utf8'));
 assert.equal($('[data-kcroc-signature-editorial="4"]').length,1,route);
 assert.equal($('[data-signature-toc]').length,1,route+' navigation');
 assert.equal($('[data-signature-pair]').length,count,route+' pairs');
 assert.equal($('link[rel="canonical"]').attr('href'),'https://www.computerrepairkuwait.com/'+route);
 const sources=[];
 $('[data-signature-pair]').each((_,el)=>{
 const fig=$(el).children('[data-signature-visual]'),img=fig.find('img');
 assert.equal($(el).children('[data-signature-copy]').length,1);
 assert.equal(img.length,1);assert.ok(img.attr('alt')?.trim());assert.ok(fig.find('figcaption').text().trim());assert.equal(img.attr('loading'),'lazy');
 const src=img.attr('src');assert.ok(src);if(src.startsWith('/'))assert.ok(existsSync('dist'+src),route+' missing '+src);sources.push(src);
 });
 assert.equal(new Set(sources).size,sources.length,route+' duplicates');
}
console.log('Signature Editorial 4.0 priority standalone SSG checks passed.');
