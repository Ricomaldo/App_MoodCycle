import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { schema } from './models/schema';

// Import des modèles
import UserModel from './models/UserModel';
import CycleModel from './models/CycleModel';
import DailyEntryModel from './models/DailyEntryModel';
import ConversationModel from './models/ConversationModel';
import MessageModel from './models/MessageModel';
import Mood from './models/Mood';

const adapter = new SQLiteAdapter({
  schema,
  // Vous pouvez ajouter d'autres options ici
});

export const database = new Database({
  adapter,
  modelClasses: [UserModel, CycleModel, DailyEntryModel, ConversationModel, MessageModel, Mood],
});
