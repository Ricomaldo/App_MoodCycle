# Migration Realm - Guide de bonnes pratiques

## Structure des repositories

### 1. Standardisation des méthodes CRUD

Tous les repositories doivent implémenter les méthodes suivantes de manière cohérente :

```typescript
// Lecture
getById(id: string): Promise<T>
getByFilter(filter: string, ...args: any[]): Promise<T[]>

// Création
create(data: Omit<T, 'id'>): Promise<T>

// Mise à jour
update(data: T): Promise<void>

// Suppression
delete(id: string): Promise<void>
```

### 2. Gestion des dates

Toutes les entités doivent inclure :

- `createdAt: Date`
- `updatedAt: Date`

Les dates doivent être :

- Initialisées avec `new Date()`
- Converties avec `new Date(date)` lors du mapping
- Mises à jour à chaque modification

### 3. Gestion des IDs

Format standard pour les IDs :

```typescript
id: 'type-' + Date.now();
```

Exemples :

- `'user-' + Date.now()`
- `'cycle-' + Date.now()`
- `'entry-' + Date.now()`

### 4. Manipulation des collections

Utiliser les méthodes Realm de manière cohérente :

```typescript
// Filtrage
realm.objects('Entity').filtered('field = $0', value);

// Tri
realm.objects('Entity').sorted('field', true);

// Mapping
collection.map(callback);
```

### 5. Tests

#### Configuration des mocks

Utiliser le fichier `realmTestConfig.ts` pour les mocks :

```typescript
import { setupRealmMocks, createMockEntity, createMockCollection } from './realmTestConfig';

beforeEach(() => {
  setupRealmMocks();
});
```

#### Création de données de test

```typescript
const mockEntity = createMockEntity<EntityType>({
  // Propriétés spécifiques
});

const mockCollection = createMockCollection([mockEntity]);
```

#### Vérification des appels

```typescript
expect(mockRealmInstance.write).toHaveBeenCalled();
expect(mockRealmInstance.create).toHaveBeenCalledWith('Entity', expect.any(Object));
```

## Bonnes pratiques

1. **Transactions**

   - Toujours utiliser `realm.write()` pour les modifications
   - Grouper les opérations liées dans une seule transaction

2. **Gestion des erreurs**

   - Vérifier l'existence des entités avant les opérations
   - Utiliser des messages d'erreur cohérents
   - Gérer les cas d'erreur dans les tests

3. **Performance**

   - Éviter les requêtes imbriquées
   - Utiliser les index pour les champs fréquemment filtrés
   - Limiter la taille des collections chargées

4. **Maintenance**
   - Documenter les changements de schéma
   - Maintenir la cohérence des types
   - Mettre à jour les tests lors des modifications

## Migration des données

1. **Backup**

   - Sauvegarder les données avant la migration
   - Tester la migration sur un environnement de test

2. **Schéma**

   - Mettre à jour les schémas Realm
   - Gérer les migrations de données

3. **Validation**
   - Vérifier l'intégrité des données
   - Tester les cas limites
   - Valider les performances
