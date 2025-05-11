import { ThemeProvider } from 'styled-components/native';
import { theme } from './src/core/ui/theme/theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* Votre contenu d'application ici */}
    </ThemeProvider>
  );
} 