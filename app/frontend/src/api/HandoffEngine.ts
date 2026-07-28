// File: app/frontend/src/api/HandoffEngine.ts

export interface HandoffResult {
  shouldHandoff: boolean;
  reason?: string;
}

/**
 * Evaluates if a conversation needs human escalation based on user intent.
 * Uses fast regex heuristics to prevent blocking the main LLM response time
 * and avoid double-billing an AI provider for simple intent routing.
 */
export async function evaluateHandoff(message: string, history?: any[]): Promise<HandoffResult> {
  if (!message) return { shouldHandoff: false };
  
  const normalizedMessage = message.toLowerCase();

  // Urgent Escalation Triggers
  const escalationKeywords = [
    'human', 'agent', 'person', 'manager', 'operator', 
    'supervisor', 'call you', 'talk to someone', 'real person',
    'complain', 'angry', 'upset', 'lawsuit', 'sue', 'lawyer'
  ];

  for (const keyword of escalationKeywords) {
    if (normalizedMessage.includes(keyword)) {
      return {
        shouldHandoff: true,
        reason: `User requested human/escalation (Trigger: "${keyword}")`
      };
    }
  }

  return { shouldHandoff: false };
}
