const Realm = require('realm');
const { realmConfig } = require('./tmp/realmModels.cjs');
const fs = require('fs');

// Chemins des exports JSON WatermelonDB
const DATA_PATH = './data-export/watermelon/';

const readJson = filename => {
  const filePath = `${DATA_PATH}${filename}`;
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
};

async function migrate() {
  const realm = await Realm.open(realmConfig);
  try {
    realm.write(() => {
      // Utilisatrices
      const users = readJson('users.json');
      users.forEach(u => realm.create('User', u, Realm.UpdateMode.Modified));
      // Cycles
      const cycles = readJson('cycles.json');
      cycles.forEach(c => realm.create('Cycle', c, Realm.UpdateMode.Modified));
      // DailyEntry
      const entries = readJson('dailyEntries.json');
      entries.forEach(e => realm.create('DailyEntry', e, Realm.UpdateMode.Modified));
      // Symptômes (optionnel)
      const symptoms = readJson('symptoms.json');
      if (symptoms.length)
        symptoms.forEach(s => realm.create('Symptom', s, Realm.UpdateMode.Modified));
      // WisdomItem (optionnel)
      const wisdom = readJson('wisdomItems.json');
      if (wisdom.length)
        wisdom.forEach(w => realm.create('WisdomItem', w, Realm.UpdateMode.Modified));
      // Conversations
      const conversations = readJson('conversations.json');
      conversations.forEach(c => realm.create('Conversation', c, Realm.UpdateMode.Modified));
      // Messages
      const messages = readJson('messages.json');
      messages.forEach(m => realm.create('Message', m, Realm.UpdateMode.Modified));
    });
    console.log('Migration terminée avec succès.');
  } catch (e) {
    console.error('Erreur migration :', e);
  } finally {
    realm.close();
  }
}

migrate();
