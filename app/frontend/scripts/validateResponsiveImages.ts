// File: app/frontend/scripts/validateResponsiveImages.ts
// Ensures homepage service-card responsive image derivatives stay synchronized
// with the Entity-First Knowledge Graph. The derivatives are committed assets;
// this check prevents a future graph mutation from shipping a broken srcset.
import fs from 'node:fs';
import path from 'node:path';
import { KCROC_GRAPH } from '../src/data/graph.js';

const publicDir = path.resolve(process.cwd(), 'public');

const required = new Set<string>([
  '/images/kcroc-laptop-repair-technicians-hawalli-kuwait.w768.webp',
  '/logo-mark.w96.webp',
]);

for (const service of KCROC_GRAPH.services) {
  const source = service.contentImages?.[0]?.src;
  if (!source || !source.endsWith('.webp')) continue;
  required.add(source.replace(/\.webp$/, '.w480.webp'));
}

const missing = [...required].filter((publicPath) => {
  const absolute = path.join(publicDir, publicPath.replace(/^\//, ''));
  return !fs.existsSync(absolute);
});

if (missing.length) {
  console.error('❌ Missing responsive image derivatives:');
  for (const file of missing) console.error(`   ${file}`);
  process.exit(1);
}

console.log(`✅ Responsive image validation passed (${required.size} assets).`);
