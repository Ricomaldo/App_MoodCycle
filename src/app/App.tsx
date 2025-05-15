import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from '../store';
import { ThemeProvider } from '../core/ui/theme/ThemeProvider';
import { useRealmSync } from '../core/hooks/useRealmSync';

const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

function HomeScreen() {
  const { isInitialized, error } = useRealmSync();

  if (!isInitialized) {
    return (
      <View style={styles.container}>
        <Text>Initialisation de la base de données...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Erreur lors de l&apos;initialisation : {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>
        Bienvenue sur MoodCycle, l&apos;application de suivi du cycle menstruel de l&apos;équipe
        Melune. C&apos;est parti !
      </Text>
    </View>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen name="Home" component={HomeScreen} />
            </Tab.Navigator>
            <StatusBar style="auto" />
          </NavigationContainer>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
});
