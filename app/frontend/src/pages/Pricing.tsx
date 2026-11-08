// File: app/frontend/src/pages/Pricing.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Check,
  Truck,
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
import { buildWhatsAppLink } from '../utils/whatsappIntent';

const business = KCROC_GRAPH.business!;

/* ─────────────────────────────────────────────────────────────────────────────
   PRICING DATA
───────────────────────────────────────────────────────────────────────────── */

type DeviceType = 'windows-laptop' | 'macbook' | 'gaming' | 'desktop';
type DeviceFilter = 'all' | DeviceType;
type SymptomType = 'dead-no-power' | 'screen-damage' | 'overheating' | 'charging' | 'liquid-spill' | 'slow-upgrade';
type SymptomFilter = 'all' | SymptomType;
type PricingItem = { name:string; price:string; priceKind:string; priceNote?:string; scope:string; note?:string; turnaround:string; href:string; secondaryLink?:{label:string;href:string}; devices:DeviceType[]; symptoms:SymptomType[]; };
type PricingCategory = { title:string; anchor:string; eyebrow:string; icon:React.ElementType; featured?:boolean; items:PricingItem[]; };
const deviceFilters: {label:string;value:DeviceFilter}[] = [
  {label:'All Devices',value:'all'},{label:'Windows Laptop',value:'windows-laptop'},
  {label:'MacBook Air / Pro',value:'macbook'},{label:'Gaming PC / Laptop',value:'gaming'},{label:'Desktop Tower',value:'desktop'},
];
const symptomFilters: {label:string;value:SymptomFilter}[] = [
  {label:'All Symptoms',value:'all'},{label:'Dead / No Power',value:'dead-no-power'},
  {label:'Cracked / Flickering Screen',value:'screen-damage'},{label:'Overheating / Loud Fan',value:'overheating'},
  {label:'Not Charging / Loose Port',value:'charging'},{label:'Liquid Spill',value:'liquid-spill'},{label:'Slow / Upgrade',value:'slow-upgrade'},
];
const pricingCategories: PricingCategory[] = [
  { title:'Diagnostics, OS & Firmware Setup',anchor:'diagnostics',eyebrow:'Start with the fault',icon:Search,items:[
    {name:'Diagnostic & Inspection',price:'FREE',priceKind:'INITIAL ASSESSMENT',scope:'No-obligation initial assessment of the reported fault, with component-level checks where relevant.',turnaround:'Same Day / 24 Hours for the initial assessment; timing is confirmed when the device reaches our Hawalli lab.',href:'/computer-repair-kuwait',devices:['windows-laptop','macbook','gaming','desktop'],symptoms:['dead-no-power','screen-damage','overheating','charging','liquid-spill','slow-upgrade']},
    {name:'Windows OS Restoration',price:'10–15 KWD',priceKind:'SERVICE RANGE',scope:'Clean Windows installation, official drivers and essential updates.',note:'A clean installation can remove existing files and applications. Back up accessible files before approving the work.',turnaround:'Same Day / 24 Hours, depending on system condition and installation requirements.',href:'/computer-repair-kuwait',devices:['windows-laptop','gaming','desktop'],symptoms:['slow-upgrade']},
    {name:'Virus & Malware Removal',price:'10–20 KWD',priceKind:'SERVICE RANGE',scope:'Malware assessment, removal and security hardening.',note:'Malware remediation only; not standalone data recovery or ransomware decryption.',turnaround:'Same Day / 24 Hours for many cases; confirmed after the malware assessment and scope check.',href:'/virus-malware-removal-kuwait',devices:['windows-laptop','gaming','desktop'],symptoms:['slow-upgrade']},
    {name:'BIOS / Firmware Recovery',price:'20–40 KWD',priceKind:'SERVICE RANGE',scope:'Firmware diagnosis and SPI / EEPROM programmer recovery where appropriate.',turnaround:'24–48 Hours; underlying board-level faults or parts requirements can extend the estimate.',href:'/guides/bios-uefi-recovery-kuwait',devices:['windows-laptop','gaming','desktop'],symptoms:['dead-no-power']},
  ]},
  { title:'Cooling, Performance & Upgrades',anchor:'thermal',eyebrow:'Keep performance stable',icon:Thermometer,items:[
    {name:'Laptop Thermal Service',price:'15–20 KWD',priceKind:'SERVICE RANGE',scope:'Internal dust removal, heatsink and fan-path cleaning, and thermal paste service as appropriate for the model.',turnaround:'Same Day / 24 Hours, subject to scheduling and inspection.',href:'/laptop-repair-kuwait',devices:['windows-laptop','macbook','gaming'],symptoms:['overheating']},
    {name:'Gaming PC Thermal Service',price:'20–30 KWD',priceKind:'SERVICE RANGE',scope:'Thermal maintenance for complete desktop towers, including suitable cooler and airflow checks.',note:'Complete desktop systems only; standalone graphics cards are not accepted as repair jobs.',turnaround:'Typically 24–48 hours for complete gaming PC service; confirmed after inspection.',href:'/gaming-pc-repair-kuwait',devices:['gaming','desktop'],symptoms:['overheating']},
    {name:'Gaming PC Tuning',price:'20–40 KWD',priceKind:'SERVICE RANGE',scope:'FPS stability checks, fan-curve tuning and supported BIOS / XMP / EXPO configuration.',turnaround:'Typically 24–48 hours for complete gaming PC service; confirmed after inspection.',href:'/gaming-pc-repair-kuwait',devices:['gaming','desktop'],symptoms:['overheating','slow-upgrade']},
    {name:'RAM / SSD Installation',price:'5–10 KWD',priceKind:'INSTALLATION LABOUR',priceNote:'Compatible SSD / RAM parts are priced separately.',scope:'Installation labour and compatibility checks; migration is considered only on a healthy source drive.',turnaround:'Same Day / 24 Hours when a compatible part is available.',href:'/ssd-ram-upgrade-kuwait',devices:['windows-laptop','macbook','gaming','desktop'],symptoms:['slow-upgrade']},
  ]},
  { title:'Hardware Replacements & Physical Repair',anchor:'hardware',eyebrow:'Model-matched parts',icon:Laptop,items:[
    {name:'Laptop Battery Replacement',price:'8–15 KWD',priceKind:'INSTALLATION LABOUR',priceNote:'Exact-model battery cost is quoted separately.',scope:'Battery and charging-path checks, safe removal and installation of the compatible battery.',turnaround:'Confirmed after exact model and battery availability are checked.',href:'/battery-replacement-kuwait',devices:['windows-laptop','gaming'],symptoms:['charging']},
    {name:'Keyboard Replacement',price:'10–20 KWD',priceKind:'INSTALLATION LABOUR',priceNote:'Keyboard, palmrest or top-case assembly is priced separately.',scope:'Keyboard and input-fault diagnosis, followed by model-matched fitting where replacement is required.',turnaround:'Same day to 24 hours when the compatible part is available; timing is confirmed after model checks.',href:'/laptop-keyboard-replacement-kuwait',devices:['windows-laptop','macbook','gaming'],symptoms:['liquid-spill']},
    {name:'Laptop & MacBook Screen Replacement',price:'From 30 KWD',priceKind:'INSTALLATION LABOUR',priceNote:'Laptop panel or MacBook display assembly is priced separately.',scope:'Panel, cable, connector and backlight diagnosis before a compatible display is quoted.',turnaround:'Same day only when the compatible panel or display assembly is in stock; otherwise confirmed after model checks.',href:'/laptop-screen-repair-kuwait',secondaryLink:{label:'MacBook screen replacement',href:'/macbook-screen-replacement-kuwait'},devices:['windows-laptop','macbook','gaming'],symptoms:['screen-damage']},
    {name:'Hinge / Chassis Reconstruction',price:'15–30 KWD',priceKind:'SERVICE RANGE',scope:'Mounting-point reconstruction, structural reinforcement and hinge-tension checks where the chassis is repairable.',turnaround:'Same Day / 24 Hours; confirmed after inspection and parts checks.',href:'/laptop-hinge-repair-kuwait',devices:['windows-laptop','macbook','gaming'],symptoms:['screen-damage']},
  ]},
  { title:'Component-Level Motherboard & Logic Board Repair',anchor:'motherboard',eyebrow:'Specialist board work',icon:Cpu,featured:true,items:[
    {name:'Charging Port Repair',price:'20–35 KWD',priceKind:'SERVICE RANGE',scope:'DC jack, USB-C or other supported connector diagnosis, replacement and micro-soldering where appropriate.',turnaround:'Same Day / 24 Hours for common connector work; deeper board-level charging faults may take longer.',href:'/laptop-charging-port-repair-kuwait',devices:['windows-laptop','macbook','gaming'],symptoms:['charging','dead-no-power']},
    {name:'Motherboard Component Repair',price:'25–60 KWD',priceKind:'SERVICE RANGE',scope:'Diagnosis and targeted replacement of failed MOSFETs, power ICs, capacitors and related components where technically viable.',turnaround:'24–48 hours is typical for many component-level board repairs; complex faults or parts orders can take longer.',href:'/motherboard-repair-kuwait',devices:['windows-laptop','macbook','gaming','desktop'],symptoms:['dead-no-power','charging']},
    {name:'Advanced Motherboard Repair',price:'50–90+ KWD',priceKind:'SERVICE RANGE',scope:'Advanced board diagnosis and suitable BGA / chipset-level rework; repairability depends on the board and confirmed fault.',turnaround:'24–72 Hours for advanced board work; testing or parts requirements can extend the estimate.',href:'/motherboard-repair-kuwait',devices:['windows-laptop','macbook','gaming','desktop'],symptoms:['dead-no-power','charging']},
    {name:'Liquid-Damage Repair',price:'35–90+ KWD',priceKind:'SERVICE RANGE',scope:'Power isolation, corrosion assessment, board cleaning and component / trace repair where viable.',note:'Data access or preservation cannot be guaranteed after liquid exposure. Keep a spilled device switched off and unplugged.',turnaround:'24–72 hours is the published typical range; actual timing depends on damage and parts.',href:'/laptop-liquid-damage-repair-kuwait',devices:['windows-laptop','macbook','gaming'],symptoms:['liquid-spill','dead-no-power','charging']},
    {name:'MacBook Board-Level Repair',price:'45–100+ KWD',priceKind:'SERVICE RANGE',scope:'MacBook Air and Pro logic-board diagnosis and component-level repair where the original board is technically repairable.',note:'Repairing the original logic board may help retain access to existing storage, but data access is not guaranteed and data recovery is not offered.',turnaround:'24–48 hours is typical for many MacBook repairs; complex faults or parts orders can take longer.',href:'/macbook-repair-kuwait',devices:['macbook'],symptoms:['dead-no-power','charging','liquid-spill']},
  ]},
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
    a: 'The prices shown are starting rates or typical service ranges. The final price depends on your exact device, fault, repair complexity and part availability. For screen, battery and keyboard replacements, any amount marked as labor plus a panel, battery, keyboard or other part does not include that component. We provide a fixed, no-obligation total quote before repair begins.',
  },
  {
    q: 'Why are some prices listed as "Labor + Part"?',
    a: 'Parts vary significantly by model and grade. On screen, battery and keyboard replacements, the listed labor charge is separate from the panel, battery, keyboard or assembly itself. We confirm the component option and complete price with you before any paid work begins.',
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
    a: 'Most component-level motherboard and motherboard repairs are completed within 24 to 48 hours, including full-load stress testing before the device is returned.',
  },
  {
    q: 'Is my personal data safe during repair?',
    a: 'Data privacy is treated as a core part of the repair process. Our repair service is focused on diagnosing and repairing the hardware or software problem you requested, rather than unnecessary access to your personal files.',
  },
]);

/* ─────────────────────────────────────────────────────────────────────────────
   SPECIALIST SERVICES
───────────────────────────────────────────────────────────────────────────── */

const specialistServiceIds = [
  'srv-laptop',
  'srv-macbook',
  'srv-motherboard',
  'srv-screen',
  'srv-battery',
  'srv-gaming',
] as const;

// Keep link targets and displayed service names sourced from the knowledge graph.
const serviceLinks = Object.freeze(
  specialistServiceIds
    .map((id) => KCROC_GRAPH.services.find((service) => service.id === id))
    .filter((service): service is NonNullable<typeof service> => Boolean(service))
    .map((service) => ({
      title: service.title,
      path: `/${service.slug}`,
      icon: service.id === 'srv-motherboard' ? Cpu : service.id === 'srv-gaming' ? Activity : Laptop,
      desc: service.shortDescription || service.description,
    }))
);

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
  const [deviceFilter, setDeviceFilter] = useState<DeviceFilter>('all');
  const [symptomFilter, setSymptomFilter] = useState<SymptomFilter>('all');

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
    <div className="w-full min-h-screen overflow-hidden bg-transparent font-sans text-slate-100 selection:bg-cyan-500/30">
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
            Computer Repair Prices in Kuwait
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Know the price. Approve the repair.
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

          <div className="mx-auto mt-8 max-w-5xl text-left" aria-label="Starting repair labor prices">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-cyan-300">Starting prices · parts charged separately where stated</p>
            <div className="grid gap-3 sm:grid-cols-3">
              <Link to="/laptop-screen-repair-kuwait" className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 transition-colors hover:border-cyan-500/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
                <span className="text-xs font-bold text-slate-400">Laptop screen labor</span>
                <span className="mt-1 block text-xl font-black text-white">From 30 KWD + panel</span>
                <span className="mt-1 block text-xs leading-5 text-slate-400">The replacement display panel is priced separately.</span>
              </Link>
              <Link to="/battery-replacement-kuwait" className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 transition-colors hover:border-cyan-500/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
                <span className="text-xs font-bold text-slate-400">Laptop battery labor</span>
                <span className="mt-1 block text-xl font-black text-white">From 8 KWD + battery</span>
                <span className="mt-1 block text-xs leading-5 text-slate-400">Battery price depends on model and availability.</span>
              </Link>
              <Link to="/ssd-ram-upgrade-kuwait" className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 transition-colors hover:border-cyan-500/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
                <span className="text-xs font-bold text-slate-400">SSD / RAM installation labor</span>
                <span className="mt-1 block text-xl font-black text-white">From 5 KWD</span>
                <span className="mt-1 block text-xs leading-5 text-slate-400">Upgrade parts and data migration are separate where required.</span>
              </Link>
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-500">A free initial diagnosis is available. You receive the repair quote and approve it before paid repair work begins.</p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          TRUST PROMISE
      ───────────────────────────────────────────────────────────────────── */}

      <section className="px-4 pb-12 sm:px-6 sm:pb-16">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/45 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <div className="border-b border-slate-800 bg-brand-dark/50 px-5 py-5 sm:px-8">
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
                price depends on the exact device, fault, repair complexity and
                part availability. For screen, battery and keyboard replacements,
                the amount marked as labor plus a part does not include that component.
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

      <section id="price-list" aria-labelledby="pricing-heading" className="px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center sm:mb-12">
            <Badge className="mb-4 border border-cyan-500/20 bg-cyan-500/10 px-3 py-1.5 text-[10px] uppercase tracking-widest text-cyan-400">Service pricing</Badge>
            <h2 id="pricing-heading" className="text-3xl font-black tracking-tight text-white sm:text-4xl">Laptop, MacBook, Gaming PC &amp; Motherboard Repair Price List (KWD)</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">Compare published guide prices, what each service covers and its typical turnaround. Your exact quote is confirmed after diagnosis and before paid work.</p>
          </div>
          <div className="mb-8 space-y-5 rounded-3xl border border-slate-800 bg-slate-900/50 p-4 sm:p-6">
            <div><p className="mb-3 text-xs font-black uppercase tracking-[0.15em] text-cyan-300">Filter by device</p><div role="group" aria-label="Filter pricing by device" className="flex flex-wrap gap-2">
              {deviceFilters.map((filter) => <button key={filter.value} type="button" aria-pressed={deviceFilter===filter.value} onClick={() => setDeviceFilter(filter.value)} className={'min-h-10 rounded-full border px-3.5 py-2 text-xs font-bold transition-colors sm:text-sm '+(deviceFilter===filter.value?'border-cyan-400/60 bg-cyan-500/15 text-cyan-100':'border-slate-700 bg-slate-950/70 text-slate-300 hover:border-cyan-500/40 hover:text-cyan-200')}>{filter.label}</button>)}
            </div></div>
            <div><p className="mb-3 text-xs font-black uppercase tracking-[0.15em] text-cyan-300">Filter by symptom</p><div role="group" aria-label="Filter pricing by symptom" className="flex flex-wrap gap-2">
              {symptomFilters.map((filter) => <button key={filter.value} type="button" aria-pressed={symptomFilter===filter.value} onClick={() => setSymptomFilter(filter.value)} className={'min-h-10 rounded-full border px-3.5 py-2 text-xs font-bold transition-colors sm:text-sm '+(symptomFilter===filter.value?'border-cyan-400/60 bg-cyan-500/15 text-cyan-100':'border-slate-700 bg-slate-950/70 text-slate-300 hover:border-cyan-500/40 hover:text-cyan-200')}>{filter.label}</button>)}
            </div></div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-4">
              <p aria-live="polite" className="text-xs leading-5 text-slate-400">{deviceFilter==='all'&&symptomFilter==='all'?'All 17 published services are shown.':pricingCategories.reduce((count,cat)=>count+cat.items.filter((item)=>(deviceFilter==='all'||item.devices.includes(deviceFilter))&&(symptomFilter==='all'||item.symptoms.includes(symptomFilter))).length,0)+' matching services highlighted. All 17 rows remain in the page.'}</p>
              {(deviceFilter!=='all'||symptomFilter!=='all')&&<button type="button" onClick={()=>{setDeviceFilter('all');setSymptomFilter('all');}} className="min-h-9 rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-bold text-cyan-300">Clear filters</button>}
            </div>
          </div>

          <div className="space-y-6">
            {pricingCategories.map((category) => {
              const Icon=category.icon;
              return <Card key={category.title} id={'pricing-'+category.anchor} className={'scroll-mt-6 overflow-hidden border bg-slate-900/45 shadow-2xl backdrop-blur-xl '+(category.featured?'border-cyan-500/30 shadow-cyan-950/10':'border-slate-800')}>
                <CardHeader className="border-b border-slate-800/70 p-5 sm:p-6"><div className="flex items-start justify-between gap-4"><div className="flex items-start gap-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-brand-dark"><Icon className="h-5 w-5 text-cyan-400" aria-hidden="true" /></div><div><p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-cyan-500">{category.eyebrow}</p><CardTitle className="text-lg font-black text-white sm:text-xl">{category.title}</CardTitle></div></div>{category.featured&&<Badge className="shrink-0 border border-cyan-500/20 bg-cyan-500/10 text-[9px] uppercase tracking-wider text-cyan-400">Specialist</Badge>}</div></CardHeader>
                {category.featured&&<div className="grid gap-4 border-b border-cyan-500/15 bg-cyan-950/15 p-5 sm:grid-cols-2 sm:p-6">
                  <div className="rounded-2xl border border-slate-700/70 bg-slate-950/50 p-4"><p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">Whole-board replacement</p><h3 className="mt-2 text-base font-black text-white">Replace the complete assembly</h3><p className="mt-2 text-xs leading-6 text-slate-400">A full motherboard or logic-board assembly is a model-specific parts decision. Compatibility and part cost must be checked before it can be quoted.</p></div>
                  <div className="rounded-2xl border border-cyan-500/25 bg-cyan-950/20 p-4"><p className="text-[10px] font-black uppercase tracking-[0.14em] text-cyan-300">KCROC component-level approach</p><h3 className="mt-2 text-base font-black text-white">We fix the board where repair is viable.</h3><p className="mt-2 text-xs leading-6 text-slate-300">We trace the fault and consider a targeted connector, MOSFET, power IC or other component repair before recommending a whole-board replacement.</p><p className="mt-3 text-xs font-bold leading-5 text-cyan-200">Published guide ranges: 25–60 KWD component repair · 50–90+ KWD advanced board work · 45–100+ KWD MacBook logic-board repair.</p></div>
                  <p className="text-xs leading-5 text-slate-500 sm:col-span-2">Repairing the original board may help retain access to existing storage on some devices, but data access is not guaranteed. KCROC does not offer standalone data recovery.</p>
                </div>}
                <CardContent className="p-0">
                  <table data-pricing-table={category.anchor} aria-label={category.title+' prices in Kuwaiti dinars'} className="block w-full text-left md:table">
                    <caption className="sr-only">{category.title}: service, scope and notes, typical turnaround, price in KWD and direct quote action.</caption>
                    <thead className="hidden bg-slate-950/70 text-[10px] uppercase tracking-[0.12em] text-slate-400 md:table-header-group"><tr><th scope="col" className="px-5 py-4 font-black">Service</th><th scope="col" className="px-5 py-4 font-black">Scope &amp; notes</th><th scope="col" className="px-5 py-4 font-black">Typical turnaround</th><th scope="col" className="px-5 py-4 font-black">Price (KWD)</th><th scope="col" className="px-5 py-4 text-right font-black">Action</th></tr></thead>
                    <tbody className="block divide-y divide-slate-800/80 md:table-row-group">
                      {category.items.map((item) => {
                        const matches=(deviceFilter==='all'||item.devices.includes(deviceFilter))&&(symptomFilter==='all'||item.symptoms.includes(symptomFilter));
                        const hasFilter=deviceFilter!=='all'||symptomFilter!=='all';
                        const message='Hello KCROC, I am checking '+item.name+'. Published price: '+item.price+(item.priceNote?'; '+item.priceNote:'')+'. My device model is: ____. Symptoms: ____. Kuwait area: ____. Please confirm the expected turnaround and total quote before any paid work.';
                        return <tr key={item.name} data-pricing-row="true" data-filter-match={matches?'true':'false'} className={'block border-b border-slate-800/80 p-4 transition-opacity last:border-b-0 md:table-row md:border-b-0 md:p-0 '+(hasFilter?(matches?'bg-cyan-950/10 opacity-100':'bg-slate-950/20 opacity-45'):'hover:bg-brand-dark/25')}>
                          <td className="block py-2 align-top md:table-cell md:w-[22%] md:px-5 md:py-5"><span className="mb-1 block text-[10px] font-black uppercase tracking-wider text-slate-500 md:hidden">Service</span><div className="text-sm font-black leading-6 text-slate-100"><Link to={item.href} className="underline decoration-slate-700 underline-offset-4 transition-colors hover:text-cyan-300 hover:decoration-cyan-400">{item.name}</Link></div>{item.secondaryLink&&<Link to={item.secondaryLink.href} className="mt-2 inline-flex text-xs font-bold text-cyan-300 underline-offset-4 hover:text-cyan-200 hover:underline">{item.secondaryLink.label} <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden="true" /></Link>}</td>
                          <td className="block py-2 align-top md:table-cell md:px-5 md:py-5"><span className="mb-1 block text-[10px] font-black uppercase tracking-wider text-slate-500 md:hidden">Scope &amp; notes</span><p className="text-xs leading-6 text-slate-300">{item.scope}</p>{item.note&&<p className="mt-2 text-[11px] leading-5 text-amber-200/80">{item.note}</p>}</td>
                          <td className="block py-2 align-top md:table-cell md:w-[18%] md:px-5 md:py-5"><span className="mb-1 block text-[10px] font-black uppercase tracking-wider text-slate-500 md:hidden">Typical turnaround</span><span className="inline-flex rounded-lg border border-slate-700 bg-slate-950/60 px-2.5 py-1.5 text-xs font-semibold leading-5 text-slate-300">{item.turnaround}</span></td>
                          <td className="block py-2 align-top md:table-cell md:w-[16%] md:px-5 md:py-5"><span className="mb-1 block text-[10px] font-black uppercase tracking-wider text-slate-500 md:hidden">Price (KWD)</span><div className="flex flex-wrap items-center gap-2 md:items-start"><span className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-3 py-2 text-sm font-black tabular-nums text-cyan-300">{item.price}</span><span className="text-[9px] font-black uppercase tracking-wider text-slate-500">{item.priceKind}</span></div>{item.priceNote&&<p className="mt-2 max-w-[15rem] text-[11px] leading-5 text-slate-400">{item.priceNote}</p>}</td>
                          <td className="block py-2 align-top md:table-cell md:px-5 md:py-5 md:text-right"><span className="mb-1 block text-[10px] font-black uppercase tracking-wider text-slate-500 md:hidden">Get an exact quote</span><a href={buildWhatsAppLink(message)} target="_blank" rel="noopener noreferrer" aria-label={'Get exact quote for '+item.name+' on WhatsApp'} className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-3 py-2 text-xs font-black text-emerald-200 transition-colors hover:border-emerald-400/50 hover:bg-emerald-500/15"><MessageCircle className="h-4 w-4" aria-hidden="true" />Get Exact Quote</a></td>
                        </tr>;
                      })}
                    </tbody>
                  </table>
                </CardContent>
              </Card>;
            })}
          </div>
          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/30 p-5 sm:p-6"><div className="flex items-start gap-3"><CircleDollarSign className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" aria-hidden="true" /><div><h3 className="text-sm font-black text-white">Why some prices show labour + part</h3><p className="mt-2 text-xs leading-6 text-slate-500 sm:text-sm">Screen, battery, keyboard and upgrade parts vary by model and grade. The published labour figure is not the component price; we confirm the compatible part and complete total before paid work begins.</p></div></div></div>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"><Button asChild className="h-12 w-full rounded-xl bg-cyan-500 px-7 font-black text-slate-950 hover:bg-cyan-400 sm:w-auto"><a href={whatsappUrl}><MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />Get My Exact Quote</a></Button><Link to="/services" className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-slate-800 bg-slate-900/50 px-7 text-sm font-bold text-slate-300 transition-colors hover:border-cyan-500/40 hover:text-cyan-400 sm:w-auto">Browse All Services <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></Link></div>
          <p className="mt-6 text-center text-xs leading-5 text-slate-500">Typical turnaround is an estimate after the device reaches our Hawalli lab. Confirmed timing depends on diagnosis, workload, compatible parts and the repair you approve.</p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          WHAT AFFECTS PRICE
      ───────────────────────────────────────────────────────────────────── */}

      <section
        aria-labelledby="price-factors-heading"
        className="border-y border-slate-800/70 bg-brand-dark/35 px-4 py-16 sm:px-6 sm:py-20"
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
          CUSTOMER PROTECTION
      ───────────────────────────────────────────────────────────────────── */}

      <section aria-labelledby="customer-protection-heading" className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl"><Badge className="mb-4 border border-cyan-500/20 bg-cyan-500/10 px-3 py-1.5 text-[10px] uppercase tracking-widest text-cyan-400">Customer protection</Badge><h2 id="customer-protection-heading" className="text-3xl font-black tracking-tight text-white sm:text-4xl">Four clear commitments before you approve a repair</h2><p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">We diagnose the actual fault, explain whether repair or replacement is sensible, and let you decide. Paid work starts only after you approve the quoted scope and total.</p></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/45 p-5 sm:p-6"><Search className="h-6 w-6 text-cyan-400" aria-hidden="true" /><h3 className="mt-4 text-sm font-black text-white">Free initial diagnosis</h3><p className="mt-2 text-xs leading-6 text-slate-400">The initial diagnostic assessment is free and carries no obligation to proceed with a repair.</p></div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/45 p-5 sm:p-6"><FileCheck2 className="h-6 w-6 text-cyan-400" aria-hidden="true" /><h3 className="mt-4 text-sm font-black text-white">Written quote before work</h3><p className="mt-2 text-xs leading-6 text-slate-400">We explain the fault, parts and labour, then confirm the price before paid repair work begins.</p></div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/45 p-5 sm:p-6"><ShieldCheck className="h-6 w-6 text-emerald-400" aria-hidden="true" /><h3 className="mt-4 text-sm font-black text-white">No Fix, No Fee</h3><p className="mt-2 text-xs leading-6 text-slate-400">Where a device is catastrophically damaged and genuinely beyond economical repair under the stated policy, no labour or diagnostic fee is charged.</p></div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/45 p-5 sm:p-6"><BadgeCheck className="h-6 w-6 text-cyan-400" aria-hidden="true" /><h3 className="mt-4 text-sm font-black text-white">30-day parts &amp; labour warranty</h3><p className="mt-2 text-xs leading-6 text-slate-400">Covered completed repairs carry the stated 30-day warranty on parts and workmanship, subject to confirmed repair terms.</p></div>
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

      {/* Commercial repair paths */}
      <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6" aria-labelledby="commercial-pricing-paths">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/45 p-6 sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-400">Choose by repair need</p>
          <h2 id="commercial-pricing-paths" className="mt-2 text-2xl font-black text-white sm:text-3xl">Laptop, gaming and specialist repair pricing</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
            Pricing gives the starting point. The service pages explain what is actually repaired, what changes the quote and how pickup works.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Link to="/laptop-repair-kuwait" className="rounded-2xl border border-slate-800 bg-brand-dark/60 p-4 transition-colors hover:border-cyan-500/30">
              <span className="font-bold text-white">Laptop Repair Kuwait</span>
              <span className="mt-1 block text-xs leading-5 text-slate-400">Screens, hinges, charging, batteries and motherboards.</span>
            </Link>
            <Link to="/gaming-pc-repair-kuwait" className="rounded-2xl border border-slate-800 bg-brand-dark/60 p-4 transition-colors hover:border-cyan-500/30">
              <span className="font-bold text-white">Gaming PC Repair Kuwait</span>
              <span className="mt-1 block text-xs leading-5 text-slate-400">GPU, thermal, VRM, BIOS/VBIOS and cooling diagnosis.</span>
            </Link>
            <Link to="/dell-laptop-repair-kuwait" className="rounded-2xl border border-slate-800 bg-brand-dark/60 p-4 transition-colors hover:border-cyan-500/30">
              <span className="font-bold text-white">Dell Laptop Repair</span>
              <span className="mt-1 block text-xs leading-5 text-slate-400">Inspiron, Latitude, XPS, G-series and Alienware.</span>
            </Link>
            <Link to="/hp-laptop-repair-kuwait" className="rounded-2xl border border-slate-800 bg-brand-dark/60 p-4 transition-colors hover:border-cyan-500/30">
              <span className="font-bold text-white">HP Laptop Repair</span>
              <span className="mt-1 block text-xs leading-5 text-slate-400">Pavilion, EliteBook, ProBook, Envy, OMEN and Victus.</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          FAQ
      ───────────────────────────────────────────────────────────────────── */}

      <section aria-labelledby="faq-heading" className="border-t border-slate-800/70 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center sm:mb-12"><Badge className="mb-4 border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-[10px] uppercase tracking-widest text-emerald-400">Pricing questions</Badge><h2 id="faq-heading" className="text-3xl font-black tracking-tight text-white sm:text-4xl">Pricing FAQs</h2><p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500">Clear answers before you hand over your device.</p></div>
          <div className="space-y-3">
            {faqs.map((faq) => <details key={faq.q} className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/30">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 p-5 text-left text-sm font-bold text-white transition-colors hover:text-cyan-400 sm:p-6 [&::-webkit-details-marker]:hidden"><span>{faq.q}</span><ChevronDown className="h-5 w-5 shrink-0 text-slate-600 transition-transform duration-300 group-open:rotate-180 group-open:text-cyan-400" aria-hidden="true" /></summary>
              <div className="border-t border-slate-800/70 px-5 pb-5 pt-4 sm:px-6 sm:pb-6"><p className="text-sm leading-7 text-slate-400">{faq.a}</p></div>
            </details>)}
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
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-brand-dark">
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

          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/30 p-5 sm:p-6">
            <h3 className="text-base font-black text-white sm:text-lg">
              Need repair for a specific laptop brand?
            </h3>
            <p className="mt-2 text-xs leading-6 text-slate-500 sm:text-sm">
              Open the dedicated repair page for your manufacturer to find model-specific symptoms and repair options.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[...KCROC_GRAPH.brands]
                .sort((a, b) => (b.navigationPriority ?? 0) - (a.navigationPriority ?? 0))
                .map((brand) => (
                  <Link
                    key={brand.id}
                    to={`/${brand.slug}`}
                    aria-label={brand.title}
                    className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/60 px-3 py-2 text-xs font-semibold text-cyan-300 transition-colors hover:border-cyan-500/40 hover:text-cyan-200 sm:text-sm"
                  >
                    {brand.title}
                  </Link>
                ))}
            </div>
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
              className="h-12 rounded-xl border-slate-700 bg-brand-dark/50 px-7 font-bold text-white hover:border-cyan-500/40 hover:bg-brand-dark"
            >
              <a href={`tel:+${business.telephone}`}>
                Call +{business.telephone}
              </a>
            </Button>

            <Button
              asChild
              className="h-12 rounded-xl bg-emerald-500 px-7 font-black text-slate-950 hover:bg-emerald-400"
            >
              <a href="/book">Request Free Pickup</a>
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
    </div>
  );
}
