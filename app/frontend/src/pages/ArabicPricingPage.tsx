import React from 'react';
import { Link } from 'react-router-dom';
import {
  BadgeCheck, CheckCircle2, Clock3, MessageCircle, ShieldCheck,
  Truck, ClipboardCheck, Wrench, Phone, CircleHelp,
} from 'lucide-react';
import { SEOEngine } from '../core/components/SEOEngine';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import { KCROC_GRAPH } from '../data/graph';
import { buildWhatsAppLink } from '../utils/whatsappIntent';

const PRICE_GROUPS = [
  {
    title: 'الفحص والبرامج',
    subtitle: 'ابدأ بتحديد المشكلة قبل دفع تكلفة الإصلاح',
    items: [
      { name: 'الفحص والتشخيص الأولي', price: 'مجاني', note: 'تقييم أولي بدون التزام بالإصلاح' },
      { name: 'إعادة تثبيت Windows وضبط النظام', price: '10–15 د.ك', note: 'حسب حالة النظام والتعريفات المطلوبة' },
      { name: 'إزالة الفيروسات والبرامج الضارة', price: '10–20 د.ك', note: 'قد تختلف حسب شدة الإصابة' },
      { name: 'استعادة BIOS أو Firmware', price: '20–40 د.ك', note: 'يعتمد على نوع الجهاز وطريقة الاستعادة' },
    ],
  },
  {
    title: 'التبريد وتحسين الأداء',
    subtitle: 'للتعامل مع الحرارة والغبار وبطء الأداء',
    items: [
      { name: 'تنظيف اللابتوب وخدمة التبريد', price: '15–20 د.ك', note: 'تنظيف داخلي وخدمة المعجون الحراري' },
      { name: 'خدمة تبريد Gaming PC', price: '20–30 د.ك', note: 'حسب نظام التبريد وتجهيزه' },
      { name: 'ضبط أداء Gaming PC', price: '20–40 د.ك', note: 'فحص وضبط الإعدادات والأداء' },
      { name: 'تركيب RAM أو SSD', price: '5–10 د.ك', note: 'أجرة تركيب؛ القطعة ونقل البيانات بشكل منفصل عند الحاجة' },
    ],
  },
  {
    title: 'تبديل القطع والإصلاحات الميكانيكية',
    subtitle: 'السعر يتأثر بموديل الجهاز وتوفر القطعة',
    items: [
      { name: 'تبديل بطارية اللابتوب', price: '8–15 د.ك + القطعة', note: 'يتم التأكد من توافق البطارية مع الموديل' },
      { name: 'تبديل كيبورد اللابتوب', price: '10–20 د.ك + القطعة', note: 'قد يختلف العمل حسب تصميم الكيبورد' },
      { name: 'تبديل شاشة اللابتوب', price: 'يبدأ من 30 د.ك + القطعة', note: 'نوع الشاشة ومقاسها ومعدل التحديث تؤثر في التكلفة' },
      { name: 'إصلاح المفصلات والهيكل', price: '15–30 د.ك', note: 'حسب مستوى الكسر وطريقة إعادة التثبيت' },
    ],
  },
  {
    title: 'إصلاح اللوحة الأم والأعطال المتقدمة',
    subtitle: 'تشخيص على مستوى المكونات بدل التخمين',
    items: [
      { name: 'إصلاح منفذ الشحن', price: '20–35 د.ك', note: 'حسب نوع المنفذ والعطل في مسار الطاقة' },
      { name: 'إصلاح مكونات اللوحة الأم', price: '25–60 د.ك', note: 'مثل دوائر الطاقة وMOSFET وبعض الشرائح' },
      { name: 'إصلاح متقدم للوحة الأم', price: '50–90+ د.ك', note: 'أعطال معقدة وعمليات إعادة عمل متقدمة' },
      { name: 'إصلاح أضرار السوائل', price: '35–90+ د.ك', note: 'يتحدد السعر حسب التآكل والدوائر المتضررة' },
      { name: 'إصلاح لوحة MacBook', price: '45–100+ د.ك', note: 'حسب الموديل والعطل وقابلية إصلاح اللوحة' },
    ],
  },
] as const;

const FAQS = [
  {
    q: 'هل الفحص الأولي مجاني؟',
    a: 'نعم، الفحص والتقييم الأولي مجانيان وبدون التزام بالموافقة على الإصلاح. بعد تحديد المشكلة نشرح لك السعر والخطوة المناسبة قبل بدء أي عمل مدفوع.',
  },
  {
    q: 'هل السعر النهائي هو نفسه المذكور في الجدول؟',
    a: 'الأسعار المعروضة هي أسعار بداية أو نطاقات للخدمة. السعر النهائي يعتمد على موديل الجهاز والعطل والقطعة المطلوبة وتوفرها. نعطيك عرض سعر واضحًا قبل بدء الإصلاح.',
  },
  {
    q: 'هل أسعار الشاشة والبطارية تشمل القطعة؟',
    a: 'عندما يظهر بجانب السعر «+ القطعة»، فالسعر المعروض للخدمة أو أجرة العمل ولا يشمل تكلفة القطعة. نتحقق من رقم الموديل والتوافق ثم نوضح إجمالي السعر قبل الطلب أو التركيب.',
  },
  {
    q: 'هل توفرون استلامًا وتوصيلًا من كل مناطق الكويت؟',
    a: 'نعم، نوفر استلامًا وتوصيلًا مجانيين من مناطق الكويت. أرسل منطقتك على واتساب لتأكيد موعد الاستلام. المختبر الفعلي موجود في حولي، ومناطق الخدمة ليست فروعًا مستقلة.',
  },
  {
    q: 'كم يستغرق الإصلاح؟',
    a: 'تنجز بعض الإصلاحات الشائعة خلال يوم إلى يومين إذا كانت القطع متوفرة، وقد تحتاج أعطال اللوحة الأم والقطع التي تتطلب طلبًا إلى وقت أطول. نعطيك تقديرًا بعد الفحص.',
  },
  {
    q: 'هل أوافق على الإصلاح قبل أن تبدأوا؟',
    a: 'نعم. نشرح العطل والتكلفة المتوقعة أولًا، ولا يبدأ العمل المدفوع إلا بعد موافقتك على عرض السعر.',
  },
] as const;

const canonicalUrl = 'https://www.computerrepairkuwait.com/ar/pricing';
const business = KCROC_GRAPH.business!;
const waQuote = buildWhatsAppLink('السلام عليكم KCROC، أريد معرفة سعر تصليح جهازي. نوع الجهاز والموديل والعطل: ');
const waPickup = buildWhatsAppLink('السلام عليكم KCROC، أريد ترتيب استلام مجاني من الكويت. المنطقة ونوع الجهاز والعطل: ');

const schema = {
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      '@id': `${canonicalUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: `${business.websiteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'أسعار التصليح', item: canonicalUrl },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${canonicalUrl}#faq`,
      mainEntity: FAQS.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  ],
};

export default function ArabicPricingPage() {
  return (
    <div dir="rtl" lang="ar-KW" className="min-h-screen bg-transparent text-slate-100">
      <SEOEngine entityId="page-ar-pricing" />
      <SchemaMarkup schema={schema} />

      <section className="relative overflow-hidden border-b border-slate-800 px-4 pb-12 pt-7 sm:px-6 sm:pb-16 sm:pt-10">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_35%_0%,rgba(6,182,212,0.13),transparent_45%)]" />
        <div className="relative mx-auto max-w-6xl">
          <nav aria-label="مسار التنقل" className="mb-7 text-sm text-slate-500">
            <Link to="/" className="hover:text-cyan-300">الرئيسية</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span aria-current="page" className="text-slate-300">أسعار التصليح</span>
          </nav>

          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-12">
            <div className="max-w-4xl">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-4 py-2 text-xs font-black text-cyan-300 sm:text-sm">
                <BadgeCheck className="h-4 w-4" aria-hidden="true" /> أسعار واضحة قبل الإصلاح
              </p>
              <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                أسعار تصليح الكمبيوتر واللابتوب في الكويت
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                شوف أسعار البداية للخدمات الشائعة لدى KCROC. نفحص العطل أولًا، ونوضح لك التكلفة قبل بدء أي عمل مدفوع. إذا كانت القطعة مطلوبة، نتحقق من توافقها مع موديل جهازك ونوضح سعرها بشكل منفصل عندما ينطبق ذلك.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={waQuote} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-black text-slate-950 transition hover:bg-cyan-400">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" /> اسأل عن سعر جهازك
                </a>
                <Link to="/book" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/60 px-6 py-3 font-bold text-white transition hover:border-cyan-500/50 hover:text-cyan-200">
                  <Truck className="h-5 w-5" aria-hidden="true" /> احجز استلامًا مجانيًا
                </Link>
              </div>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-slate-300 sm:text-sm">
                {['فحص أولي مجاني', 'عرض السعر قبل الإصلاح', 'استلام وتوصيل مجاني', 'ضمان 30 يومًا على الإصلاحات المكتملة'].map((label) => (
                  <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900/60 px-3 py-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" aria-hidden="true" /> {label}
                  </span>
                ))}
              </div>
            </div>
            <aside className="rounded-2xl border border-slate-800 bg-slate-900/65 p-5 shadow-xl sm:p-6 lg:w-72">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300"><ShieldCheck className="h-6 w-6" aria-hidden="true" /></div>
                <div>
                  <h2 className="font-black text-white">قبل ما تدفع</h2>
                  <p className="mt-1 text-xs text-slate-400">التشخيص أولًا، والقرار لك</p>
                </div>
              </div>
              <ol className="mt-5 space-y-4">
                {[
                  ['١', 'أرسل الموديل والعطل'],
                  ['٢', 'نفحص ونحدد السبب'],
                  ['٣', 'نرسل لك عرض السعر'],
                  ['٤', 'نبدأ بعد موافقتك'],
                ].map(([number, title]) => (
                  <li key={number} className="flex items-center gap-3 text-sm font-semibold text-slate-200">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cyan-500/30 text-xs font-black text-cyan-300">{number}</span>{title}
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16" aria-labelledby="arabic-pricing-list">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-black uppercase tracking-widest text-cyan-400">قائمة الأسعار</p>
            <h2 id="arabic-pricing-list" className="mt-2 text-2xl font-black text-white sm:text-4xl">كم يكلف تصليح جهازك؟</h2>
            <p className="mt-3 leading-7 text-slate-400">هذه أسعار بداية أو نطاقات الخدمة، وليست بديلًا عن عرض السعر الخاص بموديلك. انتبه لعبارة «+ القطعة» عندما تكون تكلفة القطعة منفصلة عن أجرة الخدمة.</p>
          </div>

          <div className="grid items-start gap-5 lg:grid-cols-2">
            {PRICE_GROUPS.map((group) => (
              <section key={group.title} className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/45">
                <div className="border-b border-slate-800 bg-slate-900/70 p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-300"><Wrench className="h-5 w-5" aria-hidden="true" /></div>
                    <div>
                      <h3 className="text-lg font-black text-white sm:text-xl">{group.title}</h3>
                      <p className="mt-1 text-sm text-slate-400">{group.subtitle}</p>
                    </div>
                  </div>
                </div>
                <ul className="divide-y divide-slate-800/80">
                  {group.items.map((item) => (
                    <li key={item.name} className="p-5 sm:p-6">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                        <h4 className="font-bold leading-6 text-slate-100">{item.name}</h4>
                        <p className="shrink-0 text-base font-black text-cyan-300 sm:text-left">{item.price}</p>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{item.note}</p>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 sm:p-5">
            <CircleHelp className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" aria-hidden="true" />
            <p className="text-sm leading-7 text-slate-300">إذا ما لقيت العطل أو نوع جهازك في القائمة، راسلنا بالموديل وصورة العطل إن أمكن. نوضح لك الخطوة التالية والتكلفة المتوقعة قبل أي إصلاح مدفوع.</p>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-800 bg-slate-900/30 px-4 py-12 sm:px-6 sm:py-16" aria-labelledby="arabic-pricing-trust">
        <div className="mx-auto max-w-6xl">
          <h2 id="arabic-pricing-trust" className="text-2xl font-black text-white sm:text-3xl">ليش تختار KCROC؟</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: ClipboardCheck, title: 'عرض سعر واضح', desc: 'تعرف التكلفة وتوافق عليها قبل بدء العمل المدفوع.' },
              { icon: Wrench, title: 'تشخيص على مستوى المكونات', desc: 'نفحص سبب العطل ونقيّم إمكانية إصلاح المكوّن بدل تبديل اللوحة كاملة متى كان ذلك ممكنًا.' },
              { icon: Truck, title: 'خدمة استلام من منطقتك', desc: 'نرتب استلام الجهاز وإعادته بعد الإصلاح والاختبار، من دون الحاجة لزيارة المختبر أولًا.' },
              { icon: Clock3, title: 'تقدير واقعي للوقت', desc: 'نوضح المدة المتوقعة بعد معرفة نوع العطل وتوفر القطع.' },
            ].map((item) => {
              const Icon = item.icon;
              return <article key={item.title} className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5"><Icon className="h-6 w-6 text-cyan-300" aria-hidden="true" /><h3 className="mt-4 font-black text-white">{item.title}</h3><p className="mt-2 text-sm leading-7 text-slate-400">{item.desc}</p></article>;
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16" aria-labelledby="arabic-pricing-faq">
        <div className="mx-auto max-w-4xl">
          <h2 id="arabic-pricing-faq" className="text-2xl font-black text-white sm:text-3xl">أسئلة شائعة عن أسعار التصليح</h2>
          <div className="mt-6 divide-y divide-slate-800 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/45">
            {FAQS.map((item) => <details key={item.q} className="p-5 sm:p-6"><summary className="cursor-pointer font-bold leading-7 text-white marker:text-cyan-400">{item.q}</summary><p className="mt-3 text-sm leading-7 text-slate-400">{item.a}</p></details>)}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 sm:pb-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 rounded-3xl border border-cyan-500/20 bg-gradient-to-l from-cyan-500/10 to-slate-900/70 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-9">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-black text-white sm:text-3xl">تبي تعرف سعر جهازك بالتحديد؟</h2>
            <p className="mt-3 leading-7 text-slate-300">أرسل نوع الجهاز والموديل والعطل. نبدأ بالتشخيص ونوضح لك السعر قبل ما نبدأ الإصلاح.</p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <Link to="/ar/computer-repair-kuwait" className="font-bold text-cyan-300 hover:text-cyan-200">تصليح الكمبيوتر في الكويت</Link>
              <Link to="/ar/laptop-repair-kuwait" className="font-bold text-cyan-300 hover:text-cyan-200">تصليح اللابتوب</Link>
              <Link to="/ar/near-me" className="font-bold text-cyan-300 hover:text-cyan-200">فني كمبيوتر بالقرب مني</Link>
              <Link to="/pricing" className="font-bold text-cyan-300 hover:text-cyan-200">English pricing</Link>
            </div>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:min-w-56">
            <a href={waQuote} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-black text-slate-950 hover:bg-cyan-400"><MessageCircle className="h-5 w-5" aria-hidden="true" /> اسأل عن السعر</a>
            <a href={waPickup} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-700 px-5 py-3 font-bold text-white hover:border-cyan-500/50"><Truck className="h-5 w-5" aria-hidden="true" /> رتب الاستلام</a>
            <a href={`tel:+${business.telephone}`} className="inline-flex min-h-11 items-center justify-center gap-2 text-sm font-semibold text-slate-300 hover:text-white"><Phone className="h-4 w-4" aria-hidden="true" /> اتصل بـ KCROC</a>
          </div>
        </div>
      </section>
    </div>
  );
}
