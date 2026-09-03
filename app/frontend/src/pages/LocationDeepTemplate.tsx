// File: app/frontend/src/pages/LocationDeepTemplate.tsx
//
// 🚀 RICH SERVICE-AREA LOCATION PAGE — /location/farwaniya, /location/salmiya,
// /location/kuwait-city, /location/jahra, /location/ahmadi
//
// Built to match the depth and layout of HawalliLocationPage.tsx (KCROC's
// single physical branch), but data-driven off a `:slug` route param so all
// five service-area locations share one file instead of five near-duplicate
// ones. Every fact on this page (opening hours, phone, warranty, services,
// brands, problems, USPs, process steps, and — where they exist — a location-
// specific case study or review) is read from KCROC_GRAPH, so nothing here
// can drift out of sync with the rest of the site.
//
// Unlike Hawalli, these five locations are NOT physical branches — KCROC's
// only walk-in lab is in Hawalli. So this template is honest about that:
// no street address is presented as a local shop, "Get Directions" points
// to the central Hawalli workshop where devices are actually repaired, and
// the copy leads with free pickup & delivery rather than a storefront visit.
import React, { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  MapPin, Truck, Shield, ShieldCheck, Zap, Cpu, Wrench, Laptop, Apple,
  Gamepad2, Monitor, BatteryCharging, MessageCircle, Phone, Clock,
  CheckCircle2, ChevronDown, Lock, Star, Building2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { SEOEngine } from '../core/components/SEOEngine';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import MapComponent from '../components/MapComponent';
import { KCROC_GRAPH } from '../data/graph';
import { useAnalytics } from '../core/analytics/AnalyticsProvider';
import { IMAGES } from '../constants/images';

const BASE_URL = 'https://www.computerrepairkuwait.com';

const SERVICE_ICON_MAP: Record<string, React.ElementType> = {
  apple: Apple,
  laptop: Laptop,
  gaming: Gamepad2,
  cpu: Cpu,
  monitor: Monitor,
  battery: BatteryCharging,
};

interface LocalFAQ { id: string; question: string; answer: string; }

// Real photos of KCROC's central Hawalli workshop — this is where every
// device collected from these service areas is actually diagnosed and
// repaired, so the gallery is honest about location while still giving
// visitors a look at the team and lab behind the pickup.
const WORKSHOP_GALLERY_IMAGES = [
  { ...IMAGES.brand.shopInterior, caption: 'Inside our central repair workshop' },
  { ...IMAGES.brand.technicians, caption: 'Technicians diagnosing a device' },
  { ...IMAGES.brand.leadTechnician, caption: 'Component-level board work in progress' },
  { ...IMAGES.brand.inventory, caption: 'Genuine spare parts inventory' },
];

export default function LocationDeepTemplate() {
  const { slug } = useParams<{ slug: string }>();
  const { trackConversion } = useAnalytics();
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const location = KCROC_GRAPH.locations.find((l) => l.slug === slug);
  const business = KCROC_GRAPH.business;

  // Not a known location, or someone hits this route for the physical
  // Hawalli branch (which has its own dedicated page) — bounce safely.
  if (!location || !business || location.isPhysicalLocation) {
    return <Navigate to="/404" replace />;
  }

  const PAGE_URL = `${BASE_URL}/location/${location.slug}`;

  const process = KCROC_GRAPH.processes?.find((p) => p.id === 'proc-standard');
  const caseStudy = KCROC_GRAPH.caseStudies.find((c) => c.location === location.title);
  const reviews = KCROC_GRAPH.reviews;
  const localReview = reviews?.items.find((r) => r.location === location.title);
  const trustBadges = KCROC_GRAPH.trustBadges;
  const noFixNoFee = KCROC_GRAPH.usps?.find((u) => u.id === 'usp-nofix');
  const componentRepairUsp = KCROC_GRAPH.usps?.find((u) => u.id === 'usp-component');
  const privacyUsp = KCROC_GRAPH.usps?.find((u) => u.id === 'usp-privacy');
  const logisticsUsp = KCROC_GRAPH.usps?.find((u) => u.id === 'usp-logistics');
  const otherLocations = KCROC_GRAPH.locations.filter((l) => l.id !== location.id);
  const nearbyAreas = location.serviceAreas.filter((a) => a !== location.title);

  const services = KCROC_GRAPH.services;
  const problems = KCROC_GRAPH.problems;
  const brands = KCROC_GRAPH.brands;

  const phone = business.telephone; // e.g. 96555301913
  const phoneDisplay = `+965 ${phone.slice(3, 7)} ${phone.slice(7)}`;
  const WA_LINK = `https://wa.me/${phone}?text=${encodeURIComponent(
    `Hi KCROC, I am in ${location.title} and need a device repaired. Can we arrange a pickup?`
  )}`;

  const localFaqs: LocalFAQ[] = [
    {
      id: `faq-${location.slug}-service`,
      question: `Do you provide computer repair in ${location.title}?`,
      answer: `Yes. KCROC offers component-level laptop, MacBook, gaming PC, and motherboard repair for ${location.title}, with completely free pickup and delivery — you don't need to travel anywhere.`,
    },
    {
      id: `faq-${location.slug}-shop`,
      question: `Do you have a repair shop in ${location.title}?`,
      answer: `We don't operate a walk-in branch in ${location.title} itself. Our repair lab is based in Hawalli, and we bring the service to you: free pickup from ${location.title}, repair at our lab, and free delivery back.`,
    },
    {
      id: `faq-${location.slug}-pickup`,
      question: `Do you offer laptop pickup from ${location.title}?`,
      answer: `Yes. Free pickup and delivery is available from ${location.title}${nearbyAreas.length ? ` and nearby areas including ${nearbyAreas.join(', ')}` : ''}. Message us on WhatsApp with your area and device symptoms to arrange a collection time.`,
    },
    {
      id: `faq-${location.slug}-brands`,
      question: `What laptop brands do you repair for ${location.title} customers?`,
      answer: `We repair major laptop brands including ${brands.map((b) => b.brandName).join(', ')}, as well as Apple MacBooks.`,
    },
    {
      id: `faq-${location.slug}-macbook`,
      question: `Do you repair MacBooks for customers in ${location.title}?`,
      answer: `Yes, MacBook repair — including logic board and liquid damage recovery — is one of our core services, available with free pickup from ${location.title}.`,
    },
    {
      id: `faq-${location.slug}-gaming`,
      question: 'Do you repair gaming laptops and gaming PCs?',
      answer: `Yes. Our lab handles gaming PC and GPU repair as well as gaming laptop cleaning and thermal repaste for systems running hot or underperforming, with pickup available from ${location.title}.`,
    },
    {
      id: `faq-${location.slug}-motherboard`,
      question: 'Can you repair a laptop motherboard?',
      answer: `Yes. Component-level motherboard repair is a specialty at KCROC — we trace and replace the specific failed chip on the board rather than automatically swapping the entire motherboard where that's technically possible.`,
    },
    {
      id: `faq-${location.slug}-parts`,
      question: 'Do you replace laptop screens and batteries?',
      answer: `Yes, screen replacement and battery replacement are both available. See the linked service pages for details on each.`,
    },
    {
      id: `faq-${location.slug}-cost`,
      question: `How much does laptop repair cost for ${location.title} customers?`,
      answer: `Diagnostics are free, and pricing depends on the specific fault and part required. Visit our pricing page for starting rates on common repairs.`,
    },
    {
      id: `faq-${location.slug}-turnaround`,
      question: 'How long does computer repair take?',
      answer: `Turnaround depends on the diagnosis, parts availability, and repair complexity, so we're not able to promise a fixed time upfront. We'll give you a clear estimate after diagnosing your device.`,
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
      cta_name: `${location.slug}_whatsapp`,
      button_position: position,
      entity_id: location.id,
      entity_type: 'Location',
      entity_slug: location.slug,
    });

  const handleCallClick = (position: string) =>
    trackConversion('phone_call_click', {
      cta_name: `${location.slug}_call`,
      button_position: position,
      entity_id: location.id,
      entity_type: 'Location',
      entity_slug: location.slug,
    });

  const handleBookClick = (position: string) =>
    trackConversion('book_pickup_click', {
      cta_name: `${location.slug}_book`,
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
          <li aria-current="page" className="text-cyan-400">Computer Repair {location.title}</li>
        </ol>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative pt-6 sm:pt-12 pb-10 sm:pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-12 items-center">
            <div className="max-w-2xl space-y-5">
              <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 px-3 py-1.5 text-xs font-bold uppercase tracking-widest">
                <MapPin className="w-3 h-3 mr-2 inline" aria-hidden="true" />
                Now Serving {location.title}
              </Badge>

              <h1 className="text-3xl sm:text-5xl font-black text-white leading-[1.1] tracking-tight">
                Computer Repair in <span className="text-cyan-400">{location.title}, Kuwait</span>
              </h1>

              <p className="text-sm sm:text-lg text-slate-300 leading-relaxed">
                {location.description}
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
              <a
                href={`tel:+${phone}`}
                onClick={() => handleCallClick('hero_tertiary')}
                className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <Phone className="w-4 h-4" aria-hidden="true" /> Call {phoneDisplay}
              </a>
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
                  <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/90 to-transparent text-xs text-slate-200 px-4 py-3">
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
                <h2 className="text-white font-bold text-lg">KCROC — Serving {location.title}</h2>
                <p className="text-slate-400 text-sm mt-0.5">
                  Free pickup &amp; delivery · Repaired at our central Hawalli workshop
                </p>
              </div>
              {reviews && (
                <div className="flex items-center gap-2 text-sm text-slate-300 shrink-0">
                  <Star className="w-4 h-4 text-cyan-400 fill-cyan-400" aria-hidden="true" />
                  <span className="font-bold text-white">{reviews.aggregateRating.ratingValue}</span>
                  <span className="text-slate-500">· {reviews.aggregateRating.reviewCount}+ reviews</span>
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
            Computer &amp; Laptop Repair for {location.title}
          </h2>
          <p className="text-slate-300 leading-relaxed">
            KCROC brings genuine component-level diagnosis and repair to {location.title} — not
            just part-swapping — without you needing to visit a shop. We collect your device with
            a free pickup, repair it at our central Hawalli workshop, and deliver it straight back
            to you. Our technicians work on laptops, MacBooks, gaming PCs, and motherboards,
            tracing faults down to the individual component wherever that's possible, and we do it
            with a privacy-conscious, hardware-only diagnostic process so your files stay
            untouched.
          </p>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="py-8 sm:py-14 px-4 sm:px-6 bg-slate-900/20 border-t border-slate-800/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-black mb-6 sm:mb-10 text-white tracking-tight">
            Computer Repair Services in {location.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => {
              const ServiceIcon = SERVICE_ICON_MAP[service.iconKey] || Wrench;
              return (
                <Link
                  key={service.id}
                  to={`/${service.slug}`}
                  className="group bg-slate-900/50 p-5 sm:p-6 rounded-2xl border border-slate-800 hover:border-cyan-500 transition-all flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  aria-label={`Learn more about ${service.title}`}
                >
                  <div className="bg-slate-950 border border-slate-800 w-11 h-11 rounded-xl flex items-center justify-center mb-4 shrink-0">
                    <ServiceIcon className="w-5 h-5 text-cyan-500" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-cyan-400 transition-colors">
                    {service.title.replace(' Kuwait', '')}
                  </h3>
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
        </div>
      </section>

      {/* ─── PROBLEMS WE FIX ─── */}
      <section className="py-8 sm:py-14 px-4 sm:px-6 border-t border-slate-800/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-black mb-6 sm:mb-10 text-white tracking-tight">
            Common Computer &amp; Laptop Problems We Fix in {location.title}
          </h2>
          <div className="scroll-row gap-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-3">
            {problems.map((problem) => (
              <Link
                key={problem.id}
                to={`/${problem.slug}`}
                className="scroll-row-item w-[80%] sm:w-auto flex items-center gap-3 bg-slate-900/40 hover:bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 rounded-xl px-4 py-3.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <Wrench className="w-4 h-4 text-cyan-500 shrink-0" aria-hidden="true" />
                <span className="text-sm text-slate-200 font-medium">{problem.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BRANDS ─── */}
      <section className="py-8 sm:py-14 px-4 sm:px-6 bg-slate-900/20 border-t border-slate-800/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-black mb-6 sm:mb-10 text-white tracking-tight">
            Laptop Brands We Repair for {location.title} Customers
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

      {/* ─── INSIDE OUR WORKSHOP (GALLERY) ─── */}
      <section className="py-8 sm:py-14 px-4 sm:px-6 border-t border-slate-800/50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-end justify-between gap-4 mb-6 sm:mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Where Your {location.title} Repair Happens
              </h2>
              <p className="text-slate-400 text-sm mt-2 max-w-2xl">
                Devices collected from {location.title} are repaired at our central Hawalli
                workshop by the same team, then delivered back to you free of charge.
              </p>
            </div>
            <Link
              to="/gallery"
              className="hidden sm:inline-flex items-center text-sm font-bold text-cyan-500 hover:text-cyan-400 shrink-0"
            >
              View Full Gallery <CheckCircle2 className="w-3.5 h-3.5 ml-1" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {WORKSHOP_GALLERY_IMAGES.map((img) => (
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
                <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/90 to-transparent text-[11px] sm:text-xs text-slate-200 px-3 py-2">
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

      {/* ─── LOCAL CASE STUDY (only if one exists for this location) ─── */}
      {caseStudy && (
        <section className="py-8 sm:py-14 px-4 sm:px-6 border-t border-slate-800/50">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-black mb-6 sm:mb-10 text-white tracking-tight">
              A Real Repair From Our {location.title} Service Area
            </h2>
            <Link
              to={`/case-studies/${caseStudy.slug}`}
              className="group grid sm:grid-cols-[1fr_1.3fr] gap-0 bg-slate-900/50 border border-slate-800 hover:border-cyan-500/40 rounded-2xl overflow-hidden transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              {caseStudy.featuredImage?.hero && (
                <img
                  src={caseStudy.featuredImage.hero.webp}
                  alt={caseStudy.featuredImage.altText || caseStudy.title}
                  width={caseStudy.featuredImage.hero.width}
                  height={caseStudy.featuredImage.hero.height}
                  loading="lazy"
                  className="w-full h-48 sm:h-full object-cover"
                />
              )}
              <div className="p-5 sm:p-7 flex flex-col justify-center">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {caseStudy.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  {caseStudy.description} {caseStudy.outcome}
                </p>
                <span className="text-xs font-bold text-cyan-500 flex items-center">
                  Read the {location.title} Case Study <CheckCircle2 className="w-3 h-3 ml-1" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ─── HOW IT WORKS ─── */}
      {process && (
        <section className="py-8 sm:py-14 px-4 sm:px-6 bg-slate-900/20 border-t border-slate-800/50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl sm:text-3xl font-black mb-6 sm:mb-10 text-white tracking-tight">
              How Computer Repair Works in {location.title}
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

      {/* ─── PICKUP COVERAGE ─── */}
      <section className="py-8 sm:py-14 px-4 sm:px-6 border-t border-slate-800/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-black mb-6 sm:mb-10 text-white tracking-tight">
            Free Pickup From {location.title} — Repaired in Hawalli
          </h2>
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="bg-cyan-500/10 p-3 rounded-full shrink-0">
                  <Building2 className="text-cyan-400 w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">No Shop Visit Needed</h3>
                  <p className="text-slate-400 text-sm">
                    We don't have a walk-in branch in {location.title}. Devices are collected free
                    of charge and repaired at our lab: {location.landmark.replace('Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: ', '').replace(')', '')}.
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
                    {logisticsUsp?.description || `Free pickup and delivery across ${location.title} and all Kuwait governorates.`}
                  </p>
                </div>
              </div>
              {nearbyAreas.length > 0 && (
                <div className="flex items-start gap-4">
                  <div className="bg-cyan-500/10 p-3 rounded-full shrink-0">
                    <MapPin className="text-cyan-400 w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Areas We Cover Near {location.title}</h3>
                    <p className="text-slate-400 text-sm">{nearbyAreas.join(', ')}</p>
                  </div>
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black" asChild>
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer" onClick={() => handleWhatsAppClick('coverage_section')}>
                    <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" /> WhatsApp a Technician
                  </a>
                </Button>
                <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800" asChild>
                  <Link to="/book" onClick={() => handleBookClick('coverage_section')}>
                    <Truck className="mr-2 h-4 w-4" aria-hidden="true" /> Book Free Pickup
                  </Link>
                </Button>
              </div>
              <p className="text-sm text-slate-500">
                Looking for a computer repair technician near you?{' '}
                <Link to="/near-me" className="font-semibold text-cyan-300 hover:text-cyan-200 underline underline-offset-2">
                  See computer repair near me options
                </Link>.
              </p>
            </div>
            <MapComponent />
          </div>
        </div>
      </section>

      {/* ─── OTHER AREAS WE SERVE ─── */}
      {otherLocations.length > 0 && (
        <section className="py-8 sm:py-14 px-4 sm:px-6 bg-slate-900/20 border-t border-slate-800/50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl sm:text-3xl font-black mb-4 text-white tracking-tight">
              Free Pickup &amp; Delivery Across Kuwait
            </h2>
            <p className="text-slate-400 text-sm mb-6 max-w-2xl">
              {location.title} is one of many areas we serve from our central Hawalli workshop,
              including:
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
                workstations at our Hawalli workshop.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── REVIEWS / SOCIAL PROOF (only if a review exists for this location) ─── */}
      {localReview && reviews && (
        <section className="py-8 sm:py-14 px-4 sm:px-6 bg-slate-900/20 border-t border-slate-800/50">
          <div className="container mx-auto max-w-3xl text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Star className="w-5 h-5 text-cyan-400 fill-cyan-400" aria-hidden="true" />
              <span className="text-xl font-black text-white">{reviews.aggregateRating.ratingValue}</span>
              <span className="text-slate-500 text-sm">
                · {reviews.aggregateRating.reviewCount}+ verified Google reviews
              </span>
            </div>
            <blockquote className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-8">
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed mb-4">
                &ldquo;{localReview.text}&rdquo;
              </p>
              <footer className="text-sm text-slate-500">
                — {localReview.name}, {localReview.location} · {localReview.device}
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
                          cta_name: `${location.slug}_faq`,
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

      {/* ─── FINAL CTA ─── */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 border-t border-slate-800/50 text-center">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-slate-900/40 backdrop-blur-lg border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
              Ready to fix your device?
            </h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto text-sm sm:text-base">
              Book a free pickup from {location.title}, or send us your device's symptoms on
              WhatsApp to arrange a free diagnosis.
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
          </div>
        </div>
      </section>
    </div>
  );
}
