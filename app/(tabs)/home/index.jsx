import { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { theme } from '../../../config/theme';
import MeluneAvatar from '../../../components/MeluneAvatar';
import { Heading1, BodyText } from '../../../components/Typography';
import InsightCard from '../../../components/InsightCard';
import DevNavigation from '../../../components/DevNavigation/DevNavigation';

// Stores Zustand
import { useAppStore } from '../../../stores/useAppStore';
import { useCycleStore } from '../../../stores/useCycleStore';
import { useOnboardingStore } from '../../../stores/useOnboardingStore';

// Import des données d'insights (pour le MVP, utilisons des données statiques)
import { insights } from '../../../data/insights';
import { getPersonalizedInsight } from '../../../data/insights-personalized';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  
  // Stores Zustand
  const { toggleDevMode } = useAppStore();
  const { getCurrentPhaseInfo, initializeFromOnboarding } = useCycleStore();
  const { 
    userInfo, 
    cycleData, 
    preferences, 
    melune, 
    usedInsights, 
    markInsightAsUsed, 
    resetUsedInsights 
  } = useOnboardingStore();
  
  // Récupération du prénom ou fallback si pas encore collecté
  const prenom = userInfo.prenom || 'toi';
  
  const phaseInfo = getCurrentPhaseInfo();
  const phase = phaseInfo.phase;
  
  // 🎯 INSIGHT PERSONNALISÉ avec anti-répétition
  const insightResult = getPersonalizedInsight(
    phase, 
    preferences,
    melune,
    usedInsights
  );
  
  const currentInsight = insightResult.content;
  
  // Marquer l'insight comme vu (une seule fois par chargement)
  useEffect(() => {
    if (insightResult.id && !usedInsights.includes(insightResult.id)) {
      markInsightAsUsed(insightResult.id);
      
      // Reset automatique si nécessaire
      if (insightResult.resetNeeded) {
        resetUsedInsights();
      }
    }
  }, [insightResult.id]);
  
  // 👈 AJOUTER CES LIGNES pour debugger
  console.log('Données du cycle:', cycleData);
  console.log('Date des dernières règles:', cycleData.lastPeriodDate);
  
  // 👈 AJOUTER ce useEffect
  useEffect(() => {
    // Si on a une date de règles dans l'onboarding, initialiser le cycle
    if (cycleData.lastPeriodDate) {
      initializeFromOnboarding(cycleData);
    }
  }, [cycleData.lastPeriodDate]); // Se déclenche quand la date change
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* DevNavigation pour le développement */}
      <DevNavigation />
      
      <View style={styles.header}>
        <Heading1>Bonjour {prenom}</Heading1>
        <BodyText>Jour {phaseInfo.day} • Phase {phaseInfo.name}</BodyText>
        
        {/* Bouton pour activer le mode dev (triple tap) */}
        <TouchableOpacity 
          onPress={toggleDevMode}
          style={styles.devActivator}
        >
          <BodyText style={styles.devText}>🛠️</BodyText>
        </TouchableOpacity>
      </View>
      
      <View style={styles.avatarContainer}>
        <MeluneAvatar phase={phase} size="large" />
      </View>
      
      <InsightCard insight={currentInsight} phase={phase} />
      
      <TouchableOpacity 
        style={styles.chatButton}
        onPress={() => router.push('/chat')}
      >
        <BodyText style={styles.chatButtonText}>Discuter avec Melune</BodyText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.l,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.l,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: theme.spacing.xl,
  },
  chatButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.pill,
    padding: theme.spacing.m,
    alignItems: 'center',
    marginTop: theme.spacing.l,
  },
  chatButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  devActivator: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 10,
  },
  devText: {
    fontSize: 12,
    opacity: 0.3,
  },
}); 