import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WisdomStackParamList } from '../types';
import { theme } from '../../../core/ui/theme/theme';
import { WisdomScreen } from '../../wisdom/screens/WisdomScreen';
import { ArticleScreen } from '../../wisdom/screens/ArticleScreen';
import { CategoryScreen } from '../../wisdom/screens/CategoryScreen';

const Stack = createNativeStackNavigator<WisdomStackParamList>();

export const WisdomStackNavigator: React.FC = () => {
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
        name="WisdomScreen"
        component={WisdomScreen}
        options={{ title: 'Sagesse' }}
      />
      <Stack.Screen
        name="Article"
        component={ArticleScreen}
        options={{ title: 'Article' }}
      />
      <Stack.Screen
        name="Category"
        component={CategoryScreen}
        options={{ title: 'Catégorie' }}
      />
    </Stack.Navigator>
  );
}; 