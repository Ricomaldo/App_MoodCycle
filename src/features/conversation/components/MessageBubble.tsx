import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@core/ui/theme';
import { Text } from '@core/ui/components/Text';
import { Icon } from '@core/ui/components/Icon';

export interface MessageBubbleProps {
  content: string;
  isUser: boolean;
  timestamp: Date;
  onSave?: () => void;
  isSaved?: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  content,
  isUser,
  timestamp,
  onSave,
  isSaved = false,
}) => {
  const theme = useTheme();

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const styles = StyleSheet.create({
    bubble: {
      borderRadius: theme.borderRadius.lg,
      minHeight: theme.spacing.xl,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
    },
    container: {
      marginVertical: theme.spacing.xs,
      maxWidth: '80%',
    },
    meluneBubble: {
      borderBottomLeftRadius: theme.borderRadius.sm,
    },
    meluneContainer: {
      alignSelf: 'flex-start',
    },
    messageText: {
      lineHeight: 20,
    },
    saveButton: {
      bottom: theme.spacing.sm,
      padding: theme.spacing.xs,
      position: 'absolute',
      right: theme.spacing.sm,
    },
    timestamp: {
      fontSize: theme.typography.fontSizes.xs,
      marginHorizontal: theme.spacing.sm,
      marginTop: theme.spacing.xs,
      opacity: 0.7,
    },
    userBubble: {
      borderBottomRightRadius: theme.borderRadius.sm,
    },
    userContainer: {
      alignSelf: 'flex-end',
    },
  });

  return (
    <View style={[styles.container, isUser ? styles.userContainer : styles.meluneContainer]}>
      <View
        style={[
          styles.bubble,
          isUser ? styles.userBubble : styles.meluneBubble,
          { backgroundColor: isUser ? theme.colors.primary : theme.colors.neutral[200] },
        ]}
      >
        <Text
          variant="body"
          style={{
            ...styles.messageText,
            color: isUser ? theme.colors.neutral[100] : theme.colors.neutral[900],
          }}
        >
          {content}
        </Text>

        {!isUser && onSave && (
          <TouchableOpacity style={styles.saveButton} onPress={onSave}>
            <Icon
              name={isSaved ? 'star-filled' : 'star-outline'}
              size={20}
              color={isSaved ? theme.colors.primary : theme.colors.neutral[600]}
            />
          </TouchableOpacity>
        )}
      </View>

      <Text variant="caption" style={styles.timestamp}>
        {formatTime(timestamp)}
      </Text>
    </View>
  );
};
