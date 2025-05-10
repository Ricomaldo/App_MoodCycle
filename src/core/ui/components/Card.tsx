import styled from 'styled-components/native';
import { Theme } from '../../../core/ui/theme/theme';
import { StyledProps } from '../../../core/ui/theme/styled';

interface CardProps {
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: keyof Theme['spacing'];
}

export const Card = styled.View<StyledProps<CardProps>>`
  padding: ${({ theme, padding = 'md' }) => theme.spacing[padding]}px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  background-color: ${({ theme, variant = 'elevated' }) => 
    variant === 'filled' ? theme.colors.neutral[200] :
    theme.colors.neutral[100]
  };
  border: ${({ theme, variant = 'elevated' }) => 
    variant === 'outlined' ? `1px solid ${theme.colors.neutral[300]}` : 'none'
  };
  ${({ variant = 'elevated' }) => 
    variant === 'elevated' ? `
      shadow-color: #000;
      shadow-offset: 0px 2px;
      shadow-opacity: 0.1;
      shadow-radius: 4px;
      elevation: 2;
    ` : ''
  }
`; 