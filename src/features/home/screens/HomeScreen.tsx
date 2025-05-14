import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../../core/ui/theme/theme';
import ScreenContainer from '../../../core/ui/components/ScreenContainer';
import Card from '../../../core/ui/components/Card';
import Button from '../../../core/ui/components/Button';
import { Text as StyledText } from '../../../core/ui/components/Text';
import { CalculateCyclePhaseUseCase } from '../../../core/domain/usecases/cycle/CalculateCyclePhaseUseCase';
import { CyclePhase, CyclePhaseType } from '../../../core/domain/entities/cycle/CyclePhase';

const cyclePhaseLabels: Record<CyclePhaseType, string> = {
  MENSTRUAL: 'Menstruation',
  FOLLICULAR: 'Phase folliculaire',
  OVULATORY: 'Ovulation',
  LUTEAL: 'Phase lutéale',
};

export const HomeScreen = () => {
  // Variables d'état pour les données de cycle
  const [currentPhase, setCurrentPhase] = useState<CyclePhaseType>(CyclePhase.FOLLICULAR);
  const [dayInCycle, setDayInCycle] = useState(1);
  const [nextPeriodDate, setNextPeriodDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Dans un cas réel, nous récupérerions ces données depuis le repository
    // Simulation pour l'exemple
    const calculatePhase = new CalculateCyclePhaseUseCase();
    const lastPeriod = new Date();
    lastPeriod.setDate(lastPeriod.getDate() - 10); // 10 jours depuis le début des dernières règles

    const result = calculatePhase.execute({
      lastPeriodStartDate: lastPeriod,
      cycleLength: 28,
    });

    setCurrentPhase(result.phase);
    setDayInCycle(result.dayInCycle);

    const nextPeriod = new Date(lastPeriod);
    nextPeriod.setDate(lastPeriod.getDate() + 28); // Cycle de 28 jours
    setNextPeriodDate(nextPeriod);

    setIsLoading(false);
  }, []);

  // Format de date pour afficher la prédiction des prochaines règles
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
    });
  };

  if (isLoading) {
    return (
      <ScreenContainer>
        <StyledText variant="h2" style={styles.loadingText}>
          Chargement...
        </StyledText>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <StyledText variant="h1">Bonjour</StyledText>
        <StyledText variant="body" style={styles.subtitle}>
          Bienvenue dans MoodCycle
        </StyledText>
      </View>

      <Card style={styles.cycleCard}>
        <StyledText variant="h2">Votre cycle actuel</StyledText>

        <View style={styles.phaseInfo}>
          <StyledText variant="h3" style={styles.phaseText}>
            {cyclePhaseLabels[currentPhase]}
          </StyledText>
          <StyledText variant="body">Jour {dayInCycle} de votre cycle</StyledText>
        </View>

        <View style={styles.predictionContainer}>
          <StyledText variant="caption" style={styles.predictionTitle}>
            Prochaines règles prévues
          </StyledText>
          {nextPeriodDate && (
            <StyledText variant="h3" style={styles.dateText}>
              {formatDate(nextPeriodDate)}
            </StyledText>
          )}
        </View>

        <Button
          title="Enregistrer les symptômes du jour"
          variant="primary"
          style={styles.button}
          onPress={() => {}}
        />
      </Card>

      <Card style={styles.wisdomCard}>
        <StyledText variant="h2">Conseils personnalisés</StyledText>
        <StyledText variant="body" style={styles.tipText}>
          Pendant votre phase {cyclePhaseLabels[currentPhase].toLowerCase()}, pensez à prendre soin
          de vous avec des activités relaxantes comme la méditation ou un bain chaud.
        </StyledText>
        <Button title="En savoir plus" variant="outline" style={styles.button} onPress={() => {}} />
      </Card>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: theme.spacing.sm,
  },
  cycleCard: {
    marginBottom: theme.spacing.md,
  },
  dateText: {
    color: theme.colors.primary[800],
  },
  header: {
    marginBottom: theme.spacing.lg,
  },
  loadingText: {
    marginTop: theme.spacing['3xl'],
    textAlign: 'center',
  },
  phaseInfo: {
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  phaseText: {
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  predictionContainer: {
    backgroundColor: theme.colors.primary[100],
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
  },
  predictionTitle: {
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    color: theme.colors.neutral[600],
    marginTop: theme.spacing.xs,
  },
  tipText: {
    marginVertical: theme.spacing.md,
  },
  wisdomCard: {
    marginBottom: theme.spacing.lg,
  },
});
