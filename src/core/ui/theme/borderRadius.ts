export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 16,
  full: 9999,
} as const;

export type BorderRadius = typeof borderRadius;
