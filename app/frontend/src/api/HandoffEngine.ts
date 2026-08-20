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

  // Urgent Escalation Triggers — explicit requests for a human, or clear frustration
  const escalationKeywords = [
    'human', 'agent', 'person', 'manager', 'operator', 
    'supervisor', 'call you', 'talk to someone', 'real person',
    'complain', 'angry', 'upset', 'furious', 'frustrated', 'terrible service',
    'lawsuit', 'sue', 'lawyer'
  ];

  for (const keyword of escalationKeywords) {
    if (normalizedMessage.includes(keyword)) {
      return {
        shouldHandoff: true,
        reason: `User requested human/escalation (Trigger: "${keyword}")`
      };
    }
  }

  // Physical Damage Triggers — these need a technician's eyes, not chatbot advice
  const physicalDamageKeywords = [
    'cracked screen', 'crack in the screen', 'crack on the screen', 'shattered screen',
    'shattered', 'broken screen', 'screen is broken',
    'spilled', 'spill', 'liquid damage', 'water damage', 'got wet', 'fell in water',
    'broken hinge', 'hinge is broken', 'hinge broke', 'snapped hinge',
    'dropped it', 'dropped my', 'fell down', 'fell off',
    'burnt smell', 'smoke coming', 'sparks', 'caught fire'
  ];

  for (const keyword of physicalDamageKeywords) {
    if (normalizedMessage.includes(keyword)) {
      return {
        shouldHandoff: true,
        reason: `Physical damage described, needs technician inspection (Trigger: "${keyword}")`
      };
    }
  }

  return { shouldHandoff: false };
}
