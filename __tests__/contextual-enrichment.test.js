/**
 * 🧪 TEST #1 - Système d'Enrichissement Contextuel Unifié
 * 
 * Valide que notre système génère des insights niveau sophistication onboarding
 * pour une utilisatrice complétant son parcours d'inscription.
 */

import { enrichInsightWithContext, getPersonalizedInsightV2 } from '../data/insights-personalized-v2';

// 👩 MOCK : Utilisatrice Emma sortant de l'onboarding
const mockEmmaOnboardingData = {
  userInfo: {
    prenom: 'Emma',
    ageRange: '18-25',
    journeyStarted: true,
    startDate: new Date().toISOString(),
    prenomCollectedAt: new Date().toISOString()
  },
  persona: {
    assigned: 'emma',
    confidence: 0.92,
    confidenceLevel: 'high',
    lastCalculated: new Date().toISOString(),
    scores: {
      emma: 92,
      laure: 45,
      sylvie: 23,
      christine: 12,
      clara: 38
    }
  },
  preferences: {
    symptoms: 5,     // Très intéressée par les symptômes
    moods: 4,        // Intéressée par les humeurs
    phyto: 3,        // Moyennement intéressée 
    phases: 4,       // Intéressée par les phases
    lithotherapy: 2, // Peu intéressée
    rituals: 3       // Moyennement intéressée
  },
  journeyChoice: {
    selectedOption: 'body',           // Reconnexion corporelle
    motivation: 'Comprendre mon corps et mes cycles'
  },
  melune: {
    avatarStyle: 'classic',
    communicationTone: 'friendly',    // Ton amical
    personalityMatch: 'empathetic'
  },
  cycleData: {
    lastPeriodDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // Il y a 3 jours
    averageCycleLength: 28,
    averagePeriodLength: 5,
    isRegular: true,
    trackingExperience: 'basic'
  },
  usedInsights: [], // Aucun insight encore utilisé
  completed: true
};

describe('🌟 Système d\'Enrichissement Contextuel - Test Intégration', () => {
  
  test('🎯 ZE TEST ULTIME : Génère un insight enrichi pour Emma sortant de l\'onboarding', () => {
    // 🔬 SIMULATION : Emma vient de terminer son onboarding et se connecte pour la première fois
    console.log('🎭 Test avec Emma (persona assigné:', mockEmmaOnboardingData.persona.assigned, ')');
    
    // 1️⃣ PHASE : Emma est actuellement en phase menstruelle (3 jours après le début)
    const currentPhase = 'menstrual';
    
    // 2️⃣ GÉNÉRATION : Utiliser le système unifié pour générer l'insight
    const insightResult = getPersonalizedInsightV2(
      currentPhase,
      mockEmmaOnboardingData.persona.assigned,
      mockEmmaOnboardingData.preferences,
      mockEmmaOnboardingData.melune,
      mockEmmaOnboardingData.usedInsights,
      mockEmmaOnboardingData // 🌟 LE STORE COMPLET pour enrichissement contextuel
    );
    
    console.log('📝 Insight généré:', insightResult.content);
    console.log('🎯 Source:', insightResult.source);
    console.log('🧪 Debug enrichissement:', insightResult.debug);
    
    // 3️⃣ VALIDATIONS : Vérifier la qualité de l'enrichissement
    
    // ✅ L'insight doit être enrichi
    expect(insightResult.source).toBe('persona-system-v2-enriched');
    expect(insightResult.debug.isEnriched).toBe(true);
    expect(insightResult.debug.prenom).toBe('Emma');
    
    // ✅ Le contenu doit contenir le prénom
    expect(insightResult.content).toContain('Emma');
    
    // ✅ Le contenu doit être sophistiqué (plus de 50 caractères minimum)
    expect(insightResult.content.length).toBeGreaterThan(50);
    
    // ✅ Doit contenir des éléments de personnalisation Emma
    const content = insightResult.content.toLowerCase();
    expect(
      content.includes('découverte') || 
      content.includes('accompagne') || 
      content.includes('🌸') ||
      content.includes('essence')
    ).toBe(true);
    
    // ✅ Persona et phase correctement assignés
    expect(insightResult.persona).toBe('emma');
    expect(insightResult.id).toBeTruthy(); // Doit avoir un ID d'insight
    
    // ✅ Score de pertinence élevé (>= 100 pour persona match)
    expect(insightResult.relevanceScore).toBeGreaterThanOrEqual(100);
    
    // 4️⃣ TEST DIRECT DE LA FONCTION D'ENRICHISSEMENT
    const testBaseVariant = "Tes crampes te parlent aujourd'hui ! 💕 C'est normal, ton corps apprend à communiquer avec toi.";
    const enrichedMessage = enrichInsightWithContext(testBaseVariant, mockEmmaOnboardingData, currentPhase);
    
    console.log('🧪 Test direct enrichissement:');
    console.log('  📥 Input:', testBaseVariant);
    console.log('  📤 Output:', enrichedMessage);
    
    // ✅ Le message enrichi doit être plus long que l'original
    expect(enrichedMessage.length).toBeGreaterThan(testBaseVariant.length);
    
    // ✅ Doit commencer par le prénom + contexte
    expect(enrichedMessage.startsWith('Emma,')).toBe(true);
    
    // ✅ Doit contenir le message de base
    expect(enrichedMessage).toContain(testBaseVariant);
    
    // ✅ Doit se terminer par une conclusion Emma
    expect(enrichedMessage).toContain('🌸');
    
    // 🎉 SUCCESS : Le système fonctionne parfaitement !
    console.log('🎉 SUCCESS ! Le système d\'enrichissement contextuel fonctionne parfaitement');
    console.log('📊 Insight final généré:', {
      length: insightResult.content.length,
      hasPrenom: insightResult.content.includes('Emma'),
      persona: insightResult.persona,
      source: insightResult.source,
      relevanceScore: insightResult.relevanceScore
    });
  });
  
}); 