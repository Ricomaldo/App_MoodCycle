import { getRealmInstance } from '../models';
import { User } from '../../types/user/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
// import { UserProfile } from '../../types/user/UserProfile';
// import { UserPreferences } from '../../types/user/UserPreferences';
// import { UserEngagement } from '../../types/user/UserEngagement';
// import Realm from 'realm';

interface RealmUser {
  id: string;
  email: string;
  passwordHash: string;
  profile?: unknown;
  preferences?: unknown;
  engagement?: unknown;
  createdAt: Date | string;
  updatedAt: Date | string;
  lastLogin?: Date | string;
}

export class UserRepository implements IUserRepository {
  async getUserById(id: string): Promise<User> {
    const realm = getRealmInstance();
    const user = realm.objectForPrimaryKey('User', id);
    if (!user) {
      throw new Error('User not found');
    }
    return this.mapToEntity(user);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const realm = getRealmInstance();
    const users = realm.objects('User').filtered('email = $0', email);
    return users.length > 0 ? this.mapToEntity(users[0]) : null;
  }

  async getUsersByEngagement(engagement: number): Promise<User[]> {
    const realm = getRealmInstance();
    const users = realm.objects('User').filtered('engagement >= $0', engagement);
    return users.map(this.mapToEntity);
  }

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    const realm = getRealmInstance();
    let createdUser;

    realm.write(() => {
      createdUser = realm.create('User', {
        id: 'user-' + Date.now(),
        email: user.email,
        passwordHash: user.passwordHash,
        profile: user.profile,
        preferences: user.preferences,
        engagement: user.engagement,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastLogin: undefined,
      });
    });

    return this.mapToEntity(createdUser);
  }

  async updateUser(user: User): Promise<void> {
    const realm = getRealmInstance();

    realm.write(() => {
      const userToUpdate = realm.objectForPrimaryKey('User', user.id);
      if (!userToUpdate) {
        throw new Error('User not found');
      }

      Object.assign(userToUpdate, {
        email: user.email,
        passwordHash: user.passwordHash,
        profile: user.profile,
        preferences: user.preferences,
        engagement: user.engagement,
        lastLogin: user.lastLogin,
        updatedAt: new Date(),
      });
    });
  }

  async deleteUser(id: string): Promise<void> {
    const realm = getRealmInstance();

    realm.write(() => {
      const userToDelete = realm.objectForPrimaryKey('User', id);
      if (!userToDelete) {
        throw new Error('User not found');
      }
      realm.delete(userToDelete);
    });
  }

  async updateLastLogin(id: string): Promise<void> {
    const realm = getRealmInstance();

    realm.write(() => {
      const user = realm.objectForPrimaryKey('User', id);
      if (!user) {
        throw new Error('User not found');
      }

      user.lastLogin = new Date();
      user.updatedAt = new Date();
    });
  }

  private mapToEntity(model: unknown): User {
    const realmObject = model as RealmUser;
    return {
      id: realmObject.id,
      email: realmObject.email,
      passwordHash: realmObject.passwordHash,
      profile: realmObject.profile as User['profile'],
      preferences: realmObject.preferences as User['preferences'],
      engagement: realmObject.engagement as User['engagement'],
      createdAt: new Date(realmObject.createdAt),
      updatedAt: new Date(realmObject.updatedAt),
      lastLogin: realmObject.lastLogin ? new Date(realmObject.lastLogin) : undefined,
    };
  }
}
