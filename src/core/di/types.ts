/**
 * Types pour le système d'injection de dépendances
 */

// Types de services qui peuvent être injectés
export const enum ServiceTypes {
  // Repositories
  ICycleRepository = 'ICycleRepository',
  IUserRepository = 'IUserRepository',
  IDailyEntryRepository = 'IDailyEntryRepository',
  IConversationRepository = 'IConversationRepository',

  // Services
  ClaudeService = 'ClaudeService',

  // Use Cases
  CalculateCyclePhaseUseCase = 'CalculateCyclePhaseUseCase',
  GetCycleUseCase = 'GetCycleUseCase',
  SendMessageUseCase = 'SendMessageUseCase',
  GetConversationHistoryUseCase = 'GetConversationHistoryUseCase',
}

// Type générique pour les constructeurs de classes
export type Constructor<T = unknown> = new (...args: unknown[]) => T;
