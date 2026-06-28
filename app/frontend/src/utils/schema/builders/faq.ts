// File: src/utils/schema/builders/faq.ts
import { SchemaNode, generateSchemaId } from '../schemaUtils';
import { KCROCEntity, FAQEntity } from '../../../types/knowledgeGraph';
import { getRelatedEntities } from '../../graphQueries';

/**
 * Enterprise FAQ Schema Builder
 * Dynamically queries the Knowledge Graph for any FAQs related to the current entity
 * and formats them into a strict Google-compliant FAQPage schema.
 */
export const buildFAQ = (entity: KCROCEntity): SchemaNode | null => {
  // 1. Fetch all FAQs related to this specific entity from the Knowledge Graph
  // We use the generic type <FAQEntity> so TypeScript knows exactly what data we are getting back.
  const relatedFAQs = getRelatedEntities<FAQEntity>(entity.id, 'related', 'FAQ');

  // 2. Safety Check: If there are no related FAQs, do not generate an empty schema!
  if (!relatedFAQs || relatedFAQs.length === 0) {
    return null;
  }

  // 3. Construct the FAQPage Node using the fetched data
  return {
    '@type': 'FAQPage',
    '@id': generateSchemaId(entity, 'faq'),
    'mainEntity': relatedFAQs.map((faq) => ({
      '@type': 'Question',
      'name': faq.title, // In our Knowledge Graph, the title is the actual question
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.description // In our Knowledge Graph, the description holds the answer
      }
    }))
  };
};
