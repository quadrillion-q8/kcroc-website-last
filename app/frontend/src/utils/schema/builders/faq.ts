// File: src/utils/schema/builders/faq.ts
import { SchemaNode, generateSchemaId } from '../schemaUtils';
import { KCROCEntity, FAQEntity } from '../../../types/knowledgeGraph';

export const buildFAQ = (entity: KCROCEntity): SchemaNode | null => {
  // Pattern Rule: Always check if the data matches this builder!
  if (entity.entityType !== 'FAQ') return null;
  
  // Tell TypeScript this is definitely an FAQ
  const faq = entity as FAQEntity;
