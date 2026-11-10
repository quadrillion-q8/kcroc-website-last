import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const dist = path.join(process.cwd(), 'dist');
const articlePath = path.join(dist, 'guides', 'gamebar-presence-writer-fix.html');
const html = readFileSync(articlePath, 'utf8');

for (const heading of [
  '60-second quick answer',
  'How We Diagnose Game Bar Presence and Gaming Stutter',
  'Nine-step troubleshooting workflow',
  'Interpret the process-isolation test correctly',
  'Xbox Game Bar, per-user settings and device policy are different layers',
  'AllowGameDVR policy applicability by Windows environment',
  'Official Technical References',
]) assert.ok(html.includes(heading), 'GameBar guide prerendered heading missing: ' + heading);

const faqQuestions = [
  'What is GameBarPresenceWriter.exe?',
  'Does GameBarPresenceWriter.exe definitely cause gaming stutter?',
  'How do I test GameBarPresenceWriter.exe quickly?',
  'Does taskkill permanently disable GameBarPresenceWriter.exe?',
  'Will disabling Xbox Game Bar remove Steam or Discord overlays?',
  'What does the AllowGameDVR policy change?',
  'Will disabling Game DVR increase FPS?',
  'Should I change the Presence Writer registry key?',
  'What should I check if the test does not improve stutter?',
  'Is this guide relevant to gaming laptops and handhelds?',
  'How do I undo the registry changes?',
  'Does the AllowGameDVR policy apply to Windows 11?',
  'How can I measure frame-time instead of average FPS?',
  'Should I set ActivationType to 0 to disable Presence Writer?',
];
for (const q of faqQuestions) assert.ok(html.includes(q), 'GameBar FAQ missing from initial HTML: ' + q);
assert.equal((html.match(/"@type"\s*:\s*"Question"/g) ?? []).length, faqQuestions.length, 'FAQ schema must match the fourteen rendered questions.');

for (const type of ['TechArticle', 'HowTo', 'BreadcrumbList', 'FAQPage']) {
  assert.ok(html.includes('"@type":"' + type + '"') || html.includes('"@type": "' + type + '"'), 'Missing ' + type + ' structured data.');
}
assert.ok(html.includes('"datePublished":"2026-08-23"') || html.includes('"datePublished": "2026-08-23"'), 'Published date missing from TechArticle.');
assert.ok(html.includes('"dateModified":"2026-11-10"') || html.includes('"dateModified": "2026-11-10"'), 'Review date missing from TechArticle.');

const tables = (html.match(/<table[\s>]/gi) ?? []).length;
assert.ok(tables >= 7, 'Expected at least seven semantic tables; found ' + tables);
assert.ok((html.match(/role="region"/g) ?? []).length >= 7, 'Expected at least seven labelled table regions.');
assert.ok((html.match(/tabindex="0"/g) ?? []).length >= 7, 'Expected at least seven focusable table regions.');

const sources = [
  ['Microsoft Learn — Game Bar Presence Writer', 'https://learn.microsoft.com/en-us/windows/win32/devnotes/gamebar-presencewriter'],
  ['Microsoft Learn — ApplicationManagement Policy CSP: AllowGameDVR', 'https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-applicationmanagement'],
  ['Microsoft Learn — taskkill command reference', 'https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/taskkill'],
  ['Microsoft Support — Use Xbox Game Bar to record your screen', 'https://support.microsoft.com/en-us/accessibility/windows/use-a-screen-reader-to-record-your-screen-with-xbox-game-bar'],
  ['Intel GameTechDev — PresentMon project and frame-time metrics', 'https://github.com/GameTechDev/PresentMon'],
];
for (const [label, url] of sources) {
  assert.ok(html.includes(url), 'Missing source URL: ' + url);
  const index = html.indexOf(url), start = html.lastIndexOf('<a ', index), end = html.indexOf('</a>', index);
  assert.ok(start >= 0 && end > index, 'Missing source anchor: ' + url);
  const anchor = html.slice(start, end + 4).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  assert.ok(anchor.includes(label), 'Source anchor lacks descriptive title: ' + label);
}
assert.ok(!html.includes('External source'), 'Generic source link label remains in output.');

const first = html.indexOf('<section id="quick-answer"');
const faq = html.indexOf('<section id="faq"', first);
assert.ok(first >= 0 && faq > first, 'Main guide content sections were not prerendered.');
const globalContent = html.slice(first, faq);
for (const localClaim of ['KWD', '+965', 'No Fix, No Fee', 'Hawalli shop']) {
  assert.ok(!globalContent.includes(localClaim), 'Global GameBar guide contains local commercial content: ' + localClaim);
}

const sitemap = readFileSync(path.join(dist, 'sitemap.xml'), 'utf8');
const loc = '<loc>https://www.computerrepairkuwait.com/guides/gamebar-presence-writer-fix</loc>';
const pos = sitemap.indexOf(loc);
assert.ok(pos >= 0, 'Original GameBar guide URL missing from sitemap.');
const urlStart = sitemap.lastIndexOf('<url>', pos), urlEnd = sitemap.indexOf('</url>', pos);
const urlEntry = sitemap.slice(urlStart, urlEnd + 6);
assert.ok(urlEntry.includes('<lastmod>2026-11-09T23:00:00.000Z'), 'Sitemap review date must reflect November 10 in Kuwait time without a future UTC date.');

console.log('GameBar guide SSG validation passed: nine-step workflow, seven accessible tables, fourteen FAQ answers and schema, official sources, global editorial scope and fresh sitemap metadata.');
