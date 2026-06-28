// File: src/data/graph.ts
import { 
  KnowledgeGraphData, 
  KCROCEntity, 
  LocationEntity, 
  ServiceEntity, 
  FAQEntity 
} from '../types/knowledgeGraph';
import { IMAGES } from '../constants/images';

/**
 * THE MASTER DATABASE
 * All entities across the entire application live here.
 */
const rawGraphData: KnowledgeGraphData = {
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
      build: { lastReviewed: '2026-06-28', contentVersion: '1.0', schemaVersion: '1.0', validationStatus: 'Valid', isDeprecated: false },
      schemaTypes: ['LocalBusiness', 'WebPage'],
      relationships: [],
    } as LocationEntity,

    // ==========================================
    // 2. SERVICE ENTITIES
    // ==========================================
    'srv-laptop-repair': {
      id: 'srv-laptop-repair',
      slug: 'laptop-repair',
      entityType: 'Service',
      isActive: true,
      title: 'Laptop Repair Kuwait',
      description: 'Expert repair for all laptop brands including screen replacement, battery issues, and charging port repair.',
      primaryKeyword: 'laptop repair kuwait',
      secondaryKeywords: ['laptop screen replacement', 'laptop battery fix', 'charging port repair'],
      synonyms: ['notebook repair', 'laptop fixing'],
      aliases: ['lap top repair'],
      isPickAndDropEligible: true,
      basePrice: 15,
      serviceCategory: 'Computer Repair',
      seo: { 
        title: 'Laptop Repair Kuwait | Screen & Battery Replacement', 
        description: 'Expert repair for all laptop brands including screen replacement, battery issues, and charging port repair.', 
        canonicalUrl: '/services/laptop-repair' 
      },
      build: { lastReviewed: '2026-06-28', contentVersion: '1.0', schemaVersion: '1.0', validationStatus: 'Valid', isDeprecated: false },
      schemaTypes: ['Service', 'WebPage', 'FAQPage', 'BreadcrumbList', 'ImageObject'],
      relationships: [
        { targetId: 'loc-hawalli', relationshipType: 'nearby', weight: 10 },
        { targetId: 'faq-pick-and-drop', relationshipType: 'related', weight: 10 }
      ],
      media: [
        {
          imageId: IMAGES?.services?.laptopRepair?.src || '',
          altText: IMAGES?.services?.laptopRepair?.alt || 'Laptop Repair',
          role: 'hero',
          priority: 'eager'
        }
      ]
    } as ServiceEntity,

    'srv-gaming-pc-repair': {
      id: 'srv-gaming-pc-repair',
      slug: 'gaming-pc-repair',
      entityType: 'Service',
      isActive: true,
      title: 'Gaming PC Repair Kuwait',
      description: 'Professional gaming PC diagnostics, thermal throttling solutions, and custom performance tuning.',
      primaryKeyword: 'gaming pc repair kuwait',
      secondaryKeywords: ['pc diagnostics', 'thermal throttling fix', 'custom performance tuning'],
      synonyms: ['gaming computer repair', 'custom pc fix'],
      aliases: [],
      isPickAndDropEligible: true,
      basePrice: 20,
      serviceCategory: 'Computer Repair',
      seo: { 
        title: 'Gaming PC Repair Kuwait | FPS & Thermal Tuning', 
        description: 'Professional gaming PC diagnostics, thermal throttling solutions, and custom performance tuning.', 
        canonicalUrl: '/services/gaming-pc-repair' 
      },
      build: { lastReviewed: '2026-06-28', contentVersion: '1.0', schemaVersion: '1.0', validationStatus: 'Valid', isDeprecated: false },
      schemaTypes: ['Service', 'WebPage', 'FAQPage', 'BreadcrumbList', 'ImageObject'],
      relationships: [
        { targetId: 'loc-hawalli', relationshipType: 'nearby', weight: 10 },
        { targetId: 'faq-pick-and-drop', relationshipType: 'related', weight: 10 }
      ],
      media: [
        {
          imageId: IMAGES?.gaming?.diagnostics?.src || '',
          altText: IMAGES?.gaming?.diagnostics?.alt || 'Gaming PC Diagnostics',
          role: 'hero',
          priority: 'eager'
        }
      ]
    } as ServiceEntity,

    'srv-motherboard-repair': {
      id: 'srv-motherboard-repair',
      slug: 'motherboard-repair',
      entityType: 'Service',
      isActive: true,
      title: 'Motherboard Repair Kuwait',
      description: 'Advanced chip-level motherboard repair, micro-soldering, and short-circuit diagnostics.',
      primaryKeyword: 'motherboard repair kuwait',
      secondaryKeywords: ['chip-level repair', 'micro-soldering', 'short-circuit diagnostics'],
      synonyms: ['logic board repair', 'mainboard fix'],
      aliases: [],
      isPickAndDropEligible: true,
      basePrice: 35,
      serviceCategory: 'Computer Repair',
      seo: { 
        title: 'Motherboard Repair Kuwait | Micro-Soldering Experts', 
        description: 'Advanced chip-level motherboard repair, micro-soldering, and short-circuit diagnostics.', 
        canonicalUrl: '/services/motherboard-repair' 
      },
      build: { lastReviewed: '2026-06-28', contentVersion: '1.0', schemaVersion: '1.0', validationStatus: 'Valid', isDeprecated: false },
      schemaTypes: ['Service', 'WebPage', 'FAQPage', 'BreadcrumbList', 'ImageObject'],
      relationships: [
        { targetId: 'loc-hawalli', relationshipType: 'nearby', weight: 10 },
        { targetId: 'faq-pick-and-drop', relationshipType: 'related', weight: 10 }
      ],
      media: [
        {
          imageId: IMAGES?.services?.motherboardRepair?.src || '',
          altText: IMAGES?.services?.motherboardRepair?.alt || 'Motherboard Repair',
          role: 'hero',
          priority: 'eager'
        }
      ]
    } as ServiceEntity,

    // ==========================================
    // 3. FAQ ENTITIES
    // ==========================================
    'faq-pick-and-drop': {
      id: 'faq-pick-and-drop',
      slug: 'faq-pick-and-drop',
      entityType: 'FAQ',
      isActive: true,
      title: 'Do you offer a pick and drop service?',
      description: 'Yes, we offer complimentary pick and drop free across our business services for all repairs.',
      primaryKeyword: 'pick and drop',
      secondaryKeywords: ['delivery service', 'pickup'],
      synonyms: [],
      aliases: [],
      seo: { 
        title: 'Pick and Drop FAQ', 
        description: 'Information about our free delivery service.', 
        canonicalUrl: '/faq/pick-and-drop' 
      },
      build: { lastReviewed: '2026-06-28', contentVersion: '1.0', schemaVersion: '1.0', validationStatus: 'Valid', isDeprecated: false },
      schemaTypes: ['FAQPage'],
      relationships: []
    } as FAQEntity,

  }
};

/**
 * O(1) INDEXING ENGINE
 */
const buildGraphIndexes = (data: KnowledgeGraphData): any => {
  const indexes = { bySlug: new Map(), byType: new Map(), byKeyword: new Map() };
  Object.values(data.entities).forEach(entity => {
    if (!entity.isActive) return;
    indexes.bySlug.set(entity.slug, entity.id);
    const typeArr = indexes.byType.get(entity.entityType) || [];
    typeArr.push(entity.id);
    indexes.byType.set(entity.entityType, typeArr);
    const searchTerms = [entity.primaryKeyword, ...entity.secondaryKeywords, ...entity.synonyms, ...entity.aliases].map(t => t.toLowerCase().trim());
    searchTerms.forEach(term => {
      const keywordArr = indexes.byKeyword.get(term) || [];
      if (!keywordArr.includes(entity.id)) keywordArr.push(entity.id);
      indexes.byKeyword.set(term, keywordArr);
    });
  });
  return indexes;
};

export const KCROC_GRAPH = rawGraphData;
export const GRAPH_INDEXES = buildGraphIndexes(rawGraphData);
