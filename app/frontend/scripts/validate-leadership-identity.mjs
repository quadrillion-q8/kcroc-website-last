// KCROC public identity guard: keep website copy and rendered assets aligned
// with the currently published, single-founder About page in EN and ar-KW.
import { readFile, readdir } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const checkDist = process.argv.includes('--dist');
const allowedExtensions = new Set(['.tsx', '.ts', '.jsx', '.js', '.mjs', '.css', '.html', '.xml', '.json', '.md', '.txt', '.svg']);
const disallowed = [
  { label: 'retired executive title', re: /\b(?:co[\s_-]*founders?|cto|chief\s+technology\s+officer)\b/i },
  { label: 'retired personal identity', re: /\b(?:riyaz|kawa)\b/i },
  { label: 'retired Arabic identity/title', re: /(?:رياض|ريّاض|كاوا|الشريك\s+المؤسس|المدير\s+التقني)/i },
];

const failures = [];
let scanned = 0;
async function scan(path) {
  const entries = await readdir(path, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name.startsWith('.cache')) continue;
    const target = join(path, entry.name);
    if (entry.isDirectory()) { await scan(target); continue; }
    if (!entry.isFile() || !allowedExtensions.has(extname(entry.name))) continue;
    // The guard itself may name forbidden patterns, but is not public page source.
    if (target === fileURLToPath(import.meta.url)) continue;
    const content = await readFile(target, 'utf8');
    scanned += 1;
    for (const { label, re } of disallowed) {
      const match = re.exec(content);
      if (match) failures.push(`${relative(root, target)}: ${label} at offset ${match.index}`);
    }
  }
}
if (checkDist) {
  await scan(join(root, 'dist'));
} else {
  await scan(join(root, 'src'));
  await scan(join(root, 'public'));
  const en = await readFile(join(root, 'src/pages/About.tsx'), 'utf8');
  const ar = await readFile(join(root, 'src/pages/ArabicAbout.tsx'), 'utf8');
  if (!en.includes('Meet Our Founder') || (en.match(/name:\s*'Imran Natiq'/g) ?? []).length !== 1 ||
      (en.match(/name:\s*'[^']+'/g) ?? []).length !== 1) {
    failures.push('English About must have exactly one founder profile with the correct heading');
  }
  if (!ar.includes('تعرّف على مؤسس المختبر') ||
      (ar.match(/name:'[^']+'/g) ?? []).length !== 1) {
    failures.push('Arabic About must have exactly one founder profile with the correct heading');
  }
}
if (failures.length) {
  console.error('❌ KCROC leadership identity validation failed:');
  failures.slice(0, 40).forEach((failure) => console.error('  - ' + failure));
  process.exit(1);
}
console.log(`✅ KCROC single-founder identity validated across ${scanned} ${checkDist ? 'published output' : 'source/public'} text files.`);
