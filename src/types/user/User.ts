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

export interface UserProfile {
  firstName?: string;
  birthDate?: Date;
  language: string;
  avatarType: string;
  medicalConditions?: MedicalCondition[];
  specialStatus?: SpecialStatus;
}

export interface MedicalCondition {
  type: 'PCOS' | 'endometriosis' | 'other';
  name: string;
  diagnosisDate?: Date;
  notes?: string;
}

export type SpecialStatus = 'pregnancy' | 'menopause' | 'breastfeeding' | 'none';

export interface UserPreferences {
  contentApproach: {
    medical: number;
    psychological: number;
    spiritual: number;
  };
  detailLevel: 'basic' | 'standard' | 'advanced';
  communicationTone: 'formal' | 'friendly' | 'motivational';
  interests: string[];
  notifications: NotificationPreferences;
}

export interface NotificationPreferences {
  periodStart: boolean;
  periodEnd: boolean;
  ovulation: boolean;
  fertileWindow: boolean;
  insights: boolean;
  rituals: boolean;
  customReminders: CustomReminder[];
}

export interface CustomReminder {
  id: string;
  name: string;
  time: string;
  days: number[];
  active: boolean;
}

export interface UserEngagement {
  savedInsights: SavedContent[];
  savedAdvice: SavedContent[];
  wisdomCards: WisdomCard[];
  rituals: Ritual[];
  interactionHistory: InteractionHistory;
}

export interface SavedContent {
  id: string;
  content: string;
  category: string;
  savedAt: Date;
  notes?: string;
}

export interface WisdomCard {
  id: string;
  content: string;
  style: string;
  createdAt: Date;
  isFavorite: boolean;
}

export interface Ritual {
  id: string;
  name: string;
  description: string;
  cyclePhase: string;
  isActive: boolean;
  reminderSettings: {
    days: number[];
    time: string;
  };
}

export interface InteractionHistory {
  lastConversationDate?: Date;
  featureUsage: Record<string, number>;
  lastLoginDate?: Date;
  goals?: Goal[];
}

export interface Goal {
  id: string;
  description: string;
  targetDate?: Date;
  status: 'active' | 'completed' | 'abandoned';
  progress: number;
} 