# Hook useRealmSync

## Description

Le hook `useRealmSync` est un hook personnalisé qui gère la synchronisation des données entre l'application et la base de données Realm. Il fournit une interface simple pour initialiser Realm et synchroniser les données utilisateur, les cycles et les entrées quotidiennes.

## Utilisation

```typescript
import { useRealmSync } from '../core/hooks/useRealmSync';

const MyComponent = () => {
  const { isInitialized, error, syncData } = useRealmSync();

  // Exemple d'utilisation
  const handleSync = async () => {
    try {
      await syncData({
        user: userData,
        cycles: cyclesData,
        entries: entriesData
      });
    } catch (error) {
      console.error('Erreur de synchronisation:', error);
    }
  };

  if (error) {
    return <ErrorComponent error={error} />;
  }

  if (!isInitialized) {
    return <LoadingComponent />;
  }

  return (
    // Votre composant
  );
};
```

## API

### État

- `isInitialized` (boolean) : Indique si Realm est initialisé
- `error` (Error | null) : Erreur éventuelle lors de l'initialisation

### Méthodes

#### syncData

```typescript
syncData(data: {
  user?: User;
  cycles?: Cycle[];
  entries?: DailyEntry[];
}): Promise<void>
```

Synchronise les données avec Realm. Les paramètres sont optionnels et peuvent être fournis selon les besoins.

## Gestion de la Mémoire

Le hook gère automatiquement la fermeture de la connexion Realm lorsque le composant est démonté :

```typescript
useEffect(() => {
  // Initialisation
  return () => {
    const realm = getRealmInstance();
    if (realm && !realm.isClosed) {
      realm.close();
    }
  };
}, []);
```

## Gestion des Erreurs

Le hook gère les erreurs d'initialisation et de synchronisation :

1. Erreurs d'initialisation :

   - Realm non disponible
   - Problèmes de configuration
   - Erreurs de migration

2. Erreurs de synchronisation :
   - Données invalides
   - Conflits de données
   - Problèmes de connexion

## Bonnes Pratiques

1. **Initialisation**

   - Utiliser le hook au niveau le plus haut possible de l'application
   - Vérifier `isInitialized` avant d'effectuer des opérations Realm
   - Gérer les erreurs d'initialisation

2. **Synchronisation**

   - Synchroniser les données par lots
   - Gérer les conflits de données
   - Implémenter une stratégie de retry

3. **Performance**
   - Éviter les synchronisations inutiles
   - Utiliser le cache local
   - Optimiser les requêtes Realm

## Exemple Complet

```typescript
import { useRealmSync } from '../core/hooks/useRealmSync';
import { User, Cycle, DailyEntry } from '../core/domain/entities';

const DataSyncComponent = () => {
  const { isInitialized, error, syncData } = useRealmSync();
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = async () => {
    if (!isInitialized) return;

    setIsSyncing(true);
    try {
      // Récupération des données
      const userData = await fetchUserData();
      const cyclesData = await fetchCyclesData();
      const entriesData = await fetchEntriesData();

      // Synchronisation
      await syncData({
        user: userData,
        cycles: cyclesData,
        entries: entriesData
      });

      // Notification de succès
      showSuccessNotification('Données synchronisées avec succès');
    } catch (error) {
      // Gestion des erreurs
      showErrorNotification('Erreur de synchronisation');
      console.error('Erreur de synchronisation:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  if (error) {
    return <ErrorComponent error={error} />;
  }

  if (!isInitialized) {
    return <LoadingComponent />;
  }

  return (
    <View>
      <Button
        onPress={handleSync}
        disabled={isSyncing}
        title={isSyncing ? 'Synchronisation...' : 'Synchroniser'}
      />
    </View>
  );
};
```

## Tests

```typescript
import { renderHook, act } from '@testing-library/react-hooks';
import { useRealmSync } from './useRealmSync';

describe('useRealmSync', () => {
  it('should initialize Realm', async () => {
    const { result } = renderHook(() => useRealmSync());

    expect(result.current.isInitialized).toBe(false);

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.isInitialized).toBe(true);
  });

  it('should handle sync errors', async () => {
    const { result } = renderHook(() => useRealmSync());

    await act(async () => {
      try {
        await result.current.syncData({
          user: invalidUserData,
        });
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
```
