import { Cycle } from '../entities/Cycle';
import { ICycleRepository } from '../repositories/ICycleRepository';

export class GetCycleUseCase {
  constructor(private cycleRepository: ICycleRepository) {}

  async execute(): Promise<Cycle> {
    try {
      return await this.cycleRepository.getCurrentCycle();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Erreur lors de la récupération du cycle: ${error.message}`);
      }
      throw new Error('Une erreur inconnue est survenue lors de la récupération du cycle');
    }
  }
} 