# 🌙 MoodCycle

**Application de suivi du cycle menstruel avec IA conversationnelle**

MoodCycle est une application React Native qui accompagne les femmes dans la compréhension de leur cycle menstruel grâce à Melune, une IA bienveillante et personnalisée.

## ✨ Fonctionnalités

- 🗣️ **Chat conversationnel avec Melune** - IA personnalisée pour conseils et support
- 📊 **Roue du cycle interactive** - Visualisation intuitive des phases menstruelles  
- 📝 **Carnet personnel** - Journal intime et notes quotidiennes
- 🎯 **Insights personnalisés V2** - Recommandations basées sur 5 personas (Emma, Laure, Sylvie, Christine, Clara)
- 🤖 **Système de personas intelligent** - Mapping automatique selon âge, préférences et communication
- 🌙 **Onboarding conversationnel** - 7 écrans d'introduction avec Melune incluant sélection d'âge
- 🔄 **Sync multi-appareils** - Données disponibles partout, même hors ligne
- 🧪 **Interfaces de debug** - Outils de développement pour personas et insights

## 🏗️ Architecture Technologique

### Stack Principale
- **Framework** : React Native + Expo (SDK 53)
- **Navigation** : Expo Router (file-based routing)
- **Language** : TypeScript
- **UI** : React Native + Expo Linear Gradient + React Native SVG

### État & Données (Offline-First)
- **State Management** : Zustand (migration depuis Context API)
- **Server State** : TanStack Query v5
- **Backend** : Supabase (PostgreSQL + Realtime + Auth + Edge Functions)
- **Cache Local** : AsyncStorage + persistence Zustand
- **Détection Réseau** : @react-native-community/netinfo

### Navigation & UX
- **4 onglets principaux** : Accueil, Cycle, Melune (Chat), Carnet
- **Safe Area** : react-native-safe-area-context avec hooks
- **Icônes** : @expo/vector-icons (Ionicons)
- **Fonts** : Quintessential (titres) + Quicksand (corps)

### Fonctionnalités Prévues
- **Auth** : Supabase Auth (OAuth, Magic Links, Biométrie iOS)
- **IA** : Edge Functions Supabase pour logique Melune
- **Insights** : Calculs prédictifs et recommandations personnalisées
- **Sync Temps Réel** : Supabase Realtime pour multi-appareils
- **Export Données** : Rapports cycle + insights

## 📁 Structure du Projet

```
MoodCycle/
├── app/                           # 🚀 Expo Router (Routes)
│   ├── _layout.jsx               # Layout racine + Providers
│   ├── index.jsx                 # Redirection vers tabs
│   ├── onboarding/               # Flow conversationnel Melune (8 écrans)
│   │   ├── 100-promesse.jsx     # Promesse confidentialité
│   │   ├── 200-rencontre.jsx    # Première rencontre Melune
│   │   ├── 300-confiance.jsx    # Établir confiance
│   │   ├── 375-age.jsx          # Sélection tranche d'âge (5 choix)
│   │   ├── 400-cycle.jsx        # Conversation cycle
│   │   ├── 500-preferences.jsx  # Préférences conseils
│   │   ├── 600-avatar.jsx       # Personnalisation Melune
│   │   └── 800-cadeau.jsx       # Cadeau bienvenue
│   └── (tabs)/                   # Navigation principale
│       ├── home/                 # Accueil + insights
│       ├── cycle/                # Roue cycle + phases
│       ├── chat/                 # Conversations Melune
│       └── notebook/             # Carnet personnel
├── stores/                        # 🏪 Zustand Stores (State Management)
│   ├── useUserStore.js           # Profil utilisateur + préférences
│   ├── useCycleStore.js          # Données cycle + phases
│   ├── useChatStore.js           # Historique conversations Melune
│   ├── useOnboardingStore.js     # Gestion onboarding + système personas
│   └── useAppStore.js            # État global app
├── services/                      # 🔌 Services & API
│   ├── supabase.js               # Configuration client Supabase
│   ├── api/                      # TanStack Query hooks
│   │   ├── auth.js              # Authentification
│   │   ├── cycle.js             # API cycle + insights
│   │   └── chat.js              # API conversations IA
│   ├── offline/                  # Gestion offline-first
│   │   ├── queue.js             # Queue actions offline
│   │   └── sync.js              # Synchronisation
│   └── storage/                  # Persistence locale
│       └── cache.js             # Gestion cache
├── components/                    # 🎨 Composants UI
│   ├── ChatBubble/              # Bulles conversation Melune
│   ├── CycleWheel/              # Roue interactive cycle
│   ├── MeluneAvatar/            # Avatar IA personnalisé
│   ├── InsightCard/             # Cartes recommandations
│   ├── Typography/              # Système typographique
│   └── DevNavigation/           # Navigation développement
├── hooks/                         # 🎣 Custom Hooks
│   └── useCycleData.js          # Hook données cycle
├── utils/                         # 🛠️ Utilitaires
│   ├── dateUtils.js             # Gestion dates cycle
│   ├── personaCalculator.js     # Algorithme de calcul personas
│   └── colors.js                # Palette couleurs
├── data/                          # 📊 Données Statiques
│   ├── phases.json              # Définitions phases cycle
│   ├── insights.json            # Templates insights avec personas
│   ├── insights-personalized.js # Moteur insights V1 (legacy)
│   └── insights-personalized-v2.js # Moteur insights V2 avec personas
├── constants/                     # 📏 Constantes
├── config/                        # ⚙️ Configuration
│   └── personaProfiles.js        # Profils des 5 personas de référence
└── assets/                        # 🎭 Ressources
    ├── fonts/                    # Quintessential + Quicksand
    └── images/melune/           # Avatars Melune
```

## 🚀 Installation

### Prérequis
- Node.js 18+
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator ou Android Emulator

### Configuration

1. **Cloner le projet**
   ```bash
   git clone https://github.com/votre-repo/MoodCycle.git
   cd MoodCycle
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configuration Supabase** (à venir)
   ```bash
   cp .env.example .env.local
   # Ajouter vos clés Supabase
   ```

4. **Lancer l'application**
   ```bash
   npm start
   # Puis 'i' pour iOS ou 'a' pour Android
   ```

## 🏆 Roadmap

### ✅ Phase 1 - Foundation (Terminée)
- [x] Architecture Expo Router avec 4 onglets
- [x] Navigation fonctionnelle + Safe Area
- [x] Composants de base (CycleWheel, ChatBubble, MeluneAvatar)
- [x] Flow onboarding conversationnel (7 écrans)
- [x] Chat interface avec input optimisé

### ✅ Phase 2 - State Management (Terminée)
- [x] Installation Zustand + TanStack Query + NetInfo
- [x] Architecture offline-first définie
- [x] Migration OnboardingContext vers useOnboardingStore
- [x] Système de personas intelligent (5 profils : Emma, Laure, Sylvie, Christine, Clara)
- [x] Algorithme de mapping automatique (âge + préférences + communication)
- [x] Insights personnalisés V2 avec variants par persona
- [x] Interfaces de debug complètes (/debug/persona et /debug/insights-v2)
- [x] Écran sélection d'âge dans onboarding (375-age.jsx)

### 🎯 Phase 3 - Backend Supabase (Prochaine)
- [ ] Configuration projet Supabase + schéma BDD
- [ ] Intégration Supabase Auth (OAuth + Magic Links)
- [ ] API endpoints pour cycle, chat, insights
- [ ] Edge Functions pour logique IA Melune
- [ ] Sync temps réel multi-appareils

### 🚀 Phase 4 - Fonctionnalités Avancées
- [ ] Calculs prédictifs cycle + ovulation
- [ ] IA conversationnelle Melune avancée (GPT-4 integration)
- [x] Insights personnalisés + recommandations (V2 avec personas)
- [ ] Export données + rapports
- [ ] Notifications push intelligentes

### 💎 Phase 5 - Polish & Production
- [ ] Tests automatisés (Jest + Maestro)
- [ ] Performance optimizations
- [ ] Accessibilité complète
- [ ] App Store + Play Store
- [ ] Analytics + monitoring

## 🧪 Développement

### Scripts disponibles
```bash
npm start          # Démarrer Expo Dev Server
npm run android    # Lancer sur Android
npm run ios        # Lancer sur iOS  
npm run web        # Lancer sur Web
npm test          # Tests unitaires
```

### Architecture de développement
- **Hot Reload** : Modifications instantanées
- **Dev Navigation** : Composant debug pour navigation rapide
- **TypeScript** : Vérification types en temps réel
- **Safe Area** : Gestion automatique avec hooks

## 🤝 Contribution

### Guidelines
1. Respecter l'architecture Expo Router (app/ pour routes uniquement)
2. Utiliser Zustand pour le state management
3. TanStack Query pour les appels API
4. TypeScript obligatoire
5. Composants modulaires et réutilisables

### Workflow
1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/ma-feature`)
3. Commit avec messages clairs
4. Push et créer une Pull Request

## 📖 Documentation

- **[NAVIGATION_ARCHITECTURE.md](./NAVIGATION_ARCHITECTURE.md)** - Architecture navigation détaillée
- **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** - Système de design et composants

## 📄 Licence

MIT License - voir [LICENSE](./LICENSE) pour plus de détails.

---

**Développé avec 💜 pour accompagner chaque femme dans son cycle naturel** 