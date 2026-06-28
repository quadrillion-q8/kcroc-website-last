// File: src/utils/schema/schemaBuilder.ts
import { KCROCEntity } from '../../types/knowledgeGraph';
import { SchemaNode } from './schemaUtils';
import { SCHEMA_REGISTRY } from './schemaRegistry';
import { validateSchemaGraph } from './validators';

// Performance: In-memory cache to prevent rebuilding identical JSON strings on React re-renders
const schemaCache = new Map<string, string>();

/**
 * Enterprise Schema Orchestrator
 * Evaluates the active entity and bundles all matching schema records into a unified @graph string.
 */
export const generateAutomatedSchema = (entity: KCROCEntity): string => {
  // 1. Safety Check: Do not generate schema for inactive entities
  if (!entity.isActive) return '';

  // 2. Cache Lookup: Return immediately if we already built this string
  if (schemaCache.has(entity.id)) {
    return schemaCache.get(entity.id)!;
  }

  const graph: SchemaNode[] = [];

  // 3. Core Injection: Every entity gets a WebPage node by default
  const webPageBuilder = SCHEMA_REGISTRY['WebPage'];
  if (webPageBuilder) {
    const webPageNode = webPageBuilder(entity);
    if (webPageNode) {
      // Ensure we handle both single nodes and arrays of nodes
      if (Array.isArray(webPageNode)) graph.push(...webPageNode);
      else graph.push(webPageNode);
    }
  }

  // 4. Dynamic Entity-Driven Composition
  entity.schemaTypes.forEach(schemaType => {
    // Skip WebPage since we already added it universally above
    if (schemaType === 'WebPage') return; 

    const builder = SCHEMA_REGISTRY[schemaType];
    if (builder) {
      const result = builder(entity);
      
      if (result) {
        if (Array.isArray(result)) {
          graph.push(...result);
        } else {
          graph.push(result);
        }
      }
    } else {
      console.warn(`⚠️ Schema Engine: No builder registered for type [${schemaType}]`);
    }
  });

  // 5. Dependency Injection: Ensure LocalBusiness exists if Service is present
  const hasService = graph.some(node => node['@type'] === 'Service');
  const hasLocalBusiness = graph.some(node => node['@type'] === 'LocalBusiness');
  
  if (hasService && !hasLocalBusiness) {
    const localBizBuilder = SCHEMA_REGISTRY['LocalBusiness'];
    if (localBizBuilder) {
      const localBizNode = localBizBuilder(entity);
      if (localBizNode && !Array.isArray(localBizNode)) {
        graph.push(localBizNode);
      }
    }
  }

  // 6. Validation Pipeline
  validateSchemaGraph(graph);

  // 7. Final Assembly
  const schemaPayload = {
    '@context': 'https://schema.org',
    '@graph': graph,
  };

  const finalJson = JSON.stringify(schemaPayload, null, 2);
  
  // Save to cache for future renders
  schemaCache.set(entity.id, finalJson);

  return finalJson;
};
