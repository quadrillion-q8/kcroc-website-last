// File: app/frontend/api/csp-report.ts
//
// Receives browser CSP violation reports while the policy runs in
// Report-Only mode. The goal is to build a real picture of what the
// enforced policy would break (or block) before we flip it on.
//
// Browsers POST reports in one of two shapes depending on how modern
// they are:
//   - Legacy `report-uri`: { "csp-report": { blocked-uri, violated-directive, ... } }
//   - Modern `report-to`:  [{ type: "csp-violation", body: { blockedURL, ... } }, ...]
// We accept both and normalize them before logging.
//
// For now this just logs to stdout, which Vercel captures and makes
// searchable/filterable in the project's Logs tab — enough to eyeball
// patterns for a week without standing up external infra. If volume
// gets noisy, swap the console.log below for a write into Upstash
// Redis (already wired up for the chat rate limiter) or a logging
// service, and aggregate by `violated-directive` / `blocked-uri`.
import { VercelRequest, VercelResponse } from '@vercel/node';

// Browsers can send CSP reports with media types Vercel's body parser does not
// automatically decode. Read those raw bodies with a strict byte limit.
const MAX_REPORT_BYTES = 64 * 1024;

async function readReportBody(req: VercelRequest): Promise<unknown> {
  const existing = req.body as unknown;
  if (existing && typeof existing === 'object' && !Buffer.isBuffer(existing)) return existing;

  let raw = '';
  if (typeof existing === 'string') raw = existing;
  else if (Buffer.isBuffer(existing)) raw = existing.toString('utf8');
  else {
    const chunks: Buffer[] = [];
    let size = 0;
    let oversized = false;
    for await (const chunk of req as AsyncIterable<Buffer | string>) {
      const buf = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
      size += buf.length;
      if (size > MAX_REPORT_BYTES) {
        oversized = true;
        continue;
      }
      chunks.push(buf);
    }
    if (oversized) return undefined;
    raw = Buffer.concat(chunks).toString('utf8');
  }

  if (!raw || Buffer.byteLength(raw, 'utf8') > MAX_REPORT_BYTES) return undefined;
  return JSON.parse(raw);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const body = await readReportBody(req);
    const reports = Array.isArray(body) ? body : [body];

    for (const entry of reports) {
      // Legacy report-uri shape
      const legacy = entry?.['csp-report'];
      if (legacy) {
        console.log('[csp-violation]', JSON.stringify({
          directive: legacy['violated-directive'],
          blockedUri: legacy['blocked-uri'],
          documentUri: legacy['document-uri'],
          sourceFile: legacy['source-file'],
          lineNumber: legacy['line-number'],
        }));
        continue;
      }

      // Modern report-to shape
      if (entry?.type === 'csp-violation' && entry?.body) {
        const b = entry.body;
        console.log('[csp-violation]', JSON.stringify({
          directive: b.effectiveDirective ?? b.violatedDirective,
          blockedUri: b.blockedURL,
          documentUri: b.documentURL,
          sourceFile: b.sourceFile,
          lineNumber: b.lineNumber,
        }));
      }
    }
  } catch (err) {
    // Don't let a malformed report take the endpoint down — just log and 204.
    console.error('[csp-report] failed to parse report body', err);
  }

  // Browsers don't do anything with the response body; 204 is the
  // conventional ack for report endpoints.
  return res.status(204).end();
}
