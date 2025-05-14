import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../../../core/ui/theme/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  style,
  textStyle,
  disabled = false,
}: ButtonProps) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'outline':
        return styles.outline;
      case 'secondary':
        return styles.secondary;
      case 'primary':
      default:
        return styles.primary;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'outline':
        return styles.outlineText;
      case 'secondary':
        return styles.secondaryText;
      case 'primary':
      default:
        return styles.primaryText;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, getVariantStyle(), disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, getTextStyle(), disabled && styles.disabledText, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 8,
    justifyContent: 'center',
    padding: 12,
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    color: theme.colors.neutral[500],
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: theme.colors.primary,
    borderWidth: 1,
  },
  outlineText: {
    color: theme.colors.primary,
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  primaryText: {
    color: theme.colors.neutral[100],
  },
  secondary: {
    backgroundColor: theme.colors.neutral[200],
  },
  secondaryText: {
    color: theme.colors.neutral[900],
  },
  text: {
    fontFamily: theme.typography.fonts.Quicksand,
    fontSize: theme.typography.fontSizes.md,
    fontWeight: '600',
  },
});
