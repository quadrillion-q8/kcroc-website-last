// File: app/frontend/src/data/graph.ts
import { 
  LocationEntity, 
  ServiceEntity, 
  FAQEntity,
  BrandEntity,
  DeviceEntity,
  RELATIONSHIP
} from '../types/knowledgeGraph';
import { IMAGES } from '../constants/images';

/**
 * THE MASTER DATABASE - VERSION 2.0.0
 * Enterprise Entity-Driven Architecture
 */
const rawGraphData: any = {
  metadata: {
    version: '2.0.0',
    lastUpdated: '2026-07-02',
    environment: 'production'
  },
  entities: {
    
    // ==========================================
    // 1. LOCATION ENTITIES
    // ==========================================
    'loc-hawalli': {
      id: 'loc-hawalli',
      slug: 'computer-repair-hawalli',
      entityType: 'Location',
      isActive: true,
      title: 'Hawalli Repair Center',
      description: 'Main Kuwait Computer Repair On Call facility.',
      primaryKeyword: 'computer repair hawalli',
      secondaryKeywords: ['pc repair shop kuwait'],
      synonyms: ['hawalli tech shop'],
      aliases: [],
      landmark: 'Hawalli, Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19',
      coords: { lat: 29.3353, lng: 48.0124 },
      serviceRadiusKm: 50,
      seo: { 
        title: 'Computer Repair Shop in Hawalli | KCROC', 
        description: 'Visit our Hawalli location in the Al Mullah Complex.', 
        canonicalUrl: '/location/hawalli' 
      },
      build: { lastReviewed: '2026-07-02', contentVersion: '2.0', schemaVersion: '1.0', validationStatus: 'Valid', isDeprecated: false },
      schemaTypes: ['LocalBusiness', 'WebPage'],
      relationships: [],
    } as LocationEntity,

    // ==========================================
    // 2. BRAND & DEVICE ENTITIES
    // ==========================================
    'brand-apple': {
      id: 'brand-apple',
      slug: 'apple-repair-kuwait',
      entityType: 'Brand',
      isActive: true,
      title: 'Apple',
      primaryKeyword: 'apple repair',
      description: 'Expert repair services for Apple products.',
      seo: { title: 'Apple Repair', description: 'Apple services', canonicalUrl: '/brand/apple' }
    } as BrandEntity,

    'device-macbook-pro': {
      id: 'device-macbook-pro',
      slug: 'macbook-pro-repair',
      entityType: 'Device',
      isActive: true,
      title: 'MacBook Pro',
      primaryKeyword: 'macbook pro repair',
      brandId: 'brand-apple',
      seo: { title: 'MacBook Pro Repair', description: 'MacBook Pro services', canonicalUrl: '/device/macbook-pro' }
    } as DeviceEntity,

    // ==========================================
    // 3. SERVICE ENTITIES (Fully Upgraded to V2 Contract)
    // ==========================================
    'srv-macbook-repair': {
      id: 'srv-macbook-repair',
      slug: 'macbook-repair-kuwait',
      title: 'MacBook Repair Kuwait',
      entityType: 'Service',
      description: 'Professional component-level repair for Apple MacBook logic boards, liquid damage, and thermal systems.',
      iconKey: 'apple',
      repairLevel: 'chip-level',
      estimatedTurnaround: '24-48 Hours',
      pricing: { startingFrom: 25, currency: 'KWD', quoteRequired: true, displayLabel: 'From 25 KWD — free diagnostic first' },
      conversion: { showBooking: true, showWhatsapp: true, showCall: true, priority: 10 },
      coreFeatures: ['Logic Board Micro-Soldering', 'Liquid Damage Restoration', 'Free Pick & Drop', 'No Fix, No Fee'],
      commonIssues: [
        { id: 'logic-board-failure', title: 'Logic Board Failure', description: 'Device will not turn on, no display with fan spinning.', symptoms: ['Will not power on', 'Black screen'], severity: 'high' },
        { id: 'liquid-damage', title: 'Liquid Damage', description: 'Liquid spill causing board shorts and corrosion.', symptoms: ['Spilled liquid', 'Died after contact'], severity: 'high' }
      ],
      seo: { title: 'MacBook Repair Kuwait | Logic Board Experts | KCROC', description: 'Expert Apple MacBook repair in Kuwait.', canonicalUrl: '/services/macbook-repair-kuwait' },
      relationships: [ { targetId: 'loc-hawalli', type: RELATIONSHIP.AVAILABLE_AT, weight: 10 } ]
    } as ServiceEntity,

    'srv-laptop-repair': {
      id: 'srv-laptop-repair',
      slug: 'laptop-repair',
      entityType: 'Service',
      isActive: true,
      title: 'Laptop Repair Kuwait',
      description: 'Expert diagnostics and hardware repair for all major Windows laptop brands including Dell, HP, Lenovo, and ASUS.',
      primaryKeyword: 'laptop repair kuwait',
      iconKey: 'laptop',
      repairLevel: 'advanced',
      estimatedTurnaround: '24-48 Hours',
      pricing: { startingFrom: 15, currency: 'KWD', quoteRequired: true, displayLabel: 'From 15 KWD — free diagnostic first' },
      conversion: { showBooking: true, showWhatsapp: true, showCall: true, priority: 9 },
      coreFeatures: ['Screen & Hinge Replacement', 'Battery Upgrades', 'Free Pick & Drop', 'Keyboard & Trackpad Repair'],
      commonIssues: [
        { id: 'broken-screen', title: 'Broken or Flickering Screen', description: 'Cracked display panels or failing display cables.', symptoms: ['Cracked glass', 'Lines on screen'], severity: 'high' },
        { id: 'dead-battery', title: 'Battery Not Holding Charge', description: 'Laptop dies immediately when unplugged.', symptoms: ['Shuts off instantly', 'Swollen case'], severity: 'medium' }
      ],
      seo: { title: 'Laptop Repair Kuwait | Windows PC Experts', description: 'Professional laptop repair services.', canonicalUrl: '/services/laptop-repair' },
      relationships: [ { targetId: 'loc-hawalli', type: RELATIONSHIP.AVAILABLE_AT, weight: 10 } ],
      media: [{ imageId: '', altText: 'Laptop Repair', role: 'hero', priority: 'eager' }]
    } as ServiceEntity,

    'srv-gaming-pc-repair': {
      id: 'srv-gaming-pc-repair',
      slug: 'gaming-pc-repair',
      entityType: 'Service',
      isActive: true,
      title: 'Gaming PC Repair Kuwait',
      description: 'Professional hardware diagnostics, custom loop maintenance, and thermal optimization for high-end gaming rigs.',
      primaryKeyword: 'gaming pc repair kuwait',
      iconKey: 'gaming',
      repairLevel: 'advanced',
      estimatedTurnaround: '24-48 Hours',
      pricing: { startingFrom: 20, currency: 'KWD', quoteRequired: true, displayLabel: 'From 20 KWD — free diagnostic first' },
      conversion: { showBooking: true, showWhatsapp: true, showCall: true, priority: 8 },
      coreFeatures: ['Thermal Paste Application', 'GPU/CPU Diagnostics', 'Custom Loop Flushing', 'Free Pick & Drop'],
      commonIssues: [
        { id: 'overheating', title: 'Thermal Throttling & Crashing', description: 'System shuts down during heavy gaming loads.', symptoms: ['Loud fans', 'Blue screen mid-game'], severity: 'high' },
        { id: 'no-post', title: 'No POST / Black Screen', description: 'Fans spin and RGB turns on, but no display output.', symptoms: ['VGA light on motherboard', 'No display'], severity: 'high' }
      ],
      seo: { title: 'Gaming PC Repair Kuwait | Custom Desktop Experts', description: 'Professional gaming PC diagnostics.', canonicalUrl: '/services/gaming-pc-repair' },
      relationships: [ { targetId: 'loc-hawalli', type: RELATIONSHIP.AVAILABLE_AT, weight: 10 } ],
      media: [{ imageId: '', altText: 'Gaming Diagnostics', role: 'hero', priority: 'eager' }]
    } as ServiceEntity,

    'srv-motherboard-repair': {
      id: 'srv-motherboard-repair',
      slug: 'motherboard-repair',
      entityType: 'Service',
      isActive: true,
      title: 'Motherboard Repair Kuwait',
      description: 'Advanced chip-level motherboard micro-soldering, short circuit tracing, and component-level restoration.',
      primaryKeyword: 'motherboard repair kuwait',
      iconKey: 'cpu',
      repairLevel: 'chip-level',
      estimatedTurnaround: '2-4 Business Days',
      pricing: { startingFrom: 35, currency: 'KWD', quoteRequired: true, displayLabel: 'From 35 KWD — free diagnostic first' },
      conversion: { showBooking: true, showWhatsapp: true, showCall: true, priority: 10 },
      coreFeatures: ['Micro-Soldering', 'Short Circuit Tracing', 'Blown Capacitor Replacement', 'Free Pick & Drop'],
      commonIssues: [
        { id: 'mobo-dead', title: 'Completely Dead System', description: 'Device shows absolutely no signs of life when power is applied.', symptoms: ['No charging light', 'No fan spin'], severity: 'high' }
      ],
      seo: { title: 'Motherboard Repair Kuwait | Chip-Level Micro-Soldering', description: 'Advanced motherboard repair.', canonicalUrl: '/services/motherboard-repair' },
      relationships: [ { targetId: 'loc-hawalli', type: RELATIONSHIP.AVAILABLE_AT, weight: 10 } ],
      media: [{ imageId: '', altText: 'Motherboard Repair', role: 'hero', priority: 'eager' }]
    } as ServiceEntity,

    // ==========================================
    // 4. FAQ ENTITIES
    // ==========================================
    'faq-pick-and-drop': {
      id: 'faq-pick-and-drop',
      slug: 'faq-pick-and-drop',
      entityType: 'FAQ',
      isActive: true,
      title: 'Do you offer a pick and drop service?',
      description: 'Yes, we offer complimentary pick and drop across Kuwait for all repair services.',
      primaryKeyword: 'pick and drop',
      seo: { title: 'Pick and Drop FAQ', description: 'Free delivery service.', canonicalUrl: '/faq/pick-and-drop' },
      relationships: []
    } as FAQEntity,
  }
};

const allEntities = Object.values(rawGraphData.entities);

export const KCROC_GRAPH = {
  ...rawGraphData,
  entities: allEntities,
  locations: allEntities.filter((e: any) => e.entityType === 'Location'),
  services: allEntities.filter((e: any) => e.entityType === 'Service'),
  faqs: allEntities.filter((e: any) => e.entityType === 'FAQ'),
  brands: allEntities.filter((e: any) => e.entityType === 'Brand'),
  devices: allEntities.filter((e: any) => e.entityType === 'Device'),
};
