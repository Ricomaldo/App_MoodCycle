import { useState, useCallback } from 'react';
import { SendMessageUseCase } from '../domain/usecases/conversation/SendMessageUseCase';
import { GetConversationHistoryUseCase } from '../domain/usecases/conversation/GetConversationHistoryUseCase';
import { Conversation } from '../domain/entities/conversation/Conversation';
import { Message } from '../domain/entities/conversation/Message';
import { ClaudeError } from '../services/claude/types';

interface UseConversationProps {
  sendMessageUseCase: SendMessageUseCase;
  getConversationHistoryUseCase: GetConversationHistoryUseCase;
}

interface UseConversationReturn {
  conversation: Conversation | null;
  isLoading: boolean;
  error: ClaudeError | null;
  sendMessage: (message: string) => Promise<void>;
  refreshConversation: () => Promise<void>;
}

export const useConversation = ({
  sendMessageUseCase,
  getConversationHistoryUseCase,
}: UseConversationProps): UseConversationReturn => {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ClaudeError | null>(null);

  const refreshConversation = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const currentConversation = await getConversationHistoryUseCase.execute();
      setConversation(currentConversation);
    } catch (err) {
      setError(err as ClaudeError);
    } finally {
      setIsLoading(false);
    }
  }, [getConversationHistoryUseCase]);

  const sendMessage = useCallback(
    async (message: string) => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await sendMessageUseCase.execute(message, {
          phase: conversation?.context?.phase,
          mood: conversation?.context?.mood,
          cycleDay: conversation?.context?.cycleDay,
          symptoms: conversation?.context?.symptoms,
        });

        if (!result.success && result.error) {
          setError(result.error);
          return;
        }

        await refreshConversation();
      } catch (err) {
        setError(err as ClaudeError);
      } finally {
        setIsLoading(false);
      }
    },
    [sendMessageUseCase, conversation?.context, refreshConversation]
  );

  return {
    conversation,
    isLoading,
    error,
    sendMessage,
    refreshConversation,
  };
}; 