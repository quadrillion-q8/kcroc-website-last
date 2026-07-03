import { validateGraph } from './validation/validateGraph';

async function run() {
  console.log('🔍 Running KCROC Enterprise Knowledge Graph Validation...');
  const { passed, errors, warnings } = await validateGraph();
  
  warnings.forEach(w => console.warn(`⚠️ WARNING: ${w}`));
  errors.forEach(e => console.error(`❌ ERROR: ${e}`));

  if (!passed) {
    console.error(`\n🛑 Build failed with ${errors.length} errors.`);
    process.exit(1);
  }
  console.log('\n🚀 Validation passed. Integrity verified.');
  process.exit(0);
}

run();
