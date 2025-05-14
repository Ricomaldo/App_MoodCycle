export const colors = {
  // Couleurs principales
  primary: '#E91E63',
  secondary: '#CDDC39',

  // Couleurs des phases
  phases: {
    menstruation: '#F44336',
    follicular: '#FFC107',
    ovulation: '#00BCD4',
    luteal: '#673AB7',
  },

  // Couleurs neutres
  neutral: {
    100: '#FFFFFF',
    200: '#F5F5F5',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },

  // Couleurs sémantiques
  semantic: {
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
  },
} as const;

export type Colors = typeof colors;
