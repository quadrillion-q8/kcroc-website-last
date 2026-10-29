// File: app/frontend/src/pages/NearMeAR.tsx
//
// ARABIC NEAR-ME PAGE — /ar/near-me is intentionally focused on proximity,
// pickup/delivery logistics, and the central Hawalli repair lab. The broad
// technician/computer-repair intent is assigned to /ar/computer-repair-kuwait
// and linked here so the two pages have clearer search intent and user paths.
//
// SEO wiring: `page-near-me-ar` in graph.ts has locale `ar_KW` and reciprocal
// alternates with the English `/near-me` page. SEOEngine emits the language
// metadata from that source; validate the generated projection during build.
import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin, Truck, ShieldCheck, Laptop, Monitor, Cpu, Apple,
  Gamepad2, ArrowRight, ArrowLeft, MessageCircle, Star, Home as HomeIcon, Clock, BadgeCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SEOEngine } from '../core/components/SEOEngine';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import { KCROC_GRAPH } from '../data/graph';
import { IMAGES } from '../constants/images';
import { ArabicHeadTermLinks } from '@/components/content/ArabicHeadTermLinks';

// Service areas with a dedicated Arabic page link there; others fall back to English.
const AR_LOCATION_PATHS: Record<string, string> = {
  hawalli: '/ar/computer-repair-hawalli',
  salmiya: '/ar/computer-repair-salmiya',
  farwaniya: '/ar/computer-repair-farwaniya',
  'kuwait-city': '/ar/computer-repair-kuwait-city',
  jahra: '/ar/computer-repair-jahra',
};

// Arabic labels for existing (English-slugged) service pages — the
// underlying service pages stay English for now, but Arabic visitors get
// Arabic labels/descriptions pointing to them, same pattern already used in
// NearMe.tsx's embedded Arabic section.
const SERVICES_AR: { path: string; icon: React.ElementType; title: string; description: string }[] = [
  { path: '/ar/laptop-repair-kuwait', icon: Laptop, title: 'تصليح لابتوب', description: 'تشخيص وإصلاح أعطال اللابتوب، سواء كانت في الهاردوير أو السوفتوير، لمختلف الماركات.' },
  { path: '/ar/macbook-repair-kuwait', icon: Apple, title: 'تصليح ماك بوك', description: 'إصلاح أعطال MacBook واللوحة المنطقية، بما في ذلك إصلاحات الميكروسولدرينج عند الحاجة.' },
  { path: '/ar/gaming-pc-repair-kuwait', icon: Gamepad2, title: 'تصليح كمبيوتر قيمنق', description: 'تشخيص وإصلاح أجهزة الألعاب المكتبية، ومشاكل كروت الشاشة والتبريد والطاقة وغيرها.' },
  { path: '/ar/motherboard-repair-kuwait', icon: Cpu, title: 'تصليح اللوحة الأم', description: 'إصلاح اللوحة الأم على مستوى القطعة الإلكترونية بدل استبدال اللوحة بالكامل، متى ما كان ذلك ممكنًا.' },
  { path: '/ar/laptop-screen-repair-kuwait', icon: Monitor, title: 'تغيير شاشة اللابتوب', description: 'تغيير شاشات اللابتوب المكسورة أو المتضررة، وإصلاح مشاكل الخطوط أو الإضاءة حسب حالة الشاشة.' },
  { path: '/ar/battery-replacement-kuwait', icon: ShieldCheck, title: 'تغيير بطارية اللابتوب', description: 'فحص صحة البطارية أولًا ثم استبدالها عند التأكد من أن البطارية هي سبب المشكلة.' },
  { path: '/ar/laptop-keyboard-replacement-kuwait', icon: Laptop, title: 'تبديل كيبورد اللابتوب', description: 'تبديل الكيبورد أو تشخيص الأزرار التي لا تعمل والإضاءة ومشاكل السوائل حسب موديل الجهاز.' },
  { path: '/ar/ssd-ram-upgrade-kuwait', icon: Cpu, title: 'ترقية SSD وRAM', description: 'ترقية التخزين والذاكرة بعد فحص التوافق ودعم الجهاز، مع نقل البيانات عند الإمكان.' },
  { path: '/ar/laptop-charging-port-repair-kuwait', icon: Cpu, title: 'إصلاح مدخل الشحن', description: 'تشخيص منفذ الشحن ودوائر الطاقة، مع إصلاح المنفذ أو العطل على مستوى اللوحة عندما يكون ذلك ممكنًا.' },
];

const AREAS_AR = [
  { slug: 'hawalli', title: 'حولي' },
  { slug: 'salmiya', title: 'السالمية' },
  { slug: 'farwaniya', title: 'الفروانية' },
  { slug: 'kuwait-city', title: 'مدينة الكويت' },
  { slug: 'jahra', title: 'الجهراء' },
  { slug: 'ahmadi', title: 'الأحمدي' },
  { slug: 'fahaheel', title: 'الفحيحيل' },
  { slug: 'mangaf', title: 'المنقف' },
  { slug: 'abu-halifa', title: 'أبو حليفة' },
  { slug: 'jabriya', title: 'الجابرية' },
  { slug: 'fintas', title: 'الفنطاس' },
  { slug: 'mubarak-al-kabeer', title: 'مبارك الكبير' },
  { slug: 'sabah-al-salem', title: 'صباح السالم' },
];

const AR_COMMERCIAL_CLUSTER = [
  { href: '/ar/computer-repair-kuwait', title: 'تصليح كمبيوتر في الكويت', desc: 'صفحة الخدمة العامة للكمبيوتر واللابتوب واللوحة الأم.' },
  { href: '/ar/laptop-repair-kuwait', title: 'تصليح لابتوب في الكويت', desc: 'خدمات الشاشة والبطارية والشحن والتبريد واللوحة الأم.' },
  { href: '/ar/motherboard-repair-kuwait', title: 'تصليح المذربورد واللوحة الأم', desc: 'تشخيص وإصلاح دوائر الطاقة والشحن والمكونات عندما يكون ذلك ممكنًا.' },
  { href: '/ar/gaming-pc-repair-kuwait', title: 'تصليح Gaming PC في الكويت', desc: 'GPU والحرارة والطاقة والتبريد ومشاكل الأداء تحت الضغط.' },
  { href: '/ar/laptop-screen-repair-kuwait', title: 'تصليح وتبديل شاشة اللابتوب', desc: 'تشخيص الشاشة السوداء والخطوط والوميض قبل طلب القطعة.' },
];

const HIGH_INTENT_AR = [
  { href: '/ar/laptop-repair-kuwait', title: 'تصليح لابتوب في الكويت', desc: 'خدمة شاملة للأعطال الشائعة، الشحن، البطارية، الشاشة، المفصلات واللوحة الأم.' },
  { href: '/ar/motherboard-repair-kuwait', title: 'تصليح اللوحة الأم', desc: 'تشخيص أعطال الطاقة والدوائر وإصلاح المكوّن المتضرر عندما يكون الإصلاح ممكنًا.' },
  { href: '/laptop-wont-turn-on', title: 'اللابتوب لا يعمل', desc: 'فرّق بين مشكلة الشاحن والبطارية ومدخل الشحن واللوحة الأم قبل تبديل القطع.' },
  { href: '/laptop-overheating-kuwait', title: 'اللابتوب يسخن', desc: 'تشخيص الحرارة المرتفعة والاختناق الحراري ومشاكل التبريد في أجواء الكويت.' },
  { href: '/ar/laptop-screen-repair-kuwait', title: 'تغيير شاشة اللابتوب', desc: 'شاشات مكسورة أو سوداء أو فيها خطوط ووميض، بعد تشخيص المشكلة.' },
  { href: '/ar/battery-replacement-kuwait', title: 'تغيير بطارية اللابتوب', desc: 'فحص البطارية أولًا ثم الاستبدال عند ثبوت التلف أو التدهور.' },
  { href: '/ar/laptop-keyboard-replacement-kuwait', title: 'تبديل كيبورد اللابتوب', desc: 'تشخيص الأزرار التي لا تعمل ثم تحديد ما إذا كان المطلوب إصلاحًا أو استبدالًا.' },
  { href: '/ar/ssd-ram-upgrade-kuwait', title: 'ترقية SSD وRAM', desc: 'تحسين سرعة الجهاز بعد فحص توافق التخزين والذاكرة مع موديل اللابتوب.' },
  { href: '/blog/ar/how-often-clean-laptop-replace-thermal-paste-kuwait', title: 'تنظيف اللابتوب وتغيير المعجون الحراري', desc: 'متى يحتاج الجهاز إلى تنظيف داخلي وفحص المراوح والمعجون الحراري؟' },
];

export default function NearMeAR() {
  const business = KCROC_GRAPH.business;
  const page = KCROC_GRAPH.pages.find((p) => p.id === 'page-near-me-ar');
  const faqs = (page?.featuredFAQIds ?? [])
    .map((id) => KCROC_GRAPH.faqs.find((faq) => faq.id === id))
    .filter(Boolean);

  if (!business || !page) return null;

  const waLink = `https://wa.me/${business.telephone}?text=${encodeURIComponent(
    'مرحباً KCROC، أبحث عن خدمة تصليح كمبيوتر بالقرب مني في الكويت وأحتاج ترتيب استلام للجهاز.'
  )}`;

  const nearMeServiceSchema = {
    '@graph': [
      {
        '@type': 'Service',
        '@id': page.seo.canonicalUrl + '#near-me-service',
        name: 'خدمة استلام وتوصيل الكمبيوتر واللابتوب في الكويت',
        serviceType: 'تشخيص وإصلاح الكمبيوتر واللابتوب مع استلام وتوصيل',
        description: 'خدمة محلية لاستلام الكمبيوتر واللابتوب من المنزل أو المكتب في مناطق الكويت ونقله إلى مختبر KCROC الفعلي في حولي للتشخيص والإصلاح بعد موافقة العميل على السعر. لا نقدم زيارات إصلاح داخل المنزل.',
        url: page.seo.canonicalUrl,
        image: [
          business.websiteUrl + IMAGES.brand.shopExteriorDay.src,
          business.websiteUrl + IMAGES.brand.shopInterior.src,
          business.websiteUrl + IMAGES.brand.technicians.src
        ],
        provider: { '@id': business.websiteUrl + '/#business' },
        areaServed: { '@type': 'Country', name: 'Kuwait' },
        availableChannel: {
          '@type': 'ServiceChannel',
          serviceUrl: page.seo.canonicalUrl,
          servicePhone: '+' + business.telephone,
          serviceLocation: {
            '@type': 'Place',
            name: 'مختبر KCROC في حولي',
            address: {
              '@type': 'PostalAddress',
              streetAddress: business.streetAddress,
              addressLocality: business.addressLocality,
              addressRegion: business.addressRegion,
              addressCountry: business.addressCountry
            }
          }
        }
      },
      {
        '@type': 'ImageObject',
        '@id': page.seo.canonicalUrl + '#primaryimage',
        url: business.websiteUrl + IMAGES.brand.shopExteriorDay.src,
        contentUrl: business.websiteUrl + IMAGES.brand.shopExteriorDay.src,
        name: 'موقع مختبر KCROC في حولي',
        caption: 'واجهة موقع KCROC في مجمع المله، حولي. يتم إصلاح الأجهزة في المختبر بعد ترتيب الاستلام، وليس داخل منازل العملاء.',
        width: IMAGES.brand.shopExteriorDay.width,
        height: IMAGES.brand.shopExteriorDay.height,
        inLanguage: 'ar-KW'
      }
    ]
  };

  return (
    <div className="w-full min-h-screen bg-transparent text-slate-200" dir="rtl" lang="ar-KW">
      <SEOEngine entityId="page-near-me-ar" />
      <SchemaMarkup schema={nearMeServiceSchema} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-800 px-4 pb-14 pt-10 sm:px-6 sm:pb-24 sm:pt-16 lg:pt-24">
        <div className="absolute inset-0 bg-gradient-to-bl from-brand-dark via-slate-900 to-brand-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_15%,rgba(34,211,238,0.10),transparent_45%)]" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs font-medium text-slate-400 sm:text-sm">
            <ol className="flex items-center gap-2">
              <li><Link to="/" className="hover:text-cyan-400">الرئيسية</Link></li>
              <li className="text-slate-600">/</li>
              <li aria-current="page" className="text-cyan-400">تصليح كمبيوتر بالقرب منك</li>
            </ol>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_.85fr] lg:gap-14">
            <div className="max-w-3xl">
              <Badge className="mb-5 border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-cyan-400">
                <MapPin className="ml-2 inline h-3.5 w-3.5" aria-hidden="true" /> خدمة محلية في الكويت
              </Badge>
              <h1 className="text-4xl font-black leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-6xl">
                تصليح كمبيوتر ولابتوب <span className="text-cyan-400">بالقرب منك في الكويت</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-loose text-slate-300 sm:text-lg">
                تبحث عن تصليح كمبيوتر قريب منك؟ نرتب استلام اللابتوب أو الكمبيوتر من المنزل أو المكتب في مناطق الكويت التي نخدمها، ونفحصه ونصلحه في مختبر KCROC بحولي، ثم نوصله لك بعد الاختبار مع عرض سعر قبل بدء الإصلاح.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="w-full bg-cyan-500 font-black text-slate-950 hover:bg-cyan-400 sm:w-auto" asChild>
                  <Link to="/ar/book"><Truck className="ml-2 h-5 w-5" aria-hidden="true" /> احجز استلام مجاني</Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full border-slate-700 text-white hover:bg-slate-800 sm:w-auto" asChild>
                  <a href={waLink} target="_blank" rel="noopener noreferrer"><MessageCircle className="ml-2 h-5 w-5" aria-hidden="true" /> تواصل عبر واتساب</a>
                </Button>
              </div>
              <Link to="/ar/computer-repair-kuwait" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-cyan-300 underline-offset-4 hover:text-cyan-200 hover:underline">فني كمبيوتر في الكويت لتصليح الكمبيوتر واللابتوب <ArrowLeft className="h-4 w-4" aria-hidden="true" /></Link>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400">
                <span className="inline-flex items-center gap-1.5"><Star className="h-4 w-4 fill-current text-amber-400" aria-hidden="true" /> تقييم {business.aggregateRating.ratingValue}★</span>
                <span>تقييم Google · شاهد التقييمات الحالية</span>
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
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent px-5 pb-5 pt-16">
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
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 bg-brand-dark text-cyan-400"><usp.icon className="h-5 w-5" aria-hidden="true" /></div>
                <h3 className="font-bold text-white">{usp.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{usp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real workshop, address and directions */}
      <section className="border-b border-slate-800/60 bg-brand-dark/35 px-4 py-12 sm:px-6 sm:py-20" aria-labelledby="near-me-workshop">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-cyan-400">الموقع الفعلي وطريقة الخدمة</p>
              <h2 id="near-me-workshop" className="text-3xl font-black leading-tight text-white sm:text-4xl">ورشة حقيقية في حولي، مع استلام من منطقتك</h2>
              <p className="mt-4 leading-loose text-slate-300">حتى لو كنت بعيدًا عن حولي، لا تحتاج إلى البحث عن محل قريب أو نقل الجهاز بنفسك. نرتب استلامه من المنزل أو المكتب ضمن مناطق الخدمة، ويجري التشخيص والإصلاح في مختبر KCROC بحولي، ثم ننسق إعادته بعد الاختبار.</p>
              <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">عنوان المختبر</p>
                <address className="mt-2 not-italic font-bold leading-7 text-white">{business.streetAddress}، {business.addressLocality}، الكويت</address>
                <p className="mt-3 flex items-center gap-2 text-sm text-slate-400"><Clock className="h-4 w-4 shrink-0 text-cyan-400" aria-hidden="true" /> يوميًا من 10:00 صباحًا إلى 10:00 مساءً</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a href={business.socialLinks.googleMaps} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-cyan-500 px-5 py-2.5 text-sm font-black text-slate-950 transition hover:bg-cyan-400">
                    <MapPin className="h-4 w-4" aria-hidden="true" /> افتح الموقع في خرائط Google
                  </a>
                  <Link to="/ar/computer-repair-hawalli" className="inline-flex min-h-11 items-center rounded-full border border-slate-700 px-5 py-2.5 text-sm font-bold text-cyan-300 transition hover:border-cyan-500/40">
                    تفاصيل خدمة حولي
                  </Link>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-400">مهم: الاستلام من المنزل لا يعني وجود فني لإصلاح الجهاز داخل المنزل. تتم أعمال الصيانة داخل المختبر بعد الفحص وموافقتك على التكلفة.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <figure className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 sm:col-span-2">
                <img src={IMAGES.brand.shopExteriorDay.src} alt="واجهة موقع KCROC في مجمع المله بشارع ابن خلدون في حولي، الكويت" width={IMAGES.brand.shopExteriorDay.width} height={IMAGES.brand.shopExteriorDay.height} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover" />
                <figcaption className="border-t border-slate-800 px-4 py-3 text-sm leading-6 text-slate-400">واجهة موقع العمل الفعلي في حولي؛ افتح خرائط Google لمعرفة الاتجاهات قبل الزيارة.</figcaption>
              </figure>
              <figure className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
                <img src={IMAGES.brand.shopEntrance.src} alt="مدخل مختبر KCROC في مجمع المله بحولي" width={IMAGES.brand.shopEntrance.width} height={IMAGES.brand.shopEntrance.height} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" />
                <figcaption className="border-t border-slate-800 px-4 py-3 text-sm leading-6 text-slate-400">مدخل موقع العمل في مجمع المله.</figcaption>
              </figure>
              <figure className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
                <img src={IMAGES.brand.shopInterior.src} alt="داخل مختبر وورشة إصلاح الكمبيوتر واللابتوب في KCROC" width={IMAGES.brand.shopInterior.width} height={IMAGES.brand.shopInterior.height} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" />
                <figcaption className="border-t border-slate-800 px-4 py-3 text-sm leading-6 text-slate-400">داخل الورشة حيث يتم فحص الجهاز والعمل عليه.</figcaption>
              </figure>
            </div>
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
              <Link key={area.slug} to={AR_LOCATION_PATHS[area.slug] ?? `/location/${area.slug}`} className="group rounded-2xl border border-slate-800 bg-brand-dark/70 p-5 transition hover:border-cyan-500/50 hover:bg-slate-900">
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
              <Link key={service.path} to={service.path} className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-5 transition hover:border-cyan-500/40 hover:bg-slate-900">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-brand-dark text-cyan-400"><service.icon className="h-5 w-5" aria-hidden="true" /></div>
                  <div><h3 className="font-bold text-white group-hover:text-cyan-300">{service.title}</h3><p className="mt-1 text-sm leading-relaxed text-slate-400">{service.description}</p></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Arabic commercial cluster */}
      <section className="border-y border-slate-800/60 bg-brand-dark/40 px-4 py-12 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-cyan-400">الخدمات التجارية بالعربي</p>
            <h2 className="text-3xl font-black text-white sm:text-4xl">ابدأ من صفحة الخدمة المناسبة لجهازك</h2>
            <p className="mt-4 leading-loose text-slate-400">هذه الصفحات تجمع تفاصيل الخدمة مع المشاكل الشائعة، الماركات، مناطق الاستلام وطرق التواصل حتى تصل من نية البحث إلى طلب الإصلاح بشكل أوضح.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {AR_COMMERCIAL_CLUSTER.map((item) => (
              <Link key={item.href} to={item.href} className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition hover:border-cyan-500/50">
                <h3 className="font-black text-white group-hover:text-cyan-300">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* High-intent repair paths */}
      <section className="border-y border-slate-800/60 bg-slate-900/30 px-4 py-12 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-cyan-400">أكثر عمليات البحث شيوعًا</p>
            <h2 className="text-3xl font-black text-white sm:text-4xl">اختر المشكلة أو خدمة الإصلاح الأقرب لجهازك</h2>
            <p className="mt-4 leading-loose text-slate-400">إذا كنت تعرف المشكلة التي يعاني منها جهازك، انتقل مباشرة إلى صفحة التشخيص والخدمة المناسبة بدل البحث عن محل بشكل عام.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {HIGH_INTENT_AR.map((item) => (
              <Link key={item.href} to={item.href} className="group rounded-2xl border border-slate-800 bg-brand-dark/70 p-5 transition hover:border-cyan-500/50 hover:bg-slate-900">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-black text-white group-hover:text-cyan-300">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.desc}</p>
                  </div>
                  <ArrowRight className="mt-1 h-5 w-5 shrink-0 rotate-180 text-slate-600 transition group-hover:-translate-x-1 group-hover:text-cyan-400" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link to="/ar/pricing" className="text-sm font-bold text-cyan-400 hover:text-cyan-300">شاهد أسعار تصليح الكمبيوتر في الكويت ←</Link>
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
              <div key={number} className="rounded-2xl border border-slate-800 bg-brand-dark/70 p-6">
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
              <details key={faq.id} className="group rounded-2xl border border-slate-800 bg-brand-dark/70 p-5">
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
            <Button size="lg" className="bg-cyan-500 font-black text-slate-950 hover:bg-cyan-400" asChild><Link to="/ar/book">احجز استلام مجاني</Link></Button>
            <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-800" asChild><a href={waLink} target="_blank" rel="noopener noreferrer">تواصل عبر واتساب</a></Button>
          </div>
          <p className="mt-5 text-xs text-slate-500">مختبر الإصلاح المركزي: {business.streetAddress}، {business.addressLocality}، الكويت</p>
        </div>
      </section>
      <ArabicHeadTermLinks />
    </div>
  );
}
