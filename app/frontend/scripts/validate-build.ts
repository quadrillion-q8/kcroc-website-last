import { validateGraph } from './validation/validateGraph.ts';

async function runPipeline() {
  console.log('🔍 Running KCROC Enterprise Validation...');
  const report = await validateGraph();

  console.log(`\nReport: ${report.moduleName} - ${report.passed ? '✅' : '❌'}`);
  report.issues.forEach(i => console.log(`  [${i.severity}] ${i.entityId}: ${i.message}`));
  
  if (!report.passed) {
    console.error('\n🛑 Build rejected due to Critical/Error issues.');
    process.exit(1);
  }
  console.log('\n🚀 Validation passed.');
  process.exit(0);
}

runPipeline();
