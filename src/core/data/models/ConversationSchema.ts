export const ConversationSchema: Realm.ObjectSchema = {
  name: 'Conversation',
  primaryKey: 'id',
  properties: {
    id: 'string',
    messages: { type: 'list', objectType: 'Message' },
    createdAt: 'date',
    updatedAt: 'date',
  },
};
