import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { ConversationViewModel } from '../viewmodels/ConversationViewModel';

interface ConversationScreenProps {
  viewModel: ConversationViewModel;
}

export const ConversationScreen: React.FC<ConversationScreenProps> = observer(({ viewModel }) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    viewModel.loadConversation();
  }, [viewModel]);

  const handleSend = async () => {
    if (message.trim()) {
      await viewModel.sendMessage(message.trim());
      setMessage('');
    }
  };

  if (viewModel.isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={viewModel.messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.isUser ? styles.userMessage : styles.meluneMessage,
            ]}
          >
            <Text style={styles.messageText}>{item.content}</Text>
            <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleTimeString()}</Text>
          </View>
        )}
        inverted
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Écrivez votre message..."
          multiline
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSend}
          disabled={viewModel.isSending}
        >
          {viewModel.isSending ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.sendButtonText}>Envoyer</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    flex: 1,
    marginRight: 10,
    maxHeight: 100,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderTopColor: '#E5E5EA',
    borderTopWidth: 1,
    flexDirection: 'row',
    padding: 10,
  },
  meluneMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
  },
  messageContainer: {
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    maxWidth: '80%',
    padding: 10,
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  timestamp: {
    color: '#rgba(255,255,255,0.7)',
    fontSize: 12,
    marginTop: 5,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
});
