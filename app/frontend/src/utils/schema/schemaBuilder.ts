// File: src/utils/schema/schemaBuilder.ts
import { KCROCEntity } from '../../types/knowledgeGraph';
import { SchemaNode } from './schemaUtils';
import { SCHEMA_REGISTRY } from './schemaRegistry';
import { validateSchemaGraph } from './validators';

// Performance: In-memory cache to prevent rebuilding identical JSON strings on re-renders
const schemaCache = new Map<string, string>();

export const generateAutomatedSchema = (entity: KCROCEntity): string => {
  if (!entity.isActive) return '';

  // Cache Lookup
  if (schemaCache.has(entity.id)) {
    return schemaCache.get(entity.id)!;
  }

  const graph: SchemaNode[] = [];

  // 1. Core Injection: Every entity gets a WebPage node by default
  const webPageBuilder = SCHEMA_REGISTRY['WebPage'];
  if (webPageBuilder) {
    const webPageNode = webPageBuilder(entity);
    if (webPageNode) graph.push(webPageNode as SchemaNode);
  }

  // 2. Dynamic Entity-Driven Composition
  entity.schemaTypes.forEach(schemaType => {
    // Skip WebPage since we already added it
    if (schemaType === 'WebPage') return; 

    const builder = SCHEMA_REGISTRY[schemaType];
    if (builder) {
      const result = builder(entity);
      
      // Builders can return a single node or an array of related nodes (e.g., Review + AggregateRating)
      if (Array.isArray(result)) {
        graph.push(...result);
      } else if (result) {
        graph.push(result);
      }
    } else {
      console.warn(`No schema builder registered for type: ${schemaType}`);
    }
  });

  // 3. Dependency Injection: Ensure LocalBusiness exists if Service is present
  if (graph.some(node => node['@type'] === 'Service') && !graph.some(node => node['@type'] === 'LocalBusiness')) {
    const localBizNode = SCHEMA_REGISTRY['LocalBusiness']!(entity);
    graph.push(localBizNode as SchemaNode);
  }

  // 4. Validation Pipeline
  validateSchemaGraph(graph);

  // 5. Final Assembly & Caching
  const schemaPayload = {
    '@context': 'https://schema.org',
    '@graph': graph,
  };

  const finalJson = JSON.stringify(schemaPayload, null, 2);
  schemaCache.set(entity.id, finalJson);

  return finalJson;
};
