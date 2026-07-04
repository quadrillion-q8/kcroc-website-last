// File: app/frontend/src/data/graph.ts

import { 
  LocationEntity, 
  ServiceEntity, 
  FAQEntity,
  BrandEntity,
  DeviceEntity,
  RELATIONSHIP
} from '../types/knowledgeGraph';

const rawGraphData: any = {
  metadata: {
    version: '2.0.0',
    lastUpdated: '2026-07-05',
    environment: 'production'
  },
  entities: {
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
      serviceAreas: ['Hawalli', 'Salmiya', 'Farwaniya', 'Mahboula', 'Kuwait City'],
      seo: { 
        title: 'Computer Repair Shop in Hawalli | KCROC', 
        description: 'Visit our Hawalli location in the Al Mullah Complex.', 
        canonicalUrl: '/location/hawalli' 
      },
      build: { lastReviewed: '2026-07-05', contentVersion: '2.0', schemaVersion: '1.0', validationStatus: 'Valid', isDeprecated: false },
      schemaTypes: ['LocalBusiness', 'WebPage'],
      relationships: [],
    } as LocationEntity,

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
      idealCustomer: 'Professionals and creators experiencing critical logic board failures or liquid damage who need fast, reliable motherboard-level repair without replacing the entire device.',
      deviceTypes: ['MacBook Pro (M1/M2/M3 & Intel)', 'MacBook Air'],
      process: [
        { step: 1, title: 'Free Diagnostic', description: 'We test your logic board components to find the exact short or failure.' },
        { step: 2, title: 'Transparent Quote', description: 'You receive a firm price for the micro-soldering repair before we begin.' },
        { step: 3, title: 'Precision Repair', description: 'Our technicians replace the microscopic blown components.' }
      ],
      warranty: { duration: '30 Days', coverage: 'Parts and labor for the specific logic board repair.', noFixNoFee: true },
      testimonials: [
        { text: 'Spilled coffee on my M2 MacBook Pro. They picked it up, fixed the logic board, and saved my project.', author: 'Ahmad S.', location: 'Salmiya' },
        { text: 'Apple told me I needed a new board for 200+ KWD. KCROC fixed a blown capacitor for a fraction of the cost.', author: 'Sarah M.', location: 'Hawalli' }
      ],
      commonProblems: [
        { id: 'liquid-damage', title: 'Liquid Damage Shorts', symptoms: ['Device completely dead', 'Keyboard sticky'], likelyCause: 'Corrosion shorting power rails on the logic board.', expectedTurnaround: '48-72 Hours', approxPriceRange: '35 - 85 KWD' },
        { id: 'no-power', title: 'No Power / Black Screen', symptoms: ['Fan spins but no display', 'No charging chime'], likelyCause: 'Blown CPU power phase or dead display IC.', expectedTurnaround: '24-48 Hours', approxPriceRange: '25 - 60 KWD' }
      ],
      faqs: [
        { question: 'Do you offer pick and drop for MacBooks?', answer: 'Yes, we offer free pick and drop for all MacBook repairs across our service areas.' }
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
      iconKey: 'laptop',
      repairLevel: 'advanced',
      estimatedTurnaround: '24-48 Hours',
      pricing: { startingFrom: 15, currency: 'KWD', quoteRequired: true, displayLabel: 'From 15 KWD — free diagnostic first' },
      conversion: { showBooking: true, showWhatsapp: true, showCall: true, priority: 9 },
      coreFeatures: ['Screen & Hinge Replacement', 'Battery Upgrades', 'Free Pick & Drop', 'Keyboard & Trackpad Repair'],
      idealCustomer: 'Students and professionals who need rapid hardware replacements like screens, batteries, or damaged hinges.',
      warranty: { duration: '30 Days', coverage: 'New parts installed and labor.', noFixNoFee: true },
      testimonials: [
        { text: 'They fixed my completely shattered ASUS gaming laptop screen perfectly and returned it the next day.', author: 'Khalid W.', location: 'Farwaniya' }
      ],
      commonProblems: [
        { id: 'broken-screen', title: 'Broken or Flickering Screen', symptoms: ['Cracked glass', 'Lines on screen'], likelyCause: 'Impact damage or failing display cables.', expectedTurnaround: '24 Hours', approxPriceRange: '15 - 45 KWD' },
        { id: 'dead-battery', title: 'Battery Not Holding Charge', symptoms: ['Shuts off instantly', 'Swollen case'], likelyCause: 'Degraded lithium-ion cells.', expectedTurnaround: '24 Hours', approxPriceRange: '15 - 30 KWD' }
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
      iconKey: 'gaming',
      repairLevel: 'advanced',
      estimatedTurnaround: '24-48 Hours',
      pricing: { startingFrom: 20, currency: 'KWD', quoteRequired: true, displayLabel: 'From 20 KWD — free diagnostic first' },
      conversion: { showBooking: true, showWhatsapp: true, showCall: true, priority: 8 },
      coreFeatures: ['Thermal Paste Application', 'GPU/CPU Diagnostics', 'Custom Loop Flushing', 'Free Pick & Drop'],
      idealCustomer: 'PC gamers experiencing thermal throttling, sudden crashes, or blue screens under heavy gaming loads.',
      warranty: { duration: '14 Days', coverage: 'Diagnostic accuracy and thermal paste application.', noFixNoFee: true },
      commonProblems: [
        { id: 'overheating', title: 'Thermal Throttling & Crashing', symptoms: ['Loud fans', 'Blue screen mid-game'], likelyCause: 'Dried out thermal paste or failing AIO pump.', expectedTurnaround: '24 Hours', approxPriceRange: '15 - 35 KWD' },
        { id: 'no-post', title: 'No POST / Black Screen', symptoms: ['VGA light on motherboard', 'No display'], likelyCause: 'Failing RAM, GPU seating issue, or dead motherboard.', expectedTurnaround: '24-48 Hours', approxPriceRange: '20 - 40 KWD' }
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
      iconKey: 'cpu',
      repairLevel: 'chip-level',
      estimatedTurnaround: '2-4 Business Days',
      pricing: { startingFrom: 35, currency: 'KWD', quoteRequired: true, displayLabel: 'From 35 KWD — free diagnostic first' },
      conversion: { showBooking: true, showWhatsapp: true, showCall: true, priority: 10 },
      coreFeatures: ['Micro-Soldering', 'Short Circuit Tracing', 'Blown Capacitor Replacement', 'Free Pick & Drop'],
      idealCustomer: 'Users who have been told their laptop is entirely dead and requires an expensive full motherboard replacement.',
      warranty: { duration: '30 Days', coverage: 'The specifically repaired circuit or component.', noFixNoFee: true },
      commonProblems: [
        { id: 'mobo-dead', title: 'Completely Dead System', symptoms: ['No charging light', 'No fan spin'], likelyCause: 'Short circuit on the primary power rail.', expectedTurnaround: '2-4 Business Days', approxPriceRange: '35 - 80 KWD' }
      ],
      seo: { title: 'Motherboard Repair Kuwait | Chip-Level Micro-Soldering', description: 'Advanced motherboard repair.', canonicalUrl: '/services/motherboard-repair' },
      relationships: [ { targetId: 'loc-hawalli', type: RELATIONSHIP.AVAILABLE_AT, weight: 10 } ],
      media: [{ imageId: '', altText: 'Motherboard Repair', role: 'hero', priority: 'eager' }]
    } as ServiceEntity,

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
