import { ClaudeService } from '../../../services/claude/ClaudeService';
import { ConversationRepository } from '../../repositories/ConversationRepository';
import { MessageInput } from '../../entities/conversation/Message';
import { ClaudeError } from '../../../services/claude/types';

export class SendMessageUseCase {
  constructor(
    private claudeService: ClaudeService,
    private conversationRepository: ConversationRepository
  ) {}

  async execute(
    message: string,
    context?: {
      phase?: string;
      mood?: number;
      cycleDay?: number;
      symptoms?: string[];
    }
  ): Promise<{ success: boolean; error?: ClaudeError }> {
    try {
      // Récupérer ou créer une conversation
      let conversation = await this.conversationRepository.getCurrentConversation();
      if (!conversation) {
        conversation = await this.conversationRepository.createConversation({
          context,
        });
      }

      // Sauvegarder le message de l'utilisateur
      const userMessage: MessageInput = {
        content: message,
        isUser: true,
        metadata: context,
      };
      await this.conversationRepository.addMessage(conversation.id, userMessage);

      // Obtenir la réponse de Claude
      const response = await this.claudeService.sendMessage(message, {
        ...context,
        previousMessages: await this.conversationRepository.getMessages(conversation.id),
      });

      // Sauvegarder la réponse de Claude
      const claudeMessage: MessageInput = {
        content: response.content,
        isUser: false,
        metadata: {
          model: response.metadata?.model,
          tokens: response.metadata?.tokens,
        },
      };
      await this.conversationRepository.addMessage(conversation.id, claudeMessage);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error as ClaudeError,
      };
    }
  }
} 