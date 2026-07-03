// File: scripts/validate-build.ts
import fs from 'fs';
import path from 'path';

// ─── 1. CONFIGURATION ──────────────────────────────────────────────────
// FIX: process.cwd() already points to the 'app/frontend' directory during the Vercel build.
// We just need to append 'src' and 'pages' to find the correct folder.
const PAGES_DIR = path.join(process.cwd(), 'src', 'pages');

// Files that intentionally do not require the SEO Engine
const IGNORE_FILES = [
  'NotFound.tsx',          // 404 pages do not need Knowledge Graph entities
  'LogoutCallbackPage.tsx' // Auth utility pages
];

// Directories inside /pages that should be skipped (e.g., wrapper components)
const IGNORE_DIRS = [
  'templates' 
];

// ─── 2. RECURSIVE FILE SCANNER ─────────────────────────────────────────
/**
 * Recursively searches a directory for all .tsx files, respecting ignore lists.
 */
function getPageFiles(dirPath: string, filesList: string[] = []): string[] {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (!IGNORE_DIRS.includes(file)) {
        getPageFiles(fullPath, filesList);
      }
    } else if (file.endsWith('.tsx') && !IGNORE_FILES.includes(file)) {
      filesList.push(fullPath);
    }
  }

  return filesList;
}

// ─── 3. CORE VALIDATION LOGIC ──────────────────────────────────────────
function runValidator() {
  console.log('🔍 Starting Enterprise SEO Build Validation...');
  console.log('Scanning for Phase 2 SEO Engine Compliance...\n');

  if (!fs.existsSync(PAGES_DIR)) {
    console.error(`❌ Could not find pages directory at: ${PAGES_DIR}`);
    process.exit(1);
  }

  const pages = getPageFiles(PAGES_DIR);
  const failingPages: string[] = [];

  // Read each file and check for compliance
  for (const pagePath of pages) {
    const content = fs.readFileSync(pagePath, 'utf-8');
    
    // Check if the file imports or utilizes the SEOEngine
    const hasSEOEngine = content.includes('SEOEngine');
    
    if (!hasSEOEngine) {
      // Store the relative path to make the error message cleaner for the developer
      failingPages.push(path.relative(PAGES_DIR, pagePath));
    }
  }

  // ─── 4. REPORTING & PIPELINE CONTROL ─────────────────────────────────
  console.log('📊 --- VALIDATION REPORT ---');
  
  if (failingPages.length > 0) {
    console.error('\n❌ BUILD FAILED: SEO Engine Missing!');
    console.error('The following pages are missing the <SEOEngine /> component:');
    
    failingPages.forEach(page => console.error(`   - ${page}`));
    
    console.error('\n💡 FIX: Please import and add <SEOEngine entityId="..." /> to these pages before deploying.');
    
    // Exit Code 1 tells Vercel/CI pipelines to abort the build process
    process.exit(1);
  }

  console.log('✅ All Enterprise checks passed perfectly!');
  console.log('🚀 Validation successful. Proceeding with Vite build...\n');
  
  // Exit Code 0 tells Vercel/CI pipelines that everything is okay to proceed
  process.exit(0);
}

// Execute the script
runValidator();
