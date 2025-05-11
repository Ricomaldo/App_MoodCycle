import { Model } from '@nozbe/watermelondb';
import { field, date, children, relation } from '@nozbe/watermelondb/decorators';
import { Database, Q, Query } from '@nozbe/watermelondb';
import { ConversationRepository } from '../../domain/repositories/ConversationRepository';
import { Conversation, ConversationInput } from '../../domain/entities/conversation/Conversation';
import { Message, MessageInput } from '../../domain/entities/conversation/Message';

class ConversationModel extends Model {
  static table = 'conversations';

  @field('start_date') startDate!: number;
  @field('last_message_date') lastMessageDate!: number;
  @field('context') context!: string;
  @children('messages') messages!: Query<MessageModel>;
}

class MessageModel extends Model {
  static table = 'messages';

  @field('conversation_id') conversationId!: string;
  @field('content') content!: string;
  @field('is_user') isUser!: boolean;
  @field('metadata') metadata!: string;
  @field('timestamp') timestamp!: number;
  @relation('conversations', 'conversation_id') conversation!: ConversationModel;
}

export class WatermelonConversationRepository implements ConversationRepository {
  constructor(private database: Database) {}

  private parseContext(context: string): Conversation['context'] {
    try {
      return JSON.parse(context);
    } catch {
      return undefined;
    }
  }

  private stringifyContext(context: Conversation['context']): string {
    return JSON.stringify(context || {});
  }

  private parseMetadata(metadata: string): Message['metadata'] {
    try {
      return JSON.parse(metadata);
    } catch {
      return undefined;
    }
  }

  private stringifyMetadata(metadata: Message['metadata']): string {
    return JSON.stringify(metadata || {});
  }

  async createConversation(input: ConversationInput): Promise<Conversation> {
    const now = Date.now();
    const conversation = await this.database.write(async () => {
      return await this.database.collections
        .get<ConversationModel>('conversations')
        .create((conversation: ConversationModel) => {
          conversation.startDate = now;
          conversation.lastMessageDate = now;
          conversation.context = this.stringifyContext(input.context);
        });
    });

    return {
      id: conversation.id,
      startDate: conversation.startDate,
      lastMessageDate: conversation.lastMessageDate,
      context: this.parseContext(conversation.context),
      messages: [],
    };
  }

  async getConversation(id: string): Promise<Conversation | null> {
    const conversation = await this.database.collections
      .get<ConversationModel>('conversations')
      .find(id);

    if (!conversation) return null;

    const messages = await conversation.messages.fetch();
    return {
      id: conversation.id,
      startDate: conversation.startDate,
      lastMessageDate: conversation.lastMessageDate,
      context: this.parseContext(conversation.context),
      messages: messages.map((msg: MessageModel) => ({
        id: msg.id,
        content: msg.content,
        isUser: msg.isUser,
        timestamp: msg.timestamp,
        metadata: this.parseMetadata(msg.metadata),
      })),
    };
  }

  async getCurrentConversation(): Promise<Conversation | null> {
    const conversations = await this.database.collections
      .get<ConversationModel>('conversations')
      .query(Q.sortBy('last_message_date', Q.desc))
      .fetch();

    return conversations.length > 0 ? this.getConversation(conversations[0].id) : null;
  }

  async updateConversationContext(
    id: string,
    context: Conversation['context']
  ): Promise<void> {
    await this.database.write(async () => {
      const conversation = await this.database.collections
        .get<ConversationModel>('conversations')
        .find(id);
      await conversation.update((conv: ConversationModel) => {
        conv.context = this.stringifyContext(context);
      });
    });
  }

  async addMessage(
    conversationId: string,
    message: MessageInput
  ): Promise<Message> {
    const now = Date.now();
    const newMessage = await this.database.write(async () => {
      const conversation = await this.database.collections
        .get<ConversationModel>('conversations')
        .find(conversationId);

      const msg = await this.database.collections
        .get<MessageModel>('messages')
        .create((msg: MessageModel) => {
          msg.conversationId = conversationId;
          msg.content = message.content;
          msg.isUser = message.isUser;
          msg.metadata = this.stringifyMetadata(message.metadata);
          msg.timestamp = now;
        });

      await conversation.update((conv: ConversationModel) => {
        conv.lastMessageDate = now;
      });

      return msg;
    });

    return {
      id: newMessage.id,
      content: newMessage.content,
      isUser: newMessage.isUser,
      timestamp: newMessage.timestamp,
      metadata: this.parseMetadata(newMessage.metadata),
    };
  }

  async getMessages(conversationId: string): Promise<Message[]> {
    const messages = await this.database.collections
      .get<MessageModel>('messages')
      .query(Q.where('conversation_id', conversationId))
      .fetch();

    return messages.map((msg: MessageModel) => ({
      id: msg.id,
      content: msg.content,
      isUser: msg.isUser,
      timestamp: msg.timestamp,
      metadata: this.parseMetadata(msg.metadata),
    }));
  }

  async getLastMessage(conversationId: string): Promise<Message | null> {
    const messages = await this.database.collections
      .get<MessageModel>('messages')
      .query(
        Q.where('conversation_id', conversationId),
        Q.sortBy('timestamp', Q.desc),
        Q.take(1)
      )
      .fetch();

    if (messages.length === 0) return null;

    const msg = messages[0];
    return {
      id: msg.id,
      content: msg.content,
      isUser: msg.isUser,
      timestamp: msg.timestamp,
      metadata: this.parseMetadata(msg.metadata),
    };
  }

  async clearConversation(id: string): Promise<void> {
    await this.database.write(async () => {
      const conversation = await this.database.collections
        .get<ConversationModel>('conversations')
        .find(id);
      const messages = await conversation.messages.fetch();
      await Promise.all(messages.map((msg: MessageModel) => msg.destroyPermanently()));
    });
  }

  async deleteConversation(id: string): Promise<void> {
    await this.database.write(async () => {
      const conversation = await this.database.collections
        .get<ConversationModel>('conversations')
        .find(id);
      await conversation.destroyPermanently();
    });
  }
} 