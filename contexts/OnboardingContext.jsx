import React, { createContext, useContext, useReducer } from 'react';

// État initial des données d'onboarding
const initialState = {
  // Données de base utilisateur
  userInfo: {
    journeyStarted: false,
    startDate: null,
  },
  
  // Choix profond de l'écran rencontre
  journeyChoice: {
    selectedOption: null, // 'body', 'nature', 'emotions'
    motivation: '',
  },
  
  // Données du cycle menstruel
  cycleData: {
    lastPeriodDate: null,
    averageCycleLength: 28,
    averagePeriodLength: 5,
    isRegular: null,
    trackingExperience: null, // 'never', 'basic', 'advanced'
  },
  
  // Préférences sur 6 dimensions (échelle 0-5)
  preferences: {
    symptoms: 3,        // Symptômes physiques
    moods: 3,          // Humeurs
    phyto: 3,          // Phyto/HE  
    phases: 3,         // Énergie des phases
    lithotherapy: 3,   // Lithothérapie
    rituals: 3,        // Rituels bien-être
  },
  
  // Configuration de l'avatar Melune
  melune: {
    avatarStyle: 'classic',           // 'classic', 'modern', 'mystique'
    communicationTone: 'friendly',    // 'friendly', 'professional', 'inspiring'
    personalityMatch: null,           // Calculé basé sur les préférences
  },
  
  // Premier conseil personnalisé
  firstInsight: {
    message: '',
    category: null,     // 'cycle', 'wellbeing', 'self-discovery'
    unlocked: false,
  },
  
  completed: false,
};

// Actions pour le reducer
const OnboardingActions = {
  UPDATE_USER_INFO: 'UPDATE_USER_INFO',
  UPDATE_JOURNEY_CHOICE: 'UPDATE_JOURNEY_CHOICE',
  UPDATE_CYCLE_DATA: 'UPDATE_CYCLE_DATA', 
  UPDATE_PREFERENCES: 'UPDATE_PREFERENCES',
  UPDATE_MELUNE: 'UPDATE_MELUNE',
  UPDATE_FIRST_INSIGHT: 'UPDATE_FIRST_INSIGHT',
  COMPLETE_ONBOARDING: 'COMPLETE_ONBOARDING',
  RESET: 'RESET',
};

// Reducer pour gérer les états
function onboardingReducer(state, action) {
  switch (action.type) {
    case OnboardingActions.UPDATE_USER_INFO:
      return {
        ...state,
        userInfo: { ...state.userInfo, ...action.payload }
      };
    case OnboardingActions.UPDATE_JOURNEY_CHOICE:
      return {
        ...state,
        journeyChoice: { ...state.journeyChoice, ...action.payload }
      };
    case OnboardingActions.UPDATE_CYCLE_DATA:
      return {
        ...state,
        cycleData: { ...state.cycleData, ...action.payload }
      };
    case OnboardingActions.UPDATE_PREFERENCES:
      return {
        ...state,
        preferences: { ...state.preferences, ...action.payload }
      };
    case OnboardingActions.UPDATE_MELUNE:
      return {
        ...state,
        melune: { ...state.melune, ...action.payload }
      };
    case OnboardingActions.UPDATE_FIRST_INSIGHT:
      return {
        ...state,
        firstInsight: { ...state.firstInsight, ...action.payload }
      };
    case OnboardingActions.COMPLETE_ONBOARDING:
      return {
        ...state,
        completed: true
      };
    case OnboardingActions.RESET:
      return initialState;
    default:
      return state;
  }
}

// Context
const OnboardingContext = createContext();

// Provider
export function OnboardingProvider({ children }) {
  const [state, dispatch] = useReducer(onboardingReducer, initialState);

  const updateUserInfo = (data) => {
    dispatch({ type: OnboardingActions.UPDATE_USER_INFO, payload: data });
  };

  const updateJourneyChoice = (data) => {
    dispatch({ type: OnboardingActions.UPDATE_JOURNEY_CHOICE, payload: data });
  };

  const updateCycleData = (data) => {
    dispatch({ type: OnboardingActions.UPDATE_CYCLE_DATA, payload: data });
  };

  const updatePreferences = (data) => {
    dispatch({ type: OnboardingActions.UPDATE_PREFERENCES, payload: data });
  };

  const updateMelune = (data) => {
    dispatch({ type: OnboardingActions.UPDATE_MELUNE, payload: data });
  };

  const updateFirstInsight = (data) => {
    dispatch({ type: OnboardingActions.UPDATE_FIRST_INSIGHT, payload: data });
  };

  const completeOnboarding = () => {
    dispatch({ type: OnboardingActions.COMPLETE_ONBOARDING });
  };

  const resetOnboarding = () => {
    dispatch({ type: OnboardingActions.RESET });
  };

  // Fonction utilitaire pour calculer la personnalité de Melune basée sur les préférences
  const calculateMelunePersonality = () => {
    const { preferences } = state;
    
    if (preferences.lithotherapy >= 4 && preferences.phases >= 4) {
      return 'mystique';
    } else if (preferences.symptoms >= 4) {
      return 'classic';
    } else if (preferences.moods >= 4 || preferences.rituals >= 4) {
      return 'modern';
    } else {
      return 'classic';
    }
  };

  const value = {
    ...state,
    onboardingData: state, // Alias pour compatibilité avec les écrans
    updateUserInfo,
    updateJourneyChoice,
    updateCycleData,
    updatePreferences,
    updateMelune,
    updateFirstInsight,
    completeOnboarding,
    resetOnboarding,
    calculateMelunePersonality,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

// Hook pour utiliser le context
export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
} 