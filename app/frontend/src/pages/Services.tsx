// File: app/frontend/src/pages/Services.tsx
import React from 'react';
import { ARABIC_SERVICE_COPY, arabicHomePrice } from '../components/home/homeLocale';
import { localizedSitePath, type SiteLocale } from '../utils/locale';
import { useAnalytics } from '../core/analytics/AnalyticsProvider';
import './BilingualServices.css';
import './KCROCEditorialRollout.css';
import { Link } from 'react-router-dom';
import { Laptop, Apple, Gamepad2, Cpu, Monitor, Wrench, ChevronRight, MapPin, BookOpen, MessageCircle } from 'lucide-react';
import { KCROC_GRAPH } from '../data/graph';
import { SEOEngine } from '../core/components/SEOEngine';

// Keep service cards connected to the knowledge graph so titles and URLs stay consistent.
const CORE_SERVICE_ORDER = [
  'srv-laptop',
  'srv-desktop-pc',
  'srv-macbook',
  'srv-gaming',
  'srv-gaming-laptop',
  'srv-motherboard',
  'srv-screen',
  'srv-battery',
  'page-macbook-battery-replacement',
  'srv-charging-port',
  'srv-ssd-ram',
  'srv-gaming-laptop-cleaning',
];

const SERVICE_FAQ_IDS = ['faq-cost', 'faq-pick-and-drop', 'faq-warranty', 'faq-no-fix'] as const;

const getServiceSummary = (service: { shortDescription?: string; description?: string }) => {
  const source = (service.shortDescription || service.description || '').trim();
  const sentences = source.match(/[^.!?]+[.!?]?/g) || [source];
  const summary = sentences.slice(0, 2).join('').trim();
  if (summary.length <= 260) return summary;
  const shortened = summary.slice(0, 257).trimEnd();
  const lastSpace = shortened.lastIndexOf(' ');
  return (lastSpace > 0 ? shortened.slice(0, lastSpace) : shortened) + '…';
};

const ICON_MAP: Record<string, React.ElementType> = {
  apple: Apple,
  laptop: Laptop,
  gaming: Gamepad2,
  cpu: Cpu,
  monitor: Monitor,
};

export default function Services({ locale = 'en' }: { locale?: SiteLocale } = {}) {
  const ar = locale === 'ar';
  const t = (en: string, arabic: string) => ar ? arabic : en;
  const route = (path: string) => localizedSitePath(path, locale);
  const { trackConversion } = useAnalytics();
  const arabicMacbookBattery = KCROC_GRAPH.pages.find((page) => page.id === 'page-ar-macbook-battery-replacement' && page.isActive);
  const macbookBattery = KCROC_GRAPH.pages.find((page) => page.id === 'page-macbook-battery-replacement' && page.isActive);
  const services = [
    ...KCROC_GRAPH.services.filter((service) => service.isActive),
    ...(macbookBattery ? [{ id: macbookBattery.id, slug: macbookBattery.slug, title: macbookBattery.title, description: macbookBattery.description, shortDescription: undefined, iconKey: 'apple', pricing: undefined }] : []),
  ].sort((a, b) => {
    const rank = (id: string) => {
      const index = CORE_SERVICE_ORDER.indexOf(id);
      return index < 0 ? CORE_SERVICE_ORDER.length : index;
    };
    return rank(a.id) - rank(b.id);
  });
  const serviceFaqs = (ar ? ['faq-ar-pricing', 'faq-arabic-computer-technician', 'faq-ar-hours', 'faq-ar-laptop-repair-process'] : SERVICE_FAQ_IDS)
    .map((id) => KCROC_GRAPH.faqs?.find((faq) => faq.id === id))
    .filter((faq) => faq !== undefined);

  return (
    <>
      <SEOEngine entityId={ar ? "page-ar-services" : "page-services"} />

      <div className="min-h-screen bg-transparent text-white pt-32 pb-24" data-kcroc-rollout="services-index" data-directory-locale={locale} dir={ar ? "rtl" : undefined} lang={ar ? "ar-KW" : undefined}>
        <div className="max-w-7xl mx-auto px-6">
          <header className="mb-12 max-w-4xl">
            {ar && <nav aria-label="مسار التنقل" className="mb-7 text-sm text-slate-500"><Link to="/ar" className="underline">الرئيسية</Link> / الخدمات</nav>}
            <p className="text-xs uppercase tracking-[0.22em] font-bold text-emerald-400 mb-4">
              {t("Laptop, PC, MacBook & component-level repairs", "تصليح اللابتوب والكمبيوتر وماك بوك والمكونات الدقيقة")}
            </p>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
              {t("Computer Repair Services in Kuwait", "خدمات تصليح الكمبيوتر واللابتوب في الكويت")}
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl">
              {t("Choose a repair by device or fault. KCROC checks the symptoms, diagnoses the likely cause, explains the recommended work and shares a quote for approval before proceeding. Devices are handled at our Hawalli repair lab, with pickup and return arranged across Kuwait.", "اختر الخدمة الأقرب لمشكلة جهازك. نفحص الأعراض في مختبر KCROC بحولي، ونوضح خيارات الإصلاح والتكلفة قبل أي عمل مدفوع. نستلم جهازك من البيت أو المكتب ونوصله مجانًا بكل الكويت.")}
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link to={route("/book")} onClick={() => trackConversion("book_pickup_click", { cta_name: ar ? "services_index_book_ar" : "services_index_book", button_position: "hero" })} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-500 px-6 py-3 font-bold text-slate-950 transition hover:bg-emerald-400">
                <MessageCircle className="me-2 h-5 w-5" aria-hidden="true" /> {t("Describe your repair", "احجز استلام مجاني")}
              </Link>
              <Link to={route("/near-me")} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-700 px-6 py-3 font-bold text-white transition hover:border-emerald-500/60 hover:bg-slate-900">
                <MapPin className="me-2 h-5 w-5" aria-hidden="true" /> {t("Check local pickup", "شوف مناطق الاستلام")}
              </Link>
            </div>
          </header>

          <section aria-label={t("Core repair hubs", "الخدمات الأساسية")} data-kcroc-editorial-panel="core-repair-hubs" className="mb-12 grid gap-4 sm:grid-cols-3">
            <Link to={route("/computer-repair-kuwait")} className="group rounded-2xl border border-slate-800 bg-slate-900/55 p-5 transition hover:border-emerald-500/50 hover:bg-slate-900">
              <h2 className="text-lg font-bold text-white group-hover:text-emerald-300">{t("Computer Repair Kuwait", "تصليح الكمبيوتر في الكويت")}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{t("Start here for broader desktop, PC, gaming and component-level computer faults.", "ابدأ من صفحة الكمبيوتر العامة لأعطال الكمبيوتر المكتبي والألعاب والمذربورد.")}</p>
              <span className="mt-4 inline-flex items-center text-sm font-bold text-emerald-400">{t("Open computer repair hub", "عرض خدمة الكمبيوتر")} <ChevronRight className="ms-1 h-4 w-4 rtl:rotate-180" aria-hidden="true" /></span>
            </Link>
            <Link to={route("/laptop-repair-kuwait")} className="group rounded-2xl border border-slate-800 bg-slate-900/55 p-5 transition hover:border-emerald-500/50 hover:bg-slate-900">
              <h2 className="text-lg font-bold text-white group-hover:text-emerald-300">{t("Laptop Repair Kuwait", "تصليح اللابتوب في الكويت")}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{t("Choose the laptop hub for power, charging, screen, battery, cooling and keyboard symptoms.", "اختر صفحة اللابتوب لأعطال التشغيل والشحن والشاشة والبطارية والتبريد والكيبورد.")}</p>
              <span className="mt-4 inline-flex items-center text-sm font-bold text-emerald-400">{t("Open laptop repair hub", "عرض خدمة اللابتوب")} <ChevronRight className="ms-1 h-4 w-4 rtl:rotate-180" aria-hidden="true" /></span>
            </Link>
            <Link to={route("/pricing")} className="group rounded-2xl border border-slate-800 bg-slate-900/55 p-5 transition hover:border-emerald-500/50 hover:bg-slate-900">
              <h2 className="text-lg font-bold text-white group-hover:text-emerald-300">{t("Repair Pricing", "أسعار التصليح")}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{t("Review current starting labour prices and how part costs are confirmed before work.", "راجع أجور العمل الإرشادية وشلون نأكد تكلفة القطع قبل التصليح.")}</p>
              <span className="mt-4 inline-flex items-center text-sm font-bold text-emerald-400">{t("View starting prices", "عرض الأسعار")} <ChevronRight className="ms-1 h-4 w-4 rtl:rotate-180" aria-hidden="true" /></span>
            </Link>
          </section>

          <section aria-labelledby="service-list-heading" data-kcroc-editorial-panel="service-index-cards">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 id="service-list-heading" className="text-2xl md:text-3xl font-black text-white">{t("Browse repair services", "تصفح خدمات الإصلاح")}</h2>
                <p className="mt-2 text-sm text-slate-400">{t("Open a service page for the common symptoms, repair options and next steps.", "افتح صفحة الخدمة لمعرفة الأعراض وخيارات الإصلاح والخطوة التالية.")}</p>
              </div>
              <span className="text-sm text-slate-500">{services.length} {t("available service categories", "خدمة متوفرة")}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => {
                const ServiceIcon = ICON_MAP[service.iconKey] || Wrench;
                const localized = ar ? (service.id === 'page-macbook-battery-replacement' && arabicMacbookBattery ? {title: arabicMacbookBattery.title, description: arabicMacbookBattery.description} : ARABIC_SERVICE_COPY[service.slug]) : undefined;
                const href = route('/' + service.slug);
                return (
                  <Link
                    key={service.id}
                    to={href}
                    data-service-id={service.id}
                    data-translated={ar ? String(Boolean(localized && href !== "/" + service.slug)) : undefined}
                    className="group flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/80 p-7 transition duration-300 hover:border-emerald-500/50 hover:bg-slate-800/70"
                  >
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-slate-800 bg-brand-dark transition-transform duration-300 group-hover:scale-105">
                        <ServiceIcon className="h-7 w-7 text-emerald-500" aria-hidden="true" />
                      </div>
                      {service.pricing?.displayLabel && (
                        <span className="rounded-full border border-emerald-500/20 bg-emerald-900/20 px-3 py-1 text-xs font-bold text-emerald-300">
                          {ar ? arabicHomePrice(service) : service.pricing.displayLabel}
                        </span>
                      )}
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-emerald-400">{localized?.title ?? service.title}</h3>
                    <p className="mb-6 flex-1 leading-relaxed text-slate-400">{localized?.description ?? getServiceSummary(service)}{ar && !localized ? ' (التفاصيل بالإنجليزي)' : ''}</p>
                    <span className="inline-flex items-center text-sm font-bold text-emerald-400">
                      {t("View repair details", "تفاصيل الخدمة")} <ChevronRight className="ms-1 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" aria-hidden="true" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>

          <section aria-labelledby="service-faq-heading" data-kcroc-editorial-panel="service-index-faq" className="mt-16 border-t border-slate-800 pt-10">
            <div className="mb-7 max-w-3xl">
              <h2 id="service-faq-heading" className="text-2xl font-black text-white md:text-3xl">{t("Questions about computer repair services in Kuwait", "أسئلة شائعة عن خدمات تصليح الكمبيوتر في الكويت")}</h2>
              <p className="mt-3 leading-relaxed text-slate-400">{t("Understand starting prices, pickup, warranty and the repair approval process before choosing a service.", "إجابات عن الأسعار والاستلام والضمان وخطوات الإصلاح قبل اختيار الخدمة.")}</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {serviceFaqs.map((faq) => (
                <details key={faq.id} data-kcroc-faq-item="true" className="group rounded-xl border border-slate-800 bg-slate-900/45 p-5">
                  <summary className="cursor-pointer list-none pr-1 font-bold text-white marker:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400">
                    <span className="inline-flex w-full items-center justify-between gap-4">
                      {faq.title}
                      <ChevronRight className="h-4 w-4 flex-shrink-0 text-emerald-400 transition-transform group-open:rotate-90 rtl:rotate-180 rtl:group-open:rotate-90" aria-hidden="true" />
                    </span>
                  </summary>
                  <p className="mt-4 border-t border-slate-800 pt-4 text-sm leading-7 text-slate-300">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="mt-16 grid gap-5 border-t border-slate-800 pt-10 md:grid-cols-3" aria-label={t("Find the right next step", "اختر الخطوة التالية")} data-kcroc-editorial-panel="service-index-next-steps">
            <Link to={route("/problems")} className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition hover:border-emerald-500/40">
              <Wrench className="mb-4 h-6 w-6 text-emerald-400" aria-hidden="true" />
              <h2 className="text-lg font-bold text-white group-hover:text-emerald-300">{t("Start with a symptom", "ابدأ من العطل")}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{t("Not sure which service applies? Browse common issues such as overheating, charging faults, startup failures and screen problems.", "مو عارف شنو الخدمة؟ شوف الأعطال الشائعة مثل الحرارة والشحن وعدم التشغيل ومشاكل الشاشة.")}</p>
              <span className="mt-4 inline-flex items-center text-sm font-bold text-emerald-400">{t("Browse problems", "تصفح الأعطال (بالإنجليزي)")} <ChevronRight className="ms-1 h-4 w-4 rtl:rotate-180" aria-hidden="true" /></span>
            </Link>
            <Link to={route("/near-me")} className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition hover:border-emerald-500/40">
              <MapPin className="mb-4 h-6 w-6 text-emerald-400" aria-hidden="true" />
              <h2 className="text-lg font-bold text-white group-hover:text-emerald-300">{t("Arrange service in your area", "رتب الاستلام من منطقتك")}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{t("See how pickup and return work for customers across Kuwait and where repairs are carried out.", "شوف طريقة الاستلام والتوصيل بكل الكويت ومكان التصليح الفعلي بمختبر حولي.")}</p>
              <span className="mt-4 inline-flex items-center text-sm font-bold text-emerald-400">{t("Local service details", "تفاصيل مناطق الخدمة")} <ChevronRight className="ms-1 h-4 w-4 rtl:rotate-180" aria-hidden="true" /></span>
            </Link>
            <Link to={route("/blog")} className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition hover:border-emerald-500/40">
              <BookOpen className="mb-4 h-6 w-6 text-emerald-400" aria-hidden="true" />
              <h2 className="text-lg font-bold text-white group-hover:text-emerald-300">{t("Learn before you book", "اقرأ قبل لا تحجز")}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{t("Read practical troubleshooting and buying guides to understand the problem and your options.", "اقرأ أدلة عملية للتعرف على المشكلة وخيارات الإصلاح.")}</p>
              <span className="mt-4 inline-flex items-center text-sm font-bold text-emerald-400">{t("Read repair guides", "أدلة التصليح (بالإنجليزي)")} <ChevronRight className="ms-1 h-4 w-4 rtl:rotate-180" aria-hidden="true" /></span>
            </Link>
          </section>
          {ar && <section className="mt-10 flex flex-col gap-4 rounded-3xl border border-[#c9804d]/25 bg-[#c9804d]/[0.07] p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9" aria-label="غير متأكد من الخدمة المناسبة؟">
            <div><h2 className="text-2xl font-black text-white">غير متأكد من الخدمة المناسبة؟</h2><p className="mt-3 max-w-2xl leading-7 text-slate-300">صف المشكلة ونوع الجهاز ومنطقتك، ونساعدك في تحديد الخطوة المناسبة للفحص والاستلام.</p></div>
            <Link to="/ar/book" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-[#c9804d] px-6 py-3 font-extrabold text-[#101114]">احجز استلام مجاني</Link>
          </section>}
        </div>
      </div>
    </>
  );
}
