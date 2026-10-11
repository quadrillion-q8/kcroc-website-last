import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const sourceRoot = path.resolve('src');
const rootLayoutPath = path.join(sourceRoot, 'core/components/layout/RootLayout.tsx');
const sourceFiles = [];

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(fullPath);
    else if (/\.(tsx|jsx)$/.test(entry.name)) sourceFiles.push(fullPath);
  }
}

await walk(sourceRoot);
const mainTagPattern = /<main(?=[\s>])/g;
const closeMainTagPattern = /<\/main\s*>/g;
const mainIdPattern = /\bid=["']main-content["']/g;
const problems = [];
let totalMainOpen = 0;
let totalMainClose = 0;
let totalMainIds = 0;

for (const file of sourceFiles) {
  const source = await readFile(file, 'utf8');
  const opens = [...source.matchAll(mainTagPattern)].length;
  const closes = [...source.matchAll(closeMainTagPattern)].length;
  const ids = [...source.matchAll(mainIdPattern)].length;
  totalMainOpen += opens;
  totalMainClose += closes;
  totalMainIds += ids;

  if (file !== rootLayoutPath && (opens || closes || ids)) {
    problems.push(`${path.relative(process.cwd(), file)}: page/component files must not declare the global main landmark or duplicate #main-content (${opens} opening, ${closes} closing, ${ids} IDs).`);
  }
}

const rootSource = await readFile(rootLayoutPath, 'utf8');
const rootOpens = [...rootSource.matchAll(mainTagPattern)].length;
const rootCloses = [...rootSource.matchAll(closeMainTagPattern)].length;
const rootIds = [...rootSource.matchAll(mainIdPattern)].length;

if (rootOpens !== 1 || rootCloses !== 1 || rootIds !== 1) {
  problems.push(`RootLayout.tsx must contain exactly one <main>, one </main>, and one #main-content ID (found ${rootOpens}, ${rootCloses}, ${rootIds}).`);
}
if (totalMainOpen !== 1 || totalMainClose !== 1 || totalMainIds !== 1) {
  problems.push(`Source-wide invariant failed: expected 1 opening main, 1 closing main, and 1 main-content ID; found ${totalMainOpen}, ${totalMainClose}, ${totalMainIds}.`);
}

if (problems.length) {
  console.error('❌ Main landmark validation failed:');
  for (const problem of problems) console.error(`- ${problem}`);
  process.exit(1);
}

console.log('✅ Main landmark validation passed: RootLayout owns the single <main> landmark and #main-content target.');
