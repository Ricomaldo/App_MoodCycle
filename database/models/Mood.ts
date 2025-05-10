import { Model } from '@nozbe/watermelondb';
import { field, date } from '@nozbe/watermelondb/decorators';

export default class Mood extends Model {
  static table = 'moods';

  @field('value') value!: number;
  @field('note') note?: string;
  @date('created_at') createdAt!: Date;
  @date('updated_at') updatedAt!: Date;
} 