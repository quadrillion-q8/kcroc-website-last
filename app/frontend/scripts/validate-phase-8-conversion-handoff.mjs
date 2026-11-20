import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { load } from 'cheerio';
const cases=[['/book','BookingPage','booking_request_handoff'],['/ar/book','ArabicBookingPage','booking_request_handoff'],['/contact','Contact','contact_request_handoff'],['/ar/contact','ArabicContactPage','contact_request_handoff']];
for(const [route,name,event] of cases){
 const slug=route.slice(1),file=[slug+'.html',slug+'/index.html'].map(p=>path.join('dist',p)).find(p=>fs.existsSync(p));
 assert.ok(file,'Missing '+route);
 const $=load(fs.readFileSync(file,'utf8'));
 const form=$('main form');
 assert.equal(form.length,1,route+' semantic form');
 assert.ok(form.find('button[type="submit"]').length,route+' submission control');
 assert.ok(form.find('[role="status"],[aria-live="polite"]').length,route+' accessible feedback');
 if(event==='booking_request_handoff'){
  assert.equal(form.find('[data-booking-handoff-instruction]').length,1,route+' send/confirmation instruction');
  assert.equal(form.find('[name="issue"],[name="location"]').length,2,route+' optional diagnostic fields retained');
 }
 const source=fs.readFileSync(path.join('src/pages',name+'.tsx'),'utf8');
 assert.ok(source.includes("trackConversion('"+event+"'"),route+' dedicated handoff');
 assert.ok(source.includes("trackConversion('whatsapp_click'"),route+' existing GA contact event');
 assert.ok(!source.includes("trackConversion('booking_complete'"),route+' must not report confirmed booking');
 const start=source.indexOf("trackConversion('"+event+"'");
 const payload=source.slice(start,source.indexOf('});',start)+3);
 assert.ok(!/location_context:|formData\\.|enquiry\\.|message:|symptoms:|location:|deviceModel:|issue:/.test(payload),route+' no raw form data');
 assert.ok(source.includes('handoffWhatsApp('),route+' normalized WhatsApp handoff');
}
console.log('Phase 8.6 conversion measurement: four bilingual forms, separate handoff intents, accessible feedback and privacy-safe payloads passed.');
