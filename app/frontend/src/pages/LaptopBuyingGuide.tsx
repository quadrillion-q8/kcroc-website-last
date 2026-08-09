// File: app/frontend/src/pages/LaptopBuyingGuide.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Cpu, MemoryStick, HardDrive, Gauge, Thermometer, Battery,
  Phone, MessageCircle, Shield, CheckCircle2, MapPin, Wrench,
  Laptop, Sparkles, ListChecks, Monitor, Usb, Wifi, Hammer,
  AlertTriangle, BookOpen, Store, MapPinned, ChevronRight, Quote
} from 'lucide-react';

import SchemaMarkup from '../components/seo/SchemaMarkup';
import { KCROC_GRAPH } from '../data/graph';

// Dynamic Business Data
const business = KCROC_GRAPH.business!;

/* ─────────────────────────────────────────────────────────────────────────────
   1. PAGE DATA & SEO
───────────────────────────────────────────────────────────────────────────── */
const PAGE_URL = `${business.websiteUrl}/blog/laptop-buying-guide-kuwait-2026`;
const HERO_IMAGE_URL = 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_1200/v1781139061/2026-01-22_9_qfanpt.jpg';
const PUBLISHED_DATE = '2026-08-07T09:00:00+03:00';

const WA_LINK = `https://wa.me/${business.telephone}?text=${encodeURIComponent(
  'Hi KCROC, I read your Laptop Buying Guide and would like some advice before I buy. Can you help?'
)}`;

const WA_DIAGNOSIS_LINK = `https://wa.me/${business.telephone}?text=${encodeURIComponent(
  "Hi KCROC, my laptop is having issues and I'd like a free diagnosis. Here's what's happening:"
)}`;

// PILLAR_SCHEMA: Article, FAQPage, BreadcrumbList, Person
const PILLAR_SCHEMA = [
  {
    '@type': 'Article',
    headline: "Laptop Buying Guide Kuwait (2026): What the Spec Sheet Won't Tell You",
    description: 'Confused by Intel, Ryzen and RTX naming in 2026? A Kuwait repair engineer explains which laptop specs actually matter — and which don\'t.',
    image: [HERO_IMAGE_URL],
    author: {
      '@type': 'Person',
      name: 'Imran',
      url: `${business.websiteUrl}/author/imran`,
      jobTitle: 'Hardware Repair Engineer',
      worksFor: {
        '@type': 'Organization',
        name: business.legalName,
        url: business.websiteUrl,
      },
    },
    publisher: {
      '@type': 'Organization',
      name: business.legalName,
      url: business.websiteUrl,
      logo: { '@type': 'ImageObject', url: business.logoUrl },
    },
    datePublished: PUBLISHED_DATE,
    dateModified: PUBLISHED_DATE,
    mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
    articleSection: 'Laptop Hardware Guide',
    keywords: [
      'Laptop Buying Guide Kuwait', 'Best Laptop Kuwait', 'Laptop Specifications Guide',
      'Laptop CPU Guide', 'Intel Core Ultra', 'AMD Ryzen AI', 'RTX 50 Laptop',
      'Laptop RAM Guide', 'DDR5 RAM', 'LPCAMM2', 'Laptop SSD Guide',
      'PCIe Gen 5 SSD', 'Gaming Laptop Kuwait', 'Business Laptop Kuwait',
      'Engineering Laptop Kuwait', 'Laptop Repair Kuwait',
    ],
    about: [
      { '@type': 'Thing', name: 'Laptop Hardware' },
      { '@type': 'Thing', name: 'Computer Repair' },
    ],
    inLanguage: 'en',
  },
  {
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Is a Core i7 always faster than a Core i5?', acceptedAnswer: { '@type': 'Answer', text: 'Not necessarily. A Core i5-H can outperform a Core i7-U under sustained load, because the suffix — not the tier number — determines how much power the chip is allowed to draw.' } },
      { '@type': 'Question', name: 'How much RAM do I actually need in 2026?', acceptedAnswer: { '@type': 'Answer', text: '16GB is a reasonable baseline for general use. 32GB is recommended for developers and anyone running virtual machines or multiple demanding applications at once. 64GB+ suits video editing, 3D work, and local AI tasks.' } },
      { '@type': 'Question', name: "What's the real difference between TLC and QLC SSDs?", acceptedAnswer: { '@type': 'Answer', text: 'TLC NAND is faster and more durable, and holds its speed when nearly full. QLC is cheaper but can slow down sharply once its cache is exhausted during large transfers, and generally has lower write endurance.' } },
      { '@type': 'Question', name: 'Why does my "gaming laptop" with an RTX GPU still run games poorly?', acceptedAnswer: { '@type': 'Answer', text: 'The GPU may be power-limited (low TGP) to fit a thin chassis, or the cooling system may not be sufficient to sustain its rated performance without throttling.' } },
      { '@type': 'Question', name: 'Is DDR5 worth paying extra for over DDR4?', acceptedAnswer: { '@type': 'Answer', text: 'For a new purchase in 2026, yes in most cases — DDR5 offers higher bandwidth, and DDR4 is increasingly a legacy standard being phased out of new laptops.' } },
      { '@type': 'Question', name: 'What is LPCAMM2 and why does it matter?', acceptedAnswer: { '@type': 'Answer', text: "It's a memory module standard that offers LPDDR5X-class speed and efficiency while remaining removable and upgradeable — solving a tradeoff that previously forced a choice between fast-but-soldered and upgradeable-but-slower memory." } },
      { '@type': 'Question', name: "Do I need a dedicated GPU if I don't game?", acceptedAnswer: { '@type': 'Answer', text: 'Usually not. Modern integrated graphics handle office work, coding, video playback, and light creative work well. A dedicated GPU is worth it for 3D rendering, heavier gaming, or GPU-accelerated professional software.' } },
      { '@type': 'Question', name: 'What does thermal throttling actually feel like?', acceptedAnswer: { '@type': 'Answer', text: 'Sudden slowdowns, stutter, or frame drops during sustained heavy use — even though the laptop was fast when the workload started — as the system deliberately reduces power to avoid overheating.' } },
      { '@type': 'Question', name: "Does Kuwait's climate actually affect laptop performance?", acceptedAnswer: { '@type': 'Answer', text: 'Yes, for sustained heavy workloads. Ambient heat reduces the thermal headroom available before throttling kicks in, particularly for higher-wattage H and HX-series machines during long rendering, compiling, or gaming sessions.' } },
      { '@type': 'Question', name: 'Is liquid metal cooling worth seeking out?', acceptedAnswer: { '@type': 'Answer', text: "It offers better thermal conductivity than standard paste and doesn't degrade the way paste does over years, but it requires precise factory application. It's a genuine advantage in premium machines, not a marketing gimmick." } },
      { '@type': 'Question', name: "What's the minimum battery capacity I should look for?", acceptedAnswer: { '@type': 'Answer', text: 'It depends on use, but 70Wh+ is a reasonable target for all-day mobile use; smaller batteries (under 50Wh) will require frequent charging under real workloads.' } },
      { '@type': 'Question', name: 'Should I buy 8GB RAM if the laptop is cheap?', acceptedAnswer: { '@type': 'Answer', text: "Generally not recommended for 2026 — 8GB is consumed quickly by the OS and browser alone, and most 8GB configurations can't be upgraded later if soldered." } },
      { '@type': 'Question', name: "What's the difference between PCIe Gen4 and Gen5 SSDs in daily use?", acceptedAnswer: { '@type': 'Answer', text: "For most everyday tasks the difference is minor; Gen5's advantage shows up mainly in large sequential transfers and specialized workstation workloads, and Gen5 drives also tend to run hotter." } },
      { '@type': 'Question', name: "Can a laptop's GPU model number be misleading?", acceptedAnswer: { '@type': 'Answer', text: 'Yes — the same GPU model can ship with very different power limits (TGP) across laptops, which has a bigger effect on real performance than the model name alone.' } },
      { '@type': 'Question', name: 'Should I buy a laptop with soldered RAM?', acceptedAnswer: { '@type': 'Answer', text: "It depends on how long you plan to keep the machine and whether your workload is likely to grow. Soldered RAM is a reasonable tradeoff if you're buying for a fixed, well-defined use case and a shorter ownership period, or if it comes with a genuinely lower price for otherwise equivalent specs — it's a disadvantage if your needs are likely to grow, or if you plan to keep the laptop long enough that a mid-life RAM upgrade would otherwise make sense. Before buying, check the exact model's memory configuration (a teardown will usually confirm it) rather than assuming from the RAM generation alone, and factor in your expected ownership period." } },
      { '@type': 'Question', name: 'What causes a laptop to stop charging or shut down randomly?', acceptedAnswer: { '@type': 'Answer', text: 'Often a failure at the component level on the motherboard — a damaged charging IC, a failed capacitor, or a cracked solder joint from repeated heating and cooling — rather than a fault with the battery or charger itself.' } },
      { '@type': 'Question', name: 'Is it better to repair or replace a laptop with a dead motherboard?', acceptedAnswer: { '@type': 'Answer', text: 'It depends on the specific fault. Many motherboard failures are isolated to a single component and can be repaired at the board level, which is often significantly cheaper than a full replacement and preserves data stored on a soldered SSD.' } },
      { '@type': 'Question', name: 'How often should I clean the inside of my laptop?', acceptedAnswer: { '@type': 'Answer', text: "There's no fixed interval, but if fan noise increases or temperatures rise noticeably during normal use, dust buildup on the cooling system is a common and preventable cause." } },
      { '@type': 'Question', name: 'Is buying a gaming laptop in Kuwait riskier because of the heat?', acceptedAnswer: { '@type': 'Answer', text: "Not riskier, but heat-sensitive. A gaming laptop's cooling design (heat pipes vs. vapor chamber) and your usage environment (a well-ventilated, air-conditioned space) matter more here than in cooler climates. Regular internal cleaning also becomes more important given local dust conditions." } },
      { '@type': 'Question', name: 'Which laptop brands are easiest to repair?', acceptedAnswer: { '@type': 'Answer', text: 'This varies by model as much as by brand — some manufacturers use standardized, socketed components across a line, while others solder heavily even in higher-end models. A pre-purchase teardown search for the specific model is more reliable than a brand-wide assumption.' } },
      { '@type': 'Question', name: 'How long should a good laptop realistically last?', acceptedAnswer: { '@type': 'Answer', text: 'With reasonable care — clean airflow, avoiding sustained heat exposure, and moderate charging habits — a well-specified laptop can remain useful for 4–6 years before its performance or battery life becomes a genuine limitation for its original purpose.' } },
      { '@type': 'Question', name: 'Can motherboard damage actually be repaired, or does it always mean replacement?', acceptedAnswer: { '@type': 'Answer', text: 'Many motherboard faults are isolated to a single failed component — a capacitor, MOSFET, or charging IC — and can be repaired at the board level rather than requiring a full replacement. Whether repair is possible depends on the specific fault, which is why diagnosis should come before a replace-or-repair decision, not after.' } },
    ],
  },
  {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: business.websiteUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${business.websiteUrl}/blog` },
      { '@type': 'ListItem', position: 3, name: 'Laptop Buying Guide Kuwait 2026', item: PAGE_URL },
    ],
  },
  {
    '@type': 'Person',
    name: 'Imran',
    url: `${business.websiteUrl}/author/imran`,
    jobTitle: 'Hardware Repair Engineer',
    worksFor: {
      '@type': 'Organization',
      name: business.legalName,
      url: business.websiteUrl,
    },
    knowsAbout: [
      'Laptop motherboard diagnostics',
      'MacBook logic board repair',
      'Component-level micro-soldering',
      'Gaming laptop thermal troubleshooting',
    ],
  },
];

// Derive the on-page FAQ list straight from the schema so content and structured data can't drift apart.
const faq = (PILLAR_SCHEMA.find((s) => s['@type'] === 'FAQPage') as any).mainEntity.map((q: any) => ({
  q: q.name,
  a: q.acceptedAnswer.text,
}));

/* ─────────────────────────────────────────────────────────────────────────────
   2. CONTENT DATA
───────────────────────────────────────────────────────────────────────────── */

const toc = [
  { id: 'understanding-hardware', label: 'Understanding Modern Laptop Hardware' },
  { id: 'buying-in-kuwait', label: 'Buying a Laptop in Kuwait: What Changes?' },
  { id: 'brands-in-kuwait', label: 'Laptop Brands in Kuwait' },
  { id: 'where-to-buy', label: 'Where to Buy a Laptop in Kuwait' },
  { id: 'cpu-guide', label: 'CPU Guide' },
  { id: 'ram-guide', label: 'RAM Guide' },
  { id: 'storage-guide', label: 'Storage Guide' },
  { id: 'gpu-guide', label: 'GPU Guide' },
  { id: 'cooling', label: 'Cooling' },
  { id: 'display', label: 'Display' },
  { id: 'ports', label: 'Ports' },
  { id: 'battery', label: 'Battery' },
  { id: 'wireless', label: 'Wireless Connectivity' },
  { id: 'repairability', label: 'Repairability' },
  { id: 'spec-targets', label: 'Specification Targets by User Type' },
  { id: 'checklist', label: 'Buying Checklist' },
  { id: 'mistakes', label: 'Common Buying Mistakes' },
  { id: 'faq', label: 'Frequently Asked Questions' },
  { id: 'when-it-fails', label: 'When Your Laptop Starts Failing' },
];

const cpuSuffixTable = [
  { suffix: 'U', power: 'Low power, efficiency-focused', builtFor: 'Long battery life over sustained speed', fits: 'Office work, browsing, travel' },
  { suffix: 'V', power: 'Low power, efficiency-focused', builtFor: "Intel's efficiency-first design with memory built into the CPU package", fits: 'Thin-and-light laptops prioritizing endurance' },
  { suffix: 'P', power: 'Mid power', builtFor: 'A middle ground between U and H (increasingly phased out)', fits: 'Users who occasionally run heavier apps' },
  { suffix: 'H / HS', power: 'Higher sustained power', builtFor: 'Sustained multi-core performance', fits: 'Developers, standard gaming, video editing' },
  { suffix: 'HX', power: 'Highest sustained power', builtFor: 'Desktop-class performance in a laptop chassis', fits: 'CAD, 3D rendering, compiling, high-end gaming' },
];

const ramUseCaseTable = [
  { user: 'Students, general browsing', ram: '16GB' },
  { user: 'Office / business professionals', ram: '16–32GB' },
  { user: 'Software developers (VMs, containers)', ram: '32GB' },
  { user: 'Video editors, 3D artists', ram: '32–64GB' },
  { user: 'Engineering / CAD workstations', ram: '64GB' },
  { user: 'Local AI model work', ram: '64GB+' },
];

const specTargetsTable = [
  { user: 'Student / general use', cpu: 'Core Ultra 5 / Ryzen 5 (U-series)', ram: '16GB', storage: '512GB TLC SSD', gpu: 'Integrated', priority: 'Battery life, weight, RAM' },
  { user: 'Office / business', cpu: 'Core Ultra 5 U', ram: '16GB', storage: '512GB TLC SSD', gpu: 'Integrated', priority: 'Battery life, portability' },
  { user: 'Software developer', cpu: 'Core Ultra 7 H / Ryzen 7 H', ram: '32GB', storage: '1TB SSD', gpu: 'Integrated or entry dedicated GPU', priority: 'RAM, sustained CPU, upgradeability' },
  { user: 'Gaming', cpu: 'Core i7/Ultra 7 H or HX', ram: '32GB', storage: '1TB SSD', gpu: 'RTX 4060 or better, check TGP', priority: 'GPU TGP, cooling, display refresh rate' },
  { user: 'Engineering / CAD / 3D', cpu: 'Ryzen 9 HX / Core Ultra 9 HX', ram: '64GB', storage: '2TB SSD', gpu: 'Workstation-class dedicated GPU', priority: 'Sustained CPU power, cooling, RAM' },
  { user: 'Video editing / creative', cpu: 'Core Ultra 7-9 H/HX', ram: '32–64GB', storage: '1–2TB TLC SSD', gpu: 'Mid-to-high dedicated GPU, 12GB+ VRAM', priority: 'GPU VRAM, storage speed, display color accuracy' },
  { user: 'Local AI / heavy compute', cpu: 'HX-series CPU', ram: '64GB+', storage: '2TB SSD', gpu: 'RTX 4080 or better, depending on model', priority: 'GPU VRAM, sustained cooling, RAM capacity' },
];

const checklist = [
  'CPU — suffix (U/V/P/H/HX) matches your actual workload, not just the tier number',
  "GPU — if applicable, confirm the TGP wattage, not just the model name",
  'RAM — capacity fits your use case; check DDR5/LPDDR5X/LPCAMM2 and upgradeability',
  'Storage — confirm NAND type (TLC vs. QLC) and PCIe generation, not just capacity',
  'Cooling — heat pipes vs. vapor chamber; check for thermal throttling in independent reviews',
  'Display — panel type, refresh rate, and brightness match your use (creative work, gaming, office)',
  'Battery — Wh capacity and USB-C PD support',
  'Ports — Thunderbolt/USB4, HDMI, SD card, Ethernet as needed',
  'Repairability — socketed vs. soldered RAM/storage; look up a teardown',
  "Warranty terms — coverage length and what's excluded",
  'Weight and build — matches how often and how far you\'ll actually carry it',
];

const commonMistakes = [
  { title: 'Buying the CPU tier and ignoring the suffix', detail: 'A "Core i7 U" can be slower under load than a "Core i5 H."' },
  { title: 'Pairing a powerful CPU with a QLC SSD and 8GB RAM', detail: 'The whole system feels sluggish despite the CPU spec.' },
  { title: 'Trusting the GPU name without checking TGP', detail: 'An RTX 4070 at 45W can lose to an RTX 4060 at 115W.' },
  { title: 'Buying a 4K/OLED display on a U-series CPU with integrated graphics', detail: 'The display can outpace the hardware driving it, causing stutter.' },
  { title: 'Ignoring cooling design entirely', detail: 'The same chip performs very differently depending on the chassis it\'s in.' },
  { title: 'Assuming higher storage capacity means higher performance', detail: 'A larger QLC drive can be slower than a smaller TLC one.' },
  { title: 'Not checking upgradeability before buying', detail: 'Soldered RAM and storage lock you into the day-one configuration permanently.' },
  { title: 'Buying an HX-series machine for basic tasks', detail: 'Heavy weight, short battery life, and a large charger, for no practical benefit.' },
  { title: 'Overlooking battery Wh capacity', detail: 'A beautiful spec sheet with a tiny battery means constantly hunting for a charger.' },
  { title: 'Skipping the teardown check', detail: "Buying without knowing what's actually replaceable later." },
];

const keyTakeaways = [
  'The tier number (i7, Ryzen 9) tells you far less than the suffix (U, H, HX) that follows it — match the suffix to your actual workload.',
  'RAM capacity matters, but so does generation (DDR4/DDR5/LPDDR5X) and whether it\'s upgradeable.',
  'SSD NAND type (TLC vs. QLC) affects real-world speed more than the storage capacity number alone.',
  "A GPU's model name doesn't tell you its actual power limit (TGP) — check the full spec sheet.",
  'Cooling design determines whether a laptop can sustain its rated performance or throttles under load.',
  'Repairability (socketed vs. soldered RAM/storage) determines how long a laptop stays cost-effective to own.',
  'Most components eventually fail from thermal cycling, not misuse — and many of those failures are repairable at the board level rather than requiring full replacement.',
];

/* ─────────────────────────────────────────────────────────────────────────────
   3. SMALL REUSABLE PIECES
───────────────────────────────────────────────────────────────────────────── */

function SectionHeading({ id, kicker, title, icon: Icon }: { id: string; kicker: string; title: string; icon: any }) {
  return (
    <div id={id} className="scroll-mt-24 mb-6 sm:mb-8">
      <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 px-3 py-1 text-[10px] sm:text-xs mb-3">
        <Icon className="w-3 h-3 mr-1.5 inline" /> {kicker}
      </Badge>
      <h2 className="text-xl sm:text-3xl font-bold text-white leading-tight">{title}</h2>
    </div>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">{children}</div>;
}

function BulletList({ items, color = 'text-cyan-400' }: { items: string[]; color?: string }) {
  return (
    <ul className="space-y-2 mt-4">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-2.5 text-slate-300 text-sm leading-relaxed">
          <CheckCircle2 className={`w-4 h-4 ${color} flex-shrink-0 mt-0.5`} />
          <span dangerouslySetInnerHTML={{ __html: item }} />
        </li>
      ))}
    </ul>
  );
}

function Callout({ children, tone = 'cyan' }: { children: React.ReactNode; tone?: 'cyan' | 'red' }) {
  const border = tone === 'cyan' ? 'border-cyan-500/30 bg-cyan-500/5' : 'border-red-500/30 bg-red-500/5';
  return (
    <div className={`rounded-xl border ${border} p-4 sm:p-5 flex gap-3`}>
      <Quote className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 flex-shrink-0 mt-1" />
      <div className="text-slate-200 text-xs sm:text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800 mt-4">
      <table className="w-full text-xs sm:text-sm text-left">
        <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wide text-[10px] sm:text-xs">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="px-3 sm:px-4 py-2.5 sm:py-3 font-semibold whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {rows.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 0 ? 'bg-slate-950/40' : 'bg-slate-900/40'}>
              {row.map((cell, ci) => (
                <td key={ci} className="px-3 sm:px-4 py-2.5 sm:py-3 text-slate-300 align-top">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   4. MAIN COMPONENT
───────────────────────────────────────────────────────────────────────────── */
export default function LaptopBuyingGuide() {
  return (
    <div className="min-h-screen bg-gray-950 text-white selection:bg-cyan-500/30">

      <Helmet>
        <title>Laptop Buying Guide Kuwait (2026): What the Spec Sheet Won't Tell You</title>
        <meta
          name="description"
          content="Confused by Intel, Ryzen and RTX naming in 2026? A Kuwait repair engineer explains which laptop specs actually matter — and which don't."
        />
        <link rel="canonical" href={PAGE_URL} />
      </Helmet>

      <SchemaMarkup schema={{ '@graph': PILLAR_SCHEMA }} />

      {/* Breadcrumb */}
      <div className="pt-20 sm:pt-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl text-xs sm:text-sm text-slate-400 flex items-center gap-2">
          <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-cyan-400 transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-slate-300">Laptop Buying Guide 2026</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-6 pb-8 sm:pb-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-emerald-500/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.1),transparent_50%)]"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-4 sm:space-y-6">
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold">
              <Laptop className="w-4 h-4 mr-2 inline" />
              2026 Buying Guide
            </Badge>
            <h1 className="text-3xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Laptop Buying Guide<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                Kuwait 2026
              </span>
            </h1>
            <p className="text-sm sm:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Confused by Intel, Ryzen and RTX naming? A Kuwait hardware repair engineer breaks down which specs
              actually matter — and which are just marketing.
            </p>
            <p className="text-xs sm:text-sm text-slate-500">
              ~23 min read · By Imran, Hardware Repair Engineer · Updated August 2026
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4 sm:pt-6">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-base sm:text-lg px-6 sm:px-8 py-6 shadow-lg shadow-cyan-500/30 w-full sm:w-auto"
                asChild
              >
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Ask Before You Buy
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 text-base sm:text-lg px-6 sm:px-8 py-6 w-full sm:w-auto"
                asChild
              >
                <a href={`tel:+${business.telephone}`}>
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Call: +{business.telephone}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="pb-8 sm:pb-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl space-y-4 sm:space-y-6 text-slate-300 text-sm sm:text-lg leading-relaxed">
          <p>
            A common situation we see in our Hawalli workshop is this: a customer arrives with a laptop bought
            only weeks earlier — an Intel Core i7 sticker on the lid, 16GB of RAM, a price well over 400 KD —
            and the same complaint every time: it slows to a crawl with a dozen Chrome tabs open, and the fans
            sound like it's about to take off.
          </p>
          <p>
            Nothing about that laptop was defective. It was doing exactly what its internal specifications
            allowed it to do — the problem was that the specifications never matched what he actually needed.
            He wasn't sold the wrong price bracket. He was sold the wrong architecture.
          </p>
          <p>
            That's the pattern we see constantly: a "Core i7" or "Ryzen 9" badge on the box, and almost no
            information about the one thing that actually determines how a laptop behaves under real use — the
            letters and numbers that come <em>after</em> the model name. A processor's power limit, a drive's
            NAND type, a memory chip's data rate, a GPU's wattage ceiling — these are the details that separate
            a laptop that stays fast for four years from one that struggles by month six.
          </p>
          <p>
            This guide exists because retail marketing isn't built to explain any of that. It's built to move
            inventory. Our job, as the people who spend our days opening these machines up and diagnosing
            exactly what failed and why, is to explain the part the sticker leaves out — before you spend the
            money, not after.
          </p>
          <p>
            We'll go component by component: CPU, RAM, storage, GPU, cooling, display, ports, battery, and
            repairability, then close with a buying checklist and the mistakes we see most often. Nothing here
            is a brand endorsement. It's what determines whether a laptop matches your workflow.
          </p>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="pb-8 sm:pb-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-xs sm:text-sm font-bold text-cyan-400 uppercase tracking-wide mb-3 sm:mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Table of Contents
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-300 hover:text-cyan-400 transition-colors py-1"
                  >
                    <ChevronRight className="w-3 h-3 flex-shrink-0 text-slate-600" />
                    {item.label}
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Understanding Modern Laptop Hardware */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 bg-slate-900/30 border-y border-slate-800">
        <div className="container mx-auto max-w-4xl">
          <SectionHeading id="understanding-hardware" kicker="The Basics" title="Understanding Modern Laptop Hardware" icon={Sparkles} />
          <Prose>
            <p>
              A laptop performs as a system, not as a collection of individually impressive parts. Every
              component depends on the others, and a weak link anywhere pulls the whole machine down to its
              level.
            </p>
            <p>A useful way to think about it:</p>
          </Prose>
          <BulletList
            items={[
              '<strong class="text-white">CPU</strong> — does the actual computing work.',
              '<strong class="text-white">RAM</strong> — the workspace the CPU uses while it works; too little, and the CPU keeps stopping to swap data in and out.',
              '<strong class="text-white">Storage (SSD)</strong> — where everything lives when it\'s not actively being used.',
              '<strong class="text-white">GPU</strong> — handles graphics-heavy and parallel workloads, from screen rendering to 3D and AI tasks.',
              '<strong class="text-white">Cooling system</strong> — determines how long the CPU and GPU can sustain their advertised performance before they\'re forced to slow down.',
              '<strong class="text-white">Motherboard</strong> — the wiring and power delivery that connects everything above.',
            ]}
          />
          <Prose>
            <p className="pt-4">
              A fast CPU paired with slow storage will feel sluggish during everyday use. A powerful GPU
              throttled by weak cooling will lose much of its advertised performance within minutes. Buying well
              means checking that these components are balanced for what you actually do with the machine — not
              buying the single most impressive-sounding part and assuming the rest follows.
            </p>
          </Prose>
        </div>
      </section>

      {/* Buying in Kuwait */}
      <section className="py-8 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <SectionHeading id="buying-in-kuwait" kicker="Local Context" title="Buying a Laptop in Kuwait: What Changes?" icon={MapPinned} />
          <Prose>
            <p>
              Most of what determines laptop performance is universal — a throttling GPU behaves the same way
              in Kuwait as anywhere else. But a handful of local factors are worth weighing specifically if
              you're buying here:
            </p>
          </Prose>
          <BulletList
            items={[
              '<strong class="text-white">Summer heat affects sustained performance.</strong> Ambient temperature directly reduces the thermal headroom available before a CPU or GPU throttles. During Kuwait\'s summer months, a laptop doing sustained heavy work in a warm room will hit its throttling point noticeably sooner than the same machine in an air-conditioned space. This matters more for H and HX-series machines than for U-series ones, since they generate far more heat to begin with.',
              '<strong class="text-white">Warranty coverage varies by import channel.</strong> Laptops sold through official regional distributors typically carry local warranty support; grey-market or personally imported units may only be covered under the manufacturer\'s home-country warranty, which can mean shipping the machine abroad for a covered repair.',
              '<strong class="text-white">Some retail configurations are quietly downgraded.</strong> The same model name can ship with different RAM or storage configurations depending on the region it was built for — check the actual spec sheet for the unit in front of you rather than assuming it matches international reviews of the "same" laptop.',
              '<strong class="text-white">Keyboard layout availability varies.</strong> Arabic/English bilingual keyboards are standard on many models sold locally, but not universal — worth checking if that\'s a requirement for you.',
              '<strong class="text-white">Replacement parts availability differs by brand.</strong> Some brands maintain better regional parts supply chains than others, which affects how quickly a screen, battery, or board-level repair can be completed if something needs fixing later.',
            ]}
            color="text-orange-400"
          />
          <Prose>
            <p className="pt-4">
              None of this changes which CPU suffix or GPU wattage is right for your workload — that logic is
              the same everywhere. It does change what to double-check before you commit to a specific unit.
            </p>
          </Prose>
        </div>
      </section>

      {/* Brands in Kuwait */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 bg-slate-900/30 border-y border-slate-800">
        <div className="container mx-auto max-w-4xl">
          <SectionHeading id="brands-in-kuwait" kicker="Brand Reality Check" title="Laptop Brands in Kuwait: What Actually Matters" icon={Wrench} />
          <Prose>
            <p>
              Brand alone is one of the least reliable predictors of how a laptop will perform or hold up —
              model design matters far more. A premium ThinkPad can be easier to service and maintain than a
              budget model from the same brand. A high-end ROG gaming laptop can have excellent cooling, while a
              thin, lightweight model from the same manufacturer prioritizes portability over sustained
              performance instead.
            </p>
            <p>Rather than choosing by brand reputation, evaluate the specific model in front of you:</p>
          </Prose>
          <BulletList
            items={[
              '<strong class="text-white">Exact model and configuration</strong> — the same model name can ship in several different internal configurations.',
              '<strong class="text-white">Motherboard and cooling design</strong> — this is what actually determines sustained performance, and it varies by model, not by brand.',
              '<strong class="text-white">Parts availability</strong> — how easily batteries, screens, and board-level components can be sourced locally if something needs repair later.',
              '<strong class="text-white">Warranty terms</strong> — coverage length and whether it\'s honored through a local distributor or requires shipping the unit abroad.',
            ]}
          />
          <Prose>
            <p className="pt-4">
              Brand can be a reasonable tie-breaker once you've narrowed down the specification you need — it
              shouldn't be the starting point.
            </p>
          </Prose>
        </div>
      </section>

      {/* Where to Buy */}
      <section className="py-8 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <SectionHeading id="where-to-buy" kicker="Purchase Channels" title="Where to Buy a Laptop in Kuwait" icon={Store} />
          <Prose>
            <p>
              Laptops in Kuwait generally come through three channels, and each carries different tradeoffs
              worth knowing before you commit to a purchase:
            </p>
          </Prose>
          <BulletList
            items={[
              '<strong class="text-white">Local retail (electronics chains and computer stores)</strong> — typically carries region-configured units with local warranty support and Arabic/English keyboard availability. Worth confirming the exact spec sheet of the physical unit rather than assuming it matches a review you\'ve read.',
              '<strong class="text-white">Regional online retailers</strong> — often carry a wider range of configurations than physical stores, generally still with local or regional warranty coverage, though delivery timelines and stock availability can vary.',
              '<strong class="text-white">Imported units (international online retailers, personal import)</strong> — can offer configurations or price points not available locally, but typically carry only the manufacturer\'s home-country warranty. Import also affects keyboard layout availability and, in some cases, power adapter compatibility.',
            ]}
          />
          <Prose>
            <p className="pt-4">
              None of this changes which specification is right for your workload — it changes what to verify
              about warranty coverage, exact configuration, and long-term parts support before you buy through a
              given channel.
            </p>
          </Prose>
        </div>
      </section>

      {/* CPU Guide */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 bg-slate-900/30 border-y border-slate-800">
        <div className="container mx-auto max-w-4xl">
          <SectionHeading id="cpu-guide" kicker="Component Deep Dive" title="CPU Guide" icon={Cpu} />
          <Prose>
            <p>
              Every laptop we take apart in the lab has the same story on the spec sheet and a different one on
              the board. Salespeople sell CPU generation and core count; what actually decides whether a laptop
              feels fast two years from now is the power envelope the manufacturer allowed that chip to run at.
            </p>

            <h3 className="text-white font-semibold text-base sm:text-lg pt-2">Intel Core Ultra</h3>
            <p>
              Intel's Core Ultra series restructured the chip around three types of cores and a dedicated AI
              processor. Performance cores (P-cores) handle demanding single-threaded work like compiling code
              or running a CAD tool. Efficiency cores (E-cores) handle background tasks — browser tabs, sync
              services, notifications — without pulling power from the performance cores. A third tier of
              low-power efficiency cores keeps idle tasks running on minimal power during light use.
            </p>

            <h3 className="text-white font-semibold text-base sm:text-lg pt-2">AMD Ryzen AI</h3>
            <p>
              AMD's Ryzen AI series follows a similar logic with its own core architecture (Zen cores paired
              with RDNA graphics) and its own dedicated AI accelerator. The practical differences between a
              given Ryzen AI chip and its Intel Core Ultra equivalent usually come down to graphics performance
              and efficiency curves at different power levels, rather than one brand being categorically faster
              than the other.
            </p>

            <h3 className="text-white font-semibold text-base sm:text-lg pt-2">What an NPU Actually Does</h3>
            <p>
              Both platforms now ship with a Neural Processing Unit (NPU) — a chip built specifically to run AI
              inference far more power-efficiently than asking the CPU or GPU to do the same work. An NPU isn't a
              general-purpose replacement for the CPU or GPU, so its presence alone won't make conventional
              gaming or video rendering faster — those workloads are still handled by the GPU and CPU, with the
              exact benefit depending on whether the specific software you're using has been built to route any
              part of its workload through the NPU. Its clearest, most consistent value today shows up in battery
              life during AI-assisted tasks (background blur and noise removal in video calls, on-device AI
              features in Windows) rather than in traditional benchmark scores.
            </p>

            <h3 className="text-white font-semibold text-base sm:text-lg pt-2">The Suffix Is the Real Spec</h3>
            <p>
              Two laptops can carry the same "Core Ultra 7" or "Ryzen 7" badge and perform completely
              differently under sustained load, because the badge only tells you the tier — not the power
              limit. The letter at the end of the model number tells the manufacturer how much power, and
              therefore how much sustained performance, that specific chip is allowed to draw.
            </p>
          </Prose>

          <DataTable
            headers={['Suffix', 'General Position', "What It's Built For", 'Fits Best']}
            rows={cpuSuffixTable.map((r) => [r.suffix, r.power, r.builtFor, r.fits])}
          />
          <Prose>
            <p className="pt-3 text-xs sm:text-sm text-slate-400">
              These suffixes are useful shorthand for a chip's general design intent — they are not a guaranteed
              sustained wattage. Actual power behavior varies by processor generation, and manufacturers
              configure sustained and boost power differently between models even within the same suffix
              class. The laptop's cooling capacity ultimately decides how much of that power budget the CPU can
              actually sustain in practice, which is why two "H-series" laptops can still perform quite
              differently under load.
            </p>
          </Prose>

          <div className="mt-5">
            <Prose>
              <p>
                <strong className="text-white">Why it matters in practice:</strong> an HX chip compiling a large
                codebase or rendering a 3D scene will generally outrun a same-tier U chip doing the identical
                task — not because it's a "better" chip, but because it's typically allowed to draw significantly
                more power to do it. The tradeoff is battery life and heat. A student buying an HX-series
                machine for note-taking will carry a heavy charger and get a few hours of battery for no
                benefit; an architect buying a U-series machine may find their rendering software stutters and
                their fans spin without much to show for it, because there's little power budget for the CPU to
                actually work with.
              </p>
            </Prose>
          </div>

          <div className="mt-5">
            <Callout>
              Match the suffix to the workload, not the number after "Core" or "Ryzen."
              {/* INTERNAL LINK PLACEHOLDER: Intel Core Ultra vs AMD Ryzen AI comparison — link here once
                  /blog/intel-core-ultra-vs-amd-ryzen-ai is published. Do not invent a URL. */}
              {' '}A dedicated Intel Core Ultra vs. AMD Ryzen AI comparison covering efficiency curves and
              integrated graphics is in progress — in the meantime, WhatsApp us the two models you're comparing
              for a direct answer now.
            </Callout>
          </div>
        </div>
      </section>

      {/* RAM Guide */}
      <section className="py-8 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <SectionHeading id="ram-guide" kicker="Component Deep Dive" title="RAM Guide" icon={MemoryStick} />
          <Prose>
            <p>
              RAM is the single most common upgrade request we get from customers who bought a laptop a year or
              two ago and now find it grinding under multiple browser tabs and a video call. RAM is the CPU's
              working memory — every open application, browser tab, and background process claims a share of
              it. When it runs out, the system starts swapping data to the (much slower) SSD, and everything
              feels sluggish even though the CPU itself is fine.
            </p>

            <h3 className="text-white font-semibold text-base sm:text-lg pt-2">Capacity</h3>
          </Prose>
          <BulletList
            items={[
              '<strong class="text-white">8GB</strong> — Windows and a modern browser alone can consume most of this before any other application opens. Fine for very light, single-task use; not recommended for general purpose use in 2026.',
              '<strong class="text-white">16GB</strong> — a reasonable baseline for office work, browsing, and light multitasking.',
              '<strong class="text-white">32GB</strong> — the practical minimum for running virtual machines, Docker containers, multiple large applications simultaneously, or working with large spreadsheets and datasets.',
              '<strong class="text-white">64GB+</strong> — needed for heavy video editing, 3D workflows, and local AI model work.',
            ]}
            color="text-emerald-400"
          />

          <Prose>
            <h3 className="text-white font-semibold text-base sm:text-lg pt-4">DDR4 vs. DDR5 vs. LPDDR5X</h3>
          </Prose>
          <BulletList
            items={[
              '<strong class="text-white">DDR4</strong> — the previous standard, typically around 3200 MT/s. Increasingly outdated for new purchases unless the price difference is significant.',
              '<strong class="text-white">DDR5</strong> — the current mainstream memory standard, typically 4800–5600 MT/s. Some laptops fit DDR5 in accessible, replaceable SO-DIMM slots; others solder DDR5 directly to the board. The generation name alone doesn\'t tell you which — check the specific model.',
              '<strong class="text-white">LPDDR5X</strong> — a low-power variant built for thin laptops, capable of much higher speeds (up to 8533 MT/s) at lower power draw. It is generally soldered directly to the motherboard, meaning what you buy is typically what you keep for the life of the machine.',
            ]}
            color="text-emerald-400"
          />
          <Prose>
            <p className="pt-3 text-xs sm:text-sm text-slate-400">
              The important buying lesson: memory generation does not determine upgradeability. "DDR5" tells you
              the technology; it doesn't tell you whether that specific laptop's memory is socketed or soldered.
              Check the exact model's memory implementation — a teardown or the manufacturer's own spec sheet
              will usually say — rather than assuming DDR5 means removable.
            </p>
          </Prose>

          <Prose>
            <h3 className="text-white font-semibold text-base sm:text-lg pt-4">Dual Channel, Bandwidth, and Latency</h3>
            <p>
              Memory bandwidth (how much data can move per second) depends on both frequency (MT/s) and channel
              configuration. On conventional dual-channel laptop memory, using two matched modules can roughly
              double theoretical memory bandwidth compared with a single module of the same total capacity —
              which is a large part of why a single 16GB stick can underperform two 8GB sticks in
              memory-intensive tasks, despite identical total capacity. This mainly describes conventional
              multi-channel SO-DIMM configurations; soldered LPDDR implementations are wired differently by the
              manufacturer, so the actual channel configuration and resulting bandwidth depend on that specific
              design rather than following the same SO-DIMM logic. Latency matters more for responsiveness in
              everyday tasks than for large sequential workloads like video export, where raw bandwidth
              dominates.
            </p>

            <h3 className="text-white font-semibold text-base sm:text-lg pt-4">LPCAMM2: The Upgradeability Fix</h3>
            <p>
              LPCAMM2 is a newer memory module standard that delivers LPDDR5X-class speed and power efficiency
              in a form factor that's still removable and upgradeable — something that hasn't previously been
              possible with LPDDR5X. It's currently limited to a small number of premium models, but it directly
              addresses the long-standing tradeoff between "fast and soldered" or "upgradeable and slower." If
              you're buying a premium machine you intend to keep for years, it's worth checking whether the
              model supports LPCAMM2.
            </p>
          </Prose>

          <h3 className="text-white font-semibold text-base sm:text-lg pt-6 mb-1">Capacity by Use Case</h3>
          <DataTable headers={['User', 'Recommended RAM']} rows={ramUseCaseTable.map((r) => [r.user, r.ram])} />
        </div>
      </section>

      {/* Storage Guide */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 bg-slate-900/30 border-y border-slate-800">
        <div className="container mx-auto max-w-4xl">
          <SectionHeading id="storage-guide" kicker="Component Deep Dive" title="Storage Guide" icon={HardDrive} />
          <Prose>
            <p>
              Almost every modern mainstream laptop now uses NVMe SSDs over PCIe lanes, though some budget or
              older models still ship with slower SATA-based storage — mechanical hard drives, meanwhile, are
              effectively gone from the laptop market entirely. But "SSD" covers a wide performance range, and
              two drives with the same advertised capacity can behave very differently.
            </p>

            <h3 className="text-white font-semibold text-base sm:text-lg pt-2">PCIe Generations</h3>
          </Prose>
          <BulletList
            items={[
              '<strong class="text-white">PCIe Gen3</strong> — up to roughly 3,500 MB/s. Adequate for general use, increasingly dated.',
              '<strong class="text-white">PCIe Gen4</strong> — the current mainstream standard, up to roughly 7,500 MB/s.',
              '<strong class="text-white">PCIe Gen5</strong> — up to roughly 10,000+ MB/s, found in premium workstation-class laptops. These drives run hot and typically need better cooling than thin chassis provide.',
            ]}
            color="text-purple-400"
          />
          <Prose>
            <p className="pt-4">
              Sequential speed (large file transfers) is what these numbers describe. Random read/write
              performance — how quickly a drive handles many small file operations, which is most of what
              actually happens during everyday OS and application use — depends more on the drive's controller
              and NAND type than on the PCIe generation alone.
            </p>
            <h3 className="text-white font-semibold text-base sm:text-lg pt-2">TLC vs. QLC: The Detail Retailers Skip</h3>
            <p>
              This is one of the places where two drives with identical advertised capacity can diverge sharply
              — though how much they diverge, in practice, depends on more than just the NAND type.
            </p>
          </Prose>
          <BulletList
            items={[
              '<strong class="text-white">TLC (Triple-Level Cell) NAND</strong> — generally faster and more durable than QLC, and tends to hold its speed better as the drive fills up.',
              '<strong class="text-white">QLC (Quad-Level Cell) NAND</strong> — cheaper to produce, and relies on a fast SLC cache to mask its underlying speed. Once that cache is exhausted during a large, sustained file transfer, write speeds can drop noticeably — and QLC drives generally carry a lower total-data-written (TBW) endurance rating than TLC.',
            ]}
            color="text-purple-400"
          />
          <Prose>
            <p className="pt-3 text-xs sm:text-sm text-slate-400">
              Real-world SSD performance isn't determined by NAND type alone — the controller, DRAM/cache design,
              SLC cache size, drive capacity, thermal conditions, firmware, and how full the drive already is all
              factor in. Two TLC drives from different manufacturers can perform quite differently, and a
              well-engineered QLC drive can still outperform a poorly designed TLC one on paper specs alone. The
              practical buying lesson holds regardless: the specific SSD model matters more than the advertised
              storage capacity number.
            </p>
          </Prose>
          <div className="mt-5">
            <Callout>
              <strong className="text-white">Buying tip:</strong> a well-specified 1TB TLC drive with dedicated
              DRAM cache can outperform a larger 2TB QLC drive in real editing and file-transfer workloads,
              despite the smaller number on the box — though the exact gap depends on the specific drives being
              compared. The drive's model number — not the storage figure alone — is what determines real-world
              speed.
              {/* INTERNAL LINK PLACEHOLDER: TLC vs QLC SSD article — link here once
                  /blog/tlc-vs-qlc-ssd is published. Do not invent a URL. */}
              {' '}WhatsApp us the two drive models you're comparing and we'll give you a direct read on which is
              the better buy.
            </Callout>
          </div>
        </div>
      </section>


      {/* GPU Guide */}
      <section className="py-8 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <SectionHeading id="gpu-guide" kicker="Component Deep Dive" title="GPU Guide" icon={Gauge} />
          <Prose>
            <h3 className="text-white font-semibold text-base sm:text-lg">Integrated vs. Dedicated Graphics</h3>
            <p>
              Modern integrated GPUs (Intel Arc, AMD Radeon, and Apple's integrated GPU architecture within its
              M-series chips) share system RAM and handle general use, video playback, coding, and light gaming
              comfortably. For 3D rendering, heavier gaming, or GPU-accelerated creative work, a dedicated GPU
              with its own VRAM becomes necessary.
            </p>

            <h3 className="text-white font-semibold text-base sm:text-lg pt-2">The Current GPU Landscape</h3>
            <p>
              NVIDIA's laptop GPU lineup includes RTX 40-series models (4050 through 4090) and the newer RTX
              50-series generation, built on the Blackwell architecture — availability of specific RTX 50-series
              models in laptops depends on market and manufacturer rollout timing, so confirm what's actually
              shipping locally rather than assuming full-lineup availability. AMD's Radeon RX mobile GPUs
              compete across a similar range. Higher-tier models generally offer greater GPU resources and
              performance potential, but VRAM capacity and power limits vary by specific model and laptop
              configuration — as with CPUs, the model number alone doesn't tell you what a given laptop actually
              delivers.
            </p>
            <p>
              <strong className="text-white">DLSS (NVIDIA) and FSR (AMD)</strong> are AI upscaling technologies
              that render a game at a lower internal resolution and reconstruct it to the target resolution,
              substantially boosting frame rates with a comparatively small visual quality tradeoff.{' '}
              <strong className="text-white">Frame Generation</strong>, available on newer DLSS versions, goes
              further by inserting AI-generated frames between rendered ones to raise perceived frame rate —
              useful for smoothness, though it doesn't reduce actual input latency the way a genuinely higher
              frame rate does. <strong className="text-white">Ray tracing</strong> simulates realistic light
              behavior and is far more demanding than traditional rasterized rendering, which is part of why
              upscaling technologies exist alongside it.
            </p>

            <h3 className="text-white font-semibold text-base sm:text-lg pt-2">
              TGP: Why the Same GPU Chip Performs Differently in Different Laptops
            </h3>
            <p>
              <strong className="text-white">Total Graphics Power (TGP)</strong> is the wattage a laptop's
              motherboard is actually allowed to feed the GPU — and it's one of the most overlooked specs in
              laptop marketing. The same GPU model can be configured across a fairly wide wattage range
              depending on the laptop's cooling and power delivery design.
            </p>
          </Prose>

          <div className="mt-5">
            <Callout>
              <strong className="text-white">Example:</strong> a low-power RTX 4070 configuration (say, capped
              around 45W in a thin chassis) can sometimes perform surprisingly close to, or even be challenged
              by, a substantially higher-power RTX 4060 configuration (for example, 115W in a laptop with more
              robust cooling) — the actual gap depends heavily on each laptop's specific power and cooling
              implementation. The chip name on the box tells you the architecture; it doesn't tell you the power
              budget it's actually running on. Always check the manufacturer's full specification sheet for the
              exact TGP figure — it's usually listed in small print, separate from the headline GPU name.
            </Callout>
          </div>

          <Prose>
            <p className="pt-5">
              VRAM capacity (8GB, 12GB, 16GB) matters separately from TGP — it determines whether a GPU can hold
              larger textures, higher-resolution assets, or bigger AI models in memory at once, independent of
              how fast it can process them.
              {/* INTERNAL LINK PLACEHOLDER: RTX laptop GPU TGP explainer — link here once
                  /blog/laptop-gpu-tgp-explained is published. Do not invent a URL. */}
              {' '}Send us the exact model on WhatsApp and we'll tell you the real-world TGP to expect before you
              buy.
            </p>
          </Prose>
        </div>
      </section>

      {/* Cooling */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 bg-slate-900/30 border-y border-slate-800">
        <div className="container mx-auto max-w-4xl">
          <SectionHeading id="cooling" kicker="Component Deep Dive" title="Cooling" icon={Thermometer} />
          <Prose>
            <p>
              Cooling is the part of a laptop's design that receives the least marketing attention and has the
              largest long-term impact on both performance and hardware lifespan.
            </p>
            <p>
              When a CPU or GPU reaches its maximum safe operating temperature (typically 95–100°C), the system
              enforces <strong className="text-white">thermal throttling</strong> — deliberately reducing power
              and clock speed to prevent damage. This shows up as sudden frame drops, stutters, and slowdowns
              under sustained load, regardless of how capable the chip is on paper. A mid-tier processor in a
              well-cooled chassis will frequently outperform a flagship processor throttling in a poorly cooled
              one.
            </p>
            <h3 className="text-white font-semibold text-base sm:text-lg pt-2">Cooling Technologies</h3>
          </Prose>
          <BulletList
            items={[
              '<strong class="text-white">Heat pipes</strong> — copper tubes that carry heat away from the chip to the fans; the standard cooling method across most laptops.',
              '<strong class="text-white">Vapor chambers</strong> — sealed plates containing a fluid that vaporizes and condenses to move heat far more efficiently than heat pipes alone; typically found in premium and workstation-class laptops.',
              '<strong class="text-white">Thermal paste vs. liquid metal</strong> — the interface material between the chip and the cooler. Standard paste is reliable but degrades over several years. Liquid metal offers substantially better thermal conductivity but requires precise factory application, since it\'s electrically conductive and risky to apply incorrectly.',
            ]}
            color="text-red-400"
          />

          <Prose>
            <h3 className="text-white font-semibold text-base sm:text-lg pt-4">Dust, Airflow, and Kuwait's Climate</h3>
            <p>
              Dust buildup inside intake vents and over heatsink fins is one of the most common — and most
              preventable — causes of rising temperatures over a laptop's life. It's worth having the internals
              cleaned periodically, particularly in dusty environments.
            </p>
            <p>
              Ambient temperature directly affects available thermal headroom: a laptop under sustained load in
              a warm room will hit its throttling point faster than the same machine in an air-conditioned
              space. In Kuwait's summer climate, this isn't a marginal effect — it's a real factor in sustained
              performance, particularly for higher-wattage H and HX-series machines doing rendering, compiling,
              or gaming for extended sessions. Keeping the laptop on a hard, well-ventilated surface (not a bed
              or soft cushion, which blocks intake vents) and running it in cooled rooms during heavy workloads
              meaningfully extends both performance consistency and component lifespan.
            </p>
          </Prose>

          <div className="mt-5">
            <Callout tone="red">
              <strong className="text-white">Laptop overheating in Kuwait?</strong> Before replacing a machine
              over heat issues, a professional thermal diagnosis can identify whether the cause is dust buildup,
              degraded thermal paste, a failing fan, or a deeper motherboard-level problem — each has a
              different fix and a different cost.{' '}
              <Link to="/laptop-repair-kuwait" className="text-cyan-400 underline hover:text-cyan-300">
                Request a free laptop diagnosis →
              </Link>
            </Callout>
          </div>
        </div>
      </section>

      {/* Display */}
      <section className="py-8 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <SectionHeading id="display" kicker="Component Deep Dive" title="Display" icon={Monitor} />
          <BulletList
            items={[
              '<strong class="text-white">IPS (In-Plane Switching)</strong> — the current standard for color accuracy and viewing angles, with no burn-in risk.',
              '<strong class="text-white">OLED</strong> — true blacks and very high contrast through per-pixel illumination; excellent for content consumption and creative color work, though most OLED panels are glossy and more reflective under bright light.',
              '<strong class="text-white">Mini LED</strong> — combines IPS\'s brightness with localized backlight dimming zones to approach OLED-level contrast, common in premium creator and gaming laptops.',
              '<strong class="text-white">Refresh rate</strong> — 60Hz is standard for general use; 120Hz–240Hz panels produce noticeably smoother motion and are relevant mainly for gaming and fast-scrolling workflows.',
              '<strong class="text-white">Color accuracy and brightness</strong> — look for stated coverage of the sRGB or DCI-P3 color gamut and peak brightness in nits, relevant for outdoor or high-glare use.',
              '<strong class="text-white">PWM (Pulse Width Modulation)</strong> — the method some panels use to control brightness by rapidly flickering the backlight. At low brightness settings, low-frequency PWM can cause eye strain for sensitive users.',
            ]}
            color="text-blue-400"
          />
        </div>
      </section>

      {/* Ports */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 bg-slate-900/30 border-y border-slate-800">
        <div className="container mx-auto max-w-4xl">
          <SectionHeading id="ports" kicker="Component Deep Dive" title="Ports" icon={Usb} />
          <BulletList
            items={[
              '<strong class="text-white">Thunderbolt / USB4</strong> — high-bandwidth ports that support fast external storage, high-resolution external displays, and (on some models) external GPU enclosures, all through a single cable.',
              '<strong class="text-white">USB-C (non-Thunderbolt)</strong> — physically identical but with lower data and power capabilities; check the spec sheet rather than assuming every USB-C port behaves the same.',
              '<strong class="text-white">HDMI</strong> — standard for connecting to external displays and TVs without an adapter.',
              '<strong class="text-white">SD card reader</strong> — a meaningful convenience for photographers and videographers working directly from camera media.',
              '<strong class="text-white">Ethernet</strong> — increasingly omitted from thin laptops in favor of Wi-Fi, but still relevant for anyone needing a stable wired connection for large file transfers or unreliable Wi-Fi environments.',
            ]}
            color="text-cyan-400"
          />
        </div>
      </section>

      {/* Battery */}
      <section className="py-8 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <SectionHeading id="battery" kicker="Component Deep Dive" title="Battery" icon={Battery} />
          <BulletList
            items={[
              '<strong class="text-white">Capacity (Wh)</strong> — measured in watt-hours; commercial flights cap carry-on laptop batteries at 99.9Wh. Budget laptops may sit around 45Wh, while premium machines often reach 80–99Wh.',
              '<strong class="text-white">Fast charging and USB-C PD</strong> — laptops supporting USB-C Power Delivery can charge from universal high-wattage chargers rather than requiring a proprietary brick, a genuine convenience for travel.',
              '<strong class="text-white">Battery cycles</strong> — a full charge-discharge cycle gradually reduces maximum capacity over time; most modern laptop batteries are rated for several hundred to around a thousand cycles before capacity noticeably degrades.',
              '<strong class="text-white">Heat damage</strong> — heat is the primary accelerant of battery degradation. Running sustained heavy workloads while the laptop rests on a soft surface that blocks ventilation is one of the most common causes of premature battery wear.',
              '<strong class="text-white">Swelling</strong> — a swollen battery is a safety issue, not a cosmetic one. If the trackpad lifts, the chassis bulges, or the laptop no longer sits flat, the battery should be inspected and replaced rather than left in use.',
            ]}
            color="text-emerald-400"
          />
          <div className="mt-5">
            <Callout>
              Noticing your battery swelling, draining fast, or not holding a charge?{' '}
              <Link to="/battery-replacement-kuwait" className="text-cyan-400 underline hover:text-cyan-300">
                See our battery replacement service →
              </Link>
            </Callout>
          </div>
        </div>
      </section>

      {/* Wireless */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 bg-slate-900/30 border-y border-slate-800">
        <div className="container mx-auto max-w-4xl">
          <SectionHeading id="wireless" kicker="Component Deep Dive" title="Wireless Connectivity" icon={Wifi} />
          <BulletList
            items={[
              '<strong class="text-white">Wi-Fi 7</strong> — the newest mainstream wireless standard appearing in premium laptops, offering higher throughput and lower latency than Wi-Fi 6/6E, with the most benefit realized on networks and routers that also support it. Wi-Fi 6E remains common and perfectly capable on mid-range models.',
              '<strong class="text-white">Bluetooth</strong> — current laptops typically ship with Bluetooth 5.3 or newer, sufficient for peripherals, audio devices, and accessories.',
              '<strong class="text-white">Future-proofing</strong> — wireless standards typically remain relevant for five or more years after release, making Wi-Fi generation a reasonable factor to weigh if you plan to keep the laptop long-term, though a less critical one than CPU, RAM, or cooling.',
            ]}
            color="text-purple-400"
          />
        </div>
      </section>

      {/* Repairability */}
      <section className="py-8 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <SectionHeading id="repairability" kicker="Long-Term Ownership" title="Repairability" icon={Hammer} />
          <Prose>
            <p>
              How a laptop is built internally has a direct effect on how long it stays useful — and how
              expensive it is to keep running when something eventually needs replacing.
            </p>
          </Prose>
          <BulletList
            items={[
              '<strong class="text-white">Replaceable SSD</strong> — a laptop with a socketed (not soldered) M.2 SSD, ideally with a second empty slot, allows storage upgrades later without replacing the whole machine.',
              '<strong class="text-white">Replaceable RAM</strong> — SO-DIMM or LPCAMM2 memory can be upgraded as your needs grow; soldered memory is fixed permanently at the configuration you bought.',
              '<strong class="text-white">Soldered components generally</strong> — convenient for making laptops thinner and lighter, but they mean a single component failure (or simply outgrowing the original spec) can force a full replacement rather than a targeted repair or upgrade.',
              '<strong class="text-white">Repair costs and long-term ownership</strong> — a laptop that can be opened, cleaned, and have individual components serviced or upgraded will typically cost less to keep running over 4–6 years than a fully sealed, all-soldered design, even if the sealed design was cheaper or lighter at purchase.',
            ]}
            color="text-orange-400"
          />
          <Prose>
            <p className="pt-4">
              Before buying, it's worth searching for a teardown of the specific model — many reviewers document
              exactly what's socketed versus soldered, which the spec sheet won't tell you.
            </p>

            <h3 className="text-white font-semibold text-base sm:text-lg pt-4">
              Board-Level Repair vs. Motherboard Replacement
            </h3>
            <p>
              A failed motherboard doesn't automatically mean the laptop is beyond repair. Some faults occur at
              component level — a single capacitor, MOSFET, or charging IC — and can be diagnosed and repaired
              on the original board without touching anything else. Other failures are more extensive, or affect
              a part of the board that genuinely can't be serviced in isolation, and do require board
              replacement. Which category a given fault falls into depends on the specific design of that
              motherboard, the nature of the fault itself, parts and schematic availability, and the diagnosing
              technician's tooling and experience — it isn't something you can determine from the symptom alone,
              which is why diagnosis has to come before a repair-or-replace decision, not after.
            </p>
          </Prose>

          <div className="mt-5 space-y-4">
            <Callout>
              <strong className="text-white">Hardware Engineer Note:</strong> The failures we see most often on
              the bench aren't tied to any single brand — they tend to repeat across categories: thermal
              throttling from dust buildup, charging-circuit faults, battery swelling, SSD failures, and damaged
              power rails from repeated heat cycling. The original specification matters, but maintenance habits
              and repairability are what actually determine total ownership cost over several years.
            </Callout>
            <Callout tone="red">
              <strong className="text-white">Laptop stopped charging?</strong> A dead motherboard doesn't always
              mean replacement. Component-level diagnosis can identify the exact failed circuit — often a single
              capacitor, MOSFET, or charging IC — rather than defaulting to a full board swap, though a genuine
              board replacement is sometimes the right call once diagnosis confirms it.{' '}
              <Link to="/motherboard-repair-kuwait" className="text-cyan-400 underline hover:text-cyan-300">
                Request a free laptop diagnosis →
              </Link>
            </Callout>
          </div>
        </div>
      </section>

      {/* Spec Targets by User Type */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 bg-slate-900/30 border-y border-slate-800">
        <div className="container mx-auto max-w-6xl">
          <SectionHeading id="spec-targets" kicker="Quick Reference" title="Specification Targets by User Type" icon={ListChecks} />
          <Prose>
            <p>
              Everything above explains <em>why</em> a spec matters. This table translates that into a starting
              point by use case — treat it as a baseline to adjust from, not a rigid rule:
            </p>
          </Prose>
          <DataTable
            headers={['User', 'CPU', 'RAM', 'Storage', 'GPU', 'What to Check First']}
            rows={specTargetsTable.map((r) => [r.user, r.cpu, r.ram, r.storage, r.gpu, r.priority])}
          />
        </div>
      </section>

      {/* Checklist Section */}
      <section id="checklist" className="scroll-mt-24 py-8 sm:py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 sm:mb-16">
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-sm mb-3 sm:mb-4">
              <ListChecks className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 inline" /> Before You Checkout
            </Badge>
            <h2 className="text-2xl sm:text-5xl font-bold text-white mb-3 sm:mb-6">
              The Pre-Purchase Checklist
            </h2>
            <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto">Use this as a final pass before purchasing.</p>
          </div>

          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-8">
              <ul className="space-y-3 sm:space-y-4">
                {checklist.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-slate-200 text-sm sm:text-base">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Common Buying Mistakes */}
      <section id="mistakes" className="scroll-mt-24 py-8 sm:py-16 px-4 sm:px-6 bg-slate-900/30 border-y border-slate-800">
        <div className="container mx-auto max-w-4xl">
          <SectionHeading id="mistakes-inner" kicker="Learn From Others" title="Common Buying Mistakes" icon={AlertTriangle} />
          <div className="space-y-3 sm:space-y-4">
            {commonMistakes.map((m, i) => (
              <Card key={i} className="bg-slate-950/40 border-slate-800">
                <CardContent className="p-4 sm:p-5 flex gap-3 sm:gap-4 items-start">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-red-500/15 text-red-400 text-xs sm:text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm sm:text-base">{m.title}</p>
                    <p className="text-slate-400 text-xs sm:text-sm mt-1 leading-relaxed">{m.detail}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section (mirrors FAQPage schema exactly) */}
      <section id="faq" className="scroll-mt-24 py-8 sm:py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-5xl font-bold text-white mb-3 sm:mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-xl text-slate-300 max-w-3xl mx-auto">
              Everything readers ask us before buying — and after, when something goes wrong.
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {faq.map((item, index) => (
              <Card key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700 backdrop-blur-sm">
                <CardContent className="p-4 sm:p-8">
                  <h3 className="text-sm sm:text-lg font-bold text-white mb-2 sm:mb-3 flex items-start gap-2 sm:gap-3">
                    <span className="text-cyan-400 flex-shrink-0">Q:</span>
                    {item.q}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-base leading-relaxed pl-5 sm:pl-7">
                    <span className="text-emerald-400 font-semibold">A:</span> {item.a}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* When Your Laptop Starts Failing */}
      <section id="when-it-fails" className="scroll-mt-24 py-8 sm:py-16 px-4 sm:px-6 bg-slate-900/30 border-y border-slate-800">
        <div className="container mx-auto max-w-4xl">
          <SectionHeading id="when-it-fails-inner" kicker="From Buying to Repair" title="When Your Laptop Starts Failing" icon={Wrench} />
          <Prose>
            <p>
              Every laptop, regardless of how carefully it was specified at purchase, is eventually subject to
              the same physical process: <strong className="text-white">thermal cycling</strong>. As a laptop
              heats up under load and cools down when powered off, the logic board physically expands and
              contracts by tiny amounts. Repeated over months and years, this cycling gradually stresses the
              solder joints connecting components to the board — the charging circuitry, voltage regulators,
              capacitors, and connectors that keep the system running.
            </p>
            <p>
              Eventually, one of these joints can crack, or a component like a capacitor or MOSFET can fail
              outright. The symptoms are familiar to anyone who's experienced them: the laptop won't power on,
              stops charging, shuts down randomly under load, or a port stops working.
            </p>
            <p>
              The standard manufacturer response to a motherboard-level fault is usually to replace the entire
              board — which is expensive, and which, on machines with soldered storage, means losing the data on
              the original SSD along with the fault.
            </p>
            <p>
              Component-level repair works differently. By tracing the board's schematics, testing individual
              circuits, and using thermal imaging to isolate exactly which capacitor, MOSFET, or IC failed, it's
              possible to identify and replace only the specific faulty component under magnification, rather
              than discarding the entire board. Done correctly, this approach fixes the actual point of failure,
              and because the original board — including a soldered SSD, where applicable — remains otherwise
              intact, the user's existing data and operating system are typically preserved through the repair
              rather than lost with it.
            </p>
            <p>
              This is the work we do at KCROC:{' '}
              <Link to="/motherboard-repair-kuwait" className="text-cyan-400 underline hover:text-cyan-300">
                component-level diagnostics and micro-soldering repair
              </Link>{' '}
              for laptop and{' '}
              <Link to="/macbook-repair-kuwait" className="text-cyan-400 underline hover:text-cyan-300">
                MacBook logic boards
              </Link>
              , rather than defaulting to full-board replacement. Before replacing a laptop over a motherboard
              fault, it's worth letting a technician diagnose which specific component actually failed — the fix
              is often narrower, and cheaper, than a full board swap. If your laptop is showing signs of a
              board-level fault — failing to charge, random shutdowns, no power, or a{' '}
              <Link to="/battery-replacement-kuwait" className="text-cyan-400 underline hover:text-cyan-300">
                swollen battery
              </Link>{' '}
              — it's worth having it assessed before assuming it's beyond repair. We offer free pick & drop
              across all governorates in Kuwait, and you can reach us by phone or WhatsApp at {business.telephone}.
            </p>
          </Prose>
          <div className="mt-6">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
              asChild
            >
              <a href={WA_DIAGNOSIS_LINK} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2" />
                Request Free Laptop Diagnosis
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Key Takeaways */}
      <section className="py-8 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">Key Takeaways</h2>
          <BulletList items={keyTakeaways} />
        </div>
      </section>

      {/* Author Box */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 bg-slate-900/30 border-y border-slate-800">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-slate-950/40 border-slate-800">
            <CardContent className="p-5 sm:p-8 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xl sm:text-2xl font-bold text-white flex-shrink-0">
                I
              </div>
              <div>
                <h3 className="text-white font-bold text-lg sm:text-xl">Written by Imran</h3>
                <p className="text-cyan-400 text-xs sm:text-sm mb-2 sm:mb-3">
                  Hardware Repair Engineer, Kuwait Computer Repair On Call (KCROC)
                </p>
                <p className="text-slate-400 text-xs sm:text-sm mb-3">Specializing in:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 mb-3">
                  {[
                    'Laptop motherboard diagnostics',
                    'MacBook logic board repair',
                    'Component-level micro-soldering',
                    'Gaming laptop thermal troubleshooting',
                  ].map((s, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-300 text-xs sm:text-sm">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" /> {s}
                    </li>
                  ))}
                </ul>
                <p className="text-slate-500 text-xs sm:text-sm flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> Based in Hawalli, Kuwait
                </p>
                <p className="text-slate-600 text-[11px] sm:text-xs mt-3">
                  Technical Review: KCROC Hardware Diagnostics Team · Last Updated: August 2026
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <Card className="bg-gradient-to-br from-cyan-600/20 via-blue-600/20 to-emerald-600/20 border-cyan-500/30 backdrop-blur-sm">
            <CardContent className="p-6 sm:p-12 text-center">
              <h2 className="text-2xl sm:text-5xl font-bold text-white mb-3 sm:mb-6 leading-tight">
                Already Bought the Wrong One?
              </h2>
              <p className="text-xs sm:text-xl text-slate-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
                Overheating, throttling, or a laptop that just won't turn on? We diagnose and repair every major
                brand — free pickup and delivery across all Kuwait governorates.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-sm sm:text-lg px-6 sm:px-8 py-5 sm:py-6 shadow-lg shadow-cyan-500/30 w-full sm:w-auto"
                  asChild
                >
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Book Free Pickup
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-600 text-white hover:bg-slate-800 hover:text-white text-sm sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full sm:w-auto"
                  asChild
                >
                  <a href={`tel:+${business.telephone}`}>
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Call: +{business.telephone}
                  </a>
                </Button>
              </div>
              <div className="mt-6 sm:mt-10 pt-6 sm:pt-8 border-t border-cyan-500/20 flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-300">
                <span className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" /> {business.streetAddress}
                </span>
                <span className="flex items-center gap-2">
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" /> 30-Day Warranty
                </span>
                <span className="flex items-center gap-2">
                  <Wrench className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" /> No Fix, No Fee
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
