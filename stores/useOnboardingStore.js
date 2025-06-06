import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  
  // Informations d'abonnement
  subscription: {
    trialStarted: false,
    trialStartDate: null,
    planSelected: null,     // 'monthly', 'yearly'
    isSubscribed: false,
    subscriptionDate: null,
  },
  
  completed: false,
};

export const useOnboardingStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      // Actions pour mettre à jour les données
      updateUserInfo: (data) =>
        set((state) => ({
          userInfo: { ...state.userInfo, ...data },
        })),

      updateJourneyChoice: (data) =>
        set((state) => ({
          journeyChoice: { ...state.journeyChoice, ...data },
        })),

      updateCycleData: (data) =>
        set((state) => ({
          cycleData: { ...state.cycleData, ...data },
        })),

      updatePreferences: (data) =>
        set((state) => ({
          preferences: { ...state.preferences, ...data },
        })),

      updateMelune: (data) =>
        set((state) => ({
          melune: { ...state.melune, ...data },
        })),

      updateFirstInsight: (data) =>
        set((state) => ({
          firstInsight: { ...state.firstInsight, ...data },
        })),

      updateSubscriptionInfo: (data) =>
        set((state) => ({
          subscription: { ...state.subscription, ...data },
        })),

      completeOnboarding: () =>
        set(() => ({
          completed: true,
        })),

      resetOnboarding: () =>
        set(() => initialState),

      // Fonction utilitaire pour calculer la personnalité de Melune
      calculateMelunePersonality: () => {
        const { preferences } = get();
        
        if (preferences.lithotherapy >= 4 && preferences.phases >= 4) {
          return 'mystique';
        } else if (preferences.symptoms >= 4) {
          return 'classic';
        } else if (preferences.moods >= 4 || preferences.rituals >= 4) {
          return 'modern';
        } else {
          return 'classic';
        }
      },

      // Getter pour compatibilité avec l'ancien context
      getOnboardingData: () => get(),
    }),
    {
      name: 'onboarding-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Optionnel : personnaliser ce qui est persisté
      partialize: (state) => ({
        userInfo: state.userInfo,
        journeyChoice: state.journeyChoice,
        cycleData: state.cycleData,
        preferences: state.preferences,
        melune: state.melune,
        firstInsight: state.firstInsight,
        subscription: state.subscription,
        completed: state.completed,
      }),
    }
  )
); 