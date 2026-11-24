import React from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { KCROC_GRAPH } from '../data/graph';
import { ARABIC_LOCATIONS } from '../data/arabicLocations';
import { SEOEngine } from '../core/components/SEOEngine';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import { ARABIC_PROBLEMS } from '../data/arabicProblems';
import { useAnalytics } from '../core/analytics/AnalyticsProvider';
import ArabicLocationQuality from '../components/content/ArabicLocationQuality';
import { ARABIC_LOCATION_QUALITY } from '../data/arabicLocationQuality';
import LocationHeroActions from '../components/content/LocationHeroActions';
import { buildWhatsAppLink } from '../utils/whatsappIntent';
import { arabicLocationDestination } from '../utils/arabicLocationRoutes';
import { localizedSitePath } from '../utils/locale';
import './KCROCEditorialRollout.css';

const labels:Record<string,string>={
 'srv-laptop':'تصليح لابتوب','srv-macbook':'تصليح ماك بوك','srv-motherboard':'تصليح المذربورد','srv-screen':'تبديل شاشة اللابتوب','srv-battery':'تبديل بطارية اللابتوب','srv-charging-port':'تصليح مدخل الشحن','srv-gaming':'تصليح كمبيوتر ألعاب','srv-gaming-laptop':'تصليح لابتوب ألعاب','srv-gaming-laptop-cleaning':'تنظيف وتبريد لابتوب الألعاب','srv-ssd-ram':'ترقية SSD وRAM','srv-desktop-pc':'تصليح كمبيوتر مكتبي','srv-liquid-damage':'تصليح أضرار السوائل','srv-hinge':'تصليح المفصلات','srv-keyboard':'تبديل الكيبورد','srv-macbook-screen':'تبديل شاشة ماك بوك'
};
export default function ArabicLocationPage(){
 const slug=useLocation().pathname.replace(/^\/ar\/computer-repair-/,'').replace(/\/+$/,'');
 const {trackConversion}=useAnalytics();
 const loc=KCROC_GRAPH.locations.find(l=>l.slug===slug && !l.isPhysicalLocation);
 const copy=ARABIC_LOCATIONS[slug];
 const page=KCROC_GRAPH.pages.find(p=>p.slug==='ar/computer-repair-'+slug);
 const business=KCROC_GRAPH.business;
 if(!loc||!copy||!page||!business||!loc.contentImage)return <Navigate to="/404" replace/>;
 const photo=loc.contentImage;
 const services=KCROC_GRAPH.services.filter(s=>loc.relatedServiceIds?.includes(s.id));
 const problems=KCROC_GRAPH.problems.filter(p=>loc.relatedProblemIds?.includes(p.id));
 const brands=KCROC_GRAPH.brands.filter(b=>loc.relatedBrandIds?.includes(b.id));
 const nearby=KCROC_GRAPH.locations.filter(l=>l.id!==loc.id&&loc.relatedLocationIds?.includes(l.id)).map(l=>arabicLocationDestination(l.slug));
 const wa=buildWhatsAppLink('السلام عليكم KCROC، أبي أرتب استلام جهاز من '+copy.name+'. الموديل: ____. العطل: ____. القطعة والشارع والمبنى: ____. الموقع والوقت المفضل: ____.');
 const track=(event:'book_pickup_click'|'whatsapp_click'|'phone_call_click')=>trackConversion(event,{entity_id:loc.id,location_context:slug,cta_name:'location_hero',button_position:'hero'});
 const panel='rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8';
 const faqs=[...copy.faqs,...(ARABIC_LOCATION_QUALITY[slug]??[]).map(([q,a])=>({q,a})),{q:'وين يتم تصليح الجهاز؟',a:'في مختبر KCROC المركزي في حولي، شارع ابن خلدون، مجمع الملا، السرداب محل 19. هذي منطقة استلام وتوصيل وليست فرعًا.'},{q:'هل أعرف السعر قبل التصليح؟',a:'إي، الفحص الأولي مجاني ونوضح لك نتيجة الفحص والسعر قبل أي شغل مدفوع. الاستلام والتوصيل مجانيان وفق نطاق الخدمة.'}];
 return <div lang="ar-KW" dir="rtl" data-kcroc-rollout="location-area-ar" data-location-scope="pickup-only" className="min-h-screen bg-transparent text-slate-200">
 <SEOEngine entityId={page.id}/>
 <SchemaMarkup schema={{'@context':'https://schema.org','@type':'FAQPage','@id':page.seo.canonicalUrl+'#faq',inLanguage:'ar-KW',mainEntity:faqs.map(f=>({'@type':'Question',name:f.q,acceptedAnswer:{'@type':'Answer',text:f.a}}))}}/>
 <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-12 lg:pt-24 pb-20">
 <nav aria-label="مسار التنقل" className="mb-6 flex flex-wrap gap-2 text-sm"><Link to="/ar">الرئيسية</Link><span aria-hidden="true">/</span><Link to="/ar/locations">مناطق الخدمة</Link><span aria-hidden="true">/</span><span aria-current="page">{copy.name}</span></nav>
 <header data-location-hero="true" className={panel}>
 <div className="grid lg:grid-cols-2 gap-8 items-center">
 <div><p className="text-cyan-300 font-bold mb-3">{copy.coverage}</p><h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-5">تصليح كمبيوتر ولابتوب في {copy.name}</h1><p className="text-lg leading-loose mb-5">{copy.intro}</p>
 <p data-location-scope-note="true" className="mb-5 rounded-xl border border-cyan-800 p-4 leading-loose">استلام وتوصيل مجاني من منطقتك؛ الفحص والتصليح في <Link to="/ar/computer-repair-hawalli" className="text-cyan-300 underline">مختبر حولي المركزي</Link>، مو فرع في {copy.name}.</p>
 <LocationHeroActions locale="ar" locationSlug={slug} whatsappHref={wa} onBook={()=>track('book_pickup_click')} onWhatsApp={()=>track('whatsapp_click')} showPricing/>
 <a data-location-action="call" href={'tel:+'+business.telephone.replace(/\D/g,'')} onClick={()=>track('phone_call_click')} className="mt-4 inline-flex min-h-12 items-center text-cyan-300" dir="ltr">+965 5530 1913</a>
 </div><figure className="overflow-hidden rounded-xl border border-slate-700"><img src={photo.src} width={photo.width} height={photo.height} alt={copy.photo} className="w-full object-contain bg-slate-950" fetchPriority="high"/><figcaption className="p-3 text-sm">{copy.photo} — صورة من مختبر KCROC، وليست فرعًا محليًا.</figcaption></figure></div>
 </header>
 <ArabicLocationQuality location={loc}/>
 <div className="grid gap-6 mt-8">
 <section data-kcroc-editorial-panel="location-content" className={panel}><h2 className="text-2xl font-black mb-5 text-white">شنو نفحص لأجهزة {copy.name}؟</h2><div className="grid md:grid-cols-3 gap-4">{copy.highlights.map(h=><article key={h.title} className="rounded-xl border border-slate-700 p-5"><h3 className="font-black text-cyan-300 mb-3">{h.title}</h3><p className="leading-loose">{h.description}</p></article>)}</div></section>
 <section data-kcroc-editorial-panel="location-content" className={panel}><h2 className="text-2xl font-black mb-5 text-white">خدمات التصليح المرتبطة</h2>{['salmiya','kuwait-city','farwaniya','jahra','ahmadi'].includes(slug)&&(<p data-thermal-inbound="location" className="mb-5 rounded-xl border border-cyan-500/30 p-4 leading-loose text-slate-200">نستلم جهازك من منطقتك ونفحصه بمختبر حولي، مو فرع بالمنطقة. <Link to="/ar/laptop-cleaning-thermal-paste-kuwait" className="font-bold text-cyan-300 underline underline-offset-4">تنظيف اللابتوب العادي والمعجون الحراري</Link> — سعر إرشادي 15–20 د.ك، وتبديل المعجون حسب الفحص.</p>)}<div className="grid sm:grid-cols-2 gap-4">{services.map(s=><Link key={s.id} className="rounded-xl border border-slate-700 p-5 font-bold text-cyan-300" to={localizedSitePath('/'+s.slug,'ar')}>{labels[s.id]??'خدمة تصليح الكمبيوتر'}</Link>)}</div><p className="mt-5">راجع <Link to="/ar/pricing" className="text-cyan-300 underline">الأسعار</Link>؛ نؤكد تكلفة القطعة وأجرة العمل قبل الموافقة.</p></section>
 <section data-kcroc-editorial-panel="location-content" className={panel}><h2 className="text-2xl font-black mb-5 text-white">أعطال وماركات مرتبطة بالخدمة</h2><div className="flex flex-wrap gap-3">{problems.map(p=><Link data-location-problem-link="true" key={p.id} to={localizedSitePath('/'+p.slug,'ar')} className="rounded-xl border border-slate-700 p-3 text-cyan-300">{ARABIC_PROBLEMS[p.slug]?.title??'اللابتوب ما يشحن'}</Link>)}</div><div className="flex flex-wrap gap-3 mt-4">{brands.map(b=><Link data-location-brand-link="true" key={b.id} to={localizedSitePath('/'+b.slug,'ar')} className="rounded-xl border border-slate-700 p-3 text-cyan-300">{b.title.replace(/ Laptop Repair.*$/i,'')}</Link>)}</div><Link to="/ar/problems" className="inline-block mt-4 underline text-cyan-300">كل الأعطال</Link> · <Link to="/ar/brands" className="underline text-cyan-300">الماركات</Link></section>
 <section data-kcroc-editorial-panel="location-content" className={panel}><h2 className="text-2xl font-black mb-5 text-white">شلون يتم الاستلام والتصليح؟</h2><ol className="list-decimal ps-6 space-y-4 leading-loose"><li>ارسل موقعك والموديل والعطل وتعليمات التسليم. ننسق معاك حسب الموعد المتاح.</li><li>نفحص الجهاز في مختبر حولي ونشرح السبب وخيارات التصليح والسعر.</li><li>بعد موافقتك نصلح الجهاز ونختبره، ثم نرتب التوصيل. ضمان 30 يوم على الإصلاحات المكتملة وفق الشروط.</li></ol></section>
 <section data-kcroc-editorial-panel="location-content" className={panel}><h2 className="text-2xl font-black mb-5 text-white">مناطق الاستلام القريبة</h2><p className="mb-4 leading-loose">{copy.coverage} — ارسل موقع واتساب والقطعة والشارع ورقم المبنى لتنسيق الاستلام.</p><div className="flex flex-wrap gap-3">{nearby.map(n=><Link key={n.slug} to={n.path} className="rounded-xl border border-slate-700 px-4 py-3 text-cyan-300">{n.title}</Link>)}</div><Link to="/ar/locations" className="mt-4 inline-block text-cyan-300 underline">كل مناطق الخدمة</Link></section>
 <section data-kcroc-editorial-panel="location-content" className={panel}><h2 className="text-2xl font-black mb-5 text-white">أسئلة شائعة</h2>{faqs.map(f=><details key={f.q} data-kcroc-faq-item="true" className="border-b border-slate-700 py-4"><summary className="font-bold cursor-pointer">{f.q}</summary><p className="mt-3 leading-loose">{f.a}</p></details>)}</section>
 <section data-kcroc-editorial-panel="location-content" className={panel}><h2 className="text-2xl font-black mb-4 text-white">رتب استلام جهازك من {copy.name}</h2><p className="mb-5 leading-loose">نستلم الجهاز من البيت أو المكتب ونرجعه بعد الإصلاح والاختبار. ما نبدأ شغل مدفوع إلا بعد موافقتك.</p><Link to="/ar/book" className="inline-flex min-h-12 items-center rounded-xl bg-cyan-400 px-5 font-black text-slate-950">احجز استلام مجاني</Link> <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center px-4 font-bold text-cyan-300">راسلنا على واتساب</a><p className="mt-4"><Link to="/ar/contact" className="text-cyan-300 underline">اتصل بنا</Link> · <Link to={'/location/'+slug} lang="en" className="text-cyan-300 underline">English version</Link></p></section>
 </div></div></div>;
}
