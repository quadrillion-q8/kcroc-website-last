// File: app/frontend/scripts/validate-build.ts
import { ValidationEngine } from '../src/core/validators/ValidationEngine';

async function validate() {
  const engine = new ValidationEngine();
  const isPassed = await engine.runFullAudit();

  if (!isPassed) {
    console.error("\n🛑 BUILD HALTED: Critical SEO or Data Integrity errors found.");
    console.error("Please fix the errors above in your Knowledge Graph before deploying.\n");
    process.exit(1); // Tells Vercel/GitHub Actions to stop the build immediately
  }

  console.log("\n🚀 Validation successful. Proceeding with Vite build...\n");
  process.exit(0);
}

validate();
