import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../theme/theme';

interface CardProps {
  children: React.ReactNode;
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'elevated',
  padding = 'md',
  style
}) => {
  const cardStyles = [
    styles.card,
    styles[`${variant}Card`],
    styles[`${padding}Padding`],
    style
  ];

  return (
    <View style={cardStyles}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.borderRadius.md,
  },
  elevatedCard: {
    backgroundColor: theme.colors.neutral[100],
    shadowColor: theme.colors.neutral[900],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  outlinedCard: {
    backgroundColor: theme.colors.neutral[100],
    borderWidth: 1,
    borderColor: theme.colors.neutral[300],
  },
  filledCard: {
    backgroundColor: theme.colors.neutral[200],
  },
  smPadding: {
    padding: theme.spacing.sm,
  },
  mdPadding: {
    padding: theme.spacing.md,
  },
  lgPadding: {
    padding: theme.spacing.lg,
  },
}); 