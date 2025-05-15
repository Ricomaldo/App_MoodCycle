# Migration de WatermelonDB vers Realm

## Introduction

Ce document décrit le processus de migration de WatermelonDB vers Realm dans l'application MoodCycle. Cette migration a été effectuée pour améliorer les performances et simplifier la gestion des données locales.

## Changements principaux

### 1. Modèles de données

#### Avant (WatermelonDB)
```typescript
class UserModel extends Model {
  static table = 'users'
  
  @field('email') email!: string
  @field('password_hash') passwordHash!: string
  @field('created_at') createdAt!: Date
  @field('last_login') lastLogin?: Date
  @json('profile') profile?: UserProfile
  @json('preferences') preferences?: UserPreferences
  @json('engagement') engagement?: UserEngagement
  @children('cycles') cycles!: CycleModel[]
}
```

#### Après (Realm)
```typescript
export const UserSchema = {
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
    cycles: { type: 'list', objectType: 'Cycle' },
  },
};
```

### 2. Requêtes

#### Avant (WatermelonDB)
```typescript
const users = await database.collections
  .get('users')
  .query(Q.where('email', email))
  .fetch();
```

#### Après (Realm)
```typescript
const users = realm.objects('User').filtered('email = $0', email);
```

### 3. Relations

#### Avant (WatermelonDB)
```typescript
@children('cycles') cycles!: CycleModel[]
@relation('user', 'user_id') user!: UserModel
```

#### Après (Realm)
```typescript
cycles: { type: 'list', objectType: 'Cycle' }
user: { type: 'linkingObjects', objectType: 'User', property: 'cycles' }
```

## Avantages de Realm

1. **Performance** : Realm est optimisé pour les performances avec un moteur de base de données natif
2. **Simplicité** : API plus simple et plus intuitive
3. **Synchronisation** : Meilleure gestion de la synchronisation avec Realm Sync
4. **Type Safety** : Meilleure intégration avec TypeScript
5. **Maintenance** : Moins de code à maintenir

## Migration des données

Pour migrer les données existantes de WatermelonDB vers Realm :

1. Exporter les données de WatermelonDB
2. Transformer les données au format Realm
3. Importer les données dans Realm

Exemple de script de migration :

```typescript
async function migrateData() {
  // 1. Exporter les données de WatermelonDB
  const users = await database.collections.get('users').query().fetch();
  const cycles = await database.collections.get('cycles').query().fetch();
  const entries = await database.collections.get('daily_entries').query().fetch();

  // 2. Initialiser Realm
  const realm = await Realm.open(realmConfig);

  // 3. Importer les données dans Realm
  realm.write(() => {
    users.forEach(user => {
      realm.create('User', {
        id: user.id,
        email: user.email,
        passwordHash: user.passwordHash,
        profile: user.profile,
        preferences: user.preferences,
        engagement: user.engagement,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin,
      });
    });

    cycles.forEach(cycle => {
      realm.create('Cycle', {
        id: cycle.id,
        userId: cycle.userId,
        startDate: cycle.startDate,
        endDate: cycle.endDate,
        phase: cycle.phase,
        averageLength: cycle.averageLength,
        isCurrent: cycle.isCurrent,
        createdAt: cycle.createdAt,
        updatedAt: cycle.updatedAt,
      });
    });

    entries.forEach(entry => {
      realm.create('DailyEntry', {
        id: entry.id,
        cycle: realm.objectForPrimaryKey('Cycle', entry.cycleId),
        date: entry.date,
        mood: entry.mood,
        symptoms: entry.symptoms,
        notes: entry.notes,
        flow: entry.flow,
        temperature: entry.temperature,
        cervicalMucus: entry.cervicalMucus,
        intercourse: entry.intercourse,
        contraception: entry.contraception,
      });
    });
  });
}
```

## Tests

Les tests unitaires ont été mis à jour pour utiliser Realm. Les principaux changements incluent :

1. Initialisation de Realm avant chaque test
2. Nettoyage de la base de données entre les tests
3. Utilisation des méthodes Realm pour les assertions

Exemple de test :

```typescript
describe('UserRepository', () => {
  let repository: UserRepository;
  let realm: Realm;

  beforeAll(async () => {
    realm = await initRealm();
    repository = new UserRepository();
  });

  afterAll(() => {
    realm.close();
  });

  beforeEach(() => {
    realm.write(() => {
      realm.deleteAll();
    });
  });

  it('should create a new user', async () => {
    const userData = {
      email: 'test@example.com',
      passwordHash: 'hashedPassword',
      profile: { name: 'Test User' },
      preferences: { theme: 'light' },
      engagement: { lastActive: new Date() },
      createdAt: new Date(),
    };

    const user = await repository.createUser(userData);
    expect(user).toBeDefined();
    expect(user.email).toBe(userData.email);
  });
});
```

## Composants UI

Les composants UI qui utilisaient directement les modèles WatermelonDB ont été mis à jour pour utiliser les repositories. Les principaux changements incluent :

1. Utilisation des hooks de repository au lieu des collections WatermelonDB
2. Mise à jour des types pour correspondre aux schémas Realm
3. Adaptation des requêtes pour utiliser l'API Realm

## Conclusion

La migration vers Realm a permis d'améliorer les performances et la maintenabilité de l'application. Les développeurs doivent maintenant utiliser l'API Realm pour toutes les opérations de base de données.

## Références

- [Documentation Realm](https://docs.mongodb.com/realm/sdk/react-native/)
- [Guide de migration Realm](https://docs.mongodb.com/realm/sdk/react-native/migrate-from-sqlite/)
- [API Realm](https://docs.mongodb.com/realm-sdks/js/latest/) 