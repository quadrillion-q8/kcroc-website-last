// File: app/frontend/src/pages/LaptopBuyingGuideAR.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Cpu, MemoryStick, HardDrive, Gauge, Thermometer, Battery,
  Phone, MessageCircle, Shield, CheckCircle2, MapPin, Wrench,
  Laptop, Sparkles, ListChecks, Monitor, Usb, Wifi, Hammer,
  AlertTriangle, BookOpen, Store, MapPinned, ChevronLeft, Quote
} from 'lucide-react';

import SchemaMarkup from '../components/seo/SchemaMarkup';
import { KCROC_GRAPH } from '../data/graph';

// Dynamic Business Data
const business = KCROC_GRAPH.business!;

/* ─────────────────────────────────────────────────────────────────────────────
   1. PAGE DATA & SEO
───────────────────────────────────────────────────────────────────────────── */
const PAGE_URL = `${business.websiteUrl}/blog/ar/laptop-buying-guide-kuwait-2026`;
const EN_PAGE_URL = `${business.websiteUrl}/blog/laptop-buying-guide-kuwait-2026`;
const HERO_IMAGE_URL = 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_1200/v1781139061/2026-01-22_9_qfanpt.jpg';
const PUBLISHED_DATE = '2026-08-07T09:00:00+03:00';

const WA_LINK = `https://wa.me/${business.telephone}?text=${encodeURIComponent(
  'مرحباً KCROC، قرأت دليل شراء اللابتوب وأحتاج استشارة قبل الشراء. ممكن مساعدة؟'
)}`;

const WA_DIAGNOSIS_LINK = `https://wa.me/${business.telephone}?text=${encodeURIComponent(
  "مرحباً KCROC، جهازي فيه مشكلة وأحتاج فحص مجاني. هذه هي المشكلة:"
)}`;

// PILLAR_SCHEMA: Article, FAQPage, BreadcrumbList, Person
const PILLAR_SCHEMA = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: "دليل شراء اللابتوب في الكويت 2026: اللي ما يقوله لك البائع",
    description: "محتار بين Intel وRyzen وRTX؟ مهندس صيانة في الكويت يشرح لك المواصفات اللي تفرق بالأداء والمواصفات اللي مجرد تسويق.",
    image: [HERO_IMAGE_URL],
    author: {
      '@type': 'Person',
      name: 'Imran Natiq',
      url: `${business.websiteUrl}/author/imran`,
      jobTitle: 'Hardware Repair Engineer',
    },
    publisher: {
      '@type': 'Organization',
      name: business.legalName,
      url: business.websiteUrl,
      logo: { '@type': 'ImageObject', url: business.logoUrl },
    },
    datePublished: PUBLISHED_DATE,
    dateModified: PUBLISHED_DATE,
    mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
    url: PAGE_URL,
    articleSection: 'Laptop Hardware Guide',
    keywords: [
      'شراء لابتوب في الكويت', 'دليل شراء اللابتوب', 'أفضل لابتوب في الكويت', 'مواصفات اللابتوب',
      'اختيار اللابتوب', 'لابتوب للطلاب', 'لابتوب للبرمجة', 'لابتوب للهندسة',
      'لابتوب قيمنق الكويت', 'لابتوب للمونتاج', 'CPU', 'RAM', 'SSD', 'GPU', 'TGP'
    ],
    inLanguage: 'ar-KW',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'هل i7 أسرع دائمًا من i5؟', acceptedAnswer: { '@type': 'Answer', text: 'لا. ممكن i5-H يكون أسرع من i7-U في الاستخدام الثقيل. الـSuffix يعطيك فكرة عن فئة المعالج واستهلاكه المستهدف، لكن الأداء الفعلي يعتمد أيضًا على حدود الطاقة والتبريد وتصميم اللابتوب.' } },
      { '@type': 'Question', name: 'هل 16GB RAM تكفي؟', acceptedAnswer: { '@type': 'Answer', text: 'في معظم الاستخدامات اليومية، نعم. لكن إذا كنت مبرمج أو تستخدم برامج ثقيلة، 32GB يكون أفضل لك.' } },
      { '@type': 'Question', name: 'هل أحتاج 64GB؟', acceptedAnswer: { '@type': 'Answer', text: 'يعتمد على حجم النموذج ونوع الشغل. إذا شغلك 3D أو مونتاج ثقيل أو ذكاء اصطناعي محلي بنماذج كبيرة، ممكن فعلًا تحتاج 64GB أو أكثر، مع التركيز على سعة VRAM بقدر ما تركز على الرام.' } },
      { '@type': 'Question', name: 'هل TLC أفضل من QLC؟', acceptedAnswer: { '@type': 'Answer', text: 'عادةً نعم من ناحية الأداء والتحمل، لكن نوع الـNAND وحده ما يحدد كل شيء. قارن موديل الـSSD كامل (الكنترولر والـDRAM وسلوكه الحراري) مو بس TLC أو QLC.' } },
      { '@type': 'Question', name: 'ليش RTX 4070 عندي مو مثل RTX 4070 في لابتوب ثاني؟', acceptedAnswer: { '@type': 'Answer', text: 'غالبًا بسبب اختلاف TGP (سحب الطاقة) وتصميم نظام التبريد في اللابتوب، حتى لو كان اسم الكرت نفسه.' } },
      { '@type': 'Question', name: 'هل Gen5 SSD ضروري؟', acceptedAnswer: { '@type': 'Answer', text: 'مو لمعظم الناس. Gen4 ممتاز لمعظم الاستخدامات اليومية والعملية.' } },
      { '@type': 'Question', name: 'هل الرام الملحومة سيئة؟', acceptedAnswer: { '@type': 'Answer', text: 'مو بالضرورة إذا كانت المواصفات تغطي احتياجك المستقبلي. لكن قابلية الترقية ميزة مهمة إذا ناوي تحتفظ بالجهاز لفترة طويلة.' } },
      { '@type': 'Question', name: 'هل حرارة الكويت تأثر؟', acceptedAnswer: { '@type': 'Answer', text: 'إي، خصوصًا مع الاستخدام الثقيل. عشان جذي التبريد والتنظيف والتهوية مهمين جدًا للحفاظ على الأداء.' } },
      { '@type': 'Question', name: 'هل 512GB SSD تكفي؟', acceptedAnswer: { '@type': 'Answer', text: 'لأغلب الطلاب وموظفي الأوفيس، نعم. لكن إذا شغلك مونتاج أو ألعاب أو ملفات كبيرة، 1TB فما فوق يكون أنسب.' } },
      { '@type': 'Question', name: 'أشتري Intel أو Ryzen؟', acceptedAnswer: { '@type': 'Answer', text: 'ما فيه إجابة واحدة صح للكل. المهم تقارن حسب الجيل والموديل بالضبط والـSuffix (U, H, HX) والاستخدام مو اسم الشركة بروحها.' } },
      { '@type': 'Question', name: 'هل أحتاج RTX إذا ما ألعب؟', acceptedAnswer: { '@type': 'Answer', text: 'للأوفيس والدراسة والتصفح، كرت الشاشة المدمج (Integrated) يكفي. RTX يستاهل بس إذا تلعب أو تسوي مونتاج/3D/AI.' } },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: business.websiteUrl },
      { '@type': 'ListItem', position: 2, name: 'المدونة', item: `${business.websiteUrl}/blog` },
      { '@type': 'ListItem', position: 3, name: 'دليل شراء اللابتوب 2026', item: PAGE_URL },
    ],
  }
];

const faq = (PILLAR_SCHEMA.find((s) => s['@type'] === 'FAQPage') as any).mainEntity.map((q: any) => ({
  q: q.name,
  a: q.acceptedAnswer.text,
}));

/* ─────────────────────────────────────────────────────────────────────────────
   2. CONTENT DATA (ARABIC)
───────────────────────────────────────────────────────────────────────────── */

const toc = [
  { id: 'quick-pick', label: 'شنو اللابتوب المناسب لك؟' },
  { id: 'understanding-hardware', label: 'مكونات اللابتوب الأساسية' },
  { id: 'buying-in-kuwait', label: 'شراء لابتوب في الكويت: شنو يفرق؟' },
  { id: 'brands-in-kuwait', label: 'ماركات اللابتوب في الكويت' },
  { id: 'where-to-buy', label: 'وين تشتري لابتوب بالكويت؟' },
  { id: 'cpu-guide', label: 'دليل المعالج (CPU)' },
  { id: 'ram-guide', label: 'دليل الرام (RAM)' },
  { id: 'storage-guide', label: 'دليل التخزين (SSD)' },
  { id: 'gpu-guide', label: 'دليل كرت الشاشة (GPU)' },
  { id: 'cooling', label: 'التبريد' },
  { id: 'display', label: 'الشاشة' },
  { id: 'ports', label: 'المنافذ' },
  { id: 'battery', label: 'البطارية' },
  { id: 'wireless', label: 'الشبكة والـ Wi-Fi' },
  { id: 'repairability', label: 'الصيانة وقابلية الترقية' },
  { id: 'spec-targets', label: 'المواصفات المناسبة حسب استخدامك' },
  { id: 'checklist', label: 'قائمة فحص قبل الشراء' },
  { id: 'mistakes', label: '10 أخطاء شائعة عند الشراء' },
  { id: 'faq', label: 'الأسئلة الشائعة' },
  { id: 'when-it-fails', label: 'إذا اللابتوب خرب' },
];

const cpuSuffixTable = [
  { suffix: 'U', power: 'توفير طاقة', builtFor: 'بطارية أفضل واستهلاك أقل', fits: 'الدراسة، الأوفيس، التصفح، السفر' },
  { suffix: 'V', power: 'كفاءة عالية', builtFor: 'للأجهزة الخفيفة اللي تركز على عمر البطارية', fits: 'الأجهزة النحيفة والخفيفة' },
  { suffix: 'P', power: 'مستوى متوسط', builtFor: 'حل وسط بين الأجهزة الخفيفة وعالية الأداء', fits: 'الاستخدام المتوسط' },
  { suffix: 'H / HS', power: 'أداء أعلى', builtFor: 'أداء مستمر قوي', fits: 'البرمجة، الألعاب، المونتاج' },
  { suffix: 'HX', power: 'أقوى فئة', builtFor: 'أداء احترافي (يستهلك بطارية وحرارة أعلى)', fits: 'CAD، 3D، Rendering، الألعاب الثقيلة' },
];

const ramUseCaseTable = [
  { user: 'الاستخدام اليومي، الأوفيس، الدراسة', ram: '16GB' },
  { user: 'الأعمال، التصفح الثقيل مع عدد كبير من التبويبات', ram: '16–32GB' },
  { user: 'المبرمجين (VMs, Docker)', ram: '32GB' },
  { user: 'مونتاج الفيديو، 3D', ram: '32–64GB' },
  { user: 'التصميم الهندسي، CAD', ram: '32–64GB' },
  { user: 'الذكاء الاصطناعي المحلي (Local AI)', ram: '64GB+' },
];

const specTargetsTable = [
  { user: 'الطالب / استخدام يومي', cpu: 'Core Ultra 5 / Ryzen 5 (U-series)', ram: '16GB', storage: '512GB TLC SSD', gpu: 'مدمج (Integrated)', priority: 'البطارية، الوزن' },
  { user: 'أوفيس وأعمال', cpu: 'Core Ultra 5 U', ram: '16GB', storage: '512GB TLC SSD', gpu: 'مدمج (Integrated)', priority: 'البطارية، سهولة الحمل' },
  { user: 'المبرمج', cpu: 'Core Ultra 7 H / Ryzen 7 H', ram: '32GB', storage: '1TB SSD', gpu: 'مدمج أو منفصل ابتدائي', priority: 'RAM، أداء CPU المستمر' },
  { user: 'قيمنق (Gaming)', cpu: 'Core i7/Ultra 7 H أو HX', ram: '32GB', storage: '1TB SSD', gpu: 'RTX 4060 أو أفضل، تأكد من TGP', priority: 'قوة TGP، التبريد، Refresh Rate' },
  { user: 'هندسة / CAD / 3D', cpu: 'Ryzen 9 HX / Core Ultra 9 HX', ram: '64GB', storage: '2TB SSD', gpu: 'كرت منفصل بأداء رندر قوي (تأكد من شهادة Workstation إذا برنامجك يطلبها تحديدًا)', priority: 'أداء CPU المستمر، التبريد، RAM' },
  { user: 'مونتاج وتصميم', cpu: 'Core Ultra 7-9 H/HX', ram: '32–64GB', storage: '1–2TB TLC SSD', gpu: 'كرت منفصل 12GB+ VRAM', priority: 'VRAM، سرعة التخزين، دقة الألوان' },
  { user: 'AI محلي / استخدام ثقيل', cpu: 'معالجات فئة HX', ram: '64GB+', storage: '2TB SSD', gpu: 'حسب حجم النموذج — ركز على VRAM', priority: 'VRAM، التبريد المستمر، سعة RAM' },
];

const checklist = [
  'تأكد من الـSuffix للمعالج (H, HX, U, P) والجيل والموديل بالضبط، مو بس اسم الفئة أو الرقم.',
  'الرام لا تقل عن 16GB، وتأكد إذا كانت قابلة للترقية أو ملحومة.',
  'نوع الـSSD مهم (TLC أو QLC)، لكن الأهم مقارنة موديل الـSSD نفسه مو النوع فقط.',
  'للألعاب: تأكد من طاقة كرت الشاشة (TGP) مو بس اسمه.',
  'سعة البطارية بالـWh — هذا رقم السعة مو ضمان لعمر البطارية الفعلي، اللي يعتمد أيضًا على المعالج والشاشة.',
  'نظام التبريد: هل يتحمل حرارة الكويت تحت الضغط؟ (شيّك على فيديوهات الـTeardown وشوف نظام التبريد من داخل الجهاز).',
];

const commonMistakes = [
  { title: '1. تشوف i7 وتشتري على طول', detail: 'الـSuffix (U, H, HX) والجيل والموديل بالضبط هي اللي تحدد الأداء الفعلي المستمر، مو بس اسم المعالج.' },
  { title: '2. تشتري 8GB عشان توفر', detail: 'التوفير اليوم ممكن يكلفك ترقية أو تغيير جهاز بعدين لأن المتصفح والنظام يستهلكها بسرعة.' },
  { title: '3. تشوف RTX 4070 وتنسى TGP', detail: 'نفس الكرت ممكن يكون أداؤه أضعف من كرت "أقل" اسمًا إذا كانت طاقته (TGP) منخفضة.' },
  { title: '4. تختار شاشة 4K/OLED بدون باقي المواصفات', detail: 'الشاشة القوية تحتاج هاردوير قوي يقدر يشغلها بسلاسة بدون تقطيع.' },
  { title: '5. تتجاهل التبريد تماماً', detail: 'جهاز قوي بتبريد ضعيف راح يختنق من الحرارة وينزل أداؤه فجأة (Thermal Throttling).' },
  { title: '6. تشتري 2TB بدون ما تعرف نوع الـSSD', detail: 'مساحة 2TB من نوع QLC ممكن تكون أبطأ من 1TB من نوع TLC تحت الضغط.' },
  { title: '7. ما تتأكد من قابلية الترقية', detail: 'ممكن تكتشف بعدين إن الرام والتخزين ملحومين باللوحة الأم وما يتغيرون أبداً.' },
  { title: '8. تشتري HX لاستخدام بسيط', detail: 'بتدفع فلوس على قوة ما تحتاجها، وتاخذ جهاز أثقل وبطاريته تخلص بسرعة.' },
  { title: '9. ما تشوف سعة البطارية بالـWh', detail: 'مو كل جهاز خفيف بطاريته ممتازة، تأكد من الرقم الفعلي — لكن تذكر إنه سعة مو عمر فعلي مضمون.' },
  { title: '10. ما تبحث عن مقطع Teardown', detail: 'الـTeardown باليوتيوب يوريك التبريد من الداخل وهل القطع قابلة للفك أو ملحومة.' },
];

/* ─────────────────────────────────────────────────────────────────────────────
   3. SMALL REUSABLE PIECES (RTL ADAPTED)
───────────────────────────────────────────────────────────────────────────── */

function SectionHeading({ id, kicker, title, icon: Icon }: { id: string; kicker: string; title: string; icon: any }) {
  return (
    <div id={id} className="scroll-mt-24 mb-6 sm:mb-8">
      <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 px-3 py-1 text-[10px] sm:text-xs mb-3">
        <Icon className="w-3 h-3 me-1.5 inline" /> {kicker}
      </Badge>
      <h2 className="text-xl sm:text-3xl font-bold text-white leading-tight">{title}</h2>
    </div>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed text-start">{children}</div>;
}

function BulletList({ items, color = 'text-cyan-400' }: { items: string[]; color?: string }) {
  return (
    <ul className="space-y-3 mt-4">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-2.5 text-slate-300 text-sm sm:text-base leading-relaxed text-start">
          <CheckCircle2 className={`w-4 h-4 ${color} flex-shrink-0 mt-1`} />
          <span dangerouslySetInnerHTML={{ __html: item }} />
        </li>
      ))}
    </ul>
  );
}

function Callout({ children, tone = 'cyan' }: { children: React.ReactNode; tone?: 'cyan' | 'red' }) {
  const border = tone === 'cyan' ? 'border-cyan-500/30 bg-cyan-500/5' : 'border-red-500/30 bg-red-500/5';
  return (
    <div className={`rounded-xl border ${border} p-4 sm:p-5 flex gap-3 text-start`}>
      <Quote className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 flex-shrink-0 mt-1" />
      <div className="text-slate-200 text-xs sm:text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800 mt-4">
      <table className="w-full text-xs sm:text-sm text-start">
        <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wide text-[10px] sm:text-xs">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="px-3 sm:px-4 py-2.5 sm:py-3 font-semibold whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {rows.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 0 ? 'bg-slate-950/40' : 'bg-slate-900/40'}>
              {row.map((cell, ci) => (
                <td key={ci} className="px-3 sm:px-4 py-2.5 sm:py-3 text-slate-300 align-top">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   4. MAIN COMPONENT
───────────────────────────────────────────────────────────────────────────── */
export default function LaptopBuyingGuideAR() {
  return (
    <div className="min-h-screen bg-gray-950 text-white selection:bg-cyan-500/30" dir="rtl">

      <Helmet htmlAttributes={{ lang: 'ar-KW', dir: 'rtl' }}>
        <title>دليل شراء اللابتوب في الكويت 2026: شلون تختار أفضل لابتوب؟ | KCROC</title>
        <meta
          name="description"
          content="تبي تشتري لابتوب في الكويت؟ تعرّف على أفضل مواصفات المعالج والرام وSSD وRTX والتبريد والبطارية حسب استخدامك، مع قائمة فحص قبل الشراء."
        />
        <link rel="canonical" href={PAGE_URL} />
        {/* Multilingual SEO */}
        <link rel="alternate" hrefLang="ar-KW" href={PAGE_URL} />
        <link rel="alternate" hrefLang="en-KW" href={EN_PAGE_URL} />
        <link rel="alternate" hrefLang="x-default" href={EN_PAGE_URL} />
        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="ar_KW" />
        <meta property="og:title" content="دليل شراء اللابتوب في الكويت 2026: شلون تختار أفضل لابتوب؟" />
        <meta
          property="og:description"
          content="دليل عملي لاختيار اللابتوب المناسب في الكويت حسب الاستخدام والميزانية والمواصفات."
        />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:image" content={HERO_IMAGE_URL} />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="دليل شراء اللابتوب في الكويت 2026" />
        <meta
          name="twitter:description"
          content="شلون تختار اللابتوب الصح؟ دليل المعالج والرام والـSSD والـGPU والتبريد والبطارية."
        />
        <meta name="twitter:image" content={HERO_IMAGE_URL} />
      </Helmet>

      <SchemaMarkup schema={{ '@graph': PILLAR_SCHEMA }} />

      <main>
      <article>

      {/* Breadcrumb */}
      <div className="pt-20 sm:pt-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl text-xs sm:text-sm text-slate-400 flex items-center gap-2">
          <Link to="/" className="hover:text-cyan-400 transition-colors">الرئيسية</Link>
          <ChevronLeft className="w-3 h-3 text-slate-600" />
          <Link to="/blog" className="hover:text-cyan-400 transition-colors">المدونة</Link>
          <ChevronLeft className="w-3 h-3 text-slate-600" />
          <span className="text-slate-300">دليل شراء اللابتوب 2026</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-6 pb-8 sm:pb-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-cyan-500/10 via-transparent to-emerald-500/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(6,182,212,0.1),transparent_50%)]"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-4 sm:space-y-6">
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold">
              <Laptop className="w-4 h-4 me-2 inline" />
              دليل الشراء 2026
            </Badge>

            {/* Language Toggle Button */}
            <div className="flex justify-center mt-4 mb-2" dir="ltr">
              <Button variant="outline" className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 rounded-full" asChild>
                <Link to="/blog/laptop-buying-guide-kuwait-2026">
                  <span className="mr-2 text-lg">🇬🇧</span> Read in English
                </Link>
              </Button>
            </div>

            <h1 className="text-3xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
              دليل شراء اللابتوب<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-cyan-400 to-emerald-400">
                في الكويت 2026
              </span>
            </h1>
            <p className="text-sm sm:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              شلون تختار اللابتوب الصح؟ لا تشتري على اسم المعالج بس. محتار بين Intel وRyzen وRTX؟ خلنا نوضح لك شنو فعلاً يفرق. مهندس صيانة في الكويت يشرح لك المواصفات اللي تفرق بالأداء والمواصفات اللي مجرد تسويق.
            </p>
            <p className="text-xs sm:text-sm text-slate-500">
              ~٢٣ دقيقة قراءة · بقلم: عمران، مهندس صيانة · نُشر في 7 أغسطس 2026 · آخر تحديث 7 أغسطس 2026
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4 sm:pt-6">
              <Button
                size="lg"
                className="bg-gradient-to-l from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-base sm:text-lg px-6 sm:px-8 py-6 shadow-lg shadow-cyan-500/30 w-full sm:w-auto"
                asChild
              >
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 me-2" />
                  اسألنا قبل لا تشتري
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 text-base sm:text-lg px-6 sm:px-8 py-6 w-full sm:w-auto"
                asChild
              >
                <a href={`tel:+${business.telephone}`}>
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 me-2" />
                  اتصل: +{business.telephone}
                </a>
              </Button>
            </div>

            <div className="pt-6 sm:pt-10 max-w-4xl mx-auto">
              <img
                src={HERO_IMAGE_URL}
                alt="دليل شراء اللابتوب في الكويت 2026"
                width="1200"
                height="630"
                loading="eager"
                fetchPriority="high"
                className="w-full h-auto rounded-2xl border border-slate-800 shadow-lg shadow-cyan-500/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="pb-8 sm:pb-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl space-y-4 sm:space-y-6 text-slate-300 text-sm sm:text-lg leading-relaxed text-start">
          <p>
            قبل لا تدفع، خلنا نوضح لك المواصفات اللي فعلًا تفرق بالأداء والعمر الافتراضي — والمواصفات اللي أغلبها مجرد تسويق.
          </p>
          <p>
            في KCROC، نشوف يوميًا أجهزة لابتوب جديدة توصلنا بسبب مشاكل ما كان المفروض تصير لو تم اختيار المواصفات المناسبة من البداية. جهاز غالي، RAM قليلة، تبريد ضعيف، أو كرت شاشة قوي لكن محدود بالطاقة.
          </p>
          <p>
            عشان جذي، سوينا لك هذا الدليل. مو هدفنا نبيعك أغلى لابتوب. هدفنا نساعدك تشتري اللابتوب المناسب لاستخدامك. كثير من الناس يشوفون Core i7 و16GB رام ويفترضون أن الجهاز قوي تلقائيًا — لكن هذا مو صحيح دائمًا. نفس الـ Core i7 ممكن يكون سريع جداً بجهاز وأبطأ بكثير في جهاز ثاني بسبب حدود الطاقة والتبريد اللي يحددها تصميم اللابتوب.
          </p>
        </div>
      </section>

      {/* Quick Decision: What's right for you */}
      <section id="quick-pick" className="scroll-mt-24 pb-8 sm:pb-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-8 text-start">
              <h2 className="text-lg sm:text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <ListChecks className="w-5 h-5 text-cyan-400" /> شنو اللابتوب المناسب لك؟
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mb-4">
                جاوب على هالسؤال بسرعة، وبعدين اقرأ التفاصيل حسب استخدامك في باقي الدليل.
              </p>
              <DataTable
                headers={['المستخدم', 'المعالج', 'الرام', 'التخزين', 'كرت الشاشة', 'أهم نقطة تركز عليها']}
                rows={specTargetsTable.map((r) => [r.user, r.cpu, r.ram, r.storage, r.gpu, r.priority])}
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="pb-8 sm:pb-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6 text-start">
              <h2 className="text-xs sm:text-sm font-bold text-cyan-400 uppercase tracking-wide mb-3 sm:mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> محتويات الدليل
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-300 hover:text-cyan-400 transition-colors py-1"
                  >
                    <ChevronLeft className="w-3 h-3 flex-shrink-0 text-slate-600" />
                    {item.label}
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Understanding Modern Laptop Hardware */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 bg-slate-900/30 border-y border-slate-800">
        <div className="container mx-auto max-w-4xl">
          <SectionHeading id="understanding-hardware" kicker="الأساسيات" title="مكونات اللابتوب الأساسية: اللابتوب القوي مو قطعة وحدة" icon={Sparkles} />
          <Prose>
            <p>
              اللابتوب عبارة عن منظومة كاملة تعتمد على بعضها. أي قطعة ضعيفة ممكن تسحب أداء باقي القطع القوية للأسفل:
            </p>
          </Prose>
          <BulletList
            items={[
              '<strong class="text-white">المعالج (CPU)</strong> — هو المسؤول عن تنفيذ العمليات وتشغيل البرامج.',
              '<strong class="text-white">الرام (RAM)</strong> — مساحة العمل اللي يستخدمها الجهاز أثناء تشغيل البرامج.',
              '<strong class="text-white">التخزين (SSD)</strong> — المكان اللي تنحفظ فيه ملفاتك وبرامجك ونظام التشغيل.',
              '<strong class="text-white">كرت الشاشة (GPU)</strong> — مهم للألعاب، التصميم، الـ3D، المونتاج وبعض تطبيقات الذكاء الاصطناعي.',
              '<strong class="text-white">التبريد (Cooling)</strong> — هو اللي يحدد شكثر الجهاز يقدر يحافظ على أدائه قبل لا الحرارة تجبره يخفف السرعة.',
              '<strong class="text-white">اللوحة الأم (Motherboard)</strong> — القطعة اللي تربط كل المكونات وتتحكم بالطاقة بينها.',
            ]}
          />
        </div>
      </section>

      {/* Buying in Kuwait */}
      <section className="py-8 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <SectionHeading id="buying-in-kuwait" kicker="السوق المحلي" title="شراء لابتوب في الكويت؟ الحرارة والضمان يفرقون" icon={MapPinned} />
          <Prose>
            <p>
              في الكويت، في شغلات إضافية لازم تحطها بالحسبان قبل لا تختار اللابتوب:
            </p>
          </Prose>
          <BulletList
            items={[
              '<strong class="text-white">حرارة الصيف:</strong> حرارة الجو تقلل قدرة الجهاز على التخلص من الحرارة، خصوصًا مع الاستخدام الثقيل. الجهاز اللي يشتغل ممتاز في غرفة باردة ممكن يخفف أداءه أسرع في بيئتنا.',
              '<strong class="text-white">الضمان:</strong> مو كل لابتوب ينباع بالكويت ضمانه واحد. الأجهزة من الموزع الرسمي لها دعم محلي، الأجهزة المستوردة ضمانها قد يقتصر على بلد المنشأ.',
              '<strong class="text-white">الكيبورد:</strong> تأكد إن الكيبورد يجي عربي/إنجليزي من المصنع خصوصاً في الأجهزة المستوردة.',
              '<strong class="text-white">توفر قطع الغيار:</strong> الشاشة، البطارية، المراوح مو بنفس سهولة التوفر لكل الموديلات. هذا يفرق معاك بعد سنتين من الشراء.',
            ]}
            color="text-orange-400"
          />
        </div>
      </section>

      {/* Brands in Kuwait */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 bg-slate-900/30 border-y border-slate-800">
        <div className="container mx-auto max-w-4xl">
          <SectionHeading id="brands-in-kuwait" kicker="حقيقة الماركات" title="لا تختار الماركة قبل الموديل" icon={Wrench} />
          <Prose>
            <p>
              كثير من العملاء يحددون الماركة أولاً — "أبي Dell" أو "أبي HP" — بينما السؤال الأهم هو: أي موديل بالضبط؟ وبأي مواصفات؟ لأن نفس الشركة عندها جهاز تبريده ممتاز، وجهاز ثاني مصمم للخفة على حساب الأداء.
            </p>
            <p>قبل لا تختار، تأكد من:</p>
          </Prose>
          <BulletList
            items={[
              '<strong class="text-white">الموديل بالضبط</strong> — نفس الاسم ممكن يجي بمواصفات داخلية مختلفة تماماً.',
              '<strong class="text-white">نظام التبريد</strong> — هو اللي يحدد الأداء المستمر.',
              '<strong class="text-white">قابلية الترقية وتوفر القطع</strong> — هل تقدر تزيد الرام بعدين؟',
              '<strong class="text-white">الضمان</strong> — هل هو محلي أو دولي؟',
            ]}
          />
        </div>
      </section>

      {/* Where to Buy */}
      <section className="py-8 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <SectionHeading id="where-to-buy" kicker="أماكن الشراء" title="وين تشتري لابتوب بالكويت؟" icon={Store} />
          <Prose>
            <p>عندك عادة ثلاث خيارات، وكل خيار له ميزاته:</p>
          </Prose>
          <BulletList
            items={[
              '<strong class="text-white">المحلات المحلية:</strong> ميزتها الأجهزة مضمونة محلياً والكيبورد مناسب للسوق الكويتي.',
              '<strong class="text-white">المتاجر الإلكترونية الإقليمية:</strong> خيارات أكثر، لكن تأكد من مدة التوصيل وشروط الضمان.',
              '<strong class="text-white">الأجهزة المستوردة:</strong> أحياناً تكون أرخص أو توفر مواصفات غير موجودة محلياً، لكن انتبه للضمان والكيبورد ومحول الشاحن.',
            ]}
          />
        </div>
      </section>

      {/* CPU Guide */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 bg-slate-900/30 border-y border-slate-800">
        <div className="container mx-auto max-w-4xl">
          <SectionHeading id="cpu-guide" kicker="القطع بالتفصيل" title="دليل المعالج: لا تنخدع بـ Core i7 أو Ryzen 7" icon={Cpu} />
          <Prose>
            <p>
              هذي من أهم النقاط في اختيار اللابتوب. ممكن جهاز Core i5 يكون أسرع من جهاز Core i7 في بعض المهام، وممكن Ryzen 7 يكون أبطأ من Ryzen 5 في استخدام معين. السبب هو الـ Suffix (الحرف الأخير من اسم المعالج) والجيل، مو رقم الفئة نفسه.
            </p>

            <h3 className="text-white font-semibold text-base sm:text-lg pt-2">شنو يعني U و H و HX؟</h3>
            <p>
              الـSuffix يعطيك فكرة عن فئة المعالج واستهلاكه المستهدف من الطاقة، لكن الأداء الفعلي المستمر يعتمد أيضًا على حدود الطاقة والتبريد وتصميم اللابتوب نفسه — نفس الـSuffix ممكن يتصرف بشكل مختلف بين موديلين. لا تدفع زيادة على HX إذا استخدامك مجرد تصفح وأوفيس لأنك بتاخذ شاحن أثقل وبطارية تخلص بسرعة.
            </p>
            <p>
              وبنفس الأهمية: قارن حسب <strong className="text-white">الجيل + الموديل بالضبط + الـSuffix</strong>، مو اسم الفئة بروحه. معالج i7 من جيل قديم مو بالضرورة أسرع من i5 من جيل أحدث.
            </p>
          </Prose>

          <DataTable
            headers={['الـ Suffix', 'التوجيه العام', "الميزة الأساسية", 'الاستخدام الأنسب']}
            rows={cpuSuffixTable.map((r) => [r.suffix, r.power, r.builtFor, r.fits])}
          />
          
          <div className="mt-5">
            <Callout>
              <strong className="text-white">قارن حسب الـ Suffix والجيل مو الرقم فقط:</strong>
              {' '}مقارنة تفصيلية بين Core Ultra و Ryzen AI متوفرة في مدونتنا. محتار بين موديلين بالضبط؟ راسلنا على الواتساب بأسماء الموديلين وبنعطيك التوجيه الصحيح للاختيار.
            </Callout>
          </div>
        </div>
      </section>

      {/* RAM Guide */}
      <section className="py-8 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <SectionHeading id="ram-guide" kicker="القطع بالتفصيل" title="الرام: 16GB صارت نقطة البداية" icon={MemoryStick} />
          <Prose>
            <p>
              إذا بتشتري لابتوب جديد في 2026، 8GB صارت محدودة لمعظم الاستخدامات الحديثة، خصوصًا إذا تستخدم برامج كثيرة أو تفتح تبويبات وايد بنفس الوقت.
            </p>
          </Prose>
          <BulletList
            items={[
              '<strong class="text-white">16GB:</strong> الخيار المناسب لمعظم الناس (دراسة، أوفيس، تصفح، استخدام يومي).',
              '<strong class="text-white">32GB:</strong> ضرورية للمبرمجين (VMs/Docker) أو إذا تفتح برامج وتطبيقات كثيرة بنفس الوقت.',
              '<strong class="text-white">64GB+:</strong> للاستخدام الثقيل مثل المونتاج الاحترافي، الـ3D، أو الـ AI المحلي — وهنا الحجم المناسب يعتمد على حجم النموذج اللي تشغله.',
            ]}
            color="text-emerald-400"
          />

          <Prose>
            <h3 className="text-white font-semibold text-base sm:text-lg pt-4">مو كل DDR5 قابلة للترقية!</h3>
            <p>
              هذي نقطة مهمة جداً. ممكن تشوف 16GB DDR5 وتفترض إنك تقدر تزيدها بعدين. مو شرط. بعض الأجهزة تكون الرام فيها ملحومة باللوحة الأم (خصوصاً LPDDR5X). إذا ناوي تستخدم الجهاز 4-6 سنوات، قابلية الترقية تستاهل تنتبه لها من البداية.
            </p>
          </Prose>

          <h3 className="text-white font-semibold text-base sm:text-lg pt-6 mb-1">الرام المناسب حسب استخدامك</h3>
          <DataTable headers={['المستخدم', 'الرام المقترح']} rows={ramUseCaseTable.map((r) => [r.user, r.ram])} />
        </div>
      </section>

      {/* Storage Guide */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 bg-slate-900/30 border-y border-slate-800">
        <div className="container mx-auto max-w-4xl">
          <SectionHeading id="storage-guide" kicker="القطع بالتفصيل" title="التخزين (SSD): لا تشوف 1TB وتوقف" icon={HardDrive} />
          <Prose>
            <p>
              وايد ناس يشترون حسب السعة: "هذا 2TB أكيد أحسن". مو شرط! نوع الـSSD وحده ما يحدد كل شيء — الأهم دائمًا مقارنة موديل الـSSD نفسه بالكامل (الكنترولر، الـDRAM، وسلوكه الحراري) مو بس نوع NAND.
            </p>
          </Prose>
          <BulletList
            items={[
              '<strong class="text-white">TLC:</strong> عادةً أسرع وأكثر تحملًا، ويحافظ على الأداء بشكل أفضل حتى لو كان شبه ممتلئ.',
              '<strong class="text-white">QLC:</strong> أرخص، لكن ممكن تنخفض سرعته بشكل واضح أثناء عمليات الكتابة الكبيرة بعد انتهاء الكاش.',
              '<strong class="text-white">Gen4 مقابل Gen5:</strong> لغالبية المستخدمين Gen4 ممتاز. Gen5 أسرع في نقل الملفات الضخمة جداً لكنه أغلى ويولد حرارة أعلى.',
            ]}
            color="text-purple-400"
          />
          <div className="mt-5">
            <Callout>
              <strong className="text-white">نصيحة الشراء:</strong> في الاستخدام الثقيل، 1TB TLC غالبًا يكون خيارًا أفضل من 2TB QLC من ناحية الأداء المستمر والتحمل، لكن الأفضل دائمًا مقارنة موديل الـSSD نفسه مو نوع NAND فقط.
            </Callout>
          </div>
        </div>
      </section>

      {/* GPU Guide */}
      <section className="py-8 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <SectionHeading id="gpu-guide" kicker="القطع بالتفصيل" title="كرت الشاشة (GPU): لا تشتري RTX على الاسم بس" icon={Gauge} />
          <Prose>
            <p>
              إذا بتشتري Gaming Laptop، لا تسأل بس: "RTX 4060 ولا 4070؟" اسأل كمان: "كم TGP وشلون التبريد؟"
            </p>

            <h3 className="text-white font-semibold text-base sm:text-lg pt-2">شنو الـ TGP؟</h3>
            <p>
              TGP يعني كمية الطاقة اللي اللابتوب يسمح فيها لكرت الشاشة. نفس الكرت ممكن يشتغل بطاقة مختلفة حسب الجهاز. اسم الـGPU وحده ما يكفي للحكم على أداء اللابتوب؛ الـTGP والتبريد والحدود الحرارية وتصميم الجهاز كلها تؤثر على الأداء الفعلي — كمثال على ذلك، RTX 4070 بقدرة منخفضة (TGP ضعيف) ممكن ما يتفوق على RTX 4060 بقدرة عالية في نفس المقارنة.
            </p>
          </Prose>

          <div className="mt-5">
            <Callout>
              <strong className="text-white">ملاحظة للمصممين والمونتاج:</strong> تأكد من سعة الـ VRAM لأنها تلعب دور كبير في الرندر وتشغيل برامج الثري دي بسلاسة.
            </Callout>
          </div>
        </div>
      </section>

      {/* Cooling */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 bg-slate-900/30 border-y border-slate-800">
        <div className="container mx-auto max-w-4xl">
          <SectionHeading id="cooling" kicker="القطع بالتفصيل" title="التبريد في الكويت مو شيء ثانوي" icon={Thermometer} />
          <Prose>
            <p>
              لابتوب بمواصفات قوية لكن بتبريد ضعيف قد يعطي أداءً ممتازًا في أول عشر دقائق فقط، ثم يبدأ بالتباطؤ بسبب ارتفاع الحرارة (Thermal Throttling) — وتبدأ الألعاب تتقطع وتنخفض الفريمات.
            </p>
            <p>
              في الكويت، الموضوع أهم بسبب حرارة الصيف والغبار. الغبار مو بس يزعج المروحة، بل يكتم التبريد ويزيد الضغط على المعالج.
            </p>
            <h3 className="text-white font-semibold text-base sm:text-lg pt-2">كيف تحافظ على التبريد؟</h3>
          </Prose>
          <BulletList
            items={[
              'استخدمه على سطح صلب (لا تحطه على السرير أو المخدة).',
              'نظف فتحات التهوية بشكل دوري.',
              'إذا صوت المراوح زاد بشكل غير طبيعي، افحص الجهاز.',
              'في المهام الثقيلة (رندر، ألعاب)، استخدمه في مكان مكيف لتقليل الضغط على النظام.'
            ]}
            color="text-red-400"
          />

          <div className="mt-5">
            <Callout tone="red">
              <strong className="text-white">اللابتوب يسخن بسرعة؟</strong> الفحص الحراري الاحترافي والتنظيف العميق (وتغيير الـ Thermal Paste) ممكن يحسّن الحرارة والأداء بشكل ملحوظ إذا كان سبب المشكلة تراكم الغبار أو تدهور المادة الحرارية.{' '}
              <Link to="/laptop-repair-kuwait" className="text-cyan-400 underline hover:text-cyan-300">
                احجز فحص مجاني لجهازك →
              </Link>
            </Callout>
          </div>
        </div>
      </section>

      {/* Display */}
      <section className="py-8 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <SectionHeading id="display" kicker="القطع بالتفصيل" title="الشاشة: مو كل OLED أفضل" icon={Monitor} />
          <BulletList
            items={[
              '<strong class="text-white">IPS:</strong> ممتازة للاستخدام اليومي ودقة الألوان، وما فيها خطر احتراق البكسلات (Burn-in) مثل بعض شاشات OLED.',
              '<strong class="text-white">OLED:</strong> ألوان خرافية وتباين ممتاز (الأسود حقيقي)، رائعة للمحتوى لكن الشاشة غالباً تكون عاكسة للإضاءة (Glossy).',
              '<strong class="text-white">التردد (Hz):</strong> 60Hz كافي للاستخدام العادي. 120Hz فما فوق يعطيك سلاسة ممتازة في الألعاب والتصفح.',
              '<strong class="text-white">للمصممين:</strong> تأكد من تغطية الألوان (sRGB, DCI-P3) وسطوع الشاشة (Nits).',
            ]}
            color="text-blue-400"
          />
        </div>
      </section>

      {/* Ports, Battery, Wireless */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 bg-slate-900/30 border-y border-slate-800">
        <div className="container mx-auto max-w-4xl">
          <SectionHeading id="ports" kicker="القطع بالتفصيل" title="المنافذ، البطارية والاتصال" icon={Usb} />
          <Prose>
            <h3 className="text-white font-semibold text-base sm:text-lg">المنافذ (Ports)</h3>
            <p>مو كل USB-C نفس الشي. بعضها يدعم الشحن وتوصيل شاشات (Thunderbolt/USB4) وبعضها مجرد نقل بيانات بطيء. تأكد من مواصفات المنفذ إذا كنت تستخدم Dock أو شاشة خارجية.</p>
            
            <h3 className="text-white font-semibold text-base sm:text-lg mt-4">البطارية (Battery)</h3>
            <p>لا تعتمد على إعلانات "يدوم ١٢ ساعة". شوف سعة البطارية برقم الـ Wh — لكن تذكر إن هذا الرقم مقياس السعة مو ضمان لعمر البطارية الفعلي. إذا كان الاستخدام المتنقل أولوية، فغالبًا تكون بطارية 70Wh أو أكثر نقطة بداية جيدة، لكن عمر البطارية الفعلي يعتمد أيضًا على المعالج والشاشة ونظام إدارة الطاقة — جهاز بسعة 60Wh بمعالج موفر للطاقة ممكن يدوم أطول من جهاز قيمنق بسعة 80Wh. البطاريات الأقل من 50Wh قد تحتاج شحنًا أكثر مع الاستخدام المتنقل، خصوصًا مع المعالجات والشاشات الأعلى استهلاكًا.</p>

            <h3 className="text-white font-semibold text-base sm:text-lg mt-4">Wi-Fi 7</h3>
            <p>إذا الجهاز يدعم Wi-Fi 7 فهذا ممتاز للمستقبل، لكن لا تدفع مبالغ إضافية كبيرة عشانه إذا الراوتر عندك ما يدعمه للحين — Wi-Fi 6E كافي جداً وممتاز لمعظم الاستخدامات.</p>
          </Prose>
        </div>
      </section>

      {/* Repairability */}
      <section className="py-8 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <SectionHeading id="repairability" kicker="عمر الجهاز" title="فكر في الصيانة قبل لا تشتري" icon={Hammer} />
          <Prose>
            <p>
              هذي نقطة وايد من الناس ما يفكرون فيها قبل الشراء. اسأل نفسك: إذا احتجت مساحة إضافية، أقدر أضيف SSD؟ إذا خربت الرام، أقدر أبدلها؟
            </p>
          </Prose>
          <BulletList
            items={[
              '<strong class="text-white">القطع الملحومة (Soldered):</strong> تخلي اللابتوب أنحف وأخف، لكن أي عطل فيها قد يعني تبديل اللوحة الأم بالكامل (Motherboard).',
              '<strong class="text-white">القطع القابلة للترقية:</strong> تطول من عمر الجهاز الافتراضي وقد توفر عليك تكلفة استبدال الجهاز بالكامل مستقبلاً.',
            ]}
            color="text-orange-400"
          />
          <Prose>
            <h3 className="text-white font-semibold text-base sm:text-lg pt-4">
              إصلاح اللوحة الأم (Motherboard Repair)
            </h3>
            <p>
              إذا اللابتوب طفى فجأة أو ما قام يشحن، مو شرط تستبدل اللوحة الأم بالكامل. أحياناً العطل يكون في مكثف (Capacitor) أو آي سي شحن (IC). بالتشخيص الدقيق والمايكرو-سولدرنق نقدر نحاول نصلح الخلل ونحتفظ باللوحة الأصلية. الحفاظ على اللوحة الأصلية قد يساعد على الوصول لبياناتك وملفاتك، لكن سلامة البيانات ما تكون مضمونة 100% في كل حالة — تعتمد على حالة الـSSD والعطل بالتحديد.
            </p>
          </Prose>
          <div className="mt-5 space-y-4">
            <Callout tone="red">
              <strong className="text-white">اللابتوب فجأة ما يشتغل؟</strong> الفحص على مستوى الدوائر الكهربائية (Component-level) عادةً أرخص من تبديل اللوحة الأم بالكامل بالوكالة.{' '}
              <Link to="/motherboard-repair-kuwait" className="text-cyan-400 underline hover:text-cyan-300">
                احجز فحص مجاني لجهازك →
              </Link>
            </Callout>
          </div>
        </div>
      </section>

      {/* Spec Targets by User Type */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 bg-slate-900/30 border-y border-slate-800">
        <div className="container mx-auto max-w-6xl">
          <SectionHeading id="spec-targets" kicker="مرجع سريع" title="شنو المواصفات المناسبة لك؟" icon={ListChecks} />
          <Prose>
            <p>
              هذا الجدول يعطيك نقطة بداية ممتازة تبني عليها اختيارك حسب طبيعة شغلك:
            </p>
          </Prose>
          <DataTable
            headers={['المستخدم', 'المعالج', 'الرام', 'التخزين', 'كرت الشاشة', 'أهم نقطة تركز عليها']}
            rows={specTargetsTable.map((r) => [r.user, r.cpu, r.ram, r.storage, r.gpu, r.priority])}
          />
        </div>
      </section>

      {/* Checklist Section */}
      <section id="checklist" className="scroll-mt-24 py-8 sm:py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 sm:mb-16">
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-sm mb-3 sm:mb-4">
              <ListChecks className="w-3 h-3 me-1.5 inline" /> قبل الدفع
            </Badge>
            <h2 className="text-2xl sm:text-5xl font-bold text-white mb-3 sm:mb-6">
              قائمة فحص سريعة قبل لا تدفع
            </h2>
          </div>

          <Card className="bg-gradient-to-bl from-slate-800/80 to-slate-900/80 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-8">
              <ul className="space-y-3 sm:space-y-4">
                {checklist.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-slate-200 text-sm sm:text-base text-start">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Common Buying Mistakes */}
      <section id="mistakes" className="scroll-mt-24 py-8 sm:py-16 px-4 sm:px-6 bg-slate-900/30 border-y border-slate-800">
        <div className="container mx-auto max-w-4xl">
          <SectionHeading id="mistakes-inner" kicker="تعلم من الأخطاء" title="10 أخطاء نشوفها عند شراء اللابتوب" icon={AlertTriangle} />
          <div className="space-y-3 sm:space-y-4">
            {commonMistakes.map((m, i) => (
              <Card key={i} className="bg-slate-950/40 border-slate-800">
                <CardContent className="p-4 sm:p-5 flex gap-3 sm:gap-4 items-start text-start">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-red-500/15 text-red-400 text-xs sm:text-sm font-bold flex items-center justify-center flex-shrink-0 mt-1">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm sm:text-base">{m.title}</p>
                    <p className="text-slate-400 text-xs sm:text-sm mt-1 leading-relaxed">{m.detail}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section (mirrors FAQPage schema exactly) */}
      <section id="faq" className="scroll-mt-24 py-8 sm:py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-5xl font-bold text-white mb-3 sm:mb-6">
              الأسئلة الشائعة
            </h2>
            <p className="text-sm sm:text-xl text-slate-300 max-w-3xl mx-auto">
              أكثر الأسئلة اللي نسمعها من العملاء قبل الشراء.
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {faq.map((item, index) => (
              <Card key={index} className="bg-gradient-to-bl from-slate-800/80 to-slate-900/80 border-slate-700 backdrop-blur-sm">
                <CardContent className="p-4 sm:p-8 text-start">
                  <h3 className="text-sm sm:text-lg font-bold text-white mb-2 sm:mb-3 flex items-start gap-2 sm:gap-3">
                    <span className="text-cyan-400 flex-shrink-0">س:</span>
                    {item.q}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-base leading-relaxed pe-5 sm:pe-7 m-0">
                    <span className="text-emerald-400 font-semibold">ج:</span> {item.a}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* When Your Laptop Starts Failing */}
      <section id="when-it-fails" className="scroll-mt-24 py-8 sm:py-16 px-4 sm:px-6 bg-slate-900/30 border-y border-slate-800">
        <div className="container mx-auto max-w-4xl">
          <SectionHeading id="when-it-fails-inner" kicker="حلول حقيقية" title="إذا اللابتوب خرب، مو شرط تشتري واحد جديد" icon={Wrench} />
          <Prose>
            <p>
              إذا اللابتوب: ما يشتغل، ما يشحن، يطفي فجأة، ترتفع حرارته، يصير بطيء تحت الضغط، أو أحد منافذه توقفت... لا تفترض مباشرة إن الـMotherboard لازم تتبدل.
            </p>
            <p>
              أحياناً المشكلة تكون في مكون واحد فقط (Capacitor أو MOSFET أو آي سي شحن)، وممكن إصلاح القطعة نفسها على اللوحة بدل تبديلها كاملة ودفع مبالغ طائلة. 
            </p>
            <p>
              في KCROC، نركز على تشخيص سبب المشكلة من الجذور باستخدام الكاميرات الحرارية والقياسات الدقيقة قبل ما نقترح عليك تبديل أي شيء. هدفنا نساعدك توفر تكلفة الاستبدال الكامل قدر الإمكان وننقذ ملفاتك من الضياع كلما كان ذلك ممكناً.
            </p>
            <p>
              نوفر خدمة استلام وتسليم مجانية في جميع محافظات الكويت. تقدر تكلمنا متى ما احتجت على الواتساب على رقم {business.telephone}.
            </p>
          </Prose>
          <div className="mt-6 flex justify-start">
            <Button
              size="lg"
              className="bg-gradient-to-l from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
              asChild
            >
              <a href={WA_DIAGNOSIS_LINK} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 me-2" />
                اطلب تشخيص مجاني لجهازك
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Author Box */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 bg-slate-900/30 border-y border-slate-800">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-slate-950/40 border-slate-800">
            <CardContent className="p-5 sm:p-8 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start text-start">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-bl from-cyan-500 to-blue-600 flex items-center justify-center text-xl sm:text-2xl font-bold text-white flex-shrink-0">
                ع
              </div>
              <div>
                <h3 className="text-white font-bold text-lg sm:text-xl">
                  <Link to="/author/imran" className="hover:text-cyan-400 transition-colors">كُتب بواسطة عمران ناطق</Link>
                </h3>
                <p className="text-cyan-400 text-xs sm:text-sm mb-2 sm:mb-3">
                  مهندس صيانة هاردوير، Kuwait Computer Repair On Call (KCROC)
                </p>
                <p className="text-slate-400 text-xs sm:text-sm mb-3">متخصص في:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 mb-3">
                  {[
                    'تشخيص وإصلاح اللوحات الأم (Motherboards)',
                    'Micro-Soldering وتتبع الدوائر',
                    'إصلاح مشاكل الحرارة في أجهزة القيمنق',
                    'صيانة حواسيب Apple ومشاكل الطاقة',
                  ].map((s, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-300 text-xs sm:text-sm">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" /> {s}
                    </li>
                  ))}
                </ul>
                <p className="text-slate-500 text-xs sm:text-sm flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> مقره في حولي، الكويت
                </p>
                <p className="text-slate-600 text-[11px] sm:text-xs mt-3">
                  المراجعة التقنية: فريق التشخيص في KCROC · آخر تحديث: أغسطس ٢٠٢٦
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <Card className="bg-gradient-to-bl from-cyan-600/20 via-blue-600/20 to-emerald-600/20 border-cyan-500/30 backdrop-blur-sm">
            <CardContent className="p-6 sm:p-12 text-center">
              <h2 className="text-2xl sm:text-5xl font-bold text-white mb-3 sm:mb-6 leading-tight">
                عندك جهاز خربان؟
              </h2>
              <p className="text-xs sm:text-xl text-slate-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
                حرارة عالية، تعليق، أو اللابتوب فجأة ما يشتغل أبداً؟ نحن نشخص ونصلح كافة الماركات — استلام وتسليم مجاني في جميع محافظات الكويت.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-sm sm:text-lg px-6 sm:px-8 py-5 sm:py-6 shadow-lg shadow-cyan-500/30 w-full sm:w-auto"
                  asChild
                >
                  <a href={WA_DIAGNOSIS_LINK} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 me-2" />
                    احجز استلام مجاني
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-600 text-white hover:bg-slate-800 hover:text-white text-sm sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto"
                  asChild
                >
                  <a href={`tel:+${business.telephone}`}>
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 me-2" />
                    اتصل بنا: +{business.telephone}
                  </a>
                </Button>
              </div>
              <div className="mt-6 sm:mt-10 pt-6 sm:pt-8 border-t border-cyan-500/20 flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-300">
                <span className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" /> {business.streetAddress}
                </span>
                <span className="flex items-center gap-2">
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" /> ضمان 30 يوم
                </span>
                <span className="flex items-center gap-2">
                  <Wrench className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" /> No Fix, No Fee
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      </article>
      </main>
    </div>
  );
}
