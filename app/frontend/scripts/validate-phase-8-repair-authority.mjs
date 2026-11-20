import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {load} from 'cheerio';
const routes={'/motherboard-repair-kuwait':3,'/laptop-screen-repair-kuwait':1,'/battery-replacement-kuwait':3};
for(const [route,count] of Object.entries(routes)){
 const slug=route.slice(1);
 const file=[slug+'.html',slug+'/index.html'].map(p=>path.join('dist',p)).find(p=>fs.existsSync(p));
 assert.ok(file,'Missing '+route);
 const $=load(fs.readFileSync(file,'utf8'));
 const section=$('main [data-representative-repair-scenarios]');
 assert.equal(section.length,1,route+' one illustrative section');
 assert.match(section.text(),/representative repair scenarios/i,route+' visible qualification');
 assert.match(section.text(),/not records of a specific named customer/i,route+' no fabricated customer case');
 assert.equal(section.find('[data-repair-scenario-action]').length,count,route+' complete repair actions');
 for(const el of section.find('[data-repair-scenario-action]').toArray())assert.ok($(el).find('dd').text().trim(),route+' nonempty repair action');
}
console.log('Phase 8.7: seven representative repair actions rendered across three service pages with visible illustrative qualifications.');
