import React from 'react';
import { Link } from 'react-router-dom';
import {
  Apple,
  ArrowUpRight,
  BatteryCharging,
  CheckCircle2,
  Clock,
  Cpu,
  Gamepad2,
  Laptop,
  MapPin,
  MessageCircle,
  Monitor,
  Phone,
  ShieldCheck,
  Star,
  Truck,
  Wrench,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { KCROC_GRAPH } from '../data/graph';
import { SEOEngine } from '../core/components/SEOEngine';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import MapComponent from '../components/MapComponent';
import { useAnalytics } from '../core/analytics/AnalyticsProvider';
import { IMAGES } from '../constants/images';

const BASE_URL = KCROC_GRAPH.business?.websiteUrl ?? 'https://www.computerrepairkuwait.com';
const PAGE_URL = BASE_URL + '/ar/computer-repair-hawalli';
const ENGLISH_URL = BASE_URL + '/location/hawalli';
const DIRECTIONS_URL = 'https://maps.google.com/?cid=3928987856909945446';

const ARABIC_SERVICES: Record<string, { title: string; description: string; path: string }> = {
  'srv-laptop': {
    title: 'تصليح اللابتوب',
    description: 'تشخيص أعطال التشغيل والحرارة والشحن والهاردوير قبل اقتراح الإصلاح المناسب.',
    path: '/ar/laptop-repair-kuwait',
  },
  'srv-motherboard': {
    title: 'تصليح المذربورد واللوحة الأم',
    description: 'فحص دوائر الطاقة والشحن وإصلاح المكونات عندما يكون الإصلاح ممكنًا.',
    path: '/ar/motherboard-repair-kuwait',
  },
  'srv-screen': {
    title: 'تبديل شاشة اللابتوب',
    description: 'فحص الشاشة والكابل والإضاءة قبل تحديد القطعة التي تحتاج إلى تغيير.',
    path: '/ar/laptop-screen-repair-kuwait',
  },
  'srv-battery': {
    title: 'تبديل بطارية اللابتوب',
    description: 'فحص البطارية والشحن ومطابقة البديل مع موديل جهازك.',
    path: '/ar/battery-replacement-kuwait',
  },
  'srv-macbook': {
    title: 'تصليح MacBook',
    description: 'تشخيص أعطال MacBook، بما فيها مشاكل التشغيل والشحن والسوائل واللوحة الأم.',
    path: '/ar/macbook-repair-kuwait',
  },
  'srv-gaming': {
    title: 'تصليح Gaming PC وكرت الشاشة',
    description: 'فحص مشاكل الحرارة والطاقة وكرت الشاشة والاستقرار قبل تبديل القطع.',
    path: '/ar/gaming-pc-repair-kuwait',
  },
  'srv-gaming-laptop': {
    title: 'تصليح Gaming Laptop',
    description: 'تشخيص أعطال أجهزة الألعاب والتبريد والمراوح والحرارة حسب الموديل.',
    path: '/ar/gaming-laptop-repair-kuwait',
  },
  'srv-charging-port': {
    title: 'إصلاح منفذ الشحن',
    description: 'فحص الشاحن والمنفذ ودائرة الشحن لتحديد مصدر المشكلة.',
    path: '/ar/laptop-charging-port-repair-kuwait',
  },
  'srv-keyboard': {
    title: 'تبديل كيبورد اللابتوب',
    description: 'فحص الكيبورد والتوصيلات ومطابقة القطعة المناسبة لجهازك.',
    path: '/ar/laptop-keyboard-replacement-kuwait',
  },
  'srv-ssd-ram': {
    title: 'ترقية SSD وRAM',
    description: 'ترقية التخزين والذاكرة حسب توافق الجهاز واحتياجك.',
    path: '/ar/ssd-ram-upgrade-kuwait',
  },
};

const GALLERY = [
  { ...IMAGES.brand.shopInterior, altAr: 'داخل مختبر صيانة KCROC في حولي', caption: 'داخل مختبر الصيانة' },
  { ...IMAGES.brand.shopEntrance, altAr: 'مدخل مختبر KCROC في مجمع الملا بحولي', caption: 'مدخل المختبر في مجمع الملا' },
  { ...IMAGES.brand.technicians, altAr: 'فنيون يفحصون جهاز كمبيوتر داخل المختبر', caption: 'فحص وتشخيص الأجهزة' },
  { ...IMAGES.brand.leadTechnician, altAr: 'عمل فني على لوحة أم داخل مختبر KCROC', caption: 'إصلاح مكونات اللوحة الأم' },
  { ...IMAGES.brand.inventory, altAr: 'قطع غيار وأدوات صيانة داخل المختبر', caption: 'قطع وأدوات الصيانة' },
  { ...IMAGES.brand.shopExteriorNight, altAr: 'واجهة مختبر KCROC في حولي مساءً', caption: 'واجهة المختبر' },
];

function formatArabicTime(value: string) {
  const parts = value.split(':');
  const hour = Number(parts[0]);
  const minute = Number(parts[1] ?? '0');
  const twelveHour = hour % 12 || 12;
  const period = hour >= 12 ? 'مساءً' : 'صباحًا';
  return String(twelveHour) + (minute ? ':' + String(minute).padStart(2, '0') : '') + ' ' + period;
}

export default function ArabicHawalliLocationPage() {
  const { trackConversion } = useAnalytics();
  const location = KCROC_GRAPH.locations.find((item) => item.id === 'loc-hawalli');
  const business = KCROC_GRAPH.business;
  const reviews = KCROC_GRAPH.reviews;
  const services = KCROC_GRAPH.services.filter((service) => ARABIC_SERVICES[service.id]);

  if (!location || !business) return null;

  const phone = business.telephone;
  const phoneDisplay = '+965 ' + phone.slice(3, 7) + ' ' + phone.slice(7);
  const openingHoursAr = business.schemaOpeningHours
    ? 'يوميًا من ' + formatArabicTime(business.schemaOpeningHours.opens) + ' إلى ' + formatArabicTime(business.schemaOpeningHours.closes)
    : 'يرجى التواصل معنا لتأكيد ساعات العمل';
  const waLink = 'https://wa.me/' + phone + '?text=' + encodeURIComponent('السلام عليكم KCROC، أحتاج تصليح كمبيوتر أو لابتوب في حولي. أرجو ترتيب الفحص أو الاستلام.');
  const faqs = [
    {
      q: 'وين موقع مختبر KCROC في حولي؟',
      a: 'عنواننا شارع ابن خلدون، مجمع الملا، البدروم، محل 19، حولي. تقدر تفتح خرائط Google من زر الاتجاهات أو تتواصل معنا قبل الزيارة.',
    },
    {
      q: 'أقدر أزور المختبر بنفسي؟',
      a: 'نعم، تقدر تجيب جهازك للمختبر خلال ساعات العمل. وإذا تبي تتجنب المشوار، نرتب استلام وتوصيل مجاني من البيت أو المكتب في مناطق الكويت التي نخدمها.',
    },
    {
      q: 'شنو ساعات العمل؟',
      a: openingHoursAr + '. إذا كانت الزيارة مستعجلة، تواصل معنا قبل الوصول للتأكد من الترتيبات.',
    },
    {
      q: 'هل الاستلام والتوصيل مجاني؟',
      a: 'نعم، نوفر استلام وتوصيل مجاني في مناطق الكويت التي نخدمها. أرسل منطقتك وموديل الجهاز ووصف المشكلة عبر واتساب لترتيب الاستلام.',
    },
    {
      q: 'هل تصلحون MacBook وGaming PC؟',
      a: 'نعم، نفحص أجهزة اللابتوب والكمبيوتر المكتبي وMacBook وأجهزة الألعاب، ويعتمد نوع الإصلاح على نتيجة التشخيص وحالة الجهاز.',
    },
    {
      q: 'هل تبدلون المذربورد كاملة مباشرة؟',
      a: 'مو بالضرورة. نفحص اللوحة أولًا، وإذا كان العطل في مكوّن أو دائرة قابلة للإصلاح نشرح لك الخيار قبل اتخاذ قرار استبدال اللوحة كاملة.',
    },
    {
      q: 'كم سعر تصليح الكمبيوتر في حولي؟',
      a: 'السعر يعتمد على نوع الجهاز والعطل والقطعة المطلوبة. نوضح لك التكلفة بعد التشخيص وقبل بدء أي عمل مدفوع. راجع صفحة الأسعار للاطلاع على أسعار البداية للخدمات الشائعة.',
    },
    {
      q: 'هل عندكم فرع خارج حولي؟',
      a: 'المختبر الفعلي في حولي. باقي المناطق نخدمها من خلال الاستلام والتوصيل، ويتم الإصلاح في المختبر ثم نرجع الجهاز بعد الفحص والاختبار.',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'ComputerStore'],
        '@id': ENGLISH_URL + '#location',
        name: location.title,
        url: ENGLISH_URL,
        telephone: '+' + business.telephone,
        address: {
          '@type': 'PostalAddress',
          streetAddress: location.landmark,
          addressLocality: 'Hawalli',
          addressRegion: business.addressRegion,
          addressCountry: 'KW',
        },
        geo: location.coords
          ? {
              '@type': 'GeoCoordinates',
              latitude: location.coords.lat,
              longitude: location.coords.lng,
            }
          : undefined,
        openingHoursSpecification: business.schemaOpeningHours
          ? [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: business.schemaOpeningHours.dayOfWeek.map((day) => 'https://schema.org/' + day),
                opens: business.schemaOpeningHours.opens,
                closes: business.schemaOpeningHours.closes,
              },
            ]
          : undefined,
        areaServed: location.serviceAreas.map((area) => ({ '@type': 'City', name: area })),
      },
      {
        '@type': 'FAQPage',
        '@id': PAGE_URL + '#faq',
        mainEntity: faqs.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  };

  const track = (event: 'whatsapp_click' | 'phone_call_click' | 'book_pickup_click' | 'cta_click', name: string, position: string) =>
    trackConversion(event, {
      cta_name: name,
      button_position: position,
      entity_id: location.id,
      entity_type: 'Location',
      entity_slug: 'hawalli',
    });

  return (
    <div dir="rtl" lang="ar-KW" className="w-full text-white font-sans selection:bg-cyan-500/30">
      <SEOEngine entityId="page-ar-hawalli-computer-repair" />
      <SchemaMarkup schema={faqSchema} />

      <nav aria-label="مسار التنقل" className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        <ol className="flex flex-wrap items-center gap-x-2 text-xs sm:text-sm text-slate-400 font-medium">
          <li><Link to="/ar/computer-repair-kuwait" className="hover:text-cyan-400 transition-colors">الرئيسية</Link></li>
          <li aria-hidden="true" className="text-slate-600">/</li>
          <li aria-current="page" className="text-cyan-400">تصليح كمبيوتر حولي</li>
        </ol>
      </nav>

      <section className="relative overflow-hidden px-4 pb-10 pt-6 sm:px-6 sm:pb-16 sm:pt-12">
        <div className="container mx-auto max-w-6xl">
          <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
            <div className="max-w-2xl space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-bold text-cyan-300">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                مختبر صيانة فعلي في حولي
              </div>
              <h1 className="text-3xl font-black leading-[1.13] tracking-tight text-white sm:text-5xl">
                تصليح كمبيوتر ولابتوب في <span className="text-cyan-400">حولي، الكويت</span>
              </h1>
              <p className="text-base leading-8 text-slate-300 sm:text-lg">
                تحتاج فني كمبيوتر في حولي؟ في KCROC نفحص الكمبيوتر واللابتوب ونحدد سبب العطل قبل اقتراح الإصلاح. تقدر تزور مختبرنا في مجمع الملا، أو ترتب استلام وتوصيل مجاني من البيت أو المكتب في مناطق الكويت التي نخدمها.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                <Button size="lg" className="w-full bg-cyan-500 px-6 font-black text-slate-950 hover:bg-cyan-400" asChild>
                  <Link to="/book" onClick={() => track('book_pickup_click', 'hawalli_ar_book', 'hero')}>
                    <Truck className="ml-2 h-5 w-5" aria-hidden="true" />
                    احجز استلام مجاني
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full border-slate-700 text-white hover:bg-slate-800" asChild>
                  <a href={waLink} target="_blank" rel="noopener noreferrer" onClick={() => track('whatsapp_click', 'hawalli_ar_whatsapp', 'hero')}>
                    <MessageCircle className="ml-2 h-5 w-5" aria-hidden="true" />
                    راسلنا على واتساب
                  </a>
                </Button>
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
                <a href={'tel:+' + phone} onClick={() => track('phone_call_click', 'hawalli_ar_call', 'hero')} className="inline-flex min-h-11 items-center gap-2 text-slate-300 transition-colors hover:text-cyan-300">
                  <Phone className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                  اتصال {phoneDisplay}
                </a>
                <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" onClick={() => track('cta_click', 'hawalli_ar_directions', 'hero')} className="inline-flex min-h-11 items-center gap-2 font-bold text-cyan-300 transition-colors hover:text-cyan-200">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  الاتجاهات إلى المختبر
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>

              <p className="text-xs font-medium leading-6 text-slate-400 sm:text-sm">
                شارع ابن خلدون، مجمع الملا، البدروم، محل 19 · {openingHoursAr} · ضمان 30 يومًا على الإصلاحات المكتملة
              </p>
            </div>

            {location.contentImage && (
              <figure className="relative overflow-hidden rounded-2xl border border-slate-800 shadow-2xl">
                <img
                  src={location.contentImage.src}
                  alt="واجهة مختبر KCROC لتصليح الكمبيوتر في حولي"
                  width={location.contentImage.width}
                  height={location.contentImage.height}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="h-56 w-full object-cover sm:h-72 lg:h-[420px]"
                />
                <figcaption className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-brand-dark/90 to-transparent px-4 py-3 text-xs text-slate-100">
                  مختبر KCROC في مجمع الملا، شارع ابن خلدون، حولي
                </figcaption>
              </figure>
            )}
          </div>

          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/40 p-5 backdrop-blur-md sm:mt-10 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-black text-white">موقع المختبر وخيارات الخدمة</h2>
                <p className="mt-1 text-sm leading-7 text-slate-300">تقدر تزورنا في حولي أو ترتب استلام الجهاز من المنزل أو المكتب.</p>
              </div>
              {reviews?.aggregateRating && (
                <a href={business.socialLinks.googleMaps} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm text-slate-200 transition-colors hover:text-cyan-300">
                  <Star className="h-4 w-4 fill-current text-cyan-400" aria-hidden="true" />
                  <span className="font-black text-white">{reviews.aggregateRating.ratingValue} / 5</span>
                  <span className="text-slate-400">تقييم Google · شاهد التقييمات الحالية</span>
                </a>
              )}
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" aria-hidden="true" />
                <div><h3 className="font-bold text-white">العنوان</h3><p className="mt-1 text-sm leading-6 text-slate-400">مجمع الملا، البدروم، محل 19، شارع ابن خلدون، حولي</p></div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" aria-hidden="true" />
                <div><h3 className="font-bold text-white">ساعات العمل</h3><p className="mt-1 text-sm leading-6 text-slate-400">{openingHoursAr}</p></div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                <Truck className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" aria-hidden="true" />
                <div><h3 className="font-bold text-white">الاستلام والتوصيل</h3><p className="mt-1 text-sm leading-6 text-slate-400">مجاني من مناطق الكويت التي نخدمها، مع إصلاح الجهاز وفحصه داخل المختبر.</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800/70 px-4 py-10 sm:px-6 sm:py-14">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="text-sm font-black text-cyan-300">خدمات المختبر</p><h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">تصليح الكمبيوتر واللابتوب في حولي</h2></div>
            <Link to="/ar/pricing" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-cyan-300 hover:text-cyan-200">شاهد الأسعار <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const copy = ARABIC_SERVICES[service.id];
              return (
                <Link key={service.id} to={copy.path} className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-5 transition-colors hover:border-cyan-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
                      {service.id === 'srv-motherboard' ? <Cpu className="h-5 w-5" aria-hidden="true" /> : service.id === 'srv-screen' ? <Monitor className="h-5 w-5" aria-hidden="true" /> : service.id === 'srv-battery' ? <BatteryCharging className="h-5 w-5" aria-hidden="true" /> : service.id === 'srv-macbook' ? <Apple className="h-5 w-5" aria-hidden="true" /> : service.id === 'srv-gaming' || service.id === 'srv-gaming-laptop' ? <Gamepad2 className="h-5 w-5" aria-hidden="true" /> : service.id === 'srv-laptop' ? <Laptop className="h-5 w-5" aria-hidden="true" /> : <Wrench className="h-5 w-5" aria-hidden="true" />}
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-slate-500 transition-colors group-hover:text-cyan-300" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-black text-white">{copy.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-400">{copy.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800/70 bg-slate-900/20 px-4 py-10 sm:px-6 sm:py-14">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-7"><p className="text-sm font-black text-cyan-300">تعرف على مكان الإصلاح</p><h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">صور من مختبر KCROC في حولي</h2><p className="mt-2 max-w-3xl text-sm leading-7 text-slate-400">صور فعلية للمختبر ومساحة العمل والأدوات. عنواننا واحد في حولي؛ أما الاستلام والتوصيل فيغطي المناطق التي نخدمها.</p></div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {GALLERY.map((image) => (
              <figure key={image.src} className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-800">
                <img src={image.src} alt={image.altAr} width={image.width} height={image.height} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <figcaption className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-brand-dark/90 to-transparent px-3 py-2 text-[11px] text-slate-100 sm:text-xs">{image.caption}</figcaption>
              </figure>
            ))}
          </div>
          <Link to="/gallery" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-cyan-300 hover:text-cyan-200">شاهد معرض الصور <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="border-t border-slate-800/70 px-4 py-10 sm:px-6 sm:py-14">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-7"><p className="text-sm font-black text-cyan-300">خطوات واضحة</p><h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">شلون تتم عملية التصليح؟</h2></div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { title: '١. الاستلام أو الزيارة', text: 'تزور المختبر في حولي أو نرتب استلام الجهاز من منطقتك.' },
              { title: '٢. التشخيص والسعر', text: 'نفحص الجهاز ونوضح العطل والخيار المناسب والتكلفة قبل بدء أي إصلاح مدفوع.' },
              { title: '٣. الإصلاح والاختبار', text: 'بعد موافقتك ننفذ الإصلاح المناسب ونفحص الجهاز قبل التسليم أو التوصيل.' },
            ].map((step) => (
              <div key={step.title} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
                <CheckCircle2 className="h-5 w-5 text-cyan-400" aria-hidden="true" />
                <h3 className="mt-3 font-black text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-400">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800/70 bg-slate-900/20 px-4 py-10 sm:px-6 sm:py-14">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-7"><p className="text-sm font-black text-cyan-300">إجابات محلية</p><h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">أسئلة شائعة عن تصليح الكمبيوتر في حولي</h2></div>
          <div className="space-y-3">
            {faqs.map((item, index) => (
              <details key={item.q} className="group rounded-xl border border-slate-800 bg-slate-950/40 p-4 sm:p-5" open={index === 0}>
                <summary className="cursor-pointer list-none font-bold text-white marker:hidden">{item.q}</summary>
                <p className="mt-3 text-sm leading-7 text-slate-400">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800/70 px-4 py-10 sm:px-6 sm:py-14">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-7"><p className="text-sm font-black text-cyan-300">تغطية الكويت</p><h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">المختبر في حولي ونخدم مناطق أخرى بالاستلام</h2><p className="mt-2 max-w-3xl text-sm leading-7 text-slate-400">هذه روابط لمناطق وخدمات ذات صلة. لا تعني وجود فروع فعلية خارج مختبر حولي.</p></div>
          <div className="flex flex-wrap gap-3">
            {[
              { title: 'السالمية', path: '/ar/computer-repair-salmiya' },
              { title: 'الفروانية', path: '/ar/computer-repair-farwaniya' },
              { title: 'مدينة الكويت', path: '/ar/computer-repair-kuwait-city' },
              { title: 'فني كمبيوتر بالقرب مني', path: '/ar/near-me' },
              { title: 'تصليح كمبيوتر في الكويت', path: '/ar/computer-repair-kuwait' },
            ].map((item) => <Link key={item.path} to={item.path} className="rounded-full border border-slate-800 bg-slate-900/50 px-4 py-2 text-sm font-bold text-slate-200 transition-colors hover:border-cyan-500/40 hover:text-cyan-300">{item.title}</Link>)}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800/70 bg-slate-900/20 px-4 py-10 sm:px-6 sm:py-14">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-7 lg:grid-cols-2">
            <div><p className="text-sm font-black text-cyan-300">تفضل الزيارة أو الاستلام؟</p><h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">ابدأ بطلب تصليح جهازك</h2><p className="mt-3 text-sm leading-7 text-slate-400">أرسل نوع الجهاز وموديله والمشكلة ومنطقتك. نساعدك في تحديد الخطوة التالية قبل ترتيب الاستلام أو الزيارة.</p></div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Button size="lg" className="bg-cyan-500 font-black text-slate-950 hover:bg-cyan-400" asChild><Link to="/book" onClick={() => track('book_pickup_click', 'hawalli_ar_book_bottom', 'bottom')}><Truck className="ml-2 h-5 w-5" aria-hidden="true" />احجز استلام مجاني</Link></Button>
              <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-800" asChild><a href={waLink} target="_blank" rel="noopener noreferrer" onClick={() => track('whatsapp_click', 'hawalli_ar_whatsapp_bottom', 'bottom')}><MessageCircle className="ml-2 h-5 w-5" aria-hidden="true" /> واتساب</a></Button>
            </div>
          </div>
          <div className="mt-8"><MapComponent title="موقع مختبر KCROC لتصليح الكمبيوتر في حولي" /></div>
        </div>
      </section>

      <div className="border-t border-slate-800/70 px-4 py-7 sm:px-6">
        <div className="container mx-auto flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
          <Link to="/location/hawalli" className="inline-flex min-h-11 items-center gap-2 font-bold text-cyan-300 hover:text-cyan-200">English: Hawalli workshop page <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
          <Link to="/ar/pricing" className="inline-flex min-h-11 items-center gap-2 text-slate-300 hover:text-white">الأسعار والخدمات <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
      </div>
    </div>
  );
}
