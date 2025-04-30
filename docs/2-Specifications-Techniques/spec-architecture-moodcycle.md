# Architecture Technique de MoodCycle

## Table des matières
1. [Principes Architecturaux](#1-principes-architecturaux)
    1. [Principes Directeurs](#11-principes-directeurs)
    2. [Pattern d'Architecture](#12-pattern-darchitecture)
    3. [Flux de Données](#13-flux-de-données)
2. [Choix Technologiques](#2-choix-technologiques)
    1. [Frontend (Mobile)](#21-frontend-mobile)
    2. [Backend](#22-backend)
    3. [Données et Synchronisation](#23-données-et-synchronisation)
    4. [Outils de Développement](#24-outils-de-développement) 
3. [Structure des Modules](#3-structure-des-modules)
    1. [Organisation du Code](#31-organisation-du-code)
    2. [Modules Fonctionnels](#32-modules-fonctionnels)
4. [Gestion d'État](#4-gestion-détat)
    1. [Architecture Redux](#41-architecture-redux)
    2. [Organisation par Slices](#42-organisation-par-slices)
    3. [Sélecteurs Memoized](#43-sélecteurs-memoized)
    4. [État Local vs Global](#44-état-local-vs-global)
    5. [React Query pour les Données Distantes](#45-react-query-pour-les-données-distantes)
5. [Persistence et Synchronisation](#5-persistence-et-synchronisation)
    1. [Architecture de Stockage](#51-architecture-de-stockage)
    2. [Modèles de Données](#52-modèles-de-données)
    3. [Repositories](#53-repositories)
    4. [Synchronisation](#54-synchronisation)
6. [Intégration Claude API](#6-intégration-claude-api)
    1. [Service d'Abstraction](#61-service-dabstraction)
    2. [Hook de Conversation](#62-hook-de-conversation)
7. [Composants UI Spécifiques](#7-composants-ui-spécifiques)
    1. [Roue des Phases du Cycle](#71-roue-des-phases-du-cycle)
    2. [Avatar Melune](#72-avatar-melune)
8. [Évolutivité et Perspectives](#8-évolutivité-et-perspectives)
    1. [Préparation à l'Évolution](#81-préparation-à-lévolution)
    2. [Version Web Future](#82-version-web-future)

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

L'architecture de MoodCycle suit le pattern **Clean Architecture** avec MVVM pour la couche présentation:

| Couche | Responsabilité | Composants |
|--------|----------------|------------|
| **Présentation** | UI et interaction utilisateur | Screens, Components, ViewModels |
| **Domain** | Logique métier pure | Use Cases, Entities |
| **Data** | Accès aux données | Repositories, Services |
| **Infrastructure** | Intégrations techniques | Frameworks, Drivers |

Cette architecture assure:
- Une séparation claire des responsabilités
- Une testabilité accrue
- Une facilité de maintenance
- Une adaptation aux évolutions des spécifications

### 1.3 Flux de Données

Le flux de données suit un modèle unidirectionnel inspiré de Redux:

1. **Actions** - Déclenchées par les interactions utilisateur
2. **Reducers** - Transforment l'état en fonction des actions
3. **Selectors** - Extraient et formatent les données pour l'UI
4. **Effects** - Gèrent les opérations asynchrones et effets de bord

Ce pattern assure une prédictibilité du comportement de l'application et facilite le débogage.

## 2. Choix Technologiques

### 2.1 Frontend (Mobile)

#### Framework Principal: React Native + Expo

| Critère | Choix | Justification |
|---------|-------|---------------|
| Framework UI | React Native + Expo | Développement cross-platform, écosystème riche, expérience développeur optimisée |
| Gestion d'état | Redux Toolkit + React Query | Gestion robuste de l'état global + données distantes avec mise en cache |
| UI & Design System | React Native Paper + Tailwind RN | Composants Material Design + stylisation flexible et consistante |

**Alternatives considérées**:
- Flutter: Performances natives excellentes, mais écosystème moins mature et moins de développeurs disponibles
- Swift/Kotlin natif: Meilleures performances mais nécessite deux bases de code distinctes
- Ionic: Plus simple mais performances inférieures pour des animations complexes

### 2.2 Backend

#### Services principaux: Firebase + Cloud Functions

| Service | Utilisation | Avantages |
|---------|-------------|-----------|
| Firebase Firestore | Base de données NoSQL | Temps réel, scaling automatique, synchronisation offline |
| Firebase Authentication | Gestion des utilisateurs | Sécurité robuste, méthodes multiples, facile à intégrer |
| Cloud Functions | Logique serveur | Serverless, scaling automatique, intégration API Claude |
| Firebase Storage | Stockage médias | Gestion efficace des ressources utilisateur |

**Alternatives considérées**:
- Backend Express.js + MongoDB: Plus de contrôle mais nécessite infrastructure dédiée
- AWS Amplify: Similaire à Firebase mais courbe d'apprentissage plus raide
- Supabase: Alternative open-source prometteuse mais moins mature

### 2.3 Données et Synchronisation

#### Stockage et Synchronisation: WatermelonDB + Firestore

| Technologie | Fonction | Avantages |
|-------------|----------|-----------|
| WatermelonDB | Base de données locale | Performant, réactif, optimisé pour React Native |
| Synchronisation bidirectionnelle | Gestion offline | Support pour les modifications hors-ligne |
| Architecture offline-first | Expérience utilisateur | Fonctionnalités complètes sans connexion |

**Architecture de données**:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Offline-First  │◄───┤ Change Tracking │◄───┤ Conflict        │
│  Data Storage   │    │ & Queuing       │    │ Resolution      │
└────────┬────────┘    └────────┬────────┘    └────────┬────────┘
         │                      │                      │
         ▼                      ▼                      ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Periodic       │───►│  Incremental    │───►│  Data           │
│  Synchronization│    │  Updates        │    │  Validation     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 2.4 Outils de Développement

| Catégorie | Outils | Justification |
|-----------|--------|---------------|
| Testing | Jest + Testing Library + Detox | Tests unitaires, d'intégration et E2E |
| CI/CD | GitHub Actions + EAS | Intégration avec repository, déploiement simplifié |
| Monitoring | Firebase Analytics + Sentry | Analyse d'usage + monitoring d'erreurs |

## 3. Structure des Modules

### 3.1 Organisation du Code

```
src/
├── app/                      # Point d'entrée de l'application
│   ├── App.tsx               # Composant racine
│   ├── AppProvider.tsx       # Providers globaux
│   └── AppNavigation.tsx     # Configuration navigation
│
├── assets/                   # Ressources statiques
│
├── components/               # Composants UI réutilisables
│   ├── common/               # Composants génériques
│   ├── cycle/                # Composants du cycle
│   ├── conversation/         # Composants conversation
│   └── wisdom/               # Composants carnet de sagesse
│
├── core/                     # Noyau fonctionnel
│   ├── domain/               # Modèles et logique métier
│   │   ├── entities/         # Entités du domaine
│   │   ├── usecases/         # Cas d'utilisation
│   │   ├── repositories/     # Interfaces repositories
│   │   └── services/         # Interfaces services
│   │
│   ├── data/                 # Accès aux données
│   │   ├── repositories/     # Implémentation repos
│   │   ├── datasources/      # Sources de données
│   │   ├── models/           # Modèles de données
│   │   └── mappers/          # Conversion modèles/entités
│
├── features/                 # Modules fonctionnels
│   ├── authentication/       # Authentification
│   ├── onboarding/           # Flux d'onboarding
│   ├── cycle-tracking/       # Suivi du cycle
│   ├── conversation/         # Interaction avec Melune
│   ├── wisdom-book/          # Carnet de sagesse
│   └── rituals/              # Rituels personnalisés
│
├── infrastructure/           # Services d'infrastructure
│   ├── api/                  # Configuration APIs
│   │   └── claude/           # Client API Claude
│   ├── storage/              # Services stockage local
│   ├── sync/                 # Services synchronisation
│   └── analytics/            # Services analytiques
│
├── navigation/               # Configuration navigation
│
├── store/                    # Gestion d'état global
│   ├── slices/               # Slices Redux
│
├── theme/                    # Système de design
│
└── utils/                    # Utilitaires partagés
```

### 3.2 Modules Fonctionnels

Chaque module fonctionnel (dans `features/`) suit une structure cohérente:

```
features/cycle-tracking/
├── components/               # Composants spécifiques
├── screens/                  # Écrans du module
├── hooks/                    # Hooks spécifiques
├── state/                    # État local au module
└── utils/                    # Utilitaires spécifiques
```

Cette structure modulaire permet:
- Une séparation claire des responsabilités
- Un développement parallèle des fonctionnalités
- Une réutilisation et extension facilitées
- Une testabilité améliorée

## 4. Gestion d'État

### 4.1 Architecture Redux

La gestion d'état global utilise Redux Toolkit pour une configuration simplifiée:

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

### 4.2 Organisation par Slices

L'état global est divisé en slices indépendantes par fonctionnalité:

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
});

export const { setCycleData } = cycleSlice.actions;
export default cycleSlice.reducer;
```

### 4.3 Sélecteurs Memoized

Les sélecteurs utilisent la memoization pour optimiser les performances:

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

### 4.4 État Local vs Global

| Type d'État | Usage | Exemples |
|-------------|-------|----------|
| **État Global** (Redux) | Données partagées entre composants | Données du cycle, profil utilisateur |
| | Persistance entre navigations | Préférences de l'app |
| | Données synchronisées avec backend | Historique des conseils sauvegardés |
| **État Local** (useState/useReducer) | État UI spécifique à un écran | Focus, collapse, animations |
| | Formulaires et saisies temporaires | Input de conversation, filtres temporaires |
| | États transitoires | Feedback visuel, tooltips |

### 4.5 React Query pour les Données Distantes

Pour les données provenant d'APIs (Claude, backend), React Query est utilisé:

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

## 5. Persistence et Synchronisation

### 5.1 Architecture de Stockage

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

### 5.2 Modèles de Données

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

### 5.3 Repositories

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

### 5.4 Synchronisation

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
```

## 6. Intégration Claude API

### 6.1 Service d'Abstraction

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
  
  // Autres méthodes de gestion...
}
```

### 6.2 Hook de Conversation

```javascript
// features/conversation/hooks/useConversation.ts
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
      // Ajout immédiatement le message utilisateur pour UX
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
  
  return {
    messages,
    isLoading,
    isTyping,
    sendMessage: sendMessageMutation.mutate,
    isSending: sendMessageMutation.isLoading
  };
}
```

## 7. Composants UI Spécifiques

### 7.1 Roue des Phases du Cycle

Le composant central de l'application est la roue des phases interactive:

```jsx
// components/cycle/CycleWheel.tsx
import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
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
    const angles = {
      [CyclePhase.MENSTRUAL]: { start: 0, end: 0 },
      [CyclePhase.FOLLICULAR]: { start: 0, end: 0 },
      [CyclePhase.OVULATORY]: { start: 0, end: 0 },
      [CyclePhase.LUTEAL]: { start: 0, end: 0 },
    };
    
    let currentAngle = 0;
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
  
  // Rendu de la roue (SVG paths, interaction handlers, etc.)
  
  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {/* Rendu des segments de phases */}
        {/* Marqueur de jour actuel */}
        {/* Labels et éléments interactifs */}
      </Svg>
    </View>
  );
};


---

Document approuvé le: 29/04/2025
Version: 1.0