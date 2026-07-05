// File: app/frontend/scripts/validate-build.ts
import { RawGraphSchema } from '../src/types/knowledgeGraph';
import { KCROC_GRAPH } from '../src/data/graph';
import { ZodError } from 'zod';

async function run() {
  console.log('🔍 Running KCROC Enterprise Knowledge Graph Validation...');

  try {
    // Parse the raw entities object against the master Zod schema
    RawGraphSchema.parse({
      metadata: KCROC_GRAPH.metadata,
      entities: KCROC_GRAPH.entities
    });
    
    console.log('🚀 Validation passed. Integrity verified. Data contract intact.');
    process.exit(0);
  } catch (error) {
    console.error('❌ CRITICAL: Data contract validation failed!\n');
    
    if (error instanceof ZodError) {
      // Pretty-print Zod errors for easier debugging in Vercel logs
      error.errors.forEach((err) => {
        const path = err.path.join('.');
        console.error(`-> Field [${path}]: ${err.message}`);
      });
    } else {
      console.error(error);
    }
    
    console.error('\n🛑 Build halted. Fix the graph data in graph.ts before deploying.');
    process.exit(1); // Halts the build pipeline
  }
}

run();
