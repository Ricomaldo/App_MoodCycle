import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Main: NavigatorScreenParams<MainTabParamList>;
  Auth: undefined;
};

export type MainTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Cycle: NavigatorScreenParams<CycleStackParamList>;
  Conversation: NavigatorScreenParams<ConversationStackParamList>;
  Wisdom: NavigatorScreenParams<WisdomStackParamList>;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  Profile: undefined;
  Settings: undefined;
};

export type CycleStackParamList = {
  CycleScreen: undefined;
  CycleHistory: undefined;
  CycleStats: undefined;
};

export type ConversationStackParamList = {
  ConversationScreen: undefined;
  ConversationHistory: undefined;
};

export type WisdomStackParamList = {
  WisdomScreen: undefined;
  Article: { id: string };
  Category: { id: string };
}; 