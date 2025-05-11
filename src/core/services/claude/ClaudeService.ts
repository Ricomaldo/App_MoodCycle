import axios, { AxiosInstance, AxiosError } from 'axios';
import { ClaudeConfig, ClaudeContext, ClaudeResponse, ClaudeError } from './types';
import { getConfig } from './config';
import { Message } from '../../domain/entities/conversation/Message';

export class ClaudeService {
  private client: AxiosInstance;
  private config: ClaudeConfig;

  constructor(config?: Partial<ClaudeConfig>) {
    this.config = { ...getConfig(), ...config };
    this.client = axios.create({
      baseURL: this.config.apiUrl,
      timeout: this.config.timeout,
      headers: {
        'x-api-key': this.config.apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
    });
  }

  private buildPrompt(message: string, context: ClaudeContext): string {
    let prompt = message;

    if (context.phase) {
      prompt = `[Phase du cycle: ${context.phase}]\n${prompt}`;
    }
    if (context.cycleDay) {
      prompt = `[Jour du cycle: ${context.cycleDay}]\n${prompt}`;
    }
    if (context.mood) {
      prompt = `[Humeur: ${context.mood}/10]\n${prompt}`;
    }
    if (context.symptoms?.length) {
      prompt = `[Symptômes: ${context.symptoms.join(', ')}]\n${prompt}`;
    }

    return prompt;
  }

  private async retryWithBackoff<T>(
    operation: () => Promise<T>,
    retries: number = this.config.maxRetries
  ): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      if (retries === 0 || !this.isRetryableError(error)) {
        throw this.handleError(error);
      }
      await new Promise(resolve => setTimeout(resolve, 1000 * (this.config.maxRetries - retries)));
      return this.retryWithBackoff(operation, retries - 1);
    }
  }

  private isRetryableError(error: unknown): boolean {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      return status === 429 || status === 500 || status === 503;
    }
    return false;
  }

  private handleError(error: unknown): ClaudeError {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      return {
        code: axiosError.response?.status?.toString() || 'UNKNOWN',
        message: axiosError.message,
        details: axiosError.response?.data,
      };
    }
    return {
      code: 'UNKNOWN',
      message: error instanceof Error ? error.message : 'Une erreur inconnue est survenue',
    };
  }

  async sendMessage(
    message: string,
    context: ClaudeContext
  ): Promise<ClaudeResponse> {
    const prompt = this.buildPrompt(message, context);

    return this.retryWithBackoff(async () => {
      const response = await this.client.post<ClaudeResponse>('', {
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        model: 'claude-3-opus-20240229',
        max_tokens: 1000,
      });

      return response.data;
    });
  }

  // Méthode pour le mode hors-ligne
  async getOfflineResponse(message: string): Promise<ClaudeResponse> {
    return {
      content: "Je suis désolé, je ne peux pas répondre en mode hors-ligne pour le moment.",
      metadata: {
        model: 'offline',
      },
    };
  }
} 