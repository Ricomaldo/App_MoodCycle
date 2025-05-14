import React, { ReactNode } from 'react';
import { Text as RNText, TextStyle } from 'react-native';
import { useTheme } from '../theme';

type TextVariant =
  // Variantes sémantiques
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body'
  | 'body2'
  | 'caption'
  | 'button'
  // Variantes de taille (pour compatibilité)
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl';

type FontWeight = 'light' | 'regular' | 'medium' | 'semiBold' | 'bold';
type FontFamily = 'Quicksand' | 'Quintessential';

interface TextProps {
  children: ReactNode;
  variant?: TextVariant;
  weight?: FontWeight;
  font?: FontFamily;
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  style?: TextStyle;
  numberOfLines?: number;
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  weight,
  font,
  color,
  align,
  style,
  numberOfLines,
}) => {
  const theme = useTheme();

  const getTextStyle = (): TextStyle => {
    const textStyle: TextStyle = {};
    let fontFamily: FontFamily;
    let fontSize: number;
    let fontWeight: FontWeight;

    // Définir les styles en fonction des variantes sémantiques
    switch (variant) {
      case 'h1':
        fontFamily = 'Quintessential';
        fontSize = theme.typography.fontSizes['3xl'];
        fontWeight = 'bold';
        break;
      case 'h2':
        fontFamily = 'Quintessential';
        fontSize = theme.typography.fontSizes['2xl'];
        fontWeight = 'bold';
        break;
      case 'h3':
        fontFamily = 'Quicksand';
        fontSize = theme.typography.fontSizes.xl;
        fontWeight = 'bold';
        break;
      case 'body2':
        fontFamily = 'Quicksand';
        fontSize = theme.typography.fontSizes.sm;
        fontWeight = 'regular';
        break;
      case 'caption':
        fontFamily = 'Quicksand';
        fontSize = theme.typography.fontSizes.xs;
        fontWeight = 'regular';
        break;
      case 'button':
        fontFamily = 'Quicksand';
        fontSize = theme.typography.fontSizes.sm;
        fontWeight = 'semiBold';
        break;
      case 'xs':
        fontFamily = 'Quicksand';
        fontSize = theme.typography.fontSizes.xs;
        fontWeight = 'regular';
        break;
      case 'sm':
        fontFamily = 'Quicksand';
        fontSize = theme.typography.fontSizes.sm;
        fontWeight = 'regular';
        break;
      case 'md':
        fontFamily = 'Quicksand';
        fontSize = theme.typography.fontSizes.md;
        fontWeight = 'regular';
        break;
      case 'lg':
        fontFamily = 'Quicksand';
        fontSize = theme.typography.fontSizes.lg;
        fontWeight = 'regular';
        break;
      case 'xl':
        fontFamily = 'Quicksand';
        fontSize = theme.typography.fontSizes.xl;
        fontWeight = 'regular';
        break;
      case '2xl':
        fontFamily = 'Quicksand';
        fontSize = theme.typography.fontSizes['2xl'];
        fontWeight = 'regular';
        break;
      case '3xl':
        fontFamily = 'Quicksand';
        fontSize = theme.typography.fontSizes['3xl'];
        fontWeight = 'regular';
        break;
      case '4xl':
        fontFamily = 'Quicksand';
        fontSize = theme.typography.fontSizes['4xl'];
        fontWeight = 'regular';
        break;
      case '5xl':
        fontFamily = 'Quicksand';
        fontSize = theme.typography.fontSizes['5xl'];
        fontWeight = 'regular';
        break;
      default: // 'body'
        fontFamily = 'Quicksand';
        fontSize = theme.typography.fontSizes.md;
        fontWeight = 'regular';
    }

    // Appliquer les surcharges si elles sont fournies
    textStyle.fontFamily = theme.typography.fonts[font || fontFamily];
    textStyle.fontSize = fontSize;
    textStyle.fontWeight = theme.typography.fontWeights[weight || fontWeight];
    textStyle.color = color || theme.colors.neutral[900];

    if (align) {
      textStyle.textAlign = align;
    }

    return textStyle;
  };

  return (
    <RNText style={[getTextStyle(), style]} numberOfLines={numberOfLines}>
      {children}
    </RNText>
  );
};

// Export par défaut pour compatibilité
export default Text;
