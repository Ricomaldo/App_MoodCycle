import { Message, MessageInput } from '../entities/conversation/Message';
import { Conversation, ConversationInput } from '../entities/conversation/Conversation';

export interface ConversationRepository {
  // Conversations
  createConversation(input: ConversationInput): Promise<Conversation>;
  getConversation(id: string): Promise<Conversation | null>;
  getCurrentConversation(): Promise<Conversation | null>;
  updateConversationContext(id: string, context: Conversation['context']): Promise<void>;
  
  // Messages
  addMessage(conversationId: string, message: MessageInput): Promise<Message>;
  getMessages(conversationId: string): Promise<Message[]>;
  getLastMessage(conversationId: string): Promise<Message | null>;
  
  // Utilitaires
  clearConversation(id: string): Promise<void>;
  deleteConversation(id: string): Promise<void>;
} 