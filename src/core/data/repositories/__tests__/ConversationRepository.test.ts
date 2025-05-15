import { ConversationRepository } from '../ConversationRepository';
import { Conversation, Message } from '../../../domain/entities/Conversation';
import {
  mockRealmInstance,
  mockRealmCollection,
  setupRealmMocks,
  createMockEntity,
  createMockCollection,
} from './realmTestConfig';

describe('ConversationRepository', () => {
  let repository: ConversationRepository;
  let mockConversation: Conversation;

  beforeEach(() => {
    setupRealmMocks();
    repository = new ConversationRepository();
    mockConversation = createMockEntity<Conversation>({
      userId: 'user-1',
      title: 'Test Conversation',
      messages: [
        {
          id: 'msg-1',
          role: 'user',
          content: 'Hello',
          createdAt: new Date(),
        },
      ],
      context: {
        cycleId: 'cycle-1',
        phase: 'menstruation',
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCurrentConversation', () => {
    it('should return current conversation', async () => {
      const mockCollection = createMockCollection([mockConversation]);
      mockRealmInstance.objects.mockReturnValue(mockCollection);
      const result = await repository.getCurrentConversation();
      expect(result).toEqual(mockConversation);
    });

    it('should throw error if no current conversation', async () => {
      const mockCollection = createMockCollection([]);
      mockRealmInstance.objects.mockReturnValue(mockCollection);
      await expect(repository.getCurrentConversation()).rejects.toThrow(
        'Aucune conversation active'
      );
    });
  });

  describe('getConversationById', () => {
    it('should return conversation by id', async () => {
      mockRealmInstance.objectForPrimaryKey.mockReturnValue(mockConversation);
      const result = await repository.getConversationById('test-id');
      expect(result).toEqual(mockConversation);
    });

    it('should throw error if conversation not found', async () => {
      mockRealmInstance.objectForPrimaryKey.mockReturnValue(null);
      await expect(repository.getConversationById('test-id')).rejects.toThrow(
        'Conversation not found'
      );
    });
  });

  describe('createConversation', () => {
    it('should create a new conversation', async () => {
      const conversationData: Omit<Conversation, 'id'> = {
        userId: 'user-1',
        title: 'New Conversation',
        messages: [
          {
            role: 'user',
            content: 'Hello',
            createdAt: new Date(),
          },
        ],
        context: {
          cycleId: 'cycle-1',
          phase: 'menstruation',
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockRealmInstance.create.mockReturnValue({
        ...conversationData,
        id: expect.any(String),
      });

      const result = await repository.createConversation(conversationData);

      expect(result).toMatchObject({
        ...conversationData,
        id: expect.any(String),
      });
      expect(mockRealmInstance.write).toHaveBeenCalled();
      expect(mockRealmInstance.create).toHaveBeenCalledWith('Conversation', expect.any(Object));
    });
  });

  describe('updateConversation', () => {
    it('should update conversation', async () => {
      const updatedConversation = { ...mockConversation, title: 'Updated Title' };
      mockRealmInstance.objectForPrimaryKey.mockReturnValue(mockConversation);

      await repository.updateConversation(updatedConversation);

      expect(mockRealmInstance.write).toHaveBeenCalled();
      expect(mockRealmInstance.objectForPrimaryKey).toHaveBeenCalledWith(
        'Conversation',
        mockConversation.id
      );
    });

    it('should throw error if conversation not found', async () => {
      mockRealmInstance.objectForPrimaryKey.mockReturnValue(null);
      await expect(repository.updateConversation(mockConversation)).rejects.toThrow(
        'Conversation not found'
      );
    });
  });

  describe('deleteConversation', () => {
    it('should delete conversation', async () => {
      mockRealmInstance.objectForPrimaryKey.mockReturnValue(mockConversation);
      await repository.deleteConversation('test-id');
      expect(mockRealmInstance.write).toHaveBeenCalled();
      expect(mockRealmInstance.delete).toHaveBeenCalledWith(mockConversation);
    });

    it('should throw error if conversation not found', async () => {
      mockRealmInstance.objectForPrimaryKey.mockReturnValue(null);
      await expect(repository.deleteConversation('test-id')).rejects.toThrow(
        'Conversation not found'
      );
    });
  });

  describe('addMessage', () => {
    it('should add message to conversation', async () => {
      mockRealmInstance.objectForPrimaryKey.mockReturnValue(mockConversation);
      const message: Omit<Message, 'id'> = {
        role: 'user',
        content: 'New message',
        createdAt: new Date(),
      };

      await repository.addMessage('test-id', message);

      expect(mockRealmInstance.write).toHaveBeenCalled();
      expect(mockConversation.messages.push).toHaveBeenCalled();
    });

    it('should throw error if conversation not found', async () => {
      mockRealmInstance.objectForPrimaryKey.mockReturnValue(null);
      const message: Omit<Message, 'id'> = {
        role: 'user',
        content: 'New message',
        createdAt: new Date(),
      };

      await expect(repository.addMessage('test-id', message)).rejects.toThrow(
        'Conversation not found'
      );
    });
  });
});
