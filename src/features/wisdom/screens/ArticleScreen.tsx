import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../../core/ui/theme/theme';
import { Text } from '../../../core/ui/components/Text';

export const ArticleScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text variant="lg" weight="bold">Article</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.neutral[100],
  },
}); 