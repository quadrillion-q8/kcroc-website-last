// File: app/frontend/src/pages/ArabicChargingTroubleshootingPage.tsx
// Arabic counterpart of the English "Laptop Plugged In But Not Charging" problem guide.
// Keep the language pair linked through the canonical knowledge graph.

import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  AlertTriangle,
  BatteryCharging,
  CheckCircle2,
  MessageCircle,
  PlugZap,
  ShieldCheck,
  Wrench,
} from 'lucide-react';
import { KCROC_GRAPH } from '../data/graph';
import { SEOEngine } from '../core/components/SEOEngine';
import SchemaMarkup from '../components/seo/SchemaMarkup';

const business = KCROC_GRAPH.business!;

const FAQ = [
  {
    q: 'ليش اللابتوب يقول متصل بالشاحن ولا يشحن؟',
    a: 'هالرسالة ممكن ترتبط ببطارية ضعيفة، أو شاحن غير مناسب أو غير معروف، أو منفذ شحن أو دائرة طاقة فيها خلل. الرسالة وحدها ما تحدد القطعة التالفة؛ جرّب فحصًا آمنًا للشاحن المتوافق ثم خلّ التشخيص يحدد السبب.',
  },
  {
    q: 'إذا ظهرت رسالة أن قدرة شاحن Dell أو نوعه غير معروف، هل المنفذ خربان؟',
    a: 'مو بالضرورة. في بعض موديلات Dell وHP، قد تكون المشكلة من الشاحن أو سنّ التعريف/التعرّف في القابس أو منفذ DC أو مسار التعريف على اللوحة. لا تحاول تعديل السنّ بإبرة أو أداة؛ نتحقق من الشاحن والموديل والقياسات قبل تحديد الجزء.',
  },
  {
    q: 'اللابتوب يشحن فقط إذا حرّكت السلك، شنو أسوي؟',
    a: 'وقف تحريك السلك بحثًا عن زاوية مناسبة. الحركة المتكررة قد تزيد تلف الموصل أو نقاط اللحام. افصل الشاحن إذا كان ذلك آمنًا، وأرسل صورة للمنفذ والموديل لترتيب الفحص.',
  },
  {
    q: 'هل كل شاحن USB-C يقدر يشحن أي لابتوب؟',
    a: 'لا. لازم يكون الجهاز نفسه يدعم الشحن عبر USB-C، والشاحن والكابل يدعمان قدرة وتفاوض USB Power Delivery المناسبين. شكل المنفذ متشابه في أجهزة كثيرة لكنه لا يضمن التوافق أو القدرة الكافية.',
  },
  {
    q: 'هل مشكلة الشحن في MacBook ممكن تكون من شريحة USB-C؟',
    a: 'في بعض لوحات MacBook قد تكون متحكمات USB-C أو USB Power Delivery، ومنها شرائح مثل CD3215 أو CD3217 في موديلات معينة، ضمن الاحتمالات. لكن نوع الشريحة والخلل يتحدد من رقم الموديل واللوحة والقياسات، وليس من شكل المنفذ فقط.',
  },
  {
    q: 'هل أبدّل البطارية أولًا حتى أجرب؟',
    a: 'الأفضل لا تطلب بطارية قبل تأكيد السبب؛ ممكن تكون المشكلة من الشاحن أو المنفذ أو دائرة الشحن. نفحص الأعراض والبطارية ومصدر الطاقة قبل تحديد الإصلاح المناسب وتكلفته.',
  },
  {
    q: 'شنو أقدر أفحص بنفسي بدون مخاطرة؟',
    a: 'جرّب مقبس كهرباء آخر إذا كان ذلك آمنًا، وتأكد أن الشاحن متصل جيدًا من الطرفين. استخدم شاحنًا متوافقًا مع مواصفات الموديل، وافحص المنفذ من الخارج فقط. لا تدخل أدوات معدنية ولا تفتح الجهاز ولا تواصل الشحن إذا ظهرت حرارة أو شرر أو رائحة احتراق.',
  },
  {
    q: 'كم يكلف فحص أو إصلاح مشكلة الشحن في الكويت؟',
    a: 'يبدأ سعر خدمة إصلاح مدخل الشحن من 20 د.ك حسب العطل والموديل، لكن هذا ليس عرضًا نهائيًا لكل الحالات. نفحص الجهاز ونوضح نطاق العمل وتكلفة القطع إن وجدت قبل بدء أي إصلاح مدفوع.',
  },
];

const steps = [
  {
    title: '١. حدّد الموديل والأعراض',
    text: 'اكتب الماركة ورقم الموديل، وهل تظهر رسالة خطأ، وهل ضوء الشاحن يعمل، ومتى بدأت المشكلة.',
  },
  {
    title: '٢. تحقّق من مصدر الكهرباء',
    text: 'جرّب مقبسًا آخر إذا كان ذلك آمنًا، وتأكد أن كابل الشاحن متصل جيدًا دون ثنيه أو الضغط عليه.',
  },
  {
    title: '٣. راجع توافق الشاحن',
    text: 'استخدم الشاحن الأصلي أو شاحنًا موثوقًا بالمواصفات والقدرة المناسبتين. لا تعتمد على تطابق شكل القابس فقط.',
  },
  {
    title: '٤. لاحظ شكل المشكلة دون إجهاد المنفذ',
    text: 'هل الشحن متقطع؟ هل يظهر تحذير عن نوع الشاحن؟ هل تتوقف نسبة البطارية عن الزيادة؟ دوّن الأعراض ولا تحرّك القابس بالقوة.',
  },
  {
    title: '٥. أرسل التفاصيل قبل الاستلام',
    text: 'أرسل الموديل وصورة واضحة للمنفذ والشاحن ورسالة الخطأ إن ظهرت. لا ترسل كلمة مرور الجهاز أو رموز الدخول.',
  },
  {
    title: '٦. فحص ثم عرض سعر',
    text: 'في مختبر KCROC بحولي نفصل بين عطل الشاحن والمنفذ والبطارية ودائرة الشحن حسب التصميم والقياسات. نوضح النتيجة والسعر قبل العمل.',
  },
];

const pageUrl = business.websiteUrl + '/ar/laptop-plugged-in-not-charging';
const pageImage = business.websiteUrl + '/images/laptop-dc-power-jack-connector-replacement-kuwait-1000.webp';

const schema = {
  '@graph': [
    {
      '@type': 'TechArticle',
      '@id': pageUrl + '#article',
      headline: 'اللابتوب متصل بالشاحن ولا يشحن؟ دليل فحص آمن في الكويت',
      description: 'خطوات آمنة لفهم مشكلة اللابتوب المتصل بالشاحن الذي لا يشحن، مع التمييز بين الشاحن والمنفذ والبطارية ودائرة الطاقة.',
      url: pageUrl,
      mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
      image: pageImage,
      inLanguage: 'ar-KW',
      datePublished: '2026-10-26',
      dateModified: '2026-10-26',
      author: { '@type': 'Organization', name: business.title, url: business.websiteUrl },
      publisher: { '@id': business.websiteUrl + '/#business' },
      articleSection: 'تشخيص أعطال اللابتوب والشحن',
      about: [
        { '@type': 'Thing', name: 'تصليح مدخل شحن اللابتوب' },
        { '@type': 'Thing', name: 'USB Power Delivery' },
        { '@type': 'Thing', name: 'بطارية اللابتوب' },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': pageUrl + '#faq',
      inLanguage: 'ar-KW',
      mainEntity: FAQ.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  ],
};

export default function ArabicChargingTroubleshootingPage() {
  const whatsappText =
    'السلام عليكم KCROC، اللابتوب عندي متصل بالشاحن لكنه لا يشحن. الماركة والموديل: ____. نوع الشاحن والمنفذ: ____. رسالة الخطأ أو الأعراض: ____. منطقتي بالكويت: ____. أقدر أرسل صورة للشاحن والمنفذ. فضلاً وضحوا الفحص والسعر قبل أي إصلاح مدفوع.';
  const whatsappUrl = 'https://wa.me/' + business.telephone + '?text=' + encodeURIComponent(whatsappText);

  return (
    <div dir="rtl" lang="ar-KW" className="min-h-screen bg-transparent text-slate-100">
      <SEOEngine entityId="page-ar-laptop-plugged-in-not-charging" />
      <SchemaMarkup schema={schema} />

      <div className="mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6 sm:pt-12">
        <nav aria-label="مسار التنقل" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link to="/ar" className="hover:text-cyan-300">الرئيسية</Link>
          <span aria-hidden="true">/</span>
          <Link to="/ar/laptop-charging-port-repair-kuwait" className="hover:text-cyan-300">تصليح مدخل شحن اللابتوب</Link>
          <span aria-hidden="true">/</span>
          <span className="text-slate-300">اللابتوب متصل بالشاحن ولا يشحن</span>
        </nav>

        <header className="overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-slate-950/90 to-slate-950 p-6 shadow-2xl sm:p-10">
          <div className="flex flex-wrap items-center gap-2 text-xs font-black text-cyan-300">
            <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1.5">دليل تشخيص عملي</span>
            <span className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1.5">Laptop Charging Troubleshooting</span>
          </div>
          <h1 className="mt-5 max-w-4xl text-3xl font-black leading-tight text-white sm:text-5xl">
            اللابتوب متصل بالشاحن ولا يشحن؟ شلون نحدد السبب بأمان
          </h1>
          <p className="mt-5 max-w-4xl text-base leading-8 text-slate-300 sm:text-lg">
            إذا تظهر عبارة «متصل بالشاحن ولا يشحن»، لا تفترض أن البطارية أو المذربورد تحتاج تبديلًا. ممكن يتشابه العرض مع عطل في الشاحن أو الكابل أو منفذ DC Jack أو USB-C أو دائرة الشحن. هالدليل يساعدك تجمع المعلومات الآمنة قبل الحجز؛ الفحص هو اللي يحدد السبب الفعلي.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-black/20 p-4">
              <div className="text-xl font-black text-white">من 20 د.ك</div>
              <div className="mt-1 text-sm leading-6 text-slate-400">سعر بداية خدمة مدخل الشحن حسب العطل والموديل</div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-black/20 p-4">
              <div className="text-xl font-black text-white">فحص أولًا</div>
              <div className="mt-1 text-sm leading-6 text-slate-400">نفرّق بين الشاحن والمنفذ والبطارية ودائرة الطاقة</div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-black/20 p-4">
              <div className="text-xl font-black text-white">30 يومًا</div>
              <div className="mt-1 text-sm leading-6 text-slate-400">ضمان على الإصلاحات المكتملة وفق شروط الخدمة</div>
            </div>
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="إرسال موديل اللابتوب وأعراض عدم الشحن إلى KCROC عبر واتساب" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 py-3 font-black text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200">
              <MessageCircle className="h-5 w-5" aria-hidden="true" /> أرسل الموديل وأعراض الشحن
            </a>
            <Link to="/ar/laptop-charging-port-repair-kuwait" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-700 px-6 py-3 font-bold text-white transition hover:border-cyan-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
              <Wrench className="h-5 w-5" aria-hidden="true" /> خدمة إصلاح مدخل الشحن
            </Link>
            <Link to="/laptop-plugged-in-not-charging" aria-label="Open the English laptop plugged-in-but-not-charging guide" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-700 px-6 py-3 font-bold text-slate-300 transition hover:border-cyan-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
              English guide <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </header>

        <section className="mt-10" aria-labelledby="charging-symptoms-heading">
          <div className="mb-6 max-w-3xl">
            <p className="text-sm font-black tracking-wide text-cyan-400">شلون نقرأ الأعراض؟</p>
            <h2 id="charging-symptoms-heading" className="mt-2 text-2xl font-black text-white sm:text-3xl">أربع علامات تساعد على تحديد الخطوة التالية</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-slate-800 bg-slate-900/55 p-5">
              <BatteryCharging className="h-6 w-6 text-cyan-300" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-black text-white">النسبة ما تزيد رغم ظهور الشاحن</h3>
              <p className="mt-2 leading-7 text-slate-300">قد تكون البطارية متدهورة أو أن الشاحن غير مناسب أو أن دائرة الشحن لا تعمل كما ينبغي. عبارة Windows وحدها لا تكشف أي مكوّن تالف.</p>
            </article>
            <article className="rounded-2xl border border-slate-800 bg-slate-900/55 p-5">
              <PlugZap className="h-6 w-6 text-cyan-300" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-black text-white">رسالة أن نوع الشاحن أو قدرته غير معروف</h3>
              <p className="mt-2 leading-7 text-slate-300">في بعض أجهزة Dell وHP، قد يتعلق ذلك بالشاحن أو سنّ التعريف في قابس DC أو مسار التعرف على اللوحة. لا تدخل أداة في القابس ولا تفترض أن المنفذ هو السبب قبل الاختبار.</p>
            </article>
            <article className="rounded-2xl border border-slate-800 bg-slate-900/55 p-5">
              <Wrench className="h-6 w-6 text-cyan-300" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-black text-white">الشحن يبدأ ويتوقف إذا تحرك السلك</h3>
              <p className="mt-2 leading-7 text-slate-300">قد يشير إلى موصل مرتخٍ أو نقطة لحام متضررة. لا تواصل تحريك الكابل بحثًا عن زاوية مناسبة لأن ذلك قد يزيد الضرر.</p>
            </article>
            <article className="rounded-2xl border border-slate-800 bg-slate-900/55 p-5">
              <ShieldCheck className="h-6 w-6 text-cyan-300" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-black text-white">منفذ USB-C يبدو سليمًا لكن الشحن لا يعمل</h3>
              <p className="mt-2 leading-7 text-slate-300">المظهر الخارجي لا يثبت أن تفاوض USB Power Delivery أو دائرة الطاقة سليمة. في بعض لوحات MacBook قد تكون متحكمات مثل CD3215 أو CD3217 ضمن الفحص، بحسب الجيل ورقم اللوحة.</p>
              <Link to="/ar/macbook-repair-kuwait" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-cyan-300 hover:text-cyan-200">تفاصيل تشخيص MacBook <ArrowLeft className="h-4 w-4" aria-hidden="true" /></Link>
            </article>
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/45 p-6 sm:p-8" aria-labelledby="charging-safe-checks-heading">
          <p className="text-sm font-black tracking-wide text-amber-300">فحوصات آمنة قبل التواصل</p>
          <h2 id="charging-safe-checks-heading" className="mt-2 text-2xl font-black text-white sm:text-3xl">شنو تقدر تفحص بنفسك بدون مخاطرة؟</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              'جرّب مقبس كهرباء آخر إذا كان ذلك آمنًا، وتأكد أن الشاحن متصل جيدًا من الطرفين.',
              'استخدم الشاحن الأصلي أو شاحنًا متوافقًا تمامًا مع مواصفات الموديل والقدرة المطلوبة.',
              'افحص المنفذ من الخارج فقط؛ لا تدخل دبوسًا أو أداة معدنية ولا تستخدم سوائل للتنظيف.',
              'إذا وجدت حرارة غير طبيعية أو شررًا أو رائحة احتراق أو سبق انسكاب سائل، أوقف الاستخدام وافصل الطاقة إذا كان ذلك آمنًا.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm leading-7 text-slate-300">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm leading-7 text-slate-300">
            لا تفتح الجهاز وهو متصل بالكهرباء، ولا تحاول إصلاح سنّ الشاحن أو المنفذ بنفسك. إذا ظهرت شرارة أو رائحة احتراق، لا تعاود توصيل الشاحن للتجربة.
          </p>
        </section>

        <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/45 p-6 sm:p-8" aria-labelledby="charging-steps-heading">
          <h2 id="charging-steps-heading" className="text-2xl font-black text-white sm:text-3xl">قبل لا ترسل جهازك: شنو المعلومات اللي تساعد؟</h2>
          <ol className="mt-6 grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step) => (
              <li key={step.title} className="rounded-2xl border border-slate-800 bg-slate-950/55 p-5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400/10 font-black text-cyan-200">{step.title.slice(0, 1)}</span>
                <h3 className="mt-4 font-black text-white">{step.title.slice(3)}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/45 p-6 sm:p-8" aria-labelledby="charging-faq-heading">
          <p className="text-sm font-black tracking-wide text-cyan-400">الأسئلة الشائعة</p>
          <h2 id="charging-faq-heading" className="mt-2 text-2xl font-black text-white sm:text-3xl">أسئلة عن اللابتوب المتصل بالشاحن ولا يشحن</h2>
          <div className="mt-5 space-y-3">
            {FAQ.map((item, index) => (
              <details key={item.q} className="group rounded-2xl border border-slate-800 bg-slate-950/45 p-5" open={index === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
                  {item.q}
                  <ArrowLeft className="h-4 w-4 shrink-0 text-cyan-300 transition-transform group-open:-rotate-90" aria-hidden="true" />
                </summary>
                <p className="mt-4 border-t border-slate-800 pt-4 text-sm leading-7 text-slate-300">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-slate-950/90 to-slate-950 p-6 sm:p-8" aria-labelledby="charging-next-step">
          <h2 id="charging-next-step" className="text-2xl font-black text-white sm:text-3xl">لا تبدّل القطع على التخمين</h2>
          <p className="mt-3 max-w-3xl leading-8 text-slate-300">أرسل موديل اللابتوب وصورة واضحة للشاحن والمنفذ وأي رسالة تظهر. نفحص الجهاز في مختبر KCROC بحولي، ونوضح لك العطل وخيارات الإصلاح والسعر قبل بدء العمل المدفوع.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 py-3 font-black text-slate-950 transition hover:bg-cyan-300">
              <MessageCircle className="h-5 w-5" aria-hidden="true" /> أرسل تفاصيل العطل على واتساب
            </a>
            <Link to="/ar/laptop-charging-port-repair-kuwait" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-700 px-6 py-3 font-bold text-cyan-200 hover:border-cyan-500/40">خدمة إصلاح مدخل الشحن <ArrowLeft className="h-4 w-4" aria-hidden="true" /></Link>
            <Link to="/ar/battery-replacement-kuwait" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-700 px-6 py-3 font-bold text-cyan-200 hover:border-cyan-500/40">فحص وتبديل البطارية <ArrowLeft className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </section>
      </div>
    </div>
  );
}
