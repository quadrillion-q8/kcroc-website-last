// File: app/frontend/api/chat.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

import { getKnowledgeContext } from '../src/knowledge/context';
import { evaluateHandoff } from '../src/api/HandoffEngine';
import { KCROC_GRAPH } from '../src/data/graph';

const SUPPORT_PHONE_LOCAL = KCROC_GRAPH.business!.telephone.slice(3);

// Redis is preferred for shared, durable rate limiting in production.
// A small in-memory fallback keeps the chatbot functional when Upstash is
// not configured (for example, during a simple Vercel deployment).
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = redisUrl && redisToken
  ? new Redis({ url: redisUrl, token: redisToken })
  : null;

const ratelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(20, '1 h'),
      analytics: false,
    })
  : null;

type MemoryRateLimitBucket = {
  count: number;
  resetAt: number;
};

const memoryRateLimits = new Map<string, MemoryRateLimitBucket>();
const MEMORY_RATE_LIMIT = 20;
const MEMORY_RATE_WINDOW_MS = 60 * 60 * 1000;

function consumeMemoryRateLimit(ip: string): boolean {
  const now = Date.now();
  const current = memoryRateLimits.get(ip);

  if (!current || now >= current.resetAt) {
    memoryRateLimits.set(ip, {
      count: 1,
      resetAt: now + MEMORY_RATE_WINDOW_MS,
    });
    return true;
  }

  if (current.count >= MEMORY_RATE_LIMIT) {
    return false;
  }

  current.count += 1;
  return true;
}

function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0].trim();
  }

  const realIp = req.headers['x-real-ip'];
  if (typeof realIp === 'string' && realIp.trim()) {
    return realIp.trim();
  }

  return 'unknown';
}

type OpenAIHttpResponse = {
  ok: boolean;
  status: number;
  headers?: { get(name: string): string | null };
  json(): Promise<unknown>;
};

async function readOpenAIError(response: OpenAIHttpResponse): Promise<string> {
  try {
    const payload = await response.json() as { error?: { message?: string } };
    return payload?.error?.message || `HTTP ${response.status}`;
  } catch {
    return `HTTP ${response.status}`;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ reply: 'Method Not Allowed' });
  }

  try {
    // 1. RATE LIMITING
    const ip = getClientIp(req);

    if (ratelimit) {
      try {
        const { success } = await ratelimit.limit(ip);

        if (!success) {
          console.warn(`Rate limit exceeded for IP: ${ip}`);
          return res.status(429).json({
            reply: `You have sent too many messages. Please try again later or contact us directly on WhatsApp at ${SUPPORT_PHONE_LOCAL}.`,
          });
        }
      } catch (rlError) {
        // Do not take the chatbot offline just because the optional Redis
        // service is temporarily unavailable. Fall back to local limiting.
        console.error('Redis rate limiter failed; using in-memory fallback.', rlError);
        if (!consumeMemoryRateLimit(ip)) {
          return res.status(429).json({
            reply: `You have sent too many messages. Please try again later or contact us directly on WhatsApp at ${SUPPORT_PHONE_LOCAL}.`,
          });
        }
      }
    } else if (!consumeMemoryRateLimit(ip)) {
      return res.status(429).json({
        reply: `You have sent too many messages. Please try again later or contact us directly on WhatsApp at ${SUPPORT_PHONE_LOCAL}.`,
      });
    }

    // 2. Strict input validation (aligned with the frontend 500-character limit)
    const { message } = req.body ?? {};

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ reply: 'Invalid request format.' });
    }

    const sanitizedMessage = message.trim();

    if (sanitizedMessage.length > 500) {
      return res.status(400).json({
        reply: 'Your message is too long. Please keep it brief or contact us on WhatsApp.',
      });
    }

    if (sanitizedMessage.length === 0) {
      return res.status(400).json({ reply: 'Message cannot be empty.' });
    }

    // 3. Evaluate Handoff Safety Net
    const handoff = await evaluateHandoff(sanitizedMessage);
    if (handoff && handoff.shouldHandoff) {
      console.info(`Handoff triggered: ${handoff.reason}`);
      return res.status(200).json({
        reply: `This sounds like an urgent issue or requires a technician. Please contact us directly at ${SUPPORT_PHONE_LOCAL} or click the WhatsApp button to speak with a human.`,
      });
    }

    // 4. Call OpenAI server-side. The API key must only exist in the
    // OPENAI_API_KEY Vercel/server environment variable — never in frontend code.
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('CRITICAL ERROR: OPENAI_API_KEY environment variable is missing.');
      return res.status(503).json({
        reply: `Chat service is temporarily offline. Please WhatsApp us at ${SUPPORT_PHONE_LOCAL}.`,
      });
    }

    const knowledgeContext = getKnowledgeContext(sanitizedMessage);
    const model = process.env.OPENAI_MODEL || 'gpt-5.6-luna';

    const openAIResponse: OpenAIHttpResponse = await globalThis.fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        instructions: knowledgeContext,
        input: sanitizedMessage,
        max_output_tokens: 600,
        store: false,
      }),
    });

    if (!openAIResponse.ok) {
      const providerError = await readOpenAIError(openAIResponse);
      const requestId = openAIResponse.headers?.get('x-request-id') || 'unknown';
      console.error(
        `OpenAI API request failed (${openAIResponse.status}) request_id=${requestId}: ${providerError}`,
      );

      if (openAIResponse.status === 401 || openAIResponse.status === 403) {
        return res.status(502).json({
          reply: `The chat service credentials need attention. Please contact us directly on WhatsApp at ${SUPPORT_PHONE_LOCAL}.`,
        });
      }

      if (openAIResponse.status === 429) {
        return res.status(502).json({
          reply: `The chat service is temporarily rate-limited. Please try again shortly or contact us on WhatsApp at ${SUPPORT_PHONE_LOCAL}.`,
        });
      }

      return res.status(502).json({
        reply: `I am currently experiencing technical difficulties. Please contact us directly on WhatsApp at ${SUPPORT_PHONE_LOCAL}.`,
      });
    }

    const payload = await openAIResponse.json() as { output_text?: string };
    const responseText = payload.output_text?.trim() ||
      `I am here to help with your computer repair needs. Please contact us at ${SUPPORT_PHONE_LOCAL}.`;

    return res.status(200).json({ reply: responseText });
  } catch (error: unknown) {
    console.error('Chat API Error:', error instanceof Error ? error.message : error);

    return res.status(500).json({
      reply: `I am currently experiencing technical difficulties. Please contact us directly on WhatsApp at ${SUPPORT_PHONE_LOCAL}.`,
    });
  }
}
