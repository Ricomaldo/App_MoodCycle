import Realm, { ObjectSchema, PropertyTypeName } from 'realm';

export const MessageSchema: ObjectSchema = {
  name: 'Message',
  primaryKey: 'id',
  properties: {
    id: 'string',
    content: 'string',
    isUser: 'bool',
    metadata: 'mixed?',
    timestamp: 'date',
    conversation: {
      type: 'linkingObjects' as PropertyTypeName,
      objectType: 'Conversation',
      property: 'messages',
    },
  },
};
