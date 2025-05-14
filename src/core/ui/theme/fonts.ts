import { Platform } from 'react-native';

export const fonts = {
  Quintessential: Platform.select({
    ios: 'Quintessential',
    android: 'Quintessential-Regular',
  }),
  Quicksand: Platform.select({
    ios: 'Quicksand',
    android: 'Quicksand-Regular',
  }),
} as const;

export const fontWeights = {
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
} as const;
