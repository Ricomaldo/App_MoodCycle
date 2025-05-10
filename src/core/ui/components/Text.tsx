import styled from 'styled-components/native';
import { Theme } from '../../../core/ui/theme/theme';
import { StyledProps } from '../../../core/ui/theme/styled';

interface TextProps {
  variant?: keyof Theme['typography']['fontSizes'];
  weight?: keyof Theme['typography']['fontWeights'];
  color?: string;
  align?: 'left' | 'center' | 'right';
  font?: keyof Theme['typography']['fonts'];
}

export const Text = styled.Text<StyledProps<TextProps>>`
  font-family: ${({ theme, font = 'Quicksand' }) => theme.typography.fonts[font]};
  font-size: ${({ theme, variant = 'md' }) => theme.typography.fontSizes[variant]}px;
  font-weight: ${({ theme, weight = 'regular' }) => theme.typography.fontWeights[weight]};
  color: ${({ theme, color = theme.colors.neutral[900] }) => color};
  text-align: ${({ align = 'left' }) => align};
`; 