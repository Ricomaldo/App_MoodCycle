import { ThemeProvider } from 'styled-components/native';
import { theme } from './src/core/ui/theme/theme';
import { RootNavigator } from './src/features/navigation/RootNavigator';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="auto" />
      <RootNavigator />
    </ThemeProvider>
  );
}
