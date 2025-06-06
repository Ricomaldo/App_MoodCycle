import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

// Stores Zustand
import { useOnboardingStore } from '../../stores/useOnboardingStore';
import { useAppStore } from '../../stores/useAppStore';
import { useCycleStore } from '../../stores/useCycleStore';
import { useChatStore } from '../../stores/useChatStore';

// Composants UI
import { Heading3, BodyText, SmallText } from '../Typography';

export default function DevNavigation() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  
  // Stores
  const onboarding = useOnboardingStore();
  const app = useAppStore();
  const cycle = useCycleStore();
  const chat = useChatStore();

  if (!__DEV__ || !app.devMode) {
    return null;
  }

  const resetAllStores = () => {
    onboarding.resetOnboarding();
    app.resetApp();
    cycle.resetCycleData();
    chat.resetChatData();
  };

  const simulateOnboardingData = () => {
    onboarding.updateUserInfo({
      journeyStarted: true,
      startDate: new Date().toISOString(),
    });
    
    onboarding.updateJourneyChoice({
      selectedOption: 'nature',
      motivation: 'Découvrir mon lien avec la nature',
    });
    
    onboarding.updatePreferences({
      symptoms: 4,
      moods: 5,
      phyto: 3,
      phases: 4,
      lithotherapy: 2,
      rituals: 5,
    });
    
    onboarding.completeOnboarding();
  };

  const simulateCycleData = () => {
    cycle.updateCurrentCycle({
      startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // Il y a 15 jours
      currentDay: 15,
      currentPhase: 'ovulatory',
      length: 28,
    });
    
    cycle.addDailyLog(new Date().toISOString().split('T')[0], {
      mood: 'happy',
      energy: 4,
      symptoms: ['cramping'],
    });
  };

  const simulateChatData = () => {
    chat.addUserMessage("Bonjour Melune !");
    chat.addMeluneMessage("Bonjour ma belle ! Comment vous sentez-vous aujourd'hui ?", {
      mood: 'welcoming',
    });
    chat.addUserMessage("Je me sens bien, merci !");
  };

  return (
    <View style={styles.container}>
      {/* Bouton pour montrer/cacher */}
      <TouchableOpacity 
        style={styles.toggleButton}
        onPress={() => setIsVisible(!isVisible)}
      >
        <BodyText style={styles.toggleText}>
          🛠️ DEV
        </BodyText>
      </TouchableOpacity>

      {isVisible && (
        <ScrollView style={styles.panel} showsVerticalScrollIndicator={false}>
          <Heading3 style={styles.title}>Dev Navigation</Heading3>
          
          {/* États des stores */}
          <View style={styles.section}>
            <BodyText style={styles.sectionTitle}>📊 États actuels</BodyText>
            <SmallText style={styles.stateText}>
              Onboarding: {onboarding.completed ? '✅ Terminé' : '⏳ En cours'}
            </SmallText>
            <SmallText style={styles.stateText}>
              Premier lancement: {app.isFirstLaunch ? '✅ Oui' : '❌ Non'}
            </SmallText>
            <SmallText style={styles.stateText}>
              Online: {app.isOnline ? '🟢 Connecté' : '🔴 Offline'}
            </SmallText>
            <SmallText style={styles.stateText}>
              Phase actuelle: {cycle.currentCycle.currentPhase}
            </SmallText>
            <SmallText style={styles.stateText}>
              Messages chat: {chat.messages.length}
            </SmallText>
          </View>

          {/* Navigation rapide */}
          <View style={styles.section}>
            <BodyText style={styles.sectionTitle}>🧭 Navigation</BodyText>
            <TouchableOpacity 
              style={styles.navButton}
              onPress={() => router.push('/onboarding/100-promesse')}
            >
              <BodyText style={styles.navButtonText}>Onboarding</BodyText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.navButton}
              onPress={() => router.push('/(tabs)/home')}
            >
              <BodyText style={styles.navButtonText}>Home</BodyText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.navButton}
              onPress={() => router.push('/(tabs)/chat')}
            >
              <BodyText style={styles.navButtonText}>Chat</BodyText>
            </TouchableOpacity>
          </View>

          {/* Actions de test */}
          <View style={styles.section}>
            <BodyText style={styles.sectionTitle}>⚡ Actions de test</BodyText>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={simulateOnboardingData}
            >
              <SmallText style={styles.actionButtonText}>Simuler Onboarding</SmallText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={simulateCycleData}
            >
              <SmallText style={styles.actionButtonText}>Simuler Cycle</SmallText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={simulateChatData}
            >
              <SmallText style={styles.actionButtonText}>Simuler Chat</SmallText>
            </TouchableOpacity>
          </View>

          {/* Reset */}
          <TouchableOpacity 
            style={styles.resetButton}
            onPress={resetAllStores}
          >
            <BodyText style={styles.resetButtonText}>🗑️ Reset All Stores</BodyText>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    right: 10,
    zIndex: 1000,
  },
  toggleButton: {
    backgroundColor: '#673AB7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  toggleText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  panel: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: 10,
    padding: 15,
    marginTop: 5,
    maxHeight: 400,
    width: 200,
  },
  title: {
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    color: '#CDDC39',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  stateText: {
    color: 'white',
    marginBottom: 4,
    fontSize: 10,
  },
  navButton: {
    backgroundColor: '#E91E63',
    padding: 8,
    borderRadius: 6,
    marginBottom: 6,
  },
  navButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
  },
  actionButton: {
    backgroundColor: '#00BCD4',
    padding: 6,
    borderRadius: 4,
    marginBottom: 4,
  },
  actionButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 10,
  },
  resetButton: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  resetButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
  },
}); 