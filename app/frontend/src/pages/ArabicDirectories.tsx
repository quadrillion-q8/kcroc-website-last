import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, ShieldAlert } from 'lucide-react';
import { SEOEngine } from '../core/components/SEOEngine';
import { KCROC_GRAPH } from '../data/graph';
import { arabicLocationInventory } from '../utils/arabicLocationRoutes';
import { localizedSitePath } from '../utils/locale';
import './KCROCEditorialRollout.css';

const problemCopy: Record<string, [string,string]> = {
 'laptop-wont-turn-on':['اللابتوب ما يشتغل','نفحص الشاحن والبطارية ومسار الطاقة حسب الأعراض.'],
 'laptop-overheating-kuwait':['اللابتوب يسخن وايد','نفحص المراوح والمشتت والحرارة تحت الحمل.'],
 'laptop-black-screen-kuwait':['شاشة اللابتوب سوداء','نميّز بين عطل الشاشة ومسار العرض ومشكلة التشغيل.'],
 'spilled-water-on-laptop':['انكب ماي على اللابتوب','افصل الشاحن إذا كان آمن ولا تحاول تشغيل الجهاز قبل الفحص.'],
 'laptop-plugged-in-not-charging':['اللابتوب مو قاعد يشحن','نفحص الشاحن ومدخل الشحن والبطارية ودائرة الطاقة.'],
 'laptop-keyboard-not-working':['كيبورد اللابتوب ما يشتغل','نفحص الكيبورد والتوصيلات قبل تحديد القطعة المطلوبة.'],
 'laptop-wifi-not-connecting':['اللابتوب ما يتصل بالواي فاي','تعرّف على خطوات فحص اتصال الجهاز، مو صيانة الشبكات.'],
 'laptop-running-very-slow':['اللابتوب بطيء','نفحص التخزين والذاكرة والحرارة قبل اقتراح ترقية.'],
 'laptop-hinge-broken':['مفصلة اللابتوب مكسورة','نفحص المفصلات وقواعد التثبيت والغطاء.'],
 'laptop-screen-cracked-kuwait':['شاشة اللابتوب مكسورة','نتأكد من موديل الشاشة وتوافق القطعة قبل التسعير.'],
 'windows-wont-boot-kuwait':['ويندوز ما يقلع','نحدد هل المشكلة من النظام أو وحدة التخزين أو الهاردوير.'],
 'blue-screen-of-death-bsod-fix-kuwait':['الشاشة الزرقاء في ويندوز','نراجع رمز الخطأ ونفحص الذاكرة والتخزين حسب الحالة.'],
 'computer-freezing-crashing-kuwait':['الكمبيوتر يعلق أو يطفي','نفحص الاستقرار والحرارة والطاقة حسب الأعراض.'],
 'virus-malware-removal-kuwait':['فيروسات وبرامج ضارة','تعرّف على خطوات التعامل مع البرامج الضارة وفحص الجهاز.'],
};
export function ArabicProblemsDirectory() {
 const cards = KCROC_GRAPH.problems.map(p => {
   const en='/'+p.slug, href=localizedSitePath(en,'ar');
   const copy=problemCopy[p.slug];
   if (!copy) throw new Error('Missing Arabic problem directory copy: '+p.slug);
   const image = p.contentImages?.[0];
   return {id:p.id,href,translated:href!==en,title:copy[0],description:copy[1],image:image?.src && image?.alt ? {src:image.src,alt:image.alt,width:image.width,height:image.height} : undefined};
 });
 return <ArabicDirectory kind="problems" cards={cards}/>;
}
export function ArabicLocationsDirectory() {
 const cards=arabicLocationInventory().map(p=>({
   id:p.slug,href:p.path,translated:p.hasArabic,title:'تصليح كمبيوتر '+p.title,
   description:p.isPhysicalLocation?'مختبر KCROC المركزي في حولي.':'استلام وتوصيل مجاني من منطقتك، والفحص والتصليح في مختبر حولي.'
 }));
 return <ArabicDirectory kind="locations" cards={cards}/>;
}
type Card = {id:string;href:string;translated:boolean;title:string;description:string;image?:{src:string;alt:string;width?:number;height?:number}};
function ArabicDirectory({kind,cards}:{kind:'locations'|'problems';cards:Card[]}) {
 const location=kind==='locations';
 const title=location?'مناطق خدمة تصليح الكمبيوتر واللابتوب في الكويت':'أعطال الكمبيوتر واللابتوب اللي نفحصها';
 const Icon=location?MapPin:ShieldAlert;
 return <div lang="ar-KW" dir="rtl" className="min-h-screen bg-transparent text-white pt-28 sm:pt-32 pb-24" data-kcroc-rollout={location?'locations-index':'problems-index'}>
   <SEOEngine entityId={location?'page-ar-locations':'page-ar-problems'}/>
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     <nav aria-label="مسار التنقل" className="mb-8 text-sm"><Link to="/ar">الرئيسية</Link> <span aria-hidden="true"> / </span><span aria-current="page">{location?'مناطق الخدمة':'الأعطال'}</span></nav>
     <header className="max-w-4xl mb-14"><h1 className="text-4xl sm:text-5xl font-black mb-6 leading-tight">{title}</h1><p className="text-lg text-slate-400 leading-loose">{location?'اختار منطقتك. نستلم جهازك من البيت أو المكتب مجانًا، ويتم الفحص والتصليح في مختبرنا المركزي بحولي. المناطق المدرجة مو فروع مستقلة.':'اختار العطل اللي تواجهه. نبدأ بالفحص وتحديد السبب، ونوضح لك خيارات التصليح والتكلفة قبل أي شغل مدفوع.'}</p></header>
     {location && <figure className="mb-12 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
        <img src="/images/computer-repair-shop-hawalli-kuwait.webp" alt="مختبر KCROC المركزي لتصليح أجهزة الكمبيوتر في حولي" loading="lazy" decoding="async" className="max-h-80 w-full object-cover"/>
        <figcaption className="px-5 py-3 text-sm leading-loose text-slate-300">التصليح يتم في مختبرنا بحولي؛ المناطق المذكورة للاستلام والتوصيل وليست فروع مستقلة.</figcaption>
      </figure>}
      <section aria-label={title} className={location?'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5':'grid grid-cols-1 md:grid-cols-2 gap-6'} data-kcroc-editorial-panel={location?'service-area-cards':'problem-index-cards'}>
       {cards.map(card=><Link key={card.id} to={card.href} data-directory-item={card.id} data-translated={String(card.translated)} className="group block rounded-2xl border border-slate-800 bg-slate-900 p-6 hover:border-cyan-500/50 transition-colors">
         <Icon className="w-6 h-6 text-cyan-400 mb-4" aria-hidden="true"/>
         {card.image && <img src={card.image.src} alt={card.image.alt} width={card.image.width} height={card.image.height} loading="lazy" decoding="async" className="mb-5 aspect-[16/10] w-full rounded-xl bg-slate-950 object-cover object-center"/>}
          <h2 className="text-xl font-bold mb-3">{card.title}</h2><p className="text-slate-400 leading-loose mb-4">{card.description}</p>
         <span className="inline-flex items-center gap-2 font-bold text-cyan-400">{card.translated?'التفاصيل':'التفاصيل بالإنجليزي'}<ArrowLeft className="w-4 h-4" aria-hidden="true"/></span>
       </Link>)}
     </section>
     <section className="mt-14 rounded-2xl border border-slate-800 p-6" data-kcroc-editorial-panel="directory-support"><h2 className="text-2xl font-bold mb-3">تبي نرتب استلام جهازك؟</h2><p className="text-slate-400 leading-loose mb-5">الفحص الأولي مجاني ونوضح لك السعر قبل التصليح. تواصل معانا عشان نأكد تفاصيل الاستلام.</p><Link to="/ar/book" className="inline-flex min-h-12 items-center rounded-xl bg-cyan-500 px-5 font-bold text-slate-950">احجز استلام مجاني</Link> <Link to="/ar/contact" className="inline-flex min-h-12 items-center px-4 font-bold text-cyan-400">اتصل بنا</Link></section>
   </div>
 </div>;
}
