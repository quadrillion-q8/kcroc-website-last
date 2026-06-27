// File: src/utils/schema/builders/localBusiness.ts
import { SchemaNode, generateSchemaId, LOCAL_BIZ_ID } from '../schemaUtils';
import { KCROCEntity, LocationEntity } from '../../../types/knowledgeGraph';
import { BUSINESS_INFO } from '../../../constants/data';

export const buildLocalBusiness = (entity: KCROCEntity): SchemaNode => {
  const location = entity.entityType === 'Location' ? (entity as LocationEntity) : undefined;

  return {
    '@type': 'LocalBusiness',
    '@id': LOCAL_BIZ_ID,
    'name': BUSINESS_INFO.name,
    'url': BUSINESS_INFO.url,
    'telephone': BUSINESS_INFO.phone,
    'priceRange': '$$',
    'image': 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto/v1769908596/logo_btpfls.png',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': location?.landmark || BUSINESS_INFO.address,
      'addressLocality': location?.title || 'Hawalli',
      'addressCountry': 'KW',
    },
    'geo': location?.coords ? {
      '@type': 'GeoCoordinates',
      'latitude': location.coords.lat,
      'longitude': location.coords.lng,
    } : undefined
  };
};
