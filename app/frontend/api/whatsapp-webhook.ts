// File: app/frontend/api/whatsapp-webhook.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';
import OpenAI from 'openai';
import { getKnowledgeContext } from '../src/knowledge/context';
import { evaluateHandoff } from '../src/api/HandoffEngine';

// 🚀 SECURITY: Disable Vercel's default parser so we can cryptographically verify the raw payload from Meta
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to read the raw body stream
async function getRawBody(req: VercelRequest): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => (body += chunk.toString()));
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

// Cryptographic verification of Meta's payload
function verifyMetaSignature(rawBody: string, signature: string | string[] | undefined, appSecret: string): boolean {
  if (!signature || typeof signature !== 'string') return false;
  
  const expectedSignature = 'sha256=' + crypto.createHmac('sha256', appSecret).update(rawBody).digest('hex');
  
  try {
    return crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(signature));
  } catch (err) {
    return false; // Fails safely if lengths mismatch
  }
}

// Initialize OpenAI client
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // ─── 1. VERIFICATION CHALLENGE (GET) ───
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    
    if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
      console.log('WhatsApp Webhook Verified.');
      return res.status(200).send(challenge);
    }
    return res.status(403).send('Forbidden');
  }

  // ─── 2. MESSAGE PROCESSING (POST) ───
  if (req.method === 'POST') {
    try {
      const rawBody = await getRawBody(req);
      const signature = req.headers['x-hub-signature-256'];
      const appSecret = process.env.META_APP_SECRET;

      // 🚀 SECURITY: Reject unauthorized requests immediately
      if (!appSecret) {
        console.error('CRITICAL: META_APP_SECRET is not configured in Vercel.');
        return res.status(500).json({ error: 'Server misconfiguration' });
      }

      if (!verifyMetaSignature(rawBody, signature, appSecret)) {
        console.warn('Unauthorized attempt to access WhatsApp Webhook.');
        return res.status(401).json({ error: 'Invalid signature' });
      }

      const body = JSON.parse(rawBody);

      // 🚀 STABILITY: Safely extract the message using optional chaining
      const messageObj = body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
      
      // If it's a status update (read receipt, delivery) rather than a text message, acknowledge and exit safely
      if (!messageObj || !messageObj.text) {
        return res.status(200).send('EVENT_RECEIVED');
      }

      const userMessage = messageObj.text.body;

      // 3. Get Knowledge Context
      const knowledgeContext = getKnowledgeContext(userMessage);

      // 4. Run Safety Governor (Handoff Check)
      const handoff = evaluateHandoff(userMessage, 0.8);

      if (handoff.isEscalated) {
        return res.status(200).json({ 
          reply: handoff.message, 
          status: 'ESCALATED',
          priority: handoff.priority 
        });
      }

      // 5. Generate AI Response via OpenAI
      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: knowledgeContext },
          { role: "user", content: userMessage }
        ],
        model: "gpt-4o-mini",
      });

      const aiResponse = completion.choices[0]?.message?.content || "I am currently unavailable. Please call us at 55301913.";

      // 6. Return response to WhatsApp
      return res.status(200).json({ 
        success: true, 
        reply: aiResponse 
      });

    } catch (error) {
      console.error('Webhook Error:', error);
      return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
