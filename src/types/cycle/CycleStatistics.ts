export interface PhaseDistribution {
  menstrual: number;
  follicular: number;
  ovulatory: number;
  luteal: number;
}

export interface CycleStatistics {
  cycleVariability: number | null; // écart-type
  predictionConfidence: number;
  phaseDistribution: PhaseDistribution;
  cycleRegularity: number; // score
}
