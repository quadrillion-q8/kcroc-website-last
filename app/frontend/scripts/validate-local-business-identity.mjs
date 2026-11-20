import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {load} from 'cheerio';
const domain='https://www.computerrepairkuwait.com';
const id=domain+'/#business';
const map='https://www.google.com/maps/place/?q=place_id:ChIJzapykEqbzz8RZsrwoaORhjY';
const routes=['/','/ar','/location/hawalli','/ar/computer-repair-hawalli','/location/salmiya','/location/jahra','/location/kuwait-city','/ar/computer-repair-salmiya'];
for(const route of routes){
 const slug=route.slice(1);
 const file=(route==='/'?['index.html']:[slug+'.html',slug+'/index.html']).map(p=>path.join('dist',p)).find(p=>fs.existsSync(p));
 assert.ok(file,'Missing '+route);
 const $=load(fs.readFileSync(file,'utf8'));
 const nodes=$('script[type="application/ld+json"]').toArray().flatMap(el=>{
  const obj=JSON.parse($(el).text());return Array.isArray(obj)?obj:obj['@graph']??[obj];
 });
 const businesses=nodes.filter(n=>[n['@type']].flat().some(t=>t==='LocalBusiness'||t==='ComputerStore'));
 const canonical=businesses.filter(n=>n['@id']===id);
 assert.ok(canonical.length>=1,route+' missing canonical business');
 assert.ok(businesses.every(n=>n['@id']===id),route+' unexpected separate business');
 const business=canonical.find(n=>n.hasMap===map);
 assert.ok(business,route+' missing verified Maps identity');
 assert.equal(business.telephone,'+96555301913',route+' telephone');
 assert.equal(business.address.addressCountry,'KW');
 assert.match(business.address.streetAddress,/19/);
 assert.ok(Math.abs(business.geo.latitude-29.3416921515256)<0.00001);
 assert.ok(Math.abs(business.geo.longitude-48.00761257498341)<0.00001);
 const hours=[business.openingHoursSpecification].flat();
 assert.ok(hours.some(h=>h.opens==='10:00'&&h.closes==='22:00'&&h.dayOfWeek.includes('Friday')),route+' Friday hours');
 if(route==='/location/hawalli'||route==='/ar/computer-repair-hawalli'){
  assert.ok(nodes.some(n=>n['@id']===domain+route+'#webpage'&&n.mainEntity?.['@id']===id),route+' page must reference physical lab');
  assert.ok(!nodes.some(n=>n['@id']===domain+route+'#service-area'),route+' physical workshop misclassified as service area');
 }
 if(['/location/salmiya','/location/jahra','/location/kuwait-city'].includes(route))assert.ok(nodes.some(n=>n['@id']===domain+route+'#service-area'&&n.provider?.['@id']===id),route+' missing pickup service node');
}
console.log('Phase 8.5 local identity: one canonical Hawalli business, Maps pin, phone, hours and service-area distinction passed across '+routes.length+' pages.');
