// File: scripts/validate-build.ts
import { validateGraph } from './validation/validateGraph';
import { ValidationReport } from './validation/types';

async function runEnterpriseValidation() {
  console.log('🔍 Booting KCROC Enterprise Validation Suite...\n');

  const reports: ValidationReport[] = [];

  // --- Phase 1: Data Integrity ---
  try {
    const graphReport = await validateGraph();
    reports.push(graphReport);
  } catch (err: any) {
    console.error(`💥 Fatal error running Graph Validator: ${err.message}`);
    process.exit(1);
  }

  // --- Phase 2: SEO AST Validator (Coming Next) ---
  // const seoReport = await validateSEO();
  // reports.push(seoReport);

  // --- Render Enterprise Report ---
  console.log('=========================================');
  console.log('       KCROC BUILD REPORT                ');
  console.log('=========================================\n');

  let allChecksPassed = true;
  let totalScore = 0;

  reports.forEach(report => {
    totalScore += report.score;
    const statusIcon = report.passed ? '✅' : '❌';
    
    console.log(`${report.moduleName.padEnd(20)} ${statusIcon} ${report.score}%`);
    
    if (!report.passed) {
      allChecksPassed = false;
      console.log(`\n   Errors in ${report.moduleName}:`);
      report.errors.forEach(err => console.log(`     - ${err}`));
    }

    if (report.warnings.length > 0) {
      console.log(`\n   Warnings in ${report.moduleName}:`);
      report.warnings.forEach(warn => console.log(`     ⚠ ${warn}`));
    }
    console.log('─────────────────────────────────────────');
  });

  const overallScore = (totalScore / reports.length).toFixed(1);
  console.log(`\nOverall Score: ${overallScore} / 100\n`);

  if (!allChecksPassed) {
    console.error('🛑 BUILD REJECTED: Critical Validation Failures Detected.');
    process.exit(1);
  }

  console.log('🚀 All quality gates cleared. Proceeding to production build...');
  process.exit(0);
}

runEnterpriseValidation();
