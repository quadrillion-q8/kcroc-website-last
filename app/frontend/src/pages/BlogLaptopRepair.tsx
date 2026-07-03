// File: app/frontend/src/pages/BlogLaptopRepair.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Thermometer, Wind, Droplets, AlertTriangle, CheckCircle2, 
  Phone, MessageCircle, Shield, Zap, Clock, Flame, 
  Battery, Cpu, Laptop, Wrench, Keyboard, Monitor, MapPin
} from 'lucide-react';

import { BUSINESS_INFO } from '../constants/data';
import SchemaMarkup from '../components/seo/SchemaMarkup';

// 👈 Phase 2 SEO Engine Imported
import { SEOEngine } from '../core/components/SEOEngine';

/* ─────────────────────────────────────────────────────────────────────────────
   1. PAGE DATA & SEO (Preserving your rich Article Schema)
───────────────────────────────────────────────────────────────────────────── */
const PAGE_URL = `${BUSINESS_INFO.url}/blog/laptop-repair-kuwait-2026`;
const HERO_IMAGE_URL = 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_1200/v1781139061/2026-01-22_9_qfanpt.jpg';
const PUBLISHED_DATE = '2026-06-14T08:00:00+03:00';

const WA_LINK = `https://wa.me/96555301913?text=${encodeURIComponent(
  'Hi KCROC, I read your guide on laptop repair and need a diagnostic. Please arrange a free pickup.'
)}`;

// Preserving your elite structured data for Article Rich Snippets
const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': PAGE_URL,
      url: PAGE_URL,
      name: 'Laptop Repair Kuwait: The 2026 Guide to Hardware Preservation',
      description: "An in-depth look at how Kuwait's climate impacts laptop hardware, thermal management, and KCROC's professional component-level repair techniques.",
      isPartOf: { '@id': `${BUSINESS_INFO.url}/#website` },
      primaryImageOfPage: { '@type': 'ImageObject', url: HERO_IMAGE_URL },
    },
    {
      '@type': 'Article',
      mainEntityOfPage: { '@id': PAGE_URL },
      headline: 'Laptop Repair in Kuwait: The 2026 Guide to Hardware Preservation',
      description: "An in-depth look at how Kuwait's climate impacts laptop hardware, thermal management, and KCROC's professional component-level repair techniques.",
      image: HERO_IMAGE_URL,
      author: {
        '@type': 'Person',
        name: 'Imran Natiq',
        jobTitle: 'Computer Technician',
        worksFor: { '@id': `${BUSINESS_INFO.url}/#organization` },
      },
      publisher: {
        '@type': 'Organization',
        name: BUSINESS_INFO.name,
        logo: { '@type': 'ImageObject', url: `${BUSINESS_INFO.url}/logo.png` }
      },
      datePublished: PUBLISHED_DATE,
      dateModified: PUBLISHED_DATE,
    }
  ]
};

/* ─────────────────────────────────────────────────────────────────────────────
   2. CONTENT ARRAYS
───────────────────────────────────────────────────────────────────────────── */
const statistics = [
  { value: '24-48h', label: 'Turnaround Time', icon: Clock, color: 'text-emerald-400' },
  { value: '100%', label: 'Data Privacy', icon: Shield, color: 'text-blue-400' },
  { value: '30 Days', label: 'Repair Warranty', icon: CheckCircle2, color: 'text-cyan-400' }
];

const challenges = [
  {
    title: 'Thermal Degradation',
    description: 'Kuwait\'s extreme heat dries out thermal paste and warps plastic chassis components over time.',
    icon: Flame,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    image: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908596/CPU_cooling_fan_replacement_and_maintenance_-_Salmiya_client_mflsla.png'
  },
  {
    title: 'Battery Swelling',
    description: 'Constant heat exposure degrades lithium cells, causing batteries to expand and potentially crack the trackpad or motherboard.',
    icon: Battery,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    image: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908595/New_Dell_laptop_battery_42Wh_installation_-_Jahra_pickup_hsbxb8.jpg'
  },
  {
    title: 'Motherboard Shorts',
    description: 'Coastal humidity combined with indoor AC creates microscopic condensation, leading to logic board oxidation and shorts.',
    icon: Zap,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    image: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1781139061/2026-01-22_9_qfanpt.jpg'
  },
  {
    title: 'Hinge & Screen Stress',
    description: 'Repeatedly opening laptops in hot environments stresses brittle plastic mounts, leading to snapped hinges and screen pressure fractures.',
    icon: Monitor,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    image: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908595/Dell_laptop_screen_protection_installation_-_Kuwait_City_service_ghokkb.jpg'
  }
];

const repairSolutions = [
  {
    title: 'Motherboard Micro-Soldering',
    description: 'Component-level repair for dead laptops, fixing shorts instead of replacing the entire board.',
    price: 'Free Diagnostic',
    duration: '2-4 Days',
    icon: Cpu,
    image: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1781139061/2026-01-22_9_qfanpt.jpg',
    benefits: [
      'Identifies blown capacitors & ICs',
      'Fraction of the cost of a new board',
      'No Fix, No Fee policy',
      'Preserves original data securely'
    ]
  },
  {
    title: 'OEM Screen Replacement',
    description: 'Flawless display panel replacement for cracked, flickering, or dead screens.',
    price: 'From 25 KD',
    duration: 'Same Day',
    icon: Laptop,
    image: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908595/Dell_laptop_screen_protection_installation_-_Kuwait_City_service_ghokkb.jpg',
    benefits: [
      'Original OEM LCD/OLED panels',
      'Color calibration check',
      'Hinge tension adjustment included',
      'Zero dead-pixel guarantee'
    ]
  },
  {
    title: 'Battery Replacement',
    description: 'Safe removal of degraded/swollen batteries and installation of fresh lithium cells.',
    price: 'From 15 KD',
    duration: '1-2 Hours',
    icon: Battery,
    image: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908595/New_Dell_laptop_battery_42Wh_installation_-_Jahra_pickup_hsbxb8.jpg',
    benefits: [
      'High-cycle OEM grade batteries',
      'Safe disposal of swollen cells',
      'Charging circuit health check',
      'Restores factory battery life'
    ]
  },
  {
    title: 'Thermal Deep Cleaning',
    description: 'Complete internal teardown, dust removal, and premium thermal paste re-application.',
    price: '15 KD',
    duration: '1-2 Hours',
    icon: Wind,
    image: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908596/CPU_cooling_fan_replacement_and_maintenance_-_Salmiya_client_mflsla.png',
    benefits: [
      'Fixes overheating & loud fans',
      'Premium Thermal Grizzly paste',
      'Fan bearing lubrication',
      'Prevents future component failure'
    ]
  },
  {
    title: 'Liquid Damage Restoration',
    description: 'Emergency ultrasonic cleaning and corrosion removal after spills.',
    price: 'Quote Based',
    duration: '3-5 Days',
    icon: Droplets,
    image: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908596/Whats-App-Image-2026-01-29-at-3-19-40-AM_i2mpms.jpg',
    benefits: [
      'Ultrasonic motherboard bath',
      'Halts microscopic corrosion',
      'Keyboard trace testing',
      'Highest success rate if brought in fast'
    ]
  },
  {
    title: 'Keyboard & Trackpad Repair',
    description: 'Replacement of sticky, non-responsive, or physically damaged input devices.',
    price: 'From 15 KD',
    duration: 'Same Day',
    icon: Keyboard,
    image: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1781139061/2026-01-22_9_qfanpt.jpg',
    benefits: [
      'OEM palmrest assemblies',
      'Ribbon cable replacement',
      'Backlight functionality restored',
      'Tactile feedback guaranteed'
    ]
  }
];

const laptopBrands = [
  {
    brand: 'Apple MacBook',
    models: 'Pro, Air, M1/M2/M3 Series',
    expertise: 'Logic board micro-soldering, Flexgate hinge repair, Retina screen replacement',
    common: 'Liquid damage, battery swelling, screen fractures',
  },
  {
    brand: 'Dell',
    models: 'XPS, Latitude, Inspiron',
    expertise: 'DC jack repair, BIOS flashing, premium display panel fitting',
    common: 'Hinge separation, battery degradation, thermal throttling',
  },
  {
    brand: 'HP',
    models: 'Spectre, Envy, EliteBook, Pavilion',
    expertise: 'Chassis repair, fan replacement, SSD upgrades',
    common: 'Overheating fans, swollen batteries, keyboard failure',
  },
  {
    brand: 'Lenovo',
    models: 'ThinkPad, Yoga, IdeaPad',
    expertise: 'TrackPoint restoration, motherboard repair, port replacement',
    common: 'USB-C charging port failure, motherboard shorts',
  }
];

const faq = [
  {
    q: 'Do you offer free pickup and delivery for laptops?',
    a: 'Yes, we offer completely free pickup and delivery across all Kuwait governorates including Hawalli, Salmiya, Farwaniya, Jahra, and Kuwait City.'
  },
  {
    q: 'What does "No Fix, No Fee" mean?',
    a: 'We provide free diagnostics. If we examine your laptop and determine it cannot be fixed, or if you decline the quoted price, you do not pay for the repair attempt.'
  },
  {
    q: 'How long does a typical laptop repair take?',
    a: 'Standard repairs like screen, battery, or keyboard replacements are usually done the same day. Complex motherboard micro-soldering takes 2-4 days.'
  },
  {
    q: 'Will I lose my data during the repair?',
    a: 'Data privacy is our priority. We do not wipe your hard drive unless it is a software/OS issue and we have your explicit permission. For hardware repairs, your data remains untouched.'
  }
];

/* ─────────────────────────────────────────────────────────────────────────────
   3. MAIN COMPONENT
───────────────────────────────────────────────────────────────────────────── */
export default function BlogLaptopRepair() {
  return (
    <div className="min-h-screen bg-gray-950 text-white selection:bg-cyan-500/30">
      
      {/* 🚀 PHASE 2 AUTOMATION IN ACTION */}
      <SEOEngine entityId="post-laptop-repair" />
      <SchemaMarkup schema={STRUCTURED_DATA} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-6">
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 px-6 py-2 text-sm font-semibold">
              <Wrench className="w-4 h-4 mr-2 inline" />
              Laptop Repair Experts in Kuwait
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Revive Your Broken Laptop<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                With Zero Risk
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Professional component-level repair, screen replacements, and motherboard diagnostics. We bring dead laptops back to life.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-6">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-lg px-8 py-6 shadow-lg shadow-cyan-500/30"
                asChild
              >
                <a href="tel:+96555301913">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now: +965 5530 1913
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 text-lg px-8 py-6"
                asChild
              >
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 px-4 bg-slate-900/50 backdrop-blur-sm">
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
                    <div className="text-5xl font-black text-white mb-2">
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

      {/* The Challenge Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="bg-red-500/20 text-red-300 border-red-500/30 px-4 py-2 text-sm mb-4">
              <AlertTriangle className="w-4 h-4 mr-2 inline" /> Hardware Threats
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Why Laptops Fail in Kuwait
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Portability comes with risks. Between extreme heat, dust, and daily transport, laptops are highly susceptible to these common hardware failures.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {challenges.map((challenge, index) => {
              const Icon = challenge.icon;
              return (
                <Card key={index} className={`bg-slate-900/50 ${challenge.borderColor} backdrop-blur-sm hover:scale-[1.02] transition-transform overflow-hidden`}>
                  <div className="grid md:grid-cols-2 h-full">
                    <div className="flex flex-col justify-center">
                      <CardHeader>
                        <div className="flex items-center gap-4 mb-3">
                          <div className={`${challenge.bgColor} p-3 rounded-xl`}>
                            <Icon className={`w-6 h-6 ${challenge.color}`} />
                          </div>
                        </div>
                        <CardTitle className="text-2xl text-white mb-3">{challenge.title}</CardTitle>
                        <CardDescription className="text-slate-300 text-sm leading-relaxed">
                          {challenge.description}
                        </CardDescription>
                      </CardHeader>
                    </div>
                    <div className="flex items-center justify-center p-4">
                      <img 
                        src={challenge.image}
                        alt={`${challenge.title} - Laptop Repair Kuwait`}
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

      {/* Repair Solutions */}
      <section className="py-24 px-4 bg-slate-900/50 backdrop-blur-sm border-y border-slate-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 px-4 py-2 text-sm mb-4">
              Professional Solutions
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our Repair Services
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              From microscopic motherboard shorts to cracked screens, we fix what others say is unfixable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repairSolutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <Card key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700 backdrop-blur-sm hover:border-cyan-500/40 transition-all overflow-hidden flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={solution.image}
                      alt={`${solution.title} - KCROC Repair Kuwait`}
                      className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-slate-950/90 text-cyan-400 border border-cyan-500/30 text-sm px-3 py-1 font-bold shadow-lg">
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
                    <CardTitle className="text-xl text-white mb-2">{solution.title}</CardTitle>
                    <CardDescription className="text-slate-300 text-sm mb-4">
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

      {/* Brands Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 px-4 py-2 text-sm mb-4">
              Brand Expertise
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              We Repair All Laptop Brands
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Authorized-level expertise across all major hardware manufacturers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {laptopBrands.map((brand, index) => (
              <Card key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-white mb-2">{brand.brand}</CardTitle>
                  <Badge className="bg-slate-950 text-slate-300 border border-slate-700 w-fit">{brand.models}</Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-cyan-400 font-bold text-xs uppercase tracking-wider mb-1">Our Expertise:</h4>
                    <p className="text-slate-300 text-sm">{brand.expertise}</p>
                  </div>
                  <div>
                    <h4 className="text-orange-400 font-bold text-xs uppercase tracking-wider mb-1">Common Issues:</h4>
                    <p className="text-slate-300 text-sm">{brand.common}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 border-t border-slate-800 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faq.map((item, index) => (
              <Card key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700 backdrop-blur-sm">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-lg font-bold text-white mb-3 flex items-start gap-3">
                    <span className="text-cyan-400 flex-shrink-0">Q:</span>
                    {item.q}
                  </h3>
                  <p className="text-slate-300 leading-relaxed pl-7">
                    <span className="text-emerald-400 font-semibold">A:</span> {item.a}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <Card className="bg-gradient-to-br from-cyan-600/20 via-blue-600/20 to-emerald-600/20 border-cyan-500/30 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Get Your Laptop Fixed Today
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                No Fix, No Fee. Free pickup and delivery across all Kuwait governorates. Reach out now for an instant quote.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-lg px-8 py-6 shadow-lg shadow-cyan-500/30"
                  asChild
                >
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Book Free Pickup
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-slate-600 text-white hover:bg-slate-800 hover:text-white text-lg px-8 py-6"
                  asChild
                >
                  <a href="tel:+96555301913">
                    <Phone className="w-5 h-5 mr-2" />
                    Call: +965 5530 1913
                  </a>
                </Button>
              </div>
              <div className="mt-10 pt-8 border-t border-cyan-500/20 flex flex-wrap justify-center gap-6 text-sm text-slate-300">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400" /> Hawalli, Ibn Khaldoun St
                </span>
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-cyan-400" /> 30-Day Warranty
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
