import { CyclePredictions } from './CyclePredictions';
import { CycleStatistics } from './CycleStatistics';

export type CyclePhase = 'menstruation' | 'follicular' | 'ovulation' | 'luteal';

export interface Cycle {
  id: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  phase: CyclePhase;
  entries: DailyEntry[];
  averageLength: number;
  isCurrent: boolean;
  createdAt: Date;
  updatedAt: Date;
  contraception?: ContraceptionInfo;
  periodLength?: number;
  lastPeriodDate?: Date;
  predictions?: CyclePredictions;
  statistics?: CycleStatistics;
}

export interface DailyEntry {
  id: string;
  date: Date;
  mood?: MoodEntry;
  symptoms?: SymptomEntry[];
  flow?: FlowEntry;
  temperature?: TemperatureEntry;
  cervicalMucus?: CervicalMucusEntry;
  intercourse?: boolean;
  contraception?: boolean;
  notes?: string;
}

export interface MoodEntry {
  type: MoodType;
  intensity: number; // 1-5
  notes?: string;
}

export type MoodType = 
  | 'happy'
  | 'sad'
  | 'energetic'
  | 'tired'
  | 'irritable'
  | 'anxious'
  | 'calm'
  | 'stressed';

export interface SymptomEntry {
  type: SymptomType;
  intensity: number; // 1-5
  location?: string;
  notes?: string;
}

export type SymptomType = 
  | 'cramps'
  | 'headache'
  | 'backache'
  | 'breast_tenderness'
  | 'bloating'
  | 'acne'
  | 'fatigue'
  | 'insomnia'
  | 'nausea'
  | 'other';

export interface FlowEntry {
  intensity: number; // 1-5
  color?: string;
  consistency?: string;
  notes?: string;
}

export interface TemperatureEntry {
  value: number;
  time: Date;
  method: 'oral' | 'vaginal' | 'armpit';
  notes?: string;
}

export interface CervicalMucusEntry {
  type: 'dry' | 'sticky' | 'creamy' | 'egg-white' | 'watery';
  amount: 'light' | 'moderate' | 'heavy';
  notes?: string;
}

export interface ContraceptionInfo {
  type: ContraceptionType;
  startDate: Date;
  endDate?: Date;
  notes?: string;
}

export type ContraceptionType = 
  | 'pill'
  | 'iud'
  | 'implant'
  | 'patch'
  | 'ring'
  | 'injection'
  | 'other'; 