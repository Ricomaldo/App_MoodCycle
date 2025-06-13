import { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import MeluneAvatar from '../../../components/MeluneAvatar';
import ChatBubble from '../../../components/ChatBubble';
import { theme } from '../../../config/theme';
import ContextFormatter from '../services/ContextFormatter';

// Exemples de messages pré-définis pour le MVP
const PREDEFINED_RESPONSES = {
  "Comment te sens-tu aujourd'hui?": "Je me sens plutôt bien, et toi?",
  "Pourquoi je me sens si fatiguée?": "La fatigue est normale pendant cette phase de ton cycle. Ton corps travaille dur et tes hormones fluctuent. Est-ce que tu arrives à te reposer suffisamment?",
  "Quels aliments me recommandes-tu?": "Pendant ta phase folliculaire actuelle, des aliments riches en fer et en protéines seraient bénéfiques, comme les légumes verts, les lentilles et les œufs. As-tu des préférences alimentaires particulières?"
};

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Bonjour! Je suis Melune, ta guide cyclique. Comment puis-je t'aider aujourd'hui?", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [phase] = useState('follicular');
  const insets = useSafeAreaInsets();
  
  const handleSend = async () => {
    if (!input.trim()) return;
    
    // Ajouter le message de l'utilisatrice
    const userMessage = { id: Date.now(), text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simuler une réponse de Melune
    setTimeout(async () => {
      const response = PREDEFINED_RESPONSES[input] || 
        "Je comprends. Pendant ta phase folliculaire actuelle, ton énergie augmente progressivement. C'est un bon moment pour de nouvelles initiatives.";
      
      const meluneMessage = { id: Date.now() + 1, text: response, isUser: false };
      setMessages(prev => [...prev, meluneMessage]);

      const context = ContextFormatter.formatForAPI();
      
      // Envoyer à ton API
      await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          context
        })
      });
    }, 1000);
  };
  
  return (
    <View style={[styles.container, { 
      paddingTop: insets.top,
    }]}>
      <View style={styles.avatarContainer}>
        <MeluneAvatar phase={phase} size="small" />
      </View>
      
      <ScrollView 
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map(message => (
          <ChatBubble 
            key={message.id}
            message={message.text}
            isUser={message.isUser}
          />
        ))}
      </ScrollView>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Écris ton message..."
          multiline
        />
        <TouchableOpacity 
          style={styles.sendButton}
          onPress={handleSend}
          disabled={!input.trim()}
        >
          <Ionicons 
            name="send" 
            size={24} 
            color={input.trim() ? theme.colors.primary : '#CCCCCC'} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  avatarContainer: {
    alignItems: 'center',
    padding: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: theme.spacing.m,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: theme.spacing.m,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
    marginBottom: 85,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.m,
    paddingTop: 12,
    paddingBottom: 12,
    minHeight: 44,
    maxHeight: 100,
    textAlignVertical: 'top',
  },
  sendButton: {
    marginLeft: theme.spacing.m,
    padding: theme.spacing.s,
    marginBottom: 2,
  },
}); 