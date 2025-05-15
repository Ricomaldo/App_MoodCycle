export const DailyEntrySchema: Realm.ObjectSchema = {
  name: 'DailyEntry',
  primaryKey: 'id',
  properties: {
    id: 'string',
    cycle: { type: 'linkingObjects', objectType: 'Cycle', property: 'entries' },
    date: 'date',
    mood: 'int?',
    symptoms: { type: 'list', objectType: 'Symptom' },
    notes: 'string?',
    flow: 'string?',
    temperature: 'float?',
    cervicalMucus: 'string?',
    intercourse: 'bool?',
    contraception: 'string?',
  },
};
