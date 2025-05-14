import { makeAutoObservable } from 'mobx';
import { GetCycleUseCase } from '../../../../core/domain/usecases/GetCycleUseCase';
import { Cycle } from '../../../../core/domain/entities/Cycle';

export class CycleViewModel {
  private getCycleUseCase: GetCycleUseCase;

  // État observé par la vue
  cycle: Cycle | null = null;
  isLoading = false;
  error: string | null = null;

  constructor(getCycleUseCase: GetCycleUseCase) {
    makeAutoObservable(this);
    this.getCycleUseCase = getCycleUseCase;
  }

  // Actions
  async loadCycle() {
    this.isLoading = true;
    this.error = null;

    try {
      this.cycle = await this.getCycleUseCase.execute();
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.error = error.message;
      } else {
        this.error = 'Une erreur inconnue est survenue lors du chargement du cycle';
      }
    } finally {
      this.isLoading = false;
    }
  }

  // Getters
  get currentPhase() {
    return this.cycle?.phase;
  }

  get hasActiveCycle() {
    return this.cycle !== null;
  }

  get cycleDuration() {
    if (!this.cycle?.startDate || !this.cycle?.endDate) return 0;
    return Math.ceil(
      (this.cycle.endDate.getTime() - this.cycle.startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
  }
}
