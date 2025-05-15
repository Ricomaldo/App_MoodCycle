import { getRealmInstance } from '../models';
import { IConversationRepository } from '../../domain/repositories/IConversationRepository';
import { Conversation, Message } from '../../domain/entities/Conversation';

interface RealmMessage {
  id: string;
  role: string;
  content: string;
  createdAt: Date | string;
}

interface RealmConversation {
  id: string;
  userId: string;
  title: string;
  messages: RealmMessage[];
  context?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export class ConversationRepository implements IConversationRepository {
  async getCurrentConversation(): Promise<Conversation> {
    const realm = getRealmInstance();
    const currentConversation = realm
      .objects('Conversation')
      .filtered('updatedAt != null')
      .sorted('updatedAt', true)[0];

    if (!currentConversation) {
      throw new Error('Aucune conversation active');
    }

    return this.mapToEntity(currentConversation as unknown);
  }

  async getConversationById(id: string): Promise<Conversation> {
    const realm = getRealmInstance();
    const conversation = realm.objectForPrimaryKey('Conversation', id);
    if (!conversation) {
      throw new Error('Conversation not found');
    }
    return this.mapToEntity(conversation as unknown);
  }

  async getConversationHistory(): Promise<Conversation[]> {
    const realm = getRealmInstance();
    const conversations = realm.objects('Conversation').sorted('updatedAt', true);
    return Array.from(conversations).map(c => this.mapToEntity(c as unknown));
  }

  async getConversationsByUserId(userId: string): Promise<Conversation[]> {
    const realm = getRealmInstance();
    const conversations = realm.objects('Conversation').filtered('userId = $0', userId);
    return Array.from(conversations).map(c => this.mapToEntity(c as unknown));
  }

  async createConversation(conversation: Omit<Conversation, 'id'>): Promise<Conversation> {
    const realm = getRealmInstance();
    let createdConversation;

    realm.write(() => {
      createdConversation = realm.create('Conversation', {
        id: 'conv-' + Date.now(),
        userId: conversation.userId,
        title: conversation.title,
        messages: conversation.messages.map(message => ({
          id: 'msg-' + Date.now(),
          role: message.role,
          content: message.content,
          createdAt: new Date(),
        })),
        context: conversation.context,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    return this.mapToEntity(createdConversation as unknown);
  }

  async updateConversation(conversation: Conversation): Promise<void> {
    const realm = getRealmInstance();

    realm.write(() => {
      const conversationToUpdate = realm.objectForPrimaryKey('Conversation', conversation.id);
      if (!conversationToUpdate) {
        throw new Error('Conversation not found');
      }

      Object.assign(conversationToUpdate, {
        userId: conversation.userId,
        title: conversation.title,
        messages: conversation.messages.map(message => ({
          id: message.id || 'msg-' + Date.now(),
          role: message.role,
          content: message.content,
          createdAt: message.createdAt || new Date(),
        })),
        context: conversation.context,
        updatedAt: new Date(),
      });
    });
  }

  async deleteConversation(id: string): Promise<void> {
    const realm = getRealmInstance();

    realm.write(() => {
      const conversationToDelete = realm.objectForPrimaryKey('Conversation', id);
      if (!conversationToDelete) {
        throw new Error('Conversation not found');
      }
      realm.delete(conversationToDelete);
    });
  }

  async addMessage(conversationId: string, message: Omit<Message, 'id'>): Promise<void> {
    const realm = getRealmInstance();

    realm.write(() => {
      const conversation = realm.objectForPrimaryKey('Conversation', conversationId);
      if (!conversation) {
        throw new Error('Conversation not found');
      }
      const messages = (conversation as any).messages;
      if (Array.isArray(messages)) {
        messages.push({
          id: 'msg-' + Date.now(),
          role: message.role,
          content: message.content,
          createdAt: new Date(),
        });
      } else if (typeof messages === 'object' && typeof messages.push === 'function') {
        messages.push({
          id: 'msg-' + Date.now(),
          role: message.role,
          content: message.content,
          createdAt: new Date(),
        });
      } else {
        throw new Error('Conversation.messages is not an array or does not support push');
      }
      conversation.updatedAt = new Date();
    });
  }

  async saveMessage(conversationId: string, message: Message): Promise<void> {
    const realm = getRealmInstance();
    realm.write(() => {
      const conversation = realm.objectForPrimaryKey('Conversation', conversationId);
      if (!conversation) {
        throw new Error('Conversation not found');
      }
      const messages = (conversation as any).messages;
      if (Array.isArray(messages)) {
        messages.push({
          id: message.id || 'msg-' + Date.now(),
          role: message.role,
          content: message.content,
          createdAt: message.createdAt || new Date(),
        });
      } else if (typeof messages === 'object' && typeof messages.push === 'function') {
        messages.push({
          id: message.id || 'msg-' + Date.now(),
          role: message.role,
          content: message.content,
          createdAt: message.createdAt || new Date(),
        });
      } else {
        throw new Error('Conversation.messages is not an array or does not support push');
      }
      conversation.updatedAt = new Date();
    });
  }

  async updateConversationContext(
    conversationId: string,
    context: Conversation['context']
  ): Promise<void> {
    const realm = getRealmInstance();
    realm.write(() => {
      const conversation = realm.objectForPrimaryKey('Conversation', conversationId);
      if (!conversation) {
        throw new Error('Conversation not found');
      }
      conversation.context = context;
      conversation.updatedAt = new Date();
    });
  }

  private mapToEntity(model: unknown): Conversation {
    const realmObject = model as RealmConversation;
    return {
      id: realmObject.id,
      userId: realmObject.userId,
      title: realmObject.title,
      messages: Array.from(realmObject.messages).map((m: RealmMessage) => ({
        id: m.id,
        role: m.role as Message['role'],
        content: m.content,
        createdAt: new Date(m.createdAt),
      })),
      context: realmObject.context as Conversation['context'],
      createdAt: new Date(realmObject.createdAt),
      updatedAt: new Date(realmObject.updatedAt),
    };
  }
}
