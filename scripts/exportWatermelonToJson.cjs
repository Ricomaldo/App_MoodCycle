const fs = require('fs');
const path = require('path');
const { Database } = require('@nozbe/watermelondb');
const SQLiteAdapter = require('@nozbe/watermelondb/adapters/sqlite').default;
const schemaPath = path.resolve(__dirname, '../src/core/data/models/schema.cjs');
const { schema } = require(schemaPath);
const UserModel = require('./tmp-models/UserModel.cjs');
const CycleModel = require('./tmp-models/CycleModel.cjs');
const DailyEntryModel = require('./tmp-models/DailyEntryModel.cjs');
const SymptomModel = require('./tmp-models/SymptomModel.cjs');
const WisdomItemModel = require('./tmp-models/WisdomItemModel.cjs');
const ConversationModel = require('./tmp-models/ConversationModel.cjs');
const MessageModel = require('./tmp-models/MessageModel.cjs');

const adapter = new SQLiteAdapter({ schema });
const database = new Database({
  adapter,
  modelClasses: [
    UserModel,
    CycleModel,
    DailyEntryModel,
    SymptomModel,
    WisdomItemModel,
    ConversationModel,
    MessageModel,
  ],
});

const EXPORT_PATH = path.resolve(__dirname, '../data-export/watermelon/');
if (!fs.existsSync(EXPORT_PATH)) fs.mkdirSync(EXPORT_PATH, { recursive: true });

async function exportTable(collection, filename) {
  const all = await collection.query().fetch();
  fs.writeFileSync(
    path.join(EXPORT_PATH, filename),
    JSON.stringify(
      all.map(r => r._raw),
      null,
      2
    )
  );
  console.log(`Exporté: ${filename}`);
}

(async () => {
  await exportTable(database.collections.get('users'), 'users.json');
  await exportTable(database.collections.get('cycles'), 'cycles.json');
  await exportTable(database.collections.get('daily_entries'), 'dailyEntries.json');
  await exportTable(database.collections.get('symptoms'), 'symptoms.json');
  await exportTable(database.collections.get('wisdom_items'), 'wisdomItems.json');
  await exportTable(database.collections.get('conversations'), 'conversations.json');
  await exportTable(database.collections.get('messages'), 'messages.json');
  console.log('Export terminé.');
  process.exit(0);
})();
