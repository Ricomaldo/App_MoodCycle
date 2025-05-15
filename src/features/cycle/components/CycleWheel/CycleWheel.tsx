// src/features/cycle/components/CycleWheel/CycleWheel.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';
import { useTheme } from '@core/ui/theme';
import { CyclePhase, CyclePhaseType } from '@core/domain/entities/cycle/CyclePhase';
import { CycleSegment } from './CycleSegment';
import { CycleIndicator } from './CycleIndicator';
import { useCycleWheel } from '../../hooks/useCycleWheel';

interface CycleWheelProps {
  currentDay: number;
  totalDays: number;
  currentPhase: CyclePhaseType;
  onPhaseSelect?: (phase: CyclePhaseType) => void;
  size?: number;
  _interactive?: boolean;
}

interface SegmentData {
  phase: CyclePhaseType;
  startAngle: number;
  endAngle: number;
  days: number;
}

export const CycleWheel: React.FC<CycleWheelProps> = ({
  currentDay,
  totalDays,
  currentPhase,
  onPhaseSelect,
  size = 300,
  _interactive = true,
}) => {
  const theme = useTheme();
  const { segments, handlePress } = useCycleWheel({
    _currentDay: currentDay,
    totalDays,
    _currentPhase: currentPhase,
    onPhaseSelect,
  });

  const center = size / 2;
  const radius = size * 0.4;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <Circle cx={center} cy={center} r={radius} fill={theme.colors.neutral[100]} />

        {/* Segments */}
        <G x={center} y={center}>
          {segments.map((segment: SegmentData) => (
            <CycleSegment
              key={segment.phase}
              phase={segment.phase}
              startAngle={segment.startAngle}
              endAngle={segment.endAngle}
              radius={radius}
              onPress={() => handlePress(segment.phase)}
              isActive={segment.phase === currentPhase}
            />
          ))}
        </G>

        {/* Current position indicator */}
        <CycleIndicator
          cx={center}
          cy={center}
          radius={radius}
          currentDay={currentDay}
          totalDays={totalDays}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
