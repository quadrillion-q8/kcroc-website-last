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
    const targets=[...main.querySelectorAll('[data-premium-model-chip],[data-brand-model],[data-location-problem-link] > span:not([aria-hidden]),[data-location-brand-link] > span,[data-location-problem-link]:not(:has(span:not([aria-hidden]))),[data-location-brand-link]:not(:has(span)),[data-premium-light-card] > span,[data-premium-light-card] > h3,[data-premium-light-card] > p,[data-premium-conversion] [data-premium-action],[data-brand-content] [aria-labelledby="core-repair-pillars"] a > span')].filter(el=>el.getClientRects().length);
    const contrast=targets.map(el=>{
     const a=luminance(parse(getComputedStyle(el).color)),b=luminance(background(el));
     return {label:el.textContent.trim().slice(0,90),ratio:(Math.max(a,b)+.05)/(Math.min(a,b)+.05)};
    });
    const gaps=[...main.querySelectorAll('[data-brand-content] > section + section,[data-kcroc-rollout^="location-"] > section[data-kcroc-editorial-panel] + section[data-kcroc-editorial-panel],[data-kcroc-rollout^="location-"] > div > section[data-kcroc-editorial-panel] + section[data-kcroc-editorial-panel]')].map(el=>el.getBoundingClientRect().top-el.previousElementSibling.getBoundingClientRect().bottom);
    return {premium:main.getAttribute('data-kcroc-premium'),contrast,gaps,overflow:document.documentElement.scrollWidth-innerWidth};
   });
   const pricing=route==='/pricing'||route==='/ar/pricing';
   if(result.error||result.premium!==(pricing?null:'true'))failures.push({route,width,error:result.error||'Wrong premium scope'});
   if(!pricing&&!result.error){
    if(result.contrast.length<2)failures.push({route,width,error:'Missing contrast targets'});
    if(result.gaps.length<1)failures.push({route,width,error:'Missing adjacent section spacing targets'});
    for(const c of result.contrast)if(c.ratio<4.5)failures.push({route,width,contrast:c});
    for(const gap of result.gaps)if(gap<20)failures.push({route,width,gap});
    if(result.overflow>2)failures.push({route,width,overflow:result.overflow});
   }
   if(!pricing&&!result.error){
    const name=route.replace(/^\//,'').replaceAll('/','-');
    const selectors=route.includes('msi-laptop')?['[data-premium-model-chip]','[data-premium-conversion]']:['[data-location-problem-link],[data-premium-light-card]','[data-location-brand-link],[data-premium-light-card]:nth-child(2)'];
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
 // Phase 7G.2: verify actual shared chrome on both home languages.
 for(const width of [390,1440]){
  await page.setViewport({width,height:900,deviceScaleFactor:1});
  for(const route of ['/','/ar']){
   await page.goto(new URL(route,base).href,{waitUntil:'networkidle2',timeout:60000});
   const header=await page.evaluate(()=>{
    const el=document.querySelector('header[data-premium-chrome="header"]');
    const footer=document.querySelector('footer[data-premium-chrome="footer"]');
    const booking=el?.querySelector('[data-premium-header-booking]');
    const sub=booking?.querySelector('[data-premium-booking-subtitle]');
    const rgb=s=>(s.match(/[\d.]+/g)||[]).map(Number);
    const lum=a=>a.slice(0,3).reduce((sum,v,i)=>{v/=255;return sum+(v<=.04045?v/12.92:((v+.055)/1.055)**2.4)*[.2126,.7152,.0722][i]},0);
    let contrast=null,foreground=null,backgroundColor=null,backgroundImage=null;
    if(sub&&booking?.getClientRects().length){
      foreground=getComputedStyle(sub).color;
      backgroundColor=getComputedStyle(booking).backgroundColor;
      backgroundImage=getComputedStyle(booking).backgroundImage;
      const fg=rgb(foreground),bg=rgb(backgroundColor);
      if(fg.length>=3&&bg.length>=3&&(bg.length===3||bg[3]===1)&&backgroundImage==='none'){
        const a=lum(fg),b=lum(bg);
        contrast=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);
      }
    }
    return {present:!!el,footer:!!footer,href:booking?.getAttribute('href'),contrast,foreground,backgroundColor,backgroundImage,rtl:el?.getAttribute('dir'),overflow:el?el.scrollWidth-el.clientWidth:999};
   });
   if(!header.present||!header.footer||header.href!==(route==='/ar'?'/ar/book':'/book')||header.overflow>2|| (route==='/ar'&&header.rtl!=='rtl'))failures.push({route,width,header});
   if(width===1440&&(!Number.isFinite(header.contrast)||header.contrast<4.5))failures.push({route,width,error:'Header booking contrast',header});
   if(width===390){
    const trigger=await page.$('header button[aria-controls="mobile-nav-panel"]');
    if(!trigger){failures.push({route,width,error:'Missing mobile navigation trigger'});continue;}
    await trigger.evaluate(el=>el.click());
    await page.waitForSelector('#mobile-nav-panel[data-premium-chrome="mobile-menu"]',{timeout:10000});
    await page.screenshot({path:'premium-visual-evidence/home-'+(route==='/ar'?'ar':'en')+'-mobile-menu.png'});
    await page.keyboard.press('Escape');
   }else{
    const trigger=await page.$('header nav button[aria-controls^="mega-menu-"]');
    if(!trigger){failures.push({route,width,error:'Missing desktop mega menu trigger'});continue;}
    await trigger.evaluate(el=>el.click());
    await page.waitForSelector('[data-premium-chrome="mega-menu"]',{timeout:10000});
    await page.screenshot({path:'premium-visual-evidence/home-'+(route==='/ar'?'ar':'en')+'-mega-menu.png'});
    await page.keyboard.press('Escape');
   }
   console.log(JSON.stringify({route,width,chrome:header}));
  }
 }
}finally{await browser.close();}
assert.equal(failures.length,0,JSON.stringify(failures,null,2));
console.log('Premium visual smoke checks passed.');
