// File: app/frontend/src/pages/templates/ServiceTemplate.tsx
import React from 'react';
import './ServiceTemplateLaptopLayout.css';
import { Navigate, Link } from 'react-router-dom';
import { Laptop, Apple, Gamepad2, Cpu, Wrench, ShieldCheck, Clock, MessageCircle, Users, Monitor, ChevronDown, AlertTriangle, MapPin, Gauge, ArrowRight, BookOpen, Tag } from 'lucide-react';
import { KCROC_GRAPH } from '../../data/graph';
import { SEOEngine } from '../../core/components/SEOEngine';
import { useAnalytics } from '../../core/analytics/AnalyticsProvider';
import { buildWhatsAppLink } from '../../utils/whatsappIntent';
import CoreRepairPillars from '../../components/content/CoreRepairPillars';

const ICON_MAP: Record<string, React.ElementType> = {
  'apple': Apple,
  'laptop': Laptop,
  'gaming': Gamepad2,
  'cpu': Cpu,
  'monitor': Monitor,
};

interface ServiceTemplateProps {
  entityId?: string;
}

export default function ServiceTemplate({ entityId }: ServiceTemplateProps) {
  const { trackConversion } = useAnalytics();

  const entity = KCROC_GRAPH.services.find((e) => e.id === entityId);

  if (!entity) {
    console.warn(`[ServiceTemplate] No service found for entityId: ${entityId}`);
    return <Navigate to="/404" replace />;
  }

  const ServiceIcon = ICON_MAP[entity.iconKey] || Wrench;
  const business = KCROC_GRAPH.business;

  // Optional-with-default fields per the knowledge-graph schema — not every
  // service entity in graph.ts sets these, so guard against undefined here
  // (mirrors the pattern already used in BrandTemplate/ProblemTemplate).
  const relatedServiceIds = entity.relatedServiceIds ?? [];

  // Build a conservative reverse-link layer from the knowledge graph. Some
  // Problem and Location nodes already point to this service, but older service
  // records do not always repeat every reciprocal edge. Surfacing those existing
  // edges here strengthens the Problem → Service → Location path without creating
  // new URLs or relying on keyword-stuffed copy.
  const reverseProblemIds = KCROC_GRAPH.problems
    .filter((problem) => (problem.relatedServiceIds ?? []).includes(entity.id))
    .map((problem) => problem.id);
  const relatedProblemIds = entity.id === 'srv-gaming' ? [] : [...new Set([...(entity.relatedProblemIds ?? []), ...reverseProblemIds])].slice(0, 8);

  const reverseLocationIds = KCROC_GRAPH.locations
    .filter((location) => (location.relatedServiceIds ?? []).includes(entity.id))
    .map((location) => location.id);
  const locationPriority = ['hawalli', 'salmiya', 'kuwait-city', 'farwaniya', 'jahra', 'ahmadi', 'fahaheel', 'mangaf'];
  const relatedLocationIds = [...new Set([...(entity.relatedLocationIds ?? []), ...reverseLocationIds])]
    .sort((a, b) => {
      const aSlug = KCROC_GRAPH.locations.find((location) => location.id === a)?.slug ?? '';
      const bSlug = KCROC_GRAPH.locations.find((location) => location.id === b)?.slug ?? '';
      return (locationPriority.indexOf(aSlug) < 0 ? 999 : locationPriority.indexOf(aSlug)) -
        (locationPriority.indexOf(bSlug) < 0 ? 999 : locationPriority.indexOf(bSlug));
    })
    .slice(0, 8);

  const relatedBrandIds = entity.relatedBrandIds ?? [];
  const relatedResourcePaths = entity.relatedResourcePaths ?? [];
  const symptomFinderHeading =
    entity.id === 'srv-laptop'
      ? 'What is wrong with your laptop?'
      : entity.id === 'srv-gaming'
        ? 'What is your gaming PC doing?'
        : entity.id === 'srv-gaming-laptop'
          ? 'What is your gaming laptop doing?'
          : 'Choose the symptom that best matches your device';
  const arabicEquivalent = KCROC_GRAPH.pages.find((page) =>
    page.isActive &&
    page.seo.locale === 'ar_KW' &&
    page.seo.alternates?.['en-KW'] === entity.seo.canonicalUrl
  );

  // For the laptop-repair page, promote an existing genuine repair photo into
  // the hero and use the next existing workshop photo in the capabilities block.
  // This changes image placement only; image copy, page copy and SEO data stay intact.
  const getContentImage = (placement: 'hero' | 'commonIssues' | 'coreFeatures' | 'process') => {
    const images = entity.contentImages ?? [];
    if (entity.id === 'srv-laptop' && placement === 'coreFeatures' && !images.some((img) => img.placement === 'hero')) {
      return images.filter((img) => img.placement === 'coreFeatures')[1];
    }
    return images.find((img) => img.placement === placement);
  };

  const heroImage = getContentImage('hero') ??
    (entity.id === 'srv-laptop' ? entity.contentImages?.find((img) => img.placement === 'coreFeatures') : undefined);

  const ContentImage = ({ image }: { image: NonNullable<typeof entity.contentImages>[number] }) => (
    <Link
      to="/gallery"
      className="group block mb-8 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/50 hover:border-cyan-500/40 transition-colors"
      aria-label={`${image.alt} — view more repair photos in our gallery`}
    >
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading="lazy"
        className="w-full max-h-96 object-cover group-hover:opacity-90 transition-opacity"
      />
      {image.caption && (
        <p className="text-xs text-slate-400 px-5 py-3 border-t border-slate-800/70">
          {image.caption}
        </p>
      )}
    </Link>
  );

  const isLaptopService = entity.id === 'srv-laptop';
  const isMotherboardService = entity.id === 'srv-motherboard';
  // Keep the established motherboard heading expression separate from the
  // gaming-PC-specific H1 so service headings remain independently testable.
  const defaultServiceHeading = isMotherboardService ? 'Laptop & Desktop Motherboard Repair in Kuwait' : entity.title;
  const isScreenService = entity.id === 'srv-screen';
  const isMacbookScreenService = entity.id === 'srv-macbook-screen';
  const whatsappLink = buildWhatsAppLink(isScreenService
    ? 'Hi KCROC, I need a laptop screen repair quote in Kuwait. Laptop brand/model: ____. Screen symptom: ____. Area in Kuwait: ____. I can send a photo if needed. Please confirm compatible panel availability and the total price including panel and labour.'
    : isMacbookScreenService
      ? 'Hi KCROC, I need MacBook screen replacement in Kuwait. Exact MacBook model and generation: ____. Screen symptoms: ____. Area in Kuwait: ____. Please confirm compatible display availability, the total price including labour and display assembly, and the expected turnaround before repair.'
      : entity.id === 'srv-gaming-laptop'
        ? 'Hi KCROC, I need gaming-laptop repair in Kuwait. Brand and exact model: ____. Main symptom: ____. Kuwait area: ____. I can share photos or a short video if useful. Please advise on diagnosis, the expected turnaround and the quote before repair.'
        : `Hi KCROC, I'd like a free estimate for ${entity.title}.`);

  const severityStyles: Record<string, string> = {
    critical: 'border-red-500/40 bg-red-950/20 text-red-300',
    high: 'border-orange-500/40 bg-orange-950/20 text-orange-300',
    medium: 'border-amber-500/40 bg-amber-950/20 text-amber-300',
    low: 'border-slate-600/40 bg-slate-900/40 text-slate-300',
  };

  return (
    <>
      <SEOEngine entityId={entity.id} />

      <div data-service-layout={isLaptopService ? 'laptop-repair' : undefined} className="min-h-screen bg-transparent text-white pt-8 sm:pt-16 lg:pt-32 pb-8 sm:pb-16">
        
        <header className="max-w-7xl mx-auto px-6 bg-slate-900/30 backdrop-blur-md border border-slate-800/50 rounded-3xl p-8 mb-12 shadow-2xl">
          <div className={`grid gap-10 items-center ${heroImage ? 'lg:grid-cols-[1.15fr_1fr]' : ''}`}>
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-brand-dark border border-slate-800 rounded-2xl flex items-center justify-center shadow-inner">
                  <ServiceIcon className="w-8 h-8 text-cyan-400" />
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl leading-tight font-black text-white">{isScreenService ? 'Laptop Screen Repair & Replacement in Kuwait' : isLaptopService ? 'Laptop Repair Kuwait — Component-Level Diagnostics & Hardware Restoration' : entity.id === 'srv-gaming' ? 'Gaming PC Repair Kuwait — Chip-Level GPU, Motherboard & Cooling Lab' : defaultServiceHeading}</h1>
              </div>

              <div className="max-w-3xl mb-8 space-y-3">
                {entity.shortDescription && (
                  <p className="text-lg sm:text-xl font-bold text-white leading-relaxed">{entity.shortDescription}</p>
                )}
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed">{entity.description}</p>
              </div>

              {entity.idealCustomer && (
                <p className="flex items-start gap-3 text-sm text-slate-400 max-w-3xl mb-8">
                  <Users className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span><span className="font-semibold text-slate-300">Built for:</span> {entity.idealCustomer}</span>
                </p>
              )}

              <div className="mt-2 mb-6 flex flex-wrap gap-3">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" onClick={() => trackConversion('whatsapp_click', { cta_name: `service_hero_whatsapp_${entity.id}`, button_position: 'service_hero' })} className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-extrabold text-slate-950 shadow-lg shadow-emerald-950/20 hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" /> {isScreenService ? 'Get a Screen Repair Quote on WhatsApp' : isMacbookScreenService ? 'Get a MacBook Screen Quote on WhatsApp' : 'Get a Free Quote on WhatsApp'}
                </a>
                <Link to="/book" onClick={() => trackConversion('cta_click', { cta_name: `service_hero_book_pickup_${entity.id}`, button_position: 'service_hero' })} className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-5 py-3 text-sm font-extrabold text-cyan-200 hover:bg-cyan-500/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
                  <ArrowRight className="h-5 w-5" aria-hidden="true" /> Book Free Pickup
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl">
                <div className="bg-brand-dark/80 px-4 py-3 rounded-xl border border-slate-800 flex items-center gap-3">
                  <Gauge className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <div>
                    <span className="block text-[10px] text-slate-500 uppercase font-black tracking-wider">Repair level</span>
                    <span className="font-semibold text-white capitalize">{isScreenService ? 'Panel, Cable & Backlight Diagnostics' : entity.repairLevel.replace(/-/g, ' ')}</span>
                  </div>
                </div>

                <div className="bg-brand-dark/80 px-4 py-3 rounded-xl border border-slate-800 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <div>
                    <span className="block text-[10px] text-slate-500 uppercase font-black tracking-wider">Typical turnaround</span>
                    <span className="font-semibold text-white">{entity.estimatedTurnaround}</span>
                  </div>
                </div>

                {entity.warranty && (
                  <div className="bg-brand-dark/80 px-4 py-3 rounded-xl border border-slate-800 flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                    <div>
                      <span className="block text-[10px] text-slate-500 uppercase font-black tracking-wider">Warranty</span>
                      <span className="font-semibold text-white">{entity.warranty.duration}</span>
                    </div>
                  </div>
                )}

                <div className="bg-cyan-900/20 px-4 py-3 rounded-xl border border-cyan-500/30 flex items-center gap-3">
                  <Tag className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <div>
                    <span className="block text-[10px] text-cyan-300/70 uppercase font-black tracking-wider">Pricing</span>
                    <span className="font-semibold text-cyan-300">{entity.id === 'srv-gaming-laptop' ? 'Thermal 15–20 KWD • board repair 25–60 KWD' : entity.pricing?.displayLabel || 'Quote after diagnosis'}</span>
                  </div>
                </div>
              </div>
              <Link to="/pricing" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300">
                See KCROC repair pricing and starting prices <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              {entity.id === 'srv-gaming-laptop' && (
                <p className="mt-2 max-w-3xl text-xs leading-5 text-slate-400">Free diagnosis. Charging-port repair: 20–35 KWD. Screen replacement labour: from 30 KWD plus the panel. Final pricing depends on model, confirmed fault and compatible parts; we provide a written quote before paid work.</p>
              )}
            </div>

            {heroImage && (
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
                <img
                  src={heroImage.src}
                  alt={heroImage.alt}
                  width={heroImage.width}
                  height={heroImage.height}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-64 sm:h-80 lg:h-full object-cover"
                />
                {heroImage.caption && (
                  <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-dark/90 to-transparent text-xs text-slate-200 px-4 py-3">
                    {heroImage.caption}
                  </p>
                )}
              </div>
            )}
          </div>
        </header>

        {entity.commercialAnswers && entity.commercialAnswers.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-800/50 relative z-10" aria-labelledby="commercial-answers">
            <div className="max-w-3xl mb-8">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-400 mb-2">Before you book</p>
              <h2 id="commercial-answers" className="text-2xl sm:text-3xl font-black text-white">What to know before choosing this repair service</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                The practical questions customers usually ask about repairability, price, turnaround, pickup, data and technical scope.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {entity.commercialAnswers.map((item) => (
                <article key={item.question} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
                  <h3 className="text-base font-bold text-white">{item.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{item.answer}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {entity.symptomLinks && entity.symptomLinks.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-800/50 relative z-10" aria-labelledby="symptom-finder">
            <div className="max-w-3xl mb-8">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-400 mb-2">Start with your symptom</p>
              <h2 id="symptom-finder" className="text-2xl sm:text-3xl font-black text-white">{symptomFinderHeading}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Choose the closest symptom. Each path explains likely causes, safe checks and when a proper diagnosis is more useful than guessing or replacing parts.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {entity.symptomLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="group rounded-2xl border border-slate-800 bg-slate-900/55 p-5 transition-all hover:-translate-y-0.5 hover:border-cyan-500/40 hover:bg-slate-900/75"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">{item.label}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>
                    </div>
                    <ArrowRight className="mt-1 h-5 w-5 flex-shrink-0 text-cyan-400 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {entity.whyChooseUs && entity.whyChooseUs.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-800/50 relative z-10" aria-labelledby="why-choose-us-heading">
            <h2 id="why-choose-us-heading" className="text-2xl font-bold mb-8 text-white flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-cyan-400" aria-hidden="true" /> Why Choose Us
            </h2>
            {' '}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {entity.whyChooseUs.map((point, idx) => (
                <article key={idx} aria-labelledby={`why-choose-${entity.id}-${idx}`} className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/30 transition-colors">
                  <h3 id={`why-choose-${entity.id}-${idx}`} className="text-white font-bold mb-2">{point.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{point.description}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {entity.technicalOverview && (
          <section className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-800/50 relative z-10">
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold mb-6 text-white">{entity.technicalOverview.heading}</h2>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                {entity.technicalOverview.paragraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>
          </section>
        )}

        {entity.repairDecision && entity.repairDecision.items.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-800/50 relative z-10">
            <h2 className="text-2xl font-bold mb-8 text-white">{entity.repairDecision.heading}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {entity.repairDecision.items.map((item, idx) => (
                <div key={idx} className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-800">
                  <h3 className="text-white font-bold mb-2">{item.condition}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.action}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {entity.coreFeatures && entity.coreFeatures.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-800/50 relative z-10" aria-labelledby="service-capabilities-heading">
            <h2 id="service-capabilities-heading" className="text-2xl font-bold mb-8 text-white">
              {entity.id === 'srv-laptop' ? 'Repair Capabilities' : 'Service Capabilities'}
            </h2>
            {getContentImage('coreFeatures') && <ContentImage image={getContentImage('coreFeatures')!} />}
            <ul role="list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 list-none p-0 m-0">
              {entity.coreFeatures.filter((feature) => feature.trim().length > 0).map((feature, idx) => (
                <li key={idx} className="flex items-center space-x-3 bg-slate-900/50 backdrop-blur-sm p-5 rounded-xl border border-slate-800 hover:border-cyan-500/30 transition-colors">
                  <ShieldCheck className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span className="text-slate-200 font-medium">{feature}</span>
                </li>
              ))}
            </ul>
            {entity.advancedTechnicalSection && (
              <div className="mt-10 border-t border-slate-800 pt-8" aria-labelledby="advanced-technical-section-heading">
                <div className="max-w-4xl mb-6">
                  <h3 id="advanced-technical-section-heading" className="text-xl sm:text-2xl font-black text-white">{entity.advancedTechnicalSection.heading}</h3>
                  <p className="mt-3 text-sm sm:text-base leading-7 text-slate-300">{entity.advancedTechnicalSection.intro}</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {entity.advancedTechnicalSection.items.map((item) => (
                    <article key={item.title} className="rounded-2xl border border-slate-800 bg-slate-900/55 p-5">
                      <h4 className="font-bold leading-6 text-white">{item.title}</h4>
                      <p className="mt-3 text-sm leading-7 text-slate-400">{item.description}</p>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {((entity.deviceTypes && entity.deviceTypes.length > 0) || (entity.brands && entity.brands.length > 0)) && (
          <section className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-800/50 relative z-10" aria-label="Supported device types and brands">
            {entity.deviceTypes && entity.deviceTypes.length > 0 && (
              <div className="mb-8">
                <h2 id="devices-we-cover-heading" className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                  <Monitor className="w-6 h-6 text-cyan-400" aria-hidden="true" /> {isMotherboardService ? 'Devices We Cover: Laptop, Desktop PC & MacBook Logic Boards' : 'Devices We Cover'}
                </h2>
                {' '}
                <ul role="list" aria-label="Supported device types" className="flex flex-wrap gap-3">
                  {entity.deviceTypes.map((device, idx) => (
                    <li key={idx}>
                      <span className="inline-flex px-4 py-2 rounded-full bg-slate-900/60 border border-slate-800 text-slate-200 text-sm font-medium">
                        {device}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {entity.modelFaultMatrix && entity.modelFaultMatrix.length > 0 && (
              <div className="mt-8" aria-labelledby="service-model-faults-heading">
                <h3 id="service-model-faults-heading" className="text-xl sm:text-2xl font-black text-white mb-3">
                  {entity.id === 'srv-macbook-screen' ? 'MacBook Model Numbers & Display Faults We Assess' : 'Model-Specific Gaming Laptop Faults We Assess'}
                </h3>
                <p className="mb-5 max-w-5xl text-sm leading-7 text-slate-400">
                  {entity.id === 'srv-macbook-screen'
                    ? 'These A-numbers are representative model references, not a promise that every symptom is a known defect. We confirm the exact model, year, identifier and display assembly before quoting.'
                    : 'These are examples of diagnostic paths—not claims that every model has a known defect. Hardware revisions vary within each family, so we verify the exact model and symptoms before identifying a fault or ordering parts.'}
                </p>
                <div className="overflow-x-auto rounded-2xl border border-slate-700/80 bg-slate-900/45">
                  <table className="w-full min-w-[820px] border-collapse text-left text-sm">
                    <caption className="sr-only">
                      {entity.id === 'srv-macbook-screen'
                        ? 'MacBook families, example A-numbers, and model-dependent display checks.'
                        : 'Gaming laptop families, representative models, and model-dependent diagnostic checks.'}
                    </caption>
                    <thead className="bg-slate-800/90 text-slate-100">
                      <tr>
                        <th scope="col" className="px-4 py-4 font-bold">{entity.id === 'srv-macbook-screen' ? 'MacBook model family' : 'Gaming laptop family'}</th>
                        <th scope="col" className="px-4 py-4 font-bold">{entity.id === 'srv-macbook-screen' ? 'Example A-numbers' : 'Example models'}</th>
                        <th scope="col" className="px-4 py-4 font-bold">{entity.id === 'srv-macbook-screen' ? 'Display symptoms and checks' : 'Fault paths we assess'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/70">
                      {entity.modelFaultMatrix.map((row) => (
                        <tr key={row.family} className="align-top even:bg-slate-950/30">
                          <th scope="row" className="px-4 py-4 font-semibold text-white">{row.family}</th>
                          <td className="px-4 py-4 leading-6 text-slate-300">{row.models}</td>
                          <td className="px-4 py-4 leading-7 text-slate-300">{row.diagnostics}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {entity.id !== 'srv-gaming-laptop' && entity.brands && entity.brands.length > 0 && (
              <div>
                <h3 className="text-sm uppercase tracking-wider font-bold text-slate-400 mb-4">Brands We Service</h3>
                {' '}
                <ul role="list" aria-label="Brands serviced" className="flex flex-wrap gap-2">
                  {entity.brands.map((brand, idx) => (
                    <li key={idx}>
                      <span className="inline-flex px-3 py-1.5 rounded-lg bg-cyan-900/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
                        {brand}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {isScreenService && (
          <section className="max-w-7xl mx-auto px-6 py-10 border-t border-slate-800/50 relative z-10" aria-labelledby="laptop-display-compatibility">
            <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/60 p-6 sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-400 mb-2">Model-specific compatibility</p>
              <h2 id="laptop-display-compatibility" className="text-2xl sm:text-3xl font-black text-white">Laptop display specifications we check</h2>
              <p className="mt-3 max-w-4xl text-sm sm:text-base leading-7 text-slate-300">
                For standard and gaming laptops, we can check compatible Full HD and QHD panels, 16:10 displays, and high-refresh options such as 144Hz, 165Hz or 240Hz where the exact model supports them. Laptop displays may use different 30-pin or 40-pin eDP connectors, resolutions, refresh rates, mounting points and cable layouts.
              </p>
              <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-400">
                These specifications are examples, not a promise that every option fits every laptop. We verify the full laptop model, original panel label and connector/cable configuration before confirming compatibility, availability or the final quote.
              </p>
            </div>
          </section>
        )}

        {entity.commonIssues && entity.commonIssues.length > 0 && (
          <section
            className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-800/50 relative z-10"
            aria-labelledby="common-problems-heading"
          >
            <h2 id="common-problems-heading" className="text-2xl font-bold mb-8 text-white flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-cyan-400" aria-hidden="true" />
              Common Problems We Fix
            </h2>
            {getContentImage('commonIssues') && <ContentImage image={getContentImage('commonIssues')!} />}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {entity.commonIssues.map((issue) => (
                <article
                  key={issue.id}
                  aria-labelledby={`common-issue-${entity.id}-${issue.id}`}
                  className={`p-6 rounded-2xl border backdrop-blur-sm ${severityStyles[issue.severity] || severityStyles.low}`}
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <h3 id={`common-issue-${entity.id}-${issue.id}`} className="text-lg font-bold text-white">
                      {issue.title}
                    </h3>
                    {!isScreenService && (
                      <span className="text-[10px] uppercase tracking-wider font-black px-2.5 py-1 rounded-full bg-black/30 flex-shrink-0">
                        {issue.severity}
                      </span>
                    )}
                  </div>
                  {entity.id === 'srv-laptop' && issue.problem && issue.labFix && issue.service ? (
                    <div className="space-y-3 text-sm leading-relaxed">
                      <p className="text-slate-300">
                        <strong className="font-bold text-cyan-300">Problem:</strong> {issue.problem}
                      </p>
                      <p className="text-slate-300">
                        <strong className="font-bold text-cyan-300">Lab approach:</strong> {issue.labFix}
                      </p>
                      <p className="text-slate-400">
                        <strong className="font-bold text-slate-200">Service:</strong> {issue.service}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed opacity-90">{issue.description}</p>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {entity.performanceOutcomes && entity.performanceOutcomes.items.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-800/50 relative z-10">
            <h2 className="text-2xl font-bold mb-4 text-white">{entity.id === 'srv-gaming' ? 'KCROC Lab Verification Protocol' : 'Typical Results'}</h2>
            <p className="text-xs text-slate-500 mb-8 max-w-2xl">{entity.performanceOutcomes.disclaimer}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {entity.performanceOutcomes.items.map((item, idx) => (
                <div key={idx} className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-800">
                  <h3 className="text-cyan-400 font-bold text-sm uppercase tracking-wide mb-2">{item.metric}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{item.outcome}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {entity.repairExamples && entity.repairExamples.items.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-800/50 relative z-10">
            <h2 className="text-2xl font-bold mb-4 text-white">{entity.id === 'srv-gaming' ? 'How Our Hawalli Lab Traces Complex Gaming PC Faults' : 'Representative Repair Scenarios'}</h2>
            <p className="text-xs text-slate-500 mb-8 max-w-2xl">{entity.repairExamples.disclaimer}</p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {entity.repairExamples.items.map((example) => (
                <div key={example.id} className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-800">
                  <h3 className="text-white font-bold mb-4">{example.title}</h3>
                  <dl className="space-y-3 text-sm">
                    <div>
                      <dt className="text-slate-500 font-semibold uppercase text-[10px] tracking-wide mb-1">Symptoms</dt>
                      <dd className="text-slate-300 leading-relaxed">{example.symptoms}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500 font-semibold uppercase text-[10px] tracking-wide mb-1">Diagnosis</dt>
                      <dd className="text-slate-300 leading-relaxed">{example.diagnosis}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500 font-semibold uppercase text-[10px] tracking-wide mb-1">Outcome</dt>
                      <dd className="text-cyan-300 leading-relaxed">{example.outcome}</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
          </section>
        )}

        {entity.process && entity.process.length > 0 && (
          <section
            className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-800/50 relative z-10"
            aria-labelledby="repair-process-heading"
          >
            <h2 id="repair-process-heading" className="text-2xl font-bold mb-8 text-white">Our Repair Process</h2>
            {' '}
            {getContentImage('process') && <ContentImage image={getContentImage('process')!} />}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {entity.process.map((step) => (
                <article key={step.step} className="relative bg-slate-900/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-800">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-cyan-500 text-slate-950 font-black text-sm mb-4">
                    {step.step}
                  </span>
                  <h3 className="text-white font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
                  {entity.id === 'srv-laptop' && step.step === 2 && entity.inspectionChecklist && entity.inspectionChecklist.length > 0 && (
                    <div className="mt-5 border-t border-slate-700 pt-4">
                      <h4 className="text-sm font-bold text-cyan-300 mb-3">What We Check</h4>
                      <ul role="list" className="space-y-2 list-none p-0 m-0">
                        {entity.inspectionChecklist.filter((item) => item.trim().length > 0).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                            <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {entity.id !== 'srv-laptop' && entity.inspectionChecklist && entity.inspectionChecklist.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-800/50 relative z-10">
            <h2 className="text-2xl font-bold mb-8 text-white flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-cyan-400" /> What We Check
            </h2>
            <ul role="list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 list-none p-0 m-0">
              {entity.inspectionChecklist.filter((item) => item.trim().length > 0).map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 bg-slate-900/40 px-4 py-3 rounded-xl border border-slate-800">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span className="text-slate-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {entity.pricingGuide && entity.pricingGuide.rows.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-800/50 relative z-10" aria-labelledby="laptop-repair-pricing-heading">
            <div className="mb-7 max-w-4xl">
              <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-400">Transparent guide prices</p>
              <h2 id="laptop-repair-pricing-heading" className="text-2xl font-black text-white sm:text-3xl">{entity.pricingGuide.heading}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">{entity.pricingGuide.intro}</p>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-slate-700/80 bg-slate-900/50">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <caption className="sr-only">Laptop repair category, common symptoms, published starting price and typical turnaround in Kuwait.</caption>
                <thead className="bg-slate-800/90 text-slate-100">
                  <tr>
                    <th scope="col" className="px-4 py-4 font-bold">Repair category</th>
                    <th scope="col" className="px-4 py-4 font-bold">Symptoms covered</th>
                    <th scope="col" className="px-4 py-4 font-bold">Guide price (KWD)</th>
                    <th scope="col" className="px-4 py-4 font-bold">Typical timing</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/70">
                  {entity.pricingGuide.rows.map((row) => (
                    <tr key={row.category} className="align-top even:bg-slate-950/30">
                      <th scope="row" className="px-4 py-4 font-semibold text-white">{row.category}</th>
                      <td className="px-4 py-4 leading-6 text-slate-300">{row.symptoms}</td>
                      <td className="px-4 py-4 font-bold text-cyan-200">{row.startingPrice}</td>
                      <td className="px-4 py-4 leading-6 text-slate-300">{row.typicalTurnaround}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 max-w-5xl text-xs leading-6 text-slate-400">{entity.pricingGuide.note}</p>
          </section>
        )}

        {entity.faqs && entity.faqs.length > 0 && (
          <section className="max-w-4xl mx-auto px-6 py-12 border-t border-slate-800/50 relative z-10" aria-labelledby="service-faqs-heading">
            <h2 id="service-faqs-heading" className="text-2xl font-bold mb-8 text-white text-center">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {entity.faqs.map((faq) => (
                isMacbookScreenService ? (
                  <article key={faq.id} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
                    <h3 className="text-white font-semibold">{faq.title}</h3>
                    <p id={`faq-answer-${entity.id}-${faq.id}`} className="mt-3 text-sm leading-relaxed text-slate-300">
                      {faq.answer}
                    </p>
                  </article>
                ) : (
                  <details
                    key={faq.id}
                    className="group bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden"
                    onToggle={(event) => {
                      if (event.currentTarget.open) {
                        trackConversion(
                          'faq_expand',
                          { cta_name: 'service_page_faq', button_position: 'faq_section', entity_id: entity.id, entity_type: 'Service', entity_slug: entity.slug }
                        );
                      }
                    }}
                  >
                    <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-3 px-6 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-cyan-300 [&::-webkit-details-marker]:hidden">
                      <span className="text-white font-semibold">{faq.title}</span>
                      <ChevronDown className="h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
                    </summary>
                    <p id={`faq-answer-${entity.id}-${faq.id}`} className="px-6 pb-4 text-sm leading-relaxed text-slate-300">
                      {faq.answer}
                    </p>
                  </details>
                )
              ))}
            </div>
          </section>
        )}

        {(relatedServiceIds.length > 0 || relatedProblemIds.length > 0 || relatedBrandIds.length > 0 || relatedResourcePaths.length > 0 || arabicEquivalent) && (
          <section className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-800/50 relative z-10">
            <h2 className="text-2xl font-bold mb-3 text-white">Related Repair Resources</h2>
            <p className="text-sm text-slate-400 mb-8 max-w-3xl">Explore the closest repair services, troubleshooting pages, brand specialists and practical guides for this type of fault.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedServiceIds.length > 0 && (
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
                  <h3 className="text-sm uppercase tracking-wider font-black text-cyan-400 mb-4">Related services</h3>
                  <div className="space-y-2">
                    {relatedServiceIds.map((id) => {
                      const item = KCROC_GRAPH.services.find((service) => service.id === id);
                      return item ? <Link key={id} to={`/${item.slug}`} className="flex items-center justify-between gap-2 text-sm text-slate-300 hover:text-white transition-colors"><span>{item.id === 'srv-motherboard' ? 'Laptop Motherboard & MacBook Logic Board Repair' : item.title}</span><ArrowRight className="w-4 h-4 text-slate-600" /></Link> : null;
                    })}
                  </div>
                </div>
              )}

              {relatedProblemIds.length > 0 && (
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
                  <h3 className="text-sm uppercase tracking-wider font-black text-cyan-400 mb-4">Troubleshooting pages</h3>
                  <div className="space-y-2">
                    {relatedProblemIds.map((id) => {
                      const item = KCROC_GRAPH.problems.find((problem) => problem.id === id);
                      return item ? <Link key={id} to={`/${item.slug}`} className="flex items-center justify-between gap-2 text-sm text-slate-300 hover:text-white transition-colors"><span>{item.title}</span><ArrowRight className="w-4 h-4 text-slate-600" /></Link> : null;
                    })}
                  </div>
                </div>
              )}

              {relatedBrandIds.length > 0 && (
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
                  <h3 className="text-sm uppercase tracking-wider font-black text-cyan-400 mb-4">Brand specialists</h3>
                  <div className="space-y-2">
                    {relatedBrandIds.map((id) => {
                      const item = KCROC_GRAPH.brands.find((brand) => brand.id === id);
                      return item ? <Link key={id} to={`/${item.slug}`} className="flex items-center justify-between gap-2 text-sm text-slate-300 hover:text-white transition-colors"><span>{item.title}</span><ArrowRight className="w-4 h-4 text-slate-600" /></Link> : null;
                    })}
                  </div>
                </div>
              )}

              {relatedResourcePaths.length > 0 && (
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
                  <h3 className="text-sm uppercase tracking-wider font-black text-cyan-400 mb-4 flex items-center gap-2"><BookOpen className="w-4 h-4" /> Guides</h3>
                  <div className="space-y-2">
                    {relatedResourcePaths.map((guide) => (
                      <Link key={guide.path} to={guide.path} className="flex items-center justify-between gap-2 text-sm text-slate-300 hover:text-white transition-colors"><span>{guide.label}</span><ArrowRight className="w-4 h-4 text-slate-600" /></Link>
                    ))}
                  </div>
                </div>
              )}

              {arabicEquivalent && (
                <div className="bg-slate-900/50 border border-amber-500/20 rounded-2xl p-5" dir="rtl">
                  <h3 className="text-sm uppercase tracking-wider font-black text-amber-300 mb-4">الخدمة بالعربية</h3>
                  <Link
                    to={arabicEquivalent.seo.canonicalUrl.replace(/^https?:\/\/[^/]+/, '')}
                    className="flex items-center justify-between gap-3 text-sm font-bold text-slate-200 hover:text-amber-200 transition-colors"
                    lang="ar-KW"
                  >
                    <span>{arabicEquivalent.title}</span>
                    <ArrowRight className="w-4 h-4 text-amber-300 shrink-0 rotate-180" />
                  </Link>
                  <p className="mt-3 text-xs leading-5 text-slate-500">صفحة عربية مخصصة لنفس خدمة الإصلاح في الكويت.</p>
                   {entity.id === 'srv-gaming-laptop' && (
                     <p className="mt-4 text-sm leading-7 text-slate-300">مختبر KCROC في حولي (شارع ابن خلدون) متخصص في تصليح لابتوبات الألعاب (Gaming Laptops) في الكويت — ASUS ROG/TUF، Lenovo Legion/LOQ، MSI، Acer Predator/Nitro، HP OMEN/Victus، Dell G/Alienware وRazer Blade. نفحص الحرارة وهبوط FPS ومشاكل GPU/VRAM والمذربورد والشحن، ونقدم خدمة PTM7950 أو صيانة المعدن السائل عندما يناسب تصميم الجهاز، مع فحص مجاني واستلام وتوصيل مجاني في الكويت (<span dir="ltr">+{business?.telephone}</span>).</p>
                   )}
                   {entity.id === 'srv-macbook-screen' && (
                     <p className="mt-4 text-sm leading-7 text-slate-300">ملخص الخدمة بالعربي: مختبر KCROC في حولي (شارع ابن خلدون، مجمع الملا، السرداب، محل 19) يفحص ويبدّل شاشات MacBook Air وMacBook Pro المدعومة من أجيال Intel وApple Silicon M1–M5 حسب الموديل وتوفر القطعة. نفحص الشاشات المتشققة أو السوداء والخطوط والوميض، وكابل الشاشة ومسار الإضاءة الخلفية وأداء True Tone عند دعم الموديل، ونطابق رقم الموديل قبل تأكيد السعر. أجرة العمل تبدأ من 30 د.ك بالإضافة إلى الشاشة، مع ضمان 30 يومًا وفق شروط الخدمة واستلام وتوصيل مجاني في الكويت (<span dir="ltr">+{business?.telephone}</span>).</p>
                   )}
                </div>
              )}
            </div>


          </section>
        )}

        <CoreRepairPillars
          context={entity.id === 'srv-laptop'
            ? 'Start with the broader computer-repair hub or explore motherboard-level repair for a focused board-fault diagnosis.'
            : entity.id === 'srv-gaming'
              ? 'For gaming desktops, start with GPU, power-delivery, cooling and motherboard diagnosis; use the gaming-laptop repair path only when the device is a laptop.'
              : 'Use the main computer repair hub for broader PC and device faults, or the focused laptop repair hub when the device is a laptop.'}
          excludeLaptopService={entity.id === 'srv-laptop' || entity.id === 'srv-gaming'}
        />

        {relatedLocationIds.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-800/50 relative z-10" aria-labelledby="repair-service-areas-heading">
            <h2 id="repair-service-areas-heading" className="text-2xl font-bold mb-3 text-white flex items-center gap-3">
              <MapPin className="w-6 h-6 text-cyan-400" aria-hidden="true" /> Where We Handle This Repair
            </h2>
            <p className="text-sm text-slate-400 mb-7 max-w-3xl">
              These are the Kuwait service areas most directly connected to this repair type. Pickup is arranged through KCROC rather than requiring a walk-in visit.
            </p>
            <nav aria-labelledby="repair-service-areas-heading">
              <ul role="list" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {relatedLocationIds.map((id) => {
                  const location = KCROC_GRAPH.locations.find((item) => item.id === id);
                  return location ? (
                    <li key={id}>
                      <Link
                        to={`/location/${location.slug}`}
                        className="block h-full rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-4 text-sm font-bold text-slate-200 transition-colors hover:border-cyan-500/40 hover:text-cyan-300"
                      >
                        {location.title}
                      </Link>
                    </li>
                  ) : null;
                })}
              </ul>
            </nav>
          </section>
        )}

        {KCROC_GRAPH.locations && KCROC_GRAPH.locations.length > 0 && relatedLocationIds.length === 0 && (
          <section className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-800/50 relative z-10">
            <h2 className="text-2xl font-bold mb-8 text-white flex items-center gap-3">
              <MapPin className="w-6 h-6 text-cyan-400" /> Service Areas in Kuwait
            </h2>
            <div className="flex flex-wrap gap-3">
              {KCROC_GRAPH.locations
                .filter((loc) => loc.isPhysicalLocation || ['hawalli', 'salmiya', 'farwaniya', 'kuwait-city', 'jahra'].includes(loc.slug))
                .map((loc) => (
                  loc.isPhysicalLocation ? (
                    <Link
                      key={loc.id}
                      to={loc.seo?.canonicalUrl?.replace(/^https?:\/\/[^/]+/, '') || `/location/${loc.slug}`}
                      className="px-4 py-2 rounded-full bg-slate-900/60 border border-slate-800 text-slate-200 text-sm font-medium hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
                    >
                      {loc.title}
                    </Link>
                  ) : (
                    <Link
                      key={loc.id}
                      to={`/location/${loc.slug}`}
                      className="px-4 py-2 rounded-full bg-slate-900/60 border border-slate-800 text-slate-200 text-sm font-medium hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
                    >
                      {loc.title}
                    </Link>
                  )
                ))}
            </div>
          </section>
        )}

        <section className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-800/50 text-center relative z-10">
          <div className="bg-slate-900/40 backdrop-blur-lg border border-slate-800 rounded-3xl p-10 shadow-2xl">
            <h2 className="text-3xl font-black text-white mb-6">Ready to fix your device?</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              Our technicians are ready to trace the fault. Send us your symptoms via WhatsApp for a fast, free estimate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {business?.telephone && (
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackConversion(
                    'whatsapp_click',
                    { cta_name: 'service_page_whatsapp', button_position: 'bottom_cta', entity_id: entity.id, entity_type: 'Service', entity_slug: entity.slug }
                  )}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-4 px-8 rounded-xl transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:scale-105 duration-200 flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Message on WhatsApp
                </a>
              )}
              {entity.warranty?.noFixNoFee && (
                <div className="flex items-center justify-center px-8 py-4 border border-slate-800 rounded-xl bg-brand-dark/80 text-slate-300 font-medium">
                  <ShieldCheck className="w-5 h-5 text-cyan-400 mr-2" />
                  No Fix, No Fee Guarantee
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
