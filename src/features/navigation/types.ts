import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Main: NavigatorScreenParams<MainTabParamList>;
  Auth: undefined;
};

export type MainTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  CycleTab: NavigatorScreenParams<CycleStackParamList>;
  ConversationTab: NavigatorScreenParams<ConversationStackParamList>;
  WisdomTab: NavigatorScreenParams<WisdomStackParamList>;
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
