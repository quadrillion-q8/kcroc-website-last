// File: app/frontend/src/knowledge/context.ts
import { KNOWLEDGE_SERVICES as SERVICES, ISSUES } from './registry.js';

// Define the shape of your data so TypeScript stops complaining
interface Service { name: string; slug: string; description: string; repairTime: string; }
interface Issue { name: string; description: string; symptoms: string[]; }

export const getKnowledgeContext = (query: string) => {
  // Cast the objects to an array of specific types
  const serviceList = Object.values(SERVICES) as Service[];
  const issueList = Object.values(ISSUES) as Issue[];

  const service = serviceList.find(s => 
    s.name.toLowerCase().includes(query.toLowerCase()) || 
    s.slug.includes(query.toLowerCase())
  );

  const issue = issueList.find(i => 
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
