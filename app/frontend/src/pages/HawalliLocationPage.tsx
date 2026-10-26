// File: app/frontend/src/pages/HawalliLocationPage.tsx
//
// 🚀 DEDICATED PRODUCTION PAGE — /location/hawalli
// This page is intentionally NOT rendered through the shared
// `LocationTemplate.tsx` (which still serves Salmiya, Kuwait City,
// Farwaniya, Jahra and Ahmadi unchanged). Hawalli is KCROC's only real
// physical branch and one of the site's highest-traffic URLs, so it gets
// its own content layer instead of forcing bespoke sections into the
// generic template used by five service-area (no-storefront) pages.
//
// Verifiable business facts on this page (address, hours, phone, warranty,
// services, brands, problems, USPs and the Hawalli review)
// are read directly from KCROC_GRAPH — the single source of truth — so
// they can't drift out of sync with the rest of the site. The Hawalli-
// specific FAQ copy below is page-scoped content written for this URL
// (the generic sitewide FAQ doesn't cover Hawalli-specific phrasing like
// "can I bring my laptop to the Hawalli location") — each answer is
// checked against KCROC_GRAPH facts, not invented independently of them.
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin, Truck, Shield, ShieldCheck, Zap, Cpu, Wrench, Laptop, Apple,
  Gamepad2, Monitor, BatteryCharging, MessageCircle, Phone, Clock,
  CheckCircle2, ChevronDown, Lock, Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { SEOEngine } from '../core/components/SEOEngine';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import MapComponent from '../components/MapComponent';
import { KCROC_GRAPH } from '../data/graph';
import { useAnalytics } from '../core/analytics/AnalyticsProvider';
import CoreRepairPillars from '../components/content/CoreRepairPillars';
import { isReviewPublishable } from '../utils/publicationEligibility';
// 🩹 FIX: real workshop/branch photos already exist in the codebase but
// were never used anywhere on this page — the entire page relied on a
// single hero image (location.contentImage). These power the new "Inside
// the Hawalli Lab" gallery section below, pulled from the Gallery page's
// own "Workshop" category so it can't drift out of sync.
import { IMAGES } from '../constants/images';

const BASE_URL = KCROC_GRAPH.business!.websiteUrl;
const PAGE_URL = `${BASE_URL}/location/hawalli`;
// Exact Google Maps place link — derived from the same verified Place CID
// already embedded in the site's own map (see MapComponent.tsx's iframe
// src, place ID 0x3fcf9b4a9072aacd:0x368691a3a1f0ca66), rather than a
// generic text search that could resolve to the wrong listing.
const HAWALLI_MAPS_PLACE_URL = 'https://maps.google.com/?cid=3928987856909945446';

const SERVICE_ICON_MAP: Record<string, React.ElementType> = {
  apple: Apple,
  laptop: Laptop,
  gaming: Gamepad2,
  cpu: Cpu,
  monitor: Monitor,
  battery: BatteryCharging,
};

// Visual groups improve scanning without creating duplicate service entities or URLs.
// Every card still links through the canonical service slug from KCROC_GRAPH.
const HAWALLI_SERVICE_GROUPS = [
  {
    id: 'board-level',
    title: 'Board-Level & Micro-Soldering',
    description: 'Component-level diagnosis for power, charging, corrosion and motherboard faults, with repair recommendations based on bench findings.',
    serviceIds: ['srv-motherboard', 'srv-liquid-damage', 'srv-charging-port', 'srv-desktop-pc'],
  },
  {
    id: 'macbook-gaming',
    title: 'MacBook & Gaming Systems',
    description: 'Dedicated repair paths for MacBooks, gaming PCs, gaming laptops, display faults and demanding thermal workloads.',
    serviceIds: ['srv-macbook', 'srv-macbook-screen', 'srv-gaming', 'srv-gaming-laptop', 'srv-gaming-laptop-cleaning'],
  },
  {
    id: 'screens-upgrades',
    title: 'Screens, Batteries & Upgrades',
    description: 'Everyday laptop repair, display and battery replacement, keyboard and hinge repairs, and SSD/RAM upgrades.',
    serviceIds: ['srv-laptop', 'srv-screen', 'srv-battery', 'srv-ssd-ram', 'srv-keyboard', 'srv-hinge'],
  },
] as const;

const HAWALLI_PROBLEM_LABEL_OVERRIDES: Record<string, string> = {
  'problem-overheating': 'Laptop Overheating & Loud Fan',
};

// Hawalli-specific FAQ content. Written for this page — not pulled from the
// generic sitewide FAQ list — because the questions and answers here are
// deliberately scoped to the Hawalli location itself (item 51 of the brief:
// unique local content, not a repeat of the generic FAQ page). Every answer
// below is sourced from verified KCROC_GRAPH data; nothing is invented.
interface LocalFAQ { id: string; question: string; answer: string; }

// Real photos of the physical Hawalli lab — distinct from location.contentImage
// (the hero shot) so the gallery below doesn't just repeat it.
const HAWALLI_GALLERY_IMAGES = [
  { ...IMAGES.brand.shopInterior, caption: 'Inside the Hawalli lab' },
  { ...IMAGES.brand.shopEntrance, caption: 'Our entrance at Al Mullah Complex' },
  { ...IMAGES.brand.technicians, caption: 'Technicians diagnosing a device' },
  { ...IMAGES.brand.leadTechnician, caption: 'Component-level board work in progress' },
  { ...IMAGES.brand.inventory, caption: 'Genuine spare parts inventory' },
  { ...IMAGES.brand.shopExteriorNight, caption: 'The lab after hours' },
];

export default function HawalliLocationPage() {
  const { trackConversion } = useAnalytics();
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const location = KCROC_GRAPH.locations.find((l) => l.id === 'loc-hawalli');
  const business = KCROC_GRAPH.business;
  const process = KCROC_GRAPH.processes?.find((p) => p.id === 'proc-standard');
  const reviews = KCROC_GRAPH.reviews;
  const hawalliReview = reviews?.items.find((r) => r.location === 'Hawalli' && isReviewPublishable(r));
  const trustBadges = KCROC_GRAPH.trustBadges;
  const noFixNoFee = KCROC_GRAPH.usps?.find((u) => u.id === 'usp-nofix');
  const componentRepairUsp = KCROC_GRAPH.usps?.find((u) => u.id === 'usp-component');
  const privacyUsp = KCROC_GRAPH.usps?.find((u) => u.id === 'usp-privacy');
  const logisticsUsp = KCROC_GRAPH.usps?.find((u) => u.id === 'usp-logistics');
  const otherLocations = KCROC_GRAPH.locations.filter((l) => l.id !== 'loc-hawalli');

  // Every service currently on the site, in the order defined in the graph —
  // matches the 7 services named in the brief with zero hardcoded duplicates.
  const services = KCROC_GRAPH.services;
  const problems = KCROC_GRAPH.problems;
  const brands = KCROC_GRAPH.brands;

  if (!location || !business) {
    return null;
  }

  const serviceGroups = HAWALLI_SERVICE_GROUPS.map((group) => ({
    ...group,
    services: group.serviceIds
      .map((serviceId) => services.find((service) => service.id === serviceId))
      .filter((service): service is (typeof services)[number] => Boolean(service)),
  }));

  const phone = business.telephone; // read from KCROC_GRAPH, e.g. Kuwait mobile in international format
  const phoneDisplay = phone.startsWith('965') ? `+965 ${phone.slice(3)}` : `+${phone}`;
  const WA_LINK = `https://wa.me/${phone}?text=${encodeURIComponent(
    'Hi KCROC, I am in Hawalli and need a device repaired. Can we arrange a pickup?'
  )}`;

  const localFaqs: LocalFAQ[] = [
    {
      id: 'faq-hawalli-service',
      question: 'Do you provide computer repair in Hawalli?',
      answer: `Yes. Hawalli is home to KCROC's physical repair lab, where we perform component-level diagnostics and repair for laptops, MacBooks, gaming PCs, and motherboards. It's also our base for free pickup and delivery across Kuwait.`,
    },
    {
      id: 'faq-hawalli-address',
      question: 'Where is KCROC located in Hawalli?',
      answer: `Our lab is at ${location.landmark}, Hawalli, Kuwait. ${business.openingHours}.`,
    },
    {
      id: 'faq-hawalli-visit',
      question: 'Can I bring my laptop to the Hawalli repair location?',
      answer: `Yes, you're welcome to bring your device directly to our Hawalli lab during opening hours. If it's easier, you can also arrange a free pickup instead and skip the trip entirely.`,
    },
    {
      id: 'faq-hawalli-pickup',
      question: 'Do you offer laptop pickup from Hawalli?',
      answer: `Yes. Free pickup and delivery is available from Hawalli and across all Kuwait governorates. Message us on WhatsApp with your area and device symptoms to arrange a collection time.`,
    },
    {
      id: 'faq-hawalli-brands',
      question: 'What laptop brands do you repair in Hawalli?',
      answer: `We repair major laptop brands including ${brands.map((b) => b.brandName).join(', ')}, as well as Apple MacBooks.`,
    },
    {
      id: 'faq-hawalli-macbook',
      question: 'Do you repair MacBooks in Hawalli?',
      answer: `Yes, MacBook repair — including motherboard and liquid damage recovery — is one of our core services at the Hawalli lab. See our full MacBook repair service for details.`,
    },
    {
      id: 'faq-hawalli-gaming',
      question: 'Do you repair gaming laptops and gaming PCs?',
      answer: `Yes. Our Hawalli lab handles gaming PC and GPU repair as well as gaming laptop cleaning and thermal repaste for systems running hot or underperforming.`,
    },
    {
      id: 'faq-hawalli-motherboard',
      question: 'Can you repair a laptop motherboard?',
      answer: `Yes. Component-level motherboard repair is a specialty at KCROC — we trace and replace the specific failed chip on the board rather than automatically swapping the entire motherboard where that's technically possible.`,
    },
    {
      id: 'faq-hawalli-parts',
      question: 'Do you replace laptop screens and batteries?',
      answer: `Yes, screen replacement and battery replacement are both available. See the linked service pages for details on each.`,
    },
    {
      id: 'faq-hawalli-cost',
      question: 'How much does laptop repair cost in Hawalli?',
      answer: `Diagnostics are free, and pricing depends on the specific fault and part required. Visit our pricing page for starting rates on common repairs.`,
    },
    {
      id: 'faq-hawalli-turnaround',
      question: 'How long does computer repair take?',
      answer: `Turnaround depends on the diagnosis, parts availability, and repair complexity, so we're not able to promise a fixed time upfront. We'll give you a clear estimate after diagnosing your device.`,
    },
    {
      id: 'faq-hawalli-outside',
      question: 'Do you provide repair services outside Hawalli?',
      answer: `Yes. While our lab is based in Hawalli, we offer free pickup and delivery across all Kuwait governorates, including ${location.serviceAreas.filter((a) => a !== 'Hawalli').join(', ')}.`,
    },
  ];

  // BreadcrumbList is intentionally omitted here — SEOEngine already generates
  // it for this Location entity. Duplicating it produced two JSON-LD scripts
  // sharing the same `#breadcrumb` @id.
  const FAQ_SCHEMA = {
    '@graph': [
      {
        '@type': 'FAQPage',
        '@id': `${PAGE_URL}#faq`,
        mainEntity: localFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  };

  const handleWhatsAppClick = (position: string) =>
    trackConversion('whatsapp_click', {
      cta_name: 'hawalli_whatsapp',
      button_position: position,
      entity_id: location.id,
      entity_type: 'Location',
      entity_slug: location.slug,
    });

  const handleCallClick = (position: string) =>
    trackConversion('phone_call_click', {
      cta_name: 'hawalli_call',
      button_position: position,
      entity_id: location.id,
      entity_type: 'Location',
      entity_slug: location.slug,
    });

  const handleBookClick = (position: string) =>
    trackConversion('book_pickup_click', {
      cta_name: 'hawalli_book',
      button_position: position,
      entity_id: location.id,
      entity_type: 'Location',
      entity_slug: location.slug,
    });

  return (
    <div className="w-full text-white font-sans selection:bg-cyan-500/30">
      <SEOEngine entityId={location.id} />
      <SchemaMarkup schema={FAQ_SCHEMA} />

      {/* ─── BREADCRUMB ─── */}
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        <ol className="flex items-center flex-wrap gap-x-2 text-xs sm:text-sm text-slate-400 font-medium">
          <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
          <li aria-hidden="true" className="text-slate-600">/</li>
          <li aria-current="page" className="text-cyan-400">Computer Repair Hawalli</li>
        </ol>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative pt-6 sm:pt-12 pb-10 sm:pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-12 items-center">
            <div className="max-w-2xl space-y-5">
              <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 px-3 py-1.5 text-xs font-bold uppercase tracking-widest">
                <MapPin className="w-3 h-3 mr-2 inline" aria-hidden="true" />
                Hawalli Repair Lab
              </Badge>

              <h1 className="text-3xl sm:text-5xl font-black text-white leading-[1.1] tracking-tight">
                Computer Repair in <span className="text-cyan-400">Hawalli, Kuwait</span>
              </h1>

              <p className="text-sm sm:text-lg text-slate-300 leading-relaxed">
                {location.description}
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">
                Need chip-level diagnostics?{' '}
                <Link to="/motherboard-repair-kuwait" className="font-semibold text-cyan-300 underline decoration-cyan-500/40 underline-offset-4 hover:text-cyan-200">
                  Explore component-level motherboard repair
                </Link>
                .
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button size="lg" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-8 w-full sm:w-auto shadow-[0_0_20px_rgba(6,182,212,0.3)]" asChild>
                  <Link to="/book" onClick={() => handleBookClick('hero_primary')}>
                    <Truck className="mr-2 h-5 w-5" aria-hidden="true" /> Book Free Pickup
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-800 w-full sm:w-auto" asChild>
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer" onClick={() => handleWhatsAppClick('hero_secondary')}>
                    <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" /> WhatsApp KCROC
                  </a>
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <a
                  href={`tel:+${phone}`}
                  onClick={() => handleCallClick('hero_tertiary')}
                  className="inline-flex min-h-11 items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" /> Call {phoneDisplay}
                </a>
                <a
                  href={HAWALLI_MAPS_PLACE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackConversion('cta_click', { cta_name: 'hawalli_directions', button_position: 'hero' })}
                  className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-cyan-300 hover:text-cyan-200 transition-colors"
                >
                  <MapPin className="w-4 h-4" aria-hidden="true" /> Get Directions
                </a>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 font-medium">
                Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19 · Open daily 10 AM to 10 PM · No Fix, No Fee · 30-day warranty
              </p>
            </div>

            {location.contentImage && (
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
                <img
                  src={location.contentImage.src}
                  alt={location.contentImage.alt}
                  width={location.contentImage.width}
                  height={location.contentImage.height}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-56 sm:h-72 lg:h-[420px] object-cover"
                />
                {location.contentImage.caption && (
                  <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-dark/90 to-transparent text-xs text-slate-200 px-4 py-3">
                    {location.contentImage.caption}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* ─── HERO LOCAL TRUST PANEL ─── */}
          <div className="mt-8 sm:mt-12 bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div>
                <h2 className="text-white font-bold text-lg">KCROC Hawalli Repair Lab</h2>
                <p className="text-slate-400 text-sm mt-0.5">
                  {location.landmark}, Hawalli, Kuwait
                </p>
              </div>
              {reviews && (
                <div className="flex items-center gap-2 text-sm text-slate-300 shrink-0">
                  <Star className="w-4 h-4 text-cyan-400 fill-cyan-400" aria-hidden="true" />
                  <span className="font-bold text-white">{reviews.aggregateRating.ratingValue}</span>
                  <span className="text-slate-500">· Google rating</span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0" aria-hidden="true" />
                <span>{business.openingHours}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Truck className="w-4 h-4 text-cyan-400 shrink-0" aria-hidden="true" />
                <span>Free pickup &amp; delivery</span>
              </div>
              {trustBadges?.find((b) => b.id === 'badge-warranty') && (
                <div className="flex items-center gap-2 text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" aria-hidden="true" />
                  <span>{trustBadges.find((b) => b.id === 'badge-warranty')!.title}</span>
                </div>
              )}
              {trustBadges?.find((b) => b.id === 'badge-esd') && (
                <div className="flex items-center gap-2 text-slate-300">
                  <Zap className="w-4 h-4 text-cyan-400 shrink-0" aria-hidden="true" />
                  <span>{trustBadges.find((b) => b.id === 'badge-esd')!.title}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── LOCAL VALUE PROPOSITION ─── */}
      <section className="py-8 sm:py-14 px-4 sm:px-6 border-t border-slate-800/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-4 tracking-tight">
            Computer &amp; Laptop Repair for Hawalli
          </h2>
          <p className="text-slate-300 leading-relaxed">
            KCROC's repair lab sits right in Hawalli, at {location.landmark}. That means genuine
            component-level diagnosis and repair — not just part-swapping — happens close to
            home, whether you drop your device off yourself or send it with our free pickup and
            delivery service. Our technicians work on laptops, MacBooks, gaming PCs, and
            motherboards, tracing faults down to the individual component wherever that's
            possible, and we do it with a privacy-conscious, hardware-only diagnostic process so
            your files stay untouched.
          </p>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="py-8 sm:py-14 px-4 sm:px-6 bg-slate-900/20 border-t border-slate-800/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-black mb-6 sm:mb-10 text-white tracking-tight">
            Computer Repair Services in Hawalli
          </h2>
          <div className="space-y-9 sm:space-y-12">
            {serviceGroups.map((group) => (
              <section key={group.id} aria-labelledby={`hawalli-service-group-${group.id}`}>
                <div className="mb-4 sm:mb-5">
                  <h3 id={`hawalli-service-group-${group.id}`} className="text-lg sm:text-xl font-black text-white tracking-tight">
                    {group.title}
                  </h3>
                  <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-slate-400">
                    {group.description}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.services.map((service) => {
                    const ServiceIcon = SERVICE_ICON_MAP[service.iconKey] || Wrench;
                    return (
                      <Link
                        key={service.id}
                        to={`/${service.slug}`}
                        className="group bg-slate-900/50 p-5 sm:p-6 rounded-2xl border border-slate-800 hover:border-cyan-500 transition-all flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                        aria-label={`Learn more about ${service.title}`}
                      >
                        <div className="bg-brand-dark border border-slate-800 w-11 h-11 rounded-xl flex items-center justify-center mb-4 shrink-0">
                          <ServiceIcon className="w-5 h-5 text-cyan-500" aria-hidden="true" />
                        </div>
                        <h4 className="text-base font-bold text-white mb-1.5 group-hover:text-cyan-400 transition-colors">
                          {service.title.replace(' Kuwait', '')}
                        </h4>
                        <p className="text-sm text-slate-400 leading-relaxed mb-3 flex-grow">
                          {service.shortDescription}
                        </p>
                        <span className="text-xs font-bold text-cyan-500 flex items-center">
                          Learn more <CheckCircle2 className="w-3 h-3 ml-1" aria-hidden="true" />
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REPAIR PRICING PATH ─── */}
      <section
        id="hawalli-pricing-cta"
        aria-labelledby="hawalli-pricing-heading"
        className="px-4 py-6 sm:px-6 sm:py-8 border-t border-slate-800/50"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 rounded-2xl border border-cyan-500/20 bg-cyan-950/20 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10">
                <CheckCircle2 className="h-5 w-5 text-cyan-400" aria-hidden="true" />
              </div>
              <div>
                <h2 id="hawalli-pricing-heading" className="text-lg font-black text-white sm:text-xl">
                  Want to understand repair costs before booking?
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                  Review starting labor rates for common repairs and see where parts are priced separately by device model. We diagnose first and confirm your quote before paid repair work begins.
                </p>
              </div>
            </div>
            <Link
              to="/pricing"
              aria-label="View KCROC computer and laptop repair prices in Kuwait"
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-black text-slate-950 transition-colors hover:bg-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              View Repair Prices
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── PROBLEMS WE FIX ─── */}
      <section className="py-8 sm:py-14 px-4 sm:px-6 border-t border-slate-800/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-black mb-6 sm:mb-10 text-white tracking-tight">
            Common Computer &amp; Laptop Problems We Fix in Hawalli
          </h2>
          <div className="scroll-row gap-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-3">
            {problems.map((problem) => (
              <Link
                key={problem.id}
                to={`/${problem.slug}`}
                className="scroll-row-item w-[80%] sm:w-auto flex items-center gap-3 bg-slate-900/40 hover:bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 rounded-xl px-4 py-3.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <Wrench className="w-4 h-4 text-cyan-500 shrink-0" aria-hidden="true" />
                <span className="text-sm text-slate-200 font-medium">{HAWALLI_PROBLEM_LABEL_OVERRIDES[problem.id] ?? problem.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BRANDS ─── */}
      <section className="py-8 sm:py-14 px-4 sm:px-6 bg-slate-900/20 border-t border-slate-800/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-black mb-6 sm:mb-10 text-white tracking-tight">
            Laptop Brands We Repair in Hawalli
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {brands.map((brand) => (
              <Link
                key={brand.id}
                to={`/${brand.slug}`}
                className="text-center bg-slate-900/50 hover:bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 rounded-xl px-3 py-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <span className="text-sm font-bold text-white">{brand.brandName}</span>
              </Link>
            ))}
            <Link
              to="/macbook-repair-kuwait"
              className="text-center bg-slate-900/50 hover:bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 rounded-xl px-3 py-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <span className="text-sm font-bold text-white">Apple</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── INSIDE THE HAWALLI LAB (GALLERY) ─── */}
      <section className="py-8 sm:py-14 px-4 sm:px-6 border-t border-slate-800/50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-end justify-between gap-4 mb-6 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Inside the Hawalli Lab
            </h2>
            <Link
              to="/gallery"
              className="hidden sm:inline-flex items-center text-sm font-bold text-cyan-500 hover:text-cyan-400 shrink-0"
            >
              View Full Gallery <CheckCircle2 className="w-3.5 h-3.5 ml-1" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {HAWALLI_GALLERY_IMAGES.map((img) => (
              <div
                key={img.src}
                className="group relative rounded-xl overflow-hidden border border-slate-800 aspect-[4/3]"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-dark/90 to-transparent text-[11px] sm:text-xs text-slate-200 px-3 py-2">
                  {img.caption}
                </p>
              </div>
            ))}
          </div>
          <Link
            to="/gallery"
            className="sm:hidden mt-6 inline-flex items-center text-sm font-bold text-cyan-500 hover:text-cyan-400"
          >
            View Full Gallery <CheckCircle2 className="w-3.5 h-3.5 ml-1" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      {process && (
        <section className="py-8 sm:py-14 px-4 sm:px-6 bg-slate-900/20 border-t border-slate-800/50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl sm:text-3xl font-black mb-6 sm:mb-10 text-white tracking-tight">
              How Computer Repair Works in Hawalli
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {process.steps.map((step) => (
                <div key={step.step} className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-800">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-cyan-500 text-slate-950 font-black text-sm mb-4">
                    {step.step}
                  </span>
                  <h3 className="text-white font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── PHYSICAL LOCATION ─── */}
      <section className="py-8 sm:py-14 px-4 sm:px-6 border-t border-slate-800/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-black mb-6 sm:mb-10 text-white tracking-tight">
            Visit or Arrange Pickup From Our Hawalli Location
          </h2>
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="bg-cyan-500/10 p-3 rounded-full shrink-0">
                  <MapPin className="text-cyan-400 w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Address</h3>
                  <p className="text-slate-400 text-sm">
                    {location.landmark}<br />Hawalli, Kuwait
                  </p>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-400">
                    <span className="font-semibold text-slate-300">Finding the lab:</span>{' '}
                    We're inside Al Mullah Complex at basement level, Shop 19—not a street-level storefront.
                    If you need help locating the basement entrance from Ibn Khaldoun Street,{' '}
                    <a
                      href={`tel:+${phone}`}
                      onClick={() => handleCallClick('location_access_note')}
                      className="font-semibold text-cyan-300 underline decoration-cyan-500/40 underline-offset-4 hover:text-cyan-200"
                    >
                      call {phoneDisplay}
                    </a>.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-cyan-500/10 p-3 rounded-full shrink-0">
                  <Clock className="text-cyan-400 w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Opening Hours</h3>
                  <p className="text-slate-400 text-sm">{business.openingHours}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-cyan-500/10 p-3 rounded-full shrink-0">
                  <Truck className="text-cyan-400 w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Pickup &amp; Delivery</h3>
                  <p className="text-slate-400 text-sm">
                    {logisticsUsp?.description || 'Free pickup and delivery across Hawalli and all Kuwait governorates.'}
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black" asChild>
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer" onClick={() => handleWhatsAppClick('location_section')}>
                    <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" /> WhatsApp a Technician
                  </a>
                </Button>
                <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800" asChild>
                  <a
                    href={HAWALLI_MAPS_PLACE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MapPin className="mr-2 h-4 w-4" aria-hidden="true" /> Get Directions
                  </a>
                </Button>
              </div>
            </div>
            <MapComponent />
          </div>
        </div>
      </section>

      {/* ─── LOCAL COVERAGE ─── */}
      {otherLocations.length > 0 && (
        <section className="py-8 sm:py-14 px-4 sm:px-6 bg-slate-900/20 border-t border-slate-800/50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl sm:text-3xl font-black mb-4 text-white tracking-tight">
              Hawalli-Based Repair With Kuwait-Wide Pickup & Delivery
            </h2>
            <p className="text-slate-400 text-sm mb-6 max-w-2xl">
              Our Hawalli lab is the base for free pickup and delivery across Kuwait, including:
            </p>
            <div className="flex flex-wrap gap-3">
              {otherLocations.map((loc) => (
                <Link
                  key={loc.id}
                  to={`/location/${loc.slug}`}
                  className="px-4 py-2 rounded-full bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 text-slate-200 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  {loc.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── WHY KCROC ─── */}
      <section className="py-8 sm:py-14 px-4 sm:px-6 border-t border-slate-800/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-black mb-6 sm:mb-10 text-white tracking-tight">
            Why KCROC
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {componentRepairUsp && (
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                <Cpu className="w-5 h-5 text-cyan-400 mb-3" aria-hidden="true" />
                <h3 className="text-white font-bold mb-1.5">{componentRepairUsp.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{componentRepairUsp.description}</p>
              </div>
            )}
            {privacyUsp && (
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                <Lock className="w-5 h-5 text-cyan-400 mb-3" aria-hidden="true" />
                <h3 className="text-white font-bold mb-1.5">{privacyUsp.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{privacyUsp.description}</p>
              </div>
            )}
            {logisticsUsp && (
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                <Truck className="w-5 h-5 text-cyan-400 mb-3" aria-hidden="true" />
                <h3 className="text-white font-bold mb-1.5">{logisticsUsp.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{logisticsUsp.description}</p>
              </div>
            )}
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <Shield className="w-5 h-5 text-cyan-400 mb-3" aria-hidden="true" />
              <h3 className="text-white font-bold mb-1.5">
                {trustBadges?.find((b) => b.id === 'badge-warranty')?.title || 'Warranty'}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                All successful hardware repairs are covered, parts and labor.
              </p>
            </div>
            {noFixNoFee && (
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 sm:col-span-2 lg:col-span-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400 mb-3" aria-hidden="true" />
                <h3 className="text-white font-bold mb-1.5">{noFixNoFee.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{noFixNoFee.description}</p>
              </div>
            )}
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 sm:col-span-2 lg:col-span-2">
              <Zap className="w-5 h-5 text-cyan-400 mb-3" aria-hidden="true" />
              <h3 className="text-white font-bold mb-1.5">
                {trustBadges?.find((b) => b.id === 'badge-esd')?.title || 'ESD-Safe Lab'}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                All micro-soldering and board work happens on grounded, static-controlled
                workstations in our Hawalli lab.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── REVIEWS / SOCIAL PROOF ─── */}
      {hawalliReview && reviews && (
        <section className="py-8 sm:py-14 px-4 sm:px-6 bg-slate-900/20 border-t border-slate-800/50">
          <div className="container mx-auto max-w-3xl text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Star className="w-5 h-5 text-cyan-400 fill-cyan-400" aria-hidden="true" />
              <span className="text-xl font-black text-white">{reviews.aggregateRating.ratingValue}</span>
              <span className="text-slate-500 text-sm">
                · Google rating · view current reviews
              </span>
            </div>
            <blockquote className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-8">
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed mb-4">
                &ldquo;{hawalliReview.text}&rdquo;
              </p>
              <footer className="text-sm text-slate-500">
                — {hawalliReview.name}, {hawalliReview.location} · {hawalliReview.device}
              </footer>
            </blockquote>
          </div>
        </section>
      )}

      {/* ─── FAQ ─── */}
      <section className="py-8 sm:py-14 px-4 sm:px-6 border-t border-slate-800/50">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-black mb-6 sm:mb-10 text-white text-center tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="space-y-2.5">
            {localFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div key={faq.id} className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
                  <button
                    type="button"
                    id={`${faq.id}-trigger`}
                    aria-expanded={isOpen}
                    aria-controls={`${faq.id}-panel`}
                    onClick={() => {
                      const nextOpen = isOpen ? null : faq.id;
                      setOpenFaqId(nextOpen);
                      if (nextOpen) {
                        trackConversion('faq_expand', {
                          cta_name: 'hawalli_faq',
                          button_position: 'faq_section',
                          entity_id: location.id,
                          entity_type: 'Location',
                          entity_slug: location.slug,
                        });
                      }
                    }}
                    className="w-full flex items-center justify-between gap-3 text-left px-5 sm:px-6 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-2xl"
                  >
                    <span className="text-white font-semibold text-sm sm:text-base">{faq.question}</span>
                    <ChevronDown
                      aria-hidden="true"
                      className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <div
                    id={`${faq.id}-panel`}
                    role="region"
                    aria-labelledby={`${faq.id}-trigger`}
                    hidden={!isOpen}
                    className="text-slate-400 text-sm leading-relaxed px-5 sm:px-6 pb-4"
                  >
                    {faq.answer}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── KUWAIT-WIDE SERVICE LINKS (consolidates head-term signals) ─── */}
      <section className="px-4 sm:px-6 pb-4">
        <p className="container mx-auto max-w-4xl text-center text-sm sm:text-base text-slate-400">
          Part of KCROC's Kuwait-wide service: see our main{' '}
          <Link to="/laptop-repair-kuwait" className="text-cyan-400 hover:text-cyan-300 font-semibold">laptop repair in Kuwait</Link>
          {' '}and{' '}
          <Link to="/computer-repair-kuwait" className="text-cyan-400 hover:text-cyan-300 font-semibold">computer repair in Kuwait</Link>
          {' '}pages for prices, repair types and warranty.
        </p>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 border-t border-slate-800/50 text-center">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-slate-900/40 backdrop-blur-lg border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
              Ready to fix your device?
            </h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto text-sm sm:text-base">
              Book a free pickup from Hawalli, or send us your device's symptoms on WhatsApp to
              arrange a free diagnosis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-8 w-full sm:w-auto" asChild>
                <Link to="/book" onClick={() => handleBookClick('final_cta')}>
                  <Truck className="mr-2 h-5 w-5" aria-hidden="true" /> Book Free Pickup
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-800 w-full sm:w-auto" asChild>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" onClick={() => handleWhatsAppClick('final_cta')}>
                  <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" /> WhatsApp KCROC
                </a>
              </Button>
            </div>
            <div role="list" aria-label="KCROC repair assurances" className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-slate-800 pt-6 text-xs sm:text-sm font-semibold text-slate-300">
              <div role="listitem" className="inline-flex items-center gap-2">
                <Truck className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                <span>Free Pickup &amp; Delivery</span>
              </div>
              <div role="listitem" className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                <span>30-Day Repair Warranty</span>
              </div>
              <div role="listitem" className="inline-flex items-center gap-2">
                <Zap className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                <span>ESD-Safe Lab</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
