import { ConversationRepository } from '../../repositories/ConversationRepository';
import { Conversation } from '../../entities/conversation/Conversation';

export class GetConversationHistoryUseCase {
  constructor(private conversationRepository: ConversationRepository) {}

  async execute(conversationId?: string): Promise<Conversation | null> {
    if (conversationId) {
      return this.conversationRepository.getConversation(conversationId);
    }
    return this.conversationRepository.getCurrentConversation();
  }
} 