// config/theme.js
import { StyleSheet } from 'react-native';

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
  };

  // Fonctions utilitaires pour le contraste automatique
  
  // Convertir hex en RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };
  
  // Calculer la luminance selon W3C
  const getLuminance = (color) => {
    const rgb = hexToRgb(color);
    if (!rgb) return 0;
    
    // Formule W3C pour la luminance relative
    return 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
  };
  
  // Déterminer si une couleur est claire
  theme.isLightColor = (color) => {
    return getLuminance(color) > 186;
  };
  
  // Déterminer si une couleur est foncée
  theme.isDarkColor = (color) => {
    return getLuminance(color) <= 186;
  };
  
  // Obtenir la couleur de texte optimale pour un fond donné
  theme.getTextColorOn = (backgroundColor) => {
    return theme.isLightColor(backgroundColor) ? theme.colors.text : '#FFFFFF';
  };
  
  // Créer des styles avec accès au thème
  export const createStyles = (styleFunction) => {
    const styles = StyleSheet.create(styleFunction(theme));
    return styles;
  };
  