export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: Date;
  metadata?: Record<string, any>;
}

export interface ConversationContext {
  cycleId?: string;
  phase?: string;
  userMood?: number;
  userSymptoms?: string[];
  metadata?: Record<string, any>;
}

export interface Conversation {
  id: string;
  userId: string;
  title: string;
  messages: Message[];
  context?: ConversationContext;
  createdAt: Date;
  updatedAt: Date;
}
