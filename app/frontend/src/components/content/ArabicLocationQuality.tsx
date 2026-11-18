import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import {KCROC_GRAPH} from '../../data/graph';
import {localizedSitePath} from '../../utils/locale';
import {buildWhatsAppLink} from '../../utils/whatsappIntent';
import {useAnalytics} from '../../core/analytics/AnalyticsProvider';
type LocationEntry=typeof KCROC_GRAPH.locations[number];
const serviceCopy:Record<string,[string,string,string]>={
 'srv-laptop':['تصليح اللابتوب','عدم التشغيل أو التعليق أو مشكلة بالهيكل','نفصل بين مسارات الطاقة والإقلاع والعرض والتبريد حسب الموديل.'],
 'srv-screen':['شاشة اللابتوب','شاشة مكسورة أو سوداء أو فيها خطوط','نفحص اللوحة والكابل والموصل والإضاءة قبل مطابقة الشاشة.'],
 'srv-motherboard':['تصليح المذربورد','عدم التشغيل أو خلل الطاقة والشحن','نقيس خطوط الطاقة ونفحص المكونات تحت المجهر حسب الحاجة؛ إصلاح اللوحة الأصلية إذا كان ممكنًا.'],
 'srv-macbook':['تصليح ماك بوك','عدم التشغيل أو مشاكل USB-C أو MagSafe أو العرض','نحدد الجيل والموديل ونفحص مسار الطاقة واللوحة المنطقية حسب التصميم.'],
 'srv-liquid-damage':['أضرار السوائل','انسكاب ماي أو قهوة أو كرك على الجهاز','نعزل الطاقة ونفحص التلوث والتآكل ونختار طريقة التنظيف المناسبة؛ لا تشغل الجهاز للتجربة.'],
 'srv-gaming':['تصليح كمبيوتر ألعاب كامل','إعادة تشغيل أو عدم عرض أو هبوط أداء','نفحص طاقة الجهاز الكامل والتبريد وPOST والذاكرة؛ لا نستقبل كرت شاشة منفصل للإصلاح.'],
 'srv-gaming-laptop-cleaning':['تنظيف وتبريد لابتوب الألعاب','ضجيج المراوح أو الحرارة أو هبوط التردد','نفحص التهوية والمراوح والمشتت ونختار المادة الحرارية المناسبة للتصميم.'],
 'srv-charging-port':['تصليح مدخل الشحن','الشحن يقطع أو المنفذ ما يستجيب','نفحص المحول والمنفذ وUSB-PD أو DC ومسار الطاقة قبل تبديل الموصل.'],
 'srv-battery':['تبديل بطارية اللابتوب','عمر تشغيل قصير أو إطفاء عند نسبة شحن غير متوقعة','نفحص البطارية ومسار الشحن ورقم القطعة؛ وقف الشحن إذا البطارية منتفخة.'],
 'srv-gaming-laptop':['تصليح لابتوب الألعاب','حرارة أو عدم تشغيل أو انهيار أثناء اللعب','نراجع الحرارة والطاقة والأداء والاستقرار حسب الموديل.'],
 'srv-desktop-pc':['تصليح الكمبيوتر المكتبي','عدم الإقلاع أو التعليق أو عدم العرض','نفحص مزود الطاقة والذاكرة والتخزين واللوحة حسب العطل.'],
 'srv-macbook-screen':['تبديل شاشة ماك بوك','كسر الشاشة أو مشكلة عرض','نراجع رقم موديل الجهاز والكابل ومسار العرض قبل مطابقة التجميعة.'],
 'srv-ssd-ram':['ترقية SSD وRAM','بطء أو ضغط الذاكرة أو التخزين','نفحص صحة القرص والذاكرة والتوافق قبل اختيار الترقية.'],
 'srv-keyboard':['تبديل الكيبورد','أزرار ما تستجيب أو تكرر الحروف','نفحص مصفوفة المفاتيح والكابل والموصل قبل مطابقة الكيبورد.'],
 'srv-hinge':['تصليح المفصلات','صعوبة فتح الغطاء أو تكسر نقاط التثبيت','نفحص المفصلات والغطاء وكابل العرض؛ لا تجبر الغطاء على الحركة.']
};
const priceLabels:Record<string,string>={
 'Initial diagnosis, pickup & return delivery':'الفحص الأولي والاستلام والتوصيل',
 'Initial bench diagnosis':'الفحص الأولي','Initial hardware diagnostic':'الفحص الأولي',
 'Pickup, return delivery & initial diagnostic':'الاستلام والتوصيل والفحص الأولي',
 'Pickup, return delivery & initial hardware diagnostic':'الاستلام والتوصيل والفحص الأولي',
 'Laptop and desktop repair':'تصليح اللابتوب والكمبيوتر المكتبي','Common laptop repairs':'تصليحات اللابتوب الشائعة','General laptop repair':'تصليح اللابتوب',
 'Laptop charging-port repair':'تصليح مدخل الشحن','Charging-port repair':'تصليح مدخل الشحن','Laptop charging port repair':'تصليح مدخل الشحن',
 'Motherboard component repair':'إصلاح مكونات المذربورد','Component-level motherboard repair':'إصلاح المذربورد على مستوى المكونات',
 'MacBook board-level repair':'إصلاح لوحة ماك بوك','MacBook logic-board repair':'إصلاح اللوحة المنطقية لماك بوك',
 'Laptop thermal service':'صيانة تبريد اللابتوب','Gaming laptop thermal service':'صيانة تبريد لابتوب الألعاب',
 'Screen replacement labour':'أجرة تبديل الشاشة','Laptop screen replacement labour':'أجرة تبديل شاشة اللابتوب','Laptop screen replacement':'تبديل شاشة اللابتوب','Laptop & MacBook screen replacement':'تبديل شاشة اللابتوب وماك بوك',
 'Laptop keyboard replacement':'تبديل الكيبورد','Keyboard replacement labour':'أجرة تبديل الكيبورد','Laptop keyboard replacement labour':'أجرة تبديل الكيبورد',
 'Laptop liquid-damage repair':'تصليح أضرار السوائل','Liquid-damage repair':'تصليح أضرار السوائل',
 'Battery replacement labour':'أجرة تبديل البطارية','Laptop battery replacement labour':'أجرة تبديل البطارية','Laptop battery replacement':'تبديل البطارية',
 'Selected laptop, desktop, hinge & thermal services':'خدمات مختارة للابتوب والمكتبي والمفصلات والتبريد','Selected laptop & desktop repairs':'تصليحات مختارة للابتوب والمكتبي','Motherboard repair & selected MacBook work':'تصليح المذربورد وبعض إصلاحات ماك بوك'
};
function priceAr(price:string){return price.replace(/^FREE$/i,'مجاني').replace(/Labour from /gi,'أجرة تبدأ من ').replace(/From /gi,'من ').replace(/KWD/gi,'د.ك').replace(/labour/gi,'أجرة عمل').replace(/panel \/ display assembly/gi,'الشاشة أو تجميعة العرض').replace(/keyboard \/ assembly/gi,'الكيبورد أو التجميعة').replace(/panel/gi,'الشاشة').replace(/battery/gi,'البطارية').replace(/keyboard/gi,'الكيبورد').replace(/part/gi,'القطعة');}
const timing=(value:string)=>/24–72|24-72/.test(value)?'عادةً 24–72 ساعة حسب الفحص':/24–48|24-48/.test(value)?'عادةً 24–48 ساعة وقد تطول حسب العطل':/same day|24 hours/i.test(value)?'قد يتم بنفس اليوم أو خلال 24 ساعة حسب توفر القطعة والفحص':'يتحدد بعد الفحص والتنسيق';
const panel='rounded-2xl border border-slate-800 bg-slate-900/50 p-5 sm:p-7 mt-6';
const districtNames:Record<string,string>={'Sharq':'شرق','Qibla / Jibla':'القبلة / جبلة','Mirqab':'المرقاب','Dasman':'دسمان','Bneid Al-Gar':'بنيد القار','Safat':'الصفاة','Al-Sawaber':'الصوابر'};
function TowerHandover({location}:{location:LocationEntry}){
 const {trackConversion}=useAnalytics();
 const zones=[...(location.additionalAreaPostalCodes??[]).filter(z=>Object.hasOwn(districtNames,z.name)),{name:'Al-Sawaber',postalCode:'15300'}];
 const [district,setDistrict]=useState('Sharq');
 const [fields,setFields]=useState({building:'',floor:'',contact:'',model:'',fault:''});
 const fieldLabels={building:'القطعة / الشارع / المبنى',floor:'البرج / الدور / المكتب',contact:'اسم المسؤول أو الاستقبال',model:'نوع الجهاز والموديل',fault:'العطل أو الأعراض'};
 const selected=zones.find(z=>z.name===district);
 const message=['السلام عليكم KCROC، أبي أرتب استلام مجاني من مكتب في مدينة الكويت.','المنطقة: '+(districtNames[district]??district)+' '+(selected?.postalCode??''),...Object.entries(fieldLabels).map(([key,label])=>label+': '+(fields[key as keyof typeof fields].trim()||'____')),'يرجى تأكيد موعد الاستلام ومكان التسليم.'].join('\n');
 return <section className={panel} data-tower-handover-generator="true" aria-labelledby="ar-tower-handover-title"><h2 id="ar-tower-handover-title" className="text-2xl font-black mb-3">رتب استلام جهازك من البرج أو استقبال المكتب</h2><p className="leading-loose mb-4">جهز بيانات التسليم قبل إرسال طلب واتساب. ما يعتبر الطلب موعدًا مؤكدًا إلى أن ننسق معاك؛ التصليح في مختبر حولي.</p><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"><label className="block">المنطقة<select value={district} onChange={e=>setDistrict(e.target.value)} className="block w-full min-h-12 mt-2 rounded-xl bg-slate-950 border border-slate-700 px-3">{zones.map(z=><option key={z.name} value={z.name}>{districtNames[z.name]??z.name} ({z.postalCode})</option>)}</select></label>{Object.entries(fieldLabels).map(([key,label])=><label key={key} className="block">{label}<input value={fields[key as keyof typeof fields]} onChange={e=>setFields(old=>({...old,[key]:e.target.value}))} className="block w-full min-h-12 mt-2 rounded-xl bg-slate-950 border border-slate-700 px-3"/></label>)}</div><a href={buildWhatsAppLink(message)} target="_blank" rel="noopener noreferrer" onClick={()=>trackConversion('whatsapp_click',{entity_id:location.id,cta_name:'ar_tower_handover',button_position:'tower_handover_generator'})} className="inline-flex min-h-12 mt-5 items-center rounded-xl bg-cyan-400 px-5 text-slate-950 font-bold">ارسل تفاصيل استلام المكتب على واتساب</a><p className="mt-3 text-sm">لا ترسل كلمة المرور أو مفاتيح الاسترداد. البيانات المدخلة تذهب إلى واتساب عند الضغط على الرابط، ولا تُسجل في حدث التحليلات.</p></section>;
}
export default function ArabicLocationQuality({location}:{location:LocationEntry}){
 const anchors=location.localPricingAnchors??[],rows=location.localPricingTable?.rows??[];
 const cards=location.localServiceCards??[];
 const scope=location.localScopeNotice;
 return <div dir="rtl" lang="ar-KW" data-ar-location-quality={location.slug}>
 {location.slug==='kuwait-city'&&<TowerHandover location={location}/>}
 {location.localEmergencyProtocol&&<section data-location-emergency-ar className={panel+' border-rose-500/70'}><h2 className="text-2xl font-black text-rose-200 mb-4">{location.slug==='riggae'?'انكب ماي على الماك بوك؟':'انكب سائل على اللابتوب؟'}</h2><ol className="list-decimal ps-6 space-y-3 leading-loose"><li>طفي الجهاز وافصل الشاحن والملحقات إذا آمن. لا تتعامل مع جهاز فيه دخان أو شرر أو حرارة خطرة.</li><li>خله مطفي، ولا تشحنه أو تستخدم رز أو سشوار أو هواء مضغوط. لا تفك البطارية الداخلية.</li><li>ارسل الموديل ونوع السائل ووقت الانسكاب وموقعك لتنسيق الاستلام الآمن والفحص بحولي.</li></ol><Link to="/ar/spilled-water-on-laptop" className="inline-block mt-4 text-cyan-300 underline">خطوات التعامل مع أضرار السوائل</Link></section>}
 {(anchors.length>0||rows.length>0)&&<section data-location-pricing-ar className={panel}><h2 className="text-2xl font-black mb-4">أسعار التصليح الاسترشادية</h2><p className="leading-loose mb-4">مأخوذة من أسعار الخدمة المنشورة لنفس المنطقة. نوضح أجرة العمل والقطع والتكلفة النهائية بعد الفحص وقبل موافقتك.</p><div className="overflow-hidden rounded-xl border border-slate-700"><table className="table-fixed w-full text-sm text-start"><thead><tr className="bg-slate-800"><th scope="col" className="p-3 text-start">الخدمة</th><th scope="col" className="p-3 text-start">السعر الاسترشادي</th>{rows.length>0&&<th scope="col" className="p-3 text-start">المدة التقريبية</th>}</tr></thead><tbody>{anchors.map(item=><tr key={item.label} data-location-price-row-ar className="border-t border-slate-700"><th scope="row" className="p-3 text-start break-words">{priceLabels[item.label]??item.label}</th><td className="p-3 text-cyan-300 font-bold break-words">{priceAr(item.price)}</td></tr>)}{rows.map(item=><tr key={item.service} data-location-price-row-ar className="border-t border-slate-700"><th scope="row" className="p-3 text-start break-words">{priceLabels[item.service]??item.service}</th><td className="p-3 text-cyan-300 font-bold break-words">{priceAr(item.startingPrice)}</td><td className="p-3 break-words">{timing(item.typicalTurnaround)}</td></tr>)}</tbody></table></div><p className="mt-4 leading-loose">الفحص الأولي والاستلام والتوصيل مجاني. أسعار الأجرة لا تشمل القطعة؛ السعر النهائي والمدة يتأكدون حسب الموديل والعطل والتوفر.</p><Link to="/ar/pricing" className="inline-block mt-3 underline text-cyan-300">شوف قائمة الأسعار الكاملة</Link></section>}
 {cards.length>0&&<section className={panel} data-location-service-cards-ar><h2 className="text-2xl font-black mb-4">كيف نفحص الأعطال حسب نوع الجهاز؟</h2><div className="grid md:grid-cols-2 gap-4">{cards.map((card,i)=>{const ids=(card.serviceIds??[]).filter(id=>serviceCopy[id]);return <article key={i} data-location-service-card-ar className="rounded-xl border border-slate-700 p-5"><h3 className="text-lg font-bold text-cyan-300 mb-3">{ids.map(id=>serviceCopy[id][0]).join(' · ')||'تشخيص الهاردوير'}</h3>{ids.map(id=><div key={id} className="mb-3 leading-loose"><p><strong>الأعراض: </strong>{serviceCopy[id][1]}.</p><p><strong>الفحص: </strong>{serviceCopy[id][2]}</p></div>)}<p className="leading-loose">نستلم الجهاز مجانًا ونفحصه في حولي، ونوضح لك خيارات الإصلاح قبل العمل.</p><div className="flex flex-wrap gap-3 mt-3">{ids.map(id=>{const srv=KCROC_GRAPH.services.find(s=>s.id===id);return srv?<Link key={id} to={localizedSitePath('/'+srv.slug,'ar')} className="text-cyan-300 underline">{serviceCopy[id][0]}</Link>:null})}</div></article>})}</div></section>}
 {scope&&<section data-location-scope-ar className={panel}><h2 className="text-2xl font-black mb-3">نطاق الخدمة ومكان التصليح</h2><p className="leading-loose">نستلم اللابتوبات والماك بوك والكمبيوتر المكتبي وأجهزة الألعاب الكاملة؛ ما عندنا فرع مستقل في هذه المنطقة. الفحص والإصلاح في مختبر حولي، شارع ابن خلدون، مجمع الملا، السرداب محل 19. ما نقدم تصليح تلفونات أو تابلت أو طابعات أو كروت شاشة مستقلة أو استعادة بيانات. الفحص المعتاد ما يتضمن تصفح الملفات الشخصية.</p><Link to="/ar/computer-repair-hawalli" className="inline-block mt-3 underline text-cyan-300">موقع مختبر حولي</Link></section>}
 </div>;
}
