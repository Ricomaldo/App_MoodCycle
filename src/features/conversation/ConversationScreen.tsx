import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, ScrollView, ActivityIndicator, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
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
        {conversation?.messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            content={msg.content}
            isUser={msg.isUser}
          />
        ))}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#007AFF" />
          </View>
        )}
      </ScrollView>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Une erreur est survenue: {error.message}
          </Text>
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
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 32,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  claudeMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
  },
  messageText: {
    fontSize: 16,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  claudeMessageText: {
    color: '#000000',
  },
  loadingContainer: {
    padding: 8,
    alignItems: 'center',
  },
  errorContainer: {
    padding: 8,
    backgroundColor: '#ffebee',
  },
  errorText: {
    color: '#c62828',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    maxHeight: 100,
  },
  sendButton: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
    alignSelf: 'center',
  },
  sendButtonDisabled: {
    color: '#999',
  },
}); 