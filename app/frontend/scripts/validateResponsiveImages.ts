// File: app/frontend/scripts/validateResponsiveImages.ts
// Ensures homepage service-card images stay synchronized with the
// Entity-First Knowledge Graph. The card renders the original WebP directly;
// this check prevents graph edits from referencing missing public assets.
import fs from 'node:fs';
import path from 'node:path';
import { KCROC_GRAPH } from '../src/data/graph.js';

const publicDir = path.resolve(process.cwd(), 'public');

const required = new Set<string>([
  '/images/kcroc-pc-doctor-windows-repair-services.w768.webp',
  '/logo-mark.w96.webp',
]);

for (const service of KCROC_GRAPH.services) {
  const cardImage = service.contentImages?.find((image) => image.placement === 'hero')
    ?? service.contentImages?.find((image) => image.placement === 'commonIssues')
    ?? service.contentImages?.find((image) => image.placement === 'coreFeatures')
    ?? service.contentImages?.[0];
  const source = cardImage?.src;
  if (!source || !source.endsWith('.webp')) continue;
  required.add(source);
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

console.log(`✅ Service-card image source validation passed (${required.size} assets).`);
