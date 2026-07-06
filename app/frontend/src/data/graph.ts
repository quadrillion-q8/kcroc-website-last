// File: app/frontend/src/data/graph.ts
import { 
  RawGraphData, RoutableEntity, LocationEntity, ServiceEntity, 
  FAQEntity, WebPageEntity, BusinessEntity, USPEntity, TrustBadgeEntity, ProcessEntity,
  StatsEntity, FooterEntity
} from '../types/knowledgeGraph';

const rawGraphData: RawGraphData = {
  metadata: { version: '3.1.0', lastUpdated: new Date().toISOString(), environment: 'production' },
  entities: {
    /* --- SYSTEM & BUSINESS --- */
    'biz-kcroc': {
      id: 'biz-kcroc', entityType: 'Business', isActive: true, title: 'KCROC',
      legalName: 'Kuwait Computer Repair On Call', telephone: '96555301913',
      aiSummary: 'KCROC is a Kuwait-based component-level computer repair company specializing in MacBook, laptop, gaming PC, and motherboard repairs.',
    } as BusinessEntity,

    /* --- TRUST BADGES & STATS --- */
    'badge-privacy': { id: 'badge-privacy', entityType: 'TrustBadge', isActive: true, title: 'Data Privacy Guaranteed', iconKey: 'ShieldCheck' } as TrustBadgeEntity,
    'badge-pickup': { id: 'badge-pickup', entityType: 'TrustBadge', isActive: true, title: 'Free Pick & Drop', iconKey: 'Truck' } as TrustBadgeEntity,
    'badge-warranty': { id: 'badge-warranty', entityType: 'TrustBadge', isActive: true, title: '30-Day Warranty', iconKey: 'Clock' } as TrustBadgeEntity,
    'badge-esd': { id: 'badge-esd', entityType: 'TrustBadge', isActive: true, title: 'ESD-Safe Lab', iconKey: 'Zap' } as TrustBadgeEntity,

    'stats-row': {
      id: 'stats-row', entityType: 'Stats', isActive: true, title: 'Homepage Stats',
      items: [
        { label: 'Repairs completed', value: '500+', sub: 'Since launch across Kuwait' },
        { label: 'Success rate', value: '98%', sub: 'On complex logic board repairs' },
        { label: 'Warranty', value: '30 days', sub: 'All parts and labour' },
        { label: 'Pick & drop', value: 'Free', sub: 'Zero hidden transport fees' }
      ]
    } as StatsEntity,

    /* --- USPs --- */
    'usp-component': { id: 'usp-component', entityType: 'USP', isActive: true, iconKey: 'Cpu', title: 'Component-Level Repair', description: 'We diagnose the board itself—using micro-soldering and trace repair—saving you from buying entirely new motherboards.' } as USPEntity,
    'usp-nofix': { id: 'usp-nofix', entityType: 'USP', isActive: true, iconKey: 'ShieldCheck', title: 'No Fix, No Fee', description: 'Our diagnostics are precise. If your device isn\'t economically repairable, you pay nothing.' } as USPEntity,
    'usp-logistics': { id: 'usp-logistics', entityType: 'USP', isActive: true, iconKey: 'Truck', title: 'Free Pick & Drop', description: 'We cover Hawalli, Salmiya, Kuwait City, and beyond. We handle the heavy lifting.' } as USPEntity,
    'usp-privacy': { id: 'usp-privacy', entityType: 'USP', isActive: true, iconKey: 'Lock', title: 'Strict Data Privacy', description: 'We operate under strict hardware-only protocols to ensure your privacy is never compromised.' } as USPEntity,

    /* --- PROCESS --- */
    'proc-standard': {
      id: 'proc-standard', entityType: 'Process', isActive: true, title: 'Standard Repair Process',
      steps: [
        { step: 1, title: 'Free Collection', description: 'Schedule a pickup via WhatsApp. Our courier collects your device directly from your doorstep anywhere in Kuwait.' },
        { step: 2, title: 'Precision Diagnostic', description: 'Your device enters our Hawalli lab where technicians trace the exact component failure using thermal imaging and electrical testing.' },
        { step: 3, title: 'Repair & Return', description: 'Once approved, we execute the micro-soldering or hardware replacement, test the system under heavy load, and deliver it safely back to you.' }
      ]
    } as ProcessEntity,

    /* --- PAGES --- */
    'page-home': {
      id: 'page-home', slug: '', entityType: 'WebPage', isActive: true, title: 'Home', description: 'KCROC Homepage',
      seo: { title: 'Expert Computer & MacBook Repair in Kuwait | KCROC', description: 'Component-level computer, laptop, and MacBook repair in Kuwait. Free pick & drop, No Fix No Fee.', canonicalUrl: '/' },
      hero: {
        headline: 'Kuwait’s Expert Component-Level Repair Service.',
        subheadline: 'We fix the board. We don’t just swap it.',
        description: 'We diagnose and repair failed components at board level, restoring devices that many repair shops would declare beyond repair.',
        primaryCTA: { text: 'Message on WhatsApp', route: 'https://wa.me/96555301913' },
        secondaryCTA: { text: 'View All Services', route: '/services' }
      },
      featuredFAQIds: ['faq-pick-and-drop', 'faq-liquid-damage', 'faq-no-fix'],
      featuredUSPIds: ['usp-component', 'usp-nofix', 'usp-logistics', 'usp-privacy']
    } as WebPageEntity,

    /* --- SERVICES --- */
    'srv-macbook': {
      id: 'srv-macbook', slug: 'macbook-repair-kuwait', entityType: 'Service', isActive: true,
      title: 'MacBook Repair Kuwait', iconKey: 'apple',
      description: 'Liquid spills, dead logic boards, and display circuits. We specialize in chip-level Apple hardware restoration.',
      pricing: { startingFrom: 25, currency: 'KWD', quoteRequired: true, displayLabel: 'From 25 KWD' },
      coreFeatures: ['Logic Board Micro-Soldering', 'Liquid Damage Restoration', 'Free Pick & Drop', 'No Fix, No Fee'], 
      warranty: { duration: '30 Days', coverage: 'Parts and labor.', noFixNoFee: true },
      seo: { title: 'MacBook Repair Kuwait', description: 'Expert Apple MacBook repair in Kuwait.', canonicalUrl: '/services/macbook-repair-kuwait' }
    } as ServiceEntity,
    'srv-laptop': {
      id: 'srv-laptop', slug: 'laptop-repair-kuwait', entityType: 'Service', isActive: true,
      title: 'Laptop Repair Kuwait', iconKey: 'laptop',
      description: 'Expert diagnostics and hardware repair for Dell, HP, Lenovo, and ASUS. From shattered screens to failing power systems.',
      pricing: { startingFrom: 15, currency: 'KWD', quoteRequired: true, displayLabel: 'From 15 KWD' },
      coreFeatures: ['Screen Replacement', 'Battery Swap', 'Keyboard Repair', 'Power Issues'], 
      warranty: { duration: '30 Days', coverage: 'Parts and labor.', noFixNoFee: true },
      seo: { title: 'Laptop Repair Kuwait', description: 'Expert Windows laptop repair.', canonicalUrl: '/services/laptop-repair-kuwait' }
    } as ServiceEntity,
    'srv-gaming': {
      id: 'srv-gaming', slug: 'gaming-pc-repair-kuwait', entityType: 'Service', isActive: true,
      title: 'Gaming PC Repair', iconKey: 'gaming',
      description: 'Thermal optimization, custom loop maintenance, and deep hardware diagnostics for rigs experiencing heavy throttling or crashes.',
      pricing: { startingFrom: 25, currency: 'KWD', quoteRequired: true, displayLabel: 'From 25 KWD' },
      coreFeatures: ['Thermal Fixes', 'GPU Repair', 'FPS Tuning', 'Custom Builds'], 
      warranty: { duration: '30 Days', coverage: 'Parts and labor.', noFixNoFee: true },
      seo: { title: 'Gaming PC Repair Kuwait', description: 'Gaming PC hardware diagnostics.', canonicalUrl: '/services/gaming-pc-repair-kuwait' }
    } as ServiceEntity,
    'srv-motherboard': {
      id: 'srv-motherboard', slug: 'motherboard-repair-kuwait', entityType: 'Service', isActive: true,
      title: 'Motherboard Repair', iconKey: 'cpu',
      description: 'Advanced micro-soldering and short-circuit tracing for motherboards deemed "unfixable" by standard shops.',
      pricing: { startingFrom: 25, currency: 'KWD', quoteRequired: true, displayLabel: 'From 25 KWD' },
      coreFeatures: ['Circuit Tracing', 'IC Replacement', 'No Fix No Fee', 'Data Rescue'], 
      warranty: { duration: '30 Days', coverage: 'Parts and labor.', noFixNoFee: true },
      seo: { title: 'Motherboard Repair Kuwait', description: 'Motherboard chip-level repair.', canonicalUrl: '/services/motherboard-repair-kuwait' }
    } as ServiceEntity,

    /* --- FOOTER & AREAS --- */
    'footer-data': {
      id: 'footer-data', entityType: 'Footer', isActive: true, title: 'Footer Links',
      links: {
        services: ['Laptop repair', 'MacBook repair', 'Gaming PC repair', 'Motherboard repair', 'Screen replacement'],
        company: ['About us', 'Contact', 'Tech Blog', 'FAQ', 'Pricing'],
        areas: ['Hawalli', 'Salmiya', 'Kuwait City', 'Farwaniya', 'Jahra', 'Ahmadi']
      }
    } as FooterEntity,
    'loc-hawalli': {
      id: 'loc-hawalli', slug: 'computer-repair-hawalli', entityType: 'Location', isActive: true,
      title: 'Hawalli Repair Center', description: 'Kuwait\'s premier component-level repair facility.',
      landmark: 'Al Mullah Complex, Basement Shop 19',
      coords: { lat: 29.3353, lng: 48.0124 },
      serviceAreas: ['Hawalli', 'Salmiya', 'Kuwait City', 'Farwaniya', 'Mangaf', 'Jahra', 'Mahboula'],
      seo: { title: 'Computer Repair Shop in Hawalli', description: 'Visit our Hawalli location in the Al Mullah Complex.', canonicalUrl: '/location/hawalli' }
    } as LocationEntity,

    /* --- REVIEWS --- */
    'reviews-row': {
      id: 'reviews-row', entityType: 'Reviews', isActive: true, title: 'Verified Reviews',
      items: [
        { name: 'Ahmad Al-Sabah', text: 'Picked it up, fixed the MacBook Pro screen in 24 hours.', rating: 5, device: 'MacBook Pro' },
        { name: 'Sarah M.', text: 'Motherboard died right before my midterms. KCROC saved my data.', rating: 5, device: 'Laptop' },
        { name: 'Tariq K.', text: 'Diagnosed my gaming PC thermal throttle in 5 minutes.', rating: 5, device: 'Gaming PC' }
      ]
    } as any,
    
    /* --- FAQS --- */
    'faq-pick-and-drop': { id: 'faq-pick-and-drop', slug: 'faq-pick-and-drop', entityType: 'FAQ', isActive: true, title: 'Do you offer a pick and drop service?', description: 'Information on our delivery policy.', answer: 'Yes, we offer complimentary pick & drop across all Kuwait.', seo: { title: 'FAQ', description: 'FAQ', canonicalUrl: '/faq/pick-and-drop' } } as FAQEntity,
    'faq-liquid-damage': { id: 'faq-liquid-damage', slug: 'faq-liquid-damage', entityType: 'FAQ', isActive: true, title: 'Do you repair liquid damage?', description: 'Details about our liquid damage process.', answer: 'Yes, we clean the corrosion, trace the damaged power rails, and replace the microscopic blown components to restore power.', seo: { title: 'FAQ', description: 'FAQ', canonicalUrl: '/faq/liquid-damage' } } as FAQEntity,
    'faq-no-fix': { id: 'faq-no-fix', slug: 'faq-no-fix', entityType: 'FAQ', isActive: true, title: 'No Fix, No Fee?', description: 'Details on our pricing guarantee.', answer: 'If we cannot repair your device, you pay zero KWD.', seo: { title: 'FAQ', description: 'FAQ', canonicalUrl: '/faq/no-fix' } } as FAQEntity,
  }
};

const allEntities = Object.values(rawGraphData.entities);

export const KCROC_GRAPH = {
  ...rawGraphData,
  routableEntities: allEntities.filter((e): e is RoutableEntity => 'seo' in e && e.isActive),
  business: allEntities.find((e): e is BusinessEntity => e.entityType === 'Business'),
  pages: allEntities.filter((e): e is WebPageEntity => e.entityType === 'WebPage' && e.isActive),
  services: allEntities.filter((e): e is ServiceEntity => e.entityType === 'Service' && e.isActive),
  faqs: allEntities.filter((e): e is FAQEntity => e.entityType === 'FAQ' && e.isActive),
  usps: allEntities.filter((e): e is USPEntity => e.entityType === 'USP' && e.isActive),
  trustBadges: allEntities.filter((e): e is TrustBadgeEntity => e.entityType === 'TrustBadge' && e.isActive),
  processes: allEntities.filter((e): e is ProcessEntity => e.entityType === 'Process' && e.isActive),
  locations: allEntities.filter((e): e is LocationEntity => e.entityType === 'Location' && e.isActive),
  footer: allEntities.find((e): e is FooterEntity => e.entityType === 'Footer'),
  stats: allEntities.find((e): e is StatsEntity => e.entityType === 'Stats'),
};
