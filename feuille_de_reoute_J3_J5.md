# Feuille de Route MoodCycle J3-J5

## État Actuel du Projet (Fin J2)

Le projet MoodCycle dispose maintenant d'une architecture solide basée sur Clean Architecture et le pattern MVVM:

- **Architecture** complète avec séparation des couches (domaine, data, services, présentation)
- **Modèles de données** et repositories implémentés avec WatermelonDB
- **Système de thème** et composants UI de base
- **Service Claude** pour l'IA conversationnelle
- **Navigation** typée pour toutes les sections de l'app
- **Écrans de base** pour chaque section

## Plan de Développement J3-J5

### J3: Composants Clés et Fonctionnalités Principales

#### 1. Prototype Complet de la Roue des Phases
- **Localisation**: `src/features/cycle/components/CycleWheel/`
- **Description**: Composant central de visualisation du cycle menstruel
- **Tâches détaillées**:
  - Créer composant SVG/Canvas avec les segments des 4 phases
  - Implémenter les animations (rotation fluide, highlight des phases)
  - Ajouter interactions (tap, swipe, zoom)
  - Connecter au CycleRepository via useCase
  - Implémenter l'indicateur de position actuelle
- **Composants à créer**:
  - `CycleWheel.tsx` - Composant principal
  - `CycleSegment.tsx` - Segment représentant une phase
  - `CycleIndicator.tsx` - Indicateur de position actuelle
  - `useCycleWheel.ts` - Hook pour la logique d'interaction
- **Dépendances**:
  - GetCycleUseCase
  - Système de thème (couleurs des phases)

#### 2. Écran d'Accueil Complet
- **Localisation**: `src/features/home/`
- **Description**: Point d'entrée principal avec aperçu du jour
- **Tâches détaillées**:
  - Implémenter le composant Insight du Jour
  - Créer le composant d'avatar Melune animé
  - Intégrer la version simplifiée de la roue
  - Ajouter l'indicateur des prochaines règles
  - Bouton pour saisie des symptômes du jour
- **Composants à créer**:
  - `DailyInsight.tsx` - Carte d'insight quotidien
  - `MeluneAvatar.tsx` - Avatar animé de Melune
  - `NextPeriodInfo.tsx` - Information sur les prochaines règles
  - `MoodEntryButton.tsx` - Bouton de saisie d'humeur
- **Dépendances**:
  - GetDailyInsightUseCase (à créer)
  - CycleWheel (version réduite)

#### 3. Fonctionnalité de Conversation avec Melune
- **Localisation**: `src/features/conversation/`
- **Description**: Interface conversationnelle avec l'IA Melune
- **Tâches détaillées**:
  - Implémenter l'interface de chat complète
  - Créer les bulles de message stylisées
  - Ajouter les animations de frappe
  - Implémenter le chargement progressif des réponses
  - Connecter au ClaudeService via useCases
- **Composants à créer**:
  - `MessageBubble.tsx` - Bulle de message (user/Melune)
  - `MessageList.tsx` - Liste de messages scrollable
  - `MessageInput.tsx` - Zone de saisie avec suggestions
  - `TypingIndicator.tsx` - Indicateur "Melune écrit..."
- **Dépendances**:
  - SendMessageUseCase
  - GetConversationHistoryUseCase

### J4: Expérience Utilisateur et Fonctionnalités Complémentaires

#### 1. Carnet de Sagesse
- **Localisation**: `src/features/wisdom/`
- **Description**: Espace de sauvegarde et organisation des insights et conseils
- **Tâches détaillées**:
  - Implémenter la sauvegarde depuis Insight et Conversation
  - Créer l'interface de visualisation du carnet
  - Ajouter des filtres par phase/catégorie
  - Développer la fonctionnalité de recherche
  - Implémenter le système de partage
- **Composants à créer**:
  - `WisdomCard.tsx` - Carte de conseil sauvegardé
  - `WisdomFilters.tsx` - Filtres du carnet
  - `WisdomSearchBar.tsx` - Barre de recherche
  - `WisdomActionBar.tsx` - Actions sur les éléments sélectionnés
- **Dépendances**:
  - SaveWisdomItemUseCase (à créer)
  - GetWisdomItemsUseCase (à créer)
  - ShareWisdomItemUseCase (à créer)

#### 2. Écran de Cycle Complet
- **Localisation**: `src/features/cycle/`
- **Description**: Visualisation détaillée du cycle et saisie de données
- **Tâches détaillées**:
  - Finaliser l'écran de détail des phases
  - Créer l'interface de saisie des symptômes
  - Développer la visualisation de l'historique
  - Implémenter les tendances et statistiques
- **Composants à créer**:
  - `PhaseDetails.tsx` - Détails de la phase sélectionnée
  - `SymptomEntry.tsx` - Formulaire de saisie des symptômes
  - `CycleHistory.tsx` - Historique des cycles
  - `CycleStats.tsx` - Statistiques et tendances
- **Dépendances**:
  - CreateDailyEntryUseCase
  - GetCycleHistoryUseCase (à créer)
  - GetCycleStatsUseCase (à créer)

#### 3. Système de Notification et Rappels
- **Localisation**: `src/core/services/notifications/`
- **Description**: Notifications locales pour les événements du cycle
- **Tâches détaillées**:
  - Configurer le système de notifications locales
  - Implémenter les rappels de changement de phase
  - Créer les rappels pour rituels et insights
  - Développer les préférences de notification
- **Composants à créer**:
  - `NotificationService.ts` - Service de gestion des notifications
  - `NotificationTypes.ts` - Types de notifications
  - `ReminderScheduler.ts` - Planificateur de rappels
  - `NotificationSettings.tsx` - Écran de paramètres
- **Dépendances**:
  - expo-notifications
  - CycleRepository

### J5: Intégration et Peaufinages

#### 1. Mode Hors-ligne Robuste
- **Localisation**: Plusieurs fichiers
- **Description**: Fonctionnement complet sans connexion
- **Tâches détaillées**:
  - Finaliser la synchronisation WatermelonDB
  - Implémenter le cache des réponses Claude
  - Créer des fallbacks pour toutes les fonctionnalités
  - Tester différents scénarios de connectivité
- **Composants à créer/modifier**:
  - `SyncService.ts` - Service de synchronisation
  - `OfflineIndicator.tsx` - Indicateur mode hors-ligne
  - `ConnectionManager.ts` - Gestionnaire de connexion
- **Dépendances**:
  - WatermelonDB synchronize
  - NetInfo

#### 2. Profil Utilisatrice et Personnalisation
- **Localisation**: `src/features/profile/`
- **Description**: Écrans de paramètres et personnalisation
- **Tâches détaillées**:
  - Développer l'écran de profil complet
  - Implémenter les options de personnalisation Melune
  - Créer les paramètres d'accessibilité
  - Ajouter les préférences de contenu
- **Composants à créer**:
  - `ProfileScreen.tsx` - Écran principal du profil
  - `AvatarSelector.tsx` - Sélecteur d'avatar Melune
  - `PreferenceCard.tsx` - Carte de préférence
  - `AccessibilitySettings.tsx` - Paramètres d'accessibilité
- **Dépendances**:
  - UpdateProfileUseCase (à créer)
  - GetProfileUseCase (à créer)

#### 3. Tests et Optimisations
- **Localisation**: Plusieurs dossiers `__tests__`
- **Description**: Tests unitaires et d'intégration
- **Tâches détaillées**:
  - Créer des tests pour les use cases critiques
  - Tester les repositories et services
  - Optimiser les rendus des composants React
  - Profiler et résoudre les goulots d'étranglement
- **Types de tests**:
  - Tests unitaires pour la logique métier
  - Tests d'intégration pour les repositories
  - Tests de composants pour l'UI
  - Tests e2e pour les fonctionnalités principales
- **Dépendances**:
  - Jest
  - React Testing Library
  - react-native-testing-library

## Points d'Attention Particuliers

1. **Performances de la Roue des Phases**
   - Utiliser des optimisations de rendu
   - Éviter les rerendus inutiles
   - Utiliser des approches légères (SVG vs Canvas)

2. **Gestion de l'API Claude**
   - Implémenter un cache intelligent
   - Gérer les quotas d'API
   - Prévoir des fallbacks robustes

3. **Organisation du Code**
   - Maintenir la séparation des couches
   - Utiliser des composants réutilisables
   - Garder le code testable

4. **État de l'Application**
   - Optimiser Redux pour les données partagées
   - Utiliser des états locaux quand approprié
   - Maintenir la cohérence des données

## Liste des Use Cases à Implémenter

### Cycle
- ✅ GetCycleUseCase
- ✅ CreateDailyEntryUseCase
- ⏱️ GetCycleHistoryUseCase
- ⏱️ GetCycleStatsUseCase
- ⏱️ UpdateCycleParamsUseCase

### Conversation
- ✅ SendMessageUseCase
- ✅ GetConversationHistoryUseCase
- ⏱️ GetDailyInsightUseCase

### Wisdom
- ⏱️ SaveWisdomItemUseCase
- ⏱️ GetWisdomItemsUseCase
- ⏱️ DeleteWisdomItemUseCase
- ⏱️ ShareWisdomItemUseCase

### Profil
- ⏱️ GetProfileUseCase
- ⏱️ UpdateProfileUseCase
- ⏱️ UpdateUserPreferencesUseCase

## Structure de Fichiers Complète

```
src/
├── core/
│   ├── data/
│   │   ├── models/
│   │   │   ├── CycleModel.ts
│   │   │   ├── DailyEntryModel.ts
│   │   │   ├── ConversationModel.ts
│   │   │   ├── MessageModel.ts
│   │   │   ├── UserModel.ts
│   │   │   └── WisdomItemModel.ts
│   │   ├── repositories/
│   │   │   ├── CycleRepository.ts
│   │   │   ├── DailyEntryRepository.ts
│   │   │   ├── WatermelonConversationRepository.ts
│   │   │   └── WisdomRepository.ts
│   │   ├── database.ts
│   │   └── schema.ts
│   ├── domain/
│   │   ├── entities/
│   │   │   ├── conversation/
│   │   │   │   ├── Conversation.ts
│   │   │   │   └── Message.ts
│   │   │   ├── cycle/
│   │   │   │   ├── Cycle.ts
│   │   │   │   ├── CyclePredictions.ts
│   │   │   │   ├── CycleStatistics.ts
│   │   │   │   └── DailyEntry.ts
│   │   │   ├── user/
│   │   │   │   └── User.ts
│   │   │   └── wisdom/
│   │   │       └── WisdomItem.ts
│   │   ├── repositories/
│   │   │   ├── ConversationRepository.ts
│   │   │   ├── CycleRepository.ts
│   │   │   ├── DailyEntryRepository.ts
│   │   │   ├── UserRepository.ts
│   │   │   └── WisdomRepository.ts
│   │   └── usecases/
│   │       ├── conversation/
│   │       │   ├── GetConversationHistoryUseCase.ts
│   │       │   └── SendMessageUseCase.ts
│   │       ├── cycle/
│   │       │   ├── CreateDailyEntryUseCase.ts
│   │       │   └── GetCycleUseCase.ts
│   │       └── wisdom/
│   │           └── GetWisdomItemsUseCase.ts
│   ├── hooks/
│   │   ├── useConversation.ts
│   │   └── useCycle.ts
│   ├── services/
│   │   ├── claude/
│   │   │   ├── ClaudeService.ts
│   │   │   ├── config.ts
│   │   │   └── types.ts
│   │   └── notifications/
│   │       └── NotificationService.ts
│   └── ui/
│       ├── components/
│       │   ├── Button.tsx
│       │   ├── Card.tsx
│       │   └── Text.tsx
│       └── theme/
│           ├── borderRadius.ts
│           ├── colors.ts
│           ├── index.ts
│           ├── spacing.ts
│           ├── theme.ts
│           └── typography.ts
├── features/
│   ├── conversation/
│   │   ├── components/
│   │   │   ├── MessageBubble.tsx
│   │   │   ├── MessageInput.tsx
│   │   │   └── MessageList.tsx
│   │   ├── hooks/
│   │   │   └── useConversation.ts
│   │   ├── presentation/
│   │   │   └── viewmodels/
│   │   │       └── ConversationViewModel.ts
│   │   └── screens/
│   │       ├── ConversationHistoryScreen.tsx
│   │       └── ConversationScreen.tsx
│   ├── cycle/
│   │   ├── components/
│   │   │   ├── CycleWheel/
│   │   │   │   ├── CycleIndicator.tsx
│   │   │   │   ├── CycleSegment.tsx
│   │   │   │   └── CycleWheel.tsx
│   │   │   ├── PhaseDetails.tsx
│   │   │   └── SymptomEntry.tsx
│   │   ├── hooks/
│   │   │   └── useCycle.ts
│   │   ├── presentation/
│   │   │   └── viewmodels/
│   │   │       └── CycleViewModel.ts
│   │   └── screens/
│   │       ├── CycleHistoryScreen.tsx
│   │       ├── CycleScreen.tsx
│   │       └── CycleStatsScreen.tsx
│   ├── home/
│   │   ├── components/
│   │   │   ├── DailyInsight.tsx
│   │   │   ├── MeluneAvatar.tsx
│   │   │   └── NextPeriodInfo.tsx
│   │   ├── presentation/
│   │   │   └── viewmodels/
│   │   │       └── HomeViewModel.ts
│   │   └── screens/
│   │       ├── HomeScreen.tsx
│   │       ├── ProfileScreen.tsx
│   │       └── SettingsScreen.tsx
│   ├── navigation/
│   │   ├── stacks/
│   │   │   ├── ConversationStackNavigator.tsx
│   │   │   ├── CycleStackNavigator.tsx
│   │   │   ├── HomeStackNavigator.tsx
│   │   │   └── WisdomStackNavigator.tsx
│   │   ├── MainTabNavigator.tsx
│   │   ├── RootNavigator.tsx
│   │   └── types.ts
│   ├── shared/
│   │   └── components/
│   │       └── ScreenContainer.tsx
│   └── wisdom/
│       ├── components/
│       │   ├── WisdomActionBar.tsx
│       │   ├── WisdomCard.tsx
│       │   └── WisdomFilters.tsx
│       ├── presentation/
│       │   └── viewmodels/
│       │       └── WisdomViewModel.ts
│       └── screens/
│           ├── ArticleScreen.tsx
│           ├── CategoryScreen.tsx
│           └── WisdomScreen.tsx
└── store/
    ├── index.ts
    └── slices/
        ├── conversation/
        │   └── conversationSlice.ts
        └── cycle/
            └── cycleSlice.ts
```

## Conventions et Bonnes Pratiques

1. **Imports**
   - Imports absolus depuis src/ (`import { x } from 'src/core/...'`)
   - Éviter les imports circulaires
   - Grouper les imports par catégorie

2. **Naming**
   - PascalCase pour composants et classes
   - camelCase pour variables, fonctions et méthodes
   - UPPER_CASE pour constantes
   - Préfixe "I" pour interfaces (ex: IRepository)

3. **Tests**
   - Fichiers tests à côté des fichiers qu'ils testent
   - Nommage: `[fichier].test.ts` ou `__tests__/[fichier].test.ts`
   - Couvrir les cas limites et erreurs

4. **Composants React**
   - Composants fonctionnels avec hooks
   - Destructuration des props
   - Types explicites pour les props
   - Optimisation avec memo() pour les composants lourds