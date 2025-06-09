import insights from './insights.json';

// 🎯 FALLBACK pour éviter les erreurs
const getFallbackInsight = (phase) => {
  const fallbacks = {
    menstrual: "Prends soin de toi aujourd'hui ✨",
    follicular: "L'énergie revient, profite-en ! 🌱", 
    ovulatory: "Tu rayonnes aujourd'hui ! ☀️",
    luteal: "Écoute ton intuition 🌙"
  };
  return fallbacks[phase] || "Belle journée à toi ! 💕";
};

export const getPersonalizedInsight = (phase, userPreferences, meluneConfig, usedInsights = []) => {
  // 🛡️ PROTECTION contre données manquantes
  if (!phase || !userPreferences || !meluneConfig) {
    return { content: getFallbackInsight(phase), id: null };
  }

  // 1. Filtrer par phase actuelle
  const phaseInsights = insights[phase];
  if (!phaseInsights) return { content: getFallbackInsight(phase), id: null };
  
  // 2. Identifier préférences fortes (score >= 4)
  const strongPreferences = Object.entries(userPreferences)
    .filter(([key, value]) => value >= 4)
    .map(([key]) => key);
  
  // 3. Sélectionner catégorie prioritaire
  const priorityCategory = strongPreferences[0] || 'symptoms'; // fallback
  const categoryInsights = phaseInsights[priorityCategory] || [];
  
  // 4. Filtrer par ton de communication
  const toneInsights = categoryInsights.filter(
    insight => insight.tone === meluneConfig.communicationTone
  );
  
  // 5. 🎯 ANTI-RÉPÉTITION : Exclure les insights déjà vus
  let availableInsights = toneInsights.filter(
    insight => !usedInsights.includes(insight.id)
  );
  
  // 6. 🔄 RESET INTELLIGENT : Si 80% des insights sont vus, tout remettre à zéro
  const totalInsights = toneInsights.length;
  const seenPercentage = (totalInsights - availableInsights.length) / totalInsights;
  
  if (seenPercentage >= 0.8 && totalInsights > 0) {
    availableInsights = toneInsights; // Reset : tous redeviennent disponibles
    console.log(`🔄 Reset insights pour phase ${phase} (${Math.round(seenPercentage * 100)}% vus)`);
  }
  
  // 7. Sélectionner le meilleur (mirandaApproval)
  const selectedInsight = availableInsights
    .sort((a, b) => b.mirandaApproval - a.mirandaApproval)[0];
  
  if (selectedInsight) {
    return {
      content: selectedInsight.content,
      id: selectedInsight.id,
      resetNeeded: seenPercentage >= 0.8
    };
  }
  
  return { content: getFallbackInsight(phase), id: null };
};
