/**
 * Décorateur pour marquer une classe comme injectable
 * Cette implémentation est simple et pourra être étendue avec un vrai système DI plus tard
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Injectable(): (target: any) => any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (target: any): any {
    // Pour l'instant, c'est juste un décorateur marqueur
    // Qui pourra être utilisé avec un container DI dans le futur
    return target;
  };
}

// Exporter directement depuis le fichier
export enum ServiceTypes {
  // Types de services disponibles
  AUTH = 'AUTH',
  CONFIG = 'CONFIG',
  LOGGER = 'LOGGER',
  DATABASE = 'DATABASE',
}
