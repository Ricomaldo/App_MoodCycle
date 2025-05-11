import { Message } from '../../domain/entities/conversation/Message';

export interface ClaudeConfig {
  apiKey: string;
  apiUrl: string;
  timeout: number;
  maxRetries: number;
}

export interface ClaudeContext {
  phase?: string;
  mood?: number;
  cycleDay?: number;
  symptoms?: string[];
  previousMessages?: Message[];
}

export interface ClaudeResponse {
  content: string;
  metadata?: {
    tokens?: number;
    model?: string;
  };
}

export interface ClaudeError {
  code: string;
  message: string;
  details?: unknown;
} 