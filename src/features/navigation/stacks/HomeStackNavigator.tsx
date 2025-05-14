import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from '../../../core/ui/theme/theme';
import { HomeScreen } from '../../home/screens/HomeScreen';
import { ProfileScreen } from '../../home/screens/ProfileScreen';
import { SettingsScreen } from '../../home/screens/SettingsScreen';

const Stack = createNativeStackNavigator();

export const HomeStackNavigator: React.FC = () => {
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
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Accueil' }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profil' }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Paramètres' }} />
    </Stack.Navigator>
  );
};
