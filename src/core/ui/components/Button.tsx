import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '../theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const theme = useTheme();

  const getBackgroundColor = () => {
    if (disabled) return theme.colors.neutral[300];

    switch (variant) {
      case 'primary':
        return theme.colors.primary;
      case 'secondary':
        return theme.colors.secondary;
      case 'outline':
      case 'text':
        return 'transparent';
      default:
        return theme.colors.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return theme.colors.neutral[500];

    switch (variant) {
      case 'primary':
        return theme.colors.neutral[100];
      case 'secondary':
        return theme.colors.neutral[900];
      case 'outline':
      case 'text':
        return theme.colors.primary;
      default:
        return theme.colors.neutral[100];
    }
  };

  const getBorderColor = () => {
    if (disabled) return theme.colors.neutral[300];
    return variant === 'outline' ? theme.colors.primary : 'transparent';
  };

  const getPadding = () => {
    switch (size) {
      case 'small':
        return { paddingVertical: theme.spacing.xs, paddingHorizontal: theme.spacing.sm };
      case 'large':
        return { paddingVertical: theme.spacing.md, paddingHorizontal: theme.spacing.lg };
      default:
        return { paddingVertical: theme.spacing.sm, paddingHorizontal: theme.spacing.md };
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'small':
        return theme.typography.fontSizes.sm;
      case 'large':
        return theme.typography.fontSizes.lg;
      default:
        return theme.typography.fontSizes.md;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderRadius: theme.borderRadius.md,
          ...getPadding(),
        },
        fullWidth && styles.fullWidth,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <Text
          style={[
            styles.text,
            {
              color: getTextColor(),
              fontSize: getFontSize(),
              fontFamily: theme.typography.fonts.Quicksand,
            },
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderWidth: 1,
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Button;
