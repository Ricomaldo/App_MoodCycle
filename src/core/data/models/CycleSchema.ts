export const CycleSchema: Realm.ObjectSchema = {
  name: 'Cycle',
  primaryKey: 'id',
  properties: {
    id: 'string',
    userId: 'string',
    startDate: 'date',
    endDate: 'date?',
    phase: 'string',
    averageLength: 'int?',
    isCurrent: 'bool',
    createdAt: 'date',
    updatedAt: 'date',
    entries: { type: 'list', objectType: 'DailyEntry' },
  },
};
