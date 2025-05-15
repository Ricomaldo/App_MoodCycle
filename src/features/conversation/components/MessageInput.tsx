// src/features/conversation/components/MessageInput.tsx
import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '@core/ui/theme';
import { Icon } from '@core/ui/components/Icon';
import { Text } from '@core/ui/components/Text';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  suggestions?: string[];
  onSelectSuggestion?: (suggestion: string) => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  isLoading = false,
  suggestions = [],
  onSelectSuggestion,
}) => {
  const theme = useTheme();
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
      Keyboard.dismiss();
    }
  };

  const styles = StyleSheet.create({
    container: {
      borderTopColor: theme.colors.neutral[300],
      borderTopWidth: 1,
      padding: theme.spacing.xs,
    },
    input: {
      backgroundColor: theme.colors.neutral[200],
      borderRadius: theme.borderRadius.lg,
      color: theme.colors.neutral[900],
      flex: 1,
      maxHeight: theme.spacing['3xl'],
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
    },
    inputContainer: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    sendButton: {
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.lg,
      height: theme.spacing.xl,
      justifyContent: 'center',
      marginLeft: theme.spacing.xs,
      width: theme.spacing.xl,
    },
    suggestionChip: {
      backgroundColor: theme.colors.neutral[200],
      borderRadius: theme.borderRadius.md,
      marginBottom: theme.spacing.xs,
      marginRight: theme.spacing.xs,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
    },
    suggestionText: {
      color: theme.colors.neutral[900],
    },
    suggestionsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: theme.spacing.xs,
    },
  });

  return (
    <View style={styles.container}>
      {suggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          {suggestions.map((suggestion, index) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestionChip}
              onPress={() => {
                onSelectSuggestion?.(suggestion);
                Keyboard.dismiss();
              }}
            >
              <Text style={styles.suggestionText}>{suggestion}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Entrez votre message..."
          placeholderTextColor={theme.colors.neutral[500]}
          multiline
          maxLength={1000}
          editable={!isLoading}
        />

        <TouchableOpacity
          style={{
            ...styles.sendButton,
            opacity: message.trim() && !isLoading ? 1 : 0.5,
          }}
          onPress={handleSend}
          disabled={!message.trim() || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={theme.colors.neutral[100]} size="small" />
          ) : (
            <Icon name="paper-plane" size={20} color={theme.colors.neutral[100]} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
