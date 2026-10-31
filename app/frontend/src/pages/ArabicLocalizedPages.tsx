// File: app/frontend/src/pages/ArabicLocalizedPages.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Apple, ArrowLeft, BadgeCheck, BatteryCharging, CheckCircle2, ChevronLeft,
  Cpu, Gamepad2, HardDrive, Laptop, MapPin, MessageCircle, Monitor,
  ShieldCheck, Truck, Wrench,
} from 'lucide-react';
import { KCROC_GRAPH } from '../data/graph';
import { SEOEngine } from '../core/components/SEOEngine';
import { KCROC_POLICY } from '../constants/businessPolicy';

const ARABIC_SERVICES_CORE_ORDER = [
  'srv-laptop',
  'srv-desktop-pc',
  'srv-hinge',
  'srv-macbook',
  'srv-gaming',
  'srv-gaming-laptop',
  'srv-motherboard',
  'srv-screen',
  'srv-battery',
  'srv-charging-port',
  'srv-gaming-laptop-cleaning',
  'srv-ssd-ram',
];

const ARABIC_SERVICES_FAQ_IDS = [
  'faq-ar-pricing',
  'faq-arabic-computer-technician',
  'faq-ar-hours',
  'faq-ar-laptop-repair-process',
] as const;

const HOME_SERVICES = [
  { title: 'تصليح اللابتوب في الكويت', description: 'إصلاح أعطال عدم التشغيل والشحن والحرارة والشاشات والمفصلات لمختلف الماركات.', path: '/ar/laptop-repair-kuwait', icon: Laptop },
  { title: 'تصليح كمبيوتر ألعاب وبي سي قيمنق (Gaming PC)', description: 'حل مشاكل الحرارة والطاقة والأداء وصيانة مكونات الكمبيوتر المخصص للألعاب.', path: '/ar/gaming-pc-repair-kuwait', icon: Gamepad2 },
  { title: 'إصلاح المذربورد واللوحة الأم (Micro-Soldering)', description: 'إصلاح دوائر الطاقة والشحن وتبديل المكونات الإلكترونية التالفة على مستوى القطعة.', path: '/ar/motherboard-repair-kuwait', icon: Cpu },
  { title: 'تصليح ماك بوك (MacBook Air وPro)', description: 'إصلاح أعطال اللوحة الأم والشحن والطاقة والشاشات والبطاريات لموديلات MacBook Air وPro.', path: '/ar/macbook-repair-kuwait', icon: Apple },
  { title: 'تبديل وتصليح شاشة اللابتوب', description: 'استبدال الشاشة المتضررة وإصلاح أعطال الإضاءة والكابلات بعد تحديد القطعة المناسبة.', path: '/ar/laptop-screen-repair-kuwait', icon: Monitor },
  { title: 'ترقية SSD وRAM', description: 'ترقية التخزين إلى SSD والذاكرة RAM لتحسين سرعة الإقلاع والاستجابة بعد التأكد من التوافق.', path: '/ar/ssd-ram-upgrade-kuwait', icon: HardDrive },
];

const ARABIC_AREAS = [
  { label: 'حولي', path: '/ar/computer-repair-hawalli' },
  { label: 'السالمية', path: '/ar/computer-repair-salmiya' },
  { label: 'الفروانية', path: '/ar/computer-repair-farwaniya' },
  { label: 'الجهراء', path: '/ar/computer-repair-jahra' },
  { label: 'مدينة الكويت', path: '/ar/computer-repair-kuwait-city' },
];

const HOME_PROMISES = [
  { title: 'تشخيص مجاني', text: 'اعرف العطل والتكلفة قبل الموافقة.', icon: CheckCircle2 },
  { title: 'استلام وتوصيل مجاني', text: 'من منزلك أو مكتبك إلى مختبر حولي.', icon: Truck },
  { title: `ضمان ${KCROC_POLICY.warranty.durationDays} يومًا`, text: 'على الإصلاحات المكتملة.', icon: ShieldCheck },
];

export function ArabicHomePage() {
  const homepage = KCROC_GRAPH.pages?.find((page) => page.id === 'page-ar-home');
  const homepageFaqs = (homepage?.featuredFAQIds ?? [])
    .map((id) => KCROC_GRAPH.faqs.find((faq) => faq.id === id))
    .filter((faq): faq is NonNullable<typeof faq> => Boolean(faq));

  return (
    <>
      <SEOEngine entityId="page-ar-home" />
      <div dir="rtl" lang="ar-KW" className="min-h-screen bg-transparent pb-20 text-slate-100">
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,128,77,0.18),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.10),transparent_45%)]" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-32 sm:px-6 sm:pb-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-8">
            <div>
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#c9804d]/30 bg-[#c9804d]/10 px-4 py-2 text-sm font-bold text-[#efc19c]">
                <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                مختبر متخصص في إصلاح المذربورد والمايكرو سولدرينج • استلام وتوصيل مجاني في الكويت
              </p>
              <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                تصليح الكمبيوتر واللابتوب في الكويت — نصلح المذربورد على مستوى القطعة
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
                إصلاح احترافي لأجهزة اللابتوب وماك بوك (MacBook) وكمبيوترات الألعاب (Gaming PC) داخل مختبر KCROC في حولي. نصلح دوائر المذربورد والشحن والطاقة بتقنيات المايكرو سولدرينج (Micro-Soldering)، مع استلام وتوصيل مجاني من منزلك أو مكتبك.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={`https://wa.me/${KCROC_GRAPH.business?.telephone}`} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#c9804d] px-6 py-3 font-extrabold text-[#101114] transition hover:bg-[#dfa06f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#efc19c]">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  راسلنا عبر واتساب
                </a>
                <Link to="/ar/near-me" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3 font-bold text-white transition hover:border-[#c9804d]/60 hover:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#efc19c]">
                  <Truck className="h-4 w-4" aria-hidden="true" /> احجز استلام مجاني
                </Link>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {HOME_PROMISES.map(({ title, text, icon: Icon }) => (
                <div key={title} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-slate-950/65 p-5 shadow-lg shadow-black/10">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#c9804d]/25 bg-[#c9804d]/10 text-[#efc19c]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="font-extrabold text-white">{title}</h2>
                    <p className="mt-1 text-sm leading-6 text-slate-400">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="ar-home-services" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold text-[#efc19c]">الخدمات الرئيسية</p>
              <h2 id="ar-home-services" className="mt-2 text-3xl font-black text-white sm:text-4xl">اختر الخدمة المناسبة لجهازك</h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-400">إصلاحات مركّزة حسب نوع الجهاز والعطل، من المذربورد إلى الشاشات والترقيات.</p>
            </div>
            <Link to="/ar/services" className="inline-flex min-h-11 items-center gap-2 font-bold text-[#efc19c] hover:text-white">
              كل الخدمات <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {HOME_SERVICES.map(({ title, description, path, icon: Icon }) => (
              <Link key={path} to={path} className="group flex h-full items-start gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-5 transition hover:-translate-y-0.5 hover:border-[#c9804d]/45 hover:bg-slate-900/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#efc19c]">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-[#efc19c] group-hover:bg-[#c9804d]/10">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-extrabold text-white">{title}</span>
                  <span className="mt-2 block text-sm leading-6 text-slate-400">{description}</span>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[#efc19c]">تفاصيل الخدمة <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /></span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-slate-950/35">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <div>
              <p className="text-sm font-bold text-[#efc19c]">كيف تتم الخدمة؟</p>
              <h2 className="mt-2 text-3xl font-black text-white">من الاستلام إلى الاختبار</h2>
              <p className="mt-4 leading-7 text-slate-400">ثلاث خطوات واضحة من استلام الجهاز إلى إعادته بعد الاختبار.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ['١', 'استلام الجهاز', 'نستلمه من منزلك أو مكتبك في مناطق الخدمة.'],
                ['٢', 'تحديد العطل والتكلفة', 'نوضح سبب المشكلة وتكلفة الإصلاح.'],
                ['٣', 'إصلاح واختبار', 'ننفذ الإصلاح المتفق عليه ونختبر الجهاز قبل إعادته.'],
              ].map(([number, title, text]) => (
                <div key={number} className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c9804d]/15 font-black text-[#efc19c]">{number}</span>
                  <h3 className="mt-4 font-extrabold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="ar-home-faq" className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8" lang="ar-KW" dir="rtl">
          <div className="mb-6">
            <p className="text-sm font-bold text-[#efc19c]">قبل أن تحجز</p>
            <h2 id="ar-home-faq" className="mt-2 text-2xl font-black text-white sm:text-3xl">أسئلة تهمك عن إصلاح المذربورد والاستلام والبيانات والتكلفة</h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-400">إجابات مباشرة تساعدك على اتخاذ قرار الإصلاح.</p>
          </div>
          <div className="space-y-3">
            {homepageFaqs.map((faq) => (
              <details key={faq.id} className="group rounded-2xl border border-white/10 bg-slate-900/60 p-4 sm:p-5">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-bold leading-7 text-white marker:hidden">
                  <span>{faq.title}</span>
                  <span aria-hidden="true" className="shrink-0 text-[#efc19c] transition-transform group-open:rotate-180">⌄</span>
                </summary>
                <p className="mt-3 border-t border-white/10 pt-3 text-sm leading-7 text-slate-300 sm:text-base">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section aria-labelledby="ar-home-areas" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#c9804d]/20 bg-[#c9804d]/10 text-[#efc19c]">
              <MapPin className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h2 id="ar-home-areas" className="text-2xl font-black text-white sm:text-3xl">استلام وتوصيل في مناطق الكويت</h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-400">المختبر الفعلي في حولي، مع ترتيب الاستلام والتوصيل من مناطق الخدمة المختلفة. اختر منطقتك لمعرفة التفاصيل.</p>
              <ul aria-label="مناطق خدمة الاستلام والتوصيل" className="mt-5 flex list-none flex-wrap gap-2 p-0">
                {ARABIC_AREAS.map((area) => (
                  <li key={area.path}>
                    <Link to={area.path} className="inline-flex min-h-10 items-center rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-slate-200 transition hover:border-[#c9804d]/50 hover:text-[#efc19c]">{area.label}</Link>
                  </li>
                ))}
                <li>
                  <Link to="/ar/near-me" className="inline-flex min-h-10 items-center rounded-full border border-[#c9804d]/30 bg-[#c9804d]/10 px-4 py-2 text-sm font-bold text-[#efc19c]">اعرف طريقة الاستلام</Link>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#c9804d]/25 bg-gradient-to-l from-[#c9804d]/10 via-slate-900/70 to-slate-900/70 p-7 sm:p-10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-black text-white sm:text-3xl">جهازك متوقف؟ ابدأ بمراسلتنا</h2>
                <p className="mt-3 max-w-2xl leading-7 text-slate-300">أرسل نوع الجهاز والعطل ومنطقتك، وسنساعدك في تحديد الخطوة التالية.</p>
              </div>
              <a href={`https://wa.me/${KCROC_GRAPH.business?.telephone}`} target="_blank" rel="noreferrer" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#c9804d] px-6 py-3 font-extrabold text-[#101114] transition hover:bg-[#dfa06f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#efc19c]">
                <MessageCircle className="h-5 w-5" aria-hidden="true" /> راسلنا عبر واتساب
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

const ARABIC_SERVICE_COPY: Record<string, { title: string; description: string; href: string }> = {
  'laptop-repair-kuwait': { title: 'تصليح اللابتوب في الكويت', description: 'تشخيص أعطال التشغيل والشحن والحرارة والشاشة والبطارية ومكونات الجهاز.', href: '/ar/laptop-repair-kuwait' },
  'desktop-pc-repair-kuwait': { title: 'تصليح الكمبيوتر المكتبي وPC', description: 'تشخيص أعطال الطاقة والشاشة والحرارة والرام والتخزين والمذربورد في الكمبيوتر المكتبي الكامل.', href: '/ar/desktop-pc-repair-kuwait' },
  'laptop-hinge-repair-kuwait': { title: 'تصليح مفصلات وهيكل اللابتوب', description: 'فحص المفصلات وقواعد التثبيت والغطاء والإطار وكابل الشاشة قبل تحديد طريقة الإصلاح.', href: '/ar/laptop-hinge-repair-kuwait' },
  'gaming-laptop-cleaning-kuwait': { title: 'تنظيف لابتوب الألعاب وصيانة التبريد', description: 'تنظيف المراوح والمشتت وفحص المواد الحرارية ثم اختبار الحرارة حسب الموديل.', href: '/ar/gaming-laptop-cleaning-kuwait' },
  'motherboard-repair-kuwait': { title: 'إصلاح اللوحة الأم والمذربورد', description: 'فحص أعطال الطاقة والشحن والمكونات الإلكترونية عندما يكون الإصلاح مناسبًا.', href: '/ar/motherboard-repair-kuwait' },
  'gaming-pc-repair-kuwait': { title: 'تصليح Gaming PC', description: 'تشخيص مشاكل الطاقة والرسوميات والحرارة والاستقرار في الكمبيوتر المخصص للألعاب.', href: '/ar/gaming-pc-repair-kuwait' },
  'laptop-screen-repair-kuwait': { title: 'تصليح شاشة اللابتوب', description: 'فحص الشاشة السوداء أو المكسورة أو الوامضة والكابل قبل تحديد الحل.', href: '/ar/laptop-screen-repair-kuwait' },
  'macbook-repair-kuwait': { title: 'تصليح MacBook', description: 'فحص أعطال الطاقة والشحن واللوحة والشاشة والبطارية حسب الموديل.', href: '/ar/macbook-repair-kuwait' },
  'macbook-screen-replacement-kuwait': { title: 'تبديل شاشة MacBook', description: 'تحديد موديل الجهاز ومواصفات الشاشة والتكلفة قبل الموافقة على العمل.', href: '/ar/macbook-screen-replacement-kuwait' },
  'battery-replacement-kuwait': { title: 'تبديل بطارية اللابتوب', description: 'فحص أعراض ضعف البطارية والتحقق من توافق القطعة مع موديل الجهاز.', href: '/ar/battery-replacement-kuwait' },
  'ssd-ram-upgrade-kuwait': { title: 'ترقية SSD وRAM', description: 'ترقية التخزين أو الذاكرة عند توافقها مع الجهاز، مع توضيح تكلفة القطع والعمل.', href: '/ar/ssd-ram-upgrade-kuwait' },
  'gaming-laptop-repair-kuwait': { title: 'تصليح Gaming Laptop', description: 'تشخيص مشاكل الحرارة والطاقة والأداء والشاشة في أجهزة الألعاب المحمولة.', href: '/ar/gaming-laptop-repair-kuwait' },
  'laptop-charging-port-repair-kuwait': { title: 'إصلاح منفذ شحن اللابتوب', description: 'فحص الشاحن والمنفذ ومسار الطاقة لتحديد سبب عدم الشحن.', href: '/ar/laptop-charging-port-repair-kuwait' },
  'laptop-keyboard-replacement-kuwait': { title: 'تبديل كيبورد اللابتوب', description: 'تحديد العطل وموديل الكيبورد والتكلفة قبل تنفيذ الاستبدال.', href: '/ar/laptop-keyboard-replacement-kuwait' },
  'laptop-liquid-damage-repair-kuwait': { title: 'إصلاح أضرار السوائل', description: 'فحص التآكل والدوائر المتأثرة وتقييم الجهاز قبل محاولة تشغيله مجددًا.', href: '/ar/laptop-liquid-damage-repair-kuwait' },
};

const SERVICE_ICON_MAP: Record<string, React.ElementType> = {
  apple: Apple,
  laptop: Laptop,
  gaming: Gamepad2,
  cpu: Cpu,
  monitor: Monitor,
  battery: BatteryCharging,
};

export function ArabicServicesPage() {
  const services = KCROC_GRAPH.services.flatMap((service) => {
    const copy = ARABIC_SERVICE_COPY[service.slug];
    return copy ? [{ service, copy }] : [];
  }).sort((a, b) => {
    const rank = (id: string) => {
      const index = ARABIC_SERVICES_CORE_ORDER.indexOf(id);
      return index < 0 ? ARABIC_SERVICES_CORE_ORDER.length : index;
    };
    return rank(a.service.id) - rank(b.service.id);
  });
  const serviceFaqs = ARABIC_SERVICES_FAQ_IDS
    .map((id) => KCROC_GRAPH.faqs?.find((faq) => faq.id === id))
    .filter((faq) => faq !== undefined);

  return (
    <>
      <SEOEngine entityId="page-ar-services" />
      <div dir="rtl" lang="ar-KW" className="min-h-screen bg-transparent pb-20 pt-28 text-slate-100 sm:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="مسار التنقل" className="mb-7 text-sm text-slate-500">
            <Link to="/ar" className="transition hover:text-[#efc19c]">الرئيسية</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-slate-300">الخدمات</span>
          </nav>

          <header className="max-w-4xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#c9804d]/25 bg-[#c9804d]/10 px-4 py-2 text-sm font-bold text-[#efc19c]">
              <Wrench className="h-4 w-4" aria-hidden="true" />
              خدمات تصليح متخصصة في الكويت
            </p>
            <h1 className="mt-5 text-4xl font-black leading-tight text-white sm:text-5xl">خدمات تصليح الكمبيوتر واللابتوب في الكويت</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
              اختر الخدمة الأقرب لمشكلة جهازك. نفحص الأعراض في مختبر KCROC بحولي، ونوضح خيارات الإصلاح والتكلفة قبل بدء أي عمل مدفوع. يتوفر استلام وتوصيل مجاني من المنزل أو المكتب داخل الكويت.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link to="/ar/near-me" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#c9804d] px-6 py-3 font-extrabold text-[#101114] transition hover:bg-[#dfa06f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#efc19c]">
                <Truck className="h-5 w-5" aria-hidden="true" /> ترتيب الاستلام والتوصيل
              </Link>
              <Link to="/ar/pricing" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 px-6 py-3 font-bold text-white transition hover:border-[#c9804d]/50 hover:bg-white/[0.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#efc19c]">
                مراجعة الأسعار الإرشادية
              </Link>
            </div>
          </header>

          <section aria-label="الخدمات الأساسية" className="mt-10 grid gap-4 sm:grid-cols-3">
            <Link to="/ar/computer-repair-kuwait" className="group rounded-2xl border border-white/10 bg-slate-900/55 p-5 transition hover:border-[#c9804d]/45 hover:bg-slate-900/90">
              <h2 className="text-lg font-extrabold text-white group-hover:text-[#efc19c]">تصليح الكمبيوتر في الكويت</h2>
              <p className="mt-2 text-sm leading-7 text-slate-400">ابدأ من صفحة الكمبيوتر العامة لأعطال أجهزة المكتب والكمبيوتر والألعاب واللوحة الأم.</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#efc19c]">عرض خدمة الكمبيوتر <ChevronLeft className="h-4 w-4" aria-hidden="true" /></span>
            </Link>
            <Link to="/ar/laptop-repair-kuwait" className="group rounded-2xl border border-white/10 bg-slate-900/55 p-5 transition hover:border-[#c9804d]/45 hover:bg-slate-900/90">
              <h2 className="text-lg font-extrabold text-white group-hover:text-[#efc19c]">تصليح اللابتوب في الكويت</h2>
              <p className="mt-2 text-sm leading-7 text-slate-400">اختر صفحة اللابتوب لأعطال التشغيل والشحن والشاشة والبطارية والحرارة ولوحة المفاتيح.</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#efc19c]">عرض خدمة اللابتوب <ChevronLeft className="h-4 w-4" aria-hidden="true" /></span>
            </Link>
            <Link to="/ar/pricing" className="group rounded-2xl border border-white/10 bg-slate-900/55 p-5 transition hover:border-[#c9804d]/45 hover:bg-slate-900/90">
              <h2 className="text-lg font-extrabold text-white group-hover:text-[#efc19c]">أسعار التصليح</h2>
              <p className="mt-2 text-sm leading-7 text-slate-400">راجع أجور العمل الإرشادية وكيف يتم تأكيد تكلفة القطع قبل الإصلاح.</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#efc19c]">عرض الأسعار <ChevronLeft className="h-4 w-4" aria-hidden="true" /></span>
            </Link>
          </section>

          <section aria-labelledby="ar-services-grid" className="mt-12">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 id="ar-services-grid" className="text-2xl font-black text-white sm:text-3xl">تصفح خدمات الإصلاح</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">تفتح كل بطاقة صفحة عربية مخصصة للخدمة نفسها.</p>
              </div>
              <span className="text-sm text-slate-500">{services.length} خدمة بصفحة عربية مخصصة</span>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map(({ service, copy }) => {
                const Icon = SERVICE_ICON_MAP[service.iconKey] || Wrench;
                return (
                  <Link key={service.id} to={copy.href} className="group flex h-full flex-col rounded-2xl border border-white/10 bg-slate-900/65 p-6 transition hover:-translate-y-0.5 hover:border-[#c9804d]/45 hover:bg-slate-900/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#efc19c]">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#c9804d]/20 bg-[#c9804d]/10 text-[#efc19c]">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-xl font-extrabold text-white transition-colors group-hover:text-[#efc19c]">{copy.title}</h3>
                    <p className="mt-3 flex-1 leading-7 text-slate-400">{copy.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#efc19c]">تفاصيل الخدمة <ChevronLeft className="h-4 w-4" aria-hidden="true" /></span>
                  </Link>
                );
              })}
            </div>
          </section>

          <section aria-labelledby="ar-services-faq-heading" className="mt-14 border-t border-white/10 pt-10">
            <div className="mb-7 max-w-3xl">
              <h2 id="ar-services-faq-heading" className="text-2xl font-black text-white sm:text-3xl">أسئلة شائعة عن خدمات تصليح الكمبيوتر في الكويت</h2>
              <p className="mt-3 leading-7 text-slate-400">إجابات حول الأسعار والاستلام والتوصيل وخطوات الإصلاح قبل اختيار الخدمة المناسبة.</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {serviceFaqs.map((faq) => (
                <details key={faq.id} className="group rounded-xl border border-white/10 bg-slate-900/45 p-5">
                  <summary className="cursor-pointer list-none font-extrabold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#efc19c]">
                    <span className="inline-flex w-full items-center justify-between gap-4">
                      {faq.title}
                      <ChevronLeft className="h-4 w-4 flex-shrink-0 text-[#efc19c] transition-transform group-open:-rotate-90" aria-hidden="true" />
                    </span>
                  </summary>
                  <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-7 text-slate-300">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="mt-14 grid gap-5 border-t border-white/10 pt-10 md:grid-cols-3" aria-label="خطوات الخدمة">
            <div className="rounded-2xl border border-white/10 bg-slate-900/45 p-6">
              <CheckCircle2 className="h-6 w-6 text-emerald-400" aria-hidden="true" />
              <h2 className="mt-4 font-extrabold text-white">فحص أولي مجاني</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">نحدد مسار المشكلة ونشرح الخطوة التالية بدون التزام بالموافقة على الإصلاح.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/45 p-6">
              <Truck className="h-6 w-6 text-emerald-400" aria-hidden="true" />
              <h2 className="mt-4 font-extrabold text-white">استلام من منطقتك</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">الإصلاح في مختبر حولي، مع ترتيب الاستلام والتوصيل عبر مناطق الكويت.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/45 p-6">
              <MapPin className="h-6 w-6 text-emerald-400" aria-hidden="true" />
              <h2 className="mt-4 font-extrabold text-white">السعر بعد التشخيص</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">نوضح تكلفة العمل والقطع المطلوبة قبل التنفيذ، وتُطبق شروط ضمان 30 يومًا على الإصلاحات المكتملة.</p>
            </div>
          </section>

          <section className="mt-10 flex flex-col gap-4 rounded-3xl border border-[#c9804d]/25 bg-[#c9804d]/[0.07] p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
            <div>
              <h2 className="text-2xl font-black text-white">غير متأكد من الخدمة المناسبة؟</h2>
              <p className="mt-3 max-w-2xl leading-7 text-slate-300">صف المشكلة ونوع الجهاز ومنطقتك، وسنساعدك في تحديد الخطوة المناسبة للفحص والاستلام.</p>
            </div>
            <Link to="/ar/computer-repair-kuwait" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#c9804d] px-6 py-3 font-extrabold text-[#101114] transition hover:bg-[#dfa06f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#efc19c]">
              استعراض خدمات الكمبيوتر <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
