import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

type IconName =
  | 'star-outline'
  | 'star-filled'
  | 'star'
  | 'share'
  | 'calendar'
  | 'message-circle'
  | 'heart'
  | 'smile'
  | 'plus'
  | 'settings'
  | 'menu'
  | 'paper-plane';

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  style?: any;
}

export const Icon: React.FC<IconProps> = ({ name, size = 24, color = '#000', style }) => {
  // Mapper les noms personnalisés vers les noms Feather
  const getFeatherName = (): string => {
    switch (name) {
      case 'star-filled':
        return 'star';
      case 'star-outline':
        return 'star';
      case 'paper-plane':
        return 'send';
      default:
        return name;
    }
  };

  // Déterminer si l'icône doit être remplie ou non
  const fill = name === 'star-filled';

  return (
    <View style={[styles.container, style]}>
      <Feather
        name={getFeatherName()}
        size={size}
        color={color}
        fill={fill ? color : 'transparent'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Icon;
