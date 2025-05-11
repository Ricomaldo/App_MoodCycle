export interface UserProfile {
  firstName: string;
  lastName: string;
  birthDate?: Date;
  gender?: string;
  avatar?: string;
}

export interface UserPreferences {
  notifications: boolean;
  darkMode: boolean;
  language: string;
  theme: string;
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
  createdAt: Date;
  lastLogin?: Date;
  profile: UserProfile;
  preferences: UserPreferences;
  engagement: UserEngagement;
} 