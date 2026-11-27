import assert from 'node:assert/strict';
import { readFileSync,existsSync } from 'node:fs';
import { load } from 'cheerio';
const routes={'blog/laptop-buying-guide-kuwait-2026':5,'blog/ar/laptop-buying-guide-kuwait-2026':5,'guides/bios-uefi-recovery-kuwait':2,'guides/ar/bios-uefi-recovery-kuwait':1};
for(const [route,count] of Object.entries(routes)){
 const $=load(readFileSync('dist/'+route+'.html','utf8'));
 assert.equal($('[data-kcroc-signature-editorial="4"]').length,1,route);
 assert.equal($('[data-signature-toc]').length,1,route+' navigation');
 const label=route.includes('/ar/')?'محتويات الدليل':'Table of contents';
 assert.equal($('[data-signature-toc] > nav[aria-label="'+label+'"]').length,1,route+' labelled navigation landmark');
 assert.ok($('[data-signature-toc] > nav > ol a[href^="#"]').length>0,route+' anchor navigation');
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

const nextRoutes={'guides/laptop-battery-warning-signs':1,'guides/why-is-my-laptop-so-hot':1,'blog/ar/how-often-clean-laptop-replace-thermal-paste-kuwait':1,'blog/laptop-repair-kuwait-2026':0,'blog/gaming-pc-cooling':2,'guides/dell-laptop-overheating':1,'guides/ar/dell-laptop-overheating':1,'guides/gamebar-presence-writer-fix':0,'guides/windows-10-end-of-support':2};
for(const [route,count] of Object.entries(nextRoutes)){
 const $=load(readFileSync('dist/'+route+'.html','utf8'));
 assert.equal($('[data-kcroc-signature-editorial="4"]').length,1,route+' shell');
 assert.equal($('[data-signature-toc]').length,1,route+' navigation');
 assert.equal($('[data-signature-pair]').length,count,route+' pairs');
 assert.equal($('link[rel="canonical"]').attr('href'),'https://www.computerrepairkuwait.com/'+route);
 const links=$('[data-signature-toc] a[href^="#"]').toArray();assert.ok(links.length>=3,route+' links');
 for(const link of links){const id=$(link).attr('href').slice(1);assert.ok($('[id]').toArray().some(el=>$(el).attr('id')===id),route+' missing TOC anchor '+id);}
 $('[data-signature-pair]').each((_,el)=>{const figure=$(el).children('[data-signature-visual]');assert.equal(figure.find('img').length,1,route+' visual');assert.equal($(el).children('[data-signature-copy]').length,1,route+' copy');assert.ok(figure.find('img').attr('alt')?.trim(),route+' alt');});
}
console.log('Signature Editorial 4.1/4.2 standalone route checks passed.');
