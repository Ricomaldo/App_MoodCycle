import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { theme } from '../../../core/ui/theme/theme';
import { ScreenContainer, Card } from '../../shared/components';

export const HomeScreen = () => {
  return (
    <ScreenContainer>
      <Card>
        <Text style={styles.title}>Accueil</Text>
      </Card>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: theme.typography.fonts.Quicksand,
    fontSize: theme.typography.fontSizes['2xl'],
    fontWeight: '600',
    color: theme.colors.neutral[900],
  },
}); 