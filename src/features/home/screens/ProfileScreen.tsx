import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../../core/ui/theme/theme';

export const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.neutral[100],
    flex: 1,
    padding: 16,
  },
  title: {
    color: theme.colors.neutral[900],
    fontFamily: theme.typography.fonts.Quicksand,
    fontSize: theme.typography.fontSizes['2xl'],
    fontWeight: 'bold',
  },
});
