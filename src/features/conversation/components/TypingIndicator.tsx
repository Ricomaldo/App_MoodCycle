// src/features/conversation/components/TypingIndicator.tsx
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { useTheme } from '@core/ui/theme';

interface TypingIndicatorProps {
  isVisible: boolean;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ isVisible }) => {
  const theme = useTheme();
  const dot1Opacity = useRef(new Animated.Value(0)).current;
  const dot2Opacity = useRef(new Animated.Value(0)).current;
  const dot3Opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      const animation = Animated.loop(
        Animated.sequence([
          // First dot
          Animated.timing(dot1Opacity, {
            toValue: 1,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          // Second dot
          Animated.timing(dot2Opacity, {
            toValue: 1,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          // Third dot
          Animated.timing(dot3Opacity, {
            toValue: 1,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          // Reset
          Animated.parallel([
            Animated.timing(dot1Opacity, {
              toValue: 0,
              duration: 300,
              easing: Easing.ease,
              useNativeDriver: true,
            }),
            Animated.timing(dot2Opacity, {
              toValue: 0,
              duration: 300,
              easing: Easing.ease,
              useNativeDriver: true,
            }),
            Animated.timing(dot3Opacity, {
              toValue: 0,
              duration: 300,
              easing: Easing.ease,
              useNativeDriver: true,
            }),
          ]),
        ])
      );

      animation.start();

      return () => {
        animation.stop();
        dot1Opacity.setValue(0);
        dot2Opacity.setValue(0);
        dot3Opacity.setValue(0);
      };
    }
  }, [isVisible, dot1Opacity, dot2Opacity, dot3Opacity]);

  if (!isVisible) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.neutral[200] }]}>
      <Animated.View
        style={[
          styles.dot,
          {
            backgroundColor: theme.colors.neutral[600],
            opacity: dot1Opacity,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.dot,
          {
            backgroundColor: theme.colors.neutral[600],
            opacity: dot2Opacity,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.dot,
          {
            backgroundColor: theme.colors.neutral[600],
            opacity: dot3Opacity,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
    borderRadius: 20,
    flexDirection: 'row',
    marginVertical: 4,
    maxWidth: '50%',
    padding: 12,
  },
  dot: {
    borderRadius: 4,
    height: 8,
    marginHorizontal: 2,
    width: 8,
  },
});
