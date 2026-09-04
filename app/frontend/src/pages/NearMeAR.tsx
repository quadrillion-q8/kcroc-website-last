// File: app/frontend/src/pages/NearMeAR.tsx
//
// 🚀 ARABIC HUB PAGE — real, standalone, crawlable Arabic near-me + services
// hub at /ar/near-me. Previously the site's entire Arabic footprint was one
// blog post plus a single FAQ section anchored inside the English /near-me
// page (see the "Arabic local-intent section" in NearMe.tsx) — no dedicated
// URL, no hreflang, no independent canonical. Despite that, "فني كمبيوتر"
// already ranks #2 in GSC with ~900 monthly impressions, which is the
// strongest content-ROI signal in the account. This page gives that demand
// a real home instead of a scroll-anchor inside an English page.
//
// SEO wiring: entity `page-near-me-ar` in graph.ts carries `locale: 'ar_KW'`
// and `alternates` pointing back to the English `/near-me` page (and vice
// versa). SEOEngine reads `locale` to automatically set `dir="rtl"` and the
// correct `lang` attribute, and emits the hreflang <link> tags from
// `alternates` — both were previously unused/unwired mechanisms.
import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin, Truck, ShieldCheck, Laptop, Monitor, Cpu, Apple,
  Gamepad2, ArrowRight, MessageCircle, Star, Home as HomeIcon, Clock, BadgeCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SEOEngine } from '../core/components/SEOEngine';
import { KCROC_GRAPH } from '../data/graph';
import { IMAGES } from '../constants/images';

// Arabic labels for existing (English-slugged) service pages — the
// underlying service pages stay English for now, but Arabic visitors get
// Arabic labels/descriptions pointing to them, same pattern already used in
// NearMe.tsx's embedded Arabic section.
const SERVICES_AR: { slug: string; icon: React.ElementType; title: string; description: string }[] = [
  { slug: 'laptop-repair-kuwait', icon: Laptop, title: 'تصليح لابتوب', description: 'تشخيص وإصلاح أعطال اللابتوب، سواء كانت في الهاردوير أو السوفتوير، لمختلف الماركات.' },
  { slug: 'macbook-repair-kuwait', icon: Apple, title: 'تصليح ماك بوك', description: 'إصلاح أعطال MacBook واللوحة المنطقية، بما في ذلك إصلاحات الميكروسولدرينج عند الحاجة.' },
  { slug: 'gaming-pc-repair-kuwait', icon: Gamepad2, title: 'تصليح كمبيوتر قيمنق', description: 'تشخيص وإصلاح أجهزة الألعاب المكتبية، ومشاكل كروت الشاشة والتبريد والطاقة وغيرها.' },
  { slug: 'motherboard-repair-kuwait', icon: Cpu, title: 'تصليح اللوحة الأم', description: 'إصلاح اللوحة الأم على مستوى القطعة الإلكترونية بدل استبدال اللوحة بالكامل، متى ما كان ذلك ممكنًا.' },
  { slug: 'laptop-screen-repair-kuwait', icon: Monitor, title: 'تغيير شاشة اللابتوب', description: 'تغيير شاشات اللابتوب المكسورة أو المتضررة، وإصلاح مشاكل الخطوط أو الإضاءة حسب حالة الشاشة.' },
];

const AREAS_AR = [
  { slug: 'hawalli', title: 'حولي' },
  { slug: 'farwaniya', title: 'الفروانية' },
  { slug: 'salmiya', title: 'السالمية' },
  { slug: 'ahmadi', title: 'الأحمدي' },
  { slug: 'jahra', title: 'الجهراء' },
  { slug: 'fahaheel', title: 'الفحيحيل' },
];

export default function NearMeAR() {
  const business = KCROC_GRAPH.business;
  const page = KCROC_GRAPH.pages.find((p) => p.id === 'page-near-me-ar');
  const faqs = (page?.featuredFAQIds ?? [])
    .map((id) => KCROC_GRAPH.faqs.find((faq) => faq.id === id))
    .filter(Boolean);

  if (!business || !page) return null;

  const waLink = `https://wa.me/${business.telephone}?text=${encodeURIComponent(
    'مرحباً KCROC، أبحث عن فني كمبيوتر بالقرب مني في الكويت وأحتاج ترتيب استلام للجهاز.'
  )}`;

  return (
    <div className="w-full min-h-screen bg-transparent text-slate-200" dir="rtl" lang="ar">
      <SEOEngine entityId="page-near-me-ar" />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-800 px-4 pb-14 pt-10 sm:px-6 sm:pb-24 sm:pt-16 lg:pt-24">
        <div className="absolute inset-0 bg-gradient-to-bl from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_15%,rgba(34,211,238,0.10),transparent_45%)]" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs font-medium text-slate-400 sm:text-sm">
            <ol className="flex items-center gap-2">
              <li><Link to="/" className="hover:text-cyan-400">الرئيسية</Link></li>
              <li className="text-slate-600">/</li>
              <li aria-current="page" className="text-cyan-400">فني كمبيوتر بالقرب مني</li>
            </ol>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_.85fr] lg:gap-14">
            <div className="max-w-3xl">
              <Badge className="mb-5 border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-cyan-400">
                <MapPin className="ml-2 inline h-3.5 w-3.5" aria-hidden="true" /> خدمة محلية في الكويت
              </Badge>
              <h1 className="text-4xl font-black leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-6xl">
                فني كمبيوتر وتصليح لابتوب <span className="text-cyan-400">بالقرب مني</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-loose text-slate-300 sm:text-lg">
                تبحث عن فني كمبيوتر أو فني تصليح لابتوب قريب منك في الكويت؟ توفّر لك KCROC إصلاح الكمبيوتر واللابتوب والماك بوك وأجهزة الألعاب من مختبرنا المركزي في حولي، مع استلام وتوصيل مجاني لجهازك من أي منطقة في الكويت.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="w-full bg-cyan-500 font-black text-slate-950 hover:bg-cyan-400 sm:w-auto" asChild>
                  <Link to="/book"><Truck className="ml-2 h-5 w-5" aria-hidden="true" /> احجز استلام مجاني</Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full border-slate-700 text-white hover:bg-slate-800 sm:w-auto" asChild>
                  <a href={waLink} target="_blank" rel="noopener noreferrer"><MessageCircle className="ml-2 h-5 w-5" aria-hidden="true" /> تواصل عبر واتساب</a>
                </Button>
              </div>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400">
                <span className="inline-flex items-center gap-1.5"><Star className="h-4 w-4 fill-current text-amber-400" aria-hidden="true" /> تقييم {business.aggregateRating.ratingValue}★</span>
                <span>+{business.aggregateRating.reviewCount} تقييم</span>
                <span>استلام وتوصيل مجاني</span>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
              <img
                src={IMAGES.brand.technicians.src}
                alt="فنيو KCROC أثناء فحص وإصلاح الأجهزة في مختبرنا بحولي، الكويت"
                width={IMAGES.brand.technicians.width}
                height={IMAGES.brand.technicians.height}
                loading="eager"
                className="h-72 w-full object-cover sm:h-80"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent px-5 pb-5 pt-16">
                <p className="text-sm font-bold text-white">مختبر حولي المركزي</p>
                <p className="mt-1 text-xs text-slate-300">نفحص ونصلح الأجهزة في مختبرنا بحولي، باستخدام معدات تشخيص متخصصة وأدوات إصلاح دقيقة.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / USPs */}
      <section className="border-b border-slate-800/60 px-4 py-12 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-cyan-400">خدمة محلية بقدرة إصلاح حقيقية</p>
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">فني قريب منك، وإصلاح حقيقي لجهازك</h2>
            <p className="mt-4 leading-loose text-slate-400">عند البحث عن فني كمبيوتر قريب منك، الأهم ليس فقط قرب المحل، بل أن يعرف الفني كيف يشخّص العطل بدقة، يشرح لك المشكلة بوضوح، ويسهّل عليك استلام جهازك وتسليمه.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Cpu, title: 'إصلاح على مستوى القطعة', desc: 'إذا كان العطل في قطعة إلكترونية داخل اللوحة الأم، نحاول إصلاح القطعة نفسها بدل استبدال اللوحة كاملة، وهذا يوفر عليك تكلفة اللوحة الجديدة.' },
              { icon: ShieldCheck, title: 'إذا لم يمكن الإصلاح، فلا رسوم عليك', desc: 'إذا تبيّن أن جهازك لا يمكن إصلاحه بتكلفة مناسبة، لا تتحمّل أي رسوم فحص أو تشخيص.' },
              { icon: Truck, title: 'استلام وتوصيل مجاني', desc: 'نرتب استلام جهازك من المنزل أو المكتب في حولي والسالمية ومدينة الكويت والفروانية والأحمدي والجهراء وما حولها.' },
              { icon: BadgeCheck, title: 'خصوصية بياناتك تهمّنا', desc: 'نركّز على فحص الجهاز وإصلاح العطل فقط، وفنيونا لا يحتاجون إلى فتح ملفاتك الشخصية أثناء الإصلاح.' },
            ].map((usp) => (
              <div key={usp.title} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-950 text-cyan-400"><usp.icon className="h-5 w-5" aria-hidden="true" /></div>
                <h3 className="font-bold text-white">{usp.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{usp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="border-b border-slate-800/60 bg-slate-900/30 px-4 py-12 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-cyan-400">مناطق التغطية</p>
            <h2 className="text-3xl font-black text-white sm:text-4xl">تصليح كمبيوتر قريب منك في جميع مناطق الكويت</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-400">اختر منطقتك لتطّلع على تفاصيل الخدمة المحلية، أو تواصل معنا مباشرة لترتيب استلام جهازك.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {AREAS_AR.map((area) => (
              <Link key={area.slug} to={`/location/${area.slug}`} className="group rounded-2xl border border-slate-800 bg-slate-950/70 p-5 transition hover:border-cyan-500/50 hover:bg-slate-900">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-cyan-400"><MapPin className="h-4 w-4" aria-hidden="true" /><span className="text-xs font-bold uppercase tracking-wider">منطقة خدمة</span></div>
                    <h3 className="mt-2 text-xl font-black text-white">تصليح كمبيوتر {area.title}</h3>
                  </div>
                  <ArrowRight className="mt-1 h-5 w-5 shrink-0 rotate-180 text-slate-600 transition group-hover:-translate-x-1 group-hover:text-cyan-400" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="px-4 py-12 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-cyan-400">ماذا نصلح</p>
              <h2 className="text-3xl font-black text-white sm:text-4xl">خدمات تصليح الكمبيوتر واللابتوب</h2>
            </div>
            <Link to="/services" className="inline-flex items-center text-sm font-bold text-cyan-400 hover:text-cyan-300">جميع الخدمات <ArrowRight className="mr-1 h-4 w-4 rotate-180" aria-hidden="true" /></Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES_AR.map((service) => (
              <Link key={service.slug} to={`/${service.slug}`} className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-5 transition hover:border-cyan-500/40 hover:bg-slate-900">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-950 text-cyan-400"><service.icon className="h-5 w-5" aria-hidden="true" /></div>
                  <div><h3 className="font-bold text-white group-hover:text-cyan-300">{service.title}</h3><p className="mt-1 text-sm leading-relaxed text-slate-400">{service.description}</p></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-slate-800/60 bg-slate-900/40 px-4 py-12 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-cyan-400">خطوات بسيطة</p>
            <h2 className="text-3xl font-black text-white sm:text-4xl">كيف تتم عملية الإصلاح؟</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ['١', 'أخبرنا بالمشكلة', 'راسلنا على واتساب واذكر منطقتك ونوع جهازك والمشكلة التي تواجهها، وسنساعدك في تحديد الخطوة المناسبة.'],
              ['٢', 'نستلم جهازك', 'نرتب لك استلامًا مجانيًا من المنزل أو المكتب في أي منطقة بالكويت، ويصل الجهاز إلى مختبرنا في حولي.'],
              ['٣', 'نفحص، نصلح، ونسلّمك الجهاز', 'نفحص الجهاز ونحدد العطل، ونوضح لك تكلفة الإصلاح قبل البدء. بعد موافقتك ننفّذ الإصلاح، نختبر الجهاز، ثم نرتّب توصيله إليك.'],
            ].map(([number, title, text]) => (
              <div key={number} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 font-black text-slate-950">{number}</div>
                <h3 className="text-lg font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hours note */}
      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/40 px-5 py-4 text-sm text-slate-300">
          <Clock className="h-5 w-5 shrink-0 text-cyan-400" aria-hidden="true" />
          <p>مختبرنا مفتوح يوميًا من 10:00 صباحًا إلى 10:00 مساءً. إذا واجهت مشكلة في الكمبيوتر أو اللابتوب، راسلنا على واتساب في أي وقت، وسنرد عليك في أقرب فرصة خلال ساعات العمل.</p>
        </div>
      </section>

      {/* FAQs */}
      <section className="border-t border-slate-800/60 bg-slate-900/30 px-4 py-12 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-cyan-400">أسئلة شائعة</p>
            <h2 className="text-3xl font-black text-white sm:text-4xl">أسئلة عن فني الكمبيوتر القريب مني</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => faq && (
              <details key={faq.id} className="group rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
                <summary className="cursor-pointer list-none pl-8 font-bold text-white marker:hidden">
                  {faq.title}
                  <span className="float-left text-cyan-400 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-3xl text-sm leading-loose text-slate-400">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-14 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-cyan-500/20 bg-slate-900/80 p-7 text-center shadow-2xl sm:p-12">
          <HomeIcon className="mx-auto h-8 w-8 text-cyan-400" aria-hidden="true" />
          <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">تحتاج فني كمبيوتر قريب منك؟</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-loose text-slate-400">أخبرنا بمنطقتك ونوع جهازك والمشكلة التي تواجهها، وسنساعدك في تحديد الخطوة المناسبة. وإذا احتاج الجهاز إلى فحص، سنرتب لك الاستلام من المنزل أو المكتب.</p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" className="bg-cyan-500 font-black text-slate-950 hover:bg-cyan-400" asChild><Link to="/book">احجز استلام مجاني</Link></Button>
            <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-800" asChild><a href={waLink} target="_blank" rel="noopener noreferrer">تواصل عبر واتساب</a></Button>
          </div>
          <p className="mt-5 text-xs text-slate-500">مختبر الإصلاح المركزي: {business.streetAddress}، {business.addressLocality}، الكويت</p>
        </div>
      </section>
    </div>
  );
}
