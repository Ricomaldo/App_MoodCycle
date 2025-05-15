import { useEffect, useState } from 'react';
import { initRealm, getRealmInstance } from '../data/models';
import { User } from '../types/user/User';
import { Cycle, DailyEntry } from '../domain/entities/Cycle';

export const useRealmSync = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initializeRealm = async () => {
      try {
        await initRealm();
        setIsInitialized(true);
      } catch (err) {
        setError(err as Error);
      }
    };

    initializeRealm();

    return () => {
      const realm = getRealmInstance();
      if (realm && !realm.isClosed) {
        realm.close();
      }
    };
  }, []);

  const syncData = async (data: { user?: User; cycles?: Cycle[]; entries?: DailyEntry[] }) => {
    if (!isInitialized) {
      throw new Error('Realm not initialized');
    }

    const realm = getRealmInstance();

    try {
      realm.write(() => {
        if (data.user) {
          realm.create(
            'User',
            {
              id: data.user.id,
              email: data.user.email,
              passwordHash: data.user.passwordHash,
              profile: data.user.profile,
              preferences: data.user.preferences,
              engagement: data.user.engagement,
              createdAt: data.user.createdAt,
              lastLogin: data.user.lastLogin,
            },
            true
          );
        }

        if (data.cycles) {
          data.cycles.forEach(cycle => {
            realm.create(
              'Cycle',
              {
                id: cycle.id,
                userId: cycle.userId,
                startDate: cycle.startDate,
                endDate: cycle.endDate,
                phase: cycle.phase,
                averageLength: cycle.averageLength,
                isCurrent: cycle.isCurrent,
                createdAt: cycle.createdAt,
                updatedAt: cycle.updatedAt,
              },
              true
            );
          });
        }

        if (data.entries) {
          data.entries.forEach(entry => {
            realm.create(
              'DailyEntry',
              {
                id: entry.id,
                cycle: realm.objectForPrimaryKey('Cycle', entry.cycleId),
                date: entry.date,
                mood: entry.mood,
                symptoms: entry.symptoms.map(symptom => ({
                  id: symptom.id,
                  name: symptom.name,
                  intensity: symptom.intensity,
                  notes: symptom.notes,
                  createdAt: symptom.createdAt,
                  updatedAt: symptom.updatedAt,
                })),
                notes: entry.notes,
                flow: entry.flow,
                temperature: entry.temperature,
                cervicalMucus: entry.cervicalMucus,
                intercourse: entry.intercourse,
                contraception: entry.contraception,
              },
              true
            );
          });
        }
      });
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return {
    isInitialized,
    error,
    syncData,
  };
};
