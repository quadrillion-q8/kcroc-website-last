// File: app/frontend/scripts/validate-build.ts
import { RawGraphSchema } from '../src/types/knowledgeGraph';
import { KCROC_GRAPH } from '../src/data/graph';
import { ZodError } from 'zod';

/**
 * Checks every routable entity's seo.canonicalUrl for duplicates.
 */
function checkDuplicateCanonicalUrls(): string[] {
  const errors: string[] = [];
  const seen = new Map<string, string>(); 

  KCROC_GRAPH.routableEntities.forEach(entity => {
    const url = entity.seo?.canonicalUrl;
    if (!url) return;

    const existingId = seen.get(url);
    if (existingId) {
      errors.push(
        `Duplicate canonical URL "${url}" used by both [${existingId}] and [${entity.id}].`
      );
    } else {
      seen.set(url, entity.id);
    }
  });

  return errors;
}

/**
 * 🔥 NEW: SEO Guardrail
 * Prevents fragments (#) from entering the Graph source data.
 */
function checkCanonicalFragments(): string[] {
  const errors: string[] = [];
  KCROC_GRAPH.routableEntities.forEach(entity => {
    if (entity.seo?.canonicalUrl?.includes('#')) {
      errors.push(
        `Entity [${entity.id}] contains an invalid fragment (#) in canonicalUrl: "${entity.seo.canonicalUrl}". Use clean URLs.`
      );
    }
  });
  return errors;
}

async function run() {
  console.log('🔍 Running KCROC Enterprise Knowledge Graph Validation...');
  try {
    // 1. Parse the raw entities object against the master Zod schema
    RawGraphSchema.parse({
      metadata: KCROC_GRAPH.metadata,
      entities: KCROC_GRAPH.entities
    });

    // 2. Cross-entity check: duplicate canonical URLs
    const duplicateErrors = checkDuplicateCanonicalUrls();
    
    // 3. SEO Guardrail: Check for fragments
    const fragmentErrors = checkCanonicalFragments();

    const allErrors = [...duplicateErrors, ...fragmentErrors];

    if (allErrors.length > 0) {
      console.error('❌ CRITICAL: Data integrity violations detected!\n');
      allErrors.forEach(err => console.error(`-> ${err}`));
      console.error('\n🛑 Build halted. Fix the graph data in graph.ts before deploying.');
      process.exit(1);
    }

    console.log('🚀 Validation passed. Integrity verified. Data contract intact.');
    process.exit(0);
  } catch (error) {
    console.error('❌ CRITICAL: Data contract validation failed!\n');

    if (error instanceof ZodError) {
      error.errors.forEach((err) => {
        const path = err.path.join('.');
        console.error(`-> Field [${path}]: ${err.message}`);
      });
    } else {
      console.error(error);
    }

    console.error('\n🛑 Build halted. Fix the graph data in graph.ts before deploying.');
    process.exit(1);
  }
}

run();
