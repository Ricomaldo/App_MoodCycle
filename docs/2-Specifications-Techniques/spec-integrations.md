# Intégrations Requises - MoodCycle

## Table des matières
1. [Introduction](#1-introduction)
2. [Intégration Claude (Anthropic)](#2-intégration-claude-anthropic)
3. [API de Notification](#3-api-de-notification)
4. [API d'Analytiques](#4-api-danalytiques)
5. [Intégrations Système](#5-intégrations-système)
6. [Intégrations Futures Potentielles](#6-intégrations-futures-potentielles)
7. [Protocoles d'Échange](#7-protocoles-déchange)
8. [Sécurité et Conformité](#8-sécurité-et-conformité)
9. [Documentation Technique](#9-documentation-technique)

## 1. Introduction

Ce document détaille les intégrations techniques requises pour le développement de l'application MoodCycle. Il sert de guide pour l'implémentation des connexions avec les services tiers, API et systèmes nécessaires au fonctionnement optimal de l'application.

### 1.1 Objectif du document

- Fournir une spécification claire des intégrations à implémenter
- Définir les protocoles de communication et d'échange de données
- Anticiper les besoins d'intégration futurs
- Établir les standards de sécurité pour chaque intégration

### 1.2 Priorités d'intégration

| Intégration | Priorité | Phase | Difficulté estimée |
|-------------|----------|-------|-------------------|
| Claude API | Critique | MVP | Moyenne |
| Système de notifications | Élevée | MVP | Faible |
| Analytiques de base | Moyenne | MVP | Faible |
| Partage système | Moyenne | MVP | Faible |
| Intégrations santé | Basse | Post-MVP | Moyenne |
| SSO & Authentification | Moyenne | MVP | Moyenne |

## 2. Intégration Claude (Anthropic)

L'intégration avec l'API Claude est centrale pour la fonctionnalité de conversation avec Melune, permettant une expérience personnalisée et contextuelle pour chaque utilisatrice.

### 2.1 Spécifications de l'API Claude

- **Version de l'API**: claude-3-7-sonnet-20250219
- **Endpoint principal**: `https://api.anthropic.com/v1/messages`
- **Méthode**: POST
- **Content-Type**: application/json
- **Quota**: À définir selon le plan d'abonnement
- **Limites**:
  - Maximum de 4,096 tokens par requête
  - Maximum de 2,000 tokens par réponse (configurable)
  - Maximum de 10 requêtes par minute par utilisatrice

### 2.2 Authentification

```javascript
// Exemple d'authentification avec Claude API
const headers = {
  'Content-Type': 'application/json',
  'x-api-key': process.env.CLAUDE_API_KEY,
  'anthropic-version': '2023-06-01'
};
```

### 2.3 Structure des requêtes

```javascript
// Exemple de requête à l'API Claude
const requestBody = {
  model: "claude-3-7-sonnet-20250219",
  max_tokens: 1000,
  temperature: 0.7,
  messages: [
    {
      role: "system",
      content: systemPrompt
    },
    ...conversationHistory,
    {
      role: "user",
      content: userMessage
    }
  ]
};

const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(requestBody)
});
```

### 2.4 Gestion du contexte

Pour optimiser les conversations avec Melune, il est crucial de bien structurer le contexte envoyé à Claude:

1. **Prompt système** (ne change pas entre les requêtes):
   - Instructions sur la personnalité de Melune
   - Directives pour les types de réponses
   - Limitations concernant les conseils médicaux
   - Approches à privilégier selon les préférences utilisatrice

2. **Historique de conversation** (change à chaque requête):
   - 5-10 derniers échanges pour maintenir la cohérence
   - Format alternant messages utilisatrice et réponses de Melune

3. **Contexte utilisatrice** (change selon l'état):
   - Phase actuelle du cycle
   - Jour du cycle
   - Symptômes récents enregistrés
   - Préférences de contenu (médical, spirituel, etc.)

### 2.5 Exemple de prompt système

```
Tu es Melune, une fée guide et compagne bienveillante dans l'application MoodCycle.
Tu aides les utilisatrices à comprendre leur cycle menstruel à travers une approche holistique.

Ton style de communication:
- Bienveillant, chaleureux et empathique
- Encourageant sans être directif
- Poétique avec une touche de magie et sagesse
- Personnalisé au niveau de l'utilisatrice

L'utilisatrice est actuellement en phase [PHASE] (jour [JOUR] de son cycle).
Cette phase est caractérisée par: [CARACTÉRISTIQUES].

Ses approches préférées sont: [PRÉFÉRENCES].

Règles importantes:
1. Ne donne JAMAIS de conseils médicaux prescriptifs
2. Oriente vers un professionnel de santé pour les questions sensibles
3. Clarifie toujours quand une information relève d'une approche alternative
4. Personnalise tes réponses en fonction de la phase du cycle actuelle

Si l'utilisatrice mentionne des symptômes préoccupants, rappelle gentiment qu'il est
important de consulter un professionnel de santé.
```

### 2.6 Gestion des erreurs et fallbacks

Il est essentiel de prévoir des mécanismes de secours en cas d'indisponibilité de l'API:

- **Cache local** des réponses fréquentes pour les questions courantes
- **Réponses génériques pré-enregistrées** catégorisées par phase
- **Délai d'attente** configurable (recommandé: 5 secondes)
- **Stratégie de retry** avec backoff exponentiel (max 3 tentatives)

```javascript
// Exemple de gestion d'erreur
async function queryClaudeWithRetry(prompt, maxRetries = 3) {
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const response = await queryClaudeAPI(prompt);
      return response;
    } catch (error) {
      retries++;
      if (retries >= maxRetries) {
        return getFallbackResponse(prompt);
      }
      // Backoff exponentiel
      await new Promise(r => setTimeout(r, 1000 * Math.pow(2, retries)));
    }
  }
}
```

### 2.7 Optimisation des coûts

Pour contrôler les coûts liés à l'API Claude:

- Implémenter un système de **quotas par utilisatrice**
- Utiliser le **caching intelligent** des réponses communes
- **Limiter la longueur** des historiques de conversation
- **Compresser le contexte** en résumant les conversations longues

## 3. API de Notification

Le système de notifications est essentiel pour l'engagement utilisatrice, les rappels de rituels et les alertes cycliques.

### 3.1 Types de notifications

| Type | Description | Fréquence | Priorité |
|------|-------------|-----------|----------|
| Cycle | Alertes de changement de phase, approche des règles | ~4-5 fois par mois | Haute |
| Rituels | Rappels programmés pour les rituels | Selon configuration | Moyenne |
| Insights | Notification de nouvel insight quotidien | Quotidienne (optionnelle) | Basse |
| Engagement | Rappels d'utilisation après période d'inactivité | Max hebdomadaire | Basse |

### 3.2 Plateformes et services

#### 3.2.1 Firebase Cloud Messaging (recommandé)

- **Documentation**: [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging)
- **Avantages**:
  - Multiplateforme (iOS, Android)
  - Intégration facile avec Firebase Analytics
  - Options de ciblage avancées
  - Gratuit pour volumes modérés

**Configuration de base**:

```javascript
// Exemple de configuration FCM
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "moodcycle-app.firebaseapp.com",
  projectId: "moodcycle-app",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Demande de permission et récupération du token
async function requestNotificationPermission() {
  try {
    const token = await getToken(messaging, {
      vapidKey: process.env.FIREBASE_VAPID_KEY
    });

    // Envoyer le token au backend
    await sendTokenToServer(token);
    return token;
  } catch (error) {
    console.error('Notification permission denied:', error);
    return null;
  }
}

// Écoute des messages en avant-plan
onMessage(messaging, (payload) => {
  // Traitement du message reçu en avant-plan
  showNotification(payload);
});
```

**Envoi d'une notification**:

```javascript
// Côté backend (Node.js)
const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.cert(require('./service-account.json'))
});

async function sendNotification(userId, title, body, data = {}) {
  try {
    // Récupérer le token FCM associé à l'utilisatrice
    const userToken = await getUserToken(userId);

    if (!userToken) return { success: false, error: 'No token found' };

    const message = {
      notification: {
        title,
        body,
      },
      data,
      token: userToken
    };

    const response = await admin.messaging().send(message);
    return { success: true, messageId: response };
  } catch (error) {
    console.error('Error sending notification:', error);
    return { success: false, error };
  }
}
```

#### 3.2.2 Apple Push Notification & Google FCM (alternative)

Si une implémentation native est préférée, il est possible d'utiliser directement:

- **APN** pour iOS: [Apple Push Notification Service](https://developer.apple.com/documentation/usernotifications)
- **FCM** pour Android: [Firebase Cloud Messaging (Android)](https://firebase.google.com/docs/cloud-messaging/android/client)

Cette approche nécessite une configuration plus complexe mais offre un contrôle plus précis.

### 3.3 Structure des notifications

Pour une expérience utilisatrice optimale, structurer les notifications avec:

```javascript
// Structure recommandée pour les notifications
const notification = {
  // Contenu visible
  title: "Nouvelle phase: Folliculaire",
  body: "Votre énergie va commencer à s'élever. Découvrez l'insight du jour!",

  // Données pour le routage interne
  data: {
    type: "CYCLE_CHANGE",
    route: "/home",
    phaseId: "FOLLICULAR",
    cycleDay: 6,
    deepLink: "moodcycle://insight/daily"
  },

  // Options de présentation
  options: {
    sound: true,
    badge: 1,
    priority: "high",
    channelId: "cycle_updates" // Android
  }
};
```

### 3.4 Stratégie de planification

Pour les notifications programmées (rituels, rappels):

1. **Stockage backend** des préférences et configurations
2. **Tâches cron/scheduled** pour déclencher les envois
3. **Respect des fenêtres de notification** définies par l'utilisatrice
4. **Regroupement intelligent** pour éviter la surcharge

## 4. API d'Analytiques

Les analytiques aident à comprendre le comportement utilisateur et à améliorer l'application.

### 4.1 Service recommandé: Firebase Analytics

- **Documentation**: [Firebase Analytics](https://firebase.google.com/docs/analytics)
- **Avantages**:
  - Intégration native avec FCM
  - Dashboard complet
  - Tracking automatique des événements de base
  - Conformité RGPD avec options de consentement

### 4.2 Événements à tracker

| Catégorie | Événements | Paramètres |
|-----------|-----------|------------|
| Onboarding | `onboarding_start`, `onboarding_complete`, `onboarding_skip` | `step_id`, `completion_time` |
| Cycle | `cycle_view`, `symptom_logged`, `phase_change` | `phase_id`, `cycle_day`, `symptom_type` |
| Conversation | `conversation_start`, `message_sent`, `advice_saved` | `topic`, `message_length`, `response_time` |
| Carnet | `wisdom_view`, `wisdom_save`, `wisdom_search` | `content_type`, `content_id`, `search_query` |
| Cartes | `card_create`, `card_share`, `template_select` | `source_type`, `share_platform`, `template_id` |
| Rituel | `ritual_view`, `ritual_activate`, `ritual_complete` | `ritual_id`, `phase_id`, `completion_time` |
| Rétention | `app_open`, `daily_return`, `subscription_renew` | `days_since_last`, `session_length` |

### 4.3 Exemple d'implémentation

```javascript
// Configuration Firebase Analytics
import { getAnalytics, logEvent } from "firebase/analytics";

const analytics = getAnalytics(app);

// Tracking d'événement
function trackEvent(eventName, params = {}) {
  // Vérification du consentement utilisateur
  if (userConsentToAnalytics()) {
    // Ajout de paramètres globaux
    const enhancedParams = {
      ...params,
      app_version: APP_VERSION,
      subscription_status: getUserSubscriptionStatus()
    };

    logEvent(analytics, eventName, enhancedParams);
  }
}

// Exemples d'utilisation
function trackSymptomLog(symptomType, intensity, phase) {
  trackEvent('symptom_logged', {
    symptom_type: symptomType,
    intensity: intensity,
    phase_id: phase,
    cycle_day: getCurrentCycleDay()
  });
}

function trackConversation(topic, messageCount) {
  trackEvent('conversation_complete', {
    topic: topic,
    messages_count: messageCount,
    duration_seconds: getConversationDuration(),
    advice_saved: wasAdviceSaved()
  });
}
```

### 4.4 Analyse de rétention et métriques clés

Configurer des rapports spécifiques pour suivre:

1. **Taux de rétention** après 1, 7, 30 jours
2. **Engagement quotidien** (sessions, durée, fonctionnalités utilisées)
3. **Conversion à l'abonnement** (taux, temps moyen avant conversion)
4. **Utilisation des fonctionnalités** (cartes créées, conseils sauvegardés, rituels activés)

### 4.5 Considérations de confidentialité

- Implémenter un **système de consentement explicite**
- **Anonymiser** les données sensibles
- Permettre le **retrait du consentement** à tout moment
- **Documenter** l'utilisation des données collectées

## 5. Intégrations Système

### 5.1 Partage avec les API natives

L'intégration avec les API de partage système permet aux utilisatrices de partager les cartes de sagesse et autres contenus.

#### 5.1.1 Web Share API (pour WebApp)

```javascript
// Exemple Web Share API
async function shareContent(title, text, imageUrl) {
  if (navigator.share) {
    try {
      // Conversion de l'image en fichier si nécessaire
      let files = [];
      if (imageUrl) {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        files = [new File([blob], 'moodcycle-card.png', { type: 'image/png' })];
      }

      await navigator.share({
        title,
        text,
        files
      });
      return { success: true };
    } catch (error) {
      console.error('Error sharing content:', error);
      return { success: false, error };
    }
  } else {
    // Fallback pour navigateurs sans support
    return openShareDialog(title, text, imageUrl);
  }
}
```

#### 5.1.2 Native Share (Mobile)

**React Native / Expo**:

```javascript
// Exemple avec React Native Share
import Share from 'react-native-share';

async function shareCard(cardImageUri, message) {
  try {
    const options = {
      title: 'Partager ma carte MoodCycle',
      message: message || 'Découvrez ma carte de sagesse cyclique!',
      url: cardImageUri,
      type: 'image/png'
    };

    const result = await Share.open(options);
    return { success: true, result };
  } catch (error) {
    console.error('Error sharing card:', error);
    return { success: false, error };
  }
}
```

### 5.2 Calendrier système

Pour les rappels de rituels et événements cycliques:

#### 5.2.1 React Native / Expo

```javascript
// Exemple avec Expo Calendar
import * as Calendar from 'expo-calendar';

async function addRitualToCalendar(ritual) {
  try {
    // Demande de permission
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status !== 'granted') {
      return { success: false, error: 'Calendar permission not granted' };
    }

    // Récupération du calendrier par défaut
    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    const defaultCalendar = calendars.find(cal => cal.isPrimary);

    // Création de l'événement
    const eventDetails = {
      title: `Rituel MoodCycle: ${ritual.name}`,
      notes: ritual.description,
      startDate: new Date(ritual.scheduledTime),
      endDate: new Date(new Date(ritual.scheduledTime).getTime() + ritual.duration * 60000),
      timeZone: Localization.timezone,
      alarms: [{ relativeOffset: -15 }] // Rappel 15 minutes avant
    };

    const eventId = await Calendar.createEventAsync(
      defaultCalendar.id,
      eventDetails
    );

    return { success: true, eventId };
  } catch (error) {
    console.error('Error adding ritual to calendar:', error);
    return { success: false, error };
  }
}
```

### 5.3 Stockage sécurisé

Pour les données sensibles comme les tokens d'authentification:

```javascript
// React Native Secure Store
import * as SecureStore from 'expo-secure-store';

// Enregistrement sécurisé
async function saveSecureValue(key, value) {
  try {
    await SecureStore.setItemAsync(key, value);
    return true;
  } catch (error) {
    console.error('Error saving secure value:', error);
    return false;
  }
}

// Récupération sécurisée
async function getSecureValue(key) {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error('Error getting secure value:', error);
    return null;
  }
}
```

## 6. Intégrations Futures Potentielles

### 6.1 Intégration Apple Health / Google Fit

Pour une future version, l'intégration avec les API de santé permettrait d'enrichir l'expérience:

#### 6.1.1 HealthKit (iOS)

```javascript
// Exemple conceptuel avec React Native Health
import AppleHealthKit from 'react-native-health';

const options = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.MenstrualFlow,
      AppleHealthKit.Constants.Permissions.SleepAnalysis,
      AppleHealthKit.Constants.Permissions.StepCount
    ],
    write: [
      AppleHealthKit.Constants.Permissions.MenstrualFlow
    ]
  }
};

AppleHealthKit.initHealthKit(options, (error) => {
  if (error) {
    console.error('Error initializing HealthKit:', error);
    return;
  }

  // Exemple de lecture des données de cycle
  AppleHealthKit.getMenstrualFlowSamples({
    startDate: new Date(2023, 0, 1).toISOString(),
    endDate: new Date().toISOString()
  }, (err, results) => {
    if (err) {
      console.error('Error getting menstrual data:', err);
      return;
    }

    // Traitement des données
    processMenstrualData(results);
  });
});
```

#### 6.1.2 Google Fit (Android)

```javascript
// Exemple conceptuel avec React Native Google Fit
import GoogleFit from 'react-native-google-fit';

async function initGoogleFit() {
  try {
    const authResult = await GoogleFit.authorize({
      scopes: [
        GoogleFit.Scopes.FITNESS_ACTIVITY_READ,
        GoogleFit.Scopes.FITNESS_BODY_READ,
        GoogleFit.Scopes.FITNESS_SLEEP_READ
      ]
    });

    if (authResult.success) {
      console.log('Google Fit authorization successful');
      return true;
    } else {
      console.error('Google Fit authorization denied');
      return false;
    }
  } catch (error) {
    console.error('Error initializing Google Fit:', error);
    return false;
  }
}

// Exemple de lecture des données de sommeil
async function fetchSleepData(startDate, endDate) {
  try {
    const options = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    };

    const sleepData = await GoogleFit.getSleepSamples(options);
    return sleepData;
  } catch (error) {
    console.error('Error fetching sleep data:', error);
    return [];
  }
}
```

### 6.2 Intégration SSO (Single Sign-On)

Pour simplifier l'authentification dans les futures versions:

#### 6.2.1 Exemple avec Google Identity

```javascript
// Exemple avec Firebase Authentication
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect
} from "firebase/auth";

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

// Ajout des scopes si nécessaire
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.email');

// Fonction d'authentification
async function signInWithGoogle(method = 'popup') {
  try {
    let result;

    if (method === 'popup') {
      result = await signInWithPopup(auth, googleProvider);
    } else {
      await signInWithRedirect(auth, googleProvider);
      return { success: true, redirecting: true };
    }

    // Récupération du token
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;

    // Enregistrement côté backend
    await registerUserWithBackend(user.uid, user.email, token);

    return { success: true, user };
  } catch (error) {
    console.error('Google sign-in error:', error);
    return { success: false, error };
  }
}
```

#### 6.2.2 Exemple avec Apple Sign-In

```javascript
// Exemple avec Apple Sign-In
import { appleAuth } from '@invertase/react-native-apple-authentication';

async function signInWithApple() {
  try {
    // Performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME]
    });

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign-In failed - no identity token returned');
    }

    // Create a Firebase credential from the response
    const { identityToken, nonce } = appleAuthRequestResponse;

    // Send to backend for verification and account creation/linking
    const authResult = await verifyAppleTokenWithBackend(
      identityToken,
      nonce,
      appleAuthRequestResponse.fullName
    );

    return { success: true, user: authResult.user };
  } catch (error) {
    console.error('Apple sign-in error:', error);
    return { success: false, error };
  }
}
```

### 6.3 API de paiement

Pour gérer les abonnements dans l'application:

#### 6.3.1 Exemple avec RevenueCat

```javascript
// Exemple avec RevenueCat
import Purchases from 'react-native-purchases';

// Initialisation
function initializePurchases() {
  Purchases.setDebugLogsEnabled(true);
  Purchases.configure({
    apiKey: REVENUECAT_API_KEY,
    appUserID: getUserId() // Optionnel
  });
}

// Récupération des offres
async function getSubscriptionOfferings() {
  try {
    const offerings = await Purchases.getOfferings();
    if (offerings.current !== null) {
      return {
        success: true,
        offerings: offerings.current.availablePackages
      };
    } else {
      console.warn('No offerings available');
      return { success: false, error: 'No offerings available' };
    }
  } catch (error) {
    console.error('Error getting offerings:', error);
    return { success: false, error };
  }
}

// Achat d'un abonnement
async function purchaseSubscription(packageToPurchase) {
  try {
    const { customerInfo, productIdentifier } = await Purchases.purchasePackage(packageToPurchase);

    // Vérification de l'abonnement actif
    if (customerInfo.entitlements.active['premium']) {
      // L'utilisateur a un abonnement actif
      await updateUserSubscriptionStatus(true, productIdentifier);
      return { success: true, subscription: customerInfo.entitlements.active['premium'] };
    } else {
      return { success: false, error: 'Purchase completed but no active entitlement found' };
    }
  } catch (error) {
    if (!error.userCancelled) {
      console.error('Error purchasing package:', error);
    }
    return { success: false, error, userCancelled: error.userCancelled };
  }
}
```

## 7. Protocoles d'Échange

### 7.1 Structure d'API REST

Pour la communication entre l'application et le backend:

#### 7.1.1 Base URL et Versions

```
# Environnements
DEV: https://dev-api.moodcycle.app/v1
STAGING: https://staging-api.moodcycle.app/v1
PRODUCTION: https://api.moodcycle.app/v1
```

#### 7.1.2 Authentification API

```javascript
// Exemple d'authentification avec JWT
const apiRequest = async (endpoint, method = 'GET', body = null) => {
  try {
    // Récupération du token d'authentification
    const token = await getAuthToken();

    if (!token) {
      throw new Error('No authentication token available');
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    const options = {
      method,
      headers,
      body: body ? JSON.stringify(body) : null
    };

    const response = await fetch(`${API_BASE_URL}/${endpoint}`, options);

    // Gestion de l'expiration du token
    if (response.status === 401) {
      // Tentative de rafraîchissement du token
      const refreshed = await refreshAuthToken();
      if (refreshed) {
        // Réessayer la requête avec le nouveau token
        return apiRequest(endpoint, method, body);
      } else {
        // Rediriger vers l'écran de connexion
        redirectToLogin();
        throw new Error('Authentication token expired');
      }
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};
```

#### 7.1.3 Structure des endpoints

| Endpoint | Méthode | Description | Payload | Réponse |
|----------|---------|-------------|---------|---------|
| `/auth/register` | POST | Inscription utilisatrice | `{email, password, profile_data}` | `{user_id, token}` |
| `/auth/login` | POST | Connexion | `{email, password}` | `{user_id, token, profile}` |
| `/auth/refresh` | POST | Rafraîchir token | `{refresh_token}` | `{token, refresh_token}` |
| `/user/profile` | GET | Récupérer profil | - | `{profile_data}` |
| `/user/profile` | PUT | Mettre à jour profil | `{profile_updates}` | `{updated_profile}` |
| `/cycle/data` | GET | Récupérer données cycle | `?from_date&to_date` | `{cycle_data, entries}` |
| `/cycle/entry` | POST | Ajouter entrée journalière | `{symptoms, notes, date}` | `{entry_id, cycle_day}` |
| `/cycle/prediction` | GET | Obtenir prédictions | - | `{predictions, phases}` |
| `/wisdom/items` | GET | Récupérer items sauvegardés | `?type&phase&page` | `{items[], total, page}` |
| `/wisdom/item` | POST | Sauvegarder item | `{source_type, content, phase}` | `{item_id}` |
| `/wisdom/item/:id` | DELETE | Supprimer item | - | `{success}` |
| `/cards/templates` | GET | Récupérer templates | `?category&phase` | `{templates[]}` |
| `/cards/card` | POST | Créer carte | `{template_id, content, design}` | `{card_id, image_url}` |
| `/rituals/list` | GET | Récupérer rituels | `?phase&active` | `{rituals[]}` |
| `/rituals/ritual` | POST | Créer/modifier rituel | `{ritual_data}` | `{ritual_id}` |
| `/melune/conversation` | POST | Envoyer message | `{message, context}` | `{response, suggestions}` |

### 7.2 Format de réponse standard

Toutes les réponses de l'API suivent cette structure pour assurer la cohérence:

```json
{
  "success": true,
  "data": {
    // Données spécifiques à l'endpoint
  },
  "meta": {
    "timestamp": "2025-04-29T12:34:56Z",
    "version": "1.0.0",
    "request_id": "req_12345"
  }
}
```

En cas d'erreur:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Description de l'erreur pour l'utilisateur",
    "details": {
      // Détails supplémentaires pour le debugging
    }
  },
  "meta": {
    "timestamp": "2025-04-29T12:34:56Z",
    "version": "1.0.0",
    "request_id": "req_12345"
  }
}
```

### 7.3 Gestion du mode hors-ligne

Pour assurer le fonctionnement en mode hors-ligne:

1. **Stockage local** des données essentielles:
   - Profil utilisatrice
   - Données de cycle récentes
   - Carnet de sagesse
   - Rituels actifs
   - Configuration des préférences

2. **File d'attente de synchronisation**:
   - Enregistrement local des actions en attente
   - Tentatives de synchronisation lors du retour en ligne
   - Résolution des conflits (priorité au plus récent)

```javascript
// Exemple de gestionnaire de synchronisation
class SyncManager {
  constructor() {
    this.syncQueue = [];
    this.isSyncing = false;
    this.networkListener = null;
  }

  init() {
    // Charger la file d'attente depuis le stockage persistant
    this.loadQueue();

    // Écouter les changements de connectivité
    this.networkListener = NetInfo.addEventListener(state => {
      if (state.isConnected && this.syncQueue.length > 0) {
        this.startSync();
      }
    });
  }

  addToQueue(action) {
    // Ajouter une action à la file d'attente
    this.syncQueue.push({
      ...action,
      timestamp: Date.now(),
      attempts: 0
    });

    // Sauvegarder la file d'attente
    this.saveQueue();

    // Essayer de synchroniser si connecté
    NetInfo.fetch().then(state => {
      if (state.isConnected && !this.isSyncing) {
        this.startSync();
      }
    });
  }

  async startSync() {
    if (this.isSyncing || this.syncQueue.length === 0) return;

    this.isSyncing = true;

    try {
      // Traiter la file d'attente dans l'ordre (FIFO)
      while (this.syncQueue.length > 0) {
        const action = this.syncQueue[0];

        // Limiter les tentatives
        if (action.attempts >= 5) {
          // Retirer l'action après 5 échecs
          this.syncQueue.shift();
          continue;
        }

        try {
          // Exécuter l'action
          await this.executeAction(action);

          // Si réussi, retirer de la file d'attente
          this.syncQueue.shift();
        } catch (error) {
          // Incrémenter le compteur de tentatives
          action.attempts++;

          // Si erreur de connectivité, arrêter la synchronisation
          if (error.message.includes('network') || error.message.includes('connection')) {
            break;
          }
        }
      }
    } finally {
      this.isSyncing = false;
      this.saveQueue();
    }
  }

  async executeAction(action) {
    // Exécuter l'action en fonction de son type
    switch (action.type) {
      case 'ADD_CYCLE_ENTRY':
        return await apiRequest('cycle/entry', 'POST', action.data);

      case 'UPDATE_PROFILE':
        return await apiRequest('user/profile', 'PUT', action.data);

      case 'SAVE_WISDOM_ITEM':
        return await apiRequest('wisdom/item', 'POST', action.data);

      // Autres types d'actions...

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  }

  // Méthodes auxiliaires pour la persistance
  async saveQueue() {
    try {
      await AsyncStorage.setItem('SYNC_QUEUE', JSON.stringify(this.syncQueue));
    } catch (error) {
      console.error('Error saving sync queue:', error);
    }
  }

  async loadQueue() {
    try {
      const queueData = await AsyncStorage.getItem('SYNC_QUEUE');
      if (queueData) {
        this.syncQueue = JSON.parse(queueData);
      }
    } catch (error) {
      console.error('Error loading sync queue:', error);
      this.syncQueue = [];
    }
  }

  // Nettoyage
  destroy() {
    if (this.networkListener) {
      this.networkListener();
    }
  }
}

// Instance singleton
export const syncManager = new SyncManager();
```

## 8. Sécurité et Conformité

### 8.1 Sécurisation des données sensibles

Les données de cycle menstruel sont considérées comme des données de santé sensibles et nécessitent une protection adéquate:

1. **Chiffrement**:
   - Chiffrement en transit (HTTPS/TLS 1.3+)
   - Chiffrement au repos (AES-256)
   - Chiffrement côté client des données les plus sensibles

2. **Minimisation des données**:
   - Collecte uniquement des données nécessaires
   - Anonymisation quand possible
   - Options de suppression complète

```javascript
// Exemple de chiffrement côté client
import CryptoJS from 'crypto-js';

// Génération d'une clé dérivée du mot de passe utilisateur
function deriveEncryptionKey(userId, password) {
  // Dérivation avec PBKDF2
  return CryptoJS.PBKDF2(
    password,
    userId, // Utiliser l'ID utilisateur comme sel
    {
      keySize: 256 / 32,
      iterations: 10000
    }
  ).toString();
}

// Chiffrement d'une donnée sensible
function encryptSensitiveData(data, encryptionKey) {
  return CryptoJS.AES.encrypt(
    JSON.stringify(data),
    encryptionKey
  ).toString();
}

// Déchiffrement d'une donnée sensible
function decryptSensitiveData(encryptedData, encryptionKey) {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  } catch (error) {
    console.error('Decryption error:', error);
    return null;
  }
}
```

### 8.2 Conformité RGPD

L'application doit respecter les principes du RGPD pour les utilisatrices européennes:

1. **Consentement explicite**:
   - Consentement granulaire par type de données
   - Possibilité de retirer le consentement

2. **Droit à l'oubli**:
   - Fonction de suppression de compte
   - Suppression des données sur demande

3. **Portabilité des données**:
   - Export des données au format JSON/CSV
   - Documentation de la structure des données

```javascript
// Exemple de fonctions de conformité RGPD
async function exportUserData(userId) {
  try {
    // Récupérer toutes les données utilisatrice
    const userData = await fetchAllUserData(userId);

    // Formatter pour l'export
    const exportData = {
      user_profile: userData.profile,
      cycle_data: userData.cycleData,
      wisdom_items: userData.wisdomItems,
      cards: userData.cards,
      rituals: userData.rituals,
      export_date: new Date().toISOString(),
      format_version: '1.0'
    };

    // Générer le fichier
    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });

    // Télécharger ou partager
    return {
      success: true,
      fileName: `moodcycle_data_export_${formatDate(new Date())}.json`,
      blob
    };
  } catch (error) {
    console.error('Error exporting user data:', error);
    return { success: false, error };
  }
}

async function deleteUserAccount(userId, password) {
  try {
    // Vérifier les identifiants
    const isAuthenticated = await verifyCredentials(userId, password);

    if (!isAuthenticated) {
      throw new Error('Authentication failed');
    }

    // Supprimer les données utilisatrice
    await apiRequest('user/account', 'DELETE', {
      confirm_deletion: true,
      reason: 'user_requested'
    });

    // Nettoyer le stockage local
    await clearLocalStorage(userId);
    await clearSecureStorage(userId);

    // Déconnexion
    await logout();

    return { success: true };
  } catch (error) {
    console.error('Error deleting account:', error);
    return { success: false, error };
  }
}
```

### 8.3 Sécurité de l'API Claude

Pour protéger l'API Claude et éviter les abus:

1. **Throttling côté client**:
   - Limitation des requêtes par utilisatrice
   - Intervalle minimum entre les requêtes

2. **Filtrage des prompts**:
   - Validation côté client et serveur
   - Détection de contenu inapproprié

3. **Isolation des contextes**:
   - Pas de partage de données entre utilisatrices
   - Sanitization des entrées utilisatrices

```javascript
// Gestionnaire sécurisé pour les appels à Claude
class SecureClaudeClient {
  constructor() {
    this.lastRequestTime = 0;
    this.requestsInLastMinute = 0;
    this.MAX_REQUESTS_PER_MINUTE = 10;
    this.MIN_REQUEST_INTERVAL_MS = 1000; // 1 seconde minimum entre requêtes
  }

  async sendMessage(message, context) {
    // Vérifier les limites de rate
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;

    if (timeSinceLastRequest < this.MIN_REQUEST_INTERVAL_MS) {
      throw new Error('Requesting too quickly. Please wait a moment.');
    }

    // Vérifier la limite par minute
    if (this.requestsInLastMinute >= this.MAX_REQUESTS_PER_MINUTE) {
      throw new Error('Maximum request limit reached. Please try again later.');
    }

    // Sanitize les entrées
    const sanitizedMessage = this.sanitizeInput(message);
    const sanitizedContext = this.sanitizeContext(context);

    // Vérifier le contenu
    if (this.containsInappropriateContent(sanitizedMessage)) {
      throw new Error('Your message contains content that cannot be processed.');
    }

    try {
      // Mettre à jour les compteurs
      this.lastRequestTime = now;
      this.requestsInLastMinute++;

      // Réinitialiser le compteur après une minute
      setTimeout(() => {
        this.requestsInLastMinute--;
      }, 60000);

      // Faire la requête sécurisée
      return await this.makeClaudeRequest(sanitizedMessage, sanitizedContext);
    } catch (error) {
      console.error('Error in Claude request:', error);
      throw error;
    }
  }

  // Méthodes auxiliaires
  sanitizeInput(input) {
    // Retirer les caractères potentiellement dangereux
    return input
      .replace(/[^\w\s.,?!:;()\[\]{}'"«»""''\/\-_@#$%^&*+=|~`<>€£¥₹฿₽₩₱₺₴₿]/g, '')
      .trim();
  }

  sanitizeContext(context) {
    // Sanitize chaque champ du contexte
    const sanitized = { ...context };

    if (sanitized.user) {
      // Ne garder que les champs nécessaires
      sanitized.user = {
        phase: this.sanitizeInput(context.user.phase || ''),
        cycle_day: parseInt(context.user.cycle_day || 0, 10),
        preferences: context.user.preferences || {}
      };
    }

    return sanitized;
  }

  containsInappropriateContent(text) {
    // Liste basique de détection
    const inappropriatePatterns = [
      /\b(hack|exploit|inject|attack|overflow|malicious)\b/i,
      // Autres patterns selon les besoins
    ];

    return inappropriatePatterns.some(pattern => pattern.test(text));
  }

  async makeClaudeRequest(message, context) {
    // Appel sécurisé via le backend
    return await apiRequest('melune/conversation', 'POST', {
      message,
      context
    });
  }
}

export const claudeClient = new SecureClaudeClient();
```

## 9. Documentation Technique

### 9.1 Documentation en ligne pour les API

Pour faciliter l'intégration et le développement, une documentation Swagger/OpenAPI sera maintenue:

```yaml
# Extrait d'exemple de documentation OpenAPI
openapi: 3.0.0
info:
  title: MoodCycle API
  version: 1.0.0
  description: API pour l'application MoodCycle de suivi de cycle menstruel
servers:
  - url: https://api.moodcycle.app/v1
    description: Production
  - url: https://staging-api.moodcycle.app/v1
    description: Staging

paths:
  /auth/register:
    post:
      summary: Inscription d'une nouvelle utilisatrice
      tags:
        - Authentication
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - email
                - password
              properties:
                email:
                  type: string
                  format: email
                password:
                  type: string
                  format: password
                  minLength: 8
                profile_data:
                  type: object
                  properties:
                    name:
                      type: string
                    birth_year:
                      type: integer
      responses:
        '201':
          description: Utilisatrice créée avec succès
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  data:
                    type: object
                    properties:
                      user_id:
                        type: string
                      token:
                        type: string
        '400':
          description: Données d'inscription invalides
        '409':
          description: Email déjà utilisé
```

### 9.2 Mécanismes d'erreurs et déboggage

Pour faciliter le développement et le support:

1. **Codes d'erreur standardisés**:
   | Code | Description | Action suggérée |
   |------|-------------|-----------------|
   | `AUTH_001` | Token expiré | Rafraîchir le token |
   | `AUTH_002` | Non autorisé | Vérifier les permissions |
   | `API_001` | Limite de requêtes atteinte | Attendre et réessayer |
   | `DATA_001` | Données invalides | Vérifier le format des données |
   | `CLAUDE_001` | Erreur API Claude | Vérifier les paramètres de la requête |
   | `SYNC_001` | Erreur de synchronisation | Vérifier la connexion internet |

2. **Logging structuré**:
   ```javascript
   // Fonction de logging structuré
   function logEvent(level, category, message, data = {}) {
     const logEntry = {
       timestamp: new Date().toISOString(),
       level,
       category,
       message,
       data,
       app_version: APP_VERSION,
       platform: Platform.OS,
       device_info: getDeviceInfo()
     };

     // Log local pour le débogage
     if (__DEV__) {
       console.log(`[${level.toUpperCase()}][${category}] ${message}`, data);
     }

     // Envoyer au service de logging en production
     if (!__DEV__ && level !== 'debug') {
       sendLogToServer(logEntry);
     }

     // Stocker localement pour diagnostic
     storeLogLocally(logEntry);
   }

   // Fonctions d'usage
   export const logger = {
     debug: (category, message, data) => logEvent('debug', category, message, data),
     info: (category, message, data) => logEvent('info', category, message, data),
     warn: (category, message, data) => logEvent('warn', category, message, data),
     error: (category, message, data) => logEvent('error', category, message, data)
   };
   ```

### 9.3 Procédures de migration et de versionnement

Pour assurer la compatibilité lors des mises à jour:

1. **Versionnement sémantique**:
   - Format: `MAJOR.MINOR.PATCH`
   - Incrémentation selon l'impact des changements

2. **Migrations de données locales**:
   ```javascript
   // Système de migration de base de données locale
   const migrations = [
     {
       version: '1.0.0',
       up: async () => {
         // Configuration initiale de la base
         await db.execute(
           'CREATE TABLE IF NOT EXISTS cycle_entries (id TEXT PRIMARY KEY, date TEXT, data TEXT)'
         );
       }
     },
     {
       version: '1.1.0',
       up: async () => {
         // Ajout d'une nouvelle colonne
         await db.execute(
           'ALTER TABLE cycle_entries ADD COLUMN phase TEXT'
         );
       }
     },
     {
       version: '1.2.0',
       up: async () => {
         // Migration plus complexe
         const entries = await db.query('SELECT * FROM cycle_entries');

         // Créer une nouvelle table
         await db.execute(
           'CREATE TABLE cycle_entries_new (id TEXT PRIMARY KEY, date TEXT, data TEXT, phase TEXT, day INTEGER)'
         );

         // Migrer les données
         for (const entry of entries) {
           const data = JSON.parse(entry.data);
           await db.execute(
             'INSERT INTO cycle_entries_new (id, date, data, phase, day) VALUES (?, ?, ?, ?, ?)',
             [entry.id, entry.date, entry.data, entry.phase || 'unknown', data.day || 0]
           );
         }

         // Remplacer l'ancienne table
         await db.execute('DROP TABLE cycle_entries');
         await db.execute('ALTER TABLE cycle_entries_new RENAME TO cycle_entries');
       }
     }
   ];

   // Exécution des migrations
   async function runMigrations() {
     // Récupérer la version actuelle
     const currentVersion = await getStoredVersion();

     // Trouver les migrations à exécuter
     const pendingMigrations = migrations.filter(m =>
       compareVersions(m.version, currentVersion) > 0
     ).sort((a, b) =>
       compareVersions(a.version, b.version)
     );

     // Exécuter les migrations en séquence
     for (const migration of pendingMigrations) {
       try {
         await migration.up();
         await storeVersion(migration.version);
         logger.info('MIGRATION', `Migrated to version ${migration.version}`);
       } catch (error) {
         logger.error('MIGRATION', `Failed to migrate to ${migration.version}`, { error });
         throw error;
       }
     }
   }
   ```
---

Document approuvé le: 29/04/2025
Version: 1.0
