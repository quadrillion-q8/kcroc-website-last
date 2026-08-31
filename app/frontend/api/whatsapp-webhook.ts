// File: app/frontend/api/whatsapp-webhook.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';
import { GoogleGenAI } from '@google/genai';
import { Redis } from '@upstash/redis';
import { getKnowledgeContext } from '../src/knowledge/context';
import { evaluateHandoff } from '../src/api/HandoffEngine';

// Same Upstash Redis instance pattern used in api/book.ts, reused here for
// webhook delivery idempotency. Meta retries webhook delivery on timeout/non-2xx,
// so without this a retried delivery of the same message re-runs the AI reply
// and sends the customer a duplicate WhatsApp message.
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

const PROCESSED_MESSAGE_TTL_SECONDS = 60 * 60 * 24; // 24h is well beyond Meta's retry window

/**
 * Returns true if this WhatsApp message ID has already been processed
 * (and marks it as processed for future calls). Fails open (returns false,
 * i.e. "not a duplicate") if Redis isn't configured, so the bot still works
 * without idempotency protection rather than going fully offline.
 */
async function isDuplicateMessage(messageId: string): Promise<boolean> {
  if (!redis) {
    console.warn('UPSTASH_REDIS not configured — webhook idempotency check skipped.');
    return false;
  }
  const key = `wa-msg:${messageId}`;
  // SET ... NX returns null if the key already existed (i.e. duplicate)
  const wasSet = await redis.set(key, '1', { nx: true, ex: PROCESSED_MESSAGE_TTL_SECONDS });
  return wasSet === null;
}

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
    const expectedBuffer = Buffer.from(expectedSignature, 'utf8');
    const signatureBuffer = Buffer.from(signature, 'utf8');
    
    // Buffer lengths must match before timingSafeEqual is called
    if (expectedBuffer.length !== signatureBuffer.length) {
      return false;
    }
    
    return crypto.timingSafeEqual(expectedBuffer, signatureBuffer);
  } catch (err) {
    return false; // Fails safely if any parsing error occurs
  }
}

/**
 * 🚀 OUTBOUND MESSAGING: Sends the generated reply back to the user via Meta's WhatsApp Graph API
 */
async function sendWhatsAppMessage(phoneNumberId: string, to: string, text: string) {
  const accessToken = process.env.WHATSAPP_TOKEN || process.env.META_ACCESS_TOKEN || process.env.WHATSAPP_ACCESS_TOKEN;
  
  if (!accessToken) {
    console.error('CRITICAL: WHATSAPP_TOKEN or META_ACCESS_TOKEN is missing in environment variables.');
    return;
  }

  const url = `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: to,
        type: 'text',
        text: { body: text },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to deliver WhatsApp message to ${to}. Meta API response:`, errorText);
    } else {
      console.info(`Successfully delivered WhatsApp message to ${to}`);
    }
  } catch (err) {
    console.error('Error calling Meta Graph API:', err);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // ─── 1. VERIFICATION CHALLENGE (GET) ───
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    
    if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
      console.log('WhatsApp Webhook Verified successfully.');
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
        console.error('CRITICAL: META_APP_SECRET is not configured in environment variables.');
        return res.status(500).json({ error: 'Server misconfiguration' });
      }

      if (!verifyMetaSignature(rawBody, signature, appSecret)) {
        console.warn('Unauthorized attempt to access WhatsApp Webhook.');
        return res.status(401).json({ error: 'Invalid signature' });
      }

      const body = JSON.parse(rawBody);

      // Extract message metadata and payload
      const value = body?.entry?.[0]?.changes?.[0]?.value;
      const messageObj = value?.messages?.[0];
      const phoneNumberId = value?.metadata?.phone_number_id;

      // If it's a status update (read receipt, delivery report) or non-text message, acknowledge and exit
      if (!messageObj || !messageObj.text || !messageObj.from || !phoneNumberId) {
        return res.status(200).send('EVENT_RECEIVED');
      }

      // Idempotency: Meta may retry delivery of the same message (e.g. if our
      // response was slow or non-2xx). Without this check a retry re-runs the
      // AI reply and sends the customer a duplicate WhatsApp message.
      if (messageObj.id && (await isDuplicateMessage(messageObj.id))) {
        console.info(`Skipping already-processed WhatsApp message: ${messageObj.id}`);
        return res.status(200).send('EVENT_RECEIVED');
      }

      const userMessage = messageObj.text.body;
      const senderPhone = messageObj.from;

      let replyText = '';

      // 3. Run Safety Governor (Handoff Check)
      const handoff = await evaluateHandoff(userMessage);

      if (handoff && handoff.shouldHandoff) {
        console.info(`WhatsApp Handoff triggered for ${senderPhone}: ${handoff.reason}`);
        replyText = 'Your request requires technician assistance or urgent handling. Please call or message us directly at 55301913 so our team can assist you immediately.';
      } else {
        // 4. Build Knowledge Context & Generate AI Response via Gemini 2.5 Flash
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
          console.error('CRITICAL: GEMINI_API_KEY environment variable is missing.');
          replyText = 'Thank you for reaching out to Kuwait Computer Repair On Call. Please contact us directly at 55301913 for immediate assistance.';
        } else {
          const knowledgeContext = getKnowledgeContext(userMessage);
          const ai = new GoogleGenAI({ apiKey });

          const aiResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userMessage,
            config: {
              systemInstruction: knowledgeContext,
            },
          });

          replyText = aiResponse.text || 'Thank you for contacting Kuwait Computer Repair On Call. How can we assist with your device today? You can also call us directly at 55301913.';
        }
      }

      // 5. Deliver the message to the customer's phone via WhatsApp API
      await sendWhatsAppMessage(phoneNumberId, senderPhone, replyText);

      // Return 200 OK to Meta to acknowledge receipt
      return res.status(200).send('EVENT_RECEIVED');

    } catch (error) {
      console.error('WhatsApp Webhook Error:', error);
      return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
