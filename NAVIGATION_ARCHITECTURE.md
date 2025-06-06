# Architecture de Navigation - MoodCycle

## 🏗️ Structure Générale

L'application utilise **Expo Router** avec une architecture de navigation en onglets (tabs) et un flux d'onboarding.

```
app/
├── _layout.jsx                  # Layout racine avec SafeAreaProvider
├── index.jsx                   # Redirection vers /(tabs)/home
├── onboarding/                 # Flux d'onboarding conversationnel avec Melune (7 écrans)
│   ├── _layout.jsx            # Layout Stack pour onboarding
│   ├── 100-promesse.jsx       # Promesse de confidentialité et engagement
│   ├── 200-rencontre.jsx      # Première rencontre avec Melune
│   ├── 300-confiance.jsx      # Établir la confiance et partage
│   ├── 400-cycle.jsx          # Conversation sur le cycle menstruel
│   ├── 500-preferences.jsx    # Préférences de conseils personnalisés
│   ├── 600-avatar.jsx         # Personnalisation de l'avatar Melune
│   └── 700-cadeau.jsx         # Cadeau de bienvenue et finalisation
└── (tabs)/
    ├── _layout.jsx            # Configuration des 4 onglets + icônes
    ├── home/
    │   ├── _layout.jsx        # Layout Stack simple
    │   └── index.jsx          # Page avec useSafeAreaInsets
    ├── cycle/
    │   ├── _layout.jsx        # Layout Stack + routes phases
    │   ├── index.jsx
    │   └── phases/[id].jsx
    ├── chat/
    │   ├── _layout.jsx        # Layout Stack simple
    │   └── index.jsx          # Page avec useSafeAreaInsets + paddingBottom
    └── notebook/
        ├── _layout.jsx        # Layout Stack simple
        └── index.jsx
```

## 🌙 Flux d'Onboarding Conversationnel avec Melune

### Navigation linéaire (7 écrans)
1. **100-promesse.jsx** - Promesse de confidentialité et engagement personnel
2. **200-rencontre.jsx** - Première rencontre avec Melune, introduction chaleureuse
3. **300-confiance.jsx** - Établir la confiance, partage des valeurs 
4. **400-cycle.jsx** - Conversation naturelle sur le cycle menstruel
5. **500-preferences.jsx** - Découverte des préférences de conseils (médical, naturo, spirituel)
6. **600-avatar.jsx** - Personnalisation de l'apparence et du ton de Melune
7. **700-cadeau.jsx** - Cadeau de bienvenue et transition vers l'app → `router.replace('/(tabs)/home')`

### Structure des écrans conversationnels
```jsx
// Exemple type pour chaque écran conversationnel avec Melune
import { useOnboarding } from '../../contexts/OnboardingContext';

export default function ConversationalScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { updateUserInfo, updatePreferences } = useOnboarding();
  
  const handleContinue = (collectedData) => {
    // Sauvegarder les données collectées dans le context
    updateUserInfo(collectedData);
    router.push('/onboarding/[next-screen]');
  };
  
  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      {/* Avatar Melune */}
      <MeluneAvatar mood="welcoming" />
      
      {/* Conversation naturelle */}
      <View style={styles.conversationContainer}>
        <BodyText style={styles.meluneText}>Message de Melune...</BodyText>
        {/* Interface de réponse conversationnelle */}
      </View>
      
      {/* Bouton de progression */}
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <BodyText style={styles.buttonText}>Continuer</BodyText>
      </TouchableOpacity>
    </View>
  );
}
```

### Gestion des données avec Context
- **OnboardingContext** : Collecte et stockage des données utilisateur
- **Navigation progressive** : Chaque écran enrichit le profil utilisateur
- **Personnalisation Melune** : Adapte le ton et les conseils selon les préférences

## 🎯 Principes de Design (Simplifiés)

### 1. Layouts d'onglets obligatoires
**Chaque dossier d'onglet DOIT avoir un `_layout.jsx`** sinon Expo Router voit :
- ❌ `chat/index` au lieu de `chat`
- ❌ Flèches au lieu d'icônes
- ❌ Noms techniques au lieu des titres configurés

### 2. Gestion SafeArea simplifiée ✨
- **Racine** : `SafeAreaProvider` dans `app/_layout.jsx`
- **Layouts** : Simples, sans SafeAreaView
- **Pages** : `useSafeAreaInsets()` quand nécessaire

### 3. Configuration des onglets
```jsx
// app/(tabs)/_layout.jsx
<Tabs.Screen
  name="chat"
  options={{
    title: 'Melune',        // ✅ Titre affiché
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="chatbubble-ellipses" size={size} color={color} />
    ),
  }}
/>
```

## 🔧 Solutions simplifiées

### Layouts d'onglets (tous identiques)
```jsx
export default function HomeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
```

### Pages avec safe area
```jsx
export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Contenu */}
    </View>
  );
}
```

### Chat (cas spécial pour tab bar)
```jsx
export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Avatar + Messages */}
      <View style={styles.inputContainer}>
        {/* Input avec marginBottom: 85 pour éviter la tab bar */}
      </View>
    </View>
  );
}
```

## 🚀 Résultats

✅ **4 onglets fonctionnels** : Accueil, Cycle, Melune, Carnet  
✅ **Icônes Ionicons** affichées correctement  
✅ **Spacing uniforme** sur toutes les pages  
✅ **Chat fonctionnel** avec input au bon endroit  
✅ **Navigation CycleWheel** vers pages de phases  
✅ **Architecture simple** et maintenable  

## 🛠️ Maintenance

### App principale (onglets)
- **Ajout d'onglet** : Créer dossier + layout simple + page avec useSafeAreaInsets
- **Problème d'icônes** : Vérifier que le layout d'onglet existe
- **Problème de spacing** : Ajuster useSafeAreaInsets dans la page
- **Input caché** : Ajuster paddingBottom pour éviter la tab bar

### Onboarding conversationnel
- **Ajout d'écran** : Créer fichier avec numérotation logique + conversation Melune
- **Modifier l'ordre** : Ajuster les `router.push()` et logique de collecte de données
- **Gestion des données** : Utiliser `useOnboarding()` context pour sauvegarder les réponses
- **Avatar Melune** : Composant `<MeluneAvatar />` avec différentes expressions
- **Skip onboarding** : Rediriger depuis `app/index.jsx` vers `/(tabs)/home` directement

## 📏 Valeurs de référence

- **Tab bar height** : 85px (définie dans `(tabs)/_layout.jsx`)
- **Chat inputContainer marginBottom** : 85px (pour éviter la tab bar)
- **Safe area** : Automatique avec `useSafeAreaInsets()` 