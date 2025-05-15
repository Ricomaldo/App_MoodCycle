import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from '../../../core/ui/theme/theme';
import { ConversationScreen } from '../../conversation/screens/ConversationScreen';
import { ConversationHistoryScreen } from '../../conversation/screens/ConversationHistoryScreen';

const Stack = createNativeStackNavigator();

export const ConversationStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.neutral[100],
        headerTitleStyle: {
          fontFamily: theme.typography.fonts.Quicksand,
          fontSize: theme.typography.fontSizes.lg,
          fontWeight: theme.typography.fontWeights.semiBold,
        },
      }}
    >
      <Stack.Screen
        name="ConversationScreen"
        component={ConversationScreen}
        options={{ title: 'Chat' }}
      />
      <Stack.Screen
        name="ConversationHistory"
        component={ConversationHistoryScreen}
        options={{ title: 'Historique' }}
      />
    </Stack.Navigator>
  );
};
