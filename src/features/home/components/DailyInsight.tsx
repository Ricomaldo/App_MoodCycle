import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@core/ui/theme';
import { Text } from '@core/ui/components/Text';
import { Card } from '@core/ui/components/Card';
import { Icon } from '@core/ui/components/Icon';

interface DailyInsightProps {
  content: string;
  phase: string;
  onSave?: () => void;
  onShare?: () => void;
  isSaved?: boolean;
}

export const DailyInsight: React.FC<DailyInsightProps> = ({
  content,
  phase,
  onSave,
  onShare,
  isSaved = false,
}) => {
  const theme = useTheme();

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <Text variant="caption" style={styles.title}>
          INSIGHT DU JOUR
        </Text>
        <Text variant="caption" style={styles.phase}>
          {phase}
        </Text>
      </View>

      <Text variant="body" style={styles.content}>
        {content}
      </Text>

      <View style={styles.actions}>
        <TouchableOpacity onPress={onSave} style={styles.actionButton}>
          <Icon
            name={isSaved ? 'star-filled' : 'star-outline'}
            color={isSaved ? theme.colors.primary : theme.colors.neutral[600]}
            size={24}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={onShare} style={styles.actionButton}>
          <Icon name="share" color={theme.colors.neutral[600]} size={24} />
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    marginLeft: 16,
    padding: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  container: {
    margin: 16,
    padding: 16,
  },
  content: {
    lineHeight: 22,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  phase: {
    fontStyle: 'italic',
  },
  title: {
    fontWeight: 'bold',
  },
});
