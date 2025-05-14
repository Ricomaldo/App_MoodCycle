import { colors, Colors } from './colors';
import { typography, Typography } from './typography';
import { spacing, Spacing } from './spacing';
import { borderRadius, BorderRadius } from './borderRadius';

export interface Theme {
  colors: Colors;
  typography: Typography;
  spacing: Spacing;
  borderRadius: BorderRadius;
}

export const theme: Theme = {
  colors,
  typography,
  spacing,
  borderRadius,
} as const;

export type { Colors, Typography, Spacing, BorderRadius };
