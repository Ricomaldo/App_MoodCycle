// src/features/conversation/components/MessageList.tsx
import React, { useRef, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useTheme } from '@core/ui/theme';
import { MessageBubble } from './MessageBubble';
import { Message } from '@core/domain/entities/conversation/Message';

interface MessageListProps {
  messages: Message[];
  onSaveMessage?: (messageId: string) => void;
  savedMessageIds: string[];
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  onSaveMessage,
  savedMessageIds,
}) => {
  const theme = useTheme();
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const styles = StyleSheet.create({
    contentContainer: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.md,
    },
    emptyContainer: {
      alignItems: 'flex-start',
      flex: 1,
      justifyContent: 'center',
      opacity: 0.5,
    },
    list: {
      flex: 1,
    },
    placeholder: {
      backgroundColor: theme.colors.neutral[200],
      borderRadius: theme.borderRadius.sm,
      height: theme.spacing.md,
      marginVertical: theme.spacing.xs,
      width: '90%',
    },
    placeholderMedium: {
      width: '70%',
    },
    placeholderSmall: {
      width: '50%',
    },
  });

  const renderItem = ({ item }: { item: Message }) => (
    <MessageBubble
      content={item.content}
      isUser={item.isUser}
      timestamp={new Date(item.timestamp)}
      isSaved={savedMessageIds.includes(item.id)}
      onSave={!item.isUser ? () => onSaveMessage?.(item.id) : undefined}
    />
  );

  return (
    <FlatList
      ref={flatListRef}
      data={messages}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.contentContainer}
      style={styles.list}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <View style={styles.placeholder} />
          <View style={{ ...styles.placeholder, ...styles.placeholderMedium }} />
          <View style={{ ...styles.placeholder, ...styles.placeholderSmall }} />
        </View>
      }
    />
  );
};
