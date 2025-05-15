const { appSchema, tableSchema } = require('@nozbe/watermelondb');

exports.schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'moods',
      columns: [
        { name: 'value', type: 'number' },
        { name: 'note', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'conversations',
      columns: [
        { name: 'context', type: 'string', isOptional: true },
        { name: 'start_date', type: 'number' },
        { name: 'last_message_date', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'messages',
      columns: [
        { name: 'conversation_id', type: 'string', isIndexed: true },
        { name: 'content', type: 'string' },
        { name: 'is_user', type: 'boolean' },
        { name: 'metadata', type: 'string', isOptional: true },
        { name: 'timestamp', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'cycles',
      columns: [
        { name: 'user_id', type: 'string', isIndexed: true },
        { name: 'start_date', type: 'number' },
        { name: 'end_date', type: 'number', isOptional: true },
        { name: 'phase', type: 'string' },
        { name: 'entries', type: 'string' },
        { name: 'average_length', type: 'number', isOptional: true },
        { name: 'is_current', type: 'boolean' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'users',
      columns: [
        { name: 'email', type: 'string', isIndexed: true },
        { name: 'password_hash', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'last_login', type: 'number', isOptional: true },
        { name: 'profile', type: 'string' },
        { name: 'preferences', type: 'string' },
        { name: 'engagement', type: 'string' },
      ],
    }),
    tableSchema({
      name: 'daily_entries',
      columns: [
        { name: 'cycle_id', type: 'string', isIndexed: true },
        { name: 'date', type: 'number' },
        { name: 'mood', type: 'string', isOptional: true },
        { name: 'symptoms', type: 'string', isOptional: true },
        { name: 'notes', type: 'string', isOptional: true },
        { name: 'flow', type: 'number', isOptional: true },
        { name: 'temperature', type: 'number', isOptional: true },
        { name: 'cervical_mucus', type: 'string', isOptional: true },
        { name: 'intercourse', type: 'boolean', isOptional: true },
        { name: 'contraception', type: 'boolean', isOptional: true },
      ],
    }),
    tableSchema({
      name: 'symptoms',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'intensity', type: 'number', isOptional: true },
        { name: 'notes', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'wisdom_items',
      columns: [
        { name: 'title', type: 'string' },
        { name: 'content', type: 'string' },
        { name: 'category', type: 'string', isOptional: true },
        { name: 'tags', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
  ],
});
