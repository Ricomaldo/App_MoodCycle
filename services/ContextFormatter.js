// services/ContextFormatter.js
// Formateur de contexte pour API MoodCycle
// Transforme OnboardingStore → Payload API

import { useOnboardingStore } from '../stores/useOnboardingStore.js';

class ContextFormatter {
  
  /**
   * 🎯 FONCTION PRINCIPALE
   * Transforme le store complet en contexte API
   */
  static formatForAPI(onboardingData = null) {
    // Récupérer données du store si pas fournies
    const data = onboardingData || useOnboardingStore.getState();
    
    // Vérifier si persona est calculé, sinon le calculer
    const persona = this.ensurePersonaCalculated(data);
    
    return {
      // Persona calculé ou assigné
      persona: persona,
      
      // Profil utilisateur formaté
      userProfile: this.formatUserProfile(data.userInfo),
      
      // Phase actuelle du cycle (si disponible)
      currentPhase: this.getCurrentPhase(data.cycleData),
      
      // Préférences utilisateur (scores 0-5)
      preferences: data.preferences || {},
      
      // Ton de communication basé sur Melune config
      communicationTone: this.mapCommunicationTone(data.melune?.communicationTone),
      
      // Métadonnées contextuelles
      context: {
        journeyChoice: data.journeyChoice?.selectedOption,
        trackingExperience: data.cycleData?.trackingExperience,
        isOnboardingComplete: data.completed,
        lastPersonaCalculation: data.persona?.lastCalculated
      }
    };
  }

  /**
   * 🧮 ASSURER QUE LE PERSONA EST CALCULÉ
   */
  static ensurePersonaCalculated(data) {
    // Si persona déjà assigné récemment, l'utiliser
    if (data.persona?.assigned && data.persona?.lastCalculated) {
      const hoursSinceCalculation = (Date.now() - data.persona.lastCalculated) / (1000 * 60 * 60);
      if (hoursSinceCalculation < 24) { // Valide pendant 24h
        return data.persona.assigned;
      }
    }
    
    // Sinon calculer à la volée
    try {
      const store = useOnboardingStore.getState();
      return store.calculateAndAssignPersona();
    } catch (error) {
      console.warn('🚨 Erreur calcul persona, fallback emma:', error);
      return 'emma'; // Persona par défaut
    }
  }

  /**
   * 👤 FORMATER PROFIL UTILISATEUR
   */
  static formatUserProfile(userInfo) {
    if (!userInfo) return {};
    
    return {
      prenom: userInfo.prenom || null,
      ageRange: userInfo.ageRange || null,
      journeyStarted: userInfo.journeyStarted || false,
      startDate: userInfo.startDate || null,
      prenomCollectedAt: userInfo.prenomCollectedAt || null
    };
  }

  /**
   * 🌙 CALCULER PHASE ACTUELLE
   */
  static getCurrentPhase(cycleData) {
    if (!cycleData?.lastPeriodDate) {
      return 'non définie';
    }
    
    try {
      const lastPeriod = new Date(cycleData.lastPeriodDate);
      const today = new Date();
      const daysSinceLastPeriod = Math.floor((today - lastPeriod) / (1000 * 60 * 60 * 24));
      const cycleLength = cycleData.averageCycleLength || 28;
      
      // Logique simplifiée des phases
      if (daysSinceLastPeriod <= (cycleData.averagePeriodLength || 5)) {
        return 'menstruelle';
      } else if (daysSinceLastPeriod <= 13) {
        return 'folliculaire';
      } else if (daysSinceLastPeriod <= 16) {
        return 'ovulatoire';
      } else if (daysSinceLastPeriod <= cycleLength) {
        return 'lutéale';
      } else {
        return 'retard/irrégulier';
      }
    } catch (error) {
      console.warn('🚨 Erreur calcul phase:', error);
      return 'non définie';
    }
  }

  /**
   * 💬 MAPPER TON DE COMMUNICATION
   */
  static mapCommunicationTone(meluneTone) {
    const mapping = {
      'friendly': 'bienveillant',
      'professional': 'direct', 
      'inspiring': 'inspirant'
    };
    
    return mapping[meluneTone] || 'bienveillant';
  }

  /**
   * 🚀 VERSION COMPACTE POUR ÉCONOMISER BANDE PASSANTE
   */
  static formatCompact(onboardingData = null) {
    const fullContext = this.formatForAPI(onboardingData);
    
    // Garder seulement l'essentiel
    return {
      persona: fullContext.persona,
      userProfile: {
        prenom: fullContext.userProfile.prenom,
        ageRange: fullContext.userProfile.ageRange
      },
      currentPhase: fullContext.currentPhase,
      preferences: fullContext.preferences,
      communicationTone: fullContext.communicationTone
    };
  }

  /**
   * 🔍 VALIDATION DU CONTEXTE GÉNÉRÉ
   */
  static validateContext(context) {
    const errors = [];
    
    // Vérifications basiques
    if (!context.persona) {
      errors.push('Persona manquant');
    }
    
    if (!context.preferences || Object.keys(context.preferences).length === 0) {
      errors.push('Préférences manquantes');
    }
    
    if (!context.communicationTone) {
      errors.push('Ton de communication manquant');
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * 🧪 FONCTION DE TEST/DEBUG
   */
  static debugContext() {
    const context = this.formatForAPI();
    const validation = this.validateContext(context);
    
    console.log('🎯 Context généré:', context);
    console.log('✅ Validation:', validation);
    
    return { context, validation };
  }
  
  /**
   * 📱 HOOK POUR UTILISATION DANS COMPOSANTS
   */
  static useFormattedContext() {
    const onboardingData = useOnboardingStore();
    
    return {
      formatForAPI: () => this.formatForAPI(onboardingData),
      formatCompact: () => this.formatCompact(onboardingData),
      getCurrentContext: () => this.formatForAPI(onboardingData)
    };
  }
}

export default ContextFormatter;

// Export des fonctions utilitaires
export const formatContextForAPI = ContextFormatter.formatForAPI;
export const formatCompactContext = ContextFormatter.formatCompact;
export const validateAPIContext = ContextFormatter.validateContext;