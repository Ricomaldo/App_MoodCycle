import { DailyEntry } from '../entities/Cycle';

export interface IDailyEntryRepository {
  getEntryById(id: string): Promise<DailyEntry>;
  getEntriesByCycle(cycleId: string): Promise<DailyEntry[]>;
  getEntriesByDateRange(cycleId: string, startDate: Date, endDate: Date): Promise<DailyEntry[]>;
  createEntry(entry: Omit<DailyEntry, 'id'>): Promise<DailyEntry>;
  updateEntry(entry: DailyEntry): Promise<void>;
  deleteEntry(id: string): Promise<void>;
}
