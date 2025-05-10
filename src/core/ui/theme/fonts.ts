import { Platform } from 'react-native';

export const fonts = {
  Quintessential: Platform.select({
    ios: 'Quintessential',
    android: 'Quintessential-Regular'
  }),
  Quicksand: Platform.select({
    ios: 'Quicksand',
    android: 'Quicksand-Regular'
  })
} as const;

export const fontWeights = {
  light: Platform.select({
    ios: '300',
    android: '300'
  }),
  regular: Platform.select({
    ios: '400',
    android: '400'
  }),
  medium: Platform.select({
    ios: '500',
    android: '500'
  }),
  semiBold: Platform.select({
    ios: '600',
    android: '600'
  }),
  bold: Platform.select({
    ios: '700',
    android: '700'
  })
} as const; 