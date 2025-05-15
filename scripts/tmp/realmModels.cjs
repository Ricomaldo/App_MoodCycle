const User = {
  name: 'User',
  primaryKey: 'id',
  properties: {
    id: 'string',
    email: 'string',
    name: 'string?',
    createdAt: 'date',
    updatedAt: 'date',
    preferences: 'mixed?',
  },
};

const Cycle = {
  name: 'Cycle',
  primaryKey: 'id',
  properties: {
    id: 'string',
    startDate: 'date',
    endDate: 'date?',
    user: 'string?',
    createdAt: 'date',
    updatedAt: 'date',
  },
};

const DailyEntry = {
  name: 'DailyEntry',
  primaryKey: 'id',
  properties: {
    id: 'string',
    date: 'date',
    mood: 'int?',
    notes: 'string?',
    cycle: 'string?',
    createdAt: 'date',
    updatedAt: 'date',
  },
};

const Symptom = {
  name: 'Symptom',
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    intensity: 'int?',
    notes: 'string?',
    createdAt: 'date',
    updatedAt: 'date',
  },
};

const WisdomItem = {
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

const Conversation = {
  name: 'Conversation',
  primaryKey: 'id',
  properties: {
    id: 'string',
    createdAt: 'date',
    updatedAt: 'date',
  },
};

const Message = {
  name: 'Message',
  primaryKey: 'id',
  properties: {
    id: 'string',
    content: 'string',
    role: 'string',
    createdAt: 'date',
  },
};

const realmConfig = {
  schema: [User, Cycle, DailyEntry, Symptom, WisdomItem, Conversation, Message],
  schemaVersion: 1,
  deleteRealmIfMigrationNeeded: true,
};

module.exports = { realmConfig };
