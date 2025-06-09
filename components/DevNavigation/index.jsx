import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { BodyText } from '../Typography';
import { theme } from '../../config/theme';

// Définition des écrans d'onboarding en ordre
const ONBOARDING_SCREENS = [
  { id: '100-promesse', path: '/onboarding/100-promesse', label: '1. Promesse' },
  { id: '200-rencontre', path: '/onboarding/200-rencontre', label: '2. Rencontre' },
  { id: '300-confiance', path: '/onboarding/300-confiance', label: '3. Confiance' },
  { id: '400-cycle', path: '/onboarding/400-cycle', label: '4. Cycle' },
  { id: '500-preferences', path: '/onboarding/500-preferences', label: '5. Préférences' },
  { id: '600-avatar', path: '/onboarding/600-avatar', label: '6. Avatar' },
  { id: '800-cadeau', path: '/onboarding/800-cadeau', label: '7. Cadeau' },
];

export default function DevNavigation({ currentScreen }) {
  const router = useRouter();
  
  // Trouver l'index de l'écran actuel
  const currentIndex = ONBOARDING_SCREENS.findIndex(screen => screen.id === currentScreen);
  
  // Debug log
  console.log(`DevNavigation - currentScreen: ${currentScreen}, currentIndex: ${currentIndex}`);
  
  // Écrans précédent et suivant
  const previousScreen = currentIndex > 0 ? ONBOARDING_SCREENS[currentIndex - 1] : null;
  const nextScreen = currentIndex < ONBOARDING_SCREENS.length - 1 ? ONBOARDING_SCREENS[currentIndex + 1] : null;
  
  console.log(`Previous: ${previousScreen?.id}, Next: ${nextScreen?.id}`);
  
  // Label de l'écran actuel
  const currentLabel = ONBOARDING_SCREENS[currentIndex]?.label || currentScreen;

  return (
    <View style={styles.devNavigation}>
      {/* Bouton Précédent */}
      <TouchableOpacity 
        style={[styles.devButton, !previousScreen && styles.devButtonDisabled]}
        onPress={() => {
          if (previousScreen) {
            console.log('Navigation vers:', previousScreen.path);
            router.push(previousScreen.path);
          } else {
            console.log('Pas d\'écran précédent disponible');
          }
        }}
        disabled={!previousScreen}
      >
        <BodyText style={[
          styles.devButtonText,
          !previousScreen && styles.devButtonTextDisabled
        ]}>
          ← Précédent
        </BodyText>
      </TouchableOpacity>
      
      {/* Label écran actuel */}
      <BodyText style={styles.devLabel}>{currentLabel}</BodyText>
      
      {/* Bouton Suivant */}
      <TouchableOpacity 
        style={[styles.devButton, !nextScreen && styles.devButtonDisabled]}
        onPress={() => {
          if (nextScreen) {
            router.push(nextScreen.path);
          } else {
            // Dernier écran - aller vers l'app principale
            router.push('/(tabs)/home');
          }
        }}
        disabled={!nextScreen && currentScreen !== '800-cadeau'}
      >
        <BodyText style={[
          styles.devButtonText,
          !nextScreen && currentScreen !== '800-cadeau' && styles.devButtonTextDisabled
        ]}>
          {nextScreen ? 'Suivant →' : 'App →'}
        </BodyText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  devNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  devButton: {
    paddingHorizontal: theme.spacing.s,
    paddingVertical: theme.spacing.xs,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.small,
    opacity: 0.8,
    minWidth: 80,
  },
  devButtonDisabled: {
    backgroundColor: theme.colors.textLight,
    opacity: 0.3,
  },
  devButtonText: {
    color: theme.getTextColorOn(theme.colors.primary),
    fontSize: 12,
    textAlign: 'center',
  },
  devButtonTextDisabled: {
    color: theme.getTextColorOn(theme.colors.textLight),
  },
  devLabel: {
    fontSize: 11,
    color: theme.colors.textLight,
    fontFamily: theme.fonts.bodyBold,
    textAlign: 'center',
    flex: 1,
  },
}); 