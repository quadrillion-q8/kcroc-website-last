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
       BUSINESS ENTITY
       ═══════════════════════════════════════════════════════════════ */
    'biz-kcroc': {
      id: 'biz-kcroc', entityType: 'Business', isActive: true, 
      title: 'Kuwait Computer Repair On Call', legalName: 'Kuwait Computer Repair On Call', alternateName: 'KCROC',
      telephone: '96555301913', streetAddress: 'Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19',
      addressLocality: 'Hawalli', addressRegion: 'Hawalli Governorate', addressCountry: 'KW',
      coords: { lat: 29.3356, lng: 48.0250 }, websiteUrl: 'https://www.computerrepairkuwait.com',
      logoUrl: 'https://www.computerrepairkuwait.com/logo.png', email: 'quadrillion1980@gmail.com',
      priceRange: '$$', openingHours: 'Open daily 10:00 AM – 10:00 PM',
      schemaOpeningHours: { dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '10:00', closes: '22:00' },
      aggregateRating: { ratingValue: '4.9', reviewCount: 150, bestRating: 5 },
      socialLinks: { facebook: 'https://www.facebook.com/computerrepairkuwait', instagram: 'https://www.instagram.com/computerrepairkuwait' },
      aiSummary: 'Kuwait Computer Repair On Call (KCROC) is a Hawalli-based component-level computer repair specialist.',
    } as BusinessEntity,

    /* ═══════════════════════════════════════════════════════════════
       TRUST BADGES & STATS
       ═══════════════════════════════════════════════════════════════ */
    'badge-privacy':  { id: 'badge-privacy',  entityType: 'TrustBadge', isActive: true, title: 'Data Privacy Guaranteed', iconKey: 'ShieldCheck' } as TrustBadgeEntity,
    'badge-pickup':   { id: 'badge-pickup',   entityType: 'TrustBadge', isActive: true, title: 'Free Pick & Drop', iconKey: 'Truck' } as TrustBadgeEntity,
    'badge-warranty': { id: 'badge-warranty', entityType: 'TrustBadge', isActive: true, title: '30-Day Warranty', iconKey: 'Clock' } as TrustBadgeEntity,
    'badge-esd':      { id: 'badge-esd',      entityType: 'TrustBadge', isActive: true, title: 'ESD-Safe Lab', iconKey: 'Zap' } as TrustBadgeEntity,

    'stats-row': {
      id: 'stats-row', entityType: 'Stats', isActive: true, title: 'Homepage Stats',
      items: [{ label: 'Repairs completed', value: '500+', sub: 'Since launch' }, { label: 'Success rate', value: '98%', sub: 'On complex boards' }, { label: 'Warranty', value: '30 days', sub: 'All parts' }, { label: 'Pick & drop', value: 'Free', sub: 'Zero hidden fees' }]
    } as StatsEntity,

    /* ═══════════════════════════════════════════════════════════════
       USPs
       ═══════════════════════════════════════════════════════════════ */
    'usp-component': { id: 'usp-component', entityType: 'USP', isActive: true, iconKey: 'Cpu', title: 'Component-Level Repair', description: 'We diagnose the board itself using micro-soldering.', differentiator: 'Most shops replace; we fix.' } as USPEntity,
    'usp-nofix': { id: 'usp-nofix', entityType: 'USP', isActive: true, iconKey: 'ShieldCheck', title: 'No Fix, No Fee', description: 'Diagnostics are risk-free.', differentiator: 'Only pay when repaired.' } as USPEntity,
    'usp-logistics': { id: 'usp-logistics', entityType: 'USP', isActive: true, iconKey: 'Truck', title: 'Free Pick & Drop', description: 'We cover all Kuwait.', differentiator: 'We handle the traffic.' } as USPEntity,
    'usp-privacy': { id: 'usp-privacy', entityType: 'USP', isActive: true, iconKey: 'Lock', title: 'Strict Data Privacy', description: 'Hardware-only protocols.', differentiator: 'Files never touched.' } as USPEntity,
    'usp-climate': { id: 'usp-climate', entityType: 'USP', isActive: true, iconKey: 'Thermometer', title: 'Kuwait Climate Expertise', description: 'Engineered for extreme heat.', differentiator: 'Climate-specific fixes.' } as USPEntity,

    /* ═══════════════════════════════════════════════════════════════
       PROCESS
       ═══════════════════════════════════════════════════════════════ */
    'proc-standard': { id: 'proc-standard', entityType: 'Process', isActive: true, title: 'Standard Repair Process', steps: [{ step: 1, title: 'Collect', description: 'We come to you.' }, { step: 2, title: 'Diagnose', description: 'Precise trace repair.' }, { step: 3, title: 'Return', description: 'Stress-tested return.' }] } as ProcessEntity,

    /* ═══════════════════════════════════════════════════════════════
       PAGES
       ═══════════════════════════════════════════════════════════════ */
    'page-home': { id: 'page-home', slug: '', entityType: 'WebPage', isActive: true, title: 'Home', description: 'Homepage', seo: { title: 'Computer Repair Kuwait', description: 'Expert repairs.', canonicalUrl: '/', ogType: 'website', schemaTypes: ['LocalBusiness'] } } as WebPageEntity,
    'page-services': { id: 'page-services', slug: 'services', entityType: 'WebPage', isActive: true, title: 'Services', description: 'Services', seo: { title: 'Services', description: 'Our services.', canonicalUrl: '/services', ogType: 'website', schemaTypes: ['CollectionPage'] } } as WebPageEntity,
    'page-blog': { id: 'page-blog', slug: 'blog', entityType: 'WebPage', isActive: true, title: 'Tech Blog', description: 'Tech Blog', seo: { title: 'Tech Blog', description: 'Expert tech guides.', canonicalUrl: '/blog', ogType: 'website', schemaTypes: ['CollectionPage'] } } as WebPageEntity,

    /* ═══════════════════════════════════════════════════════════════
       SERVICES (Rich Content Restored)
       ═══════════════════════════════════════════════════════════════ */
    'srv-macbook': { id: 'srv-macbook', slug: 'macbook-repair-kuwait', entityType: 'Service', isActive: true, title: 'MacBook Repair Kuwait', iconKey: 'apple', shortDescription: 'Board-level repair.', description: 'Our MacBook repair service goes beyond what Apple Authorized Centers offer.', repairLevel: 'chip-level', estimatedTurnaround: '24-48 Hours', pricing: { startingFrom: 25, currency: 'KWD', quoteRequired: true, displayLabel: 'From 25 KWD' }, coreFeatures: ['Logic Board Micro-Soldering', 'Liquid Damage Restoration', 'Data Preserved'], warranty: { duration: '30 Days', coverage: 'Parts and labor.', noFixNoFee: true }, brands: ['MacBook Air', 'MacBook Pro'], commonIssues: [{ id: 'no-power', title: 'No Power', severity: 'high', description: 'Power IC failure.' }], seo: { title: 'MacBook Repair', description: 'Expert MacBook repair.', canonicalUrl: '/macbook-repair-kuwait', ogType: 'article', schemaTypes: ['Service'] } } as ServiceEntity,
    'srv-laptop': { id: 'srv-laptop', slug: 'laptop-repair-kuwait', entityType: 'Service', isActive: true, title: 'Laptop Repair Kuwait', iconKey: 'laptop', shortDescription: 'Windows repair.', description: 'Kuwait\'s climate causes specific hardware failure patterns.', repairLevel: 'advanced', estimatedTurnaround: '24h', pricing: { startingFrom: 15, currency: 'KWD', quoteRequired: true, displayLabel: 'From 15 KWD' }, coreFeatures: ['Screen Replacement', 'Battery Replacement', 'Keyboard Repair'], warranty: { duration: '30 Days', coverage: 'All parts and labor.', noFixNoFee: true }, brands: ['Dell', 'HP', 'Lenovo'], commonIssues: [{ id: 'screen', title: 'Cracked screen', severity: 'high', description: 'Physical damage.' }], seo: { title: 'Laptop Repair', description: 'Expert Windows repair.', canonicalUrl: '/laptop-repair-kuwait', ogType: 'article', schemaTypes: ['Service'] } } as ServiceEntity,
    'srv-gaming': { id: 'srv-gaming', slug: 'gaming-pc-repair-kuwait', entityType: 'Service', isActive: true, title: 'Gaming PC Repair Kuwait', iconKey: 'gaming', shortDescription: 'Thermal & FPS tuning.', description: 'Gaming PCs face sustained 45°C+ temperatures.', repairLevel: 'advanced', estimatedTurnaround: '24h', pricing: { startingFrom: 25, currency: 'KWD', quoteRequired: true, displayLabel: 'From 25 KWD' }, coreFeatures: ['GPU Diagnostics', 'Thermal Re-Paste', 'FPS Tuning'], warranty: { duration: '30 Days', coverage: 'Parts and labor.', noFixNoFee: true }, brands: ['ASUS ROG', 'MSI'], commonIssues: [{ id: 'throttle', title: 'Thermal Throttle', severity: 'high', description: 'Dust build-up.' }], seo: { title: 'Gaming PC Repair', description: 'Gaming expert.', canonicalUrl: '/gaming-pc-repair-kuwait', ogType: 'article', schemaTypes: ['Service'] } } as ServiceEntity,
    'srv-motherboard': { id: 'srv-motherboard', slug: 'motherboard-repair-kuwait', entityType: 'Service', isActive: true, title: 'Motherboard Repair Kuwait', iconKey: 'cpu', shortDescription: 'Advanced circuit repair.', description: 'We isolate the fault to the component level.', repairLevel: 'chip-level', estimatedTurnaround: '48h', pricing: { startingFrom: 25, currency: 'KWD', quoteRequired: true, displayLabel: 'From 25 KWD' }, coreFeatures: ['Power Rail Tracing', 'MOSFET Replacement', 'BGA Rework'], warranty: { duration: '30 Days', coverage: 'Parts and labor.', noFixNoFee: true }, brands: ['MacBook', 'Dell', 'HP'], commonIssues: [{ id: 'short', title: 'Short Circuit', severity: 'high', description: 'Blown capacitors.' }], seo: { title: 'Motherboard Repair', description: 'Chip level repair.', canonicalUrl: '/motherboard-repair-kuwait', ogType: 'article', schemaTypes: ['Service'] } } as ServiceEntity,
    'srv-screen': { id: 'srv-screen', slug: 'laptop-screen-repair-kuwait', entityType: 'Service', isActive: true, title: 'Screen Replacement Kuwait', iconKey: 'monitor', shortDescription: 'Fast panel replacement.', description: 'We source and fit OEM panels.', repairLevel: 'basic', estimatedTurnaround: '1h', pricing: { startingFrom: 20, currency: 'KWD', quoteRequired: false, displayLabel: 'From 20 KWD' }, coreFeatures: ['LCD Replacement', 'MacBook Retina', 'Cable Repair'], warranty: { duration: '30 Days', coverage: 'Screen panel and labor.', noFixNoFee: false }, brands: ['Dell', 'HP', 'Lenovo'], commonIssues: [{ id: 'crack', title: 'Cracked screen', severity: 'high', description: 'Impact damage.' }], seo: { title: 'Screen Repair', description: 'New display panels.', canonicalUrl: '/laptop-screen-repair-kuwait', ogType: 'article', schemaTypes: ['Service'] } } as ServiceEntity,
    'srv-battery': { id: 'srv-battery', slug: 'battery-replacement', entityType: 'Service', isActive: true, title: 'Battery Replacement Kuwait', iconKey: 'battery', shortDescription: 'OEM quality batteries.', description: 'We replace with OEM-grade cells.', repairLevel: 'basic', estimatedTurnaround: '1h', pricing: { startingFrom: 12, currency: 'KWD', quoteRequired: true, displayLabel: 'From 12 KWD' }, coreFeatures: ['OEM Quality', 'MacBook Battery', 'Calibration'], warranty: { duration: '30 Days', coverage: 'Battery and labor.', noFixNoFee: true }, brands: ['MacBook', 'Dell', 'HP'], commonIssues: [{ id: 'drain', title: 'Fast Drain', severity: 'high', description: 'Cell capacity loss.' }], seo: { title: 'Battery Replacement', description: 'New laptop battery.', canonicalUrl: '/battery-replacement', ogType: 'article', schemaTypes: ['Service'] } } as ServiceEntity,

    /* ═══════════════════════════════════════════════════════════════
       LOCATION (Fixed with SEO + Description)
       ═══════════════════════════════════════════════════════════════ */
    'loc-hawalli': { id: 'loc-hawalli', slug: 'hawalli', entityType: 'Location', isActive: true, title: 'Hawalli Repair Center', description: 'Our primary repair hub in Hawalli.', landmark: 'Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19', seo: { title: 'Hawalli Repair Center', description: 'Located in Al Mullah Complex.', canonicalUrl: '/location/hawalli', ogType: 'website', schemaTypes: ['LocalBusiness'] }, serviceAreas: ['Hawalli', 'Salmiya'] } as LocationEntity,

    /* ═══════════════════════════════════════════════════════════════
       REVIEWS
       ═══════════════════════════════════════════════════════════════ */
    'reviews-row': { id: 'reviews-row', entityType: 'Reviews', isActive: true, title: 'Google Reviews', aggregateRating: { ratingValue: '4.9', reviewCount: 150 }, items: [] } as ReviewsEntity,

    /* ═══════════════════════════════════════════════════════════════
       FAQS (Fixed with SEO + Description)
       ═══════════════════════════════════════════════════════════════ */
    'faq-pick-and-drop': { id: 'faq-pick-and-drop', slug: 'pick-and-drop', entityType: 'FAQ', isActive: true, title: 'Pickup?', description: 'Delivery policy details.', answer: 'Yes, free across Kuwait.', seo: { title: 'Pickup', description: 'Delivery details.', canonicalUrl: '/faq/pick', ogType: 'website', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-liquid-damage': { id: 'faq-liquid-damage', slug: 'liquid-damage', entityType: 'FAQ', isActive: true, title: 'Liquid?', description: 'Water damage process.', answer: 'Yes, we perform ultrasonic cleaning.', seo: { title: 'Liquid', description: 'Water damage repair.', canonicalUrl: '/faq/liquid', ogType: 'website', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-no-fix': { id: 'faq-no-fix', slug: 'no-fix', entityType: 'FAQ', isActive: true, title: 'No Fix?', description: 'Fee policy explanation.', answer: 'If we can\'t repair, you pay nothing.', seo: { title: 'No Fix', description: 'Pricing guarantee.', canonicalUrl: '/faq/nofix', ogType: 'website', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-warranty': { id: 'faq-warranty', slug: 'warranty', entityType: 'FAQ', isActive: true, title: 'Warranty?', description: 'Repair warranty info.', answer: '30 days warranty.', seo: { title: 'Warranty', description: 'Repair warranty.', canonicalUrl: '/faq/warranty', ogType: 'website', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-data-safe': { id: 'faq-data-safe', slug: 'data-safety', entityType: 'FAQ', isActive: true, title: 'Privacy?', description: 'Data security info.', answer: 'We ensure 100% data privacy.', seo: { title: 'Privacy', description: 'Data protection.', canonicalUrl: '/faq/privacy', ogType: 'website', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-same-day': { id: 'faq-same-day', slug: 'same-day-repair', entityType: 'FAQ', isActive: true, title: 'Same Day?', description: 'Service speed info.', answer: 'Yes, for standard repairs.', seo: { title: 'Speed', description: 'Same day service.', canonicalUrl: '/faq/speed', ogType: 'website', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-cost': { id: 'faq-cost', slug: 'repair-cost', entityType: 'FAQ', isActive: true, title: 'Cost?', description: 'Pricing info.', answer: 'From 12 KD.', seo: { title: 'Cost', description: 'Pricing breakdown.', canonicalUrl: '/faq/price', ogType: 'website', schemaTypes: ['FAQPage'] } } as FAQEntity,

    /* ═══════════════════════════════════════════════════════════════
       FOOTER
       ═══════════════════════════════════════════════════════════════ */
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
