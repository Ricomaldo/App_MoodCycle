/**
 * Calcule la couleur de texte optimale (blanc ou noir) selon la couleur de fond
 * @param {string} bgColor - Couleur de fond au format '#RRGGBB'
 * @returns {string} - '#212121' pour texte foncé ou '#FFFFFF' pour texte blanc
 */
export function getContrastingTextColor(bgColor) {
  // Supprime le # si présent
  const color = bgColor.replace('#', '');
  
  // Convertit en valeurs RGB
  const rgb = parseInt(color, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  
  // Calcul de luminance relative (formule W3C)
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  
  // Seuil de basculement : 186 (sur 255)
  // Au-dessus = fond clair → texte foncé
  // En-dessous = fond foncé → texte blanc
  return luminance > 186 ? '#212121' : '#FFFFFF';
}

/**
 * Détermine si une couleur est considérée comme claire
 * @param {string} color - Couleur au format '#RRGGBB'
 * @returns {boolean} - true si la couleur est claire
 */
export function isLightColor(color) {
  return getContrastingTextColor(color) === '#212121';
}

/**
 * Détermine si une couleur est considérée comme foncée
 * @param {string} color - Couleur au format '#RRGGBB'  
 * @returns {boolean} - true si la couleur est foncée
 */
export function isDarkColor(color) {
  return getContrastingTextColor(color) === '#FFFFFF';
} 