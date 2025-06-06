import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Heading2, BodyText } from '../../components/Typography';
import { useOnboardingStore } from '../../stores/useOnboardingStore';
import { theme } from '../../config/theme';
import MeluneAvatar from '../../components/MeluneAvatar';
import ChatBubble from '../../components/ChatBubble';


const AVATAR_STYLES = [
  {
    key: 'classic',
    label: 'Classique',
    description: 'Bienveillante et douce',
    icon: '🤗',
    color: '#E53E3E'
  },
  {
    key: 'modern',
    label: 'Moderne',
    description: 'Énergique et directe',
    icon: '⚡',
    color: '#3182CE'
  },
  {
    key: 'mystique',
    label: 'Mystique',
    description: 'Sage et spirituelle',
    icon: '🔮',
    color: '#9F7AEA'
  }
];

const COMMUNICATION_TONES = [
  {
    key: 'friendly',
    label: 'Amicale',
    description: 'Comme une sœur',
    icon: '💕',
    example: "Hey ma belle ! Tu es incroyable et je suis là pour toi 🌸"
  },
  {
    key: 'professional',
    label: 'Professionnelle',
    description: 'Conseillère experte',
    icon: '🎓',
    example: "Selon tes données, je recommande cette approche pour optimiser ton bien-être."
  },
  {
    key: 'inspiring',
    label: 'Inspirante',
    description: 'Guide motivante',
    icon: '✨',
    example: "Tu es une déesse cyclique ! Embrasse ta puissance naturelle et rayonne ✨"
  }
];

export default function AvatarScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { preferences, updateMelune, calculateMelunePersonality } = useOnboardingStore();
  
  const [selectedAvatarStyle, setSelectedAvatarStyle] = useState('classic');
  const [selectedTone, setSelectedTone] = useState('friendly');
  const [step, setStep] = useState(1); // 1: avatar, 2: ton, 3: aperçu
  
  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [step]);

  const handleAvatarStyleSelect = (style) => {
    setSelectedAvatarStyle(style);
    setTimeout(() => {
      setStep(2);
    }, 500);
  };

  const handleToneSelect = (tone) => {
    setSelectedTone(tone);
    setTimeout(() => {
      setStep(3);
    }, 500);
  };

  const handleContinue = () => {
    // Sauvegarder les choix
    updateMelune({
      avatarStyle: selectedAvatarStyle,
      communicationTone: selectedTone
    });
    
    setTimeout(() => {
      router.push('/onboarding/800-paywall');
    }, 300);
  };

  const getMeluneMessage = () => {
    switch (step) {
      case 1:
        return "Sous quelle forme veux-tu me voir ? Choisis le style qui résonne le plus avec toi 💜";
      case 2:
        return "Parfait ! Maintenant, comment préfères-tu que je communique avec toi ?";
      case 3:
        return getPreviewMessage();
      default:
        return "Personnalisons notre relation !";
    }
  };

  const getPreviewMessage = () => {
    const tone = COMMUNICATION_TONES.find(t => t.key === selectedTone);
    return tone ? tone.example : "Voici comment je te parlerai !";
  };

  const getContinueText = () => {
    switch (step) {
      case 1:
        return "Choisir un style";
      case 2:
        return "Choisir un ton";
      case 3:
        return "C'est parfait !";
      default:
        return "Continuer";
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>


      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          
          {/* Avatar Melune avec style sélectionné */}
          <View style={styles.avatarContainer}>
            <MeluneAvatar 
              phase="ovulation" 
              size="large" 
              style={selectedAvatarStyle}
            />
            {step >= 2 && (
              <View style={styles.avatarBadge}>
                <BodyText style={styles.avatarBadgeText}>
                  {AVATAR_STYLES.find(s => s.key === selectedAvatarStyle)?.label}
                </BodyText>
              </View>
            )}
          </View>

          {/* Message de Melune */}
          <Animated.View 
            style={[
              styles.messageContainer,
              { transform: [{ translateY: slideAnim }] }
            ]}
          >
            <ChatBubble 
              message={getMeluneMessage()} 
              isUser={false} 
            />
          </Animated.View>

          {/* Interface selon l'étape */}
          <Animated.View 
            style={[
              styles.interactionContainer,
              { 
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }] 
              }
            ]}
          >
            
            {/* Étape 1: Choix du style d'avatar */}
            {step === 1 && (
              <View style={styles.optionsContainer}>
                {AVATAR_STYLES.map((style) => (
                  <TouchableOpacity
                    key={style.key}
                    style={[
                      styles.optionCard,
                      selectedAvatarStyle === style.key && styles.optionCardSelected,
                      { borderColor: style.color + '40' }
                    ]}
                    onPress={() => handleAvatarStyleSelect(style.key)}
                    activeOpacity={0.8}
                  >
                    <View style={styles.optionHeader}>
                      <BodyText style={[styles.optionIcon, { color: style.color }]}>
                        {style.icon}
                      </BodyText>
                      <BodyText style={[styles.optionLabel, { color: style.color }]}>
                        {style.label}
                      </BodyText>
                    </View>
                    <BodyText style={styles.optionDescription}>
                      {style.description}
                    </BodyText>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Étape 2: Choix du ton de communication */}
            {step === 2 && (
              <View style={styles.optionsContainer}>
                {COMMUNICATION_TONES.map((tone) => (
                  <TouchableOpacity
                    key={tone.key}
                    style={[
                      styles.optionCard,
                      selectedTone === tone.key && styles.optionCardSelected
                    ]}
                    onPress={() => handleToneSelect(tone.key)}
                    activeOpacity={0.8}
                  >
                    <View style={styles.optionHeader}>
                      <BodyText style={styles.optionIcon}>
                        {tone.icon}
                      </BodyText>
                      <BodyText style={styles.optionLabel}>
                        {tone.label}
                      </BodyText>
                    </View>
                    <BodyText style={styles.optionDescription}>
                      {tone.description}
                    </BodyText>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Étape 3: Aperçu final */}
            {step === 3 && (
              <View style={styles.previewContainer}>
                <BodyText style={styles.previewTitle}>Aperçu de notre relation</BodyText>
                
                <View style={styles.previewItem}>
                  <BodyText style={styles.previewLabel}>Style d'avatar:</BodyText>
                  <View style={styles.previewValue}>
                    <BodyText style={styles.previewIcon}>
                      {AVATAR_STYLES.find(s => s.key === selectedAvatarStyle)?.icon}
                    </BodyText>
                    <BodyText style={styles.previewText}>
                      {AVATAR_STYLES.find(s => s.key === selectedAvatarStyle)?.label}
                    </BodyText>
                  </View>
                </View>

                <View style={styles.previewItem}>
                  <BodyText style={styles.previewLabel}>Ton de communication:</BodyText>
                  <View style={styles.previewValue}>
                    <BodyText style={styles.previewIcon}>
                      {COMMUNICATION_TONES.find(t => t.key === selectedTone)?.icon}
                    </BodyText>
                    <BodyText style={styles.previewText}>
                      {COMMUNICATION_TONES.find(t => t.key === selectedTone)?.label}
                    </BodyText>
                  </View>
                </View>

                <View style={styles.exampleContainer}>
                  <BodyText style={styles.exampleLabel}>Exemple de message:</BodyText>
                  <View style={styles.exampleBubble}>
                    <BodyText style={styles.exampleText}>
                      {getPreviewMessage()}
                    </BodyText>
                  </View>
                </View>
              </View>
            )}

          </Animated.View>

          {/* Bouton de continuation */}
          {step === 3 && (
            <TouchableOpacity 
              style={styles.continueButton} 
              onPress={handleContinue}
              activeOpacity={0.8}
            >
              <BodyText style={styles.continueButtonText}>
                {getContinueText()}
              </BodyText>
            </TouchableOpacity>
          )}

        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: theme.spacing.l,
    paddingBottom: theme.spacing.xl,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.l,
    position: 'relative',
  },
  avatarBadge: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.s,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.small,
    marginTop: theme.spacing.s,
  },
  avatarBadgeText: {
    color: theme.getTextColorOn(theme.colors.primary),
    fontSize: 12,
    fontFamily: theme.fonts.bodyBold,
  },
  messageContainer: {
    alignItems: 'flex-start',
    marginBottom: theme.spacing.xl,
  },
  interactionContainer: {
    marginBottom: theme.spacing.xl,
  },

  // Styles des options
  optionsContainer: {
    gap: theme.spacing.m,
  },
  optionCard: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.l,
    borderWidth: 2,
    borderColor: theme.colors.primary + '20',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  optionCardSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary + '10',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  optionIcon: {
    fontSize: 24,
    marginRight: theme.spacing.s,
  },
  optionLabel: {
    fontSize: 18,
    fontFamily: theme.fonts.bodyBold,
    color: theme.colors.text,
  },
  optionDescription: {
    fontSize: 14,
    color: theme.colors.textLight,
    fontStyle: 'italic',
    lineHeight: 20,
  },

  // Styles de l'aperçu
  previewContainer: {
    backgroundColor: theme.colors.primary + '10',
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.l,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
  },
  previewTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.bodyBold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.l,
    textAlign: 'center',
  },
  previewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  previewLabel: {
    fontSize: 14,
    color: theme.colors.text,
    flex: 1,
  },
  previewValue: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  previewIcon: {
    fontSize: 16,
    marginRight: theme.spacing.s,
  },
  previewText: {
    fontSize: 14,
    fontFamily: theme.fonts.bodyBold,
    color: theme.colors.primary,
  },
  exampleContainer: {
    marginTop: theme.spacing.l,
  },
  exampleLabel: {
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
  },
  exampleBubble: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.m,
    borderWidth: 1,
    borderColor: theme.colors.primary + '30',
  },
  exampleText: {
    fontSize: 14,
    color: theme.colors.text,
    lineHeight: 20,
    fontStyle: 'italic',
  },

  // Bouton de continuation
  continueButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.large,
    alignItems: 'center',
    shadowColor: theme.colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginTop: theme.spacing.l,
  },
  continueButtonText: {
    color: theme.getTextColorOn(theme.colors.primary),
    fontFamily: theme.fonts.bodyBold,
    fontSize: 16,
    textAlign: 'center',
  },
}); 