import React, { ReactNode } from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '../theme';

interface CardProps {
  children: ReactNode;
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: 'sm' | 'md' | 'lg' | 'none';
  style?: ViewStyle;
  onPress?: () => void;
  elevation?: number;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'elevated',
  padding = 'md',
  style,
  onPress,
  elevation,
}) => {
  const theme = useTheme();

  const getBackgroundColor = () => {
    switch (variant) {
      case 'outlined':
      case 'elevated':
        return theme.colors.neutral[100];
      case 'filled':
        return theme.colors.neutral[200];
      default:
        return theme.colors.neutral[100];
    }
  };

  const getPadding = () => {
    if (padding === 'none') return 0;

    switch (padding) {
      case 'sm':
        return theme.spacing.sm;
      case 'lg':
        return theme.spacing.lg;
      default:
        return theme.spacing.md;
    }
  };

  const getElevation = () => {
    if (elevation !== undefined) return elevation;
    return variant === 'elevated' ? 3 : 0;
  };

  const cardStyle = [
    styles.card,
    {
      backgroundColor: getBackgroundColor(),
      borderRadius: theme.borderRadius.md,
      padding: getPadding(),
      elevation: getElevation(),
      shadowOpacity: variant === 'elevated' ? 0.1 : 0,
      shadowRadius: variant === 'elevated' ? 4 : 0,
      shadowOffset: {
        width: 0,
        height: variant === 'elevated' ? 2 : 0,
      },
      shadowColor: theme.colors.neutral[900],
      borderWidth: variant === 'outlined' ? 1 : 0,
      borderColor: variant === 'outlined' ? theme.colors.neutral[300] : undefined,
    },
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity style={cardStyle} onPress={onPress} activeOpacity={0.7}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
  },
});

export default Card;
