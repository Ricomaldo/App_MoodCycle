import { CyclePhase as CyclePhaseType } from '../Cycle';

/**
 * Enumération des phase du cycle menstruel
 */
export const CyclePhase = {
  MENSTRUAL: 'menstruation' as CyclePhaseType,
  FOLLICULAR: 'follicular' as CyclePhaseType,
  OVULATORY: 'ovulation' as CyclePhaseType,
  LUTEAL: 'luteal' as CyclePhaseType,
};

// Re-export de tous les types du cycle depuis le fichier principal
export type {
  Cycle,
  DailyEntry,
  Symptom,
  MoodType,
  CyclePreferences,
  CyclePredictions,
  CycleStatistics,
  CyclePhase as CyclePhaseType,
} from '../Cycle';
