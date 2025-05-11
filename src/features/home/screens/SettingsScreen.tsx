import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../../core/ui/theme/theme';

export const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Paramètres</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.neutral[100],
  },
  title: {
    fontFamily: theme.typography.fonts.Quicksand,
    fontSize: theme.typography.fontSizes['2xl'],
    fontWeight: 'bold',
    color: theme.colors.neutral[900],
  },
}); 