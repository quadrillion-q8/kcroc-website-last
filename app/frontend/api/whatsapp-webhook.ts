// File: app/frontend/api/whatsapp-webhook.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';
import { getKnowledgeContext } from '../src/knowledge/context.js';
import { evaluateHandoff } from '../src/api/HandoffEngine.js';

// Initialize OpenAI client
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Validate request (Meta/WhatsApp verification)
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    
    if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    }
    return res.status(403).send('Forbidden');
  }

  // 2. Extract user message
  // Note: Ensure your webhook configuration in Meta sends 'text' messages
  try {
    const userMessage = req.body.entry[0].changes[0].value.messages[0].text.body;

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

    const aiResponse = completion.choices[0].message.content;

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
