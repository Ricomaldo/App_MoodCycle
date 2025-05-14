export type CyclePhase = 'menstruation' | 'follicular' | 'ovulation' | 'luteal';

export type MoodType =
  | 'happy'
  | 'sad'
  | 'energetic'
  | 'tired'
  | 'irritable'
  | 'anxious'
  | 'calm'
  | 'stressed';

export interface Symptom {
  type: string;
  intensity: number; // 1-5
  notes?: string;
}

export interface DailyEntry {
  id: string;
  cycleId: string;
  date: Date;
  mood?: MoodType;
  symptoms?: Symptom[];
  notes?: string;
  flow?: number; // 1-5
  temperature?: number;
  cervicalMucus?: 'dry' | 'sticky' | 'creamy' | 'egg-white' | 'watery';
  intercourse?: boolean;
  contraception?: boolean;
}

export interface Cycle {
  id: string;
  userId: string;
  startDate: Date;
  endDate?: Date;
  phase: CyclePhase;
  entries: DailyEntry[];
  averageLength?: number;
  isCurrent: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CyclePreferences {
  trackMood: boolean;
  trackSymptoms: boolean;
  trackTemperature: boolean;
  trackCervicalMucus: boolean;
  trackIntercourse: boolean;
  trackContraception: boolean;
  notifications: {
    periodStart: boolean;
    periodEnd: boolean;
    ovulation: boolean;
    fertileWindow: boolean;
  };
}

export interface CyclePredictions {
  nextPeriodStart: Date;
  nextPeriodEnd: Date;
  nextOvulation: Date;
  fertileWindow: {
    start: Date;
    end: Date;
  };
  nextCycleStart: Date;
  confidence: number; // 0-1
}

export interface CycleStatistics {
  averageCycleLength: number;
  averagePeriodLength: number;
  cycleRegularity: number; // 0-1
  phaseLengths: {
    menstruation: number;
    follicular: number;
    ovulation: number;
    luteal: number;
  };
  commonSymptoms: {
    type: string;
    frequency: number; // 0-1
    averageIntensity: number; // 1-5
  }[];
  commonMoods: {
    type: MoodType;
    frequency: number; // 0-1
  }[];
  lastUpdated: Date;
}
