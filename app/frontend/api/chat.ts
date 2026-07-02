// File: app/frontend/api/chat.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';
import { getKnowledgeContext } from '../src/knowledge/context.js';
import { evaluateHandoff } from '../src/api/HandoffEngine.js';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const { message } = req.body;
    
    // 1. Get Context & Safety Check
    const knowledgeContext = getKnowledgeContext(message);
    const handoff = evaluateHandoff(message, 0.8);

    if (handoff.isEscalated) {
      return res.status(200).json({ reply: handoff.message });
    }

    // 2. AI Generation
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: knowledgeContext },
        { role: "user", content: message }
      ],
      model: "gpt-4o-mini",
    });

    return res.status(200).json({ reply: completion.choices[0].message.content });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to process request' });
  }
}
