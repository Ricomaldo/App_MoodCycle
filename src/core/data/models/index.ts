import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { schema } from './schema';
import CycleModel from './CycleModel';
import ConversationModel from './ConversationModel';
import MessageModel from './MessageModel';
import UserModel from './UserModel';
import DailyEntryModel from './DailyEntryModel';

const adapter = new SQLiteAdapter({
  schema,
  dbName: 'moodcycle',
});

export const database = new Database({
  adapter,
  modelClasses: [CycleModel, ConversationModel, MessageModel, UserModel, DailyEntryModel],
});
