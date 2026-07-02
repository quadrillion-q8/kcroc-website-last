// File: app/frontend/src/api/HandoffEngine.ts

export interface HandoffResult {
  message: string;
  isEscalated: boolean;
  priority: 'NORMAL' | 'HIGH';
}

// Keywords that trigger immediate human intervention
const EMERGENCY_KEYWORDS = ['angry', 'complaint', 'refund', 'emergency', 'spilled', 'water', 'smoke', 'urgent'];

export const evaluateHandoff = (userQuery: string, aiConfidence: number): HandoffResult => {
  const normalizedQuery = userQuery.toLowerCase();
  
  // 1. Emergency Trigger Check
  const isEmergency = EMERGENCY_KEYWORDS.some(keyword => normalizedQuery.includes(keyword));
  
  if (isEmergency) {
    return {
      message: "I am flagging this for a human technician immediately due to urgency. Please hold while we prioritize your request.",
      isEscalated: true,
      priority: 'HIGH'
    };
  }

  // 2. Confidence Level Check
  if (aiConfidence < 0.6) {
    return {
      message: "I am not 100% sure about the technical details. Let me connect you with a technician to ensure you get the right advice.",
      isEscalated: true,
      priority: 'NORMAL'
    };
  }

  // 3. Standard flow
  return {
    message: "", // AI continues with its generated response
    isEscalated: false,
    priority: 'NORMAL'
  };
};
