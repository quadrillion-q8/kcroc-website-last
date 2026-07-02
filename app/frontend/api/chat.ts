// File: api/chat.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';
import { getKnowledgeContext } from '../src/knowledge/context.js';
import { evaluateHandoff } from '../src/api/HandoffEngine.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) throw new Error("GEMINI_API_KEY_MISSING");

    const ai = new GoogleGenAI({ apiKey: apiKey });
    
    // Safety & Context checks
    const knowledgeContext = getKnowledgeContext(message);
    const handoff = evaluateHandoff(message, 0.8);

    if (handoff.isEscalated) {
      return res.status(200).json({ reply: handoff.message });
    }

    // Call Gemini
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', // Using the fast, free-tier optimized model
      contents: [
        { 
          role: 'user', 
          parts: [{ text: `You are the KCROC assistant. ${knowledgeContext}\n\nUser: ${message}` }] 
        }
      ],
    });

    return res.status(200).json({ reply: response.text });
    
  } catch (error: any) {
    console.error('SERVER ERROR:', error);
    return res.status(500).json({ reply: `System Error: ${error.message || 'Unknown Error'}` });
  }
}
