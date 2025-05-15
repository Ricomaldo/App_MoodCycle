/**
 * Décorateur pour marquer une classe comme injectable dans le système de DI.
 * Pour l'instant, c'est juste un marqueur sans fonctionnalité réelle,
 * mais il pourra être utilisé plus tard pour l'injection de dépendances.
 */
export function Injectable() {
  return function (target: any) {
    // Ne fait rien pour le moment, mais pourrait être utilisé
    // pour enregistrer la classe dans un conteneur DI
    return target;
  };
}
