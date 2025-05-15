# Modèles de Données Utilisateur

## 1. Vue d'ensemble

L'application MoodCycle utilise Realm comme base de données locale. Les modèles de données sont structurés pour gérer les informations utilisateur, les cycles menstruels, les entrées quotidiennes et les symptômes.

## 2. Schémas Realm

### 2.1 User (Utilisateur)

```typescript
{
  name: 'User',
  primaryKey: 'id',
  properties: {
    id: 'string',
    email: 'string',
    passwordHash: 'string',
    createdAt: 'date',
    lastLogin: 'date?',
    profile: 'mixed?',
    preferences: 'mixed?',
    engagement: 'mixed?',
    cycles: { type: 'list', objectType: 'Cycle' }
  }
}
```

### 2.2 Cycle

```typescript
{
  name: 'Cycle',
  primaryKey: 'id',
  properties: {
    id: 'string',
    userId: 'string',
    startDate: 'date',
    endDate: 'date?',
    phase: 'string',
    averageLength: 'int?',
    isCurrent: 'bool',
    createdAt: 'date',
    updatedAt: 'date',
    entries: { type: 'list', objectType: 'DailyEntry' }
  }
}
```

### 2.3 DailyEntry (Entrée Quotidienne)

```typescript
{
  name: 'DailyEntry',
  primaryKey: 'id',
  properties: {
    id: 'string',
    cycle: { type: 'linkingObjects', objectType: 'Cycle', property: 'entries' },
    date: 'date',
    mood: 'int?',
    symptoms: { type: 'list', objectType: 'Symptom' },
    notes: 'string?',
    flow: 'string?',
    temperature: 'float?',
    cervicalMucus: 'string?',
    intercourse: 'bool?',
    contraception: 'string?'
  }
}
```

### 2.4 Symptom (Symptôme)

```typescript
{
  name: 'Symptom',
  primaryKey: 'id',
  properties: {
    id: 'string',
    type: 'string',
    intensity: 'int',
    notes: 'string?',
    createdAt: 'date',
    updatedAt: 'date'
  }
}
```

### 2.5 Conversation

```typescript
{
  name: 'Conversation',
  primaryKey: 'id',
  properties: {
    id: 'string',
    messages: { type: 'list', objectType: 'Message' },
    createdAt: 'date',
    updatedAt: 'date'
  }
}
```

### 2.6 Message

```typescript
{
  name: 'Message',
  primaryKey: 'id',
  properties: {
    id: 'string',
    content: 'string',
    isUser: 'bool',
    metadata: 'mixed?',
    timestamp: 'date',
    conversation: { type: 'linkingObjects', objectType: 'Conversation', property: 'messages' }
  }
}
```

## 3. Relations entre les Modèles

- Un `User` peut avoir plusieurs `Cycle`s
- Un `Cycle` appartient à un `User` et contient plusieurs `DailyEntry`s
- Une `DailyEntry` appartient à un `Cycle` et peut avoir plusieurs `Symptom`s
- Une `Conversation` contient plusieurs `Message`s

## 4. Synchronisation des Données

La synchronisation des données est gérée par le hook `useRealmSync` qui permet de :

- Initialiser la base de données Realm
- Synchroniser les données utilisateur
- Synchroniser les cycles et les entrées quotidiennes
- Gérer la fermeture propre de la connexion Realm

## 5. Sécurité et Confidentialité

- Les données sensibles (comme le mot de passe) sont hashées
- Les données sont stockées localement sur l'appareil
- Les préférences utilisateur sont stockées de manière sécurisée
- Les données de santé sont protégées conformément aux réglementations en vigueur

## 6. Gestion des Versions

- Version actuelle du schéma : 1
- Les migrations sont gérées automatiquement
- La suppression de la base de données est possible en cas de migration nécessaire (uniquement en développement)

Document approuvé le: 29/04/2025
Version: 1.0
