// File: app/frontend/src/data/graph.ts

import { 
  RawGraphData, RoutableEntity, LocationEntity, ServiceEntity, 
  FAQEntity, WebPageEntity, BusinessEntity, USPEntity, TrustBadgeEntity, ProcessEntity
} from '../types/knowledgeGraph';

const rawGraphData: RawGraphData = {
  metadata: { version: '3.0.0', lastUpdated: new Date().toISOString(), environment: 'production' },
  entities: {
    /* --- SYSTEM & BUSINESS (Fragments) --- */
    'biz-kcroc': {
      id: 'biz-kcroc',
      entityType: 'Business',
      isActive: true,
      title: 'KCROC',
      legalName: 'Kuwait Computer Repair On Call',
      telephone: '96555301913',
      aiSummary: 'KCROC is a Kuwait-based component-level computer repair company specializing in MacBook, laptop, gaming PC, and motherboard repairs. They offer free pick & drop, a No Fix No Fee policy, and strict data privacy protocols.',
    } as BusinessEntity,

    /* --- TRUST BADGES (Fragments) --- */
    'badge-privacy': { id: 'badge-privacy', entityType: 'TrustBadge', isActive: true, title: 'Data Privacy Guaranteed', iconKey: 'ShieldCheck' } as TrustBadgeEntity,
    'badge-pickup': { id: 'badge-pickup', entityType: 'TrustBadge', isActive: true, title: 'Free Pick & Drop', iconKey: 'Truck' } as TrustBadgeEntity,
    'badge-warranty': { id: 'badge-warranty', entityType: 'TrustBadge', isActive: true, title: '30-Day Warranty', iconKey: 'Clock' } as TrustBadgeEntity,
    'badge-esd': { id: 'badge-esd', entityType: 'TrustBadge', isActive: true, title: 'ESD-Safe Lab', iconKey: 'Zap' } as TrustBadgeEntity,

    /* --- USPs (Fragments) --- */
    'usp-component': {
      id: 'usp-component', entityType: 'USP', isActive: true, iconKey: 'Cpu',
      title: 'Component-Level Repair', description: 'We diagnose the board itself—using micro-soldering and trace repair—saving you from buying entirely new motherboards.'
    } as USPEntity,
    'usp-nofix': {
      id: 'usp-nofix', entityType: 'USP', isActive: true, iconKey: 'ShieldCheck',
      title: 'No Fix, No Fee', description: 'Our diagnostics are precise. If your device isn\'t economically repairable, or if we can\'t fix it, you pay absolutely nothing.'
    } as USPEntity,
    'usp-logistics': {
      id: 'usp-logistics', entityType: 'USP', isActive: true, iconKey: 'Truck',
      title: 'Free Pick & Drop', description: 'We cover Hawalli, Salmiya, Kuwait City, and beyond. We handle the heavy lifting and traffic so you never have to leave home.'
    } as USPEntity,
    'usp-privacy': {
      id: 'usp-privacy', entityType: 'USP', isActive: true, iconKey: 'Lock',
      title: 'Strict Data Privacy', description: 'Your files are your business. We operate under strict hardware-only protocols to ensure your privacy is never compromised during repair.'
    } as USPEntity,

    /* --- GLOBAL PROCESS (Fragment) --- */
    'proc-standard': {
      id: 'proc-standard', entityType: 'Process', isActive: true, title: 'Standard Repair Process',
      steps: [
        { step: 1, title: 'Free Collection', description: 'Schedule a pickup via WhatsApp. Our courier collects your device directly from your doorstep anywhere in Kuwait.' },
        { step: 2, title: 'Precision Diagnostic', description: 'Your device enters our Hawalli lab where technicians trace the exact component failure using thermal imaging and electrical testing.' },
        { step: 3, title: 'Repair & Return', description: 'Once approved, we execute the micro-soldering or hardware replacement, test the system under heavy load, and deliver it safely back to you.' }
      ]
    } as ProcessEntity,

    /* --- PAGES (Routable) --- */
    'page-home': {
      id: 'page-home', slug: '', entityType: 'WebPage', isActive: true,
      title: 'Home', description: 'KCROC Homepage',
      seo: { title: 'Expert Computer & MacBook Repair in Kuwait | KCROC', description: 'Component-level computer, laptop, and MacBook repair in Kuwait. We fix logic boards instead of replacing them. Free pick & drop, No Fix No Fee.', canonicalUrl: '/' },
      hero: {
        headline: 'Kuwait’s Expert Component-Level Repair Service.',
        subheadline: 'We fix the board. We don’t just swap it.',
        description: 'We diagnose and repair failed components at board level, restoring devices that many repair shops would simply declare beyond repair.',
        primaryCTA: { text: 'Message on WhatsApp', route: 'https://wa.me/96555301913' },
        secondaryCTA: { text: 'View All Services', route: '/services' }
      },
      featuredFAQIds: ['faq-pick-and-drop', 'faq-liquid-damage', 'faq-no-fix'],
      featuredUSPIds: ['usp-component', 'usp-nofix', 'usp-logistics', 'usp-privacy']
    } as WebPageEntity,

    /* --- LOCATIONS (Routable) --- */
    'loc-hawalli': {
      id: 'loc-hawalli', slug: 'computer-repair-hawalli', entityType: 'Location', isActive: true,
      title: 'Hawalli Repair Center', description: 'Kuwait\'s premier component-level repair facility.',
      landmark: 'Hawalli, Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19',
      coords: { lat: 29.3353, lng: 48.0124 },
      serviceAreas: ['Hawalli', 'Salmiya', 'Farwaniya', 'Mahboula', 'Kuwait City', 'Jahra'],
      seo: { title: 'Computer Repair Shop in Hawalli | KCROC', description: 'Visit our Hawalli location in the Al Mullah Complex.', canonicalUrl: '/location/hawalli' }
    } as LocationEntity,

    /* --- SERVICES (Routable) --- */
    'srv-macbook-repair': {
      id: 'srv-macbook-repair', slug: 'macbook-repair-kuwait', entityType: 'Service', isActive: true,
      title: 'MacBook Repair Kuwait', description: 'Liquid spills, dead logic boards, and display circuits. We specialize in chip-level Apple hardware restoration so you don’t have to buy a new Mac.',
      iconKey: 'apple',
      pricing: { startingFrom: 25, currency: 'KWD', quoteRequired: true, displayLabel: 'From 25 KWD' },
      coreFeatures: ['Logic Board Micro-Soldering', 'Liquid Damage Restoration', 'Free Pick & Drop', 'No Fix, No Fee'],
      process: [{ step: 1, title: 'Diagnostic', description: 'We test your logic board.' }, { step: 2, title: 'Quote', description: 'Firm price given.' }, { step: 3, title: 'Repair', description: 'Blown components replaced.' }],
      warranty: { duration: '30 Days', coverage: 'Parts and labor.', noFixNoFee: true },
      commonProblems: [{ id: 'liquid-damage', title: 'Liquid Damage Shorts', symptoms: ['Dead device'], likelyCause: 'Corrosion', expectedTurnaround: '48 Hours', approxPriceRange: '35 - 85 KWD' }],
      seo: { title: 'MacBook Repair Kuwait | Logic Board Experts | KCROC', description: 'Expert Apple MacBook repair in Kuwait.', canonicalUrl: '/services/macbook-repair-kuwait' }
    } as ServiceEntity,

    /* --- FAQS (Routable) --- */
    'faq-pick-and-drop': {
      id: 'faq-pick-and-drop', slug: 'faq-pick-and-drop', entityType: 'FAQ', isActive: true,
      title: 'Do you offer a pick and drop service?', description: 'Collection policy details.',
      answer: 'Yes. We offer complimentary pick and drop across all Kuwait governorates for all of our repair services.',
      seo: { title: 'Pick and Drop FAQ', description: 'Free delivery service.', canonicalUrl: '/faq/pick-and-drop' }
    } as FAQEntity,
    
    'faq-liquid-damage': {
      id: 'faq-liquid-damage', slug: 'faq-liquid-damage', entityType: 'FAQ', isActive: true,
      title: 'Do you repair liquid-damaged devices?', description: 'Liquid damage policy.',
      answer: 'Yes. Liquid damage causes immediate short circuits on the logic board. We clean the corrosion, trace the damaged power rails, and replace the microscopic blown components to restore power.',
      seo: { title: 'Liquid Damage Repair FAQ', description: 'Water damage repair process.', canonicalUrl: '/faq/liquid-damage' }
    } as FAQEntity,

    'faq-no-fix': {
      id: 'faq-no-fix', slug: 'faq-no-fix', entityType: 'FAQ', isActive: true,
      title: 'What does "No Fix, No Fee" mean?', description: 'Pricing policy details.',
      answer: 'It means zero risk for you. If we cannot repair your device, or if our diagnostic determines the hardware isn\'t worth the cost of repair, you pay zero Kuwaiti Dinars.',
      seo: { title: 'No Fix No Fee FAQ', description: 'Risk-free repair guarantee.', canonicalUrl: '/faq/no-fix' }
    } as FAQEntity,
  }
};

const allEntities = Object.values(rawGraphData.entities);

export const KCROC_GRAPH = {
  ...rawGraphData,
  // Sitemap script specifically uses routableEntities to avoid indexing UI fragments
  routableEntities: allEntities.filter((e): e is RoutableEntity => 'seo' in e && e.isActive),
  
  // Strongly typed collections for React components
  business: allEntities.find((e): e is BusinessEntity => e.entityType === 'Business'),
  pages: allEntities.filter((e): e is WebPageEntity => e.entityType === 'WebPage' && e.isActive),
  services: allEntities.filter((e): e is ServiceEntity => e.entityType === 'Service' && e.isActive),
  faqs: allEntities.filter((e): e is FAQEntity => e.entityType === 'FAQ' && e.isActive),
  usps: allEntities.filter((e): e is USPEntity => e.entityType === 'USP' && e.isActive),
  trustBadges: allEntities.filter((e): e is TrustBadgeEntity => e.entityType === 'TrustBadge' && e.isActive),
  processes: allEntities.filter((e): e is ProcessEntity => e.entityType === 'Process' && e.isActive),
};
