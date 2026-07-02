// File: api/chat.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';
import { getKnowledgeContext } from '../src/knowledge/context.js';
import { evaluateHandoff } from '../src/api/HandoffEngine.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const { message } = req.body;
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error("API_KEY_MISSING");
    }

    const openai = new OpenAI({ apiKey: apiKey });
    
    // Safety & Context checks
    const knowledgeContext = getKnowledgeContext(message);
    const handoff = evaluateHandoff(message, 0.8);

    if (handoff.isEscalated) {
      return res.status(200).json({ reply: handoff.message });
    }

    const completion = await openai.chat.completions.create({
      messages: [
        { 
          role: "system", 
          content: `You are the KCROC assistant. ${knowledgeContext}` 
        },
        { role: "user", content: message }
      ],
      model: "gpt-4o-mini",
    });

    return res.status(200).json({ reply: completion.choices[0].message.content });
    
  } catch (error: any) {
    // This is the important change: We send the ERROR MESSAGE back to your chat widget
    console.error('SERVER ERROR:', error);
    return res.status(500).json({ reply: `System Error: ${error.message || 'Unknown Error'}` });
  }
}
