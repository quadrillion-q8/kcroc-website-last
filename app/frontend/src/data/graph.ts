// File: app/frontend/src/data/graph.ts
import { 
  RawGraphData, RoutableEntity, LocationEntity, ServiceEntity, 
  FAQEntity, WebPageEntity, BusinessEntity, USPEntity, TrustBadgeEntity, ProcessEntity,
  StatsEntity, FooterEntity
} from '../types/knowledgeGraph';

const rawGraphData: RawGraphData = {
  metadata: { version: '3.1.0', lastUpdated: new Date().toISOString(), environment: 'production' },
  entities: {
    'biz-kcroc': { id: 'biz-kcroc', entityType: 'Business', isActive: true, title: 'KCROC', legalName: 'Kuwait Computer Repair On Call', telephone: '96555301913', aiSummary: 'Repair company' } as BusinessEntity,
    'badge-privacy': { id: 'badge-privacy', entityType: 'TrustBadge', isActive: true, title: 'Data Privacy Guaranteed', iconKey: 'ShieldCheck' } as TrustBadgeEntity,
    'badge-pickup': { id: 'badge-pickup', entityType: 'TrustBadge', isActive: true, title: 'Free Pick & Drop', iconKey: 'Truck' } as TrustBadgeEntity,
    'badge-warranty': { id: 'badge-warranty', entityType: 'TrustBadge', isActive: true, title: '30-Day Warranty', iconKey: 'Clock' } as TrustBadgeEntity,
    'badge-esd': { id: 'badge-esd', entityType: 'TrustBadge', isActive: true, title: 'ESD-Safe Lab', iconKey: 'Zap' } as TrustBadgeEntity,
    'stats-row': { id: 'stats-row', entityType: 'Stats', isActive: true, title: 'Homepage Stats', items: [{ label: 'Repairs', value: '500+', sub: 'Kuwait' }] } as StatsEntity,
    'usp-component': { id: 'usp-component', entityType: 'USP', isActive: true, iconKey: 'Cpu', title: 'Component-Level Repair', description: 'We diagnose the board.' } as USPEntity,
    'usp-nofix': { id: 'usp-nofix', entityType: 'USP', isActive: true, iconKey: 'ShieldCheck', title: 'No Fix, No Fee', description: 'Pay nothing if not fixed.' } as USPEntity,
    'usp-logistics': { id: 'usp-logistics', entityType: 'USP', isActive: true, iconKey: 'Truck', title: 'Free Pick & Drop', description: 'We collect from your door.' } as USPEntity,
    'usp-privacy': { id: 'usp-privacy', entityType: 'USP', isActive: true, iconKey: 'Lock', title: 'Strict Data Privacy', description: 'Privacy guaranteed.' } as USPEntity,
    'proc-standard': { id: 'proc-standard', entityType: 'Process', isActive: true, title: 'Standard Process', steps: [{ step: 1, title: 'Collect', description: 'We pick it up.' }] } as ProcessEntity,
    'page-home': { id: 'page-home', slug: '', entityType: 'WebPage', isActive: true, title: 'Home', description: 'Homepage', seo: { title: 'Home', description: 'Home', canonicalUrl: '/' }, hero: { headline: 'Fix', subheadline: 'Board', description: 'Fixing boards.', primaryCTA: { text: 'WhatsApp', route: '/' }, secondaryCTA: { text: 'Services', route: '/services' } }, featuredFAQIds: [], featuredUSPIds: ['usp-component'] } as WebPageEntity,
    'srv-macbook': { id: 'srv-macbook', slug: 'macbook', entityType: 'Service', isActive: true, title: 'MacBook', iconKey: 'apple', description: 'Logic board repair', seo: { title: 'Mac', description: 'Mac', canonicalUrl: '/services/macbook' } } as ServiceEntity,
    'srv-laptop': { id: 'srv-laptop', slug: 'laptop', entityType: 'Service', isActive: true, title: 'Laptop', iconKey: 'laptop', description: 'Laptop repair', seo: { title: 'Lap', description: 'Lap', canonicalUrl: '/services/laptop' } } as ServiceEntity,
    'srv-gaming': { id: 'srv-gaming', slug: 'gaming', entityType: 'Service', isActive: true, title: 'Gaming', iconKey: 'gaming', description: 'Gaming repair', seo: { title: 'Game', description: 'Game', canonicalUrl: '/services/gaming' } } as ServiceEntity,
    'srv-motherboard': { id: 'srv-motherboard', slug: 'motherboard', entityType: 'Service', isActive: true, title: 'Motherboard', iconKey: 'cpu', description: 'Board repair', seo: { title: 'MB', description: 'MB', canonicalUrl: '/services/motherboard' } } as ServiceEntity,
    'footer-data': { id: 'footer-data', entityType: 'Footer', isActive: true, title: 'Footer', links: { services: [], company: [], areas: [] } } as FooterEntity,
    'loc-hawalli': { id: 'loc-hawalli', slug: 'hawalli', entityType: 'Location', isActive: true, title: 'Hawalli', description: 'Location', landmark: 'Shop 19', serviceAreas: ['Hawalli'], seo: { title: 'Loc', description: 'Loc', canonicalUrl: '/loc' } } as LocationEntity,
    'faq-pick-and-drop': { id: 'faq-pick-and-drop', slug: 'faq-pick-and-drop', entityType: 'FAQ', isActive: true, title: 'FAQ', description: 'FAQ', answer: 'Yes', seo: { title: 'FAQ', description: 'FAQ', canonicalUrl: '/faq' } } as FAQEntity,
    'faq-liquid-damage': { id: 'faq-liquid-damage', slug: 'faq-liquid-damage', entityType: 'FAQ', isActive: true, title: 'FAQ', description: 'FAQ', answer: 'Yes', seo: { title: 'FAQ', description: 'FAQ', canonicalUrl: '/faq' } } as FAQEntity,
    'faq-no-fix': { id: 'faq-no-fix', slug: 'faq-no-fix', entityType: 'FAQ', isActive: true, title: 'FAQ', description: 'FAQ', answer: 'Yes', seo: { title: 'FAQ', description: 'FAQ', canonicalUrl: '/faq' } } as FAQEntity,
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
