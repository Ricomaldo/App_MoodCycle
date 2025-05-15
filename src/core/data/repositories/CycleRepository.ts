import { getRealmInstance } from '../models';
import { ICycleRepository } from '../../domain/repositories/ICycleRepository';
import {
  Cycle,
  CyclePredictions,
  CycleStatistics,
  MoodType,
  Symptom,
  CyclePhase,
  CyclePhaseType,
  DailyEntry,
} from '../../domain/entities/Cycle';

interface RealmSymptom {
  type: string;
  intensity: number;
  notes?: string;
}

interface RealmDailyEntry {
  id: string;
  cycleId: string;
  date: Date | string;
  mood?: number;
  symptoms?: RealmSymptom[];
  notes?: string;
  flow?: string;
  temperature?: number;
  cervicalMucus?: string;
  intercourse?: boolean;
  contraception?: string;
}

interface RealmCycle {
  id: string;
  userId: string;
  startDate: Date | string;
  endDate?: Date | string;
  phase: string;
  entries?: RealmDailyEntry[];
  averageLength?: number;
  isCurrent: boolean;
  symptoms?: RealmSymptom[];
  mood?: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

const MOOD_MAP: MoodType[] = [
  'happy',
  'sad',
  'energetic',
  'tired',
  'irritable',
  'anxious',
  'calm',
  'stressed',
];

function mapPhaseStringToArray(phase: string, startDate: Date, endDate?: Date): CyclePhase[] {
  return [
    {
      id: `${phase}-${startDate.toISOString()}`,
      type: phase as CyclePhaseType,
      startDate,
      endDate: endDate ?? startDate,
      symptoms: [],
      mood: 0,
      createdAt: startDate,
      updatedAt: endDate ?? startDate,
    },
  ];
}

export class CycleRepository implements ICycleRepository {
  async getCurrentCycle(): Promise<Cycle> {
    const realm = getRealmInstance();
    const currentCycle = realm.objects('Cycle').filtered('endDate = null')[0];

    if (!currentCycle) {
      throw new Error('Aucun cycle en cours');
    }

    return this.mapToEntity(currentCycle);
  }

  async getCycleById(id: string): Promise<Cycle> {
    const realm = getRealmInstance();
    const cycle = realm.objectForPrimaryKey('Cycle', id);
    if (!cycle) {
      throw new Error('Cycle not found');
    }
    return this.mapToEntity(cycle);
  }

  async getCyclesByDateRange(startDate: Date, endDate: Date): Promise<Cycle[]> {
    const realm = getRealmInstance();
    const cycles = realm
      .objects('Cycle')
      .filtered('startDate >= $0 AND endDate <= $1', startDate, endDate);
    return cycles.map(this.mapToEntity);
  }

  async saveCycle(cycle: Cycle): Promise<void> {
    const realm = getRealmInstance();

    realm.write(() => {
      realm.create('Cycle', {
        id: 'cycle-' + Date.now(),
        userId: cycle.userId,
        startDate: cycle.startDate,
        endDate: cycle.endDate,
        phase: cycle.phase,
        averageLength: cycle.averageLength,
        isCurrent: cycle.isCurrent,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
  }

  async updateCycle(cycle: Cycle): Promise<void> {
    const realm = getRealmInstance();

    realm.write(() => {
      const cycleToUpdate = realm.objectForPrimaryKey('Cycle', cycle.id);
      if (!cycleToUpdate) {
        throw new Error('Cycle not found');
      }

      Object.assign(cycleToUpdate, {
        userId: cycle.userId,
        startDate: cycle.startDate,
        endDate: cycle.endDate,
        phase: cycle.phase,
        averageLength: cycle.averageLength,
        isCurrent: cycle.isCurrent,
        updatedAt: new Date(),
      });
    });
  }

  async deleteCycle(id: string): Promise<void> {
    const realm = getRealmInstance();

    realm.write(() => {
      const cycleToDelete = realm.objectForPrimaryKey('Cycle', id);
      if (!cycleToDelete) {
        throw new Error('Cycle not found');
      }
      realm.delete(cycleToDelete);
    });
  }

  async getLastCycle(): Promise<Cycle | null> {
    const realm = getRealmInstance();
    const lastCycle = realm.objects('Cycle').filtered('endDate != null').sorted('endDate', true)[0];

    return lastCycle ? this.mapToEntity(lastCycle) : null;
  }

  async getNextCycle(): Promise<Cycle | null> {
    const realm = getRealmInstance();
    const nextCycle = realm
      .objects('Cycle')
      .filtered('startDate > $0', new Date())
      .sorted('startDate', true)[0];

    return nextCycle ? this.mapToEntity(nextCycle) : null;
  }

  async getCyclePredictions(cycleId: string): Promise<CyclePredictions> {
    const cycle = await this.getCycleById(cycleId);
    const lastCycle = await this.getLastCycle();

    // Logique de prédiction basée sur les cycles précédents
    const averageLength = lastCycle
      ? Math.round(
          (cycle.startDate.getTime() - lastCycle.startDate.getTime()) / (1000 * 60 * 60 * 24)
        )
      : 28;

    const nextPeriodStart = new Date(cycle.startDate);
    nextPeriodStart.setDate(nextPeriodStart.getDate() + averageLength);

    const nextPeriodEnd = new Date(nextPeriodStart);
    nextPeriodEnd.setDate(nextPeriodEnd.getDate() + 5); // Durée moyenne des règles

    const nextOvulation = new Date(nextPeriodStart);
    nextOvulation.setDate(nextOvulation.getDate() - 14); // 14 jours avant les prochaines règles

    const fertileWindow = {
      start: new Date(nextOvulation),
      end: new Date(nextOvulation),
    };
    fertileWindow.start.setDate(fertileWindow.start.getDate() - 5);
    fertileWindow.end.setDate(fertileWindow.end.getDate() + 1);

    const nextCycleStart = new Date(nextPeriodEnd);
    nextCycleStart.setDate(nextCycleStart.getDate() + 1);

    return {
      nextPeriodStart,
      nextPeriodEnd,
      nextOvulation,
      fertileWindow,
      nextCycleStart,
      confidence: lastCycle ? 0.8 : 0.5,
    };
  }

  async getCycleStatistics(cycleId: string): Promise<CycleStatistics> {
    const cycle = await this.getCycleById(cycleId);
    const entries = cycle.entries ?? [];

    // Calcul des statistiques
    const symptoms = entries.flatMap(entry => entry.symptoms ?? []);
    const moods = entries.map(entry => entry.mood).filter((m): m is MoodType => m !== undefined);

    const symptomFrequency = this.calculateFrequency(symptoms.map(s => s.type));
    const moodFrequency = this.calculateFrequency(moods.map(m => m.toString()));

    const averageCycleLength = 28; // À calculer avec plus de données
    const averagePeriodLength = 5; // À calculer avec plus de données
    const cycleRegularity = 0.8; // À calculer avec plus de données

    return {
      averageCycleLength,
      averagePeriodLength,
      cycleRegularity,
      phaseLengths: {
        menstruation: averagePeriodLength,
        follicular: 14,
        ovulation: 1,
        luteal: 14,
      },
      commonSymptoms: Object.entries(symptomFrequency).map(([type, frequency]) => ({
        type,
        frequency,
        averageIntensity: this.calculateAverageIntensity(symptoms, type),
      })),
      commonMoods: Object.entries(moodFrequency).map(([type, frequency]) => ({
        type: type as MoodType,
        frequency,
      })),
      lastUpdated: new Date(),
    };
  }

  private calculateFrequency(items: string[]): { [key: string]: number } {
    const frequency: { [key: string]: number } = {};
    items.forEach(item => {
      frequency[item] = (frequency[item] || 0) + 1;
    });
    return frequency;
  }

  private calculateAverageIntensity(symptoms: Symptom[], type: string): number {
    const typeSymptoms = symptoms.filter(s => s.type === type);
    if (typeSymptoms.length === 0) return 0;
    const sum = typeSymptoms.reduce((acc, s) => acc + s.intensity, 0);
    return sum / typeSymptoms.length;
  }

  private mapToEntity(model: unknown): Cycle {
    const realmObject = model as RealmCycle;
    return {
      id: realmObject.id,
      userId: realmObject.userId,
      startDate: new Date(realmObject.startDate),
      endDate: realmObject.endDate ? new Date(realmObject.endDate) : undefined,
      phase: mapPhaseStringToArray(
        realmObject.phase,
        new Date(realmObject.startDate),
        realmObject.endDate ? new Date(realmObject.endDate) : undefined
      ),
      entries: Array.from(realmObject.entries ?? []).map((entry: RealmDailyEntry) => ({
        id: entry.id,
        cycleId: entry.cycleId,
        date: new Date(entry.date),
        mood: typeof entry.mood === 'number' ? MOOD_MAP[entry.mood] : undefined,
        symptoms: Array.from(entry.symptoms ?? []).map((s: RealmSymptom) => ({
          type: s.type,
          intensity: s.intensity,
          notes: s.notes,
        })),
        notes: entry.notes,
        flow: entry.flow ? Number(entry.flow) : undefined,
        temperature: entry.temperature,
        cervicalMucus: entry.cervicalMucus as DailyEntry['cervicalMucus'],
        intercourse: typeof entry.intercourse === 'boolean' ? entry.intercourse : undefined,
        contraception: typeof entry.contraception === 'boolean' ? entry.contraception : undefined,
      })),
      averageLength: realmObject.averageLength,
      isCurrent: realmObject.isCurrent,
      symptoms: Array.isArray(realmObject.symptoms) ? realmObject.symptoms.map(s => s.type) : [],
      mood: typeof realmObject.mood === 'number' ? realmObject.mood : 0,
      createdAt: new Date(realmObject.createdAt),
      updatedAt: new Date(realmObject.updatedAt),
    };
  }
}
