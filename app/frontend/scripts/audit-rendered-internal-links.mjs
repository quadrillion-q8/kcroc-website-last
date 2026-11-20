// Phase 8.4: audit actual prerendered links, not just source graph edges.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { load } from 'cheerio';
const host='https://www.computerrepairkuwait.com';
const root='dist';
const sitemap=load(fs.readFileSync(path.join(root,'sitemap.xml'),'utf8'),{xml:true});
const norm=p=>p.replace(/\/+$/,'')||'/';
const routes=[...new Set(sitemap('url > loc').toArray().map(el=>norm(new URL(sitemap(el).text()).pathname)))];
const known=new Set(routes);
const data=new Map();
const inbound=new Map(routes.map(r=>[r,new Set()]));
const findings=[];
const redirectSources=new Set(JSON.parse(fs.readFileSync('vercel.json','utf8')).redirects.map(r=>r.source));
const internal=(value,base)=>{
  try {const u=new URL(value,host+base);return ['http:','https:'].includes(u.protocol)&&['www.computerrepairkuwait.com','computerrepairkuwait.com'].includes(u.hostname)?norm(u.pathname):null;} catch{return null;}
};
for(const route of routes){
  const slug=route.slice(1);
  const file=(route==='/'?['index.html']:[slug+'.html',slug+'/index.html']).map(p=>path.join(root,p)).find(p=>fs.existsSync(p));
  assert.ok(file,'Missing sitemap HTML '+route);
  const $=load(fs.readFileSync(file,'utf8'));
  const links=[];
  $('main a[href]').each((_,el)=>{
    const href=$(el).attr('href');if(!href||href.startsWith('#'))return;
    const dest=internal(href,route);if(!dest||dest===route)return;
    const label=$(el).text().trim();
    links.push({dest,label});
    if(known.has(dest))inbound.get(dest).add(route);
    else if(!/\.[a-z0-9]{1,8}$/i.test(dest)&&!dest.startsWith('/api/'))findings.push({from:route,to:dest,label,status:redirectSources.has(dest)?'redirect-source':'not-in-sitemap'});
  });
  data.set(route,links);
}
const required={
 '/ar/laptop-repair-kuwait':['/ar/laptop-plugged-in-not-charging','/guides/ar/bios-uefi-recovery-kuwait','/ar/laptop-overheating-kuwait','/ar'],
 '/ar/laptop-charging-port-repair-kuwait':['/ar/laptop-plugged-in-not-charging','/ar'],
 '/ar/laptop-screen-repair-kuwait':['/ar/laptop-screen-cracked-kuwait','/ar/laptop-black-screen-kuwait','/ar'],
 '/ar/laptop-hinge-repair-kuwait':['/ar/laptop-hinge-broken','/ar'],
 '/ar/laptop-keyboard-replacement-kuwait':['/ar/laptop-keyboard-not-working','/ar'],
 '/ar/near-me':['/ar','/ar/computer-repair-kuwait','/ar/laptop-repair-kuwait'],
 '/ar/computer-repair-hawalli':['/ar','/ar/near-me'],
};
for(const [from,targets] of Object.entries(required)){
  assert.ok(data.has(from),'Missing source '+from);
  for(const to of targets){
    assert.ok(known.has(to),'Target not in sitemap '+to);
    assert.ok(!redirectSources.has(to),'Target redirects '+to);
    assert.ok(data.get(from).some(x=>x.dest===to),from+' missing contextual link '+to);
  }
}
const report={pages:routes.length,uniqueContextualEdges:[...inbound.values()].reduce((a,s)=>a+s.size,0),requiredEdges:Object.values(required).flat().length,zeroContextualInbound:routes.filter(r=>!inbound.get(r).size),inboundByPage:routes.map(r=>({route:r,sourcePages:inbound.get(r).size})).sort((a,b)=>a.sourcePages-b.sourcePages),nonSitemapTargets:findings};
fs.writeFileSync('internal-link-audit.json',JSON.stringify(report,null,2)+'\n');
console.log('Phase 8.4 link audit: '+report.pages+' sitemap pages, '+report.uniqueContextualEdges+' unique contextual edges, '+report.requiredEdges+' required edges passed, '+report.zeroContextualInbound.length+' zero contextual inbound routes, '+findings.length+' non-sitemap link placements (report-only).');
