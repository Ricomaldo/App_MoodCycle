import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { observer } from 'mobx-react-lite';
import { CycleViewModel } from '../viewmodels/CycleViewModel';

interface CycleScreenProps {
  viewModel: CycleViewModel;
}

export const CycleScreen: React.FC<CycleScreenProps> = observer(({ viewModel }) => {
  useEffect(() => {
    viewModel.loadCycle();
  }, []);

  if (viewModel.isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (viewModel.error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{viewModel.error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {viewModel.hasActiveCycle ? (
        <>
          <Text style={styles.title}>Phase actuelle : {viewModel.currentPhase}</Text>
          <Text style={styles.subtitle}>
            Durée du cycle : {viewModel.cycleDuration} jours
          </Text>
        </>
      ) : (
        <Text style={styles.title}>Aucun cycle en cours</Text>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
}); 