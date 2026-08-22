// File: app/frontend/src/pages/BlogScreenProtection.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Monitor, Shield, AlertTriangle, CheckCircle2, Phone, MessageCircle, 
  Clock, Flame, Zap, Sun, Wind, Droplets, ShieldAlert, Wrench, MapPin,
  Laptop 
} from 'lucide-react';

import SchemaMarkup from '../components/seo/SchemaMarkup';
import { KCROC_GRAPH } from '../data/graph';

// Dynamic Business Data
const business = KCROC_GRAPH.business!;

/* ─────────────────────────────────────────────────────────────────────────────
   1. PAGE DATA & SEO (Preserving Rich Schema)
───────────────────────────────────────────────────────────────────────────── */
const PAGE_URL = `${business.websiteUrl}/blog/how-to-protect-laptop-screen`;
const HERO_IMAGE_URL = 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_1200/v1769908595/Dell_laptop_screen_protection_installation_-_Kuwait_City_service_ghokkb.jpg';
const PUBLISHED_DATE = '2026-06-01T08:00:00+03:00';

const WA_LINK = `https://wa.me/${business.telephone}?text=${encodeURIComponent(
  'Hi KCROC, I read your screen protection guide and need a display diagnostic. Please arrange a free pickup.'
)}`;

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      "url": PAGE_URL,
      "name": "How to Protect Your Laptop Screen & Repair Guide | KCROC",
      "isPartOf": { "@id": `${business.websiteUrl}/#website` },
      "breadcrumb": { "@id": `${PAGE_URL}#breadcrumb` }
    },
    {
      "@type": "Article",
      "@id": `${PAGE_URL}#article`,
      "headline": "How to Protect Your Laptop Screen: The Ultimate Expert Care & Repair Guide",
      "description": "Expert advice from KCROC technicians on preventing laptop screen damage. Learn the physics of screen failure, Kuwait climate impacts, and repair costs.",
      "author": { 
        "@type": "Person", 
        "name": "Imran Natiq",
        "url": `${business.websiteUrl}/about`
      },
      "publisher": { "@id": `${business.websiteUrl}/#business` },
      "mainEntityOfPage": { "@id": `${PAGE_URL}#webpage` },
      "datePublished": PUBLISHED_DATE,
      "image": HERO_IMAGE_URL
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": business.websiteUrl },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${business.websiteUrl}/blog` },
        { "@type": "ListItem", "position": 3, "name": "How to Protect Your Laptop Screen", "item": PAGE_URL }
      ]
    }
  ]
};

/* ─────────────────────────────────────────────────────────────────────────────
   2. MATRIX DATA ARRAYS
───────────────────────────────────────────────────────────────────────────── */
const statistics = [
  { value: '1-2 Hours', label: 'Screen Replacement', icon: Clock, color: 'text-cyan-400' },
  { value: '100%', label: 'Data Safety Isolation', icon: Shield, color: 'text-emerald-400' },
  { value: '30 Days', label: 'Hardware Warranty', icon: CheckCircle2, color: 'text-blue-400' }
];

const challenges = [
  {
    title: 'Pressure Point Stress',
    description: 'Packing a laptop into a tight bag compresses the lid, causing the chassis to bend and crush sub-pixel matrix structures without throwing any external glass cracks.',
    icon: ShieldAlert,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    image: HERO_IMAGE_URL
  },
  {
    title: 'Keyboard Debris',
    description: 'Small crumbs, sand, or earbuds left on the keyboard deck act as hard mechanical fulcrums. Closing the screen lid concentrates immense pressure on that point, shattering the matrix instantly.',
    icon: AlertTriangle,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    image: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1781139061/2026-01-22_9_qfanpt.jpg'
  },
  {
    title: 'Extreme Vehicular Heat',
    description: 'Leaving machines in cars during a Kuwait summer allows indoor cabin heat to surpass 65°C. This liquefies the Optically Clear Adhesive (OCA) holding panel sheets together, yielding delamination.',
    icon: Sun,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    image: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908596/CPU_cooling_fan_replacement_and_maintenance_-_Salmiya_client_mflsla.png'
  },
  {
    title: 'Condensation Damage',
    description: 'Moving your laptop rapidly from freezing air-conditioned office suites straight into outdoor humidity creates rapid internal dew condensation, shorting panel gate drivers instantly.',
    icon: Droplets,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    image: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908596/Whats-App-Image-2026-01-29-at-3-19-40-AM_i2mpms.jpg'
  }
];

const screenTiers = [
  {
    component: 'Micro-Scratches',
    safe: 'Dust Particles',
    warning: 'Keyboard Marks',
    critical: 'Anti-Glare Wear',
    description: 'Abrasive desert micro-sand ruins panel coatings over structural closure iterations.'
  },
  {
    component: 'Sub-Pixel Defect',
    safe: '0-2 Dead Pixels',
    warning: 'Stuck Pixel Lines',
    critical: 'Spreading Ink Spots',
    description: 'Localized external compression fractures cause internal liquid crystal matrix bleeds.'
  },
  {
    component: 'Display Interface',
    safe: 'Stable Link',
    warning: 'Bezel-Angle Flicker',
    critical: 'Solid Color Screen',
    description: 'Torsional corner lifting strains standard eDP ribbon cables, causing signal breakages.'
  }
];

const repairCatalog = [
  {
    title: 'Standard FHD LCD Screen Swap',
    description: 'Precision alignment of high-clarity 1080p replacement display matrices.',
    price: 'From 20 KD',
    duration: '1-2 Hours',
    icon: Monitor,
    image: HERO_IMAGE_URL,
    benefits: [
      'Original factory specifications',
      'Zero dead-pixel checking routine',
      'Refreshed viewing angles',
      'Full backlight driver integration'
    ]
  },
  {
    title: 'Premium 4K & OLED Matrix Fitting',
    description: 'Specialized installation of ultra-high definition and organic LED screens.',
    price: 'From 45 KD',
    duration: 'Same Day',
    icon: Zap,
    image: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1781139061/2026-01-22_9_qfanpt.jpg',
    benefits: [
      'Perfect color accuracy validation',
      'Deep contrast matching protocols',
      'Power delivery sync testing',
      'HDR compatibility restoration'
    ]
  },
  {
    title: 'MacBook Retina Assembly Fitting',
    description: 'Full display assembly replacement preserving internal webcam, True Tone, and sensor array operations.',
    price: 'Model Dependent',
    duration: '1-2 Hours',
    icon: Laptop,
    image: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908595/Dell_laptop_screen_protection_installation_-_Kuwait_City_service_ghokkb.jpg',
    benefits: [
      'Preserves original design tolerances',
      'ALS sensor hardware matching',
      'Original factory hinge tracking',
      'Flawless metal finish matches'
    ]
  }
];

const brandMatrix = [
  {
    brand: 'Apple MacBook',
    models: 'Pro / Air / Retina Series',
    expertise: 'Zero-clearance design adjustments, eDP link alignments, assembly logic programming.',
    common: 'Webcam cover crunches, corner drop edge dents, hinge binding lines'
  },
  {
    brand: 'Dell Engineering',
    models: 'XPS / Latitude / Inspiron',
    expertise: 'Touch panel configurations, infinity edge trace tracking, framing gasket re-seals.',
    common: 'Chassis hinge plate breakages, internal cable friction cuts'
  },
  {
    brand: 'HP Hardware',
    models: 'Spectre / Envy / EliteBook',
    expertise: 'Privacy screen filter diagnostics, active digitizer checks, bracket fitting.',
    common: 'Top bezel compression bleeding, bracket clip unseating issues'
  },
  {
    brand: 'Lenovo Systems',
    models: 'ThinkPad / Yoga / IdeaPad',
    expertise: '360° rotational axle stress balancing, touch matrix calibration.',
    common: 'Keyboard mark surface scratches, severe hinge mechanism lockups'
  }
];

const preventionGuide = [
  { title: 'The Rigid Padded Sleeve Rule', description: 'Always house machines in solid shell structures rather than throwing loose laptops directly inside un-reinforced gear bags.', icon: Shield, frequency: 'Every Transport' },
  { title: 'Top-Center Lifting Execution', description: 'Open your laptop exclusively from the absolute midpoint of the top bezel to balance structural torque loads safely.', icon: Wrench, frequency: 'Continuous' },
  { title: 'Webcam Slider Elimination', description: 'Remove aftermarket physical webcam shutter plates entirely to prevent crushing thin display glass faces.', icon: Monitor, frequency: 'Immediate Action' },
  { title: 'Microfiber deck cleaning', description: 'Clear dust off the physical frame deck before any closure step to negate micro- Fulcrum damage hazards.', icon: Wind, frequency: 'Daily Basis' }
];

const faq = [
  { q: 'Can a physically cracked display panel be repaired without replacement?', a: 'No. Fractured LCD or OLED internal pixel substrates cannot be glued back together or software-resolved. The absolute only hardware route to restore display health is a structural panel assembly change.' },
  { q: 'How long does a complete laptop screen replacement procedure take?', a: 'If components are pre-stocked within our specialized Hawalli lab shelves, physical screen replacements take between 1 to 2 hours maximum to complete.' },
  { q: 'What is the root cause of internal display bleeding when outer glass is safe?', a: 'Lids are highly flexible. If external force hits your bag, the plastic/aluminum backing bends inward, focusing a crushing force that splits inner pixel layers while the elastic outer panel face survives unbroken.' },
  { q: 'Does your laptop screen replacement include full warranty protection?', a: 'Yes. Every successful structural display panel swap carried out within our center leaves with comprehensive warranty protection covering performance stability.' }
];

/* ─────────────────────────────────────────────────────────────────────────────
   3. ANIMATED BACKGROUND COMPONENT (CLEAN TAILWIND IMPLEMENTATION)
───────────────────────────────────────────────────────────────────────────── */
const AnimatedBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    {/* Floating Orb 1 - Cyan */}
    <div 
      className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-cyan-600/40 blur-[100px] md:blur-[120px] rounded-full animate-blob" 
      style={{ animationDuration: '7s' }}
    />
    {/* Floating Orb 2 - Emerald */}
    <div 
      className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] md:w-[500px] md:h-[500px] bg-emerald-600/40 blur-[100px] md:blur-[120px] rounded-full animate-blob" 
      style={{ animationDuration: '7s', animationDelay: '2s' }}
    />
    {/* Floating Orb 3 - Blue */}
    <div 
      className="absolute bottom-[-20%] left-[20%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-blue-600/40 blur-[100px] md:blur-[120px] rounded-full animate-blob" 
      style={{ animationDuration: '7s', animationDelay: '4s' }}
    />
  </div>
);

/* ─────────────────────────────────────────────────────────────────────────────
   4. MAIN VISUAL COMPONENT
───────────────────────────────────────────────────────────────────────────── */
export default function BlogScreenProtection() {
  return (
    <div className="min-h-screen bg-gray-950 text-white selection:bg-cyan-500/30 relative">
      
      {/* 🚀 Independent SEO Helmet */}
      <Helmet>
        <title>How to Protect Your Laptop Screen: The Ultimate Care Guide | KCROC</title>
        <meta name="description" content="Expert advice from KCROC technicians on preventing laptop screen damage. Learn the physics of screen failure, Kuwait climate impacts, and repair costs." />
        <link rel="canonical" href={PAGE_URL} />
      </Helmet>

      <SchemaMarkup schema={STRUCTURED_DATA} />

      {/* Inject the stunning animated background here */}
      <AnimatedBackground />

      {/* Hero Header Area */}
      <section className="relative pt-24 pb-8 sm:pb-24 px-4 overflow-hidden z-10">
        <div className="container mx-auto max-w-6xl relative mt-8 sm:mt-0">
          <div className="text-center space-y-4 sm:space-y-6">
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold">
              <Monitor className="w-4 h-4 mr-2 inline" />
              Display Hardware Maintenance Insights
            </Badge>
            <h1 className="text-4xl sm:text-6xl font-bold text-white leading-tight">
              Protect Your Laptop Screen<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                From Costly Failures
              </span>
            </h1>
            <p className="text-sm sm:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Technical screen preservation methodologies from Kuwait's leading hardware repair center. Eliminate pressure damage, heat degradation, and alignment breaks.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4 sm:pt-6">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-base sm:text-lg px-6 sm:px-8 py-6 shadow-lg shadow-cyan-500/30"
                asChild
              >
                <a href={`tel:+${business.telephone}`}>
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Call: +{business.telephone}
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 text-base sm:text-lg px-6 sm:px-8 py-6"
                asChild
              >
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="py-8 sm:py-16 px-4 bg-slate-900/50 backdrop-blur-sm relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
            {statistics.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-cyan-500/20 backdrop-blur-sm hover:border-cyan-500/40 transition-all">
                  <CardContent className="pt-4 sm:pt-8 text-center p-4 md:p-6">
                    <div className="flex justify-center mb-2 sm:mb-4">
                      <div className="bg-slate-950 p-2 sm:p-4 rounded-full border border-slate-800">
                        <Icon className={`w-5 h-5 sm:w-8 sm:h-8 ${stat.color}`} />
                      </div>
                    </div>
                    <div className="text-2xl sm:text-5xl font-black text-white mb-1 sm:mb-2">
                      {stat.value}
                    </div>
                    <div className="text-[10px] sm:text-sm text-slate-400 font-bold uppercase tracking-widest">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Environmental Challenges Component */}
      <section className="py-8 sm:py-24 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-16">
            <Badge className="bg-red-500/20 text-red-300 border-red-500/30 px-3 sm:px-4 py-1.5 md:py-2 text-[10px] sm:text-sm mb-3 sm:mb-4">
              <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 inline" /> Stress Mechanics
            </Badge>
            <h2 className="text-white mb-3 sm:mb-6">
              The Path to Matrix Destruction
            </h2>
            <p className="text-sm md:text-xl text-slate-300 max-w-3xl mx-auto">
              Modern displays compress glass profiles to achieve lean design lines, sacrificing physical resilience. Here is how local climate and user habits degrade your screen layers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {challenges.map((challenge, index) => {
              const Icon = challenge.icon;
              return (
                <Card key={index} className={`bg-slate-900/50 ${challenge.borderColor} backdrop-blur-sm hover:scale-[1.01] transition-transform overflow-hidden flex flex-col`}>
                  <div className="h-32 sm:h-48 overflow-hidden shrink-0">
                    <img 
                      src={challenge.image}
                      alt={challenge.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <CardHeader className="p-4 md:p-6 flex-grow">
                    <div className="flex items-center gap-3 mb-2 md:mb-3">
                      <div className={`${challenge.bgColor} p-2 md:p-3 rounded-lg md:rounded-xl`}>
                        <Icon className={`w-4 h-4 md:w-6 md:h-6 ${challenge.color}`} />
                      </div>
                    </div>
                    <CardTitle className="text-lg md:text-2xl text-white mb-1 md:mb-3 leading-tight">{challenge.title}</CardTitle>
                    <CardDescription className="text-slate-300 text-xs md:text-sm leading-relaxed">
                      {challenge.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Threshold Matrix Component */}
      <section className="py-8 sm:py-24 px-4 bg-slate-900/50 backdrop-blur-sm relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-16">
            <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 px-3 sm:px-4 py-1.5 md:py-2 text-[10px] sm:text-sm mb-3 sm:mb-4">
              <Flame className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 inline" /> Severity Monitoring
            </Badge>
            <h2 className="text-white mb-3 sm:mb-6">
              Structural Degradation Zones
            </h2>
            <p className="text-sm md:text-xl text-slate-300 max-w-3xl mx-auto">
              Identify failure tiers early before internal damage triggers secondary power line shorts on panel interface controllers.
            </p>
          </div>

          <div className="scroll-row gap-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 md:grid-cols-3 sm:gap-6">
            {screenTiers.map((tier, index) => (
              <Card key={index} className="scroll-row-item w-[80%] sm:w-auto bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700 backdrop-blur-sm">
                <CardHeader className="p-4 md:p-6 pb-2 md:pb-4">
                  <CardTitle className="text-base sm:text-xl text-white flex items-center gap-2 md:gap-3 leading-tight">
                    <Monitor className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
                    {tier.component}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0 space-y-3 md:space-y-4">
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-1.5 md:p-2 text-center flex flex-col justify-center">
                      <div className="text-[9px] md:text-[10px] text-emerald-400 font-bold mb-0.5 md:mb-1">SAFE</div>
                      <div className="text-[10px] md:text-xs text-white font-bold leading-tight">{tier.safe}</div>
                    </div>
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-1.5 md:p-2 text-center flex flex-col justify-center">
                      <div className="text-[9px] md:text-[10px] text-yellow-400 font-bold mb-0.5 md:mb-1">WARN</div>
                      <div className="text-[10px] md:text-xs text-white font-bold leading-tight">{tier.warning}</div>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-1.5 md:p-2 text-center flex flex-col justify-center">
                      <div className="text-[9px] md:text-[10px] text-red-400 font-bold mb-0.5 md:mb-1">CRIT</div>
                      <div className="text-[10px] md:text-xs text-white font-bold leading-tight">{tier.critical}</div>
                    </div>
                  </div>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{tier.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Catalog */}
      <section className="py-8 sm:py-24 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-16">
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 px-3 sm:px-4 py-1.5 md:py-2 text-[10px] sm:text-sm mb-3 sm:mb-4">
              Precision Capabilities
            </Badge>
            <h2 className="text-white mb-3 sm:mb-6">
              Display Assembly Options
            </h2>
            <p className="text-sm md:text-xl text-slate-300 max-w-3xl mx-auto">
              Original equipment grade display solutions executed under clean workshop environments inside our Hawalli laboratory.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {repairCatalog.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <Card key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-800 backdrop-blur-sm hover:border-cyan-500/40 transition-all overflow-hidden flex flex-col">
                  <div className="relative h-32 sm:h-48 overflow-hidden shrink-0">
                    <img 
                      src={solution.image}
                      alt={solution.title}
                      className="w-full h-full object-cover opacity-75"
                      loading="lazy"
                    />
                    <div className="absolute top-2 right-2 md:top-3 md:right-3">
                      <Badge className="bg-slate-950/90 text-cyan-400 border border-cyan-500/30 text-[10px] md:text-sm px-2 py-0.5 md:px-3 md:py-1 font-bold">
                        {solution.price}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="p-4 md:p-6 flex-grow">
                    <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                      <div className="bg-slate-950 border border-slate-800 p-2 md:p-2.5 rounded-lg">
                        <Icon className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
                      </div>
                    </div>
                    <CardTitle className="text-base sm:text-xl text-white mb-1 md:mb-2 leading-tight">{solution.title}</CardTitle>
                    <div className="flex items-center gap-1.5 md:gap-2 mt-2 md:mt-auto">
                      <Clock className="w-3 h-3 md:w-4 md:h-4 text-cyan-400" />
                      <span className="text-xs sm:text-sm font-bold text-slate-300">{solution.duration}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="bg-slate-950/30 pt-3 md:pt-4 border-t border-slate-800 p-4 md:p-6">
                    <ul className="space-y-1.5 sm:space-y-2">
                      {solution.benefits.slice(0,3).map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 md:gap-2 text-slate-300 text-xs sm:text-sm">
                          <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span className="leading-tight">{benefit}</span>
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
      <section className="py-8 sm:py-24 px-4 bg-slate-900/30 border-t border-slate-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-16">
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-sm mb-3 sm:mb-4">
              Lab Interventions
            </Badge>
            <h2 className="text-white mb-3 sm:mb-6">
              Cross-Platform Display Engineering
            </h2>
          </div>

          <div className="scroll-row gap-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 sm:gap-6">
            {brandMatrix.map((brand, index) => (
              <Card key={index} className="scroll-row-item w-[85%] sm:w-auto bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-800 backdrop-blur-sm">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-2xl text-white mb-2">{brand.brand}</CardTitle>
                  <Badge className="bg-slate-950 text-slate-400 border border-slate-800 w-fit">{brand.models}</Badge>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
                  <div>
                    <h4 className="text-cyan-400 font-bold text-[10px] sm:text-xs uppercase tracking-wider mb-1">Technical Scope:</h4>
                    <p className="text-slate-300 text-xs sm:text-sm">{brand.expertise}</p>
                  </div>
                  <div>
                    <h4 className="text-orange-400 font-bold text-[10px] sm:text-xs uppercase tracking-wider mb-1">Dominant Structural Failures:</h4>
                    <p className="text-slate-400 text-xs sm:text-sm">{brand.common}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Preventative Rules Grid */}
      <section className="py-8 sm:py-24 px-4 relative z-10 border-t border-slate-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-16">
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-sm mb-3 sm:mb-4">
              Preservation Playbook
            </Badge>
            <h2 className="text-white mb-3 sm:mb-6">
              Display Maintenance Protocols
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
            {preventionGuide.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <Card key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-800 backdrop-blur-sm">
                  <CardHeader className="p-4 md:p-6">
                    <div className="flex items-center gap-3 sm:gap-4 mb-2">
                      <div className="bg-cyan-500/10 p-2 sm:p-3 rounded-lg flex-shrink-0">
                        <Icon className="w-4 h-4 md:w-6 md:h-6 text-cyan-400" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-base sm:text-xl text-white mb-1 leading-tight">{tip.title}</CardTitle>
                        <Badge className="bg-emerald-500/20 text-emerald-300 border-0 text-[9px] sm:text-xs">
                          {tip.frequency}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription className="text-slate-300 text-xs sm:text-sm leading-relaxed mt-2 sm:mt-3">
                      {tip.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 sm:py-24 px-4 border-t border-slate-900 bg-slate-900/20">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-white mb-3 sm:mb-6">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {faq.map((item, index) => (
              <Card key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-800 backdrop-blur-sm">
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

      {/* High-Conversion CTA Component */}
      <section className="py-8 sm:py-24 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <Card className="bg-gradient-to-br from-emerald-600/20 via-blue-600/20 to-cyan-600/20 border-cyan-500/30 backdrop-blur-sm overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500"></div>
            <CardContent className="p-6 sm:p-12 text-center relative z-10">
              <h2 className="text-2xl sm:text-5xl font-bold text-white mb-3 sm:mb-6 leading-tight">
                Restore Your Display Panel Architecture Safely
              </h2>
              <p className="text-xs sm:text-xl text-slate-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
                No Fix, No Charge policy. Complimentary vehicle collection and delivery across all governorates in Kuwait. Restoring panel health with flawless precision.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-black text-sm sm:text-lg px-6 sm:px-8 py-5 sm:py-7 shadow-lg shadow-cyan-500/30"
                  asChild
                >
                  <Link to="/book">
                    Book Free Pickup
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-slate-700 text-white hover:bg-slate-800 text-sm sm:text-lg px-6 sm:px-8 py-5 sm:py-7"
                  asChild
                >
                  <a href={`tel:+${business.telephone}`}>
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Call Intake: +{business.telephone}
                  </a>
                </Button>
              </div>
              <div className="mt-6 sm:mt-10 pt-6 sm:pt-8 border-t border-slate-800 flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-400">
                <span className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" /> {business.streetAddress}
                </span>
                <span className="flex items-center gap-2">
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" /> Complimentary Diagnostics
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
