# Spécifications des Endpoints API - MoodCycle

## 1. Authentification

### 1.1 Inscription
```http
POST /api/v1/auth/register
```
**Request Body:**
```json
{
  "email": "string",
  "password": "string",
  "username": "string",
  "birthDate": "date",
  "acceptTerms": boolean
}
```
**Response:**
```json
{
  "userId": "string",
  "token": "string",
  "expiresIn": number
}
```

### 1.2 Connexion
```http
POST /api/v1/auth/login
```
**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```
**Response:**
```json
{
  "token": "string",
  "expiresIn": number,
  "user": {
    "id": "string",
    "email": "string",
    "username": "string"
  }
}
```

## 2. Cycle Menstruel

### 2.1 Enregistrement du Cycle
```http
POST /api/v1/cycle
```
**Request Body:**
```json
{
  "startDate": "date",
  "endDate": "date",
  "symptoms": ["string"],
  "mood": "string",
  "notes": "string"
}
```

### 2.2 Récupération du Cycle
```http
GET /api/v1/cycle/{cycleId}
```
**Response:**
```json
{
  "id": "string",
  "startDate": "date",
  "endDate": "date",
  "symptoms": ["string"],
  "mood": "string",
  "notes": "string",
  "predictions": {
    "nextPeriod": "date",
    "fertilityWindow": {
      "start": "date",
      "end": "date"
    }
  }
}
```

## 3. Journal d'Humeur

### 3.1 Ajout d'Entrée
```http
POST /api/v1/mood
```
**Request Body:**
```json
{
  "date": "date",
  "moodLevel": number,
  "activities": ["string"],
  "notes": "string",
  "tags": ["string"]
}
```

### 3.2 Historique
```http
GET /api/v1/mood/history
```
**Query Parameters:**
- startDate: date
- endDate: date
- limit: number

## 4. Statistiques

### 4.1 Aperçu
```http
GET /api/v1/stats/overview
```
**Response:**
```json
{
  "cycleStats": {
    "averageLength": number,
    "regularity": "string",
    "lastPeriod": "date"
  },
  "moodStats": {
    "averageMood": number,
    "trend": "string",
    "commonTriggers": ["string"]
  }
}
```

## 5. Codes d'Erreur

| Code | Description |
|------|-------------|
| 400 | Requête invalide |
| 401 | Non authentifié |
| 403 | Accès refusé |
| 404 | Ressource non trouvée |
| 500 | Erreur serveur |

## 6. Sécurité

### 6.1 Authentification
- Utilisation de JWT
- Expiration du token après 24h
- Refresh token disponible

### 6.2 Validation
- Validation des données côté serveur
- Sanitization des entrées
- Protection contre les injections

## 7. Rate Limiting
- 100 requêtes par minute par IP
- 1000 requêtes par jour par utilisateur

## Notes
- Toutes les dates au format ISO 8601
- Tous les endpoints nécessitent une authentification (sauf /auth/*)
- Version actuelle de l'API : v1 