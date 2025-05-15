// src/features/cycle/hooks/useCycleWheel.ts
import { useCallback, useMemo } from 'react';
import { CyclePhase, CyclePhaseType } from '@core/domain/entities/cycle/CyclePhase';

interface SegmentData {
  phase: CyclePhaseType;
  startAngle: number;
  endAngle: number;
  days: number;
}

interface UseCycleWheelProps {
  currentDay: number;
  totalDays: number;
  currentPhase: CyclePhaseType;
  onPhaseSelect?: (phase: CyclePhaseType) => void;
}

export const useCycleWheel = ({
  // Préfixe avec _ pour indiquer que ces paramètres sont reçus mais non utilisés
  _currentDay,
  totalDays,
  _currentPhase,
  onPhaseSelect,
}: UseCycleWheelProps) => {
  // Calcul des segments avec useMemo
  const segments = useMemo(() => {
    // Exemple de distribution pour un cycle de 28 jours
    // En production, cela devrait venir du modèle de calcul du cycle
    const phaseDistribution = {
      [CyclePhase.MENSTRUAL]: { days: 5, color: '#F44336' }, // Phase menstruelle: ~5 jours (jours 1-5)
      [CyclePhase.FOLLICULAR]: { days: 8, color: '#FFC107' }, // Phase folliculaire: ~8 jours (jours 6-13)
      [CyclePhase.OVULATORY]: { days: 5, color: '#00BCD4' }, // Phase ovulatoire: ~5 jours (jours 14-18)
      [CyclePhase.LUTEAL]: { days: 10, color: '#673AB7' }, // Phase lutéale: ~10 jours (jours 19-28)
    };

    // Ajuster les jours pour le cycle réel
    const total = Object.values(phaseDistribution).reduce((sum, phase) => sum + phase.days, 0);
    const ratio = totalDays / total;

    // Calculer les angles pour chaque phase
    let startAngle = 0;
    const calculatedSegments: SegmentData[] = [];

    Object.entries(phaseDistribution).forEach(([phase, data]) => {
      const adjustedDays = Math.round(data.days * ratio);
      const endAngle = startAngle + (adjustedDays / totalDays) * 360;

      calculatedSegments.push({
        phase: phase as CyclePhaseType,
        startAngle,
        endAngle,
        days: adjustedDays,
      });

      startAngle = endAngle;
    });

    return calculatedSegments;
  }, [totalDays]);

  // Gérer l'interaction avec un segment
  const handlePress = useCallback(
    (phase: CyclePhaseType) => {
      if (onPhaseSelect) {
        onPhaseSelect(phase);
      }
    },
    [onPhaseSelect]
  );

  // Pour les interactions de rotation (à implémenter avec PanResponder)
  const handleRotation = useCallback(() => {
    // La logique de rotation serait implémentée ici
  }, []);

  return {
    segments,
    handlePress,
    handleRotation,
  };
};
