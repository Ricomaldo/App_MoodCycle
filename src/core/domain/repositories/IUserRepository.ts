import { User } from '../../types/user/User';

export interface IUserRepository {
  getUserById(id: string): Promise<User>;
  getUserByEmail(email: string): Promise<User | null>;
  createUser(user: Omit<User, 'id'>): Promise<User>;
  updateUser(user: User): Promise<void>;
  deleteUser(id: string): Promise<void>;
} 