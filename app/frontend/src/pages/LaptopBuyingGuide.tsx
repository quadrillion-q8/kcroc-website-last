// File: app/frontend/src/pages/LaptopBuyingGuide.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Cpu, MemoryStick, HardDrive, Gauge, Thermometer, Battery,
  Phone, MessageCircle, Shield, CheckCircle2, MapPin, Wrench,
  Laptop, Sparkles, ListChecks
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
const PUBLISHED_DATE = '2026-08-07';

const WA_LINK = `https://wa.me/${business.telephone}?text=${encodeURIComponent(
  'Hi KCROC, I read your Laptop Buying Guide and would like some advice before I buy. Can you help?'
)}`;

// PILLAR_SCHEMA: Article, FAQPage, BreadcrumbList, Person
const PILLAR_SCHEMA = [
  {
    '@context': 'https://schema.org',
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
    '@context': 'https://schema.org',
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
      { '@type': 'Question', name: 'Is it worth buying a laptop with soldered RAM if the price is lower?', acceptedAnswer: { '@type': 'Answer', text: 'It depends on how long you plan to keep it. A soldered configuration locks in your day-one specs permanently; if your needs are likely to grow, upgradeable RAM protects that investment.' } },
      { '@type': 'Question', name: 'What causes a laptop to stop charging or shut down randomly?', acceptedAnswer: { '@type': 'Answer', text: 'Often a failure at the component level on the motherboard — a damaged charging IC, a failed capacitor, or a cracked solder joint from repeated heating and cooling — rather than a fault with the battery or charger itself.' } },
      { '@type': 'Question', name: 'Is it better to repair or replace a laptop with a dead motherboard?', acceptedAnswer: { '@type': 'Answer', text: 'It depends on the specific fault. Many motherboard failures are isolated to a single component and can be repaired at the board level, which is often significantly cheaper than a full replacement and preserves data stored on a soldered SSD.' } },
      { '@type': 'Question', name: 'How often should I clean the inside of my laptop?', acceptedAnswer: { '@type': 'Answer', text: "There's no fixed interval, but if fan noise increases or temperatures rise noticeably during normal use, dust buildup on the cooling system is a common and preventable cause." } },
      { '@type': 'Question', name: 'Is buying a gaming laptop in Kuwait riskier because of the heat?', acceptedAnswer: { '@type': 'Answer', text: "Not riskier, but heat-sensitive. A gaming laptop's cooling design (heat pipes vs. vapor chamber) and your usage environment (a well-ventilated, air-conditioned space) matter more here than in cooler climates. Regular internal cleaning also becomes more important given local dust conditions." } },
      { '@type': 'Question', name: 'Should I buy a laptop with soldered RAM?', acceptedAnswer: { '@type': 'Answer', text: "It depends on how long you plan to keep the machine and whether your workload is likely to grow. Soldered RAM locks in your day-one configuration permanently; if you're buying for a fixed, well-defined use case, it's a reasonable tradeoff for thinner, lighter designs." } },
      { '@type': 'Question', name: 'Which laptop brands are easiest to repair?', acceptedAnswer: { '@type': 'Answer', text: 'This varies by model as much as by brand — some manufacturers use standardized, socketed components across a line, while others solder heavily even in higher-end models. A pre-purchase teardown search for the specific model is more reliable than a brand-wide assumption.' } },
      { '@type': 'Question', name: 'How long should a good laptop realistically last?', acceptedAnswer: { '@type': 'Answer', text: 'With reasonable care — clean airflow, avoiding sustained heat exposure, and moderate charging habits — a well-specified laptop can remain useful for 4–6 years before its performance or battery life becomes a genuine limitation for its original purpose.' } },
      { '@type': 'Question', name: 'Can motherboard damage actually be repaired, or does it always mean replacement?', acceptedAnswer: { '@type': 'Answer', text: 'Many motherboard faults are isolated to a single failed component — a capacitor, MOSFET, or charging IC — and can be repaired at the board level rather than requiring a full replacement. Whether repair is possible depends on the specific fault, which is why diagnosis should come before a replace-or-repair decision, not after.' } },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: business.websiteUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${business.websiteUrl}/blog` },
      { '@type': 'ListItem', position: 3, name: 'Laptop Buying Guide Kuwait 2026', item: PAGE_URL },
    ],
  },
  {
    '@context': 'https://schema.org',
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
   2. CONTENT SECTIONS
───────────────────────────────────────────────────────────────────────────── */
const specSections = [
  {
    title: 'CPU: Intel Core Ultra vs AMD Ryzen AI',
    icon: Cpu,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
    points: [
      "The suffix matters more than the tier number. A Core i5-H can outperform a Core i7-U under sustained load because the suffix sets the power budget, not the number in front of it.",
      "Intel's Core Ultra line adds a dedicated NPU for on-device AI tasks; AMD's Ryzen AI competes closely on efficiency and integrated graphics.",
      "For sustained work (compiling, rendering, exporting), check the sustained wattage — not just the marketed 'up to' boost clock.",
    ],
  },
  {
    title: 'RAM: DDR5, LPCAMM2 & How Much You Need',
    icon: MemoryStick,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    points: [
      '16GB is a reasonable baseline for general use in 2026; 32GB is recommended for developers or anyone running VMs.',
      'DDR5 is worth the premium over DDR4 for a new purchase — DDR4 is increasingly a legacy standard.',
      'LPCAMM2 modules offer soldered-class speed and efficiency while staying removable and upgradeable — worth seeking out if long-term upgradability matters to you.',
    ],
  },
  {
    title: 'Storage: TLC vs QLC, Gen4 vs Gen5',
    icon: HardDrive,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    points: [
      'TLC NAND is faster and more durable than QLC, and holds its speed when nearly full — QLC can slow sharply once its cache is exhausted.',
      'PCIe Gen5 SSDs mainly help large sequential transfers and workstation workloads; for everyday use the difference from Gen4 is minor, and Gen5 drives run hotter.',
      'A soldered SSD complicates data recovery if the board fails — factor that into your decision if you don\'t maintain regular backups.',
    ],
  },
  {
    title: 'GPU: Why the Model Number Can Mislead You',
    icon: Gauge,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    points: [
      'The same RTX model can ship with very different power limits (TGP) across laptops — this affects real performance more than the model name.',
      "A 'gaming laptop' that runs games poorly is usually power-limited or thermally throttled, not underpowered on paper.",
      "Most people who don't game are well served by integrated graphics; a dedicated GPU earns its keep for 3D, heavy gaming, or GPU-accelerated software.",
    ],
  },
  {
    title: "Thermals & Battery in Kuwait's Climate",
    icon: Thermometer,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    points: [
      "Kuwait's ambient heat reduces the thermal headroom before throttling kicks in, especially for higher-wattage H/HX-series laptops under long workloads.",
      "Liquid metal cooling offers a genuine thermal advantage in premium machines, though it requires precise factory application to be reliable.",
      "Look for 70Wh+ battery capacity for realistic all-day use — under 50Wh means frequent charging under real workloads.",
    ],
  },
];

const checklist = [
  'Check the CPU suffix (H, HX, U, P) — not just the model number',
  'Confirm RAM is upgradeable if your needs may grow, or budget for 32GB day one',
  'Ask whether storage is TLC or QLC, and whether it\'s soldered or replaceable',
  'For gaming laptops, check the GPU\'s TGP (power limit), not just the model name',
  'Prioritise 70Wh+ battery capacity for genuine all-day mobile use',
  'For heavy workloads in Kuwait, favour vapor-chamber or liquid-metal cooling designs',
];

/* ─────────────────────────────────────────────────────────────────────────────
   3. MAIN COMPONENT
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

      {/* Breadcrumb (visual, mirrors the BreadcrumbList schema) */}
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
      <section className="relative pt-6 pb-8 sm:pb-24 px-4 sm:px-6 overflow-hidden">
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

      {/* Spec Sections */}
      <section className="py-8 sm:py-24 px-4 sm:px-6 bg-slate-900/50 backdrop-blur-sm border-y border-slate-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-16">
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-sm mb-3 sm:mb-4">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 inline" /> What Actually Matters
            </Badge>
            <h2 className="text-2xl sm:text-5xl font-bold text-white mb-3 sm:mb-6">
              Beyond the Spec Sheet
            </h2>
            <p className="text-sm sm:text-xl text-slate-300 max-w-3xl mx-auto">
              Every laptop spec sheet tells you numbers. Here's what those numbers actually mean in daily use.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {specSections.map((section, index) => {
              const Icon = section.icon;
              return (
                <Card key={index} className={`bg-slate-950/40 ${section.borderColor} backdrop-blur-sm hover:scale-[1.01] transition-transform`}>
                  <CardHeader className="p-4 sm:p-6">
                    <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3">
                      <div className={`${section.bgColor} p-2 sm:p-3 rounded-lg sm:rounded-xl`}>
                        <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${section.color}`} />
                      </div>
                      <CardTitle className="text-lg sm:text-2xl text-white leading-tight">{section.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <ul className="space-y-2 sm:space-y-3">
                      {section.points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2 sm:gap-3 text-slate-300 text-xs sm:text-sm leading-relaxed">
                          <CheckCircle2 className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${section.color} flex-shrink-0 mt-0.5`} />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Checklist Section */}
      <section className="py-8 sm:py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 sm:mb-16">
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-sm mb-3 sm:mb-4">
              <ListChecks className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 inline" /> Before You Checkout
            </Badge>
            <h2 className="text-2xl sm:text-5xl font-bold text-white mb-3 sm:mb-6">
              The Pre-Purchase Checklist
            </h2>
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

      {/* FAQ Section (mirrors FAQPage schema exactly) */}
      <section className="py-8 sm:py-24 px-4 sm:px-6 border-t border-slate-800 bg-slate-900/30">
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
