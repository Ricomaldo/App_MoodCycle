import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { theme } from '../../../config/theme';
import MeluneAvatar from '../../../components/MeluneAvatar';
import { Heading1, BodyText } from '../../../components/Typography';
import InsightCard from '../../../components/InsightCard';

// Import des données d'insights (pour le MVP, utilisons des données statiques)
import { insights } from '../../../data/insights';

export default function HomeScreen() {
  // Pour le MVP, on peut simuler différentes personas et phases
  const [persona] = useState('Emma');
  const [phase] = useState('follicular');
  const insets = useSafeAreaInsets();
  
  const router = useRouter();
  
  // On récupère l'insight correspondant à la phase et au persona
  const currentInsight = insights[phase][persona];
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Heading1>Bonjour {persona}</Heading1>
        <BodyText>Jour 8 • Phase {phase}</BodyText>
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
}); 