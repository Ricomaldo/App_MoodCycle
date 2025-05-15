declare namespace Realm {
  export interface Collection<T> extends Array<T> {
    filtered(query: string, ...args: any[]): Collection<T>;
    sorted(property: string, ascending?: boolean): Collection<T>;
    map<U>(callbackfn: (value: T, index: number, array: T[]) => U): U[];
  }

  export interface Object {
    id: string;
  }

  export interface Results<T> extends Collection<T> {}
}

declare module 'realm' {
  export class Realm {
    static BSON: {
      ObjectId: {
        new (): { toString(): string };
      };
    };
  }
}
