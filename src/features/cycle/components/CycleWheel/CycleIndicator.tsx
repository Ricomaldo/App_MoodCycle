// src/features/cycle/components/CycleWheel/CycleIndicator.tsx
import React from 'react';
import { Circle, Line } from 'react-native-svg';
import { useTheme } from '@core/ui/theme';

interface CycleIndicatorProps {
  cx: number;
  cy: number;
  radius: number;
  currentDay: number;
  totalDays: number;
}

export const CycleIndicator: React.FC<CycleIndicatorProps> = ({
  cx,
  cy,
  radius,
  currentDay,
  totalDays,
}) => {
  const theme = useTheme();

  // Calculer l'angle de l'indicateur
  const angle = (currentDay / totalDays) * 360;
  const radian = ((angle - 90) * Math.PI) / 180;

  // Position de l'indicateur
  const x = cx + radius * Math.cos(radian);
  const y = cy + radius * Math.sin(radian);

  return (
    <>
      {/* Ligne du centre vers la position actuelle */}
      <Line
        x1={cx}
        y1={cy}
        x2={x}
        y2={y}
        stroke={theme.colors.primary}
        strokeWidth={2}
        strokeDasharray="4,2"
      />

      {/* Cercle indicateur */}
      <Circle
        cx={x}
        cy={y}
        r={10}
        fill={theme.colors.primary}
        stroke={theme.colors.neutral[100]}
        strokeWidth={2}
      />
    </>
  );
};
