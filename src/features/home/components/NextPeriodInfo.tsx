import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '@core/ui/theme';
import { Text } from '@core/ui/components/Text';
import Card from '@core/ui/components/Card';

interface NextPeriodInfoProps {
  daysUntilNextPeriod: number;
  nextPeriodDate: string;
}

export const NextPeriodInfo: React.FC<NextPeriodInfoProps> = ({
  daysUntilNextPeriod,
  nextPeriodDate,
}) => {
  const theme = useTheme();

  const getMessage = () => {
    if (daysUntilNextPeriod === 0) {
      return "Vos règles devraient débuter aujourd'hui";
    } else if (daysUntilNextPeriod === 1) {
      return 'Vos règles devraient débuter demain';
    } else if (daysUntilNextPeriod < 0) {
      return `Vous êtes dans votre phase menstruelle`;
    } else {
      return `Vos prochaines règles dans ${daysUntilNextPeriod} jours`;
    }
  };

  return (
    <Card style={styles.container}>
      <Text variant="body" weight="bold" style={{ color: theme.colors.phase.menstruation }}>
        {getMessage()}
      </Text>
      {daysUntilNextPeriod > 0 && (
        <Text variant="caption" style={styles.date}>
          {nextPeriodDate}
        </Text>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 16,
    padding: 12,
  },
  date: {
    marginTop: 4,
  },
});
