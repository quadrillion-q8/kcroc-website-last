// Run after starting the built site or against a Vercel preview:
// node scripts/audit-premium-visual.mjs https://preview.example.com
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';
const base = process.argv[2];
assert.ok(base && /^https?:\/\//.test(base),'Pass a preview or local site URL');
const browser = await puppeteer.launch({args:chromium.args,executablePath:process.env.CHROME_PATH||await chromium.executablePath(),headless:true});
const failures=[];
await fs.mkdir('premium-visual-evidence',{recursive:true});
try {
 const page=await browser.newPage();
 for(const width of [390,1440]){
  await page.setViewport({width,height:900,deviceScaleFactor:1});
  for(const route of ['/msi-laptop-repair-kuwait','/ar/brands/msi-laptop-repair-kuwait','/location/kuwait-city','/ar/computer-repair-kuwait-city','/pricing','/ar/pricing']){
   await page.goto(new URL(route,base).href,{waitUntil:'networkidle2',timeout:60000});
   const result=await page.evaluate(()=>{
    const main=document.querySelector('main#main-content');
    if(!main)return {error:'Missing main landmark'};
    const parse=s=>(s.match(/[\d.]+/g)||[]).map(Number);
    const luminance=rgb=>rgb.slice(0,3).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);
    const background=el=>{
     for(let p=el;p;p=p.parentElement){
      const c=parse(getComputedStyle(p).backgroundColor);
      if(c.length>=3&&(c.length===3||c[3]===1))return c;
     }
     return [9,12,15];
    };
    const targets=[...main.querySelectorAll('[data-premium-model-chip],[data-brand-model],[data-location-problem-link] > span:not([aria-hidden]),[data-location-brand-link] > span,[data-premium-light-card] > span,[data-premium-conversion] [data-premium-action],[data-brand-content] [aria-labelledby="core-repair-pillars"] a > span')].filter(el=>el.getClientRects().length);
    const contrast=targets.map(el=>{
     const a=luminance(parse(getComputedStyle(el).color)),b=luminance(background(el));
     return {label:el.textContent.trim().slice(0,90),ratio:(Math.max(a,b)+.05)/(Math.min(a,b)+.05)};
    });
    const gaps=[...main.querySelectorAll('[data-brand-content] > section + section,[data-kcroc-rollout^="location-"] > section[data-kcroc-editorial-panel] + section[data-kcroc-editorial-panel]')].map(el=>el.getBoundingClientRect().top-el.previousElementSibling.getBoundingClientRect().bottom);
    return {premium:main.getAttribute('data-kcroc-premium'),contrast,gaps,overflow:document.documentElement.scrollWidth-innerWidth};
   });
   const pricing=route==='/pricing'||route==='/ar/pricing';
   if(result.error||result.premium!==(pricing?null:'true'))failures.push({route,width,error:result.error||'Wrong premium scope'});
   if(!pricing&&!result.error){
    if(route.includes('msi-laptop')&&result.contrast.length<2)failures.push({route,width,error:'Missing brand contrast targets'});
    for(const c of result.contrast)if(c.ratio<4.5)failures.push({route,width,contrast:c});
    for(const gap of result.gaps)if(gap<20)failures.push({route,width,gap});
    if(result.overflow>2)failures.push({route,width,overflow:result.overflow});
   }
   if(!pricing&&!result.error){
    const name=route.replace(/^\//,'').replaceAll('/','-');
    const selectors=route.includes('msi-laptop')?['[data-premium-model-chip]','[data-premium-conversion]']:['[data-location-problem-link]','[data-location-brand-link]'];
    for(const [i,selector] of selectors.entries()){
     const target=await page.$(selector);
     if(!target)continue;
     await target.evaluate(el=>el.scrollIntoView({block:'center',inline:'nearest',behavior:'instant'}));
     await page.screenshot({path:'premium-visual-evidence/'+name+'-'+width+'-'+i+'.png'});
    }
   }
   console.log(JSON.stringify({route,width,...result}));
  }
 }
}finally{await browser.close();}
assert.equal(failures.length,0,JSON.stringify(failures,null,2));
console.log('Premium visual smoke checks passed.');
