// File: src/data/graph.ts
import { 
  KnowledgeGraphData, 
  KCROCEntity, 
  LocationEntity, 
  ServiceEntity, 
  FAQEntity 
} from '../types/knowledgeGraph';

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
      slug: 'laptop-repair-kuwait',
      entityType: 'Service',
      isActive: true,
      title: 'Laptop Repair Services',
      description: 'Expert laptop motherboard diagnostics and screen replacement. We strictly provide repair services and do not buy or sell devices. Complimentary pick and drop included.',
      primaryKeyword: 'laptop repair',
      secondaryKeywords: ['computer fix', 'pc repair', 'motherboard repair'],
      synonyms: ['laptop fixing', 'notebook repair'],
      aliases: ['lap top repair'],
      isPickAndDropEligible: true,
      basePrice: 15, // Update with your actual base price
      serviceCategory: 'Computer Repair',
      seo: { 
        title: 'Laptop Repair Kuwait | Free Pick & Drop', 
        description: 'Expert laptop fix with complimentary pickup and delivery.', 
        canonicalUrl: '/laptop-repair-kuwait' 
      },
      build: { lastReviewed: '2026-06-28', contentVersion: '1.0', schemaVersion: '1.0', validationStatus: 'Valid', isDeprecated: false },
      schemaTypes: ['Service', 'WebPage', 'FAQPage', 'BreadcrumbList'],
      relationships: [
        { targetId: 'loc-hawalli', relationshipType: 'nearby', weight: 10 },
        { targetId: 'faq-pick-and-drop', relationshipType: 'related', weight: 10 }
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

    // --> Add the rest of your old services and FAQs right here following the patterns above! <--

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
