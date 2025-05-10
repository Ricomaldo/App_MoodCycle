import { Conversation, Message } from '../entities/Conversation';

export interface IConversationRepository {
  getCurrentConversation(): Promise<Conversation>;
  getConversationById(id: string): Promise<Conversation>;
  getConversationHistory(): Promise<Conversation[]>;
  saveMessage(conversationId: string, message: Message): Promise<void>;
  updateConversationContext(conversationId: string, context: Conversation['context']): Promise<void>;
  deleteConversation(id: string): Promise<void>;
} 