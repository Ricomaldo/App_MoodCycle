import { makeAutoObservable } from 'mobx';
import { Conversation, Message } from '../../../../core/domain/entities/Conversation';
import { IConversationRepository } from '../../../../core/domain/repositories/IConversationRepository';

export class ConversationViewModel {
  private conversationRepository: IConversationRepository;

  // État observé par la vue
  conversation: Conversation | null = null;
  isLoading = false;
  error: string | null = null;
  isSending = false;

  constructor(conversationRepository: IConversationRepository) {
    makeAutoObservable(this);
    this.conversationRepository = conversationRepository;
  }

  // Actions
  async loadConversation() {
    this.isLoading = true;
    this.error = null;

    try {
      this.conversation = await this.conversationRepository.getCurrentConversation();
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.error = error.message;
      } else {
        this.error = 'Une erreur inconnue est survenue lors du chargement de la conversation';
      }
    } finally {
      this.isLoading = false;
    }
  }

  async sendMessage(content: string) {
    if (!this.conversation) return;

    this.isSending = true;
    try {
      const message: Message = {
        id: Date.now().toString(),
        content,
        timestamp: new Date(),
        isUser: true,
      };

      await this.conversationRepository.saveMessage(this.conversation.id, message);
      await this.loadConversation();
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.error = error.message;
      } else {
        this.error = "Une erreur inconnue est survenue lors de l'envoi du message";
      }
    } finally {
      this.isSending = false;
    }
  }

  // Getters
  get messages() {
    return this.conversation?.messages || [];
  }

  get hasActiveConversation() {
    return this.conversation !== null;
  }
}
