# Modèle de Calcul du Cycle Menstruel - MoodCycle

## 1. Introduction

Ce document définit les algorithmes et méthodes de calcul utilisés par MoodCycle pour prédire, analyser et gérer les données cycliques des utilisatrices. Il servira de référence technique pour l'implémentation des fonctionnalités de suivi du cycle menstruel.

L'objectif est de fournir des prédictions précises tout en gérant efficacement les variations, les cas atypiques et les différentes conditions physiologiques pouvant influencer le cycle menstruel.

## 2. Algorithmes de Prédiction du Cycle

### 2.1 Prédiction Standard

**Entrées requises** :
- Date des dernières règles (DLR)
- Historique des cycles précédents (si disponible)
- Durée moyenne du cycle (par défaut : 28 jours)
- Durée moyenne des règles (par défaut : 5 jours)

**Formule de base pour la prédiction des prochaines règles** :
```
Date prochaines règles = DLR + Durée moyenne du cycle
```

**Méthode de calcul avancée** :
Si l'utilisatrice a enregistré au moins 3 cycles :
1. Calculer la moyenne des N derniers cycles (où N = min(12, nombre_de_cycles_enregistrés))
2. Appliquer une pondération plus forte aux cycles récents :
```
Durée_pondérée = Σ(Durée_cycle[i] * Poids[i]) / Σ(Poids[i])

Où Poids[i] = (N - (N - i - 1)) / Σ(j=0 à N-1) j
```
3. Utiliser cette durée pondérée pour prédire les prochaines règles

### 2.2 Détermination des Phases du Cycle

La division standard du cycle en 4 phases :

1. **Phase Menstruelle** : Du jour 1 au jour `duréeRègles` (généralement 1-5)
2. **Phase Folliculaire** : Du jour `duréeRègles+1` jusqu'à `(duréeCycle - 14) - 1`
3. **Phase Ovulatoire** : De `(duréeCycle - 14)` à `(duréeCycle - 14) + 4`
4. **Phase Lutéale** : De `(duréeCycle - 14) + 5` jusqu'à la fin du cycle

**Exemple pour un cycle de 28 jours et règles de 5 jours** :
- Phase Menstruelle : Jours 1-5
- Phase Folliculaire : Jours 6-13
- Phase Ovulatoire : Jours 14-18
- Phase Lutéale : Jours 19-28

### 2.3 Calcul d'Ovulation

Pour un cycle régulier, l'ovulation est estimée à :
```
Date ovulation = DLR + (Durée moyenne du cycle - 14)
```

Période fertile (plus large pour capturer les variations) :
```
Début période fertile = Date ovulation - 5
Fin période fertile = Date ovulation + 2
```

### 2.4 Intégration de la Variabilité

Pour capturer l'incertitude dans les prédictions :
1. Calculer l'écart-type des durées de cycle : `σ`
2. Définir une fenêtre de confiance pour les prédictions :
```
Prédiction précoce = DLR + Durée moyenne - 1.5*σ
Prédiction tardive = DLR + Durée moyenne + 1.5*σ
```
3. Ajuster la communication à l'utilisatrice en fonction de cette variabilité

## 3. Ajustements et Cas Particuliers

### 3.1 Contraception Hormonale

Si l'utilisatrice utilise une contraception hormonale :

**Pilule Combinée** :
- Phase Menstruelle : Jours sans pilule/placebo (généralement 1-7)
- Pas de distinction claire des autres phases hormis artificiellement
- Durée du cycle fixée par la plaquette (généralement 28 jours)

**Pilule Progestative** :
- Pas de phase distincte (suppression de l'ovulation)
- Les saignements peuvent être irréguliers ou absents
- Utiliser plutôt un suivi des symptômes sans prédiction fiable

**DIU Hormonal (Mirena, etc.)** :
- Réduire la fiabilité des prédictions
- Certaines utilisatrices maintiennent un cycle mais avec des règles réduites

### 3.2 Périodes de Transition

**Adolescence (Premières Années)**:
- Augmenter la marge d'erreur des prédictions de +/-7 jours
- Mettre l'accent sur l'apprentissage plutôt que sur la précision
- Réduire le nombre minimal de cycles pour l'analyse statistique à 2

**Préménopause**:
- Augmenter progressivement la variabilité acceptée
- Ajuster le modèle quand la durée de cycle dépasse régulièrement 35 jours
- Alerter l'utilisatrice sur les limites de précision

**Post-partum et Allaitement**:
- Système alternatif sans prédiction de cycle pendant l'aménorrhée
- Phase de "retour de cycle" avec attention particulière aux premiers signes

### 3.3 Conditions Médicales

**SOPK (Syndrome des Ovaires Polykystiques)**:
- Accepter des durées de cycle jusqu'à 60 jours
- Définir un mode de suivi spécifique sans période fertile fixe
- Ajuster la pondération pour les cycles très irréguliers

**Endométriose/Adénomyose**:
- Maintenir les prédictions standard
- Ajouter un suivi spécifique d'intensité de la douleur
- Option pour enregistrer les traitements et leur effet

## 4. Métriques et Variables du Modèle

### 4.1 Variables Principales

| Variable | Type | Description | Valeurs par défaut |
|----------|------|-------------|-------------------|
| `lastPeriodDate` | Date | Date du premier jour des dernières règles | - |
| `cycleLength` | Entier | Durée moyenne du cycle en jours | 28 |
| `periodLength` | Entier | Durée moyenne des règles en jours | 5 |
| `cycleHistory` | Tableau | Historique des cycles précédents | [] |
| `hormoneUse` | Booléen | Contraception hormonale active | false |
| `hormoneType` | Enum | Type de contraception hormonale | null |
| `lifeStage` | Enum | Stade de vie reproductive | "REGULAR" |
| `medicalConditions` | Tableau | Conditions médicales pertinentes | [] |

### 4.2 Variables Dérivées et Métriques

| Variable | Calcul | Utilisation |
|----------|--------|-------------|
| `cycleVariability` | Écart-type des durées de cycle | Mesure de régularité |
| `predictionConfidence` | Fonction basée sur `cycleVariability` et `cycleHistory.length` | Indique la fiabilité des prédictions |
| `phaseDistribution` | Pourcentages de durée pour chaque phase | Identification des déséquilibres |
| `symptomCorrelation` | Corrélation entre phases et symptômes rapportés | Personnalisation des insights |
| `cycleRegularity` | Score basé sur les variations de durée | Feedback à l'utilisatrice |

### 4.3 Formules de Calcul

**Variabilité du cycle** :
```javascript
function calculateVariability(cycleHistory) {
  if (cycleHistory.length < 2) return null;

  const lengths = cycleHistory.map(cycle => cycle.length);
  const mean = lengths.reduce((sum, length) => sum + length, 0) / lengths.length;

  const squaredDiffs = lengths.map(length => Math.pow(length - mean, 2));
  const variance = squaredDiffs.reduce((sum, diff) => sum + diff, 0) / lengths.length;

  return Math.sqrt(variance); // écart-type
}
```

**Score de confiance de prédiction** :
```javascript
function calculatePredictionConfidence(cycleHistory, variability) {
  if (!variability || cycleHistory.length < 2) return 0.5; // confiance modérée par défaut

  // Facteur basé sur le nombre de cycles (plafonné à 12)
  const historyFactor = Math.min(cycleHistory.length, 12) / 12;

  // Facteur basé sur la variabilité (plus stable = plus confiant)
  const variabilityFactor = Math.max(0, 1 - (variability / 10));

  // Pondération: 60% sur la stabilité, 40% sur l'historique
  return (variabilityFactor * 0.6) + (historyFactor * 0.4);
}
```

**Distribution des phases** (pour un cycle de longueur L) :
```javascript
function calculatePhaseDistribution(cycleLength, periodLength) {
  const lutealLength = 14; // Relativement constante
  const ovulatoryLength = 5;

  // La phase folliculaire absorbe les variations de longueur du cycle
  const follicularLength = cycleLength - (periodLength + ovulatoryLength + lutealLength);

  // Si le calcul donne une phase folliculaire très courte ou négative, ajuster
  const adjustedFollicularLength = Math.max(1, follicularLength);

  return {
    menstrual: periodLength / cycleLength,
    follicular: adjustedFollicularLength / cycleLength,
    ovulatory: ovulatoryLength / cycleLength,
    luteal: lutealLength / cycleLength
  };
}
```

## 5. Gestion des Cas Atypiques et Exceptions

### 5.1 Cycles Très Courts ou Très Longs

**Cycles Courts (<21 jours)** :
- Notification à l'utilisatrice suggérant une consultation
- Maintien des prédictions mais avec indicateur de fiabilité réduite
- Ajustement des phases avec priorité à la phase lutéale (14 jours)

**Cycles Longs (>35 jours)** :
- Classification comme "cycle long" avec traitement spécial
- Extension de la phase folliculaire (qui absorbe la variation)
- Option pour l'utilisatrice de signaler manuellement des signes d'ovulation

**Algorithme d'adaptation pour cycles atypiques** :
```javascript
function adjustPhaseCalculation(cycleLength, periodLength) {
  // Durées minimum pour chaque phase
  const MIN_MENSTRUAL = 2;
  const MIN_FOLLICULAR = 3;
  const MIN_OVULATORY = 3;
  const MIN_LUTEAL = 10;

  let menstrual = Math.min(periodLength, cycleLength * 0.25);
  menstrual = Math.max(MIN_MENSTRUAL, menstrual);

  let luteal = 14; // Priorité à préserver la phase lutéale
  luteal = Math.min(luteal, cycleLength - (menstrual + MIN_FOLLICULAR + MIN_OVULATORY));
  luteal = Math.max(MIN_LUTEAL, luteal);

  let ovulatory = 5;
  ovulatory = Math.min(ovulatory, cycleLength - (menstrual + MIN_FOLLICULAR + luteal));
  ovulatory = Math.max(MIN_OVULATORY, ovulatory);

  // La phase folliculaire absorbe le reste
  let follicular = cycleLength - (menstrual + ovulatory + luteal);
  follicular = Math.max(MIN_FOLLICULAR, follicular);

  return { menstrual, follicular, ovulatory, luteal };
}
```

### 5.2 Irrégularités et Saignements Anormaux

**Saignements Intermenstruels** :
- Option pour l'utilisatrice de signaler un saignement hors règles
- Ne pas réinitialiser le compteur de cycle, mais enregistrer l'événement
- Ajuster les prédictions en fonction du modèle:
  - Si récurrent à la même période du cycle, potentiellement l'intégrer
  - Si aléatoire, le traiter comme anomalie et ignorer pour les prédictions

**Règles Manquées** :
- Après 7 jours de retard, proposer l'option "règles manquées"
- Après 45 jours sans règles, alerter pour potentielle consultation
- Option de réinitialiser manuellement le cycle ou d'étendre la prédiction

**Aménorrhée** :
- Mode spécial quand > 90 jours sans règles
- Désactivation des prédictions et passage à un suivi de symptômes uniquement
- Réactivation à la prochaine déclaration de règles

### 5.3 Récupération Après Perturbations

**Après Contraception Hormonale** :
- Période "d'apprentissage" avec confiance réduite (premiers 3 cycles)
- Augmentation progressive du poids des nouveaux cycles dans le calcul
- Notification que la précision va s'améliorer avec le temps

**Après Grossesse/Allaitement** :
- Mode spécial post-partum (0-6 mois)
- Transition vers un mode régulier après détection de 2 cycles consécutifs
- Exclusion des premiers cycles post-partum des calculs de moyenne à long terme

**Adaptation aux Changements Majeurs** :
```javascript
function detectCyclePatternChange(recentCycles, historicalAverage) {
  // Calculer la moyenne des 3 derniers cycles
  const recentAverage = recentCycles.reduce((sum, c) => sum + c.length, 0) / recentCycles.length;

  // Si la différence dépasse 20%, considérer comme un changement de pattern
  if (Math.abs(recentAverage - historicalAverage) / historicalAverage > 0.2) {
    return {
      patternChanged: true,
      newAverage: recentAverage
    };
  }

  return { patternChanged: false };
}
```

## 6. Implémentation et Architecture

### 6.1 Structure des Données

```javascript
// Modèle de stockage des données de cycle
const cycleDataModel = {
  user_id: String,                     // Référence à l'utilisatrice
  initial_data: {
    last_period_date: Date,            // Date dernières règles
    average_cycle_length: Number,      // Durée moyenne cycle (jours)
    average_period_length: Number,     // Durée moyenne règles (jours)
    hormonal_contraception: Boolean,   // Contraception hormonale
    contraception_type: String         // Type si applicable
  },
  phase_adjustments: {                 // Ajustements personnalisés
    menstrual_length: Number,          // Durée phase menstruelle
    follicular_length: Number,         // Durée phase folliculaire
    ovulatory_length: Number,          // Durée phase ovulatoire
    luteal_length: Number              // Durée phase lutéale
  },
  medical_info: {                      // Info médicales (optionnel)
    conditions: [String],              // Conditions médicales
    life_stage: String                 // "REGULAR", "PERIMENOPAUSE", "MENOPAUSE", etc.
  },
  entries: [                          // Enregistrements chronologiques
    {
      date: Date,                     // Date de l'entrée
      cycle_day: Number,              // Jour du cycle (calculé)
      phase: String,                  // Phase du cycle
      period_flow: String,            // "NONE", "LIGHT", "MEDIUM", "HEAVY"
      // Autres données journalières...
    }
  ],
  cycle_history: [                     // Historique des cycles
    {
      cycle_number: Number,            // Numéro du cycle
      start_date: Date,                // Date de début (J1)
      end_date: Date,                  // Date de fin
      length: Number,                  // Durée totale
      period_length: Number,           // Durée des règles
      phases: {                        // Durée des phases
        menstrual: Number,
        follicular: Number,
        ovulatory: Number,
        luteal: Number
      }
    }
  ],
  predictions: {                       // Prédictions calculées
    next_period: Date,                 // Prochaines règles prévues
    next_ovulation: Date,              // Prochaine ovulation
    current_phase: String,             // Phase actuelle
    current_cycle_day: Number,         // Jour du cycle actuel
    phase_end_date: Date,              // Fin de phase actuelle
    prediction_confidence: Number,     // Fiabilité (0-1)
    prediction_window: {               // Fenêtre de probabilité
      earliest: Date,
      most_likely: Date,
      latest: Date
    }
  }
};
```

### 6.2 API et Services

Le système de calcul doit être mis en œuvre via une architecture service qui permet :
- La séparation des préoccupations
- La réutilisation du code
- La maintenance simplifiée
- Les tests unitaires

**Structure recommandée** :
```
services/
  ├── cycle/
  │   ├── cycle-calculator.service.js   // Calculs principaux
  │   ├── phase-detector.service.js     // Détection de phase
  │   ├── prediction.service.js         // Prédictions
  │   └── anomaly-detector.service.js   // Détection d'anomalies
  ├── stats/
  │   ├── cycle-statistics.service.js   // Statistiques et tendances
  │   └── correlation.service.js        // Corrélations symptômes/phases
  └── utils/
      ├── date-utils.js                 // Manipulation de dates
      └── validation.js                 // Validation des entrées
```

### 6.3 Processus de Recalcul

1. **Déclencheurs de recalcul** :
   - Saisie de nouvelles règles
   - Mise à jour des données utilisatrice
   - Minuit chaque jour (changement de jour)
   - Ouverture de l'application après plus de 24h

2. **Étapes du processus** :
   ```javascript
   function recalculateCycleData(userId) {
     // 1. Récupérer les données
     const userData = getUserData(userId);
     const cycleData = getCycleData(userId);

     // 2. Vérifier si des mises à jour sont nécessaires
     if (!requiresRecalculation(cycleData)) return cycleData;

     // 3. Mettre à jour les statistiques historiques
     const stats = calculateCycleStatistics(cycleData.cycle_history);

     // 4. Déterminer la phase actuelle
     const currentPhase = detectCurrentPhase(cycleData, new Date());

     // 5. Générer les prédictions
     const predictions = generatePredictions(cycleData, stats);

     // 6. Détecter les anomalies potentielles
     const anomalies = detectAnomalies(cycleData, stats);

     // 7. Mettre à jour le modèle
     return updateCycleData(cycleData, {
       stats,
       currentPhase,
       predictions,
       anomalies
     });
   }
   ```

## 7. Tests et Validation

### 7.1 Jeux de Données de Test

Catégories de scénarios de test à implémenter :

1. **Cycles Réguliers** :
   - Cycles de 28 jours avec règles de 5 jours
   - Cycles de 24-32 jours avec légère variation

2. **Cycles Irréguliers** :
   - Variation de +/- 7 jours
   - Alternance de cycles courts et longs

3. **Cas Particuliers** :
   - Post-contraceptif (premiers cycles)
   - Périménopause (cycles s'allongeant)
   - SOPK (cycles très longs >40 jours)
   - Aménorrhée puis reprise

### 7.2 Métriques de Performance

Pour évaluer l'efficacité des algorithmes :

| Métrique | Calcul | Objectif |
|----------|--------|----------|
| Précision période fertile | % de prédictions correctes | >80% |
| Précision règles | Écart moyen en jours | <2 jours |
| Taux de faux positifs | % d'alertes non pertinentes | <5% |
| Adaptabilité | Cycles nécessaires pour ajustement | <3 cycles |

### 7.3 Procédure de Validation Continue

1. Test initial avec jeux de données simulées
2. Phase bêta avec utilisatrices volontaires
3. Collecte anonymisée des performances pour amélioration
4. Ajustement régulier des algorithmes (trimestriel)

## 8. Évolutions Futures

### 8.1 Améliorations Prévues

- Intégration d'algorithmes d'apprentissage machine pour améliorer les prédictions
- Support pour les capteurs de température et autres biomarqueurs
- Détection automatique des conditions médicales potentielles
- Corrélation avancée entre symptômes et phases

### 8.2 Conformité et Éthique

- Anonymisation complète des données pour analyses agrégées
- Gestion locale des données sensibles quand possible
- Documentation des limites des prédictions (non contraceptives)
- Notifications appropriées pour consultation médicale

---

## Notes d'Implémentation

1. Commencer par le module de base de calcul de cycle
2. Implémenter progressivement les cas particuliers
3. Prioriser la robustesse et la gestion des erreurs
4. Documenter soigneusement les limitations
5. Mettre en place des tests unitaires complets avant intégration
---

Document approuvé le: 29/04/2025
Version: 1.0
