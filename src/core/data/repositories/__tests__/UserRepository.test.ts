import { UserRepository } from '../UserRepository';
import { User, UserEngagement } from '../../../types/user/User';
import {
  mockRealmInstance,
  mockRealmCollection,
  setupRealmMocks,
  createMockEntity,
  createMockCollection,
} from './realmTestConfig';

describe('UserRepository', () => {
  let repository: UserRepository;
  let mockUser: User;

  beforeEach(() => {
    setupRealmMocks();
    repository = new UserRepository();
    mockUser = createMockEntity<User>({
      email: 'test@example.com',
      passwordHash: 'hashedPassword',
      profile: {
        name: 'Test User',
        birthDate: new Date('1990-01-01'),
      },
      preferences: {
        notifications: true,
        theme: 'light',
        language: 'fr',
        privacySettings: {
          shareData: false,
          sharePredictions: true,
        },
      },
      engagement: {
        lastActive: new Date(),
        totalSessions: 0,
        streakDays: 0,
        completedCycles: 0,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUserById', () => {
    it('should return a user when found', async () => {
      mockRealmInstance.objectForPrimaryKey.mockReturnValue(mockUser);
      const result = await repository.getUserById('test-id');
      expect(result).toEqual(mockUser);
      expect(mockRealmInstance.objectForPrimaryKey).toHaveBeenCalledWith('User', 'test-id');
    });

    it('should throw an error when user not found', async () => {
      mockRealmInstance.objectForPrimaryKey.mockReturnValue(null);
      await expect(repository.getUserById('test-id')).rejects.toThrow('User not found');
    });
  });

  describe('getUserByEmail', () => {
    it('should return a user when found', async () => {
      const mockCollection = createMockCollection([mockUser]);
      mockRealmInstance.objects.mockReturnValue(mockCollection);
      const result = await repository.getUserByEmail('test@example.com');
      expect(result).toEqual(mockUser);
      expect(mockRealmCollection.filtered).toHaveBeenCalledWith('email = $0', 'test@example.com');
    });

    it('should return null when user not found', async () => {
      const mockCollection = createMockCollection([]);
      mockRealmInstance.objects.mockReturnValue(mockCollection);
      const result = await repository.getUserByEmail('test@example.com');
      expect(result).toBeNull();
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const userData: Omit<User, 'id'> = {
        email: 'new@example.com',
        passwordHash: 'hashedPassword',
        profile: mockUser.profile,
        preferences: mockUser.preferences,
        engagement: {
          lastActive: new Date(),
          totalSessions: 0,
          streakDays: 0,
          completedCycles: 0,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockRealmInstance.create.mockReturnValue({
        ...userData,
        id: expect.any(String),
      });

      const result = await repository.createUser(userData);

      expect(result).toMatchObject({
        ...userData,
        id: expect.any(String),
      });
      expect(mockRealmInstance.write).toHaveBeenCalled();
      expect(mockRealmInstance.create).toHaveBeenCalledWith('User', expect.any(Object));
    });
  });

  describe('updateUser', () => {
    it('should update an existing user', async () => {
      const updatedUser = { ...mockUser, email: 'updated@example.com' };
      mockRealmInstance.objectForPrimaryKey.mockReturnValue(mockUser);

      await repository.updateUser(updatedUser);

      expect(mockRealmInstance.write).toHaveBeenCalled();
      expect(mockRealmInstance.objectForPrimaryKey).toHaveBeenCalledWith('User', mockUser.id);
    });

    it('should throw an error when user not found', async () => {
      mockRealmInstance.objectForPrimaryKey.mockReturnValue(null);
      await expect(repository.updateUser(mockUser)).rejects.toThrow('User not found');
    });
  });

  describe('deleteUser', () => {
    it('should delete an existing user', async () => {
      mockRealmInstance.objectForPrimaryKey.mockReturnValue(mockUser);
      await repository.deleteUser('test-id');
      expect(mockRealmInstance.write).toHaveBeenCalled();
      expect(mockRealmInstance.delete).toHaveBeenCalledWith(mockUser);
    });

    it('should throw an error when user not found', async () => {
      mockRealmInstance.objectForPrimaryKey.mockReturnValue(null);
      await expect(repository.deleteUser('test-id')).rejects.toThrow('User not found');
    });
  });

  describe('updateLastLogin', () => {
    it('should update last login date', async () => {
      mockRealmInstance.objectForPrimaryKey.mockReturnValue(mockUser);
      await repository.updateLastLogin('test-id');
      expect(mockRealmInstance.write).toHaveBeenCalled();
      expect(mockUser.lastLogin).toBeDefined();
      expect(mockUser.updatedAt).toBeDefined();
    });

    it('should throw an error when user not found', async () => {
      mockRealmInstance.objectForPrimaryKey.mockReturnValue(null);
      await expect(repository.updateLastLogin('test-id')).rejects.toThrow('User not found');
    });
  });
});
