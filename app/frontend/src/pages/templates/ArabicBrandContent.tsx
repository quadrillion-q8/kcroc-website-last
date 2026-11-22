import { Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle, Wrench, ArrowLeft, MapPin } from 'lucide-react';
import { KCROC_GRAPH } from '../../data/graph';
import type { BrandEntity } from '../../types/knowledgeGraph';
import { SEOEngine } from '../../core/components/SEOEngine';
import SchemaMarkup from '../../components/seo/SchemaMarkup';
import ServiceConversionActions from '../../components/content/ServiceConversionActions';
import { buildWhatsAppLink } from '../../utils/whatsappIntent';
import { localizedSitePath } from '../../utils/locale';
import { arabicLocationInventory } from '../../utils/arabicLocationRoutes';
import { ARABIC_SERVICE_COPY, arabicHomePrice } from '../../components/home/homeLocale';
import { ARABIC_BRANDS, ARABIC_BRAND_FAMILY_GUIDANCE } from '../../data/brandArabic';

export default function ArabicBrandContent({ brand }: { brand: BrandEntity }) {
  const copy = ARABIC_BRANDS[brand.id];
  const page = KCROC_GRAPH.pages.find(p => p.slug === 'ar/brands/' + brand.slug);
  if (!copy || !page) return null;
  const services = (brand.relatedServiceIds ?? []).flatMap(id => {
    const service = KCROC_GRAPH.services.find(s => s.id === id);
    return service && ARABIC_SERVICE_COPY[service.slug] ? [{ service, copy: ARABIC_SERVICE_COPY[service.slug] }] : [];
  });
  const wa = buildWhatsAppLink('السلام عليكم KCROC، أحتاج فحص لابتوب ' + brand.brandName + '. رقم الموديل: ____. العطل: ____. المنطقة: ____. أرجو تأكيد طريقة الاستلام والسعر بعد الفحص.');
  const images = brand.contentImages ?? [];
  const diagnosticQuestions: Record<string, string> = {
    'brand-dell': 'أرسل Service Tag ورمز تشخيص F12 إذا ظهر، بدون مشاركة كلمات المرور.',
    'brand-hp': 'أرسل رقم المنتج ونمط ومضات Caps Lock أو رمز التحذير إذا ظهر.',
    'brand-lenovo': 'أرسل Machine Type والموديل الكامل ونوع الشاحن المستخدم.',
    'brand-asus': 'أرسل رقم الموديل الكامل ووضح إذا المشكلة تظهر تحت الحمل أو من بداية التشغيل.',
    'brand-acer': 'أرسل رقم الموديل أو SNID ووصف حالة لمبة الشحن والتشغيل.',
    'brand-msi': 'أرسل رقم الموديل الكامل ووصف حالة لمبات التشغيل والشحن وأي مشكلة بالمفصلة.'
  };
  const faqs = [...copy.questions,
    ['هل KCROC مركز صيانة معتمد من الشركة؟','لا، إحنا مختبر مستقل في حولي، مو مركز صيانة رسمي أو معتمد من الشركة. إذا جهازك تحت ضمان الشركة راجع شروط الضمان قبل الإصلاح.'],
    ['كم سعر تصليح الجهاز؟','الفحص الأولي مجاني. السعر النهائي يعتمد على العطل والموديل والقطعة وتوفرها؛ نأكد التكلفة ونطاق العمل قبل أي شغل مدفوع.'],
    ['شلون أرسل الجهاز من منطقتي؟','نرتب استلام وتوصيل مجاني بالكويت؛ الفحص والإصلاح بمختبرنا الوحيد في حولي. ضمان 30 يوم على الإصلاحات المشمولة حسب الشروط.']
  ];
  const arIssues = (brand.commonIssues ?? []).map(i => ({id:i.id, copy:copy.issues[i.id]})).filter(i=>Boolean(i.copy));
  const host = KCROC_GRAPH.business.websiteUrl;
  const schema = {'@graph':[
    {'@type':'Service','@id':page.seo.canonicalUrl+'#service',name:page.title,description:page.description,serviceType:brand.brandName+' laptop repair',url:page.seo.canonicalUrl,inLanguage:'ar-KW',provider:{'@id':host+'/#business'},brand:{'@type':'Brand', name:brand.brandName,url:brand.officialWebsite},areaServed:{'@type':'Country',name:'Kuwait'}},
    {'@type':'FAQPage','@id':page.seo.canonicalUrl+'#faq',inLanguage:'ar-KW',mainEntity:faqs.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))}
  ]};
  return <div dir="rtl" lang="ar-KW" data-kcroc-rollout="brand" data-brand-locale="ar" data-brand-id={brand.id} className="min-h-screen bg-transparent text-slate-200">
    <SEOEngine entityId={page.id} /><SchemaMarkup schema={schema} />
    <section className="relative overflow-hidden border-b border-slate-800 bg-brand-dark/55 px-6 pb-16 pt-12 sm:pt-24">
      <div className="relative mx-auto max-w-6xl">
        <nav aria-label="مسار التنقل" className="mb-8 flex flex-wrap gap-2 text-sm text-slate-400"><Link to="/ar">الرئيسية</Link><span aria-hidden="true">/</span><Link to="/ar/brands">الماركات</Link><span aria-hidden="true">/</span><span aria-current="page">{copy.name}</span></nav>
        <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_.75fr]">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-900/70 bg-cyan-950/40 px-4 py-2 text-sm font-semibold text-cyan-300"><ShieldCheck className="h-4 w-4" aria-hidden="true"/> مختبر مستقل لتصليح {copy.name} بالكويت</p>
            <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl">{page.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">{copy.description}</p>
            <p className="mt-3 text-sm leading-7 text-cyan-100/80">KCROC مختبر صيانة مستقل، مو مركز رسمي معتمد من {brand.brandName}. إذا ضمان الشركة ما زال ساري، راجع شروطه قبل اختيار الإصلاح.</p>
            <div className="mt-7 flex flex-wrap gap-3 text-sm font-semibold">{['فحص أولي مجاني','استلام وتوصيل مجاني','إذا ما صلحناه ما تدفع أجرة التصليح حسب الشروط','ضمان 30 يوم على الإصلاحات المشمولة'].map(t=><span key={t} className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2"><CheckCircle className="h-4 w-4 text-cyan-400" aria-hidden="true"/>{t}</span>)}</div>
            <ServiceConversionActions locale="ar" entityId={brand.id} whatsappHref={wa} showPricing className="mt-9 flex flex-wrap gap-3" />
          </div>
          {images[0] && <figure className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 shadow-2xl"><img src={images[0].src} alt={'فحص لابتوب '+brand.brandName+' في مختبر KCROC بحولي'} width={images[0].width ?? 1200} height={images[0].height ?? 800} loading="eager" fetchPriority="high" decoding="async" className="h-full min-h-72 w-full object-cover"/><figcaption className="border-t border-slate-800 px-5 py-3 text-sm text-slate-400">صورة من أعمال الفحص؛ طريقة الإصلاح تعتمد على موديل الجهاز ونتيجة التشخيص.</figcaption></figure>}
        </div>
      </div>
    </section>
    <section className="border-b border-slate-800 bg-slate-950/70 px-6 py-10" aria-labelledby="brand-ar-triage"><div className="mx-auto max-w-6xl">
      <h2 id="brand-ar-triage" className="text-2xl font-black text-white md:text-3xl">شنو مشكلة لابتوب {brand.brandName}؟</h2>
      <p className="mt-3 text-sm leading-7 text-slate-400">اختَر العرض الأقرب إذا تحتاج مساعدة، وراح تفتح رسالة واتساب فيها الماركة والعطل. نأكد السبب بعد الفحص.</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{arIssues.filter(i=>i.copy[2]).map(i=><a data-brand-symptom={i.id} key={i.id} href={buildWhatsAppLink('السلام عليكم KCROC، عندي لابتوب '+brand.brandName+'، المشكلة: '+i.copy[0]+'. الموديل: ____. المنطقة: ____.')} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-slate-700 bg-slate-900/70 p-4 font-bold hover:border-cyan-400 focus-visible:outline focus-visible:outline-cyan-400">{i.copy[0]}</a>)}</div>
    </div></section>
    <div data-brand-content="true" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <section className="mb-10" aria-labelledby="brand-ar-models"><h2 id="brand-ar-models" className="text-3xl font-black">موديلات {brand.brandName} اللي نفحصها</h2><p className="mt-3 leading-7">أمثلة من الموديلات. نأكد التوافق حسب رقم جهازك، مو اسم العائلة وحده.</p><div className="mt-6 flex flex-wrap gap-2">{(brand.commonModels ?? []).map(m=><span data-brand-model={m} key={m} dir="ltr" className="rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold">{m}</span>)}</div></section>
      <section className="mb-10" aria-labelledby="brand-ar-family-guidance" data-brand-family-guidance={brand.id}>
        <h2 id="brand-ar-family-guidance" className="text-3xl font-black">شنو يختلف بالفحص حسب موديل {brand.brandName}؟</h2>
        <p className="mt-3 leading-7">هذي أمثلة على اتجاه الفحص، مو تشخيص نهائي أو مواصفات ثابتة لكل جيل.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {(ARABIC_BRAND_FAMILY_GUIDANCE[brand.id] ?? []).map(([family, guidance]) => (
            <article key={family} data-brand-family-check className="rounded-2xl border border-slate-800 bg-slate-900/45 p-5">
              <h3 className="font-black"><bdi>{family}</bdi></h3><p className="mt-3 leading-7">{guidance}</p>
            </article>
          ))}
        </div>
        <p className="mt-4 leading-7">بعد التصليح المتفق عليه، نختبر الوظائف المتأثرة بالعطل حسب الموديل ونوضح أي قيود قبل تسليم الجهاز.</p>
      </section>
      <section className="mb-10" aria-labelledby="brand-ar-faults"><h2 id="brand-ar-faults" className="text-3xl font-black">الأعطال الشائعة وطريقة الفحص</h2><div className="mt-6 grid gap-4 md:grid-cols-2">{arIssues.map(i=><article data-brand-issue={i.id} key={i.id} className="rounded-2xl border border-slate-800 bg-slate-900/45 p-6"><h3 className="text-lg font-black">{i.copy[0]}</h3><p className="mt-3 leading-7">{i.copy[1]}</p>{i.copy[2] && <Link to={localizedSitePath('/'+i.copy[2],'ar')} className="mt-4 inline-flex items-center gap-2 font-bold text-cyan-300">تفاصيل التصليح <ArrowLeft className="h-4 w-4" aria-hidden="true"/></Link>}</article>)}</div></section>
      <section className="mb-10" aria-labelledby="brand-ar-diagnostics" data-brand-diagnostic-prep={brand.id}>
        <h2 id="brand-ar-diagnostics" className="text-3xl font-black">شنو المعلومات اللي تساعدنا نفحص جهازك؟</h2>
        <p className="mt-3 leading-7">{diagnosticQuestions[brand.id]}</p>
        <p className="mt-3 leading-7">رمز الخطأ أو اسم الموديل يساعدنا نحدد اتجاه الفحص، لكنه ما يثبت إن قطعة معينة خربانة. لا تفتح الجهاز أو تعيد تشغيله إذا تعرض لسوائل أو فيه بطارية منتفخة.</p>
        <Link to="/ar/gallery" className="mt-4 inline-flex min-h-11 items-center gap-2 font-bold text-cyan-300 focus-visible:outline focus-visible:outline-cyan-400">شوف صور أعمال الفحص والتصليح <ArrowLeft className="h-4 w-4" aria-hidden="true"/></Link>
      </section>
      <section className="mb-10" aria-labelledby="brand-ar-services"><h2 id="brand-ar-services" className="text-3xl font-black">خدمات تصليح {brand.brandName}</h2><div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{services.map(({service,copy:s})=><Link data-brand-service={service.id} key={service.id} to={s.href} className="rounded-2xl border border-slate-800 bg-slate-900/65 p-6"><Wrench className="h-5 w-5 text-cyan-400" aria-hidden="true"/><h3 className="mt-3 text-lg font-black">{s.title}</h3><p className="mt-2 leading-7">{s.description}</p><p className="mt-3 font-bold text-cyan-300">{arabicHomePrice(service)}</p></Link>)}</div><Link to="/ar/pricing" className="mt-6 inline-flex font-bold text-cyan-300">راجع جميع أسعار التصليح في الكويت</Link></section>
      <section className="mb-10" aria-labelledby="brand-ar-process"><h2 id="brand-ar-process" className="text-3xl font-black">شلون يتم التصليح؟</h2><ol className="mt-6 grid gap-4 md:grid-cols-3">{[['استلام الجهاز','أرسل الموديل والعطل ومنطقتك؛ ننسق الاستلام المجاني.'],['الفحص وعرض السعر','نفحص الجهاز في مختبر حولي ونوضح السبب وخيارات الإصلاح والتكلفة.'],['التصليح والاختبار','بعد موافقتك نصلح الجهاز ونختبره وننسق إرجاعه.']].map(([t,d],i)=><li key={t} className="rounded-2xl border border-slate-800 p-5"><span className="font-black text-cyan-400">{i+1}</span><h3 className="mt-2 font-black">{t}</h3><p className="mt-2 leading-7">{d}</p></li>)}</ol></section>
      {images.length>1 && <section className="mb-10" aria-labelledby="brand-ar-photos"><h2 id="brand-ar-photos" className="text-3xl font-black">صور من فحص أجهزة {brand.brandName}</h2><div className="mt-6 grid gap-4 sm:grid-cols-2">{images.slice(1).map((img,i)=><figure key={img.src} className="overflow-hidden rounded-2xl border border-slate-800"><img src={img.src} alt={'صورة من أعمال فحص جهاز '+brand.brandName+' '+(i+2)} width={img.width ?? 1200} height={img.height ?? 800} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover"/><figcaption className="p-4 text-sm">مثال على فحص المكونات في مختبر KCROC.</figcaption></figure>)}</div></section>}
      {brand.id==='brand-dell' && <section className="mb-10"><h2 className="text-2xl font-black">دليل تشخيص حرارة لابتوب ديل</h2><Link to="/guides/ar/dell-laptop-overheating" className="mt-3 inline-flex font-bold text-cyan-300">اقرأ الدليل العربي لتشخيص حرارة Dell</Link></section>}
      <section className="mb-10" aria-labelledby="brand-ar-areas"><h2 id="brand-ar-areas" className="text-3xl font-black">استلام وتوصيل بالكويت</h2><p className="mt-3 leading-7"><MapPin className="inline h-5 w-5" aria-hidden="true"/> الفحص والتصليح في <Link to="/ar/computer-repair-hawalli" className="font-bold text-cyan-300">مختبر KCROC الوحيد في حولي</Link>؛ باقي المناطق للاستلام والتوصيل وليست فروعاً.</p><div className="mt-5 flex flex-wrap gap-2">{arabicLocationInventory().filter(x=>x.hasArabic).map(x=><Link key={x.slug} to={x.path} className="rounded-full border border-slate-700 px-4 py-2 text-sm font-bold">{x.title}</Link>)}</div><Link to="/ar/near-me" className="mt-4 inline-flex font-bold text-cyan-300">جميع مناطق الخدمة</Link></section>
      <section className="mb-10" aria-labelledby="brand-ar-faq"><h2 id="brand-ar-faq" className="text-3xl font-black">الأسئلة الشائعة</h2><div className="mt-6 space-y-3">{faqs.map(([q,a])=><details data-brand-faq="true" data-kcroc-faq-item="true" key={q} className="rounded-xl border border-slate-700 p-5"><summary className="cursor-pointer rounded-md font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400">{q}</summary><p className="mt-3 leading-7">{a}</p></details>)}</div></section>
      <section data-premium-conversion className="rounded-3xl border border-cyan-900/60 p-8 text-center"><h2 className="text-3xl font-black">تحتاج فني تصليح {brand.brandName}؟</h2><p className="mt-3 leading-7">أرسل الموديل والعطل والمنطقة ونرتب معاك الفحص.</p><div className="mt-5 flex flex-wrap justify-center gap-3"><a data-premium-action="whatsapp" href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center rounded-xl bg-cyan-500 px-5 py-3 font-black text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400">راسلنا على واتساب</a><Link data-premium-action="booking" to="/ar/book" className="inline-flex min-h-12 items-center rounded-xl border border-slate-700 px-5 py-3 font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400">احجز استلام مجاني</Link><Link to="/ar/brands" className="inline-flex min-h-12 items-center rounded-xl border border-slate-700 px-5 py-3 font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400">جميع الماركات</Link></div></section>
    </div>
  </div>;
}
