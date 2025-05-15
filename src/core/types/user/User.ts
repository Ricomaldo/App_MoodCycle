export interface UserProfile {
  name: string;
  birthDate: Date;
  cycleLength?: number;
  periodLength?: number;
  lastPeriodStart?: Date;
}

export interface UserPreferences {
  notifications: boolean;
  theme: 'light' | 'dark' | 'system';
  language: string;
  privacySettings: {
    shareData: boolean;
    sharePredictions: boolean;
  };
}

export interface UserEngagement {
  lastActive: Date;
  totalSessions: number;
  streakDays: number;
  completedCycles: number;
}

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  profile: UserProfile;
  preferences: UserPreferences;
  engagement: UserEngagement;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
}
