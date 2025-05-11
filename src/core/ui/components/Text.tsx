import React from 'react';
import { Text as RNText, StyleSheet, TextStyle } from 'react-native';
import { theme } from '../theme/theme';

interface TextProps {
  children: React.ReactNode;
  variant?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  weight?: 'light' | 'regular' | 'medium' | 'semiBold' | 'bold';
  font?: 'Quicksand' | 'Quintessential';
  color?: string;
  style?: TextStyle;
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'md',
  weight = 'regular',
  font = 'Quicksand',
  color = theme.colors.neutral[900],
  style
}) => {
  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${weight}Text`],
    { fontFamily: theme.typography.fonts[font], color },
    style
  ];

  return <RNText style={textStyles}>{children}</RNText>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: theme.typography.fonts.Quicksand,
  },
  xsText: {
    fontSize: theme.typography.fontSizes.xs,
  },
  smText: {
    fontSize: theme.typography.fontSizes.sm,
  },
  mdText: {
    fontSize: theme.typography.fontSizes.md,
  },
  lgText: {
    fontSize: theme.typography.fontSizes.lg,
  },
  xlText: {
    fontSize: theme.typography.fontSizes.xl,
  },
  '2xlText': {
    fontSize: theme.typography.fontSizes['2xl'],
  },
  '3xlText': {
    fontSize: theme.typography.fontSizes['3xl'],
  },
  '4xlText': {
    fontSize: theme.typography.fontSizes['4xl'],
  },
  '5xlText': {
    fontSize: theme.typography.fontSizes['5xl'],
  },
  lightText: {
    fontWeight: theme.typography.fontWeights.light,
  },
  regularText: {
    fontWeight: theme.typography.fontWeights.regular,
  },
  mediumText: {
    fontWeight: theme.typography.fontWeights.medium,
  },
  semiBoldText: {
    fontWeight: theme.typography.fontWeights.semiBold,
  },
  boldText: {
    fontWeight: theme.typography.fontWeights.bold,
  },
}); 