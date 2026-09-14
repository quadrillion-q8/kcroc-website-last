// File: app/frontend/src/pages/GamingLaptopCleaningAR.tsx
// Arabic/Kuwaiti-Arabic counterpart of:
// /blog/how-often-clean-laptop-replace-thermal-paste-kuwait

import React, { useEffect } from 'react';
import { Head } from 'vite-react-ssg';
import { Link } from 'react-router-dom';
import {
  AlertTriangle, ChevronDown, Clock3, MessageCircle,
  ShieldCheck, Thermometer, Wrench
} from 'lucide-react';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import { KCROC_GRAPH } from '../data/graph';

const business = KCROC_GRAPH.business!;
const PAGE_URL = `${business.websiteUrl}/blog/ar/how-often-clean-laptop-replace-thermal-paste-kuwait`;
const EN_PAGE_URL = `${business.websiteUrl}/blog/how-often-clean-laptop-replace-thermal-paste-kuwait`;
const HERO_IMAGE_URL = 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_1200/v1781139061/2026-01-22_9_qfanpt.jpg';
const COOLING_IMAGE_URL = `${business.websiteUrl}/images/blog/gaming-pc-thermal-throttling-kuwait.webp`;
const AUTHOR_IMAGE_URL = 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto:good,w_800,c_limit/KCROC-Owner-Image_zpdyg4';
const PUBLISHED_DATE = '2026-09-14T09:00:00+03:00';

const WA_LINK = `https://wa.me/${business.telephone}?text=${encodeURIComponent(
  'مرحباً KCROC، قريت مقال تنظيف لابتوب القيمنق والمعجون الحراري وأبي أفحص حرارة جهازي.'
)}`;

const faqs = [
  {
    q: 'كل كم لازم أنظف لابتوب القيمنق في الكويت؟',
    a: 'افحص فتحات التهوية وسلوك المراوح والحرارة بشكل شهري. ولأجهزة القيمنق المستخدمة يومياً أو في بيئة فيها غبار، تنظيف داخلي كل 6–12 شهر يعتبر نقطة بداية عملية، لكن إذا ارتفعت الحرارة أو زاد صوت المروحة أو نزل الأداء، افحص الجهاز قبل هذا الموعد.'
  },
  {
    q: 'كل كم أغيّر المعجون الحراري للابتوب القيمنق؟',
    a: 'مو على جدول سنوي ثابت. تغيير المعجون يعتمد على حالة الجهاز والتبريد والحرارة وسجل الصيانة. لبعض الأجهزة المستخدمة بقوة، تقييم المعجون بعد حوالي 2–3 سنوات ممكن يكون منطقي، لكن الأعراض والفحص أهم من عمر الجهاز.'
  },
  {
    q: 'هل تنظيف الغبار يحل حرارة اللابتوب العالية؟',
    a: 'إذا السبب هو انسداد مسار الهواء بالغبار، نعم ممكن يفرق بشكل واضح. لكن إذا بقيت الحرارة مرتفعة بعد تنظيف مسار التبريد، لازم ينفحص المروحة، تماس المشتت، المعجون الحراري، والدوائر أو الإعدادات المرتبطة بالطاقة.'
  },
  {
    q: 'هل لازم أغيّر المعجون كل سنة بسبب حرارة الكويت؟',
    a: 'لا. حرارة الكويت تخلي متابعة التبريد مهمة، لكنها ما تعني أن كل لابتوب يحتاج repaste سنوي. الجهاز السليم ينفحص حسب الحرارة والأداء وصوت المروحة وحالة نظام التبريد.'
  },
  {
    q: 'شلون أعرف إذا التقطيع في الألعاب سببه الحرارة؟',
    a: 'لاحظ النمط: اللعبة تكون طبيعية أول فترة، وبعد ما يسخن الجهاز تبدأ الـFPS أو سرعات المعالج تنخفض. الأفضل تأكيد السبب بقراءات الحرارة وسرعة المعالج أو كرت الشاشة، لأن مشاكل الإنترنت والإعدادات والتعريفات ممكن تعطي أعراض مشابهة.'
  },
  {
    q: 'أقدر أغيّر المعجون الحراري بنفسي؟',
    a: 'بعض الأجهزة قابلة للصيانة، لكن لابتوبات القيمنق ممكن تحتوي على كيابل دقيقة، thermal pads، مشتتات مدمجة أو خطوات فك وتركيب خاصة بالموديل. بدون أدوات وإجراء مناسب للموديل، الصيانة الاحترافية أكثر أماناً.'
  },
  {
    q: 'شنو أهم: تنظيف المراوح أو تغيير المعجون؟',
    a: 'كل واحد يحل مشكلة مختلفة. تنظيف الغبار يرجع تدفق الهواء، وتغيير المعجون يرجع جودة التلامس الحراري بين الشريحة والمشتت. إذا المشتت مسدود بالغبار، تغيير المعجون وحده ما يحل المشكلة.'
  },
  {
    q: 'هل cooling pad يغني عن التنظيف الداخلي؟',
    a: 'لا. قاعدة التبريد ممكن تساعد في تدفق الهواء حول الجهاز، لكنها ما تشيل الغبار من المراوح والـheatsink ولا تصلح ضعف التلامس الحراري. هي إضافة، مو بديل للصيانة الداخلية.'
  }
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': `${PAGE_URL}#article`,
      headline: 'كل كم لازم تنظف لابتوب القيمنق وتغيّر المعجون الحراري في الكويت؟',
      description: 'دليل عملي باللهجة الكويتية عن تنظيف لابتوب القيمنق وتغيير المعجون الحراري، وتأثير حرارة وغبار الكويت على التبريد.',
      image: [HERO_IMAGE_URL, COOLING_IMAGE_URL],
      author: {
        '@type': 'Person',
        name: 'Imran Natiq',
        url: `${business.websiteUrl}/author/imran`,
        jobTitle: 'Hardware Repair Engineer'
      },
      publisher: {
        '@type': 'Organization',
        name: business.legalName,
        url: business.websiteUrl,
        logo: { '@type': 'ImageObject', url: business.logoUrl }
      },
      datePublished: PUBLISHED_DATE,
      dateModified: PUBLISHED_DATE,
      mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
      url: PAGE_URL,
      inLanguage: 'ar-KW',
      articleSection: 'صيانة لابتوبات القيمنق',
      keywords: [
        'تنظيف لابتوب قيمنق الكويت', 'تغيير المعجون الحراري', 'تبريد اللابتوب',
        'حرارة اللابتوب', 'لابتوب قيمنق الكويت', 'thermal paste الكويت',
        'تنظيف مروحة اللابتوب', 'thermal throttling'
      ]
    },
    {
      '@type': 'FAQPage',
      '@id': `${PAGE_URL}#faq`,
      mainEntity: faqs.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a }
      }))
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: business.websiteUrl },
        { '@type': 'ListItem', position: 2, name: 'المدونة', item: `${business.websiteUrl}/blog` },
        { '@type': 'ListItem', position: 3, name: 'تنظيف لابتوب القيمنق والمعجون الحراري', item: PAGE_URL }
      ]
    }
  ]
};

const SectionTitle = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={id} className="scroll-mt-28 text-2xl md:text-3xl font-black text-white mt-14 mb-5">
    {children}
  </h2>
);

const FAQItem = ({ q, a }: { q: string; a: string }) => (
  <details className="group border border-slate-800 rounded-2xl bg-slate-900/40 open:border-cyan-500/40 transition-colors">
    <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none font-bold text-white">
      <span>{q}</span>
      <ChevronDown className="w-4 h-4 text-cyan-400 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
    </summary>
    <div className="px-5 pb-5 text-slate-400 leading-relaxed">{a}</div>
  </details>
);

export default function GamingLaptopCleaningAR() {
  useEffect(() => {
    const html = document.documentElement;
    const oldLang = html.getAttribute('lang');
    const oldDir = html.getAttribute('dir');
    html.setAttribute('lang', 'ar-KW');
    html.setAttribute('dir', 'rtl');
    return () => {
      if (oldLang) html.setAttribute('lang', oldLang); else html.removeAttribute('lang');
      if (oldDir) html.setAttribute('dir', oldDir); else html.removeAttribute('dir');
    };
  }, []);

  return (
    <main dir="rtl" lang="ar-KW" className="w-full min-h-screen bg-transparent text-slate-200 pt-8 sm:pt-16 lg:pt-32 pb-8 sm:pb-16 lg:pb-24">
      <Head>
        <title>تنظيف لابتوب القيمنق وتغيير المعجون الحراري في الكويت | KCROC</title>
        <meta name="description" content="كل كم لازم تنظف لابتوب القيمنق في الكويت؟ تعرف على جدول تنظيف الغبار، متى تغيّر المعجون الحراري، وعلامات ارتفاع الحرارة والـthermal throttling." />
        <link rel="canonical" href={PAGE_URL} />
        <link rel="alternate" hrefLang="en-KW" href={EN_PAGE_URL} />
        <link rel="alternate" hrefLang="ar-KW" href={PAGE_URL} />
        <link rel="alternate" hrefLang="x-default" href={EN_PAGE_URL} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="ar_KW" />
        <meta property="og:title" content="كل كم لازم تنظف لابتوب القيمنق وتغيّر المعجون الحراري في الكويت؟" />
        <meta property="og:description" content="دليل عملي باللهجة الكويتية عن تنظيف لابتوب القيمنق وتغيير المعجون الحراري وتأثير حرارة وغبار الكويت على التبريد." />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:image" content={HERO_IMAGE_URL} />
      </Head>

      <SchemaMarkup schema={SCHEMA} />

      <article className="max-w-5xl mx-auto px-4 sm:px-6">
        <nav className="text-sm text-slate-500 mb-8 flex flex-wrap items-center gap-2" aria-label="مسار التنقل">
          <Link to="/" className="hover:text-cyan-400">الرئيسية</Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-cyan-400">المدونة</Link>
          <span>/</span>
          <span className="text-slate-400">صيانة لابتوب القيمنق</span>
        </nav>

        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400 mb-5">
            <span className="inline-flex items-center gap-2 text-cyan-400 font-bold">صيانة لابتوب القيمنق</span>
            <span>14 سبتمبر 2026</span>
            <span className="inline-flex items-center gap-1"><Clock3 size={15} /> 12 دقيقة</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight mb-7">
            كل كم لازم تنظف لابتوب القيمنق وتغيّر المعجون الحراري في الكويت؟
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed border-r-4 border-cyan-500 pr-6">
            لابتوبات القيمنق تنتج حرارة عالية لفترات طويلة وتسحب كمية كبيرة من الهواء داخل نظام تبريد صغير. هني تعرف شلون تنظف جهازك في الكويت، ومتى فعلاً يحتاج تغيير المعجون الحراري، وشلون تلاحظ الـthermal throttling قبل ما يأثر على الأداء.
          </p>
        </header>

        <aside className="mb-12 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <img src={AUTHOR_IMAGE_URL} alt="عمران ناطق — مهندس صيانة هاردوير في KCROC" className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border border-slate-800 shrink-0" loading="lazy" decoding="async" />
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-wider text-cyan-400 mb-1">كتبه وراجعه فنياً</p>
              <Link to="/author/imran" className="text-lg font-bold text-white hover:text-cyan-400">Imran Natiq</Link>
              <p className="text-sm text-slate-400 mt-1 leading-relaxed">Hardware Repair Engineer في KCROC، متخصص في تشخيص حرارة اللابتوبات وفحص الهاردوير والإصلاح على مستوى المكونات في الكويت.</p>
              <p className="text-xs text-slate-500 mt-2">مراجعة فنية: 1 سبتمبر 2026 · حولي، الكويت</p>
            </div>
          </div>
        </aside>

        <div className="mb-10 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
          <div className="flex items-start gap-3">
            <Thermometer className="w-6 h-6 text-cyan-400 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-black text-white mb-1">الخلاصة من KCROC</p>
              <p className="text-slate-300 leading-relaxed">لا تعتمد على التقويم وحده. افحص سلوك الحرارة والمراوح وتدفق الهواء. كقاعدة بداية، كثير من أجهزة القيمنق المستخدمة بقوة في الكويت تستفيد من فحص أو تنظيف داخلي كل 6–12 شهر، بينما تغيير المعجون يكون حسب الحالة، وليس تلقائياً كل سنة.</p>
            </div>
          </div>
        </div>

        <div className="prose prose-invert prose-lg max-w-none prose-p:text-slate-300 prose-headings:text-white prose-a:text-cyan-400">
          <SectionTitle id="short-answer">أول شيء: كل كم أنظف لابتوب القيمنق؟</SectionTitle>
          <p>ما في مدة واحدة تناسب كل الأجهزة. لابتوب استخدامه خفيف وفي غرفة نظيفة ممكن يحتاج صيانة أقل من جهاز قيمنق يشتغل يومياً وفي بيئة فيها غبار. في الكويت، نقطة بداية عملية هي فحص فتحات التهوية وسلوك التبريد شهرياً، والنظر في تنظيف داخلي كل 6–12 شهر للأجهزة الثقيلة أو المعرضة للغبار.</p>
          <div className="overflow-x-auto not-prose my-8">
            <table className="w-full text-sm border-collapse overflow-hidden rounded-2xl">
              <thead><tr className="bg-slate-900 text-white"><th className="p-4 text-right border border-slate-800">الجزء</th><th className="p-4 text-right border border-slate-800">نقطة البداية</th><th className="p-4 text-right border border-slate-800">افحص قبل الموعد إذا...</th></tr></thead>
              <tbody>
                <tr><td className="p-4 border border-slate-800">الشاشة والكيبورد والخارج</td><td className="p-4 border border-slate-800">كل كم أسبوع إلى عدة أشهر</td><td className="p-4 border border-slate-800">في غبار أو أوساخ أو فتحات مسدودة</td></tr>
                <tr><td className="p-4 border border-slate-800">فتحات السحب والطرد</td><td className="p-4 border border-slate-800">فحص شهري</td><td className="p-4 border border-slate-800">الهواء ضعيف أو صوت المروحة زاد</td></tr>
                <tr><td className="p-4 border border-slate-800">المراوح والـheatsink الداخلي</td><td className="p-4 border border-slate-800">حوالي كل 6–12 شهر للأجهزة الثقيلة أو المغبرة</td><td className="p-4 border border-slate-800">الحرارة ارتفعت أو الغبار متراكم</td></tr>
                <tr><td className="p-4 border border-slate-800">المعجون الحراري</td><td className="p-4 border border-slate-800">حسب الحالة؛ تقييم بعد 2–3 سنوات لبعض الأجهزة الثقيلة</td><td className="p-4 border border-slate-800">حرارة مستمرة، throttling أو فك المشتت</td></tr>
              </tbody>
            </table>
          </div>

          <div className="my-8 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6 not-prose">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0" />
              <div><h3 className="text-white font-black text-lg mb-2">الجدول مو تشخيص</h3><p className="text-slate-300 leading-relaxed">أرقام 6–12 شهر و2–3 سنوات هي نقاط بداية عملية، مو قوانين ثابتة. تصميم التبريد، نوع المعجون والـthermal pads، الاستخدام، والغرفة كلها تفرق.</p></div>
            </div>
          </div>

          <SectionTitle id="gaming-care">ليش لابتوب القيمنق يحتاج اهتمام أكثر؟</SectionTitle>
          <p>المعالج وكرت الشاشة في جهاز القيمنق ممكن يشتغلون على حمل عالي لفترات طويلة. هالشي يخلي نظام التبريد يعتمد على حركة هواء مستمرة عبر المراوح والـheat pipes والـheatsink أو vapor chamber. إذا تراكم الغبار، أو صار التلامس الحراري أسوأ، تبدأ المراوح تصير أعلى صوتاً والحرارة ترتفع والأداء ممكن ينزل.</p>
          <ul><li>جلسات القيمنق الطويلة تخلي CPU وGPU تحت حمل حراري مستمر.</li><li>الغبار بين زعانف الـheatsink يقلل قدرة الهواء على المرور.</li><li>السطح الناعم مثل السرير أو المخدة ممكن يخنق فتحات السحب.</li><li>الـthermal throttling يخفض سرعة المعالج أو كرت الشاشة لحماية الجهاز من الحرارة.</li><li>بعض الأجهزة تستخدم thermal pads أو حلول تبريد خاصة بالموديل، لذلك الفك والتركيب مو واحد لكل الأجهزة.</li></ul>

          <SectionTitle id="kuwait-heat-dust">شنو تأثير حرارة وغبار الكويت؟</SectionTitle>
          <p>اللابتوب يطرد الحرارة إلى الهواء المحيط، لذلك كل ما ارتفعت حرارة الغرفة تقل المساحة المتاحة لنظام التبريد. والغبار مشكلة ثانية مستقلة: ممكن يتجمع حول فتحات السحب، شفرات المراوح وزعانف الـheatsink. المكيف يخلي الجو أريح، لكنه ما يمنع الغبار من دخول الجهاز.</p>
          <p>الأهم مو قراءة حرارة واحدة. قارن الجهاز بنفس اللعبة ونفس الإعدادات ونفس الظروف قدر الإمكان. إذا كان الجهاز سابقاً مستقر وصار بعد فترة يسخن أكثر أو يرفع صوت المراوح أو ينزل الأداء، هذي إشارة أقوى من رقم منفرد.</p>

          <figure className="my-10 not-prose">
            <img src={COOLING_IMAGE_URL} alt="ارتفاع حرارة نظام تبريد لابتوب قيمنق في الكويت" className="w-full rounded-2xl border border-slate-800" loading="lazy" decoding="async" />
            <figcaption className="text-sm text-slate-500 mt-3">الحرارة المستمرة ممكن تظهر من خلال ارتفاع الحرارة، صوت المراوح ونزول الأداء أو الـthermal throttling.</figcaption>
          </figure>

          <SectionTitle id="thermal-paste">متى أغيّر المعجون الحراري؟</SectionTitle>
          <p>المعجون الحراري يحسن التلامس بين الشريحة والمشتت. مو مادة استهلاكية لازم تتغير كل سنة بشكل تلقائي. بعض الأجهزة تظل مستقرة حرارياً لسنوات، وأجهزة ثانية تحتاج تدخل أبكر بسبب الاستخدام الشديد، ضعف التلامس، مادة حرارية متدهورة، صيانة سابقة أو فك المشتت.</p>
          <ul><li>حرارة CPU أو GPU صارت أعلى بشكل مستمر مع نفس الحمل اللي كنت تستخدمه.</li><li>الأداء أو الـFPS ينزل بعد عدة دقائق بسبب thermal throttling.</li><li>المراوح تظل على سرعة عالية والجهاز يصير أحر من المعتاد.</li><li>تم تنظيف مسار التبريد الداخلي بشكل صحيح لكن المشكلة مستمرة.</li><li>تم فك الـheatsink أثناء إصلاح آخر، وإجراء الصيانة يتطلب مادة حرارية جديدة.</li><li>الفحص يبين ضعف في التلامس الحراري أو تطبيق سابق غير صحيح.</li></ul>

          <div className="my-8 rounded-2xl border border-red-500/30 bg-red-500/5 p-6 not-prose">
            <div className="flex items-start gap-3"><ShieldCheck className="w-6 h-6 text-red-400 shrink-0" /><div><h3 className="text-white font-black text-lg mb-2">لا تغيّر المعجون بشكل عشوائي</h3><p className="text-slate-300 leading-relaxed">اختيار مادة غير مناسبة، كمية غلط، تحريك الـthermal pads، ضغط غير متساوي أو تركيب مشتت بشكل غير صحيح ممكن يخلي الجهاز أسوأ. الإجراء الصحيح للموديل أهم من عمر الجهاز.</p></div></div>
          </div>

          <SectionTitle id="clean-vs-repaste">تنظيف الغبار وتغيير المعجون مو نفس الشغلة</SectionTitle>
          <div className="overflow-x-auto not-prose my-8">
            <table className="w-full text-sm border-collapse rounded-2xl overflow-hidden">
              <thead><tr className="bg-slate-900 text-white"><th className="p-4 text-right border border-slate-800">تنظيف داخلي</th><th className="p-4 text-right border border-slate-800">تغيير المعجون</th></tr></thead>
              <tbody>
                <tr><td className="p-4 border border-slate-800">يرجع تدفق الهواء عبر المراوح والـheatsink</td><td className="p-4 border border-slate-800">يرجع جودة التلامس الحراري بين الشريحة والمشتت</td></tr>
                <tr><td className="p-4 border border-slate-800">يناسب الغبار وضعف airflow وزيادة صوت المروحة</td><td className="p-4 border border-slate-800">يناسب ضعف التلامس أو ارتفاع الحرارة بعد التأكد من airflow</td></tr>
                <tr><td className="p-4 border border-slate-800">ما يصلح مروحة خربانة أو تماس حراري سيئ لوحده</td><td className="p-4 border border-slate-800">ما يشيل الغبار من مسار الهواء ولا يصلح مروحة خربانة</td></tr>
              </tbody>
            </table>
          </div>

          <SectionTitle id="thermal-throttling">شلون أعرف إذا الجهاز يسوي Thermal Throttling؟</SectionTitle>
          <p>الـthermal throttling رد فعل حماية: المعالج أو كرت الشاشة يقلل الأداء حتى يسيطر على الحرارة. مو نفس lag الإنترنت أو ضعف إعدادات اللعبة. دور على نمط يتكرر أثناء اللعب لفترة طويلة.</p>
          <ul><li>الـFPS يكون زين بالبداية وبعدها ينخفض.</li><li>سرعة CPU أو GPU تنزل مع اقتراب الحرارة من حدود الجهاز.</li><li>المراوح تصير عالية بشكل غير معتاد رغم أن الجهاز على سطح صلب ومفتوح.</li><li>منطقة الكيبورد أو مخرج الهواء تصير أحر من قبل مع نفس اللعبة.</li><li>الجهاز يبطئ في الجلسات الطويلة ويرجع طبيعي بعد ما يبرد.</li><li>يصير crash أو restart أو shutdown تحت الحمل العالي.</li></ul>

          <SectionTitle id="safe-maintenance">شلون تحافظ على جهازك بأمان؟</SectionTitle>
          <p>للتنظيف الخارجي، طفي الجهاز وافصل الشاحن واستخدم قطعة microfiber ناعمة. لا ترش سائل مباشرة على الجهاز، وخله على سطح صلب ومستوي ولا تسكر فتحات السحب والطرد بالفرشة أو المخدة.</p>
          <p>التنظيف الداخلي وتغيير المعجون يحتاجون إجراء مناسب للموديل. بعض أجهزة القيمنق فيها كيابل مراوح دقيقة، thermal pads، vapor chambers وترتيب مسامير معقد، والهواء المضغوط إذا استخدم بطريقة غلط ممكن يسرّع المروحة بشكل مؤذٍ أو يدفع الغبار أعمق.</p>
          <div className="my-8 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6 not-prose"><h3 className="text-white font-black text-lg mb-2">وقف إذا في علامة خطر</h3><p className="text-slate-300 leading-relaxed">إذا البطارية منتفخة، أو الجهاز تعرض لسائل، أو في ريحة احتراق، أو مشكلة في الشحن، أو المروحة فيها عطل ميكانيكي واضح، لا تتعامل معه كأنه مجرد تنظيف عادي. يحتاج فحص.</p></div>

          <SectionTitle id="routine">روتين عملي لصيانة لابتوب القيمنق في الكويت</SectionTitle>
          <ol>
            <li><strong>كل كم أسبوع:</strong> نظف الشاشة والكيبورد والخارج وتأكد أن فتحات الهواء مو مسكرة.</li>
            <li><strong>شهرياً:</strong> راقب صوت المراوح والحرارة والأداء، وقارن بنفس الألعاب والإعدادات إذا تقدر.</li>
            <li><strong>كل 6–12 شهر:</strong> للأجهزة اليومية أو الغرف المغبرة أو الاستخدام الثقيل، فكر في فحص وتنظيف داخلي، خصوصاً إذا ظهرت أعراض.</li>
            <li><strong>بعد حوالي 2–3 سنوات أو مع الأعراض:</strong> قيّم المعجون ونظام التبريد، ولا تغيّر المعجون إلا إذا الفحص يدعم ذلك.</li>
            <li><strong>كل مرة ينفك فيها الـheatsink:</strong> نظف المادة القديمة واستخدم المادة الصحيحة حسب إجراء الموديل.</li>
          </ol>

          <SectionTitle id="proper-service">شنو المفروض يشمل تنظيف وتبريد احترافي؟</SectionTitle>
          <p>الخدمة الزينة مو مجرد فتح الجهاز وفرد معجون. المفروض تبدأ بتحديد الموديل، فحص نظام التبريد والمراوح وتراكم الغبار، فهم أعراض الحرارة، حماية البطارية والكيابل، المحافظة على الـthermal pads، وبعدها اختبار الحرارة والأداء بعد التركيب متى ما كان مناسب.</p>
          <ul><li>فحص وفك آمن حسب الموديل.</li><li>فحص المراوح والـheatsink والـheat pipes أو vapor chamber.</li><li>إزالة الغبار من مسار التبريد الفعلي، مو بس من الفتحات الظاهرة.</li><li>تقييم المعجون والـthermal pads قبل استبدال أي شيء.</li><li>استخدام المادة الحرارية المناسبة وتركيب الـheatsink بشكل صحيح.</li><li>اختبار قبل/بعد للحرارة أو الحمل عند الحاجة.</li><li>شرح واضح: هل الجهاز يحتاج تنظيف، repaste، تبديل مروحة، أو إصلاح أكبر؟</li></ul>

          <div className="my-12 rounded-2xl border border-cyan-500/20 bg-slate-900/60 p-7 text-center not-prose">
            <Wrench className="w-8 h-8 text-cyan-400 mx-auto mb-3" aria-hidden="true" />
            <h3 className="text-2xl text-white font-black mb-3">تبي تفحص تبريد لابتوب القيمنق في الكويت؟</h3>
            <p className="text-slate-400 mb-6 max-w-2xl mx-auto">KCROC يوفر تنظيف وصيانة حرارية ودعم لإصلاح اللابتوبات، مع استلام وتسليم مجاني في الكويت. نقدر نفحص نظام التبريد أول، وبعدها نحدد إذا الجهاز يحتاج تنظيف غبار، تغيير معجون، صيانة مروحة أو إصلاح ثاني.</p>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 rounded-xl font-black"><MessageCircle size={18} /> تواصل واتساب</a>
          </div>

          <SectionTitle id="faq">الأسئلة الشائعة</SectionTitle>
          <div className="space-y-3 not-prose">{faqs.map(item => <FAQItem key={item.q} q={item.q} a={item.a} />)}</div>

          <div className="mt-12 pt-8 border-t border-slate-800 not-prose">
            <p className="text-sm text-slate-500 mb-2">المقال الإنجليزي:</p>
            <Link to="/blog/how-often-clean-laptop-replace-thermal-paste-kuwait" className="text-cyan-400 hover:text-cyan-300 font-bold">How Often Should You Clean Your Gaming Laptop and Replace Its Thermal Paste in Kuwait?</Link>
          </div>
        </div>
      </article>
    </main>
  );
}
