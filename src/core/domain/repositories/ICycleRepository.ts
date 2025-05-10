import { Cycle, CyclePredictions, CycleStatistics } from '../entities/Cycle';

export interface ICycleRepository {
  getCurrentCycle(): Promise<Cycle>;
  getCycleById(id: string): Promise<Cycle>;
  getCyclesByDateRange(startDate: Date, endDate: Date): Promise<Cycle[]>;
  saveCycle(cycle: Cycle): Promise<void>;
  updateCycle(cycle: Cycle): Promise<void>;
  deleteCycle(id: string): Promise<void>;
  getLastCycle(): Promise<Cycle | null>;
  getNextCycle(): Promise<Cycle | null>;
  getCyclePredictions(cycleId: string): Promise<CyclePredictions>;
  getCycleStatistics(cycleId: string): Promise<CycleStatistics>;
} 