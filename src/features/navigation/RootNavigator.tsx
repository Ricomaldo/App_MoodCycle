import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from '../../core/ui/theme/theme';
import { MainTabNavigator } from './MainTabNavigator';

const Stack = createNativeStackNavigator();

export const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
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
        <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
        {/* Auth stack sera ajouté plus tard */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
