// File: app/frontend/api/whatsapp-webhook.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import { getKnowledgeContext } from '../src/knowledge/context';
import { evaluateHandoff } from '../src/api/HandoffEngine';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Validate request (Meta verification)
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
  const userMessage = req.body.entry[0].changes[0].value.messages[0].text.body;
  const phoneNumber = req.body.entry[0].changes[0].value.messages[0].from;

  // 3. Get Knowledge Context
  const knowledgeContext = getKnowledgeContext(userMessage);

  // 4. Run Safety Governor (Handoff Check)
  // We assume a confidence score of 0.8 for initial logic
  const handoff = evaluateHandoff(userMessage, 0.8);

  if (handoff.isEscalated) {
    return res.status(200).json({ reply: handoff.message, status: 'ESCALATED' });
  }

  // 5. Generate AI Response (Placeholder for your AI API call)
  // This is where you would call OpenAI/Anthropic/Gemini API
  const aiResponse = `[Placeholder: AI generated response based on context: ${knowledgeContext}]`;

  // 6. Return response to WhatsApp
  return res.status(200).json({ 
    success: true, 
    reply: aiResponse 
  });
}
