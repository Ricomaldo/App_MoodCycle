export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
  metadata?: {
    phase?: string;
    mood?: number;
    context?: string;
    model?: string;
    tokens?: number;
    responseTime?: number;
    apiVersion?: string;
  };
}

export interface MessageInput {
  content: string;
  isUser: boolean;
  metadata?: Message['metadata'];
}
