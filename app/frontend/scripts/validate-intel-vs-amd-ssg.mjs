import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const articlePath = path.join(process.cwd(), 'dist', 'blog', 'intel-core-ultra-vs-amd-ryzen-ai.html');
let html;
try {
  html = readFileSync(articlePath, 'utf8');
} catch {
  throw new Error('Intel vs AMD SSG validation failed: expected prerendered page at ' + articlePath);
}

assert.ok(
  html.includes('https://www.computerrepairkuwait.com/blog/intel-core-ultra-vs-amd-ryzen-ai'),
  'The existing canonical URL is missing from prerendered HTML',
);
assert.ok(html.includes('Intel Core Ultra vs. AMD Ryzen AI: What Actually Differs in a Laptop'), 'Article H1 is missing');
assert.ok(html.includes('Updated November 9, 2026'), 'Visible Kuwait-local update date is missing');
assert.ok(html.includes('2026-11-09T00:00:00+03:00') || html.includes('2026-11-08T21:00:00.000Z'), 'Article dateModified timestamp is missing');

const faqStart = html.indexOf('id="faq"');
const referencesStart = html.indexOf('id="references"', faqStart);
assert.ok(faqStart >= 0, 'Visible FAQ section is missing from prerendered HTML');
assert.ok(referencesStart > faqStart, 'References section should follow the visible FAQ');

const visibleFaq = html.slice(faqStart, referencesStart);
const expectedQuestions = [
  'Is AMD Ryzen AI better than Intel Core Ultra?',
  'Which is better for gaming?',
  'Does an NPU make a laptop faster?',
  'What is the difference between Intel Core Ultra P-cores and E-cores?',
  'What is AMD XDNA?',
  'What are Intel V-series Core Ultra chips?',
  'Is Ryzen AI better for programmers?',
  'Which is better for video editing?',
  'Does Kuwait heat affect laptop performance?',
  'Can I upgrade RAM on a Ryzen AI or Core Ultra laptop?',
  'Should I compare NPU TOPS?',
  'What should I check before buying an Intel or AMD laptop in Kuwait?',
];

for (const question of expectedQuestions) {
  assert.ok(visibleFaq.includes(question), 'FAQ question is missing from static HTML: ' + question);
}

const faqDetailsCount = (visibleFaq.match(/<details\b/gi) ?? []).length;
assert.equal(faqDetailsCount, 12, 'Expected 12 native FAQ disclosures in static HTML, found ' + faqDetailsCount);

for (const answerMarker of [
  'Those are specification examples, not a direct benchmark verdict',
  'an application has specifically implemented for a supported NPU runtime',
  'Intel’s Series 2 V models identify Lunar Lake',
  'The laptop manufacturer’s BIOS and cooling design determine the actual behavior',
  'The 18°C reduction in margin is illustrative',
  'Liquid metal is electrically conductive',
  'a 10–30 minute loop reveals whether the laptop maintains clocks',
  'treat the memory as a fixed configuration',
]) {
  assert.ok(visibleFaq.includes(answerMarker) || html.includes(answerMarker), 'Expected expanded technical answer/content is missing: ' + answerMarker);
}

for (const sectionId of [
  'generation-matrix',
  'suffix-decoder',
  'power-delivery',
  'thermal-physics',
  'benchmark-red-flags',
  'exact-cpu',
]) {
  assert.ok(html.includes('id="' + sectionId + '"'), 'Expected engineering section is missing: ' + sectionId);
}

for (const modelMarker of [
  'Core Ultra 7 258V',
  'Core Ultra X9 388H',
  'Ryzen AI 9 HX 370',
  'Ryzen AI Max+ 395',
  'Radeon 8060S',
  '55 NPU TOPS',
  'Intel Arc B390',
]) {
  assert.ok(html.includes(modelMarker), 'Verified processor comparison record is missing: ' + modelMarker);
}

for (const officialUrl of [
  'https://www.intel.com/content/www/us/en/products/sku/240957/intel-core-ultra-7-processor-258v-12m-cache-up-to-4-80-ghz/specifications.html',
  'https://www.intel.com/content/www/us/en/products/sku/245526/intel-core-ultra-x9-processor-388h-18m-cache-up-to-5-10-ghz/specifications.html',
  'https://www.amd.com/en/products/processors/laptop/ryzen/ai-400-series/amd-ryzen-ai-9-hx-470.html',
]) {
  assert.ok(html.includes(officialUrl), 'Official manufacturer source link is missing: ' + officialUrl);
}

assert.ok(html.includes('"@type":"TechArticle"') || html.includes('"@type": "TechArticle"'), 'TechArticle JSON-LD is missing');
assert.ok(html.includes('"@type":"FAQPage"') || html.includes('"@type": "FAQPage"'), 'FAQPage JSON-LD is missing');
assert.ok(html.includes('"@type":"BreadcrumbList"') || html.includes('"@type": "BreadcrumbList"'), 'BreadcrumbList JSON-LD is missing');

const schemaQuestionCount = (html.match(/"@type"\s*:\s*"Question"/g) ?? []).length;
assert.equal(schemaQuestionCount, 12, 'FAQPage JSON-LD should contain exactly the same 12 questions as the visible FAQ');

console.log('Intel vs AMD SSG validation passed: canonical, Kuwait-local review date, 12 static FAQ answers and schema questions, generation matrix, suffix decoder, engineering sections, processor records and official references are present.');
