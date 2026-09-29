// File: app/frontend/api/whatsapp-webhook.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';
import { Redis } from '@upstash/redis';
import { getKnowledgeContext } from '../src/knowledge/context';
import { evaluateHandoff } from '../src/api/HandoffEngine';
import { KCROC_GRAPH } from '../src/data/graph';

const SUPPORT_PHONE_LOCAL = KCROC_GRAPH.business!.telephone.slice(3);

const META_GRAPH_API_VERSION = process.env.META_GRAPH_API_VERSION || 'v26.0';
const META_APP_SECRET = process.env.META_APP_SECRET;
const WHATSAPP_VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;
const WHATSAPP_ACCESS_TOKEN =
  process.env.WHATSAPP_ACCESS_TOKEN ||
  process.env.WHATSAPP_TOKEN ||
  process.env.META_ACCESS_TOKEN;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-5.6-luna';

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
const redis = redisUrl && redisToken
  ? new Redis({ url: redisUrl, token: redisToken })
  : null;

const PROCESSED_MESSAGE_TTL_SECONDS = 60 * 60 * 24;

export const config = {
  api: {
    bodyParser: false,
  },
  maxDuration: 60,
};

async function isDuplicateMessage(messageId: string): Promise<boolean> {
  if (!redis) {
    console.warn('UPSTASH_REDIS not configured — webhook idempotency check skipped.');
    return false;
  }

  try {
    const wasSet = await redis.set(
      `wa-msg:${messageId}`,
      '1',
      { nx: true, ex: PROCESSED_MESSAGE_TTL_SECONDS },
    );
    return wasSet === null;
  } catch (error) {
    // Redis is an optimization for deduplication, not a hard dependency.
    console.error('WhatsApp webhook Redis idempotency check failed:', error);
    return false;
  }
}

async function getRawBody(req: VercelRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];

    req.on('data', (chunk: Buffer | string) => {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    });
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

function verifyMetaSignature(
  rawBody: Buffer,
  signature: string | string[] | undefined,
  appSecret: string,
): boolean {
  if (!signature || typeof signature !== 'string') return false;

  const expected = crypto
    .createHmac('sha256', appSecret)
    .update(rawBody)
    .digest('hex');

  const expectedSignature = `sha256=${expected}`;

  const expectedBuffer = Buffer.from(expectedSignature, 'utf8');
  const signatureBuffer = Buffer.from(signature, 'utf8');

  if (expectedBuffer.length !== signatureBuffer.length) return false;
  return crypto.timingSafeEqual(expectedBuffer, signatureBuffer);
}

async function readOpenAIError(response: globalThis.Response): Promise<string> {
  try {
    const payload = await response.json() as { error?: { message?: string } };
    return payload?.error?.message || `HTTP ${response.status}`;
  } catch {
    return `HTTP ${response.status}`;
  }
}

async function sendWhatsAppMessage(phoneNumberId: string, to: string, text: string): Promise<void> {
  if (!WHATSAPP_ACCESS_TOKEN) {
    throw new Error('WHATSAPP_ACCESS_TOKEN is not configured.');
  }

  const url = `https://graph.facebook.com/${META_GRAPH_API_VERSION}/${encodeURIComponent(phoneNumberId)}/messages`;

  const response = await globalThis.fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to,
      type: 'text',
      text: { body: text },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Meta WhatsApp API ${response.status}: ${errorText}`);
  }
}

async function generateReply(userMessage: string): Promise<string> {
  const handoff = await evaluateHandoff(userMessage);

  if (handoff?.shouldHandoff) {
    console.info(`WhatsApp handoff triggered: ${handoff.reason}`);
    return `Your request requires technician assistance or urgent handling. Please call or message us directly at ${SUPPORT_PHONE_LOCAL} so our team can assist you immediately.`;
  }

  if (!OPENAI_API_KEY) {
    console.error('CRITICAL: OPENAI_API_KEY is not configured.');
    return `Thank you for reaching out to Kuwait Computer Repair On Call. Please contact us directly at ${SUPPORT_PHONE_LOCAL} for immediate assistance.`;
  }

  const knowledgeContext = getKnowledgeContext(userMessage);

  const response = await globalThis.fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      instructions: knowledgeContext,
      input: userMessage,
      max_output_tokens: 600,
      store: false,
    }),
  });

  if (!response.ok) {
    const providerError = await readOpenAIError(response);
    console.error(`OpenAI WhatsApp reply failed (${response.status}): ${providerError}`);
    return `I am currently experiencing technical difficulties. Please contact us directly on WhatsApp or call ${SUPPORT_PHONE_LOCAL}.`;
  }

  const payload = await response.json() as { output_text?: string };
  return payload.output_text?.trim() ||
    `I am here to help with your computer repair needs. Please contact us at ${SUPPORT_PHONE_LOCAL}.`;
}

type WhatsAppMessageEvent = {
  id?: string;
  from?: string;
  type?: string;
  text?: { body?: string };
};

type WhatsAppChange = {
  field?: string;
  value?: {
    messaging_product?: string;
    metadata?: { phone_number_id?: string };
    messages?: WhatsAppMessageEvent[];
  };
};

function extractMessageEvents(body: unknown): Array<{ message: WhatsAppMessageEvent; phoneNumberId: string }> {
  const events: Array<{ message: WhatsAppMessageEvent; phoneNumberId: string }> = [];
  const entries = Array.isArray((body as { entry?: unknown[] })?.entry)
    ? (body as { entry: unknown[] }).entry
    : [];

  for (const entry of entries) {
    const changes = Array.isArray((entry as { changes?: unknown[] })?.changes)
      ? (entry as { changes: unknown[] }).changes
      : [];

    for (const change of changes) {
      const typedChange = change as WhatsAppChange;
      if (typedChange.field !== 'messages') continue;

      const phoneNumberId = typedChange.value?.metadata?.phone_number_id;
      const messages = typedChange.value?.messages;
      if (!phoneNumberId || !Array.isArray(messages)) continue;

      for (const message of messages) {
        events.push({ message, phoneNumberId });
      }
    }
  }

  return events;
}

async function processMessageEvent(message: WhatsAppMessageEvent, phoneNumberId: string): Promise<void> {
  // This integration deliberately auto-replies only to text messages.
  if (message.type !== 'text' || !message.text?.body || !message.from || !message.id) return;

  if (await isDuplicateMessage(message.id)) {
    console.info(`Skipping duplicate WhatsApp message: ${message.id}`);
    return;
  }

  const userMessage = message.text.body.trim().slice(0, 2000);
  if (!userMessage) return;

  const replyText = await generateReply(userMessage);
  await sendWhatsAppMessage(phoneNumberId, message.from, replyText);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Meta verification handshake.
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === WHATSAPP_VERIFY_TOKEN && typeof challenge === 'string') {
      console.info('WhatsApp webhook verified successfully.');
      return res.status(200).send(challenge);
    }

    return res.status(403).send('Forbidden');
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    if (!META_APP_SECRET) {
      console.error('CRITICAL: META_APP_SECRET is not configured.');
      return res.status(500).json({ error: 'Server misconfiguration' });
    }

    const rawBody = await getRawBody(req);
    const signature = req.headers['x-hub-signature-256'];

    if (!verifyMetaSignature(rawBody, signature, META_APP_SECRET)) {
      console.warn('Rejected WhatsApp webhook with invalid X-Hub-Signature-256.');
      return res.status(401).json({ error: 'Invalid signature' });
    }

    const body = JSON.parse(rawBody.toString('utf8')) as unknown;
    const events = extractMessageEvents(body);

    // Acknowledge status/other webhook events too. Meta recommends a 200 response
    // for successfully received webhooks, and retries failed deliveries.
    if (events.length === 0) {
      return res.status(200).send('EVENT_RECEIVED');
    }

    // Process the events before returning 200 so the Vercel invocation remains alive
    // for the outbound Meta API call. maxDuration is set to 60 seconds above.
    for (const event of events) {
      await processMessageEvent(event.message, event.phoneNumberId);
    }

    return res.status(200).send('EVENT_RECEIVED');
  } catch (error: unknown) {
    console.error('WhatsApp Webhook Error:', error instanceof Error ? error.message : error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}
