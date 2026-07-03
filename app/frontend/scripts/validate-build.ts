// File: scripts/validate-build.ts
import { validateGraph } from './validation/validateGraph';

async function runValidationPipeline() {
  console.log('🛡️ Starting KCROC Enterprise Quality Gates...\n');

  try {
    const graphReport = await validateGraph();

    console.log('=========================================');
    console.log('       KCROC ENTERPRISE BUILD REPORT     ');
    console.log('=========================================');
    
    const statusIcon = graphReport.passed ? '✅' : '❌';
    console.log(`${graphReport.moduleName.padEnd(22)} ${statusIcon} ${graphReport.score}%`);
    console.log(`(Scanned ${graphReport.totalChecks} constraints, found ${graphReport.failedChecks} breaking issues)`);
    console.log('─────────────────────────────────────────');

    if (graphReport.issues.length > 0) {
      // Group issues by severity level for clarity
      const criticals = graphReport.issues.filter(i => i.severity === 'CRITICAL');
      const errors = graphReport.issues.filter(i => i.severity === 'ERROR');
      const warnings = graphReport.issues.filter(i => i.severity === 'WARNING');
      const infos = graphReport.issues.filter(i => i.severity === 'INFO');

      if (criticals.length > 0) {
        console.log('\n💥 CRITICAL ERRORS (Deployment Blocked):');
        criticals.forEach(i => console.log(`  • [${i.entityId}] ${i.message}`));
      }

      if (errors.length > 0) {
        console.log('\n🛑 FIELD ERRORS (Action Required):');
        errors.forEach(i => console.log(`  • [${i.entityId}] ${i.message}`));
      }

      if (warnings.length > 0) {
        console.log('\n⚠️ OPTIMIZATION WARNINGS:');
        warnings.forEach(i => console.log(`  • [${i.entityId}] ${i.message}`));
      }

      if (infos.length > 0) {
        console.log('\nℹ️ PIPELINE INFO:');
        infos.forEach(i => console.log(`  • [${i.entityId}] ${i.message}`));
      }
    }

    console.log('\n─────────────────────────────────────────');
    console.log(`Final Quality Score: ${graphReport.score}/100`);
    console.log('─────────────────────────────────────────\n');

    if (!graphReport.passed) {
      console.error('❌ BUILD REJECTED: Your graph structure contains invalid relational states.');
      process.exit(1);
    }

    console.log('🚀 Build gate cleared perfectly. Handing control to Vite production compiler.');
    process.exit(0);

  } catch (error) {
    console.error('💥 Fatal exception occurred within the static analysis runtime:', error);
    process.exit(1);
  }
}

runValidationPipeline();
