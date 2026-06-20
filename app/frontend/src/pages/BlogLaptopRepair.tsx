import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ChevronDown,
  Phone,
  MessageCircle,
  MapPin,
  Cpu,
  Laptop,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Zap,
  Battery,
} from 'lucide-react';
import { BUSINESS_INFO } from '../constants/data';
import MetaSEO from '../components/seo/MetaSEO';
import SchemaMarkup from '../components/seo/SchemaMarkup';

const PAGE_URL = `${BUSINESS_INFO.url}/blog/laptop-repair-kuwait-2026`;
const LOCAL_LOGO_URL = '/logo.png';
const HERO_IMAGE_URL = '/images/blog/laptop-repair-kuwait.webp';
const PUBLISHED_DATE = '2026-06-14T08:00:00+03:00';
const MODIFIED_DATE = '2026-06-14T08:00:00+03:00';

const WA_LINK = `https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${encodeURIComponent(
  'Hi KCROC, I read your guide on laptop repair and need a diagnostic. Please arrange a free pickup.'
)}`;

const HARDWARE_FAILURES = [
  {
    icon: Cpu,
    t: 'Overheating & Throttling',
    d: 'Clogged heatsinks and degraded thermal paste. Solution: Deep cleaning and fresh thermal interface material application.',
  },
  {
    icon: Zap,
    t: 'Dead / No Power',
    d: 'Power surges or shorts on the motherboard. Solution: Component-level motherboard diagnostics and repair.',
  },
  {
    icon: Battery,
    t: 'Swollen Battery',
    d: 'Heat exposure can degrade lithium cells over time. Solution: OEM battery replacement and thermal optimization.',
  },
  {
    icon: Laptop,
    t: 'Hinge Failure',
    d: 'Repeated opening and closing can stress hinge mounts and chassis plastic. Solution: Hinge replacement or chassis repair.',
  },
];

const REPAIR_PROCESS = [
  {
    s: 'Free Pickup Across Kuwait',
    d: 'Book your repair and we collect your laptop from home or office at no charge across Kuwait.',
  },
  {
    s: 'Comprehensive Diagnostics',
    d: 'Our technicians perform component-level testing at our Hawalli lab to identify the exact failure.',
  },
  {
    s: 'Transparent Quote',
    d: 'We provide a clear quote before any repair starts. If we cannot fix it, you do not pay for the repair attempt.',
  },
  {
    s: 'Testing & Delivery',
    d: 'Every repaired device is stress-tested before it is returned with warranty coverage.',
  },
];

const FAQ_ITEMS = [
  {
    q: 'Why do laptops overheat so quickly in Kuwait?',
    a: "Kuwait's high ambient temperatures and dust can reduce airflow through a laptop's cooling system, which increases heat buildup and can trigger throttling.",
  },
  {
    q: "What happens to thermal paste in Kuwait's heat?",
    a: 'Repeated heating and cooling cycles can dry out or shift thermal paste over time, reducing heat transfer from the CPU or GPU to the heatsink.',
  },
  {
    q: 'Do you offer free pickup and delivery?',
    a: 'Yes, we offer free pickup and delivery across Kuwait, including Hawalli, Salmiya, Farwaniya, Mangaf, Fahaheel, Jahra, and Kuwait City.',
  },
  {
    q: 'What is component-level micro-soldering?',
    a: 'It is board-level repair that targets individual chips, capacitors, or connectors instead of replacing the full motherboard.',
  },
  {
    q: 'What does No Fix, No Fee mean?',
    a: 'If we cannot complete the repair after diagnostics, you do not pay for the repair attempt.',
  },
  {
    q: 'How much does laptop repair cost in Kuwait?',
    a: 'Pricing depends on the model, part availability, and the severity of the issue. Diagnostics are free, and we share the quote before work begins.',
  },
  {
    q: 'Can gaming laptops be repaired?',
    a: 'Yes. We repair gaming laptops from brands like ASUS ROG, MSI, Lenovo Legion, Acer Predator, and Alienware.',
  },
  {
    q: 'Do you repair MacBooks?',
    a: 'Yes, we repair Intel and Apple Silicon MacBooks, including logic board issues, battery problems, and liquid damage cases.',
  },
  {
    q: 'How long does laptop repair take?',
    a: 'Simple jobs may be completed the same day, while board-level repairs can take longer depending on diagnosis and parts.',
  },
  {
    q: 'Do you provide warranty?',
    a: 'Yes, successful repairs come with warranty coverage. The exact terms depend on the repair type and replaced parts.',
  },
];

const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${BUSINESS_INFO.url}/#organization`,
      name: BUSINESS_INFO.name,
      url: BUSINESS_INFO.url,
      logo: `${BUSINESS_INFO.url}${LOCAL_LOGO_URL}`,
      telephone: BUSINESS_INFO.phone,
      sameAs: [
        'https://www.facebook.com/computerrepairkuwait',
        'https://www.instagram.com/computerrepairkuwait',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        telephone: BUSINESS_INFO.phone,
        url: BUSINESS_INFO.url,
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${BUSINESS_INFO.url}/#website`,
      url: BUSINESS_INFO.url,
      name: BUSINESS_INFO.name,
      publisher: { '@id': `${BUSINESS_INFO.url}/#organization` },
    },
    {
      '@type': ['LocalBusiness', 'ComputerStore'],
      '@id': `${BUSINESS_INFO.url}/#store`,
      name: BUSINESS_INFO.name,
      url: BUSINESS_INFO.url,
      telephone: BUSINESS_INFO.phone,
      image: `${BUSINESS_INFO.url}${HERO_IMAGE_URL}`,
      logo: {
        '@type': 'ImageObject',
        url: `${BUSINESS_INFO.url}${LOCAL_LOGO_URL}`,
        width: 512,
        height: 512,
      },
      parentOrganization: { '@id': `${BUSINESS_INFO.url}/#organization` },
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19',
        addressLocality: 'Hawalli',
        addressRegion: 'Hawalli Governorate',
        addressCountry: 'KW',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 29.3364,
        longitude: 48.0146,
      },
      areaServed: ['Hawalli', 'Salmiya', 'Farwaniya', 'Kuwait City', 'Mangaf', 'Fahaheel', 'Jahra'],
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'https://schema.org/Saturday',
            'https://schema.org/Sunday',
            'https://schema.org/Monday',
            'https://schema.org/Tuesday',
            'https://schema.org/Wednesday',
            'https://schema.org/Thursday',
            'https://schema.org/Friday',
          ],
          opens: '10:00',
          closes: '22:00',
        },
      ],
      sameAs: [
        'https://www.facebook.com/computerrepairkuwait',
        'https://www.instagram.com/computerrepairkuwait',
      ],
    },
    {
      '@type': 'Service',
      '@id': `${PAGE_URL}#service`,
      name: 'Laptop Repair in Kuwait',
      serviceType: 'Laptop Repair',
      description:
        'Laptop repair services in Kuwait including overheating fixes, battery replacement, screen repair, and motherboard-level diagnostics.',
      provider: { '@id': `${BUSINESS_INFO.url}/#store` },
      areaServed: ['Hawalli', 'Salmiya', 'Farwaniya', 'Kuwait City', 'Mangaf', 'Fahaheel', 'Jahra'],
      url: PAGE_URL,
    },
    {
      '@type': 'WebPage',
      '@id': PAGE_URL,
      url: PAGE_URL,
      name: 'Laptop Repair Kuwait: The 2026 Guide to Hardware Preservation',
      description:
        "An in-depth look at how Kuwait's climate impacts laptop hardware, thermal management, and KCROC's professional component-level repair techniques.",
      isPartOf: { '@id': `${BUSINESS_INFO.url}/#website` },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: `${BUSINESS_INFO.url}${HERO_IMAGE_URL}`,
      },
      about: { '@id': `${PAGE_URL}#service` },
    },
    {
      '@type': 'Article',
      mainEntityOfPage: { '@id': PAGE_URL },
      headline: 'Laptop Repair in Kuwait: The 2026 Guide to Hardware Preservation',
      description:
        "An in-depth look at how Kuwait's climate impacts laptop hardware, thermal management, and KCROC's professional component-level repair techniques.",
      image: `${BUSINESS_INFO.url}${HERO_IMAGE_URL}`,
      author: {
        '@type': 'Person',
        name: 'Imran Natiq',
        jobTitle: 'Computer Technician',
        worksFor: { '@id': `${BUSINESS_INFO.url}/#organization` },
        url: `${BUSINESS_INFO.url}/about`,
      },
      publisher: { '@id': `${BUSINESS_INFO.url}/#organization` },
      datePublished: PUBLISHED_DATE,
      dateModified: MODIFIED_DATE,
      articleSection: 'Tech Guides',
      inLanguage: 'en',
      wordCount: 1500,
      isAccessibleForFree: true,
      keywords: [
        'Laptop Repair Kuwait',
        'Gaming Laptop Repair Kuwait',
        'Laptop Overheating Kuwait',
        'MacBook Repair Kuwait',
        'Motherboard Repair Kuwait',
        'Laptop Repair Hawalli',
      ],
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', '#climatological-catalyst p', '#thermal-management p'],
      },
      hasPart: [
        { '@type': 'WebPageElement', name: 'The Climatological Catalyst',  url: `${PAGE_URL}#climatological-catalyst` },
        { '@type': 'WebPageElement', name: 'Thermal Management',           url: `${PAGE_URL}#thermal-management` },
        { '@type': 'WebPageElement', name: 'Common Hardware Failures',     url: `${PAGE_URL}#common-hardware-failures` },
        { '@type': 'WebPageElement', name: 'Repair Process',               url: `${PAGE_URL}#repair-process` },
        { '@type': 'WebPageElement', name: 'FAQ',                          url: `${PAGE_URL}#frequently-asked-questions` },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BUSINESS_INFO.url },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BUSINESS_INFO.url}/blog` },
        { '@type': 'ListItem', position: 3, name: 'Laptop Repair Kuwait 2026', item: PAGE_URL },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${PAGE_URL}#faq`,
      mainEntity: FAQ_ITEMS.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    },
  ],
};

const FAQItem = React.memo(({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  const id = q.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return (
    <div className="bg-slate-900/30 backdrop-blur-md p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        id={`${id}-button`}
        className="w-full flex justify-between items-center font-black text-white hover:text-cyan-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg text-left"
      >
        <span>{q}</span>
        <ChevronDown
          className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-button`}
        className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <p className="text-slate-400 text-sm leading-relaxed overflow-hidden m-0">{a}</p>
      </div>
    </div>
  );
});
FAQItem.displayName = 'FAQItem';

export default function BlogLaptopRepair() {
  return (
    <main className="w-full min-h-screen bg-transparent text-slate-200 selection:bg-cyan-500/30 scroll-smooth">
      <MetaSEO
        title="Laptop Repair Kuwait | 2026 Guide to Hardware Preservation | KCROC"
        description="Expert laptop repair in Kuwait. Overheating fixes, MacBook logic board micro-soldering, and free pickup across all governorates by KCROC."
        canonical={PAGE_URL}
      />
      <SchemaMarkup schema={STRUCTURED_DATA} />

      <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-6 pt-24 md:pt-32 relative z-10">
        <ol className="flex items-center space-x-2 text-sm text-slate-400 font-medium">
          <li>
            <Link
              to="/"
              className="hover:text-cyan-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <span className="text-slate-600" aria-hidden="true">/</span>
          </li>
          <li>
            <Link
              to="/blog"
              className="hover:text-cyan-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded transition-colors"
            >
              Blog
            </Link>
          </li>
          <li>
            <span className="text-slate-600" aria-hidden="true">/</span>
          </li>
          <li aria-current="page" className="text-cyan-400">
            Laptop Repair Kuwait 2026
          </li>
        </ol>
      </nav>

      <section className="relative pt-8 pb-16 px-6 text-center z-10">
        <div
          className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-cyan-600/20 blur-[120px] rounded-full pointer-events-none"
          aria-hidden="true"
        />
        <header className="max-w-4xl mx-auto relative z-10">
          <span className="text-cyan-400 font-black tracking-widest uppercase text-xs">
            Technical Engineering Guide
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mt-4 mb-6 leading-tight tracking-tight">
            Laptop Repair in Kuwait:
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              Hardware Preservation
            </span>
          </h1>
          <div className="text-sm text-slate-400 font-medium mb-12 flex flex-wrap items-center justify-center gap-2">
            <time dateTime={PUBLISHED_DATE}>June 14, 2026</time>
            <span aria-hidden="true">•</span>
            <span>8 min read</span>
          </div>
          <img
            src={HERO_IMAGE_URL}
            alt="Laptop motherboard repair and thermal maintenance in Kuwait"
            width="1200"
            height="630"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="rounded-3xl border border-slate-700/50 shadow-[0_0_40px_rgba(34,211,238,0.15)] mb-12 object-cover w-full aspect-[1200/630]"
          />
        </header>
      </section>

      <nav className="max-w-4xl mx-auto px-6 mb-12" aria-label="Table of Contents">
        <div className="bg-slate-900/30 backdrop-blur-md p-8 rounded-3xl border border-slate-800">
          <h2 className="font-black text-white mb-4 text-lg">Table of Contents</h2>
          <ul className="grid md:grid-cols-2 gap-3 text-sm text-slate-400">
            {[
              { id: 'climatological-catalyst',  label: 'The Climatological Catalyst' },
              { id: 'thermal-management',         label: 'Thermal Management & Pump-Out' },
              { id: 'common-hardware-failures',   label: 'Common Hardware Failures' },
              { id: 'repair-process',             label: 'The Zero-Risk Repair Process' },
              { id: 'frequently-asked-questions', label: 'Frequently Asked Questions' },
            ].map((item) => (
              <li key={item.id}>
                {/* Restored the opening <a tag here */}
                <a
                  href={`#${item.id}`}
                  className="hover:text-cyan-400 focus:text-cyan-400 focus:outline-none focus-visible:underline transition-colors flex items-center gap-2 rounded"
                >
                  <span className="text-cyan-500/50" aria-hidden="true">#</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-6 pb-12 relative z-10">
        <div className="prose prose-invert prose-lg max-w-none">

          <section id="climatological-catalyst" className="scroll-mt-32">
            <h2 className="text-3xl font-black text-white mb-6">The Climatological Catalyst</h2>
            <p className="text-slate-300 mb-4">
              Based on real repair cases in our Kuwait workshop, Kuwait&apos;s environment presents a harsh challenge for laptop health. High ambient temperatures combined with fine dust create a thermal bottleneck. Dust blocks cooling fins while humidity and airborne contaminants accelerate oxidation on exposed circuitry.
              We provide <strong>free pickup and delivery throughout Hawalli, Salmiya, Farwaniya, Mangaf, Fahaheel, Jahra, and Kuwait City</strong> to ensure your devices are safely transported to our lab.
            </p>
            <ul className="text-slate-400 mt-4 space-y-2">
              <li>
                <strong className="text-white">The Dust Trap:</strong> Fine particulate matter can coat cooling fin assemblies and reduce airflow.
              </li>
              <li>
                <strong className="text-white">Conductive Corrosion:</strong> Coastal humidity and contaminants can increase the risk of oxidation on sensitive components.
              </li>
            </ul>
          </section>

          <section id="thermal-management" className="scroll-mt-32">
            <h2 className="text-3xl font-black text-white mt-16 mb-8">
              Thermal Management &amp; The Pump-Out Effect
            </h2>
            <p className="text-slate-300 mb-4">
              Standard factory cooling systems are not engineered for Kuwait&apos;s extreme thermal cycling. The constant shift between an air-conditioned room and outdoor heat can cause thermal paste to migrate away from the CPU die, reducing cooling efficiency.
            </p>
            <p className="text-slate-300 mb-4">
              To solve this, our Hawalli lab utilizes phase-change materials such as Honeywell PTM7950. These materials are designed to help maintain a stable thermal interface under load and reduce long-term paste migration issues.
            </p>
          </section>

          <section id="common-hardware-failures" className="scroll-mt-32">
            <h2 className="text-3xl font-black text-white mt-16 mb-8 flex items-center gap-3">
              <AlertTriangle className="text-amber-400" aria-hidden="true" />
              Common Hardware Failures in Kuwait
            </h2>
            <p className="text-slate-300 mb-6">
              When thermal limits fail, hardware problems often follow. Minor drops or hinge stress may require screen or chassis repair, while severe power issues often need board-level diagnostics.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {HARDWARE_FAILURES.map((issue) => (
                <div
                  key={issue.t}
                  className="bg-slate-900/30 backdrop-blur-md p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-colors"
                >
                  <issue.icon className="text-cyan-400 mb-3" aria-hidden="true" />
                  <h3 className="font-bold text-white text-xl m-0">{issue.t}</h3>
                  <p className="text-slate-400 text-sm mt-2 leading-relaxed m-0">{issue.d}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="repair-process" className="scroll-mt-32">
            <h2 className="text-3xl font-black text-white mt-16 mb-8">
              The KCROC Zero-Risk Repair Process
            </h2>
            <p className="text-slate-300 mb-6">
              Explore our full repair workflow to see how our process protects your device and your budget.
            </p>
            <div className="space-y-4">
              {REPAIR_PROCESS.map((step, i) => (
                <div
                  key={step.s}
                  className="bg-slate-900/30 backdrop-blur-md p-6 rounded-2xl border border-slate-800"
                >
                  <h3 className="font-bold text-white mb-2 text-xl m-0">
                    {i + 1}. {step.s}
                  </h3>
                  <p className="text-slate-400 text-sm m-0 leading-relaxed">{step.d}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="frequently-asked-questions" className="scroll-mt-32">
            <h2 className="text-3xl font-black text-white mt-16 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {FAQ_ITEMS.map((faq) => (
                <FAQItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </section>

        </div>
      </article>

      <section aria-labelledby="related-heading" className="max-w-4xl mx-auto px-6 pb-16">
        <div className="bg-slate-900/30 backdrop-blur-md p-8 rounded-3xl border border-slate-800">
          <h2 id="related-heading" className="text-2xl font-black text-white mb-6">
            Related Guides
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              to="/laptop-screen-repair-kuwait"
              className="group bg-slate-950 p-6 rounded-2xl border border-slate-700 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <span className="font-bold text-slate-300 group-hover:text-cyan-400 transition-colors">
                Laptop Screen Repair
              </span>
              <span className="text-cyan-500 group-hover:translate-x-1 transition-transform" aria-hidden="true">
                →
              </span>
            </Link>
            <Link
              to="/macbook-repair-kuwait"
              className="group bg-slate-950 p-6 rounded-2xl border border-slate-700 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <span className="font-bold text-slate-300 group-hover:text-cyan-400 transition-colors">
                MacBook Repair
              </span>
              <span className="text-cyan-500 group-hover:translate-x-1 transition-transform" aria-hidden="true">
                →
              </span>
            </Link>
            <Link
              to="/motherboard-repair-kuwait"
              className="group bg-slate-950 p-6 rounded-2xl border border-slate-700 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <span className="font-bold text-slate-300 group-hover:text-cyan-400 transition-colors">
                Motherboard Repair
              </span>
              <span className="text-cyan-500 group-hover:translate-x-1 transition-transform" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="author-heading" className="max-w-4xl mx-auto px-6 pb-16">
        <div className="bg-slate-900/40 backdrop-blur-md p-8 rounded-3xl border border-cyan-500/30">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="flex-shrink-0">
              <img
                src={LOCAL_LOGO_URL}
                alt="KCROC Logo"
                width="96"
                height="96"
                loading="lazy"
                decoding="async"
                className="w-24 h-24 rounded-full border-2 border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.2)] object-contain bg-slate-900 p-2"
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <h2 id="author-heading" className="text-2xl font-black text-white m-0">
                  About KCROC
                </h2>
                <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  <ShieldCheck size={14} aria-hidden="true" /> 20+ Years Experience
                </span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                KCROC is a Kuwait-based technical center with experience in component-level diagnostics, micro-soldering, gaming laptop repair, and MacBook logic board restoration.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  'Chip-Level Diagnostics',
                  'Thermal Engineering',
                  'Gaming Laptop Repair',
                  'MacBook Repair',
                  'Motherboard Repair',
                  'Free Pickup & Delivery',
                ].map((badge) => (
                  <span key={badge} className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
                    <CheckCircle2 size={14} className="text-cyan-500 flex-shrink-0" aria-hidden="true" />
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="cta-heading" className="max-w-4xl mx-auto px-6 pb-24">
        <div className="bg-slate-900/50 backdrop-blur-xl p-10 rounded-3xl border border-cyan-500/50 text-center shadow-[0_0_40px_rgba(34,211,238,0.15)] relative overflow-hidden">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"
            aria-hidden="true"
          />
          <h2 id="cta-heading" className="text-3xl md:text-4xl font-black text-white mb-4">
            Need Expert Laptop Repair Today?
          </h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Free pickup &amp; delivery • Same-day service • Warranty included
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-10 text-sm font-bold text-cyan-100">
            {[
              { icon: CheckCircle2, text: 'Chip-Level Diagnostics',   cls: 'text-emerald-400' },
              { icon: CheckCircle2, text: 'Thermal Engineering',        cls: 'text-emerald-400' },
              { icon: CheckCircle2, text: 'Gaming Laptop Repair',       cls: 'text-emerald-400' },
              { icon: CheckCircle2, text: 'MacBook Repair',             cls: 'text-emerald-400' },
              { icon: Clock,        text: 'Same-Day Service Available', cls: 'text-amber-400' },
            ].map(({ icon: Icon, text, cls }) => (
              <span key={text} className="flex items-center gap-2">
                <Icon size={16} className={`${cls} flex-shrink-0`} aria-hidden="true" />
                {text}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            
            {/* Restored the opening <a tag here */}
            <a
              href={WA_LINK}
              aria-label="Request consultation via WhatsApp"
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-8 py-4 rounded-full transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:scale-[1.02] flex justify-center items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 focus-visible:ring-cyan-400"
            >
              <MessageCircle size={20} aria-hidden="true" />
              Book Free Pickup
            </a>
            
            {/* Restored the opening <a tag here */}
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              aria-label={`Call KCROC at ${BUSINESS_INFO.phone}`}
              className="bg-slate-950 border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-900 text-white font-bold px-8 py-4 rounded-full transition-all flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 focus-visible:ring-cyan-400"
            >
              <Phone size={20} aria-hidden="true" />
              {BUSINESS_INFO.phone}
            </a>

          </div>
          <p className="text-emerald-400 font-bold text-sm mt-6 mb-2">No obligation consultation.</p>
          <p className="text-slate-500 text-xs">
            <MapPin size={14} className="inline mr-1" aria-hidden="true" />
            Hawalli, Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19
          </p>
        </div>
      </section>
    </main>
  );
}
