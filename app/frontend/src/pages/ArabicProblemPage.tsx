import React from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { KCROC_GRAPH } from '../data/graph';
import { ARABIC_PROBLEMS } from '../data/arabicProblems';
import { ARABIC_PROBLEM_QUALITY } from '../data/arabicProblemQuality';
import ArabicProblemDiagnostics from '../components/content/ArabicProblemDiagnostics';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import { SEOEngine } from '../core/components/SEOEngine';
import { buildWhatsAppLink } from '../utils/whatsappIntent';
import { isArabicPath, localizedSitePath } from '../utils/locale';
import { useAnalytics } from '../core/analytics/AnalyticsProvider';
import './templates/ProblemTemplate.css';
import './KCROCEditorialRollout.css';

const serviceLabels: Record<string,string> = {
 'srv-laptop':'تصليح لابتوب','srv-motherboard':'تصليح مذربورد','srv-charging-port':'تصليح مدخل الشحن','srv-liquid-damage':'تصليح أضرار السوائل','srv-gaming-laptop':'تصليح لابتوب ألعاب','srv-gaming-laptop-cleaning':'تنظيف لابتوب الألعاب والتبريد','srv-screen':'تبديل شاشة اللابتوب','srv-macbook':'تصليح ماك بوك','srv-keyboard':'تبديل كيبورد اللابتوب','srv-battery':'تبديل بطارية اللابتوب','srv-gaming':'تصليح كمبيوتر ألعاب','srv-ssd-ram':'ترقية SSD وRAM','srv-hinge':'تصليح المفصلات',
};
const diagnosticIntake: Record<string,string> = {
 'laptop-wont-turn-on':'حالة لمبات التشغيل والشاحن والمراوح: ____.',
 'laptop-overheating-kuwait':'متى ترتفع الحرارة؟ خمول / لعب / شحن: ____. هل يطفي الجهاز؟ ____.',
 'spilled-water-on-laptop':'نوع السائل ووقت الانسكاب: ____. هل تم تشغيله أو شحنه بعد الانسكاب؟ ____.',
 'laptop-running-very-slow':'متى بدأ البطء؟ البرامج المتأثرة ونوع التخزين إن عرفت: ____.',
 'laptop-keyboard-not-working':'الأزرار المتأثرة وهل تعرض الجهاز لسائل: ____.',
 'laptop-black-screen-kuwait':'هل تظهر لمبات أو مراوح أو شعار الشركة؟ ____.',
 'laptop-wifi-not-connecting':'هل المشكلة بجهاز واحد أو بكل أجهزة الشبكة؟ وهل يظهر محول Wi-Fi؟ ____.',
 'laptop-hinge-broken':'مكان الكسر وهل إطار الشاشة منفصل أو الصورة تتغير مع حركة الغطاء: ____.',
 'laptop-screen-cracked-kuwait':'نوع الكسر وهل تظهر خطوط أو بقع أو صورة جزئية: ____.',
 'windows-wont-boot-kuwait':'آخر رسالة خطأ أو مرحلة يتوقف عندها الإقلاع: ____.',
 'blue-screen-of-death-bsod-fix-kuwait':'رمز Stop Code إن توفر ومتى يظهر الخطأ: ____.',
 'computer-freezing-crashing-kuwait':'هل المشكلة تعليق أو إعادة تشغيل أو إطفاء؟ ومتى تظهر؟ ____.',
 'virus-malware-removal-kuwait':'نوع الأعراض ومتى بدأت، بدون إرسال كلمات مرور أو ملفات حساسة: ____.'
};
export default function ArabicProblemPage() {
 const slug=useLocation().pathname.replace(/^\/ar\//,'').replace(/\/+$/,'');
 const {trackConversion}=useAnalytics();
 const problem=KCROC_GRAPH.problems.find(p=>p.slug===slug);
 const copy=slug?ARABIC_PROBLEMS[slug]:undefined;
 const page=KCROC_GRAPH.pages.find(p=>p.slug==='ar/'+slug);
 if(!problem||!copy||!page)return <Navigate to="/404" replace/>;
 const services=(problem.relatedServiceIds??[]).flatMap(id=>KCROC_GRAPH.services.filter(s=>s.id===id && s.isActive));
 const quality=ARABIC_PROBLEM_QUALITY[slug];
 const faqs=[...copy.faq,...(quality?.faq??[]).map(([q,a])=>({q,a}))];
 const brands=KCROC_GRAPH.brands.filter(b=>problem.relatedBrandIds?.includes(b.id));
 const guide=problem.relatedGuideSlug?localizedSitePath('/guides/'+problem.relatedGuideSlug,'ar'):null;
 const references=problem.technicalReferences??[];
 const referenceLabels:Record<string,string>={'www.dell.com':'دعم Dell','support.apple.com':'دعم Apple','support.microsoft.com':'دعم Microsoft','www.asus.com':'دعم ASUS','www.amd.com':'دعم AMD','www.ifixit.com':'دليل iFixit'};
 const wa=buildWhatsAppLink('السلام عليكم KCROC، عندي مشكلة: '+copy.title+'. الموديل: ____. الأعراض: ____. '+(diagnosticIntake[slug]??'متى بدأ العطل؟ ____.')+' المنطقة: ____. أبي أعرف الخطوة المناسبة للفحص والسعر. لا أرسل كلمات مرور أو مفاتيح استرداد.');
 const liquid=slug==='spilled-water-on-laptop';
 const panel='rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8';
 const cta=(position:'hero'|'body')=><div data-problem-cta={position} className="flex flex-wrap gap-3"><Link data-problem-action="booking" to="/ar/book" onClick={()=>trackConversion('cta_click',{cta_name:'arabic_problem_booking',button_position:position,entity_id:problem.id})} className="inline-flex min-h-12 items-center rounded-xl bg-cyan-400 px-5 font-black text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400">احجز استلام مجاني</Link><a data-problem-action="whatsapp" href={wa} target="_blank" rel="noopener noreferrer" onClick={()=>trackConversion('whatsapp_click',{cta_name:'arabic_problem_whatsapp',button_position:position,entity_id:problem.id})} className="inline-flex min-h-12 items-center rounded-xl border border-cyan-400/50 px-5 font-bold text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400">راسلنا على واتساب</a></div>;
 return <div lang="ar-KW" dir="rtl" data-problem-layout data-arabic-problem={slug} className="min-h-screen bg-transparent text-slate-200">
  <SEOEngine entityId={page.id}/>
  <SchemaMarkup schema={{'@context':'https://schema.org','@type':'FAQPage','@id':page.seo.canonicalUrl+'#faq',inLanguage:'ar-KW',mainEntity:faqs.map(f=>({'@type':'Question',name:f.q,acceptedAnswer:{'@type':'Answer',text:f.a}}))}}/>
  <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 lg:pt-24">
   <nav aria-label="مسار التنقل" className="mb-6 flex flex-wrap gap-2 text-sm"><Link to="/ar">الرئيسية</Link><span aria-hidden="true">/</span><Link to="/ar/problems">الأعطال</Link><span aria-hidden="true">/</span><span aria-current="page">{copy.title}</span></nav>
   <header className={panel}><p className="mb-3 text-cyan-300 font-bold">تشخيص أعطال الكمبيوتر واللابتوب في الكويت</p><h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-5">{copy.title}</h1><p className="text-lg leading-loose mb-6">{copy.symptom}</p>
   {liquid&&<section aria-labelledby="spill-warning" className="rounded-xl border border-rose-400 bg-rose-950/70 p-5 mb-6"><h2 id="spill-warning" className="font-black text-xl mb-3">تصرف فورًا قبل محاولة التشغيل</h2><p>{copy.caution}</p><ol className="list-decimal ps-6 mt-3 space-y-2">{copy.checks.map(c=><li key={c}>{c}</li>)}</ol></section>}{cta('hero')}</header>
   <div className="grid gap-6 mt-8">
   <ArabicProblemDiagnostics key={slug} slug={slug}/>
   <section className={panel} data-problem-editorial-panel="causes"><h2 className="text-2xl font-black mb-4 text-white">شنو الأسباب المحتملة؟</h2><ul className="list-disc ps-6 space-y-3 leading-loose">{copy.causes.map(c=><li key={c}>{c}</li>)}</ul></section>
   <section className={panel} data-problem-editorial-panel="safe-checks"><h2 className="text-2xl font-black mb-4 text-white">خطوات فحص آمنة قبل التصليح</h2><ol className="list-decimal ps-6 space-y-3 leading-loose">{copy.checks.map(c=><li key={c}>{c}</li>)}</ol><p className="mt-5 rounded-xl border border-rose-500/50 bg-rose-950/40 p-4 leading-loose">{copy.caution}</p></section>
   <section className={panel} data-problem-editorial-panel="lab"><h2 className="text-2xl font-black mb-4 text-white">شلون نفحص العطل في مختبر حولي؟</h2><p className="leading-loose">{copy.lab}</p><div className="grid sm:grid-cols-2 gap-5 mt-6">{problem.contentImages?.map((img,i)=><figure key={img.src} className="overflow-hidden rounded-xl border border-slate-700"><img src={img.src} width={img.width} height={img.height} alt={copy.photos[i]??copy.title} loading="lazy" className="w-full h-56 object-contain bg-slate-950"/><figcaption className="p-3 text-sm">{copy.photos[i]??copy.title}</figcaption></figure>)}</div></section>
   <section className={panel} data-problem-editorial-panel="services"><h2 className="text-2xl font-black mb-4 text-white">خدمات التصليح المرتبطة بالعطل</h2><div className="flex flex-wrap gap-3">{services.map(s=><Link key={s.id} to={localizedSitePath('/'+s.slug,'ar')} className="rounded-xl border border-slate-700 p-3 text-cyan-300 font-bold">{serviceLabels[s.id]??'خدمة تصليح الكمبيوتر'}</Link>)}</div><p className="mt-4 leading-loose">الفحص الأولي مجاني، ونحدد التكلفة حسب الموديل والقطعة ونتيجة الفحص قبل أي شغل مدفوع. <Link to="/ar/pricing" className="text-cyan-300 underline">راجع تفاصيل الأسعار</Link>.</p></section>
   {brands.length>0&&<section className={panel} data-problem-editorial-panel="brands-covered"><h2 className="text-2xl font-black mb-4 text-white">الماركات المرتبطة بهذا العطل</h2><div className="flex flex-wrap gap-3">{brands.map(b=><Link key={b.id} to={localizedSitePath('/'+b.slug,'ar')} className="rounded-xl border border-slate-700 p-3 text-cyan-300">{b.brandName}</Link>)}</div><p className="mt-4">نحدد إمكانية الفحص والإصلاح حسب الموديل والعطل الفعلي.</p></section>}
   <section className={panel} data-problem-editorial-panel="related-resources"><h2 className="text-2xl font-black mb-4 text-white">أدلة ومصادر إضافية</h2><div className="flex flex-wrap gap-4">{guide&&<Link to={guide} lang={isArabicPath(guide)?'ar':'en'} className="text-cyan-300 underline">دليل تقني مرتبط{!isArabicPath(guide)?' (بالإنجليزي)':''}</Link>}<Link to="/ar/gallery" className="text-cyan-300 underline">صور المختبر</Link><Link to="/ar/faq" className="text-cyan-300 underline">الأسئلة الشائعة</Link><Link to="/ar/privacy-security-kuwait" className="text-cyan-300 underline">خصوصية البيانات</Link></div></section>
   {references.length>0&&<section className={panel} data-problem-editorial-panel="technical-references"><h2 className="text-2xl font-black mb-4 text-white">مراجع الشركات المصنّعة والإصلاح</h2><p className="mb-4">راجع تعليمات الموديل الرسمي؛ الروابط التالية هي نفس المراجع المستخدمة في الصفحة الإنجليزية.</p><ul className="space-y-3">{references.map(ref=><li key={ref.url}><a href={ref.url} target="_blank" rel="noopener noreferrer" className="text-cyan-300 underline">{referenceLabels[new URL(ref.url).hostname]??'مرجع تقني'} — <span lang="en">{ref.label}</span></a></li>)}</ul></section>}
   <section className={panel} data-problem-editorial-panel="faq"><h2 className="text-2xl font-black mb-4 text-white">أسئلة شائعة</h2>{faqs.map(f=><details key={f.q} data-kcroc-faq-item="true" className="border-b border-slate-700 py-4"><summary className="font-bold cursor-pointer rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400">{f.q}</summary><p className="mt-3 leading-loose">{f.a}</p></details>)}</section>
   <section className={panel}><h2 className="text-2xl font-black mb-4 text-white">استلام وتوصيل مجاني في الكويت</h2><p className="mb-5 leading-loose">نرتب استلام الجهاز من البيت أو المكتب والفحص في مختبرنا المركزي بحولي. نوضح لك النتيجة والسعر قبل الموافقة على الإصلاح. ضمان 30 يوم على التصليحات المكتملة وفق الشروط.</p>{cta('body')}<p className="mt-5"><Link to="/ar/locations" className="text-cyan-300 underline">مناطق الخدمة</Link> · <Link to="/ar/contact" className="text-cyan-300 underline">اتصل بنا</Link> · <Link to={'/'+problem.slug} lang="en" className="text-cyan-300 underline">English version</Link></p></section>
   </div>
  </div>
 </div>;
}
