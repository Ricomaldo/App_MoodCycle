import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { theme } from '../../../config/theme';
import CycleWheel from '../../../components/CycleWheel';
import { Heading, BodyText, Caption } from '../../../components/Typography';

export default function CycleScreen() {
  // Pour le MVP, on utilise des valeurs statiques
  const [currentPhase] = useState('follicular');
  const [cycleDay] = useState(8);
  const [cycleLength] = useState(28);
  const insets = useSafeAreaInsets();
  const router = useRouter();
  
  // Information sur les phases
  const phaseInfo = {
    menstrual: {
      name: "Menstruelle",
      description: "Phase d'introspection et de renouvellement. Énergie basse, intuition élevée.",
      duration: "Jours 1-5"
    },
    follicular: {
      name: "Folliculaire",
      description: "Phase de croissance et de créativité. Énergie en hausse, optimisme.",
      duration: "Jours 6-13"
    },
    ovulatory: {
      name: "Ovulatoire",
      description: "Phase de communication et de connexion. Énergie optimale, confiance.",
      duration: "Jours 14-17"
    },
    luteal: {
      name: "Lutéale",
      description: "Phase d'organisation et de préparation. Énergie décroissante, intuition.",
      duration: "Jours 18-28"
    }
  };

  // Fonction pour naviguer vers la page de phase
  const navigateToPhase = (phaseId) => {
    router.push(`/cycle/phases/${phaseId}`);
  };
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Heading style={styles.title}>Mon Cycle</Heading>
      
      <View style={styles.infoContainer}>
        <Caption>Jour {cycleDay} sur {cycleLength}</Caption>
        <Heading style={styles.phaseTitle}>
          Phase {phaseInfo[currentPhase].name}
        </Heading>
        <BodyText style={styles.phaseDescription}>
          {phaseInfo[currentPhase].description}
        </BodyText>
        {/* <Caption>{phaseInfo[currentPhase].duration}</Caption> */}
      </View>
      
      <View style={styles.wheelContainer}>
        <CycleWheel 
          currentPhase={currentPhase}
          cycleDay={cycleDay}
          userName="Emma"
          size={300}
        />
      </View>
      
      <View style={styles.legendContainer}>
        {Object.entries(phaseInfo).map(([phase, info]) => (
          <TouchableOpacity 
            key={phase} 
            style={styles.legendItem}
            onPress={() => navigateToPhase(phase)}
          >
            <View 
              style={[
                styles.colorDot, 
                { backgroundColor: theme.colors.phases[phase] }
              ]} 
            />
            <Caption>{info.name}</Caption>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.l,
  },
  title: {
    textAlign: 'center',
    marginVertical: theme.spacing.l,
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.l,
  },
  phaseTitle: {
    color: theme.colors.phases.follicular,
    marginVertical: theme.spacing.s,
  },
  phaseDescription: {
    textAlign: 'center',
    marginBottom: theme.spacing.m,
  },
  wheelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: theme.spacing.l,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: theme.spacing.l,
    flexWrap: 'wrap',
  },
  legendItem: {
    flex: 1,
    flexBasis: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: theme.spacing.s,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: theme.spacing.xs,
  },
}); 