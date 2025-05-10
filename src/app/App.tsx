import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DatabaseProvider } from '@nozbe/watermelondb/DatabaseProvider';
import { database } from '../core/data/database';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from '../store';
import { ThemeProvider } from '../core/ui/theme/ThemeProvider';

const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Écran d'accueil</Text>
    </View>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <DatabaseProvider database={database}>
          <ThemeProvider>
            <NavigationContainer>
              <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen} />
              </Tab.Navigator>
              <StatusBar style="auto" />
            </NavigationContainer>
          </ThemeProvider>
        </DatabaseProvider>
      </QueryClientProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
