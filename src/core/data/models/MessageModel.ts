import { Model } from '@nozbe/watermelondb';
import { field, date, json } from '@nozbe/watermelondb/decorators';

export default class MessageModel extends Model {
  static table = 'messages';

  @field('content') content!: string;
  @field('is_user') isUser!: boolean;
  @json('metadata', json => json || {}) metadata!: {
    mood?: number;
    cyclePhase?: string;
    context?: string;
  };
  @date('timestamp') timestamp!: Date;
}
