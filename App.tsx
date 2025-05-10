import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DatabaseProvider } from '@nozbe/watermelondb/DatabaseProvider';
import { database } from './database';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store';

const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <DatabaseProvider database={database}>
          <NavigationContainer>
            <Tab.Navigator>
              {/* Les écrans seront ajoutés ici */}
            </Tab.Navigator>
            <StatusBar style="auto" />
          </NavigationContainer>
        </DatabaseProvider>
      </QueryClientProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
