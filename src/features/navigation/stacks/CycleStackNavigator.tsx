import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from '../../../core/ui/theme/theme';
import { CycleScreen } from '../../cycle/screens/CycleScreen';
import { CycleHistoryScreen } from '../../cycle/screens/CycleHistoryScreen';
import { CycleStatsScreen } from '../../cycle/screens/CycleStatsScreen';

const Stack = createNativeStackNavigator();

export const CycleStackNavigator: React.FC = () => {
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
        name="Cycle"
        component={CycleScreen}
        options={{ title: 'Cycle' }}
      />
      <Stack.Screen
        name="CycleHistory"
        component={CycleHistoryScreen}
        options={{ title: 'Historique' }}
      />
      <Stack.Screen
        name="CycleStats"
        component={CycleStatsScreen}
        options={{ title: 'Statistiques' }}
      />
    </Stack.Navigator>
  );
}; 