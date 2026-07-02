// File: app/frontend/api/chat.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';
import { getKnowledgeContext } from '../src/knowledge/context.js';
import { evaluateHandoff } from '../src/api/HandoffEngine.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  // --- DEBUG LOGGING ---
  const apiKey = process.env.OPENAI_API_KEY;
  console.log('DEBUG: Is API Key present?', !!apiKey);
  console.log('DEBUG: API Key length:', apiKey?.length || 0);

  if (!apiKey) {
    return res.status(500).json({ error: 'API Key missing in environment' });
  }

  const openai = new OpenAI({ apiKey: apiKey });

  try {
    const { message } = req.body;
    
    // ... rest of your existing code ...
    const knowledgeContext = getKnowledgeContext(message);
    const handoff = evaluateHandoff(message, 0.8);

    if (handoff.isEscalated) {
      return res.status(200).json({ reply: handoff.message });
    }

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: `You are KCROC AI... ${knowledgeContext}` },
        { role: "user", content: message }
      ],
      model: "gpt-4o-mini",
    });

    return res.status(200).json({ reply: completion.choices[0].message.content });
  } catch (error: any) {
    console.error('CRITICAL ERROR:', error.message);
    return res.status(500).json({ error: 'Failed to process request.' });
  }
}
