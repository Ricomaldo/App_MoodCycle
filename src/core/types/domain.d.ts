export interface User {
  id: string;
  email: string;
  passwordHash: string;
  profile: {
    firstName: string;
    lastName: string;
  };
  preferences: {
    notifications: boolean;
    darkMode: boolean;
    language: string;
    theme: string;
  };
  engagement: {
    totalSessions: number;
    streakDays: number;
    completedCycles: number;
    lastActive: Date;
  };
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
}

export interface Symptom {
  id: string;
  type: string;
  intensity: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DailyEntry {
  id: string;
  cycleId: string;
  date: Date;
  mood?: string;
  symptoms: Symptom[];
  notes?: string;
  flow?: number;
  temperature?: number;
  cervicalMucus?: string;
  intercourse?: boolean;
  contraception?: boolean;
}

export interface Cycle {
  id: string;
  userId: string;
  startDate: Date;
  endDate?: Date;
  phase: string;
  entries: DailyEntry[];
  averageLength: number;
  isCurrent: boolean;
  createdAt: Date;
  updatedAt: Date;
}
