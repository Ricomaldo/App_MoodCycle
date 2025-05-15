import Realm from 'realm';

// Schéma User
export class User extends Realm.Object {
  static schema = {
    name: 'User',
    primaryKey: 'id',
    properties: {
      id: 'string',
      email: 'string',
      name: 'string?',
      createdAt: 'date',
      updatedAt: 'date',
      preferences: 'mixed?',
      cycles: { type: 'linkingObjects', objectType: 'Cycle', property: 'user' },
    },
  };
}

// Schéma Cycle
export class Cycle extends Realm.Object {
  static schema = {
    name: 'Cycle',
    primaryKey: 'id',
    properties: {
      id: 'string',
      startDate: 'date',
      endDate: 'date?',
      user: { type: 'linkingObjects', objectType: 'User', property: 'cycles' },
      dailyEntries: { type: 'linkingObjects', objectType: 'DailyEntry', property: 'cycle' },
      symptoms: { type: 'list', objectType: 'Symptom' },
      createdAt: 'date',
      updatedAt: 'date',
    },
  };
}

// Schéma DailyEntry
export class DailyEntry extends Realm.Object {
  static schema = {
    name: 'DailyEntry',
    primaryKey: 'id',
    properties: {
      id: 'string',
      date: 'date',
      mood: 'int?',
      notes: 'string?',
      cycle: { type: 'linkingObjects', objectType: 'Cycle', property: 'dailyEntries' },
      symptoms: { type: 'list', objectType: 'Symptom' },
      createdAt: 'date',
      updatedAt: 'date',
    },
  };
}

// Schéma Symptom
export class Symptom extends Realm.Object {
  static schema = {
    name: 'Symptom',
    primaryKey: 'id',
    properties: {
      id: 'string',
      name: 'string',
      intensity: 'int?',
      notes: 'string?',
      cycle: { type: 'linkingObjects', objectType: 'Cycle', property: 'symptoms' },
      dailyEntry: { type: 'linkingObjects', objectType: 'DailyEntry', property: 'symptoms' },
      createdAt: 'date',
      updatedAt: 'date',
    },
  };
}

// Schéma WisdomItem
export class WisdomItem extends Realm.Object {
  static schema = {
    name: 'WisdomItem',
    primaryKey: 'id',
    properties: {
      id: 'string',
      title: 'string',
      content: 'string',
      category: 'string?',
      tags: 'string[]',
      createdAt: 'date',
      updatedAt: 'date',
    },
  };
}

// Schéma Conversation
export class Conversation extends Realm.Object {
  static schema = {
    name: 'Conversation',
    primaryKey: 'id',
    properties: {
      id: 'string',
      messages: { type: 'list', objectType: 'Message' },
      createdAt: 'date',
      updatedAt: 'date',
    },
  };
}

// Schéma Message
export class Message extends Realm.Object {
  static schema = {
    name: 'Message',
    primaryKey: 'id',
    properties: {
      id: 'string',
      content: 'string',
      role: 'string',
      conversation: { type: 'linkingObjects', objectType: 'Conversation', property: 'messages' },
      createdAt: 'date',
    },
  };
}

// Configuration de la base de données Realm
export const realmConfig: Realm.Configuration = {
  schema: [User, Cycle, DailyEntry, Symptom, WisdomItem, Conversation, Message],
  schemaVersion: 1,
  deleteRealmIfMigrationNeeded: true, // À utiliser uniquement en développement
};
