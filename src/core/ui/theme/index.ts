import { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { theme, Theme } from './theme';
import { ThemeProvider } from './ThemeProvider';

// Hook pour accéder au thème dans les composants fonctionnels
export const useTheme = (): Theme => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    return theme; // Fallback au thème par défaut si aucun ThemeProvider n'est présent
  }
  return themeContext;
};

export { theme, ThemeProvider };
export type { Theme };
