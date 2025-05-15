export interface WisdomItem {
  id: string;
  content: string;
  type: 'CONVERSATION' | 'INSIGHT' | 'RITUAL';
  phase: string;
  createdAt: string;
  isFavorite: boolean;
  tags?: string[];
  metadata?: {
    source?: string;
    relatedPhase?: string;
    emotionalState?: string;
    physicalSymptoms?: string[];
  };
}
