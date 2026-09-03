// File: app/frontend/scripts/validateConstants.ts
//
// KCROC Constant & Consistency Guardrail
// ----------------------------------------------------------------------------
// Scans source files for hardcoded copies of facts that must have exactly one
// source of truth (KCROC_GRAPH.business, KCROC_POLICY, etc). This exists
// because those facts have drifted before: the same phone number, warranty
// duration, email, and domain independently retyped (and sometimes fallback-
// duplicated) across dozens of pages/components.
//
// Rule this enforces: "Pages may consume KCROC facts. Pages may not define
// KCROC facts."
//
// Run standalone:   npx tsx scripts/validateConstants.ts
// Wired into build: pnpm run prebuild (see package.json)
//
// Exit code is non-zero only for ERROR-severity findings, so CI/build fails
// on real drift. WARNING-severity findings are printed but non-blocking —
// use those to track cleanup debt without halting deploys.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FRONTEND_ROOT = path.resolve(__dirname, '..');

// Directories to scan, relative to app/frontend/
const SCAN_DIRS = ['src', 'api', 'scripts'];

// File extensions to scan
const SCAN_EXTENSIONS = new Set(['.ts', '.tsx']);

// Never descend into these
const IGNORED_DIR_NAMES = new Set(['node_modules', 'dist', '.git', '__generated__']);

// Never scan these files, even though they live under a scanned directory.
// `*.generated.*` files are machine-derived snapshots (gitignored, rebuilt
// from KCROC_GRAPH on every install/build) rather than hand-typed source —
// flagging them would just be re-flagging graph.ts's own values one layer
// removed. Add specific generated files here as they're introduced; this
// intentionally isn't a broad glob so a genuinely hand-maintained file
// can never accidentally slip through by its name alone.
const IGNORED_FILE_SUFFIXES = ['.generated.ts', '.generated.tsx'];

type Severity = 'ERROR' | 'WARNING';

interface ConstantRule {
  id: string;
  description: string;
  pattern: RegExp;
  severity: Severity;
  // Files where this pattern is the legitimate source of truth (or an
  // otherwise-accepted definition site) and should not be flagged.
  // Paths are relative to app/frontend/ and matched by substring.
  allowedFiles: string[];
  fixHint: string;
}

// ----------------------------------------------------------------------------
// Rules
// ----------------------------------------------------------------------------
// Each rule guards one fact. Add a rule here whenever a new "must be globally
// constant" value is introduced (see the KCROC_GRAPH / KCROC_POLICY tiers).

const RULES: ConstantRule[] = [
  {
    id: 'HARDCODED_PHONE',
    description: 'Hardcoded KCROC phone/WhatsApp number',
    pattern: /96555301913/g,
    severity: 'ERROR',
    allowedFiles: ['src/data/graph.ts'],
    fixHint: "Read from KCROC_GRAPH.business.telephone. Do not add a '?? \"96555301913\"' fallback \u2014 let it fail loudly if the business entity is missing.",
  },
  {
    id: 'HARDCODED_PHONE_LOCAL_FORMAT',
    description: "Hardcoded KCROC phone number in local format ('55301913', i.e. without the 965 country code)",
    // Deliberately NOT matching '96555301913' or '+965 55301913' here \u2014 those
    // are caught by HARDCODED_PHONE. This only catches the bare local-format
    // number, which is a legitimate way to *display* it but must still come
    // from the graph, not be retyped.
    pattern: /(?<![\d+])55301913(?!\d)/g,
    severity: 'ERROR',
    allowedFiles: ['src/data/graph.ts'],
    fixHint: 'Read from KCROC_GRAPH.business.telephone and format for display at the call site \u2014 do not retype the local-format digits.',
  },
  {
    id: 'HARDCODED_EMAIL',
    description: 'Hardcoded KCROC business email',
    pattern: /quadrillion1980@gmail\.com/g,
    severity: 'ERROR',
    allowedFiles: ['src/data/graph.ts'],
    fixHint: 'Read from KCROC_GRAPH.business.email.',
  },
  {
    id: 'LOCAL_DOMAIN_CONSTANT',
    description: 'Locally-defined BASE_URL/DOMAIN/SITE_URL constant instead of reading the graph',
    pattern: /const\s+(BASE_URL|DOMAIN|SITE_URL|CANONICAL_DOMAIN)\s*=\s*['"`]https?:\/\/[^'"`]+['"`]/g,
    severity: 'ERROR',
    allowedFiles: ['src/data/graph.ts'],
    fixHint: 'Read from KCROC_GRAPH.business.websiteUrl. If a build-time script genuinely cannot import the graph, import it anyway (scripts already do this elsewhere \u2014 see generate-sitemap.ts) rather than redefining the domain.',
  },
  {
    id: 'WARRANTY_DURATION_LITERAL',
    description: "Hardcoded warranty duration text ('30-day warranty' / '30-Day Warranty') instead of KCROC_POLICY",
    pattern: /30[\s-]?day(?:s)?\s+warranty|30[\s-]?Day\s+Warranty/gi,
    severity: 'WARNING',
    allowedFiles: ['src/constants/businessPolicy.ts'],
    fixHint: 'Use getWarrantyLabel() or KCROC_POLICY.warranty.durationDays from src/constants/businessPolicy.ts. (Flagged as WARNING even in graph.ts \u2014 the graph should reference the policy rather than retyping the badge text.)',
  },
  {
    id: 'RATING_FALLBACK',
    description: "Hardcoded rating fallback ('?? \"4.9\"') instead of trusting the graph",
    pattern: /\?\?\s*['"`]4\.9['"`]/g,
    severity: 'WARNING',
    allowedFiles: [],
    fixHint: 'Read business.aggregateRating.ratingValue directly. A silent fallback hides a real data problem if the graph entity is ever missing.',
  },
  {
    id: 'REVIEW_COUNT_FALLBACK',
    description: "Hardcoded review-count fallback ('?? 153') instead of trusting the graph",
    pattern: /\?\?\s*['"`]?153['"`]?(?=\D|$)/g,
    severity: 'WARNING',
    allowedFiles: [],
    fixHint: 'Read business.aggregateRating.reviewCount directly instead of a fallback literal.',
  },
  {
    id: 'REPAIR_STAT_FALLBACK',
    description: "Hardcoded '500+' stat fallback instead of trusting the graph/stats source",
    pattern: /\?\?\s*['"`]500\+['"`]/g,
    severity: 'WARNING',
    allowedFiles: [],
    fixHint: 'Read the stat from its graph/stats entity. Also confirm the pages using \u2018500+\u2019 all mean the same metric (repairs completed vs. customers served) \u2014 see semantic-drift notes.',
  },
  {
    id: 'WRONG_NO_FIX_PHRASE',
    description: "Brand promise mismatch: 'No Fix, No Charge' instead of the canonical 'No Fix, No Fee'",
    pattern: /No\s+Fix,?\s*No\s+Charge/gi,
    severity: 'ERROR',
    allowedFiles: [],
    fixHint: "Use the canonical phrase 'No Fix, No Fee' (or KCROC_POLICY.noFixNoFee-derived copy) everywhere.",
  },
  {
    id: 'VEHICLE_COLLECTION_COPY',
    description: "Copy-paste artifact: 'vehicle collection' wording on a computer/device repair page",
    pattern: /vehicle\s+collection/gi,
    severity: 'ERROR',
    allowedFiles: [],
    fixHint: "KCROC picks up devices, not vehicles. Use KCROC_POLICY.pickupAndDelivery.label ('Free pickup & delivery across Kuwait').",
  },
];

// ----------------------------------------------------------------------------
// File walking
// ----------------------------------------------------------------------------

function walk(dir: string, out: string[] = []): string[] {
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out; // directory doesn't exist (e.g. no api/ dir in some checkouts) \u2014 skip silently
  }

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (IGNORED_DIR_NAMES.has(entry.name)) continue;
      walk(path.join(dir, entry.name), out);
    } else if (entry.isFile()) {
      if (SCAN_EXTENSIONS.has(path.extname(entry.name)) && !IGNORED_FILE_SUFFIXES.some((s) => entry.name.endsWith(s))) {
        out.push(path.join(dir, entry.name));
      }
    }
  }
  return out;
}

function toRelative(absPath: string): string {
  return path.relative(FRONTEND_ROOT, absPath).split(path.sep).join('/');
}

// This file itself necessarily contains every literal it's hunting for
// (in the regex patterns and fix-hint strings) \u2014 never scan it.
const SELF_PATH = toRelative(fileURLToPath(import.meta.url));

// ----------------------------------------------------------------------------
// Scan
// ----------------------------------------------------------------------------

interface Finding {
  rule: ConstantRule;
  file: string; // relative path
  line: number;
  snippet: string;
}

function isAllowed(rule: ConstantRule, relativeFile: string): boolean {
  return rule.allowedFiles.some((allowed) => relativeFile === allowed || relativeFile.endsWith(allowed));
}

function scanFile(absPath: string, findings: Finding[]): void {
  const relativeFile = toRelative(absPath);
  const content = fs.readFileSync(absPath, 'utf8');
  const lines = content.split('\n');

  for (const rule of RULES) {
    if (isAllowed(rule, relativeFile)) continue;

    // Fresh regex per file to reset lastIndex safely (rules use the /g flag).
    const pattern = new RegExp(rule.pattern.source, rule.pattern.flags);
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(content)) !== null) {
      const upToMatch = content.slice(0, match.index);
      const lineNumber = upToMatch.split('\n').length;
      const lineText = lines[lineNumber - 1]?.trim() ?? '';

      findings.push({
        rule,
        file: relativeFile,
        line: lineNumber,
        snippet: lineText.length > 140 ? lineText.slice(0, 140) + '\u2026' : lineText,
      });

      // Guard against zero-width matches causing an infinite loop.
      if (match[0].length === 0) pattern.lastIndex++;
    }
  }
}

function run(): void {
  console.log('\ud83d\udd0d Running KCROC Constant & Consistency Guardrail...');

  const files = SCAN_DIRS.flatMap((dir) => walk(path.join(FRONTEND_ROOT, dir))).filter(
    (f) => toRelative(f) !== SELF_PATH
  );
  const findings: Finding[] = [];

  for (const file of files) {
    scanFile(file, findings);
  }

  const errors = findings.filter((f) => f.rule.severity === 'ERROR');
  const warnings = findings.filter((f) => f.rule.severity === 'WARNING');

  if (findings.length === 0) {
    console.log(`\u2705 Scanned ${files.length} files. No hardcoded KCROC constants found.`);
    process.exit(0);
  }

  const printGroup = (label: string, icon: string, items: Finding[]) => {
    if (items.length === 0) return;
    console.log(`\n${icon} ${label} (${items.length})`);
    const byRule = new Map<string, Finding[]>();
    for (const f of items) {
      const list = byRule.get(f.rule.id) ?? [];
      list.push(f);
      byRule.set(f.rule.id, list);
    }
    for (const [ruleId, ruleFindings] of byRule) {
      const rule = ruleFindings[0].rule;
      console.log(`\n  [${ruleId}] ${rule.description}`);
      for (const f of ruleFindings) {
        console.log(`    -> ${f.file}:${f.line}  ${f.snippet}`);
      }
      console.log(`    \ud83d\udca1 ${rule.fixHint}`);
    }
  };

  printGroup('ERROR \u2014 build-blocking constant drift', '\u274c', errors);
  printGroup('WARNING \u2014 cleanup debt (non-blocking)', '\u26a0\ufe0f', warnings);

  console.log(
    `\n\ud83d\udcca ${files.length} files scanned, ${errors.length} error(s), ${warnings.length} warning(s).`
  );

  if (errors.length > 0) {
    console.error(
      '\n\ud83d\uded1 Build halted. These values must be read from KCROC_GRAPH / KCROC_POLICY, not retyped locally.'
    );
    process.exit(1);
  }

  console.log('\n\u2705 No build-blocking drift. (Warnings above are tracked cleanup debt \u2014 not required to deploy.)');
  process.exit(0);
}

run();
