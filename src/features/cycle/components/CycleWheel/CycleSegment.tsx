// src/features/cycle/components/CycleWheel/CycleSegment.tsx
import React from 'react';
import { Path, G } from 'react-native-svg';
import { useTheme } from 'styled-components/native';
import { CyclePhase } from '@core/domain/entities/cycle/Cycle';

interface CycleSegmentProps {
  phase: CyclePhase;
  startAngle: number;
  endAngle: number;
  radius: number;
  onPress: () => void;
}

export const CycleSegment: React.FC<CycleSegmentProps> = ({
  phase,
  startAngle,
  endAngle,
  radius,
  onPress,
}) => {
  const theme = useTheme();

  // Calculer le point sur le cercle
  const polarToCartesian = (angle: number) => {
    const radian = ((angle - 90) * Math.PI) / 180;
    return {
      x: radius * Math.cos(radian),
      y: radius * Math.sin(radian),
    };
  };

  // Générer le path d'arc
  const createArc = () => {
    const start = polarToCartesian(startAngle);
    const end = polarToCartesian(endAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return [
      `M 0 0`,
      `L ${start.x} ${start.y}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
      'Z',
    ].join(' ');
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'MENSTRUAL':
        return theme.colors.phases.menstrual;
      case 'FOLLICULAR':
        return theme.colors.phases.follicular;
      case 'OVULATORY':
        return theme.colors.phases.ovulatory;
      case 'LUTEAL':
        return theme.colors.phases.luteal;
      default:
        return theme.colors.primary;
    }
  };

  return (
    <G>
      <Path
        d={createArc()}
        fill={getPhaseColor()}
        stroke={theme.colors.background}
        strokeWidth={1}
        onPress={onPress}
      />
    </G>
  );
};
