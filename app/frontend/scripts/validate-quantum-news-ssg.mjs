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

// DLSS 5 Gaming Technology news: verify the complete article is present in initial SSG HTML.
const dlssArticlePath = path.join(
  process.cwd(),
  'dist',
  'news',
  'nvidia-dlss-5-neural-rendering-explained.html',
);

let dlssHtml;
try {
  dlssHtml = readFileSync(dlssArticlePath, 'utf8');
} catch {
  throw new Error(
    'DLSS 5 news SSG validation failed: expected prerendered page at ' +
      dlssArticlePath,
  );
}

assert.ok(dlssHtml.includes('NVIDIA DLSS 5 Explained: Why Neural Rendering Can Cost FPS'), 'DLSS 5 headline is missing from prerendered HTML');
assert.ok(dlssHtml.includes('DLSS 5 vs DLSS 4.5: what each technology actually does'), 'DLSS 5 vs DLSS 4.5 section is missing');
assert.ok(dlssHtml.includes('Which GPUs support DLSS 5?'), 'GPU compatibility section is missing');
assert.ok(dlssHtml.includes('Driver 621.14') && dlssHtml.includes('616.64'), 'Driver minimum/current-version distinction is missing');
assert.ok(dlssHtml.includes('6979343'), 'Driver 621.14 video playback bug-fix reference is missing');
assert.ok(dlssHtml.includes('13%') && dlssHtml.includes('23%'), 'Independent frame-rate measurements are missing');
assert.ok(dlssHtml.includes('Where Winds Meet') && dlssHtml.includes('November 23'), 'Where Winds Meet rollout date is missing');
assert.ok(dlssHtml.includes('War Thunder') && dlssHtml.includes("Eagle's Shadow"), 'War Thunder rollout details are missing');
assert.ok(dlssHtml.includes('NewsArticle') && dlssHtml.includes('FAQPage'), 'NewsArticle or FAQPage JSON-LD is missing');
assert.ok((dlssHtml.match(/"@type"\s*:\s*"Question"/g) ?? []).length === 11, 'Expected eleven DLSS 5 FAQ questions in FAQPage JSON-LD');

assert.ok(dlssHtml.includes('TechArticle') && dlssHtml.includes('reviewedBy'), 'DLSS 5 TechArticle reviewer schema is missing');
assert.ok(dlssHtml.includes('2026-11-09T18:00:00.000Z'), 'DLSS 5 dateModified is not synchronized to the November 9 technical review');
assert.ok(dlssHtml.includes('November 9, 2026') && dlssHtml.includes('Hawalli, Kuwait'), 'Visible technical review byline does not show the November 9 Hawalli review');

for (const fps of [
  '95.8', '83.8', '78.9', '71.5',
  '302.2', '256.7', '168.0', '152.0',
  '75.6', '57.2', '67.2', '53.0',
  '226.1', '179.1', '138.8', '122.9',
]) {
  assert.ok(dlssHtml.includes(fps), `RTX 5090 benchmark value missing from prerendered article: ${fps}`);
}

assert.ok(dlssHtml.includes('Interactive benchmark explorer'), 'Interactive DLSS 5 benchmark explorer is missing from the initial HTML');
assert.ok(dlssHtml.includes('1% low') && dlssHtml.includes('Average FPS'), 'Benchmark explorer does not expose both FPS metrics');
assert.ok(dlssHtml.includes('Hogwarts Legacy: where the November 5 DLSS 5 integration applies'), 'Hogwarts Legacy masking comparison is missing');

const setupListLabel = 'aria-label="Enable DLSS 5 in Hogwarts Legacy on a supported PC"';
const setupListStart = dlssHtml.indexOf(setupListLabel);
assert.ok(setupListStart >= 0, 'Semantic DLSS 5 setup list is missing');
const setupListEnd = dlssHtml.indexOf('</ol>', setupListStart);
assert.ok(setupListEnd > setupListStart, 'DLSS 5 setup list is not closed');
const setupListHtml = dlssHtml.slice(setupListStart, setupListEnd);
assert.ok(setupListHtml.includes('role="list"'), 'DLSS 5 setup ordered list is missing explicit list semantics');
assert.equal((setupListHtml.match(/<li(?:\\s|>)/g) ?? []).length, 7, 'DLSS 5 setup must prerender exactly seven list items');
assert.equal((setupListHtml.match(/aria-hidden="true"/g) ?? []).length, 7, 'Each decorative DLSS 5 step marker must be hidden from assistive technology');
assert.ok(!/<li\\b[^>]*>\\s*<\\/li>/i.test(dlssHtml), 'An empty list item remains in the prerendered DLSS 5 page');
assert.ok(dlssHtml.includes('max-image-preview:large'), 'Discover preview robots directive is missing');
assert.ok(dlssHtml.includes('og:image:width') && dlssHtml.includes('content="1200"'), '1200px social image width metadata is missing');
assert.ok(dlssHtml.includes('og:image:height') && dlssHtml.includes('content="675"'), '675px social image height metadata is missing');
assert.ok(dlssHtml.includes('Gaming Technology'), 'Gaming Technology news category is missing');
assert.ok(dlssHtml.includes('href="/gaming-pc-repair-kuwait"'), 'KCROC gaming PC/GPU internal link is missing');

for (const label of [
  'NVIDIA — DLSS 5 rollout, October model and Hogwarts Legacy benchmarks',
  'NVIDIA — GeForce Game Ready Driver 621.14 WHQL release',
  'Portkey Games Support — DLSS 5 setup and requirements',
  'War Thunder — Eagle\'s Shadow DLSS 5 announcement',
  'ComputerBase — DLSS 5 performance testing in Hogwarts Legacy',
]) {
  assert.ok(dlssHtml.includes(label), `Descriptive DLSS 5 source anchor missing: ${label}`);
}
assert.ok(!dlssHtml.includes('External source</a>'), 'A generic External source anchor remains in the DLSS 5 article');
assert.ok(!/hreflang="ar-KW"/i.test(dlssHtml), 'Arabic hreflang points to a missing DLSS 5 translation route');

console.log('✅ DLSS 5 news SSG validation passed: TechArticle/reviewer schema, synchronized November 9 review timestamp, eleven static FAQ answers, full RTX 5090 benchmark dataset, masking analysis, interactive explorer, accessible seven-step list, clean list DOM, citations, driver guidance, internal link and Discover metadata are present.');

