# Conventions de Code - MoodCycle

## Configuration ESLint

```javascript
// .eslintrc.js
module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react-native/all',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-native', 'prettier'],
  env: {
    'react-native/react-native': true,
  },
  rules: {
    // Règles TypeScript
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    
    // Règles React
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    
    // Règles générales
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'prefer-const': 'error',
    'no-unused-vars': 'off', // Géré par @typescript-eslint/no-unused-vars
    
    // Règles React Native
    'react-native/no-inline-styles': 'warn',
    'react-native/no-color-literals': 'warn',
    'react-native/no-raw-text': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
```

## Configuration Prettier

```javascript
// .prettierrc.js
module.exports = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  bracketSpacing: true,
  arrowParens: 'avoid',
  endOfLine: 'auto',
};
```

## Configuration VS Code

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "files.associations": {
    "*.js": "javascriptreact"
  }
}
```

## Scripts NPM

```json
// package.json
{
  "scripts": {
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx --fix",
    "format": "prettier --write \"**/*.{js,jsx,ts,tsx,json,md}\"",
    "format:check": "prettier --check \"**/*.{js,jsx,ts,tsx,json,md}\""
  }
}
```

## Dependencies Requises

```json
// package.json
{
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^5.0.0",
    "@typescript-eslint/parser": "^5.0.0",
    "eslint": "^8.0.0",
    "eslint-config-prettier": "^8.0.0",
    "eslint-plugin-react": "^7.0.0",
    "eslint-plugin-react-hooks": "^4.0.0",
    "eslint-plugin-react-native": "^4.0.0",
    "prettier": "^2.0.0"
  }
}
```

## Règles de Nommage

### Fichiers
- Composants React : `PascalCase.tsx`
- Hooks : `useCamelCase.ts`
- Utilitaires : `camelCase.ts`
- Tests : `*.test.ts` ou `*.spec.ts`
- Styles : `*.styles.ts`

### Variables et Fonctions
- Constantes : `UPPER_SNAKE_CASE`
- Variables : `camelCase`
- Fonctions : `camelCase`
- Classes : `PascalCase`
- Interfaces : `PascalCase` (préfixe `I` optionnel)
- Types : `PascalCase`

## Structure des Composants

```typescript
// Exemple de structure de composant
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../theme';
import { styles } from './ComponentName.styles';

interface ComponentNameProps {
  // Props
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  // Props
}) => {
  // Hooks
  const theme = useTheme();

  // Render
  return (
    <View style={styles.container}>
      <Text>Contenu</Text>
    </View>
  );
};
```

## Bonnes Pratiques

1. **Imports**
   - Imports React en premier
   - Imports externes ensuite
   - Imports internes en dernier
   - Grouper les imports par type

2. **Types et Interfaces**
   - Utiliser TypeScript strictement
   - Éviter `any`
   - Préférer les interfaces aux types pour les objets

3. **Composants**
   - Composants fonctionnels avec hooks
   - Props typées
   - Décomposition des props
   - Utilisation de `useCallback` et `useMemo`

4. **Styles**
   - Styles séparés dans des fichiers dédiés
   - Utilisation du thème
   - Pas de styles inline
   - Styles nommés de manière sémantique

5. **Tests**
   - Tests unitaires pour la logique
   - Tests d'intégration pour les composants
   - Tests E2E pour les flux utilisateur
   - Couverture minimale de 80%

## Validation

Pour valider la configuration :

```bash
# Vérifier le linting
npm run lint

# Corriger automatiquement les erreurs de linting
npm run lint:fix

# Vérifier le formatage
npm run format:check

# Formater automatiquement
npm run format
```

## Intégration CI/CD

Ajouter ces étapes dans votre pipeline CI :

```yaml
steps:
  - name: Install Dependencies
    run: npm install

  - name: Lint
    run: npm run lint

  - name: Check Formatting
    run: npm run format:check

  - name: Run Tests
    run: npm test
```

## Dernière mise à jour
29/04/2025