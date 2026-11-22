#!/usr/bin/env node
// KCROC GSC query audit. Read-only reporting tool: never changes site or Search Console settings.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const policy = JSON.parse(fs.readFileSync(path.join(dirname, 'kcroc-gsc-query-policy.json'), 'utf8'));
const args = process.argv.slice(2);
const arg = (key) => {
  const direct = args.find(x => x.startsWith(key + '='));
  return direct ? direct.slice(key.length + 1) : args[args.indexOf(key) + 1];
};
const flag = (key) => args.includes(key);
const compile = (pattern) => new RegExp(pattern.replace(/^\(\?i\)/, ''), 'i');
function classify(segment, query) {
  const p = policy.segments[segment];
  if (!p) throw new Error('Use --segment en or ar');
  if (compile(p.exclude).test(query)) {
    if (compile(p.mixed).test(query)) return ['review', 'mixed supported + unsupported intent'];
    return ['exclude', 'clear unsupported-service match'];
  }
  if (compile(p.review).test(query)) return ['review', 'ambiguous query: classify manually'];
  return ['keep', 'no exclusion match (not proof of valid service intent)'];
}
function parseCsv(text) {
  const rows = [];
  let row = [], cell = '', inside = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i], next = text[i + 1];
    if (inside) {
      if (c === '"' && next === '"') { cell += '"'; i++; }
      else if (c === '"') inside = false;
      else cell += c;
    } else if (c === '"') inside = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n') { row.push(cell); rows.push(row); row = []; cell = ''; }
    else if (c !== '\r') cell += c;
  }
  if (inside) throw new Error('CSV has an unclosed quoted field');
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows;
}
function toCsv(rows) {
  return rows.map(row => row.map(v => {
    const s = String(v ?? '');
    return /[",\r\n]/.test(s) ? '"' + s.replaceAll('"', '""') + '"' : s;
  }).join(',')).join('\n') + '\n';
}
function main() {
  const segment = arg('--segment') || arg('--print');
  if (flag('--test')) {
    const failures = policy.tests.filter(t => classify(t.segment, t.query)[0] !== t.expected);
    for (const t of failures) console.error('FAIL', t.segment, t.query, 'expected', t.expected, 'got', classify(t.segment, t.query)[0]);
    if (failures.length) process.exitCode = 1;
    else console.log('PASS: ' + policy.tests.length + ' bilingual GSC query classification fixtures');
    return;
  }
  if (args.includes('--print') || args.some(x => x.startsWith('--print='))) {
    if (!policy.segments[segment]) throw new Error('Use --print en or --print ar');
    console.log(policy.segments[segment].exclude);
    return;
  }
  const input = arg('--input');
  if (!input || !policy.segments[segment]) throw new Error('Usage: --segment en|ar --input Queries.csv [--presegmented] [--output audit.csv]. Or --print en|ar, --test');
  const rows = parseCsv(fs.readFileSync(input, 'utf8').replace(/^\uFEFF/, ''));
  if (rows.length < 2) throw new Error('CSV has no query rows');
  const headers = rows[0].map(h => h.toLowerCase().trim());
  const findCol = (...names) => headers.findIndex(h => names.includes(h));
  const qCol = findCol('top queries', 'query', 'queries', 'search query');
  const pCol = findCol('page', 'pages', 'top pages', 'landing page');
  const cCol = findCol('clicks');
  const iCol = findCol('impressions');
  if (qCol < 0) throw new Error('CSV needs a Query/Top queries column');
  if (pCol < 0 && !flag('--presegmented')) throw new Error('Query-only exports must be filtered to the correct EN/AR landing pages inside GSC first; pass --presegmented to acknowledge this');
  const output = [['query','segment','status','reason','clicks','impressions']];
  const sums = Object.fromEntries(['keep','review','exclude'].map(s => [s, { queries: 0, clicks: 0, impressions: 0 }]));
  const numeric = value => Number(String(value ?? '0').replaceAll(',', '')) || 0;
  for (const row of rows.slice(1)) {
    const query = (row[qCol] || '').trim();
    if (!query) continue;
    if (pCol >= 0 && String(row[pCol]).includes('/ar/') !== (segment === 'ar')) continue;
    const [status, reason] = classify(segment, query);
    const clicks = cCol >= 0 ? numeric(row[cCol]) : 0;
    const impressions = iCol >= 0 ? numeric(row[iCol]) : 0;
    sums[status].queries++; sums[status].clicks += clicks; sums[status].impressions += impressions;
    output.push([query,segment,status,reason,clicks,impressions]);
  }
  if (arg('--output')) fs.writeFileSync(arg('--output'), toCsv(output), 'utf8');
  console.log(JSON.stringify({ segment, date: policy.version, input, rows: output.length - 1, byStatus: sums, output: arg('--output') || null }, null, 2));
}
try { main(); } catch (error) { console.error(error.message); process.exitCode = 1; }
