import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useConversation } from '../../core/hooks/useConversation';
import { SendMessageUseCase } from '../../core/domain/usecases/conversation/SendMessageUseCase';
import { GetConversationHistoryUseCase } from '../../core/domain/usecases/conversation/GetConversationHistoryUseCase';
import { ClaudeService } from '../../core/services/claude/ClaudeService';
import { WatermelonConversationRepository } from '../../core/data/repositories/WatermelonConversationRepository';
import { database } from '../../core/data/database';

interface MessageBubbleProps {
  content: string;
  isUser: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ content, isUser }) => (
  <View style={[styles.messageBubble, isUser ? styles.userMessage : styles.claudeMessage]}>
    <Text style={[styles.messageText, isUser ? styles.userMessageText : styles.claudeMessageText]}>
      {content}
    </Text>
  </View>
);

export const ConversationScreen: React.FC = () => {
  const [message, setMessage] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  // Initialisation des dépendances
  const claudeService = new ClaudeService();
  const conversationRepository = new WatermelonConversationRepository(database);
  const sendMessageUseCase = new SendMessageUseCase(claudeService, conversationRepository);
  const getConversationHistoryUseCase = new GetConversationHistoryUseCase(conversationRepository);

  const { conversation, isLoading, error, sendMessage, refreshConversation } = useConversation({
    sendMessageUseCase,
    getConversationHistoryUseCase,
  });

  useEffect(() => {
    refreshConversation();
  }, [refreshConversation]);

  useEffect(() => {
    if (conversation?.messages.length) {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  }, [conversation?.messages.length]);

  const handleSend = async () => {
    if (!message.trim()) return;

    await sendMessage(message);
    setMessage('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {conversation?.messages.map(msg => (
          <MessageBubble key={msg.id} content={msg.content} isUser={msg.isUser} />
        ))}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#007AFF" />
          </View>
        )}
      </ScrollView>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Une erreur est survenue: {error.message}</Text>
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Écrivez votre message..."
          multiline
          maxLength={1000}
        />
        <Text
          style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
          onPress={handleSend}
        >
          Envoyer
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  claudeMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
  },
  claudeMessageText: {
    color: '#000000',
  },
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 8,
  },
  errorText: {
    color: '#c62828',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    flex: 1,
    marginRight: 8,
    maxHeight: 100,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderTopColor: '#e0e0e0',
    borderTopWidth: 1,
    flexDirection: 'row',
    padding: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 8,
  },
  messageBubble: {
    borderRadius: 16,
    marginBottom: 8,
    maxWidth: '80%',
    padding: 12,
  },
  messageText: {
    fontSize: 16,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 32,
  },
  sendButton: {
    alignSelf: 'center',
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  sendButtonDisabled: {
    color: '#999',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  userMessageText: {
    color: '#FFFFFF',
  },
});
