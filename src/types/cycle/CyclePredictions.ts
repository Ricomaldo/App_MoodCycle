import { CyclePhase } from './Cycle';

export interface CyclePredictions {
  nextPeriod: Date;
  nextOvulation: Date;
  currentPhase: CyclePhase;
  currentCycleDay: number;
  phaseEndDate: Date;
  predictionConfidence: number; // 0-1
  predictionWindow: {
    earliest: Date;
    mostLikely: Date;
    latest: Date;
  };
} 