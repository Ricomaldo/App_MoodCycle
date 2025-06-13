import { useState, useEffect } from 'react';
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
import ChatService from '../../../services/ChatService';

// Store pour récupérer la phase actuelle
import { useCycleStore } from '../../../stores/useCycleStore';

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Bonjour! Je suis Melune, ta guide cyclique. Comment puis-je t'aider aujourd'hui?", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const insets = useSafeAreaInsets();
  
  // Récupération de la phase actuelle du cycle
  const { getCurrentPhaseInfo } = useCycleStore();
  const phaseInfo = getCurrentPhaseInfo();
  const phase = phaseInfo.phase;
  
  // Initialisation du ChatService au montage
  useEffect(() => {
    const initializeChatService = async () => {
      try {
        await ChatService.initialize();
        if (__DEV__) {
          console.log('✅ ChatService initialisé dans ChatScreen');
        }
      } catch (error) {
        console.error('🚨 Erreur init ChatService:', error);
      }
    };
    
    initializeChatService();
  }, []);
  
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const currentInput = input.trim();
    const isFirstMessage = messages.length === 1; // Premier message après greeting
    
    // Ajouter le message de l'utilisatrice
    const userMessage = { id: Date.now(), text: currentInput, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Appel au service ChatService
      const response = await ChatService.sendMessage(currentInput, isFirstMessage);
      
      if (response.success) {
        const meluneMessage = { 
          id: Date.now() + 1, 
          text: response.message, 
          isUser: false,
          source: response.source // 'api' ou 'fallback'
        };
        setMessages(prev => [...prev, meluneMessage]);
        
        // Log pour debug
        if (__DEV__) {
          console.log(`💬 Réponse reçue (${response.source}):`, response.message?.substring(0, 50) + '...' || 'Message vide');
          console.log('🔍 Response complète:', response);
        }
      } else {
        throw new Error('Erreur service ChatService');
      }
      
    } catch (error) {
      console.error('🚨 Erreur handleSend:', error);
      
      // Message d'erreur gracieux pour l'utilisatrice
      const errorMessage = { 
        id: Date.now() + 1, 
        text: "Désolée, je rencontre un petit souci technique. Peux-tu réessayer dans quelques instants ?", 
        isUser: false,
        source: 'error'
      };
      setMessages(prev => [...prev, errorMessage]);
      
    } finally {
      setIsLoading(false);
    }
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
            phase={phase}
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
          disabled={!input.trim() || isLoading}
        >
          <Ionicons 
            name={isLoading ? "ellipsis-horizontal" : "send"}
            size={24} 
            color={(!input.trim() || isLoading) ? '#CCCCCC' : theme.colors.primary} 
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