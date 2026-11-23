import React from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { ArrowUpRight, BadgeCheck, CheckCircle2, ClipboardCheck, MapPin, ShieldCheck, Wrench } from 'lucide-react';
import { KCROC_GRAPH } from '../data/graph';
import { REPAIR_EXPANSION } from '../data/repairExpansion';
import { SEOEngine } from '../core/components/SEOEngine';
import { localizedSitePath } from '../utils/locale';
import ServiceConversionActions from '../components/content/ServiceConversionActions';
import './KCROCEditorialRollout.css';

export default function RepairExpansionPage() {
  const { pathname } = useLocation();
  const ar = pathname.startsWith('/ar/');
  const slug = pathname.replace(/^\\/ar\\//, '/').replace(/^\\//, '').replace(/\\/$/, '');
  const item = REPAIR_EXPANSION.find((candidate) => candidate.slug === slug);
  if (!item) return <Navigate to="/404" replace />;
  const entityId = ar ? 'page-ar-' + item.id : item.id;
  const activeEntity = KCROC_GRAPH.routableEntities.some((entity) => entity.id === entityId);
  if (!activeEntity) return <Navigate to="/404" replace />;
  const locale = ar ? 'ar' : 'en';
  const copy = ar ? item.ar : item;
  const title = ar ? item.arabicTitle : item.title;
  const intro = ar ? item.ar.intro : item.scope;
  const symptoms = [...copy.symptoms];
  const checks = [...copy.checks];
  const faqs = [...copy.faqs];
  const waText = ar
    ? 'السلام عليكم KCROC، أبي استفسر عن ' + item.arabicTitle + '. موديل الجهاز الكامل: ____. العطل والأعراض: ____. المنطقة: ____. أبي فحص وعرض السعر شامل القطع وأجرة العمل قبل التصليح.'
    : 'Hello KCROC, I would like diagnosis for ' + item.title + '. Exact device brand/model: ____. Symptoms and history: ____. Kuwait pickup area: ____. Please confirm compatibility, parts availability and total quote before any paid repair.';
  const wa = 'https://wa.me/96555301913?text=' + encodeURIComponent(waText);
  const t = (english: string, arabic: string) => ar ? arabic : english;
  const related = [...new Set([item.parent, ...item.related.map((id) => KCROC_GRAPH.services.find((s) => s.id === id)?.slug).filter((slug): slug is string => !!slug).map((slug) => '/' + slug)])].filter((path) => path !== '/' + item.slug).slice(0, 4);
  return <>
    <SEOEngine entityId={entityId} />
    <main lang={ar ? 'ar-KW' : 'en-KW'} dir={ar ? 'rtl' : 'ltr'} data-service-layout="service" data-repair-expansion={slug} className="min-h-screen bg-[#f5f7fa] text-slate-900">
      <section className="bg-[#111a25] px-5 pb-14 pt-32 text-white sm:pb-20 sm:pt-36">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-300" aria-label={t('Breadcrumb','مسار التنقل')}>
            <Link to={ar ? '/ar' : '/'} className="underline underline-offset-4 hover:text-white">{t('Home','الرئيسية')}</Link><span aria-hidden="true">/</span>
            <Link to={ar ? '/ar/services' : '/services'} className="underline underline-offset-4 hover:text-white">{t('Services','الخدمات')}</Link><span aria-hidden="true">/</span><span aria-current="page">{title}</span>
          </nav>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="min-w-0">
              <p className="mb-4 text-sm font-extrabold tracking-wide text-emerald-300">{t('HAWALLI REPAIR LAB · KUWAIT-WIDE PICKUP','مختبر تصليح حولي · استلام وتوصيل بكل الكويت')}</p>
              <h1 className="max-w-3xl text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">{title}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">{intro}</p>
              <div className="mt-7 flex flex-wrap gap-3 text-sm font-semibold text-slate-200">
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-500 px-3 py-2"><MapPin className="h-4 w-4 text-emerald-300" />{t('Repaired at our Hawalli lab','التصليح في مختبر حولي')}</span>
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-500 px-3 py-2"><ShieldCheck className="h-4 w-4 text-emerald-300" />{t('Quote before paid work','نوضح السعر قبل أي عمل')}</span>
              </div>
              <div className="mt-8"><ServiceConversionActions locale={locale} entityId={entityId} whatsappHref={wa} showPricing /></div>
              <p className="max-w-xl text-sm leading-6 text-slate-300">{t('Parts, exact repair method and turnaround are confirmed only after inspecting your specific model. Free initial diagnosis; our established repair warranty terms apply to covered completed work.','القطعة وطريقة التصليح والمدة نأكدهم بعد معرفة موديل جهازك وفحصه. الفحص الأولي مجاني، والضمان على الإصلاحات المكتملة حسب الشروط.')}</p>
            </div>
            <figure className="overflow-hidden rounded-3xl border border-slate-500/50 bg-slate-800 shadow-2xl">
              <img src={item.photo} alt={ar ? item.arabicTitle + ' في مختبر KCROC بحولي' : item.title + ' - repair component inspection in the KCROC Hawalli lab'} loading="eager" decoding="async" className="aspect-[16/11] w-full object-cover" />
              <figcaption className="px-5 py-3 text-sm text-slate-200">{t('Relevant component-level repair imagery from the KCROC image library.','صورة توضّح نوع المكوّنات المرتبطة بالخدمة من مكتبة KCROC.')}</figcaption>
            </figure>
          </div>
        </div>
      </section>
      <section className="px-5 py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div><p className="mb-3 text-xs font-extrabold tracking-widest text-slate-600">{t('START WITH THE SYMPTOMS','ابدأ بالأعراض')}</p><h2 className="text-3xl font-black leading-tight">{t('When this repair may be relevant','متى تحتاج تفحص هالمشكلة؟')}</h2><p className="mt-4 leading-7 text-slate-700">{t('These symptoms are clues, not a confirmed diagnosis. Similar symptoms can have different hardware causes.','هذي علامات تساعد بالفحص، مو تشخيص نهائي. نفس الأعراض ممكن يكون لها أكثر من سبب.')}</p></div>
          <div className="grid gap-3 sm:grid-cols-2">{symptoms.map((s,i) => <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><CheckCircle2 aria-hidden="true" className="mb-4 h-6 w-6 text-emerald-700"/><h3 className="font-bold leading-7">{s}</h3></div>)}</div>
        </div>
      </section>
      <section className="bg-white px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl"><p className="mb-3 text-xs font-extrabold tracking-widest text-slate-600">{t('DIAGNOSIS FIRST','الفحص قبل تبديل القطع')}</p><h2 className="text-3xl font-black">{t('What the technician checks','شنو نفحص في المختبر؟')}</h2></div>
          <div className="grid gap-4 md:grid-cols-2">{checks.map((step,i) => <div key={i} className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-6"><div className="mb-4 flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white">{String(i+1).padStart(2,'0')}</span><ClipboardCheck className="h-5 w-5 text-slate-600" aria-hidden="true"/></div><h3 className="font-bold leading-7">{step}</h3></div>)}</div>
          <div className="mt-8 rounded-2xl border-l-4 border-amber-500 bg-amber-50 p-6 text-slate-900" role="note"><h3 className="font-bold">{t('Repair scope & safety','نطاق الخدمة والسلامة')}</h3><p className="mt-2 leading-7">{ar ? item.ar.scope : item.scope}</p></div>
        </div>
      </section>
      <section className="px-5 py-16"><div className="mx-auto max-w-4xl"><h2 className="mb-7 text-3xl font-black">{t('Frequently asked questions','أسئلة شائعة')}</h2><div className="space-y-3">{faqs.map(([q,a],i) => <details key={i} data-kcroc-faq-item="true" className="rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm"><summary className="cursor-pointer font-bold leading-7 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600">{q}</summary><p className="mt-4 border-t border-slate-200 pt-4 leading-7 text-slate-700">{a}</p></details>)}</div></div></section>
      <section className="bg-[#111a25] px-5 py-16 text-white"><div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:items-center"><div><BadgeCheck className="mb-4 h-7 w-7 text-emerald-300" aria-hidden="true"/><h2 className="text-3xl font-black">{t('Get a model-specific assessment','خلّنا نفحص موديل جهازك')}</h2><p className="mt-4 leading-8 text-slate-200">{t('Describe the exact model, fault and pickup area. We will explain the appropriate diagnostic route and confirm parts and pricing before you approve paid work.','أرسل الموديل والأعراض والمنطقة. نوضح لك طريقة الفحص وتوفر القطعة وعرض السعر قبل أي تصليح مدفوع.')}</p><Link to={localizedSitePath('/book',locale)} className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-xl bg-emerald-400 px-6 py-3 font-extrabold text-slate-950 hover:bg-emerald-300">{t('Arrange free pickup','احجز استلام مجاني')}<ArrowUpRight className="h-4 w-4"/></Link></div><div><h3 className="mb-4 text-lg font-bold">{t('Related repair services','خدمات تصليح مرتبطة')}</h3><div className="grid gap-3">{related.map(path => <Link key={path} to={localizedSitePath(path,locale)} className="flex items-center justify-between rounded-xl border border-slate-600 px-5 py-3 text-sm font-semibold text-white hover:border-emerald-300">{t('Explore related service','شوف الخدمة المرتبطة')}: {path.split('/').pop()?.replace(/-kuwait/g,'').replace(/-/g,' ')}<ArrowUpRight className="h-4 w-4" aria-hidden="true"/></Link>)}</div><Link to={localizedSitePath('/location/hawalli',locale)} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-emerald-300 underline underline-offset-4">{t('Visit our Hawalli laboratory page','صفحة مختبر حولي')}<MapPin className="h-4 w-4"/></Link></div></div></section>
    </main>
  </>;
}
