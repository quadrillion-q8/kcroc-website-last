import React from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { KCROC_GRAPH } from '../data/graph';
import { ARABIC_PROBLEMS } from '../data/arabicProblems';
import { SEOEngine } from '../core/components/SEOEngine';
import { buildWhatsAppLink } from '../utils/whatsappIntent';
import { localizedSitePath } from '../utils/locale';
import { useAnalytics } from '../core/analytics/AnalyticsProvider';
import './templates/ProblemTemplate.css';
import './KCROCEditorialRollout.css';

const serviceLabels: Record<string,string> = {
 'srv-laptop':'تصليح لابتوب','srv-motherboard':'تصليح مذربورد','srv-charging-port':'تصليح مدخل الشحن','srv-liquid-damage':'تصليح أضرار السوائل','srv-gaming-laptop':'تصليح لابتوب ألعاب','srv-gaming-laptop-cleaning':'تنظيف لابتوب الألعاب والتبريد','srv-screen':'تبديل شاشة اللابتوب','srv-macbook':'تصليح ماك بوك','srv-keyboard':'تبديل كيبورد اللابتوب','srv-battery':'تبديل بطارية اللابتوب','srv-gaming':'تصليح كمبيوتر ألعاب','srv-ssd-ram':'ترقية SSD وRAM','srv-hinge':'تصليح المفصلات',
};
export default function ArabicProblemPage() {
 const slug=useLocation().pathname.replace(/^\/ar\//,'').replace(/\/+$/,'');
 const {trackConversion}=useAnalytics();
 const problem=KCROC_GRAPH.problems.find(p=>p.slug===slug);
 const copy=slug?ARABIC_PROBLEMS[slug]:undefined;
 const page=KCROC_GRAPH.pages.find(p=>p.slug==='ar/'+slug);
 if(!problem||!copy||!page)return <Navigate to="/404" replace/>;
 const services=KCROC_GRAPH.services.filter(s=>problem.relatedServiceIds?.includes(s.id));
 const wa=buildWhatsAppLink('السلام عليكم KCROC، عندي مشكلة: '+copy.title+'. الموديل: ____. الأعراض: ____. المنطقة: ____. أبي أعرف الخطوة المناسبة للفحص.');
 const liquid=slug==='spilled-water-on-laptop';
 const panel='rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8';
 const cta=<div className="flex flex-wrap gap-3"><Link to="/ar/book" className="inline-flex min-h-12 items-center rounded-xl bg-cyan-400 px-5 font-black text-slate-950">احجز استلام مجاني</Link><a href={wa} target="_blank" rel="noopener noreferrer" onClick={()=>trackConversion('whatsapp_click',{cta_name:'arabic_problem_whatsapp',button_position:'body',entity_id:problem.id})} className="inline-flex min-h-12 items-center rounded-xl border border-cyan-400/50 px-5 font-bold text-cyan-300">راسلنا على واتساب</a></div>;
 return <div lang="ar-KW" dir="rtl" data-problem-layout data-arabic-problem={slug} className="min-h-screen bg-transparent text-slate-200">
  <SEOEngine entityId={page.id}/>
  <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 lg:pt-24">
   <nav aria-label="مسار التنقل" className="mb-6 flex flex-wrap gap-2 text-sm"><Link to="/ar">الرئيسية</Link><span aria-hidden="true">/</span><Link to="/ar/problems">الأعطال</Link><span aria-hidden="true">/</span><span aria-current="page">{copy.title}</span></nav>
   <header className={panel}><p className="mb-3 text-cyan-300 font-bold">تشخيص أعطال الكمبيوتر واللابتوب في الكويت</p><h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-5">{copy.title}</h1><p className="text-lg leading-loose mb-6">{copy.symptom}</p>
   {liquid&&<section aria-labelledby="spill-warning" className="rounded-xl border border-rose-400 bg-rose-950/70 p-5 mb-6"><h2 id="spill-warning" className="font-black text-xl mb-3">تصرف فورًا قبل محاولة التشغيل</h2><p>{copy.caution}</p><ol className="list-decimal ps-6 mt-3 space-y-2">{copy.checks.map(c=><li key={c}>{c}</li>)}</ol></section>}{cta}</header>
   <div className="grid gap-6 mt-8">
   <section className={panel} data-problem-editorial-panel="causes"><h2 className="text-2xl font-black mb-4 text-white">شنو الأسباب المحتملة؟</h2><ul className="list-disc ps-6 space-y-3 leading-loose">{copy.causes.map(c=><li key={c}>{c}</li>)}</ul></section>
   <section className={panel} data-problem-editorial-panel="safe-checks"><h2 className="text-2xl font-black mb-4 text-white">خطوات فحص آمنة قبل التصليح</h2><ol className="list-decimal ps-6 space-y-3 leading-loose">{copy.checks.map(c=><li key={c}>{c}</li>)}</ol><p className="mt-5 rounded-xl border border-rose-500/50 bg-rose-950/40 p-4 leading-loose">{copy.caution}</p></section>
   <section className={panel} data-problem-editorial-panel="lab"><h2 className="text-2xl font-black mb-4 text-white">شلون نفحص العطل في مختبر حولي؟</h2><p className="leading-loose">{copy.lab}</p><div className="grid sm:grid-cols-2 gap-5 mt-6">{problem.contentImages?.map((img,i)=><figure key={img.src} className="overflow-hidden rounded-xl border border-slate-700"><img src={img.src} width={img.width} height={img.height} alt={copy.photos[i]??copy.title} loading="lazy" className="w-full h-56 object-contain bg-slate-950"/><figcaption className="p-3 text-sm">{copy.photos[i]??copy.title}</figcaption></figure>)}</div></section>
   <section className={panel} data-problem-editorial-panel="services"><h2 className="text-2xl font-black mb-4 text-white">خدمات التصليح المرتبطة بالعطل</h2><div className="flex flex-wrap gap-3">{services.map(s=><Link key={s.id} to={localizedSitePath('/'+s.slug,'ar')} className="rounded-xl border border-slate-700 p-3 text-cyan-300 font-bold">{serviceLabels[s.id]??'خدمة تصليح الكمبيوتر'}</Link>)}</div><p className="mt-4 leading-loose">الفحص الأولي مجاني، ونحدد التكلفة حسب الموديل والقطعة ونتيجة الفحص قبل أي شغل مدفوع. <Link to="/ar/pricing" className="text-cyan-300 underline">راجع تفاصيل الأسعار</Link>.</p></section>
   <section className={panel} data-problem-editorial-panel="faq"><h2 className="text-2xl font-black mb-4 text-white">أسئلة شائعة</h2>{copy.faq.map(f=><details key={f.q} className="border-b border-slate-700 py-4"><summary className="font-bold cursor-pointer">{f.q}</summary><p className="mt-3 leading-loose">{f.a}</p></details>)}</section>
   <section className={panel}><h2 className="text-2xl font-black mb-4 text-white">استلام وتوصيل مجاني في الكويت</h2><p className="mb-5 leading-loose">نرتب استلام الجهاز من البيت أو المكتب والفحص في مختبرنا المركزي بحولي. نوضح لك النتيجة والسعر قبل الموافقة على الإصلاح. ضمان 30 يوم على التصليحات المكتملة وفق الشروط.</p>{cta}<p className="mt-5"><Link to="/ar/locations" className="text-cyan-300 underline">مناطق الخدمة</Link> · <Link to="/ar/contact" className="text-cyan-300 underline">اتصل بنا</Link> · <Link to={'/'+problem.slug} lang="en" className="text-cyan-300 underline">English version</Link></p></section>
   </div>
  </div>
 </div>;
}
