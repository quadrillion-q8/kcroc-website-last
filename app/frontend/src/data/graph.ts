// File: app/frontend/src/data/graph.ts

import { 
  RawGraphData,
  LocationEntity, 
  ServiceEntity, 
  FAQEntity,
  BrandEntity,
  DeviceEntity
} from '../types/knowledgeGraph';

// Strictly typed to match the Zod schema invariants
const rawGraphData: RawGraphData = {
  metadata: {
    version: '2.0.1',
    lastUpdated: '2026-07-06',
    environment: 'production'
  },
  entities: {
    'loc-hawalli': {
      id: 'loc-hawalli',
      slug: 'computer-repair-hawalli',
      entityType: 'Location',
      isActive: true,
      title: 'Hawalli Repair Center',
      description: 'Kuwait\'s premier component-level repair facility specializing in advanced micro-soldering and hardware diagnostics.',
      landmark: 'Hawalli, Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19',
      coords: { lat: 29.3353, lng: 48.0124 },
      serviceAreas: ['Hawalli', 'Salmiya', 'Farwaniya', 'Mahboula', 'Kuwait City', 'Jahra'],
      seo: { 
        title: 'Computer Repair Shop in Hawalli | KCROC', 
        description: 'Visit our Hawalli location in the Al Mullah Complex for expert component-level repairs.', 
        canonicalUrl: '/location/hawalli' 
      }
    } as LocationEntity,

    'brand-apple': {
      id: 'brand-apple',
      slug: 'apple-repair-kuwait',
      entityType: 'Brand',
      isActive: true,
      title: 'Apple',
      description: 'Expert component-level repair services for Apple MacBooks and hardware.',
      seo: { title: 'Apple Repair Kuwait', description: 'Specialized Apple repair services in Kuwait.', canonicalUrl: '/brand/apple' }
    } as BrandEntity,

    'device-macbook-pro': {
      id: 'device-macbook-pro',
      slug: 'macbook-pro-repair',
      entityType: 'Device',
      isActive: true,
      title: 'MacBook Pro',
      brandId: 'brand-apple',
      description: 'Professional repair for all MacBook Pro models including M-series and Intel chips.',
      seo: { title: 'MacBook Pro Repair Kuwait', description: 'Professional MacBook Pro repair in Kuwait.', canonicalUrl: '/device/macbook-pro' }
    } as DeviceEntity,

    'srv-macbook-repair': {
      id: 'srv-macbook-repair',
      slug: 'macbook-repair-kuwait',
      entityType: 'Service',
      isActive: true,
      title: 'MacBook Repair Kuwait',
      description: 'We don’t just swap expensive boards—we fix them. Professional component-level repair for Apple MacBook logic boards, liquid damage, and display circuits.',
      iconKey: 'apple',
      pricing: { startingFrom: 25, currency: 'KWD', quoteRequired: true, displayLabel: 'From 25 KWD — free diagnostic first' },
      coreFeatures: ['Logic Board Micro-Soldering', 'Liquid Damage Restoration', 'Free Pick & Drop', 'No Fix, No Fee'],
      process: [
        { step: 1, title: 'Free Diagnostic', description: 'We test your logic board components to find the exact short or failure.' },
        { step: 2, title: 'Transparent Quote', description: 'You receive a firm price for the micro-soldering repair before we begin.' },
        { step: 3, title: 'Precision Repair', description: 'Our technicians replace the microscopic blown components.' }
      ],
      warranty: { duration: '30 Days', coverage: 'Parts and labor for the specific logic board repair.', noFixNoFee: true },
      commonProblems: [
        { id: 'liquid-damage', title: 'Liquid Damage Shorts', symptoms: ['Device completely dead', 'Keyboard sticky'], likelyCause: 'Corrosion shorting power rails on the logic board.', expectedTurnaround: '48-72 Hours', approxPriceRange: '35 - 85 KWD' }
      ],
      seo: { title: 'MacBook Repair Kuwait | Logic Board Experts | KCROC', description: 'Expert Apple MacBook repair in Kuwait.', canonicalUrl: '/services/macbook-repair-kuwait' }
    } as ServiceEntity,

    'srv-laptop-repair': {
      id: 'srv-laptop-repair',
      slug: 'laptop-repair',
      entityType: 'Service',
      isActive: true,
      title: 'Laptop Repair Kuwait',
      description: 'Expert diagnostics and hardware repair for all major Windows laptop brands including Dell, HP, Lenovo, and ASUS.',
      iconKey: 'laptop',
      pricing: { startingFrom: 15, currency: 'KWD', quoteRequired: true, displayLabel: 'From 15 KWD — free diagnostic first' },
      coreFeatures: ['Screen & Hinge Replacement', 'Battery Upgrades', 'Free Pick & Drop', 'No Fix, No Fee'],
      process: [
        { step: 1, title: 'Component Check', description: 'We test the failing hardware and source the exact replacement part.' },
        { step: 2, title: 'Installation', description: 'Professional installation and cable routing.' }
      ],
      warranty: { duration: '30 Days', coverage: 'New parts installed and labor.', noFixNoFee: true },
      commonProblems: [
        { id: 'broken-screen', title: 'Broken or Flickering Screen', symptoms: ['Cracked glass', 'Lines on screen'], likelyCause: 'Impact damage or failing display cables.', expectedTurnaround: '24 Hours', approxPriceRange: '15 - 45 KWD' }
      ],
      seo: { title: 'Laptop Repair Kuwait | Windows PC Experts', description: 'Professional laptop repair services.', canonicalUrl: '/services/laptop-repair' }
    } as ServiceEntity,

    'srv-gaming-pc-repair': {
      id: 'srv-gaming-pc-repair',
      slug: 'gaming-pc-repair',
      entityType: 'Service',
      isActive: true,
      title: 'Gaming PC Repair Kuwait',
      description: 'Professional hardware diagnostics, custom loop maintenance, and thermal optimization for high-end gaming rigs.',
      iconKey: 'gaming',
      pricing: { startingFrom: 20, currency: 'KWD', quoteRequired: true, displayLabel: 'From 20 KWD — free diagnostic first' },
      coreFeatures: ['Thermal Paste Application', 'GPU/CPU Diagnostics', 'Custom Loop Flushing', 'Free Pick & Drop'],
      process: [
        { step: 1, title: 'Stress Testing', description: 'We run synthetic benchmarks to force the crash and isolate the failing component.' },
        { step: 2, title: 'Optimization', description: 'Thermal repasting, cable management, or component replacement.' }
      ],
      warranty: { duration: '14 Days', coverage: 'Diagnostic accuracy and thermal paste application.', noFixNoFee: true },
      commonProblems: [
        { id: 'overheating', title: 'Thermal Throttling & Crashing', symptoms: ['Loud fans', 'Blue screen mid-game'], likelyCause: 'Dried out thermal paste or failing AIO pump.', expectedTurnaround: '24 Hours', approxPriceRange: '15 - 35 KWD' }
      ],
      seo: { title: 'Gaming PC Repair Kuwait | Custom Desktop Experts', description: 'Professional gaming PC diagnostics.', canonicalUrl: '/services/gaming-pc-repair' }
    } as ServiceEntity,

    'srv-motherboard-repair': {
      id: 'srv-motherboard-repair',
      slug: 'motherboard-repair',
      entityType: 'Service',
      isActive: true,
      title: 'Motherboard Repair Kuwait',
      description: 'Advanced chip-level motherboard micro-soldering, short circuit tracing, and component-level restoration.',
      iconKey: 'cpu',
      pricing: { startingFrom: 35, currency: 'KWD', quoteRequired: true, displayLabel: 'From 35 KWD — free diagnostic first' },
      coreFeatures: ['Micro-Soldering', 'Short Circuit Tracing', 'Blown Capacitor Replacement', 'Free Pick & Drop'],
      process: [
        { step: 1, title: 'Diagnostic Tracing', description: 'We map the power rails to locate the exact short circuit causing the failure.' },
        { step: 2, title: 'Micro-Soldering', description: 'We replace the blown capacitors or IC chips under a microscope.' },
        { step: 3, title: 'Load Testing', description: 'The board is tested under heavy power loads before reassembly.' }
      ],
      warranty: { duration: '30 Days', coverage: 'The specifically repaired circuit or component.', noFixNoFee: true },
      commonProblems: [
        { id: 'mobo-dead', title: 'Completely Dead System', symptoms: ['No charging light', 'No fan spin'], likelyCause: 'Short circuit on the primary power rail.', expectedTurnaround: '2-4 Business Days', approxPriceRange: '35 - 80 KWD' }
      ],
      seo: { title: 'Motherboard Repair Kuwait | Chip-Level Micro-Soldering', description: 'Advanced motherboard repair.', canonicalUrl: '/services/motherboard-repair' }
    } as ServiceEntity,

    'faq-pick-and-drop': {
      id: 'faq-pick-and-drop',
      slug: 'faq-pick-and-drop',
      entityType: 'FAQ',
      isActive: true,
      title: 'Do you offer a pick and drop service?',
      description: 'Information regarding our device collection policy.',
      answer: 'Yes, we offer complimentary pick and drop across Kuwait for all repair services.',
      seo: { title: 'Pick and Drop FAQ', description: 'Free delivery service.', canonicalUrl: '/faq/pick-and-drop' }
    } as FAQEntity,
  }
};

// Builder Object: Extracts strictly active entities for safe UI & SEO consumption
const allEntities = Object.values(rawGraphData.entities);

export const KCROC_GRAPH = {
  ...rawGraphData,
  activeEntities: allEntities.filter(e => e.isActive),
  locations: allEntities.filter((e): e is LocationEntity => e.entityType === 'Location' && e.isActive),
  services: allEntities.filter((e): e is ServiceEntity => e.entityType === 'Service' && e.isActive),
  faqs: allEntities.filter((e): e is FAQEntity => e.entityType === 'FAQ' && e.isActive),
  brands: allEntities.filter((e): e is BrandEntity => e.entityType === 'Brand' && e.isActive),
  devices: allEntities.filter((e): e is DeviceEntity => e.entityType === 'Device' && e.isActive),
};
