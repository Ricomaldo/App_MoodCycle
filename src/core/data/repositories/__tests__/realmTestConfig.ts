import Realm from 'realm';

export const mockRealmInstance = {
  objects: jest.fn().mockReturnValue([]),
  objectForPrimaryKey: jest.fn().mockReturnValue(null),
  write: jest.fn(callback => callback()),
  create: jest.fn().mockImplementation((schema, data) => ({
    ...data,
    id: data.id || `mock-${schema}-${Date.now()}`,
  })),
  delete: jest.fn(),
  deleteAll: jest.fn(),
};

export const mockRealmCollection = {
  filtered: jest.fn().mockReturnThis(),
  sorted: jest.fn().mockReturnThis(),
  map: jest.fn().mockImplementation(callback => []),
  push: jest.fn(),
  length: 0,
};

export const setupRealmMocks = () => {
  jest.mock('../../models', () => ({
    getRealmInstance: jest.fn().mockReturnValue(mockRealmInstance),
  }));

  mockRealmInstance.objects.mockReset().mockReturnValue(mockRealmCollection);
  mockRealmInstance.objectForPrimaryKey.mockReset().mockReturnValue(null);
  mockRealmInstance.write.mockReset().mockImplementation(callback => callback());
  mockRealmInstance.create.mockReset().mockImplementation((schema, data) => ({
    ...data,
    id: data.id || `mock-${schema}-${Date.now()}`,
  }));
  mockRealmInstance.delete.mockReset();
  mockRealmInstance.deleteAll.mockReset();

  mockRealmCollection.filtered.mockReset().mockReturnThis();
  mockRealmCollection.sorted.mockReset().mockReturnThis();
  mockRealmCollection.map.mockReset().mockImplementation(callback => []);
  mockRealmCollection.push.mockReset();
};

export const createMockEntity = <T>(data: Partial<T>): T => {
  return {
    id: `mock-${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...data,
  } as T;
};

export const createMockCollection = <T>(items: T[]): any => {
  return {
    ...mockRealmCollection,
    length: items.length,
    map: jest.fn().mockImplementation(callback => items.map(callback)),
    filtered: jest.fn().mockReturnThis(),
    sorted: jest.fn().mockReturnThis(),
  };
};
