// File: app/frontend/api/chat.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// 🚀 FIXED: Corrected import paths to point to the actual files in src/
import { getKnowledgeContext } from '../src/knowledge/context';
import { evaluateHandoff } from '../src/api/HandoffEngine';
import { KCROC_GRAPH } from '../src/data/graph';

// Local-format display number (no 965 country code) for the chat's own
// fallback error copy. Reads from the graph so it can't drift from the
// site's actual phone number.
const SUPPORT_PHONE_LOCAL = KCROC_GRAPH.business!.telephone.slice(3);

// Initialize Upstash Redis & Rate Limiter
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = redisUrl && redisToken 
  ? new Redis({ url: redisUrl, token: redisToken }) 
  : null;

const ratelimit = redis 
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.slidingWindow(20, '1 h'),
      analytics: false,
    })
  : null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ reply: 'Method Not Allowed' });
  }

  try {
    // 1. RATE LIMITING - FAIL CLOSED ARCHITECTURE
    // If Redis is not configured, explicitly deny the request to protect the Gemini API.
    if (!ratelimit) {
      console.error('SECURITY ALERT: Upstash Redis env vars missing. Failing closed to prevent API abuse.');
      return res.status(503).json({ 
        reply: `Chat service is temporarily offline for maintenance. Please contact us directly on WhatsApp at ${SUPPORT_PHONE_LOCAL}.` 
      });
    }

    try {
      const ip = (req.headers['x-forwarded-for'] as string) ?? '127.0.0.1';
      const { success } = await ratelimit.limit(ip);
      
      if (!success) {
        console.warn(`Rate limit exceeded for IP: ${ip}`);
        // 429 status caught by frontend to show a specific message
        return res.status(429).json({ 
          reply: `You have sent too many messages. Please try again later or contact us directly on WhatsApp at ${SUPPORT_PHONE_LOCAL}.` 
        });
      }
    } catch (rlError) {
      // If the Redis connection fails during the check, fail closed.
      console.error('SECURITY ALERT: Rate limiter check failed to execute. Failing closed.', rlError);
      return res.status(503).json({ 
        reply: `Chat service is temporarily offline. Please contact us on WhatsApp at ${SUPPORT_PHONE_LOCAL}.` 
      });
    }

    // 2. Strict Input Validation (Aligned with 500 char frontend limit)
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ reply: 'Invalid request format.' });
    }

    const sanitizedMessage = message.trim();
    
    if (sanitizedMessage.length > 500) {
      return res.status(400).json({ reply: 'Your message is too long. Please keep it brief or contact us on WhatsApp.' });
    }

    if (sanitizedMessage.length === 0) {
      return res.status(400).json({ reply: 'Message cannot be empty.' });
    }

    // 3. Evaluate Handoff Safety Net
    const handoff = await evaluateHandoff(sanitizedMessage);
    if (handoff && handoff.shouldHandoff) {
      console.info(`Handoff triggered: ${handoff.reason}`);
      return res.status(200).json({
        reply: `This sounds like an urgent issue or requires a technician. Please contact us directly at ${SUPPORT_PHONE_LOCAL} or click the WhatsApp button to speak with a human.`
      });
    }

    // 4. Build Knowledge Context & Call Gemini
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('CRITICAL ERROR: GEMINI_API_KEY environment variable is missing.');
      return res.status(503).json({ reply: `Chat service is temporarily offline. Please WhatsApp us at ${SUPPORT_PHONE_LOCAL}.` });
    }

    const knowledgeContext = getKnowledgeContext(sanitizedMessage);

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: sanitizedMessage,
      config: {
        systemInstruction: knowledgeContext,
      },
    });

    const responseText = response.text || `I am here to help with your computer repair needs. Please contact us at ${SUPPORT_PHONE_LOCAL}.`;

    return res.status(200).json({ reply: responseText });

  } catch (error: any) {
    // 5. Secure Error Handling (Log server-side, generic message to client)
    console.error('Chat API Error:', error.message || error);
    
    return res.status(500).json({ 
      reply: `I am currently experiencing technical difficulties. Please contact us directly on WhatsApp at ${SUPPORT_PHONE_LOCAL}.` 
    });
  }
}
