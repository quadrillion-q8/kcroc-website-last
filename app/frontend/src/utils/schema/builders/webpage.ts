// File: src/utils/schema/builders/webpage.ts
import { SchemaNode, generateSchemaId, LOCAL_BIZ_ID, WEBSITE_ID } from '../schemaUtils';
import { KCROCEntity } from '../../../types/knowledgeGraph';
import { BUSINESS_INFO } from '../../../constants/data';

export const buildWebPage = (entity: KCROCEntity): SchemaNode => {
  return {
    '@type': 'WebPage',
    '@id': generateSchemaId(entity, 'webpage'),
    'url': `${BUSINESS_INFO.url}${entity.seo.canonicalUrl}`,
    'name': entity.seo.title,
    'description': entity.seo.description,
    'isPartOf': { '@id': WEBSITE_ID },
    'about': { '@id': LOCAL_BIZ_ID }
  };
};
