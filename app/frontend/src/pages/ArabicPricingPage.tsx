import React from 'react';
import { Link } from 'react-router-dom';
import {
  BadgeCheck, CheckCircle2, Clock3, MessageCircle, ShieldCheck,
  Truck, ClipboardCheck, Wrench, Phone, CircleHelp,
} from 'lucide-react';
import { SEOEngine } from '../core/components/SEOEngine';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import { KCROC_GRAPH } from '../data/graph';
import { IMAGES } from '../constants/images';
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


const PRICE_LINKS: Partial<Record<string, { href: string; label: string }>> = {
  'الفحص والتشخيص الأولي': { href: '/ar/computer-repair-kuwait', label: 'تفاصيل خدمة التصليح والفحص' },
  'إعادة تثبيت Windows وضبط النظام': { href: '/ar/computer-repair-kuwait', label: 'عرض خدمات الكمبيوتر' },
  'إزالة الفيروسات والبرامج الضارة': { href: '/ar/computer-repair-kuwait', label: 'عرض خدمات الكمبيوتر' },
  'استعادة BIOS أو Firmware': { href: '/ar/laptop-repair-kuwait', label: 'تفاصيل تصليح اللابتوب' },
  'تنظيف اللابتوب وخدمة التبريد': { href: '/ar/laptop-repair-kuwait', label: 'تفاصيل تصليح اللابتوب' },
  'خدمة تبريد Gaming PC': { href: '/ar/gaming-pc-repair-kuwait', label: 'تفاصيل تصليح Gaming PC' },
  'ضبط أداء Gaming PC': { href: '/ar/gaming-pc-repair-kuwait', label: 'تفاصيل تصليح Gaming PC' },
  'تركيب RAM أو SSD': { href: '/ar/ssd-ram-upgrade-kuwait', label: 'تفاصيل ترقية SSD وRAM' },
  'تبديل بطارية اللابتوب': { href: '/ar/battery-replacement-kuwait', label: 'تفاصيل تبديل البطارية' },
  'تبديل كيبورد اللابتوب': { href: '/ar/laptop-keyboard-replacement-kuwait', label: 'تفاصيل تبديل الكيبورد' },
  'تبديل شاشة اللابتوب': { href: '/ar/laptop-screen-repair-kuwait', label: 'تفاصيل تبديل الشاشة' },
  'إصلاح المفصلات والهيكل': { href: '/ar/laptop-repair-kuwait', label: 'تفاصيل تصليح اللابتوب' },
  'إصلاح منفذ الشحن': { href: '/ar/laptop-charging-port-repair-kuwait', label: 'تفاصيل إصلاح منفذ الشحن' },
  'إصلاح مكونات اللوحة الأم': { href: '/ar/motherboard-repair-kuwait', label: 'تفاصيل إصلاح اللوحة الأم' },
  'إصلاح متقدم للوحة الأم': { href: '/ar/motherboard-repair-kuwait', label: 'تفاصيل إصلاح اللوحة الأم' },
  'إصلاح أضرار السوائل': { href: '/ar/laptop-liquid-damage-repair-kuwait', label: 'تفاصيل إصلاح أضرار السوائل' },
  'إصلاح لوحة MacBook': { href: '/ar/macbook-repair-kuwait', label: 'تفاصيل تصليح MacBook' },
};

const PRICE_HIGHLIGHTS = [
  { label: 'الفحص الأولي', price: 'مجاني', note: 'تقييم أولي بدون التزام بالإصلاح', href: '/ar/computer-repair-kuwait' },
  { label: 'أجرة تبديل الشاشة', price: 'من 30 د.ك + الشاشة', note: 'سعر اللوحة يختلف حسب المواصفات والموديل', href: '/ar/laptop-screen-repair-kuwait' },
  { label: 'أجرة تبديل البطارية', price: 'من 8 د.ك + البطارية', note: 'نتحقق من رقم الموديل وتوافق القطعة', href: '/ar/battery-replacement-kuwait' },
  { label: 'تركيب SSD أو RAM', price: 'من 5 د.ك', note: 'القطع ونقل البيانات منفصلة عند الحاجة', href: '/ar/ssd-ram-upgrade-kuwait' },
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
  {
    q: 'هل سعر تبديل الشاشة يشمل الشاشة نفسها؟',
    a: 'لا، السعر الذي يظهر بصيغة «من 30 د.ك + الشاشة» هو أجرة العمل المبدئية، وتضاف تكلفة لوحة الشاشة المتوافقة. المقاس والدقة واللمس ومعدل التحديث ونوع اللوحة وتوفرها كلها عوامل تؤثر في السعر النهائي.',
  },
  {
    q: 'هل يوجد ضمان على الإصلاح؟',
    a: 'نعم، الإصلاحات المكتملة مشمولة بضمان لمدة 30 يومًا على العمل الذي تم تنفيذه، وفق شروط الإصلاح الموضحة عند التسليم. نوضح نطاق الضمان قبل الموافقة.',
  },
  {
    q: 'شنو المعلومات المطلوبة للحصول على سعر أدق؟',
    a: 'أرسل نوع الجهاز ورقم الموديل وصورة واضحة للعطل إن أمكن، واشرح متى بدأت المشكلة وهل تعرض الجهاز لسائل أو سقوط. اذكر منطقتك في الكويت إذا كنت تحتاج الاستلام والتوصيل.',
  },
  {
    q: 'هل أسعار MacBook مثل أسعار اللابتوبات العادية؟',
    a: 'ليس بالضرورة؛ تختلف قطع MacBook وطريقة تفكيكها ومستوى إصلاح اللوحة حسب الجيل والموديل والعطل. نعطيك تقديرًا أوليًا ثم نوضح السعر النهائي بعد التشخيص وتأكيد توفر القطعة عند الحاجة.',
  },
  {
    q: 'هل يمكن ضمان الإصلاح في نفس اليوم؟',
    a: 'لا يمكن تأكيد المدة قبل معرفة العطل وتوفر القطع وجدول الاستلام. بعض الإصلاحات البسيطة قد تنجز سريعًا، بينما قد تحتاج أعطال اللوحة الأم أو القطع الخاصة إلى وقت أطول.',
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
    {
      '@type': 'ItemList',
      '@id': canonicalUrl + '#price-highlights',
      name: 'أسعار بداية خدمات تصليح الكمبيوتر واللابتوب في الكويت',
      itemListElement: PRICE_HIGHLIGHTS.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        description: item.price + ' — ' + item.note,
        url: business.websiteUrl + item.href,
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
            <p className="mt-3 leading-7 text-slate-400">الأسعار بالدينار الكويتي، وهي أسعار بداية أو نطاقات إرشادية لخدمات KCROC وليست متوسط أسعار السوق. السعر الدقيق يعتمد على موديل الجهاز والعطل والقطعة المتوافقة. عبارة «+ القطعة» تعني أن أجرة العمل لا تشمل ثمن القطعة.</p>
          </div>

          <div className="mb-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {PRICE_HIGHLIGHTS.map((item) => (
              <Link key={item.href} to={item.href} className="group rounded-2xl border border-cyan-500/20 bg-slate-900/70 p-5 transition hover:border-cyan-400/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
                <span className="block text-sm font-bold text-slate-300">{item.label}</span>
                <span className="mt-2 block text-xl font-black text-cyan-300">{item.price}</span>
                <span className="mt-2 block text-xs leading-6 text-slate-400">{item.note}</span>
                <span className="mt-3 block text-xs font-bold text-white group-hover:text-cyan-200">تفاصيل الخدمة ←</span>
              </Link>
            ))}
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
                      {PRICE_LINKS[item.name] && (
                        <Link to={PRICE_LINKS[item.name]!.href} className="mt-3 inline-flex min-h-9 items-center text-sm font-bold text-cyan-300 underline-offset-4 hover:text-cyan-200 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
                          {PRICE_LINKS[item.name]!.label} ←
                        </Link>
                      )}
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


      <section className="border-y border-slate-800 bg-slate-900/30 px-4 py-12 sm:px-6 sm:py-16" aria-labelledby="arabic-pricing-visual-guide">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-black uppercase tracking-widest text-cyan-400">دليل بصري</p>
          <h2 id="arabic-pricing-visual-guide" className="mt-2 text-2xl font-black text-white sm:text-3xl">صور توضيحية لقطع وأعمال تؤثر في سعر الإصلاح</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-400">تساعدك هذه الصور على فهم نوع العمل والقطعة التي قد تدخل في عرض السعر. هي أمثلة توضيحية وليست وعدًا بأن كل جهاز يحتاج إلى تبديل القطعة نفسها.</p>
          <div className="mt-7 grid gap-5 md:grid-cols-3">
            {[
              {
                image: IMAGES.laptopHardware.laptopLcdPanelReplacementPart,
                alt: 'لوحة شاشة LCD بديلة لفحص المقاس والتوصيل قبل تبديل شاشة اللابتوب',
                title: 'شاشة اللابتوب',
                desc: 'تتأثر تكلفة الشاشة بالمقاس والدقة واللمس ومعدل التحديث ونوع اللوحة وتوفرها. أجرة العمل تبدأ من 30 د.ك، وتضاف قيمة الشاشة.',
                href: '/ar/laptop-screen-repair-kuwait',
                link: 'شوف تفاصيل تبديل الشاشة',
              },
              {
                image: IMAGES.laptopHardware.laptopDustRemovalCoolingService,
                alt: 'تنظيف الغبار من نظام تبريد اللابتوب لتحسين تدفق الهواء',
                title: 'التبريد والتنظيف الداخلي',
                desc: 'يختلف وقت العمل حسب تصميم الجهاز وحالة المراوح والمشتت الحراري. الغبار والحرارة يستدعيان تشخيصًا قبل تحديد الخدمة المناسبة.',
                href: '/ar/laptop-repair-kuwait',
                link: 'تفاصيل تصليح اللابتوب',
              },
              {
                image: IMAGES.laptopHardware.laptopMotherboardDiagnosticBenchRepair,
                alt: 'تشخيص اللوحة الأم للابتوب على طاولة إصلاح مخصصة',
                title: 'اللوحة الأم والأعطال المتقدمة',
                desc: 'قبل تسعير إصلاح اللوحة نحدد دائرة الطاقة أو المكوّن المتأثر ونقيّم إمكانية إصلاحه بدل استبدال اللوحة كاملة.',
                href: '/ar/motherboard-repair-kuwait',
                link: 'تفاصيل إصلاح اللوحة الأم',
              },
            ].map((item) => (
              <article key={item.href} className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/70">
                <Link to={item.href} className="block overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
                  <img src={item.image.src} alt={item.alt} width={item.image.width} height={item.image.height} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover transition duration-300 hover:scale-[1.02]" />
                </Link>
                <div className="p-5">
                  <h3 className="text-lg font-black text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-400">{item.desc}</p>
                  <Link to={item.href} className="mt-4 inline-flex min-h-10 items-center font-bold text-cyan-300 hover:text-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">{item.link} ←</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16" aria-labelledby="arabic-pricing-cost-factors">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-cyan-400">كيف نحسب التكلفة؟</p>
            <h2 id="arabic-pricing-cost-factors" className="mt-2 text-2xl font-black text-white sm:text-3xl">ما الذي يحدد سعر تصليح الكمبيوتر في الكويت؟</h2>
            <p className="mt-4 leading-7 text-slate-300">لا يكفي اسم الخدمة وحده لتحديد السعر. بعد معرفة موديل الجهاز والعَرَض، نحدد هل المشكلة تحتاج ضبطًا برمجيًا أو أجرة تركيب قطعة أو إصلاحًا على مستوى المكونات.</p>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
              <li><strong className="text-white">الموديل والجيل:</strong> قد تختلف القطع وطريقة الفك بين جهازين من السلسلة نفسها.</li>
              <li><strong className="text-white">نوع القطعة ومواصفاتها:</strong> مثل شاشة لمس أو OLED أو معدل تحديث مرتفع، أو بطارية ذات رقم قطعة محدد.</li>
              <li><strong className="text-white">أجرة العمل مقابل ثمن القطعة:</strong> أي سعر مكتوب بجانبه «+ القطعة» لا يمثل إجمالي الفاتورة.</li>
              <li><strong className="text-white">مدى الضرر:</strong> قد يحتاج السائل أو الشحن أو اللوحة الأم إلى فحوصات إضافية لتحديد المكونات المتأثرة.</li>
              <li><strong className="text-white">التوفر ووقت التوريد:</strong> نعتمد التوافق قبل طلب القطعة ونوضح لك إن كان الطلب سيؤثر في موعد الإنجاز.</li>
              <li><strong className="text-white">الاختبار بعد الإصلاح:</strong> نحدد العمل المطلوب للتأكد من أن العطل الأساسي عولج، لا أن العرض اختفى مؤقتًا فقط.</li>
            </ul>
          </div>
          <aside className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-7">
            <h3 className="text-xl font-black text-white">شلون تحصل على عرض سعر أدق؟</h3>
            <ol className="mt-5 space-y-4">
              {[
                ['١', 'اكتب نوع الجهاز والموديل أو رقم المنتج الموجود على الملصق.'],
                ['٢', 'اشرح العَرَض ومتى بدأ، وأخبرنا إذا تعرض الجهاز لسائل أو سقوط.'],
                ['٣', 'أرسل صورة واضحة للعطل إن أمكن، واذكر المنطقة داخل الكويت.'],
                ['٤', 'نوضح نتيجة الفحص والسعر قبل بدء أي عمل مدفوع، ولا نبدأ دون موافقتك.'],
              ].map(([number, text]) => (
                <li key={number} className="flex gap-3 text-sm leading-7 text-slate-300">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cyan-500/30 text-xs font-black text-cyan-300">{number}</span>
                  <span>{text}</span>
                </li>
              ))}
            </ol>
            <p className="mt-5 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4 text-sm leading-7 text-slate-300">مختبر KCROC في حولي، مع استلام وتوصيل مجاني من مناطق الكويت. نؤكد موعد الاستلام حسب المنطقة والتوفر.</p>
          </aside>
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
