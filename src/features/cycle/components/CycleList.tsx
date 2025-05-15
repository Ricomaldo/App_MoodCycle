import React from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { useQuery, useRealm } from '@realm/react';
import { Cycle } from '../../../models/realmModels';

export const CycleList: React.FC = () => {
  const realm = useRealm();
  const cycles = useQuery(Cycle).sorted('startDate', true);

  return (
    <FlatList
      data={cycles}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity>
          <Text>
            {item.startDate.toLocaleDateString()} -{' '}
            {item.endDate?.toLocaleDateString() || 'En cours'}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};
