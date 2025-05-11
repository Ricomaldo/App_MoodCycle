import { database } from '../models';
import { DailyEntry } from '../../domain/entities/Cycle';
import DailyEntryModel from '../models/DailyEntryModel';
import { Q } from '@nozbe/watermelondb';
import { IDailyEntryRepository } from '../../domain/repositories/IDailyEntryRepository';

export class DailyEntryRepository implements IDailyEntryRepository {
  async getEntryById(id: string): Promise<DailyEntry> {
    const entries = await database.collections.get<DailyEntryModel>('daily_entries');
    const entry = await entries.find(id);
    return this.mapToEntity(entry);
  }

  async getEntriesByCycle(cycleId: string): Promise<DailyEntry[]> {
    const entries = await database.collections.get<DailyEntryModel>('daily_entries');
    const cycleEntries = await entries.query(
      Q.where('cycle_id', cycleId)
    ).fetch();
    
    return cycleEntries.map(this.mapToEntity);
  }

  async getEntriesByDateRange(cycleId: string, startDate: Date, endDate: Date): Promise<DailyEntry[]> {
    const entries = await database.collections.get<DailyEntryModel>('daily_entries');
    const entriesInRange = await entries.query(
      Q.where('cycle_id', cycleId),
      Q.where('date', Q.gte(startDate.getTime())),
      Q.where('date', Q.lte(endDate.getTime()))
    ).fetch();
    
    return entriesInRange.map(this.mapToEntity);
  }

  async createEntry(entry: Omit<DailyEntry, 'id'>): Promise<DailyEntry> {
    let createdEntry: DailyEntryModel;
    await database.write(async () => {
      createdEntry = await database.collections.get<DailyEntryModel>('daily_entries').create(record => {
        // @ts-expect-error: cycle_id n'est pas typé mais existe dans WatermelonDB
        record.cycle_id = entry.cycleId;
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
    });
    return this.mapToEntity(createdEntry!);
  }

  async updateEntry(entry: DailyEntry): Promise<void> {
    await database.write(async () => {
      const entries = await database.collections.get<DailyEntryModel>('daily_entries');
      const entryToUpdate = await entries.find(entry.id);
      await entryToUpdate.update(record => {
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
    });
  }

  async deleteEntry(id: string): Promise<void> {
    await database.write(async () => {
      const entries = await database.collections.get<DailyEntryModel>('daily_entries');
      const entryToDelete = await entries.find(id);
      await entryToDelete.destroyPermanently();
    });
  }

  private mapToEntity(model: DailyEntryModel): DailyEntry {
    return {
      id: model.id,
      cycleId: model.cycle.id,
      date: model.date,
      mood: model.mood,
      symptoms: model.symptoms,
      notes: model.notes,
      flow: model.flow,
      temperature: model.temperature,
      cervicalMucus: model.cervicalMucus,
      intercourse: model.intercourse,
      contraception: model.contraception
    };
  }
} 