import { CyclePhase, CyclePhaseType } from '@core/domain/entities/cycle/CyclePhase';
import { Injectable } from '@core/di';

/**
 * Paramètres pour calculer la phase actuelle du cycle
 */
export interface CalculateCyclePhaseParams {
  lastPeriodStartDate: Date;
  cycleLength: number;
  currentDate?: Date;
}

/**
 * Résultat du calcul de la phase du cycle
 */
export interface CalculateCyclePhaseResult {
  phase: CyclePhaseType;
  dayInPhase: number;
  dayInCycle: number;
  phaseEndDate: Date;
}

/**
 * Use Case qui calcule la phase actuelle du cycle menstruel
 * en fonction de la date des dernières règles et de la longueur du cycle
 */
@Injectable()
export class CalculateCyclePhaseUseCase {
  execute(params: CalculateCyclePhaseParams): CalculateCyclePhaseResult {
    const { lastPeriodStartDate, cycleLength, currentDate = new Date() } = params;

    // Valeurs par défaut pour les durées des phase
    const menstrualPhaseDuration = 5; // Jours
    const follicularPhaseDuration = Math.max(5, cycleLength - 19); // Variable selon cycle
    const ovulatoryPhaseDuration = 5; // Jours

    // Calcul du jour actuel dans le cycle
    const daysSinceLastPeriod = Math.floor(
      (currentDate.getTime() - lastPeriodStartDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    const normalizedDay = ((daysSinceLastPeriod % cycleLength) + cycleLength) % cycleLength;
    const dayInCycle = normalizedDay === 0 ? cycleLength : normalizedDay;

    // Détermination de la phase
    let phase: CyclePhaseType;
    let dayInPhase: number;
    let phaseEndDay: number;

    if (dayInCycle <= menstrualPhaseDuration) {
      phase = CyclePhase.MENSTRUAL;
      dayInPhase = dayInCycle;
      phaseEndDay = menstrualPhaseDuration;
    } else if (dayInCycle <= menstrualPhaseDuration + follicularPhaseDuration) {
      phase = CyclePhase.FOLLICULAR;
      dayInPhase = dayInCycle - menstrualPhaseDuration;
      phaseEndDay = menstrualPhaseDuration + follicularPhaseDuration;
    } else if (
      dayInCycle <=
      menstrualPhaseDuration + follicularPhaseDuration + ovulatoryPhaseDuration
    ) {
      phase = CyclePhase.OVULATORY;
      dayInPhase = dayInCycle - (menstrualPhaseDuration + follicularPhaseDuration);
      phaseEndDay = menstrualPhaseDuration + follicularPhaseDuration + ovulatoryPhaseDuration;
    } else {
      phase = CyclePhase.LUTEAL;
      dayInPhase =
        dayInCycle - (menstrualPhaseDuration + follicularPhaseDuration + ovulatoryPhaseDuration);
      phaseEndDay = cycleLength;
    }

    // Calcul de la date de fin de phase
    const phaseEndDate = new Date(lastPeriodStartDate);
    phaseEndDate.setDate(lastPeriodStartDate.getDate() + phaseEndDay - 1);

    return { phase, dayInPhase, dayInCycle, phaseEndDate };
  }
}
