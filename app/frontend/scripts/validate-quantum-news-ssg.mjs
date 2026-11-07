import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const articlePath = path.join(
  process.cwd(),
  'dist',
  'news',
  'ibm-quantum-system-two-nighthawk-r2-chicago.html',
);

let html;
try {
  html = readFileSync(articlePath, 'utf8');
} catch {
  throw new Error(
    'Quantum news SSG validation failed: expected prerendered page at ' +
      articlePath,
  );
}

const faqHeading = html.indexOf('id="frequently-asked-questions"');
const sourcesHeading = html.indexOf('id="official-sources"', faqHeading);
assert.ok(faqHeading >= 0, 'Visible FAQ heading is missing from prerendered HTML');
assert.ok(sourcesHeading > faqHeading, 'Expected sources section after the FAQ block');

const visibleFaq = html.slice(faqHeading, sourcesHeading);
const questions = [
  'What is the difference between IBM Quantum System Two and Nighthawk r2?',
  'Does Nighthawk r2 have 120 qubits or 458 physical elements?',
  'What does IBM mean by a 25-nanosecond reset?',
  'How is Nighthawk r2 different from IBM Heron?',
  'Is the Chicago Quantum System Two a fault-tolerant quantum computer?',
  'Will IBM quantum processors replace CPUs, GPUs or gaming PCs?',
];

for (const question of questions) {
  assert.ok(visibleFaq.includes(question), `FAQ question missing from static HTML: ${question}`);
}
assert.ok(
  visibleFaq.includes('The 458 total counts 120 programmable qubits, 218 tunable couplers and 120 dedicated reset elements'),
  'The 458-element answer is missing from static HTML',
);
assert.ok(
  visibleFaq.includes('25 nanoseconds') && visibleFaq.includes('1 microsecond'),
  'The reset-timing clarification is missing from the visible FAQ',
);

assert.ok(html.includes('IBM Nighthawk r2 vs Heron: processor specifications'), 'Comparison table caption is missing');
assert.ok(/<table[\s>]/i.test(html), 'Comparison table is missing from prerendered HTML');
assert.ok(html.includes('100,000+ circuits per second'), 'Published throughput figure is missing');
assert.ok(html.includes('NewsArticle') && html.includes('FAQPage'), 'NewsArticle or FAQPage JSON-LD is missing');
assert.ok(html.includes('reviewedBy') && html.includes('Hardware Repair Engineer'), 'Technical reviewer identity is missing from JSON-LD');
assert.ok(html.includes('max-image-preview:large'), 'Discover robots preview directive is missing');
assert.ok(html.includes('og:image:width') && html.includes('content="1200"'), '1200px social image width metadata is missing');
assert.ok(html.includes('og:image:height') && html.includes('content="675"'), '675px social image height metadata is missing');

for (const route of [
  '/motherboard-repair-kuwait',
  '/gaming-pc-repair-kuwait',
  '/gaming-laptop-cleaning-kuwait',
]) {
  assert.ok(html.includes(`href="${route}"`), `KCROC internal service link missing: ${route}`);
}

for (const label of [
  'IBM Newsroom — Quantum System Two deployment in Chicago',
  'IBM Quantum — Nighthawk r2 processor architecture and reset performance',
  'NCSA — IBM Quantum and DeltaAI hybrid demonstration scheduled for SC26',
]) {
  assert.ok(html.includes(label), `Descriptive source anchor missing: ${label}`);
}

assert.ok(!html.includes('External source</a>'), 'A generic External source anchor remains');
assert.ok(!/hreflang="ar-KW"/i.test(html), 'Arabic hreflang points to a missing translation route');

console.log('✅ Quantum news SSG validation passed: comparison table, six visible FAQ answers, NewsArticle/FAQPage schema, descriptive citations, internal service links and Discover metadata are present in prerendered HTML.');
