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
    } catch (error) {
      this.error = error.message;
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
    if (!this.cycle) return 0;
    return Math.ceil(
      (this.cycle.endDate.getTime() - this.cycle.startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
  }
} 