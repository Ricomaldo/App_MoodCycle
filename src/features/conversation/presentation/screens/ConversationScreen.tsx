import React from 'react';
import { View, StyleSheet } from 'react-native';
import ScreenContainer from '@core/ui/components/ScreenContainer';
import { MessageList } from '../../components/MessageList';
import { MessageInput } from '../../components/MessageInput';
import { TypingIndicator } from '../../components/TypingIndicator';
import { useConversationViewModel } from '../viewmodels/useConversationViewModel';
import { MeluneAvatar } from '@features/home/components/MeluneAvatar';
import { observer } from 'mobx-react-lite';
import { colors } from '@core/ui/theme/colors';

export const ConversationScreen: React.FC = observer(() => {
  const {
    messages,
    isLoading,
    currentPhase,
    suggestions,
    savedMessageIds,
    sendMessage,
    saveMessage,
    selectSuggestion,
  } = useConversationViewModel();

  return (
    <ScreenContainer>
      <View style={styles.avatarHeader}>
        <MeluneAvatar phase={currentPhase} size={60} animated={false} />
      </View>

      <View style={styles.container}>
        <MessageList
          messages={messages}
          onSaveMessage={saveMessage}
          savedMessageIds={savedMessageIds}
        />

        {isLoading && <TypingIndicator isVisible />}

        <MessageInput
          onSendMessage={sendMessage}
          isLoading={isLoading}
          suggestions={suggestions}
          onSelectSuggestion={selectSuggestion}
        />
      </View>
    </ScreenContainer>
  );
});

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
