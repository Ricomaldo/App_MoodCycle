# Système de Thème MoodCycle

## 1. Vue d'ensemble

Le système de thème de MoodCycle est conçu pour maintenir une cohérence visuelle à travers l'application tout en supportant les différentes phases du cycle menstruel.

## 2. Structure du thème

### 2.1 Organisation des fichiers

```
src/core/ui/theme/
├── colors.ts         # Palette de couleurs
├── typography.ts     # Styles de texte
├── spacing.ts        # Système d'espacement
├── borderRadius.ts   # Rayons de bordure
├── theme.ts          # Configuration du thème
└── ThemeProvider.tsx # Provider React
```

### 2.2 Composants partagés

```
src/features/shared/components/
├── Button.tsx        # Bouton personnalisé
├── Card.tsx          # Carte réutilisable
└── ScreenContainer.tsx # Conteneur d'écran
```

## 3. Palette de couleurs

### 3.1 Couleurs principales

- `primary`: #E91E63 (Rose principal)
- `secondary`: #CDDC39 (Vert secondaire)

### 3.2 Couleurs des phases

- `phases.menstruation`: #F44336
- `phases.follicular`: #FFC107
- `phases.ovulation`: #00BCD4
- `phases.luteal`: #673AB7

### 3.3 Couleurs neutres

- `neutral.100`: #FFFFFF
- `neutral.200`: #F5F5F5
- `neutral.300`: #E0E0E0
- `neutral.400`: #BDBDBD
- `neutral.500`: #9E9E9E
- `neutral.600`: #757575
- `neutral.700`: #616161
- `neutral.800`: #424242
- `neutral.900`: #212121

### 3.4 Couleurs sémantiques

- `semantic.success`: #4CAF50
- `semantic.warning`: #FF9800
- `semantic.error`: #F44336
- `semantic.info`: #2196F3

## 4. ThemeProvider

### 4.1 Configuration

```typescript
// src/core/ui/theme/ThemeProvider.tsx
import React, { createContext, useContext } from 'react';
import { theme } from './theme';

const ThemeContext = createContext(theme);

export const ThemeProvider: React.FC = ({ children }) => {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
```

### 4.2 Intégration dans l'application

Le ThemeProvider doit envelopper l'application dans le fichier App.tsx:

```typescript
// src/App.tsx
import { ThemeProvider } from '@core/ui/theme/ThemeProvider';

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        {/* Reste de l'application */}
      </NavigationContainer>
    </ThemeProvider>
  );
}
```

### 4.3 Utilisation du hook useTheme

```typescript
import { useTheme } from '@core/ui/theme/ThemeProvider';

const MyComponent = () => {
  const theme = useTheme();

  return (
    <View style={{ backgroundColor: theme.colors.neutral[100] }}>
      {/* Contenu */}
    </View>
  );
};
```

## 5. Utilisation

### 5.1 Dans les composants React Native

```typescript
import { colors } from '@core/ui/theme/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral[100],
    borderColor: colors.neutral[300],
  },
});
```

### 5.2 Avec styled-components

```typescript
import styled from 'styled-components/native';

const StyledComponent = styled.View`
  background-color: ${({ theme }) => theme.colors.neutral[100]};
  border-color: ${({ theme }) => theme.colors.neutral[300]};
`;
```

## 6. Règles d'utilisation

### 6.1 Couleurs

- Utiliser les couleurs sémantiques pour les états (success, error, etc.)
- Utiliser les couleurs neutres pour les bordures et fonds
- Utiliser les couleurs de phase uniquement pour les éléments liés au cycle

### 6.2 Typographie

- Respecter la hiérarchie des tailles de texte
- Utiliser les poids de police appropriés

### 6.3 Espacement

- Utiliser les valeurs prédéfinies pour maintenir la cohérence
- Éviter les valeurs en dur

### 6.4 Bonnes pratiques de style

#### 6.4.1 StyleSheet.create()

- Toujours utiliser `StyleSheet.create()` pour définir les styles statiques
- Éviter les styles en ligne pour les propriétés statiques
- Regrouper les styles liés dans des objets nommés de manière descriptive

```typescript
const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
  },
  text: {
    fontSize: theme.typography.fontSizes.md,
  },
});
```

#### 6.4.2 Styles dynamiques

Pour les styles qui dépendent de props ou d'état :

```typescript
// ❌ Incorrect - Éviter les tableaux de styles
style={[
  styles.base,
  { color: isActive ? theme.colors.primary : theme.colors.neutral[900] }
]}

// ✅ Correct - Utiliser le spread operator
style={{
  ...styles.base,
  color: isActive ? theme.colors.primary : theme.colors.neutral[900]
}}
```

#### 6.4.3 Composition de styles

- Utiliser le spread operator pour composer les styles
- Éviter la duplication de propriétés de style
- Préférer la composition à l'héritage de styles

```typescript
// ✅ Bonne pratique
const styles = StyleSheet.create({
  base: {
    padding: theme.spacing.md,
  },
  variant: {
    backgroundColor: theme.colors.primary,
  },
});

// Utilisation
style={{
  ...styles.base,
  ...styles.variant,
}}
```

## 7. Maintenance

### 7.1 Ajout de nouvelles couleurs

1. Ajouter dans le fichier `colors.ts`
2. Documenter l'usage prévu
3. Mettre à jour cette documentation

### 7.2 Modification des valeurs

1. Vérifier l'impact sur l'ensemble de l'application
2. Mettre à jour les tests visuels
3. Documenter les changements

## 8. Version

1.0.0 - 30/04/2024

## 9. Références

- [REF:spec-design-system-v1.md] : Système de design initial
- [REF:spec-architecture-moodcycle.md#ui] : Architecture UI
