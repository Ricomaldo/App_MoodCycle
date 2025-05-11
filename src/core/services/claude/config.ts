import { ClaudeConfig } from './types';

export const defaultConfig: ClaudeConfig = {
  apiKey: process.env.CLAUDE_API_KEY || '',
  apiUrl: process.env.CLAUDE_API_URL || 'https://api.anthropic.com/v1/messages',
  timeout: 30000, // 30 secondes
  maxRetries: 3,
};

export const getConfig = (): ClaudeConfig => {
  if (!defaultConfig.apiKey) {
    throw new Error('Claude API key is not configured');
  }
  return defaultConfig;
}; 