import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '@core/ui/theme';
import { CyclePhase, CyclePhaseType } from '@core/domain/entities/cycle/CyclePhase';

interface MeluneAvatarProps {
  phase: CyclePhaseType;
  size?: number;
  onPress?: () => void;
  animated?: boolean;
}

export const MeluneAvatar: React.FC<MeluneAvatarProps> = ({
  phase,
  size = 120,
  onPress,
  animated = true,
}) => {
  const theme = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animated) {
      // Animation subtile de respiration
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.05,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [animated, scaleAnim]);

  const getAvatarColor = () => {
    switch (phase) {
      case CyclePhase.MENSTRUAL:
        return theme.colors.phases.menstruation;
      case CyclePhase.FOLLICULAR:
        return theme.colors.phases.follicular;
      case CyclePhase.OVULATORY:
        return theme.colors.phases.ovulation;
      case CyclePhase.LUTEAL:
        return theme.colors.phases.luteal;
      default:
        return theme.colors.primary;
    }
  };

  const handlePress = () => {
    // Animation rapide au touch
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    // Rotation subtile
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      rotateAnim.setValue(0);
    });

    if (onPress) {
      onPress();
    }
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '10deg'],
  });

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Animated.View
        style={[
          styles.container,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: getAvatarColor(),
            transform: [{ scale: scaleAnim }, { rotate }],
          },
        ]}
      >
        {/* Ici nous utilisons une image de base en attendant les assets finaux */}
        <View style={styles.faceContainer}>
          <View style={styles.eye} />
          <View style={styles.eye} />
          <View style={styles.mouth} />
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    elevation: 3,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  eye: {
    backgroundColor: 'white',
    borderRadius: 4,
    height: 8,
    margin: 5,
    width: 8,
  },
  faceContainer: {
    alignItems: 'center',
    height: '60%',
    justifyContent: 'center',
    width: '60%',
  },
  mouth: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: 10,
    marginTop: 5,
    width: 20,
  },
});
