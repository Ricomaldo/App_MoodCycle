import { database } from '../models';
import { ICycleRepository } from '../../domain/repositories/ICycleRepository';
import { Cycle, CyclePredictions, CycleStatistics, DailyEntry, MoodType, Symptom } from '../../domain/entities/Cycle';
import CycleModel from '../models/CycleModel';
import DailyEntryModel from '../models/DailyEntryModel';
import { Q } from '@nozbe/watermelondb';

// Fonction utilitaire pour calculer l'écart-type
const calculateStandardDeviation = (values: number[]): number => {
  const n = values.length;
  const mean = values.reduce((a, b) => a + b) / n;
  const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / n;
  return Math.sqrt(variance);
};

export class CycleRepository implements ICycleRepository {
  async getCurrentCycle(): Promise<Cycle> {
    const cycles = await database.collections.get<CycleModel>('cycles');
    const currentCycle = await cycles.query(
      Q.where('end_date', null)
    ).fetch();
    
    if (currentCycle.length === 0) {
      throw new Error('Aucun cycle en cours');
    }

    return this.mapToEntity(currentCycle[0]);
  }

  async getCycleById(id: string): Promise<Cycle> {
    const cycles = await database.collections.get<CycleModel>('cycles');
    const cycle = await cycles.find(id);
    return this.mapToEntity(cycle);
  }

  async getCyclesByDateRange(startDate: Date, endDate: Date): Promise<Cycle[]> {
    const cycles = await database.collections.get<CycleModel>('cycles');
    const cyclesInRange = await cycles.query(
      Q.where('start_date', Q.gte(startDate.getTime())),
      Q.where('end_date', Q.lte(endDate.getTime()))
    ).fetch();
    
    return cyclesInRange.map(this.mapToEntity);
  }

  async saveCycle(cycle: Cycle): Promise<void> {
    await database.write(async () => {
      const createdCycle = await database.collections.get<CycleModel>('cycles').create(record => {
        record.userId = cycle.userId;
        record.startDate = cycle.startDate;
        record.endDate = cycle.endDate;
        record.phase = cycle.phase;
        record.averageLength = cycle.averageLength;
        record.isCurrent = cycle.isCurrent;
      });

      // Créer les entrées quotidiennes associées
      if (cycle.entries && cycle.entries.length > 0) {
        const entries = await database.collections.get<DailyEntryModel>('daily_entries');
        for (const entry of cycle.entries) {
          await entries.create(record => {
            record.cycle = createdCycle;
            record.date = entry.date;
            record.mood = entry.mood;
            record.symptoms = entry.symptoms;
            record.notes = entry.notes;
            record.flow = entry.flow;
            record.temperature = entry.temperature;
            record.cervicalMucus = entry.cervicalMucus;
            record.intercourse = entry.intercourse;
            record.contraception = entry.contraception;
          });
        }
      }
    });
  }

  async updateCycle(cycle: Cycle): Promise<void> {
    await database.write(async () => {
      const cycles = await database.collections.get<CycleModel>('cycles');
      const cycleToUpdate = await cycles.find(cycle.id);
      
      await cycleToUpdate.update(record => {
        record.userId = cycle.userId;
        record.startDate = cycle.startDate;
        record.endDate = cycle.endDate;
        record.phase = cycle.phase;
        record.averageLength = cycle.averageLength;
        record.isCurrent = cycle.isCurrent;
      });

      // Mettre à jour les entrées quotidiennes
      if (cycle.entries && cycle.entries.length > 0) {
        const entries = await database.collections.get<DailyEntryModel>('daily_entries');
        const existingEntries = await entries.query(
          Q.where('cycle_id', cycle.id)
        ).fetch();

        // Supprimer les entrées qui ne sont plus présentes
        for (const existingEntry of existingEntries) {
          if (!cycle.entries.find(e => e.id === existingEntry.id)) {
            await existingEntry.destroyPermanently();
          }
        }

        // Mettre à jour ou créer les entrées
        for (const entry of cycle.entries) {
          if (entry.id) {
            const existingEntry = existingEntries.find(e => e.id === entry.id);
            if (existingEntry) {
              await existingEntry.update(record => {
                record.date = entry.date;
                record.mood = entry.mood;
                record.symptoms = entry.symptoms;
                record.notes = entry.notes;
                record.flow = entry.flow;
                record.temperature = entry.temperature;
                record.cervicalMucus = entry.cervicalMucus;
                record.intercourse = entry.intercourse;
                record.contraception = entry.contraception;
              });
            }
          } else {
            await entries.create(record => {
              record.cycle = cycleToUpdate;
              record.date = entry.date;
              record.mood = entry.mood;
              record.symptoms = entry.symptoms;
              record.notes = entry.notes;
              record.flow = entry.flow;
              record.temperature = entry.temperature;
              record.cervicalMucus = entry.cervicalMucus;
              record.intercourse = entry.intercourse;
              record.contraception = entry.contraception;
            });
          }
        }
      }
    });
  }

  async deleteCycle(id: string): Promise<void> {
    await database.write(async () => {
      const cycles = await database.collections.get<CycleModel>('cycles');
      const cycleToDelete = await cycles.find(id);

      // Supprimer d'abord les entrées associées
      const entries = await database.collections.get<DailyEntryModel>('daily_entries');
      const cycleEntries = await entries.query(
        Q.where('cycle_id', id)
      ).fetch();
      
      for (const entry of cycleEntries) {
        await entry.destroyPermanently();
      }

      // Puis supprimer le cycle
      await cycleToDelete.destroyPermanently();
    });
  }

  async getLastCycle(): Promise<Cycle | null> {
    const cycles = await database.collections.get<CycleModel>('cycles');
    const lastCycle = await cycles.query(
      Q.where('end_date', Q.notEq(null)),
      Q.sortBy('end_date', Q.desc)
    ).fetch();
    
    return lastCycle.length > 0 ? this.mapToEntity(lastCycle[0]) : null;
  }

  async getNextCycle(): Promise<Cycle | null> {
    const cycles = await database.collections.get<CycleModel>('cycles');
    const nextCycle = await cycles.query(
      Q.where('start_date', Q.gt(new Date().getTime())),
      Q.sortBy('start_date', Q.asc)
    ).fetch();
    
    return nextCycle.length > 0 ? this.mapToEntity(nextCycle[0]) : null;
  }

  async getCyclePredictions(cycleId: string): Promise<CyclePredictions> {
    const cycle = await this.getCycleById(cycleId);
    const cycles = await this.getCyclesByDateRange(
      new Date(cycle.startDate.getTime() - 180 * 24 * 60 * 60 * 1000), // 6 mois avant
      cycle.startDate
    );

    // Calcul basique des prédictions basé sur les cycles précédents
    const averageCycleLength = cycles.reduce((acc, c) => {
      if (c.endDate) {
        return acc + (c.endDate.getTime() - c.startDate.getTime()) / (24 * 60 * 60 * 1000);
      }
      return acc;
    }, 0) / cycles.length;

    const averagePeriodLength = cycles.reduce((acc, c) => {
      const periodEntries = c.entries.filter(e => e.flow && e.flow > 0);
      if (periodEntries.length > 0) {
        return acc + periodEntries.length;
      }
      return acc;
    }, 0) / cycles.length;

    const nextCycleStart = new Date(cycle.startDate.getTime() + averageCycleLength * 24 * 60 * 60 * 1000);
    const nextPeriodStart = nextCycleStart;
    const nextPeriodEnd = new Date(nextPeriodStart.getTime() + averagePeriodLength * 24 * 60 * 60 * 1000);
    const nextOvulation = new Date(nextPeriodStart.getTime() + 14 * 24 * 60 * 60 * 1000);

    return {
      nextPeriodStart,
      nextPeriodEnd,
      nextOvulation,
      fertileWindow: {
        start: new Date(nextOvulation.getTime() - 5 * 24 * 60 * 60 * 1000),
        end: new Date(nextOvulation.getTime() + 1 * 24 * 60 * 60 * 1000)
      },
      nextCycleStart,
      confidence: 0.8 // À améliorer avec plus de données
    };
  }

  async getCycleStatistics(cycleId: string): Promise<CycleStatistics> {
    const cycle = await this.getCycleById(cycleId);
    const cycles = await this.getCyclesByDateRange(
      new Date(cycle.startDate.getTime() - 180 * 24 * 60 * 60 * 1000), // 6 mois avant
      cycle.startDate
    );

    // Calcul des statistiques basiques
    const averageCycleLength = cycles.reduce((acc, c) => {
      if (c.endDate) {
        return acc + (c.endDate.getTime() - c.startDate.getTime()) / (24 * 60 * 60 * 1000);
      }
      return acc;
    }, 0) / cycles.length;

    const averagePeriodLength = cycles.reduce((acc, c) => {
      const periodEntries = c.entries.filter(e => e.flow && e.flow > 0);
      if (periodEntries.length > 0) {
        return acc + periodEntries.length;
      }
      return acc;
    }, 0) / cycles.length;

    // Calcul de la régularité (écart-type des longueurs de cycle)
    const cycleLengths = cycles
      .filter(c => c.endDate)
      .map(c => (c.endDate!.getTime() - c.startDate.getTime()) / (24 * 60 * 60 * 1000));
    const cycleRegularity = 1 - (calculateStandardDeviation(cycleLengths) / averageCycleLength);

    // Analyse des symptômes et humeurs
    const symptoms = cycles.flatMap(c => c.entries.flatMap(e => e.symptoms || []));
    const moods = cycles.flatMap(c => c.entries.map(e => e.mood).filter(Boolean));

    const symptomFrequency = this.calculateFrequency(symptoms.map(s => s.type));
    const moodFrequency = this.calculateFrequency(moods as string[]);

    return {
      averageCycleLength,
      averagePeriodLength,
      cycleRegularity,
      phaseLengths: {
        menstruation: averagePeriodLength,
        follicular: 14,
        ovulation: 1,
        luteal: 14
      },
      commonSymptoms: Object.entries(symptomFrequency).map(([type, frequency]) => ({
        type,
        frequency,
        averageIntensity: this.calculateAverageIntensity(symptoms, type)
      })),
      commonMoods: Object.entries(moodFrequency).map(([type, frequency]) => ({
        type: type as MoodType,
        frequency
      })),
      lastUpdated: new Date()
    };
  }

  private calculateFrequency(items: string[]): Record<string, number> {
    const frequency: Record<string, number> = {};
    items.forEach(item => {
      frequency[item] = (frequency[item] || 0) + 1;
    });
    const total = items.length;
    Object.keys(frequency).forEach(key => {
      frequency[key] = frequency[key] / total;
    });
    return frequency;
  }

  private calculateAverageIntensity(symptoms: Symptom[], type: string): number {
    const typeSymptoms = symptoms.filter(s => s.type === type);
    if (typeSymptoms.length === 0) return 0;
    return typeSymptoms.reduce((acc, s) => acc + s.intensity, 0) / typeSymptoms.length;
  }

  private mapToEntity(model: CycleModel): Cycle {
    return {
      id: model.id,
      userId: model.userId,
      startDate: model.startDate,
      endDate: model.endDate,
      phase: model.phase as Cycle['phase'],
      entries: model.entries.map(entry => ({
        id: entry.id,
        cycleId: model.id,
        date: entry.date,
        mood: entry.mood,
        symptoms: entry.symptoms,
        notes: entry.notes,
        flow: entry.flow,
        temperature: entry.temperature,
        cervicalMucus: entry.cervicalMucus,
        intercourse: entry.intercourse,
        contraception: entry.contraception
      })),
      averageLength: model.averageLength,
      isCurrent: model.isCurrent,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt
    };
  }
} 