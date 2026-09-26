// File: app/frontend/scripts/validateGraph.ts
// Build-time wrapper for the Knowledge Graph integrity validator.
import { validateGraph } from './validation/validateGraph';

async function run() {
  console.log('🔍 Running KCROC Knowledge Graph integrity validation...');
  const result = await validateGraph();

  if (result.warnings.length > 0) {
    console.warn(`⚠️ ${result.warnings.length} graph warning(s):`);
    result.warnings.forEach((warning) => console.warn(`  - ${warning}`));
  }

  if (!result.passed) {
    console.error(`❌ ${result.errors.length} graph error(s):`);
    result.errors.forEach((error) => console.error(`  - ${error}`));
    console.error('🛑 Build halted. Fix the knowledge-graph integrity errors above.');
    process.exit(1);
  }

  console.log(`✅ Knowledge Graph integrity passed (${result.errors.length} errors, ${result.warnings.length} warnings).`);
}

run().catch((error) => {
  console.error('❌ Knowledge Graph validation crashed:', error);
  process.exit(1);
});
