// File: app/frontend/src/knowledge/context.ts
import { SERVICES, ISSUES } from './registry';

/**
 * This utility creates a human-readable "Context Brief" for the AI.
 * It pulls exactly what the AI needs to know based on the customer's query.
 */
export const getKnowledgeContext = (query: string) => {
  // 1. Search for a matching service
  const service = Object.values(SERVICES).find(s => 
    s.name.toLowerCase().includes(query.toLowerCase()) || 
    s.slug.includes(query.toLowerCase())
  );

  // 2. Search for a matching issue (symptom)
  const issue = Object.values(ISSUES).find(i => 
    i.name.toLowerCase().includes(query.toLowerCase()) || 
    i.symptoms.some(s => s.toLowerCase().includes(query.toLowerCase()))
  );

  if (!service && !issue) return "I am the KCROC AI assistant. I can help with laptop, MacBook, and gaming PC repairs.";

  let context = "You are the KCROC AI Assistant. Use this data to answer the customer:\n";

  if (service) {
    context += `Service: ${service.name}\nDescription: ${service.description}\nRepair Time: ${service.repairTime}\n`;
  }
  
  if (issue) {
    context += `Issue: ${issue.name}\nDescription: ${issue.description}\nCommon Symptoms: ${issue.symptoms.join(', ')}\n`;
  }

  context += "\nInstructions: Be professional, friendly, and always mention our 'Free Pick & Drop' service in Kuwait.";
  return context;
};
