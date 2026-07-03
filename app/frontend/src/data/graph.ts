// File: app/frontend/src/data/graph.ts
import { 
  KnowledgeGraphData, 
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
    // 2. BRAND & DEVICE ENTITIES (Fixed Missing Fields)
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
    // 3. SERVICE ENTITIES (Fixed Relationship Types)
    // ==========================================
    'srv-laptop-repair': {
      id: 'srv-laptop-repair',
      slug: 'laptop-repair',
      entityType: 'Service',
      isActive: true,
      title: 'Laptop Repair Kuwait',
      description: 'Expert repair for all laptop brands.',
      primaryKeyword: 'laptop repair kuwait',
      seo: { title: 'Laptop Repair Kuwait', description: 'Repair services.', canonicalUrl: '/services/laptop-repair' },
      relationships: [
        { targetId: 'loc-hawalli', type: RELATIONSHIP.AVAILABLE_AT, weight: 10 },
        { targetId: 'faq-pick-and-drop', type: RELATIONSHIP.HAS_FAQ, weight: 10 }
      ],
      media: [{ imageId: '', altText: 'Laptop Repair', role: 'hero', priority: 'eager' }]
    } as ServiceEntity,

    'srv-gaming-pc-repair': {
      id: 'srv-gaming-pc-repair',
      slug: 'gaming-pc-repair',
      entityType: 'Service',
      isActive: true,
      title: 'Gaming PC Repair Kuwait',
      description: 'Professional gaming PC diagnostics.',
      primaryKeyword: 'gaming pc repair kuwait',
      seo: { title: 'Gaming PC Repair Kuwait', description: 'Professional diagnostics.', canonicalUrl: '/services/gaming-pc-repair' },
      relationships: [
        { targetId: 'loc-hawalli', type: RELATIONSHIP.AVAILABLE_AT, weight: 10 },
        { targetId: 'faq-pick-and-drop', type: RELATIONSHIP.HAS_FAQ, weight: 10 }
      ],
      media: [{ imageId: '', altText: 'Gaming Diagnostics', role: 'hero', priority: 'eager' }]
    } as ServiceEntity,

    'srv-motherboard-repair': {
      id: 'srv-motherboard-repair',
      slug: 'motherboard-repair',
      entityType: 'Service',
      isActive: true,
      title: 'Motherboard Repair Kuwait',
      description: 'Advanced chip-level motherboard repair.',
      primaryKeyword: 'motherboard repair kuwait',
      seo: { title: 'Motherboard Repair Kuwait', description: 'Advanced repair.', canonicalUrl: '/services/motherboard-repair' },
      relationships: [
        { targetId: 'loc-hawalli', type: RELATIONSHIP.AVAILABLE_AT, weight: 10 },
        { targetId: 'faq-pick-and-drop', type: RELATIONSHIP.HAS_FAQ, weight: 10 }
      ],
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
      description: 'Yes, we offer complimentary pick and drop.',
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
