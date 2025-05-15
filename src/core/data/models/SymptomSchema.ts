// import Realm from 'realm';

export const SymptomSchema = {
  name: 'Symptom',
  primaryKey: 'id',
  properties: {
    id: 'string',
    type: 'string',
    intensity: 'int',
    notes: 'string?',
    createdAt: 'date',
    updatedAt: 'date',
  },
};
