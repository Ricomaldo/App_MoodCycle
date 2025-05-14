import { Model } from '@nozbe/watermelondb';
import { field, date, children } from '@nozbe/watermelondb/decorators';
import MessageModel from './MessageModel';

export default class ConversationModel extends Model {
  static table = 'conversations';

  @field('context') context?: string;
  @date('start_date') startDate!: Date;
  @date('last_message_date') lastMessageDate!: Date;
  @children('messages') messages!: MessageModel[];
}
