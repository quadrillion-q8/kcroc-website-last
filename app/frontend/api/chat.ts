// File: app/frontend/api/chat.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { getKnowledgeContext } from '../../core/knowledge/knowledgeContext';
import { evaluateHandoff } from '../../core/knowledge/handoffEvaluator';

// Initialize Upstash Redis & Rate Limiter (graceful no-op if env vars are missing)
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
    // 1. Rate Limiting via x-forwarded-for (Safe on Vercel Edge)
    if (ratelimit) {
      const ip = (req.headers['x-forwarded-for'] as string) ?? '127.0.0.1';
      const { success } = await ratelimit.limit(ip);
      
      if (!success) {
        console.warn(`Rate limit exceeded for IP: ${ip}`);
        return res.status(429).json({ 
          reply: 'You have sent too many messages. Please try again later or contact us directly on WhatsApp at 55301913.' 
        });
      }
    }

    // 2. Strict Input Validation
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ reply: 'Invalid request format.' });
    }

    const sanitizedMessage = message.trim();
    if (sanitizedMessage.length > 2000) {
      return res.status(400).json({ reply: 'Your message is too long. Please keep it brief or contact us on WhatsApp.' });
    }

    if (sanitizedMessage.length === 0) {
      return res.status(400).json({ reply: 'Message cannot be empty.' });
    }

    // 3. Evaluate Handoff Safety Net
    const handoff = evaluateHandoff(sanitizedMessage, 0.8);
    if (handoff && handoff.shouldHandoff) {
      return res.status(200).json({
        reply: handoff.reply || 'This sounds like an urgent issue or requires a technician. Please contact us directly at 55301913 or via WhatsApp.'
      });
    }

    // 4. Build Knowledge Context & Call Gemini
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is missing.');
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

    const responseText = response.text || 'I am here to help with your computer repair needs. Please contact us at 55301913.';

    return res.status(200).json({ reply: responseText });

  } catch (error: any) {
    // 5. Secure Error Handling (Log server-side, generic message to client)
    console.error('Chat API Error:', error.message || error);
    
    return res.status(500).json({ 
      reply: 'I am currently experiencing technical difficulties. Please contact us directly on WhatsApp at 55301913.' 
    });
  }
}
