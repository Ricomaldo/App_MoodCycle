import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import schema from './schema';
import Mood from './models/Mood';

const adapter = new SQLiteAdapter({
  schema,
  // Optionally, you can add a database name here
  // dbName: 'moodcycle',
});

export const database = new Database({
  adapter,
  modelClasses: [Mood],
}); 