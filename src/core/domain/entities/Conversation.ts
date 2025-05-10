export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  isUser: boolean;
  metadata?: {
    mood?: number;
    cyclePhase?: string;
    context?: string;
  };
}

export interface Conversation {
  id: string;
  messages: Message[];
  startDate: Date;
  lastMessageDate: Date;
  context?: {
    currentPhase?: string;
    userMood?: number;
    userSymptoms?: string[];
  };
} 