// File: src/utils/schema/builders/service.ts
import { SchemaNode, generateSchemaId, LOCAL_BIZ_ID } from '../schemaUtils';
import { KCROCEntity, ServiceEntity } from '../../../types/knowledgeGraph';
import { BUSINESS_INFO } from '../../../constants/data';

export const buildService = (entity: KCROCEntity): SchemaNode | null => {
  // 1. Safety Check
  if (entity.entityType !== 'Service') return null;
  const service = entity as ServiceEntity;

  // 2. Generate Stable ID
  const serviceId = generateSchemaId(service, 'service');

  // 3. Construct Base Service Node
  const serviceNode: SchemaNode = {
    '@type': 'Service',
    '@id': serviceId,
    'name': service.title,
    'description': service.description,
    'provider': { '@id': LOCAL_BIZ_ID },
    'serviceType': service.serviceCategory, // Helps AI Search categorize the service
    'areaServed': {
      '@type': 'Country',
      'name': 'Kuwait'
    },
    'url': `${BUSINESS_INFO.url}${service.seo.canonicalUrl}`
  };

  // 4. Automated Offer Generation (Only if pricing data exists)
  if (service.basePrice !== undefined) {
    serviceNode['hasOfferCatalog'] = {
      '@type': 'OfferCatalog',
      'name': `${service.title} Services`,
      'itemListElement': [
        {
          '@type': 'Offer',
          '@id': generateSchemaId(service, 'offer'),
          'itemOffered': { '@id': serviceId },
          'priceCurrency': 'KWD',
          'price': service.basePrice,
          'url': `${BUSINESS_INFO.url}${service.seo.canonicalUrl}`, // Required by Google for Offers
          'availability': 'https://schema.org/InStock', // Signals that you are actively taking clients
          'seller': { '@id': LOCAL_BIZ_ID }
        }
      ]
    };
  }

  // 5. Pick & Drop Modifier (Maps to Schema.org delivery methods)
  if (service.isPickAndDropEligible) {
    serviceNode['availableChannel'] = {
      '@type': 'ServiceChannel',
      'serviceLocation': {
        '@type': 'Place',
        'name': 'Customer Location (Pick & Drop)'
      }
    };
  }

  return serviceNode;
};
