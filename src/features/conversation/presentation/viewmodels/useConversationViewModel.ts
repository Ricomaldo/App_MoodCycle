import { useState, useCallback, useEffect } from 'react';
import { CyclePhase } from '@core/domain/entities/cycle/CyclePhase';
import { Message } from '@core/domain/entities/conversation/Message';
import { GetCycleUseCase } from '@core/domain/usecases/cycle/GetCycleUseCase';
import { SendMessageUseCase } from '@core/domain/usecases/conversation/SendMessageUseCase';
import { GetConversationHistoryUseCase } from '@core/domain/usecases/conversation/GetConversationHistoryUseCase';
import { SaveWisdomItemUseCase } from '@core/domain/usecases/wisdom/SaveWisdomItemUseCase';

export const useConversationViewModel = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<CyclePhase>(CyclePhase.FOLLICULAR);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [savedMessageIds, setSavedMessageIds] = useState<string[]>([]);

  // Mock use cases (à remplacer par des injections réelles)
  const getCycleUseCase = new GetCycleUseCase();
  const sendMessageUseCase = new SendMessageUseCase();
  const getConversationHistoryUseCase = new GetConversationHistoryUseCase();
  const saveWisdomItemUseCase = new SaveWisdomItemUseCase();

  // Chargement initial
  useEffect(() => {
    loadConversationData();
  }, []);

  const loadConversationData = async () => {
    try {
      // Pour la démo, nous utilisons des données statiques
      setCurrentPhase(CyclePhase.FOLLICULAR);

      // Conversation initiale
      const initialMessages: Message[] = [
        {
          id: '1',
          content:
            "Bonjour! Je suis Melune, votre guide personnalisé du cycle menstruel. Comment puis-je vous aider aujourd'hui?",
          isUser: false,
          timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
        },
      ];

      setMessages(initialMessages);
      setSuggestions([
        "Comment puis-je optimiser mon énergie aujourd'hui?",
        'Pourquoi je me sens fatiguée?',
        'Parle-moi de la phase folliculaire',
      ]);
    } catch (error) {
      console.error('Failed to load conversation data', error);
    }
  };

  const sendMessage = useCallback(
    async (content: string) => {
      try {
        // Créer un ID unique pour le message
        const userMessageId = `user_${Date.now()}`;

        // Ajouter le message de l'utilisateur à la liste
        const userMessage: Message = {
          id: userMessageId,
          content,
          isUser: true,
          timestamp: new Date().toISOString(),
        };

        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);
        setSuggestions([]);

        // Simuler un délai de réponse
        setTimeout(async () => {
          try {
            // Dans une implémentation réelle, nous appellerions:
            // const response = await sendMessageUseCase.execute(content, currentPhase);

            // Pour la démo, nous simulons une réponse
            const meluneMessage: Message = {
              id: `melune_${Date.now()}`,
              content: generateMockResponse(content, currentPhase),
              isUser: false,
              timestamp: new Date().toISOString(),
            };

            setMessages(prev => [...prev, meluneMessage]);

            // Nouvelles suggestions basées sur l'échange
            setSuggestions([
              "Dis-m'en plus sur cela",
              'Quels rituels recommandes-tu?',
              'Comment cela affecte mon énergie?',
            ]);
          } catch (error) {
            console.error('Error generating response', error);
          } finally {
            setIsLoading(false);
          }
        }, 1500);
      } catch (error) {
        console.error('Failed to send message', error);
        setIsLoading(false);
      }
    },
    [currentPhase]
  );

  const saveMessage = useCallback(
    (messageId: string) => {
      // Vérifier si le message est déjà sauvegardé
      if (savedMessageIds.includes(messageId)) {
        // Retirer de la liste des sauvegardés
        setSavedMessageIds(prev => prev.filter(id => id !== messageId));
      } else {
        // Ajouter à la liste des sauvegardés
        setSavedMessageIds(prev => [...prev, messageId]);

        // Trouver le message
        const messageToSave = messages.find(msg => msg.id === messageId);

        if (messageToSave) {
          // Dans une implémentation réelle, nous appellerions:
          // await saveWisdomItemUseCase.execute({
          //   content: messageToSave.content,
          //   type: 'CONVERSATION',
          //   phase: currentPhase,
          //   date: new Date(messageToSave.timestamp)
          // });

          console.log('Message saved to wisdom', messageToSave.content);
        }
      }
    },
    [messages, savedMessageIds, currentPhase]
  );

  const selectSuggestion = useCallback(
    (suggestion: string) => {
      sendMessage(suggestion);
    },
    [sendMessage]
  );

  // Helper pour générer des réponses mock basées sur le contenu et la phase
  const generateMockResponse = (content: string, phase: CyclePhase): string => {
    const lowerContent = content.toLowerCase();

    if (lowerContent.includes('énergie')) {
      switch (phase) {
        case CyclePhase.FOLLICULAR:
          return "Pendant votre phase folliculaire actuelle, votre énergie est naturellement en hausse! C'est le moment idéal pour initier de nouveaux projets, socialiser, et être créative. Essayez de planifier vos activités les plus exigeantes pendant cette période pour profiter de ce regain d'énergie.";
        case CyclePhase.OVULATORY:
          return "En phase ovulatoire, votre énergie est à son apogée! Vous pourriez vous sentir particulièrement sociable, confiante et rayonnante. C'est un excellent moment pour les présentations, les rencontres importantes ou les activités qui demandent charisme et présence.";
        case CyclePhase.LUTEAL:
          return "Durant votre phase lutéale, vous pourriez remarquer que votre énergie commence à diminuer progressivement. C'est normal! Votre corps se prépare pour la phase menstruelle. Privilégiez des activités plus introspectives et évitez de surcharger votre agenda.";
        case CyclePhase.MENSTRUAL:
          return "Pendant vos règles, il est parfaitement normal de ressentir une baisse d'énergie. Votre corps travaille dur! Accordez-vous des moments de repos, limitez les activités intenses et écoutez vos besoins. C'est une période propice à l'introspection et au repos.";
        default:
          return 'Votre énergie fluctue naturellement tout au long de votre cycle. Observer ces changements vous aidera à mieux planifier vos activités et à respecter vos besoins énergétiques.';
      }
    }

    if (lowerContent.includes('fatigue')) {
      return "La fatigue pendant le cycle est tout à fait normale et peut avoir différentes causes. Les fluctuations hormonales affectent votre énergie, votre sommeil et même votre métabolisme. Pour gérer cette fatigue, assurez-vous de bien vous hydrater, de maintenir une alimentation équilibrée, et d'adapter votre niveau d'activité à votre phase actuelle. Voulez-vous des conseils spécifiques pour votre phase actuelle?";
    }

    if (lowerContent.includes('folliculaire') || lowerContent.includes('phase')) {
      return "La phase folliculaire est la période qui suit vos règles. Elle est caractérisée par une augmentation des œstrogènes, qui stimulent la croissance des follicules ovariens. Sur le plan du bien-être, c'est une phase d'énergie croissante, de créativité et de renouveau. Beaucoup de femmes se sentent plus optimistes et sociables pendant cette période. C'est un excellent moment pour commencer de nouveaux projets, apprendre de nouvelles compétences, ou planifier des activités sociales.";
    }

    // Réponse par défaut
    return "Je suis là pour vous accompagner tout au long de votre cycle. N'hésitez pas à me poser des questions sur vos symptômes, votre énergie, ou à me demander des conseils adaptés à votre phase actuelle. Comment puis-je vous aider aujourd'hui?";
  };

  return {
    messages,
    isLoading,
    currentPhase,
    suggestions,
    savedMessageIds,
    sendMessage,
    saveMessage,
    selectSuggestion,
  };
};
