import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@store/index';
import { setLoading } from '@store/slices/cycle/cycleSlice';

export const CycleScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { currentCycle, isLoading, error } = useSelector((state: RootState) => state.cycle);

  useEffect(() => {
    dispatch(setLoading(true));
    // TODO: charger le cycle depuis le repository et dispatcher setCurrentCycle
    dispatch(setLoading(false));
  }, [dispatch]);

  if (isLoading) return <ActivityIndicator />;
  if (error) return <Text>{error}</Text>;
  if (!currentCycle) return <Text>Aucun cycle en cours</Text>;

  return (
    <View style={styles.container}>
      <Text>
        Cycle du{' '}
        {currentCycle.startDate ? new Date(currentCycle.startDate).toLocaleDateString() : ''} au{' '}
        {currentCycle.endDate ? new Date(currentCycle.endDate).toLocaleDateString() : 'en cours'}
      </Text>
      {/* autres infos cycle */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
