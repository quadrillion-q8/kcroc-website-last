// File: app/frontend/src/pages/Pricing.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Check,
  Truck,
  Clock,
  Laptop,
  Cpu,
  Search,
  ArrowRight,
  ChevronDown,
  ShieldCheck,
  Thermometer,
  Wrench,
  Activity,
  ShieldAlert,
  FileCheck2,
  BadgeCheck,
  CircleDollarSign,
  Eye,
  LockKeyhole,
  Scale,
  MessageCircle,
  ClipboardCheck,
  Sparkles,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { SEOEngine } from '../core/components/SEOEngine';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import { KCROC_GRAPH } from '../data/graph';

const business = KCROC_GRAPH.business!;

/* ─────────────────────────────────────────────────────────────────────────────
   PRICING DATA
───────────────────────────────────────────────────────────────────────────── */

const pricingCategories = [
  {
    title: 'Diagnostics & System Setup',
    eyebrow: 'Start here',
    icon: Search,
    items: [
      {
        name: 'Diagnostic & Inspection',
        price: 'FREE',
        desc: 'Component-level trace & thermal imaging',
        note: 'No-obligation initial assessment',
      },
      {
        name: 'Windows OS Restoration',
        price: '10–15 KWD',
        desc: 'Clean install with drivers & updates',
      },
      {
        name: 'Virus & Malware Removal',
        price: '10–20 KWD',
        desc: 'Deep system clean & security hardening',
      },
      {
        name: 'BIOS / Firmware Recovery',
        price: '20–40 KWD',
        desc: 'Direct IC reflashing & programmer recovery',
      },
    ],
  },
  {
    title: 'Thermal & Performance Tuning',
    eyebrow: 'Cooling & performance',
    icon: Thermometer,
    items: [
      {
        name: 'Laptop Thermal Service',
        price: '15–20 KWD',
        desc: 'Deep cleaning & premium thermal re-paste',
      },
      {
        name: 'Gaming PC Thermal Service',
        price: '20–30 KWD',
        desc: 'Liquid metal / custom cooler maintenance',
      },
      {
        name: 'Gaming PC Tuning',
        price: '20–40 KWD',
        desc: 'FPS optimization & BIOS configuration',
      },
      {
        name: 'RAM / SSD Installation',
        price: '5–10 KWD',
        desc: 'Installation labor; data migration available',
      },
    ],
  },
  {
    title: 'Hardware Replacements',
    eyebrow: 'Parts & physical repair',
    icon: Laptop,
    items: [
      {
        name: 'Battery Replacement',
        price: '8–15 KWD + Part',
        desc: 'Includes safe swollen-cell extraction',
      },
      {
        name: 'Keyboard Replacement',
        price: '10–20 KWD + Part',
        desc: 'Labor for top-case or riveted layouts',
      },
      {
        name: 'Laptop Screen Replacement',
        price: 'From 30 KWD + Part',
        desc: 'LCD, IPS, OLED & high-refresh panels',
      },
      {
        name: 'Hinge / Chassis Reconstruction',
        price: '15–30 KWD',
        desc: 'Structural resin repair & tension tuning',
      },
    ],
  },
  {
    title: 'Advanced Logic Board Repair',
    eyebrow: 'Component-level repair',
    icon: Cpu,
    featured: true,
    items: [
      {
        name: 'Charging Port Repair',
        price: '20–35 KWD',
        desc: 'DC jack micro-soldering & reinforcement',
      },
      {
        name: 'Motherboard Component Repair',
        price: '25–60 KWD',
        desc: 'MOSFET, IC & power-rail fixes',
      },
      {
        name: 'Advanced Motherboard Repair',
        price: '50–90+ KWD',
        desc: 'Complex BGA rework & chipset recovery',
      },
      {
        name: 'Liquid-Damage Repair',
        price: '35–90+ KWD',
        desc: 'Ultrasonic cleaning & trace restoration',
      },
      {
        name: 'MacBook Board-Level Repair',
        price: '45–100+ KWD',
        desc: 'Data-safe Apple Silicon & Intel repairs',
      },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   FAQ DATA
───────────────────────────────────────────────────────────────────────────── */

const faqs = Object.freeze([
  {
    q: 'Do you charge for diagnostics?',
    a: 'No — diagnostics are free. We perform advanced component-level testing and thermal imaging at no cost and give you a fixed quote before any repair begins. You only pay if you decide to go ahead.',
  },
  {
    q: 'Will the final price always match the price shown here?',
    a: 'The prices shown are starting rates or typical service ranges. The final price can depend on your exact device, fault, screen specifications, required parts, repair complexity and part availability. We diagnose the specific machine and provide a fixed, no-obligation quote before repair begins.',
  },
  {
    q: 'Why are some prices listed as "Labor + Part"?',
    a: 'Parts vary significantly between models. Separating labor from the part cost means you are quoted for the exact component your specific machine requires rather than paying a generic part price.',
  },
  {
    q: 'What happens if I do not approve the repair?',
    a: 'You are not required to proceed. We provide the quotation before repair begins, so you can decide whether the repair makes financial sense for your device.',
  },
  {
    q: 'What if my device cannot be repaired?',
    a: 'Under our No Fix, No Fee policy, if your device is catastrophically damaged and genuinely beyond economical repair, you pay nothing for the labor or diagnostic.',
  },
  {
    q: 'Do you provide pickup and delivery?',
    a: 'Yes. We provide free, secure pickup and delivery across all Kuwait governorates for repair services.',
  },
  {
    q: 'How long does a motherboard repair take?',
    a: 'Most component-level motherboard and logic-board repairs are completed within 24 to 48 hours, including full-load stress testing before the device is returned.',
  },
  {
    q: 'Is my personal data safe during repair?',
    a: 'Data privacy is treated as a core part of the repair process. Our repair service is focused on diagnosing and repairing the hardware or software problem you requested, rather than unnecessary access to your personal files.',
  },
]);

/* ─────────────────────────────────────────────────────────────────────────────
   SPECIALIST SERVICES
───────────────────────────────────────────────────────────────────────────── */

const serviceLinks = Object.freeze([
  {
    title: 'MacBook Repair',
    path: '/macbook-repair-kuwait',
    icon: Laptop,
    desc: 'Logic board and USB-C IC replacement.',
  },
  {
    title: 'Motherboard Repair',
    path: '/motherboard-repair-kuwait',
    icon: Cpu,
    desc: 'Microsoldering and liquid-damage recovery.',
  },
  {
    title: 'Gaming PC Repair',
    path: '/gaming-pc-repair-kuwait',
    icon: Activity,
    desc: 'GPU diagnostics and thermal tuning.',
  },
  {
    title: 'Screen Replacement',
    path: '/laptop-screen-repair-kuwait',
    icon: Laptop,
    desc: 'Same-day OLED, IPS & LCD panels.',
  },
]);

/* ─────────────────────────────────────────────────────────────────────────────
   SEO / STRUCTURED DATA
───────────────────────────────────────────────────────────────────────────── */

const PRICING_SCHEMA = [
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: business.websiteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Service Pricing',
        item: `${business.websiteUrl}/pricing`,
      },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   SMALL REUSABLE UI
───────────────────────────────────────────────────────────────────────────── */

function TrustItem({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10">
        <Icon className="h-4 w-4 text-cyan-400" aria-hidden="true" />
      </div>

      <div>
        <div className="text-sm font-bold text-white">{title}</div>
        <div className="mt-0.5 text-xs leading-relaxed text-slate-400">
          {description}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────────────────── */

export default function Pricing() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Normalize the WhatsApp number at the page boundary so display formatting
  // applied to business.telephone anywhere else can never break these links.
  const whatsappNumber = business.telephone.replace(/\D/g, '');

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi KCROC, I'd like to get a repair price estimate for my device."
  )}`;

  const bookingUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi KCROC, I'd like to book a free diagnostic and get a fixed repair quote."
  )}`;

  return (
    <main className="w-full min-h-screen overflow-hidden bg-gray-950 font-sans text-slate-100 selection:bg-cyan-500/30">
      <SEOEngine entityId="page-pricing" />
      <SchemaMarkup schema={{ '@graph': PRICING_SCHEMA }} />

      {/* ─────────────────────────────────────────────────────────────────────
          BACKGROUND
      ───────────────────────────────────────────────────────────────────── */}

      <div
        className="pointer-events-none fixed inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.10),transparent_38%)]" />
        <div className="absolute right-0 top-[30%] h-[500px] w-[500px] rounded-full bg-blue-500/[0.035] blur-3xl" />
        <div className="absolute left-0 top-[55%] h-[450px] w-[450px] rounded-full bg-cyan-500/[0.025] blur-3xl" />
      </div>

      {/* ─────────────────────────────────────────────────────────────────────
          BREADCRUMBS
      ───────────────────────────────────────────────────────────────────── */}

      <nav
        aria-label="Breadcrumb"
        className="mx-auto max-w-6xl px-4 pb-5 pt-8 sm:px-6 sm:pb-7 sm:pt-12"
      >
        <ol className="flex items-center gap-2 text-xs font-medium text-slate-500 sm:text-sm">
          <li>
            <Link
              to="/"
              className="transition-colors hover:text-cyan-400"
            >
              Home
            </Link>
          </li>

          <li aria-hidden="true" className="text-slate-700">
            /
          </li>

          <li aria-current="page" className="text-cyan-400">
            Service Pricing
          </li>
        </ol>
      </nav>

      {/* ─────────────────────────────────────────────────────────────────────
          HERO
      ───────────────────────────────────────────────────────────────────── */}

      <section className="relative px-4 pb-12 text-center sm:px-6 sm:pb-16">
        <div className="mx-auto max-w-4xl">
          <Badge className="mb-5 border border-cyan-500/25 bg-cyan-500/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-400 sm:text-xs">
            Transparent Repair Pricing · Kuwait
          </Badge>

          <h1 className="text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Know the price.
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Approve the repair.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:text-lg sm:leading-8">
            Professional computer, laptop, MacBook and gaming PC repair in
            Kuwait with clear starting prices, free diagnostics and a fixed
            quotation before repair begins.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              asChild
              className="h-12 rounded-xl bg-cyan-500 px-7 font-black text-slate-950 shadow-[0_0_28px_rgba(6,182,212,0.18)] transition-all hover:scale-[1.01] hover:bg-cyan-400"
            >
              <a href={whatsappUrl}>
                <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                Get My Price Estimate
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-12 rounded-xl border-slate-700 bg-slate-900/50 px-7 font-bold text-white hover:border-cyan-500/50 hover:bg-slate-900"
            >
              <a href={bookingUrl}>
                Book Free Diagnostic
              </a>
            </Button>
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-2">
            {[
              'Free Initial Diagnostic',
              'Fixed Quote Before Repair',
              'Free Pickup & Delivery',
              '30-Day Warranty',
            ].map((item) => (
              <span
                key={item}
                className="inline-flex items-center rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-[11px] font-semibold text-slate-300"
              >
                <Check
                  className="mr-1.5 h-3.5 w-3.5 text-emerald-400"
                  aria-hidden="true"
                />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          TRUST PROMISE
      ───────────────────────────────────────────────────────────────────── */}

      <section className="px-4 pb-12 sm:px-6 sm:pb-16">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/45 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <div className="border-b border-slate-800 bg-slate-950/50 px-5 py-5 sm:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10">
                <ShieldCheck
                  className="h-5 w-5 text-emerald-400"
                  aria-hidden="true"
                />
              </div>

              <div>
                <h2 className="text-base font-black text-white sm:text-lg">
                  The KCROC Pricing Promise
                </h2>
                <p className="text-xs text-slate-500 sm:text-sm">
                  Diagnose first. Quote second. Repair only with your approval.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 p-5 sm:grid-cols-2 sm:p-8 lg:grid-cols-4">
            <TrustItem
              icon={Eye}
              title="No Surprise Bill"
              description="You receive the repair quote before repair work begins."
            />

            <TrustItem
              icon={ClipboardCheck}
              title="Your Approval Comes First"
              description="You decide whether the quoted repair makes sense."
            />

            <TrustItem
              icon={Scale}
              title="Repair-or-Replace Advice"
              description="The goal is to make the right financial decision for your device."
            />

            <TrustItem
              icon={BadgeCheck}
              title="Warranty Included"
              description="Approved repairs are backed by the stated repair warranty."
            />
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          HOW PRICING WORKS
      ───────────────────────────────────────────────────────────────────── */}

      <section
        aria-labelledby="pricing-process-heading"
        className="px-4 pb-16 sm:px-6 sm:pb-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <Badge className="mb-4 border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-[10px] uppercase tracking-widest text-blue-400">
              Simple process
            </Badge>

            <h2
              id="pricing-process-heading"
              className="text-3xl font-black tracking-tight text-white sm:text-4xl"
            >
              How your repair price is determined
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
              Online pricing is useful for setting expectations. Your actual
              quotation is based on the specific machine and fault—not a guess.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                number: '01',
                title: 'Tell us the problem',
                desc: 'Send your device model and symptoms on WhatsApp.',
                icon: MessageCircle,
              },
              {
                number: '02',
                title: 'Free diagnosis',
                desc: 'We inspect the machine and identify the fault.',
                icon: Search,
              },
              {
                number: '03',
                title: 'Fixed quotation',
                desc: 'You receive the repair price before work begins.',
                icon: FileCheck2,
              },
              {
                number: '04',
                title: 'Approve or decline',
                desc: 'Repair starts only when you choose to proceed.',
                icon: Check,
              },
            ].map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="relative rounded-2xl border border-slate-800 bg-slate-900/35 p-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black tracking-widest text-cyan-500">
                      {step.number}
                    </span>

                    <Icon
                      className="h-5 w-5 text-slate-600"
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="mt-6 text-sm font-black text-white">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-slate-500">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          IMPORTANT PRICING NOTE
      ───────────────────────────────────────────────────────────────────── */}

      <section className="px-4 pb-12 sm:px-6 sm:pb-16">
        <div className="mx-auto max-w-6xl rounded-3xl border border-cyan-500/15 bg-cyan-950/15 p-5 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10">
              <ShieldAlert
                className="h-5 w-5 text-cyan-400"
                aria-hidden="true"
              />
            </div>

            <div>
              <h2 className="text-lg font-black text-white sm:text-xl">
                How to read these prices
              </h2>

              <p className="mt-2 text-sm leading-7 text-slate-300">
                Prices below are starting rates or service ranges. The final
                price can depend on the exact device, fault, screen
                specifications, required parts, repair complexity and part
                availability.
              </p>

              <p className="mt-3 text-sm leading-7 text-slate-300">
                <strong className="text-white">
                  You receive a fixed, no-obligation quotation after diagnosis
                  and before repair begins.
                </strong>{' '}
                You are never required to approve a repair simply because the
                device has been diagnosed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          PRICE MENU
      ───────────────────────────────────────────────────────────────────── */}

      <section
        id="price-list"
        aria-labelledby="pricing-heading"
        className="px-4 pb-16 sm:px-6 sm:pb-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center sm:mb-12">
            <Badge className="mb-4 border border-cyan-500/20 bg-cyan-500/10 px-3 py-1.5 text-[10px] uppercase tracking-widest text-cyan-400">
              Service pricing
            </Badge>

            <h2
              id="pricing-heading"
              className="text-3xl font-black tracking-tight text-white sm:text-4xl"
            >
              Computer Repair Prices in Kuwait
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Clear starting prices for common services. For your exact price,
              send us your device model and symptoms.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {pricingCategories.map((category) => {
              const Icon = category.icon;

              return (
                <Card
                  key={category.title}
                  className={`overflow-hidden border bg-slate-900/45 shadow-2xl backdrop-blur-xl ${
                    category.featured
                      ? 'border-cyan-500/30 shadow-cyan-950/10'
                      : 'border-slate-800'
                  }`}
                >
                  <CardHeader className="border-b border-slate-800/70 p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-950">
                          <Icon
                            className="h-5 w-5 text-cyan-400"
                            aria-hidden="true"
                          />
                        </div>

                        <div>
                          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-cyan-500">
                            {category.eyebrow}
                          </p>

                          <CardTitle className="text-lg font-black text-white sm:text-xl">
                            {category.title}
                          </CardTitle>
                        </div>
                      </div>

                      {category.featured && (
                        <Badge className="shrink-0 border border-cyan-500/20 bg-cyan-500/10 text-[9px] uppercase tracking-wider text-cyan-400">
                          Specialist
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="p-0">
                    <ul className="divide-y divide-slate-800/70">
                      {category.items.map((item) => (
                        <li
                          key={item.name}
                          className="flex items-start justify-between gap-4 p-5 transition-colors hover:bg-slate-950/30 sm:p-6"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start gap-2">
                              <Check
                                className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                                aria-hidden="true"
                              />

                              <div>
                                <div className="text-sm font-bold text-slate-100 sm:text-base">
                                  {item.name}
                                </div>

                                <div className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                                  {item.desc}
                                </div>

                                {item.note && (
                                  <div className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-cyan-500">
                                    {item.note}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="shrink-0 rounded-xl border border-cyan-500/15 bg-cyan-950/20 px-3 py-2 text-right">
                            <div className="text-xs font-black text-cyan-400 sm:text-sm">
                              {item.price}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/30 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <CircleDollarSign
                className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400"
                aria-hidden="true"
              />

              <div>
                <h3 className="text-sm font-black text-white">
                  Why some prices include "+ Part"
                </h3>

                <p className="mt-2 text-xs leading-6 text-slate-500 sm:text-sm">
                  Battery, keyboard and screen costs can vary substantially
                  between models. Separating labor from the part allows us to
                  quote the exact component required for your machine instead
                  of hiding different part costs inside one generic price.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              className="h-12 w-full rounded-xl bg-cyan-500 px-7 font-black text-slate-950 hover:bg-cyan-400 sm:w-auto"
            >
              <a href={whatsappUrl}>
                <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                Get My Exact Quote
              </a>
            </Button>

            <Link
              to="/services"
              className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-slate-800 bg-slate-900/50 px-7 text-sm font-bold text-slate-300 transition-colors hover:border-cyan-500/40 hover:text-cyan-400 sm:w-auto"
            >
              Browse All Services
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          WHAT AFFECTS PRICE
      ───────────────────────────────────────────────────────────────────── */}

      <section
        aria-labelledby="price-factors-heading"
        className="border-y border-slate-800/70 bg-slate-950/35 px-4 py-16 sm:px-6 sm:py-20"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <Badge className="mb-4 border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-[10px] uppercase tracking-widest text-amber-400">
                No guesswork
              </Badge>

              <h2
                id="price-factors-heading"
                className="text-3xl font-black tracking-tight text-white sm:text-4xl"
              >
                What determines your final price?
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
                Two devices can show the same symptom but require completely
                different repairs. That's why we diagnose before giving the
                final quotation.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  title: 'Device model',
                  desc: 'Different machines use different components and construction methods.',
                },
                {
                  title: 'Actual fault',
                  desc: 'A charging problem may be a port, cable, fuse, IC or board-level fault.',
                },
                {
                  title: 'Required part',
                  desc: 'Part prices can vary substantially between models.',
                },
                {
                  title: 'Repair complexity',
                  desc: 'Component-level repairs range from straightforward to advanced board work.',
                },
                {
                  title: 'Screen specifications',
                  desc: 'Panel size, resolution, refresh rate and panel type can change replacement cost.',
                },
                {
                  title: 'Part availability',
                  desc: 'Availability can affect the final component price and repair route.',
                },
              ].map((factor) => (
                <div
                  key={factor.title}
                  className="rounded-2xl border border-slate-800 bg-slate-900/45 p-5"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles
                      className="h-4 w-4 text-cyan-400"
                      aria-hidden="true"
                    />
                    <h3 className="text-sm font-black text-white">
                      {factor.title}
                    </h3>
                  </div>

                  <p className="mt-2 text-xs leading-6 text-slate-500">
                    {factor.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          REPAIR VS REPLACE
      ───────────────────────────────────────────────────────────────────── */}

      <section
        aria-labelledby="repair-decision-heading"
        className="px-4 py-16 sm:px-6 sm:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/45 shadow-2xl">
            <div className="grid lg:grid-cols-2">
              <div className="p-6 sm:p-9 lg:p-12">
                <Badge className="mb-4 border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-[10px] uppercase tracking-widest text-emerald-400">
                  Honest advice
                </Badge>

                <h2
                  id="repair-decision-heading"
                  className="text-3xl font-black tracking-tight text-white sm:text-4xl"
                >
                  Repair isn't always the answer.
                </h2>

                <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base">
                  Our goal isn't to sell you the most expensive repair. It's
                  to help you make a sensible decision about your device after
                  the fault is understood.
                </p>

                <div className="mt-7 space-y-3">
                  {[
                    'We diagnose before recommending parts.',
                    'You receive the quotation before repair begins.',
                    'You can decline the repair after receiving the quote.',
                    'If the device is beyond economical repair, our No Fix, No Fee policy applies.',
                  ].map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <Check
                        className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400"
                        aria-hidden="true"
                      />

                      <span className="text-sm leading-6 text-slate-300">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-800 bg-slate-950/50 p-6 sm:p-9 lg:border-l lg:border-t-0 lg:p-12">
                <div className="flex h-full flex-col justify-center">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10">
                      <Scale
                        className="h-5 w-5 text-cyan-400"
                        aria-hidden="true"
                      />
                    </div>

                    <div>
                      <div className="text-xs font-bold uppercase tracking-widest text-cyan-500">
                        Our principle
                      </div>

                      <div className="text-lg font-black text-white">
                        Diagnose. Explain. Quote. Let you decide.
                      </div>
                    </div>
                  </div>

                  <p className="mt-6 text-sm leading-7 text-slate-500">
                    A professional repair decision should be based on the
                    actual fault and the economics of the device—not pressure,
                    guesswork or an automatic recommendation to replace
                    everything.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          CUSTOMER PROTECTION
      ───────────────────────────────────────────────────────────────────── */}

      <section
        aria-labelledby="customer-protection-heading"
        className="px-4 pb-16 sm:px-6 sm:pb-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-2xl">
            <Badge className="mb-4 border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-[10px] uppercase tracking-widest text-blue-400">
              Before you approve
            </Badge>

            <h2
              id="customer-protection-heading"
              className="text-3xl font-black tracking-tight text-white sm:text-4xl"
            >
              What protects you as a customer?
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-7">
              <FileCheck2
                className="h-7 w-7 text-cyan-400"
                aria-hidden="true"
              />

              <h3 className="mt-5 text-lg font-black text-white">
                Fixed quote before repair
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                The repair price is confirmed before repair work begins, so
                you can make an informed decision.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-7">
              <ShieldCheck
                className="h-7 w-7 text-emerald-400"
                aria-hidden="true"
              />

              <h3 className="mt-5 text-lg font-black text-white">
                No Fix, No Fee
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                If a device is catastrophically damaged and genuinely beyond
                economical repair, the current policy states that you pay
                nothing for the labor or diagnostic.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-7">
              <LockKeyhole
                className="h-7 w-7 text-cyan-400"
                aria-hidden="true"
              />

              <h3 className="mt-5 text-lg font-black text-white">
                Data privacy matters
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                Computer repair can involve highly personal information. Our
                service is focused on the repair requested rather than
                unnecessary access to personal files.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          WARRANTY
      ───────────────────────────────────────────────────────────────────── */}

      <section
        aria-labelledby="warranty-heading"
        className="border-y border-slate-800/70 bg-cyan-950/[0.08] px-4 py-16 sm:px-6 sm:py-20"
      >
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10">
              <BadgeCheck
                className="h-8 w-8 text-cyan-400"
                aria-hidden="true"
              />
            </div>

            <div>
              <Badge className="mb-3 border border-cyan-500/20 bg-cyan-500/10 text-[10px] uppercase tracking-widest text-cyan-400">
                Repair warranty
              </Badge>

              <h2
                id="warranty-heading"
                className="text-2xl font-black text-white sm:text-3xl"
              >
                30-Day Repair Warranty
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">
                Your repair is backed by the 30-day warranty currently stated
                by KCROC. Warranty terms and coverage should be provided with
                the completed repair documentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          FREE PICKUP / DELIVERY
      ───────────────────────────────────────────────────────────────────── */}

      <section
        aria-labelledby="pickup-heading"
        className="px-4 py-16 sm:px-6 sm:py-20"
      >
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-9">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10">
                    <Truck
                      className="h-5 w-5 text-cyan-400"
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-500">
                      Kuwait-wide convenience
                    </p>

                    <h2
                      id="pickup-heading"
                      className="text-xl font-black text-white sm:text-2xl"
                    >
                      Free pickup & delivery
                    </h2>
                  </div>
                </div>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500">
                  You don't have to transport a heavy gaming PC or fragile
                  laptop across Kuwait yourself. KCROC provides free pickup
                  and delivery across all Kuwait governorates for repair
                  services.
                </p>
              </div>

              <Button
                asChild
                className="h-12 rounded-xl bg-white px-6 font-black text-slate-950 hover:bg-slate-200"
              >
                <a href={bookingUrl}>
                  Arrange Pickup
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          FAQ
      ───────────────────────────────────────────────────────────────────── */}

      <section
        aria-labelledby="faq-heading"
        className="border-t border-slate-800/70 px-4 py-16 sm:px-6 sm:py-24"
      >
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center sm:mb-12">
            <Badge className="mb-4 border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-[10px] uppercase tracking-widest text-emerald-400">
              Pricing questions
            </Badge>

            <h2
              id="faq-heading"
              className="text-3xl font-black tracking-tight text-white sm:text-4xl"
            >
              Pricing FAQs
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500">
              Clear answers before you hand over your device.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;

              return (
                <div
                  key={faq.q}
                  className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/30"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`pricing-faq-${i}`}
                    onClick={() =>
                      setOpenIndex(isOpen ? null : i)
                    }
                    className="flex w-full items-center justify-between gap-5 p-5 text-left text-sm font-bold text-white transition-colors hover:text-cyan-400 sm:p-6"
                  >
                    <span>{faq.q}</span>

                    <ChevronDown
                      className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
                        isOpen
                          ? 'rotate-180 text-cyan-400'
                          : 'text-slate-600'
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  <div
                    id={`pricing-faq-${i}`}
                    role="region"
                    aria-hidden={!isOpen}
                    className={`grid transition-all duration-300 ${
                      isOpen
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-7 text-slate-400 sm:px-6 sm:pb-6">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          SPECIALIST SERVICES
      ───────────────────────────────────────────────────────────────────── */}

      <section
        aria-labelledby="services-heading"
        className="border-t border-slate-800/70 px-4 py-16 sm:px-6 sm:py-20"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center sm:mb-10">
            <Badge className="mb-4 border border-cyan-500/20 bg-cyan-500/10 px-3 py-1.5 text-[10px] uppercase tracking-widest text-cyan-400">
              Go deeper
            </Badge>

            <h2
              id="services-heading"
              className="text-3xl font-black tracking-tight text-white sm:text-4xl"
            >
              Specialist Services
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
              Explore the dedicated service pages for more detail about
              component-level repair capabilities.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {serviceLinks.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="group rounded-2xl border border-slate-800 bg-slate-900/35 p-5 transition-all hover:-translate-y-1 hover:border-cyan-500/40 hover:bg-slate-900/60 sm:p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-950">
                    <Icon
                      className="h-5 w-5 text-cyan-500"
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="mt-5 text-sm font-black text-white sm:text-base">
                    {link.title}
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-slate-500">
                    {link.desc}
                  </p>

                  <div className="mt-5 inline-flex items-center text-xs font-bold text-slate-500 transition-colors group-hover:text-cyan-400">
                    Explore service
                    <ArrowRight
                      className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          FINAL CTA
      ───────────────────────────────────────────────────────────────────── */}

      <section className="px-4 pb-16 pt-4 sm:px-6 sm:pb-24">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-950/40 via-slate-900/70 to-blue-950/30 p-7 text-center shadow-2xl shadow-cyan-950/10 sm:p-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10">
            <Wrench
              className="h-7 w-7 text-cyan-400"
              aria-hidden="true"
            />
          </div>

          <h2 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Not sure what your computer needs?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            You don't need to diagnose the problem yourself. Send us the
            device model and symptoms, and we'll help you determine the right
            next step.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              asChild
              className="h-12 rounded-xl bg-cyan-500 px-7 font-black text-slate-950 hover:bg-cyan-400"
            >
              <a href={whatsappUrl}>
                <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                WhatsApp KCROC
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-12 rounded-xl border-slate-700 bg-slate-950/50 px-7 font-bold text-white hover:border-cyan-500/40 hover:bg-slate-950"
            >
              <a href={`tel:+${business.telephone}`}>
                Call +{business.telephone}
              </a>
            </Button>
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[11px] text-slate-500">
            <span className="inline-flex items-center">
              <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-400" />
              Free initial diagnostic
            </span>

            <span className="inline-flex items-center">
              <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-400" />
              Quote before repair
            </span>

            <span className="inline-flex items-center">
              <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-400" />
              Free Kuwait-wide pickup
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
