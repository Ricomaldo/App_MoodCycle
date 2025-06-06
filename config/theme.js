// config/theme.js
import { StyleSheet } from 'react-native';
import { getContrastingTextColor, isLightColor, isDarkColor } from '../utils/colors';

export const theme = {
    colors: {
      primary: '#E91E63',      // Framboise Chaleureuse
      secondary: '#CDDC39',    // Citron Vert Velouté
      background: '#FAFAFA',   // Brume d'Aube (fond)
      text: '#212121',         // Texte principal
      textLight: '#757575',    // Texte secondaire
      phases: {
        menstrual: '#F44336',  // Grenat Doux
        follicular: '#FFC107', // Miel Doré
        ovulatory: '#00BCD4',  // Lagune Calme
        luteal: '#673AB7',     // Lavande Mystique
      }
    },
    fonts: {
      heading: 'Quintessential_400Regular',  // Titres
      body: 'Quicksand_400Regular',          // Corps de texte
      bodyBold: 'Quicksand_700Bold',         // Corps de texte gras
    },
    typography: {
      heading1: {
        fontFamily: 'Quintessential_400Regular',
        fontSize: 24,
        fontWeight: 'normal', // Pas de bold disponible
      },
      heading2: {
        fontFamily: 'Quintessential_400Regular', 
        fontSize: 20,
        fontWeight: 'normal',
      },
      heading3: {
        fontFamily: 'Quicksand_700Bold',
        fontSize: 16,
        fontWeight: 'normal', // Le poids est dans le nom de la police
      },
      body: {
        fontFamily: 'Quicksand_400Regular',
        fontSize: 14,
        fontWeight: 'normal',
      },
      small: {
        fontFamily: 'Quicksand_400Regular',
        fontSize: 10,
        fontWeight: 'normal',
      },
      // Tailles pour compatibilité avec l'existant
      heading1Size: 24,
      heading2Size: 20,
      heading3Size: 16,
      bodySize: 14,
      smallSize: 12,
    },
    spacing: {
      xs: 4,
      s: 8,
      m: 16,
      l: 24,
      xl: 32,
      xxl: 48
    },
    borderRadius: {
      small: 8,
      medium: 16,
      large: 24,
      pill: 999,
    },
    // Fonction globale de contraste
    getTextColorOn(bgColor) {
      return getContrastingTextColor(bgColor);
    },
    // Fonctions utilitaires pour tester les couleurs
    isLightColor,
    isDarkColor,
  };
  
  // Créer des styles avec accès au thème
  export const createStyles = (styleFunction) => {
    const styles = StyleSheet.create(styleFunction(theme));
    return styles;
  };
  