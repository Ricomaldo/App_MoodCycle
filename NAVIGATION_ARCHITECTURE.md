# Architecture de Navigation - MoodCycle

## 🏗️ Structure Générale

L'application utilise **Expo Router** avec une architecture de navigation en onglets (tabs).

```
app/
├── _layout.jsx                  # Layout racine avec SafeAreaProvider
├── index.jsx                   # Redirection vers /(tabs)/home
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

- **Ajout d'onglet** : Créer dossier + layout simple + page avec useSafeAreaInsets
- **Problème d'icônes** : Vérifier que le layout d'onglet existe
- **Problème de spacing** : Ajuster useSafeAreaInsets dans la page
- **Input caché** : Ajuster paddingBottom pour éviter la tab bar

## 📏 Valeurs de référence

- **Tab bar height** : 85px (définie dans `(tabs)/_layout.jsx`)
- **Chat inputContainer marginBottom** : 85px (pour éviter la tab bar)
- **Safe area** : Automatique avec `useSafeAreaInsets()` 