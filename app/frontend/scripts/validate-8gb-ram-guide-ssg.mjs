import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const html = readFileSync(path.join(process.cwd(), 'dist', 'blog', 'why-8gb-ram-is-no-longer-enough-for-windows-11.html'), 'utf8');
const article = html.match(/<article\b[\s\S]*?<\/article>/i)?.[0] ?? '';
assert.ok(article, '8GB RAM article element missing from prerendered HTML');
for (const term of [
  'Is 8GB RAM Enough for Windows 11 in 2026?',
  'Windows 11 RAM Requirements: Minimum vs Recommended vs Maximum',
  'Windows 11 minimum RAM vs practical recommendations',
  'Maximum Windows 11 RAM supported by edition',
  'How Much RAM Does Windows 11 Use at Idle?',
  'Windows 11 26H2 RAM Usage',
  'Why 8GB RAM May Not Be Enough',
  'Is 8GB RAM Enough for Windows 11 Gaming?',
  'How to Check What RAM Is in Your Computer',
  'HP Notebook 8GB RAM and Older DDR3 Systems',
  'SMBIOSMemoryType',
  'Frequently Asked Questions',
]) assert.ok(article.includes(term), '8GB RAM article missing prerendered topic: ' + term);

const faqStart = article.indexOf('id="faq"');
const sourcesStart = article.indexOf('id="sources"', faqStart);
assert.ok(faqStart >= 0 && sourcesStart > faqStart, 'FAQ and sources headings must be present in correct order');
const faqHtml = article.slice(faqStart, sourcesStart);
const expectedQuestions = [
  'What is the minimum and recommended RAM for Windows 11?',
  'How much RAM does Windows 11 use at idle, and does Pro use more than Home?',
  'How much RAM does Windows 11 support?',
  'Is 8GB RAM enough for Windows 11 gaming?',
  'Does Windows 11 26H2 use more RAM than 25H2 on an 8GB PC?',
  'Is an 8GB USB flash drive enough for a Windows 11 bootable installer?',
  'How do I check the RAM type in an HP notebook or a PC with DDR3?',
];
for (const question of expectedQuestions) assert.ok(faqHtml.includes(question), 'Visible FAQ missing: ' + question);
assert.equal((faqHtml.match(/<h3\b/g) ?? []).length, 17, 'Expected 17 readable FAQ question headings');
assert.ok(!/<details\b/i.test(faqHtml), 'This article should not hide its answers in collapsed FAQ details');
assert.equal((html.match(/"@type"\s*:\s*"Question"/g) ?? []).length, 17, 'FAQPage schema and visible answers must match');
assert.ok(/"@type"\s*:\s*"FAQPage"/.test(html), 'FAQPage JSON-LD missing');
assert.ok(/"@type"\s*:\s*("TechArticle"|\["BlogPosting","Article"\])/.test(html) || html.includes('"Article"'), 'Article JSON-LD missing');
assert.ok(html.includes('"dateModified":"2026-11-23') || html.includes('"dateModified": "2026-11-23'), 'Article updated review date missing');
assert.ok(html.includes('rel="canonical" href="https://www.computerrepairkuwait.com/blog/why-8gb-ram-is-no-longer-enough-for-windows-11"'), 'Original canonical changed');
const list = article.match(/<ol[^>]*aria-label="A repeatable memory check"[^>]*>([\s\S]*?)<\/ol>/);
assert.ok(list, 'Semantic six-step memory check missing');
assert.equal((list[1].match(/<li\b/g) ?? []).length, 6, 'Six-step memory check must have exactly six list items');
const sidebar=html.match(/Related Guides<\/p><ul[^>]*>([\s\S]*?)<\/ul>/i)?.[1] ?? '';
assert.equal((sidebar.match(/<li\b/g) ?? []).length, 3, 'Related Guides should contain exactly three real items');
assert.equal((sidebar.match(/<a\b/g) ?? []).length, 3, 'Related Guides should contain no empty links');
assert.ok(!/Al Mullah Complex|Ibn Khaldoun|Free Pickup|No Fix, No Fee/i.test(article), 'Global RAM guide must remain free of Kuwait sales pitches');
assert.ok((article.match(/<table[\s>]/gi) ?? []).length >= 3, 'RAM comparison tables should be prerendered');
console.log('8GB RAM guide: 26H2/search clusters, 17 static FAQs, 6 semantic steps, 3 related links, canonical and JSON-LD verified.');
