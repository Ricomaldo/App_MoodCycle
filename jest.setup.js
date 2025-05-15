// Configuration globale pour les tests
jest.setTimeout(10000); // Augmente le timeout pour les tests asynchrones

// Mock pour les modules natifs
jest.mock('react-native', () => ({
  Platform: {
    select: jest.fn(),
  },
}));

// Mock pour Realm
const mockData = {
  conversations: [],
  cycles: [],
  users: [],
};

const mockRealm = {
  objects: jest.fn(type => {
    if (type === 'Cycle') {
      const cycles = [...mockData.cycles];
      const result = Object.assign(cycles, {
        length: cycles.length,
        filtered: jest.fn(query => {
          let filteredCycles = [...cycles];
          if (query === 'endDate = null') {
            filteredCycles = filteredCycles.filter(c => !c.endDate);
          } else if (query === 'endDate != null') {
            filteredCycles = filteredCycles.filter(c => c.endDate);
          } else if (query.includes('startDate > $0')) {
            filteredCycles = filteredCycles;
          } else if (query.includes('startDate >= $0 AND endDate <= $1')) {
            filteredCycles = filteredCycles;
          }
          const sortedResult = Object.assign([...filteredCycles], {
            sorted: jest.fn((field, ascending) => {
              return [...filteredCycles].sort((a, b) => {
                const aValue = new Date(a[field]).getTime();
                const bValue = new Date(b[field]).getTime();
                return ascending ? aValue - bValue : bValue - aValue;
              });
            }),
          });
          return sortedResult;
        }),
        sorted: jest.fn((field, ascending) => {
          return [...cycles].sort((a, b) => {
            const aValue = new Date(a[field]).getTime();
            const bValue = new Date(b[field]).getTime();
            return ascending ? aValue - bValue : bValue - aValue;
          });
        }),
      });
      return result;
    } else if (type === 'Conversation') {
      const conversations = [...mockData.conversations];
      const result = Object.assign(conversations, {
        length: conversations.length,
        filtered: jest.fn(query => {
          let filteredConversations = [...conversations];
          if (query === 'updatedAt != null') {
            filteredConversations = filteredConversations.filter(c => c.updatedAt);
          }
          const sortedResult = Object.assign([...filteredConversations], {
            sorted: jest.fn((field, ascending) => {
              return [...filteredConversations].sort((a, b) => {
                const aValue = new Date(a[field]).getTime();
                const bValue = new Date(b[field]).getTime();
                return ascending ? aValue - bValue : bValue - aValue;
              });
            }),
          });
          return sortedResult;
        }),
        sorted: jest.fn((field, ascending) => {
          return [...conversations].sort((a, b) => {
            const aValue = new Date(a[field]).getTime();
            const bValue = new Date(b[field]).getTime();
            return ascending ? aValue - bValue : bValue - aValue;
          });
        }),
      });
      return result;
    } else if (type === 'User') {
      const users = [...mockData.users];
      const result = Object.assign(users, {
        length: users.length,
        filtered: jest.fn(query => {
          let filteredUsers = [...users];
          if (query.includes('email = $0')) {
            filteredUsers = filteredUsers.filter(u => u.email === query.split('=')[1].trim());
          }
          return filteredUsers;
        }),
      });
      return result;
    }
    return [];
  }),
  objectForPrimaryKey: jest.fn((type, id) => {
    if (type === 'Cycle') {
      return mockData.cycles.find(c => c.id === id);
    } else if (type === 'Conversation') {
      return mockData.conversations.find(c => c.id === id);
    } else if (type === 'User') {
      return mockData.users.find(u => u.id === id);
    }
    return null;
  }),
  write: jest.fn(callback => callback()),
  delete: jest.fn(obj => {
    if (obj.id) {
      const cycleIndex = mockData.cycles.findIndex(c => c.id === obj.id);
      if (cycleIndex !== -1) {
        mockData.cycles.splice(cycleIndex, 1);
      }
      const conversationIndex = mockData.conversations.findIndex(c => c.id === obj.id);
      if (conversationIndex !== -1) {
        mockData.conversations.splice(conversationIndex, 1);
      }
      const userIndex = mockData.users.findIndex(u => u.id === obj.id);
      if (userIndex !== -1) {
        mockData.users.splice(userIndex, 1);
      }
    }
  }),
  deleteAll: jest.fn(() => {
    mockData.cycles = [];
    mockData.conversations = [];
    mockData.users = [];
  }),
  close: jest.fn(),
  create: jest.fn((type, data) => {
    if (type === 'Cycle') {
      const cycle = {
        ...data,
        id: data.id || '1',
        entries: [],
      };
      mockData.cycles.push(cycle);
      return cycle;
    } else if (type === 'Conversation') {
      const conversation = {
        ...data,
        id: data.id || '1',
        messages: [],
      };
      mockData.conversations.push(conversation);
      return conversation;
    } else if (type === 'User') {
      const user = {
        ...data,
        id: data.id || '1',
      };
      mockData.users.push(user);
      return user;
    }
    return data;
  }),
};

const Realm = {
  open: jest.fn(async () => mockRealm),
  Object: {
    create: jest.fn(),
  },
  List: jest.fn(() => []),
  BSON: {
    ObjectId: jest.fn(() => ({
      toString: () => '1',
    })),
  },
};

// Mock Realm
jest.mock('realm', () => ({
  ...Realm,
  BSON: Realm.BSON,
}));

jest.mock('@realm/react', () => ({}));
