import styled from 'styled-components/native';
import { Theme } from '../../../core/ui/theme/theme';
import { StyledProps } from '../../../core/ui/theme/styled';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
}

export const Button = styled.TouchableOpacity<StyledProps<ButtonProps>>`
  padding: ${({ theme, size = 'md' }) => 
    size === 'sm' ? theme.spacing.sm :
    size === 'lg' ? theme.spacing.lg :
    theme.spacing.md
  }px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  background-color: ${({ theme, variant = 'primary', disabled }) => {
    if (disabled) return theme.colors.neutral[300];
    return variant === 'primary' ? theme.colors.primary :
           variant === 'secondary' ? theme.colors.secondary :
           'transparent';
  }};
  border: ${({ theme, variant = 'primary' }) => 
    variant === 'outline' ? `2px solid ${theme.colors.primary}` : 'none'
  };
  width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }) => disabled ? 0.7 : 1};
`;

export const ButtonText = styled.Text<StyledProps<{ variant?: 'primary' | 'secondary' | 'outline' }>>`
  font-family: ${({ theme }) => theme.typography.fonts.Quicksand};
  font-size: ${({ theme }) => theme.typography.fontSizes.md}px;
  font-weight: ${({ theme }) => theme.typography.fontWeights.semiBold};
  color: ${({ theme, variant = 'primary' }) => 
    variant === 'outline' ? theme.colors.primary :
    theme.colors.neutral[900]
  };
`; 