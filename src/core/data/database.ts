import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { schema } from './models/schema';

const adapter = new SQLiteAdapter({
  schema,
  // Vous pouvez ajouter d'autres options ici
});

export const database = new Database({
  adapter,
  modelClasses: [
    // Ajoutez vos modèles ici
  ],
}); 