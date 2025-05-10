import { database } from '../models';
import { User } from '../../types/user/User';
import UserModel from '../models/UserModel';
import { Q } from '@nozbe/watermelondb';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

export class UserRepository implements IUserRepository {
  async getUserById(id: string): Promise<User> {
    const users = await database.collections.get<UserModel>('users');
    const user = await users.find(id);
    return this.mapToEntity(user);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const users = await database.collections.get<UserModel>('users');
    const user = await users.query(
      Q.where('email', email)
    ).fetch();
    
    return user.length > 0 ? this.mapToEntity(user[0]) : null;
  }

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    let createdUser: UserModel;
    await database.write(async () => {
      createdUser = await database.collections.get<UserModel>('users').create(record => {
        record.email = user.email;
        record.passwordHash = user.passwordHash;
        record.profile = user.profile;
        record.preferences = user.preferences;
        record.engagement = user.engagement;
      });
    });
    return this.mapToEntity(createdUser!);
  }

  async updateUser(user: User): Promise<void> {
    await database.write(async () => {
      const users = await database.collections.get<UserModel>('users');
      const userToUpdate = await users.find(user.id);
      await userToUpdate.update(record => {
        record.email = user.email;
        record.passwordHash = user.passwordHash;
        record.profile = user.profile;
        record.preferences = user.preferences;
        record.engagement = user.engagement;
        record.lastLogin = user.lastLogin;
      });
    });
  }

  async deleteUser(id: string): Promise<void> {
    await database.write(async () => {
      const users = await database.collections.get<UserModel>('users');
      const userToDelete = await users.find(id);
      await userToDelete.destroyPermanently();
    });
  }

  private mapToEntity(model: UserModel): User {
    return {
      id: model.id,
      email: model.email,
      passwordHash: model.passwordHash,
      profile: model.profile,
      preferences: model.preferences,
      engagement: model.engagement,
      createdAt: model.createdAt,
      lastLogin: model.lastLogin
    };
  }
} 