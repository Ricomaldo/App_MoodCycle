import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../../core/ui/theme/theme';
import { Text } from '../../../core/ui/components/Text';

export const CategoryScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text variant="lg" weight="bold">
        Catégorie
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.neutral[100],
    flex: 1,
    padding: theme.spacing.lg,
  },
});
