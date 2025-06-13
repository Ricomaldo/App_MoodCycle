// utils/personaCalculator.js
// Algorithme de calcul et scoring des personas MoodCycle
// Version simplifiée compatible avec config/personaProfiles.js

import { PERSONA_PROFILES, SCORING_WEIGHTS, SCORING_MODIFIERS } from '../config/personaProfiles.js';

/**
 * 🎯 FONCTION PRINCIPALE DE CALCUL DES SCORES
 * Calcule les scores de correspondance pour tous les personas
 */
export const calculatePersonaScores = (userData) => {
  const scores = {};
  const personaNames = Object.keys(PERSONA_PROFILES);
  
  // Calcul du score pour chaque persona
  personaNames.forEach(personaName => {
    scores[personaName] = calculatePersonaScore(userData, personaName);
  });
  
  return scores;
};

/**
 * 🧮 CALCUL DE SCORE INDIVIDUEL POUR UN PERSONA
 */
const calculatePersonaScore = (userData, personaName) => {
  const reference = PERSONA_PROFILES[personaName];
  if (!reference) return 0;
  
  let totalScore = 0;
  
  // 1. Score choix de voyage (25%)
  const journeyScore = calculateJourneyScore(userData, reference);
  totalScore += journeyScore * SCORING_WEIGHTS.JOURNEY_CHOICE;
  
  // 2. Score tranche d'âge (15%)
  const ageScore = calculateAgeScore(userData, reference);
  totalScore += ageScore * SCORING_WEIGHTS.AGE_RANGE;
  
  // 3. Score préférences (40%) - le plus important
  const prefScore = calculatePreferencesScore(userData, reference);
  totalScore += prefScore * SCORING_WEIGHTS.PREFERENCES;
  
  // 4. Score style communication (20%)
  const styleScore = calculateCommunicationScore(userData, reference);
  totalScore += styleScore * SCORING_WEIGHTS.COMMUNICATION;
  
  // Appliquer coefficients persona
  totalScore *= (reference.coefficients?.preferences || 1.0);
  
  return Math.max(0, Math.min(100, totalScore * 100)); // Score sur 100
};

/**
 * 🌟 CALCUL SCORE CHOIX DE VOYAGE
 */
const calculateJourneyScore = (userData, reference) => {
  const userJourney = userData.journey || userData.journeyChoice;
  const refJourneys = reference.preferredJourney;
  
  if (!userJourney || !refJourneys) return 0;
  
  // Correspondance exacte
  if (refJourneys.includes(userJourney)) {
    return 1;
  }
  
  // Correspondances partielles selon logique métier
  const partialMatches = {
    'decouverte': ['comprehension'],
    'optimisation': ['comprehension'],
    'renaissance': ['sagesse'],
    'transmission': ['sagesse']
  };
  
  if (partialMatches[userJourney]) {
    for (const partial of partialMatches[userJourney]) {
      if (refJourneys.includes(partial)) {
        return 0.6;
      }
    }
  }
  
  return 0;
};

/**
 * 🎂 CALCUL SCORE TRANCHE D'ÂGE
 */
const calculateAgeScore = (userData, reference) => {
  const userAge = userData.ageRange;
  const refAges = reference.ageRange;
  
  if (!userAge || !refAges) return 0;
  
  // Correspondance exacte
  if (refAges.includes(userAge)) {
    return 1;
  }
  
  // Correspondances adjacentes (score partiel)
  const ageOrder = ['18-25', '26-35', '36-45', '46-55', '55+'];
  const userIndex = ageOrder.indexOf(userAge);
  
  if (userIndex === -1) return 0;
  
  // Chercher si une tranche adjacente match
  for (const refAge of refAges) {
    const refIndex = ageOrder.indexOf(refAge);
    if (refIndex !== -1) {
      const distance = Math.abs(userIndex - refIndex);
      if (distance === 1) return 0.6;
      if (distance === 2) return 0.3;
    }
  }
  
  return 0;
};

/**
 * 💝 CALCUL SCORE PRÉFÉRENCES (Cœur de l'algorithme)
 */
const calculatePreferencesScore = (userData, reference) => {
  const userPrefs = userData.preferences;
  const refPrefs = reference.strongPreferences;
  
  if (!userPrefs || !refPrefs) return 0;
  
  let matches = 0;
  let totalUserPrefs = 0;
  
  // Convertir préférences utilisateur en array si nécessaire
  const userPrefArray = Array.isArray(userPrefs) ? userPrefs : 
    Object.entries(userPrefs).filter(([key, value]) => value >= 4).map(([key]) => key);
  
  totalUserPrefs = userPrefArray.length;
  
  if (totalUserPrefs === 0) return 0;
  
  // Compter les correspondances
  userPrefArray.forEach(userPref => {
    if (refPrefs.includes(userPref)) {
      matches += 1;
    }
  });
  
  // Score basé sur le pourcentage de correspondances
  const score = matches / totalUserPrefs;
  
  // Bonus pour correspondances multiples
  if (matches >= 2) {
    return Math.min(1, score * 1.2);
  }
  
  return score;
};

/**
 * 💬 CALCUL SCORE COMMUNICATION
 */
const calculateCommunicationScore = (userData, reference) => {
  const userComm = userData.communication;
  const refComm = reference.communicationStyle;
  
  if (!userComm || !refComm) return 0;
  
  // Convertir en array si nécessaire
  const userCommArray = Array.isArray(userComm) ? userComm : [userComm];
  
  // Chercher correspondances
  for (const userStyle of userCommArray) {
    if (refComm.includes(userStyle)) {
      return 1; // Correspondance exacte
    }
  }
  
  // Correspondances partielles selon logique métier
  const styleAffinities = {
    'bienveillant': ['educatif'],
    'direct': ['pratique'],
    'inspirant': ['profond'],
    'sage': ['spirituel'],
    'scientifique': ['precis']
  };
  
  for (const userStyle of userCommArray) {
    if (styleAffinities[userStyle]) {
      for (const affinity of styleAffinities[userStyle]) {
        if (refComm.includes(affinity)) {
          return 0.5; // Correspondance partielle
        }
      }
    }
  }
  
  return 0;
};

/**
 * 🏆 ASSIGNER LE MEILLEUR PERSONA
 */
export const calculateAndAssignPersona = (userData) => {
  const scores = calculatePersonaScores(userData);
  
  // Trouver le persona avec le meilleur score
  let bestPersona = null;
  let bestScore = -1;
  
  Object.entries(scores).forEach(([persona, score]) => {
    if (score > bestScore) {
      bestScore = score;
      bestPersona = persona;
    }
  });
  
  // Calculer confiance (différence avec 2ème meilleur)
  const sortedScores = Object.entries(scores)
    .sort(([,a], [,b]) => b - a);
  
  const confidence = sortedScores.length > 1 ? 
    sortedScores[0][1] - sortedScores[1][1] : bestScore;
  
  return {
    assigned: bestPersona,
    scores,
    confidence: Math.min(100, Math.max(0, confidence)),
    metadata: {
      timestamp: Date.now(),
      algorithm: 'v2_simplified'
    }
  };
};

/**
 * 🧪 FONCTION DE TEST
 */
export const testPersonaMapping = () => {
  const testData = {
    journey: 'decouverte',
    ageRange: '18-25',
    preferences: ['medical', 'naturopathie'],
    communication: ['bienveillant']
  };
  
  const result = calculateAndAssignPersona(testData);
  console.log('🧪 Test Persona Mapping:', result);
  
  return result;
}; 