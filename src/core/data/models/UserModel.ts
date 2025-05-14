import { Model } from '@nozbe/watermelondb';
import { field, date, json, children } from '@nozbe/watermelondb/decorators';
import type { UserProfile, UserPreferences, UserEngagement } from '../../types/user/User';
import CycleModel from './CycleModel';

export default class UserModel extends Model {
  static table = 'users';

  @field('email') email!: string;
  @field('password_hash') passwordHash!: string;
  @date('created_at') createdAt!: Date;
  @date('last_login') lastLogin?: Date;
  @json('profile', json => json || {}) profile!: UserProfile;
  @json('preferences', json => json || {}) preferences!: UserPreferences;
  @json('engagement', json => json || {}) engagement!: UserEngagement;

  @children('cycles') cycles!: CycleModel[];
}
