import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import ScreenContainer from '@core/ui/components/ScreenContainer';
import { MessageList } from '../../components/MessageList';
import { MessageInput } from '../../components/MessageInput';
import { TypingIndicator } from '../../components/TypingIndicator';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@store/index';
import { addMessage } from '@store/slices/conversation/conversationSlice';
import { MeluneAvatar } from '@features/home/components/MeluneAvatar';
import { colors } from '@core/ui/theme/colors';
import { CyclePhaseType } from '@core/domain/entities/cycle/CyclePhase';

export const ConversationScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { currentConversation, messages, isLoading, error } = useSelector(
    (state: RootState) => state.conversation
  );

  if (isLoading)
    return (
      <ScreenContainer>
        <ActivityIndicator />
      </ScreenContainer>
    );
  if (error)
    return (
      <ScreenContainer>
        <Text>{error}</Text>
      </ScreenContainer>
    );
  if (!currentConversation)
    return (
      <ScreenContainer>
        <Text>Aucune conversation</Text>
      </ScreenContainer>
    );

  return (
    <ScreenContainer>
      <View style={styles.avatarHeader}>
        <MeluneAvatar
          phase={currentConversation.context?.phase as CyclePhaseType}
          size={60}
          animated={false}
        />
      </View>

      <View style={styles.container}>
        <MessageList messages={messages} savedMessageIds={[]} onSaveMessage={() => {}} />

        {isLoading && <TypingIndicator isVisible />}

        <MessageInput
          onSendMessage={msg =>
            dispatch(
              addMessage({
                id: Date.now().toString(),
                content: msg,
                isUser: true,
                timestamp: new Date().toISOString(),
              })
            )
          }
          isLoading={isLoading}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  avatarHeader: {
    alignItems: 'center',
    borderBottomColor: colors.neutral[300],
    borderBottomWidth: 1,
    padding: 16,
  },
  container: {
    flex: 1,
  },
});
