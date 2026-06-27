// File: src/utils/schema/builders/service.ts
import { SchemaNode, generateSchemaId, LOCAL_BIZ_ID } from '../schemaUtils';
import { KCROCEntity, ServiceEntity } from '../../../types/knowledgeGraph';

export const buildService = (entity: KCROCEntity): SchemaNode | null => {
  if (entity.entityType !== 'Service') return null;
  const service = entity as ServiceEntity;

  const serviceId = generateSchemaId(service, 'service');

  return {
    '@type': 'Service',
    '@id': serviceId,
    'name': service.title,
    'description': service.description,
    'provider': { '@id': LOCAL_BIZ_ID },
    // Automated Offer Generation mapping to pricing data
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': service.serviceCategory,
      'itemListElement': [
        {
          '@type': 'Offer',
          '@id': generateSchemaId(service, 'offer'),
          'itemOffered': { '@id': serviceId },
          'priceCurrency': 'KWD',
          'price': service.basePrice || '0',
          'seller': { '@id': LOCAL_BIZ_ID }
        }
      ]
    }
  };
};
