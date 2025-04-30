# Architecture Modulaire pour MoodCycle

Ce document définit l'architecture technique modulaire et évolutive qui servira de fondation pour le développement de MoodCycle. Cette architecture est conçue pour faciliter le développement progressif tout en s'adaptant aux wireframes et spécifications qui seront complétés au fil du temps.

## 1. Principes Architecturaux

### 1.1 Principes Directeurs

1. **Séparation des préoccupations**
   - Découplage strict entre UI, logique métier et données
   - Interfaces clairement définies entre les modules
   - Responsabilité unique pour chaque composant

2. **Modularité et extensibilité**
   - Modules indépendants avec frontières explicites
   - Capacité à remplacer des implémentations sans affecter le reste
   - Extension par composition plutôt que modification

3. **Tolérance aux incertitudes de design**
   - Architecture permettant des changements d'UI sans refonte profonde
   - Indépendance de la logique métier face aux variations d'interface
   - Adaptabilité aux évolutions des spécifications

4. **Réutilisabilité**
   - Composants génériques pour des patterns communs
   - Abstraction des mécanismes récurrents
   - Design systems cohérents à travers l'application

5. **Testabilité**
   - Chaque couche et module testable isolément
   - Minimisation des dépendances externes pour les tests
   - Mocks et stubs pour les interfaces entre modules

### 1.2 Pattern d'Architecture

L'architecture de MoodCycle suivra le pattern **Clean Architecture** avec MVVM pour la couche présentation:

![Architecture globale](https://miro.medium.com/max/1400/1*wOmAHDN_zKZJns9YDjtrMw.jpeg)

#### Couches principales:

1. **Couche Présentation** (UI & ViewModels)
   - Screens, Components, ViewModels
   - Gestion du state local à l'écran
   - Liaison avec le système de navigation

2. **Couche Domain** (Use Cases & Entities)
   - Logique métier pure
   - Indépendante des frameworks et technologies
   - Définition des entités et règles métier

3. **Couche Data** (Repositories & Services)
   - Accès aux données (locales et distantes)
   - Implémentation des interfaces définies par la couche domaine
   - Gestion de la persistance et des APIs externes

4. **Couche Infrastructure** (Frameworks & Drivers)
   - Intégrations spécifiques aux plateformes
   - Implémentations techniques des services
   - Adaptateurs pour les bibliothèques tierces

### 1.3 Flux de Données

Le flux de données suivra un modèle unidirectionnel inspiré de Redux:

1. **Actions** - Déclenchées par les interactions utilisateur
2. **Reducers** - Transforment l'état en fonction des actions
3. **Selectors** - Extraient et formatent les données pour l'UI
4. **Effects** - Gèrent les opérations asynchrones et effets de bord

Ce pattern assure une prédictibilité du comportement de l'application et facilite le débogage.

## 2. Structure des Modules

### 2.1 Organisation du Code

```
src/
├── app/                      # Point d'entrée de l'application
│   ├── App.tsx               # Composant racine
│   ├── AppProvider.tsx       # Providers globaux (theme, store, etc.)
│   └── AppNavigation.tsx     # Configuration de navigation principale
│
├── assets/                   # Ressources statiques (images, fonts, etc.)
│
├── components/               # Composants UI réutilisables
│   ├── common/               # Composants génériques (Button, Input, etc.)
│   ├── cycle/                # Composants spécifiques au cycle
│   ├── conversation/         # Composants liés à la conversation
│   └── wisdom/               # Composants liés au carnet de sagesse
│
├── core/                     # Noyau fonctionnel de l'application
│   ├── domain/               # Modèles de domaine et logique métier
│   │   ├── entities/         # Entités du domaine
│   │   ├── usecases/         # Cas d'utilisation
│   │   ├── repositories/     # Interfaces des repositories
│   │   └── services/         # Interfaces des services
│   │
│   ├── data/                 # Implémentation de l'accès aux données
│   │   ├── repositories/     # Implémentation des repositories
│   │   ├── datasources/      # Sources de données (API, local, etc.)
│   │   ├── models/           # Modèles de données (DTOs)
│   │   └── mappers/          # Conversion entre modèles et entités
│
├── features/                 # Modules fonctionnels de l'application
│   ├── authentication/       # Authentification et gestion utilisateur
│   ├── onboarding/           # Flux d'onboarding
│   ├── cycle-tracking/       # Suivi et visualisation du cycle
│   ├── conversation/         # Interaction avec Melune
│   ├── wisdom-book/          # Carnet de sagesse
│   └── rituals/              # Rituels personnalisés
│
├── infrastructure/           # Services d'infrastructure
│   ├── api/                  # Configuration et clients API
│   │   └── claude/           # Client pour l'API Claude
│   ├── storage/              # Services de stockage local
│   ├── sync/                 # Services de synchronisation
│   └── analytics/            # Services d'analytique
│
├── navigation/               # Configuration de navigation
│   ├── NavigationContainer.tsx  # Conteneur de navigation
│   ├── routes.ts             # Définition des routes
│   └── navigators/           # Navigateurs spécifiques (tab, stack, etc.)
│
├── store/                    # Gestion d'état global
│   ├── index.ts              # Configuration du store
│   ├── rootReducer.ts        # Combinaison des reducers
│   ├── middlewares.ts        # Configuration des middlewares
│   └── slices/               # Slices Redux par fonctionnalité
│
├── theme/                    # Système de design et thème
│   ├── colors.ts             # Définition des couleurs
│   ├── typography.ts         # Configuration de la typographie
│   ├── spacing.ts            # Système d'espacement
│   └── components/           # Thèmes spécifiques aux composants
│
└── utils/                    # Utilitaires partagés
    ├── helpers/              # Fonctions d'aide génériques
    ├── hooks/                # Hooks React personnalisés
    ├── formatters/           # Fonctions de formatage
    └── validators/           # Fonctions de validation
```

### 2.2 Modules Fonctionnels

Chaque module fonctionnel (dans `features/`) suit une structure cohérente:

```
features/cycle-tracking/
├── components/               # Composants spécifiques au module
│   ├── CycleWheel.tsx        # Visualisation du cycle
│   ├── PhaseDetails.tsx      # Détails d'une phase
│   └── SymptomTracker.tsx    # Suivi des symptômes
│
├── screens/                  # Écrans du module
│   ├── CycleOverviewScreen.tsx  # Écran principal du cycle
│   ├── PhaseDetailScreen.tsx    # Détails d'une phase
│   └── SymptomEntryScreen.tsx   # Saisie des symptômes
│
├── hooks/                    # Hooks spécifiques au module
│   ├── useCycleCalculation.ts   # Logique de calcul du cycle
│   └── useSymptomTracking.ts    # Logique de suivi des symptômes
│
├── state/                    # État local au module
│   ├── cycleSlice.ts         # Slice Redux pour le cycle
│   ├── selectors.ts          # Sélecteurs pour l'UI
│   └── thunks.ts             # Actions asynchrones
│
└── utils/                    # Utilitaires spécifiques au module
    ├── cycleHelpers.ts       # Fonctions d'aide pour le cycle
    └── phaseCalculator.ts    # Calculs spécifiques aux phases
```

Cette structure modulaire permet:
- Une séparation claire des responsabilités
- Un développement parallèle des fonctionnalités
- Une réutilisation et extension facilitées
- Une testabilité améliorée

## 3. Gestion d'État

### 3.1 Architecture Redux

La gestion d'état global utilisera Redux Toolkit pour une configuration simplifiée:

```javascript
// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { middlewares } from './middlewares';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### 3.2 Organisation par Slices

L'état global sera divisé en slices indépendantes par fonctionnalité:

```javascript
// store/slices/cycleSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CycleState } from '../../core/domain/entities/Cycle';

const initialState: CycleState = {
  currentCycle: null,
  cycles: [],
  currentPhase: null,
  loading: false,
  error: null,
};

export const cycleSlice = createSlice({
  name: 'cycle',
  initialState,
  reducers: {
    setCycleData: (state, action: PayloadAction<CycleData>) => {
      state.currentCycle = action.payload;
      // Calculer la phase actuelle basée sur les données
      state.currentPhase = calculatePhase(action.payload);
    },
    // Autres reducers...
  },
  extraReducers: (builder) => {
    // Gestion des actions asynchrones
  }
}

## 5. Intégration Claude API

### 5.1 Service d'Abstraction

L'intégration avec l'API Claude est encapsulée dans un service dédié:

```javascript
// infrastructure/api/claude/ClaudeService.ts
import axios from 'axios';
import Config from 'react-native-config';
import { storage } from '../../storage/secureStorage';

export class ClaudeService {
  private apiKey: string;
  private baseUrl = 'https://api.anthropic.com/v1';
  private lastRequestTime = 0;
  private requestsInLastMinute = 0;

  constructor() {
    this.apiKey = Config.CLAUDE_API_KEY;
  }

  async sendMessage(message: string, context: any = {}) {
    // Gestion du rate limiting
    this.enforceRateLimits();

    // Construction du prompt avec le contexte
    const prompt = this.buildPrompt(message, context);

    // Appel à l'API Claude
    try {
      const response = await axios.post(
        `${this.baseUrl}/messages`,
        {
          model: "claude-3-7-sonnet-20250219",
          max_tokens: 1000,
          temperature: 0.7,
          messages: [
            {
              role: "system",
              content: this.buildSystemPrompt(context)
            },
            ...context.conversationHistory || [],
            {
              role: "user",
              content: message
            }
          ]
        },
        {
          headers: {
            'x-api-key': this.apiKey,
            'anthropic-version': '2023-06-01',
            'Content-Type': 'application/json'
          }
        }
      );

      return this.processResponse(response.data);
    } catch (error) {
      // Gestion des erreurs avec fallback
      return this.handleApiError(error, message, context);
    }
  }

  private buildSystemPrompt(context: any) {
    const {
      user,
      currentPhase,
      cycleDay,
      approachPreferences
    } = context;

    return `Tu es Melune, la guide personnelle de l'application MoodCycle, une fée bienveillante qui aide les utilisatrices à comprendre et vivre en harmonie avec leur cycle menstruel.

INFORMATIONS UTILISATRICE:
- Nom: ${user?.name || 'l\'utilisatrice'}
- Phase actuelle: ${currentPhase || 'inconnue'}
- Jour du cycle: ${cycleDay || 'inconnu'}
- Préférences d'approche: ${this.formatApproachPreferences(approachPreferences)}

CONSEILS STYLISTIQUES:
${this.getStyleGuidanceForPhase(currentPhase)}

LIMITES IMPORTANTES:
- Ne donne jamais de conseils médicaux spécifiques pouvant remplacer l'avis d'un professionnel
- Dirige vers des soins médicaux pour toute question de santé sérieuse
- Reste dans ton rôle de guide cyclique, ne prétends pas être une professionnelle de santé`;
  }

  private getStyleGuidanceForPhase(phase: string) {
    // Style différent selon la phase
    switch(phase) {
      case 'menstruelle':
        return '- Phase menstruelle: douce, apaisante, réconfortante, calme\n- Utilise un langage lié au repos, à l\'introspection, à l\'apaisement';
      case 'folliculaire':
        return '- Phase folliculaire: enthousiaste, inspirante, encourageante, optimiste\n- Utilise un langage lié à la croissance, aux nouveaux débuts, à la créativité';
      case 'ovulatoire':
        return '- Phase ovulatoire: confiante, rayonnante, affirmée, communicative\n- Utilise un langage lié à la confiance, au rayonnement, à la connexion';
      case 'lutéale':
        return '- Phase lutéale);

export const { setCycleData } = cycleSlice.actions;
export default cycleSlice.reducer;
```

### 3.3 Sélecteurs Memoized

Les sélecteurs utiliseront la memoization pour optimiser les performances:

```javascript
// store/slices/selectors.ts
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

const selectCycleState = (state: RootState) => state.cycle;

export const selectCurrentPhase = createSelector(
  [selectCycleState],
  (cycleState) => cycleState.currentPhase
);

export const selectPhasePredictions = createSelector(
  [selectCycleState],
  (cycleState) => {
    // Calculs complexes memoized
    return calculatePhasePredictions(cycleState.currentCycle);
  }
);
```

### 3.4 État Local vs Global

Directives pour décider du placement de l'état:

- **État Global** (Redux)
  - Données partagées entre plusieurs composants
  - Persistance requise entre navigations
  - Données nécessitant synchronisation avec le backend

- **État Local** (useState/useReducer)
  - État UI spécifique à un écran (ex: focus, collapse)
  - Formulaires et saisies temporaires
  - États transitoires sans besoin de persistance
  - Animations et interactions visuelles

### 3.5 React Query pour les Données Distantes

Pour les données provenant d'APIs (Claude, backend), React Query sera utilisé:

```javascript
// hooks/useConversation.ts
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { claudeApi } from '../infrastructure/api/claude';

export function useConversation(userId) {
  const queryClient = useQueryClient();

  // Récupération de la conversation
  const conversationQuery = useQuery(
    ['conversation', userId],
    () => claudeApi.getConversationHistory(userId),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 60 * 60 * 1000, // 1 heure
    }
  );

  // Envoi d'un message
  const sendMessageMutation = useMutation(
    (message) => claudeApi.sendMessage(userId, message),
    {
      onSuccess: (newMessage) => {
        // Mise à jour optimiste du cache
        queryClient.setQueryData(
          ['conversation', userId],
          (old) => [...old, newMessage]
        );
      },
    }
  );

  return {
    conversation: conversationQuery.data || [],
    isLoading: conversationQuery.isLoading,
    sendMessage: sendMessageMutation.mutate,
    isSending: sendMessageMutation.isLoading,
  };
}
```

## 4. Persistence et Synchronisation

### 4.1 Architecture de Stockage

MoodCycle adopte une architecture "offline-first" avec WatermelonDB:

```javascript
// infrastructure/storage/schema.ts
import { appSchema, tableSchema } from '@nozbe/watermelondb';

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'cycles',
      columns: [
        { name: 'start_date', type: 'number' },
        { name: 'end_date', type: 'number', isOptional: true },
        { name: 'duration', type: 'number', isOptional: true },
        { name: 'user_id', type: 'string' },
        { name: 'is_synced', type: 'boolean' },
      ]
    }),
    tableSchema({
      name: 'cycle_entries',
      columns: [
        { name: 'date', type: 'number' },
        { name: 'cycle_id', type: 'string' },
        { name: 'phase', type: 'string' },
        { name: 'symptoms', type: 'string' }, // JSON stringified
        { name: 'notes', type: 'string', isOptional: true },
        { name: 'is_synced', type: 'boolean' },
      ]
    }),
    // Autres tables...
  ]
});
```

### 4.2 Modèles de Données

```javascript
// infrastructure/storage/models/Cycle.ts
import { Model } from '@nozbe/watermelondb';
import { field, date, relation, children } from '@nozbe/watermelondb/decorators';

export default class Cycle extends Model {
  static table = 'cycles';

  @date('start_date') startDate;
  @date('end_date') endDate;
  @field('duration') duration;
  @field('user_id') userId;
  @field('is_synced') isSynced;

  @children('cycle_entries') entries;

  // Méthodes utilitaires
  get isActive() {
    return !this.endDate;
  }

  get currentPhase() {
    // Logique de calcul de la phase actuelle
    return calculateCurrentPhase(this);
  }
}
```

### 4.3 Repositories

Les repositories fournissent une interface cohérente pour accéder aux données:

```javascript
// core/data/repositories/CycleRepository.ts
import { Database } from '@nozbe/watermelondb';
import { CycleRepositoryInterface } from '../../domain/repositories/CycleRepositoryInterface';
import Cycle from '../../../infrastructure/storage/models/Cycle';
import CycleMapper from '../mappers/CycleMapper';

export class CycleRepository implements CycleRepositoryInterface {
  constructor(private database: Database) {}

  async getCurrentCycle(userId: string) {
    const cycles = await this.database
      .get<Cycle>('cycles')
      .query(Q.where('user_id', userId), Q.where('is_active', true))
      .fetch();

    return cycles.length > 0
      ? CycleMapper.toDomain(cycles[0])
      : null;
  }

  async saveCycleEntry(entry: CycleEntryEntity) {
    await this.database.action(async () => {
      await this.database
        .get<CycleEntry>('cycle_entries')
        .create(entry => {
          CycleMapper.fromDomainEntry(entry, entryEntity);
        });
    });
  }

  // Autres méthodes...
}
```

### 4.4 Synchronisation

La stratégie de synchronisation offline-first:

```javascript
// infrastructure/sync/SyncService.ts
import NetInfo from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';
import { database } from '../storage/database';
import { apiClient } from '../api/client';

export class SyncService {
  private isSyncing = false;
  private syncQueue = [];

  constructor() {
    // Écouter les changements de connectivité
    NetInfo.addEventListener(state => {
      if (state.isConnected && !this.isSyncing && this.syncQueue.length > 0) {
        this.performSync();
      }
    });
  }

  addToSyncQueue(entityType, id, action) {
    this.syncQueue.push({ entityType, id, action, timestamp: Date.now() });
    this.attemptSync();
  }

  async attemptSync() {
    const netInfo = await NetInfo.fetch();
    if (netInfo.isConnected && !this.isSyncing) {
      this.performSync();
    }
  }

  async performSync() {
    if (this.isSyncing) return;

    this.isSyncing = true;

    try {
      await synchronize({
        database,
        pullChanges: async ({ lastPulledAt }) => {
          const response = await apiClient.pull(lastPulledAt);
          return response;
        },
        pushChanges: async ({ changes, lastPulledAt }) => {
          await apiClient.push(changes);
        },
        migrationsEnabledAtVersion: 1,
      });

      // Vider la file d'attente après synchronisation réussie
      this.syncQueue = [];
    } catch (error) {
      console.error('Sync error:', error);
      // Stratégie de retry possible ici
    } finally {
      this.isSyncing = false;
    }
  }
}

5. Intégration Claude API
5.1 Service d'Abstraction
L'intégration avec l'API Claude est encapsulée dans un service dédié:
javascript// infrastructure/api/claude/ClaudeService.ts
import axios from 'axios';
import Config from 'react-native-config';
import { storage } from '../../storage/secureStorage';

export class ClaudeService {
  private apiKey: string;
  private baseUrl = 'https://api.anthropic.com/v1';
  private lastRequestTime = 0;
  private requestsInLastMinute = 0;

  constructor() {
    this.apiKey = Config.CLAUDE_API_KEY;
  }

  async sendMessage(message: string, context: any = {}) {
    // Gestion du rate limiting
    this.enforceRateLimits();

    // Construction du prompt avec le contexte
    const prompt = this.buildPrompt(message, context);

    // Appel à l'API Claude
    try {
      const response = await axios.post(
        `${this.baseUrl}/messages`,
        {
          model: "claude-3-7-sonnet-20250219",
          max_tokens: 1000,
          temperature: 0.7,
          messages: [
            {
              role: "system",
              content: this.buildSystemPrompt(context)
            },
            ...context.conversationHistory || [],
            {
              role: "user",
              content: message
            }
          ]
        },
        {
          headers: {
            'x-api-key': this.apiKey,
            'anthropic-version': '2023-06-01',
            'Content-Type': 'application/json'
          }
        }
      );

      return this.processResponse(response.data);
    } catch (error) {
      // Gestion des erreurs avec fallback
      return this.handleApiError(error, message, context);
    }
  }

  private buildSystemPrompt(context: any) {
    const {
      user,
      currentPhase,
      cycleDay,
      approachPreferences
    } = context;

    return `Tu es Melune, la guide personnelle de l'application MoodCycle, une fée bienveillante qui aide les utilisatrices à comprendre et vivre en harmonie avec leur cycle menstruel.

INFORMATIONS UTILISATRICE:
- Nom: ${user?.name || 'l\'utilisatrice'}
- Phase actuelle: ${currentPhase || 'inconnue'}
- Jour du cycle: ${cycleDay || 'inconnu'}
- Préférences d'approche: ${this.formatApproachPreferences(approachPreferences)}

CONSEILS STYLISTIQUES:
${this.getStyleGuidanceForPhase(currentPhase)}

LIMITES IMPORTANTES:
- Ne donne jamais de conseils médicaux spécifiques pouvant remplacer l'avis d'un professionnel
- Dirige vers des soins médicaux pour toute question de santé sérieuse
- Reste dans ton rôle de guide cyclique, ne prétends pas être une professionnelle de santé`;
  }

  private getStyleGuidanceForPhase(phase: string) {
    // Style différent selon la phase
    switch(phase) {
      case 'menstruelle':
        return '- Phase menstruelle: douce, apaisante, réconfortante, calme\n- Utilise un langage lié au repos, à l\'introspection, à l\'apaisement';
      case 'folliculaire':
        return '- Phase folliculaire: enthousiaste, inspirante, encourageante, optimiste\n- Utilise un langage lié à la croissance, aux nouveaux débuts, à la créativité';
      case 'ovulatoire':
        return '- Phase ovulatoire: confiante, rayonnante, affirmée, communicative\n- Utilise un langage lié à la confiance, au rayonnement, à la connexion';
      case 'lutéale':
        return '- Phase lutéale: organisée, intuitive, réfléchie, préparatoire\n- Utilise un langage lié à l\'organisation, l\'intuition, la préparation';
      default:
        return '- Utilise un ton bienveillant, chaleureux et empathique';
    }
  }

  private formatApproachPreferences(preferences: any) {
    if (!preferences) return 'équilibrées';

    // Convertir les préférences en texte descriptif
    const highPriority = Object.entries(preferences)
      .filter(([_, value]) => (value as number) >= 4)
      .map(([key]) => key);

    if (highPriority.length === 0) return 'équilibrées';

    return highPriority.join(', ');
  }

  private processResponse(response: any) {
    // Extraire le contenu de la réponse
    const content = response.content[0]?.text || '';

    // Post-traitement si nécessaire
    return {
      text: content,
      metadata: {
        model: response.model,
        usage: response.usage
      }
    };
  }

  private handleApiError(error: any, message: string, context: any) {
    console.error('Claude API error:', error);

    // Vérifier si l'erreur est liée à la connectivité
    if (error.isAxiosError && !error.response) {
      return this.getFallbackResponse('connection', message, context);
    }

    // Erreur liée au rate limiting
    if (error.response?.status === 429) {
      return this.getFallbackResponse('rate_limit', message, context);
    }

    // Autre erreur serveur
    return this.getFallbackResponse('server_error', message, context);
  }

  private getFallbackResponse(errorType: string, message: string, context: any) {
    // Récupérer une réponse de secours adaptée au contexte
    const fallbackResponse = this.selectFallbackResponse(errorType, context.currentPhase);

    return {
      text: fallbackResponse,
      isError: true,
      errorType,
      metadata: {
        isFallback: true,
        originalQuery: message
      }
    };
  }

  private selectFallbackResponse(errorType: string, phase?: string) {
    // Réponses de secours selon le type d'erreur et la phase
    const fallbacks = {
      connection: "Je semble rencontrer des difficultés à me connecter. Pourriez-vous vérifier votre connexion internet et réessayer dans quelques instants?",
      rate_limit: "J'ai discuté avec beaucoup de personnes récemment et j'ai besoin d'un petit moment de repos. Pourriez-vous réessayer dans quelques minutes?",
      server_error: "Je rencontre actuellement un petit souci technique. L'équipe s'efforce de résoudre cela rapidement. Pourriez-vous réessayer plus tard?"
    };

    // Réponse de base selon le type d'erreur
    return fallbacks[errorType as keyof typeof fallbacks] ||
      "Je ne peux pas répondre à votre demande pour le moment. Veuillez réessayer plus tard.";
  }

  private enforceRateLimits() {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;

    // Minimum 1 seconde entre les requêtes
    if (timeSinceLastRequest < 1000) {
      throw new Error('Requesting too quickly');
    }

    // Maximum 10 requêtes par minute
    if (this.requestsInLastMinute >= 10) {
      throw new Error('Rate limit exceeded');
    }

    // Mettre à jour les compteurs
    this.lastRequestTime = now;
    this.requestsInLastMinute++;

    // Réinitialiser le compteur de requêtes après une minute
    setTimeout(() => {
      this.requestsInLastMinute--;
    }, 60 * 1000);
  }
}
5.2 Hook de Conversation
typescript// features/conversation/hooks/useConversation.ts
import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../auth/state/selectors';
import { selectCurrentPhase, selectCycleDay } from '../../cycle/state/selectors';
import { claudeService } from '../../../infrastructure/api/claude';
import { Message, ConversationContext } from '../types';

export function useConversation() {
  const user = useSelector(selectCurrentUser);
  const currentPhase = useSelector(selectCurrentPhase);
  const cycleDay = useSelector(selectCycleDay);
  const [isTyping, setIsTyping] = useState(false);
  const queryClient = useQueryClient();

  // Récupérer l'historique de conversation
  const { data: messages = [], isLoading } = useQuery(
    ['conversation', user?.id],
    () => getConversationHistory(user?.id),
    {
      enabled: !!user?.id,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  // Préparation du contexte de conversation pour Claude
  const prepareConversationContext = useCallback(() => {
    return {
      user: {
        name: user?.name,
        id: user?.id,
      },
      currentPhase,
      cycleDay,
      approachPreferences: user?.preferences?.approaches || {},
      // Limiter l'historique aux 10 derniers messages
      conversationHistory: messages
        .slice(-10)
        .map(msg => ({
          role: msg.isUser ? 'user' : 'assistant',
          content: msg.text
        }))
    } as ConversationContext;
  }, [user, currentPhase, cycleDay, messages]);

  // Mutation pour envoyer un message
  const sendMessageMutation = useMutation(
    async (text: string) => {
      // Ajouter immédiatement le message utilisateur
      const userMessage: Message = {
        id: `msg_${Date.now()}`,
        text,
        timestamp: new Date().toISOString(),
        isUser: true,
      };

      // Mise à jour optimiste
      queryClient.setQueryData(
        ['conversation', user?.id],
        (old: Message[] = []) => [...old, userMessage]
      );

      setIsTyping(true);

      // Préparer le contexte pour Claude
      const context = prepareConversationContext();

      // Appeler l'API Claude
      const response = await claudeService.sendMessage(text, context);

      setIsTyping(false);

      // Créer le message de réponse
      const assistantMessage: Message = {
        id: `msg_${Date.now() + 1}`,
        text: response.text,
        timestamp: new Date().toISOString(),
        isUser: false,
        metadata: response.metadata
      };

      // Mettre à jour avec la réponse de Claude
      queryClient.setQueryData(
        ['conversation', user?.id],
        (old: Message[] = []) => [...old, assistantMessage]
      );

      return assistantMessage;
    }
  );

  // Sauvegarder un message dans le carnet de sagesse
  const saveMessageMutation = useMutation(
    (messageId: string) => saveMessageToWisdomBook(messageId, user?.id),
    {
      onSuccess: () => {
        // Mettre à jour l'UI ou afficher une notification
      }
    }
  );

  return {
    messages,
    isLoading,
    isTyping,
    sendMessage: sendMessageMutation.mutate,
    saveMessage: saveMessageMutation.mutate,
    isSending: sendMessageMutation.isLoading
  };
}
6. Gestion du Cycle Menstruel
6.1 Entités et Types
typescript// core/domain/entities/cycle.ts
export interface CycleEntity {
  id: string;
  userId: string;
  startDate: Date;
  endDate?: Date;
  durationDays: number;
  periodDurationDays: number;
  isActive: boolean;
  isRegular: boolean;
  notes?: string;
}

export interface CycleEntryEntity {
  id: string;
  cycleId: string;
  date: Date;
  day: number;
  phase: CyclePhase;
  symptoms: SymptomRecord[];
  mood?: MoodType;
  energy?: number;
  notes?: string;
}

export enum CyclePhase {
  MENSTRUAL = 'menstruelle',
  FOLLICULAR = 'folliculaire',
  OVULATORY = 'ovulatoire',
  LUTEAL = 'lutéale',
}

export interface SymptomRecord {
  type: SymptomType;
  intensity: number; // 1-5
}

export enum SymptomType {
  CRAMPS = 'cramps',
  HEADACHE = 'headache',
  BLOATING = 'bloating',
  TENDER_BREASTS = 'tender_breasts',
  FATIGUE = 'fatigue',
  ACNE = 'acne',
  BACKACHE = 'backache',
  NAUSEA = 'nausea',
  CRAVINGS = 'cravings',
  INSOMNIA = 'insomnia',
  // Autres symptômes...
}

export enum MoodType {
  HAPPY = 'happy',
  CALM = 'calm',
  ENERGETIC = 'energetic',
  ANXIOUS = 'anxious',
  IRRITABLE = 'irritable',
  SAD = 'sad',
  SENSITIVE = 'sensitive',
  FOCUSED = 'focused',
  // Autres humeurs...
}

export interface CyclePrediction {
  nextPeriodDate: Date;
  currentPhase: CyclePhase;
  currentDay: number;
  phaseEndDate: Date;
  ovulationDate?: Date;
  phaseStartDates: {
    [key in CyclePhase]: Date;
  };
  phaseDurations: {
    [key in CyclePhase]: number;
  };
  confidence: number; // 0-1
}
6.2 Use Cases
typescript// core/domain/usecases/CalculateCyclePredictions.ts
import { CyclePrediction, CycleEntity, CyclePhase } from '../entities/cycle';
import { CycleRepository } from '../repositories/CycleRepository';

export class CalculateCyclePredictions {
  constructor(private cycleRepository: CycleRepository) {}

  async execute(userId: string): Promise<CyclePrediction> {
    // Récupérer les données de cycle de l'utilisatrice
    const currentCycle = await this.cycleRepository.getCurrentCycle(userId);
    const historicalCycles = await this.cycleRepository.getHistoricalCycles(userId, 12);

    // Si pas de cycle actif, retourner une prédiction par défaut
    if (!currentCycle) {
      return this.getDefaultPrediction();
    }

    // Calculer la durée moyenne des cycles précédents
    const averageCycleLength = this.calculateAverageCycleLength(historicalCycles);

    // Calculer les durées de phase basées sur les données historiques
    const phaseDurations = this.calculatePhaseDurations(historicalCycles, averageCycleLength);

    // Calculer les dates de début de chaque phase pour le cycle actuel
    const phaseStartDates = this.calculatePhaseStartDates(currentCycle, phaseDurations);

    // Déterminer la phase actuelle et le jour du cycle
    const today = new Date();
    const { currentPhase, currentDay } = this.determineCurrentPhase(
      today,
      currentCycle.startDate,
      phaseStartDates
    );

    // Calculer la date de fin de la phase actuelle
    const phaseEndDate = this.calculatePhaseEndDate(
      currentPhase,
      phaseStartDates,
      phaseDurations
    );

    // Calculer la date estimée des prochaines règles
    const nextPeriodDate = new Date(currentCycle.startDate);
    nextPeriodDate.setDate(nextPeriodDate.getDate() + averageCycleLength);

    // Calculer la date d'ovulation estimée
    const ovulationDate = new Date(currentCycle.startDate);
    ovulationDate.setDate(ovulationDate.getDate() + Math.floor(averageCycleLength / 2) - 2);

    // Calculer le niveau de confiance basé sur la régularité des cycles
    const confidence = this.calculateConfidence(historicalCycles);

    return {
      nextPeriodDate,
      currentPhase,
      currentDay,
      phaseEndDate,
      ovulationDate,
      phaseStartDates,
      phaseDurations,
      confidence
    };
  }

  private calculateAverageCycleLength(cycles: CycleEntity[]): number {
    if (cycles.length === 0) return 28; // Valeur par défaut

    // Calculer une moyenne pondérée, donnant plus de poids aux cycles récents
    let totalWeight = 0;
    let weightedSum = 0;

    cycles.forEach((cycle, index) => {
      const weight = cycles.length - index; // Plus récent = plus de poids
      weightedSum += cycle.durationDays * weight;
      totalWeight += weight;
    });

    return Math.round(weightedSum / totalWeight);
  }

  // Autres méthodes de calcul...
}
6.3 Repository
typescript// core/data/repositories/CycleRepositoryImpl.ts
import { Database } from '@nozbe/watermelondb';
import { Q } from '@nozbe/watermelondb';
import { CycleRepository } from '../../domain/repositories/CycleRepository';
import { CycleEntity, CycleEntryEntity } from '../../domain/entities/cycle';
import { Cycle, CycleEntry } from '../../../infrastructure/storage/models';
import { CycleMapper } from '../mappers/CycleMapper';

export class CycleRepositoryImpl implements CycleRepository {
  constructor(private database: Database) {}

  async getCurrentCycle(userId: string): Promise<CycleEntity | null> {
    const cycles = await this.database
      .get<Cycle>('cycles')
      .query(
        Q.where('user_id', userId),
        Q.where('is_active', true)
      )
      .fetch();

    if (cycles.length === 0) return null;

    return CycleMapper.toDomain(cycles[0]);
  }

  async getHistoricalCycles(userId: string, limit: number): Promise<CycleEntity[]> {
    const cycles = await this.database
      .get<Cycle>('cycles')
      .query(
        Q.where('user_id', userId),
        Q.where('is_active', false),
        Q.sortBy('start_date', 'desc'),
        Q.take(limit)
      )
      .fetch();

    return cycles.map(CycleMapper.toDomain);
  }

  async saveCycle(cycle: CycleEntity): Promise<string> {
    let savedCycle;

    await this.database.action(async () => {
      if (cycle.id) {
        // Mise à jour d'un cycle existant
        const existingCycle = await this.database.get<Cycle>('cycles').find(cycle.id);
        savedCycle = await existingCycle.update(record => {
          CycleMapper.fromDomain(record, cycle);
        });
      } else {
        // Création d'un nouveau cycle
        savedCycle = await this.database.get<Cycle>('cycles').create(record => {
          CycleMapper.fromDomain(record, {
            ...cycle,
            id: '' // ID sera généré par Watermelon
          });
        });
      }
    });

    return savedCycle.id;
  }

  async saveCycleEntry(entry: CycleEntryEntity): Promise<string> {
    let savedEntry;

    await this.database.action(async () => {
      if (entry.id) {
        // Mise à jour d'une entrée existante
        const existingEntry = await this.database.get<CycleEntry>('cycle_entries').find(entry.id);
        savedEntry = await existingEntry.update(record => {
          CycleMapper.fromDomainEntry(record, entry);
        });
      } else {
        // Création d'une nouvelle entrée
        savedEntry = await this.database.get<CycleEntry>('cycle_entries').create(record => {
          CycleMapper.fromDomainEntry(record, {
            ...entry,
            id: '' // ID sera généré par Watermelon
          });
        });
      }
    });

    return savedEntry.id;
  }

  async getCycleEntriesForCycle(cycleId: string): Promise<CycleEntryEntity[]> {
    const entries = await this.database
      .get<CycleEntry>('cycle_entries')
      .query(
        Q.where('cycle_id', cycleId),
        Q.sortBy('date', 'asc')
      )
      .fetch();

    return entries.map(CycleMapper.toDomainEntry);
  }

  // Autres méthodes du repository...
}
7. Composants UI pour la Roue du Cycle
7.1 Composant de Roue de Phase
tsx// components/cycle/CycleWheel.tsx
import React, { useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Svg, { Path, Circle, G, Text as SvgText } from 'react-native-svg';
import { useTheme } from '../../theme/ThemeContext';
import { CyclePhase } from '../../core/domain/entities/cycle';

interface CycleWheelProps {
  currentPhase: CyclePhase;
  currentDay: number;
  phaseDurations: {
    [key in CyclePhase]: number;
  };
  totalDays: number;
  size?: number;
  onPhasePress?: (phase: CyclePhase) => void;
  showLabels?: boolean;
  interactive?: boolean;
}

export const CycleWheel: React.FC<CycleWheelProps> = ({
  currentPhase,
  currentDay,
  phaseDurations,
  totalDays,
  size = 250,
  onPhasePress,
  showLabels = true,
  interactive = true,
}) => {
  const { colors } = useTheme();
  const radius = size / 2;
  const strokeWidth = size * 0.05;

  // Couleurs des phases
  const phaseColors = {
    [CyclePhase.MENSTRUAL]: colors.phase.menstrual,
    [CyclePhase.FOLLICULAR]: colors.phase.follicular,
    [CyclePhase.OVULATORY]: colors.phase.ovulatory,
    [CyclePhase.LUTEAL]: colors.phase.luteal,
  };

  // Calculer les angles pour chaque phase
  const phaseAngles = useMemo(() => {
    const angles: { [key in CyclePhase]: { start: number; end: number } } = {
      [CyclePhase.MENSTRUAL]: { start: 0, end: 0 },
      [CyclePhase.FOLLICULAR]: { start: 0, end: 0 },
      [CyclePhase.OVULATORY]: { start: 0, end: 0 },
      [CyclePhase.LUTEAL]: { start: 0, end: 0 },
    };

    let currentAngle = 0;

    // Calculer les angles de début et fin pour chaque phase
    Object.entries(phaseDurations).forEach(([phase, duration]) => {
      const phaseAngle = (duration / totalDays) * 360;
      angles[phase as CyclePhase] = {
        start: currentAngle,
        end: currentAngle + phaseAngle,
      };
      currentAngle += phaseAngle;
    });

    return angles;
  }, [phaseDurations, totalDays]);

  // Générer les chemins SVG pour chaque section de la roue
  const phasePaths = useMemo(() => {
    return Object.entries(phaseAngles).map(([phase, angles]) => {
      const startAngle = angles.start;
      const endAngle = angles.end;

      // Convertir les angles en radians
      const startRad = (startAngle - 90) * (Math.PI / 180);
      const endRad = (endAngle - 90) * (Math.PI / 180);

      // Calculer les points de départ et d'arrivée
      const x1 = radius + (radius - strokeWidth) * Math.cos(startRad);
      const y1 = radius + (radius - strokeWidth) * Math.sin(startRad);
      const x2 = radius + (radius - strokeWidth) * Math.cos(endRad);
      const y2 = radius + (radius - strokeWidth) * Math.sin(endRad);

      // Flag pour les arcs larges
      const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

      // Construire le chemin SVG
      const path = `
        M ${radius} ${radius}
        L ${x1} ${y1}
        A ${radius - strokeWidth} ${radius - strokeWidth} 0 ${largeArcFlag} 1 ${x2} ${y2}
        L ${radius} ${radius}
      `;

      return { phase: phase as CyclePhase, path };
    });
  }, [phaseAngles, radius, strokeWidth]);

  // Calculer la position du marqueur de jour actuel
  const currentDayPosition = useMemo(() => {
    let dayCount = 0;

    // Trouver la phase actuelle et calculer les jours écoulés
    for (const [phase, duration] of Object.entries(phaseDurations)) {
      if (phase === currentPhase) {
        dayCount += currentDay;
        break;
      } else {
        dayCount += duration;
      }
    }

    // Calculer l'angle pour le jour actuel
    const currentAngle = (dayCount / totalDays) * 360 - 90;
    const currentRad = currentAngle * (Math.PI / 180);

    // Calculer la position du marqueur
    const x = radius + (radius - strokeWidth / 2) * Math.cos(currentRad);
    const y = radius + (radius - strokeWidth / 2) * Math.sin(currentRad);

    return { x, y };
  }, [currentPhase, currentDay, phaseDurations, totalDays, radius, strokeWidth]);

  // Gérer les interactions
  const handlePhasePress = (phase: CyclePhase) => {
    if (interactive && onPhasePress) {
      onPhasePress(phase);
    }
  };

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Dessiner les sections de la roue */}
        {phasePaths.map(({ phase, path }) => (
          <Path
            key={phase}
            d={path}
            fill={phaseColors[phase]}
            onPress={() => handlePhasePress(phase)}
          />
        ))}

        {/* Cercle central */}
        <Circle
          cx={radius}
          cy={radius}
          r={radius * 0.2}
          fill={colors.background}
        />

        {/* Marqueur du jour actuel */}
        <Circle
          cx={currentDayPosition.x}
          cy={currentDayPosition.y}
          r={strokeWidth * 0.6}
          fill={colors.white}
          stroke={colors.text}
          strokeWidth={1}
        />

        {/* Labels des phases si activés */}
        {showLabels && (
          <G>
            {Object.entries(phaseAngles).map(([phase, angles]) => {
              const midAngle = (angles.start + angles.end) / 2 - 90;
              const midRad = midAngle * (Math.PI / 180);
              const labelRadius = radius * 0.7;
              const x = radius + labelRadius * Math.cos(midRad);
              const y = radius + labelRadius * Math.sin(midRad);

              return (
                <SvgText
                  key={`label-${phase}`}
                  x={x}
                  y={y}
                  fontSize={size * 0.04}
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  fill={colors.text}
                >
                  {phase}
                </SvgText>
              );
            })}
          </G>
        )}
      </Svg>

      {/* Légende de la phase actuelle */}
      <View style={styles.currentPhaseContainer}>
        <Text style={styles.currentPhaseLabel}>
          Phase actuelle:
        </Text>
        <Text style={[
          styles.currentPhaseValue,
          { color: phaseColors[currentPhase] }
        ]}>
          {currentPhase} (Jour {currentDay})
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentPhaseContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  currentPhaseLabel: {
    fontSize: 14,
    color: '#666',
  },
  currentPhaseValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
});
7.2 Écran de Visualisation du Cycle
tsx// features/cycle/screens/CycleScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
Voici la fin du document architecture modulaire:
tsx// features/cycle/screens/CycleScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { selectCurrentCycle, selectCyclePredictions } from '../state/selectors';
import { fetchCycleData } from '../state/thunks';
import { CycleWheel } from '../../../components/cycle/CycleWheel';
import { PhaseInfoCard } from '../../../components/cycle/PhaseInfoCard';
import { CyclePhaseCharacteristics } from '../../../components/cycle/CyclePhaseCharacteristics';
import { Button } from '../../../components/common/Button';
import { Tabs } from '../../../components/common/Tabs';
import { Loading } from '../../../components/common/Loading';
import { useTheme } from '../../../theme/ThemeContext';
import { CyclePhase } from '../../../core/domain/entities/cycle';
import { useNavigation } from '@react-navigation/native';

export const CycleScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { colors, spacing } = useTheme();

  const cycle = useSelector(selectCurrentCycle);
  const predictions = useSelector(selectCyclePredictions);
  const isLoading = useSelector(state => state.cycle.loading);
  const error = useSelector(state => state.cycle.error);

  // Charger les données de cycle au montage
  useEffect(() => {
    dispatch(fetchCycleData());
  }, [dispatch]);

  // Gérer la pression sur une phase
  const handlePhasePress = (phase: CyclePhase) => {
    navigation.navigate('PhaseDetail', { phase });
  };

  // Gérer la navigation vers la saisie de symptômes
  const handleSymptomEntry = () => {
    navigation.navigate('SymptomEntry');
  };

  // Gérer la navigation vers l'historique
  const handleViewHistory = () => {
    navigation.navigate('CycleHistory');
  };

  // Onglets pour la navigation secondaire
  const tabs = [
    { key: 'phase', title: 'Ma phase' },
    { key: 'symptoms', title: 'Symptômes' },
    { key: 'history', title: 'Historique' },
  ];

  const [activeTab, setActiveTab] = React.useState('phase');

  // Afficher un chargement si les données ne sont pas encore disponibles
  if (isLoading) {
    return <Loading message="Chargement de votre cycle..." />;
  }

  // Afficher un message d'erreur si nécessaire
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Impossible de charger les données de votre cycle. Veuillez réessayer.
        </Text>
        <Button
          title="Réessayer"
          onPress={() => dispatch(fetchCycleData())}
          variant="primary"
        />
      </View>
    );
  }

  // Si pas de cycle actif, afficher un message
  if (!cycle || !predictions) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Aucun cycle actif. Commencez par enregistrer vos dernières règles.
        </Text>
        <Button
          title="Enregistrer mes règles"
          onPress={() => navigation.navigate('CycleSetup')}
          variant="primary"
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Mon Cycle</Text>

        {/* Roue du cycle */}
        <View style={styles.wheelContainer}>
          <CycleWheel
            currentPhase={predictions.currentPhase}
            currentDay={predictions.currentDay}
            phaseDurations={predictions.phaseDurations}
            totalDays={cycle.durationDays}
            size={280}
            onPhasePress={handlePhasePress}
            showLabels={true}
            interactive={true}
          />
        </View>

        {/* Onglets */}
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          style={styles.tabs}
        />

        {/* Contenu selon l'onglet actif */}
        {activeTab === 'phase' && (
          <View style={styles.tabContent}>
            <PhaseInfoCard
              phase={predictions.currentPhase}
              daysInPhase={`Jours ${predictions.currentDay} - ${predictions.phaseDurations[predictions.currentPhase]}`}
              dates={`Du ${new Date(predictions.phaseStartDates[predictions.currentPhase]).toLocaleDateString()} au ${new Date(predictions.phaseEndDate).toLocaleDateString()}`}
              style={styles.card}
            />

            <CyclePhaseCharacteristics
              phase={predictions.currentPhase}
              style={styles.characteristics}
            />

            <Button
              title="Explorer les conseils pour cette phase"
              onPress={() => navigation.navigate('PhaseAdvice', { phase: predictions.currentPhase })}
              variant="secondary"
              style={styles.exploreButton}
            />
          </View>
        )}

        {activeTab === 'symptoms' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>
              Symptômes du jour {predictions.currentDay}
            </Text>

            {/* Liste des symptômes récents ou message si aucun */}
            <View style={styles.symptomsContainer}>
              <Text style={styles.emptyText}>
                Aucun symptôme enregistré aujourd'hui.
              </Text>

              <Button
                title="Enregistrer mes symptômes"
                onPress={handleSymptomEntry}
                variant="primary"
                style={styles.symptomButton}
              />
            </View>
          </View>
        )}

        {activeTab === 'history' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>
              Historique de vos cycles
            </Text>

            <Text style={styles.statsText}>
              Durée moyenne: {cycle.durationDays} jours
            </Text>

            <Text style={styles.statsText}>
              Durée moyenne des règles: {cycle.periodDurationDays} jours
            </Text>

            <Button
              title="Voir l'historique détaillé"
              onPress={handleViewHistory}
              variant="secondary"
              style={styles.historyButton}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  wheelContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  tabs: {
    marginTop: 16,
  },
  tabContent: {
    marginTop: 16,
  },
  card: {
    marginBottom: 16,
  },
  characteristics: {
    marginBottom: 20,
  },
  exploreButton: {
    marginTop: 8,
  },
  symptomsContainer: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    alignItems: 'center',
  },
  symptomButton: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  statsText: {
    fontSize: 16,
    marginBottom: 8,
  },
  historyButton: {
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: 'red',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
});
8. Gestion du State Redux
8.1 Store Configuration
typescript// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { combineReducers } from 'redux';
import logger from 'redux-logger';

// Importation des slices
import authReducer from '../features/authentication/state/authSlice';
import cycleReducer from '../features/cycle/state/cycleSlice';
import wisdomReducer from '../features/wisdom/state/wisdomSlice';
import settingsReducer from '../features/settings/state/settingsSlice';

// Middleware personnalisés
import { offlineMiddleware } from './middleware/offlineMiddleware';
import { analyticsMiddleware } from './middleware/analyticsMiddleware';

// Création du root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  cycle: cycleReducer,
  wisdom: wisdomReducer,
  settings: settingsReducer,
});

// Type pour le state global
export type RootState = ReturnType<typeof rootReducer>;

// Configuration du store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({
      serializableCheck: {
        // Ignorer certaines actions non sérialisables (comme les Dates)
        ignoredActions: ['cycle/setCycleData', 'cycle/setPredictions'],
        // Ignorer certains chemins dans le state
        ignoredPaths: ['cycle.currentCycle.startDate', 'cycle.predictions.nextPeriodDate'],
      },
    }).concat(offlineMiddleware, analyticsMiddleware);

    // Ajouter le logger en développement uniquement
    if (__DEV__) {
      middleware.push(logger);
    }

    return middleware;
  },
});

// Setup listeners pour les requêtes RTK Query
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export default store;
8.2 Exemple de Slice pour le Cycle
typescript// features/cycle/state/cycleSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CycleEntity, CycleEntryEntity, CyclePrediction, CyclePhase } from '../../../core/domain/entities/cycle';

interface CycleState {
  currentCycle: CycleEntity | null;
  predictions: CyclePrediction | null;
  historicalCycles: CycleEntity[];
  entries: { [key: string]: CycleEntryEntity[] }; // Clé = ID du cycle
  loading: boolean;
  error: string | null;
}

const initialState: CycleState = {
  currentCycle: null,
  predictions: null,
  historicalCycles: [],
  entries: {},
  loading: false,
  error: null,
};

const cycleSlice = createSlice({
  name: 'cycle',
  initialState,
  reducers: {
    fetchCycleStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    setCycleData: (state, action: PayloadAction<CycleEntity>) => {
      state.currentCycle = action.payload;
      state.loading = false;
    },
    setPredictions: (state, action: PayloadAction<CyclePrediction>) => {
      state.predictions = action.payload;
    },
    setHistoricalCycles: (state, action: PayloadAction<CycleEntity[]>) => {
      state.historicalCycles = action.payload;
      state.loading = false;
    },
    setCycleEntries: (state, action: PayloadAction<{ cycleId: string, entries: CycleEntryEntity[] }>) => {
      const { cycleId, entries } = action.payload;
      state.entries[cycleId] = entries;
    },
    addCycleEntry: (state, action: PayloadAction<CycleEntryEntity>) => {
      const entry = action.payload;
      if (!state.entries[entry.cycleId]) {
        state.entries[entry.cycleId] = [];
      }

      // Vérifier si l'entrée existe déjà et la remplacer le cas échéant
      const index = state.entries[entry.cycleId].findIndex(e =>
        e.date.toDateString() === entry.date.toDateString()
      );

      if (index !== -1) {
        state.entries[entry.cycleId][index] = entry;
      } else {
        state.entries[entry.cycleId].push(entry);
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    resetCycleState: () => initialState,
  },
});

export const {
  fetchCycleStart,
  setCycleData,
  setPredictions,
  setHistoricalCycles,
  setCycleEntries,
  addCycleEntry,
  setError,
  resetCycleState,
} = cycleSlice.actions;

export default cycleSlice.reducer;
8.3 Thunks pour Actions Asynchrones
typescript// features/cycle/state/thunks.ts
import { AppDispatch, RootState } from '../../../store';
import {
  fetchCycleStart,
  setCycleData,
  setPredictions,
  setHistoricalCycles,
  setCycleEntries,
  addCycleEntry,
  setError,
} from './cycleSlice';
import { CycleRepository } from '../../../core/domain/repositories/CycleRepository';
import { CalculateCyclePredictions } from '../../../core/domain/usecases/CalculateCyclePredictions';
import { CycleEntryEntity, SymptomRecord, MoodType } from '../../../core/domain/entities/cycle';
import { dependencyContainer } from '../../../di/container';

// Récupérer les dépendances du conteneur d'injection
const cycleRepository = dependencyContainer.resolve<CycleRepository>('CycleRepository');
const calculateCyclePredictions = dependencyContainer.resolve<CalculateCyclePredictions>('CalculateCyclePredictions');

// Charger les données du cycle pour l'utilisatrice actuelle
export const fetchCycleData = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    dispatch(fetchCycleStart());

    const { auth } = getState();
    const userId = auth.user?.id;

    if (!userId) {
      throw new Error('User not authenticated');
    }

    // Récupérer le cycle courant
    const currentCycle = await cycleRepository.getCurrentCycle(userId);

    if (currentCycle) {
      dispatch(setCycleData(currentCycle));

      // Récupérer les entrées du cycle
      const entries = await cycleRepository.getCycleEntriesForCycle(currentCycle.id);
      dispatch(setCycleEntries({ cycleId: currentCycle.id, entries }));

      // Calculer les prédictions
      const predictions = await calculateCyclePredictions.execute(userId);
      dispatch(setPredictions(predictions));
    }

    // Récupérer l'historique des cycles
    const historicalCycles = await cycleRepository.getHistoricalCycles(userId, 12);
    dispatch(setHistoricalCycles(historicalCycles));
  } catch (error) {
    dispatch(setError(error instanceof Error ? error.message : 'Unknown error'));
    console.error('Error fetching cycle data:', error);
  }
};

// Ajouter une entrée de symptômes pour la journée
export const addSymptomEntry = (
  symptoms: SymptomRecord[],
  mood?: MoodType,
  energy?: number,
  notes?: string
) => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const { auth, cycle } = getState();
    const userId = auth.user?.id;
    const currentCycle = cycle.currentCycle;

    if (!userId || !currentCycle) {
      throw new Error('User not authenticated or no active cycle');
    }

    // Créer une nouvelle entrée
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normaliser la date pour éviter les duplications

    // Calculer le jour du cycle
    const startDate = new Date(currentCycle.startDate);
    startDate.setHours(0, 0, 0, 0);
    const dayDiff = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    // Déterminer la phase actuelle
    const { predictions } = cycle;
    if (!predictions) {
      throw new Error('Cycle predictions not available');
    }

    const entry: CycleEntryEntity = {
      id: '', // Sera généré par le repository
      cycleId: currentCycle.id,
      date: today,
      day: dayDiff,
      phase: predictions.currentPhase,
      symptoms,
      mood,
      energy,
      notes,
    };

    // Sauvegarder dans le repository
    const entryId = await cycleRepository.saveCycleEntry(entry);

    // Mettre à jour le state avec l'ID généré
    dispatch(addCycleEntry({
      ...entry,
      id: entryId,
    }));

    return entryId;
  } catch (error) {
    dispatch(setError(error instanceof Error ? error.message : 'Unknown error'));
    console.error('Error adding symptom entry:', error);
    throw error;
  }
};
9. Conclusion
Cette architecture modulaire pour MoodCycle offre une fondation robuste pour le développement progressif de l'application. Les principales caractéristiques incluent:

Séparation claire des responsabilités entre UI, logique métier et données
Modularité et extensibilité permettant d'ajouter des fonctionnalités sans refonte majeure
Gestion d'état cohérente avec Redux pour l'état global et React Query pour les données distantes
Approche offline-first avec synchronisation robuste pour une expérience utilisateur optimale
Abstraction des services externes comme l'API Claude pour faciliter les tests et l'évolution
Composants UI réutilisables comme la roue des phases qui peuvent évoluer indépendamment

Cette architecture servira de guide pour implémenter le MVP minimal défini dans le document de transition, tout en permettant une évolution fluide vers les fonctionnalités plus avancées dans les phases ultérieures du développement.
---

Document approuvé le: 29/04/2025
Version: 1.0
