import { Message } from './Message';

export interface Conversation {
  id: string;
  startDate: number;
  lastMessageDate: number;
  context?: {
    phase?: string;
    mood?: number;
    cycleDay?: number;
    symptoms?: string[];
  };
  messages: Message[];
}

export interface ConversationInput {
  context?: Conversation['context'];
}
