import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Laptop, Cpu, Shield, CheckCircle2, Phone, MessageCircle, 
  Clock, AlertTriangle, Wind, Zap, Droplets, Battery, 
  Wrench, MapPin, HardDrive, Thermometer, Power, ChevronDown
} from 'lucide-react';
import { BUSINESS_INFO } from '../constants/data';
import MetaSEO from '../components/seo/MetaSEO';
import SchemaMarkup from '../components/seo/SchemaMarkup';

/* ─────────────────────────────────────────────────────────────────────────────
   1. PAGE DATA & SEO
───────────────────────────────────────────────────────────────────────────── */

const PAGE_URL = `${BUSINESS_INFO.url}/laptop-repair-kuwait`;
const HERO_IMAGE_URL = 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_1200/v1781139061/2026-01-22_9_qfanpt.jpg';

const WA_LINK = `https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${encodeURIComponent(
  'Hi KCROC, I need help with my Windows laptop. Please arrange a free diagnostic & pickup.'
)}`;

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      "url": PAGE_URL,
      "name": "Expert Laptop Repair in Kuwait | Free Pickup - KCROC",
      "description": "Professional Windows laptop repair in Kuwait. We fix overheating, dead batteries, broken hinges, and motherboard failures. Free pickup and delivery.",
      "isPartOf": { "@id": `${BUSINESS_INFO.url}/#website` },
      "breadcrumb": { "@id": `${PAGE_URL}#breadcrumb` }
    },
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      "name": "Windows Laptop Repair Services",
      "provider": {
        "@type": "LocalBusiness",
        "name": BUSINESS_INFO.name,
        "telephone": BUSINESS_INFO.phone,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19",
          "addressLocality": "Hawalli",
          "addressRegion": "Hawalli Governorate",
          "addressCountry": "KW"
        }
      },
      "areaServed": "Kuwait",
      "description": "Professional Windows laptop repair, hardware diagnostics, component-level micro-soldering, and thermal management across Kuwait.",
      "offers": {
        "@type": "Offer",
        "name": "Free Laptop Diagnosis",
        "price": "0",
        "priceCurrency": "KWD",
        "description": "Free collection and component-level diagnostic for all laptop repairs in Kuwait."
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": BUSINESS_INFO.url },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": `${BUSINESS_INFO.url}/services` },
        { "@type": "ListItem", "position": 3, "name": "Laptop Repair", "item": PAGE_URL }
      ]
    }
  ]
};

/* ─────────────────────────────────────────────────────────────────────────────
   2. CONTENT ARRAYS
───────────────────────────────────────────────────────────────────────────── */

const statistics = [
  { value: '24-48h', label: 'Average Turnaround', icon: Clock, color: 'text-cyan-400' },
  { value: '100%', label: 'No Fix, No Fee', icon: Shield, color: 'text-emerald-400' },
  { value: '30 Days', label: 'Hardware Warranty', icon: CheckCircle2, color: 'text-blue-400' }
];

const challenges = [
  {
    title: 'Thermal Throttling & Overheating',
    description: 'Kuwait\'s ambient heat and fine dust clog exhaust vents and dry out CPU thermal paste. This forces fans to spin at maximum speed while dropping system performance.',
    icon: Thermometer,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    image: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908596/CPU_cooling_fan_replacement_and_maintenance_-_Salmiya_client_mflsla.png'
  },
  {
    title: 'Swollen & Dead Batteries',
    description: 'Extreme temperature cycling degrades lithium-ion cells rapidly. Swollen batteries can permanently bend your laptop chassis or shatter the internal trackpad.',
    icon: Battery,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    image: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908595/New_Dell_laptop_battery_42Wh_installation_-_Jahra_pickup_hsbxb8.jpg'
  },
  {
    title: 'Motherboard Liquid Shorts',
    description: 'Coffee spills or AC condensation create immediate electrical shorts on the motherboard. If not ultrasonically cleaned, corrosion will permanently destroy the logic board.',
    icon: Droplets,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    image: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908596/Whats-App-Image-2026-01-29-at-3-19-40-AM_i2mpms.jpg'
  },
  {
    title: 'Broken Hinges & Chassis',
    description: 'Constant opening and closing stresses the plastic mounts holding the metal hinges. Once broken, the screen bezel splits open, risking permanent display cable severing.',
    icon: Wrench,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    image: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1781139061/2026-01-22_9_qfanpt.jpg'
  }
];

const repairCatalog = [
  {
    title: 'Component-Level Motherboard Repair',
    description: 'We locate and replace blown capacitors and IC chips instead of forcing you to buy a highly expensive new motherboard.',
    price: 'Free Diagnostic',
    duration: '2-4 Days',
    icon: Cpu,
    image: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1781139061/2026-01-22_9_qfanpt.jpg',
    benefits: [
      'Micro-soldering expertise',
      'Saves 70% vs motherboard replacement',
      'Fixes "Dead/No Power" issues',
      'No Fix, No Fee Guarantee'
    ]
  },
  {
    title: 'Premium Thermal Deep Clean',
    description: 'Complete internal teardown, dust extraction, and application of high-end Thermal Grizzly paste to CPU/GPU.',
    price: '15 KD',
    duration: '1-2 Hours',
    icon: Wind,
    image: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908596/CPU_cooling_fan_replacement_and_maintenance_-_Salmiya_client_mflsla.png',
    benefits: [
      'Drops operating temperatures instantly',
      'Stops loud fan noise',
      'Prevents thermal throttling',
      'Extends processor lifespan'
    ]
  },
  {
    title: 'OEM Battery Replacement',
    description: 'Safe removal of degraded or swollen lithium cells and installation of fresh, high-cycle factory batteries.',
    price: 'From 15 KD',
    duration: 'Same Day',
    icon: Battery,
    image: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908595/New_Dell_laptop_battery_42Wh_installation_-_Jahra_pickup_hsbxb8.jpg',
    benefits: [
      'Genuine or high-grade OEM cells',
      'Safe ecological disposal of old battery',
      'Restores factory battery life',
      'Power delivery circuit testing'
    ]
  },
  {
    title: 'Hinge & Chassis Fabrication',
    description: 'Repairing or completely replacing broken plastic mounts, metal hinges, and splitting screen bezels.',
    price: 'Quote Based',
    duration: '1-3 Days',
    icon: Wrench,
    image: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908595/Dell_laptop_screen_protection_installation_-_Kuwait_City_service_ghokkb.jpg',
    benefits: [
      'Prevents LCD cable tearing',
      'Restores smooth open/close tension',
      'Epoxy resin structural reinforcement',
      'Available for all plastic/metal chassis'
    ]
  },
  {
    title: 'Liquid Damage Ultrasonic Cleaning',
    description: 'Emergency teardown and chemical bath to halt microscopic corrosion on the motherboard after a spill.',
    price: 'Quote Based',
    duration: '3-5 Days',
    icon: Droplets,
    image: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908596/Whats-App-Image-2026-01-29-at-3-19-40-AM_i2mpms.jpg',
    benefits: [
      'Halts active electrical shorts',
      'Removes sticky sugar residue',
      'Ultrasonic motherboard bathing',
      'Highest success rate if acted on fast'
    ]
  },
  {
    title: 'SSD & RAM Performance Upgrades',
    description: 'Speed up sluggish laptops by replacing old spinning hard drives with blazing-fast NVMe SSDs and adding memory.',
    price: 'From 20 KD',
    duration: 'Same Day',
    icon: HardDrive,
    image: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1781139061/2026-01-22_9_qfanpt.jpg',
    benefits: [
      '10x faster boot times',
      'Seamless data cloning (keep your files)',
      'Improves multitasking speed',
      'Fresh Windows installation option'
    ]
  }
];

const brandMatrix = [
  {
    brand: 'Dell',
    models: 'XPS, Latitude, Inspiron, Alienware',
    expertise: 'DC jack soldering, BIOS flashing, thermal throttling fixes, premium display panel fitting.',
    common: 'Hinge separation, battery swelling, swollen trackpads.'
  },
  {
    brand: 'HP (Hewlett-Packard)',
    models: 'Spectre, Envy, EliteBook, Pavilion, Omen',
    expertise: 'Chassis repair, motherboard schematic tracing, fan replacement, SSD upgrades.',
    common: 'Overheating fan failures, broken charging ports, keyboard failure.'
  },
  {
    brand: 'Lenovo',
    models: 'ThinkPad, Yoga, IdeaPad, Legion',
    expertise: 'TrackPoint restoration, USB-C charging port micro-soldering, 360° hinge tensioning.',
    common: 'USB-C port power shorts, internal display cable fraying.'
  },
  {
    brand: 'ASUS & Acer',
    models: 'ZenBook, ROG, TUF, Predator, Swift',
    expertise: 'Gaming GPU repasting, liquid metal application, keyboard backlight restoration.',
    common: 'GPU thermal throttling, fan bearing grinding, chassis cracking.'
  }
];

const faq = [
  { q: 'Do you offer free laptop pickup in Kuwait?', a: 'Yes. Kuwait Computer Repair On Call provides completely free pickup and delivery across all of Kuwait, including Hawalli, Salmiya, Kuwait City, and Farwaniya. Contact us on WhatsApp to arrange collection.' },
  { q: 'What is your No Fix, No Fee policy?', a: 'We provide free hardware diagnostics. If we examine your laptop and determine it cannot be fixed, or if you decline the quoted repair price, you pay absolutely nothing. We return your device at no charge.' },
  { q: 'My laptop is completely dead and won\'t turn on. Is my data lost?', a: 'Usually, no. In "dead" laptops, the failure is typically on the motherboard power delivery circuit. Your data lives securely on the SSD/HDD, which is usually unaffected. We can either fix the motherboard or extract your data for you.' },
  { q: 'Do you repair Apple MacBooks as well?', a: 'Yes, we have specialized technicians for Apple hardware, including MacBook Pro and MacBook Air logic board repair, screen replacement, and battery swaps.' }
];

/* ─────────────────────────────────────────────────────────────────────────────
   3. MAIN COMPONENT
───────────────────────────────────────────────────────────────────────────── */

export default function LaptopRepair() {
  return (
    <div className="min-h-screen bg-gray-950 text-white selection:bg-cyan-500/30">
      <MetaSEO
        title="Expert Laptop Repair in Kuwait | Free Pickup - KCROC"
        description="Professional Windows laptop repair in Kuwait. We fix overheating, dead batteries, broken hinges, and motherboard failures. Free pickup and delivery."
        canonical={PAGE_URL}
      />
      <SchemaMarkup schema={STRUCTURED_DATA} />

      {/* Hero Header Area */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex justify-center mb-8">
            <ol className="flex items-center space-x-2 text-sm text-slate-400 font-medium bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
              <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
              <li><span className="text-slate-600">/</span></li>
              <li><Link to="/services" className="hover:text-cyan-400 transition-colors">Services</Link></li>
              <li><span className="text-slate-600">/</span></li>
              <li aria-current="page" className="text-cyan-400">Laptop Repair</li>
            </ol>
          </nav>

          <div className="text-center space-y-6">
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 px-6 py-2 text-sm font-semibold">
              <Laptop className="w-4 h-4 mr-2 inline" />
              Windows PC Specialists
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight">
              Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Laptop Repair</span><br />
              in Kuwait
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              From shattered chassis hinges to complex motherboard shorts. We restore your laptop to factory performance with our No Fix, No Fee guarantee.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center pt-6">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-lg px-8 py-6 shadow-lg shadow-cyan-500/30 font-black"
                asChild
              >
                <a href={`tel:${BUSINESS_INFO.phone}`}>
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now: +965 5530 1913
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 text-lg px-8 py-6 font-bold"
                asChild
              >
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Request Free Pickup
                </a>
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm font-bold text-slate-400 uppercase tracking-widest mt-8">
              {['Dell', 'HP', 'Lenovo', 'ASUS', 'Acer'].map((brand) => (
                <span key={brand} className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-emerald-500" aria-hidden="true" /> {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="py-16 px-4 bg-slate-900/50 backdrop-blur-sm border-y border-slate-800/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {statistics.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-cyan-500/20 backdrop-blur-sm hover:border-cyan-500/40 transition-all">
                  <CardContent className="pt-8 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="bg-slate-950 p-4 rounded-full border border-slate-800">
                        <Icon className={`w-8 h-8 ${stat.color}`} />
                      </div>
                    </div>
                    <div className="text-4xl md:text-5xl font-black text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-400 font-bold uppercase tracking-widest">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Common Problems / Challenges Component */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="bg-red-500/20 text-red-300 border-red-500/30 px-4 py-2 text-sm mb-4">
              <AlertTriangle className="w-4 h-4 mr-2 inline" /> Hardware Diagnostics
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Common Laptop Failures
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Laptops are highly susceptible to environmental damage and physical wear. These are the most frequent hardware failures we fix in our Hawalli lab.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {challenges.map((challenge, index) => {
              const Icon = challenge.icon;
              return (
                <Card key={index} className={`bg-slate-900/50 ${challenge.borderColor} backdrop-blur-sm hover:scale-[1.01] transition-transform overflow-hidden`}>
                  <div className="grid md:grid-cols-2 h-full">
                    <div className="flex flex-col justify-center">
                      <CardHeader>
                        <div className="flex items-center gap-4 mb-3">
                          <div className={`${challenge.bgColor} p-3 rounded-xl`}>
                            <Icon className={`w-6 h-6 ${challenge.color}`} />
                          </div>
                        </div>
                        <CardTitle className="text-2xl text-white mb-3 leading-tight">{challenge.title}</CardTitle>
                        <CardDescription className="text-slate-300 text-sm leading-relaxed">
                          {challenge.description}
                        </CardDescription>
                      </CardHeader>
                    </div>
                    <div className="flex items-center justify-center p-4">
                      <img 
                        src={challenge.image}
                        alt={`${challenge.title} - Laptop Repair in Kuwait`}
                        className="w-full h-48 md:h-full object-cover rounded-lg"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Solutions Catalog */}
      <section className="py-24 px-4 bg-slate-900/30 border-y border-slate-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 px-4 py-2 text-sm mb-4">
              Our Capabilities
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Expert Repair Services
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              We execute precision component-level repairs to save your hardware and your budget.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repairCatalog.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <Card key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-800 backdrop-blur-sm hover:border-cyan-500/40 transition-all overflow-hidden flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={solution.image}
                      alt={solution.title}
                      className="w-full h-full object-cover opacity-75"
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-slate-950/90 text-cyan-400 border border-cyan-500/30 text-sm px-3 py-1 font-bold">
                        {solution.price}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="flex-grow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-slate-950 border border-slate-800 p-2.5 rounded-lg">
                        <Icon className="w-5 h-5 text-cyan-400" />
                      </div>
                    </div>
                    <CardTitle className="text-xl text-white mb-2 leading-tight">{solution.title}</CardTitle>
                    <CardDescription className="text-slate-400 text-sm mb-4">
                      {solution.description}
                    </CardDescription>
                    <div className="flex items-center gap-2 mt-auto">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      <span className="text-sm font-bold text-slate-300">{solution.duration}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="bg-slate-950/30 pt-4 border-t border-slate-800">
                    <ul className="space-y-2">
                      {solution.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
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

      {/* Brand Specific Layer */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 px-4 py-2 text-sm mb-4">
              Authorized-Level Support
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              We Support All Major Brands
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {brandMatrix.map((brand, index) => (
              <Card key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-800 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-white mb-2">{brand.brand}</CardTitle>
                  <Badge className="bg-slate-950 text-slate-400 border border-slate-800 w-fit">{brand.models}</Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-cyan-400 font-bold text-xs uppercase tracking-wider mb-1">Technical Expertise:</h4>
                    <p className="text-slate-300 text-sm">{brand.expertise}</p>
                  </div>
                  <div>
                    <h4 className="text-orange-400 font-bold text-xs uppercase tracking-wider mb-1">Common Fixes:</h4>
                    <p className="text-slate-400 text-sm">{brand.common}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* The Repair Protocol (Process) */}
      <section className="py-24 px-4 bg-slate-900/30 border-t border-slate-800">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-slate-900/50 backdrop-blur-xl p-10 md:p-14 rounded-3xl border border-slate-800 shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-10 text-center tracking-tight">
              Our Zero-Risk Repair Protocol
            </h2>
            <div className="space-y-10">
              {[
                {
                  step: "1",
                  title: "Free Collection & Diagnosis",
                  desc: "Our driver collects your laptop securely. We perform a full teardown and component-level diagnostic test at our lab at absolutely no cost to you.",
                  icon: MapPin
                },
                {
                  step: "2",
                  title: "Transparent Quoting",
                  desc: "We provide a firm price and exact turnaround time. We only proceed if you approve. If you decline, we return the laptop to you for free.",
                  icon: MessageCircle
                },
                {
                  step: "3",
                  title: "Precision Repair & Testing",
                  desc: "We repair the fault, apply high-grade thermal paste, and stress-test the machine extensively before returning it with a 30-day warranty.",
                  icon: Wrench
                }
              ].map(({ step, title, desc, icon: Icon }) => (
                <div key={step} className="flex gap-6 group">
                  <div className="w-14 h-14 shrink-0 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:border-cyan-400 transition-colors">
                    <Icon className="w-6 h-6 text-cyan-400" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      <span className="text-cyan-500 mr-2">Step {step}:</span>{title}
                    </h3>
                    <p className="text-slate-400 text-base md:text-lg leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 border-t border-slate-900 bg-slate-950">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faq.map((item, index) => (
              <Card key={index} className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-lg font-bold text-white mb-3 flex items-start gap-3">
                    <span className="text-cyan-400 flex-shrink-0">Q:</span>
                    {item.q}
                  </h3>
                  <p className="text-slate-400 leading-relaxed pl-7">
                    <span className="text-emerald-400 font-semibold">A:</span> {item.a}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* High-Conversion CTA Component */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <Card className="bg-gradient-to-br from-cyan-600/20 via-blue-600/20 to-emerald-600/20 border-cyan-500/30 backdrop-blur-sm overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-500"></div>
            <CardContent className="p-12 text-center relative z-10">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                Is Your Laptop Dead or Overheating?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Don't risk losing your data. Get a free, zero-risk diagnostic today. Complimentary pickup and delivery across all governorates in Kuwait.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-lg px-10 py-7 shadow-lg shadow-cyan-500/30"
                  asChild
                >
                  <Link to="/book">
                    Book Free Pickup
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-slate-600 text-white hover:bg-slate-800 hover:text-white text-lg px-10 py-7 font-bold"
                  asChild
                >
                  <a href={`tel:${BUSINESS_INFO.phone}`}>
                    <Phone className="w-5 h-5 mr-2" />
                    Call: +965 5530 1913
                  </a>
                </Button>
              </div>
              <div className="mt-10 pt-8 border-t border-slate-800/50 flex flex-wrap justify-center gap-6 text-sm text-slate-400 font-medium">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400" /> Hawalli, Kuwait
                </span>
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400" /> No Fix, No Fee Guarantee
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
