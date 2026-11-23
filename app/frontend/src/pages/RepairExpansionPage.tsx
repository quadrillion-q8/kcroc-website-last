import React from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import {
  ArrowUpRight, BadgeCheck, CheckCircle2, ChevronDown, ClipboardCheck,
  MapPin, ShieldCheck, Truck, Wrench,
} from 'lucide-react';
import { KCROC_GRAPH } from '../data/graph';
import { REPAIR_EXPANSION } from '../data/repairExpansion';
import { SEOEngine } from '../core/components/SEOEngine';
import { localizedSitePath } from '../utils/locale';
import ServiceConversionActions from '../components/content/ServiceConversionActions';
import './RepairExpansionPage.css';

type Bilingual = { en: string; ar: string };
type VisualCopy = { intro: string; hero: Bilingual; detail: Bilingual };

// Editorial image descriptions are specific to the photographed component.
// Never imply that an illustrative photograph is a verified customer case.
const VISUALS: Record<string, VisualCopy> = {
  'laptop-cleaning-thermal-paste-kuwait': {
    intro: 'Reduce heat and fan noise with a diagnosis-led internal clean. We check airflow and temperatures before deciding whether fresh thermal material is appropriate.',
    hero: { en: 'Thermal paste on the laptop processor during cooling-system service', ar: 'المعجون الحراري على معالج اللابتوب أثناء فحص التبريد' },
    detail: { en: 'Laptop fan and heatsink during careful dust removal', ar: 'مروحة اللابتوب والمشتت الحراري أثناء تنظيف الغبار' },
  },
  'laptop-fan-replacement-kuwait': {
    intro: 'A grinding, stalled or intermittent cooling fan needs diagnosis, not guesswork. We identify the fault and match a replacement to the exact laptop model.',
    hero: { en: 'Laptop cooling fan with its identifying part-number label', ar: 'مروحة تبريد لابتوب مع رقم القطعة للتأكد من التوافق' },
    detail: { en: 'Original and replacement cooling fans prepared for model matching', ar: 'مروحة قديمة وبديلة للمقارنة والتأكد من التوافق' },
  },
  'macbook-charging-port-repair-kuwait': {
    intro: 'A loose USB-C connector or interrupted charging can originate in the port, cable or logic board. We test the power path before recommending the right repair.',
    hero: { en: 'MacBook USB-C connector and board-side charging-port components', ar: 'مدخل شحن USB-C ومكوناته على لوحة ماك بوك' },
    detail: { en: 'MacBook logic-board area with charging power-control components', ar: 'منطقة التحكم بالشحن والطاقة على لوجك بورد ماك بوك' },
  },
  'bios-repair-kuwait': {
    intro: 'A failed firmware update or a computer that will not complete POST does not always mean the BIOS chip is damaged. We verify the board and recovery options first.',
    hero: { en: 'ASUS motherboard BIOS setup screen during firmware diagnostics', ar: 'شاشة إعدادات BIOS للوحة ASUS أثناء فحص الفيرموير' },
    detail: { en: 'Motherboard repair tools used for board-level fault investigation', ar: 'أدوات فحص وإصلاح اللوحة الأم للأعطال على مستوى المكونات' },
  },
  'pc-power-supply-replacement-kuwait': {
    intro: 'No power, unexpected shutdowns or instability can point to the desktop power supply or another component. We test the complete PC before quoting a compatible PSU replacement.',
    hero: { en: 'Desktop computer with power supply and internal connections visible', ar: 'الكمبيوتر المكتبي من الداخل مع مزود الطاقة وتوصيلاته' },
    detail: { en: 'Power supply inside a compact desktop computer', ar: 'مزود طاقة داخل كمبيوتر مكتبي صغير الحجم' },
  },
  'macbook-liquid-damage-repair-kuwait': {
    intro: 'Liquid exposure needs careful inspection, not repeated power-on attempts. We assess contamination and logic-board damage before explaining repair feasibility and cost.',
    hero: { en: 'MacBook logic board removed for component-level inspection', ar: 'لوجك بورد ماك بوك مفكوك لفحص المكونات' },
    detail: { en: 'MacBook logic-board cleaning during contamination assessment', ar: 'تنظيف لوجك بورد ماك بوك أثناء فحص آثار السوائل' },
  },
};

const AR_RELATED_LABELS: Record<string, string> = {
  '/laptop-repair-kuwait': 'تصليح اللابتوب',
  '/laptop-overheating-kuwait': 'فحص سخونة اللابتوب',
  '/gaming-laptop-cleaning-kuwait': 'تنظيف وتبريد لابتوب الألعاب',
  '/macbook-repair-kuwait': 'تصليح ماك بوك',
  '/laptop-charging-port-repair-kuwait': 'تصليح مدخل شحن اللابتوب',
  '/motherboard-repair-kuwait': 'تصليح المذربورد',
  '/desktop-pc-repair-kuwait': 'تصليح الكمبيوتر المكتبي',
  '/gaming-pc-repair-kuwait': 'تصليح كمبيوتر الألعاب',
  '/laptop-liquid-damage-repair-kuwait': 'تصليح اللابتوب المتضرر من السوائل',
  '/macbook-liquid-damage-repair-kuwait': 'تصليح ماك بوك المتضرر من السوائل',
};

export default function RepairExpansionPage() {
  const { pathname } = useLocation();
  const ar = pathname.startsWith('/ar/');
  const slug = pathname.replace(/^\/ar\//, '/').split('/').filter(Boolean).pop() ?? '';
  const item = REPAIR_EXPANSION.find((candidate) => candidate.slug === slug);
  if (!item) return <Navigate to="/404" replace />;

  const entityId = ar ? 'page-ar-' + item.id : item.id;
  const activeEntity = KCROC_GRAPH.routableEntities.some((entity) => entity.id === entityId && entity.isActive);
  const business = KCROC_GRAPH.business;
  if (!activeEntity || !business) return <Navigate to="/404" replace />;

  const locale = ar ? 'ar' : 'en';
  const t = (english: string, arabic: string) => ar ? arabic : english;
  const copy = ar ? item.ar : item;
  const visual = VISUALS[item.slug];
  const title = ar ? item.arabicTitle : item.title;
  const intro = ar ? item.ar.intro : visual.intro;
  const waText = ar
    ? 'السلام عليكم KCROC، أبي استفسر عن ' + item.arabicTitle + '. موديل الجهاز الكامل: ____. العطل والأعراض: ____. المنطقة: ____. أبي فحص وعرض السعر شامل القطع وأجرة العمل قبل التصليح.'
    : 'Hello KCROC, I would like diagnosis for ' + item.title + '. Exact device brand/model: ____. Symptoms and history: ____. Kuwait pickup area: ____. Please confirm compatibility, parts availability and total quote before any paid repair.';
  const wa = 'https://wa.me/' + business.telephone + '?text=' + encodeURIComponent(waText);
  const relatedPaths = [...new Set([
    item.parent,
    ...item.related
      .map((id) => KCROC_GRAPH.services.find((service) => service.id === id)?.slug)
      .filter((value): value is string => Boolean(value))
      .map((value) => '/' + value),
  ])].filter((path) => path !== '/' + item.slug).slice(0, 4);
  const related = relatedPaths.map((path) => {
    const href = localizedSitePath(path, locale);
    const localizedEntity = KCROC_GRAPH.routableEntities.find((entity) => entity.slug === href.replace(/^\//, ''));
    const englishEntity = KCROC_GRAPH.routableEntities.find((entity) => entity.slug === path.replace(/^\//, ''));
    const label = ar
      ? AR_RELATED_LABELS[path] || (localizedEntity && /[\u0600-\u06ff]/.test(localizedEntity.title) ? localizedEntity.title : t('Repair service', 'خدمة تصليح مرتبطة'))
      : englishEntity?.title || 'Related repair service';
    return { path, href, label };
  });

  return (
    <>
      <SEOEngine entityId={entityId} />
      <div
        className="kcroc-repair"
        lang={ar ? 'ar-KW' : 'en-KW'}
        dir={ar ? 'rtl' : 'ltr'}
        data-service-layout="service"
        data-repair-expansion={slug}
      >
        <section className="kcroc-repair-hero" aria-labelledby="kcroc-repair-title">
          <div className="kcroc-repair-container">
            <nav className="kcroc-repair-breadcrumbs" aria-label={t('Breadcrumb', 'مسار التنقل')}>
              <Link to={ar ? '/ar' : '/'}>{t('Home', 'الرئيسية')}</Link>
              <span aria-hidden="true">/</span>
              <Link to={ar ? '/ar/services' : '/services'}>{t('Repair services', 'خدمات التصليح')}</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{title}</span>
            </nav>

            <div className="kcroc-repair-hero-grid">
              <div className="kcroc-repair-hero-copy">
                <p className="kcroc-repair-eyebrow kcroc-repair-eyebrow-on-dark">
                  <Wrench className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {t('PRECISION DIAGNOSIS · HAWALLI LAB', 'فحص دقيق في مختبر حولي')}
                </p>
                <h1 id="kcroc-repair-title">{title}</h1>
                <p className="kcroc-repair-hero-intro">{intro}</p>
                <div className="kcroc-repair-hero-facts">
                  <span><MapPin aria-hidden="true" />{t('Repair work at our Hawalli lab', 'التصليح داخل مختبر حولي')}</span>
                  <span><ShieldCheck aria-hidden="true" />{t('Quote before paid work', 'السعر واضح قبل أي عمل')}</span>
                </div>
                <ServiceConversionActions locale={locale} entityId={entityId} whatsappHref={wa} showPricing className="kcroc-repair-actions" />
                <p className="kcroc-repair-microcopy">
                  {t(
                    'Exact repair scope, compatible parts and turnaround are confirmed after diagnosis of your model. No automatic replacement or unverified availability promises.',
                    'نحدد طريقة التصليح وتوافق القطعة والمدة عقب فحص موديل جهازك. ما نبدّل قطع أو نؤكد توفرها قبل التأكد.'
                  )}
                </p>
              </div>

              <figure className="kcroc-repair-hero-figure">
                <div className="kcroc-repair-image-wrap">
                  <img
                    src={item.photo}
                    alt={ar ? visual.hero.ar : visual.hero.en}
                    data-kcroc-service-photo="hero"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    className="kcroc-repair-hero-image"
                  />
                </div>
                <figcaption>
                  <span className="kcroc-repair-image-tag">{t('COMPONENT DETAIL', 'تفاصيل المكوّن')}</span>
                  <span>{ar ? visual.hero.ar : visual.hero.en}</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="kcroc-repair-confidence" aria-label={t('Our customer commitments', 'التزاماتنا للعملاء')}>
          <div className="kcroc-repair-confidence-inner">
            <div>
              <ClipboardCheck aria-hidden="true" />
              <span><strong>{t('Free initial diagnosis', 'الفحص الأولي مجاني')}</strong><small>{t('Understand the fault first', 'نعرف سبب العطل أول')}</small></span>
            </div>
            <div>
              <Truck aria-hidden="true" />
              <span><strong>{t('Free pickup and delivery', 'استلام وتوصيل مجاني')}</strong><small>{t('Across Kuwait', 'في جميع مناطق الكويت')}</small></span>
            </div>
            <div>
              <BadgeCheck aria-hidden="true" />
              <span><strong>{t('30-day repair warranty', 'ضمان تصليح 30 يوم')}</strong><small>{t('On covered completed repairs', 'على الإصلاحات المكتملة المشمولة')}</small></span>
            </div>
          </div>
        </section>

        <section className="kcroc-repair-symptoms" aria-labelledby="kcroc-repair-symptoms-title">
          <div className="kcroc-repair-container kcroc-repair-symptoms-grid">
            <div className="kcroc-repair-section-intro">
              <p className="kcroc-repair-eyebrow">{t('RECOGNIZE THE SIGNS', 'اعرف علامات العطل')}</p>
              <h2 id="kcroc-repair-symptoms-title">{t('When this service may help', 'متى تحتاج هالخدمة؟')}</h2>
              <p>{t(
                'These are useful clues, not a final diagnosis. The same symptom can have several different hardware causes.',
                'هذي علامات تساعدنا نحدد مكان الفحص، لكنها مو تشخيص نهائي. نفس العَرَض ممكن يكون له أكثر من سبب.'
              )}</p>
            </div>
            <ul className="kcroc-repair-symptom-list">
              {copy.symptoms.map((symptom, index) => (
                <li key={symptom} className="kcroc-repair-symptom">
                  <span className="kcroc-repair-symptom-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="kcroc-repair-diagnosis" aria-labelledby="kcroc-repair-diagnosis-title">
          <div className="kcroc-repair-container">
            <div className="kcroc-repair-section-intro kcroc-repair-diagnosis-head">
              <p className="kcroc-repair-eyebrow">{t('INSPECT · IDENTIFY · REPAIR · RETEST', 'نفحص · نحدد العطل · نصلح · نختبر')}</p>
              <h2 id="kcroc-repair-diagnosis-title">{t('What happens in the repair lab', 'شنو نفحص داخل المختبر؟')}</h2>
              <p>{t(
                'Our checks follow the device and its reported fault. We confirm the cause before discussing parts, pricing or repair steps.',
                'الفحص يعتمد على الجهاز والأعراض اللي ذكرتها. نحدد السبب قبل ما نتكلم عن القطع والسعر وخطوات التصليح.'
              )}</p>
            </div>

            <div className="kcroc-repair-diagnosis-grid">
              <ol className="kcroc-repair-steps">
                {copy.checks.map((step, index) => (
                  <li key={step}>
                    <span className="kcroc-repair-step-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                    <span>{step}</span>
                    <CheckCircle2 aria-hidden="true" className="kcroc-repair-step-check" />
                  </li>
                ))}
              </ol>
              <figure className="kcroc-repair-detail-figure">
                <img
                  src={item.pricingPhoto}
                  alt={ar ? visual.detail.ar : visual.detail.en}
                  data-kcroc-service-photo="detail"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>{ar ? visual.detail.ar : visual.detail.en}</figcaption>
              </figure>
            </div>

            <aside className="kcroc-repair-scope" role="note">
              <ShieldCheck aria-hidden="true" />
              <div>
                <h3>{t('Repair scope and safety', 'نطاق الخدمة والسلامة')}</h3>
                <p>{ar ? item.ar.scope : item.scope}</p>
              </div>
            </aside>
          </div>
        </section>

        <section className="kcroc-repair-faq" aria-labelledby="kcroc-repair-faq-title">
          <div className="kcroc-repair-container kcroc-repair-faq-inner">
            <div className="kcroc-repair-section-intro">
              <p className="kcroc-repair-eyebrow">{t('STRAIGHT ANSWERS', 'إجابات واضحة')}</p>
              <h2 id="kcroc-repair-faq-title">{t('Frequently asked questions', 'الأسئلة الشائعة')}</h2>
              <p>{t('Answers about diagnosis, compatible parts and what to expect before approving a repair.', 'إجابات عن الفحص والقطع المتوافقة وخطوات العمل قبل الموافقة على التصليح.')}</p>
            </div>
            <div className="kcroc-repair-faq-list">
              {copy.faqs.map(([question, answer], index) => (
                <details key={question} data-kcroc-faq-item="true" className="kcroc-repair-faq-item">
                  <summary>
                    <span className="kcroc-repair-faq-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                    <span className="kcroc-repair-faq-question">{question}</span>
                    <ChevronDown className="kcroc-repair-chevron" aria-hidden="true" />
                  </summary>
                  <div className="kcroc-repair-faq-answer"><p>{answer}</p></div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="kcroc-repair-next" aria-labelledby="kcroc-repair-next-title">
          <div className="kcroc-repair-container kcroc-repair-next-grid">
            <div className="kcroc-repair-next-primary">
              <p className="kcroc-repair-eyebrow">{t('READY FOR THE NEXT STEP?', 'تبي تعرف الخطوة التالية؟')}</p>
              <h2 id="kcroc-repair-next-title">{t('Tell us your device model and the problem', 'أرسل موديل الجهاز واشرح العطل')}</h2>
              <p>{t(
                'Share the exact model, symptoms and pickup area. We will explain the next diagnostic step and confirm the quote before any paid work.',
                'أرسل الموديل والأعراض والمنطقة. نوضح طريقة الفحص ونأكد عرض السعر قبل أي تصليح مدفوع.'
              )}</p>
              <div className="kcroc-repair-next-actions">
                <Link to={localizedSitePath('/book', locale)} className="kcroc-repair-book">
                  {t('Arrange free pickup', 'احجز استلام مجاني')} <ArrowUpRight aria-hidden="true" />
                </Link>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="kcroc-repair-contact">
                  {t('Discuss on WhatsApp', 'استفسر على واتساب')}
                </a>
              </div>
            </div>
            <div className="kcroc-repair-next-related">
              <h3>{t('Related repair services', 'خدمات تصليح مرتبطة')}</h3>
              <div className="kcroc-repair-related-links">
                {related.map(({ href, label }) => (
                  <Link to={href} key={href}>
                    <span>{label}</span>
                    <ArrowUpRight aria-hidden="true" />
                  </Link>
                ))}
              </div>
              <Link to={localizedSitePath('/location/hawalli', locale)} className="kcroc-repair-location-link">
                <MapPin aria-hidden="true" />
                {t('Visit the Hawalli repair lab page', 'تعرف على مختبرنا في حولي')}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
