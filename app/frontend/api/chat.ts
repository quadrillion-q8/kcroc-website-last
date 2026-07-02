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
    
    // 1. Get Context & Run Safety Governor
    const knowledgeContext = getKnowledgeContext(message);
    const handoff = evaluateHandoff(message, 0.8);

    if (handoff.isEscalated) {
      return res.status(200).json({ reply: handoff.message });
    }

    // 2. AI Generation with Grounded Identity
    const completion = await openai.chat.completions.create({
      messages: [
        { 
          role: "system", 
          content: `You are the official KCROC (Kuwait Computer Repair On Call) AI Assistant.
          
          BUSINESS IDENTITY:
          - Business Name: Kuwait Computer Repair On Call (KCROC)
          - Phone: 55301913
          - Address: Hawalli, Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19.
          - Service Policy: We provide Free Pick & Drop service across Kuwait.
          - Business Rule: KCROC is just repairing, no buying anything at all.
          
          INSTRUCTIONS:
          - Be professional, friendly, and concise.
          - Always mention our 'Free Pick & Drop' service.
          - If the user asks about location or contact, provide the business details above.
          - Use the provided context to answer technical questions.
          - If a technical issue is complex, or the user is frustrated, suggest they call us at 55301913.
          
          KNOWLEDGE CONTEXT:
          ${knowledgeContext}` 
        },
        { role: "user", content: message }
      ],
      model: "gpt-4o-mini",
    });

    return res.status(200).json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error('Chat API Error:', error);
    return res.status(500).json({ error: 'Failed to process request. Please call 55301913 for immediate assistance.' });
  }
}
