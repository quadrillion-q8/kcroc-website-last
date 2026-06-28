// File: src/utils/schema/builders/breadcrumb.ts
import { SchemaNode, generateSchemaId } from '../schemaUtils';
import { KCROCEntity } from '../../../types/knowledgeGraph';
import { BUSINESS_INFO } from '../../../constants/data';

export const buildBreadcrumb = (entity: KCROCEntity): SchemaNode | null => {
  // We don't need a safety check here because EVERY page should have a breadcrumb trail!
  
  return {
    '@type': 'BreadcrumbList',
    '@id': generateSchemaId(entity, 'breadcrumb'),
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': BUSINESS_INFO.url
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': entity.title, // Automatically uses the Graph Entity's title
        'item': `${BUSINESS_INFO.url}${entity.seo.canonicalUrl}`
      }
    ]
  };
};
