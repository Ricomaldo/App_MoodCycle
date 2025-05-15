import Realm, { ObjectSchema, PropertyTypeName } from 'realm';

export const UserSchema: ObjectSchema = {
  name: 'User',
  primaryKey: 'id',
  properties: {
    id: 'string',
    email: 'string',
    passwordHash: 'string',
    createdAt: 'date',
    lastLogin: 'date?',
    profile: 'mixed?',
    preferences: 'mixed?',
    engagement: 'mixed?',
    cycles: { type: 'list' as PropertyTypeName, objectType: 'Cycle' },
  },
};
