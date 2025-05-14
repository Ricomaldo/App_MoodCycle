import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import { HomeStackNavigator } from './stacks/HomeStackNavigator';
import { CycleStackNavigator } from './stacks/CycleStackNavigator';
import { ConversationStackNavigator } from './stacks/ConversationStackNavigator';
import { WisdomStackNavigator } from './stacks/WisdomStackNavigator';
import { theme } from '../../core/ui/theme/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.neutral[500],
        tabBarStyle: {
          backgroundColor: theme.colors.neutral[100],
          borderTopColor: theme.colors.neutral[300],
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Cycle"
        component={CycleStackNavigator}
        options={{
          tabBarLabel: 'Cycle',
          tabBarIcon: ({ color, size }) => <Icon name="calendar-clock" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Conversation"
        component={ConversationStackNavigator}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color, size }) => <Icon name="chat" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Wisdom"
        component={WisdomStackNavigator}
        options={{
          tabBarLabel: 'Sagesse',
          tabBarIcon: ({ color, size }) => (
            <Icon name="book-open-variant" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
