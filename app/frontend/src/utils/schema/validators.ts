// File: src/utils/schema/validators.ts
import { SchemaNode } from './schemaUtils';

/**
 * VALIDATION ENGINE
 * Runs before JSON-LD is emitted.
 */
export const validateSchemaGraph = (graph: SchemaNode[]): void => {
  const ids = new Set<string>();
  const errors: string[] = [];

  graph.forEach(node => {
    // Check for duplicate @ids
    if (ids.has(node['@id'])) {
      errors.push(`Duplicate @id detected: ${node['@id']}`);
    }
    ids.add(node['@id']);

    // Check for missing required base properties
    if (!node['@type']) errors.push(`Node missing @type: ${node['@id']}`);
  });

  if (errors.length > 0) {
    console.warn('⚠️ Schema Engine Warnings:', errors);
    // In CI/CD environments, you could throw an error here to fail the build.
    // if (process.env.NODE_ENV === 'production') throw new Error('Schema Validation Failed');
  }
};
