export const createMockRealmObject = <T>(data: Partial<T>): T => {
  return {
    ...data,
    // Méthodes et propriétés communes aux objets Realm
  } as T;
};
