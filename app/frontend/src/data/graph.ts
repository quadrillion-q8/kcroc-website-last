// File: app/frontend/src/data/graph.ts
import {
  RawGraphData, RoutableEntity, LocationEntity, ServiceEntity,
  FAQEntity, WebPageEntity, BusinessEntity, USPEntity, TrustBadgeEntity,
  ProcessEntity, StatsEntity, FooterEntity, ReviewsEntity
} from '../types/knowledgeGraph';

const rawGraphData: RawGraphData = {
  metadata: {
    version: '3.2.0',
    lastUpdated: '2026-07-08T00:00:00+03:00',
    environment: 'production'
  },

  entities: {

    /* ═══════════════════════════════════════════════════════════════
       BUSINESS ENTITY — Primary anchor for all schema @id references
       ═══════════════════════════════════════════════════════════════ */
    'biz-kcroc': {
      id: 'biz-kcroc',
      entityType: 'Business',
      isActive: true,
      title: 'Kuwait Computer Repair On Call',
      legalName: 'Kuwait Computer Repair On Call',
      alternateName: 'KCROC',
      telephone: '96555301913',
      streetAddress: 'Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19',
      addressLocality: 'Hawalli',
      addressRegion: 'Hawalli Governorate',
      addressCountry: 'KW',
      coords: { lat: 29.3356, lng: 48.0250 },
      websiteUrl: 'https://www.computerrepairkuwait.com',
      logoUrl: 'https://www.computerrepairkuwait.com/logo.png',
      email: 'quadrillion1980@gmail.com',
      priceRange: '$$',
      openingHours: 'Open daily 10:00 AM – 10:00 PM',
      schemaOpeningHours: {
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
        opens: '10:00',
        closes: '22:00'
      },
      aggregateRating: {
        ratingValue: '4.9',
        reviewCount: 150,
        bestRating: 5
      },
      socialLinks: {
        facebook: 'https://www.facebook.com/computerrepairkuwait',
        instagram: 'https://www.instagram.com/computerrepairkuwait'
      },
      aiSummary: 'Kuwait Computer Repair On Call (KCROC) is a Hawalli-based component-level computer repair specialist. Services include MacBook logic board micro-soldering, laptop screen replacement, gaming PC thermal repair, motherboard chip-level diagnostics, SSD upgrades, and virus removal. Free pickup and delivery across all Kuwait governorates. 30-day warranty on all repairs. No Fix, No Fee policy.',
    } as BusinessEntity,

    /* ═══════════════════════════════════════════════════════════════
       TRUST BADGES
       ═══════════════════════════════════════════════════════════════ */
    'badge-privacy':  { id: 'badge-privacy',  entityType: 'TrustBadge', isActive: true, title: 'Data Privacy Guaranteed', iconKey: 'ShieldCheck' } as TrustBadgeEntity,
    'badge-pickup':   { id: 'badge-pickup',   entityType: 'TrustBadge', isActive: true, title: 'Free Pick & Drop',        iconKey: 'Truck'       } as TrustBadgeEntity,
    'badge-warranty': { id: 'badge-warranty', entityType: 'TrustBadge', isActive: true, title: '30-Day Warranty',          iconKey: 'Clock'       } as TrustBadgeEntity,
    'badge-esd':      { id: 'badge-esd',      entityType: 'TrustBadge', isActive: true, title: 'ESD-Safe Lab',             iconKey: 'Zap'         } as TrustBadgeEntity,

    /* ═══════════════════════════════════════════════════════════════
       STATS
       ═══════════════════════════════════════════════════════════════ */
    'stats-row': {
      id: 'stats-row', entityType: 'Stats', isActive: true, title: 'Homepage Stats',
      items: [
        { label: 'Repairs completed', value: '500+',    sub: 'Since launch across Kuwait' },
        { label: 'Success rate',       value: '98%',     sub: 'On complex logic board repairs' },
        { label: 'Warranty',           value: '30 days', sub: 'All parts and labour' },
        { label: 'Pick & drop',        value: 'Free',    sub: 'Zero hidden transport fees' }
      ]
    } as StatsEntity,

    /* ═══════════════════════════════════════════════════════════════
       USPs — Core Business Differentiators
       ═══════════════════════════════════════════════════════════════ */
    'usp-component': {
      id: 'usp-component', entityType: 'USP', isActive: true, iconKey: 'Cpu',
      title: 'Component-Level Repair',
      description: 'We diagnose the board itself using micro-soldering and trace repair — not just replace it. This saves you from paying for an entirely new motherboard and keeps your original data intact.',
      differentiator: 'Most shops in Kuwait replace the whole board. We fix the one failed chip.'
    } as USPEntity,
    'usp-nofix': {
      id: 'usp-nofix', entityType: 'USP', isActive: true, iconKey: 'ShieldCheck',
      title: 'No Fix, No Fee',
      description: 'Our diagnostics are precise and risk-free. If your device is catastrophically damaged or not economically repairable, you pay absolutely nothing — not even for the diagnostic.',
      differentiator: 'You only pay when your device is fully repaired and working.'
    } as USPEntity,
    'usp-logistics': {
      id: 'usp-logistics', entityType: 'USP', isActive: true, iconKey: 'Truck',
      title: 'Free Pick & Drop — All Kuwait',
      description: 'We cover Hawalli, Salmiya, Kuwait City, Farwaniya, Ahmadi, Jahra, and beyond. Our courier collects from your home or office and returns the repaired device directly to you.',
      differentiator: 'No need to leave your home or office. We handle the traffic.'
    } as USPEntity,
    'usp-privacy': {
      id: 'usp-privacy', entityType: 'USP', isActive: true, iconKey: 'Lock',
      title: 'Strict Data Privacy',
      description: 'We operate under strict hardware-only protocols. Our technicians use diagnostic tools — not your files. For board-level repairs, you can safely remove your hard drive before handing over the device.',
      differentiator: 'Your personal files are never opened, accessed, or browsed during repair.'
    } as USPEntity,
    'usp-climate': {
      id: 'usp-climate', entityType: 'USP', isActive: true, iconKey: 'Thermometer',
      title: 'Kuwait Climate Expertise',
      description: 'Kuwait\'s extreme heat and dust accelerate hardware failure. We apply phase-change thermal materials and perform ultrasonic cleaning specifically tuned for our climate — not generic procedures.',
      differentiator: 'We know exactly how Kuwait summers destroy laptops. We fix that specifically.'
    } as USPEntity,

    /* ═══════════════════════════════════════════════════════════════
       PROCESS
       ═══════════════════════════════════════════════════════════════ */
    'proc-standard': {
      id: 'proc-standard', entityType: 'Process', isActive: true, title: 'Standard Repair Process',
      steps: [
        {
          step: 1,
          title: 'Free collection — we come to you',
          description: 'Book via WhatsApp. Our driver collects your device directly from your doorstep across all Kuwait — no deposit, no minimum spend. We tag and log every device for full chain-of-custody tracking.'
        },
        {
          step: 2,
          title: 'Precision diagnostic — no guesswork',
          description: 'Your device enters our Hawalli lab where technicians use thermal imaging, digital multimeters, and boardview software to trace the exact component failure. You receive a fixed quote before we touch a tool.'
        },
        {
          step: 3,
          title: 'Repair, stress-test, and return',
          description: 'We execute the micro-soldering or hardware replacement, then stress-test the system under full load for stability. If it passes, we deliver it back. If we can\'t fix it, you pay nothing.'
        }
      ]
    } as ProcessEntity,

    /* ═══════════════════════════════════════════════════════════════
       PAGES
       ═══════════════════════════════════════════════════════════════ */
    'page-home': {
      id: 'page-home', slug: '', entityType: 'WebPage', isActive: true,
      title: 'Home',
      description: 'KCROC Homepage — Component-level computer repair in Kuwait',
      seo: {
        title: 'Computer Repair Kuwait | Laptop & MacBook Repair – Free Pick & Drop | Kuwait Computer Repair On Call',
        description: 'Same-day laptop, MacBook & PC repair in Kuwait by KCROC. Free Pick & Drop across Hawalli, Salmiya, Kuwait City & all governorates. 4.9★ rated, 30-day warranty. Call +965 55301913.',
        canonicalUrl: 'https://www.computerrepairkuwait.com',
        ogType: 'website',
        schemaTypes: ['LocalBusiness', 'WebSite', 'WebPage']
      },
      hero: {
        headline: 'Kuwait\'s Expert Component-Level Repair Service.',
        subheadline: 'We fix the board. We don\'t just swap it.',
        description: 'We diagnose and repair failed components at board level — restoring devices that most repair shops in Kuwait would simply declare beyond repair.',
        primaryCTA:   { text: 'WhatsApp a Technician', route: 'https://wa.me/96555301913' },
        secondaryCTA: { text: 'View All Services',      route: '/services' }
      },
      featuredFAQIds:   ['faq-pick-and-drop', 'faq-liquid-damage', 'faq-no-fix'],
      featuredUSPIds:   ['usp-component', 'usp-nofix', 'usp-logistics', 'usp-privacy']
    } as WebPageEntity,

    'page-services': {
      id: 'page-services', slug: 'services', entityType: 'WebPage', isActive: true,
      title: 'Services',
      description: 'All KCROC repair services',
      seo: {
        title: 'Computer Repair Services in Kuwait | Laptop, MacBook & PC | KCROC',
        description: 'Expert laptop repair, MacBook repair, gaming PC diagnostics, motherboard chip-level repair, and screen replacement in Kuwait. Free pickup. 30-day warranty.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/services',
        ogType: 'website',
        schemaTypes: ['CollectionPage', 'LocalBusiness']
      }
    } as WebPageEntity,

    'page-blog': {
      id: 'page-blog', slug: 'blog', entityType: 'WebPage', isActive: true,
      title: 'Tech Blog',
      description: 'Expert repair guides and tech insights.',
      seo: {
        title: 'KCROC Tech Blog | Computer Repair Guides Kuwait',
        description: 'Expert computer repair guides, laptop fixes, MacBook troubleshooting, and PC performance tips in Kuwait.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/blog',
        ogType: 'website',
        schemaTypes: ['CollectionPage']
      }
    } as WebPageEntity,

    /* ═══════════════════════════════════════════════════════════════
       SERVICES
       ═══════════════════════════════════════════════════════════════ */
    'srv-macbook': {
      id: 'srv-macbook', slug: 'macbook-repair-kuwait', entityType: 'Service', isActive: true,
      title: 'MacBook Repair Kuwait',
      iconKey: 'apple',
      shortDescription: 'Liquid spills, dead logic boards, USB-C failures. Chip-level Apple hardware restoration.',
      description: 'Our MacBook repair service goes beyond what Apple Authorized Centers offer.',
      repairLevel: 'chip-level',
      estimatedTurnaround: '24-48 Hours',
      pricing: { startingFrom: 25, currency: 'KWD', quoteRequired: true, displayLabel: 'From 25 KWD' },
      coreFeatures: ['Logic Board Micro-Soldering', 'USB-C Power IC Replacement', 'Liquid Damage Ultrasonic Cleaning', 'Data Preserved'],
      brands: ['MacBook Air', 'MacBook Pro'],
      commonIssues: [],
      warranty: { duration: '30 Days', coverage: 'All parts and labor.', noFixNoFee: true },
      seo: { title: 'MacBook Repair Kuwait', description: 'Expert MacBook repair.', canonicalUrl: 'https://www.computerrepairkuwait.com/macbook-repair-kuwait', ogType: 'article', schemaTypes: ['Service'] }
    } as ServiceEntity,

    'srv-laptop': {
      id: 'srv-laptop', slug: 'laptop-repair-kuwait', entityType: 'Service', isActive: true,
      title: 'Laptop Repair Kuwait',
      iconKey: 'laptop',
      shortDescription: 'Screen, battery, keyboard, charging port, and motherboard repair.',
      description: 'Kuwait\'s climate causes specific hardware failure patterns.',
      repairLevel: 'advanced',
      estimatedTurnaround: 'Same Day / 24 Hours',
      pricing: { startingFrom: 15, currency: 'KWD', quoteRequired: true, displayLabel: 'From 15 KWD' },
      coreFeatures: ['Screen Replacement', 'Battery Replacement', 'Keyboard Repair', 'Charging Port Repair'],
      brands: ['Dell', 'HP', 'Lenovo', 'ASUS', 'Acer'],
      commonIssues: [],
      warranty: { duration: '30 Days', coverage: 'All parts and labor.', noFixNoFee: true },
      seo: { title: 'Laptop Repair Kuwait', description: 'Professional Windows laptop repair.', canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-repair-kuwait', ogType: 'article', schemaTypes: ['Service'] }
    } as ServiceEntity,

    'srv-gaming': {
      id: 'srv-gaming', slug: 'gaming-pc-repair-kuwait', entityType: 'Service', isActive: true,
      title: 'Gaming PC Repair Kuwait',
      iconKey: 'gaming',
      shortDescription: 'GPU diagnostics, thermal throttling fixes, FPS tuning.',
      description: 'Gaming PCs in Kuwait face sustained 45°C+ temperatures.',
      repairLevel: 'advanced',
      estimatedTurnaround: 'Same Day / 24 Hours',
      pricing: { startingFrom: 25, currency: 'KWD', quoteRequired: true, displayLabel: 'From 25 KWD' },
      coreFeatures: ['GPU Diagnostics', 'Thermal Re-Paste', 'AIO Maintenance', 'BIOS Update'],
      brands: ['ASUS ROG', 'MSI', 'Alienware', 'Custom Builds'],
      commonIssues: [],
      warranty: { duration: '30 Days', coverage: 'All parts and labor.', noFixNoFee: true },
      seo: { title: 'Gaming PC Repair Kuwait', description: 'Expert gaming PC repair.', canonicalUrl: 'https://www.computerrepairkuwait.com/gaming-pc-repair-kuwait', ogType: 'article', schemaTypes: ['Service'] }
    } as ServiceEntity,

    'srv-motherboard': {
      id: 'srv-motherboard', slug: 'motherboard-repair-kuwait', entityType: 'Service', isActive: true,
      title: 'Motherboard Repair Kuwait',
      iconKey: 'cpu',
      shortDescription: 'Chip-level diagnostics and micro-soldering.',
      description: 'We isolate the fault to the individual component level.',
      repairLevel: 'chip-level',
      estimatedTurnaround: '24-48 Hours',
      pricing: { startingFrom: 25, currency: 'KWD', quoteRequired: true, displayLabel: 'From 25 KWD' },
      coreFeatures: ['Power Rail Tracing', 'MOSFET Replacement', 'BGA Rework'],
      brands: ['Apple MacBook', 'Dell', 'HP', 'ASUS'],
      commonIssues: [],
      warranty: { duration: '30 Days', coverage: 'All parts and labor.', noFixNoFee: true },
      seo: { title: 'Motherboard Repair Kuwait', description: 'Expert motherboard repair.', canonicalUrl: 'https://www.computerrepairkuwait.com/motherboard-repair-kuwait', ogType: 'article', schemaTypes: ['Service'] }
    } as ServiceEntity,

    'srv-screen': {
      id: 'srv-screen', slug: 'laptop-screen-repair-kuwait', entityType: 'Service', isActive: true,
      title: 'Screen Replacement Kuwait',
      iconKey: 'monitor',
      shortDescription: 'LCD, IPS, OLED, and Retina display panel replacements.',
      description: 'We source and fit OEM and high-grade compatible panels.',
      repairLevel: 'basic',
      estimatedTurnaround: 'Same Day',
      pricing: { startingFrom: 20, currency: 'KWD', quoteRequired: false, displayLabel: 'From 20 KWD' },
      coreFeatures: ['LCD Panel Replacement', 'MacBook Retina Replacement', 'Display Cable Repair'],
      brands: ['Dell', 'HP', 'Lenovo', 'MacBook'],
      commonIssues: [],
      warranty: { duration: '30 Days', coverage: 'Screen panel and labor.', noFixNoFee: false },
      seo: { title: 'Laptop Screen Replacement Kuwait', description: 'Professional screen replacement.', canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-screen-repair-kuwait', ogType: 'article', schemaTypes: ['Service'] }
    } as ServiceEntity,

    'srv-battery': {
      id: 'srv-battery', slug: 'battery-replacement', entityType: 'Service', isActive: true,
      title: 'Battery Replacement Kuwait',
      iconKey: 'battery',
      shortDescription: 'OEM and compatible battery replacement.',
      description: 'We replace batteries with OEM or high-grade compatible cells.',
      repairLevel: 'basic',
      estimatedTurnaround: 'Same Day',
      pricing: { startingFrom: 12, currency: 'KWD', quoteRequired: true, displayLabel: 'From 12 KWD' },
      coreFeatures: ['OEM Batteries', 'MacBook Battery Replacement', 'Battery Calibration'],
      brands: ['MacBook', 'Dell', 'HP', 'Lenovo'],
      commonIssues: [],
      warranty: { duration: '30 Days', coverage: 'Battery and labor.', noFixNoFee: true },
      seo: { title: 'Laptop Battery Replacement Kuwait', description: 'Fast battery replacement.', canonicalUrl: 'https://www.computerrepairkuwait.com/battery-replacement', ogType: 'article', schemaTypes: ['Service'] }
    } as ServiceEntity,

    /* --- LOCATION --- */
    'loc-hawalli': { id: 'loc-hawalli', slug: 'hawalli', entityType: 'Location', isActive: true, title: 'Hawalli Repair Center', landmark: 'Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19' } as LocationEntity,

    /* --- REVIEWS --- */
    'reviews-row': { id: 'reviews-row', entityType: 'Reviews', isActive: true, title: 'Google Reviews', aggregateRating: { ratingValue: '4.9', reviewCount: 150 }, items: [] } as ReviewsEntity,

    /* --- FAQS --- */
    'faq-pick-and-drop': { id: 'faq-pick-and-drop', slug: 'pick-and-drop', entityType: 'FAQ', isActive: true, title: 'Pickup?', answer: 'Yes.' } as FAQEntity,
    'faq-liquid-damage': { id: 'faq-liquid-damage', slug: 'liquid-damage', entityType: 'FAQ', isActive: true, title: 'Liquid?', answer: 'Yes.' } as FAQEntity,
    'faq-no-fix': { id: 'faq-no-fix', slug: 'no-fix', entityType: 'FAQ', isActive: true, title: 'No Fix?', answer: 'Free.' } as FAQEntity,
    'faq-warranty': { id: 'faq-warranty', slug: 'warranty', entityType: 'FAQ', isActive: true, title: 'Warranty?', answer: '30 Days.' } as FAQEntity,
    'faq-data-safe': { id: 'faq-data-safe', slug: 'data-safety', entityType: 'FAQ', isActive: true, title: 'Privacy?', answer: 'Secure.' } as FAQEntity,
    'faq-same-day': { id: 'faq-same-day', slug: 'same-day-repair', entityType: 'FAQ', isActive: true, title: 'Same Day?', answer: 'Yes.' } as FAQEntity,
    'faq-cost': { id: 'faq-cost', slug: 'repair-cost', entityType: 'FAQ', isActive: true, title: 'Cost?', answer: 'From 12 KD.' } as FAQEntity,

    /* --- FOOTER --- */
    'footer-data': { id: 'footer-data', entityType: 'Footer', isActive: true, title: 'Footer', links: { services: [], company: [], areas: [] } } as FooterEntity,
  }
};

const allEntities = Object.values(rawGraphData.entities);

export const GRAPH_INDEXES = rawGraphData.entities;

export const KCROC_GRAPH = {
  ...rawGraphData,
  routableEntities: allEntities.filter((e): e is RoutableEntity => 'seo' in e && e.isActive),
  business:    allEntities.find((e): e is BusinessEntity    => e.entityType === 'Business'),
  pages:       allEntities.filter((e): e is WebPageEntity   => e.entityType === 'WebPage'   && e.isActive),
  services:    allEntities.filter((e): e is ServiceEntity   => e.entityType === 'Service'   && e.isActive),
  faqs:        allEntities.filter((e): e is FAQEntity       => e.entityType === 'FAQ'       && e.isActive),
  usps:        allEntities.filter((e): e is USPEntity       => e.entityType === 'USP'       && e.isActive),
  trustBadges: allEntities.filter((e): e is TrustBadgeEntity => e.entityType === 'TrustBadge' && e.isActive),
  processes:   allEntities.filter((e): e is ProcessEntity   => e.entityType === 'Process'   && e.isActive),
  locations:   allEntities.filter((e): e is LocationEntity  => e.entityType === 'Location'  && e.isActive),
  reviews:     allEntities.find((e): e is ReviewsEntity     => e.entityType === 'Reviews'   && e.isActive),
  footer:      allEntities.find((e): e is FooterEntity      => e.entityType === 'Footer'),
  stats:       allEntities.find((e): e is StatsEntity       => e.entityType === 'Stats'),
};

export const KCROC_AGGREGATE_RATING = { ratingValue: '4.9', reviewCount: 150, bestRating: 5 };
