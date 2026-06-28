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
      coords: { lat: 29.3353, lng: 48.0124 }, // Adjust with exact map coordinates if needed
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
      slug: 'laptop-repair', // Preserved your exact old slug
      entityType: 'Service',
      isActive: true,
      title: 'Laptop Repair Kuwait',
      description: 'Expert repair for all laptop brands including screen replacement, battery issues, and charging port repair. We strictly provide repair services and do not buy or sell devices.',
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
          imageId: IMAGES.services.laptopRepairHero.src,
          altText: IMAGES.services.laptopRepairHero.alt,
          role: 'hero',
          priority: 'eager'
        }
      ]
    } as ServiceEntity,

    'srv-gaming-pc-repair': {
      id: 'srv-gaming-pc-repair',
      slug: 'gaming-pc-repair', // Preserved your exact old slug
      entityType: 'Service',
      isActive: true,
      title: 'Gaming PC Repair Kuwait',
      description: 'Professional gaming PC diagnostics, thermal throttling solutions, and custom performance tuning. We strictly provide repair services and do not buy or sell devices.',
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
          imageId: IMAGES.services.gamingPCRepairHero.src,
          altText: IMAGES.services.gamingPCRepairHero.alt,
          role: 'hero',
          priority: 'eager'
        }
      ]
    } as ServiceEntity,

    'srv-motherboard-repair': {
      id: 'srv-motherboard-repair',
      slug: 'motherboard-repair', // Preserved your exact old slug
      entityType: 'Service',
      isActive: true,
      title: 'Motherboard Repair Kuwait',
      description: 'Advanced chip-level motherboard repair, micro-soldering, and short-circuit diagnostics. We strictly provide repair services and do not buy or sell devices.',
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
          imageId: IMAGES.services.motherboardRepairHero.src,
          altText: IMAGES.services.motherboardRepairHero.alt,
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
      title: 'Do you offer a pick and drop service?', // The Question goes in title
      description: 'Yes, we offer complimentary pick and drop free across our business services for all repairs.', // The Answer goes in description
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
 * ============================================================================
 * O(1) INDEXING ENGINE
 * Automatically builds fast lookup maps so queries never have to loop.
 * ============================================================================
 */

interface GraphIndexes {
  bySlug: Map<string, string>; // Maps slug -> ID
  byType: Map<string, string[]>; // Maps EntityType -> Array of IDs
  byKeyword: Map<string, string[]>; // Maps keyword/synonym -> Array of IDs
}

const buildGraphIndexes = (data: KnowledgeGraphData): GraphIndexes => {
  const indexes: GraphIndexes = {
    bySlug: new Map(),
    byType: new Map(),
    byKeyword: new Map()
  };

  Object.values(data.entities).forEach(entity => {
    if (!entity.isActive) return;

    // 1. Slug Index
    indexes.bySlug.set(entity.slug, entity.id);

    // 2. Type Index
    const typeArr = indexes.byType.get(entity.entityType) || [];
    typeArr.push(entity.id);
    indexes.byType.set(entity.entityType, typeArr);

    // 3. Keyword/Synonym/Alias Index
    const searchTerms = [
      entity.primaryKeyword,
      ...entity.secondaryKeywords,
      ...entity.synonyms,
      ...entity.aliases
    ].map(t => t.toLowerCase().trim());

    searchTerms.forEach(term => {
      const keywordArr = indexes.byKeyword.get(term) || [];
      if (!keywordArr.includes(entity.id)) keywordArr.push(entity.id);
      indexes.byKeyword.set(term, keywordArr);
    });
  });

  return indexes;
};

// Export the raw data and the pre-computed indexes
export const KCROC_GRAPH = rawGraphData;
export const GRAPH_INDEXES = buildGraphIndexes(rawGraphData);
