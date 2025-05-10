import { User, LoginCredentials, RegisterCredentials, UserPreferences } from '@core/domain/auth/authTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_STORAGE_KEY = 'moodcycle_auth';
const AUTH_TOKEN_KEY = 'moodcycle_token';

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export const authRepository = {
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    try {
      // TODO: Implémenter l'appel API réel
      const mockUser: User = {
        id: '1',
        email: credentials.email,
        name: credentials.email.split('@')[0],
        createdAt: new Date(),
        lastLogin: new Date(),
        preferences: {
          theme: 'system',
          notifications: true,
          language: 'fr',
        },
      };
      
      const mockToken = 'mock-jwt-token';
      
      await Promise.all([
        AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(mockUser)),
        AsyncStorage.setItem(AUTH_TOKEN_KEY, mockToken),
      ]);
      
      return { user: mockUser, token: mockToken };
    } catch (error) {
      throw new AuthError('Échec de la connexion');
    }
  },
  
  async register(credentials: RegisterCredentials): Promise<{ user: User; token: string }> {
    try {
      // TODO: Implémenter l'appel API réel
      const newUser: User = {
        id: Date.now().toString(),
        email: credentials.email,
        name: credentials.name,
        createdAt: new Date(),
        lastLogin: new Date(),
        preferences: {
          theme: 'system',
          notifications: true,
          language: 'fr',
        },
      };
      
      const mockToken = 'mock-jwt-token';
      
      await Promise.all([
        AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser)),
        AsyncStorage.setItem(AUTH_TOKEN_KEY, mockToken),
      ]);
      
      return { user: newUser, token: mockToken };
    } catch (error) {
      throw new AuthError('Échec de l\'inscription');
    }
  },
  
  async logout(): Promise<void> {
    try {
      await Promise.all([
        AsyncStorage.removeItem(AUTH_STORAGE_KEY),
        AsyncStorage.removeItem(AUTH_TOKEN_KEY),
      ]);
    } catch (error) {
      throw new AuthError('Échec de la déconnexion');
    }
  },
  
  async getCurrentUser(): Promise<{ user: User | null; token: string | null }> {
    try {
      const [userJson, token] = await Promise.all([
        AsyncStorage.getItem(AUTH_STORAGE_KEY),
        AsyncStorage.getItem(AUTH_TOKEN_KEY),
      ]);
      
      return {
        user: userJson ? JSON.parse(userJson) : null,
        token,
      };
    } catch (error) {
      throw new AuthError('Erreur lors de la récupération de l\'utilisateur');
    }
  },
  
  async updateUserPreferences(userId: string, preferences: Partial<UserPreferences>): Promise<User> {
    try {
      const { user } = await this.getCurrentUser();
      if (!user) throw new AuthError('Utilisateur non connecté');
      
      const updatedUser: User = {
        ...user,
        preferences: {
          ...user.preferences,
          ...preferences,
        } as UserPreferences,
      };
      
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedUser));
      return updatedUser;
    } catch (error) {
      throw new AuthError('Échec de la mise à jour des préférences');
    }
  },
}; 