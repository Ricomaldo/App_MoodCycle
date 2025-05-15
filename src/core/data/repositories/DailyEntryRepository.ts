import { getRealmInstance } from '../models';
import { IDailyEntryRepository } from '../../domain/repositories/IDailyEntryRepository';
import { DailyEntry, Symptom } from '../../domain/entities/Cycle';

interface RealmSymptom {
  id: string;
  type: string;
  intensity: number;
  notes?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface RealmDailyEntry {
  id: string;
  cycleId: string;
  date: Date | string;
  mood?: number;
  symptoms: RealmSymptom[];
  notes?: string;
  flow?: string;
  temperature?: number;
  cervicalMucus?: string;
  intercourse?: boolean;
  contraception?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export class DailyEntryRepository implements IDailyEntryRepository {
  async getEntryById(id: string): Promise<DailyEntry> {
    const realm = getRealmInstance();
    const entry = realm.objectForPrimaryKey('DailyEntry', id);
    if (!entry) {
      throw new Error('Entry not found');
    }
    return this.mapToEntity(entry);
  }

  async getEntriesByCycleId(cycleId: string): Promise<DailyEntry[]> {
    const realm = getRealmInstance();
    const entries = realm.objects('DailyEntry').filtered('cycleId = $0', cycleId);
    return entries.map(this.mapToEntity);
  }

  async getEntriesByDateRange(startDate: Date, endDate: Date): Promise<DailyEntry[]> {
    const realm = getRealmInstance();
    const entries = realm
      .objects('DailyEntry')
      .filtered('date >= $0 AND date <= $1', startDate, endDate);
    return entries.map(this.mapToEntity);
  }

  async createEntry(entry: Omit<DailyEntry, 'id'>): Promise<DailyEntry> {
    const realm = getRealmInstance();
    let createdEntry;

    realm.write(() => {
      createdEntry = realm.create('DailyEntry', {
        id: 'entry-' + Date.now(),
        cycleId: entry.cycleId,
        date: entry.date,
        mood: entry.mood,
        symptoms: entry.symptoms.map(symptom => ({
          id: 'symptom-' + Date.now(),
          type: symptom.type,
          intensity: symptom.intensity,
          notes: symptom.notes,
          createdAt: new Date(),
          updatedAt: new Date(),
        })),
        notes: entry.notes,
        flow: entry.flow,
        temperature: entry.temperature,
        cervicalMucus: entry.cervicalMucus,
        intercourse: entry.intercourse,
        contraception: entry.contraception,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    return this.mapToEntity(createdEntry);
  }

  async updateEntry(entry: DailyEntry): Promise<void> {
    const realm = getRealmInstance();

    realm.write(() => {
      const entryToUpdate = realm.objectForPrimaryKey('DailyEntry', entry.id);
      if (!entryToUpdate) {
        throw new Error('Entry not found');
      }

      Object.assign(entryToUpdate, {
        cycleId: entry.cycleId,
        date: entry.date,
        mood: entry.mood,
        symptoms: entry.symptoms.map(symptom => ({
          id: symptom.id || 'symptom-' + Date.now(),
          type: symptom.type,
          intensity: symptom.intensity,
          notes: symptom.notes,
          createdAt: symptom.createdAt || new Date(),
          updatedAt: new Date(),
        })),
        notes: entry.notes,
        flow: entry.flow,
        temperature: entry.temperature,
        cervicalMucus: entry.cervicalMucus,
        intercourse: entry.intercourse,
        contraception: entry.contraception,
        updatedAt: new Date(),
      });
    });
  }

  async deleteEntry(id: string): Promise<void> {
    const realm = getRealmInstance();

    realm.write(() => {
      const entryToDelete = realm.objectForPrimaryKey('DailyEntry', id);
      if (!entryToDelete) {
        throw new Error('Entry not found');
      }
      realm.delete(entryToDelete);
    });
  }

  private mapToEntity(model: unknown): DailyEntry {
    const realmObject = model as RealmDailyEntry;
    return {
      id: realmObject.id,
      cycleId: realmObject.cycleId,
      date: new Date(realmObject.date),
      mood: realmObject.mood,
      symptoms: Array.from(realmObject.symptoms).map((s: RealmSymptom) => ({
        id: s.id,
        type: s.type,
        intensity: s.intensity,
        notes: s.notes,
        createdAt: new Date(s.createdAt),
        updatedAt: new Date(s.updatedAt),
      })),
      notes: realmObject.notes,
      flow: realmObject.flow,
      temperature: realmObject.temperature,
      cervicalMucus: realmObject.cervicalMucus,
      intercourse: realmObject.intercourse,
      contraception: realmObject.contraception,
      createdAt: new Date(realmObject.createdAt),
      updatedAt: new Date(realmObject.updatedAt),
    };
  }
}
