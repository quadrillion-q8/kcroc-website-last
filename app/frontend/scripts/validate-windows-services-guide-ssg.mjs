import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const htmlPath = path.join(process.cwd(), 'dist', 'guides', 'windows-11-background-services-audit.html');
const html = readFileSync(htmlPath, 'utf8');

for (const required of [
  'Windows 11 Services to Disable (and Keep): 2026 Audit',
  'What Is WHESVC in Windows 11?',
  'C:\\ProgramData\\whesvc',
  'Service Host: Windows Health and Optimized Experiences High Disk Usage',
  'DiagTrack in Windows 11: Telemetry',
  'Is DiagTrack Spyware?',
  'SysMain in Windows 11:',
  'MapsBroker Service:',
  'GamingServicesNet',
  '12-Service Windows 11 Audit Matrix',
  'Read-Only PowerShell Audit Toolkit',
  'Safe rollback and WinRE recovery protocol',
  'November 23, 2026',
]) {
  assert.ok(html.includes(required), 'SSG guide missing required visible content: ' + required);
}
for (const question of [
  'Which services should you disable in Windows 11?',
  'What is the C:\\ProgramData\\whesvc folder in Windows 11?',
  'How do I fix Service Host: Windows Health and Optimized Experiences high disk usage?',
  'Can I disable Gaming Services in Windows 11?',
]) {
  assert.ok(html.includes(question), 'SSG guide missing visible FAQ: ' + question);
}
assert.equal((html.match(/"@type"\s*:\s*"Question"/g) ?? []).length, 16, 'Visible FAQ and FAQPage schema count must remain 16');
assert.ok(html.includes('"@type":"FAQPage"') || html.includes('"@type": "FAQPage"'), 'FAQPage JSON-LD is missing');
assert.ok(html.includes('"TechArticle"'), 'TechArticle JSON-LD is missing');
assert.ok(html.includes('"BreadcrumbList"'), 'BreadcrumbList JSON-LD is missing');
assert.ok(html.includes('https://www.computerrepairkuwait.com/guides/windows-11-background-services-audit'), 'Canonical guide route changed');
assert.ok(html.includes('"dateModified":"2026-11-23') || html.includes('"dateModified": "2026-11-23'), 'Article dateModified was not updated');
assert.ok(!html.toLowerCase().includes('whescvmapsbroker'), 'Corrupted combined keyword must not appear');
assert.ok((html.match(/<table[\s>]/gi) ?? []).length >= 4, 'Service comparison and diagnostic tables are missing');
console.log('Windows services guide SSG: target clusters, canonical, static FAQs and JSON-LD verified.');
