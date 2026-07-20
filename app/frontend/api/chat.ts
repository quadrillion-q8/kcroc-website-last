// File: api/chat.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { getKnowledgeContext } from '../src/knowledge/context.js';
import { evaluateHandoff } from '../src/api/HandoffEngine.js';

const MAX_MESSAGE_LENGTH = 1000;

// Rate limiting is optional-but-recommended: if UPSTASH_REDIS_REST_URL /
// UPSTASH_REDIS_REST_TOKEN aren't set (e.g. local dev), this cleanly no-ops
// rather than crashing the function. Set them in Vercel's env vars to enable
// it in production. Free tier: https://upstash.com
const ratelimit =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Ratelimit({
        redis: new Redis({
          url: process.env.UPSTASH_REDIS_REST_URL,
          token: process.env.UPSTASH_REDIS_REST_TOKEN,
        }),
        limiter: Ratelimit.slidingWindow(20, '1 h'), // 20 messages/hour per IP
        prefix: 'ratelimit:chat',
      })
    : null;

function getClientIp(req: VercelRequest): string {
  // Vercel's own edge network sets x-forwarded-for itself (not passed through
  // unmodified from the client), so this is trustworthy on Vercel specifically.
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') return forwarded.split(',')[0].trim();
  if (Array.isArray(forwarded)) return forwarded[0];
  return req.socket?.remoteAddress ?? 'unknown';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    // --- Rate limit ---
    if (ratelimit) {
      const ip = getClientIp(req);
      const { success, reset } = await ratelimit.limit(ip);
      if (!success) {
        const retryAfterSeconds = Math.max(1, Math.ceil((reset - Date.now()) / 1000));
        res.setHeader('Retry-After', String(retryAfterSeconds));
        return res.status(429).json({ reply: 'Too many messages. Please slow down and try again shortly.' });
      }
    }

    // --- Input validation ---
    const { message } = req.body ?? {};
    if (typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ reply: 'Please include a message.' });
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({ reply: `Message is too long (max ${MAX_MESSAGE_LENGTH} characters).` });
    }
    const trimmedMessage = message.trim();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error('GEMINI_API_KEY_MISSING');
    const ai = new GoogleGenAI({ apiKey: apiKey });

    // Safety & Context checks
    const knowledgeContext = getKnowledgeContext(trimmedMessage);
    const handoff = evaluateHandoff(trimmedMessage, 0.8);
    if (handoff.isEscalated) {
      return res.status(200).json({ reply: handoff.message });
    }

    // Call Gemini
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', // Using the fast, free-tier optimized model
      contents: [
        {
          role: 'user',
          parts: [{ text: `You are the KCROC assistant. ${knowledgeContext}\n\nUser: ${trimmedMessage}` }],
        },
      ],
    });
    return res.status(200).json({ reply: response.text });
  } catch (error: any) {
    // Log full detail server-side only — never echo error.message back to the client,
    // since it can include internal config state (e.g. "GEMINI_API_KEY_MISSING") or
    // raw SDK/provider error text that shouldn't reach the browser.
    console.error('SERVER ERROR:', error);
    return res.status(500).json({ reply: 'Sorry, something went wrong on our end. Please try WhatsApp instead.' });
  }
}
