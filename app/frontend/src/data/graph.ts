// File: src/data/graph.ts
import { KnowledgeGraphData } from '../types/knowledgeGraph';

/**
 * THE KCROC MASTER KNOWLEDGE GRAPH
 * This single object powers the entire routing, SEO, schema, and internal linking system.
 */
export const KCROC_GRAPH: KnowledgeGraphData = {
  
  // ─── SERVICES ─────────────────────────────────────────────────────────
  services: {
    'srv-laptop-repair': {
      id: 'srv-laptop-repair',
      slug: 'laptop-repair-kuwait',
      title: 'Laptop Repair',
      entityType: 'Service',
      serviceCategory: 'Hardware Repair',
      synonyms: ['laptop fixing', 'computer repair', 'windows laptop repair', 'pc repair'],
      aliases: ['lap top repair'],
      isActive: true,
      isPickAndDropEligible: true,
      seo: {
        title: 'Expert Laptop Repair in Kuwait | Free Pickup | KCROC',
        description: 'Professional Windows laptop repair in Kuwait. We fix overheating, dead batteries, broken hinges, and motherboard failures.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-repair-kuwait',
      },
      schema: {
        schemaTypes: ['Service', 'WebPage'],
        customSchemaId: '#laptop-repair-service'
      },
      ai: {
        searchIntent: 'transactional',
        semanticKeywords: ['laptop repair', 'computer fix', 'hardware diagnostics'],
      },
      relationships: {
        relatedLocations: ['loc-hawalli', 'loc-salmiya'],
        relatedIssues: ['iss-thermal'],
        childEntities: ['srv-motherboard-repair']
      }
    },
    'srv-macbook-repair': {
      id: 'srv-macbook-repair',
      slug: 'macbook-repair-kuwait',
      title: 'MacBook Repair',
      entityType: 'Service',
      serviceCategory: 'Logic Board Diagnostics',
      synonyms: ['apple macbook repair', 'mac repair', 'apple repair'],
      aliases: ['mac book repair'],
      isActive: true,
      isPickAndDropEligible: true,
      seo: {
        title: 'MacBook Logic Board & Screen Repair Kuwait | KCROC',
        description: 'Expert Apple logic board micro-soldering and OEM screen replacement in Kuwait.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/macbook-repair-kuwait',
      },
      schema: {
        schemaTypes: ['Service', 'WebPage'],
        customSchemaId: '#macbook-repair-service'
      },
      ai: {
        searchIntent: 'transactional',
        semanticKeywords: ['macbook repair', 'apple logic board', 'micro-soldering'],
      },
      relationships: {
        relatedBrands: ['brd-apple'],
        relatedLocations: ['loc-hawalli', 'loc-salmiya'],
      }
    }
  },

  // ─── BRANDS ───────────────────────────────────────────────────────────
  brands: {
    'brd-apple': {
      id: 'brd-apple',
      slug: 'apple-repair-kuwait',
      title: 'Apple',
      entityType: 'Brand',
      synonyms: ['mac', 'macbook', 'imac'],
      aliases: [],
      isActive: true,
      seo: {
        title: 'Apple Repair Services Kuwait | KCROC',
        description: 'Independent Apple hardware repair specialists in Kuwait.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/apple-repair-kuwait',
      },
      schema: {
        schemaTypes: ['Organization', 'WebPage']
      },
      relationships: {
        relatedServices: ['srv-macbook-repair']
      }
    }
  },

  // ─── LOCATIONS ────────────────────────────────────────────────────────
  locations: {
    'loc-hawalli': {
      id: 'loc-hawalli',
      slug: 'computer-repair-hawalli',
      title: 'Hawalli',
      entityType: 'Location',
      landmark: 'Ibn Khaldoun Street',
      coords: { lat: 29.3356, lng: 48.0250 },
      populationDensity: 'High',
      synonyms: ['hawally', 'Ibn Khaldoun'],
      aliases: [],
      isActive: true,
      seo: {
        title: 'Computer Repair in Hawalli | KCROC Lab',
        description: 'Visit our main diagnostic lab on Ibn Khaldoun Street in Hawalli for elite computer repair.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/computer-repair-hawalli',
      },
      schema: {
        schemaTypes: ['LocalBusiness', 'WebPage']
      },
      relationships: {
        relatedServices: ['srv-laptop-repair', 'srv-macbook-repair']
      }
    }
  },

  // ─── ISSUES ───────────────────────────────────────────────────────────
  issues: {
    'iss-thermal': {
      id: 'iss-thermal',
      slug: 'laptop-overheating-fix',
      title: 'Thermal Throttling',
      entityType: 'Issue',
      symptoms: ['loud fan', 'laptop shutting down randomly', 'hot to touch', 'fps drops in games'],
      severity: 'Moderate',
      synonyms: ['overheating', 'hot laptop', 'fan noise'],
      aliases: [],
      isActive: true,
      seo: {
        title: 'Fix Laptop Overheating & Thermal Throttling | KCROC',
        description: 'Professional thermal paste replacement and cooling system restoration in Kuwait.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-overheating-fix',
      },
      schema: {
        schemaTypes: ['Article', 'WebPage']
      },
      relationships: {
        relatedServices: ['srv-laptop-repair']
      }
    }
  },

  // ─── ROUTES (Automated Generation Engine) ─────────────────────────────
  routes: {
    'route-laptop-repair': {
      id: 'route-laptop-repair',
      slug: 'laptop-repair-kuwait',
      title: 'Laptop Repair Route',
      entityType: 'Route',
      path: '/laptop-repair-kuwait',
      templateId: 'ServiceTemplate',
      priority: 0.9,
      changeFrequency: 'weekly',
      synonyms: [],
      aliases: [],
      isActive: true,
      seo: {
        title: 'Internal Route Config',
        description: 'Internal Route Config',
        canonicalUrl: '',
      },
      schema: { schemaTypes: [] }
    }
  },

  // ─── EMPTY COLLECTIONS (To be filled later) ─────────────────────────
  devices: {},
  categories: {},
  blogs: {},
  faqs: {},
  reviews: {},
  images: {},
  videos: {},
  pricing: {},
  authors: {},
  testimonials: {}
};
