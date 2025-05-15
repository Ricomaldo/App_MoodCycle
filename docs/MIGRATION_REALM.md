# Migration vers Realm - Guide technique

## Changements structurels

### 1. Entités mises à jour

#### Conversation

- Ajout du champ `role` dans `Message`
- Renommage de `timestamp` en `createdAt`
- Ajout de `userId` et `title`
- Restructuration du `context`

#### Cycle

- Passage de `phase` (singulier) à `phases` (tableau)
- Ajout des champs `symptoms` et `mood` au niveau du cycle
- Suppression de `isCurrent` (géré par la logique métier)
- Ajout de `notes` optionnel

### 2. Repositories

#### Méthodes standardisées

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

#### Gestion des dates

- `createdAt` et `updatedAt` obligatoires
- Initialisation avec `new Date()`
- Mise à jour automatique lors des modifications

### 3. Tests

#### Configuration des mocks

```typescript
// realmTestConfig.ts
export const setupRealmMocks = () => {
  jest.mock('../../models', () => ({
    getRealmInstance: jest.fn().mockReturnValue(mockRealmInstance),
  }));
  // Réinitialisation des mocks...
};
```

#### Création de données de test

```typescript
const mockEntity = createMockEntity<EntityType>({
  // Propriétés spécifiques
});

const mockCollection = createMockCollection([mockEntity]);
```

## Bonnes pratiques

1. **Transactions**

   - Utiliser `realm.write()` pour les modifications
   - Grouper les opérations liées

2. **Gestion des erreurs**

   - Vérifier l'existence des entités
   - Messages d'erreur cohérents
   - Tests des cas d'erreur

3. **Performance**

   - Éviter les requêtes imbriquées
   - Utiliser les index
   - Limiter la taille des collections

4. **Maintenance**
   - Documenter les changements
   - Maintenir la cohérence des types
   - Mettre à jour les tests

## Migration des données

1. **Backup**

   - Sauvegarder les données
   - Tester sur environnement de test

2. **Schéma**

   - Mettre à jour les schémas Realm
   - Gérer les migrations

3. **Validation**
   - Vérifier l'intégrité
   - Tester les cas limites
   - Valider les performances
