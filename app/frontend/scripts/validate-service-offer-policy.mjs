// Website-wide non-offered-service regression guard. Educational mention and
// explicit negative answers are allowed; offers, booking CTAs and dead service
// destinations are not. This runs after SSG so schema and rendered URLs count.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { load } from 'cheerio';

const root = process.cwd();
const dist = path.join(root, 'dist');
const domain = 'https://www.computerrepairkuwait.com';
const bannedSlugs = [
  'virus-malware-removal-kuwait', 'laptop-wifi-not-connecting',
];
const forbiddenPaths = new Set(bannedSlugs.flatMap(slug => ['/' + slug, '/ar/' + slug]));
const failures = [];
const exists = relative => fs.existsSync(path.join(root,relative));
function htmlFor(url) {
  const p = url.replace(/^\//,'');
  const paths = p ? [p + '.html', p + '/index.html'] : ['index.html'];
  const file = paths.map(s => path.join(dist,s)).find(fs.existsSync);
  assert.ok(file, 'Missing required commercial route: ' + url);
  return load(fs.readFileSync(file,'utf8'));
}
function walk(dir) {
  return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e => {
    const file=path.join(dir,e.name);
    return e.isDirectory()?walk(file):(e.name.endsWith('.html')?[file]:[]);
  });
}
const pages=walk(dist);
assert.ok(pages.length>0,'Static pages must exist');
for (const file of pages) {
  const url='/' + path.relative(dist,file).replaceAll(path.sep,'/').replace(/(?:\/)?index\.html$/,'').replace(/\.html$/,'');
  const $=load(fs.readFileSync(file,'utf8'));
  $('main a[href],footer a[href],header a[href]').each((_,el)=>{
    const raw=$(el).attr('href');
    if(!raw)return;
    try {
      const resolved=new URL(raw,domain);
      if(['www.computerrepairkuwait.com','computerrepairkuwait.com'].includes(resolved.hostname)
        && forbiddenPaths.has(resolved.pathname.replace(/\/$/,'')))
        failures.push(url+': links to retired offering '+resolved.pathname);
    } catch {}
  });
  $('script[type="application/ld+json"]').each((_,node)=>{
    let schema;
    try {schema=JSON.parse($(node).text());} catch {return;}
    const stack=[schema];
    while(stack.length){
      const value=stack.pop();
      if(!value||typeof value!=='object')continue;
      if(Array.isArray(value)){stack.push(...value);continue;}
      const types=Array.isArray(value['@type'])?value['@type']:[value['@type']];
      if(types.includes('Offer')||types.includes('Service')||types.includes('Product')){
        const name=typeof value.name==='string'?value.name:'';
        if(/(?:virus|malware)\s*(?:&|and)?\s*(?:removal|cleaning)|(?:إزالة|تنظيف)\s*(?:ال)?فيروسات/i.test(name))
          failures.push(url+': unsupported service schema '+name);
      }
      stack.push(...Object.values(value));
    }
  });
}
const en=htmlFor('/pricing'), ar=htmlFor('/ar/pricing');
assert.ok(en('main').text().includes('Laptop Cooling Fan Replacement'),'New real repair must appear on English pricing');
assert.ok(ar('main').text().includes('تبديل مروحة اللابتوب'),'New real repair must appear on Arabic pricing');
assert.ok(!/Virus\s*(?:&|and)\s*Malware Removal/i.test(en('main').text()),'Virus removal offered on English pricing');
assert.ok(!/إزالة الفيروسات والبرامج الضارة/.test(ar('main').text()),'Virus removal offered on Arabic pricing');
const faq=htmlFor('/faq')('main').text();
const arFaq=htmlFor('/ar/faq')('main').text();
assert.ok(faq.includes('Virus and malware removal are not KCROC services'),'English FAQ must clearly decline virus removal');
assert.ok(arFaq.includes('ما نقدّم إزالة فيروسات'),'Kuwaiti Arabic FAQ must clearly decline virus removal');
const sitemap=fs.readFileSync(path.join(root,'public/sitemap.xml'),'utf8');
for(const p of forbiddenPaths) assert.ok(!sitemap.includes('<loc>'+domain+p+'</loc>'),'Excluded page found in sitemap: '+p);
const graph=fs.readFileSync(path.join(root,'src/data/graph.ts'),'utf8');
for(const id of ['problem-malware','problem-wifi-fail','page-ar-problem-virus-malware-removal-kuwait','page-ar-problem-laptop-wifi-not-connecting']){
  const i=graph.indexOf("'"+id+"': {");
  assert.ok(i>=0,'Expected historical graph record: '+id);
  assert.match(graph.slice(i,i+330),/isActive: false/,'Retired graph record reactivated: '+id);
}
if(failures.length) throw new Error('Forbidden service offers / dead links:\n'+failures.slice(0,30).join('\n'));
console.log('KCROC excluded-service guard passed: '+pages.length+' prerendered pages scanned; no retired service offers, CTAs, links, or sitemap entries.');
