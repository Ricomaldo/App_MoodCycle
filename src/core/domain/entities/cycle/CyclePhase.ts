/**
 * Définition des phase du cycle menstruel
 */
export type CyclePhaseType = 'MENSTRUAL' | 'FOLLICULAR' | 'OVULATORY' | 'LUTEAL';

export const CyclePhase = {
  MENSTRUAL: 'MENSTRUAL' as CyclePhaseType,
  FOLLICULAR: 'FOLLICULAR' as CyclePhaseType,
  OVULATORY: 'OVULATORY' as CyclePhaseType,
  LUTEAL: 'LUTEAL' as CyclePhaseType,
};
